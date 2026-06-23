import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

// Security headers applied to every route.
// CSP notes:
//   - script-src: 'unsafe-inline' is required for next-themes FOUC-prevention inline
//     script and Next.js hydration data scripts. 'unsafe-eval' is added only in
//     development for Next.js HMR fast refresh.
//   - style-src: 'unsafe-inline' is required for inline style props used throughout
//     the site (animations, video overlays, chart elements).
//   - font-src: 'self' only — fonts are downloaded at build time by next/font and
//     served from /_next/static/media/; no runtime connection to Google Fonts.
//   - img-src: data: covers Next.js image blur placeholders.
//   - A nonce-based CSP that removes 'unsafe-inline' from script-src would require
//     making every page dynamically rendered. Document as a future enhancement.
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()",
  },
  // 1-year HSTS. No includeSubDomains or preload until subdomain coverage is confirmed.
  {
    key: "Strict-Transport-Security",
    value: "max-age=31536000",
  },
  // Prevents our pages from being opened by cross-origin windows.
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  // Prevents cross-origin sites from loading our assets (images, video, fonts).
  { key: "Cross-Origin-Resource-Policy", value: "same-origin" },
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
      "style-src 'self' 'unsafe-inline'",
      "font-src 'self'",
      "img-src 'self' data:",
      "media-src 'self'",
      "connect-src 'self'",
      "worker-src 'none'",
      "frame-src 'none'",
      "frame-ancestors 'none'",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'none'",
      // Upgrade residual http:// sub-resource requests in production only.
      ...(isDev ? [] : ["upgrade-insecure-requests"]),
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },

  async redirects() {
    return [
      {
        source: "/resume",
        destination: "/experience",
        permanent: false,
      },
      {
        source: "/projects/healthcare-referral-analytics",
        destination: "/experience",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
