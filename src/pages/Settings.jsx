import React from 'react';
import { Trash2, Info, Sparkles, Sun, Moon } from 'lucide-react';
import { useProject } from '@/lib/ProjectContext';
import { useTheme } from '@/lib/ThemeContext';

export default function Settings() {
  const { savedProjects, deleteProject } = useProject();
  const { isDark, toggleTheme } = useTheme();

  return (
    <div className="p-4 sm:p-6 max-w-[800px] mx-auto">
      <div className="mb-6">
        <h1 className="font-display text-2xl font-bold text-foreground">Settings</h1>
        <p className="text-sm text-muted-foreground mt-1">Preferences for this demo session.</p>
      </div>

      <div className="space-y-4">
        <div className="bg-card rounded-2xl border border-border p-5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-display font-semibold text-foreground">Dark theme</h3>
              <p className="text-xs text-muted-foreground mt-0.5">Toggle a darker interface.</p>
            </div>
            {isDark ? <Sun className="w-4 h-4 text-primary" aria-hidden="true" /> : <Moon className="w-4 h-4 text-primary" aria-hidden="true" />}
            <button onClick={toggleTheme} role="switch" aria-checked={isDark} aria-label="Dark theme" className={`w-12 h-7 rounded-full border border-border transition ${isDark ? 'bg-primary' : 'bg-card'} relative`}>
              <span className={`absolute top-1 w-5 h-5 rounded-full bg-primary-foreground transition-all ${isDark ? 'left-6' : 'left-1'}`} />
            </button>
          </div>
        </div>

        <div className="material-preserved bg-card rounded-2xl border border-border p-5">
          <div className="flex items-center gap-2 mb-2"><Trash2 className="w-4 h-4 text-primary-hover" /><h3 className="font-display font-semibold text-foreground">Saved projects</h3></div>
          <p className="text-xs text-muted-foreground mb-3">{savedProjects.length} project(s) stored locally.</p>
          {savedProjects.length > 0 && (
            <button onClick={() => savedProjects.forEach((_, i) => deleteProject(0))} className="text-xs font-semibold px-3 py-2 rounded-lg bg-strong text-strong-foreground hover:bg-primary-hover">Clear all saved projects</button>
          )}
        </div>

        <div className="bg-card rounded-2xl border border-border p-5">
          <div className="flex items-center gap-2 mb-2"><Sparkles className="w-4 h-4 text-secondary-accent" /><h3 className="font-display font-semibold text-foreground">AI & Voice</h3></div>
          <p className="text-xs text-muted-foreground">The ScrapSmart AI assistant uses a server-side language model with your live project context. Voice output uses your browser's speech synthesis; voice input uses the browser's speech recognition where available.</p>
        </div>

        <div className="bg-alternate text-foreground rounded-2xl p-5 flex items-start gap-3">
          <Info className="w-5 h-5 text-secondary-accent mt-0.5 shrink-0" />
          <div className="text-sm text-foreground">
            <p className="font-semibold text-foreground mb-1">About ScrapSmart</p>
            ScrapSmart is a material cutting optimization demo. The optimizer is a real MaxRects-BSSF packer. All utilization, waste, and cost figures are computed from the validated layout — nothing is hardcoded.
          </div>
        </div>
      </div>
    </div>
  );
}
