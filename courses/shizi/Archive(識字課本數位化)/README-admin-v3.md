# 🎓 Admin.html v3 使用指南

## 📋 版本信息

**版本**：v3.0  
**发布日期**：2025-12-20  
**适用范围**：识字课程 1-25

---

## 🆕 v3 新增功能

### 核心升级
- ✅ **批量导入所有课程** - 一次性导入识字 9-25 (17 课)
- ✅ **统一 CSV 格式** - 生词、词组、语法、练习统一管理
- ✅ **智能数据分组** - 自动按课程和类型分类
- ✅ **实时导入进度** - 显示每课导入状态和日志
- ✅ **完整保留原有功能** - 部件/目标字管理完全不变

### 界面改进
- ✅ 新增第三个页面：🚀 批量导入所有课程
- ✅ 统一设计系统（CSS 变量）
- ✅ 版本号显示（v3.0）
- ✅ 响应式设计优化

---

## 📚 三大功能模块

### 模块 1：📝 字卡管理（原有功能）

**用途**：单个添加/编辑部件和目标字

**操作步骤**：
1. 选择课程（lesson 1-25）
2. 选择类型（部件 / 目标字）
3. 填写必填字段：
   - 字
   - 拼音
   - 意思（英文）
4. 填写选填字段：
   - 部件拆解
   - 书本解释（支持 Markdown）
   - 记忆故事（支持 Markdown）
   - 发音提示（支持 Markdown）
   - 图片网址
   - 词组范例
   - 记忆例句
5. 点击"新增字卡"
6. 右侧预览已添加的字卡
7. 点击"保存到 Firebase"

**特色功能**：
- 🖼️ Cloudinary 图片上传
- ✏️ 编辑已添加的字卡
- 🗑️ 删除字卡
- 📊 实时显示字卡数量

---

### 模块 2：📊 CSV 批量导入（原有功能）

**用途**：批量导入单课的部件或目标字

**CSV 格式**：
```csv
character,pinyin,meaning,components_breakdown,book_explanation,story,pronunciation_cue,phrases,image,example
夬,guài,cut apart / separate,ユ + 人,,,,,,https://example.com/image.png,COW needs TOWEL
```

**操作步骤**：
1. 点击"下载空白模板"
2. 用 Excel 打开模板
3. 填写数据（前三列必填）
4. 保存为 CSV 格式
5. 拖曳或点击上传 CSV
6. 预览数据（检查错误）
7. 选择课程（lesson 1-25）
8. 选择导入类型（部件 / 目标字）
9. 选择导入模式（覆盖 / 合并）
10. 点击"开始导入"

**注意事项**：
- ✅ 必填字段：character, pinyin, meaning
- ✅ 选填字段可留空
- ✅ 覆盖模式会完全替换现有数据
- ✅ 合并模式会追加到现有数据

---

### 模块 3：🚀 批量导入所有课程（新功能）⭐

**用途**：一次性导入识字 9-25 的生词、词组、语法、练习

**统一 CSV 格式**：
```csv
lesson_id,type,subtype,content,answer,options,notes
9,vocabulary,word,林|lín|forest surname,,,
9,phrases,phrase,国家|guójiā|country,,,
9,grammar,rule,语气助词"呢"的一个用法...,,,
9,exercises,fill_blank,你_A_妈妈_B_不喜欢喝茶_C_，教你的老师_D_？,D,呢,
10,vocabulary,word,第一个字|...|...,,,
...
25,exercises,multiple_choice,最后一题,C,A.X|B.Y|C.Z|D.W,
```

**字段说明**：

| 字段 | 必填 | 说明 | 示例 |
|------|------|------|------|
| lesson_id | ✅ | 课程编号（9-25） | 9 |
| type | ✅ | 内容类型 | vocabulary, phrases, grammar, exercises |
| subtype | ✅ | 子类型 | word, phrase, dialogue, rule, example, fill_blank, multiple_choice |
| content | ✅ | 主要内容（用 \| 分隔） | 林\|lín\|forest surname |
| answer | ❌ | 答案（练习题用） | D |
| options | ❌ | 选项（选择题用，用 \| 分隔） | A.十\|B.十一\|C.五\|D.六 |
| notes | ❌ | 备注 | 位置AD |

**内容类型详解**：

#### 1. vocabulary（生词）
```csv
lesson_id,type,subtype,content,answer,options,notes
9,vocabulary,word,林|lín|forest surname,,,
9,vocabulary,word,叔|shū|uncle,,,叔叔 shūshu
```
- content 格式：`字|拼音|意思`
- notes 可填常用词组

