import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import OdetteModel from './OdetteModel';
import StarsBackground from './StarsBackground';

export default function OdetteScene() {
  return (
    <div
      style={{
        width: '1000px', // ⬅️ Increased width
        height: '150vh',
        position: 'absolute',
        top: 0,
        left: 0,
       // ⬅️ Adjusted padding
        overflow: 'hidden',
        zIndex: 1,
      }}
    >
      <Canvas
        camera={{
          position: [-1, 1, 2.5], // ⬅️ Bring camera closer
          fov: 35,
          near: 0.1,
          far: 1000,
        }}
      >
        <ambientLight intensity={1.5} />
        <directionalLight position={[0, 10, 5]} intensity={1.2} />
        <Suspense fallback={null}>
          <StarsBackground />
          {/* 🔁 Scale up model inside OdetteModel.js if needed */}
          <OdetteModel url="/hero_odette_auspicious_charm_lobby.glb" scale={1.5} />
        </Suspense>
      </Canvas>
    </div>
  );
}
