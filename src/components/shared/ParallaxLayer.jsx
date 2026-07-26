import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { useRef } from 'react';

export function ParallaxLayer({ children, className = '', offset = 50 }) {
  const ref = useRef(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [-offset, offset]);

  return (
    <motion.div 
      ref={ref} 
      className={className} 
      style={{ y: shouldReduceMotion ? 0 : y }}
    >
      {children}
    </motion.div>
  );
}
