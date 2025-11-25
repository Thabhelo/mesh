import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

interface OrbProps {
  hoverIntensity?: number;
  rotateOnHover?: boolean;
  hue?: number;
  forceHoverState?: boolean;
}

export default function Orb({
  hoverIntensity = 2,
  rotateOnHover = true,
  hue = 25, // Updated to match primary orange hue
  forceHoverState = false,
}: OrbProps) {
  const [isHovering, setIsHovering] = useState(forceHoverState);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      container.addEventListener('mouseenter', () => setIsHovering(true));
      container.addEventListener('mouseleave', () => setIsHovering(false));
    }

    return () => {
      if (container) {
        container.removeEventListener('mousemove', handleMouseMove);
        container.removeEventListener('mouseenter', () => setIsHovering(true));
        container.removeEventListener('mouseleave', () => setIsHovering(false));
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden orb-container"
    >
      <motion.div
        className="absolute w-96 h-96 rounded-full blur-3xl opacity-40"
        style={{
          background: `conic-gradient(from ${hue}deg, hsl(25 95% 53%), hsl(39 100% 57%), hsl(25 95% 53%))`,
        }}
        animate={{
          scale: isHovering ? 1 + hoverIntensity * 0.1 : 1,
          x: isHovering ? (mousePosition.x / 40) * hoverIntensity : 0,
          y: isHovering ? (mousePosition.y / 40) * hoverIntensity : 0,
          rotate: rotateOnHover ? (isHovering ? 360 : 0) : 0,
        }}
        transition={{
          scale: { type: 'spring', stiffness: 200, damping: 30 },
          x: { type: 'spring', stiffness: 100, damping: 30 },
          y: { type: 'spring', stiffness: 100, damping: 30 },
          rotate: { duration: 8, repeat: isHovering ? Infinity : 0, ease: 'linear' },
        }}
        initial={{ x: '50%', y: '50%' }}
      />
      <motion.div
        className="absolute w-72 h-72 rounded-full blur-2xl opacity-30"
        style={{
          background: `conic-gradient(from ${hue + 120}deg, hsl(39 100% 57%), hsl(25 95% 53%), hsl(39 100% 57%))`,
        }}
        animate={{
          scale: isHovering ? 1 + (hoverIntensity * 0.08) : 0.8,
          x: isHovering ? (mousePosition.x / 50) * (hoverIntensity * 0.8) : 0,
          y: isHovering ? (mousePosition.y / 50) * (hoverIntensity * 0.8) : 0,
        }}
        transition={{
          scale: { type: 'spring', stiffness: 200, damping: 30 },
          x: { type: 'spring', stiffness: 100, damping: 30 },
          y: { type: 'spring', stiffness: 100, damping: 30 },
        }}
        initial={{ x: '30%', y: '30%' }}
      />
    </div>
  );
}
