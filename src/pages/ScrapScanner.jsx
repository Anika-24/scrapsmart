import React, { useState, useRef, useEffect } from 'react';
import { Camera, Upload, RefreshCw, Save, AlertTriangle, Ruler, Crosshair, SwitchCamera } from 'lucide-react';
import { useProject } from '@/lib/ProjectContext';
import { fromMm, toMm } from '@/lib/geometry';
import { base44 } from '@/api/base44Client';
import { MATERIALS } from '@/lib/materials';

const MAX_IMAGE_SIZE_BYTES = Number(import.meta.env.VITE_SCANNER_MAX_IMAGE_BYTES) || 10 * 1024 * 1024;

export default function ScrapScanner() {
  const { addPiece, material, setMaterial } = useProject();
  const u = material.unit;
  const [mode, setMode] = useState('idle'); // idle | camera | review
  const [stream, setStream] = useState(null);
  const [imgUrl, setImgUrl] = useState(null);
  const [img, setImg] = useState(null);
  const [points, setPoints] = useState([]); // 4 corners
  const [refPts, setRefPts] = useState([]); // 2 reference points
  const [refLen, setRefLen] = useState(100); // mm
  const [manualW, setManualW] = useState('');
  const [manualH, setManualH] = useState('');
  const [error, setError] = useState('');
  const [cameraBusy, setCameraBusy] = useState(false);
  const [facingMode, setFacingMode] = useState('environment');
  const [scanning, setScanning] = useState(false);
  const [scanResult, setScanResult] = useState(null);
  const [scanError, setScanError] = useState('');
  const [selectedType, setSelectedType] = useState(material.type);
  const [thickness, setThickness] = useState(String(material.thickness || ''));
  const [length, setLength] = useState(String(material.sheetHeight || ''));
  const [width, setWidth] = useState(String(material.sheetWidth || ''));
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const fileRef = useRef(null);
  const streamRef = useRef(null);
  const imageUrlRef = useRef(null);


useEffect(() => {
  return () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
  };
}, []);

useEffect(() => {
  if (mode !== 'camera' || !stream || !videoRef.current) return;

  const video = videoRef.current;
  video.srcObject = stream;
  video.play().catch((error) => {
    console.error('Camera preview failed:', error);
  });

  return () => {
    video.srcObject = null;
  };
}, [stream, mode]);


  const stopCamera = () => {
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
    setStream(null);
  };

  const openCamera = async (facing = facingMode) => {
    setError('');
    if (!navigator.mediaDevices?.getUserMedia) {
      setError('Camera access is unavailable in this browser. Use HTTPS or localhost, or upload a photo.');
      return;
    }
    stopCamera();
    setCameraBusy(true);
    try {
      const s = await navigator.mediaDevices.getUserMedia({ video: { facingMode: { ideal: facing }, width: { ideal: 1280 }, height: { ideal: 960 } }, audio: false });
      streamRef.current = s;
      setStream(s);
      setMode('camera');
      setFacingMode(facing);
      //if (videoRef.current) videoRef.current.srcObject = s;
    } catch (e) {
      const messages = { NotAllowedError: 'Camera permission was denied. Allow camera access in browser settings or upload a photo.', NotFoundError: 'No camera was found on this device.', NotReadableError: 'The camera is busy or unavailable. Close other apps using it and try again.', OverconstrainedError: 'That camera is unavailable. Try switching cameras.' };
      setError(messages[e?.name] || 'Could not start the camera. Check browser permissions and try again, or upload a photo.');
    } finally { setCameraBusy(false); }
  };

  const startCamera = async () => {
    await openCamera();
  };


