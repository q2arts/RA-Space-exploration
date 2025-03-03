// Three.js Solar System
let scene, camera, renderer;
let sun, planets = [];
const planetData = [
    { distance: 5, speed: 0.02, color: 0x0000ff, size: 0.8 },
    { distance: 8, speed: 0.015, color: 0xff0000, size: 0.6 },
    { distance: 12, speed: 0.01, color: 0x00ff00, size: 1.0 },
    { distance: 16, speed: 0.005, color: 0xffa500, size: 0.7 }
];

function initSolarSystem() {
    // Scene setup
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('container').appendChild(renderer.domElement);

    // Lighting
    const light = new THREE.PointLight(0xffffff, 1.5);
    light.position.set(0, 0, 0);
    scene.add(light);

    // Sun
    const sunGeometry = new THREE.SphereGeometry(2, 32, 32);
    const sunMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });
    sun = new THREE.Mesh(sunGeometry, sunMaterial);
    scene.add(sun);

    // Planets
    planetData.forEach(data => {
        const geometry = new THREE.SphereGeometry(data.size, 32, 32);
        const material = new THREE.MeshPhongMaterial({ color: data.color });
        const planet = new THREE.Mesh(geometry, material);
        planet.position.x = data.distance;
        scene.add(planet);
        planets.push({ mesh: planet, ...data, angle: 0 });
    });

    camera.position.z = 50;
    animate();
}

function animate() {
    requestAnimationFrame(animate);

    planets.forEach(planet => {
        planet.angle += planet.speed;
        planet.mesh.position.x = Math.cos(planet.angle) * planet.distance;
        planet.mesh.position.z = Math.sin(planet.angle) * planet.distance;
        planet.mesh.rotation.y += planet.speed * 0.5;
    });

    renderer.render(scene, camera);
}
