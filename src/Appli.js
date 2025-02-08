
import { createScene } from './scene/createScene.js';
import { animate } from './scene/animation.js';
import { setupVRButton } from './scene/VRButton.js';
import { handleResize } from './scene/fenetre.js';

// Initialize the scene
const { scene, camera, renderer, cube } = createScene();

// Set up WebXR
setupVRButton(renderer);

// Handle window resizing
handleResize(camera, renderer);

// // Start animation loop
animate(scene, camera, renderer, cube);