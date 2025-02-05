import { createScene, renderer, camera, scene } from './scene/createScene.js';
import { initControls } from './scene/controllers.js';
import { onWindowResize, animate } from './scene/fenetre.js';
import { XRButton } from 'three/addons/webxr/XRButton.js';

// Création de la scène
createScene();

// Ajout du bouton WebXR après le rendu classique
document.body.appendChild(XRButton.createButton(renderer));

// Démarrage des contrôles XR
initControls().then(() => {
    renderer.xr.enabled = true; // Activer WebXR uniquement après l'init des contrôleurs
    renderer.setAnimationLoop(animate);
});

// Boucle de rendu normale avant d’activer WebXR
function normalRenderLoop() {
    if (!renderer.xr.isPresenting) {
        animate();
    }
    requestAnimationFrame(normalRenderLoop);
}

normalRenderLoop(); // Démarrer le rendu normal

// Écouteur pour le redimensionnement de la fenêtre
window.addEventListener('resize', onWindowResize);
