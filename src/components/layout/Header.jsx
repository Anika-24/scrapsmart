import React from 'react';
import { useLocation } from 'react-router-dom';
import { Save, Sun, Moon, HelpCircle, User, Sparkles } from 'lucide-react';
import { useProject } from '@/lib/ProjectContext';
import { useTheme } from '@/lib/ThemeContext';

const STEP_TITLES = {
  1: 'Material',
  2: 'Pieces',
  3: 'Optimize',
  4: 'Results',
};

export default function Header({ onToggleAssistant }) {
  const { projectName, material, matDef, step, saveProject } = useProject();
  const [saved, setSaved] = React.useState(false);
  const { isDark, toggleTheme } = useTheme();
  const location = useLocation();

  const handleSave = () => {
    saveProject();
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  };

  const isWorkspace = location.pathname === '/';

  return (
    <header className="h-16 shrink-0 bg-nav text-nav-foreground border-b border-nav-foreground/20 flex items-center justify-between px-6">
      <div className="flex items-center gap-4 min-w-0">
        <div className="min-w-0">
          <div className="text-[11px] uppercase tracking-wider text-nav-foreground/70 font-semibold">
            {isWorkspace ? `Step ${String(step).padStart(2, '0')} · ${STEP_TITLES[step]}` : 'ScrapSmart'}
          </div>
          <div className="font-display font-semibold text-nav-foreground truncate">{projectName}</div>
        </div>
        <div className="material-preserved hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-card text-primary-hover text-xs font-semibold">
          <span className="w-2 h-2 rounded-full bg-primary" />
          {matDef.name} · {material.sheetWidth}×{material.sheetHeight}mm
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-nav-foreground hover:bg-nav-foreground/10 transition-colors"
        >
          <Save className="w-4 h-4" />
          <span className="hidden sm:inline">{saved ? 'Saved!' : 'Save'}</span>
        </button>
        <button
          onClick={toggleTheme}
          className="w-9 h-9 rounded-lg flex items-center justify-center text-nav-foreground hover:bg-nav-foreground/10 transition-colors"
          title={`Switch to ${isDark ? 'light' : 'dark'} theme`}
          aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
        >
          {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>
        <button
          className="w-9 h-9 rounded-lg flex items-center justify-center text-nav-foreground hover:bg-nav-foreground/10 transition-colors"
          title="Help"
        >
          <HelpCircle className="w-4 h-4" />
        </button>
        <div className="w-9 h-9 rounded-full bg-secondary-accent text-secondary-accent-foreground flex items-center justify-center text-xs font-semibold" title="Guest">
          <User className="w-4 h-4" />
        </div>
        <button
          onClick={onToggleAssistant}
          className="ml-1 flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold bg-primary text-primary-foreground hover:bg-primary-hover transition-colors"
        >
          <Sparkles className="w-4 h-4" />
          <span className="hidden sm:inline">AI</span>
        </button>
      </div>
    </header>
  );
}
