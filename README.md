# ToolPick AI

线上地址：https://hexin1136.github.io/

英文 AI 工具站：首页交互式 **AI tool picker**，12 篇原创英文指南，以及 About、Contact、Privacy、Disclaimer。正式地址就是这个 GitHub Pages 根站点，当前不使用自定义域名。

## 本地预览

```bash
python3 -m http.server 8080
```

浏览器打开 `http://localhost:8080`。

## 部署

本仓库的 GitHub Pages 发布到 https://hexin1136.github.io/ 。合并到 `main` 后等待 Pages 更新。

[Google Search Console](https://search.google.com/search-console) 使用仓库中的 `googlee6f9c954ea322ad3.html`。Sitemap 为 `https://hexin1136.github.io/sitemap.xml`，`robots.txt` 已指向它。

## 保留的验证文件

- `ads.txt` 与各页 `<head>` 中的 AdSense 脚本（`ca-pub-4701600459609588`）用于站点授权，不要删。
- 页面上不显示广告占位框。在 AdSense 后台创建真实广告单元之前，不要往 HTML 里加可见广告位。
- 联系邮箱：bordenxin@gmail.com

## 检查内容

```bash
python3 scripts/check_articles.py articles --min-words 800
python3 scripts/build_sitemap.py . --base-url https://hexin1136.github.io
```

以后增加指南时，只发布完整原创文章，写完再重新生成 sitemap。选题备忘见 `content-roadmap.md`。

`https://hexin1136.github.io/toolpick-ai/` 是同站的重复副本（仓库 [toolpick-ai](https://github.com/hexin1136/toolpick-ai)）。那份副本应 noindex，并指向本站对应的绝对地址，不要把它当成第二套正文。
