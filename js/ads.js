/**
 * AdSense client for ToolPick AI (hexin1136.github.io).
 * Site verification + future ad units use this publisher ID.
 */
const ADSENSE_CLIENT = "ca-pub-4701600459609588";

(function initAds() {
  if (!ADSENSE_CLIENT) return;
  // Script is also embedded in <head> for AdSense site verification.
  // Keep placeholders until you create ad units in AdSense and replace .ad-placeholder nodes.
  if (!document.querySelector('script[src*="adsbygoogle.js"]')) {
    const s = document.createElement("script");
    s.async = true;
    s.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`;
    s.crossOrigin = "anonymous";
    document.head.appendChild(s);
  }
})();
