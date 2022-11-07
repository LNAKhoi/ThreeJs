import * as THREE from "three";
import { Vector3 } from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff);

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.minDistance = 5;
controls.maxDistance = 50;
controls.maxPolarAngle = Math.PI / 2;

const color = 0xffffff;
const intensity = 1;
const light = new THREE.DirectionalLight(color, intensity);
light.position.set(-1, 2, 4);
scene.add(light);

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshLambertMaterial({ color: 0xff9173e });
const cube = new THREE.Mesh(geometry, material);
// cube.matrixAutoUpdate = false;
console.log('geometry', geometry)

const m = new THREE.Matrix4();
console.log(m.elements);
geometry.applyMatrix4(m);

scene.add(cube);

//add button event 
const buttonX = document.getElementById("rX");
const buttonY = document.getElementById("rY");
const buttonZ= document.getElementById("rZ");
const buttonScale = document.getElementById("scale");

function animate() {
  requestAnimationFrame(animate);

  // Rotate axis
  let rolX = 0;
  let rolY = 0;
  let rolZ = 0;
  buttonX.addEventListener("click", () => {
    rolX += 10;
    m.makeRotationX((rolX * Math.PI) / 180);
    geometry.applyMatrix4(m);
  });
  buttonY.addEventListener("click", () => {
    rolY += 10;
    m.makeRotationY((rolY * Math.PI) / 180);
    geometry.applyMatrix4(m);
  });
  buttonZ.addEventListener("click", () => {
    rolZ += 10;
    m.makeRotationZ((rolZ * Math.PI) / 180);
    geometry.applyMatrix4(m);
  });

  let scaleVal = 0;
  buttonScale.addEventListener("click", () => {
    scaleVal -= 0.0001;
    // let scaleVector = new Vector3(2,-2,1);
    // m.scale(scaleVector)
    // m.makeTanslation(4,1,5)
    m.makeScale(scaleVal, scaleVal, scaleVal);
    cube.scale.applyMatrix4(m);
    
    console.log('cube',cube);
    // geometry.applyMatrix4(m);
  });

  render();
}

function render() {
  renderer.render(scene, camera);
}

animate();

window.addEventListener("resize", onWindowResize, false);
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  render();
}
