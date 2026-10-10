import React from 'react';
import { Shield, Scissors, Compass, Ruler } from 'lucide-react';
import { MATERIALS } from '@/lib/materials';
import { useProject } from '@/lib/ProjectContext';
import MaterialSwatch from '@/components/materials/MaterialSwatch';

export default function MaterialsGuide() {
  const { setMaterial, setStep } = useProject();
  return (
    <div className="material-preserved p-4 sm:p-6 max-w-[1200px] mx-auto">
      <div className="mb-6">
        <h1 className="font-display text-2xl font-bold text-foreground">Materials Guide</h1>
        <p className="text-sm text-muted-foreground mt-1">Everything you need to know before cutting each material in ScrapSmart.</p>
      </div>
      <div className="space-y-5">
        {MATERIALS.map((m) => (
          <div key={m.id} className="bg-card rounded-2xl border border-border p-5 grid grid-cols-1 md:grid-cols-[280px_1fr] gap-5">
            <div>
              <MaterialSwatch material={m} className="h-40" />
              <div className="mt-3 flex items-center justify-between">
                <div>
                  <div className="font-display font-bold text-foreground">{m.name}</div>
                  <div className="text-xs text-muted-foreground">{m.tagline}</div>
                </div>
                <button
                  onClick={() => { setMaterial((prev) => ({ ...prev, type: m.id })); setStep(1); }}
                  className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-card text-primary-hover hover:bg-primary hover:text-primary-foreground transition"
                >
                  Use this
                </button>
              </div>
            </div>
            <div>
              <p className="text-sm text-foreground mb-3">{m.description}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                <div>
                  <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1.5">Typical uses</div>
                  <ul className="space-y-0.5">
                    {m.uses.map((u) => <li key={u} className="text-foreground flex items-center gap-1.5"><span className="w-1 h-1 rounded-full bg-primary" /> {u}</li>)}
                  </ul>
                </div>
                <div>
                  <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1.5">Common sizes (mm)</div>
                  <div className="flex flex-wrap gap-1.5">
                    {m.commonSizes.map((s, i) => <span key={i} className="text-xs px-2 py-1 rounded-md bg-background text-muted-foreground">{s.length}×{s.width}×{s.thickness}</span>)}
                  </div>
                </div>
                <div className="flex items-start gap-2"><Scissors className="w-4 h-4 text-primary-hover mt-0.5 shrink-0" /><span className="text-foreground">{m.cutting}</span></div>
                <div className="flex items-start gap-2"><Compass className="w-4 h-4 text-primary-hover mt-0.5 shrink-0" /><span className="text-foreground">{m.grain}</span></div>
                <div className="flex items-start gap-2 sm:col-span-2"><Shield className="w-4 h-4 text-primary mt-0.5 shrink-0" /><span className="text-primary-hover bg-card px-2 py-1 rounded-md text-xs">{m.safety}</span></div>
              </div>
            </div>
          </div>
        ))}
        <div className="text-xs text-muted-foreground flex items-center gap-1.5"><Ruler className="w-3.5 h-3.5" /> Sizes shown are illustrative common dimensions, not live market prices or guaranteed stock.</div>
      </div>
    </div>
  );
}
