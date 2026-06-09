/**
 * 識字 / HSK 課程共用設定
 * review.html、studio.html、shizi-editor.html 共用
 */
const COURSES_CONFIG = {
    shizi: {
        id: 'shizi',
        label: '識字',
        lessonCount: 25,
        docId: (n) => `lesson${n}`,
        contentTabs: ['components', 'characters', 'phrases'],
        hasComponents: true,
        hasVocabulary: true,
        cloudinaryFolder: 'shizi-lessons',
        cloudinaryDisplayFolder: 'shizi-lessons/display-images'
    },
    hsk2: {
        id: 'hsk2',
        label: 'HSK 2',
        lessonCount: 15,
        docId: (n) => `hsk2-lesson${n}`,
        contentTabs: ['components', 'characters', 'phrases'],
        hasComponents: true,
        hasVocabulary: false,
        cloudinaryFolder: 'hsk2-lessons',
        cloudinaryDisplayFolder: 'hsk2-lessons/display-images'
    }
};

const CACHE_VERSION = 6;

function getLessonDocId(courseId, lessonNum) {
    const config = COURSES_CONFIG[courseId];
    if (!config) return `lesson${lessonNum}`;
    return config.docId(lessonNum);
}

function getLessonNumFromDocId(docId) {
    const match = docId.match(/(\d+)$/);
    return match ? parseInt(match[1], 10) : 0;
}

/**
 * 進度 key：識字維持舊格式向後相容，HSK 加 course 前綴避免碰撞
 */
function getProgressKey(courseId, tab, item) {
    if (courseId === 'shizi') {
        if (tab === 'phrases' || tab === 'vocabulary') {
            return item.uniqueId;
        }
        return item.character;
    }
    const itemKey = (tab === 'phrases' || tab === 'vocabulary')
        ? item.uniqueId
        : item.character;
    return `${courseId}|${item.lesson}|${itemKey}`;
}

function populateLessonSelect(selectEl, courseId, includeEmpty = true) {
    const config = COURSES_CONFIG[courseId];
    if (!config || !selectEl) return;

    selectEl.innerHTML = '';
    if (includeEmpty) {
        const empty = document.createElement('option');
        empty.value = '';
        empty.textContent = '-- 請選擇課次 --';
        selectEl.appendChild(empty);
    }

    for (let i = 1; i <= config.lessonCount; i++) {
        const option = document.createElement('option');
        option.value = getLessonDocId(courseId, i);
        option.textContent = `Lesson ${i}`;
        selectEl.appendChild(option);
    }
}
