import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/webp", "image/avif"],
  },

  async redirects() {
    return [
      // Category slug cleanup
      { source: "/pokemon-categories", destination: "/pokemon", permanent: true },
      { source: "/pokemon-categories/", destination: "/pokemon", permanent: true },
      { source: "/yu-gi-oh-categories", destination: "/yu-gi-oh", permanent: true },
      { source: "/yu-gi-oh-categories/", destination: "/yu-gi-oh", permanent: true },
      { source: "/magic-the-gathering-categories", destination: "/mtg", permanent: true },
      { source: "/magic-the-gathering-categories/", destination: "/mtg", permanent: true },
      { source: "/product-category/pokemon", destination: "/pokemon", permanent: true },
      { source: "/product-category/pokemon/", destination: "/pokemon", permanent: true },

      // Removed placeholder pages → homepage
      { source: "/hello-world", destination: "/", permanent: true },
      { source: "/hello-world/", destination: "/", permanent: true },
      { source: "/sample-page", destination: "/", permanent: true },
      { source: "/sample-page/", destination: "/", permanent: true },
      { source: "/testpage", destination: "/", permanent: true },
      { source: "/testpage/", destination: "/", permanent: true },
      { source: "/test-shop", destination: "/shop", permanent: true },
      { source: "/test-shop/", destination: "/shop", permanent: true },
      { source: "/home", destination: "/", permanent: true },
      { source: "/home/", destination: "/", permanent: true },

      // BuddyBoss pages → relevant alternatives
      { source: "/members", destination: "/about-us", permanent: true },
      { source: "/members/", destination: "/about-us", permanent: true },
      { source: "/news-feed", destination: "/", permanent: true },
      { source: "/news-feed/", destination: "/", permanent: true },
      { source: "/membership", destination: "/", permanent: true },
      { source: "/membership/", destination: "/", permanent: true },
      { source: "/subscription-plan", destination: "/", permanent: true },
      { source: "/subscription-plan/", destination: "/", permanent: true },
      { source: "/member-login", destination: "/", permanent: true },
      { source: "/member-login/", destination: "/", permanent: true },
      { source: "/register", destination: "/", permanent: true },
      { source: "/register/", destination: "/", permanent: true },
      { source: "/my-account-2", destination: "/", permanent: true },
      { source: "/my-account-2/", destination: "/", permanent: true },
      { source: "/default-redirect-page", destination: "/", permanent: true },
      { source: "/default-redirect-page/", destination: "/", permanent: true },
      { source: "/activate", destination: "/", permanent: true },
      { source: "/activate/", destination: "/", permanent: true },
      { source: "/login-customizer", destination: "/", permanent: true },
      { source: "/login-customizer/", destination: "/", permanent: true },
      { source: "/public-individual-page", destination: "/", permanent: true },
      { source: "/public-individual-page/", destination: "/", permanent: true },
      { source: "/member-tos-page", destination: "/terms-of-service", permanent: true },
      { source: "/member-tos-page/", destination: "/terms-of-service", permanent: true },
      { source: "/member-logout", destination: "/", permanent: true },
      { source: "/member-logout/", destination: "/", permanent: true },
      { source: "/lost-password", destination: "/", permanent: true },
      { source: "/lost-password/", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
