/**
 * 成功之路課程目錄：讀取 list.json，依册別動態渲染課程連結
 */
(function () {
    'use strict';

    var BOOKS = {
        'jinbu-1': { title: '进步篇 一', range: '第 1 – 12 课', listId: 'lesson-list-jinbu-1' },
        'jinbu-2': { title: '进步篇 二', range: '第 13 – 24 课', listId: 'lesson-list-jinbu-2' },
        'jinbu-3': { title: '进步篇 三', range: '第 25 – 36 课', listId: 'lesson-list-jinbu-3' },
    };

    function escapeHtml(text) {
        var div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    function renderLesson(item) {
        var tags = item.tags ? '<span class="lesson-tag">' + escapeHtml(item.tags) + '</span>' : '';
        return (
            '<li>' +
            '<a href="' + escapeHtml(item.path) + '">' +
            '<span class="lesson-num">第 ' + item.lessonNum + ' 课</span>' +
            '<span>' + escapeHtml(item.title) + '</span>' +
            tags +
            '</a>' +
            '</li>'
        );
    }

    async function loadLessons() {
        try {
            var response = await fetch('list.json');
            if (!response.ok) throw new Error('HTTP ' + response.status);

            var lessons = await response.json();
            if (!Array.isArray(lessons)) throw new Error('Invalid list.json');

            var published = lessons.filter(function (item) {
                return item.published !== false;
            });

            var grouped = {};
            Object.keys(BOOKS).forEach(function (book) {
                grouped[book] = [];
            });

            published.forEach(function (item) {
                var book = item.book || 'jinbu-1';
                if (!grouped[book]) grouped[book] = [];
                grouped[book].push(item);
            });

            Object.keys(BOOKS).forEach(function (bookId) {
                var config = BOOKS[bookId];
                var listEl = document.getElementById(config.listId);
                if (!listEl) return;

                var items = grouped[bookId] || [];
                items.sort(function (a, b) {
                    return (a.lessonNum || 0) - (b.lessonNum || 0);
                });

                var section = listEl.closest('.book-section');
                var placeholder = section ? section.querySelector('.placeholder') : null;

                if (items.length === 0) {
                    listEl.innerHTML = '';
                    if (placeholder) placeholder.style.display = '';
                    return;
                }

                if (placeholder) placeholder.style.display = 'none';
                listEl.innerHTML = items.map(renderLesson).join('');
            });
        } catch (err) {
            console.error('rts-lesson-list.js:', err);
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', loadLessons);
    } else {
        loadLessons();
    }
})();
