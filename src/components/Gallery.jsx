import { FadeInSection } from './shared/FadeInSection';
import { ParallaxLayer } from './shared/ParallaxLayer';

export function Gallery({ images }) {
  return (
    <section className="py-20 md:py-32 px-4 max-w-5xl mx-auto overflow-hidden">
      <FadeInSection>
        <h2 className="font-serif text-3xl md:text-4xl text-ink mb-12 text-center">
          Our Memories
        </h2>
      </FadeInSection>

      {/* Mobile: Horizontal scroll snap. Desktop: CSS Columns / Grid */}
      <div className="flex md:grid overflow-x-auto snap-x snap-mandatory md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 pb-8 md:pb-0 scrollbar-hide">
        {images.map((img, idx) => (
          <FadeInSection 
            key={idx} 
            delay={idx * 0.1}
            className="flex-shrink-0 w-[80vw] md:w-auto snap-center snap-always first:ml-4 md:first:ml-0"
          >
            <div className="relative aspect-[3/4] rounded-lg overflow-hidden group">
              {/* Add a subtle parallax effect to images on desktop */}
              <ParallaxLayer offset={15} className="w-full h-[120%] -top-[10%] absolute">
                <img 
                  src={img.src} 
                  alt={img.alt} 
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </ParallaxLayer>
              <div className="absolute inset-0 bg-ink/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
          </FadeInSection>
        ))}
        {/* Spacer for horizontal scroll at the end on mobile */}
        <div className="flex-shrink-0 w-4 md:hidden"></div>
      </div>
    </section>
  );
}
