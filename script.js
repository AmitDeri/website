document.addEventListener('DOMContentLoaded', function () {
    const menuToggle = document.getElementById('mobile-menu');
    const navMenu = document.getElementById('nav-menu');
    const navItems = document.querySelectorAll('.nav-item');
    const scrollLinks = document.querySelectorAll('.scroll-link');
    const scrollOffset = 60;

    // Mobile Menu Toggle
    menuToggle.addEventListener('click', function () {
        navMenu.classList.toggle('active');
        this.classList.toggle('active');
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function (e) {
        if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
            navMenu.classList.remove('active');
            menuToggle.classList.remove('active');
        }
    });

    // Dropdown Menu Toggle for Mobile
    navItems.forEach(function (navItem) {
        const navLink = navItem.querySelector('.nav-link');
        const dropdown = navItem.querySelector('.dropdown');

        if (dropdown) {
            navLink.addEventListener('click', function (e) {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    
                    // Close all other dropdowns
                    navItems.forEach(function (item) {
                        if (item !== navItem) {
                            item.classList.remove('open');
                        }
                    });
                    
                    // Toggle current dropdown
                    navItem.classList.toggle('open');
                }
            });
        }
    });

    // Smooth scrolling for anchor links
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
                highlightSection(target);
            }
        });
    });

    // Function to add highlight effect to a section
    function highlightSection(section) {
        section.classList.add('highlighted-section');
        setTimeout(() => {
            section.classList.remove('highlighted-section');
        }, 2000);
    }
});

document.addEventListener('DOMContentLoaded', function() {
    // Modal functionality
    const skillLinks = document.querySelectorAll('.skill-link');
    const modals = document.querySelectorAll('.modal');
    const closeButtons = document.querySelectorAll('.close-button');

    // Open modal
    skillLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const modalId = `${link.dataset.modal}-modal`;
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    // Close modal functions
    function closeModal(modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Close button click
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modal = button.closest('.modal');
            closeModal(modal);
        });
    });

    // Click outside to close
    modals.forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal(modal);
            }
        });
    });

    // Escape key to close
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            modals.forEach(modal => {
                if (modal.classList.contains('active')) {
                    closeModal(modal);
                }
            });
        }
    });
});
