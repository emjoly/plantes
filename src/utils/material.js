import * as THREE from 'three';

export function createBasicMaterial() {
  return new THREE.MeshNormalMaterial();
}

export function createTexturedMaterial(texturePath) {
  const loader = new THREE.TextureLoader();
  const texture = loader.load(texturePath);
  return new THREE.MeshStandardMaterial({ map: texture });
}
