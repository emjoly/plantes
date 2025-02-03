import * as THREE from 'three';

let raycaster = new THREE.Raycaster();
let mouse = new THREE.Vector2();
let hoveredObject = null;

export function animate(scene, camera, renderer) {
  renderer.setAnimationLoop(() => {
    scene.traverse((child) => {
      if (child.isMesh && child.userData.isAnimating !== false) {
        child.rotation.x += 0.01;
        child.rotation.y += 0.01;
      }
    });

    renderer.render(scene, camera);
  });
}