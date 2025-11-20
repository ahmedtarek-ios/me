import { useEffect } from "react";
import profileData from "@/data/profile.json";

export const SEOHead = () => {
  useEffect(() => {
    // Add Google Site Verification meta
    const verificationMeta = document.createElement("meta");
    verificationMeta.name = "google-site-verification";
    verificationMeta.content = "tkTitvHxGW1zlwNxYGQj9fRPh559WEnErUBXUmtkHDk";
    document.head.appendChild(verificationMeta);

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
    };
  }, []);

  return null;
};
