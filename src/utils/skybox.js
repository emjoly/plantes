import * as THREE from 'three';

export function createSkybox(scene) {
    const textureCube = new THREE.CubeTextureLoader()
        .setPath('../src/assets/skybox/')
        .load([
            'posx.jpg', 'negx.jpg', // Droite, Gauche
            'posy.jpg', 'negy.jpg', // Haut, Bas
            'posz.jpg', 'negz.jpg'  // Devant, Derrière
        ]);

    scene.background = textureCube; // Définit la skybox comme arrière-plan
}