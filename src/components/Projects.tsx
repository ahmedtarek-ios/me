import { useState } from "react";
import profileData from "@/data/profile.json";
import { ExternalLink, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export const Projects = () => {
  const { ref, isVisible } = useScrollAnimation();
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  // Get only VIP projects for the main view
  const vipProjects = profileData.project.filter((p: any) => p.vip);

  const openProject = (project: any) => {
    setSelectedProject(project);
    setCurrentImageIndex(0);
  };

  const closeProject = () => {
    setSelectedProject(null);
    setCurrentImageIndex(0);
  };

  const getCurrentApp = () => {
    if (!selectedProject) return null;
    return selectedProject.apps?.[currentImageIndex];
  };

  const nextImage = () => {
    if (selectedProject && currentImageIndex < selectedProject.apps.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

  const prevImage = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };

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
              className="group relative rounded-xl sm:rounded-2xl overflow-hidden bg-gradient-card border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-elegant cursor-pointer"
              onClick={() => openProject(project)}
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
                        onClick={(e) => e.stopPropagation()}
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

      <Dialog open={!!selectedProject} onOpenChange={(open) => !open && closeProject()}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto mx-4 sm:mx-auto">
          <DialogHeader>
            <DialogTitle className="text-xl sm:text-2xl font-bold break-words pr-8">{selectedProject?.name}</DialogTitle>
            <DialogDescription className="text-base sm:text-lg break-words">{selectedProject?.sub_name}</DialogDescription>
          </DialogHeader>

          {selectedProject && (
            <div className="space-y-4 sm:space-y-6">
              {selectedProject.mainImage && (
                <div className="rounded-lg sm:rounded-xl overflow-hidden">
                  <img
                    src={selectedProject.mainImage}
                    alt={selectedProject.name}
                    className="w-full h-48 sm:h-56 md:h-64 object-cover"
                  />
                </div>
              )}

              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {selectedProject.vip && (
                  <Badge className="bg-gradient-primary text-primary-foreground border-0 text-xs">
                    <Star className="w-3 h-3 mr-1" />
                    VIP Project
                  </Badge>
                )}
                <Badge variant="secondary" className="text-xs">{selectedProject.position}</Badge>
                <Badge variant="outline" className="text-xs">{selectedProject.role}</Badge>
                <Badge variant="outline" className="text-xs">{selectedProject.date}</Badge>
              </div>

              <div>
                <h3 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3">Description</h3>
                <div
                  className="text-sm sm:text-base text-muted-foreground prose prose-sm max-w-none"
                  dangerouslySetInnerHTML={{ __html: selectedProject.description }}
                />
              </div>

              {selectedProject.apps && selectedProject.apps.length > 0 && (
                <div>
                  <h3 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3">Applications</h3>

                  {getCurrentApp()?.appImages && getCurrentApp().appImages.length > 0 && (
                    <div className="relative mb-3 sm:mb-4">
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3">
                        {getCurrentApp().appImages.map((img: string, idx: number) => (
                          <div key={idx} className="rounded-lg overflow-hidden">
                            <img
                              src={img}
                              alt={`Screenshot ${idx + 1}`}
                              className="w-full h-48 sm:h-56 md:h-64 object-cover"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between gap-2 sm:gap-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={prevImage}
                      disabled={currentImageIndex === 0}
                      className="text-xs sm:text-sm h-8 sm:h-9"
                    >
                      <ChevronLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1" />
                      <span className="hidden xs:inline">Previous</span>
                      <span className="xs:hidden">Prev</span>
                    </Button>

                    <div className="flex-1 text-center min-w-0">
                      {getCurrentApp()?.appName && (
                        <div>
                          <p className="font-medium text-sm sm:text-base truncate">{getCurrentApp().appName}</p>
                          {getCurrentApp().appSubTitle && (
                            <p className="text-xs sm:text-sm text-muted-foreground truncate">{getCurrentApp().appSubTitle}</p>
                          )}
                        </div>
                      )}
                      <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                        {currentImageIndex + 1} of {selectedProject.apps.length}
                      </p>
                    </div>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={nextImage}
                      disabled={selectedProject.apps.length === 0 || currentImageIndex === selectedProject.apps.length - 1}
                      className="text-xs sm:text-sm h-8 sm:h-9"
                    >
                      <span className="hidden xs:inline">Next</span>
                      <span className="xs:hidden">Next</span>
                      <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 ml-1" />
                    </Button>
                  </div>

                  {getCurrentApp()?.appLink && (
                    <Button
                      className="w-full mt-3 sm:mt-4 bg-gradient-primary text-primary-foreground border-0 text-sm h-9 sm:h-10"
                      asChild
                    >
                      <a href={getCurrentApp().appLink} target="_blank" rel="noopener noreferrer">
                        View on App Store
                        <ExternalLink className="w-3.5 h-3.5 sm:w-4 sm:h-4 ml-2" />
                      </a>
                    </Button>
                  )}
                </div>
              )}

              {selectedProject.technology && selectedProject.technology.length > 0 && (
                <div>
                  <h3 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3">Technologies Used</h3>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {selectedProject.technology.map((tech: any, index: number) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {tech.name}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};
