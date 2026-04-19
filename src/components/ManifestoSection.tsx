import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import FloatingParticles from "./FloatingParticles";
import MatrixRain from "./MatrixRain";

gsap.registerPlugin(ScrollTrigger);

const manifestos = [
  "I believe in 99.9% uptime, but 100% user-centricity.",
  "Design is not decoration — it's communication.",
  "Ship fast, iterate faster, learn the fastest.",
  "Every pixel is a promise to the user.",
  "Code is poetry. Architecture is philosophy.",
  "Simplicity is the ultimate sophistication.",
];

const ManifestoSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const lines = sectionRef.current?.querySelectorAll(".manifesto-line");
    if (lines) {
      gsap.fromTo(
        lines,
        { x: -80, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
        }
      );
    }
  }, []);

  return (
    <section ref={sectionRef} className="py-24 md:py-32 bg-primary text-primary-foreground overflow-hidden relative">
      <FloatingParticles count={10} className="opacity-20" />
      <MatrixRain charCount={20} color="primary-foreground" />

      {/* Slow spinning accent circle */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 border border-dashed border-primary-foreground/10 rounded-full animate-spin-slow" />

      <div className="section-container relative z-10">
        <h2 className="text-sm font-medium uppercase tracking-[0.3em] mb-16 opacity-60">
          / Manifesto
        </h2>

        <div className="space-y-6 md:space-y-8">
          {manifestos.map((line, i) => (
            <div
              key={i}
              className="manifesto-line flex items-start gap-4 md:gap-6 group"
            >
              <span className="text-sm font-mono opacity-30 mt-2 flex-shrink-0 group-hover:opacity-60 transition-opacity duration-500">
                0{i + 1}
              </span>
              <p className="text-xl md:text-3xl lg:text-4xl font-display font-bold leading-tight group-hover:translate-x-2 transition-transform duration-500">
                /{line}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ManifestoSection;
