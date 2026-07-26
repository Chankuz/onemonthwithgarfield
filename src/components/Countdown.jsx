import { useCountdown } from '../hooks/useCountdown';
import { FadeInSection } from './shared/FadeInSection';

export function Countdown({ startDate }) {
  const timeLeft = useCountdown(startDate);

  const timeBlocks = [
    { label: 'วัน', value: timeLeft.days },
    { label: 'ชั่วโมง', value: timeLeft.hours },
    { label: 'นาที', value: timeLeft.minutes },
    { label: 'วินาที', value: timeLeft.seconds },
  ];

  return (
    <section className="py-20 md:py-32 px-4 max-w-3xl mx-auto text-center">
      <FadeInSection>
        <h2 className="font-serif text-3xl md:text-4xl text-ink mb-12">
          เวลาที่เรามีกันและกัน
        </h2>
        
        <div className="grid grid-cols-4 gap-2 md:gap-8">
          {timeBlocks.map((block, index) => (
            <div 
              key={block.label} 
              className="flex flex-col items-center justify-center p-4 bg-white/50 backdrop-blur-sm rounded-2xl shadow-sm border border-cream-200"
            >
              <span className="font-serif text-3xl md:text-5xl text-caramel-500 mb-2">
                {String(block.value).padStart(2, '0')}
              </span>
              <span className="text-xs md:text-sm text-ink/70">
                {block.label}
              </span>
            </div>
          ))}
        </div>
      </FadeInSection>
    </section>
  );
}
