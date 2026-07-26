import { useRef, useState } from "react";
import { toPng } from "html-to-image";
import { Download } from "lucide-react";
import { motion } from "framer-motion";
import { FadeInSection } from "./shared/FadeInSection";

export function PhotoBooth({ data }) {
  const stripRef = useRef(null);
  const [isDownloading, setIsDownloading] = useState(false);

  const downloadImage = async () => {
    if (stripRef.current === null) return;
    try {
      setIsDownloading(true);
      const dataUrl = await toPng(stripRef.current, {
        quality: 1,
        pixelRatio: 2, // High quality download
        style: {
          transform: "none", // Reset rotation for download
          boxShadow: "none",
        },
      });
      const link = document.createElement("a");
      link.download = "our-photobooth.png";
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Failed to download image", err);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <section className="py-20 md:py-32 px-4 relative overflow-hidden flex flex-col items-center justify-center">
      <FadeInSection>
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl md:text-4xl text-ink mb-4">
            Photo Booth
          </h2>
          <p className="text-ink/60 text-sm">
            เค้าอยากไปถ่าย photo booth กับกาฟิวววว🐈 (โหลดได้น้าา)
          </p>
        </div>
      </FadeInSection>

      <FadeInSection
        delay={0.2}
        className="relative z-10 w-full flex justify-center"
      >
        {/* The Card */}
        <motion.div
          ref={stripRef}
          className="bg-cream-50 w-[260px] p-4 flex flex-col gap-3 shadow-lg border border-cream-200/50 will-change-transform"
          initial={{ rotate: -2, y: 50, opacity: 0 }}
          whileInView={{ rotate: -2, y: 0, opacity: 1 }}
          whileHover={{
            rotate: 0,
            scale: 1.05,
            boxShadow:
              "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
            y: -10,
          }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.5 }}
          style={{ transformOrigin: "center" }}
        >
          {/* Timestamp on top */}
          <div className="flex justify-between items-center text-[10px] text-ink/40 font-mono mb-1">
            <span>{data.date}</span>
            <span>20:26</span>
          </div>

          {/* Photos */}
          {data.images.map((src, index) => (
            <div
              key={index}
              className="relative aspect-[4/3] w-full overflow-hidden bg-cream-200"
            >
              <img
                src={src}
                alt={`Photobooth ${index + 1}`}
                className="w-full h-full object-cover grayscale-[20%] sepia-[10%] contrast-110"
              />
            </div>
          ))}

          {/* Bottom Caption Area */}
          <div className="mt-4 mb-2 flex justify-center items-center h-12">
            <span className="font-handwriting text-2xl text-ink/90 -rotate-2">
              {data.caption}
            </span>
          </div>
        </motion.div>
      </FadeInSection>

      {/* Download Button */}
      <FadeInSection delay={0.4} className="mt-16">
        <button
          onClick={downloadImage}
          disabled={isDownloading}
          className="flex items-center gap-2 px-6 py-3 bg-white/50 backdrop-blur-sm border border-caramel-400/30 text-ink rounded-full shadow-sm hover:bg-cream-100 transition-colors disabled:opacity-50"
        >
          <Download className="w-4 h-4 text-caramel-500" />
          <span className="text-sm font-medium">
            {isDownloading ? "Downloading..." : "Save this strip"}
          </span>
        </button>
      </FadeInSection>
    </section>
  );
}
