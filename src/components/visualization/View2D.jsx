import React, { useState, useRef, useEffect, useMemo } from 'react';
import { ZoomIn, ZoomOut, Maximize, Tag, Ruler, RotateCw } from 'lucide-react';
import { useProject } from '@/lib/ProjectContext';
<<<<<<< HEAD

const LEFTOVER_FILL = 'var(--card)';
=======
import { fromMm } from '@/lib/geometry';

const LEFTOVER_FILL = '#E2E8E4';
>>>>>>> 89864b9d989ae3713185c0da5120642180b714ad

export default function View2D({ layoutSource = 'layout', height = 420 }) {
  const { layout, baseline, material, selectedInstanceId, setSelectedInstanceId, matDef } = useProject();
  const source = layoutSource === 'baseline' ? baseline : layout;
  const [sheetIdx, setSheetIdx] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [showLabels, setShowLabels] = useState(true);
  const [showDims, setShowDims] = useState(true);
  const [dragging, setDragging] = useState(null);
  const containerRef = useRef(null);
  const [containerW, setContainerW] = useState(800);

  useEffect(() => {
    if (!containerRef.current) return;
    const ro = new ResizeObserver((entries) => setContainerW(entries[0].contentRect.width));
    ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    setSheetIdx(0);
    setZoom(1);
    setPan({ x: 0, y: 0 });
  }, [source, material.type]);

  const sheet = source?.sheets?.[Math.min(sheetIdx, (source?.sheets?.length || 1) - 1)];

  const baseScale = useMemo(() => {
    if (!sheet) return 1;
    const pad = 40;
    const sx = (containerW - pad * 2) / sheet.width;
    const sy = (height - pad * 2) / sheet.height;
    return Math.min(sx, sy);
  }, [sheet, containerW, height]);

  const scale = baseScale * zoom;

  const fitToScreen = () => { setZoom(1); setPan({ x: 0, y: 0 }); };

  if (!source || !sheet) {
    return (
<<<<<<< HEAD
      <div ref={containerRef} className="material-preserved flex items-center justify-center text-muted-foreground text-sm" style={{ height }}>
=======
      <div ref={containerRef} className="flex items-center justify-center text-[#94A3B8] text-sm" style={{ height }}>
>>>>>>> 89864b9d989ae3713185c0da5120642180b714ad
        Run the optimizer to see the cutting layout.
      </div>
    );
  }

  const pad = 20;
  const w = sheet.width * scale + pad * 2;
  const h = sheet.height * scale + pad * 2;

  const onPointerDown = (e) => {
    if (e.target.tagName === 'rect' && e.target.dataset.piece) return;
    setDragging({ x: e.clientX, y: e.clientY, panX: pan.x, panY: pan.y });
  };
  const onPointerMove = (e) => {
    if (!dragging) return;
    setPan({ x: dragging.panX + (e.clientX - dragging.x), y: dragging.panY + (e.clientY - dragging.y) });
  };
  const onPointerUp = () => setDragging(null);

  const onWheel = (e) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? 0.9 : 1.1;
    setZoom((z) => Math.max(0.3, Math.min(6, z * delta)));
  };

  return (
<<<<<<< HEAD
    <div ref={containerRef} className="material-preserved relative w-full" style={{ height }}>
      {/* Toolbar */}
      <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 bg-card/90 backdrop-blur rounded-xl border border-border p-1 shadow-sm">
        <button onClick={() => setZoom((z) => Math.min(6, z * 1.2))} className="w-8 h-8 rounded-lg hover:bg-background flex items-center justify-center text-muted-foreground" title="Zoom in"><ZoomIn className="w-4 h-4" /></button>
        <button onClick={() => setZoom((z) => Math.max(0.3, z / 1.2))} className="w-8 h-8 rounded-lg hover:bg-background flex items-center justify-center text-muted-foreground" title="Zoom out"><ZoomOut className="w-4 h-4" /></button>
        <button onClick={fitToScreen} className="w-8 h-8 rounded-lg hover:bg-background flex items-center justify-center text-muted-foreground" title="Fit to screen"><Maximize className="w-4 h-4" /></button>
        <div className="w-px h-5 bg-card" />
        <button onClick={() => setShowLabels((s) => !s)} className={`w-8 h-8 rounded-lg flex items-center justify-center ${showLabels ? 'bg-card text-primary-hover' : 'text-muted-foreground hover:bg-background'}`} title="Toggle labels"><Tag className="w-4 h-4" /></button>
        <button onClick={() => setShowDims((s) => !s)} className={`w-8 h-8 rounded-lg flex items-center justify-center ${showDims ? 'bg-card text-primary-hover' : 'text-muted-foreground hover:bg-background'}`} title="Toggle dimensions"><Ruler className="w-4 h-4" /></button>
=======
    <div ref={containerRef} className="relative w-full" style={{ height }}>
      {/* Toolbar */}
      <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 bg-white/90 backdrop-blur rounded-xl border border-[#E2E8E4] p-1 shadow-sm">
        <button onClick={() => setZoom((z) => Math.min(6, z * 1.2))} className="w-8 h-8 rounded-lg hover:bg-[#F4F7F5] flex items-center justify-center text-[#64748B]" title="Zoom in"><ZoomIn className="w-4 h-4" /></button>
        <button onClick={() => setZoom((z) => Math.max(0.3, z / 1.2))} className="w-8 h-8 rounded-lg hover:bg-[#F4F7F5] flex items-center justify-center text-[#64748B]" title="Zoom out"><ZoomOut className="w-4 h-4" /></button>
        <button onClick={fitToScreen} className="w-8 h-8 rounded-lg hover:bg-[#F4F7F5] flex items-center justify-center text-[#64748B]" title="Fit to screen"><Maximize className="w-4 h-4" /></button>
        <div className="w-px h-5 bg-[#E2E8E4]" />
        <button onClick={() => setShowLabels((s) => !s)} className={`w-8 h-8 rounded-lg flex items-center justify-center ${showLabels ? 'bg-[#DCFCE7] text-[#15803D]' : 'text-[#64748B] hover:bg-[#F4F7F5]'}`} title="Toggle labels"><Tag className="w-4 h-4" /></button>
        <button onClick={() => setShowDims((s) => !s)} className={`w-8 h-8 rounded-lg flex items-center justify-center ${showDims ? 'bg-[#DCFCE7] text-[#15803D]' : 'text-[#64748B] hover:bg-[#F4F7F5]'}`} title="Toggle dimensions"><Ruler className="w-4 h-4" /></button>
>>>>>>> 89864b9d989ae3713185c0da5120642180b714ad
      </div>

      {/* Sheet selector */}
      {source.sheets.length > 1 && (
<<<<<<< HEAD
        <div className="absolute top-3 right-3 z-10 flex items-center gap-1 bg-card/90 backdrop-blur rounded-xl border border-border p-1 shadow-sm">
=======
        <div className="absolute top-3 right-3 z-10 flex items-center gap-1 bg-white/90 backdrop-blur rounded-xl border border-[#E2E8E4] p-1 shadow-sm">
>>>>>>> 89864b9d989ae3713185c0da5120642180b714ad
          {source.sheets.map((s, i) => (
            <button
              key={i}
              onClick={() => setSheetIdx(i)}
<<<<<<< HEAD
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${i === sheetIdx ? 'bg-primary-hover text-primary-foreground' : 'text-muted-foreground hover:bg-background'}`}
=======
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${i === sheetIdx ? 'bg-[#123D26] text-white' : 'text-[#64748B] hover:bg-[#F4F7F5]'}`}
>>>>>>> 89864b9d989ae3713185c0da5120642180b714ad
            >
              Sheet {i + 1}
            </button>
          ))}
        </div>
      )}

      <div className="w-full h-full overflow-hidden flex items-center justify-center" onWheel={onWheel}>
        <svg
          width={w}
          height={h}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerLeave={onPointerUp}
          style={{ cursor: dragging ? 'grabbing' : 'grab', touchAction: 'none' }}
        >
          <g transform={`translate(${pad + pan.x}, ${pad + pan.y})`}>
            {/* Sheet background */}
<<<<<<< HEAD
            <rect x={0} y={0} width={sheet.width * scale} height={sheet.height * scale} rx={6} fill={LEFTOVER_FILL} stroke="var(--border)" strokeWidth={1.5} />
=======
            <rect x={0} y={0} width={sheet.width * scale} height={sheet.height * scale} rx={6} fill={LEFTOVER_FILL} stroke="#94A3B8" strokeWidth={1.5} />
>>>>>>> 89864b9d989ae3713185c0da5120642180b714ad
            {/* Margin guide */}
            {material.edgeMargin > 0 && (
              <rect
                x={material.edgeMargin * scale}
                y={material.edgeMargin * scale}
                width={(sheet.width - material.edgeMargin * 2) * scale}
                height={(sheet.height - material.edgeMargin * 2) * scale}
                fill="none"
<<<<<<< HEAD
                stroke="var(--primary)"
=======
                stroke="#16A34A"
>>>>>>> 89864b9d989ae3713185c0da5120642180b714ad
                strokeWidth={1}
                strokeDasharray="4 4"
                opacity={0.5}
              />
            )}
            {/* Pieces */}
            {sheet.placements.map((p) => {
              const selected = p.instanceId === selectedInstanceId;
<<<<<<< HEAD
              const fill = p.color || '#2e7d7a';
=======
              const fill = p.color || '#16A34A';
>>>>>>> 89864b9d989ae3713185c0da5120642180b714ad
              return (
                <g
                  key={p.instanceId}
                  data-piece={p.instanceId}
                  onClick={(e) => { e.stopPropagation(); setSelectedInstanceId(selected ? null : p.instanceId); }}
                  style={{ cursor: 'pointer' }}
                >
                  <rect
                    x={p.x * scale}
                    y={p.y * scale}
                    width={p.w * scale}
                    height={p.h * scale}
                    rx={2}
                    fill={fill}
                    fillOpacity={0.78}
<<<<<<< HEAD
                    stroke={selected ? 'var(--primary-hover)' : 'var(--primary-foreground)'}
=======
                    stroke={selected ? '#123D26' : '#ffffff'}
>>>>>>> 89864b9d989ae3713185c0da5120642180b714ad
                    strokeWidth={selected ? 3 : 1.5}
                  />
                  {showLabels && p.w * scale > 28 && p.h * scale > 18 && (
                    <text
                      x={p.x * scale + 4}
                      y={p.y * scale + 12}
                      fontSize={Math.min(11, Math.max(7, p.h * scale * 0.22))}
<<<<<<< HEAD
                      fill="var(--primary-foreground)"
=======
                      fill="#ffffff"
>>>>>>> 89864b9d989ae3713185c0da5120642180b714ad
                      fontWeight={700}
                      style={{ pointerEvents: 'none' }}
                    >
                      {p.name}
                    </text>
                  )}
                  {showDims && p.w * scale > 50 && p.h * scale > 30 && (
                    <text
                      x={p.x * scale + 4}
                      y={p.y * scale + p.h * scale - 5}
                      fontSize={Math.min(10, Math.max(6, p.h * scale * 0.18))}
<<<<<<< HEAD
                      fill="var(--primary-foreground)"
=======
                      fill="#ffffff"
>>>>>>> 89864b9d989ae3713185c0da5120642180b714ad
                      fillOpacity={0.9}
                      style={{ pointerEvents: 'none' }}
                    >
                      {Math.round(p.w)}×{Math.round(p.h)}{p.rotated ? ' ⟳' : ''}
                    </text>
                  )}
                  {p.rotated && showDims && p.w * scale > 30 && (
                    <g transform={`translate(${(p.x + p.w / 2) * scale}, ${(p.y + p.h / 2) * scale})`}>
<<<<<<< HEAD
                      <RotateCw className="w-3 h-3 text-primary-foreground" style={{ pointerEvents: 'none' }} />
=======
                      <RotateCw className="w-3 h-3 text-white" style={{ pointerEvents: 'none' }} />
>>>>>>> 89864b9d989ae3713185c0da5120642180b714ad
                    </g>
                  )}
                </g>
              );
            })}
            {/* Sheet dimension labels */}
<<<<<<< HEAD
            <text x={sheet.width * scale / 2} y={-6} textAnchor="middle" fontSize={11} fill="var(--foreground)" fontWeight={600}>
              {Math.round(sheet.width)} mm
            </text>
            <text x={-12} y={sheet.height * scale / 2} textAnchor="middle" fontSize={11} fill="var(--foreground)" fontWeight={600} transform={`rotate(-90, -12, ${sheet.height * scale / 2})`}>
=======
            <text x={sheet.width * scale / 2} y={-6} textAnchor="middle" fontSize={11} fill="#64748B" fontWeight={600}>
              {Math.round(sheet.width)} mm
            </text>
            <text x={-12} y={sheet.height * scale / 2} textAnchor="middle" fontSize={11} fill="#64748B" fontWeight={600} transform={`rotate(-90, -12, ${sheet.height * scale / 2})`}>
>>>>>>> 89864b9d989ae3713185c0da5120642180b714ad
              {Math.round(sheet.height)} mm
            </text>
          </g>
        </svg>
      </div>

      {/* Legend */}
<<<<<<< HEAD
      <div className="absolute bottom-3 left-3 z-10 flex items-center gap-3 bg-card/90 backdrop-blur rounded-lg border border-border px-3 py-1.5 text-[11px] text-muted-foreground shadow-sm">
        <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded" style={{ background: LEFTOVER_FILL }} /> Leftover / waste</span>
        <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-primary" /> Placed piece</span>
        {source.unplaced?.length > 0 && <span className="text-muted-foreground font-medium">{source.unplaced.length} unplaced</span>}
=======
      <div className="absolute bottom-3 left-3 z-10 flex items-center gap-3 bg-white/90 backdrop-blur rounded-lg border border-[#E2E8E4] px-3 py-1.5 text-[11px] text-[#64748B] shadow-sm">
        <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded" style={{ background: LEFTOVER_FILL }} /> Leftover / waste</span>
        <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-[#16A34A]" /> Placed piece</span>
        {source.unplaced?.length > 0 && <span className="text-amber-600 font-medium">{source.unplaced.length} unplaced</span>}
>>>>>>> 89864b9d989ae3713185c0da5120642180b714ad
      </div>
    </div>
  );
}
