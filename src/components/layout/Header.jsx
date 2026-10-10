import React from 'react';
<<<<<<< HEAD
import { useLocation } from 'react-router-dom';
import { Save, Sun, Moon, HelpCircle, User, Sparkles } from 'lucide-react';
import { useProject } from '@/lib/ProjectContext';
import { useTheme } from '@/lib/ThemeContext';
import { toast } from '@/components/ui/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
=======
import { Link, useLocation } from 'react-router-dom';
import { Save, Sun, Moon, HelpCircle, User, Sparkles } from 'lucide-react';
import { useProject } from '@/lib/ProjectContext';
import { getMaterial } from '@/lib/materials';
>>>>>>> 89864b9d989ae3713185c0da5120642180b714ad

const STEP_TITLES = {
  1: 'Material',
  2: 'Pieces',
  3: 'Optimize',
  4: 'Results',
};

export default function Header({ onToggleAssistant }) {
<<<<<<< HEAD
  const { projectName, material, matDef, step, saveProject, savedProjects } = useProject();
  const [saveDialogOpen, setSaveDialogOpen] = React.useState(false);
  const [draftName, setDraftName] = React.useState('');
  const [overwriteConfirmed, setOverwriteConfirmed] = React.useState(false);
  const nameInputRef = React.useRef(null);
  const { isDark, toggleTheme } = useTheme();
  const location = useLocation();

  const openSaveDialog = () => {
    setDraftName(projectName === 'Untitled Project' ? '' : projectName);
    setOverwriteConfirmed(false);
    setSaveDialogOpen(true);
  };

  const normalizedName = draftName.trim();
  const nameError = !normalizedName
    ? 'Project name is required.'
    : normalizedName.length > 60
      ? 'Project name must be 60 characters or fewer.'
      : '';
  const hasNameConflict = Boolean(normalizedName) && savedProjects.some(
    (project) => project.name?.trim().toLocaleLowerCase() === normalizedName.toLocaleLowerCase()
  );

  const handleSave = (event) => {
    event.preventDefault();
    if (nameError) return;
    if (hasNameConflict && !overwriteConfirmed) {
      setOverwriteConfirmed(true);
      return;
    }

    saveProject(normalizedName);
    setSaveDialogOpen(false);
    toast({ title: `Saved as ${normalizedName}` });
  };

  const handleNameChange = (event) => {
    setDraftName(event.target.value);
    setOverwriteConfirmed(false);
  };
=======
  const { projectName, material, matDef, step, saveProject } = useProject();
  const [saved, setSaved] = React.useState(false);
  const [dark, setDark] = React.useState(false);
  const location = useLocation();

  const handleSave = () => {
    saveProject();
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  };

  React.useEffect(() => {
    if (dark) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [dark]);
>>>>>>> 89864b9d989ae3713185c0da5120642180b714ad

  const isWorkspace = location.pathname === '/';

  return (
<<<<<<< HEAD
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
=======
    <header className="h-16 shrink-0 bg-white border-b border-[#E2E8E4] flex items-center justify-between px-6">
      <div className="flex items-center gap-4 min-w-0">
        <div className="min-w-0">
          <div className="text-[11px] uppercase tracking-wider text-[#64748B] font-semibold">
            {isWorkspace ? `Step ${String(step).padStart(2, '0')} · ${STEP_TITLES[step]}` : 'ScrapSmart'}
          </div>
          <div className="font-display font-semibold text-[#172B21] truncate">{projectName}</div>
        </div>
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#DCFCE7] text-[#15803D] text-xs font-semibold">
          <span className="w-2 h-2 rounded-full bg-[#16A34A]" />
>>>>>>> 89864b9d989ae3713185c0da5120642180b714ad
          {matDef.name} · {material.sheetWidth}×{material.sheetHeight}mm
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
<<<<<<< HEAD
          onClick={openSaveDialog}
          className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-nav-foreground hover:bg-nav-foreground/10 transition-colors"
        >
          <Save className="w-4 h-4" />
          <span className="hidden sm:inline">Save</span>
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
=======
          onClick={handleSave}
          className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-[#172B21] hover:bg-[#F4F7F5] transition-colors"
        >
          <Save className="w-4 h-4" />
          <span className="hidden sm:inline">{saved ? 'Saved!' : 'Save'}</span>
        </button>
        <button
          onClick={() => setDark((d) => !d)}
          className="w-9 h-9 rounded-lg flex items-center justify-center text-[#64748B] hover:bg-[#F4F7F5] transition-colors"
          title="Toggle theme"
        >
          {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>
        <button
          className="w-9 h-9 rounded-lg flex items-center justify-center text-[#64748B] hover:bg-[#F4F7F5] transition-colors"
>>>>>>> 89864b9d989ae3713185c0da5120642180b714ad
          title="Help"
        >
          <HelpCircle className="w-4 h-4" />
        </button>
<<<<<<< HEAD
        <div className="w-9 h-9 rounded-full bg-secondary-accent text-secondary-accent-foreground flex items-center justify-center text-xs font-semibold" title="Guest">
=======
        <div className="w-9 h-9 rounded-full bg-[#123D26] text-white flex items-center justify-center text-xs font-semibold" title="Guest">
>>>>>>> 89864b9d989ae3713185c0da5120642180b714ad
          <User className="w-4 h-4" />
        </div>
        <button
          onClick={onToggleAssistant}
<<<<<<< HEAD
          className="ml-1 flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold bg-primary text-primary-foreground hover:bg-primary-hover transition-colors"
=======
          className="ml-1 flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold bg-[#16A34A] text-white hover:bg-[#15803D] transition-colors"
>>>>>>> 89864b9d989ae3713185c0da5120642180b714ad
        >
          <Sparkles className="w-4 h-4" />
          <span className="hidden sm:inline">AI</span>
        </button>
      </div>
<<<<<<< HEAD

      <Dialog open={saveDialogOpen} onOpenChange={setSaveDialogOpen}>
        <DialogContent
          className="rounded-2xl border-border bg-card text-foreground"
          onOpenAutoFocus={(event) => {
            event.preventDefault();
            nameInputRef.current?.focus();
          }}
        >
          <form onSubmit={handleSave}>
            <DialogHeader className="mb-5">
              <DialogTitle className="font-display text-foreground">Save project</DialogTitle>
              <DialogDescription>Choose a name for this project.</DialogDescription>
            </DialogHeader>
            <label htmlFor="project-name" className="mb-1.5 block text-sm font-medium text-foreground">Project name</label>
            <input
              ref={nameInputRef}
              id="project-name"
              autoFocus
              value={draftName}
              onChange={handleNameChange}
              maxLength={60}
              aria-invalid={Boolean(nameError)}
              aria-describedby="project-name-feedback"
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/30"
            />
            <div id="project-name-feedback" className="mt-1.5 min-h-5 text-xs" aria-live="polite">
              {nameError ? (
                <p className="text-muted-foreground">{nameError}</p>
              ) : hasNameConflict ? (
                <p className="text-muted-foreground" role="status">
                  {overwriteConfirmed ? 'A project with this name already exists. Save again to overwrite it.' : 'A project with this name already exists. Save to overwrite it.'}
                </p>
              ) : null}
            </div>
            <DialogFooter className="mt-4 gap-2">
              <button
                type="button"
                onClick={() => setSaveDialogOpen(false)}
                className="rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium text-foreground transition hover:bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={Boolean(nameError)}
                className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50"
              >
                {overwriteConfirmed && hasNameConflict ? 'Overwrite' : 'Save'}
              </button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
=======
>>>>>>> 89864b9d989ae3713185c0da5120642180b714ad
    </header>
  );
}
