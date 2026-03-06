document.addEventListener('DOMContentLoaded', () => {
    // Header Scroll Effect
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Mobile Menu Toggle
    const menuToggle = document.getElementById('mobile-menu');
    const nav = document.querySelector('.nav');

    menuToggle.addEventListener('click', () => {
        nav.classList.toggle('active');
        menuToggle.classList.toggle('active'); // Changed from 'open' to 'active'

        // Transform hamburger icon
        const spans = menuToggle.querySelectorAll('span'); // Changed from mobileMenu to menuToggle
        if (menuToggle.classList.contains('active')) { // Changed from 'open' to 'active'
            spans[0].style.transform = 'rotate(45deg) translate(6px, 6px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -7px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });

    // Close menu when link is clicked
    const navLinks = document.querySelectorAll('.nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
            mobileMenu.classList.remove('open');
            const spans = mobileMenu.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        });
    });

    // Product Slider
    const slider = document.getElementById('productSlider');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    let currentIndex = 0;

    const updateSlider = () => {
        const slideWidth = document.querySelector('.product-slide').offsetWidth + 30; // 30 is the gap
        slider.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
    };

    if (nextBtn && prevBtn) {
        nextBtn.addEventListener('click', () => {
            const maxIndex = slider.children.length - (window.innerWidth > 1024 ? 3 : window.innerWidth > 768 ? 2 : 1);
            if (currentIndex < maxIndex) {
                currentIndex++;
                updateSlider();
            } else {
                currentIndex = 0;
                updateSlider();
            }
        });

        prevBtn.addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex--;
                updateSlider();
            } else {
                const maxIndex = slider.children.length - (window.innerWidth > 1024 ? 3 : window.innerWidth > 768 ? 2 : 1);
                currentIndex = maxIndex;
                updateSlider();
            }
        });
    }

    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            // Close other open items
            faqItems.forEach(i => {
                if (i !== item) i.classList.remove('active');
            });
            item.classList.toggle('active');
        });
    });

    // Form Submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(contactForm);
            alert(`Thank you ${formData.get('name')}! Your message has been sent. We will contact you soon at ${formData.get('email')}.`);
            contactForm.reset();
        });
    }

    // Scroll Animations (Simple Intersection Observer)
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
});
