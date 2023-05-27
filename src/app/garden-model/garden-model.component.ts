import { Component, AfterViewInit, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls.js';
import * as Stats from 'stats.js'
import * as THREE from 'three';

@Component({
  selector: 'app-garden-model',
  templateUrl: './garden-model.component.html',
  styleUrls: ['./garden-model.component.css']
})
export class GardenModelComponent implements OnInit, AfterViewInit {

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
    this.camera.position.x = 0.5
    this.camera.position.y = 0.05
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

    this.renderer.setSize(this.sizes.width, this.sizes.height)
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    let component: GardenModelComponent = this;
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
    this.loader.setDRACOLoader(this.dracoLoader);

    this.loader.load(path, (gltf) => {

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
    this.hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.61);
    this.hemiLight.position.set(50, 50, 50);
    this.scene.add(this.hemiLight);

    this.dirLight = new THREE.DirectionalLight(0xffffff, 0.54);
    this.dirLight.position.set(-8, 12, 8);
    this.dirLight.castShadow = true;
    this.dirLight.shadow.mapSize = new THREE.Vector2(1024, 1024);
    this.scene.add(this.dirLight);
  }

  // public controls!: OrbitControls;
  public controls!: TrackballControls;

  moving() {
    this.controls = new TrackballControls(this.camera, this.renderer.domElement);

    // this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    // this.controls.maxPolarAngle = 2.3;
    // this.controls.minPolarAngle = 1.57;
    // this.controls.maxAzimuthAngle = 0;
    // this.controls.minAzimuthAngle = 0;
    // this.controls.maxDistance = 6.5;
    // this.controls.minDistance = 4.2;

    // this.controls.update();
    this.controls.target.copy(this.gardenModel.model.position)
    this.controls.addEventListener('change', this.startRendering)
  }


  gardenModel = {
    model: new THREE.Object3D,
    path: '/assets/garden.glb',
    rotationX: 1,
    rotationY: 1,
    positionX: -0.5
  }

  ngAfterViewInit() {
    this.create(this.gardenModel.model, this.gardenModel.path, this.gardenModel.positionX, this.gardenModel.rotationY, this.gardenModel.rotationX);
    // this.create(this.garden.data, this.garden.path, this.garden.y, this.garden.rotationY, this.garden.rotationX);
    this.createScene();
    this.createCamera();
    this.addOnScene();
    this.addLight();
    this.startRendering();
    this.moving();
  }
}
