/**
 * Navigation Tab Active State Management
 * Highlights the current page tab in the navigation
 */

(function() {
    'use strict';
    
    document.addEventListener('DOMContentLoaded', function() {
        initializeNavigationTabs();
    });
    
    function initializeNavigationTabs() {
        const currentPath = window.location.pathname;
        const navLinks = document.querySelectorAll('.masthead__menu-item a');
        
        // Remove existing active states
        navLinks.forEach(link => {
            link.classList.remove('current');
            link.parentElement.classList.remove('current-page');
        });
        
        // Find and highlight current page
        navLinks.forEach(link => {
            const linkPath = link.getAttribute('href');
            
            // Handle different URL formats
            if (linkPath && (
                currentPath === linkPath ||
                currentPath === linkPath + '/' ||
                (linkPath !== '/' && currentPath.startsWith(linkPath))
            )) {
                link.classList.add('current');
                link.parentElement.classList.add('current-page');
            }
        });
        
        // Special case for home page
        if (currentPath === '/' || currentPath === '/index.html') {
            const homeLink = document.querySelector('.masthead__menu-item a[href="/"], .masthead__menu-item a[href=""]');
            if (homeLink) {
                homeLink.classList.add('current');
                homeLink.parentElement.classList.add('current-page');
            }
        }
        
        // Add hover effects and smooth animations
        addTabAnimations();
        
        console.log('Navigation tabs initialized successfully');
    }
    
    function addTabAnimations() {
        const navItems = document.querySelectorAll('.masthead__menu-item');
        
        navItems.forEach(item => {
            const link = item.querySelector('a');
            if (!link) return;
            
            // Add ripple effect on click
            link.addEventListener('click', function(e) {
                const ripple = document.createElement('span');
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.cssText = `
                    position: absolute;
                    width: ${size}px;
                    height: ${size}px;
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.3);
                    left: ${x}px;
                    top: ${y}px;
                    transform: scale(0);
                    animation: ripple 0.6s ease-out;
                    pointer-events: none;
                    z-index: 1;
                `;
                
                this.style.position = 'relative';
                this.style.overflow = 'hidden';
                this.appendChild(ripple);
                
                setTimeout(() => {
                    if (ripple.parentNode) {
                        ripple.parentNode.removeChild(ripple);
                    }
                }, 600);
            });
        });
    }
    
    // Add CSS animation for ripple effect
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(2);
                opacity: 0;
            }
        }
        
        .masthead__menu-item a {
            position: relative;
            overflow: hidden;
        }
    `;
    document.head.appendChild(style);
})();
