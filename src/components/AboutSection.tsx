import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const AboutSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const els = sectionRef.current?.querySelectorAll(".gsap-reveal");
    if (els) {
      gsap.fromTo(
        els,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
        }
      );
    }
  }, []);

  return (
    <section id="about" ref={sectionRef} className="py-24 md:py-32 relative overflow-hidden">
      {/* Ambient background orb */}
      <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-foreground/[0.02] blur-3xl animate-drift" />

      <div className="section-container relative z-10">
        <h2 className="gsap-reveal text-3xl md:text-5xl font-bold mb-4">
          About <span className="gradient-text">Me</span>
        </h2>
        <div className="w-16 h-1 bg-foreground rounded-full mb-10 gsap-reveal" />

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div className="space-y-5">
            <p className="gsap-reveal text-muted-foreground leading-relaxed">
              I'm a passionate full-stack developer with a love for crafting elegant user experiences. 
              With expertise in modern web technologies, I bring ideas to life through clean code and 
              thoughtful design.
            </p>
            <p className="gsap-reveal text-muted-foreground leading-relaxed">
              When I'm not coding, you'll find me exploring new technologies, contributing to open-source 
              projects, or sharing knowledge with the developer community.
            </p>

            {/* Image placeholder */}
            
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[
              { number: "3+", label: "Years Experience" },
              { number: "20+", label: "Projects Completed" },
              { number: "15+", label: "Happy Clients" },
              { number: "5+", label: "Open Source" },
            ].map((stat, i) => (
              <div
                key={stat.label}
                className="gsap-reveal group p-6 rounded-xl bg-card card-shadow border border-border/50 text-center hover:border-foreground/20 transition-colors duration-300"
              >
                <div className="text-3xl font-bold mb-1 animate-breathe" style={{ animationDelay: `${i * 0.5}s` }}>
                  {stat.number}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
