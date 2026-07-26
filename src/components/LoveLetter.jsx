import { FadeInSection } from './shared/FadeInSection';

export function LoveLetter({ letter }) {
  return (
    <section className="py-20 md:py-32 px-4 max-w-2xl mx-auto">
      <FadeInSection className="bg-cream-100 p-8 md:p-12 rounded-2xl shadow-sm border border-cream-200 relative">
        {/* Subtle decorative corners */}
        <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-caramel-400/30"></div>
        <div className="absolute top-4 right-4 w-4 h-4 border-t border-r border-caramel-400/30"></div>
        <div className="absolute bottom-4 left-4 w-4 h-4 border-b border-l border-caramel-400/30"></div>
        <div className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-caramel-400/30"></div>

        <div className="space-y-6 text-ink/80 leading-loose">
          <FadeInSection delay={0.2}>
            <p className="font-handwriting text-xl text-caramel-500 mb-8">{letter.greeting}</p>
          </FadeInSection>

          {letter.paragraphs.map((paragraph, index) => (
            <FadeInSection key={index} delay={0.3 + (index * 0.1)}>
              <p>{paragraph}</p>
            </FadeInSection>
          ))}

          <FadeInSection delay={0.6} className="pt-8 flex flex-col items-end">
            <p className="font-handwriting text-2xl text-caramel-500 mb-2">{letter.closing}</p>
            <p className="font-handwriting text-3xl text-ink">{letter.sign}</p>
            <p className="text-xs text-ink/40 font-mono mt-4">{letter.date}</p>
          </FadeInSection>
        </div>
      </FadeInSection>
    </section>
  );
}
