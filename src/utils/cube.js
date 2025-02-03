import * as THREE from 'three';
import { scene } from '../scene/createScene.js';

export function cube(size = 0.2) {
  const cube = new THREE.BoxGeometry;
  scene.add(cube);
  return new THREE.BoxGeometry(size, size, size);
}

// export function createSphere(radius = 0.2, widthSegments = 32, heightSegments = 32) {
//   return new THREE.SphereGeometry(radius, widthSegments, heightSegments);
// }
