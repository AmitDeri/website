document.addEventListener('DOMContentLoaded', function () {
    const menuToggle = document.getElementById('mobile-menu');
    const navMenu = document.getElementById('nav-menu');
    
    // Toggle menu on click
    menuToggle.addEventListener('click', function () {
        navMenu.classList.toggle('active');
        this.classList.toggle('open');
    });
    
    // Close menu when a link is clicked
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function () {
            navMenu.classList.remove('active');
            menuToggle.classList.remove('open');
        });
    });
});
