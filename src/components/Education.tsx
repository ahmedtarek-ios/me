import profileData from "@/data/profile.json";
import { GraduationCap, Calendar } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export const Education = () => {
  const education = profileData.education;
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="education" className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-background">
      <div ref={ref} className={`container max-w-7xl mx-auto transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            Education
          </h2>
          <div className="w-20 sm:w-24 h-1 bg-gradient-primary mx-auto rounded-full" />
        </div>

        <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
          {education.map((edu: any, index: number) => (
            <div
              key={index}
              className="group p-4 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl bg-gradient-card border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-elegant"
            >
              <div className="flex items-start gap-3 sm:gap-4 mb-3 sm:mb-4">
                <div className="p-2 sm:p-3 rounded-lg sm:rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300 flex-shrink-0">
                  <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2 break-words">{edu.name}</h3>
                  <p className="text-base sm:text-lg font-semibold text-primary mb-2 break-words">{edu.tite}</p>
                  <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-muted-foreground">
                    <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
                    <span>{edu.date}</span>
                  </div>
                </div>
              </div>

              <div 
                className="text-sm sm:text-base text-muted-foreground prose prose-sm max-w-none"
                dangerouslySetInnerHTML={{ __html: edu.todo }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
