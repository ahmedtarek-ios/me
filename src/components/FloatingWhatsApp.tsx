import { MessageCircle, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";

export const FloatingWhatsApp = () => {
  const handleWhatsApp = () => {
    window.open('https://wa.me/+201125661193', '_blank');
  };

  const handleWhatsAppBusiness = () => {
    window.open('https://wa.me/+201115408161', '_blank');
  };

  return (
    <div className="fixed bottom-4 right-4 sm:right-6 z-50 flex flex-col gap-3">
      <Button
        size="icon"
        className="w-14 h-14 rounded-full shadow-glow bg-[#25d366] hover:bg-[#128c7e] transition-all duration-300 hover:shadow-elegant"
        onClick={handleWhatsApp}
        title="Chat on WhatsApp"
      >
        <MessageCircle className="w-6 h-6 text-white" />
      </Button>
      
      <Button
        size="icon"
        className="w-14 h-14 rounded-full shadow-glow bg-[#00a884] hover:bg-[#008069] transition-all duration-300 hover:shadow-elegant"
        onClick={handleWhatsAppBusiness}
        title="Chat on WhatsApp Business"
      >
        <Briefcase className="w-6 h-6 text-white" />
      </Button>
    </div>
  );
};