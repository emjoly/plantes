import { createScene } from './scene/createScene.js';
import { animate } from './scene/animation.js';
import { createSkybox } from './utils/skybox.js';
import { setupVRButton } from './scene/VRButton.js';
import { handleResize } from './scene/fenetre.js';
// import { handleObjectSelection } from './scene/selection.js';
// import { setupOutlinePass } from './postprocessing/outlinePass.js';
import * as THREE from 'three';

// Initialize the scene
const { scene, camera, renderer, composer, cube } = createScene();

// Ajouter la skybox
createSkybox(scene);

// Set up WebXR
setupVRButton(renderer);

// outline pass
// const outlinePass = setupOutlinePass(scene, camera, composer);

// Handle window resizing
handleResize(camera, renderer);

// Start animation loop
animate(scene, camera, renderer, cube);