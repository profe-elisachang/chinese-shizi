# 課程架構與工作流程

> 本文件整理 `courses/` 底下各套教材的定位、目錄結構與新增順序。  
> 最後更新：2026-07-29

---

## 一、三層結構（先記這個）

```
網站 Chinese with Elisa
│
├── 教材系列（例如：成功之路、識字、BCT）
│   │
│   ├── 書／册（例如：进步篇 上册）     ← 成功之路共 22 本，目前只做 3 本
│   │   │
│   │   └── 課（每本通常 12 課）        ← 进步篇 3 本 = 36 課
│   │
│   └── …
└── …
```

**原則：**

- 每套教材 **技術可以不同**（靜態 HTML vs Firestore），但 **入口與導航** 要讓學生找得到。
- **不要** 為成功之路 22 本書預先建立空資料夾；只做正在寫的那几本。
- 36 課建議按 **「書 → 課」** 組織（例如「进步篇 上册 第 3 課」），不要一開始做成全站 L1–L36 扁平編號。

---

## 二、目前各套教材狀態

| 教材 | 資料夾 | 狀態 | 技術 |
|------|--------|------|------|
| **成功之路 · 进步篇** | 試作：`courses/Anni diary lesson.HTML` | 🚧 進行中（L1 試做） | 單檔 HTML + 內嵌 CSS/JS |
| **識字** | `courses/shizi/` | ✅ 正式使用 | Firestore + Admin |
| **BCT 商務中文** | `courses/bct/` | ⏸ 已凍結（存档） | lesson + 外部 tab 檔 |

### BCT 為何凍結？

- Tab 結構（生词｜语法｜对话｜短文｜练习｜补充）與成功之路課本結構不合。
- 缺少成功之路需要的 inline 生词／语法高亮、词语扩展等互動。
- 36 課若用 BCT 模式 ≈ 216 個 tab 檔，維護成本過高。
- 詳見 [`bct/PROJECT_CONTEXT.md`](./bct/PROJECT_CONTEXT.md)。

### 成功之路課本結構（固定）

每課通常包含：

- 课文
- 生词
- 词语扩展
- 语言点注释
- 练习（词语练习｜语法练习｜综合练习｜表达训练）
- 阅读

試作檔 `Anni diary lesson.HTML` 目前已實作：阅读｜词语扩展｜语言点提示；**练习區尚未完成**。

---

## 三、建議目錄結構

### 3.1 現在（試做階段）— 維持簡單

```
courses/
├── COURSES_ROADMAP.md          ← 本文件
├── Anni diary lesson.HTML      ← L1 試作（暂定，勿拆 assets）
├── shizi/                      ← 識字（不动）
└── bct/                        ← 存档（不从导航进入）
```

**此階段不做：**

- 不建立 `road-to-success/assets/`（等内容定稿再抽共用 CSS/JS）
- 不建立全站 `registry.js`（半年内只有一套新课）
- 不做 `courses/index.html` 卡片页

### 3.2 近期目標（进步篇 36 課定稿後）

```
courses/
├── COURSES_ROADMAP.md
├── road-to-success/
│   ├── index.html              ← 进步篇入口（上册｜中册｜下册）
│   ├── assets/                 ← ⚠️ 等内容定稿后再从 Anni 抽出
│   │   ├── lesson.css
│   │   └── lesson.js
│   ├── books/
│   │   ├── jinbu-1/            ← 进步篇 上册
│   │   │   ├── book.json       ← 书名、课数、是否发布
│   │   │   └── lessons/
│   │   │       ├── 01.html
│   │   │       └── …（共 12 课）
│   │   ├── jinbu-2/            ← 中册（有内容再建）
│   │   └── jinbu-3/            ← 下册
│   └── 新增課程工作流程.md
├── shizi/
└── bct/                        ← 存档
```

### 3.3 远期（多套教材、22 本书部分上线）

```
courses/
├── COURSES_ROADMAP.md
├── registry.js                 ← 全站课程目录（见第四节）
├── index.html                  ← 教材卡片页（选项多了再做）
├── road-to-success/
│   └── books/
│       ├── jinbu-1/ … jinbu-3/   ← 目前范围
│       ├── gao-1/ …              ← 日后其他篇，需要时再建
│       └── …
├── shizi/
├── bct/                        ← 存档
└── （未来其他系列）/
```

**URL 示例（定稿后）：**

```
/courses/road-to-success/books/jinbu-1/lessons/01.html
/courses/road-to-success/books/jinbu-2/lessons/05.html
```

**内部 ID 示例：** `rts-jinbu1-l01`（rts = road to success）

---

## 四、全站注册表是什么？（何时需要）

**白话：** 一份「网站上有哪些课程、叫什么名字、链接到哪里」的清单文件。

| 没有注册表 | 有注册表 |
|-----------|----------|
| 导航链接写死在每个 HTML | 导航读清单，自动生成下拉选项 |
| 加一套课要改很多页面 | 多数只改清单一处 |

**类比：** 菜单。厨房是实际 HTML 课程档；菜单告诉客人今天有哪些菜。

