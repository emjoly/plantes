import * as THREE from 'three';
import { scene, renderer, modelsToLoad } from './createScene.js';
import { controller1, controller2 } from './controllers.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js'; 

const raycaster = new THREE.Raycaster();
const intersected = [];

export function getIntersections(controller) {
  controller.updateMatrixWorld();
  const controllerPosition = controller.position;
  const controllerDirection = new THREE.Vector3(0, 0, -1).applyQuaternion(controller.quaternion).normalize();

  raycaster.ray.origin.copy(controllerPosition);
  raycaster.ray.direction.copy(controllerDirection);
  return raycaster.intersectObjects(modelsToLoad.map(model => model.position), false);
}

export function handleSelectStart(event) {
  const controller = event.target;
  const intersections = getIntersections(controller);

  if (intersections.length > 0) {
    const object = intersections[0].object;
    // object.material.emissive.set(0x0000ff); // Bleu quand sélectionné
    controller.attach(object);
    controller.userData.selected = object;
  }
}

export function handleSelectEnd(event) {
  const controller = event.target;

  if (controller.userData.selected) {
    const object = controller.userData.selected;
    object.material.emissive.set(0x000000); // Remettre la couleur initiale
    getGroup().attach(object); // Utilisation de getGroup()
    controller.userData.selected = undefined;
  }
}

function intersectObjects(controller) {
  if (controller.userData.selected) return;

  const line = controller.getObjectByName('line');
  const intersections = getIntersections(controller);

  cleanIntersected();

  if (intersections.length > 0) {
    const object = intersections[0].object;
    
    object.material.emissive.set(0xff0000); // Rouge quand hover
    intersected.push(object);
    line.scale.z = intersections[0].distance;
  } else {
    line.scale.z = 5;
  }
}

function cleanIntersected() {
  while (intersected.length) {
    const object = intersected.pop();
    object.material.emissive.set(0x000000);
  }
}

export function animate() {
  cleanIntersected();
  intersectObjects(controller1);
  intersectObjects(controller2);
  renderer.render(scene, camera);
}
