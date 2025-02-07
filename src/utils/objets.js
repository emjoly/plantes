import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const group = new THREE.Group();
let isInitialized = false;

export function getGroup() {
    if (!isInitialized) {
        const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
        const material = new THREE.MeshStandardMaterial({
            color: 0x00ff00,
            roughness: 0.7,
            metalness: 0.0
        });
        const object = new THREE.Mesh(geometry, material);
        object.position.set(0, 1, -1);

        object.castShadow = true;
        object.receiveShadow = true;

        group.add(object);
        isInitialized = true;
    }
    return group;
}