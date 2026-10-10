import React from 'react';
import { getMaterialTextureStyle } from '@/lib/materials';

export default function MaterialSwatch({ material, className = 'h-28' }) {
  const edgeStyle = material.texture.type === 'plywood'
    ? { background: `repeating-linear-gradient(0deg, ${material.texture.layers[0]} 0 3px, ${material.texture.layers[1]} 3px 6px)` }
    : { background: material.edge };

  return (
    <div className={`relative overflow-hidden rounded-xl border border-black/5 ${className}`} style={getMaterialTextureStyle(material)}>
      <div className="absolute inset-0" style={{ boxShadow: 'inset 0 2px 8px rgba(30,30,30,0.15)' }} />
      <div className="absolute bottom-1.5 left-2 right-2 h-2 rounded-sm" style={{ ...edgeStyle, opacity: 0.8 }} />
    </div>
  );
}
