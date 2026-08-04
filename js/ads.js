/**
 * AdSense loader — placeholders only until you set ADSENSE_CLIENT after approval.
 * Example: const ADSENSE_CLIENT = "ca-pub-xxxxxxxxxxxxxxxx";
 */
const ADSENSE_CLIENT = "";

(function initAds() {
  if (!ADSENSE_CLIENT) {
    // Keep labeled placeholders visible for layout and AdSense review prep.
    return;
  }
  // After approval: load the AdSense script and replace .ad-placeholder nodes
  // with your real ad units. Do not invent a publisher ID before then.
  const s = document.createElement("script");
  s.async = true;
  s.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`;
  s.crossOrigin = "anonymous";
  document.head.appendChild(s);
})();
