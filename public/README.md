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

## 保存与上线

JSON 文件使用双引号，不支持注释或末尾多余逗号；中英文内容分别维护。图片、音乐路径均从网站根目录开始，例如 `/head.jpg`，不用加 `public`。

这是静态网站：修改 Markdown 或 JSON 后需要重新构建。开发时可以从项目根目录运行 `npm run dev` 预览；推送到 GitHub 的 `main` 分支后，现有工作流会自动构建并发布。不要直接修改构建产物 `out`。

`public` 下的文件会公开发布，包括 Markdown 原文和 JSON 配置。未准备公开的草稿应放在此目录之外。
