import React, { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, OrbitControls, Loader } from "@react-three/drei";
import { Group, Quaternion, Euler } from "three";
import { motion } from "framer-motion";
import { anatomyData, AnatomyPart } from "@/data/anatomyData";
import PulsingMaterial from "@/components/PulsingMaterial";
import AnatomyInfoCard from "@/components/AnatomyInfoCard";
import { useIsMobile } from "@/app/hooks/use-mobile";

const TYPE_ORDER = ["Shoulder", "Elbow", "Hip", "Knee"] as const;
type TypeKey = typeof TYPE_ORDER[number];

function getTypeFromPart(p: AnatomyPart): TypeKey | null {
  const lower = (p.title || p.name).toLowerCase();
  for (const t of TYPE_ORDER) if (lower.includes(t.toLowerCase())) return t;
  return null;
}

function AnatomyModel({ activeTypeIndex, onTypeHotspotClick, targetParts, scale, position }: {
  activeTypeIndex: number;
  onTypeHotspotClick: (typeIndex: number) => void;
  targetParts: AnatomyPart[];
  scale: number;
  position: [number, number, number];
}) {
  const { scene } = useGLTF("https://qchrbfnndntd6b8r.public.blob.vercel-storage.com/Remake-compressed.glb");
  const groupRef = useRef<Group>(null!);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    const active = targetParts[activeTypeIndex] || targetParts[0];
    const targetRotation = active.manTargetRotation;
    const targetQuaternion = new Quaternion().setFromEuler(new Euler(...targetRotation, "YXZ"));
    groupRef.current.quaternion.slerp(targetQuaternion, Math.min(1, delta * 3));
  });

  return (
    <group ref={groupRef} position={position}>
      <primitive object={scene} scale={scale} />
      {anatomyData.map((part, i) => {
        const t = getTypeFromPart(part);
        if (!t) return null;
        const idx = TYPE_ORDER.indexOf(t);
        return (
          <mesh key={i} position={part.bodyPosition} onClick={(e) => { e.stopPropagation(); onTypeHotspotClick(idx); }} onPointerOver={() => (document.body.style.cursor = "pointer")} onPointerOut={() => (document.body.style.cursor = "auto")}>
            <sphereGeometry args={[0.2, 16, 16]} />
            <PulsingMaterial isActive={idx === activeTypeIndex} />
          </mesh>
        );
      })}
    </group>
  );
}

export default function SpecialitiesSection() {
  const displayParts = useMemo(() => {
    const pick: Partial<Record<TypeKey, AnatomyPart>> = {};
    for (const t of TYPE_ORDER) pick[t] = anatomyData.find((p) => getTypeFromPart(p) === t) as AnatomyPart | undefined;
    return TYPE_ORDER.map((t) => pick[t]!).filter(Boolean);
  }, []);

  const [activeTypeIndex, setActiveTypeIndex] = useState(0);
  const [modelScale, setModelScale] = useState(3.2);
  const [modelPos, setModelPos] = useState<[number, number, number]>([1.25, -1.7, 0]);
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleResize = () => {
      const isMobileNow = window.innerWidth < 768;
      setModelScale(isMobileNow ? 2.7 : 3);
      setModelPos(isMobileNow ? [1.1, -1.5, 0] : [1.4, -1.7, 0]);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const sortedDisplayParts = useMemo(() => {
    if (!isMobile) {
      return displayParts;
    }
    const activePart = displayParts[activeTypeIndex];
    if (!activePart) {
      return displayParts;
    }
    const otherParts = displayParts.filter((_, idx) => idx !== activeTypeIndex);
    return [activePart, ...otherParts];
  }, [isMobile, activeTypeIndex, displayParts]);

  return (
    <section id="specialities" aria-labelledby="specialities-heading" className="relative w-full bg-[#f5f5dc] overflow-x-hidden py-12 md:py-16">
      
      <div className="px-4 text-center sm:px-6 md:text-left lg:px-8">
        <h3 id="specialities-heading" className="font-serif-display text-4xl font-bold text-[#3a2e20] md:text-5xl">My Specialities</h3>
        <p className="max-w-2xl text-[#5c4b3a] italic mx-auto md:mx-0">Click on an interactive point to explore my areas of focus.</p>
      </div>

      <div className="w-full flex flex-col md:flex-row gap-6 md:gap-8 items-stretch mt-6 px-4 sm:px-6 lg:px-8">
        
        <div 
          className="relative w-full md:w-[70%] h-[50vh] md:h-[85vh] max-h-[800px] bg-cover bg-no-repeat bg-center"
          style={{ backgroundImage: "url('/vitruvian_background.png')" }}
        >
          <div className="absolute inset-0 p-5">
            {/* FIX: Added gl={{ preserveDrawingBuffer: true }}
              This tells the browser to keep the WebGL context alive even when the canvas is not visible.
            */}
            <Canvas camera={{ position: [0, 0, 12], fov: 50 }} gl={{ alpha: true, preserveDrawingBuffer: true }}>
              <ambientLight intensity={1.6} />
              <spotLight position={[10, 15, 10]} angle={0.3} penumbra={1} intensity={1.75} castShadow />
              <Suspense fallback={null}>
                <AnatomyModel
                  activeTypeIndex={activeTypeIndex}
                  onTypeHotspotClick={setActiveTypeIndex}
                  targetParts={displayParts}
                  scale={modelScale}
                  position={modelPos}
                />
              </Suspense>
              <OrbitControls 
                enableZoom={false} 
                enablePan={false} 
                enableRotate 
                minDistance={5} 
                maxDistance={15}
                target={[0, -1, 0]} 
              />
            </Canvas>
            <Loader />
          </div>
        </div>

        <aside className="relative w-full md:w-[30%] flex flex-col h-auto">
          <div className="flex-grow flex flex-col gap-4" aria-label="Speciality cards">
            {sortedDisplayParts.map((part) => {
              const originalIndex = displayParts.findIndex(p => p.name === part.name);
              const isActive = originalIndex === activeTypeIndex;
              return (
                <motion.div 
                  key={part.name}
                  layout 
                  transition={{ type: "spring", stiffness: 320, damping: 28 }}
                >
                  <AnatomyInfoCard speciality={part} isActive={isActive} onActivate={() => setActiveTypeIndex(originalIndex)} />
                </motion.div>
              );
            })}
          </div>
        </aside>
      </div>
    </section>
  );
}
