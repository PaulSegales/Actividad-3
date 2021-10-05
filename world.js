    import * as THREE from '/threejs/three.module.js';
        import { OrbitControls } from './threejs/OrbitControls.js';
    // import * as THREE from './three.module.js';
    //     import { OrbitControls } from './OrbitControls.js';


        let scene, camera, renderer, orbit, starGeo, stars;

        scene = new THREE.Scene();
        let img = new THREE.TextureLoader();
        img.load("./img/bg4.jpg", function (texture) {
            scene.background = texture;
        });

        camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.0001, 3000);
        camera.position.z = 4;

        // renderer = new THREE.WebGLRenderer();
        // renderer.setSize(window.innerWidth, window.innerHeight);
        // document.body.appendChild(renderer.domElement);


        let container = document.getElementById('canvas');
        document.body.appendChild(container);
        renderer = new THREE.WebGLRenderer();
        // renderer.setSize(200, 200);
        renderer.setSize(window.innerWidth, window.innerHeight);
        container.appendChild(renderer.domElement);


        starGeo = new THREE.Geometry();
        for (let i = 0; i < 6000; i++) {
            let star = new THREE.Vector3(
                Math.random() * 600 - 300,
                Math.random() * 600 - 300,
                Math.random() * 600 - 300
            );
            star.velocity = 0;
            star.acceleration = 0.02;
            starGeo.vertices.push(star);
        }

        let sprite = new THREE.TextureLoader().load('./img/stars.png');
        let starMaterial = new THREE.PointsMaterial({
            color: 0xaaaaaa,
            size: 0.7,
            map: sprite
        });

        stars = new THREE.Points(starGeo, starMaterial);
        scene.add(stars);


        const geometry = new THREE.SphereGeometry(2.7, 50, 50);
        const material = new THREE.MeshBasicMaterial()

        const esfera = new THREE.Mesh(geometry, material);
        scene.add(esfera);


        orbit = new OrbitControls(camera, renderer.domElement)

        const loader = new THREE.TextureLoader()
        loader.load('./img/w.jpg', (texture) => {
            material.map = texture
            animate()
        })

        window.addEventListener('resize', redimensionar);

        function redimensionar() {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.render(scene, camera)
        }


        function animate() {
            starGeo.vertices.forEach(p => {
                p.velocity += p.acceleration
                p.z -= p.velocity;

                if (p.z < -200) {
                    p.z = 200;
                    p.velocity = 0;
                }
            });
            starGeo.verticesNeedUpdate = true;
            stars.rotation.z += 0.002;
            requestAnimationFrame(animate)
            esfera.rotation.y += 0.002
            renderer.render(scene, camera)
        }