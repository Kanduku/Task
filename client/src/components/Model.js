import React, { useRef, useEffect } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

export default function Model({ url }) {
  const group = useRef();
  const { scene, animations } = useGLTF(url);
  const mixer = useRef();
  const { camera } = useThree();

  useEffect(() => {
    if (animations && animations.length > 0) {
      mixer.current = new THREE.AnimationMixer(scene);
      const clip = THREE.AnimationClip.findByName(animations, 'Take 001');
      if (clip) {
        const action = mixer.current.clipAction(clip);
        action.setEffectiveTimeScale(0.5);
        action.play();
      } else {
        console.warn('Take 001 animation not found');
      }
    }
  }, [animations, scene]);

  useFrame((state, delta) => {
    mixer.current?.update(delta);

    const time = state.clock.getElapsedTime();
    const radius = 2;
    const speed = 0.5;

    const x = Math.cos(time * speed) * radius;
    const z = Math.sin(time * speed) * radius;

    if (group.current) {
      group.current.position.set(x, 0, z);
    }

    // Camera follows the model in an orbit
    const camRadius = 5;
    const camX = Math.sin(time * 0.2) * camRadius;
    const camZ = Math.cos(time * 0.2) * camRadius;
    const camY = 2;

    camera.position.set(camX, camY, camZ);
    camera.lookAt(0, 0, 0); // Always look at the center
  });

  return <primitive ref={group} object={scene} scale={0.003} />;
}
