import { Heart } from 'lucide-react';

export function HeartDivider({ className = '' }) {
  return (
    <div className={`flex items-center justify-center gap-4 py-8 opacity-40 ${className}`}>
      <div className="h-[1px] w-12 bg-caramel-400"></div>
      <Heart className="w-4 h-4 text-heart fill-transparent stroke-caramel-400 stroke-1" />
      <div className="h-[1px] w-12 bg-caramel-400"></div>
    </div>
  );
}
