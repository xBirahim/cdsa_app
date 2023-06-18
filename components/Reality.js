import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { ARjs } from 'ar.js';
import 'aframe';
import 'aframe-ar';

const ARScene = () => {
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.Camera();

    // Configure AR.js context
    const arToolkitContext = new ARjs.default.ARToolkitContext({
      cameraParametersUrl: 'path/to/camera_parameters.dat',
      detectionMode: 'mono',
    });

    // Initialize AR.js source
    const arToolkitSource = new ARjs.default.Source({});

    // Create AR.js marker controls
    const markerControls = new ARjs.default.MarkerControls(
      arToolkitContext,
      camera,
      {
        type: 'pattern',
        patternUrl: 'path/to/pattern-marker.patt',
      }
    );

    // Add cube to the scene
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshNormalMaterial();
    const cube = new THREE.Mesh(geometry, material);
    cube.position.y = 0.5; // Adjust cube position if needed
    scene.add(cube);

    // Render function
    const render = () => {
      if (arToolkitSource.ready) {
        arToolkitContext.update(arToolkitSource.domElement);
        scene.visible = camera.visible;
      }
      requestAnimationFrame(render);
    };

    // Append renderer to the scene
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    sceneRef.current.appendChild(renderer.domElement);

    // Append AR.js source to the scene
    sceneRef.current.appendChild(arToolkitSource.domElement);

    // Set camera parameters
    cameraRef.current.projectionMatrix.copy(arToolkitContext.getProjectionMatrix());

    // Start rendering
    render();

    return () => {
      // Cleanup function
      sceneRef.current.removeChild(renderer.domElement);
      sceneRef.current.removeChild(arToolkitSource.domElement);
      renderer.dispose();
      arToolkitSource.dispose();
      arToolkitContext.dispose();
    };
  }, []);

  return <div ref={sceneRef} />;
};

export default ARScene;
