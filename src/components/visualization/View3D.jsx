import React, { useRef, useEffect, useState, useCallback } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { useProject } from '@/lib/ProjectContext';
import { getMaterial } from '@/lib/materials';
<<<<<<< HEAD
import { useTheme } from '@/lib/ThemeContext';
=======
>>>>>>> 89864b9d989ae3713185c0da5120642180b714ad

/* ---------- Procedural material textures ---------- */

function makeCanvas(size = 512) {
  const c = document.createElement('canvas');
  c.width = c.height = size;
  return c;
}

<<<<<<< HEAD
function woodTexture(matDef) {
  const c = makeCanvas(512);
  const ctx = c.getContext('2d');
  ctx.fillStyle = matDef.base;
=======
function woodTexture(base, edge) {
  const c = makeCanvas(512);
  const ctx = c.getContext('2d');
  ctx.fillStyle = base;
>>>>>>> 89864b9d989ae3713185c0da5120642180b714ad
  ctx.fillRect(0, 0, 512, 512);
  // grain lines
  for (let i = 0; i < 60; i++) {
    const y = (i / 60) * 512 + (Math.random() * 6 - 3);
    const alpha = 0.04 + Math.random() * 0.06;
<<<<<<< HEAD
    ctx.strokeStyle = matDef.texture.grain;
    ctx.globalAlpha = alpha + 0.2;
=======
    ctx.strokeStyle = `rgba(90,55,25,${alpha})`;
>>>>>>> 89864b9d989ae3713185c0da5120642180b714ad
    ctx.lineWidth = 1 + Math.random() * 2;
    ctx.beginPath();
    ctx.moveTo(0, y);
    for (let x = 0; x <= 512; x += 16) {
      ctx.lineTo(x, y + Math.sin(x * 0.03 + i) * 4);
    }
    ctx.stroke();
  }
<<<<<<< HEAD
  ctx.globalAlpha = 1;
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
=======
  // lighter streaks
  for (let i = 0; i < 12; i++) {
    ctx.strokeStyle = `rgba(230,200,150,${0.05 + Math.random() * 0.05})`;
    ctx.lineWidth = 2 + Math.random() * 3;
    ctx.beginPath();
    const y = Math.random() * 512;
    ctx.moveTo(0, y);
    ctx.lineTo(512, y + (Math.random() * 20 - 10));
    ctx.stroke();
  }
  const tex = new THREE.CanvasTexture(c);
>>>>>>> 89864b9d989ae3713185c0da5120642180b714ad
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.anisotropy = 4;
  return tex;
}

<<<<<<< HEAD
function mdfTexture(matDef) {
  const c = makeCanvas(256);
  const ctx = c.getContext('2d');
  ctx.fillStyle = matDef.base;
  ctx.fillRect(0, 0, 256, 256);
  // Fine, non-directional fiber speckle without wood grain.
  ctx.fillStyle = matDef.texture.speckle;
  ctx.globalAlpha = 0.3;
  for (let i = 0; i < 1800; i++) {
    const size = Math.random() < 0.15 ? 1.5 : 0.7;
    ctx.fillRect(Math.random() * 256, Math.random() * 256, size, size);
  }
  ctx.globalAlpha = 1;
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
=======
function mdfTexture(base) {
  const c = makeCanvas(256);
  const ctx = c.getContext('2d');
  ctx.fillStyle = base;
  ctx.fillRect(0, 0, 256, 256);
  // fine fiber noise
  const img = ctx.getImageData(0, 0, 256, 256);
  for (let i = 0; i < img.data.length; i += 4) {
    const n = (Math.random() - 0.5) * 22;
    img.data[i] += n;
    img.data[i + 1] += n;
    img.data[i + 2] += n;
  }
  ctx.putImageData(img, 0, 0);
  const tex = new THREE.CanvasTexture(c);
>>>>>>> 89864b9d989ae3713185c0da5120642180b714ad
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  return tex;
}

<<<<<<< HEAD
function cardboardTexture(matDef) {
  const c = makeCanvas(256);
  const ctx = c.getContext('2d');
  ctx.fillStyle = matDef.base;
  ctx.fillRect(0, 0, 256, 256);
  // corrugation flutes
  for (let x = 0; x < 256; x += 6) {
    ctx.fillStyle = matDef.texture.flute;
    ctx.globalAlpha = 0.45;
    ctx.fillRect(x, 0, 2, 256);
  }
  ctx.globalAlpha = 1;
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
=======
function cardboardTexture(base, edge) {
  const c = makeCanvas(256);
  const ctx = c.getContext('2d');
  ctx.fillStyle = base;
  ctx.fillRect(0, 0, 256, 256);
  // corrugation flutes
  for (let x = 0; x < 256; x += 6) {
    ctx.fillStyle = `rgba(120,80,40,${0.12 + Math.random() * 0.08})`;
    ctx.fillRect(x, 0, 2, 256);
  }
  // paper fiber noise
  for (let i = 0; i < 4000; i++) {
    ctx.fillStyle = `rgba(150,110,60,${Math.random() * 0.08})`;
    ctx.fillRect(Math.random() * 256, Math.random() * 256, 1, 1);
  }
  const tex = new THREE.CanvasTexture(c);
>>>>>>> 89864b9d989ae3713185c0da5120642180b714ad
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  return tex;
}

<<<<<<< HEAD
function metalTexture(matDef) {
  const c = makeCanvas(256);
  const ctx = c.getContext('2d');
  const gradient = ctx.createLinearGradient(0, 0, 256, 0);
  gradient.addColorStop(0, matDef.base);
  gradient.addColorStop(1, matDef.texture.gradientEnd);
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 256, 256);
  // brushed lines
  for (let y = 0; y < 256; y += 2) {
    ctx.strokeStyle = matDef.texture.brushedLine;
    ctx.globalAlpha = y % 4 === 0 ? 0.22 : 0.1;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(256, y);
    ctx.stroke();
  }
  ctx.globalAlpha = 1;
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
=======
function metalTexture(base) {
  const c = makeCanvas(256);
  const ctx = c.getContext('2d');
  ctx.fillStyle = base;
  ctx.fillRect(0, 0, 256, 256);
  // brushed lines
  for (let x = 0; x < 256; x += 1) {
    ctx.strokeStyle = `rgba(255,255,255,${Math.random() * 0.06})`;
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, 256);
    ctx.stroke();
  }
  const tex = new THREE.CanvasTexture(c);
>>>>>>> 89864b9d989ae3713185c0da5120642180b714ad
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  return tex;
}

<<<<<<< HEAD
function acrylicTexture(matDef) {
  const c = makeCanvas(512);
  const ctx = c.getContext('2d');
  const gradient = ctx.createLinearGradient(0, 0, 512, 512);
  gradient.addColorStop(0, matDef.base);
  gradient.addColorStop(1, matDef.texture.gradientEnd);
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 512, 512);
  ctx.save();
  ctx.translate(256, 256);
  ctx.rotate(-Math.PI / 4);
  const gloss = ctx.createLinearGradient(-70, 0, 70, 0);
  gloss.addColorStop(0, 'rgba(239,234,216,0)');
  gloss.addColorStop(0.5, 'rgba(239,234,216,0.72)');
  gloss.addColorStop(1, 'rgba(239,234,216,0)');
  ctx.fillStyle = gloss;
  ctx.fillRect(-70, -360, 140, 720);
  ctx.restore();
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  return tex;
}

function getSurfaceTexture(matDef) {
  switch (matDef.texture.type) {
    case 'plywood': return woodTexture(matDef);
    case 'mdf': return mdfTexture(matDef);
    case 'acrylic': return acrylicTexture(matDef);
    case 'cardboard': return cardboardTexture(matDef);
    case 'metal': return metalTexture(matDef);
    default: return null;
  }
}

function makeEdgeMaterial(matDef) {
  const mat = new THREE.MeshStandardMaterial({
    ...(matDef.texture.type === 'plywood' ? {} : { color: matDef.edge }),
    roughness: matDef.three.roughness,
    metalness: matDef.three.metalness,
  });
  if (matDef.texture.type === 'plywood') {
    const c = makeCanvas(32);
    const ctx = c.getContext('2d');
    matDef.texture.layers.forEach((color, i) => {
      ctx.fillStyle = color;
      ctx.fillRect(0, i * 8, 32, 8);
    });
    mat.map = new THREE.CanvasTexture(c);
    mat.map.colorSpace = THREE.SRGBColorSpace;
  }
  return mat;
}

function makeSheetMaterial(matDef, repeat) {
  const t = matDef.three;
  const mat = new THREE.MeshStandardMaterial({ roughness: t.roughness, metalness: t.metalness });
  const texture = getSurfaceTexture(matDef);
  if (texture) {
    texture.repeat.set(repeat.x, repeat.y);
    mat.map = texture;
  }
  if (matDef.texture.type === 'metal') mat.envMapIntensity = 1;
  if (matDef.texture.type === 'acrylic') {
=======
function makeSheetMaterial(matDef, repeat) {
  const t = matDef.three;
  const mat = new THREE.MeshStandardMaterial({ color: t.color, roughness: t.roughness, metalness: t.metalness });
  if (t.kind === 'wood') {
    const tex = woodTexture(t.color, t.edgeColor);
    tex.repeat.set(repeat.x, repeat.y);
    mat.map = tex;
  } else if (t.kind === 'mdf') {
    const tex = mdfTexture(t.color);
    tex.repeat.set(repeat.x, repeat.y);
    mat.map = tex;
  } else if (t.kind === 'cardboard') {
    const tex = cardboardTexture(t.color, t.edgeColor);
    tex.repeat.set(repeat.x, repeat.y);
    mat.map = tex;
  } else if (t.kind === 'metal') {
    const tex = metalTexture(t.color);
    tex.repeat.set(repeat.x, repeat.y);
    mat.map = tex;
    mat.envMapIntensity = 1;
  } else if (t.kind === 'acrylic') {
>>>>>>> 89864b9d989ae3713185c0da5120642180b714ad
    mat.transparent = true;
    mat.opacity = t.opacity;
    mat.roughness = t.roughness;
    mat.metalness = 0;
  }
<<<<<<< HEAD
  const edge = makeEdgeMaterial(matDef);
  return [edge, edge.clone(), mat, mat.clone(), edge.clone(), edge.clone()];
}

function makePieceMaterial(matDef) {
  const t = matDef.three;
  const mat = new THREE.MeshStandardMaterial({
    roughness: t.roughness,
    metalness: t.metalness,
    emissive: new THREE.Color(matDef.base),
    emissiveIntensity: 0.04,
  });
  mat.map = getSurfaceTexture(matDef);
  if (matDef.texture.type === 'acrylic') {
    mat.transparent = true;
    mat.opacity = t.opacity;
  }
  const edge = makeEdgeMaterial(matDef);
  return [edge, edge.clone(), mat, mat.clone(), edge.clone(), edge.clone()];
=======
  return mat;
}

function makePieceMaterial(matDef, pieceColor) {
  const t = matDef.three;
  const mat = new THREE.MeshStandardMaterial({
    color: t.color,
    roughness: t.roughness,
    metalness: t.metalness,
    emissive: new THREE.Color(pieceColor),
    emissiveIntensity: 0.14,
  });
  if (t.kind === 'wood') mat.map = woodTexture(t.color, t.edgeColor);
  else if (t.kind === 'mdf') mat.map = mdfTexture(t.color);
  else if (t.kind === 'cardboard') mat.map = cardboardTexture(t.color, t.edgeColor);
  else if (t.kind === 'metal') mat.map = metalTexture(t.color);
  else if (t.kind === 'acrylic') {
    mat.transparent = true;
    mat.opacity = t.opacity;
  }
  return mat;
>>>>>>> 89864b9d989ae3713185c0da5120642180b714ad
}

/* ---------- Component ---------- */

export default function View3D({ layoutSource = 'layout', height = 460 }) {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const controlsRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
<<<<<<< HEAD
  const groundRef = useRef(null);
=======
>>>>>>> 89864b9d989ae3713185c0da5120642180b714ad
  const piecesGroupRef = useRef(null);
  const pieceMeshesRef = useRef([]); // [{ mesh, edges, data }]
  const sheetRef = useRef(null);
  const raycasterRef = useRef(new THREE.Raycaster());
  const pointerRef = useRef(new THREE.Vector2());
  const camTargetRef = useRef({ pos: null, look: null });
  const explodedRef = useRef(0);
  const explodedTargetRef = useRef(0);

  const { layout, baseline, material, matDef, selectedInstanceId, setSelectedInstanceId } = useProject();
<<<<<<< HEAD
  const { theme } = useTheme();
=======
>>>>>>> 89864b9d989ae3713185c0da5120642180b714ad
  const source = layoutSource === 'baseline' ? baseline : layout;

  const [hovered, setHovered] = useState(null);
  const [tooltip, setTooltip] = useState({ x: 0, y: 0, visible: false, text: '' });
  const [exploded, setExploded] = useState(false);
  const [explodeDist, setExplodeDist] = useState(1);
  const [view, setView] = useState('iso');

  // One-time scene setup
  useEffect(() => {
    const mount = mountRef.current;
    const w = mount.clientWidth;
    const h = height;
    const scene = new THREE.Scene();
<<<<<<< HEAD
    const rootStyles = getComputedStyle(mount.closest('.material-preserved') || document.documentElement);
    scene.background = new THREE.Color(rootStyles.getPropertyValue('--background').trim());
=======
    scene.background = new THREE.Color('#F4F7F5');
>>>>>>> 89864b9d989ae3713185c0da5120642180b714ad

    const camera = new THREE.PerspectiveCamera(45, w / h, 1, 20000);
    camera.position.set(1400, 1100, 1400);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    mount.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.minDistance = 100;
    controls.maxDistance = 9000;
    controls.maxPolarAngle = Math.PI / 2 - 0.02;

    // Lights
<<<<<<< HEAD
    const hemi = new THREE.HemisphereLight(rootStyles.getPropertyValue('--primary-foreground').trim(), rootStyles.getPropertyValue('--foreground').trim(), 0.7);
    scene.add(hemi);
    const key = new THREE.DirectionalLight(rootStyles.getPropertyValue('--primary-foreground').trim(), 1.4);
=======
    const hemi = new THREE.HemisphereLight(0xffffff, 0xb0b8b4, 0.7);
    scene.add(hemi);
    const key = new THREE.DirectionalLight(0xffffff, 1.4);
>>>>>>> 89864b9d989ae3713185c0da5120642180b714ad
    key.position.set(800, 1600, 900);
    key.castShadow = true;
    key.shadow.mapSize.set(2048, 2048);
    key.shadow.camera.left = -2000;
    key.shadow.camera.right = 2000;
    key.shadow.camera.top = 2000;
    key.shadow.camera.bottom = -2000;
    key.shadow.camera.near = 100;
    key.shadow.camera.far = 6000;
    key.shadow.bias = -0.0004;
    scene.add(key);
<<<<<<< HEAD
    const fill = new THREE.DirectionalLight(rootStyles.getPropertyValue('--primary').trim(), 0.4);
=======
    const fill = new THREE.DirectionalLight(0xdfeee6, 0.4);
>>>>>>> 89864b9d989ae3713185c0da5120642180b714ad
    fill.position.set(-900, 700, -600);
    scene.add(fill);

    // Ground + grid
    const ground = new THREE.Mesh(
      new THREE.PlaneGeometry(8000, 8000),
<<<<<<< HEAD
      new THREE.MeshStandardMaterial({ color: rootStyles.getPropertyValue('--card').trim(), roughness: 1 })
=======
      new THREE.MeshStandardMaterial({ color: '#E8EDE9', roughness: 1 })
>>>>>>> 89864b9d989ae3713185c0da5120642180b714ad
    );
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -2;
    ground.receiveShadow = true;
    scene.add(ground);
<<<<<<< HEAD
    groundRef.current = ground;

    const grid = new THREE.GridHelper(8000, 80, rootStyles.getPropertyValue('--primary').trim(), rootStyles.getPropertyValue('--border').trim());
=======

    const grid = new THREE.GridHelper(8000, 80, 0x16a34a, 0xcbd5d0);
>>>>>>> 89864b9d989ae3713185c0da5120642180b714ad
    grid.position.y = -1;
    grid.material.opacity = 0.35;
    grid.material.transparent = true;
    scene.add(grid);

    // Axes guide
    const axes = new THREE.AxesHelper(300);
    axes.position.set(-1400, 0, -1000);
    scene.add(axes);

    sceneRef.current = scene;
    cameraRef.current = camera;
    rendererRef.current = renderer;
    controlsRef.current = controls;

    let raf;
    const animate = () => {
      raf = requestAnimationFrame(animate);
      // camera lerp
      const ct = camTargetRef.current;
      if (ct.pos) {
        camera.position.lerp(ct.pos, 0.12);
        if (ct.look) controls.target.lerp(ct.look, 0.12);
        if (camera.position.distanceTo(ct.pos) < 1.5) ct.pos = null;
      }
      // exploded lerp
      if (Math.abs(explodedRef.current - explodedTargetRef.current) > 0.01) {
        explodedRef.current += (explodedTargetRef.current - explodedRef.current) * 0.12;
        applyExploded();
      }
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      const nw = mount.clientWidth;
      camera.aspect = nw / h;
      camera.updateProjectionMatrix();
      renderer.setSize(nw, h);
    };
    const ro = new ResizeObserver(onResize);
    ro.observe(mount);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      controls.dispose();
      renderer.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [height]);

<<<<<<< HEAD
  useEffect(() => {
    const scene = sceneRef.current;
    const ground = groundRef.current;
    if (!scene || !ground) return;
    const styles = getComputedStyle(mountRef.current?.closest('.material-preserved') || document.documentElement);
    scene.background = new THREE.Color(styles.getPropertyValue('--background').trim());
    ground.material.color.set(styles.getPropertyValue('--card').trim());
  }, [theme]);

=======
>>>>>>> 89864b9d989ae3713185c0da5120642180b714ad
  // Build / rebuild sheet + pieces when layout or material changes
  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;

    // Clear previous
    if (piecesGroupRef.current) {
      scene.remove(piecesGroupRef.current);
      piecesGroupRef.current.traverse((o) => {
        if (o.geometry) o.geometry.dispose();
        if (o.material) {
          if (Array.isArray(o.material)) o.material.forEach((m) => m.dispose());
          else o.material.dispose();
        }
      });
    }
    if (sheetRef.current) {
      scene.remove(sheetRef.current);
      sheetRef.current.geometry.dispose();
<<<<<<< HEAD
      sheetRef.current.material.forEach((material) => {
        material.map?.dispose();
        material.dispose();
      });
=======
      sheetRef.current.material.dispose();
>>>>>>> 89864b9d989ae3713185c0da5120642180b714ad
    }

    if (!source) return;

    const W = material.sheetWidth;
    const H = material.sheetHeight;
    const T = Math.max(material.thickness, 4);
    const def = getMaterial(material.type);

    // Sheet
    const repeat = { x: Math.max(1, W / 600), y: Math.max(1, H / 600) };
    const sheetMat = makeSheetMaterial(def, repeat);
    const sheetGeo = new THREE.BoxGeometry(W, T, H);
    const sheet = new THREE.Mesh(sheetGeo, sheetMat);
    sheet.position.y = T / 2;
    sheet.castShadow = true;
    sheet.receiveShadow = true;
    scene.add(sheet);
    sheetRef.current = sheet;

    // Sheet edge outline
    const edges = new THREE.LineSegments(
      new THREE.EdgesGeometry(sheetGeo),
<<<<<<< HEAD
      new THREE.LineBasicMaterial({ color: getComputedStyle(mountRef.current?.closest('.material-preserved') || document.documentElement).getPropertyValue('--primary-hover').trim(), transparent: true, opacity: 0.5 })
=======
      new THREE.LineBasicMaterial({ color: 0x123d26, transparent: true, opacity: 0.5 })
>>>>>>> 89864b9d989ae3713185c0da5120642180b714ad
    );
    edges.position.copy(sheet.position);
    scene.add(edges);

    // Pieces
    const group = new THREE.Group();
    const meshes = [];
    source.sheets.forEach((s, sIdx) => {
      s.placements.forEach((p, pIdx) => {
        const pT = T; // pieces share sheet thickness
        const geo = new THREE.BoxGeometry(p.w, pT, p.h);
<<<<<<< HEAD
        const pmat = makePieceMaterial(def);
=======
        const pmat = makePieceMaterial(def, p.color || '#16A34A');
>>>>>>> 89864b9d989ae3713185c0da5120642180b714ad
        const mesh = new THREE.Mesh(geo, pmat);
        const cx = (p.x + p.w / 2) - W / 2;
        const cz = (p.y + p.h / 2) - H / 2;
        mesh.position.set(cx, T + pT / 2 + 0.5, cz);
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        mesh.userData = { ...p, sheet: sIdx, baseY: T + pT / 2 + 0.5, index: pIdx };
        group.add(mesh);

        // colored edge outline
        const eGeo = new THREE.EdgesGeometry(geo);
<<<<<<< HEAD
        const eMat = new THREE.LineBasicMaterial({ color: new THREE.Color(def.edge) });
=======
        const eMat = new THREE.LineBasicMaterial({ color: new THREE.Color(p.color || '#16A34A') });
>>>>>>> 89864b9d989ae3713185c0da5120642180b714ad
        const eLines = new THREE.LineSegments(eGeo, eMat);
        eLines.position.copy(mesh.position);
        group.add(eLines);

        meshes.push({ mesh, edges: eLines, data: p });
      });
    });
    scene.add(group);
    piecesGroupRef.current = group;
    pieceMeshesRef.current = meshes;

    // Fit camera to content
    fitCamera();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [source, material.type, material.thickness]);

  // Apply exploded offsets
  function applyExploded() {
    const meshes = pieceMeshesRef.current;
    const dist = explodedRef.current;
    meshes.forEach(({ mesh }, i) => {
      const baseY = mesh.userData.baseY;
      mesh.position.y = baseY + i * dist * 40;
    });
  }

  useEffect(() => {
    explodedTargetRef.current = exploded ? explodeDist : 0;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [exploded, explodeDist]);

  // Selection highlight
  useEffect(() => {
    pieceMeshesRef.current.forEach(({ mesh, edges, data }) => {
      const sel = data.instanceId === selectedInstanceId;
<<<<<<< HEAD
      mesh.material.forEach((material) => { material.emissiveIntensity = sel ? 0.5 : 0.04; });
      edges.material.color.set(sel ? getComputedStyle(document.documentElement).getPropertyValue('--primary-foreground').trim() : new THREE.Color(data.color || '#2e7d7a'));
=======
      mesh.material.emissiveIntensity = sel ? 0.5 : 0.14;
      edges.material.color.set(sel ? 0xffffff : new THREE.Color(data.color || '#16A34A'));
>>>>>>> 89864b9d989ae3713185c0da5120642180b714ad
      edges.scale.setScalar(sel ? 1.04 : 1.0);
    });
    if (selectedInstanceId) {
      const found = pieceMeshesRef.current.find(({ data }) => data.instanceId === selectedInstanceId);
      if (found) focusOn(found.mesh);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedInstanceId]);

  // Camera presets
  const setCamera = useCallback((pos, look) => {
    camTargetRef.current = { pos: new THREE.Vector3().fromArray(pos), look: new THREE.Vector3().fromArray(look) };
  }, []);

  const fitCamera = useCallback(() => {
    const W = material.sheetWidth || 1000;
    const H = material.sheetHeight || 1000;
    const d = Math.max(W, H) * 1.4;
    setCamera([d * 0.8, d * 0.7, d * 0.8], [0, 0, 0]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [material.sheetWidth, material.sheetHeight]);

  const focusOn = useCallback((mesh) => {
    const p = mesh.position;
    setCamera([p.x + 400, p.y + 500, p.z + 400], [p.x, p.y, p.z]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setViewPreset = (v) => {
    setView(v);
    const W = material.sheetWidth || 1000;
    const H = material.sheetHeight || 1000;
    const d = Math.max(W, H) * 1.6;
    if (v === 'iso') setCamera([d * 0.7, d * 0.6, d * 0.7], [0, 0, 0]);
    else if (v === 'top') setCamera([0, d, 0.01], [0, 0, 0]);
    else if (v === 'side') setCamera([0, 50, d], [0, 0, 0]);
    else if (v === 'reset') fitCamera();
  };

  // Pointer interaction
  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    const onMove = (e) => {
      const rect = mount.getBoundingClientRect();
      pointerRef.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      pointerRef.current.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      raycasterRef.current.setFromCamera(pointerRef.current, cameraRef.current);
      const meshes = pieceMeshesRef.current.map((m) => m.mesh);
      const hits = raycasterRef.current.intersectObjects(meshes, false);
      if (hits.length) {
        const d = hits[0].object.userData;
        setHovered(d.instanceId);
        setTooltip({ x: e.clientX - rect.left, y: e.clientY - rect.top, visible: true, text: `${d.name} · ${Math.round(d.w)}×${Math.round(d.h)}mm${d.rotated ? ' · rotated' : ''}` });
        mount.style.cursor = 'pointer';
      } else {
        setHovered(null);
        setTooltip((t) => ({ ...t, visible: false }));
        mount.style.cursor = 'grab';
      }
    };
    const onClick = (e) => {
      const rect = mount.getBoundingClientRect();
      pointerRef.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      pointerRef.current.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      raycasterRef.current.setFromCamera(pointerRef.current, cameraRef.current);
      const meshes = pieceMeshesRef.current.map((m) => m.mesh);
      const hits = raycasterRef.current.intersectObjects(meshes, false);
      if (hits.length) {
        setSelectedInstanceId(hits[0].object.userData.instanceId);
      } else {
        setSelectedInstanceId(null);
      }
    };
    mount.addEventListener('pointermove', onMove);
    mount.addEventListener('click', onClick);
    return () => {
      mount.removeEventListener('pointermove', onMove);
      mount.removeEventListener('click', onClick);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [source]);

  const hasLayout = !!source;

  return (
<<<<<<< HEAD
    <div className="material-preserved relative w-full" style={{ height }}>
      <div ref={mountRef} className="w-full h-full rounded-xl overflow-hidden" />

      {/* Camera controls */}
      <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 bg-card/90 backdrop-blur rounded-xl border border-border p-1 shadow-sm">
=======
    <div className="relative w-full" style={{ height }}>
      <div ref={mountRef} className="w-full h-full rounded-xl overflow-hidden" />

      {/* Camera controls */}
      <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 bg-white/90 backdrop-blur rounded-xl border border-[#E2E8E4] p-1 shadow-sm">
>>>>>>> 89864b9d989ae3713185c0da5120642180b714ad
        {[
          { v: 'iso', label: 'Iso' },
          { v: 'top', label: 'Top' },
          { v: 'side', label: 'Side' },
          { v: 'reset', label: 'Fit' },
        ].map((b) => (
          <button
            key={b.v}
            onClick={() => setViewPreset(b.v)}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold transition ${
<<<<<<< HEAD
              view === b.v ? 'bg-primary-hover text-primary-foreground' : 'text-muted-foreground hover:bg-background'
=======
              view === b.v ? 'bg-[#123D26] text-white' : 'text-[#64748B] hover:bg-[#F4F7F5]'
>>>>>>> 89864b9d989ae3713185c0da5120642180b714ad
            }`}
          >
            {b.label}
          </button>
        ))}
      </div>

      {/* Exploded view */}
<<<<<<< HEAD
      <div className="absolute top-3 right-3 z-10 flex items-center gap-3 bg-card/90 backdrop-blur rounded-xl border border-border px-3 py-1.5 shadow-sm">
        <label className="flex items-center gap-2 text-xs font-medium text-foreground cursor-pointer">
          <input type="checkbox" className="w-4 h-4 rounded accent-primary" checked={exploded} onChange={(e) => setExploded(e.target.checked)} disabled={!hasLayout} />
=======
      <div className="absolute top-3 right-3 z-10 flex items-center gap-3 bg-white/90 backdrop-blur rounded-xl border border-[#E2E8E4] px-3 py-1.5 shadow-sm">
        <label className="flex items-center gap-2 text-xs font-medium text-[#172B21] cursor-pointer">
          <input type="checkbox" className="w-4 h-4 rounded accent-[#16A34A]" checked={exploded} onChange={(e) => setExploded(e.target.checked)} disabled={!hasLayout} />
>>>>>>> 89864b9d989ae3713185c0da5120642180b714ad
          Exploded
        </label>
        {exploded && (
          <input
            type="range"
            min={0.2}
            max={3}
            step={0.1}
            value={explodeDist}
            onChange={(e) => setExplodeDist(Number(e.target.value))}
<<<<<<< HEAD
            className="w-20 accent-primary"
=======
            className="w-20 accent-[#16A34A]"
>>>>>>> 89864b9d989ae3713185c0da5120642180b714ad
          />
        )}
      </div>

      {/* Tooltip */}
      {tooltip.visible && (
        <div
<<<<<<< HEAD
          className="absolute z-20 pointer-events-none bg-primary-hover text-primary-foreground text-xs font-medium px-2.5 py-1.5 rounded-lg shadow-lg whitespace-nowrap"
=======
          className="absolute z-20 pointer-events-none bg-[#123D26] text-white text-xs font-medium px-2.5 py-1.5 rounded-lg shadow-lg whitespace-nowrap"
>>>>>>> 89864b9d989ae3713185c0da5120642180b714ad
          style={{ left: tooltip.x + 12, top: tooltip.y + 12 }}
        >
          {tooltip.text}
        </div>
      )}

      {!hasLayout && (
<<<<<<< HEAD
        <div className="absolute inset-0 flex items-center justify-center text-muted-foreground text-sm bg-card/40">
=======
        <div className="absolute inset-0 flex items-center justify-center text-[#94A3B8] text-sm bg-white/40">
>>>>>>> 89864b9d989ae3713185c0da5120642180b714ad
          Run the optimizer to render the 3D cutting simulation.
        </div>
      )}
    </div>
  );
}