const setImageFile = (file) => {
  setError('');
  setScanError('');
  setScanResult(null);

  if (!file) return;

  if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
    setError('Choose a JPEG, PNG, or WebP image.');
    return;
  }

  if (file.size > MAX_IMAGE_SIZE_BYTES) {
    setError(`Image is too large. Choose a file up to ${Math.round(MAX_IMAGE_SIZE_BYTES / (1024 * 1024))} MB.`);
    return;
  }

  const url = URL.createObjectURL(file);
  const image = new Image();

  image.onload = () => {
    if (imageUrlRef.current) {
      URL.revokeObjectURL(imageUrlRef.current);
    }

    imageUrlRef.current = url;
    setImgUrl(url);
    setImg(image);
    setPoints([]);
    setRefPts([]);
    setManualW('');
    setManualH('');
    setMode('review');
  };

  image.onerror = () => {
    URL.revokeObjectURL(url);
    setError('Could not open that image. Please choose another JPEG, PNG, or WebP photo.');
  };

  image.src = url;
};


const capture = async () => {
  const v = videoRef.current;

  if (!v || !v.videoWidth || !v.videoHeight) {
    setError('Camera preview is not ready yet. Wait a moment and try again.');
    return;
  }

  try {
    const c = document.createElement('canvas');
    c.width = v.videoWidth;
    c.height = v.videoHeight;

    const ctx = c.getContext('2d');
    if (!ctx) {
      setError('Could not capture an image. Please try again.');
      return;
    }

    ctx.drawImage(v, 0, 0, c.width, c.height);

    const blob = await new Promise((resolve) =>
      c.toBlob(resolve, 'image/jpeg', 0.9)
    );

    if (!blob) {
      setError('Could not capture an image. Please try again.');
      return;
    }

    stopCamera();
    setImageFile(
      new File([blob], `scrapsmart-${Date.now()}.jpg`, {
        type: 'image/jpeg',
      })
    );
  } catch (e) {
    console.error('Photo capture failed:', e);
    setError('Could not capture an image. Please try again.');
  }
};


  const onUpload = (e) => {
    setImageFile(e.target.files?.[0]);
    e.target.value = '';
  };

  const scanMaterial = async () => {
    if (!imgUrl || scanning) return;
    setScanning(true); setScanError(''); setScanResult(null);
    try {
      const file = await fetch(imgUrl).then((res) => { if (!res.ok) throw new Error('Could not read selected image.'); return res.blob(); });
      const { file_url } = await base44.integrations.Core.UploadFile({ file: new File([file], 'material-scan.jpg', { type: file.type || 'image/jpeg' }) });
      const response = await base44.functions.invoke('scrapsmartMaterialScan', { imageUrl: file_url });
      const result = response?.data || response;
      if (!result?.category || !result?.observations) throw new Error(result?.error || 'The analysis service returned an incomplete result.');
      setScanResult(result);
      setSelectedType(MATERIALS.some((m) => m.id === result.category) ? result.category : material.type);
    } catch (e) {
      setScanError(e?.response?.data?.error || e?.message || 'Material scanning failed. Retry or select a material manually.');
    } finally { setScanning(false); }
  };

  const useMaterial = () => {
    const chosen = MATERIALS.find((m) => m.id === selectedType);
    if (!chosen) return;
    setMaterial((prev) => ({ ...prev, type: chosen.id, thickness: Number(thickness) || prev.thickness, sheetHeight: Number(length) || prev.sheetHeight, sheetWidth: Number(width) || prev.sheetWidth }));
    setError('Material details applied to the current project.');
  };

 


