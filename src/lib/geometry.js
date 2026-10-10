// Units, validation, and analytics. Internal unit is millimeters.

export const UNITS = {
  mm: { label: 'mm', toMm: 1, fromMm: 1, step: 1 },
  cm: { label: 'cm', toMm: 10, fromMm: 0.1, step: 0.5 },
  in: { label: 'in', toMm: 25.4, fromMm: 1 / 25.4, step: 0.25 },
};

export const toMm = (value, unit) => value * UNITS[unit].toMm;
export const fromMm = (value, unit) => value * UNITS[unit].fromMm;

export function formatMm(valueMm, unit, digits = 0) {
  const v = fromMm(valueMm, unit);
  const d = unit === 'mm' ? 0 : unit === 'cm' ? 1 : 2;
  return `${Number(v.toFixed(d))} ${UNITS[unit].label}`;
}

export function areaMm2(w, h) {
  return w * h;
}

export function areaInUnit(wMm, hMm, unit) {
  const m2 = (wMm * hMm) / 1_000_000;
  if (unit === 'in') return m2 * 1550.0031; // sq in
  return m2 * 10000; // sq cm
}

/**
 * Validate a layout: bounds, margin, kerf spacing, and overlap.
 */
export function validateLayout(layout, sheet, kerf, margin) {
  const errors = [];
  for (const s of layout.sheets) {
    for (const p of s.placements) {
      if (p.x < margin - 1e-6) errors.push(`${p.name} (#${s.index}) starts before left margin`);
      if (p.y < margin - 1e-6) errors.push(`${p.name} (#${s.index}) starts before top margin`);
      if (p.x + p.w > sheet.width - margin + 1e-6) errors.push(`${p.name} (#${s.index}) exceeds sheet width`);
      if (p.y + p.h > sheet.height - margin + 1e-6) errors.push(`${p.name} (#${s.index}) exceeds sheet height`);
    }
    for (let i = 0; i < s.placements.length; i++) {
      for (let j = i + 1; j < s.placements.length; j++) {
        const a = s.placements[i];
        const b = s.placements[j];
        const overlap = !(
          a.x + a.w + kerf <= b.x + 1e-6 ||
          b.x + b.w + kerf <= a.x + 1e-6 ||
          a.y + a.h + kerf <= b.y + 1e-6 ||
          b.y + b.h + kerf <= a.y + 1e-6
        );
        if (overlap) errors.push(`${a.name} overlaps ${b.name} on sheet ${s.index}`);
      }
    }
  }
  return { valid: errors.length === 0, errors };
}

/**
 * Compute analytics from a validated layout. All areas in mm².
 */
export function computeStats(layout, sheet, pieces, pricePerSheet) {
  const sheetsUsed = layout.sheets.length;
  const totalSheetArea = sheetsUsed * sheet.width * sheet.height;
  let placedArea = 0;
  let placedCount = 0;
  for (const s of layout.sheets) {
    for (const p of s.placements) {
      placedArea += p.w * p.h;
      placedCount += 1;
    }
  }
  const usableSheetArea = sheetsUsed * (sheet.width - 0) * (sheet.height - 0);
  const utilization = usableSheetArea > 0 ? (placedArea / usableSheetArea) * 100 : 0;
  const waste = usableSheetArea > 0 ? Math.max(0, 100 - utilization) : 0;
  const leftoverArea = Math.max(0, totalSheetArea - placedArea);
  const totalCost = sheetsUsed * (pricePerSheet || 0);
  const totalPieces = pieces.reduce((sum, p) => sum + Math.max(1, Math.round(p.quantity || 1)), 0);
  const unplacedCount = layout.unplaced.length;
  return {
    sheetsUsed,
    totalSheetArea,
    placedArea,
    placedCount,
    utilization,
    waste,
    leftoverArea,
    totalCost,
    totalPieces,
    unplacedCount,
  };
}

export function clampNumber(v, min, max) {
  if (v === '' || v === null || v === undefined || isNaN(v)) return min;
  return Math.min(max, Math.max(min, Number(v)));
}
