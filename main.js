import * as THREE from "three";
import { VRButton } from "three/addons/webxr/VRButton.js";

// VR
// bouton pour activer la VR
document.body.appendChild(VRButton.createButton(renderer));
// pour que webGLRenderer enable le XR rendering
renderer.xr.enabled = true;
// animation loop
renderer.setAnimationLoop(function () {
  renderer.render(scene, camera);
});

// canvas ----- si j'ajoute un canvas
// const canvas = document.querySelector("canvas.webgl");

// sizes
const width = window.innerWidth,
  height = window.innerHeight;

// camera
const camera = new THREE.PerspectiveCamera(70, width / height, 0.01, 10);
camera.position.z = 1;

// init
const scene = new THREE.Scene();

// object juste un cube for now
const geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
const material = new THREE.MeshNormalMaterial();
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(width, height);
renderer.setAnimationLoop(animate);
document.body.appendChild(renderer.domElement);

// pour se tourner
function animate(time) {
  mesh.rotation.x = time / 2000;
  mesh.rotation.y = time / 1000;

  renderer.render(scene, camera);
}
