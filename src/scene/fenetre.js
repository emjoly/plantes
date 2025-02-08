// import { camera, renderer, scene, controls } from './createScene.js';

// export function onWindowResize() {
//     camera.aspect = window.innerWidth / window.innerHeight;
//     camera.updateProjectionMatrix();
//     renderer.setSize(window.innerWidth, window.innerHeight);
// }

// // Fonction d'animation, qui fonctionne pour **les deux modes (normal & VR)**
// export function animate() {
//     if (!renderer.xr.isPresenting) {
//         controls.update(); // Mise à jour des contrôles OrbitControls (hors VR)
//     }
//     renderer.render(scene, camera);
// }

export function handleResize(camera, renderer) {
    window.addEventListener('resize', () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
  
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    });
  }
  