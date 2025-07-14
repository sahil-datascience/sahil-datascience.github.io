/* ==========================================================================
   jQuery plugin settings and other scripts
   ========================================================================== */

$(document).ready(function () {
  // Force navigation visibility
  $('.masthead').show();
  $('.visible-links').show();
  $('.masthead__menu-item').show();
  
  // detect OS/browser preference
  const browserPref = window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';

  // Set the theme on page load or when explicitly called
  var setTheme = function (theme) {
    const use_theme =
      theme ||
      localStorage.getItem("theme") ||
      $("html").attr("data-theme") ||
      browserPref;

    console.log("Setting theme to:", use_theme); // Debug log

    if (use_theme === "dark") {
      $("html").attr("data-theme", "dark");
      $("#theme-icon").removeClass("fa-sun").addClass("fa-moon");
      localStorage.setItem("theme", "dark");
    } else {
      $("html").removeAttr("data-theme");
      $("#theme-icon").removeClass("fa-moon").addClass("fa-sun");
      localStorage.setItem("theme", "light");
    }
    
    // Force a style recalculation for local development
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      setTimeout(function() {
        document.body.style.display = 'none';
        document.body.offsetHeight; // Trigger reflow
        document.body.style.display = '';
      }, 10);
    }
  };

  // Initialize theme immediately
  setTheme();

  // if user hasn't chosen a theme, follow OS changes
  window
    .matchMedia('(prefers-color-scheme: dark)')
    .addEventListener("change", (e) => {
      if (!localStorage.getItem("theme")) {
        setTheme(e.matches ? "dark" : "light");
      }
    });

  // Toggle the theme manually
  var toggleTheme = function (e) {
    e.preventDefault();
    e.stopPropagation();
    
    // Check current theme more reliably
    const htmlElement = document.documentElement;
    const current_theme = htmlElement.getAttribute("data-theme");
    const stored_theme = localStorage.getItem("theme");
    
    console.log("Current theme from HTML:", current_theme); // Debug log
    console.log("Stored theme:", stored_theme); // Debug log
    
    // Determine new theme - if no data-theme attribute, it's light mode
    let new_theme;
    if (current_theme === "dark") {
      new_theme = "light";
    } else {
      new_theme = "dark";
    }
    
    console.log("Switching to:", new_theme); // Debug log
    
    // Apply theme change immediately
    setTheme(new_theme);
    
    // Add interacted class to stop animation
    $('#theme-toggle').addClass('interacted');
  };

  // Multiple event bindings for better compatibility in local development
  $(document).ready(function() {
    console.log("Document ready - initializing theme"); // Debug log
    
    // Ensure theme is set correctly on page load
    setTheme();
    
    // Remove any existing event handlers first
    $('#theme-toggle').off('click.themeToggle');
    
    // Bind click event
    $('#theme-toggle').on('click.themeToggle', toggleTheme);
    
    console.log("Theme toggle button bound"); // Debug log
  });
  
  // Additional binding when DOM is fully loaded
  $(window).on('load', function() {
    console.log("Window loaded - ensuring theme is set"); // Debug log
    setTheme();
  });

  // These should be the same as the settings in _variables.scss
  const scssLarge = 925; // pixels

  // Sticky footer
  var bumpIt = function () {
    $("body").css("margin-bottom", $(".page__footer").outerHeight(true));
  },
    didResize = false;

  bumpIt();

  $(window).resize(function () {
    didResize = true;
  });
  setInterval(function () {
    if (didResize) {
      didResize = false;
      bumpIt();
    }
  }, 250);

  // FitVids init
  fitvids();

  // Follow menu drop down
  $(".author__urls-wrapper button").on("click", function () {
    $(".author__urls").fadeToggle("fast", function () { });
    $(".author__urls-wrapper button").toggleClass("open");
  });

  // Restore the follow menu if toggled on a window resize
  jQuery(window).on('resize', function () {
    if ($('.author__urls.social-icons').css('display') == 'none' && $(window).width() >= scssLarge) {
      $(".author__urls").css('display', 'block')
    }
  });

  // init smooth scroll, this needs to be slightly more than then fixed masthead height
  $("a").smoothScroll({ 
    offset: -75, // needs to match $masthead-height
    preventDefault: false,
  }); 

  // add lightbox class to all image links
  // Add "image-popup" to links ending in image extensions,
  // but skip any <a> that already contains an <img>
  $("a[href$='.jpg'],\
  a[href$='.jpeg'],\
  a[href$='.JPG'],\
  a[href$='.png'],\
  a[href$='.gif'],\
  a[href$='.webp']")
      .not(':has(img)')
      .addClass("image-popup");

  // 1) Wrap every <p><img> (except emoji images) in an <a> pointing at the image, and give it the lightbox class
  $('p > img').not('.emoji').each(function() {
    var $img = $(this);
    // skip if it’s already wrapped in an <a.image-popup>
    if ( ! $img.parent().is('a.image-popup') ) {
      $('<a>')
        .addClass('image-popup')
        .attr('href', $img.attr('src'))
        .insertBefore($img)   // place the <a> right before the <img>
        .append($img);        // move the <img> into the <a>
    }
  });

  // Magnific-Popup options
  $(".image-popup").magnificPopup({
    type: 'image',
    tLoading: 'Loading image #%curr%...',
    gallery: {
      enabled: true,
      navigateByImgClick: true,
      preload: [0, 1] // Will preload 0 - before current, and 1 after the current image
    },
    image: {
      tError: '<a href="%url%">Image #%curr%</a> could not be loaded.',
    },
    removalDelay: 500, // Delay in milliseconds before popup is removed
    // Class that is added to body when popup is open.
    // make it unique to apply your CSS animations just to this exact popup
    mainClass: 'mfp-zoom-in',
    callbacks: {
      beforeOpen: function () {
        // just a hack that adds mfp-anim class to markup
        this.st.image.markup = this.st.image.markup.replace('mfp-figure', 'mfp-figure mfp-with-anim');
      }
    },
    closeOnContentClick: true,
    midClick: true // allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source.
  });

  // Vanilla JS fallback for theme toggle (more reliable)
  document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('theme-toggle');
    
    if (themeToggle) {
      // Remove any existing listeners
      themeToggle.removeEventListener('click', vanillaToggleTheme);
      
      // Add new listener
      themeToggle.addEventListener('click', vanillaToggleTheme);
      
      console.log("Vanilla JS theme toggle bound");
    }
  });
  
  function vanillaToggleTheme(e) {
    e.preventDefault();
    e.stopPropagation();
    
    const htmlElement = document.documentElement;
    const currentTheme = htmlElement.getAttribute('data-theme');
    const themeIcon = document.getElementById('theme-icon');
    
    console.log("Vanilla toggle - current theme:", currentTheme);
    
    if (currentTheme === 'dark') {
      // Switch to light
      htmlElement.removeAttribute('data-theme');
      localStorage.setItem('theme', 'light');
      if (themeIcon) {
        themeIcon.className = 'fa-solid fa-sun';
      }
      console.log("Switched to light mode");
    } else {
      // Switch to dark
      htmlElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
      if (themeIcon) {
        themeIcon.className = 'fa-solid fa-moon';
      }
      console.log("Switched to dark mode");
    }
    
    // Force style recalculation
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      document.body.style.display = 'none';
      document.body.offsetHeight;
      document.body.style.display = '';
    }
  }
});
