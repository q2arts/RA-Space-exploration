document.addEventListener('DOMContentLoaded', function () {
  // Stress Simulation Script
  let stressLevel = 30;
  let simulationInterval;
  const maxStress = 100;
  const minStress = 0;
  
  function updateStressDisplay() {
    const progressElem = document.getElementById('stress-progress');
    const valueElem = document.getElementById('stress-value');
    const heartRateElem = document.getElementById('heart-rate');
    const oxygenElem = document.getElementById('oxygen');
    
    if (progressElem) progressElem.style.width = stressLevel + '%';
    if (valueElem) valueElem.textContent = Math.round(stressLevel) + '%';
    if (heartRateElem) heartRateElem.textContent = Math.floor(80 + (stressLevel * 0.4));
    if (oxygenElem) oxygenElem.textContent = Math.max(85, 100 - Math.floor(stressLevel * 0.15));
  }
  
  window.startScenario = function () {
    if (!simulationInterval) {
      simulationInterval = setInterval(() => {
        if (stressLevel < maxStress) {
          stressLevel += Math.random() * 1.5;
          updateStressDisplay();
        }
      }, 2000);
    }
  };
  
  window.resetScenario = function () {
    clearInterval(simulationInterval);
    simulationInterval = null;
    stressLevel = 30;
    updateStressDisplay();
  };
  
  window.applyBreathing = function () {
    if (stressLevel > 20) {
      stressLevel = Math.max(minStress, stressLevel - 20);
      updateStressDisplay();
    }
  };
  
  window.findSolution = function () {
    if (stressLevel > 10) {
      stressLevel = Math.max(minStress, stressLevel - 10);
      updateStressDisplay();
    }
  };
  
  // Initialize simulation display
  updateStressDisplay();
  
  // --- 3D Scene Script using Three.js ---
  
  // Initial Setup
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75, window.innerWidth / window.innerHeight, 0.1, 1000
  );
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  
  // Renderer configuration
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  document.body.appendChild(renderer.domElement);
  
  // 360° Sphere Setup
  const geometry = new THREE.SphereGeometry(500, 60, 40);
  geometry.scale(-1, 1, 1); // Flip normals inward
  
  // Texture loading
  const textureLoader = new THREE.TextureLoader();
  textureLoader.load('img/er.gif', (texture) => {
    const material = new THREE.MeshBasicMaterial({ map: texture });
    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);
  });
  
  // Camera position
  camera.position.set(0, 0, 0.1);
  
  // VR Configuration
  renderer.xr.enabled = true;
  renderer.xr.setReferenceSpaceType('local');
  document.body.appendChild(VRButton.createButton(renderer));
  
  // Controls (Mouse/Touch)
  const controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enableZoom = false;
  controls.enablePan = false;
  controls.enableDamping = true;
  controls.rotateSpeed = -0.25;
  
  // Window resize handler
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
  
  // Animation Loop
  renderer.setAnimationLoop(() => {
    controls.update();
    renderer.render(scene, camera);
  });
});
