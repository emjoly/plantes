import * as THREE from 'three';

export function createSkybox() {
    camera.layers.enable( 1 ); //faut prob mettre ca dans lautre fichier

    const geometry = new THREE.BoxGeometry( 100, 100, 100 );
    geometry.scale( 1, 1, - 1 );

    const textures = getTexturesFromAtlasFile( '../assets/skybox/name.jpg', 12 );

    const materials = [];
	for ( let i = 0; i < 6; i ++ ) {
		materials.push( new THREE.MeshBasicMaterial( { map: textures[ i ] } ) );
	}

    const skyBox = new THREE.Mesh( geometry, materials );
    skyBox.layers.set( 1 );

    return skyBox;
}

function getTexturesFromAtlasFile( atlasImgUrl, tilesNum ) {

    const textures = [];

    for ( let i = 0; i < tilesNum; i ++ ) {
        textures[ i ] = new THREE.Texture();
    }

    const loader = new THREE.ImageLoader();
    loader.load( atlasImgUrl, function ( imageObj ) {

        let canvas, context;
        const tileWidth = imageObj.height;

        for ( let i = 0; i < textures.length; i ++ ) {
            canvas = document.createElement( 'canvas' );
            context = canvas.getContext( '2d' );
            canvas.height = tileWidth;
            canvas.width = tileWidth;
            context.drawImage( imageObj, tileWidth * i, 0, tileWidth, tileWidth, 0, 0, tileWidth, tileWidth );
            textures[ i ].colorSpace = THREE.SRGBColorSpace;
            textures[ i ].image = canvas;
            textures[ i ].needsUpdate = true;
        }
    } );
    return textures;
}