**识字已有类似做法：** `shizi/courses-config.js`（识字 25 课、HSK2 15 课等）。

**你现在需要吗？**  
半年内只有成功之路进步篇 → **不必马上建**。等以下情况再考虑：

- 要加第二套教材
- 进步篇要正式分三册、36 课导航
- 改导航发现要动太多 HTML、容易漏改

---

## 五、导航改法（现阶段）

**现在：** 顶栏 `Lessons` 指向 BCT（不合适，应改掉）

**建议（半年内够用）：**

```
Home | Courses ▾ | Literacy | Review Lit. | Grammar | …
              └── 成功之路 · 进步篇  →  Anni 试作或日后入口
```

- 识字维持独立链接，不必并进 Courses 下拉。
- **暂不做** 卡片页；选项变多（4–5 个）再考虑 `courses/index.html`。
- BCT 从主导航移除，文件夹保留作参考。

**需更新的页面（改导航时）：**  
`index.html`、`pages/grammar.html`、`pages/extras.html`、`pages/mini-story.html`、`pages/music.html`、`pages/timeline.html`，以及 `courses/shizi/` 内相关页面。

---

## 六、新增课程的标准顺序

### 阶段 A：试做单课（你现在）

1. 课本截图 → AI 生成结构化内容
2. 维护在单档 `Anni diary lesson.HTML`（或复制为 `lesson-02.html` 等）
3. 验证：课文标记、生词表、词语扩展、语言点、朗读、投影模式
4. **补完练习 tab 模板**（词语｜语法｜综合｜表达训练）

### 阶段 B：进步篇 上册 12 课

1. 确认 L1 模板定稿（含练习区）
2. 建立 `courses/road-to-success/books/jinbu-1/lessons/`
3. 每课一个 HTML（或先继续单档，再迁入）
4. 建立极简 `road-to-success/index.html`（上册课次列表）
5. 导航 `Courses ▾` 指向进步篇入口

### 阶段 C：内容定稿 → 抽共用 assets

1. 从 Anni 抽出 `lesson.css`、`lesson.js`
2. 每课只保留：课文 HTML + `VOCAB` / `GRAMMAR` / `EXT` / 练习数据
3. 更新 [`road-to-success/新增課程工作流程.md`](./road-to-success/新增課程工作流程.md)（阶段 C 时创建）

### 阶段 D：中册、下册

1. 复制 `jinbu-1/` 结构 → `jinbu-2/`、`jinbu-3/`
2. 每本 12 课，共 36 课
3. `index.html` 加三册切换

### 阶段 E：第二套教材或成功之路其他篇（半年后+）

1. 新建 `courses/另一系列/`
2. 建立 `courses/registry.js`
3. 导航改卡片页或扩展 Courses 下拉

---

## 七、不同教材类型对照

| 类型 | 示例 | 做法 |
|------|------|------|
| 静态课文型 | 成功之路 | Anni 模板 + 静态 HTML |
| 字卡／进度型 | 识字、HSK2 | Firestore + 现有 admin |
| 已暂停 | BCT | 存档，不删 |
| 轻量补充 | 词汇游戏等 | `courses/` 或 `pages/extras` |

**同一网站、多套材料，每套可以有自己的引擎；用导航（日后 registry）统一入口即可。**

---

## 八、下一步建议（按优先级）

| 优先级 | 任务 | 说明 |
|--------|------|------|
| 1 | **定稿 L1 内容** | 补练习 tab；确认 Anni 模板可复用到 L2 |
| 2 | **改全站导航** | `Lessons` → `Courses ▾` → 成功之路 · 进步篇 |
| 3 | **做 L2–L3 试产** | 验证 AI 截图 → HTML 流程是否顺畅 |
| 4 | **上册 12 课** | 再建 `road-to-success/` 目录结构 |
| 5 | **抽 assets** | 等内容稳定后再做，避免反复改三处 |
| 6 | **registry / 卡片页** | 有第二套教材时再考虑 |

---

## 九、相关文件

| 文件 | 用途 |
|------|------|
| 本文件 `COURSES_ROADMAP.md` | 全站课程架构总览 |
| `bct/PROJECT_CONTEXT.md` | BCT 存档说明 |
| `bct/新增課程工作流程.md` | BCT 旧流程（已停用，仅参考） |
| `shizi/structure.md` | 识字 Firestore 规格 |
| `shizi/courses-config.js` | 识字／HSK2 课程配置范例 |
| `road-to-success/lessons/lesson-01.html` | 成功之路 L1 |

---

## 十、决策记录（2026-07-29）

- ✅ 成功之路采用 Anni 单页互动模板，不沿用 BCT 多 tab 架构
- ✅ BCT 冻结存档，不从主导航进入
- ✅ 半年内专注进步篇 3 册 36 课；不预先为 22 本书建空壳
- ✅ 导航暂用下拉选单，不做卡片页
- ✅ 全站导航 `Courses ▾` → 成功之路 · 进步篇（2026-07-29）
- ⏸ 全站 registry、共用 assets：等内容定稿后再做
