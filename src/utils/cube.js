import * as THREE from 'three';

export const cube = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshStandardMaterial({ color: 0xff0000 })
);
cube.position.set(0, 1, -3);
cube.castShadow = true;
cube.receiveShadow = true;

// export function createSphere(radius = 0.2, widthSegments = 32, heightSegments = 32) {
//   return new THREE.SphereGeometry(radius, widthSegments, heightSegments);
// }
