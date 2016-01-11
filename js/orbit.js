window.onload = function() {
    window.addEventListener('resize', onResize, false);

    var renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setClearColor(0x000000);
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(65, window.innerWidth / window.innerHeight, 0.1, 100);
    
    var sphereGeo = new THREE.SphereGeometry(1, 32, 32);
    var sphereMat = new THREE.MeshLambertMaterial({color: 0xff4444});
    var sphere = new THREE.Mesh(sphereGeo, sphereMat);

    var pointLight = new THREE.PointLight(0xffffff, 1, 100);

    scene.add(sphere);
    scene.add(pointLight);

    camera.position.x = 16;
    camera.position.y = 16;
    camera.position.z = 16;
    camera.lookAt(new THREE.Vector3(0,0,0));

    render();
    
    function onResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }

    function render() {
        var time = new Date().getTime();
        sphere.position.set(Math.cos(time / 1000) * 10, 0, Math.sin(time / 1000) * 10);
        requestAnimationFrame(render);
        renderer.render(scene, camera);
    }
};
