window.onload = function() {
    window.addEventListener('resize', onResize, false);

    var renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setClearColor(0x000000);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    document.body.appendChild(renderer.domElement);

    var scene = new THREE.Scene();

    var camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 80);
    camera.position.set(32, 32, 32);
    camera.lookAt(new THREE.Vector3(0,0,0));

    var planetGeo = new THREE.SphereGeometry(10, 32, 32);
    var planetMat = new THREE.MeshLambertMaterial({color: 0x00bbee});
    var planet = new THREE.Mesh(planetGeo, planetMat);
    planet.castShadow = true;
    planet.receiveShadow = true;

    var moonGeo = new THREE.SphereGeometry(1, 16, 16);
    var moonMat = new THREE.MeshLambertMaterial({color: 0xbbbbbb});
    var moon = new THREE.Mesh(moonGeo, moonMat);
    moon.castShadow = true;
    moon.receiveShadow = true;

    var directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.castShadow = true;
    directionalLight.position.set(0, 0, 32);
    directionalLight.shadowCameraNear = 0;
    directionalLight.shadowCameraFar = 64;
    directionalLight.shadowCameraTop = 32;
    directionalLight.shadowCameraBottom = -32;
    directionalLight.shadowCameraLeft = -32;
    directionalLight.shadowCameraRight = 32;
    directionalLight.shadowMapHeight = 1024;
    directionalLight.shadowMapWidth = 1024;
    directionalLight.target.position.set(0, 0, 0);

    scene.add(planet);
    scene.add(moon);
    scene.add(directionalLight);

    render();
    
    function onResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }

    function render() {
        var time = Date.now();
        moon.position.set(Math.cos(time / 1000) * 30, 0, Math.sin(time / 1000) * 30);
        requestAnimationFrame(render);
        renderer.render(scene, camera);
    }
};
