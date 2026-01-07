# Firebase Firestore 資料結構

## 總覽

專案使用 Firebase Firestore 儲存所有課程資料。

---

## Collection: `lessons`

每個課程是一個 Document，ID 格式：`lesson1`, `lesson2`, ... `lesson25`

---

## Document 結構範例

### lesson7 (完整範例)
```javascript
{
  // ━━━ 課程元資訊 ━━━
  "meta": {
    "title": "識字七：日常物品與購物",
    "title_en": "Daily Items and Shopping",
    "title_es": "Artículos diarios y compras",
    "order": 7,
    "component_count": 17,
    "target_count": 30
  },
  
  // ━━━ 部件區（學生先學形義，不強求發音）━━━
  "components": [
    {
      "character": "夬",
      "pinyin": "guài",
      "meaning": "to cut apart / separate decisively",
      "type": "component",
      
      // 部件拆解（選填，獨體字留空）
      "components_breakdown": "ユ (target) + 人 (person)",
      
      // 學習內容（支援 Markdown）
      "book_explanation": "A kind of hook used in archery...",
      "story": "A person is aiming at a tiny target...",
      "pronunciation_cue": "Sounds like **Gwhy**",
      
      // 圖片
      "image": "https://res.cloudinary.com/dxc8rcjuh/image/upload/v1765666631/%E5%A4%AC_qtxolq.png",
      
      // 其他
      "example": "COW needs a TOWEL"
    }
    // ... 共 17 個部件
  ],
  
  // ━━━ 目標字區（形音義都要記）━━━
  "target_characters": [
    {
      "character": "刚",
      "pinyin": "gāng",
      "meaning": "just / barely",
      "type": "target",
      
      // 部件拆解（選填）
      "components_breakdown": "冈 (ridge) + 刂 (knife)",
      
      // 學習內容（支援 Markdown）
      "book_explanation": "...",
      "story": "The spy on the ridge...",
      "pronunciation_cue": "Sounds like **Gong**",
      
      // 圖片
      "image": "https://...",
      
      // 詞組範例（目標字特有）
      "phrases": "刚才 gāngcái (just now), 刚好 gānghǎo (just right)",
      
      // 其他
      "example": "..."
    }
    // ... 共 30 個目標字
  ]
}
```

---

## 欄位說明

### 必填欄位
- `character` - 字
- `pinyin` - 拼音
- `meaning` - 意思（英文）
- `type` - 類型（`"component"` 或 `"target"`）

### 選填欄位
- `components_breakdown` - 部件拆解（獨體字可留空）
- `book_explanation` - 書本解釋（支援 Markdown）
- `story` - 記憶故事（支援 Markdown）
- `pronunciation_cue` - 發音提示（支援 Markdown）
- `image` - 圖片網址（Cloudinary）
- `phrases` - 詞組範例（通常只有目標字需要）
- `example` - 記憶例句

### Markdown 支援
在以下欄位可使用 Markdown 格式：
- `book_explanation`
- `story`
- `pronunciation_cue`

支援語法：
- `**粗體**` → **粗體**
- `*斜體*` → *斜體*
- `![](圖片網址)` → 插入圖片
- `![small](網址)` → 插入小圖（120px）
- `![large](網址)` → 插入大圖（800px）

---

## 圖片規範

### Cloudinary 基礎 URL
```
https://res.cloudinary.com/dxc8rcjuh/image/upload/
```

### 圖片尺寸建議
- 字的圖片：300px 左右
- 故事插圖（中）：400px
- 故事插圖（小）：120px
- PDF 截圖（大）：800px（最大寬度）

---

## 查詢範例

### 讀取單一課程
```javascript
db.collection('lessons').doc('lesson7').get()
  .then(doc => {
    const data = doc.data();
    console.log(data.components);  // 17 個部件
    console.log(data.target_characters);  // 30 個目標字
  });
```

### 讀取所有課程
```javascript
db.collection('lessons')
  .orderBy('meta.order')
  .get()
  .then(snapshot => {
    snapshot.forEach(doc => {
      console.log(doc.id, doc.data().meta.title);
    });
  });
```

### 篩選部件
```javascript
// 課程顯示頁面使用
const components = lessonData.components;
const targets = lessonData.target_characters;

// 分別渲染到不同區域
renderComponents(components);
renderTargets(targets);
```

### 複習系統使用
```javascript
// 部件複習（形義為主）
const componentCards = lessonData.components.map(c => ({
  char: c.character,
  pinyin: c.pinyin,
  meaning: c.meaning,
  story: c.story,
  img: c.image
}));

// 目標字複習（形音義）
const targetCards = lessonData.target_characters.map(c => ({
  char: c.character,
  pinyin: c.pinyin,
  meaning: c.meaning,
  story: c.story,
  img: c.image
}));
```

---

## 未來擴展

### 可能新增的欄位
- `audio` - 發音音檔網址
- `video` - 教學影片網址
- `stroke_order` - 筆順動畫
- `vocabulary` - 生詞表（陣列）
- `grammar` - 語法點（陣列）
- `exercises` - 練習題（陣列）

### 可能新增的 Collection
- `user_progress` - 學生學習記錄
- `vocabulary` - 獨立的生詞庫
- `exercises` - 練習題庫

---

## 版本記錄

- **v1.0** (2025-12-18): 初始結構設計
- 區分 components 和 target_characters
- 支援 Markdown 格式
- 圖片使用 Cloudinary