import { useEffect, useRef } from "react";

interface MatrixRainProps {
  className?: string;
  charCount?: number;
  color?: "foreground" | "primary-foreground";
}

const CHARS = "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン<>{}[]=/\\";

const MatrixRain = ({ className = "", charCount = 30, color = "foreground" }: MatrixRainProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const columns: HTMLDivElement[] = [];

    for (let i = 0; i < charCount; i++) {
      const col = document.createElement("div");
      col.className = "matrix-column";
      col.style.cssText = `
        position: absolute;
        left: ${Math.random() * 100}%;
        top: ${-20 - Math.random() * 80}%;
        font-family: 'Courier New', monospace;
        font-size: ${10 + Math.random() * 4}px;
        writing-mode: vertical-rl;
        white-space: nowrap;
        color: hsl(var(--${color}) / ${0.06 + Math.random() * 0.08});
        animation: matrix-fall ${8 + Math.random() * 12}s linear ${Math.random() * 10}s infinite;
        pointer-events: none;
        user-select: none;
      `;

      const length = 8 + Math.floor(Math.random() * 15);
      let text = "";
      for (let j = 0; j < length; j++) {
        text += CHARS[Math.floor(Math.random() * CHARS.length)];
      }
      col.textContent = text;
      container.appendChild(col);
      columns.push(col);
    }

    return () => {
      columns.forEach((col) => col.remove());
    };
  }, [charCount, color]);

  return <div ref={containerRef} className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`} />;
};

export default MatrixRain;
