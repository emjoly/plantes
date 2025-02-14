import * as THREE from 'three';
import { addLights } from '../utils/lumiere.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { createSkybox } from '../utils/skybox.js';
import { loadModel } from '../utils/objets.js';
import { createPlancher } from './plancher.js';

export function createScene() {
  // Create scene
  const scene = new THREE.Scene();

  // Create camera
  const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(0, 0, 2);  

  createSkybox(scene);

  // Create renderer
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.xr.enabled = true;
  document.body.appendChild(renderer.domElement);

  // Add objects
  // const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
  // const material = new THREE.MeshNormalMaterial();
  // const cube = new THREE.Mesh(geometry, material);
  // scene.add(cube);

  // Add floor
  // const floor = createPlancher();
  // scene.add(floor);

  // Add lights
  addLights(scene);

  // orbit controls cam
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;  // Activer le damping pour une interaction plus fluide
  controls.dampingFactor = 0.25;  // Facteur de lissage
  controls.screenSpacePanning = false; // Désactiver le défilement de la souris pour le zoom

  const room = 'store_in_the_mall';
  const roomPosition = new THREE.Vector3(-2.5, 0, -5); // Centre de la scène
  const roomScale = 0.03; // Facteur de réduction (10% de la taille d'origine)
  loadModel(scene, room, roomPosition, (obj) => {
    obj.scale.set(roomScale, roomScale, roomScale); // Appliquer l'échelle
    console.log(`${room} ajouté à la scène`, roomPosition);
  });

  const radius = 3; // Rayon du cercle
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
      // ce model etait trop gros
      if (name === 'rosa_chinensis') {
        obj.scale.set(0.15, 0.15, 0.15);
        obj.position.set(1.5000000000000004, -0.34, -2.598076211353316);
      }
      // trop petit
      if (name === 'pothos') {
        obj.scale.set(2, 2, 2);
        obj.position.set(-3, 0, 3.6739403974420594e-16);
      }
      // trop petit
      if (name === 'ficus') {
        obj.scale.set(2, 2, 2);
        obj.position.set(3, 0, 0);
      }
      console.log(`${name} ajouté à la scène`, position);
    });
  });

  return { scene, camera, renderer };
}