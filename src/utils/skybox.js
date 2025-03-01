import * as THREE from 'three';

export function createSkybox(scene) {
    const basePath = `${import.meta.env.BASE_URL}assets/skybox/`;
    const textureCube = new THREE.CubeTextureLoader()
        .setPath(basePath)
        .load([
            'posx.jpg', 'negx.jpg', // Droite, Gauche
            'posy.jpg', 'negy.jpg', // Haut, Bas
            'posz.jpg', 'negz.jpg'  // Devant, Derrière
        ]);

    scene.background = textureCube; // Définit la skybox comme arrière-plan
}