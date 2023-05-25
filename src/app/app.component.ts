import { Component, AfterViewInit, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import * as THREE from 'three';
import gsap from "gsap";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit, AfterViewInit {

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

    private scene!: THREE.Scene;

    createScene() {
        this.scene = new THREE.Scene;
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

    private camera!: THREE.PerspectiveCamera;

    createCamera() {
        this.camera = new THREE.PerspectiveCamera(35, this.sizes.width / this.sizes.height, 0.1, 1000)
        this.camera.position.z = 5
    }


    //
    // Add camera and cube
    //

    addOnScene() {
        this.scene.add(this.camera)
    }

    //
    // Renderer
    //

    private renderer!: THREE.WebGLRenderer;

    startRendering() {
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias: true,
            alpha: true, 
        })

        this.renderer.setSize(this.sizes.width , this.sizes.height)
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

        let component: AppComponent = this;
        (function render() {
            requestAnimationFrame(render)
            component.renderer.render(component.scene, component.camera)
        }())
    }

    private loader!: GLTFLoader;
    private dracoLoader!: DRACOLoader;
    // private model!: THREE.Object3D;

    create(model: THREE.Object3D, path: string, positionX: number, rotationY: number, rotationX: number) {
        
        this.loader = new GLTFLoader();

        this.dracoLoader = new DRACOLoader();
        this.dracoLoader.setDecoderConfig({ type: 'js' });
        this.dracoLoader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/');
        this.loader.setDRACOLoader( this.dracoLoader );

        this.loader.load( path,  ( gltf ) => {
        
            model = gltf.scene;
            model.scale
            model.scale.set(0.2, 0.2, 0.2); // Set the scale to 50%
            this.scene.add(model);
            model.position.y = 0.05;
            model.position.x = positionX
            model.rotation.x = rotationX;
            model.rotation.y = rotationY;
            // model.rotation.z = 1 
        
          });
    }

    private hemiLight!: THREE.HemisphereLight;
    private dirLight!: THREE.DirectionalLight;

    addLight() {
    this.hemiLight = new THREE.HemisphereLight( 0xffffff, 0xffffff, 0.61 );
    this.hemiLight.position.set( 50, 50, 50 ); 
    this.scene.add( this.hemiLight );

    this.dirLight = new THREE.DirectionalLight( 0xffffff, 0.54 );
    this.dirLight.position.set( -8, 12, 8 );
    this.dirLight.castShadow = true;
    this.dirLight.shadow.mapSize = new THREE.Vector2(1024, 1024);  
   this. scene.add( this.dirLight );
    }

    beach = {
        data: new THREE.Object3D,
        path: '/assets/beach.glb',
        y: -1.3,
        rotationY: -0.5,
        rotationX: 0.4
    };

    garden = {
        data: new THREE.Object3D,
        path: '/assets/garden.glb',
        y: 1.3,
        rotationY: -3.9,
        rotationX: 0.4
    };

    ngAfterViewInit() {
        this.create(this.beach.data, this.beach.path, this.beach.y, this.beach.rotationY, this.beach.rotationX);
        // this.create(this.garden.data, this.garden.path, this.garden.y, this.garden.rotationY, this.garden.rotationX);
        this.createScene();
        this.createCamera();
        this.addOnScene();
        this.addLight();
        this.startRendering();
    }

    rotate() {
        this.garden.data.rotation.z += 5;
    }
}

@Component({
    selector: 'new-app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
  })

  export class newAppComponent implements OnInit, AfterViewInit {

    ngOnInit(): void {

    }

    @ViewChild('canvas1')
    private canvasRef!: ElementRef;

    private get canvas(): HTMLCanvasElement {
        return this.canvasRef.nativeElement;
    }

    //
    // Scene
    //

    private scene!: THREE.Scene;

    createScene() {
        this.scene = new THREE.Scene;
    }

    //
    // Sizes
    //

    private sizes = {
        width: window.innerWidth,
        height: window.innerHeight
    }

    //
    // Camera
    //

    private camera!: THREE.PerspectiveCamera;

    createCamera() {
        this.camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 1000)
        this.camera.position.z = 5
    }


    //
    // Add camera and cube
    //

    addOnScene() {
        this.scene.add(this.camera)
    }

    //
    // Renderer
    //

    private renderer!: THREE.WebGLRenderer;

    startRendering() {
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias: true,
            alpha: true, 
        })

        this.renderer.setSize(this.sizes.width , this.sizes.height)
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

        let component: newAppComponent = this;
        (function render() {
            requestAnimationFrame(render)
            component.renderer.render(component.scene, component.camera)
        }())
    }

    private loader!: GLTFLoader;
    private dracoLoader!: DRACOLoader;
    // private model!: THREE.Object3D;

    create(model: THREE.Object3D, path: string, positionX: number, rotationY: number, rotationX: number) {
        
        this.loader = new GLTFLoader();

        this.dracoLoader = new DRACOLoader();
        this.dracoLoader.setDecoderConfig({ type: 'js' });
        this.dracoLoader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/');
        this.loader.setDRACOLoader( this.dracoLoader );

        this.loader.load( path,  ( gltf ) => {
        
            model = gltf.scene;
            model.scale
            model.scale.set(0.2, 0.2, 0.2); // Set the scale to 50%
            this.scene.add(model);
            model.position.y = 0.05;
            model.position.x = positionX
            model.rotation.x = rotationX;
            model.rotation.y = rotationY;
            // model.rotation.z = 1 
        
          });
    }

    private hemiLight!: THREE.HemisphereLight;
    private dirLight!: THREE.DirectionalLight;

    addLight() {
    this.hemiLight = new THREE.HemisphereLight( 0xffffff, 0xffffff, 0.61 );
    this.hemiLight.position.set( 50, 50, 50 ); 
    this.scene.add( this.hemiLight );

    this.dirLight = new THREE.DirectionalLight( 0xffffff, 0.54 );
    this.dirLight.position.set( -8, 12, 8 );
    this.dirLight.castShadow = true;
    this.dirLight.shadow.mapSize = new THREE.Vector2(1024, 1024);  
   this. scene.add( this.dirLight );
    }

    beach = {
        data: new THREE.Object3D,
        path: '/assets/beach.glb',
        y: -1.3,
        rotationY: -0.5,
        rotationX: 0.4
    };

    garden = {
        data: new THREE.Object3D,
        path: '/assets/garden.glb',
        y: 1.3,
        rotationY: -3.9,
        rotationX: 0.4
    };

    ngAfterViewInit() {
        // this.create(this.beach.data, this.beach.path, this.beach.y, this.beach.rotationY, this.beach.rotationX);
        this.create(this.garden.data, this.garden.path, this.garden.y, this.garden.rotationY, this.garden.rotationX);
        this.createScene();
        this.createCamera();
        this.addOnScene();
        this.addLight();
        this.startRendering();
    }

    rotate() {
        this.garden.data.rotation.z += 5;
    }
}