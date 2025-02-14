import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { loadingManager } from '../utils/loading.js';

export function loadModel(scene, modelPath) {
  const loader = new GLTFLoader(loadingManager);
  loader.load(
    modelPath,
    (gltf) => {
      scene.add(gltf.scene);
    },
    undefined,
    (error) => {
      console.error('Erreur de chargement du modèle : ', error);
    }
  );
}
