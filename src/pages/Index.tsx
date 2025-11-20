import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Experience } from "@/components/Experience";
import { Projects } from "@/components/Projects";
import { Skills } from "@/components/Skills";
import { Education } from "@/components/Education";
import { Testimonials } from "@/components/Testimonials";
import { Contact } from "@/components/Contact";
import { ThemeToggle } from "@/components/ThemeToggle";
import { ThemeProvider } from "next-themes";
import { FloatingShareButtons } from "@/components/FloatingShareButtons";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { SEOHead } from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import profileData from "@/data/profile.json";

const Index = () => {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <SEOHead />
      <div className="relative">
        {/* Theme Toggle - Fixed Position */}
        <div className="fixed top-4 right-4 sm:top-6 sm:right-6 z-50">
          <ThemeToggle />
        </div>

        {/* Floating Action Buttons */}
        <FloatingWhatsApp />
        <FloatingShareButtons />

        {/* Main Content */}
        <main>
          <Hero />
          <About />
          <Experience />
          <Projects />
          <Skills />
          <Education />
          <Testimonials />
          <Contact />
        </main>

        {/* Footer */}
        <footer className="py-6 sm:py-8 px-4 sm:px-6 bg-muted/30 border-t border-border">
          <div className="container max-w-7xl mx-auto text-center space-y-6">
            {/* Social Links */}
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
              {profileData.profile.social_accounts.map((social: any, index: number) => (
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
            
            {/* Copyright */}
            <p className="text-sm sm:text-base text-muted-foreground">
              © {new Date().getFullYear()} Ahmed Tarek Ahmed | In ❤️ of Swift |. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </ThemeProvider>
  );
};

export default Index;
