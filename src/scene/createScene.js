import * as THREE from 'three';
import { addLights } from '../utils/lumiere.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { loadModel } from '../utils/objets.js';

export function createScene() {
  // Create scene
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x202040);

  // Create camera
  const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(0, 0, 2);  

  // Create renderer
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.xr.enabled = true;
  document.body.appendChild(renderer.domElement);

  // Add objects
  const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
  const material = new THREE.MeshNormalMaterial();
  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);

  // Add lights
  addLights(scene);

  // orbit controls cam
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;  // Activer le damping pour une interaction plus fluide
  controls.dampingFactor = 0.25;  // Facteur de lissage
  controls.screenSpacePanning = false; // Désactiver le défilement de la souris pour le zoom

  const radius = 5; // Rayon du cercle
  const modelsToLoad = [
    'ficus',
    'livistona_chinensis',
    'pilea_peperomioides',
    'pothos',
    'rhyzome',
    'rosa_chinensis'
  ].map((name, index, array) => {
  const angle = (index / array.length) * Math.PI * 2; // Angle en radians
  return {
    name,
    position: new THREE.Vector3(
      Math.cos(angle) * radius, // x position
      0,                        // y reste à 0
      Math.sin(angle) * radius  // z position
    )
  };
  });

  // Charger les modèles
  modelsToLoad.forEach(({ name, position }) => {
    loadModel(scene, name, position, (obj) => {
      console.log(`${name} ajouté à la scène`, position);
    });
  });

  return { scene, camera, renderer };
}