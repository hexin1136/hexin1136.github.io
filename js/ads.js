/**
 * AdSense client for ToolPick AI (https://hexin1136.github.io/).
 * The publisher script in each page head associates the site.
 * This file does not inject visible ad units.
 * 改动原因：删除“先保留占位框”的说明。页面没有广告位标记时，这里也不会插入可见广告。
 */
const ADSENSE_CLIENT = "ca-pub-4701600459609588";

(function initAds() {
  if (!ADSENSE_CLIENT) return;
  // 改动原因：head 里已有站点关联脚本时不重复插入，避免同一发布商脚本加载两次。
  if (!document.querySelector('script[src*="adsbygoogle.js"]')) {
    const s = document.createElement("script");
    s.async = true;
    s.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`;
    s.crossOrigin = "anonymous";
    document.head.appendChild(s);
  }
})();
