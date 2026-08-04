# ToolPick AI（正式站）

线上地址：https://hexin1136.github.io/

英文 AI 工具站：首页交互式 **AI tool picker** + Phase-1 **12 篇** SEO 长文 + 信任页 + AdSense 占位。可推送到 GitHub，再用 Cloudflare Pages / GitHub Pages 部署。

## 本地预览

```bash
cd /data/data/ai-tools-site
python3 -m http.server 8080
```

浏览器打开 `http://localhost:8080`。

## 上线前必改

1. Contact/About/Privacy 邮箱已设为 bordenxin@gmail.com
2. 购买域名，把 `robots.txt` 与生成 sitemap 时的 `--base-url` 换成你的域名
3. About 页按需补上真实署名

## 部署（推荐 Cloudflare Pages）

1. 新建 GitHub 仓库，上传本目录全部文件  
2. Cloudflare Pages 连接该仓库，根目录即为站点根（含 `index.html`）  
3. 绑定自定义域名并开启 HTTPS  
4. [Google Search Console](https://search.google.com/search-console) 验证站点，提交 `sitemap.xml`

GitHub Pages 也可测试，但 AdSense 更建议用独立域名。

## 申请 AdSense 前检查

- [ ] 工具首页可用  
- [ ] 12 篇文章可打开，内容原创  
- [ ] About / Contact / Privacy / Disclaimer  
- [ ] Privacy 含 Google 广告/Cookie 说明，并链接 [partner-sites](https://policies.google.com/technologies/partner-sites)  
- [ ] 广告仅为占位（尚未填假的 pub ID）  
- [ ] `robots.txt` + `sitemap.xml`

## 通过 AdSense 之后

编辑 `js/ads.js`，设置：

```js
const ADSENSE_CLIENT = "ca-pub-xxxxxxxxxxxxxxxx";
```

再把各页 `.ad-placeholder` 换成真实广告单元；注意广告密度合规。

## 扩到 100 篇

见 `content-roadmap.md`。每批 10–15 篇，写完后执行：

```bash
python3 scripts/check_articles.py articles --min-words 800 --keywords articles/keywords.tsv
python3 scripts/build_sitemap.py . --base-url https://YOUR_DOMAIN
```

## 中文交接清单

1. 买域名并解析  
2. 推送仓库并开启 HTTPS  
3. 填写真实 Contact 邮箱与 About 署名  
4. Search Console 验证并提交 sitemap  
5. 用「工具 + 12 文」申请 AdSense  
6. 通过后在 `js/ads.js` 填入 client ID  
7. 按路线图分批扩到 100  

本站由 `ai-tools-adsense` Skill 流程生成；广告位在获批前仅为占位，站点未宣称已开通变现。
