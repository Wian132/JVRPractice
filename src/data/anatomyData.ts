// File: src/data/anatomyData.ts
// Description: Centralized data for the specialities section.
// ---
// CHANGE 1: Consolidated "Left" and "Right" entries into single entries.
// CHANGE 2: Fine-tuned the `bodyPosition` for each hotspot for better accuracy.
// ---

// Type definition for each anatomical part
export type AnatomyPart = {
  name: string;
  title: string;
  description: string;
  image: string;
  // This is the 3D coordinate for the pulsing hotspot.
  bodyPosition: [number, number, number];
  // This is the target rotation for the main 3D model when this part is active.
  manTargetRotation: [number, number, number];
};

// This is the complete list of ALL hotspots that will appear on the model.
// We will map these to the four main display cards in the main component.
export const anatomyData: AnatomyPart[] = [
    // --- Shoulder Hotspots ---
    { name: 'left_shoulder', title: 'Shoulder', description: 'Minimal invasive Shoulder Arthroscopy', image: '/anatomy-focus/shoulder.jpg', bodyPosition: [-1, 2.7, 0.2], manTargetRotation: [0, Math.PI / 2.5, 0] },
    { name: 'right_shoulder', title: 'Shoulder', description: 'Minimal invasive Shoulder Arthroscopy', image: '/anatomy-focus/shoulder.jpg', bodyPosition: [1, 2.7, 0.2], manTargetRotation: [0, -Math.PI / 2.5, 0] },
    
    // --- Elbow Hotspots ---
    { name: 'left_elbow', title: 'Elbow', description: 'Upper limb Pathology', image: '/anatomy-focus/elbow.jpg', bodyPosition: [-2.3, 2.5, 0.2], manTargetRotation: [0, Math.PI / 1.5, 0] },
    { name: 'right_elbow', title: 'Elbow', description: 'Upper limb Pathology', image: '/anatomy-focus/elbow.jpg', bodyPosition: [2.3, 2.5, 0.2], manTargetRotation: [0, -Math.PI / 1.5, 0] },
    
    // --- Hip Hotspots ---
    { name: 'left_hip', title: 'Hip', description: 'Hip and Knee Arthroplasty.', image: '/anatomy-focus/hip.jpg', bodyPosition: [-0.7, 0, 0.2], manTargetRotation: [0, Math.PI / 6, 0] },
    { name: 'right_hip', title: 'Hip', description: 'Hip and Knee Arthroplasty.', image: '/anatomy-focus/hip.jpg', bodyPosition: [0.7, 0, 0.2], manTargetRotation: [0, -Math.PI / 6, 0] },

    // --- Knee Hotspots ---
    { name: 'left_knee', title: 'Knee', description: 'Lower limb reconstruction', image: '/anatomy-focus/knee.jpg', bodyPosition: [-1.5, -1.75, 0.2], manTargetRotation: [0, Math.PI / 7, 0] },
    { name: 'right_knee', title: 'Knee', description: 'Lower limb reconstruction', image: '/anatomy-focus/knee.jpg', bodyPosition: [1.5, -1.75, 0.2], manTargetRotation: [0, -Math.PI / 7, 0] },

    // --- Ankle Hotspots ---
    { name: 'left_ankle', title: 'Ankle', description: 'Ankle injuries and reconstruction', image: '/anatomy-focus/Ankles.jpg', bodyPosition: [-2.4, -3.5, 0.2], manTargetRotation: [0, Math.PI / 7, 0] },
    { name: 'right_ankle', title: 'Ankle', description: 'Ankle injuries and reconstruction', image: '/anatomy-focus/Ankles.jpg', bodyPosition: [2.2, -3.5, 0.2], manTargetRotation: [0, -Math.PI / 7, 0] },
];