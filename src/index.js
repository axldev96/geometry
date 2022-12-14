import './style.css';
import * as THREE from 'three';

function main() {
  const canvas = document.querySelector('#c');
  const scene = new THREE.Scene();
  const renderer = new THREE.WebGLRenderer({ canvas });

  const fov = 124; // field of view
  const aspect = 2;
  const near = 0.1;
  const far = 5;

  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.z = 2;

  const color = 0xffffff;
  const intensity = 1;
  const light = new THREE.DirectionalLight(color, intensity);
  light.position.set(-1, 2, 4);
  scene.add(light);

  function makeInstance(geometry, color, x) {
    const material = new THREE.MeshPhongMaterial({
      color,
    });

    const figure = new THREE.Mesh(geometry, material);
    scene.add(figure);
    figure.position.x = x;

    return figure;
  }

  const radius = 1; // ui: radius
  const geometry = new THREE.DodecahedronGeometry(radius);

  const figures = [
    makeInstance(geometry, 0x44aa88, 0),
    makeInstance(geometry, 0x8844aa, -2),
    makeInstance(geometry, 0xaa8844, 2),
  ];

  function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;

    if (needResize) {
      renderer.setSize(width, height, false);
    }

    return needResize;
  }

  function render(time) {
    time *= 0.001;

    if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    }

    figures.forEach((figure, ndx) => {
      const speed = 1 + ndx * 0.1;
      const rot = time * speed;

      figure.rotation.x = rot;
      figure.rotation.y = rot;
    });

    renderer.render(scene, camera);

    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
}
// main();
