/* ========================================
   Global Navigation JavaScript
   Handles mobile menu, dropdowns, and active states
   ======================================== */

(function() {
    'use strict';

    document.addEventListener('DOMContentLoaded', function() {
        initMobileMenu();
        initNavDropdowns();
        setActiveNavLink();
    });

    function initMobileMenu() {
        const hamburgerBtn = document.querySelector('.hamburger-btn');
        const sidebar = document.querySelector('.mobile-sidebar');
        const overlay = document.querySelector('.sidebar-overlay');
        const closeBtn = document.querySelector('.close-sidebar');
        const body = document.body;

        if (!hamburgerBtn || !sidebar || !overlay) return;

        hamburgerBtn.addEventListener('click', function() {
            sidebar.classList.add('open');
            overlay.classList.add('active');
            body.classList.add('sidebar-open');
        });

        function closeSidebar() {
            sidebar.classList.remove('open');
            overlay.classList.remove('active');
            body.classList.remove('sidebar-open');
        }

        if (closeBtn) {
            closeBtn.addEventListener('click', closeSidebar);
        }

        overlay.addEventListener('click', closeSidebar);

        const menuItems = sidebar.querySelectorAll('.mobile-menu-item, .mobile-menu-single');
        menuItems.forEach(function(item) {
            item.addEventListener('click', closeSidebar);
        });

        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && sidebar.classList.contains('open')) {
                closeSidebar();
            }
        });
    }

    function initNavDropdowns() {
        const dropdowns = document.querySelectorAll('[data-nav-dropdown]');
        if (!dropdowns.length) return;

        dropdowns.forEach(function(dropdown) {
            const toggle = dropdown.querySelector('.nav-dropdown-toggle');
            if (!toggle) return;

            toggle.addEventListener('click', function(e) {
                e.stopPropagation();
                const isOpen = dropdown.classList.contains('open');

                closeAllDropdowns();

                if (!isOpen) {
                    dropdown.classList.add('open');
                    toggle.setAttribute('aria-expanded', 'true');
                }
            });
        });

        document.addEventListener('click', function() {
            closeAllDropdowns();
        });

        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closeAllDropdowns();
            }
        });
    }

    function closeAllDropdowns() {
        document.querySelectorAll('[data-nav-dropdown].open').forEach(function(dropdown) {
            dropdown.classList.remove('open');
            const toggle = dropdown.querySelector('.nav-dropdown-toggle');
            if (toggle) {
                toggle.setAttribute('aria-expanded', 'false');
            }
        });
    }

    function setActiveNavLink() {
        const currentPath = window.location.pathname;
        const normalizedCurrent = normalizePath(currentPath);
        const isRoadToSuccess = normalizedCurrent.includes('/road-to-success');

        const navLinks = document.querySelectorAll('.nav-link, .mobile-menu-item, .mobile-menu-single, .nav-dropdown-item');

        navLinks.forEach(function(link) {
            const linkPath = new URL(link.href, window.location.origin).pathname;
            const normalizedLink = normalizePath(linkPath);

            if (normalizedCurrent === normalizedLink) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });

        if (isRoadToSuccess) {
            document.querySelectorAll('[data-nav-dropdown]').forEach(function(menu) {
                const hasRoadLink = Array.from(menu.querySelectorAll('.nav-dropdown-item')).some(function(item) {
                    return item.href && item.href.indexOf('road-to-success') !== -1;
                });
                if (!hasRoadLink) return;

                const toggle = menu.querySelector('.nav-dropdown-toggle');
                if (toggle) {
                    toggle.classList.add('active');
                }
            });
        }
    }

    function normalizePath(path) {
        path = path.replace(/\/$/, '');
        path = path.replace(/\/index\.html$/, '');

        if (path === '' || path === '/') {
            return '/';
        }

        return path;
    }
})();
