import profileData from "@/data/profile.json";

export const preloadImages = () => {
  const imageUrls = new Set<string>();

  // Profile pictures
  if (profileData.profile.lightmode_pic.main_pic) imageUrls.add(profileData.profile.lightmode_pic.main_pic);
  if (profileData.profile.lightmode_pic.sub_pic) imageUrls.add(profileData.profile.lightmode_pic.sub_pic);
  if (profileData.profile.darkmode_pic.main_pic) imageUrls.add(profileData.profile.darkmode_pic.main_pic);
  if (profileData.profile.darkmode_pic.sub_pic) imageUrls.add(profileData.profile.darkmode_pic.sub_pic);

  // Social account icons
  profileData.profile.social_accounts.forEach((account) => {
    if (account.icon) imageUrls.add(account.icon);
  });

  // Project images
  profileData.project.forEach((project) => {
    if (project.mainImage) imageUrls.add(project.mainImage);
    project.apps.forEach((app) => {
      app.appImages.forEach((image) => {
        if (image) imageUrls.add(image);
      });
    });
  });

  // Config logos
  if (profileData.config.logo.light) imageUrls.add(profileData.config.logo.light);
  if (profileData.config.logo.dark) imageUrls.add(profileData.config.logo.dark);

  imageUrls.forEach((url) => {
    const link = document.createElement("link");
    link.rel = "preload";
    link.href = url;
    link.as = "image";
    document.head.appendChild(link);
  });
};
