import * as THREE from 'three';

/**
 * Fonction pour créer un plancher avec des textures PBR.
 * @returns {THREE.Mesh} Le mesh du plancher.
 */
export function createPlancher() {
    const textureLoader = new THREE.TextureLoader();

    // Charger les différentes textures
    const baseColor = textureLoader.load('src/assets/textures/Wood_baseColor.png');
    const metallicRoughness = textureLoader.load('src/assets/textures/Wood_metallicRoughness.png');
    const normalMap = textureLoader.load('src/assets/textures/Wood_normal.png');

    // Appliquer le wrapping pour éviter l'étirement
    [baseColor, metallicRoughness, normalMap].forEach(texture => {
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(4, 4); // Ajuste la répétition de la texture
    });

    // Créer le matériau PBR
    const floorMaterial = new THREE.MeshStandardMaterial({
        map: baseColor,          // Texture de couleur de base
        metalnessMap: metallicRoughness, // Détermine les parties métalliques et rugueuses
        roughnessMap: metallicRoughness, // Même texture pour la rugosité
        normalMap: normalMap,    // Ajoute du relief
        side: THREE.DoubleSide   // Visible des deux côtés
    });

    // Créer la géométrie du plancher
    const floorGeometry = new THREE.PlaneGeometry(20, 20);
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);

    // Positionner le plancher
    floor.rotation.x = -Math.PI / 2; // Met à plat
    floor.position.y = -0.01; // Juste en dessous des objets

    return floor; // Retourne le plancher pour l'ajouter à la scène
}
