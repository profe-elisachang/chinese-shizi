# 識字課程 Firebase 管理系統

中文學習平台，使用 Firebase 驅動的動態課程系統。

---

## 📋 專案簡介

面向初級中文學習者的識字教學網站，提供：
- 25 課系統化識字課程
- 部件學習 + 目標字教學
- 智能複習系統（Leitner 算法）
- 學生進度追蹤
- 後台課程管理

---

## 🛠️ 技術棧

- **前端**：原生 HTML/CSS/JavaScript
- **數據庫**：Firebase Firestore (compat CDN)
- **部署**：GitHub + Netlify
- **圖片託管**：Cloudinary
- **音頻**：本地/Cloudinary

---

## 📁 文件結構

```
chinese-with-elisa-firebase/
├── index.html                           # 網站首頁
├── firebase-config.json                 # Firebase 配置（勿提交）
│
├── courses/shizi/                       # 識字課程系列
│   ├── index.html                       # 課程列表
│   ├── lesson.html                      # 課程播放頁
│   ├── lesson-presentation.html         # 課程展示模板
│   ├── review.html                      # 複習系統
│   ├── admin.html                       # 後台管理
│   └── admin-student-progress.html      # 學生進度管理
│
└── assets/
    ├── css/
    │   ├── global.css                   # 全局樣式
    │   └── course.css                   # 課程頁樣式
    │
    └── js/
        ├── firebase-config.js           # Firebase 初始化
        └── lesson-functions.js          # 通用函數庫
```

---

## 🎯 核心功能

### 學生端
- ✅ 課程播放（部件 + 目標字）
- ✅ 互動式學習（圖片、拼音、音頻）
- ✅ 智能複習系統
- ✅ 學習進度自動保存

### 教師端
- ✅ 課程內容管理（CRUD）
- ✅ 學生進度查看
- ✅ 批量數據導入
- ⏳ 課堂即時添加生字（未來功能）

---

## 🚀 快速開始

### 1. 克隆專案
```bash
git clone [repository-url]
cd chinese-with-elisa-firebase
```

### 2. 配置 Firebase
1. 複製 `firebase-config.json.example` 為 `firebase-config.json`
2. 填入你的 Firebase 配置
3. 確保 `.gitignore` 包含 `firebase-config.json`

### 3. 啟動本地服務器
```bash
# 使用 Python
python -m http.server 8000

# 或使用 VS Code Live Server
# 右鍵點擊 index.html → Open with Live Server
```

### 4. 訪問
- 首頁：`http://localhost:8000`
- 後台：`http://localhost:8000/courses/shizi/admin.html`

---

## 📊 數據結構

### Firestore Collections

#### `lessons`
```javascript
{
  // Document ID: lesson1, lesson2, ..., lesson25
  components: [
    {
      character: "木",
      pinyin: "mù",
      meaning: "wood, tree",
      image_url: "https://...",
      audio_url: "https://..."
    }
  ],
  target_characters: [
    {
      character: "树",
      pinyin: "shù",
      meaning: "tree",
      image_url: "https://...",
      audio_url: "https://..."
    }
  ],
  vocabulary: [...],
  phrases: [...],
  grammar: [...],
  exercises: [...]
}
```

#### `student_progress`
```javascript
{
  // Document ID: student email
  lesson1: {
    completed: true,
    lastStudied: timestamp,
    reviewCards: [...]
  }
}
```

---

## 🎨 設計風格

- **配色**：藍綠色系（#4A90E2, #50C878）
- **風格**：清新、專業、教育友善
- **原則**：簡潔、響應式、無障礙

---

## 📝 常見操作

### 添加新課程
1. 打開 `admin.html`
2. 選擇 "Add New Lesson"
3. 填寫課程編號和內容
4. 點擊 "Save"

### 編輯現有課程
1. 打開 `admin.html`
2. 從下拉選單選擇課程
3. 點擊 "Load Lesson"
4. 修改後點擊 "Update"

### 查看學生進度
1. 打開 `admin-student-progress.html`
2. 輸入學生 email
3. 查看各課程完成狀態

---

## 🔒 安全注意事項

- ⚠️ **切勿提交** `firebase-config.json` 到 Git
- 🔐 使用 Firebase Security Rules 限制寫入權限
- 👤 考慮添加身份驗證（未來）

---

## 📈 開發狀態

- ✅ Phase 1: 數據結構設計
- ✅ Phase 2: 後台管理系統
- ✅ Phase 3: 前端課程播放
- ⏳ Phase 4: UI/UX 優化（進行中）
- 📋 Phase 5: 複習系統增強（規劃中）

詳細開發記錄請查看 [CHANGELOG.md](./CHANGELOG.md)

---

## 🤝 貢獻

這是個人教學專案，目前不接受外部貢獻。

---

## 📄 授權

© 2025 Chinese with Elisa. All rights reserved.