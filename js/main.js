import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.118.3/build/three.module.js";
import { OrbitControls } from "https://cdn.jsdelivr.net/npm/three@0.118/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";

let camera;
let renderer;
let scene;
let controls;

init();
animate();

function init() {
  // Scene
  scene = new THREE.Scene();
  scene.background = null;

  const fov = 75;
  const aspect = window.innerWidth / window.innerHeight;
  const near = 0.1;
  const far = 1500;

  // Perspective Camera
  camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.set(20, 5, 5);

  // Light
  const ambient = new THREE.AmbientLight(0x212121, 10);
  scene.add(ambient);

  const light = new THREE.DirectionalLight(0xffffff, 2);
  light.position.set(50, 50, 100);
  scene.add(light);

  //3d Model
  const loader = new GLTFLoader().setPath("../model/");

  //loading 3d model - CHANGE PATH NAME
  loader.load(
    "../assets/Fin.glb",
    function (obj) {
      scene.add(obj.scene);
    },
    function (xhr) {
      console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
    },
    function (error) {
      console.error(error);
    }
  );

  // xyz
  /*   let helper = new THREE.AxesHelper(50);
  scene.add(helper); */

  renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
  });

  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  //resizing container
  document.getElementById("d3d").appendChild(renderer.domElement);

  window.addEventListener("resize", function () {
    const width = window.innerWidth;
    const height = window.innerHeight;
    renderer.setSize(width, height);
    camera.aspect = aspect;
    camera.updateProjectionMatrix();
  });

  //OrbitControls
  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.enableZoom = false;
  controls.enablePan = false;
}

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
