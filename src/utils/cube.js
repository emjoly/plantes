import * as THREE from 'three';

export function createCube(size = 0.2) {
  return new THREE.BoxGeometry(size, size, size);
}

export function createSphere(radius = 0.2, widthSegments = 32, heightSegments = 32) {
  return new THREE.SphereGeometry(radius, widthSegments, heightSegments);
}
