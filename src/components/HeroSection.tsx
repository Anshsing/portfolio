import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ArrowDown } from "lucide-react";
import FloatingParticles from "./FloatingParticles";
import MatrixRain from "./MatrixRain";

const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const orbRef1 = useRef<HTMLDivElement>(null);
  const orbRef2 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.5 });

    tl.fromTo(imageRef.current, { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 1, ease: "power3.out" })
      .fromTo(titleRef.current, { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "power3.out" }, "-=0.6")
      .fromTo(subtitleRef.current, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }, "-=0.5")
      .fromTo(ctaRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }, "-=0.3");

    // Continuous orb animations
    if (orbRef1.current) {
      gsap.to(orbRef1.current, { x: 30, y: -20, duration: 5, repeat: -1, yoyo: true, ease: "sine.inOut" });
    }
    if (orbRef2.current) {
      gsap.to(orbRef2.current, { x: -25, y: 30, duration: 7, repeat: -1, yoyo: true, ease: "sine.inOut" });
    }
  }, []);

  return (
    <section ref={containerRef} className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Floating particles */}
      <FloatingParticles count={18} />
      <MatrixRain charCount={25} />

      {/* Morphing orbs */}
      <div ref={orbRef1} className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-foreground/[0.03] blur-3xl animate-morph" />
      <div ref={orbRef2} className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-foreground/[0.03] blur-3xl animate-morph" style={{ animationDelay: "4s" }} />

      {/* Subtle decorative grid */}
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, hsl(0 0% 50%) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

      <div className="section-container relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-block mb-6 px-4 py-1.5 rounded-full border border-border bg-card">
              <span className="text-sm font-medium text-foreground flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-foreground/70 animate-breathe" />
                Available for work
              </span>
            </div>

            <h1 ref={titleRef} className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.95] mb-6 opacity-0">
              Hi, I'm{" "}
              <span className="gradient-text">Ansh Singh</span>
            </h1>

            <p ref={subtitleRef} className="text-lg md:text-xl text-muted-foreground max-w-xl mb-10 opacity-0 text-balance">
              A creative developer building beautiful, performant web experiences with modern technologies and thoughtful design.
            </p>

            <div ref={ctaRef} className="flex items-center gap-4 opacity-0">
              <a
                href="#projects"
                className="group inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition-all duration-300"
              >
                <span>View My Work</span>
                <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-border bg-card text-foreground font-medium hover:bg-muted transition-all duration-300"
              >
                Get In Touch
              </a>
              <a
                href="/public/Ansh singh_resume.pdf"
                download
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-border bg-card text-foreground font-medium hover:bg-muted transition-all duration-300"
              >
                Download Resume
              </a>
            </div>
          </div>

          {/* Profile Image Placeholder */}
          
        
        </div>

        <a href="#about" className="inline-flex mt-16 animate-float" aria-label="Scroll down">
          <ArrowDown className="w-5 h-5 text-muted-foreground" />
        </a>
      </div>
    </section>
  );
};

export default HeroSection;
