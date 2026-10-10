import React from 'react';
import { Check } from 'lucide-react';
import { useProject } from '@/lib/ProjectContext';

const STEPS = [
  { n: 1, label: 'Material' },
  { n: 2, label: 'Pieces' },
  { n: 3, label: 'Optimize' },
  { n: 4, label: 'Results' },
];

export default function Stepper() {
  const { step, setStep, layout } = useProject();

  const canGoTo = (n) => {
    if (n <= 2) return true;
    if (n === 3) return true;
    if (n === 4) return !!layout;
    return false;
  };

  return (
<<<<<<< HEAD
    <div className="flex items-center gap-1 sm:gap-2 bg-card rounded-2xl border border-border p-1.5 shadow-sm">
=======
    <div className="flex items-center gap-1 sm:gap-2 bg-white rounded-2xl border border-[#E2E8E4] p-1.5 shadow-sm">
>>>>>>> 89864b9d989ae3713185c0da5120642180b714ad
      {STEPS.map((s, i) => {
        const active = step === s.n;
        const done = step > s.n;
        const enabled = canGoTo(s.n);
        return (
          <div key={s.n} className="contents">
            <button
              disabled={!enabled}
              onClick={() => enabled && setStep(s.n)}
              className={`flex items-center gap-2.5 px-3 sm:px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                active
<<<<<<< HEAD
                  ? 'bg-primary text-primary-foreground shadow'
                  : done
                  ? 'text-secondary-accent hover:bg-card'
                  : enabled
                  ? 'text-muted-foreground hover:bg-background'
                  : 'text-muted-foreground cursor-not-allowed'
=======
                  ? 'bg-[#123D26] text-white shadow'
                  : done
                  ? 'text-[#15803D] hover:bg-[#DCFCE7]'
                  : enabled
                  ? 'text-[#64748B] hover:bg-[#F4F7F5]'
                  : 'text-[#94A3B8] cursor-not-allowed'
>>>>>>> 89864b9d989ae3713185c0da5120642180b714ad
              }`}
            >
              <span
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                  active
<<<<<<< HEAD
                    ? 'bg-primary text-primary-foreground'
                    : done
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-background text-muted-foreground'
=======
                    ? 'bg-[#16A34A] text-white'
                    : done
                    ? 'bg-[#16A34A] text-white'
                    : 'bg-[#F4F7F5] text-[#64748B]'
>>>>>>> 89864b9d989ae3713185c0da5120642180b714ad
                }`}
              >
                {done ? <Check className="w-3.5 h-3.5" /> : String(s.n).padStart(2, '0')}
              </span>
              <span className="hidden sm:inline">{s.label}</span>
            </button>
            {i < STEPS.length - 1 && (
<<<<<<< HEAD
              <div className={`w-4 sm:w-8 h-px ${done ? 'bg-primary' : 'bg-card'}`} />
=======
              <div className={`w-4 sm:w-8 h-px ${done ? 'bg-[#16A34A]' : 'bg-[#E2E8E4]'}`} />
>>>>>>> 89864b9d989ae3713185c0da5120642180b714ad
            )}
          </div>
        );
      })}
    </div>
  );
}
