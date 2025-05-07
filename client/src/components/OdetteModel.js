// components/OdetteModel.js
import React, { useRef, useEffect } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

export default function OdetteModel({ url }) {
  const group = useRef();
  const { scene, animations } = useGLTF(url);
  const mixer = useRef();
  const idleAction = useRef();
  const actionAction = useRef();
  const lastActionTime = useRef(0);
  const { clock } = useThree(); // removed camera

  useEffect(() => {
    if (!animations || animations.length === 0) return;

    mixer.current = new THREE.AnimationMixer(scene);

    const idleClip = THREE.AnimationClip.findByName(animations, 'city_idle');
    const actionClip = THREE.AnimationClip.findByName(animations, 'city_action');

    if (idleClip && actionClip) {
      idleAction.current = mixer.current.clipAction(idleClip);
      actionAction.current = mixer.current.clipAction(actionClip);

      actionAction.current.setLoop(THREE.LoopOnce, 1);
      actionAction.current.clampWhenFinished = true;

      idleAction.current.play();
      actionAction.current.play();
      lastActionTime.current = clock.getElapsedTime();

      mixer.current.addEventListener('finished', (e) => {
        if (e.action === actionAction.current) {
          idleAction.current.reset().play();
        }
      });
    } else {
      console.warn('city_idle or city_action not found in animations.');
    }
  }, [animations, scene, clock]);

  useFrame((_, delta) => {
    mixer.current?.update(delta);

    const time = clock.getElapsedTime();
    const interval = 15;

    if (time - lastActionTime.current > interval && actionAction.current && idleAction.current) {
      idleAction.current.stop();
      actionAction.current.reset().play();
      lastActionTime.current = time;
    }

    // ❌ Camera movement removed
    // const camRadius = 2.8;
    // const camX = Math.sin(time * 0.1) * camRadius;
    // const camZ = Math.cos(time * 0.1) * camRadius;
    // const camY = 1.8;

    // camera.position.set(camX, camY, camZ);
    // camera.lookAt(0, 1, 0);
  });

  return <primitive ref={group} object={scene} scale={0.9} />;
}
