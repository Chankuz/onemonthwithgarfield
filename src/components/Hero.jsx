import { lazy, Suspense } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';
import { ParallaxLayer } from './shared/ParallaxLayer';

// Lazy load Three.js component to prevent blocking the main render
const HeroParticles = lazy(() => import('./shared/HeroParticles').then(module => ({ default: module.HeroParticles })));

export function Hero({ data }) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Parallax */}
      <div className="absolute inset-0 z-0 h-[120%] -top-[10%]">
        <ParallaxLayer offset={40} className="w-full h-full">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${data.heroImage})` }}
          />
          {/* Dim overlay for better text contrast */}
          <div className="absolute inset-0 bg-cream-50/70" />
        </ParallaxLayer>
      </div>

      {/* 3D Particles Layer */}
      <Suspense fallback={null}>
        <HeroParticles />
      </Suspense>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-2xl mx-auto flex flex-col items-center pointer-events-none">
        {data.names && (
          <motion.p 
            className="font-handwriting text-2xl md:text-3xl text-heart mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {data.names}
          </motion.p>
        )}
        
        <motion.h1 
          className="font-serif text-5xl md:text-7xl text-ink mb-6"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          {data.title}
        </motion.h1>
        
        <motion.p 
          className="text-caramel-500 tracking-widest uppercase text-sm md:text-base font-medium"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          {data.dateText}
        </motion.p>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-caramel-400"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: 1, 
          delay: 1.5,
          repeat: Infinity,
          repeatType: "reverse",
          repeatDelay: 0.2
        }}
      >
        <ChevronDown className="w-6 h-6 opacity-70" />
      </motion.div>
    </section>
  );
}
