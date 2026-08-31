/**
 * 掃描 HTML 內容檔（含可選的 <!-- YAML --> frontmatter），
 * 自動更新各區塊的 list.json。
 *
 * 使用方式: node scripts/sync-content-lists.js
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');

function parseFrontmatter(content) {
    const match = content.match(/^<!--\s*\r?\n([\s\S]*?)\r?\n-->/);
    if (!match) return {};

    const meta = {};
    for (const line of match[1].split('\n')) {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith('#')) continue;

        const colon = trimmed.indexOf(':');
        if (colon === -1) continue;

        const key = trimmed.slice(0, colon).trim();
        let value = trimmed.slice(colon + 1).trim();

        if (
            (value.startsWith('"') && value.endsWith('"')) ||
            (value.startsWith("'") && value.endsWith("'"))
        ) {
            value = value.slice(1, -1);
        }

        if (value === 'true') meta[key] = true;
        else if (value === 'false') meta[key] = false;
        else if (/^\d+$/.test(value)) meta[key] = parseInt(value, 10);
        else meta[key] = value;
    }

    return meta;
}

function extractH1(content) {
    const h1Match = content.match(/<h1[^>]*>([^<]+)<\/h1>/i);
    if (h1Match && h1Match[1]) {
        return h1Match[1].replace(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/gu, '').trim();
    }
    return null;
}

function readHtmlFiles(dir) {
    if (!fs.existsSync(dir)) return [];
    return fs
        .readdirSync(dir)
        .filter((file) => file.endsWith('.html'))
        .map((file) => ({
            file,
            filePath: path.join(dir, file),
            content: fs.readFileSync(path.join(dir, file), 'utf-8'),
        }));
}

function writeList(listPath, items) {
    fs.writeFileSync(listPath, JSON.stringify(items, null, 2) + '\n', 'utf-8');
    console.log(`✅ ${path.relative(ROOT, listPath)} (${items.length} 項)`);
}

function syncRoadToSuccess() {
    const lessonsDir = path.join(ROOT, 'courses/road-to-success/lessons');
    const listPath = path.join(ROOT, 'courses/road-to-success/list.json');
    const items = [];

    for (const { file, content } of readHtmlFiles(lessonsDir)) {
        const meta = parseFrontmatter(content);
        const published = meta.published !== false;
        if (!published) continue;

        const lessonNum = meta.lessonNum ?? parseInt(file.match(/lesson-(\d+)/)?.[1] || '0', 10);
        items.push({
            title: meta.title || extractH1(content) || file.replace('.html', ''),
            path: `lessons/${file}`,
            lessonNum,
            book: meta.book || 'jinbu-1',
            published: true,
            tags: meta.tags || '课文 · 词语扩展 · 语言点',
        });
    }

    items.sort((a, b) => a.lessonNum - b.lessonNum);
    writeList(listPath, items);
}

function syncSimpleContent(contentDir, listPath, contentPrefix) {
    const items = [];

    for (const { file, content } of readHtmlFiles(contentDir)) {
        const meta = parseFrontmatter(content);
        if (meta.published === false) continue;

        items.push({
            title: meta.title || extractH1(content) || file.replace('.html', '').replace(/[-_]/g, ' '),
            path: `${contentPrefix}${file}`,
        });
    }

    items.sort((a, b) => a.path.localeCompare(b.path, undefined, { numeric: true }));
    writeList(listPath, items);
}

function main() {
    console.log('同步 content list.json …\n');

    syncRoadToSuccess();
    syncSimpleContent(
        path.join(ROOT, 'pages/grammar/content'),
        path.join(ROOT, 'pages/grammar/list.json'),
        'content/'
    );
    syncSimpleContent(
        path.join(ROOT, 'pages/extras/content'),
        path.join(ROOT, 'pages/extras/list.json'),
        'content/'
    );
    syncSimpleContent(
        path.join(ROOT, 'pages/mini-story/content'),
        path.join(ROOT, 'pages/mini-story/list.json'),
        'content/'
    );

    console.log('\n完成。');
}

main();
