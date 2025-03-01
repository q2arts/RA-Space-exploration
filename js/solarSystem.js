let scene, camera, renderer, controls;
const planets = [];
const planetData = [
    { name: 'Mercury', color: 0x808080, size: 0.4, distance: 8 },
    { name: 'Venus', color: 0xffd700, size: 0.9, distance: 11 },
    { name: 'Earth', color: 0x0000ff, size: 1, distance: 15 },
    { name: 'Mars', color: 0xff0000, size: 0.5, distance: 20 },
    { name: 'Jupiter', color: 0xffa500, size: 2.5, distance: 28 },
    { name: 'Saturn', color: 0xffd700, size: 2, distance: 35 },
    { name: 'Uranus', color: 0x00ffff, size: 1.5, distance: 40 },
    { name: 'Neptune', color: 0x0000ff, size: 1.5, distance: 45 }
];

function initSolarSystem() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    const light = new THREE.PointLight(0xffffff, 1.5);
    scene.add(light);

    const sun = new THREE.Mesh(
        new THREE.SphereGeometry(5, 32, 32),
        new THREE.MeshBasicMaterial({ color: 0xffff00 })
    );
    scene.add(sun);

    planetData.forEach(data => {
        const planet = new THREE.Mesh(
            new THREE.SphereGeometry(data.size, 32, 32),
            new THREE.MeshPhongMaterial({ color: data.color })
        );
        planet.position.x = data.distance;
        scene.add(planet);
        planets.push({ 
            mesh: planet,
            ...data,
            angle: Math.random() * Math.PI * 2
        });
    });

    camera.position.z = 50;
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    window.addEventListener('click', (event) => {
        mouse.set(
            (event.clientX / window.innerWidth) * 2 - 1,
            -(event.clientY / window.innerHeight) * 2 + 1
        );
        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects(planets.map(p => p.mesh));
        
        if (intersects.length > 0) {
            const planet = planets.find(p => p.mesh === intersects[0].object);
            const chatMessages = document.getElementById('chat-messages');
            chatMessages.innerHTML += `
                <div class="chat-message system-message">
                    🌍 <b>${planet.name}</b><br>
                    Size: ${planet.size}x Earth radius<br>
                    Orbital Distance: ${planet.distance} AU
                </div>`;
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }
    });

    animate();
}

function animate() {
    requestAnimationFrame(animate);
    planets.forEach(planet => {
        planet.angle += 0.005;
        planet.mesh.position.x = Math.cos(planet.angle) * planet.distance;
        planet.mesh.position.z = Math.sin(planet.angle) * planet.distance;
    });
    controls.update();
    renderer.render(scene, camera);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener('resize', onWindowResize, false);
initSolarSystem();