import React, { useState } from 'react';
import { ArrowRight, AlertTriangle } from 'lucide-react';
import { useProject } from '@/lib/ProjectContext';
import View2D from './View2D';
import { areaInUnit } from '@/lib/geometry';

function StatPill({ label, value, highlight }) {
  return (
    <div className={`rounded-xl px-3 py-2 ${highlight ? 'bg-[#DCFCE7]' : 'bg-[#F4F7F5]'}`}>
      <div className="text-[11px] text-[#64748B] font-medium">{label}</div>
      <div className="text-sm font-bold text-[#172B21]">{value}</div>
    </div>
  );
}

export default function BeforeAfter() {
  const { layout, baseline, material } = useProject();
  const [mode, setMode] = useState('side'); // side | toggle
  const [toggleSide, setToggleSide] = useState('after');

  if (!layout || !baseline) return null;
  const u = material.unit;
  const areaUnit = u === 'in' ? 'in²' : 'cm²';
  const b = baseline.stats;
  const a = layout.stats;
  const savedSheets = Math.max(0, b.sheetsUsed - a.sheetsUsed);
  const savings = Math.max(0, b.totalCost - a.totalCost);
  const utilGain = Math.max(0, a.utilization - b.utilization);

  const renderPanel = (data, title, subtitle, accent) => (
    <div className="flex-1 min-w-0">
      <div className={`flex items-center justify-between px-3 py-2 rounded-t-xl ${accent}`}>
        <div>
          <div className="text-xs font-bold uppercase tracking-wide">{title}</div>
          <div className="text-[11px] opacity-80">{subtitle}</div>
        </div>
        <span className="text-xs font-semibold bg-white/30 px-2 py-0.5 rounded-full">{data.sheets.length} sheet{data.sheets.length !== 1 ? 's' : ''}</span>
      </div>
      <div className="bg-white border border-t-0 border-[#E2E8E4] rounded-b-xl p-2">
        <View2D layoutSource={data === baseline ? 'baseline' : 'layout'} height={340} />
      </div>
    </div>
  );

  return (
    <div className="bg-[#F4F7F5] rounded-2xl border border-[#E2E8E4] p-4">
      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
        <h3 className="font-display font-bold text-[#172B21]">Before vs. After comparison</h3>
        <div className="flex items-center gap-1 bg-white rounded-lg border border-[#E2E8E4] p-1">
          <button onClick={() => setMode('side')} className={`px-3 py-1.5 rounded-md text-xs font-semibold ${mode === 'side' ? 'bg-[#123D26] text-white' : 'text-[#64748B]'}`}>Side by side</button>
          <button onClick={() => setMode('toggle')} className={`px-3 py-1.5 rounded-md text-xs font-semibold ${mode === 'toggle' ? 'bg-[#123D26] text-white' : 'text-[#64748B]'}`}>Toggle</button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-3">
        {mode === 'side' ? (
          <>
            {renderPanel(baseline, 'Before — Baseline', 'Row/shelf packing', 'bg-slate-200 text-slate-700')}
            {renderPanel(layout, 'After — ScrapSmart', 'MaxRects-BSSF optimized', 'bg-[#DCFCE7] text-[#15803D]')}
          </>
        ) : (
          <>
            {toggleSide === 'before'
              ? renderPanel(baseline, 'Before — Baseline', 'Row/shelf packing', 'bg-slate-200 text-slate-700')
              : renderPanel(layout, 'After — ScrapSmart', 'MaxRects-BSSF optimized', 'bg-[#DCFCE7] text-[#15803D]')}
          </>
        )}
      </div>

      {mode === 'toggle' && (
        <div className="mt-3 flex justify-center">
          <button
            onClick={() => setToggleSide((t) => (t === 'before' ? 'after' : 'before'))}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#123D26] text-white text-sm font-semibold hover:bg-[#15803D]"
          >
            Show {toggleSide === 'before' ? 'After (Optimized)' : 'Before (Baseline)'} <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Comparison stats */}
      <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-2">
        <StatPill label="Sheets — Before" value={b.sheetsUsed} />
        <StatPill label="Sheets — After" value={a.sheetsUsed} highlight={savedSheets > 0} />
        <StatPill label="Utilization — Before" value={`${b.utilization.toFixed(1)}%`} />
        <StatPill label="Utilization — After" value={`${a.utilization.toFixed(1)}%`} highlight={utilGain > 0} />
        <StatPill label="Waste — Before" value={`${b.waste.toFixed(1)}%`} />
        <StatPill label="Waste — After" value={`${a.waste.toFixed(1)}%`} highlight={utilGain > 0} />
        <StatPill label="Cost — Before" value={`$${b.totalCost.toFixed(2)}`} />
        <StatPill label="Cost — After" value={`$${a.totalCost.toFixed(2)}`} highlight={savings > 0} />
      </div>

      <div className="mt-3 flex items-center gap-2 flex-wrap">
        <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[#DCFCE7] text-[#15803D] text-sm font-semibold">
          <ArrowRight className="w-4 h-4" />
          {savedSheets > 0
            ? `${savedSheets} fewer sheet${savedSheets > 1 ? 's' : ''} · $${savings.toFixed(2)} saved · ${utilGain.toFixed(1)}% better utilization`
            : `Same sheet count · $0 purchasing saved · ${utilGain.toFixed(1)}% better packing utilization`}
        </div>
        {(baseline.unplaced.length > 0 || layout.unplaced.length > 0) && (
          <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-amber-50 text-amber-700 text-xs font-medium">
            <AlertTriangle className="w-4 h-4" />
            {layout.unplaced.length > 0 ? `${layout.unplaced.length} piece(s) could not be placed` : 'Baseline left pieces unplaced'}
          </div>
        )}
      </div>
    </div>
  );
}
