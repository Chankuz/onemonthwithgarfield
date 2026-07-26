import { FadeInSection } from './shared/FadeInSection';
import { Heart } from 'lucide-react';

export function Timeline({ events }) {
  return (
    <section className="py-20 md:py-32 px-4 max-w-3xl mx-auto">
      <FadeInSection>
        <h2 className="font-serif text-3xl md:text-4xl text-ink mb-16 text-center">
          Our Journey
        </h2>
      </FadeInSection>

      <div className="relative">
        {/* Vertical Line */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-caramel-400/30 -translate-x-1/2"></div>

        <div className="space-y-12">
          {events.map((event, index) => {
            const isEven = index % 2 === 0;
            return (
              <FadeInSection 
                key={index} 
                delay={0.1}
                className={`relative flex flex-col md:flex-row items-start md:items-center ${
                  isEven ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Center dot/heart */}
                <div className="absolute left-4 md:left-1/2 w-8 h-8 -translate-x-1/2 bg-cream-50 flex items-center justify-center z-10">
                  <Heart className="w-4 h-4 text-heart fill-heart/20" />
                </div>

                {/* Content Box */}
                <div className="ml-12 md:ml-0 md:w-1/2 p-4 md:px-8">
                  <div className={`flex flex-col ${isEven ? 'md:items-start' : 'md:items-end'} text-left ${isEven ? 'md:text-left' : 'md:text-right'}`}>
                    <span className="text-sm font-handwriting text-caramel-500 mb-2">{event.date}</span>
                    <h3 className="font-serif text-xl text-ink mb-2">{event.title}</h3>
                    <p className="text-ink/80 text-sm leading-relaxed">{event.description}</p>
                  </div>
                </div>
              </FadeInSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}
