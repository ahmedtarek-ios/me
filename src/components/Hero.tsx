import { Mail, MapPin, Phone, ExternalLink, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import profileData from "@/data/profile.json";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export const Hero = () => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const profile = profileData.profile;
  const currentCompany = profileData.work.find((w: any) => w.top_shown_as_current_company);
  const topEducation = profileData.education.find((e: any) => e.top_shown_education);

  const currentPic = mounted && theme === 'dark' 
    ? profile.darkmode_pic.main_pic 
    : profile.lightmode_pic.main_pic;

  const resumeFileName = "Ahmed_Tareks_Resume.pdf";
  const basePath = import.meta.env.BASE_URL || "/";
  const normalizedBase = basePath.endsWith("/") ? basePath : `${basePath}/`;
  const resumeUrl = `${normalizedBase}${resumeFileName}`;

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent/20 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="container relative z-10 px-4 sm:px-6 py-12 sm:py-20">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center max-w-7xl mx-auto">
          {/* Left Content */}
          <div className="space-y-4 sm:space-y-6 order-2 lg:order-1">
            <div className="space-y-2">
              <h2 className="text-base sm:text-lg font-medium text-muted-foreground">Hello, I'm</h2>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-primary bg-clip-text text-transparent animate-in fade-in slide-in-from-bottom-4 duration-1000 leading-tight">
                {profile.name}
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground">{profile.nickName}</p>
            </div>

            {currentCompany && (
              <div className="space-y-1">
                <p className="text-xl sm:text-2xl font-semibold text-foreground">{currentCompany.position}</p>
                <p className="text-base sm:text-lg text-muted-foreground">at {currentCompany.name}</p>
              </div>
            )}

            {topEducation && (
              <div className="space-y-1">
                <p className="text-base sm:text-lg font-medium text-foreground">{topEducation.tite}</p>
                <p className="text-sm sm:text-base text-muted-foreground">{topEducation.name}</p>
              </div>
            )}

            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-xl">
              {profile.sm_about}
            </p>

            {/* Contact Info */}
            <div className="space-y-2 sm:space-y-3 pt-4">
              <div className="flex items-center gap-3 text-muted-foreground text-sm sm:text-base">
                <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0" />
                <a href={`mailto:${profile.email}`} className="hover:text-primary transition-smooth break-all">
                  {profile.email}
                </a>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground text-sm sm:text-base">
                <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0" />
                <div className="flex flex-col sm:flex-row sm:gap-3">
                  <a href={`tel:${profile.phone}`} className="hover:text-primary transition-smooth">
                    {profile.phone}
                  </a>
                  <a href={`tel:${profile.other_phone}`} className="hover:text-primary transition-smooth">
                    {profile.other_phone}
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground text-sm sm:text-base">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0" />
                <span>{profile.sm_address}</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex flex-wrap gap-2 sm:gap-3 pt-4">
              {profile.social_accounts
                .filter((social: any) => 
                  ["Linked In", "Github", "Whatsapp", "Whatsapp Business"].includes(social.name)
                )
                .map((social: any, index: number) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="icon"
                    asChild
                    className="group hover:border-primary hover:shadow-glow transition-all duration-300 rounded-full w-10 h-10 sm:w-12 sm:h-12"
                  >
                    <a href={social.url} target="_blank" rel="noopener noreferrer" title={social.name}>
                      <img src={social.icon} alt={social.name} className="w-5 h-5 sm:w-6 sm:h-6" />
                    </a>
                  </Button>
                ))}
            </div>
          </div>

          {/* Right Image */}
          <div className="order-1 lg:order-2 flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-primary rounded-full blur-3xl opacity-30 animate-pulse" />
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-4 border-primary/20 shadow-elegant hover:shadow-glow transition-all duration-500 hover:scale-105">
                <img
                  src={currentPic}
                  alt={profile.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Projects count badge */}
              <div className="absolute -top-3 -left-3 sm:-top-4 sm:-left-4 bg-gradient-primary text-primary-foreground px-4 py-3 sm:px-6 sm:py-4 rounded-xl sm:rounded-2xl shadow-elegant">
                <div className="text-2xl sm:text-3xl font-bold">{profile.projects}+</div>
                <div className="text-xs sm:text-sm font-medium">Projects</div>
              </div>
              
              {/* CV Download Button */}
              <a 
                href={resumeUrl} 
                download={resumeFileName}
                className="absolute -bottom-3 -right-3 sm:-bottom-4 sm:-right-4 bg-gradient-primary text-primary-foreground px-4 py-3 sm:px-6 sm:py-4 rounded-xl sm:rounded-2xl shadow-elegant hover:shadow-glow transition-all duration-300 cursor-pointer group"
              >
                <Download className="w-6 h-6 sm:w-8 sm:h-8 group-hover:animate-bounce mx-auto" />
                <div className="text-xs sm:text-sm font-medium mt-1">Download CV</div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
