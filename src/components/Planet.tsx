'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Line } from '@react-three/drei';
import * as THREE from 'three';
import type { Planet, PlanetType, Moon as MoonType } from '../data/planets';

interface PlanetProps {
  planet: Planet;
  orbitIndex: number;
  onClick?: () => void;
  isSelected?: boolean;
  onMoonClick?: (moon: MoonType) => void;
  orbitTrackOpacity?: number;
  orbitTrackColor?: string;
}

function createRingTexture(color: string, opacity: number): THREE.CanvasTexture {
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
  
  return texture;
}

function createTerrestrialTexture(color1: string, color2: string): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 256;
  const ctx = canvas.getContext('2d')!;
  
  const gradient = ctx.createLinearGradient(0, 0, 0, 256);
  gradient.addColorStop(0, color1);
  gradient.addColorStop(0.5, color2);
  gradient.addColorStop(1, color1);
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 512, 256);
  
  for (let i = 0; i < 400; i++) {
    const x = Math.random() * 512;
    const y = Math.random() * 256;
    const radius = Math.random() * 8 + 2;
    const alpha = Math.random() * 0.3 + 0.1;
    
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(0, 0, 0, ${alpha})`;
    ctx.fill();
  }
  
  for (let i = 0; i < 200; i++) {
    const x = Math.random() * 512;
    const y = Math.random() * 256;
    const radius = Math.random() * 3 + 1;
    
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 255, 255, ${Math.random() * 0.15})`;
    ctx.fill();
  }
  
  return new THREE.CanvasTexture(canvas);
}

function createGasGiantTexture(color1: string, color2: string): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext('2d')!;
  
  for (let y = 0; y < 512; y += 4) {
    const bandIntensity = Math.sin((y / 512) * Math.PI * 8) * 0.5 + 0.5;
    const color = bandIntensity > 0.5 ? color1 : color2;
    ctx.fillStyle = color;
    ctx.fillRect(0, y, 1024, 4);
  }
  
  for (let i = 0; i < 50; i++) {
    const x = Math.random() * 1024;
    const y = Math.random() * 512;
    const width = Math.random() * 200 + 50;
    const height = Math.random() * 20 + 5;
    
    ctx.fillStyle = `rgba(${Math.random() > 0.5 ? 255 : 0}, ${Math.random() > 0.5 ? 200 : 100}, ${Math.random() > 0.5 ? 150 : 50}, 0.1)`;
    ctx.beginPath();
    ctx.ellipse(x, y, width, height, 0, 0, Math.PI * 2);
    ctx.fill();
  }
  
  const spotX = 700;
  const spotY = 300;
  const spotRadius = 40;
  ctx.beginPath();
  ctx.ellipse(spotX, spotY, spotRadius * 1.5, spotRadius, 0, 0, Math.PI * 2);
  const spotGradient = ctx.createRadialGradient(spotX, spotY, 0, spotX, spotY, spotRadius * 1.5);
  spotGradient.addColorStop(0, '#cc4422');
  spotGradient.addColorStop(0.5, '#aa3311');
  spotGradient.addColorStop(1, 'transparent');
  ctx.fillStyle = spotGradient;
  ctx.fill();
  
  return new THREE.CanvasTexture(canvas);
}

function createIceGiantTexture(color1: string, color2: string): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 256;
  const ctx = canvas.getContext('2d')!;
  
  const gradient = ctx.createLinearGradient(0, 0, 512, 256);
  gradient.addColorStop(0, color1);
  gradient.addColorStop(0.3, color2);
  gradient.addColorStop(0.7, color1);
  gradient.addColorStop(1, color2);
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 512, 256);
  
  for (let y = 0; y < 256; y += 8) {
    const wave = Math.sin((y / 256) * Math.PI * 6) * 20;
    ctx.fillStyle = `rgba(255, 255, 255, ${0.05 + Math.random() * 0.05})`;
    ctx.fillRect(0, y + wave, 512, 4);
  }
  
  return new THREE.CanvasTexture(canvas);
}

function getTextureForPlanetType(type: PlanetType, color1: string, color2: string): THREE.CanvasTexture {
  switch (type) {
    case 'terrestrial':
      return createTerrestrialTexture(color1, color2);
    case 'gas-giant':
      return createGasGiantTexture(color1, color2);
    case 'ice-giant':
      return createIceGiantTexture(color1, color2);
    default:
      return createTerrestrialTexture(color1, color2);
  }
}

