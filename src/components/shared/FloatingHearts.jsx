import { motion, useReducedMotion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { useEffect, useState } from 'react';

export function FloatingHearts() {
  const shouldReduceMotion = useReducedMotion();
  const [hearts, setHearts] = useState([]);

  useEffect(() => {
    // Generate random properties for 6 hearts
    const newHearts = Array.from({ length: 6 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 80 + 10}%`,
      size: Math.random() * 12 + 12,
      duration: Math.random() * 3 + 4,
      delay: Math.random() * 3,
      opacity: Math.random() * 0.3 + 0.1
    }));
    setHearts(newHearts);
  }, []);

  if (shouldReduceMotion) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="absolute bottom-0 text-heart"
          initial={{ y: 20, opacity: 0, x: '-50%' }}
          animate={{ 
            y: -200, 
            opacity: [0, heart.opacity, 0],
            x: ['-50%', '-20%', '-80%', '-50%'] 
          }}
          transition={{
            duration: heart.duration,
            repeat: Infinity,
            delay: heart.delay,
            ease: "easeInOut"
          }}
          style={{ left: heart.left }}
        >
          <Heart size={heart.size} className="fill-heart" />
        </motion.div>
      ))}
    </div>
  );
}
