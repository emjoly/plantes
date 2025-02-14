import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

export function createSkybox(scene) {
    const loader = new GLTFLoader();
    loader.load('../src/assets/skybox/sky_dome/scene.gltf', (gltf) => {
        const skybox = gltf.scene;
        skybox.scale.set(100, 100, 100); // Ajuste la taille pour couvrir la scène
        skybox.traverse((node) => {
            if (node.isMesh) {
                node.material.side = THREE.BackSide; // Inverser la face pour une skybox
                node.castShadow = false;
                node.receiveShadow = false;
            }
        });
        scene.add(skybox);
    });
}
