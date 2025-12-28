document.addEventListener('DOMContentLoaded', () => {

    /* --- Navigation & Scroll --- */
    const navbar = document.getElementById('navbar');
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    // Sticky Navbar
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
            navbar.style.background = 'rgba(10, 25, 47, 0.95)';
        } else {
            navbar.classList.remove('scrolled');
            navbar.style.background = 'var(--glass-bg)';
        }
    });

    // Mobile Menu
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Smooth Scroll for Anchors
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            navLinks.classList.remove('active');
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    /* --- Typewriter Effect --- */
    const textElement = document.getElementById('typewriter');
    const words = ["We build", "We automate", "We predict", "We transform"];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function type() {
        const currentWord = words[wordIndex];

        if (isDeleting) {
            textElement.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 50;
        } else {
            textElement.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 100;
        }

        if (!isDeleting && charIndex === currentWord.length) {
            isDeleting = true;
            typeSpeed = 2000; // Pause at end
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typeSpeed = 500;
        }

        setTimeout(type, typeSpeed);
    }
    type();

    /* --- Stats Counter Animation --- */
    const statsSection = document.querySelector('.about-stats');
    const statNumbers = document.querySelectorAll('.stat-number');
    let started = false;

    const statsObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !started) {
            statNumbers.forEach(num => {
                const target = +num.getAttribute('data-target');
                const duration = 2000; // ms
                const increment = target / (duration / 16); // 60fps

                let current = 0;
                const updateCount = () => {
                    current += increment;
                    if (current < target) {
                        num.innerText = Math.ceil(current);
                        requestAnimationFrame(updateCount);
                    } else {
                        num.innerText = target;
                    }
                };
                updateCount();
            });
            started = true;
        }
    });
    statsObserver.observe(statsSection);

    /* --- Services Carousel (Infinite Auto-Scroll) --- */
    const servicesTrack = document.getElementById('services-track');
    // Clone children for infinite seamless loop
    const serviceCards = Array.from(servicesTrack.children);
    serviceCards.forEach(card => {
        const clone = card.cloneNode(true);
        servicesTrack.appendChild(clone);
    });

    // JS animation for smoother control than CSS keyframes on dynamic widths
    let scrollPos = 0;
    const speed = 1; // Pixels per frame

    function animateServices() {
        scrollPos += speed;
        // If we've scrolled past the first set of cards, reset to 0
        // We assume the track is now double length. Reset when half is scrolled.
        if (scrollPos >= servicesTrack.scrollWidth / 2) {
            scrollPos = 0;
        }
        servicesTrack.style.transform = `translateX(-${scrollPos}px)`;
        requestAnimationFrame(animateServices);
    }
    animateServices();


    /* --- Client Carousel --- */
    const track = document.getElementById('client-track');
    const slides = Array.from(track.children);
    const nextBtn = document.getElementById('next-slide');
    const prevBtn = document.getElementById('prev-slide');
    let currentSlideIndex = 0;

    function updateSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        slides[index].classList.add('active');
    }

    function nextSlide() {
        currentSlideIndex = (currentSlideIndex + 1) % slides.length;
        updateSlide(currentSlideIndex);
    }

    function prevSlide() {
        currentSlideIndex = (currentSlideIndex - 1 + slides.length) % slides.length;
        updateSlide(currentSlideIndex);
    }

    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);

    // Auto rotate
    setInterval(nextSlide, 5000);

    /* ---// Booking Form Handling
const bookingForm = document.getElementById('booking-form');
const modal = document.getElementById('modal');
const closeModal = document.querySelector('.close-modal');

if (bookingForm) {
    bookingForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Collect form data
        const formData = {
            name: document.getElementById('name').value,
            company: document.getElementById('company').value,
            email: document.getElementById('email').value,
            service: document.getElementById('service').value,
            date: document.getElementById('date').value,
            message: document.getElementById('message').value
        };

        const submitBtn = bookingForm.querySelector('button');
        const originalBtnText = submitBtn.innerText;
        submitBtn.innerText = 'Sending...';
        submitBtn.disabled = true;

        // Replace this URL with your deployed Web App URL
        const scriptURL = 'https://script.google.com/macros/s/AKfycbzJqvstgRDPdMalAvPiOHNbafA_am0umkyCpO77f5GfGKHhsOUp68Pc1ESfNGddbT9Q/exec';

        fetch(scriptURL, {
            method: 'POST',
            mode: 'no-cors', // Important for GAS Web Apps if not using strict CORS headers setup
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(response => {
            // Reset form
            bookingForm.reset();
            // Show Success Modal
            modal.style.display = 'flex';
            
            submitBtn.innerText = originalBtnText;
            submitBtn.disabled = false;
        })
        .catch(error => {
            console.error('Error!', error.message);
            // Fallback for demo purposes even if fetch fails due to 'no-cors' opacity or invalid URL
            modal.style.display = 'flex';
            submitBtn.innerText = originalBtnText;
            submitBtn.disabled = false;
        });
    });
}
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target == modal) {
            modal.style.display = 'none';
        }
    });

    /* --- Particle Background (Canvas) --- */
    const canvas = document.getElementById('particle-canvas');
    const ctx = canvas.getContext('2d');

    let width, height;
    let particles = [];

    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }

    window.addEventListener('resize', resize);
    resize();

    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.vx = (Math.random() - 0.5) * 1; // Velocity
            this.vy = (Math.random() - 0.5) * 1;
            this.size = Math.random() * 2 + 1;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            // Bounce screen edges
            if (this.x < 0 || this.x > width) this.vx *= -1;
            if (this.y < 0 || this.y > height) this.vy *= -1;
        }

        draw() {
            ctx.fillStyle = 'rgba(0, 255, 204, 0.5)';
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function initParticles() {
        particles = [];
        const numParticles = Math.min(width < 768 ? 50 : 100, 150);
        for (let i = 0; i < numParticles; i++) {
            particles.push(new Particle());
        }
    }

    function animateParticles() {
        ctx.clearRect(0, 0, width, height);

        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();

            // Draw connections
            for (let j = i; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 150) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(0, 180, 216, ${1 - distance / 150})`;
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
        requestAnimationFrame(animateParticles);
    }

    initParticles();
    animateParticles();
});
