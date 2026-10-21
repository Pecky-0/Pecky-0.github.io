# 网站内容维护

日常写文章、换图片、改介绍和歌单，只需修改本目录。`app`、`components`、`lib` 保留程序与页面布局，一般不用修改。

| 位置 | 用途 |
| --- | --- |
| `posts/*.md` | 博客正文，文件名就是文章网址中的标识 |
| `posts/日期/` | 博客配图，也可以自行新建图片文件夹 |
| `content/site.json` | 首页姓名、头像路径、站点地址、浏览器标题和站点描述 |
| `content/zh.json`、`content/en.json` | 中文和英文介绍、链接名称、界面文案 |
| `content/links.json` | 首页链接地址、所属分组及排列顺序 |
| `academic/data.json` | 学术介绍、论文、作者链接和教育经历 |
| `academic/paper/` | 论文配图 |
| `music/tracks.json` | 歌名、音频路径和制作人 |
| `music/` | 音频文件，优先使用体积较小的 MP3 |
| `head.jpg` | 现有头像，直接替换即可；首页与学术页共用此文件 |

## 发布文章

1. 在 `public/posts` 下新建 Markdown 文件，例如 `2026-10-21-01.md`。正文文件放在这一层，不要放进图片子文件夹。
2. 按下面的格式填写标题、日期、分类和正文。
3. 图片放到 `public/posts/2026-10-21/`，引用路径从 `/posts/` 开始，不写 `public`。

```markdown
---
title: "我的新文章"
date: "2026-10-21"
tags: ["随笔"]
---

这里开始写正文。

![图片说明](/posts/2026-10-21/01.jpg)
```

该文章网址为 `/blog/2026-10-21-01/`。发布后尽量不要改文件名，避免旧链接失效。日期决定文章和公告的顺序；第一个标签作为分类。公告自动生成，每页最多五条，无需手动登记。

新增分类时，可以在 `content/en.json` 的 `blog.typeLabels` 中添加翻译，例如 `"旅行": "travel"`，用于英文公告。文章标题和正文按原文展示，不会自动翻译。

## 修改介绍与链接

- 首页介绍：修改两份语言文件中的 `hero`。
- 链接名称与说明：修改两份语言文件中的 `linkItems`。
- 博客页标题：修改 `blog.displayTitle`。
- 页脚署名：修改 `footer.copyright`，保留 `{year}` 可自动显示当前年份。
- 两份语言文件中的 `skills`、`projects`、`about` 是预留文案，当前页面没有展示。

新增首页链接时，在 `content/links.json` 添加一条记录，再在两份语言文件的 `linkItems` 中添加相同的 `id`。例如：

```json
{"id":"drawing","url":"https://example.com","category":"hobby","icon":"palette"}
```

中文 `linkItems` 添加 `"drawing": {"name":"画作","desc":"我的绘画作品"}`，英文中添加相应英文文案。

`category` 只能是 `research`（研究）、`hobby`（爱好）、`social`（社交）；数组顺序决定同一分组内的显示顺序。`url` 留空表示仅展示、不跳转。常用图标有 `github`、`googlescholar`、`graduationcap`、`mail`、`pen`、`palette`、`music`、`gamepad`、`link`。

## 学术资料与音乐

`academic/data.json` 中，`profile` 是侧栏资料，`about` 是介绍段落，`publications` 是论文列表，`education` 是教育经历。介绍可用 `[文字](网址)` 添加链接。论文与教育列表清空为 `[]` 时，对应区块及导航入口会自动隐藏。

把新音频放入 `music/`，然后在 `music/tracks.json` 添加 `name`（歌名）、`src`（例如 `/music/4.mp3`）、`producer`（制作人）。列表顺序就是播放顺序，清空为 `[]` 会隐藏播放器。现有 WAV 原文件保留，播放器使用 MP3。

## 评论区（Waline）

配置位于 `content/comments.json`：`enabled` 控制显示，`serverURL` 是 Waline 服务根地址（不加 `/ui` 或 `/api`），`pageSize` 控制每页评论数，`labels` 修改中英文标题和提示。

`showSorting` 和 `showRss` 默认设为 `false`，分别隐藏排序选项和 RSS 订阅入口。评论默认按最新在前展示；如需恢复入口，将对应值改为 `true`。隐藏 RSS 入口不会关闭服务端的 RSS 接口。

当前服务地址为 `https://waline-ten-neon.vercel.app`。每篇文章按 `/blog/文件名/` 独立保存评论，因此发布后不要随意修改文章文件名。评论区随网站语言和主题切换，在接近文章底部时加载。

`requireLogin: true` 将前端设为登录后才能评论。还必须在 Vercel 的 Waline 项目中设置环境变量 `LOGIN=force` 并重新部署，服务端才会拒绝未登录的评论请求。若以后恢复游客评论，需要同时调整前端和服务端。第三方登录由 Waline 的 OAuth 认证服务管理，不在本网站配置密钥。

评论保存在 Waline 数据库里，不会写进 GitHub 仓库。请访问服务地址下的 `/ui/register` 注册管理员（首个注册用户是管理员），之后从 `/ui` 管理评论。数据库密码和服务密钥只放在 Vercel 环境变量中，不要放进 `public`。

若页面能打开但评论请求失败，请检查 Vercel 的数据库配置与日志，以及 Waline 的 `SECURE_DOMAINS` 是否允许 `pecky-0.github.io`。本地预览也需要服务端允许对应开发地址。修改服务端环境变量后重新部署 Waline。

参考：[Waline 官方快速上手](https://waline.js.org/guide/get-started/)、[原参考教程](https://www.cnblogs.com/kuangdaoyizhimei/p/17999097)。

## 保存与上线

JSON 文件使用双引号，不支持注释或末尾多余逗号；中英文内容分别维护。图片、音乐路径均从网站根目录开始，例如 `/head.jpg`，不用加 `public`。

这是静态网站：修改 Markdown 或 JSON 后需要重新构建。开发时可以从项目根目录运行 `npm run dev` 预览；推送到 GitHub 的 `main` 分支后，现有工作流会自动构建并发布。不要直接修改构建产物 `out`。

`public` 下的文件会公开发布，包括 Markdown 原文和 JSON 配置。未准备公开的草稿应放在此目录之外。
