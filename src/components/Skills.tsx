import profileData from "@/data/profile.json";
import { Progress } from "@/components/ui/progress";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export const Skills = () => {
  const skills = profileData.skills;
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="skills" className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-muted/30">
      <div ref={ref} className={`container max-w-7xl mx-auto transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            Skills & Expertise
          </h2>
          <div className="w-20 sm:w-24 h-1 bg-gradient-primary mx-auto rounded-full" />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {skills.map((section: any, index: number) => (
            <div
              key={index}
              className="p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-gradient-card border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-elegant"
            >
              <h3 className="text-lg sm:text-xl font-bold text-foreground mb-4 sm:mb-6 flex items-center gap-2">
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-gradient-primary flex-shrink-0" />
                {section.sectionName}
              </h3>
              
              <div className="space-y-4 sm:space-y-5">
                {section.sectionData.map((skill: any, skillIndex: number) => (
                  <div key={skillIndex} className="space-y-1.5 sm:space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-xs sm:text-sm font-medium text-foreground">{skill.skillName}</span>
                      <span className="text-xs sm:text-sm text-muted-foreground">{skill.percentage}%</span>
                    </div>
                    <Progress 
                      value={skill.percentage} 
                      className="h-1.5 sm:h-2"
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
