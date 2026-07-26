import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerformanceMonitor } from '@react-three/drei';
import * as THREE from 'three';

const PARTICLE_COUNT = 120;

function Particles({ count, reducedMotion }) {
  const meshRef = useRef();
  
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const x = (Math.random() - 0.5) * 30;
      const y = (Math.random() - 0.5) * 30;
      const z = (Math.random() - 0.5) * 15;
      
      const speed = Math.random() * 0.015 + 0.005;
      const xSpeed = (Math.random() - 0.5) * 0.005;
      
      const isHeart = Math.random() > 0.5;
      const color = isHeart ? new THREE.Color('#E27D8F') : new THREE.Color('#D4A574');
      
      temp.push({ x, y, z, speed, xSpeed, color, initialY: y });
    }
    return temp;
  }, []);

  const colorArray = useMemo(() => {
    const array = new Float32Array(PARTICLE_COUNT * 3);
    particles.forEach((p, i) => {
      p.color.toArray(array, i * 3);
    });
    return array;
  }, [particles]);

  useFrame((state) => {
    if (reducedMotion || !meshRef.current) return;
    
    // Subtle Parallax with Scroll
    state.camera.position.y = -window.scrollY * 0.005;
    
    // Mouse subtle parallax (optional nice-to-have)
    state.camera.position.x += (state.pointer.x * 0.5 - state.camera.position.x) * 0.05;
    state.camera.lookAt(0, 0, 0);

    // Update only the active count based on PerformanceMonitor
    for (let i = 0; i < count; i++) {
      const particle = particles[i];
      particle.y += particle.speed;
      particle.x += particle.xSpeed;
      
      if (particle.y > 15) {
        particle.y = -15;
        particle.x = (Math.random() - 0.5) * 30;
      }

      dummy.position.set(particle.x, particle.y, particle.z);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[null, null, PARTICLE_COUNT]}>
      <circleGeometry args={[0.06, 12]} />
      <meshBasicMaterial 
        transparent 
        opacity={0.25} 
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        vertexColors={true}
      />
      <instancedBufferAttribute 
        attach="instanceColor" 
        args={[colorArray, 3]} 
      />
    </instancedMesh>
  );
}

export function HeroParticles() {
  const [dpr, setDpr] = useState([1, 2]);
  const [count, setCount] = useState(PARTICLE_COUNT);
  const containerRef = useRef(null);
  const [inView, setInView] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [webGLSupported, setWebGLSupported] = useState(true);

  useEffect(() => {
    // Check reduced motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
    const listener = (e) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', listener);
    
    // Check WebGL support
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) setWebGLSupported(false);
    } catch (e) {
      setWebGLSupported(false);
    }

    // Intersection Observer to pause render
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      { threshold: 0 }
    );
    
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    
    return () => {
      mediaQuery.removeEventListener('change', listener);
      observer.disconnect();
    };
  }, []);

  if (!webGLSupported || reducedMotion) {
    return null; // Fallback is handled by the CSS gradient behind this component
  }

  return (
    <div ref={containerRef} className="absolute inset-0 z-0 pointer-events-none">
      <Canvas 
        camera={{ position: [0, 0, 10], fov: 50 }}
        dpr={dpr}
        frameloop={inView ? 'always' : 'never'}
        gl={{ alpha: true, antialias: false, powerPreference: 'low-power' }}
      >
        <PerformanceMonitor 
          onDecline={() => setCount(Math.floor(PARTICLE_COUNT / 2))}
          onIncline={() => setCount(PARTICLE_COUNT)}
          onChange={({ factor }) => {
            setDpr([1, Math.round(1 + factor)]); 
          }}
        >
          <Particles count={count} reducedMotion={reducedMotion} />
        </PerformanceMonitor>
      </Canvas>
    </div>
  );
}
