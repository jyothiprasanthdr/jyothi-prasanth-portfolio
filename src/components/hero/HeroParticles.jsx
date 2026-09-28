import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const PARTICLE_COUNT = 3000; // uupm threejs guidance: 3000 is the verified safe mobile baseline
const ACCENT_COLOR = 0x22c55e; // single locked site accent (see index.css --color-accent)

/**
 * Ambient particle field for the hero, built per uupm's threejs stack rules:
 * BufferGeometry + Points (never individual Mesh particles), no shadow casting,
 * mouse-parallax drift only (no physics). Paused when off-screen or tab hidden.
 */
export default function HeroParticles({ className }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const width = mount.clientWidth;
    const height = mount.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100);
    camera.position.z = 10;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    mount.appendChild(renderer.domElement);

    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    for (let i = 0; i < PARTICLE_COUNT * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 18;
      positions[i + 1] = (Math.random() - 0.5) * 18;
      positions[i + 2] = (Math.random() - 0.5) * 12;
    }
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
      color: ACCENT_COLOR,
      size: 0.045,
      transparent: true,
      opacity: 0.75,
      sizeAttenuation: true,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    let frameId = null;
    let isPaused = false;
    let autoRotation = 0;
    const pointer = { x: 0, y: 0 };
    const parallax = { x: 0, y: 0 };

    const onPointerMove = (e) => {
      pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.y = (e.clientY / window.innerHeight) * 2 - 1;
    };

    const animate = () => {
      if (isPaused) return;
      autoRotation += 0.0006;
      parallax.x += (pointer.y * 0.15 - parallax.x) * 0.05;
      parallax.y += (pointer.x * 0.15 - parallax.y) * 0.05;
      points.rotation.x = parallax.x;
      points.rotation.y = autoRotation + parallax.y;
      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    const handleVisibility = () => {
      if (document.hidden) {
        isPaused = true;
        if (frameId) cancelAnimationFrame(frameId);
      } else {
        isPaused = false;
        animate();
      }
    };

    // Only render while the hero is actually in view.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          isPaused = false;
          animate();
        } else {
          isPaused = true;
          if (frameId) cancelAnimationFrame(frameId);
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(mount);

    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('resize', handleResize);
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      if (frameId) cancelAnimationFrame(frameId);
      observer.disconnect();
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibility);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} className={className} aria-hidden="true" />;
}
