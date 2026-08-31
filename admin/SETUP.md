# 內容管理後台 — 設定指南

後台網址（部署後）：

```
https://profe-elisachang.github.io/chinese-shizi/admin/
```

---

## 你會得到什麼

1. 打開 `/admin/`，用 GitHub 登入
2. 選「成功之路 · 课程」→ 新增或編輯
3. 填前台名稱、檔名、册別、課次、HTML 全文 → 按 **Publish**
4. Decap CMS 自動 commit 到 GitHub
5. GitHub Pages 重新部署（約 1–2 分鐘）
6. GitHub Action 自動更新 `list.json`
7. 學生端 [成功之路 index](../courses/road-to-success/index.html) 自動出現連結

**不需要 Firestore，不需要手動改 index.html。**

---

## 第一次使用：設定 GitHub OAuth（約 15 分鐘）

Decap CMS 需要透過 GitHub 帳號寫入 repo。  
因為網站托管在 **GitHub Pages**（不是 Netlify），需要一個 OAuth 代理。

### 推薦方式：Netlify 免費 OAuth 代理（只拿來登入，不用 Netlify 托管網站）

#### 步驟 1：建立 GitHub OAuth App

1. 前往 GitHub → **Settings** → **Developer settings** → **OAuth Apps** → **New OAuth App**
2. 填寫：
   - **Application name**：`Chinese with Elisa CMS`
   - **Homepage URL**：`https://profe-elisachang.github.io/chinese-shizi/`
   - **Authorization callback URL**：`https://api.netlify.com/auth/done`
3. 建立後記下 **Client ID** 和 **Client Secret**

#### 步驟 2：在 Netlify 設定 OAuth Provider（免費帳號即可）

1. 登入 [Netlify](https://app.netlify.com/)
2. 隨便建立一個空 site（可以連到同一個 GitHub repo，**不用用它部署**）
3. 進入該 site → **Site configuration** → **Access & security** → **OAuth**
4. 點 **Install provider** → 選 **GitHub**
5. 貼上步驟 1 的 Client ID 和 Client Secret → Save

> 這個 Netlify site 只負責 OAuth 登入，你的網站仍由 GitHub Pages 托管。

#### 步驟 3：確認 repo 權限

你的 GitHub 帳號必須對 `profe-elisachang/chinese-shizi` 有 **write** 權限。

#### 步驟 4：測試

1. Push 本專案到 GitHub（若尚未 push `admin/` 資料夾）
2. 開啟 `https://profe-elisachang.github.io/chinese-shizi/admin/`
3. 點 **Login with GitHub**
4. 授權後應能看到「成功之路 · 课程」等 collection

---

## 每週新增一課（操作流程）

1. 開啟 `/admin/`
2. 左側選 **成功之路 · 课程** → **New 课程**
3. 填寫：

| 欄位 | 範例 |
|------|------|
| 前台名称 | 马丁看中医 |
| 文件名 | `lesson-02` |
| 册别 | 进步篇 一 |
| 课次 | 2 |
| 发布 | ✅ |
| HTML 内容 | 整份貼上（可含 `<!DOCTYPE html>`） |

4. 按 **Publish**
5. 等 1–3 分鐘（GitHub Pages + Action 同步 list.json）
6. 重新整理成功之路 index，新連結會出現

---

## 檔案結構說明

```
admin/
├── index.html          ← 後台入口
├── config.yml          ← Decap CMS 設定
└── SETUP.md            ← 本文件

courses/road-to-success/
├── list.json           ← 自動產生，請勿手動改
├── index.html          ← 讀 list.json 動態顯示
└── lessons/
    └── lesson-02.html  ← 含 <!-- metadata --> + HTML 正文

scripts/sync-content-lists.js   ← 掃描 HTML → 更新 list.json
.github/workflows/sync-content-lists.yml  ← push 後自動執行
```

每個 lesson HTML 開頭會有 metadata 註解（由後台自動寫入）：

```html
<!--
title: 马丁看中医
book: jinbu-1
lessonNum: 2
published: true
tags: "课文 · 词语扩展 · 语言点"
-->
<!DOCTYPE html>
...
```

---

## Grammar / Extras / Mini Story

後台已包含這三個 collection，操作方式相同：

- 填 **前台名称**、**文件名**、貼 **HTML**
- Publish 後 GitHub Action 會更新對應的 `list.json`
- 前台 `grammar.html` / `extras.html` / `mini-story.html` 會自動顯示新連結

舊有 HTML 檔沒有 metadata 註解也能正常顯示（標題從 `<h1>` 讀取）。  
第一次用後台編輯某篇舊文時，會自動加上 metadata。

---

## 常見問題

### 登入後顯示 "Repo not found"

- 確認 `admin/config.yml` 的 `repo` 是 `profe-elisachang/chinese-shizi`
- 確認 GitHub 帳號有 repo 寫入權限

### Publish 成功但 index 沒有新連結

- 等 GitHub Action 跑完（Repo → **Actions** → Sync content list.json）
- 確認 **发布** 有勾選
- 硬重新整理瀏覽器（Ctrl+Shift+R）

### 草稿（不發布）

取消 **发布** 勾選 → 該課不會出現在 `list.json` 與前台 index。

---

## 替代方案：Cloudflare Worker OAuth

若不想用 Netlify 帳號，可自建 OAuth 代理：

- [decap-cms-github-oauth-provider-cloudflare](https://github.com/ottmartens/decap-cms-github-oauth-provider-cloudflare)

部署後在 `admin/config.yml` 的 `backend` 加上：

```yaml
backend:
  name: github
  repo: profe-elisachang/chinese-shizi
  branch: main
  base_url: https://你的-worker-url.workers.dev
  auth_endpoint: auth
```
