document.addEventListener('DOMContentLoaded', function () {
    const header = document.querySelector('.navbar');
    const hero = document.querySelector('.hero');
    const scrollOffset = 60; // Height of the fixed navbar

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - scrollOffset,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Sticky Navbar on Scroll
    window.addEventListener('scroll', function () {
        if (window.pageYOffset > hero.offsetHeight - scrollOffset) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
    });
});
