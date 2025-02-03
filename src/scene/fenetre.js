import { camera, renderer, scene } from './createScene.js';

export function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

export function animate() {
  renderer.render(scene, camera);
}