// Scene
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 5;

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
  antialias: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

// 🌌 STARS (better version)
const stars = [];

function addStar() {
  const geometry = new THREE.SphereGeometry(0.08, 24, 24);
  const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
  stars.push(star);
}

Array(500).fill().forEach(addStar);

// 🎥 SMOOTH MOUSE FOLLOW (lerp)
let mouseX = 0;
let mouseY = 0;

document.addEventListener("mousemove", (e) => {
  mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
  mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
});

// 📜 SCROLL EFFECT
document.body.onscroll = () => {
  const t = document.body.getBoundingClientRect().top;
  camera.position.z = 5 + t * -0.01;
};

// ✨ ANIMATION LOOP
function animate() {
  requestAnimationFrame(animate);

  // Smooth camera movement
  camera.position.x += (mouseX * 1.5 - camera.position.x) * 0.05;
  camera.position.y += (-mouseY * 1.5 - camera.position.y) * 0.05;

  // Stars subtle movement
  stars.forEach(star => {
    star.position.z += 0.05;
    if (star.position.z > 5) star.position.z = -50;
  });

  renderer.render(scene, camera);
}

animate();

// 🔗 PROJECT LINKS
// 🔗 PROJECT LINKS
function openProject(type) {
  if (type === 'portfolio') {
    window.open('https://pallavipathak703-source.github.io/pallavi-protfolio/');
  }
  if (type === 'todo') {
    window.open('https://pallavipathak703-source.github.io/Todo-app/');
  }
  if (type === 'calculator') {
    window.open('https://pallavipathak703-source.github.io/calculator-app1/');
  }                                                         
  if (type === 'landing') {
    window.open('https://pallavipathak703-source.github.io/landingpage/');
  }
}


// ⏳ LOADER REMOVE
window.onload = () => {
  document.getElementById("loader").style.display = "none";
};

// 📱 RESPONSIVE
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});