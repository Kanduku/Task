// SolarSystem.jsx
import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Environment, Stars } from '@react-three/drei';
import * as THREE from 'three';
import { useGLTF } from '@react-three/drei';

export default function SolarSystemScene() {
  return (
    <Canvas
      camera={{ position: [0, 2, 3], fov: 50 }} // Zoomed-in camera position
      style={{
        background: 'black', // Background color for the canvas
        width: '100%',       // Full width of the screen
     minHeight:'100vh',   // Full height of the screen
        position: 'fixed',
        top: 0,
        left: 0,
        bottom: 0,
        zIndex: -1,          // Set zIndex to place Canvas behind other content
      }}
    >
      {/* Background stars */}
      <Stars radius={100} depth={80} count={1000} factor={4} />

      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 10, 7.5]} intensity={1} />

      {/* Environment lighting preset */}
      <Environment preset="sunset" background={false} />

      {/* OrbitControls for camera movement */}
      <OrbitControls enabled={true} />

      {/* GLB Model */}
      <Model url="solar_system.glb" />
    </Canvas>
  );
}

// Model component (to load and animate GLB)
function Model({ url }) {
  const group = useRef();
  const { scene, animations } = useGLTF(url); // Load the GLB model
  const mixer = useRef();
  const { camera } = useThree();

  useEffect(() => {
    if (animations && animations.length > 0) {
      mixer.current = new THREE.AnimationMixer(scene);
      // Find the animation named 'solar system'
      const clip = THREE.AnimationClip.findByName(animations, 'solar system');
      if (clip) {
        const action = mixer.current.clipAction(clip);
        action.setEffectiveTimeScale(0.01);  // Adjusted time scale for slower animation
        action.play();
      } else {
        console.warn('solar system animation not found');
      }
    }
  }, [animations, scene]);

  useFrame((state, delta) => {
    mixer.current?.update(delta);

    const time = state.clock.getElapsedTime();
    const radius = 0;
    const speed = 2;

    const x = Math.cos(time * speed) * radius;
    const z = Math.sin(time * speed) * radius;

    if (group.current) {
      group.current.position.set(x, 0, z);
    }

    // Camera follows the model in an orbit
    const camRadius = 3;  // Reduced radius for a zoomed-in effect
    const camX = Math.sin(time * 0.02) * camRadius;
    const camZ = Math.cos(time * 0.02) * camRadius;
    const camY = 2;

    camera.position.set(camX, camY, camZ);
    camera.lookAt(0, 0, 0); // Always look at the center
  });

  return <primitive ref={group} object={scene} scale={0.9} />;
}
