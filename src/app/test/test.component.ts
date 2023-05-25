import { Component, AfterViewInit, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import * as THREE from 'three';
import gsap from "gsap";

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit, AfterViewInit {

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

  private scence!: THREE.Scene;

  createScene() {
      this.scence = new THREE.Scene;
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
      this.camera = new THREE.PerspectiveCamera(35, this.sizes.width / this.sizes.height, 0.1, 1000)
      this.camera.position.z = 5
  }

  //
  // Cube
  //

  private geometry = new THREE.BoxGeometry(1, 1, 1);

  private texture1 = new THREE.TextureLoader().load("/assets/cube-1.jpeg")
  private texture2 = new THREE.TextureLoader().load("/assets/cube-2.jpeg")
  private texture3 = new THREE.TextureLoader().load("/assets/cube-3.jpeg")
  private texture4 = new THREE.TextureLoader().load("/assets/cube-4.jpeg")
  private texture5 = new THREE.TextureLoader().load("/assets/cube-5.jpeg")
  private texture6 = new THREE.TextureLoader().load("/assets/cube-6.jpeg")

  textureCube: any = []

  textureMethod() {
      this.textureCube.push(new THREE.MeshBasicMaterial({ map: this.texture1 }))
      this.textureCube.push(new THREE.MeshBasicMaterial({ map: this.texture2 }))
      this.textureCube.push(new THREE.MeshBasicMaterial({ map: this.texture3 }))
      this.textureCube.push(new THREE.MeshBasicMaterial({ map: this.texture4 }))
      this.textureCube.push(new THREE.MeshBasicMaterial({ map: this.texture5 }))
      this.textureCube.push(new THREE.MeshBasicMaterial({ map: this.texture6 }))
  }

  private cube: THREE.Mesh = new THREE.Mesh(this.geometry, this.textureCube);

  //
  // Add camera and cube
  //

  addOnScence() {
      this.scence.add(this.camera)
      this.scence.add(this.cube)
  }

  //
  // Rotation
  //

  rotationCube() {
      this.cube.rotation.x += 0.008; this.cube.rotation.y += 0.001;
  }

  // 
  // Move
  // 

  private transformCube = [
      {
          rotationZ: 0.45,
          positionX: 1.5
      },
      {
          rotationZ: -0.45,
          positionX: -1.5
      },
      {
          rotationZ: 0.45,
          positionX: 1.5
      },
      {
          rotationZ: 0.045,
          positionX: 0
      },
      {
          rotationZ: 0.0314,
          positionX: 0
      }

  ]

  private currentSection = 0

  private checkStartPosition = 0;

  moveOnScroll() {

      const newSection = Math.round(window.scrollY / this.sizes.height)

      if (newSection == 0 && this.checkStartPosition == 0) {
          this.cube.position.x = 1.5
          this.checkStartPosition++;
      }

      if (newSection != this.currentSection) {
          this.currentSection = newSection

          gsap.to(
              this.cube.rotation, {
              duration: 1,
              ease: 'power2.inOut',
              z: this.transformCube[this.currentSection].rotationZ
          }
          )
          gsap.to(
              this.cube.position, {
              duration: 1,
              ease: 'power2.inOut',
              x: this.transformCube[this.currentSection].positionX
          }
          )
      }

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

      let component: TestComponent = this;
      (function render() {
          requestAnimationFrame(render)
          component.rotationCube()
          component.moveOnScroll()
          component.renderer.render(component.scence, component.camera)
      }())
  }

  ngAfterViewInit() {
      this.textureMethod();
      this.createScene();
      this.createCamera();
      this.addOnScence();
      this.startRendering();
  }
}