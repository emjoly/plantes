import { createScene, renderer, camera, scene } from './scene/createScene.js';
import { initControls, controller1, controller2 } from './scene/controllers.js';
import { cube } from './utils/cube.js';
import { onWindowResize, animate } from './scene/fenetre.js';

createScene();
initControls();
animate(scene, camera, renderer, cube);
window.addEventListener('resize', onWindowResize);
renderer.setAnimationLoop(animate);

document.body.appendChild(renderer.domElement);