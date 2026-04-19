import { useEffect, useRef } from "react";
import gsap from "gsap";

interface FloatingParticlesProps {
  count?: number;
  className?: string;
}

const FloatingParticles = ({ count = 12, className = "" }: FloatingParticlesProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dots = containerRef.current?.querySelectorAll(".particle");
    if (!dots) return;

    dots.forEach((dot) => {
      const duration = 4 + Math.random() * 6;
      const delay = Math.random() * 3;

      gsap.to(dot, {
        y: `random(-60, 60)`,
        x: `random(-40, 40)`,
        duration,
        delay,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(dot, {
        opacity: `random(0.1, 0.5)`,
        duration: duration * 0.6,
        delay,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    });
  }, []);

  return (
    <div ref={containerRef} className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="particle absolute rounded-full bg-foreground/10"
          style={{
            width: `${2 + Math.random() * 4}px`,
            height: `${2 + Math.random() * 4}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            opacity: 0.15 + Math.random() * 0.2,
          }}
        />
      ))}
    </div>
  );
};

export default FloatingParticles;
