import * as THREE from 'three';
import { XRControllerModelFactory } from 'three/addons/webxr/XRControllerModelFactory.js';

export let controller1, controller2;

export function setupControllers(renderer, scene) {
    // return new Promise((resolve) => {
    const controller1 = renderer.xr.getController(0);
    const controller2 = renderer.xr.getController(1);
    scene.add(controller1, controller2);

    // ligne pour voir ou cest aligné
    function addLaserLine(controller) {
        const geometry = new THREE.BufferGeometry().setFromPoints([
            new THREE.Vector3(0, 0, 0),
            new THREE.Vector3(0, 0, -1) // Ligne pointant vers l'avant
        ]);

        const material = new THREE.LineBasicMaterial({ color: 0xffffff });
        const line = new THREE.Line(geometry, material);
        line.name = 'line';
        line.scale.z = 5; // Longueur initiale

        controller.add(line); // Attacher la ligne au contrôleur
    }

    addLaserLine(controller1);
    addLaserLine(controller2);

    const controllerModelFactory = new XRControllerModelFactory();

    const controllerGrip1 = renderer.xr.getControllerGrip(0);
    controllerGrip1.add(controllerModelFactory.createControllerModel(controllerGrip1));
    scene.add(controllerGrip1);

    const controllerGrip2 = renderer.xr.getControllerGrip(1);
    controllerGrip2.add(controllerModelFactory.createControllerModel(controllerGrip2));
    scene.add(controllerGrip2);

    return{ controller1, controller2 }; 
}


export function getControllers() {
    if (!controller1 || !controller2) {
        throw new Error("Les contrôleurs ne sont pas encore initialisés ! Appelez `initControls()` d'abord.");
    }
    return { controller1, controller2 };
}

// composer pour effet
// interaction manager pour cliquer