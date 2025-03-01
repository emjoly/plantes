import { updateInteractions } from './interactions.js';

export function animate(scene, camera, renderer, controller1, controller2) {
  renderer.setAnimationLoop(() => {
      updateInteractions(controller1, controller2, scene);
      renderer.render(scene, camera);
  });
}