import React from 'react';
import { ArrowRight, ArrowLeft, Zap, Loader2, Layers, Sparkles, PlayCircle } from 'lucide-react';
import { useProject } from '@/lib/ProjectContext';
import Stepper from '@/components/layout/Stepper';
import MaterialSelector from '@/components/materials/MaterialSelector';
import SheetConfig from '@/components/sheet/SheetConfig';
import CutListTable from '@/components/cutlist/CutListTable';
import Workspace from '@/components/visualization/Workspace';
import PieceInspector from '@/components/visualization/PieceInspector';
import AnalyticsDashboard from '@/components/analytics/AnalyticsDashboard';
import BeforeAfter from '@/components/visualization/BeforeAfter';
import OptimizationAnimation from '@/components/visualization/OptimizationAnimation';
import ExportBar from '@/components/visualization/ExportBar';
import { areaInUnit } from '@/lib/geometry';

export default function Home() {
  const {
    step, setStep, material, pieces, layout, baseline, optimizing, runOptimization,
    selectedInstanceId, setSelectedInstanceId, matDef, loadDemo,
  } = useProject();

  const totalPieces = pieces.reduce((s, p) => s + Math.max(1, Math.round(p.quantity || 1)), 0);
  const totalArea = pieces.reduce((s, p) => s + p.width * p.height * Math.max(1, Math.round(p.quantity || 1)), 0);
  const u = material.unit;

  return (
    <div className="p-4 sm:p-6 max-w-[1500px] mx-auto">
      <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
        <Stepper />
        <div className="flex items-center gap-2">
          <button onClick={loadDemo} className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-secondary-accent text-secondary-accent-foreground text-sm font-semibold hover:bg-primary-hover transition">
            <PlayCircle className="w-4 h-4" /> View sample results
          </button>
          {step > 1 && (
            <button onClick={() => setStep(step - 1)} className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-border text-sm font-medium text-muted-foreground hover:bg-card transition">
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
          )}
          {step < 3 && (
            <button onClick={() => setStep(step + 1)} className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary-hover transition">
              Continue <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Step 1 — Material */}
      {step === 1 && (
        <div className="space-y-5">
          <MaterialSelector />
          <SheetConfig />
          <div className="flex justify-end">
            <button onClick={() => setStep(2)} className="flex items-center gap-1.5 px-5 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary-hover transition">
              Continue to Pieces <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Step 2 — Pieces */}
      {step === 2 && (
        <div className="space-y-5">
          <CutListTable />
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="text-sm text-muted-foreground">
              {totalPieces} piece{totalPieces !== 1 ? 's' : ''} · {areaInUnit(totalArea, u).toFixed(0)} {u === 'in' ? 'in²' : 'cm²'} required
            </div>
            <button
              onClick={() => setStep(3)}
              disabled={pieces.length === 0}
              className="flex items-center gap-1.5 px-5 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary-hover transition disabled:opacity-40"
            >
              Ready to Optimize <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Step 3 — Optimize */}
      {step === 3 && (
        <div className="space-y-5">
          <div className="bg-card rounded-2xl border border-border p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-11 h-11 rounded-xl bg-card flex items-center justify-center">
                <Zap className="w-5 h-5 text-secondary-accent" />
              </div>
              <div>
                <h2 className="font-display font-bold text-lg text-foreground">Optimize your layout</h2>
                <p className="text-sm text-muted-foreground">ScrapSmart runs a MaxRects Best-Short-Side-Fit packing algorithm on your pieces.</p>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
              <div className="rounded-xl bg-background p-3">
                <div className="text-xs text-muted-foreground">Material</div>
                <div className="font-semibold text-foreground">{matDef.name}</div>
              </div>
              <div className="rounded-xl bg-background p-3">
                <div className="text-xs text-muted-foreground">Sheet</div>
                <div className="font-semibold text-foreground">{material.sheetWidth}×{material.sheetHeight}mm</div>
              </div>
              <div className="rounded-xl bg-background p-3">
                <div className="text-xs text-muted-foreground">Pieces</div>
                <div className="font-semibold text-foreground">{totalPieces}</div>
              </div>
              <div className="rounded-xl bg-background p-3">
                <div className="text-xs text-muted-foreground">Kerf</div>
                <div className="font-semibold text-foreground">{material.kerf}mm</div>
              </div>
            </div>
            <button
              onClick={runOptimization}
              disabled={optimizing || pieces.length === 0}
              className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-strong text-strong-foreground font-display font-bold text-base hover:bg-primary-hover transition disabled:opacity-50 shadow-lg shadow-strong/20"
            >
              {optimizing ? <Loader2 className="w-5 h-5 animate-spin" /> : <Zap className="w-5 h-5" />}
              {optimizing ? 'Optimizing…' : 'Optimize Layout'}
            </button>
            <p className="text-xs text-muted-foreground text-center mt-2">
              Result labeled "Best Layout Found" — not guaranteed globally optimal. Kerf reserves blade width; it does not by itself produce a saw sequence.
            </p>
          </div>
        </div>
      )}

      {/* Step 4 — Results */}
      {step === 4 && layout && (
        <div className="space-y-5">
          {/* Validation banner */}
          {layout.validation && !layout.validation.valid && (
            <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-card border border-border text-secondary-accent text-sm">
              <Layers className="w-4 h-4" /> Layout validation found issues: {layout.validation.errors.slice(0, 2).join('; ')}
            </div>
          )}
          {layout.unplaced.length > 0 && (
            <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-card border border-border text-secondary-accent text-sm">
              {layout.unplaced.length} piece(s) could not be placed: {layout.unplaced.map((p) => p.name).join(', ')}. Try more sheets or smaller pieces.
            </div>
          )}

          <div className="grid grid-cols-1 xl:grid-cols-[1fr_320px] gap-5">
            <div className="space-y-5">
              <Workspace />
              <div className="bg-card rounded-2xl border border-border p-4">
                <div className="flex items-center gap-2 mb-3">
                  <PlayCircle className="w-5 h-5 text-secondary-accent" />
                  <h3 className="font-display font-bold text-foreground">Placement animation</h3>
                </div>
                <OptimizationAnimation height={360} />
              </div>
            </div>
            <div className="space-y-5">
              <PieceInspector />
              <div className="bg-card rounded-2xl border border-border p-4">
                <h3 className="font-display font-bold text-foreground mb-3">Export</h3>
                <ExportBar />
              </div>
              <div className="bg-secondary-accent text-secondary-accent-foreground rounded-2xl p-4">
                <div className="flex items-center gap-2 mb-1">
                  <Sparkles className="w-4 h-4 text-primary-foreground" />
                  <span className="font-semibold text-sm">Tip</span>
                </div>
                <p className="text-xs text-primary-foreground/80">Click any piece in the 2D or 3D view to inspect it. The selection stays in sync across both views.</p>
              </div>
            </div>
          </div>

          <AnalyticsDashboard />
          <BeforeAfter />
        </div>
      )}

      {step === 4 && !layout && (
        <div className="bg-card rounded-2xl border border-border p-10 text-center">
          <p className="text-muted-foreground">No layout yet. Go back and run the optimizer.</p>
          <button onClick={() => setStep(3)} className="mt-3 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-semibold">Back to Optimize</button>
        </div>
      )}
    </div>
  );
}
