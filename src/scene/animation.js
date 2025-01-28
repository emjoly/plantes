export function animate(scene, camera, renderer) {
    renderer.setAnimationLoop(() => {
      scene.children[0].rotation.x += 0.01; // Rotate the cube
      scene.children[0].rotation.y += 0.01;
  
      renderer.render(scene, camera);
    });
  }
  