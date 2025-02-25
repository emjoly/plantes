import { scene } from '../scene/createScene.js';
import * as THREE from 'three';

let raycaster = new THREE.Raycaster();
raycaster.params.Points.threshold = 0.1;
let intersected = [];
const infoBox = document.getElementById("infoBox");
const validObjects = new Set([
    'ficus',
    'livistona_chinensis',
    'pilea_peperomioides',
    'pothos',
    'rhyzome',
    'rosa_chinensis'
]);

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
  // console.log("Raycast direction:", raycaster.ray.direction);
    const hitboxes = scene.children.filter(obj => obj.name.includes('_hitbox'));
    return raycaster.intersectObjects(hitboxes, false);
    
  }

function intersectObjects(controller) {
    // if (controller.userData.targetRayMode === 'screen') return;
    if (controller.userData.selected !== undefined) return; 
    const line = controller.getObjectByName('line');
    const intersections = getIntersections(controller);

    if (intersections.length > 0) {
        const intersection = intersections[0];
        const object = intersection.object;

        const objectName = object.name.replace('_hitbox', ''); // Nettoyer le nom
        if (!validObjects.has(objectName)) {
            return null; // Ignorer les objets non autorisés
        }
        
        console.log("Objet touché :", object.name, object);
        
        if (object.material && object.material.emissive) {
            if (!object.userData.originalEmissive) {
                object.userData.originalEmissive = object.material.emissive.clone();
            }
            object.material.emissive.set(0xffffff);
        }
        
        intersected.push(object);
        line.scale.z = intersection.distance;
        return object; // Retourner l'objet intersecté
    } 
    else {
        line.scale.z = 5;
    }
    // console.log("Raycaster lancé depuis la manette");
    // console.log("Nombre d'objets détectés :", intersections.length);
    return null;
}

function cleanIntersected() {
    while (intersected.length) {
        const object = intersected.pop();
        if (object.userData.originalEmissive) {
            object.material.emissive.copy(object.userData.originalEmissive || { r: 0, g: 0, b: 0 });
        }
    }
}

function showInfoBox(object) {
    infoBox.style.display = 'block';
    infoBox.innerText = `Vous regardez: ${object.name.replace('_hitbox', '')}`;

    // Placer l'info-box au centre
    infoBox.style.left = `${window.innerWidth / 2 - infoBox.clientWidth / 2}px`;
    infoBox.style.top = `${window.innerHeight * 0.8}px`;
}

function hideInfoBox() {
    infoBox.style.display = 'none';
}

export function updateInteractions(controller1, controller2) {
    cleanIntersected();
    const intersectedObject1 = intersectObjects(controller1);
    const intersectedObject2 = intersectObjects(controller2);
    
    const intersectedObject = intersectedObject1 || intersectedObject2;

    if (intersectedObject) {
        showInfoBox(intersectedObject);
    } else {
        hideInfoBox();
    }
}
