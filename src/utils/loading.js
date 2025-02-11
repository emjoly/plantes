// loadingManager.js
import * as THREE from 'three';

// Créer un gestionnaire de chargement personnalisé
export const loadingManager = new THREE.LoadingManager();

loadingManager.onStart = function (url, itemsLoaded, itemsTotal) {
  console.log('Started loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.');
};

loadingManager.onLoad = function () {
  console.log('Loading Complete!');
};

loadingManager.onProgress = function (url, itemsLoaded, itemsTotal) {
  console.log('Loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.');
};

loadingManager.onError = function (url) {
  console.log('There was an error loading ' + url);
};
