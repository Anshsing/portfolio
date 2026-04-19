import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MatrixRain from "./MatrixRain";

gsap.registerPlugin(ScrollTrigger);

const skillCategories = [
  {
    title: "Frontend",
    skills: ["React", "TypeScript", "Next.js", "TailwindCSS", "GSAP", "Framer Motion"],
  },
  {
    title: "Backend",
    skills: ["Node.js", "Python", "PostgreSQL", "MongoDB", "REST APIs", "GraphQL"],
  },
  {
    title: "Tools & DevOps",
    skills: ["Git", "Docker", "AWS", "CI/CD", "Figma", "Linux"],
  },
];

const SkillsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const els = sectionRef.current?.querySelectorAll(".skill-group");
    if (els) {
      gsap.fromTo(
        els,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
        }
      );
    }

    // Continuous subtle wobble on skill tags
    const tags = sectionRef.current?.querySelectorAll(".skill-tag");
    if (tags) {
      tags.forEach((tag, i) => {
        gsap.to(tag, {
          y: -3,
          duration: 1.5 + Math.random(),
          delay: i * 0.1,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });
    }
  }, []);

  return (
    <section id="skills" ref={sectionRef} className="py-24 md:py-32 bg-muted/40 relative overflow-hidden">
      <MatrixRain charCount={15} />
      <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 w-72 h-72 border border-dashed border-foreground/5 rounded-full animate-spin-slow" />

      <div className="section-container relative z-10">
        <h2 className="text-3xl md:text-5xl font-bold mb-4">
          Skills & <span className="gradient-text-warm">Technologies</span>
        </h2>
        <div className="w-16 h-1 bg-foreground/50 rounded-full mb-12" />

        <div className="grid md:grid-cols-3 gap-8">
          {skillCategories.map((cat) => (
            <div key={cat.title} className="skill-group">
              <h3 className="text-lg font-semibold mb-5">{cat.title}</h3>
              <div className="flex flex-wrap gap-3">
                {cat.skills.map((skill) => (
                  <span
                    key={skill}
                    className="skill-tag px-4 py-2 rounded-lg bg-card border border-border/50 text-sm font-medium card-shadow hover:border-foreground/20 hover:bg-accent transition-all duration-300 cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
