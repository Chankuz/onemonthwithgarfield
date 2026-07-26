import { useState } from 'react';
import { Play, Pause } from 'lucide-react';
import { motion } from 'framer-motion';

export function MusicPlayer({ url }) {
  const [isPlaying, setIsPlaying] = useState(false);

  // Extract YouTube Video ID
  const getVideoId = (url) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };
  
  const videoId = getVideoId(url);

  return (
    <>
      {/* 
        Using a raw iframe instead of react-player.
        When isPlaying becomes true, the iframe mounts with autoplay=1.
        Since it mounts right after a user click, browsers usually allow it.
      */}
      {isPlaying && videoId && (
        <div className="fixed top-[-2000px] left-[-2000px] w-[300px] h-[300px] opacity-0 pointer-events-none">
          <iframe 
            width="100%" 
            height="100%" 
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1`} 
            title="YouTube video player" 
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen
          ></iframe>
        </div>
      )}

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