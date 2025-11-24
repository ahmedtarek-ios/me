import { useState } from "react";
import { Mail, MapPin, MessageCircle, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import profileData from "@/data/profile.json";
import { toast } from "sonner";
import { z } from "zod";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const MAP_EMBED_URL = "https://www.google.com/maps?q=29.990091,31.288479&z=13&output=embed";

// EmailJS configuration
const EMAILJS_SERVICE_ID = "service_yljwisr";
const EMAILJS_TEMPLATE_ID = "template_uhwm5nx";
const EMAILJS_PUBLIC_KEY = "VAemlW7kSM9ZJv3Mk";
const EMAILJS_API_URL = "https://api.emailjs.com/api/v1.0/email/send";
const EMAILJS_LIB_VERSION = "3.2.0";

const sendEmail = async (templateParams: Record<string, string>) => {
  const response = await fetch(EMAILJS_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      lib_version: EMAILJS_LIB_VERSION,
      user_id: EMAILJS_PUBLIC_KEY,
      service_id: EMAILJS_SERVICE_ID,
      template_id: EMAILJS_TEMPLATE_ID,
      template_params: templateParams,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "EmailJS request failed");
  }
};

// Form validation schema
const contactSchema = z.object({
  name: z.string()
    .trim()
    .min(2, { message: "Name must be at least 2 characters" })
    .max(100, { message: "Name must be less than 100 characters" }),
  email: z.string()
    .trim()
    .email({ message: "Invalid email address" })
    .max(255, { message: "Email must be less than 255 characters" }),
  subject: z.string()
    .trim()
    .max(200, { message: "Subject must be less than 200 characters" })
    .optional(),
  message: z.string()
    .trim()
    .min(10, { message: "Message must be at least 10 characters" })
    .max(1000, { message: "Message must be less than 1000 characters" })
});

