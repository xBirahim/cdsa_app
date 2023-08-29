import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Modal, Button } from "@nextui-org/react";

const ARScene = () => {
  const videoRef = useRef();
  const cameraRef = useRef();
  const controlsRef = useRef();
  const sceneRef = useRef();
  const cubeRef = useRef();
  const [isARActive, setIsARActive] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const initAR = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });

      const videoTrackSettings = stream.getVideoTracks()[0].getSettings();
      const videoWidth = videoTrackSettings.width;
      const videoHeight = videoTrackSettings.height;
      const videoAspect = videoWidth / videoHeight;

      cameraRef.current = new THREE.PerspectiveCamera(70, videoAspect, 0.01, 10);
      cameraRef.current.position.set(0, 0, 2);

      const scene = new THREE.Scene();
      scene.background = new THREE.VideoTexture(videoRef.current);

      const renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(videoWidth, videoHeight);
      sceneRef.current.appendChild(renderer.domElement);

      const cubeGeometry = new THREE.BoxGeometry(0.1, 0.1, 0.1);
      const cubeMaterial = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
      const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
      cube.position.set(0, 0, -0.5);
      scene.add(cube);
      cubeRef.current = cube;

      controlsRef.current = new OrbitControls(cameraRef.current, renderer.domElement);
      controlsRef.current.enableDamping = true;
      controlsRef.current.target.set(0, 0, 0);

      const animate = () => {
        if (cameraRef.current) {
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
  }, [isARActive]);

  const toggleAR = async () => {
    if (!isARActive) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
        videoRef.current.srcObject = stream;
        videoRef.current.play();
        setIsARActive(true);
      } catch (error) {
        console.error('Erreur d\'accès à la caméra :', error);
      }
    } else {
      videoRef.current.pause();
      setIsARActive(false);

      // Clear the scene and dispose of resources
      if (controlsRef.current) {
        controlsRef.current.dispose();
      }
      if (cubeRef.current) {
        cubeRef.current.geometry.dispose();
        cubeRef.current.material.dispose();
      }
      if (sceneRef.current) {
        while (sceneRef.current.children.length > 0) {
          sceneRef.current.remove(sceneRef.current.children[0]);
        }
      }
    }
  };

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setIsARActive(false);
  };

  return (
    <div>
      <Button auto flat color="secondary" onClick={openModal}>
        Ouvrir le modal
      </Button>
      <Modal noPadding open={modalVisible} onClose={closeModal}>
        <Modal.Body>
          <div style={{ width: '100%', height: '100vh', position: 'relative' }}>
            {modalVisible && (
              <div>
                <video ref={videoRef} style={{ display: 'block', width: '100%', height: '100%' }} autoPlay playsInline />
                <Button onClick={toggleAR} style={{ position: 'absolute', top: '10px', left: '10px' }}>
                  {isARActive ? "Arrêter l'AR" : "Démarrer l'AR"}
                </Button>
                <div ref={sceneRef} style={{ width: '100%', height: '100%' }} />
              </div>
            )}
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ARScene;
