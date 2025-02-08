import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { RGBELoader } from 'three/addons/loaders/RGBELoader.js';


// const group = new THREE.Group();
// let isInitialized = false;

// export function getGroup() {
//     if (!isInitialized) {
//         const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
//         const material = new THREE.MeshStandardMaterial({
//             color: 0x00ff00,
//             roughness: 0.7,
//             metalness: 0.0
//         });
//         const object = new THREE.Mesh(geometry, material);
//         object.position.set(0, 1, -1);

//         object.castShadow = true;
//         object.receiveShadow = true;

//         group.add(object);
//         isInitialized = true;
//     }
//     return group;
// }

new RGBELoader()
	.setPath( 'textures/equirectangular/' )
	.load( 'royal_esplanade_1k.hdr', function ( texture ) {

		texture.mapping = THREE.EquirectangularReflectionMapping;

		scene.background = texture;
		scene.environment = texture;

		render();

        // Instantiate a loader
        const loader = new GLTFLoader().setPath( 'models/ficus/' );

        // Load a glTF resource
        loader.load(
            // resource URL
            'ficus.gltf',
            // called when the resource is loaded
            function ( gltf ) {

                scene.add( gltf.scene );

                gltf.animations; // Array<THREE.AnimationClip>
                gltf.scene; // THREE.Group
                gltf.scenes; // Array<THREE.Group>
                gltf.cameras; // Array<THREE.Camera>
                gltf.asset; // Object

            }
        );
    });

// const dracoLoader = new DRACOLoader();
// dracoLoader.setDecoderPath( 'jsm/libs/draco/' );
// const gltfLoader = new GLTFLoader();
// gltfLoader.setDRACOLoader( dracoLoader );

// const gltf = await gltfLoader.loadAsync( 'models/gltf/kira.glb' );
// gltf.scene.traverse( n => {

// 	if ( n.name === 'head' ) OOI.head = n;
// 	if ( n.name === 'lowerarm_l' ) OOI.lowerarm_l = n;
// 	if ( n.name === 'Upperarm_l' ) OOI.Upperarm_l = n;
// 	if ( n.name === 'hand_l' ) OOI.hand_l = n;
// 	if ( n.name === 'target_hand_l' ) OOI.target_hand_l = n;

// 	if ( n.name === 'boule' ) OOI.sphere = n;
// 	if ( n.name === 'Kira_Shirt_left' ) OOI.kira = n;

// } );
// scene.add( gltf.scene );