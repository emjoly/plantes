import * as THREE from 'three';

export function addLights(scene) {
  scene.add(new THREE.HemisphereLight(0xbcbcbc, 0xa5a5a5, 3));
  const light = new THREE.DirectionalLight(0xffffff, 3);
  light.position.set(0, 6, 0);
  light.castShadow = true;
  light.shadow.camera.top = 3;
  light.shadow.camera.bottom = -3;
  light.shadow.camera.right = 3;
  light.shadow.camera.left = -3;
  light.shadow.mapSize.set(4096, 4096);
}
