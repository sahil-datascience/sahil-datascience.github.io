/**
 * Modern Sidebar Functionality
 * Handles the collapsible sidebar toggle, overlay, and navigation
 */

(function() {
    'use strict';
    
    // Wait for DOM to be ready
    document.addEventListener('DOMContentLoaded', function() {
        initializeSidebar();
    });
    
    function initializeSidebar() {
        // Get sidebar elements
        const toggleBtn = document.getElementById('sidebarToggle');
        const closeBtn = document.getElementById('sidebarClose');
        const overlay = document.getElementById('sidebarOverlay');
        const sidebar = document.getElementById('sidebarModern');
        
        // Check if elements exist
        if (!toggleBtn || !closeBtn || !overlay || !sidebar) {
            console.warn('Sidebar elements not found. Sidebar functionality disabled.');
            return;
        }
        
        // Sidebar state management
        function openSidebar() {
            sidebar.classList.add('active');
            overlay.classList.add('active');
            toggleBtn.classList.add('active');
            document.body.style.overflow = 'hidden';
            
            // Add aria attributes for accessibility
            sidebar.setAttribute('aria-hidden', 'false');
            toggleBtn.setAttribute('aria-expanded', 'true');
        }
        
        function closeSidebar() {
            sidebar.classList.remove('active');
            overlay.classList.remove('active');
            toggleBtn.classList.remove('active');
            document.body.style.overflow = '';
            
            // Add aria attributes for accessibility
            sidebar.setAttribute('aria-hidden', 'true');
            toggleBtn.setAttribute('aria-expanded', 'false');
        }
        
        // Event listeners
        toggleBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            if (sidebar.classList.contains('active')) {
                closeSidebar();
            } else {
                openSidebar();
            }
        });
        
        // Close sidebar when clicking close button
        closeBtn.addEventListener('click', function(e) {
            e.preventDefault();
            closeSidebar();
        });
        
        // Close sidebar when clicking overlay
        overlay.addEventListener('click', function(e) {
            if (e.target === overlay) {
                closeSidebar();
            }
        });
        
        // Close sidebar on Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && sidebar.classList.contains('active')) {
                closeSidebar();
            }
        });
        
        // Auto-close sidebar when clicking on navigation links
        const navLinks = sidebar.querySelectorAll('.nav-list a, .sidebar-nav a');
        navLinks.forEach(function(link) {
            link.addEventListener('click', function() {
                // Add small delay to allow navigation to start
                setTimeout(closeSidebar, 150);
            });
        });
        
        // Handle window resize - close sidebar on desktop
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768 && sidebar.classList.contains('active')) {
                closeSidebar();
            }
        });
        
        // Initialize ARIA attributes
        sidebar.setAttribute('aria-hidden', 'true');
        toggleBtn.setAttribute('aria-expanded', 'false');
        
        console.log('Sidebar initialized successfully');
    }
})();
