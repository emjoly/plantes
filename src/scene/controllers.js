import * as THREE from 'three';
import { XRButton } from 'three/addons/webxr/XRButton.js';
import { XRControllerModelFactory } from 'three/addons/webxr/XRControllerModelFactory.js';
import { createScene } from './createScene.js';

// const { scene, renderer } = createScene();
export let controller1, controller2;

export function setupControllers(renderer, scene) {
    // return new Promise((resolve) => {
        document.body.appendChild(XRButton.createButton(renderer));

        const controller1 = renderer.xr.getController(0);
        const controller2 = renderer.xr.getController(1);
        scene.add(controller1, controller2);

        const controllerModelFactory = new XRControllerModelFactory();

        const controllerGrip1 = renderer.xr.getControllerGrip(0);
        controllerGrip1.add(controllerModelFactory.createControllerModel(controllerGrip1));
        scene.add(controllerGrip1);

        const controllerGrip2 = renderer.xr.getControllerGrip(1);
        controllerGrip2.add(controllerModelFactory.createControllerModel(controllerGrip2));
        scene.add(controllerGrip2);

        return{ controller1, controller2 }; 
    // });
}


export function getControllers() {
    if (!controller1 || !controller2) {
        throw new Error("Les contrôleurs ne sont pas encore initialisés ! Appelez `initControls()` d'abord.");
    }
    return { controller1, controller2 };
}

// composer pour effet
// interaction manager pour cliquer