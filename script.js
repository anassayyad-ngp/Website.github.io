// Initialize Feather Icons
document.addEventListener('DOMContentLoaded', () => {
    // Initialize Feather Icons with error handling
    if (typeof feather !== 'undefined') {
        feather.replace();
    } else {
        console.warn('Feather Icons library not loaded');
    }

    // Intersection Observer for Scroll Animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1 // Triggers when 10% of the element is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: Unobserve after animating in to keep it visible
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Setup fade-in observer for existing elements
    const setupFadeInObserver = () => {
        const fadeElements = document.querySelectorAll('.fade-in');
        fadeElements.forEach(el => observer.observe(el));
    };

    setupFadeInObserver();

    // Watch for dynamically added fade-in elements
    if (document.body) {
        new MutationObserver(() => {
            document.querySelectorAll('.fade-in:not([data-observed])').forEach(el => {
                el.setAttribute('data-observed', 'true');
                observer.observe(el);
            });
        }).observe(document.body, { childList: true, subtree: true });
    }

    // Smooth Scrolling for Anchor Links with improved handling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            
            // Skip empty fragments
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});
