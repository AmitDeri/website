document.addEventListener('DOMContentLoaded', function () {
    const header = document.getElementById('header');
    const profileImage = document.getElementById('profile-image');
    const titles = document.querySelectorAll('.title');
    const links = document.getElementById('links');
    const nameElement = document.getElementById('name');
    const fadeElements = document.querySelectorAll('.content h2, .content p');
    const navLinks = document.querySelectorAll('.nav-link');

    // Variables for mobile scrolling
    let nameFixed = false;
    let ticking = false;

    // Scroll handler
    function handleScroll() {
        let offset = window.pageYOffset;

        if (window.innerWidth < 768) {
            // Apply mobile scroll effects
            if (!ticking) {
                window.requestAnimationFrame(function () {
                    applyMobileScrollEffects(offset);
                    ticking = false;
                });
                ticking = true;
            }
        } else {
            // Apply desktop scroll effects
            if (offset > 50) {
                header.classList.add('shrink');
            } else {
                header.classList.remove('shrink');
            }
            // Reset styles for mobile
            resetMobileStyles();
        }
    }

    // Apply mobile scroll effects
    function applyMobileScrollEffects(offset) {
        const totalScrollableHeight = document.body.scrollHeight - window.innerHeight;

        // Calculate opacity based on scroll position
        let opacity = 1 - offset / totalScrollableHeight;

        // Ensure opacity is between 0 and 1
        opacity = Math.max(0, Math.min(1, opacity));

        // Calculate scale based on scroll position
        const maxScale = 1;
        const minScale = 0.5;
        let scale = maxScale - (offset / totalScrollableHeight) * (maxScale - minScale);
        scale = Math.max(minScale, Math.min(maxScale, scale));

        // Apply transformations
        profileImage.style.opacity = opacity;
        profileImage.style.transform = `scale(${scale})`;

        titles.forEach(function(title) {
            title.style.opacity = opacity;
        });

        links.style.opacity = opacity;

        // Fix the name at the top when scrolling past the header
        if (offset > header.offsetHeight) {
            if (!nameFixed) {
                nameElement.classList.add('name-fixed');
                nameFixed = true;
            }
        } else {
            if (nameFixed) {
                nameElement.classList.remove('name-fixed');
                nameFixed = false;
            }
        }
    }

    // Reset mobile styles
    function resetMobileStyles() {
        profileImage.style.opacity = '1';
        profileImage.style.transform = 'none';
        titles.forEach(function(title) {
            title.style.opacity = '1';
        });
        links.style.opacity = '1';

        if (nameFixed) {
            nameElement.classList.remove('name-fixed');
            nameFixed = false;
        }
    }

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);

    // Intersection Observer for fade-in effect
    const options = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
                observer.unobserve(entry.target);
            }
        });
    }, options);

    fadeElements.forEach(element => {
        observer.observe(element);
    });

    // Mobile Menu Toggle
    const menuToggle = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');

    menuToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        this.classList.toggle('active');
    });

    // Dropdown Toggle for Mobile
    navLinks.forEach(function(navLink) {
        navLink.addEventListener('click', function(e) {
            if (window.innerWidth < 768) {
                e.preventDefault(); // Prevent default link behavior only on mobile
                const dropdown = this.nextElementSibling;

                // Toggle the clicked dropdown
                if (dropdown && dropdown.classList.contains('dropdown')) {
                    dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
                }
            }
            // Do nothing on desktop
        });
    });

    // Prevent default action for links with href="#"
    document.querySelectorAll('a[href="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
        });
    });
});
