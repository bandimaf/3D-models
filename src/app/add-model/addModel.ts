import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';

export class AddModel {

    createScene(scene: THREE.Scene) {
        scene = new THREE.Scene;
    }

    sizes = {
        width: window.innerWidth / 1.2,
        height: window.innerHeight / 1.2
    }

    createCamera(camera: THREE.PerspectiveCamera, scene: THREE.Scene) {
        camera = new THREE.PerspectiveCamera(35, this.sizes.width / this.sizes.height, 0.1, 1000)
        camera.position.z = 5
        scene.add(camera)
    }

    addModel(
        loader: GLTFLoader,
        dracoLoader: DRACOLoader,
        scene: THREE.Scene,

        model: THREE.Object3D,
        path: string,
        positionX: number,
        rotationY: number,
        rotationX: number) {
        
        loader = new GLTFLoader();

        dracoLoader = new DRACOLoader();
        dracoLoader.setDecoderConfig({ type: 'js' });
        dracoLoader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/');
        loader.setDRACOLoader( dracoLoader );

        loader.load( path,  ( gltf ) => {
        
            model = gltf.scene;
            model.scale
            model.scale.set(0.2, 0.2, 0.2); // Set the scale to 50%
            scene.add(model);
            model.position.y = 0.05;
            model.position.x = positionX
            model.rotation.x = rotationX;
            model.rotation.y = rotationY;
            // model.rotation.z = 1 
        
          });
    }

    addLight(
        hemiLight: THREE.HemisphereLight,
        dirLight: THREE.DirectionalLight,
        scene: THREE.Scene
        ){

        hemiLight = new THREE.HemisphereLight( 0xffffff, 0xffffff, 0.61 );
        hemiLight.position.set( 50, 50, 50 ); 
        scene.add( hemiLight );

        dirLight = new THREE.DirectionalLight( 0xffffff, 0.54 );
        dirLight.position.set( -8, 12, 8 );
        dirLight.castShadow = true;
        dirLight.shadow.mapSize = new THREE.Vector2(1024, 1024);  
        scene.add( dirLight );
    }
}