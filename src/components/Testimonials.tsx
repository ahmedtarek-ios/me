import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Card, CardContent } from "@/components/ui/card";
import { Quote } from "lucide-react";
import profileData from "@/data/profile.json";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

export const Testimonials = () => {
  const { ref, isVisible } = useScrollAnimation();
  const testimonials = profileData.testimonials;

  return (
    <section
      ref={ref}
      className={`py-16 sm:py-20 px-4 sm:px-6 transition-all duration-1000 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
      id="testimonials"
    >
      <div className="container max-w-7xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            {testimonials.title}
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            {testimonials.description}
          </p>
        </div>

        <Carousel 
          className="w-full max-w-4xl mx-auto"
          plugins={[
            Autoplay({
              delay: 5000,
            }),
          ]}
        >
          <CarouselContent>
            {testimonials.items.map((testimonial) => (
              <CarouselItem key={testimonial.id}>
                <Card className="group hover:shadow-glow transition-all duration-300 bg-card/50 backdrop-blur-sm border-border">
                  <CardContent className="p-8 sm:p-12">
                    <div className="flex flex-col h-full min-h-[300px]">
                      <Quote className="w-10 h-10 sm:w-12 sm:h-12 text-primary mb-6 opacity-50" />
                      
                      <p className="text-base sm:text-lg text-foreground/90 mb-8 flex-grow leading-relaxed">
                        "{testimonial.message}"
                      </p>
                      
                      <div className="mt-auto">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-primary flex items-center justify-center">
                            <span className="text-primary-foreground font-bold text-base sm:text-lg">
                              {testimonial.name.charAt(0)}
                            </span>
                          </div>
                          <div>
                            <h4 className="font-semibold text-base sm:text-lg text-foreground">
                              {testimonial.name}
                            </h4>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
};
