import { useRef, useEffect } from 'react';
import { gsap } from '../lib/gsap';
import { useReducedMotion } from './useReducedMotion';

const MAX_TILT_DEG = 6;

/**
 * Cursor-follow tilt for cards, layered on top of existing hover transforms.
 * No-op on touch devices and under prefers-reduced-motion.
 */
export function useTilt() {
  const ref = useRef(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    const isTouch = window.matchMedia('(hover: none), (pointer: coarse)').matches;
    if (!el || reducedMotion || isTouch) return;

    el.style.transformStyle = 'preserve-3d';
    el.style.willChange = 'transform';

    const setRotateX = gsap.quickTo(el, 'rotateX', { duration: 0.4, ease: 'power2.out' });
    const setRotateY = gsap.quickTo(el, 'rotateY', { duration: 0.4, ease: 'power2.out' });

    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      setRotateY(px * MAX_TILT_DEG * 2);
      setRotateX(-py * MAX_TILT_DEG * 2);
    };

    const onLeave = () => {
      setRotateX(0);
      setRotateY(0);
    };

    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerleave', onLeave);

    return () => {
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerleave', onLeave);
      gsap.set(el, { clearProps: 'transform,rotateX,rotateY,willChange' });
    };
  }, [reducedMotion]);

  return ref;
}
