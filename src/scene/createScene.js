import * as THREE from 'three';
import { addLights } from '../utils/lumiere.js';

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

  // Add objects
  const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
  const material = new THREE.MeshNormalMaterial({ transparent: true, opacity: 1 }); // Ajouter la transparence
  const cube = new THREE.Mesh(geometry, material);
  cube.name = 'cube'; // affichage du texte
  cube.userData.isAnimating = true; // Ajout pour contrôler l'animation
  scene.add(cube);

  // Add lights
  addLights(scene);

  // bouger camera
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;  // Activer le damping pour une interaction plus fluide
  controls.dampingFactor = 0.25;  // Facteur de lissage
  controls.screenSpacePanning = false; // Désactiver le défilement de la souris pour le zoom

  // // Configurer contrôleurs VR
  // const controllers = setupControllers(renderer, scene);

  // // Passer renderer à setupInteractions
  // setupInteractions(scene, controllers, renderer, camera);
  
  // return { scene, camera, renderer };
}



// erreur avec le materiel surement