# ToolPick AI（正式站）

线上地址：https://hexin1136.github.io/

英文 AI 工具站：首页交互式 **AI tool picker** + Phase-1 **12 篇** SEO 长文 + 信任页 + AdSense 接入。

## 本地预览

```bash
python3 -m http.server 8080
```

浏览器打开 `http://localhost:8080`。

## 赚钱协作路线（当前重点）

目标：用 AdSense（+ 后续联盟）把流量变成收入。

### 已完成（站点侧）

- [x] 发布商 ID：`ca-pub-4701600459609588`
- [x] `ads.txt` + `.nojekyll`
- [x] 全站加载 AdSense 脚本（支持后台开启 Auto ads）
- [x] `js/ads.js`：填入广告单元 ID 后自动渲染；未配置时隐藏占位，避免站点显得未完工
- [x] Contact / About / Privacy / Disclaimer
- [x] 12 篇英文长文（质量检查通过）

### 你需要做的（账号侧，必须）

1. 打开 [AdSense](https://www.google.com/adsense/)，确认站点审核状态  
2. **已通过**：在后台开启 **Auto ads**（最快出收益），或创建 Display 广告单元  
3. 若创建了单元，把三个 slot ID 发给我（或自己填进 `js/ads.js` 的 `AD_UNITS`）：  
   - `top`  
   - `in-content`  
   - `sidebar`  
4. 填好收款 / 税务信息，否则有展示也提不了现  
5. **强烈建议**：买独立域名并绑到 GitHub Pages / Cloudflare（AdSense 对 `*.github.io` 常更严）

### 填广告单元示例

编辑 `js/ads.js`：

```js
const AD_UNITS = {
  top: "1234567890",
  "in-content": "2345678901",
  sidebar: "3456789012",
};
```

## 扩内容（提高流量）

见 `content-roadmap.md`。每批 10–15 篇后：

```bash
python3 scripts/check_articles.py articles --min-words 800 --keywords articles/keywords.tsv
python3 scripts/build_sitemap.py . --base-url https://hexin1136.github.io
```

有独立域名后，把 `--base-url` 换成你的域名，并同步改 `robots.txt` / canonical。

## 部署提示

- GitHub Pages 已可测  
- AdSense 更稳的做法：Cloudflare Pages + 自定义域名 + HTTPS  
- Search Console 验证并提交 `sitemap.xml`
