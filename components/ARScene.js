import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'; // Import des contrôles d'orbite

const ARScene = () => {
  const sceneRef = useRef();
  const videoRef = useRef();
  const rendererRef = useRef();
  const cameraRef = useRef();
  const cubeRef = useRef();
  const controlsRef = useRef(); // Référence pour les contrôles d'orbite
  const touchStartPosRef = useRef({ x: 0, y: 0 });
  const isTouchingRef = useRef(false);
  const [isARActive, setIsARActive] = useState(false);

  useEffect(() => {
    const initAR = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      videoRef.current.srcObject = stream;

      cameraRef.current = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 20);
      cameraRef.current.position.set(0, 0, 2); // Déplacez la caméra vers l'arrière pour observer l'objet

      const scene = new THREE.Scene();
      scene.background = new THREE.VideoTexture(videoRef.current);

      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      rendererRef.current = renderer;

      const cubeGeometry = new THREE.BoxGeometry(0.1, 0.1, 0.1);
      const cubeMaterial = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
      const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
      cube.position.set(0, 0, -0.5);
      scene.add(cube);
      cubeRef.current = cube;

      sceneRef.current.appendChild(renderer.domElement);

      // Initialisation des contrôles d'orbite
      controlsRef.current = new OrbitControls(cameraRef.current, rendererRef.current.domElement);
      controlsRef.current.enableDamping = true; // Ajout d'un effet de freinage pour les mouvements fluides
      controlsRef.current.target.set(0, 0, 0); // Définir le point de focalisation des contrôles

      const animate = () => {
        if (cameraRef.current) {
          if (isTouchingRef.current) {
            const touchEndPos = { x: controlsRef.current.target.x, y: controlsRef.current.target.y };

            const deltaX = (touchEndPos.x - touchStartPosRef.current.x) * 0.01;
            const deltaY = (touchEndPos.y - touchStartPosRef.current.y) * 0.01;

            cube.position.x += deltaX;
            cube.position.y += deltaY;

            touchStartPosRef.current = { ...touchEndPos };
          }

          cube.rotation.x += 0.01;
          cube.rotation.y += 0.01;

          controlsRef.current.update();

          renderer.render(scene, cameraRef.current);
          requestAnimationFrame(animate);
        }
      };

      animate();
    };

    if (isARActive) {
      initAR();
    }

    return () => {
      if (cameraRef.current) {
        cameraRef.current = null;
      }
    };
  }, [isARActive]);

  const toggleAR = async () => {
    if (!isARActive) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
        videoRef.current.srcObject = stream;
        setIsARActive(true);
      } catch (error) {
        console.error('Error accessing camera:', error);
      }
    } else {
      setIsARActive(false);
    }
  };

  const handleTouchStart = (event) => {
    const touch = event.touches[0];
    touchStartPosRef.current = { x: touch.clientX, y: touch.clientY };
    isTouchingRef.current = true;
  };

  const handleTouchMove = (event) => {
    event.preventDefault();
    const touch = event.touches[0];
    controlsRef.current.target.x = touchStartPosRef.current.x - (touch.clientX - touchStartPosRef.current.x);
    controlsRef.current.target.y = touchStartPosRef.current.y + (touch.clientY - touchStartPosRef.current.y);
  };

  const handleTouchEnd = () => {
    isTouchingRef.current = false;
  };

  return (
    <div>
      <div
        ref={sceneRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      />
      <video ref={videoRef} autoPlay playsInline style={{ display: isARActive ? 'block' : 'none' }} />
      <div style={{ position: 'absolute', bottom: '20px', width: '100%', textAlign: 'center' }}>
        <button onClick={toggleAR}>{isARActive ? 'Désactiver AR' : 'Activer AR'}</button>
      </div>
    </div>
  );
};

export default ARScene;
