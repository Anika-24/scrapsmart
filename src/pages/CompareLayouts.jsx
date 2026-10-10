import React from 'react';
import { GitCompare, ArrowRight } from 'lucide-react';
import { useProject } from '@/lib/ProjectContext';
import BeforeAfter from '@/components/visualization/BeforeAfter';
import AnalyticsDashboard from '@/components/analytics/AnalyticsDashboard';

export default function CompareLayouts() {
  const { layout, baseline, setStep } = useProject();
  return (
    <div className="p-4 sm:p-6 max-w-[1300px] mx-auto">
      <div className="mb-6">
<<<<<<< HEAD
        <h1 className="font-display text-2xl font-bold text-foreground flex items-center gap-2"><GitCompare className="w-6 h-6 text-secondary-accent" /> Compare Layouts</h1>
        <p className="text-sm text-muted-foreground mt-1">Baseline row-packing vs. ScrapSmart optimized packing, using the same pieces, sheet, kerf, and rotation rules.</p>
=======
        <h1 className="font-display text-2xl font-bold text-[#172B21] flex items-center gap-2"><GitCompare className="w-6 h-6 text-[#15803D]" /> Compare Layouts</h1>
        <p className="text-sm text-[#64748B] mt-1">Baseline row-packing vs. ScrapSmart optimized packing, using the same pieces, sheet, kerf, and rotation rules.</p>
>>>>>>> 89864b9d989ae3713185c0da5120642180b714ad
      </div>
      {layout && baseline ? (
        <div className="space-y-5">
          <BeforeAfter />
          <AnalyticsDashboard />
        </div>
      ) : (
<<<<<<< HEAD
        <div className="bg-card rounded-2xl border border-border p-12 text-center">
          <GitCompare className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
          <p className="text-muted-foreground font-medium">No layout to compare yet</p>
          <p className="text-sm text-muted-foreground mt-1 mb-4">Run the optimizer on the Dashboard first.</p>
          <button onClick={() => setStep(3)} className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary-hover">
=======
        <div className="bg-white rounded-2xl border border-[#E2E8E4] p-12 text-center">
          <GitCompare className="w-10 h-10 text-[#94A3B8] mx-auto mb-3" />
          <p className="text-[#64748B] font-medium">No layout to compare yet</p>
          <p className="text-sm text-[#94A3B8] mt-1 mb-4">Run the optimizer on the Dashboard first.</p>
          <button onClick={() => setStep(3)} className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#16A34A] text-white text-sm font-semibold hover:bg-[#15803D]">
>>>>>>> 89864b9d989ae3713185c0da5120642180b714ad
            Go to Optimize <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
