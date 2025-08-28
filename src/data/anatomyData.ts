// File: src/data/anatomyData.ts

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
    { name: 'left_shoulder', title: 'Shoulder', description: 'Shoulder Arthroscopic procedures\nShoulder replacement\nSports related injuries', image: '/anatomy-focus/shoulder.jpg', bodyPosition: [-1, 2.7, 0.2], manTargetRotation: [0, Math.PI / 2.5, 0] },
    { name: 'right_shoulder', title: 'Shoulder', description: 'Shoulder Arthroscopic procedures\nShoulder replacement\nSports related injuries', image: '/anatomy-focus/shoulder.jpg', bodyPosition: [1, 2.7, 0.2], manTargetRotation: [0, -Math.PI / 2.5, 0] },
    
    // --- Elbow Hotspots ---
    { name: 'left_elbow', title: 'Upper Limb', description: 'Elbow related procedures\nHand conditions (e.g., Arthritis, Carpal Tunnel, Ganglion cysts)', image: '/anatomy-focus/elbow.jpg', bodyPosition: [-2.3, 2.5, 0.2], manTargetRotation: [0, Math.PI / 1.5, 0] },
    { name: 'right_elbow', title: 'Upper Limb', description: 'Elbow related procedures\nHand conditions (e.g., Arthritis, Carpal Tunnel, Ganglion cysts)', image: '/anatomy-focus/elbow.jpg', bodyPosition: [2.3, 2.5, 0.2], manTargetRotation: [0, -Math.PI / 1.5, 0] },
    
    // --- Hip Hotspots ---
    { name: 'left_hip', title: 'Hip', description: 'Hip replacement procedures', image: '/anatomy-focus/hip.jpg', bodyPosition: [-0.7, 0, 0.2], manTargetRotation: [0, Math.PI / 6, 0] },
    { name: 'right_hip', title: 'Hip', description: 'Hip replacement procedures', image: '/anatomy-focus/hip.jpg', bodyPosition: [0.7, 0, 0.2], manTargetRotation: [0, -Math.PI / 6, 0] },

    // --- Knee Hotspots ---
    { name: 'left_knee', title: 'Knee', description: 'Knee Replacement\nSports related pathologies\nLower limb Reconstruction', image: '/anatomy-focus/knee.jpg', bodyPosition: [-1.5, -1.75, 0.2], manTargetRotation: [0, Math.PI / 7, 0] },
    { name: 'right_knee', title: 'Knee', description: 'Knee Replacement\nSports related pathologies\nLower limb Reconstruction', image: '/anatomy-focus/knee.jpg', bodyPosition: [1.5, -1.75, 0.2], manTargetRotation: [0, -Math.PI / 7, 0] },

    // --- Ankle Hotspots ---
    { name: 'left_ankle', title: 'Foot & Ankle', description: 'Ankle Arthroscopy\nSports medicine\nBunion procedures\nArthritis related conditions', image: '/anatomy-focus/Ankles.jpg', bodyPosition: [-2.4, -3.5, 0.2], manTargetRotation: [0, Math.PI / 7, 0] },
    { name: 'right_ankle', title: 'Foot & Ankle', description: 'Ankle Arthroscopy\nSports medicine\nBunion procedures\nArthritis related conditions', image: '/anatomy-focus/Ankles.jpg', bodyPosition: [2.2, -3.5, 0.2], manTargetRotation: [0, -Math.PI / 7, 0] },
];