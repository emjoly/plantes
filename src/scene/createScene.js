import * as THREE from 'three';
import { addLights } from '../utils/lumiere.js';

export function createScene() {
  // Create scene
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x202040);

  // Create camera
  const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(0, 1.6, 2);

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

  return { scene, camera, renderer };
}
