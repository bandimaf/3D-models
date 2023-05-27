interface IModel {
    model: THREE.Object3D;
    path: string;

    rotationX: number;
    rotationY: number;
    rotationZ?: number;

    positionX: number;
    positionY?: number;
    positionZ?: number;
}