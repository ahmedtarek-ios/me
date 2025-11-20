import { useState } from "react";
import profileData from "@/data/profile.json";
import { ExternalLink, Star, ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { ThemeToggle } from "@/components/ThemeToggle";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Sort projects: VIP first, then by id
  const sortedProjects = [...profileData.project].sort((a: any, b: any) => {
    if (a.vip && !b.vip) return -1;
    if (!a.vip && b.vip) return 1;
    return a.id - b.id;
  });

  const openProject = (project: any) => {
    setSelectedProject(project);
    setCurrentImageIndex(0);
  };

  const getCurrentApp = () => {
    if (!selectedProject) return null;
    return selectedProject.apps[currentImageIndex];
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
    <div className="min-h-screen bg-gradient-hero">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-lg bg-background/80 border-b border-border">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between gap-4">
          <Button variant="ghost" size="sm" asChild className="text-xs sm:text-sm h-8 sm:h-9">
            <Link to="/" className="flex items-center gap-1.5 sm:gap-2">
              <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span className="hidden xs:inline">Back to Home</span>
              <span className="xs:hidden">Back</span>
            </Link>
          </Button>
          <ThemeToggle />
        </div>
      </header>

      {/* Projects Grid */}
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            All Projects
          </h1>
          <div className="w-20 sm:w-24 h-1 bg-gradient-primary mx-auto rounded-full mb-4" />
          <p className="text-sm sm:text-base text-muted-foreground">
            {sortedProjects.length} projects completed
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {sortedProjects.map((project: any) => (
            <div
              key={project.id}
              className="group cursor-pointer rounded-xl sm:rounded-2xl overflow-hidden bg-gradient-card border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-elegant"
              onClick={() => openProject(project)}
            >
              {/* Project Image */}
              {project.mainImage && (
                <div className="relative h-40 sm:h-48 overflow-hidden">
                  <img
                    src={project.mainImage}
                    alt={project.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent opacity-60" />
                  {project.vip && (
                    <Badge className="absolute top-2 right-2 sm:top-3 sm:right-3 bg-gradient-primary text-primary-foreground border-0 text-xs">
                      <Star className="w-3 h-3 mr-1" />
                      VIP
                    </Badge>
                  )}
                </div>
              )}

              <div className="p-4 sm:p-5 space-y-2 sm:space-y-3">
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-foreground mb-1 line-clamp-1">{project.name}</h3>
                  <p className="text-sm text-primary font-medium line-clamp-1">{project.sub_name}</p>
                </div>

                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  <Badge variant="secondary" className="text-xs">
                    {project.position}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {project.date}
                  </Badge>
                </div>

                {/* Technology badges */}
                {project.technology && project.technology.length > 0 && (
                  <div className="flex flex-wrap gap-1 pt-1">
                    {project.technology.slice(0, 3).map((tech: any, index: number) => (
                      <div key={index} className="px-2 py-1 rounded-md bg-muted text-xs">
                        {tech.name}
                      </div>
                    ))}
                    {project.technology.length > 3 && (
                      <div className="px-2 py-1 rounded-md bg-muted text-xs">
                        +{project.technology.length - 3}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Project Detail Modal */}
      <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto mx-4 sm:mx-auto">
          <DialogHeader>
            <DialogTitle className="text-xl sm:text-2xl font-bold break-words pr-8">{selectedProject?.name}</DialogTitle>
            <DialogDescription className="text-base sm:text-lg break-words">{selectedProject?.sub_name}</DialogDescription>
          </DialogHeader>

          {selectedProject && (
            <div className="space-y-4 sm:space-y-6">
              {/* Main Image */}
              {selectedProject.mainImage && (
                <div className="rounded-lg sm:rounded-xl overflow-hidden">
                  <img
                    src={selectedProject.mainImage}
                    alt={selectedProject.name}
                    className="w-full h-48 sm:h-56 md:h-64 object-cover"
                  />
                </div>
              )}

              {/* Info Badges */}
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

              {/* Description */}
              <div>
                <h3 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3">Description</h3>
                <div 
                  className="text-sm sm:text-base text-muted-foreground prose prose-sm max-w-none"
                  dangerouslySetInnerHTML={{ __html: selectedProject.description }}
                />
              </div>

              {/* Apps Carousel */}
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

                  {/* App Navigation */}
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
                      disabled={currentImageIndex === selectedProject.apps.length - 1}
                      className="text-xs sm:text-sm h-8 sm:h-9"
                    >
                      <span className="hidden xs:inline">Next</span>
                      <span className="xs:hidden">Next</span>
                      <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 ml-1" />
                    </Button>
                  </div>

                  {/* App Link */}
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

              {/* Technologies */}
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
    </div>
  );
}
