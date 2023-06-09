import "/style.css";
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
const loader = new GLTFLoader();

loader.load(
  "./3dModels/star_destroyer.glb",
  function (gltf) {
    scene.add(gltf.scene);
  },
  undefined,
  function (error) {
    console.error(error);
  }
);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  10000
);
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(10000);
camera.position.setX(-300);
camera.position.setY(150);
camera.rotateY(Math.PI / -6);

renderer.render(scene, camera);

const spheretexture = new THREE.TextureLoader().load("./img/planetmap13.jpg");
const planet = new THREE.Mesh(
  new THREE.SphereGeometry(600, 100, 16, 100),
  new THREE.MeshStandardMaterial({ map: spheretexture })
);
planet.position.set(2000, -500, 5500);
scene.add(planet);

const pointLight = new THREE.PointLight(0xffffff, 1, 2000);
pointLight.position.set(-300, 200, 800);
const pointLight2 = new THREE.PointLight(0xffddaa, 1, 3500);
pointLight2.position.set(300, -200, 800);
scene.add(pointLight, pointLight2);

/*Scroll animation*/
function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  camera.position.z = 2000 + t * 4;
  camera.rotation.y = Math.PI / -8 + t * 0.0002;
  planet.position.z = t * 4;
}
document.body.onscroll = moveCamera;
moveCamera();

/*Animate*/
function animate() {
  planet.rotation.x += 0.0001;
  planet.rotation.z += 0.0001;
  planet.rotation.y += 0.0001;

  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}
animate();
