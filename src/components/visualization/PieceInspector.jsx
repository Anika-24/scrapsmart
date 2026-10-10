import React from 'react';
<<<<<<< HEAD
import { Crosshair, CheckCircle2, AlertTriangle, MousePointerClick } from 'lucide-react';
=======
import { Crosshair, RotateCw, CheckCircle2, AlertTriangle, MousePointerClick } from 'lucide-react';
>>>>>>> 89864b9d989ae3713185c0da5120642180b714ad
import { useProject } from '@/lib/ProjectContext';
import { getMaterial } from '@/lib/materials';
import { formatMm } from '@/lib/geometry';

export default function PieceInspector({ onFocus }) {
  const { layout, material, selectedInstanceId, setSelectedInstanceId } = useProject();
  const matDef = getMaterial(material.type);

  if (!selectedInstanceId || !layout) {
    return (
<<<<<<< HEAD
      <div className="bg-card rounded-2xl border border-border p-5 h-full flex flex-col items-center justify-center text-center min-h-[260px]">
        <div className="w-12 h-12 rounded-full bg-background flex items-center justify-center mb-3">
          <MousePointerClick className="w-5 h-5 text-muted-foreground" />
        </div>
        <p className="text-sm font-medium text-muted-foreground">No piece selected</p>
        <p className="text-xs text-muted-foreground mt-1 max-w-[220px]">Click any piece in the 2D or 3D view to inspect its placement details.</p>
=======
      <div className="bg-white rounded-2xl border border-[#E2E8E4] p-5 h-full flex flex-col items-center justify-center text-center min-h-[260px]">
        <div className="w-12 h-12 rounded-full bg-[#F4F7F5] flex items-center justify-center mb-3">
          <MousePointerClick className="w-5 h-5 text-[#94A3B8]" />
        </div>
        <p className="text-sm font-medium text-[#64748B]">No piece selected</p>
        <p className="text-xs text-[#94A3B8] mt-1 max-w-[220px]">Click any piece in the 2D or 3D view to inspect its placement details.</p>
>>>>>>> 89864b9d989ae3713185c0da5120642180b714ad
      </div>
    );
  }

  let found = null;
  let sheetNum = 0;
  for (const s of layout.sheets) {
    const p = s.placements.find((pl) => pl.instanceId === selectedInstanceId);
    if (p) { found = p; sheetNum = s.index; break; }
  }
  if (!found) {
    return (
<<<<<<< HEAD
      <div className="bg-card rounded-2xl border border-border p-5">
        <p className="text-sm text-muted-foreground">Selected piece is not placed in the current layout.</p>
=======
      <div className="bg-white rounded-2xl border border-[#E2E8E4] p-5">
        <p className="text-sm text-[#64748B]">Selected piece is not placed in the current layout.</p>
>>>>>>> 89864b9d989ae3713185c0da5120642180b714ad
      </div>
    );
  }

  const Row = ({ label, value }) => (
<<<<<<< HEAD
    <div className="flex items-center justify-between py-2 border-b border-border last:border-0">
      <span className="text-xs text-muted-foreground">{label}</span>
      <span className="text-sm font-semibold text-foreground">{value}</span>
=======
    <div className="flex items-center justify-between py-2 border-b border-[#F4F7F5] last:border-0">
      <span className="text-xs text-[#64748B]">{label}</span>
      <span className="text-sm font-semibold text-[#172B21]">{value}</span>
>>>>>>> 89864b9d989ae3713185c0da5120642180b714ad
    </div>
  );

  return (
<<<<<<< HEAD
    <div className="bg-card rounded-2xl border border-border p-5">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full" style={{ background: found.color }} />
          <h3 className="font-display font-bold text-foreground">{found.name}</h3>
        </div>
        <button onClick={() => setSelectedInstanceId(null)} className="text-xs text-muted-foreground hover:text-foreground">Clear</button>
=======
    <div className="bg-white rounded-2xl border border-[#E2E8E4] p-5">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full" style={{ background: found.color }} />
          <h3 className="font-display font-bold text-[#172B21]">{found.name}</h3>
        </div>
        <button onClick={() => setSelectedInstanceId(null)} className="text-xs text-[#94A3B8] hover:text-[#172B21]">Clear</button>
>>>>>>> 89864b9d989ae3713185c0da5120642180b714ad
      </div>

      <div className="mb-3">
        <Row label="Piece ID" value={found.pieceId} />
        <Row label="Instance" value={found.instanceId} />
        <Row label="Original size" value={`${formatMm(found.origW || found.w, material.unit)} × ${formatMm(found.origH || found.h, material.unit)}`} />
        <Row label="Placed size" value={`${Math.round(found.w)} × ${Math.round(found.h)} mm`} />
        <Row label="Material" value={matDef.name} />
        <Row label="Thickness" value={formatMm(material.thickness, material.unit)} />
        <Row label="Sheet" value={`#${sheetNum + 1}`} />
        <Row label="Position (X, Y)" value={`${Math.round(found.x)}, ${Math.round(found.y)} mm`} />
        <Row label="Rotation" value={found.rotated ? '90°' : '0°'} />
        <Row label="Rotation allowed" value={found.rotationAllowed ? 'Yes' : 'No'} />
      </div>

<<<<<<< HEAD
      <div className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium ${found.validation === false ? 'bg-card text-primary-hover' : 'bg-card text-primary-hover'}`}>
=======
      <div className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium ${found.validation === false ? 'bg-red-50 text-[#DC2626]' : 'bg-[#DCFCE7] text-[#15803D]'}`}>
>>>>>>> 89864b9d989ae3713185c0da5120642180b714ad
        {found.validation === false ? <AlertTriangle className="w-4 h-4" /> : <CheckCircle2 className="w-4 h-4" />}
        Placement validated
      </div>

      <button
        onClick={() => onFocus && onFocus(found)}
<<<<<<< HEAD
        className="mt-3 w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg bg-secondary-accent text-secondary-accent-foreground text-sm font-semibold hover:bg-primary-hover transition"
=======
        className="mt-3 w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg bg-[#123D26] text-white text-sm font-semibold hover:bg-[#15803D] transition"
>>>>>>> 89864b9d989ae3713185c0da5120642180b714ad
      >
        <Crosshair className="w-4 h-4" /> Focus on Piece
      </button>
    </div>
  );
}
