'use client';

import { useRef, useState, useCallback, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Stars, Preload } from '@react-three/drei';
import * as THREE from 'three';
import { Sun } from './Sun';
import { Planet } from './Planet';
import { InfoPanel } from './InfoPanel';
import { Legend } from './Legend';
import { PLANETS } from '../data/planets';
import type { Planet as PlanetType } from '../data/planets';

type SelectedBody = {
  type: 'sun' | 'planet' | 'moon';
  name: string;
  data?: PlanetType | null;
};

type OrbitControlsRefType = {
  target: THREE.Vector3;
  enabled: boolean;
} | null;

function CameraController({ 
  targetPlanet, 
  controlsRef 
}: { 
  targetPlanet: string | null; 
  controlsRef: React.RefObject<OrbitControlsRefType> 
}) {
  const { camera } = useThree();
  const targetPosition = useRef(new THREE.Vector3(0, 30, 80));
  const lookAtPosition = useRef(new THREE.Vector3(0, 0, 0));
  const prevTargetPlanet = useRef<string | null>(null);
  const isTransitioning = useRef(false);
  const transitionProgress = useRef(0);
  
  useEffect(() => {
    if (targetPlanet !== prevTargetPlanet.current) {
      isTransitioning.current = true;
      transitionProgress.current = 0;
      prevTargetPlanet.current = targetPlanet;
    }
  }, [targetPlanet]);
  
  useFrame((state) => {
    const time = state.clock.elapsedTime;
    
    if (isTransitioning.current) {
      transitionProgress.current += 0.02;
      
      let targetCam = new THREE.Vector3(0, 30, 80);
      let targetLookAt = new THREE.Vector3(0, 0, 0);
      
      if (targetPlanet === 'Sun') {
        targetCam = new THREE.Vector3(0, 20, 40);
      } else if (targetPlanet) {
        const index = PLANETS.findIndex(p => p.name === targetPlanet);
        if (index !== -1) {
          const scaledDistance = 15 + index * 12;
          const orbitSpeed = (1 / Math.sqrt(PLANETS[index].orbitalPeriod)) * 0.3;
          const angle = time * orbitSpeed;
          // XY plane: x and y coordinates, z = 0
          const planetX = Math.cos(angle) * scaledDistance;
          const planetY = Math.sin(angle) * scaledDistance;
          targetCam = new THREE.Vector3(planetX + scaledDistance * 0.5, planetY + 15, 40);
          targetLookAt = new THREE.Vector3(planetX, planetY, 0);
        }
      }
      
      targetPosition.current.lerp(targetCam, 0.05);
      lookAtPosition.current.lerp(targetLookAt, 0.05);
      
      camera.position.lerp(targetPosition.current, 0.05);
      camera.lookAt(lookAtPosition.current);
      
      if (transitionProgress.current >= 1) {
        isTransitioning.current = false;
      }
    } else if (targetPlanet && targetPlanet !== 'Sun') {
      const index = PLANETS.findIndex(p => p.name === targetPlanet);
      if (index !== -1) {
        const scaledDistance = 15 + index * 12;
        const orbitSpeed = (1 / Math.sqrt(PLANETS[index].orbitalPeriod)) * 0.3;
        const angle = time * orbitSpeed;
        // XY plane: x and y coordinates, z = 0
        const planetX = Math.cos(angle) * scaledDistance;
        const planetY = Math.sin(angle) * scaledDistance;
        
        if (controlsRef.current && controlsRef.current.target) {
          controlsRef.current.target.set(planetX, planetY, 0);
        }
      }
    } else if (!targetPlanet) {
      if (controlsRef.current && controlsRef.current.target) {
        controlsRef.current.target.set(0, 0, 0);
      }
    }
  });
  
  return null;
}

function SolarSystemScene({ 
  onSelectBody, 
  controlsRef,
  orbitTrackOpacity 
}: { 
  onSelectBody: (body: SelectedBody) => void; 
  controlsRef: React.RefObject<OrbitControlsRefType>;
  orbitTrackOpacity: number;
}) {
  return (
    <>
      <color attach="background" args={['#0a0a12']} />
      <fog attach="fog" args={['#0a0a12', 100, 300]} />
      
      <Stars
        radius={300}
        depth={100}
        count={5000}
        factor={4}
        saturation={0}
        fade
        speed={0.5}
      />
      
      <ambientLight intensity={0.4} />
      <hemisphereLight intensity={0.3} color="#4488ff" groundColor="#442200" />
      
      <Sun onClick={() => onSelectBody({ type: 'sun', name: 'Sun' })} />
      
      {PLANETS.map((planet, index) => (
        <Planet
          key={planet.name}
          planet={planet}
          orbitIndex={index}
          onClick={() => onSelectBody({ type: 'planet', name: planet.name, data: planet })}
          isSelected={false}
          onMoonClick={(moon) => onSelectBody({ type: 'moon', name: moon.name })}
          orbitTrackOpacity={orbitTrackOpacity}
        />
      ))}
      
      <OrbitControls
        ref={controlsRef as React.RefObject<any>}
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        minDistance={20}
        maxDistance={200}
        maxPolarAngle={Math.PI * 0.8}
        minPolarAngle={Math.PI * 0.1}
      />
    </>
  );
}

export function SolarSystem() {
  const [selectedBody, setSelectedBody] = useState<SelectedBody | null>(null);
  const [targetPlanet, setTargetPlanet] = useState<string | null>(null);
  const [orbitTrackOpacity, setOrbitTrackOpacity] = useState(0.3);
  const controlsRef = useRef<OrbitControlsRefType>(null);
  
  const handleSelectBody = useCallback((body: SelectedBody) => {
    setSelectedBody(body);
    setTargetPlanet(body.name);
  }, []);
  
  const handleClose = useCallback(() => {
    setSelectedBody(null);
    setTargetPlanet(null);
  }, []);
  
  return (
    <div className="w-full h-full relative">
      <Canvas
        camera={{ position: [0, 30, 80], fov: 60 }}
        gl={{ antialias: true, alpha: false }}
        dpr={[1, 2]}
      >
        <CameraController targetPlanet={targetPlanet} controlsRef={controlsRef} />
        <SolarSystemScene 
          onSelectBody={handleSelectBody} 
          controlsRef={controlsRef} 
          orbitTrackOpacity={orbitTrackOpacity}
        />
        <Preload all />
      </Canvas>
      
      <InfoPanel
        selectedBody={selectedBody}
        onClose={handleClose}
      />
      
      <Legend
        selectedBody={selectedBody?.name ?? null}
 onSelect={(name, type) => handleSelectBody({ type, name, data: type === 'planet' ? PLANETS.find(p => p.name === name) : null })}
      />
      
      {/* Orbit Track Opacity Slider */}
      <div className="fixed top-4 left-4 z-50 bg-gray-900/90 backdrop-blur-sm px-5 py-4 rounded-lg shadow-xl border border-white/20">
        <label className="block text-sm text-white font-medium mb-3">
          Orbit Opacity: {(orbitTrackOpacity * 100).toFixed(0)}%
        </label>
        <input
          type="range"
          min="0"
          max="1"
          step="0.05"
          value={orbitTrackOpacity}
          onChange={(e) => setOrbitTrackOpacity(parseFloat(e.target.value))}
          className="w-40 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
        />
      </div>
      
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 text-xs text-text-muted bg-surface-surface/80 backdrop-blur-sm px-4 py-2 rounded-full">
        3D Solar System Explorer
      </div>
    </div>
  );
}
