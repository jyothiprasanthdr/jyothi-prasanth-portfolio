import { useState } from 'react';
import { useReducedMotion } from './useReducedMotion';

function hasWebGL() {
  try {
    const canvas = document.createElement('canvas');
    return !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
  } catch {
    return false;
  }
}

/** Gate for the hero's Three.js layer: desktop-width, WebGL-capable, motion allowed. */
export function useCanRender3D() {
  const reducedMotion = useReducedMotion();
  const [capable] = useState(() => window.innerWidth >= 768 && hasWebGL());

  return capable && !reducedMotion;
}