#### 2. phrases（词组）
```csv
lesson_id,type,subtype,content,answer,options,notes
9,phrases,phrase,国家|guójiā|country,,,
9,phrases,phrase,作家|zuòjiā|writer,,,
```
- content 格式：`中文词组|拼音|英文意思`

#### 3. phrases - dialogue（对话）
```csv
lesson_id,type,subtype,content,answer,options,notes
9,phrases,dialogue,小张，杂志多少钱一本？ | 十二块五一本。,,,对话一
```
- content 格式：`问句 | 答句`
- notes 标注对话编号

#### 4. grammar（语法）
```csv
lesson_id,type,subtype,content,answer,options,notes
9,grammar,rule,语气助词"呢"的一个用法是表示疑问语气，常用在代词或名词后。,,,
9,grammar,example,我姨自行车去，你呢？,,,
```
- subtype: `rule`（规则）或 `example`（例句）
- content: 直接填写语法说明或例句

#### 5. exercises（练习）
```csv
lesson_id,type,subtype,content,answer,options,notes
9,exercises,fill_blank,你_A_妈妈_B_不喜欢喝茶_C_，教你的老师_D_？,D,呢,
9,exercises,multiple_choice,他从去年九月到今年二月在北京学汉语，一共学了______个月。,C,A.十|B.十一|C.五|D.六,
```
- **填空题**：
  - subtype: `fill_blank`
  - content: 题目（用 _A_ _B_ _C_ _D_ 标记填空位置）
  - answer: 正确答案位置（A, B, C, D 或 在）
  - options: 填入的词
  
- **选择题**：
  - subtype: `multiple_choice`
  - content: 题目
  - answer: 正确答案（A, B, C, D）
  - options: 选项（用 | 分隔）

**操作步骤**：

1. **准备 CSV**
   - 点击"下载统一模板"
   - 用 Excel 打开
   - 按格式填写 17 课的所有内容
   - 保存为 CSV 格式（UTF-8 编码）

2. **上传 CSV**
   - 拖曳或点击上传 CSV
   - 等待解析（可能需要几秒）

3. **预览统计**
   - 查看导入摘要：
     - 课程数（应为 17）
     - 总行数
     - 有效资料
     - 错误资料
   - 检查各课程统计：
     - 每课的行数
     - 生词/词组/语法/练习数量

4. **开始导入**
   - 点击"开始批量导入"
   - 确认提示框
   - 观看实时进度：
     - 进度条显示完成百分比
     - 日志显示每课导入状态
   - 等待完成（17 课约需 10-20 秒）

5. **验证结果**
   - 刷新页面
   - 到前端 lesson.html 查看课程内容
   - 检查数据是否正确

**常见错误**：

| 错误信息 | 原因 | 解决方法 |
|---------|------|---------|
| 缺少必填欄位 | CSV 某行缺少必填字段 | 检查 lesson_id, type, subtype, content 是否都有 |
| lesson_id 必須在 9-25 之間 | 课程编号超出范围 | 改为 9-25 之间的数字 |
| type 必須是... | 类型拼写错误 | 只能用 vocabulary, phrases, grammar, exercises |

---

## 🔧 Firebase 数据结构

### 单课数据结构（lesson9 示例）

```javascript
{
  // 原有字卡数据（模块1和2添加）
  components: [
    {
      character: "夬",
      pinyin: "guài",
      meaning: "to cut apart",
      type: "component",
      // ... 其他字段
    }
  ],
  target_characters: [
    {
      character: "刚",
      pinyin: "gāng",
      meaning: "just",
      type: "target",
      // ... 其他字段
    }
  ],
  
  // 新增课程内容（模块3添加）
  vocabulary: [
    {
      lesson_id: "9",
      type: "vocabulary",
      subtype: "word",
      content: "林|lín|forest surname",
      answer: "",
      options: "",
      notes: ""
    },
    // ... 更多生词
  ],
  phrases: [
    {
      lesson_id: "9",
      type: "phrases",
      subtype: "phrase",
      content: "国家|guójiā|country",
      // ...
    },
    // ... 更多词组
  ],
  grammar: [
    {
      lesson_id: "9",
      type: "grammar",
      subtype: "rule",
      content: "语气助词"呢"的一个用法...",
      // ...
    },
    // ... 更多语法
  ],
  exercises: [
    {
      lesson_id: "9",
      type: "exercises",
      subtype: "fill_blank",
      content: "你_A_妈妈_B_不喜欢喝茶_C_，教你的老师_D_？",
      answer: "D",
      options: "呢",
      notes: ""
    },
    // ... 更多练习
  ],
  
  // 元数据
  meta: {
    component_count: 17,
    target_count: 30,
    vocabulary_count: 30,
    phrases_count: 41,
    grammar_count: 16,
    exercises_count: 7,
    last_updated: Timestamp
  }
}
```

