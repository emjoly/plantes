import { VRButton } from 'three/examples/jsm/webxr/VRButton.js';

export function setupVRButton(renderer) {
  if (navigator.xr) {
    document.body.appendChild(VRButton.createButton(renderer));
  } else {
    console.warn('WebXR not supported. Running in regular 3D mode.');
  }
}
