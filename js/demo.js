document.addEventListener('DOMContentLoaded', function () {
  // Stress Simulation Script (unchanged)
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

  // Scene Setup
  const scene = new THREE.Scene();

  // Camera Fix: Adjust near plane and position
  const camera = new THREE.PerspectiveCamera(
    75, 
    window.innerWidth / window.innerHeight, 
    0.01, // Changed from 0.1 to 0.01
    1000
  );
  camera.position.set(0, 0, 0.001); // Position closer to center

  // Renderer Fix: Add alpha channel for debugging
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true // Enable transparency
  });
  renderer.setClearColor(0x000000, 0); // Transparent background
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  document.body.appendChild(renderer.domElement);

  // Geometry Fix: Reduce complexity for better performance
  const geometry = new THREE.SphereGeometry(500, 32, 16); // Reduced segments
  geometry.scale(-1, 1, 1); // Flip normals inward

  // Texture Loading Fix: Add success logging and force update
  const textureLoader = new THREE.TextureLoader();
  textureLoader.load(
    'img/er.png',
    (texture) => {
      console.log('Texture loaded successfully');
      const material = new THREE.MeshBasicMaterial({
        map: texture,
        side: THREE.BackSide,
        transparent: true
      });
      const sphere = new THREE.Mesh(geometry, material);
      scene.add(sphere);
      needsUpdate = true; // Force render after load
    },
    undefined,
    (err) => {
      console.error('Texture error:', err);
      // Visible fallback material
      const material = new THREE.MeshBasicMaterial({
        color: 0xFF0000, // Bright red for visibility
        side: THREE.BackSide
      });
      scene.add(new THREE.Mesh(geometry, material));
      needsUpdate = true;
    }
  );

  // Debug Helpers: Add axes visualization
  scene.add(new THREE.AxesHelper(50)); // Red=X, Green=Y, Blue=Z

  // VR Configuration (Temporarily Disabled)
  // renderer.xr.enabled = true;
  // renderer.xr.setReferenceSpaceType('local');
  // document.body.appendChild(VRButton.createButton(renderer));

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

  // Animation Loop Fix: Ensure continuous updates
  let needsUpdate = true;
  renderer.setAnimationLoop(() => {
    controls.update();
    renderer.render(scene, camera);
  });

  // Cleanup on page unload
  window.addEventListener('beforeunload', () => {
    clearInterval(simulationInterval);
    renderer.dispose();
  });
});