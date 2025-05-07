import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import StarsBackground from './StarsBackground';  // Import StarsBackground component
import Model from './Model';  // Import Model component

export default function GLBViewer() {
  return (
    <Canvas
      camera={{ position: [2, 2, 4], fov: 45 }}
      style={{
        background: 'black', // Background color for the canvas
        width: '100%',       // Full width of the screen
        height: '100%',      // Full height of the screen
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: -1,          // Set zIndex to place Canvas behind other content
      }}
    >
      {/* Background stars */}
      <StarsBackground />

      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 10, 7.5]} intensity={1} />

      {/* Environment lighting preset */}
      <Environment preset="sunset" background={false} />

      {/* OrbitControls for camera movement */}
      <OrbitControls enabled={false} />

      {/* GLB Model */}
      <Model url="phoenix_bird.glb" />
    </Canvas>
  );
}
