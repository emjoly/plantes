import { createScene, renderer, camera, scene } from './scene/createScene.js';
import { initControls } from './scene/controllers.js';
import { cube } from './utils/cube.js';
import { onWindowResize, animate } from './scene/fenetre.js';

createScene();
initControls().then(() => {
    animate(scene, camera, renderer);
});
// scene.add(cube);
window.addEventListener('resize', onWindowResize);
renderer.setAnimationLoop(animate);

document.body.appendChild(renderer.domElement);