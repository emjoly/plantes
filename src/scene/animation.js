// import * as THREE from 'three';
// import { controls } from './createScene.js';

// let raycaster = new THREE.Raycaster();
// let mouse = new THREE.Vector2();
// let hoveredObject = null;

// export function animate(scene, camera, renderer) {
//   renderer.setAnimationLoop(() => {
//     controls.update(); // S'assurer que la caméra suit les interactions de l'utilisateur

//     scene.traverse((child) => {
//       if (child.isMesh && child.userData.isAnimating !== false) {
//         child.rotation.x += 0.01;
//         child.rotation.y += 0.01;
//       }
//     });

//     renderer.render(scene, camera);
//   });
// }

export function animate(scene, camera, renderer) {
  renderer.setAnimationLoop(() => {
    renderer.render(scene, camera);
  });
}
