'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { SUN_DATA } from '../data/planets';

interface SunProps {
  onClick?: () => void;
}

export function Sun({ onClick }: SunProps) {
  const sunRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const outerGlowRef = useRef<THREE.Mesh>(null);
  const coronaRef = useRef<THREE.Mesh>(null);

  const sunRadius = 8;

  const sunMaterial = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d')!;
    
    const gradient = ctx.createRadialGradient(256, 256, 0, 256, 256, 256);
    gradient.addColorStop(0, '#fff8e0');
    gradient.addColorStop(0.2, '#ffdd66');
    gradient.addColorStop(0.4, '#ffaa00');
    gradient.addColorStop(0.7, '#ff6600');
    gradient.addColorStop(1, '#cc3300');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 512, 512);
    
    for (let i = 0; i < 3000; i++) {
      const x = Math.random() * 512;
      const y = Math.random() * 512;
      const dist = Math.sqrt((x - 256) ** 2 + (y - 256) ** 2);
      if (dist < 250 && Math.random() > 0.5) {
        ctx.fillStyle = `rgba(255, ${200 + Math.random() * 55}, ${100 + Math.random() * 100}, ${0.3 + Math.random() * 0.4})`;
        ctx.beginPath();
        ctx.arc(x, y, Math.random() * 3 + 1, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    
    const texture = new THREE.CanvasTexture(canvas);
    return new THREE.MeshBasicMaterial({ map: texture });
  }, []);

  const glowMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        color: { value: new THREE.Color('#ff6600') },
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        uniform vec3 color;
        varying vec2 vUv;
        void main() {
          float dist = distance(vUv, vec2(0.5));
          float alpha = smoothstep(0.5, 0.0, dist) * 0.6;
          alpha *= 0.8 + 0.2 * sin(time * 2.0 + dist * 10.0);
          gl_FragColor = vec4(color, alpha);
        }
      `,
      transparent: true,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
    });
  }, []);

  const coronaMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        varying vec2 vUv;
        void main() {
          float dist = distance(vUv, vec2(0.5));
          float ring = smoothstep(0.4, 0.35, dist) - smoothstep(0.5, 0.45, dist);
          float alpha = ring * (0.5 + 0.3 * sin(time * 3.0 + dist * 20.0));
          vec3 color = mix(vec3(1.0, 0.8, 0.4), vec3(1.0, 0.5, 0.2), dist);
          gl_FragColor = vec4(color, alpha * 0.7);
        }
      `,
      transparent: true,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
    });
  }, []);

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    if (glowMaterial.uniforms) {
      glowMaterial.uniforms.time.value = time;
    }
    if (coronaMaterial.uniforms) {
      coronaMaterial.uniforms.time.value = time;
    }
    if (sunRef.current) {
      sunRef.current.rotation.y = time * 0.05;
    }
    if (glowRef.current) {
      glowRef.current.rotation.z = time * 0.02;
    }
    if (coronaRef.current) {
      coronaRef.current.rotation.z = -time * 0.03;
    }
    if (outerGlowRef.current) {
      const scale = 1.15 + Math.sin(time * 1.5) * 0.05;
      outerGlowRef.current.scale.setScalar(scale);
    }
  });

  return (
    <group onClick={onClick}>
      <mesh ref={sunRef} material={sunMaterial}>
        <sphereGeometry args={[sunRadius, 64, 64]} />
      </mesh>
      
      <mesh ref={glowRef} material={glowMaterial}>
        <sphereGeometry args={[sunRadius * 1.2, 32, 32]} />
      </mesh>
      
      <mesh ref={outerGlowRef}>
        <sphereGeometry args={[sunRadius * 1.4, 32, 32]} />
        <meshBasicMaterial
          color="#ff4400"
          transparent
          opacity={0.15}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      
      <mesh ref={coronaRef} material={coronaMaterial}>
        <ringGeometry args={[sunRadius * 1.5, sunRadius * 2.2, 64]} />
      </mesh>
      
      <pointLight
        color="#ffaa33"
        intensity={6}
        distance={500}
        decay={1}
      />
      <pointLight
        color="#ff6600"
        intensity={4}
        distance={300}
        decay={1.5}
      />
      <pointLight
        color="#ffffff"
        intensity={2}
        distance={200}
        decay={1}
      />
    </group>
  );
}

export { SUN_DATA };
