import { createScene } from './scene/createScene.js';
import { animate } from './scene/animation.js';
import { createSkybox } from './utils/skybox.js';
import { setupVRButton } from './scene/VRButton.js';
import { handleResize } from './scene/fenetre.js';
import { handleObjectSelection } from './scene/selection.js';
import * as THREE from 'three';

// Initialize the scene
const { scene, camera, renderer, cube } = createScene();

// Ajouter la skybox
createSkybox(scene);

// Set up WebXR
setupVRButton(renderer);

// Handle window resizing
handleResize(camera, renderer);

// Écouteur pour la sélection d'objets
window.addEventListener('click', (event) => handleObjectSelection(event, camera, scene));

// // Start animation loop
animate(scene, camera, renderer, cube);