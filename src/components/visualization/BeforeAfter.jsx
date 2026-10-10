import React, { useState } from 'react';
import { ArrowRight, AlertTriangle } from 'lucide-react';
import { useProject } from '@/lib/ProjectContext';
import View2D from './View2D';

function StatPill({ label, value, highlight }) {
  return (
    <div className={`rounded-xl px-3 py-2 ${highlight ? 'bg-card' : 'bg-background'}`}>
      <div className="text-[11px] text-muted-foreground font-medium">{label}</div>
      <div className="text-sm font-bold text-foreground">{value}</div>
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
        <span className="text-xs font-semibold bg-card/30 px-2 py-0.5 rounded-full">{data.sheets.length} sheet{data.sheets.length !== 1 ? 's' : ''}</span>
      </div>
      <div className="bg-card border border-t-0 border-border rounded-b-xl p-2">
        <View2D layoutSource={data === baseline ? 'baseline' : 'layout'} height={340} />
      </div>
    </div>
  );

  return (
    <div className="bg-background rounded-2xl border border-border p-4">
      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
        <h3 className="font-display font-bold text-foreground">Before vs. After comparison</h3>
        <div className="flex items-center gap-1 bg-card rounded-lg border border-border p-1">
          <button onClick={() => setMode('side')} className={`px-3 py-1.5 rounded-md text-xs font-semibold ${mode === 'side' ? 'bg-strong text-strong-foreground' : 'text-muted-foreground'}`}>Side by side</button>
          <button onClick={() => setMode('toggle')} className={`px-3 py-1.5 rounded-md text-xs font-semibold ${mode === 'toggle' ? 'bg-strong text-strong-foreground' : 'text-muted-foreground'}`}>Toggle</button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-3">
        {mode === 'side' ? (
          <>
            {renderPanel(baseline, 'Before — Baseline', 'Row/shelf packing', 'bg-card text-muted-foreground')}
            {renderPanel(layout, 'After — ScrapSmart', 'MaxRects-BSSF optimized', 'bg-card text-secondary-accent')}
          </>
        ) : (
          <>
            {toggleSide === 'before'
              ? renderPanel(baseline, 'Before — Baseline', 'Row/shelf packing', 'bg-card text-muted-foreground')
              : renderPanel(layout, 'After — ScrapSmart', 'MaxRects-BSSF optimized', 'bg-card text-secondary-accent')}
          </>
        )}
      </div>

      {mode === 'toggle' && (
        <div className="mt-3 flex justify-center">
          <button
            onClick={() => setToggleSide((t) => (t === 'before' ? 'after' : 'before'))}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary-accent text-secondary-accent-foreground text-sm font-semibold hover:bg-primary-hover"
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
        <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-card text-secondary-accent text-sm font-semibold">
          <ArrowRight className="w-4 h-4" />
          {savedSheets > 0
            ? `${savedSheets} fewer sheet${savedSheets > 1 ? 's' : ''} · $${savings.toFixed(2)} saved · ${utilGain.toFixed(1)}% better utilization`
            : `Same sheet count · $0 purchasing saved · ${utilGain.toFixed(1)}% better packing utilization`}
        </div>
        {(baseline.unplaced.length > 0 || layout.unplaced.length > 0) && (
          <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-card text-secondary-accent text-xs font-medium">
            <AlertTriangle className="w-4 h-4" />
            {layout.unplaced.length > 0 ? `${layout.unplaced.length} piece(s) could not be placed` : 'Baseline left pieces unplaced'}
          </div>
        )}
      </div>
    </div>
  );
}
