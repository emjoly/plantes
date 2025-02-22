import { scene } from '../scene/createScene.js';
import * as THREE from 'three';

let raycaster = new THREE.Raycaster();
raycaster.params.Points.threshold = 0.1;
let intersected = [];

export function setupInteractions(controller1, controller2, scene) {
    controller1.addEventListener('selectstart', onSelectStart);
    controller1.addEventListener('selectend', onSelectEnd);
    controller2.addEventListener('selectstart', onSelectStart);
    controller2.addEventListener('selectend', onSelectEnd);
}

function onSelectStart(event) {
    const controller = event.target;
    const intersections = getIntersections(controller);

    if (intersections.length > 0) {
        const intersection = intersections[0];
        const object = intersection.object;
        
        if (object.material && object.material.emissive) {
            object.material.emissive.b = 1;
        }
        
        controller.attach(object);
        controller.userData.selected = object;
    }
    
    controller.userData.targetRayMode = event.data.targetRayMode;
}

function onSelectEnd(event) {
    const controller = event.target;

    if (controller.userData.selected !== undefined) {
        const object = controller.userData.selected;
        
        if (object.material && object.material.emissive) {
            object.material.emissive.b = 0;
        }
        
        scene.attach(object);
        controller.userData.selected = undefined;
    }
}


function getIntersections(controller) {
  controller.updateMatrixWorld();
  
  const tempMatrix = new THREE.Matrix4();
  tempMatrix.identity().extractRotation(controller.matrixWorld);

  raycaster.ray.origin.setFromMatrixPosition(controller.matrixWorld);
  raycaster.ray.direction.set(0, 0, -1).applyMatrix4(tempMatrix);

  const hitboxes = scene.children.filter(obj => obj.name.includes('_hitbox'));
  return raycaster.intersectObjects(hitboxes, false);
}


function intersectObjects(controller) {
    // if (controller.userData.targetRayMode === 'screen') return;
    // if (controller.userData.selected !== undefined) return;
    if (controller.userData.selected !== undefined) return; // Supprime la condition sur screen mode

    const line = controller.getObjectByName('line');
    const intersections = getIntersections(controller);

    if (intersections.length > 0) {
        const intersection = intersections[0];
        const object = intersection.object;
        
        console.log("Objet touché :", object.name, object);
        
        if (object.material && object.material.emissive) {
            if (!object.userData.originalEmissive) {
                object.userData.originalEmissive = object.material.emissive.clone();
            }
            object.material.emissive.set(0xffffff);
        }
        
        intersected.push(object);
        line.scale.z = intersection.distance;
    } else {
        line.scale.z = 5;
    }
}

function cleanIntersected() {
    while (intersected.length) {
        const object = intersected.pop();
        if (object.userData.originalEmissive) {
            object.material.emissive.copy(object.userData.originalEmissive);
        }
    }
}

export function updateInteractions(controller1, controller2) {
    cleanIntersected();
    intersectObjects(controller1);
    intersectObjects(controller2);
}
