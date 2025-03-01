import { createScene } from './scene/createScene.js';
import { animate } from './scene/animation.js';
import { createSkybox } from './utils/skybox.js';
import { setupVRButton } from './scene/VRButton.js';
import { handleResize } from './scene/fenetre.js';

// Initialize the scene
const { scene, camera, renderer, controller1, controller2 } = createScene();

// Ajouter la skybox
createSkybox(scene);

// Set up WebXR
setupVRButton(renderer);

// Handle window resizing
handleResize(camera, renderer);

// Start animation loop
animate(scene, camera, renderer, controller1, controller2);