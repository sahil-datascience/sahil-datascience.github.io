// Sidebar Theme Toggle Functionality
document.addEventListener('DOMContentLoaded', function() {
    const sidebarThemeToggle = document.getElementById('sidebar-theme-toggle');
    const sidebarThemeIcon = document.getElementById('sidebar-theme-icon');
    const themeLabel = sidebarThemeToggle?.querySelector('.theme-label');
    
    // Get the main theme toggle elements for synchronization
    const mainThemeToggle = document.getElementById('theme-toggle');
    const mainThemeIcon = document.getElementById('theme-icon');
    
    if (!sidebarThemeToggle) return;
    
    // Function to update sidebar theme toggle state
    function updateSidebarThemeToggle(isDark) {
        if (sidebarThemeIcon && themeLabel) {
            if (isDark) {
                sidebarThemeIcon.className = 'fa-solid fa-moon';
                themeLabel.textContent = 'Light Mode';
                sidebarThemeToggle.setAttribute('title', 'Switch to Light Mode');
                sidebarThemeToggle.setAttribute('aria-label', 'Switch to Light Mode');
            } else {
                sidebarThemeIcon.className = 'fa-solid fa-sun';
                themeLabel.textContent = 'Dark Mode';
                sidebarThemeToggle.setAttribute('title', 'Switch to Dark Mode');
                sidebarThemeToggle.setAttribute('aria-label', 'Switch to Dark Mode');
            }
        }
    }
    
    // Function to toggle theme
    function toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const isDark = currentTheme === 'dark';
        const newTheme = isDark ? 'light' : 'dark';
        
        // Add switching animation
        sidebarThemeToggle.classList.add('theme-switching');
        setTimeout(() => {
            sidebarThemeToggle.classList.remove('theme-switching');
        }, 300);
        
        // Update theme
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Update both sidebar and main theme toggles
        updateSidebarThemeToggle(!isDark);
        
        // Sync with main theme toggle if it exists
        if (mainThemeIcon) {
            if (!isDark) {
                mainThemeIcon.className = 'fa-solid fa-moon';
            } else {
                mainThemeIcon.className = 'fa-solid fa-sun';
            }
        }
        
        // Dispatch custom event for other components
        window.dispatchEvent(new CustomEvent('themeChanged', { 
            detail: { theme: newTheme, isDark: !isDark } 
        }));
    }
    
    // Add click event listener
    sidebarThemeToggle.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        // Add ripple effect
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');
        ripple.style.left = e.offsetX + 'px';
        ripple.style.top = e.offsetY + 'px';
        sidebarThemeToggle.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
        
        toggleTheme();
    });
    
    // Initialize theme state
    const savedTheme = localStorage.getItem('theme');
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    const initialTheme = savedTheme || systemTheme;
    
    document.documentElement.setAttribute('data-theme', initialTheme);
    updateSidebarThemeToggle(initialTheme === 'dark');
    
    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
        if (!localStorage.getItem('theme')) {
            const newTheme = e.matches ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', newTheme);
            updateSidebarThemeToggle(e.matches);
        }
    });
    
    // Listen for theme changes from other toggles
    window.addEventListener('themeChanged', function(e) {
        updateSidebarThemeToggle(e.detail.isDark);
    });
    
    // Keyboard accessibility
    sidebarThemeToggle.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleTheme();
        }
    });
});

// Add ripple effect CSS
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
.sidebar-theme-btn {
    position: relative;
    overflow: hidden;
}

.sidebar-theme-btn .ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.6);
    transform: scale(0);
    animation: rippleEffect 0.6s linear;
    pointer-events: none;
}

@keyframes rippleEffect {
    to {
        transform: scale(4);
        opacity: 0;
    }
}

.sidebar-theme-btn:focus-visible {
    outline: 2px solid rgba(102, 126, 234, 0.6);
    outline-offset: 2px;
}
`;
document.head.appendChild(rippleStyle);
