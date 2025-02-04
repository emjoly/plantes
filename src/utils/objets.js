import * as THREE from 'three';
import { scene } from '../scene/createScene.js';

const group = new THREE.Group();
let isInitialized = false;

export function getGroup() {
    if (!isInitialized) {
        const geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
        const material = new THREE.MeshStandardMaterial({
            color: Math.random() * 0xffffff,
            roughness: 0.7,
            metalness: 0.0
        });
        const object = new THREE.Mesh(geometry, material);
        object.position.set(0, 0, 0);

        object.castShadow = true;
        object.receiveShadow = true;

        group.add(object);
        isInitialized = true;
    }
    return group;
}