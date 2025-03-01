import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

export function loadModel(scene, modelName, position = new THREE.Vector3(0, 0, 0), onLoadCallback) {
    const loader = new GLTFLoader();

    const modelPath = `${import.meta.env.BASE_URL}assets/${modelName}/scene.gltf`;

    loader.load(
        modelPath,
        function(gltf){
            // si loaded, ajouter a la scene
            const object = gltf.scene;
            object.position.copy(position)
            scene.add(object);
            if (onLoadCallback) onLoadCallback(object);
        },
        function (xhr){
            // log progres pendant le download
            console.log((xhr.loaded / xhr.total*100)+ '%loaded');
        },
        function(error){
            console.log(error);
        }
    );
}