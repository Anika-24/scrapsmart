import React from 'react';
import { Check } from 'lucide-react';
import { MATERIALS } from '@/lib/materials';
import { useProject } from '@/lib/ProjectContext';
import MaterialSwatch from './MaterialSwatch';

export default function MaterialSelector() {
  const { material, setMaterial } = useProject();

  return (
    <div className="material-preserved">
      <div className="mb-4">
        <h2 className="font-display text-xl font-bold text-foreground">Choose your material</h2>
        <p className="text-sm text-muted-foreground mt-0.5">The 3D sheet and pieces will render to match the real material surface.</p>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {MATERIALS.map((m) => {
          const active = material.type === m.id;
          return (
            <button
              key={m.id}
              onClick={() => setMaterial((prev) => ({ ...prev, type: m.id }))}
              className={`text-left rounded-2xl border-2 p-3 transition-all hover:shadow-md ${
                active ? 'border-primary bg-card/40 ring-2 ring-primary/20' : 'border-border bg-card hover:border-primary/40'
              }`}
            >
              <MaterialSwatch material={m} />
              <div className="mt-3 flex items-start justify-between">
                <div>
                  <div className="font-semibold text-sm text-foreground">{m.name}</div>
                  <div className="text-[11px] text-muted-foreground">{m.tagline}</div>
                </div>
                {active && (
                  <span className="w-5 h-5 rounded-full bg-primary text-primary-foreground flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3" />
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
