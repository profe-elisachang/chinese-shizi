/* ========================================
   Dynamic List Loader
   Fetches list.json from the same directory as the HTML page
   and generates clickable buttons for each item
   ======================================== */

(function() {
    'use strict';

    /**
     * Get the directory path of the current HTML page
     * Automatically detects the current folder path
     * Works with both HTTP and file:// protocols
     */
    function getCurrentPageDirectory() {
        // Get the current page's URL
        const currentUrl = window.location.href;
        let pathname;
        
        try {
            const urlObj = new URL(currentUrl);
            pathname = urlObj.pathname;
        } catch (e) {
            // Fallback for older browsers or edge cases
            pathname = window.location.pathname;
        }
        
        console.log('list-loader.js: Original pathname:', pathname);
        
        // Handle file:// protocol (local file system)
        if (currentUrl.startsWith('file://')) {
            // For file://, extract directory path
            const lastSlash = pathname.lastIndexOf('/');
            if (lastSlash !== -1) {
                pathname = pathname.substring(0, lastSlash + 1);
            }
        } else {
            // For HTTP/HTTPS, remove the filename if present
            // Strategy: If path ends with .html, remove extension and use that as directory name
            // e.g., /pages/grammar.html -> /pages/grammar/
            if (pathname.endsWith('.html')) {
                // Remove .html extension
                let pathWithoutExt = pathname.replace(/\.html$/, '');
                console.log('list-loader.js: After removing .html:', pathWithoutExt);
                // Ensure it ends with /
                if (!pathWithoutExt.endsWith('/')) {
                    pathWithoutExt += '/';
                }
                pathname = pathWithoutExt;
                console.log('list-loader.js: Final pathname after processing:', pathname);
            } else if (pathname.endsWith('/index.html')) {
                // Handle index.html case: /pages/grammar/index.html -> /pages/grammar/
                pathname = pathname.replace('/index.html', '/');
            } else if (!pathname.endsWith('/')) {
                // If pathname doesn't end with /, add it
                pathname += '/';
            }
        }
        
        // Ensure path starts with / for absolute paths (HTTP) or is relative (file://)
        if (!currentUrl.startsWith('file://') && !pathname.startsWith('/')) {
            pathname = '/' + pathname;
        }
        
        return pathname;
    }

    /**
     * Load and render the list from list.json
     */
    async function loadList() {
        const container = document.getElementById('dynamic-list-container');
        if (!container) {
            console.warn('list-loader.js: No element with id="dynamic-list-container" found');
            return;
        }

        const currentDir = getCurrentPageDirectory();
        const listJsonPath = currentDir + 'list.json';
        
        // Debug: log the paths being used
        console.log('list-loader.js: Current directory:', currentDir);
        console.log('list-loader.js: Fetching list.json from:', listJsonPath);

        try {
            const response = await fetch(listJsonPath);
            if (!response.ok) {
                console.error('list-loader.js: Failed to fetch:', listJsonPath, 'Status:', response.status);
                throw new Error(`Failed to fetch list.json: ${response.status} ${response.statusText}`);
            }

            const listData = await response.json();
            
            if (!Array.isArray(listData) || listData.length === 0) {
                container.innerHTML = '<p class="empty-message">No items available yet.</p>';
                return;
            }

            // Generate buttons HTML
            const buttonsHTML = listData.map(item => {
                const filePath = item.path || item.file || item;
                const title = item.title || item.name || filePath.replace(/\.html$/, '').replace(/[_-]/g, ' ');
                const description = item.description || '';
                
                // Determine the full path to the content file
                // If path already includes 'content/', use it as is; otherwise prepend 'content/'
                let contentPath;
                if (item.path && item.path.startsWith('content/')) {
                    contentPath = currentDir + filePath;
                } else if (item.path) {
                    contentPath = currentDir + filePath;
                } else {
                    // For backward compatibility with 'file' field
                    contentPath = currentDir + 'content/' + filePath;
                }
                
                return `
                    <a href="${contentPath}" class="list-item-button" target="_blank" rel="noopener noreferrer">
                        <div class="list-item-content">
                            <h3 class="list-item-title">${escapeHtml(title)}</h3>
                            ${description ? `<p class="list-item-description">${escapeHtml(description)}</p>` : ''}
                        </div>
                        <span class="list-item-arrow">→</span>
                    </a>
                `;
            }).join('');

            container.innerHTML = buttonsHTML;

        } catch (error) {
            console.error('list-loader.js: Error loading list:', error);
            container.innerHTML = `
                <p class="error-message">
                    Unable to load content list. Please check if list.json exists in the same directory.
                </p>
            `;
        }
    }

    /**
     * Escape HTML to prevent XSS
     */
    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', loadList);
    } else {
        loadList();
    }
})();

