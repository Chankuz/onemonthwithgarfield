import { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";

// สุ่มตำแหน่งเริ่มต้นของหัวใจแต่ละดวง โดยเลี่ยงโซนกลางจอ (20%-80%)
// เพื่อไม่ให้บังเนื้อหาหลัก — หัวใจจะลอยขึ้นจากขอบซ้าย/ขวาเป็นหลัก
function generateHearts(count) {
  return Array.from({ length: count }).map((_, i) => {
    // สุ่มว่าจะอยู่ฝั่งซ้าย (0-18%) หรือฝั่งขวา (82-100%)
    const isLeft = Math.random() > 0.5;
    const left = isLeft ? Math.random() * 18 : 82 + Math.random() * 18;

    return {
      id: i,
      left,
      top: Math.random() * 100, // ตำแหน่งแนวตั้งเริ่มต้น (ใช้ตอน static ด้วย)
      size: 10 + Math.random() * 14, // 10-24px เล็กพอไม่รก
      duration: 14 + Math.random() * 10, // 14-24s ลอยช้าๆ
      delay: Math.random() * 20, // กระจาย delay ไม่ให้โผล่พร้อมกัน
      opacity: 0.15 + Math.random() * 0.25, // จางๆ ไม่แย่ง focus
      sway: 12 + Math.random() * 16, // แกว่งซ้ายขวาเล็กน้อย
    };
  });
}

export function Heart({ count = 10 }) {
  const shouldReduceMotion = useReducedMotion();
  const hearts = useMemo(() => generateHearts(count), [count]);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-30 overflow-hidden"
      aria-hidden="true"
    >
      {hearts.map((h) =>
        shouldReduceMotion ? (
          // Reduced motion: วางนิ่งๆ ไม่มี animation แต่ยังเห็นเป็น decorative element
          <span
            key={h.id}
            className="absolute"
            style={{
              left: `${h.left}%`,
              top: `${h.top}%`,
              fontSize: `${h.size}px`,
              opacity: h.opacity,
              color: "var(--heart-color, #E27D8F)",
            }}
          >
            ❤
          </span>
        ) : (
          <motion.span
            key={h.id}
            className="absolute bottom-[-40px] will-change-transform"
            style={{
              left: `${h.left}%`,
              fontSize: `${h.size}px`,
              opacity: h.opacity,
              color: "var(--heart-color, #E27D8F)",
            }}
            initial={{ y: 0, x: 0 }}
            animate={{
              y: ["0vh", "-110vh"],
              x: [0, h.sway, -h.sway, 0],
            }}
            transition={{
              y: {
                duration: h.duration,
                delay: h.delay,
                repeat: Infinity,
                ease: "linear",
              },
              x: {
                duration: h.duration / 2,
                delay: h.delay,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }}
          >
            ❤
          </motion.span>
        ),
      )}
    </div>
  );
}
