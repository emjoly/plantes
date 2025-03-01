import * as THREE from 'three';
import { addLights } from '../utils/lumiere.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { createSkybox } from '../utils/skybox.js';
import { loadModel } from '../utils/objets.js';
import { setupControllers } from './controllers.js';
import { setupInteractions } from './interactions.js';

export let modelsToLoad = [];
export let renderer;
export let scene;
export let camera;

export function createScene() {
  scene = new THREE.Scene(); // Create scene

  // Create camera
  camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(0, 0, 2);  
  scene.userData.camera = camera;

  createSkybox(scene);

  // Create renderer
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.xr.enabled = true;
  document.body.appendChild(renderer.domElement);

  // manettes vr
  const { controller1, controller2 } = setupControllers(renderer, scene);
  setupInteractions(controller1, controller2, scene);

  // Add lumieres
  addLights(scene);

  // orbit controls cam
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;  // interaction plus fluide
  controls.dampingFactor = 0.25;  // lissage
  controls.screenSpacePanning = false; // Désactiver défilement pour le zoom

  // modele du magasin
  const room = 'store_in_the_mall';
  const roomPosition = new THREE.Vector3(-2.5, 0, -5); // Centre de la scène
  const roomScale = 0.03; // Facteur de réduction (10% de la taille d'origine)
  loadModel(scene, room, roomPosition, (obj) => {
    obj.scale.set(roomScale, roomScale, roomScale); // Appliquer l'échelle
    console.log(`${room} ajouté à la scène`, roomPosition);
  });

  // placer modeles des plantes
  const radius = 3; // Rayon du cercle
  modelsToLoad = [
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
      const boundingBox = new THREE.Box3().setFromObject(obj);
      const size = boundingBox.getSize(new THREE.Vector3());
      
      const hitbox = new THREE.Mesh(
        new THREE.BoxGeometry(size.x * 1.2, size.y * 1.2, size.z * 1.2),
        new THREE.MeshBasicMaterial({ color: 0xff0000, transparent: true, opacity: 0.2, visible: false })
      );
      console.log(`${name} ajouté à la scène`, position);
      hitbox.position.copy(boundingBox.getCenter(new THREE.Vector3()));
      hitbox.name = `${name}_hitbox`;
      scene.add(hitbox);
    });
  });

  return { scene, camera, renderer, controller1, controller2 };
}
