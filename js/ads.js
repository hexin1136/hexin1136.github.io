/**
 * AdSense client for ToolPick AI (hexin1136.github.io).
 *
 * After AdSense approval:
 * 1) Easiest: turn on Auto ads in the AdSense dashboard (script below is enough).
 * 2) Or create Display units and paste their slot IDs into AD_UNITS.
 */
const ADSENSE_CLIENT = "ca-pub-4701600459609588";

/** Map data-ad-slot names on the page → AdSense ad unit slot IDs (digits only). */
const AD_UNITS = {
  top: "",
  "in-content": "",
  sidebar: "",
};

(function initAds() {
  if (!ADSENSE_CLIENT) return;

  if (!document.querySelector('script[src*="adsbygoogle.js"]')) {
    const s = document.createElement("script");
    s.async = true;
    s.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`;
    s.crossOrigin = "anonymous";
    document.head.appendChild(s);
  }

  const slots = document.querySelectorAll(".ad-slot[data-ad-slot]");
  slots.forEach((slotEl) => {
    const name = slotEl.getAttribute("data-ad-slot");
    const unitId = AD_UNITS[name];

    if (!unitId) {
      // Hide unfinished placeholders so the live site looks complete for visitors / review.
      slotEl.hidden = true;
      return;
    }

    slotEl.hidden = false;
    slotEl.classList.add("ad-slot--live");
    slotEl.innerHTML = "";

    const ins = document.createElement("ins");
    ins.className = "adsbygoogle";
    ins.style.display = "block";
    ins.setAttribute("data-ad-client", ADSENSE_CLIENT);
    ins.setAttribute("data-ad-slot", unitId);
    ins.setAttribute("data-ad-format", "auto");
    ins.setAttribute("data-full-width-responsive", "true");
    slotEl.appendChild(ins);

    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (_) {
      // Ad blockers or unloaded script should not break the page.
    }
  });
})();
