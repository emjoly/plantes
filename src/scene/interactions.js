import * as THREE from 'three';

export function setupInteractions(scene, controllers, renderer, camera) {
  const raycaster = new THREE.Raycaster();
  // stocker l’objet actuellement survolé
  let hoveredObject = null;
  
  function getIntersections(controller) {
    controller.updateMatrixWorld();
    raycaster.setFromXRController(controller);
    const intersections = raycaster.intersectObjects(scene.children, false);

    function applyHoverEffect(object, isHovering) {
      if (object) {
        object.material.opacity = isHovering ? 0.5 : 1; // Appliquer la transparence au survol
      }
    }

    if (intersections.length > 0) {
      if (hoveredObject !== intersections[0].object) {
        if (hoveredObject) hoveredObject.material.opacity = 1; // Rétablir l'opacité normale
        hoveredObject = intersections[0].object;
        hoveredObject.material.transparent = true;
        hoveredObject.material.opacity = 0.5; // Appliquer l'effet translucide
      }
    } else if (hoveredObject) {
      hoveredObject.material.opacity = 1; // Restaurer l'opacité normale quand on quitte
      hoveredObject = null;
    }
  
    return intersections;
  }

  function onSelectStart(event) {
    const controller = event.target;
    const intersections = getIntersections(controller);

    if (intersections.length > 0 && intersections[0].object.isMesh) {
      const object = intersections[0].object;

      controller.attach(object);
      controller.userData.selected = object;

      // Désactiver l'animation pendant qu'il est sélectionné
      object.userData.isAnimating = false;

      // Afficher un message si l'objet est le cube
      // if (object.name === 'cube') {  
      //   showText('Ceci est un cube!', { x: window.innerWidth / 2, y: window.innerHeight / 2 });
      // }
    }
  }

  function onSelectEnd(event) {
    const controller = event.target;

    if (controller.userData.selected) {

      scene.attach(controller.userData.selected);
      // Réactiver l'animation de l'objet
      controller.userData.selected.userData.isAnimating = true;

      controller.userData.selected = undefined;
    }
  }

  function onHover(event) {
    const controller = event.target;
    const intersections = getIntersections(controller);

    if (intersections.length > 0) {
      const object = intersections[0].object;
      if (hoveredObject !== object) {
        applyHoverEffect(hoveredObject, false); // Réinitialiser l'ancien objet
        hoveredObject = object;
        applyHoverEffect(hoveredObject, true);
      }
    } else if (hoveredObject) {
      applyHoverEffect(hoveredObject, false);
      hoveredObject = null;
    }
  }

  controllers.forEach(controller => {
    controller.addEventListener('selectstart', onSelectStart);
    controller.addEventListener('selectend', onSelectEnd);
    controller.addEventListener('squeezestart', onHover); // Détection du survol avec un squeeze
  });

  if (renderer) {
    renderer.setAnimationLoop(() => {
      controllers.forEach(controller => onHover({ target: controller })); // Vérifier le survol en continu
      renderer.render(scene, camera);
    });
  } else {
    console.error("Renderer is undefined before setAnimationLoop");
  }
}