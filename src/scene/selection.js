import * as THREE from 'three';

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

// descriptions pour chaque plante
const plantDescriptions = {
    'ficus': "Le Ficus est une plante d'intérieur populaire, connue pour son feuillage luxuriant.",
    'livistona_chinensis': "Le Livistona Chinensis est un palmier élégant apprécié pour ses feuilles en éventail.",
    'pilea_peperomioides': "Le Pilea Peperomioides, aussi appelé plante à monnaie chinoise, est apprécié pour ses feuilles rondes.",
    'pothos': "Le Pothos est une plante grimpante robuste qui s’adapte bien à différentes conditions de lumière.",
    'rhyzome': "Le Rhizome est une plante souterraine qui stocke des nutriments et assure la propagation.",
    'rosa_chinensis': "Le Rosa Chinensis, ou rosier de Chine, est une plante à fleurs aux couleurs éclatantes."
};

// encadré d'information
const infoBox = document.createElement('div');
infoBox.style.position = 'absolute';
infoBox.style.background = 'black';
infoBox.style.color = 'white';
infoBox.style.padding = '10px';
infoBox.style.borderRadius = '5px';
infoBox.style.display = 'none';
document.body.appendChild(infoBox);

/**
 * Fonction pour gérer les clics sur les objets de la scène
 * @param {MouseEvent} event - Événement de clic de souris
 * @param {THREE.Camera} camera - La caméra de la scène
 * @param {THREE.Scene} scene - La scène Three.js
 */
export function handleObjectSelection(event, camera, scene) {
    event.preventDefault();

    // Convertir la position de la souris en coordonnées normalisées (-1 à +1)
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    // Lancer le raycaster depuis la caméra dans la direction de la souris
    raycaster.setFromCamera(mouse, camera);

    // Vérifier les intersections avec les objets de la scène
    const intersects = raycaster.intersectObjects(scene.children, true);

    if (intersects.length > 0) {
        const object = intersects[0].object;

        // Positionner l'encadré à côté de l'objet sélectionné
        const objectPosition = object.position.clone();
        const projectedPosition = objectPosition.project(camera);

        // Convertir les coordonnées 3D en 2D pour le DOM
        const x = (projectedPosition.x * 0.5 + 0.5) * window.innerWidth;
        const y = (-projectedPosition.y * 0.5 + 0.5) * window.innerHeight;

        infoBox.style.left = `${x + 10}px`;
        infoBox.style.top = `${y}px`;
        infoBox.innerHTML = `Objet: ${object.name || 'Inconnu'}`;
        infoBox.style.display = 'block';
    } else {
        infoBox.style.display = 'none';
    }
}
