// Mobile Navigation Handler
document.addEventListener('DOMContentLoaded', function() {
    // Create mobile navigation elements
    function initializeMobileNav() {
        const greedy_nav = document.querySelector('.greedy-nav');
        const visible_links = document.querySelector('.visible-links');
        
        if (!greedy_nav || !visible_links) return;
        
        // Create hamburger button if it doesn't exist
        let hamburger = document.querySelector('.greedy-nav__toggle');
        if (!hamburger) {
            hamburger = document.createElement('button');
            hamburger.className = 'greedy-nav__toggle';
            hamburger.innerHTML = '<div class="navicon"></div>';
            greedy_nav.appendChild(hamburger);
        }
        
        // Create hidden links container if it doesn't exist
        let hidden_links = document.querySelector('.hidden-links');
        if (!hidden_links) {
            hidden_links = document.createElement('ul');
            hidden_links.className = 'hidden-links';
            greedy_nav.appendChild(hidden_links);
        }
        
        // Clone navigation items to hidden links for mobile
        const nav_items = visible_links.querySelectorAll('.masthead__menu-item');
        hidden_links.innerHTML = ''; // Clear existing content
        
        nav_items.forEach(item => {
            const clone = item.cloneNode(true);
            hidden_links.appendChild(clone);
        });
        
        // Add close button to mobile popup
        const close_button = document.createElement('div');
        close_button.className = 'mobile-nav-close';
        close_button.innerHTML = '&times;';
        hidden_links.appendChild(close_button);
        
        // Add event listeners
        hamburger.addEventListener('click', function() {
            toggleMobileNav();
        });
        
        close_button.addEventListener('click', function() {
            closeMobileNav();
        });
        
        // Close mobile nav when clicking on backdrop
        hidden_links.addEventListener('click', function(e) {
            if (e.target === hidden_links) {
                closeMobileNav();
            }
        });
        
        // Close mobile nav when clicking on a link
        hidden_links.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                closeMobileNav();
            });
        });
        
        // Close mobile nav on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && hidden_links.classList.contains('show')) {
                closeMobileNav();
            }
        });
    }
    
    function toggleMobileNav() {
        const hamburger = document.querySelector('.greedy-nav__toggle');
        const hidden_links = document.querySelector('.hidden-links');
        
        if (hidden_links.classList.contains('show')) {
            closeMobileNav();
        } else {
            openMobileNav();
        }
    }
    
    function openMobileNav() {
        const hamburger = document.querySelector('.greedy-nav__toggle');
        const hidden_links = document.querySelector('.hidden-links');
        
        hamburger.classList.add('close');
        hidden_links.classList.add('show');
        
        // Prevent body scroll when mobile nav is open
        document.body.style.overflow = 'hidden';
        
        // Add ARIA attributes for accessibility
        hamburger.setAttribute('aria-expanded', 'true');
        hidden_links.setAttribute('aria-hidden', 'false');
    }
    
    function closeMobileNav() {
        const hamburger = document.querySelector('.greedy-nav__toggle');
        const hidden_links = document.querySelector('.hidden-links');
        
        hamburger.classList.remove('close');
        hidden_links.classList.remove('show');
        
        // Restore body scroll
        document.body.style.overflow = '';
        
        // Update ARIA attributes
        hamburger.setAttribute('aria-expanded', 'false');
        hidden_links.setAttribute('aria-hidden', 'true');
    }
    
    // Handle window resize
    window.addEventListener('resize', function() {
        const hidden_links = document.querySelector('.hidden-links');
        if (window.innerWidth > 768 && hidden_links && hidden_links.classList.contains('show')) {
            closeMobileNav();
        }
    });
    
    // Initialize mobile navigation
    initializeMobileNav();
    
    // Re-initialize if navigation changes (for dynamic content)
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'childList') {
                const hasNavChanges = Array.from(mutation.addedNodes).some(node => 
                    node.nodeType === 1 && (node.matches('.masthead__menu-item') || node.querySelector('.masthead__menu-item'))
                );
                if (hasNavChanges) {
                    setTimeout(initializeMobileNav, 100);
                }
            }
        });
    });
    
    const visible_links = document.querySelector('.visible-links');
    if (visible_links) {
        observer.observe(visible_links, { childList: true, subtree: true });
    }
});
