# Business Chinese (BCT) 課程網站

> ⏸ **狀態：已凍結（存档）** — 2026-07-29  
> 現行教材改為 **成功之路 · 进步篇**。全站架构与新增顺序见 [`../COURSES_ROADMAP.md`](../COURSES_ROADMAP.md)。

---

## 為何凍結？

- 实际教学改用《成功之路》，BCT 模板用不到
- Tab 结构与成功之路课本不合（缺 inline 生词／语法高亮、词语扩展等）
- 全站导航不再指向本目录

**本文件夹保留作参考**（navigation.js、tab 载入逻辑、design-system），不必删除。

---

## 項目信息

- 名稱：Business Chinese Test (BCT)
- 類型：中文商務課程教學平台
- 老師：Elisa
- 技術棧：HTML/CSS/JavaScript (無框架)

## 核心設計原則

- 簡體中文內容 + 英文導航
- 6 個 Tab：生词 | 语法 | 对话 | 短文 | 练习 | 补充
- 每個 Tab 可以有獨立的 HTML + CSS 樣式
- 響應式設計（手機/平板/電腦）s

## 資料夾結構

```
courses/bct/
├─ lessons/
│  ├─ lesson.html(入口)
│  ├─ lesson-1.html
│  ├─ lesson-2.html
│  └─ lesson-X.html
├─ tabs/
│  ├─ lesson-1-vocab.html
│  ├─ lesson-1-grammar.html
│  └─ ...
└─ assets/
   ├─ css/style.css
   └─ js/tabs.js
```

## 已實現功能

- ✅ lesson-1.html 和 lesson-2.html（含範例內容）
- ✅ L1 的 6 個 Tab
- ✅ 基本樣式和 Tab 切換邏輯

## 設計系統

- 主色：#0891b2（藍綠色）
- 字體：簡體中文字體 + Segoe UI 英文
- 響應式斷點：640px (手機), 768px (平板), 1024px (筆記)

## 旧待办（已取消）

以下项目随冻结一并停止维护：

- lessons.json 和下拉選單
- Tab 切換時插件重新掃描拼音
