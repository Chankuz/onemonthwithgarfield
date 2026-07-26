import { useState } from 'react';
import { Play, Pause } from 'lucide-react';
import { motion } from 'framer-motion';
import ReactPlayer from 'react-player';

export function MusicPlayer({ url }) {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <>
      {/*
        ReactPlayer stays mounted at all times (just hidden off-screen) so that
        toggling `playing` inside the button's click handler counts as a direct
        user-gesture play call. Mounting a fresh iframe with autoplay=1 *after*
        the click (the old approach) loses that gesture context and gets
        blocked by mobile Safari/Chrome autoplay policies.
      */}
      <div className="fixed top-[-2000px] left-[-2000px] w-[300px] h-[300px] opacity-0 pointer-events-none">
        <ReactPlayer
          src={url}
          playing={isPlaying}
          volume={1}
          muted={false}
          width="100%"
          height="100%"
          playsInline
        />
      </div>

      <motion.button
        onClick={() => setIsPlaying(!isPlaying)}
        className="fixed bottom-6 right-6 z-[999] flex items-center justify-center w-12 h-12 bg-cream-100 border border-caramel-400/30 text-caramel-500 rounded-full shadow-lg hover:bg-cream-200 transition-colors"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        {isPlaying ? (
          <Pause className="w-5 h-5 fill-caramel-500" />
        ) : (
          <Play className="w-5 h-5 fill-caramel-500 ml-1" />
        )}
      </motion.button>
    </>
  );
}