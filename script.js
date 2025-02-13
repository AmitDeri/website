document.addEventListener('DOMContentLoaded', function () {
    const header = document.querySelector('.navbar');
    const hero = document.querySelector('.hero');
    const scrollOffset = 60; // Height of the fixed navbar
    const menuToggle = document.getElementById('mobile-menu');
    const navMenu = document.getElementById('nav-menu');
    const navItems = document.querySelectorAll('.nav-item');
    const scrollLinks = document.querySelectorAll('.scroll-link');

    // Mobile Menu Toggle
    menuToggle.addEventListener('click', function () {
        navMenu.classList.toggle('active');
        this.classList.toggle('active');
    });

    // Dropdown Menu Toggle for Mobile
    navItems.forEach(function (navItem) {
        const navLink = navItem.querySelector('.nav-link');
        navLink.addEventListener('click', function () {
            if (window.innerWidth <= 768) {
                navItem.classList.toggle('open');
            }
        });
    });

    // Smooth scrolling for anchor links and highlight section
    scrollLinks.forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            navMenu.classList.remove('active');
            menuToggle.classList.remove('active');
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - scrollOffset,
                    behavior: 'smooth'
                });
                // Add highlight effect
                highlightSection(target);
            }
        });
    });

    // Function to add highlight effect to a section
    function highlightSection(section) {
        section.classList.add('highlighted-section');
        setTimeout(() => {
            section.classList.remove('highlighted-section');
        }, 2000); // Remove highlight after 2 seconds
    }

    // Sticky Navbar on Scroll
    window.addEventListener('scroll', function () {
        if (window.pageYOffset > hero.offsetHeight - scrollOffset) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
    });
});
