'use client';

import { useMemo } from 'react';
import * as THREE from 'three';

interface RingsProps {
  innerRadius: number;
  outerRadius: number;
  tilt?: number;
  color?: string;
  opacity?: number;
}

export function Rings({ innerRadius, outerRadius, tilt = 0.47, color = '#c4a060', opacity = 0.7 }: RingsProps) {
  const ringMaterial = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 64;
    const ctx = canvas.getContext('2d')!;
    
    const gradient = ctx.createLinearGradient(0, 0, 512, 0);
    gradient.addColorStop(0, 'rgba(0, 0, 0, 0)');
    gradient.addColorStop(0.1, color);
    gradient.addColorStop(0.2, 'rgba(180, 160, 120, 0.3)');
    gradient.addColorStop(0.3, color);
    gradient.addColorStop(0.4, 'rgba(150, 130, 100, 0.5)');
    gradient.addColorStop(0.5, color);
    gradient.addColorStop(0.6, 'rgba(140, 120, 90, 0.4)');
    gradient.addColorStop(0.7, color);
    gradient.addColorStop(0.85, 'rgba(160, 140, 100, 0.6)');
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 512, 64);
    
    for (let x = 0; x < 512; x += 2) {
      const noise = Math.random() * 0.3;
      ctx.fillStyle = `rgba(0, 0, 0, ${noise})`;
      ctx.fillRect(x, 0, 2, 64);
    }
    
    const texture = new THREE.CanvasTexture(canvas);
    texture.rotation = Math.PI / 2;
    texture.center.set(0.5, 0.5);
    
    return new THREE.MeshBasicMaterial({
      map: texture,
      transparent: true,
      opacity: opacity,
      side: THREE.DoubleSide,
      blending: THREE.NormalBlending,
    });
  }, [color, opacity]);
  
  return (
    <mesh
      material={ringMaterial}
      rotation={[Math.PI / 2 - tilt, 0, 0]}
    >
      <ringGeometry args={[innerRadius, outerRadius, 64]} />
    </mesh>
  );
}
