import { useEffect } from "react";
import profileData from "@/data/profile.json";

export const SEOHead = () => {
  useEffect(() => {
    // Add Google Site Verification meta
    const verificationMeta = document.createElement("meta");
    verificationMeta.name = "google-site-verification";
    verificationMeta.content = "tkTitvHxGW1zlwNxYGQj9fRPh559WEnErUBXUmtkHDk";
    document.head.appendChild(verificationMeta);

    // Ensure CSP allows required script execution when served from hosts that inject their own policies
    const cspContent =
      "default-src * data: blob: 'unsafe-inline' 'unsafe-eval'; script-src * data: blob: 'unsafe-inline' 'unsafe-eval';";
    let cspMeta = document.querySelector('meta[http-equiv="Content-Security-Policy"]') as HTMLMetaElement | null;
    const createdCspMeta = !cspMeta;
    if (createdCspMeta) {
      cspMeta = document.createElement("meta");
      cspMeta.httpEquiv = "Content-Security-Policy";
      document.head.appendChild(cspMeta);
    }
    cspMeta.content = cspContent;

    // Add JSON-LD structured data
    const socialAccounts = profileData.profile.social_accounts || [];
    const githubAccount = socialAccounts.find((acc: any) => acc.name.toLowerCase() === 'github');
    const linkedinAccount = socialAccounts.find((acc: any) => acc.name.toLowerCase() === 'linkedin');
    const twitterAccount = socialAccounts.find((acc: any) => acc.name.toLowerCase() === 'twitter' || acc.name.toLowerCase() === 'x');
    
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Person",
      "name": profileData.profile.name,
      "jobTitle": "Senior iOS Developer",
      "description": profileData.profile.md_about.replace(/<[^>]*>/g, '').substring(0, 160),
      "url": window.location.origin,
      "email": profileData.profile.email,
      "telephone": profileData.profile.phone,
      "address": {
        "@type": "PostalAddress",
        "addressLocality": profileData.profile.lg_address.split(',')[0],
        "addressCountry": "Egypt"
      },
      "sameAs": [
        githubAccount?.url,
        linkedinAccount?.url,
        twitterAccount?.url
      ].filter(Boolean),
      "alumniOf": profileData.education.map(edu => ({
        "@type": "EducationalOrganization",
        "name": edu.name
      })),
      "worksFor": profileData.work
        .filter((job: any) => job.top_shown_as_current_company)
        .map((job: any) => ({
          "@type": "Organization",
          "name": job.name
        }))[0]
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(structuredData);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
      document.head.removeChild(verificationMeta);
      if (createdCspMeta && cspMeta?.parentNode) {
        document.head.removeChild(cspMeta);
      }
    };
  }, []);

  return null;
};
