import { FloatingHearts } from './shared/FloatingHearts';

export function Footer({ footer }) {
  return (
    <footer className="relative py-24 px-4 text-center overflow-hidden bg-cream-100">
      <FloatingHearts />
      
      <div className="relative z-10">
        <p className="font-serif text-2xl md:text-3xl text-ink mb-4">
          {footer.message}
        </p>
        <p className="text-sm text-ink/50">
          {footer.credit}
        </p>
      </div>
    </footer>
  );
}
