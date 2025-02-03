export function animate(scene, camera, renderer) {
  renderer.setAnimationLoop(() => {
    scene.traverse((child) => {
      if (child.isMesh && child.userData.isAnimating !== false) {
        child.rotation.x += 0.01;
        child.rotation.y += 0.01;
      }
    });

    renderer.render(scene, camera);
  });
}