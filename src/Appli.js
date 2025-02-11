
// import { loadingManager } from './utils/loading.js';
// import { createSkybox } from './utils/skybox.js';
import { createScene } from './scene/createScene.js';
import { animate } from './scene/animation.js';
import { setupVRButton } from './scene/VRButton.js';
import { handleResize } from './scene/fenetre.js';
import * as THREE from 'three';

// Initialize the scene
const { scene, camera, renderer, cube } = createScene();

// Ajouter la skybox
// createSkybox(scene);

// Set up WebXR
setupVRButton(renderer);

// Handle window resizing
handleResize(camera, renderer);

// loading screen
// const loader = new THREE.GLTFLoader(loadingManager);  // Utilisez le loadingManager ici
// loader.load(
//   'path/to/your/model.glb',
//   (gltf) => {
//     scene.add(gltf.scene);  // Ajouter l'objet chargé à la scène
//   },
//   undefined,  // Optionnel : fonction pour la progression du chargement
//   (error) => {
//     console.error('Erreur de chargement du modèle : ', error);
//   }
// );

// // Start animation loop
animate(scene, camera, renderer, cube);