---

## ✅ 测试流程

### 步骤 1：备份旧版

```bash
# 重命名旧版
admin.html → admin-v2-backup.html
```

### 步骤 2：部署新版

```bash
# 上传新版
admin-v3.html → admin.html
```

### 步骤 3：测试原有功能

1. **测试字卡管理**
   - ✅ 选择课程
   - ✅ 新增部件
   - ✅ 新增目标字
   - ✅ 编辑字卡
   - ✅ 删除字卡
   - ✅ 保存到 Firebase
   - ✅ 刷新后数据仍在

2. **测试 CSV 批量导入**
   - ✅ 下载模板
   - ✅ 填写数据
   - ✅ 上传 CSV
   - ✅ 预览数据
   - ✅ 选择课程和类型
   - ✅ 导入成功

### 步骤 4：测试新功能

1. **测试批量导入**
   - ✅ 下载统一模板
   - ✅ 使用 lesson9-unified-sample.csv 测试
   - ✅ 上传 CSV
   - ✅ 查看统计（应显示识字9有72行）
   - ✅ 开始导入
   - ✅ 观察进度条和日志
   - ✅ 导入成功
   - ✅ 到 lesson.html?id=lesson9 验证数据

### 步骤 5：验证数据完整性

```javascript
// 在浏览器 Console 执行
db.collection('lessons').doc('lesson9').get().then(doc => {
  const data = doc.data();
  console.log('生词数量:', data.vocabulary?.length);
  console.log('词组数量:', data.phrases?.length);
  console.log('语法数量:', data.grammar?.length);
  console.log('练习数量:', data.exercises?.length);
});
```

---

## 🚀 下一步：批量处理 17 课

### 工作流程

1. **收集 PDF**
   - 准备识字 9-25 的 PDF（17 个文件）

2. **AI 分析**
   - 上传 PDF 给 AI
   - AI 提取：
     - 第1页：生词
     - 第2页：词组 + 对话
     - 第3页：语法
     - 第4页：练习（含答案）

3. **生成 CSV**
   - AI 生成统一格式 CSV
   - 包含 17 课 × 4 页内容
   - 预估 1,200+ 行

4. **一键导入**
   - 上传 CSV 到后台
   - 点击"开始批量导入"
   - 等待 10-20 秒
   - 完成！

### 预估时间

| 步骤 | 时间 |
|------|------|
| 收集 PDF | 5 分钟 |
| AI 分析 + 生成 CSV | 30 分钟 |
| 人工验证 CSV | 10 分钟 |
| 后台导入 | 1 分钟 |
| **总计** | **~50 分钟** |

**对比传统方式**（每课手动输入）：
- 17 课 × 2 小时/课 = **34 小时**
- **节省时间：33 小时+**

---

## 🔥 常见问题 FAQ

### Q1：旧版后台还能用吗？
**A**：能用！但建议切换到 v3，功能更强大。

### Q2：导入会覆盖现有数据吗？
**A**：
- 模块1和2：不会，除非你选择"覆盖模式"
- 模块3：会覆盖对应的 vocabulary/phrases/grammar/exercises 字段

### Q3：如果导入失败怎么办？
**A**：
1. 查看错误日志
2. 检查 CSV 格式
3. 确认 Firebase 连接正常
4. 重新导入（数据不会丢失）

### Q4：如何修改已导入的数据？
**A**：
- 方案A：修改 CSV 重新导入（覆盖模式）
- 方案B：在 Firebase Console 手动修改
- 方案C：（未来）开发编辑界面

### Q5：CSV 编码问题
**A**：
- Excel 另存为 CSV 时选择 UTF-8 编码
- 或用 Google Sheets 导出 CSV

### Q6：能一次导入 25 课吗？
**A**：可以！只要 CSV 包含 lesson_id 1-25 的数据。

---

## 📞 支持

遇到问题？
1. 查看浏览器 Console（F12）
2. 检查 Firebase Console 日志
3. 联系开发者

---

**文档版本**：v3.0  
**最后更新**：2025-12-20  
**作者**：AI Assistant + Elisa Chang