const onCanvasClick = (e) => {
  const c = canvasRef.current;
  if (!c) return;

  const rect = c.getBoundingClientRect();
  if (!rect.width || !rect.height) return;

  const x = ((e.clientX - rect.left) / rect.width) * c.width;
  const y = ((e.clientY - rect.top) / rect.height) * c.height;
  const point = { x, y };

  if (points.length < 4) {
    setPoints((prev) => [...prev, point]);
    return;
  }

  if (refPts.length < 2) {
    setRefPts((prev) => [...prev, point]);
  }
};




  
const drawOverlay = () => {
  const c = canvasRef.current;

  if (!c || !img) return;

  const ctx = c.getContext('2d');
  if (!ctx) return;

  c.width = img.naturalWidth;
  c.height = img.naturalHeight;

  ctx.clearRect(0, 0, c.width, c.height);
  ctx.drawImage(img, 0, 0, c.width, c.height);
  // Connect the selected corners as they are added.
if (points.length > 1) {
  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);

  for (let i = 1; i < points.length; i++) {
    ctx.lineTo(points[i].x, points[i].y);
  }

  if (points.length === 4) {
    ctx.closePath();
  }

  ctx.strokeStyle = '#16A34A';
  ctx.lineWidth = 4;
  ctx.stroke();
}

  // Draw the four selected scrap corners.
  points.forEach((p, i) => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, 10, 0, Math.PI * 2);
    ctx.fillStyle = '#16A34A';
    ctx.fill();

    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 18px sans-serif';
    ctx.fillText(String(i + 1), p.x + 12, p.y - 12);
  });

  // Draw the reference measurement points.
  refPts.forEach((p) => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, 10, 0, Math.PI * 2);
    ctx.fillStyle = '#2563EB';
    ctx.fill();
  });

  if (refPts.length === 2) {
    ctx.beginPath();
    ctx.moveTo(refPts[0].x, refPts[0].y);
    ctx.lineTo(refPts[1].x, refPts[1].y);
    ctx.strokeStyle = '#2563EB';
    ctx.lineWidth = 4;
    ctx.stroke();
  }
};


useEffect(() => {
  drawOverlay();
}, [points, refPts, img, imgUrl]);

  const dist = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);

 
const measurement = React.useMemo(() => {
  if (points.length !== 4 || refPts.length !== 2) return null;

  const validRefLen = Number(refLen);
  if (!Number.isFinite(validRefLen) || validRefLen <= 0) return null;

  const refPx = dist(refPts[0], refPts[1]);
  if (!Number.isFinite(refPx) || refPx < 20) return null;

  const scale = validRefLen / refPx;

  const w = dist(points[0], points[1]) * scale;
  const h = dist(points[1], points[2]) * scale;

  if (!Number.isFinite(w) || !Number.isFinite(h) || w <= 0 || h <= 0) {
    return null;
  }

  return { w, h };
}, [points, refPts, refLen]);

const finalW = manualW.trim() !== ''
  ? toMm(Number(manualW) || 0, u)
  : measurement?.w || 0;

const finalH = manualH.trim() !== ''
  ? toMm(Number(manualH) || 0, u)
  : measurement?.h || 0;

