import React from 'react';
import { FolderOpen, Trash2, Calendar, Layers } from 'lucide-react';
import { useProject } from '@/lib/ProjectContext';
import { getMaterial } from '@/lib/materials';

export default function SavedProjects() {
  const { savedProjects, openProject, deleteProject } = useProject();
  return (
    <div className="p-4 sm:p-6 max-w-[1000px] mx-auto">
      <div className="mb-6">
        <h1 className="font-display text-2xl font-bold text-foreground">Saved Projects</h1>
        <p className="text-sm text-muted-foreground mt-1">Projects are stored locally in your browser.</p>
      </div>
      {savedProjects.length === 0 ? (
        <div className="bg-card rounded-2xl border border-border p-12 text-center">
          <FolderOpen className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
          <p className="text-muted-foreground font-medium">No saved projects yet</p>
          <p className="text-sm text-muted-foreground mt-1">Use the Save button in the header to store a project here.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {savedProjects.map((p, i) => {
            const mat = getMaterial(p.material?.type);
            const totalPieces = (p.pieces || []).reduce((s, x) => s + Math.max(1, x.quantity || 1), 0);
            return (
              <div key={i} className="bg-card rounded-2xl border border-border p-4 hover:shadow-md transition">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <div className="font-display font-bold text-foreground">{p.name}</div>
                    <div className="text-xs text-muted-foreground flex items-center gap-1.5 mt-0.5">
                      <Calendar className="w-3 h-3" /> {new Date(p.savedAt).toLocaleDateString()}
                    </div>
                  </div>
                  <button onClick={() => deleteProject(i)} className="w-8 h-8 rounded-lg bg-strong text-strong-foreground hover:bg-strong/90 flex items-center justify-center" aria-label="Delete project"><Trash2 className="w-4 h-4" /></button>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                    <span className="material-preserved px-2 py-0.5 rounded-full bg-card text-primary-hover font-medium">{mat.name}</span>
                  <span className="flex items-center gap-1"><Layers className="w-3 h-3" /> {totalPieces} pieces</span>
                  <span>{p.material.sheetWidth}×{p.material.sheetHeight}mm</span>
                </div>
                <button onClick={() => openProject(p)} className="w-full px-3 py-2 rounded-lg bg-strong text-strong-foreground text-sm font-semibold hover:bg-primary-hover transition">
                  Open project
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
