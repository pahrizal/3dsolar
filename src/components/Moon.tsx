'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import type { Moon } from '../data/planets';

interface MoonProps {
  moon: Moon;
  parentPosition: { x: number; z: number };
  index: number;
  onClick?: () => void;
}

export function Moon({ moon, parentPosition, index, onClick }: MoonProps) {
  const moonRef = useRef<THREE.Mesh>(null);
  
  const scaledRadius = Math.max(0.08, Math.log10(moon.radius) * 0.15);
  const scaledDistance = 0.8 + index * 0.6;
  const orbitSpeed = (1 / moon.orbitalPeriod) * 5;
  
  useFrame((state) => {
    if (moonRef.current) {
      const time = state.clock.elapsedTime;
      const angle = time * orbitSpeed + index * Math.PI / 3;
      
      moonRef.current.position.x = parentPosition.x + Math.cos(angle) * scaledDistance;
      moonRef.current.position.z = parentPosition.z + Math.sin(angle) * scaledDistance;
      moonRef.current.position.y = Math.sin(angle * 0.5) * 0.1;
      moonRef.current.rotation.y = time * 0.3;
    }
  });
  
  const material = new THREE.MeshStandardMaterial({
    color: moon.color,
    roughness: 0.8,
    metalness: 0.1,
  });
  
  return (
    <mesh
      ref={moonRef}
      onClick={(e) => {
        e.stopPropagation();
        onClick?.();
      }}
      material={material}
    >
      <sphereGeometry args={[scaledRadius, 16, 16]} />
    </mesh>
  );
}
