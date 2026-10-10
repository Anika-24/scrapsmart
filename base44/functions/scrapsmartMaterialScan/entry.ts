import { createClientFromRequest } from 'npm:@base44/sdk@0.8.52';

const schema = {
  type: 'object',
  properties: {
    category: { type: 'string', enum: ['plywood', 'mdf', 'solid_wood', 'acrylic', 'cardboard', 'metal', 'unknown'] },
    confidence: { type: 'number', minimum: 0, maximum: 1 },
    observations: { type: 'string' },
    condition: { type: 'string' },
  },
  required: ['category', 'observations', 'condition'],
};

export default async function(req) {
  if (req.method !== 'POST') return Response.json({ error: 'Method not allowed' }, { status: 405 });
  try {
    const base44 = createClientFromRequest(req);
    const { imageUrl } = await req.json();
    if (typeof imageUrl !== 'string' || !/^https:\/\//i.test(imageUrl)) {
      return Response.json({ error: 'A valid uploaded image URL is required.' }, { status: 400 });
    }
    const result = await base44.asServiceRole.integrations.Core.InvokeLLM({
      prompt: 'Inspect the attached photo for visually observable sheet material only. Classify as plywood, MDF, solid_wood, acrylic, cardboard, metal, or unknown. Do not infer exact composition, thickness, dimensions, density, or hidden structure. If ambiguous use unknown and describe the uncertainty. Describe visible surface texture, color, grain, edges, and condition. Confidence must be between 0 and 1 and reflect visual certainty; omit it if no meaningful estimate can be made.',
      file_urls: [imageUrl],
      response_json_schema: schema,
    });
    if (!result || typeof result !== 'object' || typeof result.category !== 'string' || typeof result.observations !== 'string') {
      return Response.json({ error: 'The image analysis service returned an invalid response. Please retry.' }, { status: 502 });
    }
    return Response.json(result);
  } catch (error) {
    return Response.json({ error: error?.message || 'Material analysis service is unavailable. Check Base44 AI integration configuration.' }, { status: 502 });
  }
}
