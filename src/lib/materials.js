// Material catalog. Each material carries 3D rendering parameters used by the
// Three.js scene so the sheet and pieces look recognizably different.

export const MATERIALS = [
  {
    id: 'plywood',
    name: 'Plywood',
    tagline: 'Layered wood veneer',
<<<<<<< HEAD
    base: '#e0bb86',
    edge: '#a87440',
    texture: {
      type: 'plywood',
      grain: '#b98a56',
      layers: ['#c79a62', '#a87440'],
    },
=======
    base: '#C8A06A',
    edge: '#8B5E34',
>>>>>>> 89864b9d989ae3713185c0da5120642180b714ad
    description:
      'Engineered wood made of thin veneer layers glued together. Strong, lightweight, and ideal for furniture, cabinetry, and structural panels.',
    uses: ['Cabinetry', 'Furniture frames', 'Subflooring', 'Wall panels'],
    commonSizes: [
      { length: 2440, width: 1220, thickness: 18 },
      { length: 2440, width: 1220, thickness: 12 },
      { length: 1220, width: 610, thickness: 6 },
    ],
    cutting: 'Cross-cut veneer can splinter — use a fine-tooth blade and support the sheet fully.',
    grain: 'Grain runs along the long axis. Rotating pieces across the grain weakens the visible face.',
    safety: 'Wear a dust mask — some adhesives release urea-formaldehyde when cut.',
    // 3D params
    three: {
<<<<<<< HEAD
=======
      kind: 'wood',
      color: '#C8A06A',
      edgeColor: '#8B5E34',
>>>>>>> 89864b9d989ae3713185c0da5120642180b714ad
      roughness: 0.85,
      metalness: 0.0,
      opacity: 1,
      transmission: 0,
      clearcoat: 0,
    },
  },
  {
    id: 'mdf',
    name: 'MDF',
    tagline: 'Medium-density fibreboard',
<<<<<<< HEAD
    base: '#a98660',
    edge: '#8f6b43',
    texture: { type: 'mdf', speckle: '#8f6b43' },
=======
    base: '#C9A97A',
    edge: '#A07A4A',
>>>>>>> 89864b9d989ae3713185c0da5120642180b714ad
    description:
      'Smooth, uniform panel of compressed wood fibres and resin. Machines cleanly and paints beautifully, but is heavy and absorbs moisture.',
    uses: ['Painted cabinets', 'Laser-cut templates', 'Speaker boxes', 'Decorative trim'],
    commonSizes: [
      { length: 2440, width: 1220, thickness: 18 },
      { length: 2440, width: 1220, thickness: 6 },
      { length: 1830, width: 610, thickness: 12 },
    ],
    cutting: 'Produces very fine dust — use dust extraction and a down-cut blade to avoid edge tear-out.',
    grain: 'No grain direction — rotation does not affect strength.',
    safety: 'Fine dust is a respiratory irritant. Use a mask and extraction.',
    three: {
<<<<<<< HEAD
=======
      kind: 'mdf',
      color: '#C9A97A',
      edgeColor: '#A07A4A',
>>>>>>> 89864b9d989ae3713185c0da5120642180b714ad
      roughness: 0.95,
      metalness: 0.0,
      opacity: 1,
      transmission: 0,
      clearcoat: 0,
    },
  },
  {
    id: 'acrylic',
    name: 'Acrylic',
    tagline: 'Clear cast plastic',
<<<<<<< HEAD
    base: '#d6f1f7',
    edge: '#6cc3d6',
    texture: { type: 'acrylic', highlight: '#efead8', gradientEnd: '#8fd3e3' },
=======
    base: '#7FB7E8',
    edge: '#BFE0F7',
>>>>>>> 89864b9d989ae3713185c0da5120642180b714ad
    description:
      'Rigid, transparent plastic with a glass-like finish. Cuts cleanly on a laser or fine router; edges can be flame-polished.',
    uses: ['Signage', 'Display cases', 'Light diffusers', 'Guards & shields'],
    commonSizes: [
      { length: 1220, width: 610, thickness: 5 },
      { length: 1220, width: 610, thickness: 3 },
      { length: 600, width: 400, thickness: 8 },
    ],
    cutting: 'Score-and-snap for thin sheets, or laser cut. Drilling too fast causes cracking.',
    grain: 'No grain — rotation is free.',
    safety: 'Ventilate when laser cutting — fumes are harmful.',
    three: {
<<<<<<< HEAD
=======
      kind: 'acrylic',
      color: '#7FB7E8',
      edgeColor: '#D6EEFB',
>>>>>>> 89864b9d989ae3713185c0da5120642180b714ad
      roughness: 0.05,
      metalness: 0.0,
      opacity: 0.55,
      transmission: 0.6,
      clearcoat: 1,
    },
  },
  {
    id: 'cardboard',
    name: 'Cardboard',
    tagline: 'Corrugated kraft board',
<<<<<<< HEAD
    base: '#c19a6b',
    edge: '#8c6239',
    texture: { type: 'cardboard', flute: '#a67c4e' },
=======
    base: '#C9A06A',
    edge: '#A07A4A',
>>>>>>> 89864b9d989ae3713185c0da5120642180b714ad
    description:
      'Lightweight corrugated kraft paper. Cheap, recyclable, and easy to knife-cut. Used for packaging, prototypes, and templates.',
    uses: ['Packaging', 'Prototyping', 'Templates', 'Signage'],
    commonSizes: [
      { length: 1200, width: 800, thickness: 5 },
      { length: 1000, width: 700, thickness: 3 },
      { length: 800, width: 600, thickness: 8 },
    ],
    cutting: 'Use a sharp utility knife on a cutting mat — a dull blade tears the flutes.',
    grain: 'Flutes run one direction; folding across them is easier than along them.',
    safety: 'Keep dry — loses strength rapidly when wet.',
    three: {
<<<<<<< HEAD
=======
      kind: 'cardboard',
      color: '#C9A06A',
      edgeColor: '#8A6A3A',
>>>>>>> 89864b9d989ae3713185c0da5120642180b714ad
      roughness: 1.0,
      metalness: 0.0,
      opacity: 1,
      transmission: 0,
      clearcoat: 0,
    },
  },
  {
    id: 'metal',
    name: 'Metal',
    tagline: 'Brushed aluminium sheet',
<<<<<<< HEAD
    base: '#cfd4d9',
    edge: '#7b838b',
    texture: { type: 'metal', gradientEnd: '#9aa1a8', brushedLine: '#7b838b' },
=======
    base: '#C7CCD1',
    edge: '#9AA3AB',
>>>>>>> 89864b9d989ae3713185c0da5120642180b714ad
    description:
      'Brushed aluminium sheet — lightweight, corrosion-resistant, and machinable. Used for panels, brackets, and enclosures.',
    uses: ['Enclosures', 'Brackets', 'Face panels', 'Trim'],
    commonSizes: [
      { length: 1220, width: 610, thickness: 3 },
      { length: 1000, width: 500, thickness: 2 },
      { length: 600, width: 400, thickness: 1.5 },
    ],
    cutting: 'Use a carbide blade, slow feed, and lubrication. Deburr sharp edges after cutting.',
    grain: 'No grain — rotation is free. Brushing direction is cosmetic only.',
    safety: 'Edges are sharp after cutting — wear gloves and deburr.',
    three: {
<<<<<<< HEAD
=======
      kind: 'metal',
      color: '#C7CCD1',
      edgeColor: '#9AA3AB',
>>>>>>> 89864b9d989ae3713185c0da5120642180b714ad
      roughness: 0.35,
      metalness: 1.0,
      opacity: 1,
      transmission: 0,
      clearcoat: 0.6,
    },
  },
];

