"use client";

import { useRef } from "react";
import { useTexture } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

export function SceneBackground() {
  const meshRef = useRef<THREE.Mesh>(null!);
  const { viewport, camera } = useThree();
  const texture = useTexture("/vitruvian_background.png");

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.quaternion.copy(camera.quaternion);
      meshRef.current.position.copy(camera.position);
      meshRef.current.translateZ(-20);
    }
  });

  const distance = camera.position.distanceTo(new THREE.Vector3(0, 0, 0));
  // === THE FIX ===
  // A smaller divisor makes the background larger.
  // I've changed this from 4.8 to 3.5 to make it much bigger.
  const planeHeight = viewport.height * (distance / 3.5); 
  const textureAspect = texture.image.width / texture.image.height;
  const planeWidth = planeHeight * textureAspect;

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[planeWidth, planeHeight]} />
      <meshBasicMaterial map={texture} transparent opacity={0.3} depthTest={false} />
    </mesh>
  );
}
