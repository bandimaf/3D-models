import { Component, AfterViewInit, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import * as THREE from 'three';

@Component({
  selector: 'app-beach-model',
  templateUrl: './beach-model.component.html',
  styleUrls: ['./beach-model.component.css']
})
export class BeachModelComponent implements OnInit, AfterViewInit {

  ngOnInit(): void {

  }

  @ViewChild('canvas')
  private canvasRef!: ElementRef;

  private get canvas(): HTMLCanvasElement {
      return this.canvasRef.nativeElement;
  }

 //
    // Scene
    //

    createScene(scene: THREE.Scene) {
        scene = new THREE.Scene;
    }

    //
    // Sizes
    //

    private sizes = {
        width: window.innerWidth / 1.2,
        height: window.innerHeight / 1.2
    }

    //
    // Camera
    //


    createCamera(camera: THREE.PerspectiveCamera, scene: THREE.Scene) {
        camera = new THREE.PerspectiveCamera(35, this.sizes.width / this.sizes.height, 0.1, 1000)
        camera.position.z = 5
        scene.add(camera)
    }

    //
    // Renderer
    //

    startRendering(renderer: THREE.WebGLRenderer, scene: THREE.Scene, camera: THREE.Camera) {
        renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias: true,
            alpha: true, 
        })

        this.renderer.setSize(this.sizes.width , this.sizes.height)
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

        let component: BeachModelComponent = this;
        (function render() {
            requestAnimationFrame(render)
            renderer.render(scene, camera)
        }())
    }

    create(loader: GLTFLoader, dracoLoader: DRACOLoader, scene: THREE.Scene, model: THREE.Object3D, path: string, positionX: number, rotationY: number, rotationX: number) {
        
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


    addLight(hemiLight: THREE.HemisphereLight, dirLight: THREE.DirectionalLight, scene: THREE.Scene) {
    hemiLight = new THREE.HemisphereLight( 0xffffff, 0xffffff, 0.61 );
    hemiLight.position.set( 50, 50, 50 ); 
    scene.add( hemiLight );

    dirLight = new THREE.DirectionalLight( 0xffffff, 0.54 );
    dirLight.position.set( -8, 12, 8 );
    dirLight.castShadow = true;
    dirLight.shadow.mapSize = new THREE.Vector2(1024, 1024);  
    scene.add( dirLight );
    }

    beachModel = {
      model: new THREE.Object3D,
      path: '/assets/beach.glb',
      rotationX: 1,
      rotationY: 1,
      positionX: -0.5
    }

    public scene1!: THREE.Scene;
    public camera1!: THREE.PerspectiveCamera;
    public loader1!: GLTFLoader;
    public dracoLoader1!: DRACOLoader;
    public hemiLight1!: THREE.HemisphereLight;
    public dirLight!: THREE.DirectionalLight;
    private renderer!: THREE.WebGLRenderer;

    ngAfterViewInit() {
        this.create(this.loader1, this.dracoLoader1, this.scene1, this.beachModel.model, this.beachModel.path, this.beachModel.positionX, this.beachModel.rotationY, this.beachModel.rotationX);
        // this.create(this.garden.data, this.garden.path, this.garden.y, this.garden.rotationY, this.garden.rotationX);
        this.createScene(this.scene1);
        this.createCamera(this.camera1, this.scene1);
        this.addLight(this.hemiLight1, this.dirLight, this.scene1);
        this.startRendering(this.renderer, this.scene1, this.camera1);
    }
}
