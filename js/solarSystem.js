// =============================================
//  Constants and Variables
// =============================================
const PLANET_ORBIT_SPEED = 0.005; // Animation speed for planet orbits
const PLANET_DATA = [       // Data for each planet
  { name: 'Mercury', color: 0x808080, size: 0.4, distance: 8 },
  { name: 'Venus',   color: 0xffd700, size: 0.9, distance: 11 },
  { name: 'Earth',   color: 0x0000ff, size: 1,   distance: 15 },
  { name: 'Mars',    color: 0xff0000, size: 0.5, distance: 20 },
  { name: 'Jupiter', color: 0xffa500, size: 2.5, distance: 28 },
  { name: 'Saturn',  color: 0xffd700, size: 2,   distance: 35 },
  { name: 'Uranus',  color: 0x00ffff, size: 1.5, distance: 40 },
  { name: 'Neptune', color: 0x0000ff, size: 1.5, distance: 45 }
];

let scene, camera, renderer, controls; // Three.js scene elements
const planets = [];                      // Array to hold planet objects


// =============================================
//  Initialization Functions
// =============================================

function initSolarSystem() {
  setupThreeJS();
  createSun();
  createPlanets();
  setupCameraAndControls();
  addPlanetClickHandler(); // Enable planet click interactions
  animate();              // Start the animation loop
}

function setupThreeJS() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  const light = new THREE.PointLight(0xffffff, 1.5); // Soft white light
  scene.add(light);
}

function createSun() {
  const sunGeometry = new THREE.SphereGeometry(5, 32, 32);
  const sunMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 }); // Yellow sun
  const sun = new THREE.Mesh(sunGeometry, sunMaterial);
  scene.add(sun);
}

function createPlanets() {
  PLANET_DATA.forEach(data => {
    const planetGeometry = new THREE.SphereGeometry(data.size, 32, 32);
    const planetMaterial = new THREE.MeshPhongMaterial({ color: data.color });
    const planet = new THREE.Mesh(planetGeometry, planetMaterial);
    planet.position.x = data.distance; // Initial position
    scene.add(planet);
    planets.push({
      mesh: planet,
      ...data,
      angle: Math.random() * Math.PI * 2 // Random starting angle
    });
  });
}

function setupCameraAndControls() {
  camera.position.z = 50; // Initial camera distance
  controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;      // Enable smooth damping
  controls.dampingFactor = 0.05;     // Damping factor for smooth rotation
}

function addPlanetClickHandler() {
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();

  window.addEventListener('click', (event) => {
    mouse.set(
      (event.clientX / window.innerWidth) * 2 - 1,
      -(event.clientY / window.innerHeight) * 2 + 1
    );
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(planets.map(p => p.mesh));

    if (intersects.length > 0) { // Check if any planet is intersected
      const clickedObject = intersects[0].object;
      const planet = planets.find(p => p.mesh === clickedObject);

      if (planet) {
        displayPlanetInfo(planet);
      }
    }
  });
}

function displayPlanetInfo(planet) {
  const chatMessages = document.getElementById('chat-messages');
  chatMessages.innerHTML += `
    <div class="chat-message system-message">
      🌍 <b>${planet.name}</b><br>
      Size: ${planet.size}x Earth radius<br>
      Orbital Distance: ${planet.distance} AU
    </div>`;
  chatMessages.scrollTop = chatMessages.scrollHeight; // Scroll to bottom
}


// =============================================
//  Animation Loop
// =============================================
function animate() {
  requestAnimationFrame(animate);

  planets.forEach(planet => {
    planet.angle += PLANET_ORBIT_SPEED; // Increment planet angle
    planet.mesh.position.x = Math.cos(planet.angle) * planet.distance;
    planet.mesh.position.z = Math.sin(planet.angle) * planet.distance;
  });

  controls.update(); // Update OrbitControls
  renderer.render(scene, camera);
}

// Initialize on window load
window.onload = initSolarSystem;