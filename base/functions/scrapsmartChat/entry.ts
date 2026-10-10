import { createClientFromRequest } from 'npm:@base44/sdk@0.8.52';

export default async function(req) {
  try {
    const base44 = createClientFromRequest(req);
    const body = await req.json();
    const message = (body?.message || '').toString().slice(0, 2000);
    const context = body?.context || {};

    if (!message) {
      return Response.json({ error: 'No message provided' }, { status: 400 });
    }

    // Build a project-aware system prompt.
    const ctxLines = [];
    if (context.material) {
      ctxLines.push(`Material: ${context.material.name || 'unknown'} (${context.material.type || ''}).`);
      ctxLines.push(`Sheet: ${context.material.sheetWidth || '?'}×${context.material.sheetHeight || '?'} mm, thickness ${context.material.thickness || '?'} mm.`);
      ctxLines.push(`Saw kerf: ${context.material.kerf || 0} mm. Edge margin: ${context.material.edgeMargin || 0} mm.`);
      ctxLines.push(`Price per sheet: $${context.material.pricePerSheet || 0}. Available sheets: ${context.material.sheetQuantity || 1}.`);
      ctxLines.push(`Rotation allowed: ${context.material.rotationAllowed ? 'yes' : 'no'}.`);
    }
    if (context.pieces && context.pieces.length) {
      const plist = context.pieces.map((p) => `${p.name} (${p.width}×${p.height}mm, qty ${p.quantity}${p.rotationAllowed ? ', rotatable' : ''})`).join('; ');
      ctxLines.push(`Cut list: ${plist}.`);
    }
    if (context.stats) {
      ctxLines.push(`Optimized layout: ${context.stats.sheetsUsed} sheet(s) used, ${context.stats.utilization.toFixed(1)}% utilization, ${context.stats.waste.toFixed(1)}% waste, ${context.stats.placedCount} placed, ${context.stats.unplacedCount} unplaced, cost $${context.stats.totalCost.toFixed(2)}.`);
    }
    if (context.baselineStats) {
      ctxLines.push(`Baseline layout: ${context.baselineStats.sheetsUsed} sheet(s), ${context.baselineStats.utilization.toFixed(1)}% utilization, cost $${context.baselineStats.totalCost.toFixed(2)}.`);
      ctxLines.push(`Estimated savings: $${Math.max(0, context.baselineStats.totalCost - context.stats.totalCost).toFixed(2)}.`);
    }
    if (context.selectedPiece) {
      ctxLines.push(`Selected piece: ${context.selectedPiece.name}, placed ${context.selectedPiece.w}×${context.selectedPiece.h}mm at (${context.selectedPiece.x}, ${context.selectedPiece.y})${context.selectedPiece.rotated ? ', rotated 90°' : ''} on sheet ${context.selectedPiece.sheet}.`);
    }

    const systemPrompt = `You are ScrapSmart AI, a friendly workshop copilot that helps users reduce material waste and understand cutting layouts. You are knowledgeable about sheet cutting, nesting, kerf, material utilization, and cost optimization.

Answer the user's question based ONLY on the project context below. Be concise, practical, and specific to their project. If the answer depends on data not in the context, say so. Never invent dimensions, optimizer results, or cost savings — use the provided numbers. If asked to change the project (add/edit pieces, run optimization), describe the suggested action and ask for confirmation; do not claim you have already changed anything.

Project context:
${ctxLines.join('\n') || 'No project loaded yet.'}

Algorithm: MaxRects with Best Short Side Fit (BSSF). Results are "Best Layout Found", not guaranteed globally optimal. Kerf reserves blade width between pieces but does not by itself produce a physically executable saw sequence.`;

    const result = await base44.asServiceRole.integrations.Core.InvokeLLM({
      prompt: `${systemPrompt}\n\nUser question: ${message}`,
    });

    const reply = typeof result === 'string' ? result : result?.text || result?.output || JSON.stringify(result);
    return Response.json({ reply });
  } catch (error) {
    return Response.json({ error: error.message || 'AI service unavailable' }, { status: 500 });
  }
}