const canSave =
  Number.isFinite(finalW) &&
  Number.isFinite(finalH) &&
  finalW > 0 &&
  finalH > 0;

  const saveScrap = () => {
    addPiece({ name: 'Scrap piece', width: Math.round(finalW), height: Math.round(finalH), quantity: 1, rotationAllowed: true });
   setMode('idle');
    if (imageUrlRef.current) {
      URL.revokeObjectURL(imageUrlRef.current);
      imageUrlRef.current = null;
    }
    setImgUrl(null);
    setImg(null);
    setPoints([]);
    setRefPts([]);
    setManualW(''); setManualH('');
  };

  return (
    <div className="p-4 sm:p-6 max-w-[900px] mx-auto">
      <div className="mb-6">
        <h1 className="font-display text-2xl font-bold text-[#172B21]">Smart Scrap Scanner</h1>
        <p className="text-sm text-[#64748B] mt-1">Measure a rectangular scrap piece from a photo using a reference object of known length.</p>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 text-xs text-amber-700 flex items-start gap-2 mb-4">
        <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0" />
        Measurements are estimates from a calibrated photo, not exact. Photograph flat from above with a ruler visible. Always verify before cutting.
      </div>

      {error && <div className="bg-red-50 border border-red-200 text-[#DC2626] rounded-xl px-4 py-3 text-sm mb-4">{error}</div>}

      {mode === 'idle' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button onClick={startCamera} disabled={cameraBusy} className="bg-white rounded-2xl border-2 border-[#E2E8E4] hover:border-[#16A34A] p-8 text-center transition disabled:opacity-60">
            <Camera className="w-10 h-10 text-[#15803D] mx-auto mb-3" />
            <div className="font-semibold text-[#172B21]">{cameraBusy ? 'Opening camera…' : 'Open camera'}</div>
            <div className="text-xs text-[#64748B] mt-1">Photograph the scrap live</div>
          </button>
          <button onClick={() => fileRef.current?.click()} className="bg-white rounded-2xl border-2 border-[#E2E8E4] hover:border-[#16A34A] p-8 text-center transition">
            <Upload className="w-10 h-10 text-[#15803D] mx-auto mb-3" />
            <div className="font-semibold text-[#172B21]">Upload photo</div>
            <div className="text-xs text-[#64748B] mt-1">Choose an image file</div>
          </button>
          <input ref={fileRef} type="file" accept="image/jpeg,image/png,image/webp" className="hidden" onChange={onUpload} />
        </div>
      )}

      {mode === 'camera' && (
        <div className="bg-white rounded-2xl border border-[#E2E8E4] p-4">
          
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            aria-label="Live camera preview"
            className="w-full rounded-xl bg-black"
            style={{ maxHeight: 400 }}
          />

          <div className="flex items-center justify-center gap-3 mt-3">
            <button onClick={capture} className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#16A34A] text-white font-semibold hover:bg-[#15803D]"><Camera className="w-4 h-4" /> Capture</button>
            <button onClick={() => openCamera(facingMode === 'environment' ? 'user' : 'environment')} className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-[#E2E8E4] text-[#64748B] hover:bg-[#F4F7F5]"><SwitchCamera className="w-4 h-4" /> Switch</button>
            <button onClick={() => { stopCamera(); setMode('idle'); }} className="px-4 py-2.5 rounded-lg border border-[#E2E8E4] text-[#64748B] hover:bg-[#F4F7F5]">Cancel</button>
          </div>
        </div>
      )}

      {mode === 'review' && imgUrl && (
        <div className="bg-white rounded-2xl border border-[#E2E8E4] p-4">
        <canvas
          ref={canvasRef}
          onClick={onCanvasClick}
          className="block w-full rounded-xl cursor-crosshair touch-none"
          style={{ height: 'auto' }}
        />          <div className="rounded-xl border border-[#E2E8E4] p-4 mb-4">
            <h2 className="font-semibold text-[#172B21]">Material identification</h2>
            <p className="text-xs text-[#64748B] mt-1">AI results are visual estimates. A photo cannot verify composition, thickness, or internal structure.</p>
            <p className="text-xs text-[#64748B] mt-1">When you scan, the selected image is uploaded to ScrapSmart storage and sent to its configured AI service for analysis.</p>
            <button onClick={scanMaterial} disabled={scanning} className="mt-3 px-4 py-2 rounded-lg bg-[#172B21] text-white font-semibold disabled:opacity-50">{scanning ? 'Analyzing image…' : scanResult ? 'Scan again' : 'Scan material'}</button>
            {scanError && <p role="alert" className="text-sm text-red-700 mt-2">{scanError}</p>}
            {scanResult && <div className="mt-3 text-sm text-[#334155]" aria-live="polite">
              <p><strong>Likely material:</strong> {scanResult.category === 'solid_wood' ? 'Solid wood' : MATERIALS.find((m) => m.id === scanResult.category)?.name || 'Unknown'}{Number.isFinite(scanResult.confidence) ? ` · ${Math.round(scanResult.confidence * 100)}% confidence` : ''}</p>
              <p className="mt-1">{scanResult.observations}</p>
              {scanResult.condition && <p className="mt-1"><strong>Visible condition:</strong> {scanResult.condition}</p>}
            </div>}
            <div className="grid sm:grid-cols-2 gap-3 mt-3">
              <label className="text-xs">{scanResult ? 'Confirm material' : 'Choose material manually'}<select value={selectedType} onChange={(e) => setSelectedType(e.target.value)} className="block w-full mt-1 p-2 border rounded-lg">{MATERIALS.map((m) => <option key={m.id} value={m.id}>{m.name}</option>)}</select></label>
              <label className="text-xs">Thickness (mm)<input type="number" min="0" step="any" value={thickness} onChange={(e) => setThickness(e.target.value)} className="block w-full mt-1 p-2 border rounded-lg" placeholder="Confirm thickness" /></label>
              <label className="text-xs">Sheet length (mm)<input type="number" min="1" value={length} onChange={(e) => setLength(e.target.value)} className="block w-full mt-1 p-2 border rounded-lg" /></label>
              <label className="text-xs">Sheet width (mm)<input type="number" min="1" value={width} onChange={(e) => setWidth(e.target.value)} className="block w-full mt-1 p-2 border rounded-lg" /></label>
            </div>
            <button onClick={useMaterial} className="mt-3 px-4 py-2 rounded-lg bg-[#16A34A] text-white font-semibold">Use Material in Project</button>
          </div>

        <canvas
          ref={canvasRef}
          onClick={onCanvasClick}
          className="block w-full rounded-xl cursor-crosshair touch-none"
          style={{ height: 'auto' }}
        />
          <div className="mt-4 space-y-3">
            <div className="text-sm text-[#64748B]">
              {points.length < 4
                ? <span className="flex items-center gap-1.5"><Crosshair className="w-4 h-4 text-[#16A34A]" /> Click the 4 corners of the scrap in order ({points.length}/4)</span>
                : refPts.length < 2
                ? <span className="flex items-center gap-1.5"><Ruler className="w-4 h-4 text-amber-500" /> Click the two ends of a reference object of known length ({refPts.length}/2)</span>
                : <span className="text-[#15803D] font-medium">Measurement ready — review and correct below.</span>}
            </div>
            <div className="flex items-center gap-3">
              <label className="text-sm text-[#64748B]">Reference length:</label>

<input
  type="number"
  min={1}
  max={5000}
  step={1}
  value={refLen}
  onChange={(e) => {
    const value = e.target.value;
    setRefLen(value === '' ? '' : Number(value));
  }}
  className="w-24 px-2 py-1.5 rounded-lg border border-[#E2E8E4] text-sm"
/>





              <span className="text-sm text-[#64748B]">mm</span>
            </div>
            {measurement && (
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-[#64748B] font-medium">Detected width ({u})</label>
                  <input type="number" value={manualW || Number(fromMm(measurement.w, u)).toFixed(u === 'mm' ? 0 : 1)} onChange={(e) => setManualW(e.target.value)} className="w-full mt-1 px-3 py-2 rounded-lg border border-[#E2E8E4] text-sm" placeholder="Correct if needed" />
                </div>
                <div>
                  <label className="text-xs text-[#64748B] font-medium">Detected height ({u})</label>
                  <input type="number" value={manualH || Number(fromMm(measurement.h, u)).toFixed(u === 'mm' ? 0 : 1)} onChange={(e) => setManualH(e.target.value)} className="w-full mt-1 px-3 py-2 rounded-lg border border-[#E2E8E4] text-sm" placeholder="Correct if needed" />
                </div>
              </div>
            )}
            <div className="flex items-center gap-2 pt-2">
              <button onClick={saveScrap} disabled={!finalW || !finalH} className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#16A34A] text-white font-semibold hover:bg-[#15803D] disabled:opacity-40"><Save className="w-4 h-4" /> Save as piece</button>
              <button onClick={() => { setPoints([]); setRefPts([]); setManualW(''); setManualH(''); }} className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-[#E2E8E4] text-[#64748B] hover:bg-[#F4F7F5]"><RefreshCw className="w-4 h-4" /> Redo points</button>

              <button
                onClick={() => {
                  if (imageUrlRef.current) {
                    URL.revokeObjectURL(imageUrlRef.current);
                    imageUrlRef.current = null;
                  }
                  setImgUrl(null);
                  setImg(null);
                  setPoints([]);
                  setRefPts([]);
                  setManualW('');
                  setManualH('');
                  setScanResult(null);
                  setScanError('');
                  setError('');
                  setMode('idle');
                }}
                className="px-4 py-2.5 rounded-lg border border-[#E2E8E4] text-[#64748B] hover:bg-[#F4F7F5]"
              >
                Start over
              </button>

            </div>
            <p className="text-xs text-[#94A3B8]">Saving adds the scrap to your cut list on the Dashboard. It is not added automatically until you confirm.</p>
          </div>
        </div>
      )}
    </div>
  );
}
