/**
 * 自動同步 content 資料夾中的 HTML 檔案到 list.json
 * 使用方式: node sync-list.js
 */

const fs = require('fs');
const path = require('path');

// 設定路徑
const contentDir = path.join(__dirname, 'content');
const listJsonPath = path.join(__dirname, 'list.json');

/**
 * 從 HTML 檔案中提取 h1 標籤內容
 */
function extractH1FromHTML(filePath) {
    try {
        const content = fs.readFileSync(filePath, 'utf-8');
        
        // 使用正則表達式匹配 <h1> 標籤內容
        // 支援多行和屬性
        const h1Match = content.match(/<h1[^>]*>([^<]+)<\/h1>/i);
        
        if (h1Match && h1Match[1]) {
            // 移除多餘的空白字符
            return h1Match[1].trim();
        }
        
        // 如果找不到 h1，使用檔案名（去掉擴展名）
        const fileName = path.basename(filePath, '.html');
        return fileName.replace(/[-_]/g, ' ');
    } catch (error) {
        console.error(`讀取檔案錯誤 ${filePath}:`, error.message);
        return null;
    }
}

/**
 * 掃描 content 資料夾並生成 list.json
 */
function syncList() {
    console.log('開始掃描 content 資料夾...');
    
    // 檢查 content 資料夾是否存在
    if (!fs.existsSync(contentDir)) {
        console.error(`錯誤: content 資料夾不存在: ${contentDir}`);
        process.exit(1);
    }
    
    // 讀取 content 資料夾中的所有檔案
    const files = fs.readdirSync(contentDir);
    
    // 過濾出 HTML 檔案
    const htmlFiles = files.filter(file => file.endsWith('.html'));
    
    if (htmlFiles.length === 0) {
        console.log('未找到任何 HTML 檔案');
        return;
    }
    
    console.log(`找到 ${htmlFiles.length} 個 HTML 檔案`);
    
    // 生成列表項目
    const listItems = [];
    
    for (const file of htmlFiles) {
        const filePath = path.join(contentDir, file);
        const title = extractH1FromHTML(filePath);
        
        if (title) {
            listItems.push({
                title: title,
                path: `content/${file}`
            });
            console.log(`✓ ${file} -> "${title}"`);
        } else {
            console.warn(`⚠ 跳過 ${file} (無法提取標題)`);
        }
    }
    
    // 按檔案名排序
    listItems.sort((a, b) => {
        const fileA = a.path.split('/').pop();
        const fileB = b.path.split('/').pop();
        return fileA.localeCompare(fileB);
    });
    
    // 寫入 list.json
    const jsonContent = JSON.stringify(listItems, null, 2);
    fs.writeFileSync(listJsonPath, jsonContent, 'utf-8');
    
    console.log(`\n✅ 成功更新 list.json (${listItems.length} 個項目)`);
    console.log(`檔案位置: ${listJsonPath}`);
}

// 執行同步
syncList();