export const MATERIAL_MAP = Object.fromEntries(MATERIALS.map((m) => [m.id, m]));

export function getMaterial(id) {
  return MATERIAL_MAP[id] || MATERIALS[0];
}

<<<<<<< HEAD
export function getMaterialTextureStyle(material) {
  const texture = material.texture;
  switch (texture.type) {
    case 'plywood':
      return {
        background: `repeating-linear-gradient(0deg, ${texture.grain} 0 1px, transparent 1px 8px), linear-gradient(${material.base}, ${material.base})`,
      };
    case 'mdf':
      return {
        background: `radial-gradient(circle, ${texture.speckle} 0.8px, transparent 1px) 0 0 / 6px 6px, linear-gradient(${material.base}, ${material.base})`,
      };
    case 'acrylic':
      return {
        background: `linear-gradient(125deg, transparent 34%, ${texture.highlight} 48%, transparent 61%), linear-gradient(135deg, ${material.base}, ${texture.gradientEnd})`,
      };
    case 'cardboard':
      return {
        background: `repeating-linear-gradient(90deg, ${texture.flute} 0 2px, transparent 2px 7px), linear-gradient(${material.base}, ${material.base})`,
      };
    case 'metal':
      return {
        background: `repeating-linear-gradient(0deg, ${texture.brushedLine}55 0 1px, transparent 1px 4px), linear-gradient(90deg, ${material.base}, ${texture.gradientEnd})`,
      };
    default:
      return { background: material.base };
  }
}

// A stable palette for piece identification overlays.
export const PIECE_COLORS = [
  '#2e7d7a', '#00555a', '#2e7d7a', '#00555a', '#00555a',
  '#00555a', '#2e7d7a', '#2e7d7a', '#00555a', '#00555a',
=======
// A stable palette for piece identification overlays.
export const PIECE_COLORS = [
  '#16A34A', '#15803D', '#0EA5E9', '#6366F1', '#F59E0B',
  '#EF4444', '#EC4899', '#14B8A6', '#8B5CF6', '#F97316',
>>>>>>> 89864b9d989ae3713185c0da5120642180b714ad
];
