import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';
import { MATERIALS, getMaterial, PIECE_COLORS } from './materials';
import { optimizeLayout, baselineLayout } from './optimizer';
import { validateLayout, computeStats } from './geometry';
import { DEFAULT_PROJECT, DEMO_PROJECT, EXAMPLE_PIECES } from './demoData';

const ProjectContext = createContext(null);

let pieceCounter = 100;
function nextPieceId() {
  pieceCounter += 1;
  return `P${pieceCounter}`;
}

function makePiece(partial = {}) {
  return {
    id: partial.id || nextPieceId(),
    name: partial.name || 'New Piece',
    width: partial.width ?? 300,
    height: partial.height ?? 200,
    quantity: partial.quantity ?? 1,
    rotationAllowed: partial.rotationAllowed ?? true,
    color: partial.color || PIECE_COLORS[Math.floor(Math.random() * PIECE_COLORS.length)],
  };
}

export function ProjectProvider({ children }) {
  const [projectName, setProjectName] = useState(DEFAULT_PROJECT.name);
  const [material, setMaterial] = useState({ ...DEFAULT_PROJECT.material });
  const [pieces, setPieces] = useState([]);
  const [layout, setLayout] = useState(null); // optimized
  const [baseline, setBaseline] = useState(null);
  const [validation, setValidation] = useState(null);
  const [selectedInstanceId, setSelectedInstanceId] = useState(null);
  const [viewMode, setViewMode] = useState('3d'); // 2d | 3d | split | compare
  const [step, setStep] = useState(1); // 1 Material, 2 Pieces, 3 Optimize, 4 Results
  const [optimizing, setOptimizing] = useState(false);
  const [savedProjects, setSavedProjects] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('scrapsmart_projects') || '[]');
    } catch {
      return [];
    }
  });

  const matDef = getMaterial(material.type);

  const runOptimization = useCallback(() => {
    setOptimizing(true);
    // Defer so the UI can paint the "optimizing" state.
    setTimeout(() => {
      const sheet = { width: material.sheetWidth, height: material.sheetHeight };
      const opts = {
        kerf: material.kerf,
        margin: material.edgeMargin,
        maxSheets: material.sheetQuantity,
        rotationAllowedGlobal: material.rotationAllowed,
      };
      const opt = optimizeLayout(sheet, pieces, opts);
      const base = baselineLayout(sheet, pieces, opts);
      const optValid = validateLayout(opt, sheet, material.kerf, material.edgeMargin);
      const baseValid = validateLayout(base, sheet, material.kerf, material.edgeMargin);

      const optStats = computeStats(opt, sheet, pieces, material.pricePerSheet);
      const baseStats = computeStats(base, sheet, pieces, material.pricePerSheet);
      const savings = Math.max(0, baseStats.totalCost - optStats.totalCost);

      setLayout({ ...opt, validation: optValid, stats: optStats });
      setBaseline({ ...base, validation: baseValid, stats: baseStats });
      setValidation(optValid);
      setSelectedInstanceId(null);
      setOptimizing(false);
      setStep(4);
    }, 60);
  }, [material, pieces]);

  const loadDemo = useCallback(() => {
    setProjectName(DEMO_PROJECT.name);
    setMaterial({ ...DEMO_PROJECT.material });
    setPieces(DEMO_PROJECT.pieces.map((p) => ({ ...p })));
    setLayout(null);
    setBaseline(null);
    setValidation(null);
    setSelectedInstanceId(null);
    setStep(2);
    // Auto-run optimization after the state settles.
    setTimeout(() => {
      const sheet = { width: DEMO_PROJECT.material.sheetWidth, height: DEMO_PROJECT.material.sheetHeight };
      const opts = {
        kerf: DEMO_PROJECT.material.kerf,
        margin: DEMO_PROJECT.material.edgeMargin,
        maxSheets: DEMO_PROJECT.material.sheetQuantity,
        rotationAllowedGlobal: DEMO_PROJECT.material.rotationAllowed,
      };
      const opt = optimizeLayout(sheet, DEMO_PROJECT.pieces, opts);
      const base = baselineLayout(sheet, DEMO_PROJECT.pieces, opts);
      const optValid = validateLayout(opt, sheet, DEMO_PROJECT.material.kerf, DEMO_PROJECT.material.edgeMargin);
      const baseValid = validateLayout(base, sheet, DEMO_PROJECT.material.kerf, DEMO_PROJECT.material.edgeMargin);
      const optStats = computeStats(opt, sheet, DEMO_PROJECT.pieces, DEMO_PROJECT.material.pricePerSheet);
      const baseStats = computeStats(base, sheet, DEMO_PROJECT.pieces, DEMO_PROJECT.material.pricePerSheet);
      const savings = Math.max(0, baseStats.totalCost - optStats.totalCost);
      setLayout({ ...opt, validation: optValid, stats: optStats });
      setBaseline({ ...base, validation: baseValid, stats: baseStats });
      setValidation(optValid);
      setStep(4);
    }, 80);
  }, []);

  const addPiece = useCallback((partial) => {
    setPieces((prev) => [...prev, makePiece(partial)]);
  }, []);

  const updatePiece = useCallback((id, patch) => {
    setPieces((prev) => prev.map((p) => (p.id === id ? { ...p, ...patch } : p)));
  }, []);

  const deletePiece = useCallback((id) => {
    setPieces((prev) => prev.filter((p) => p.id !== id));
  }, []);

  const duplicatePiece = useCallback((id) => {
    setPieces((prev) => {
      const src = prev.find((p) => p.id === id);
      if (!src) return prev;
      return [...prev, { ...src, id: nextPieceId(), name: `${src.name} copy` }];
    });
  }, []);

  const clearPieces = useCallback(() => setPieces([]), []);

  const loadExample = useCallback(() => {
    setPieces(EXAMPLE_PIECES.map((p) => ({ ...p })));
  }, []);

  const saveProject = useCallback(() => {
    const proj = { name: projectName, material, pieces, savedAt: new Date().toISOString() };
    const updated = [proj, ...savedProjects].slice(0, 20);
    setSavedProjects(updated);
    localStorage.setItem('scrapsmart_projects', JSON.stringify(updated));
    return proj;
  }, [projectName, material, pieces, savedProjects]);

  const openProject = useCallback((proj) => {
    setProjectName(proj.name);
    setMaterial({ ...proj.material });
    setPieces(proj.pieces.map((p) => ({ ...p })));
    setLayout(null);
    setBaseline(null);
    setValidation(null);
    setSelectedInstanceId(null);
    setStep(2);
  }, []);

  const deleteProject = useCallback((idx) => {
    setSavedProjects((prev) => {
      const updated = prev.filter((_, i) => i !== idx);
      localStorage.setItem('scrapsmart_projects', JSON.stringify(updated));
      return updated;
    });
  }, []);

  const value = useMemo(
    () => ({
      projectName, setProjectName,
      material, setMaterial,
      matDef,
      pieces, setPieces,
      addPiece, updatePiece, deletePiece, duplicatePiece, clearPieces, loadExample,
      layout, baseline, validation,
      selectedInstanceId, setSelectedInstanceId,
      viewMode, setViewMode,
      step, setStep,
      optimizing,
      runOptimization, loadDemo,
      savedProjects, saveProject, openProject, deleteProject,
    }),
    [projectName, material, matDef, pieces, layout, baseline, validation, selectedInstanceId, viewMode, step, optimizing, savedProjects]
  );

  return <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>;
}

export function useProject() {
  const ctx = useContext(ProjectContext);
  if (!ctx) throw new Error('useProject must be used within ProjectProvider');
  return ctx;
}