export const Contact = () => {
  const profile = profileData.profile;
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { ref, isVisible } = useScrollAnimation();

  const handleWhatsApp = () => {
    window.open('https://wa.me/+201125661193', '_blank');
  };

  const handleWhatsAppBusiness = () => {
    window.open('https://wa.me/+201115408161', '_blank');
  };

  const handleEmailClick = () => {
    setShowEmailForm(true);
  };

  const handleLocationClick = () => {
    setShowEmailForm(false);
  };

  const handleSubmitEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    
    // Validate form data
    try {
      contactSchema.parse(formData);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0].toString()] = err.message;
          }
        });
        setErrors(newErrors);
        toast.error("Please fix the form errors");
        return;
      }
    }

    setIsSubmitting(true);

    try {
      const templateParams = {
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
        date: new Date().toLocaleString()
      };

      await sendEmail(templateParams);

      toast.success("Message sent successfully!");
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: ""
      });
      setShowEmailForm(false);
      setErrors({});
    } catch (error) {
      toast.error("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-background">
      <div ref={ref} className={`container max-w-7xl mx-auto transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            Get In Touch
          </h2>
          <div className="w-20 sm:w-24 h-1 bg-gradient-primary mx-auto rounded-full" />
          <p className="mt-4 text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto px-4">
            Have a project in mind? Let's discuss how we can work together
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8">
          {/* Contact Information */}
          <div className="space-y-4 sm:space-y-6">
            <Card className="p-4 sm:p-6 border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-elegant">
              <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-4 sm:mb-6">Contact Information</h3>
              
              <div className="space-y-3 sm:space-y-4">
                {/* Email */}
                <button
                  onClick={handleEmailClick}
                  className="w-full flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg sm:rounded-xl bg-muted/50 hover:bg-muted transition-all duration-300 group"
                >
                  <div className="p-2 sm:p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors flex-shrink-0">
                    <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                  </div>
                  <div className="flex-1 text-left min-w-0">
                    <p className="text-xs sm:text-sm text-muted-foreground">Email</p>
                    <p className="text-sm sm:text-base text-foreground font-medium break-all">{profile.email}</p>
                  </div>
                </button>

                {/* WhatsApp */}
                <button
                  onClick={handleWhatsApp}
                  className="w-full flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg sm:rounded-xl bg-muted/50 hover:bg-muted transition-all duration-300 group"
                >
                  <div className="p-2 sm:p-3 rounded-lg bg-green-500/10 group-hover:bg-green-500/20 transition-colors flex-shrink-0">
                    <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-500" />
                  </div>
                  <div className="flex-1 text-left min-w-0">
                    <p className="text-xs sm:text-sm text-muted-foreground">WhatsApp</p>
                    <p className="text-sm sm:text-base text-foreground font-medium">{profile.phone}</p>
                  </div>
                </button>

                {/* WhatsApp Business */}
                <button
                  onClick={handleWhatsAppBusiness}
                  className="w-full flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg sm:rounded-xl bg-muted/50 hover:bg-muted transition-all duration-300 group"
                >
                  <div className="p-2 sm:p-3 rounded-lg bg-green-600/10 group-hover:bg-green-600/20 transition-colors flex-shrink-0">
                    <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
                  </div>
                  <div className="flex-1 text-left min-w-0">
                    <p className="text-xs sm:text-sm text-muted-foreground">WhatsApp Business</p>
                    <p className="text-sm sm:text-base text-foreground font-medium">{profile.other_phone}</p>
                  </div>
                </button>

                {/* Location */}
                <button
                  onClick={handleLocationClick}
                  className="w-full flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg sm:rounded-xl bg-muted/50 hover:bg-muted transition-all duration-300 group"
                >
                  <div className="p-2 sm:p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors flex-shrink-0">
                    <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                  </div>
                  <div className="flex-1 text-left min-w-0">
                    <p className="text-xs sm:text-sm text-muted-foreground">Location</p>
                    <p className="text-sm sm:text-base text-foreground font-medium break-words">{profile.lg_address}</p>
                  </div>
                </button>
              </div>

            </Card>
          </div>

          {/* Map or Email Form */}
          <Card className="p-4 sm:p-6 border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-elegant">
            <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-4 sm:mb-6">
              {showEmailForm ? "Send a Message" : "Location"}
            </h3>
            
            {showEmailForm ? (
              <form onSubmit={handleSubmitEmail} className="space-y-3 sm:space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label className="text-xs sm:text-sm text-muted-foreground mb-1 sm:mb-2 block">Your Name</label>
                    <Input
                      type="text"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      required
                      className="text-sm"
                    />
                    {errors.name && <p className="text-destructive text-xs mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <label className="text-xs sm:text-sm text-muted-foreground mb-1 sm:mb-2 block">Your Email</label>
                    <Input
                      type="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      required
                      className="text-sm"
                    />
                    {errors.email && <p className="text-destructive text-xs mt-1">{errors.email}</p>}
                  </div>
                </div>
                <div>
                  <label className="text-xs sm:text-sm text-muted-foreground mb-1 sm:mb-2 block">Subject</label>
                  <Input
                    type="text"
                    placeholder="Project Inquiry"
                    value={formData.subject}
                    onChange={(e) => setFormData({...formData, subject: e.target.value})}
                    className="text-sm"
                  />
                  {errors.subject && <p className="text-destructive text-xs mt-1">{errors.subject}</p>}
                </div>
                <div>
                  <label className="text-xs sm:text-sm text-muted-foreground mb-1 sm:mb-2 block">Message</label>
                  <Textarea
                    placeholder="Tell me about your project..."
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    required
                    className="min-h-[120px] sm:min-h-[150px] text-sm resize-none"
                  />
                  {errors.message && <p className="text-destructive text-xs mt-1">{errors.message}</p>}
                </div>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-primary text-primary-foreground border-0 hover:shadow-glow transition-all duration-300 text-sm h-10 sm:h-11"
                >
                  <Send className="w-4 h-4 mr-2" />
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            ) : (
              <div className="w-full h-64 sm:h-80 md:h-96 rounded-lg overflow-hidden">
                <iframe
                  title="Ahmed Tarek Ahmed location on a map"
                  src={MAP_EMBED_URL}
                  className="w-full h-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
            )}
          </Card>
        </div>
      </div>
    </section>
  );
};
