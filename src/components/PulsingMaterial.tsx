// File: src/components/PulsingMaterial.tsx
// Description: A custom material for the highlighted point on the 3D model.
"use client";

import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import { MeshBasicMaterial } from 'three';

type PulsingMaterialProps = {
  isActive: boolean;
};

export default function PulsingMaterial({ isActive }: PulsingMaterialProps) {
  const materialRef = useRef<MeshBasicMaterial>(null!);

  useFrame(({ clock }) => {
    if (isActive && materialRef.current) {
      // Create a sine wave based on time to make the opacity pulse
      const pulse = (Math.sin(clock.getElapsedTime() * 4) + 1) / 2; // a value between 0 and 1
      materialRef.current.opacity = 0.5 + pulse * 0.5; // pulse between 0.5 and 1.0
    }
  });

  return (
    <meshBasicMaterial
      ref={materialRef}
      color={isActive ? "#facc15" : "#ADD8E6"} // A bright yellow when active
      transparent
      opacity={isActive ? 1 : 0.7}
      depthTest={false} // Ensures it's visible through the model
      toneMapped={false}
    />
  );
}
