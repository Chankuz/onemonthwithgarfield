import { content } from "./data/content";
import { Hero } from "./components/Hero";
import { PhotoBooth } from "./components/PhotoBooth";
import { ReasonsCards } from "./components/ReasonsCards";
import { LoveLetter } from "./components/LoveLetter";
import { Footer } from "./components/Footer";
import { HeartDivider } from "./components/shared/HeartDivider";
import { MusicPlayer } from "./components/shared/MusicPlayer";
import { Heart } from "./components/shared/Heart";

function App() {
  return (
    <main className="relative min-h-screen bg-cream-50 font-sans text-ink">
      <Heart count={10} />

      <MusicPlayer url={content.musicUrl} />

      <Hero data={content.hero} />

      {/* เปลี่ยนตรงนี้จาก bg-cream-50 (ทึบ) เป็น bg-cream-50/95 (โปร่งแสงนิดหน่อย) */}
      <div className="relative z-10 bg-cream-50/95">
        <PhotoBooth data={content.photoBooth} />
        <HeartDivider />
        <ReasonsCards reasons={content.reasons} />
        <HeartDivider />
        <LoveLetter letter={content.letter} />
        <Footer footer={content.footer} />
      </div>
    </main>
  );
}

export default App;
