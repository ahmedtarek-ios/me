import profileData from "@/data/profile.json";
import { Code2, Smartphone, Database, Palette } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export const About = () => {
  const profile = profileData.profile;
  const { ref, isVisible } = useScrollAnimation();

  const highlights = [
    {
      icon: Smartphone,
      title: "iOS Development",
      description: "Expert in Swift, SwiftUI, UIKit & Combine"
    },
    {
      icon: Code2,
      title: "Multi-Platform",
      description: "Kotlin, Java, Spring Framework"
    },
    {
      icon: Database,
      title: "Backend Integration",
      description: "SQL, API Design & Integration"
    },
    {
      icon: Palette,
      title: "UI/UX Design",
      description: "Creating engaging user experiences"
    }
  ];

  return (
    <section id="about" className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-background">
      <div ref={ref} className={`container max-w-7xl mx-auto transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            About Me
          </h2>
          <div className="w-20 sm:w-24 h-1 bg-gradient-primary mx-auto rounded-full" />
        </div>

        <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-start">
          <div className="space-y-4 sm:space-y-6">
            <div 
              className="text-base sm:text-lg text-muted-foreground leading-relaxed prose prose-sm sm:prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: profile.md_about }}
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
            {highlights.map((item, index) => (
              <div
                key={index}
                className="group relative p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-gradient-card border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-elegant"
              >
                <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-5 rounded-xl sm:rounded-2xl transition-opacity duration-300" />
                <div className="relative space-y-2 sm:space-y-3">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                    <item.icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-foreground">{item.title}</h3>
                  <p className="text-sm sm:text-base text-muted-foreground">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
