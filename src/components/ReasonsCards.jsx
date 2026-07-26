import { useState } from 'react';
import { motion } from 'framer-motion';
import { FadeInSection } from './shared/FadeInSection';

function FlipCard({ reason, index }) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className="perspective-1000 w-full aspect-[4/3] cursor-pointer"
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div
        className="relative w-full h-full preserve-3d"
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
      >
        {/* Front */}
        <div className="absolute inset-0 backface-hidden bg-white/40 border border-caramel-400/20 rounded-xl shadow-sm flex items-center justify-center overflow-hidden">
          <img src={reason.image} alt="Reason" className="w-full h-full object-cover" />
        </div>

        {/* Back */}
        <div
          className="absolute inset-0 backface-hidden bg-cream-100 border border-caramel-400/30 rounded-xl shadow-sm flex items-center justify-center p-6 text-center"
          style={{ transform: "rotateY(180deg)" }}
        >
          <p className="text-ink/80 text-sm md:text-base leading-relaxed">
            {reason.text}
          </p>
        </div>
      </motion.div>
    </div>
  );
}

export function ReasonsCards({ reasons }) {
  return (
    <section className="py-20 md:py-32 px-4 max-w-4xl mx-auto">
      <FadeInSection>
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl md:text-4xl text-ink mb-4">
            I Love You 🐈
          </h2>
          <p className="text-ink/60 text-sm">🫳🏻🐈💖</p>
        </div>
      </FadeInSection>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
        {reasons.map((reason, index) => (
          <FadeInSection key={index} delay={index * 0.1}>
            <FlipCard reason={reason} index={index} />
          </FadeInSection>
        ))}
      </div>
    </section>
  );
}
