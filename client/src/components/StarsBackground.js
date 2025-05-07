import React, { useRef, useMemo } from 'react';
import { Stars } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';


export default function StarsBackground({ count = 300 }) {
  const pointsRef = useRef();

  // Generate star positions and randomly select some to glow
  const { positions, sizes, glowFlags } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const glowFlags = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const r = 100;
      positions[i3] = (Math.random() - 0.5) * r * 2;
      positions[i3 + 1] = (Math.random() - 0.5) * r * 2;
      positions[i3 + 2] = (Math.random() - 0.5) * r * 2;
      sizes[i] = Math.random() * 1.2 + 0.5;
      glowFlags[i] = Math.random() < 0.25 ? 1 : 0; // 25% will glow
    }
    return { positions, sizes, glowFlags };
  }, [count]);

  // Animate glow stars to twinkle
  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    if (pointsRef.current) {
      const sizesAttr = pointsRef.current.geometry.attributes.size.array;
      const glowAttr = pointsRef.current.geometry.attributes.glowFlag.array;
      for (let i = 0; i < count; i++) {
        sizesAttr[i] = glowAttr[i]
          ? 1 + Math.sin(time * 2 + i) * 0.6
          : sizesAttr[i];
      }
      pointsRef.current.geometry.attributes.size.needsUpdate = true;
    }
  });

  const vertexShader = `
    attribute float size;
    attribute float glowFlag;
    varying float vGlow;

    void main() {
      vGlow = glowFlag;
      vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
      gl_PointSize = size * (300.0 / -mvPosition.z);
      gl_Position = projectionMatrix * mvPosition;
    }
  `;

  const fragmentShader = `
    varying float vGlow;

    void main() {
      float dist = length(gl_PointCoord - vec2(0.5));
      float glow = 1.0 - smoothstep(0.0, 0.5, dist);
      vec3 color = mix(vec3(1.0), vec3(1.0, 0.9, 0.7), vGlow); // subtle warm tone for glowing stars
      gl_FragColor = vec4(color, glow * vGlow);
    }
  `;

  return (
    <>
      {/* Default stars as background */}
      <Stars radius={100} depth={80} count={1600} factor={4} fade speed={1} />

      {/* Custom twinkling glowing stars */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            array={positions}
            itemSize={3}
            count={count}
          />
          <bufferAttribute
            attach="attributes-size"
            array={sizes}
            itemSize={1}
            count={count}
          />
          <bufferAttribute
            attach="attributes-glowFlag"
            array={glowFlags}
            itemSize={1}
            count={count}
          />
        </bufferGeometry>
        <shaderMaterial
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          transparent
          depthWrite={false}
        />
      </points>
    </>
  );
}
