import React from 'react';
import * as THREE from 'three';
import {AnimationMixer, Object3D, Vector3} from "three";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls.js";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader.js";

function initThree(canvas: HTMLCanvasElement): void {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera( 75, canvas.width / canvas.height, 0.1, 1000 );
    camera.position.set(100, 100, 0);
    camera.lookAt(new Vector3(0, 0, 0));

    const light = new THREE.DirectionalLight(0xffffff, 2);
    light.position.set(100, 100, 100);
    light.castShadow = true;
    light.shadow.mapSize.width = 512
    light.shadow.mapSize.height = 512
    light.shadow.camera.left = -50
    light.shadow.camera.right = 50
    light.shadow.camera.top = 50
    light.shadow.camera.bottom = -50
    light.shadow.camera.near = 0.5
    light.shadow.camera.far = 500
    scene.add(light);
    scene.add(light.target);

    const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x000000, 1);
    hemisphereLight.position.set(0, 100, 0);
    scene.add(hemisphereLight);

    // const lightHelper = new THREE.DirectionalLightHelper(light, 1);
    // scene.add(lightHelper);

    const floorGeometry = new THREE.PlaneGeometry(100, 100);
    const floorMaterial = new THREE.MeshPhongMaterial({color: 0x00ff00, depthWrite: false});
    const floorMesh = new THREE.Mesh(floorGeometry, floorMaterial);
    floorMesh.rotation.x = - Math.PI / 2;
    floorMesh.receiveShadow = true;
    scene.add(floorMesh);

    const controls = new OrbitControls( camera, canvas );
    controls.update();

    const mixers: AnimationMixer[] = [];
    const clock = new THREE.Clock();

    let bodyModel: Object3D;
    let bodyMesh: Object3D | undefined;

    const loader = new GLTFLoader();
    loader.load('/body.glb', (gltf) => {
        bodyModel = gltf.scene;
        bodyModel.traverse((object) => {
            object.castShadow = true;
        });

        scene.add(bodyModel);

        bodyMesh = bodyModel.getObjectByName('Cube');

        const bodyMixer = new THREE.AnimationMixer(bodyModel);
        mixers.push(bodyMixer);
        bodyMixer.clipAction(gltf.animations[0]).play();

        loader.load('/head.glb', (gltf) => {
            const headModel = gltf.scene;
            headModel.traverse((object) => {
                object.castShadow = true;
            });
            if (bodyMesh) {
                bodyModel.add(headModel);
            }

            const neck = bodyModel.getObjectByName('neck');
            if(neck) {
                headModel.position.set(neck?.position.x, neck?.position.y, neck?.position.z);
            }

            const headMixer = new THREE.AnimationMixer(headModel);
            mixers.push(headMixer);
            // headMixer.clipAction(gltf.animations[0]).play();

        });
    });

    const renderer = new THREE.WebGLRenderer({canvas});
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(canvas.width, canvas.height);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap

    const speed = .1;
    let direction = new Vector3(speed, 0, 0);

    function animate() {
        controls.update();
        const delta = clock.getDelta();
        for(let mixer of mixers) {
            mixer.update(delta);
        }
        if (bodyModel) {
            if( direction.x > 0 && bodyModel.position.x > 20 ) {
                direction = new Vector3(-speed, 0, 0);
            } else if(direction.x < 0 && bodyModel.position.x < -20) {
                direction = new Vector3(speed, 0, 0);
            }
            bodyModel.position.add(direction);
        }
        renderer.render( scene, camera );
    }
    renderer.setAnimationLoop( animate );
}

export default function Battle() {
    return <canvas
        width={window.innerWidth}
        height={window.innerHeight}
        ref={(node: HTMLCanvasElement | null) => {
            if (node) {
                initThree(node);
            }
        }}
    />;
}