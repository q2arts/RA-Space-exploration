<!-- Stress Simulation Script -->
<script>
let stressLevel = 30;
let simulationInterval;
const maxStress = 100;
const minStress = 0;

function updateStressDisplay() {
    document.getElementById('stress-progress').style.width = stressLevel + '%';
    document.getElementById('stress-value').textContent = Math.round(stressLevel) + '%';
    document.getElementById('heart-rate').textContent = Math.floor(80 + (stressLevel * 0.4));
    document.getElementById('oxygen').textContent = Math.max(85, 100 - Math.floor(stressLevel * 0.15));
}

function startScenario() {
    if (!simulationInterval) {
        simulationInterval = setInterval(() => {
            if (stressLevel < maxStress) {
                stressLevel += Math.random() * 1.5;
                updateStressDisplay();
            }
        }, 2000);
    }
}

function resetScenario() {
    clearInterval(simulationInterval);
    simulationInterval = null;
    stressLevel = 30;
    updateStressDisplay();
}

function applyBreathing() {
    if (stressLevel > 20) {
        stressLevel = Math.max(minStress, stressLevel - 20);
        updateStressDisplay();
    }
}

function findSolution() {
    if (stressLevel > 10) {
        stressLevel = Math.max(minStress, stressLevel - 10);
        updateStressDisplay();
    }
}

// Initialize
updateStressDisplay();
</script>

<!-- Three.js Dependencies -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/controls/OrbitControls.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/webxr/VRButton.js"></script>

<!-- 3D Scene Script -->
<script>
    // INITIAL SETUP
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    
    // RENDERER CONFIG
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    document.body.appendChild(renderer.domElement);

    // 360° SPHERE SETUP
    const geometry = new THREE.SphereGeometry(500, 60, 40);
    geometry.scale(-1, 1, 1); // Flip normals inward
    
    // TEXTURE LOADING
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load('img/quantummindai.gif', (texture) => {
        const material = new THREE.MeshBasicMaterial({ map: texture });
        const sphere = new THREE.Mesh(geometry, material);
        scene.add(sphere);
    });

    // CAMERA POSITION
    camera.position.set(0, 0, 0.1);

    // VR CONFIGURATION
    renderer.xr.enabled = true;
    renderer.xr.setReferenceSpaceType('local');
    document.body.appendChild(VRButton.createButton(renderer));

    // CONTROLS (MOUSE/TOUCH)
    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.enableDamping = true;
    controls.rotateSpeed = -0.25;

    // WINDOW RESIZE HANDLER
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

    // ANIMATION LOOP
    renderer.setAnimationLoop(() => {
        controls.update();
        renderer.render(scene, camera);
    });
</script>
