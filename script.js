document.addEventListener('DOMContentLoaded', () => {
    
    // --- Sticky Navbar ---
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // --- Mobile Menu Toggle ---
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        if(navMenu.classList.contains('active')){
            navbar.classList.add('scrolled');
        } else if (window.scrollY <= 50) {
            navbar.classList.remove('scrolled');
        }
    });

    navLinks.forEach(n => n.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }));

    // --- Reveal Animation on Scroll ---
    function reveal() {
        const reveals = document.querySelectorAll('.reveal');

        for (let i = 0; i < reveals.length; i++) {
            const windowHeight = window.innerHeight;
            const elementTop = reveals[i].getBoundingClientRect().top;
            const elementVisible = 100;

            if (elementTop < windowHeight - elementVisible) {
                reveals[i].classList.add('active');
            }
        }
    }

    window.addEventListener('scroll', reveal);
    reveal(); // Trigger once on load
    
    // --- Active Link Highlighting ---
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // --- Duplicate Marquee Content for smooth infinite loop ---
    const marqueeContent = document.querySelector('.marquee-content');
    if (marqueeContent) {
        // Clone the items to make the scrolling seamless
        const clone = marqueeContent.innerHTML;
        marqueeContent.innerHTML += clone;
    }

});

// --- Lightbox Functionality ---
function openLightbox(element) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const clickedImgSrc = element.querySelector('img').src;
    
    lightboxImg.src = clickedImgSrc;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent scrolling in background
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto'; // Restore scrolling
}

// Close lightbox when clicking outside the image
document.getElementById('lightbox').addEventListener('click', function(e) {
    if (e.target !== document.getElementById('lightbox-img')) {
        closeLightbox();
    }
});
