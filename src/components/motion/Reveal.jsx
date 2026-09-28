import React, { useRef, useEffect, forwardRef } from 'react';
import { gsap } from '../../lib/gsap';
import { useReducedMotion } from '../../hooks/useReducedMotion';

/**
 * uupm "Scroll Reveal / Subtle" preset: fade + small y-offset, one-shot,
 * no re-trigger on scroll-direction change (toggleActions play none none reverse).
 * Accepts a forwarded ref (merged with its own) for callers that also need
 * direct DOM access, e.g. the card-tilt hook.
 */
const Reveal = forwardRef(function Reveal({ as: Tag = 'div', delay = 0, y = 12, children, ...rest }, forwardedRef) {
  const ref = useRef(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || reducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.from(el, {
        opacity: 0,
        y,
        duration: 0.35,
        delay,
        ease: 'power1.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 90%',
          toggleActions: 'play none none reverse',
        },
      });
    });

    return () => ctx.revert();
  }, [reducedMotion, y, delay]);

  const setRefs = (node) => {
    ref.current = node;
    if (typeof forwardedRef === 'function') forwardedRef(node);
    else if (forwardedRef) forwardedRef.current = node;
  };

  return (
    <Tag ref={setRefs} {...rest}>
      {children}
    </Tag>
  );
});

export default Reveal;
