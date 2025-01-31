import * as THREE from 'three';

export function setupInteractions(scene, controllers) {
  const raycaster = new THREE.Raycaster();
  const intersected = [];

  function getIntersections(controller) {
    controller.updateMatrixWorld();
    raycaster.setFromXRController(controller);
    return raycaster.intersectObjects(scene.children, false);
  }

  function showText(message, position) {
    const div = document.createElement('div');
    div.style.position = 'absolute';
    div.style.color = 'white';
    div.style.background = 'rgba(0, 0, 0, 0.7)';
    div.style.padding = '10px';
    div.style.borderRadius = '5px';
    div.style.left = `${position.x}px`;
    div.style.top = `${position.y}px`;
    div.innerText = message;
    document.body.appendChild(div);
    setTimeout(() => div.remove(), 3000);
  }

  function onSelectStart(event) {
    const controller = event.target;
    const intersections = getIntersections(controller);

    if (intersections.length > 0) {
      const object = intersections[0].object;
      object.material.emissive.b = 1;
      controller.attach(object);
      controller.userData.selected = object;

      // Si l'objet est le cube, afficher un texte
      if (object.name === 'cube') {  
        showText('Ceci est un cube!', { x: window.innerWidth / 2, y: window.innerHeight / 2 });
      }
    }
  }

  function onSelectEnd(event) {
    const controller = event.target;
    if (controller.userData.selected) {
      controller.userData.selected.material.emissive.b = 0;
      scene.attach(controller.userData.selected);
      controller.userData.selected = undefined;
    }
  }

  controllers.forEach(controller => {
    controller.addEventListener('selectstart', onSelectStart);
    controller.addEventListener('selectend', onSelectEnd);
  });
}
