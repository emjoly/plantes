import * as THREE from 'three';
import { addLights } from '../utils/lumiere.js';
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import { handleSelectStart, handleSelectEnd } from './interactions.js';
import { initControls, getControllers } from './controllers.js';
import { getGroup } from '../utils/objets.js'; // Importer `getGroup()`

export let scene, camera, renderer;

export function createScene() {
  // Create scene
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x202040);

  // Create camera
  camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(0, 0, 2);  
  // je dois me mettre plus haut apres en y pour la vr / la rotate?

  // Create renderer
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;
  renderer.xr.enabled = true;
  document.body.appendChild(renderer.domElement);

  // groupe pour les objets interactifs
  scene.add(getGroup());

  // Add lights
  addLights(scene);

  // bouger camera
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;  // Activer le damping pour une interaction plus fluide
  controls.dampingFactor = 0.25;  // Facteur de lissage
  controls.screenSpacePanning = false; // Désactiver le défilement de la souris pour le zoom

   // Initialiser les contrôleurs VR
   initControls();

   // Attendre que les contrôleurs soient prêts
   try {
       const { controller1, controller2 } = getControllers();
       
       controller1.addEventListener('selectstart', handleSelectStart);
       controller1.addEventListener('selectend', handleSelectEnd);
       controller2.addEventListener('selectstart', handleSelectStart);
       controller2.addEventListener('selectend', handleSelectEnd);
   } catch (error) {
       console.error(error.message);
   }
}

createScene();