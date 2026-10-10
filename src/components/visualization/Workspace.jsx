import React from 'react';
import { Box, Square, Columns2, GitCompare } from 'lucide-react';
import { useProject } from '@/lib/ProjectContext';
import View2D from './View2D';
import View3D from './View3D';
import BeforeAfter from './BeforeAfter';

const MODES = [
  { id: '3d', label: '3D View', icon: Box },
  { id: '2d', label: '2D View', icon: Square },
  { id: 'split', label: 'Split View', icon: Columns2 },
  { id: 'compare', label: 'Compare', icon: GitCompare },
];

export default function Workspace() {
  const { viewMode, setViewMode, layout } = useProject();

  return (
    <div>
      <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
<<<<<<< HEAD
        <div className="flex items-center gap-1 bg-card rounded-xl border border-border p-1 shadow-sm">
=======
        <div className="flex items-center gap-1 bg-white rounded-xl border border-[#E2E8E4] p-1 shadow-sm">
>>>>>>> 89864b9d989ae3713185c0da5120642180b714ad
          {MODES.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setViewMode(id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition ${
<<<<<<< HEAD
                viewMode === id ? 'bg-strong text-strong-foreground' : 'text-muted-foreground hover:bg-background'
=======
                viewMode === id ? 'bg-[#123D26] text-white' : 'text-[#64748B] hover:bg-[#F4F7F5]'
>>>>>>> 89864b9d989ae3713185c0da5120642180b714ad
              }`}
            >
              <Icon className="w-4 h-4" /> {label}
            </button>
          ))}
        </div>
      </div>

<<<<<<< HEAD
      <div className="bg-card rounded-2xl border border-border p-3">
=======
      <div className="bg-white rounded-2xl border border-[#E2E8E4] p-3">
>>>>>>> 89864b9d989ae3713185c0da5120642180b714ad
        {viewMode === '3d' && <View3D height={520} />}
        {viewMode === '2d' && <View2D height={520} />}
        {viewMode === 'split' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
            <div>
<<<<<<< HEAD
              <div className="text-xs font-semibold text-muted-foreground mb-1.5 px-1">2D Plan</div>
              <View2D height={420} />
            </div>
            <div>
              <div className="text-xs font-semibold text-muted-foreground mb-1.5 px-1">3D Simulation</div>
=======
              <div className="text-xs font-semibold text-[#64748B] mb-1.5 px-1">2D Plan</div>
              <View2D height={420} />
            </div>
            <div>
              <div className="text-xs font-semibold text-[#64748B] mb-1.5 px-1">3D Simulation</div>
>>>>>>> 89864b9d989ae3713185c0da5120642180b714ad
              <View3D height={420} />
            </div>
          </div>
        )}
        {viewMode === 'compare' && <BeforeAfter />}
      </div>

      {!layout && (
<<<<<<< HEAD
        <div className="mt-3 text-center text-sm text-muted-foreground">
=======
        <div className="mt-3 text-center text-sm text-[#94A3B8]">
>>>>>>> 89864b9d989ae3713185c0da5120642180b714ad
          No layout yet — complete the Material and Pieces steps, then run Optimize.
        </div>
      )}
    </div>
  );
}
