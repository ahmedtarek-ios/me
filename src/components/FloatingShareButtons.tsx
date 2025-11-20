import { useState } from "react";
import { Share2, X as XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Facebook, 
  MessageCircle, 
  Twitter 
} from "lucide-react";

export const FloatingShareButtons = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  const shareUrl = window.location.href;
  const shareText = "Check out this amazing iOS Developer portfolio!";
  
  const shareLinks = [
    {
      name: "Facebook Post",
      icon: Facebook,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      color: "hover:bg-[#1877f2] hover:text-white"
    },
    {
      name: "Messenger",
      icon: MessageCircle,
      url: `fb-messenger://share/?link=${encodeURIComponent(shareUrl)}`,
      color: "hover:bg-[#0084ff] hover:text-white"
    },
    {
      name: "X (Twitter)",
      icon: Twitter,
      url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`,
      color: "hover:bg-[#000000] hover:text-white"
    },
    {
      name: "WhatsApp",
      icon: MessageCircle,
      url: `https://wa.me/?text=${encodeURIComponent(shareText + " " + shareUrl)}`,
      color: "hover:bg-[#25d366] hover:text-white"
    },
    {
      name: "WhatsApp Business",
      icon: MessageCircle,
      url: `https://wa.me/+201115408161?text=${encodeURIComponent(shareText + " " + shareUrl)}`,
      color: "hover:bg-[#00a884] hover:text-white"
    }
  ];

  return (
    <div className="fixed bottom-40 right-4 sm:right-6 z-50 flex flex-col-reverse gap-3">
      {isOpen && (
        <div className="flex flex-col gap-2 animate-fade-in">
          {shareLinks.map((link, index) => (
            <Button
              key={index}
              size="icon"
              variant="outline"
              className={`w-12 h-12 rounded-full shadow-elegant border-2 transition-all duration-300 ${link.color}`}
              onClick={() => window.open(link.url, '_blank')}
              title={link.name}
            >
              <link.icon className="w-5 h-5" />
            </Button>
          ))}
        </div>
      )}
      
      <Button
        size="icon"
        className={`w-14 h-14 rounded-full shadow-glow bg-gradient-primary hover:shadow-elegant transition-all duration-300 ${isOpen ? 'rotate-45' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        title="Share Portfolio"
      >
        {isOpen ? <XIcon className="w-6 h-6" /> : <Share2 className="w-6 h-6" />}
      </Button>
    </div>
  );
};