export function Planet({ planet, orbitIndex, onClick, isSelected, onMoonClick, orbitTrackOpacity, orbitTrackColor }: PlanetProps) {
  const planetRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  
  const scaledRadius = Math.max(0.3, Math.log10(planet.radius) * 0.5);
  const scaledDistance = 15 + orbitIndex * 12;
  const orbitSpeed = (1 / Math.sqrt(planet.orbitalPeriod)) * 0.3;
  
  const texture = useMemo(
    () => getTextureForPlanetType(planet.type, planet.color, planet.secondaryColor),
    [planet.type, planet.color, planet.secondaryColor]
  );
  
  const material = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      map: texture,
      roughness: planet.type === 'terrestrial' ? 0.8 : 0.6,
      metalness: planet.type === 'terrestrial' ? 0.1 : 0.2,
    });
  }, [texture, planet.type]);
  
  // Orbit track points in XY plane (z=0), centered at origin where sun is
  const orbitPoints = useMemo(() => {
    const points: [number, number, number][] = [];
    for (let i = 0; i <= 128; i++) {
      const angle = (i / 128) * Math.PI * 2;
      // XY plane: x and y coordinates, z = 0
      points.push([Math.cos(angle) * scaledDistance, Math.sin(angle) * scaledDistance, 0]);
    }
    return points;
  }, [scaledDistance]);

  // Configurable orbit track opacity (default 0.2, or 0.6 when selected)
  const orbitOpacity = orbitTrackOpacity ?? (isSelected ? 0.6 : 0.2);
  
  // Configurable orbit track color (default white)
  const orbitColor = orbitTrackColor ?? '#ffffff';
  
  const ringMaterial = useMemo(() => {
    if (!planet.hasRings) return null;
    const ringColor = planet.name === 'Saturn' ? '#c4a060' 
                    : planet.name === 'Uranus' ? '#72d5e5'
                    : planet.name === 'Jupiter' ? '#a08060'
                    : '#6080a0';
    const ringOpacity = planet.name === 'Saturn' ? 0.85 
                       : planet.name === 'Uranus' ? 0.6
                       : 0.4;
    return new THREE.MeshBasicMaterial({
      map: createRingTexture(ringColor, ringOpacity),
      transparent: true,
      opacity: ringOpacity,
      side: THREE.DoubleSide,
    });
  }, [planet.hasRings, planet.name]);
  
  const ringInnerRadius = scaledRadius * 1.4;
  const ringOuterRadius = scaledRadius * 2.2;
  const ringTilt = planet.ringTilt || 0.47;
  
  const moonRefs = useRef<Array<THREE.Mesh | null>>([]);
  moonRefs.current = planet.moons.map((_, i) => moonRefs.current[i] || null);
  
  const moonMaterials = useMemo(() => {
    return planet.moons.map(moon => new THREE.MeshStandardMaterial({
      color: moon.color,
      roughness: 0.8,
      metalness: 0.1,
    }));
  }, [planet.moons]);
  
  const moonOrbits = useMemo(() => {
    return planet.moons.map((moon, idx) => {
      const baseDistance = scaledRadius * 1.5 + 0.3;
      const scaledMoonDistance = baseDistance + idx * 0.5;
      const moonOrbitSpeed = Math.min(2, (1 / Math.max(0.1, moon.orbitalPeriod))) * 2;
      return {
        distance: scaledMoonDistance,
        speed: moonOrbitSpeed,
        offset: idx * (Math.PI / Math.max(1, planet.moons.length)),
      };
    });
  }, [planet.moons, scaledRadius]);
  
  useFrame((state) => {
    const time = state.clock.elapsedTime;
    
    if (groupRef.current) {
      const angle = time * orbitSpeed;
      // XY plane: x and y coordinates, z = 0
      groupRef.current.position.x = Math.cos(angle) * scaledDistance;
      groupRef.current.position.y = Math.sin(angle) * scaledDistance;
      groupRef.current.position.z = 0;
    }
    
    if (planetRef.current) {
      planetRef.current.rotation.y = time * 0.5;
      
      if (isSelected) {
        const pulse = Math.sin(time * 3) * 0.1 + 1;
        planetRef.current.scale.setScalar(pulse);
      } else {
        planetRef.current.scale.setScalar(1);
      }
    }
    
    moonRefs.current.forEach((moonRef, idx) => {
      if (moonRef) {
        const moon = planet.moons[idx];
        if (moon && moonOrbits[idx]) {
          const orbit = moonOrbits[idx];
          const moonAngle = time * orbit.speed + orbit.offset;
          // Moons orbit in XY plane around planet
          moonRef.position.x = Math.cos(moonAngle) * orbit.distance;
          moonRef.position.y = Math.sin(moonAngle) * orbit.distance;
          moonRef.position.z = Math.sin(moonAngle * 0.3) * 0.1;
          moonRef.rotation.y = time * 0.2;
        }
      }
    });
  });
  
  return (
    <>
      {/* Orbit track - rendered at origin (sun center) in XY plane, not moving with planet */}
      <Line
        points={orbitPoints}
        color={orbitColor}
        lineWidth={1}
        transparent
        opacity={orbitOpacity}
      />
      
      {/* Planet group - moves along orbit in XY plane */}
      <group ref={groupRef}>
        <mesh
          ref={planetRef}
          onClick={(e) => {
            e.stopPropagation();
            onClick?.();
          }}
          material={material}
        >
          <sphereGeometry args={[scaledRadius, 64, 64]} />
        </mesh>
        
        {planet.hasRings && ringMaterial && (
          <mesh
            ref={ringRef}
            material={ringMaterial}
            rotation={[Math.PI / 2 - ringTilt, 0, 0]}
          >
            <ringGeometry args={[ringInnerRadius, ringOuterRadius, 64]} />
          </mesh>
        )}
        
        {planet.moons.map((moon, idx) => {
          const moonRadius = Math.max(0.06, Math.log10(moon.radius) * 0.12);
          return (
            <mesh
              key={moon.name}
              ref={(el) => { moonRefs.current[idx] = el; }}
              material={moonMaterials[idx]}
              onClick={(e) => {
                e.stopPropagation();
                onMoonClick?.(moon);
              }}
            >
              <sphereGeometry args={[moonRadius, 12, 12]} />
            </mesh>
          );
        })}
      </group>
    </>
  );
}
