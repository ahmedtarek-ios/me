import profileData from "@/data/profile.json";
import { ExternalLink, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export const Projects = () => {
  const { ref, isVisible } = useScrollAnimation();
  // Get only VIP projects for the main view
  const vipProjects = profileData.project.filter((p: any) => p.vip);

  return (
    <section id="projects" className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-background">
      <div ref={ref} className={`container max-w-7xl mx-auto transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            Featured Projects
          </h2>
          <div className="w-20 sm:w-24 h-1 bg-gradient-primary mx-auto rounded-full" />
          <p className="mt-4 text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto px-4">
            Showcasing my best work in iOS development
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-12">
          {vipProjects.map((project: any) => (
            <div
              key={project.id}
              className="group relative rounded-xl sm:rounded-2xl overflow-hidden bg-gradient-card border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-elegant"
            >
              {/* Project Image */}
              {project.mainImage && (
                <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden">
                  <img
                    src={project.mainImage}
                    alt={project.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent opacity-60" />
                  <Badge className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-gradient-primary text-primary-foreground border-0 text-xs">
                    <Star className="w-3 h-3 mr-1" />
                    Featured
                  </Badge>
                </div>
              )}

              <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-2">{project.name}</h3>
                  <p className="text-base sm:text-lg text-primary font-medium mb-2">{project.sub_name}</p>
                  <p className="text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4">{project.slogen}</p>
                </div>

                <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
                  <Badge variant="secondary" className="text-xs">
                    {project.position}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {project.role}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {project.date}
                  </Badge>
                </div>

                {/* Apps */}
                <div className="space-y-3">
                  {project.apps.map((app: any, index: number) => (
                    app.appLink && (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        asChild
                        className="w-full justify-between group/btn hover:border-primary hover:shadow-glow transition-all"
                      >
                        <a href={app.appLink} target="_blank" rel="noopener noreferrer">
                          <span className="flex items-center gap-2">
                            {app.appName} {app.appSubTitle && `- ${app.appSubTitle}`}
                          </span>
                          <ExternalLink className="w-4 h-4 opacity-0 group-hover/btn:opacity-100 transition-opacity" />
                        </a>
                      </Button>
                    )
                  ))}
                </div>

                {/* Technology badges */}
                {project.technology && project.technology.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-2">
                    {project.technology.map((tech: any, index: number) => (
                      <div key={index} className="flex items-center gap-1 px-2 py-1 rounded-md bg-muted text-xs">
                        <span className="font-medium">{tech.name}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button
            size="lg"
            asChild
            className="bg-gradient-primary text-primary-foreground border-0 shadow-elegant hover:shadow-glow transition-all duration-300"
          >
            <Link to="/projects">
              View All Projects ({profileData.project.length})
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
