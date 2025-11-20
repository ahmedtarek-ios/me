import profileData from "@/data/profile.json";
import { Briefcase, MapPin, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export const Experience = () => {
  const { ref, isVisible } = useScrollAnimation();
  // Sort work experience: current company first, then by date (newest to oldest)
  const sortedWork = [...profileData.work].sort((a: any, b: any) => {
    if (a.top_shown_as_current_company) return -1;
    if (b.top_shown_as_current_company) return 1;
    
    // Parse dates for sorting
    const dateA = a.date.toLowerCase().includes('present') ? new Date() : new Date(a.date.split(' - ')[1]);
    const dateB = b.date.toLowerCase().includes('present') ? new Date() : new Date(b.date.split(' - ')[1]);
    
    return dateB.getTime() - dateA.getTime();
  });

  return (
    <section id="experience" className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-muted/30">
      <div ref={ref} className={`container max-w-7xl mx-auto transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            Work Experience
          </h2>
          <div className="w-20 sm:w-24 h-1 bg-gradient-primary mx-auto rounded-full" />
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-primary hidden md:block" />

          <div className="space-y-6 sm:space-y-8">
            {sortedWork.map((job: any, index: number) => (
              <div
                key={index}
                className="relative group"
              >
                {/* Timeline dot */}
                <div className="absolute left-8 -translate-x-1/2 w-4 h-4 rounded-full bg-primary border-4 border-background hidden md:block" />

                <div className="md:ml-20">
                  <div className="p-4 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl bg-gradient-card border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-elegant">
                    <div className="flex flex-col gap-3 sm:gap-4 mb-4">
                      <div className="flex-1">
                        <div className="flex items-start gap-2 sm:gap-3 mb-2">
                          <div className="p-1.5 sm:p-2 rounded-lg bg-primary/10 flex-shrink-0">
                            <Briefcase className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                          </div>
                          <div className="min-w-0">
                            <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-foreground mb-1 break-words">{job.position}</h3>
                            <p className="text-base sm:text-lg lg:text-xl font-semibold text-primary break-words">{job.name}</p>
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-2 sm:gap-3 mt-3">
                          <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-muted-foreground">
                            <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
                            <span>{job.date}</span>
                          </div>
                          <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-muted-foreground">
                            <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
                            <span>{job.location}</span>
                          </div>
                          <Badge variant="secondary" className="text-xs">
                            {job.role}
                          </Badge>
                          {job.top_shown_as_current_company && (
                            <Badge className="text-xs bg-gradient-primary text-primary-foreground border-0">
                              Current
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>

                    <div 
                      className="text-sm sm:text-base text-muted-foreground prose prose-sm max-w-none"
                      dangerouslySetInnerHTML={{ __html: job.todo }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
