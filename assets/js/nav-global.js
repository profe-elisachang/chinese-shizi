/* ========================================
   Global Navigation JavaScript
   Handles mobile menu and active states
   ======================================== */

(function() {
    'use strict';

    // Wait for DOM to be ready
    document.addEventListener('DOMContentLoaded', function() {
        initMobileMenu();
        setActiveNavLink();
    });

    /**
     * Initialize mobile hamburger menu
     */
    function initMobileMenu() {
        const hamburgerBtn = document.querySelector('.hamburger-btn');
        const sidebar = document.querySelector('.mobile-sidebar');
        const overlay = document.querySelector('.sidebar-overlay');
        const closeBtn = document.querySelector('.close-sidebar');
        const body = document.body;

        if (!hamburgerBtn || !sidebar || !overlay) return;

        // Open sidebar
        hamburgerBtn.addEventListener('click', function() {
            sidebar.classList.add('open');
            overlay.classList.add('active');
            body.classList.add('sidebar-open');
        });

        // Close sidebar
        function closeSidebar() {
            sidebar.classList.remove('open');
            overlay.classList.remove('active');
            body.classList.remove('sidebar-open');
        }

        if (closeBtn) {
            closeBtn.addEventListener('click', closeSidebar);
        }

        // Close when clicking overlay
        overlay.addEventListener('click', closeSidebar);

        // Close when clicking a menu item
        const menuItems = sidebar.querySelectorAll('.mobile-menu-item, .mobile-menu-single');
        menuItems.forEach(function(item) {
            item.addEventListener('click', closeSidebar);
        });

        // Close on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && sidebar.classList.contains('open')) {
                closeSidebar();
            }
        });
    }

    /**
     * Set active navigation link based on current page
     */
    function setActiveNavLink() {
        const currentPath = window.location.pathname;
        const navLinks = document.querySelectorAll('.nav-link, .mobile-menu-item, .mobile-menu-single');

        navLinks.forEach(function(link) {
            const linkPath = new URL(link.href, window.location.origin).pathname;

            // Normalize paths for comparison
            const normalizedCurrent = normalizePath(currentPath);
            const normalizedLink = normalizePath(linkPath);

            // Check if paths match
            if (normalizedCurrent === normalizedLink) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    /**
     * Normalize path for comparison
     */
    function normalizePath(path) {
        // Remove trailing slashes and handle index.html
        path = path.replace(/\/$/, '');
        path = path.replace(/\/index\.html$/, '');

        // If path is empty or just /, it's the home page
        if (path === '' || path === '/') {
            return '/';
        }

        return path;
    }
})();
