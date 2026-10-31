document.addEventListener('DOMContentLoaded', () => {

    /* --- Navigation & Mobile Drawer --- */
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');
    const mobileBackdrop = document.getElementById('mobile-backdrop');

    // Sticky Navbar on Scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile Drawer Open / Close
    function toggleMobileMenu(open) {
        const isOpen = open !== undefined ? open : !navLinks.classList.contains('active');
        if (isOpen) {
            navLinks.classList.add('active');
            hamburger.classList.add('active');
            mobileBackdrop.classList.add('active');
            document.body.style.overflow = 'hidden';
        } else {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
            mobileBackdrop.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    if (hamburger) {
        hamburger.addEventListener('click', () => toggleMobileMenu());
    }

    if (mobileBackdrop) {
        mobileBackdrop.addEventListener('click', () => toggleMobileMenu(false));
    }

    // Smooth Scroll for Nav Links & auto-close mobile drawer
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#' || !targetId) return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                toggleMobileMenu(false);
                const navHeight = navbar ? navbar.offsetHeight : 70;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - navHeight;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    /* --- Typewriter Effect for the 3 Core Services --- */
    const textElement = document.getElementById('typewriter');
    const words = [
        "Autonomous AI Agents & Multi-Agent Swarms",
        "Self-Hosted n8n Workflow Automations",
        "Enterprise Cybersecurity & Zero-Trust SOC",
        "Local RAG Architectures & Sovereign Data Models"
    ];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 70;

    function type() {
        if (!textElement) return;
        const currentWord = words[wordIndex];

        if (isDeleting) {
            textElement.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 35;
        } else {
            textElement.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 70;
        }

        if (!isDeleting && charIndex === currentWord.length) {
            isDeleting = true;
            typeSpeed = 2200; // Pause at end
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typeSpeed = 400;
        }

        setTimeout(type, typeSpeed);
    }
    if (textElement) type();

    /* --- Stats Counter Animation --- */
    const statsSection = document.querySelector('.about-stats-matrix');
    const statNumbers = document.querySelectorAll('.stat-number');
    let statsStarted = false;

    if (statsSection && statNumbers.length > 0) {
        const statsObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !statsStarted) {
                statNumbers.forEach(num => {
                    const target = parseFloat(num.getAttribute('data-target'));
                    const isDecimal = String(target).includes('.');
                    const duration = 2000;
                    const increment = target / (duration / 16);

                    let current = 0;
                    const updateCount = () => {
                        current += increment;
                        if (current < target) {
                            num.innerText = isDecimal ? current.toFixed(2) : Math.ceil(current);
                            requestAnimationFrame(updateCount);
                        } else {
                            num.innerText = isDecimal ? target.toFixed(2) : target;
                        }
                    };
                    updateCount();
                });
                statsStarted = true;
            }
        }, { threshold: 0.2 });
        statsObserver.observe(statsSection);
    }

    /* --- Client Logo Infinite Ribbon Cloner --- */
    const tickerTrack = document.querySelector('.ticker-track');
    if (tickerTrack) {
        const items = Array.from(tickerTrack.children);
        // Duplicate once for infinite loop
        items.forEach(item => {
            const clone = item.cloneNode(true);
            tickerTrack.appendChild(clone);
        });
    }

    /* --- Matrix / Particle Background Canvas --- */
    const canvas = document.getElementById('particle-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width, height;
        let yPositions = [];
        let colors = [];
        let columnStreams = [];
        let speeds = [];
        let trailLengths = [];
        let columns = 0;

        function resize() {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
            columns = Math.floor(width / 24) + 1;
            yPositions = Array(columns).fill(0).map(() => Math.random() * height);
            colors = Array(columns).fill('normal');
            columnStreams = Array(columns).fill(0).map(() => 
                Array(120).fill(0).map(() => Math.random() < 0.5 ? '0' : '1')
            );
            speeds = Array(columns).fill(0).map(() => Math.random() * 1.4 + 1.1);
            trailLengths = Array(columns).fill(0).map(() => Math.floor(Math.random() * 8) + 8);
        }

        window.addEventListener('resize', resize);
        resize();

        // Alert Boxes DOM Elements
        const alert1 = document.getElementById('hero-alert-1');
        const alert2 = document.getElementById('hero-alert-2');
        const alert3 = document.getElementById('hero-alert-3');

        function cycleHeroAlerts() {
            // Sequence 1: AI Agents
            if (alert1) alert1.classList.add('show');
            if (alert2) alert2.classList.remove('show');
            if (alert3) alert3.classList.remove('show');

            setTimeout(() => {
                // Sequence 2: n8n Automation
                if (alert1) alert1.classList.remove('show');
                if (alert2) alert2.classList.add('show');
                if (alert3) alert3.classList.remove('show');

                setTimeout(() => {
                    // Sequence 3: Zero-Trust Defense
                    if (alert1) alert1.classList.remove('show');
                    if (alert2) alert2.classList.remove('show');
                    if (alert3) alert3.classList.add('show');

                    setTimeout(() => {
                        cycleHeroAlerts();
                    }, 5000);
                }, 5000);
            }, 5000);
        }

        cycleHeroAlerts();

        function drawMatrix() {
            ctx.fillStyle = 'rgba(10, 25, 47, 0.9)';
            ctx.fillRect(0, 0, width, height);
            ctx.font = 'bold 16px "JetBrains Mono", monospace';

            for (let i = 0; i < columns; i++) {
                const leadY = yPositions[i];
                const trailLength = trailLengths[i];
                const stream = columnStreams[i];
                const gridIndex = Math.floor(leadY / 20);

                for (let j = 0; j < trailLength; j++) {
                    const charY = leadY - (j * 20);
                    if (charY < -20 || charY > height + 20) continue;

                    const charIdx = ((gridIndex - j) % 120 + 120) % 120;
                    const char = stream[charIdx] || '1';

                    let opacity = 1 - (j / trailLength);
                    if (opacity < 0.1) opacity = 0.1;

                    // Neon cyan & mint theme
                    if (i % 3 === 0) {
                        ctx.fillStyle = `rgba(0, 255, 204, ${opacity * 0.45})`;
                    } else if (i % 3 === 1) {
                        ctx.fillStyle = `rgba(0, 180, 216, ${opacity * 0.45})`;
                    } else {
                        ctx.fillStyle = `rgba(255, 153, 51, ${opacity * 0.25})`;
                    }

                    if (j === 0) {
                        ctx.fillStyle = `rgba(255, 255, 255, ${opacity * 0.9})`;
                    }

                    ctx.fillText(char, i * 24, charY);
                }

                yPositions[i] += speeds[i];

                if (yPositions[i] > height + trailLength * 20) {
                    yPositions[i] = -25;
                    columnStreams[i] = Array(120).fill(0).map(() => Math.random() < 0.5 ? '0' : '1');
                    speeds[i] = Math.random() * 1.4 + 1.1;
                }
            }
            requestAnimationFrame(drawMatrix);
        }

        drawMatrix();
    }

    /* --- Booking / Consultation Form Handler --- */
    const bookingForm = document.getElementById('booking-form');
    const modal = document.getElementById('modal');
    const closeModal = document.querySelector('.close-modal');

    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('name').value;
            const company = document.getElementById('company').value;
            const email = document.getElementById('email').value;
            const service = document.getElementById('service').value;
            const date = document.getElementById('date').value;
            const message = document.getElementById('message').value;

            // Submit payload structure (can connect to backend / Google Apps Script / n8n Webhook)
            const payload = {
                name,
                company,
                email,
                service,
                date,
                message,
                timestamp: new Date().toISOString()
            };

            console.log('Consultation Request Logged:', payload);

            // Display confirmation modal
            if (modal) {
                modal.style.display = 'flex';
            }

            bookingForm.reset();
        });
    }

    if (closeModal) {
        closeModal.addEventListener('click', () => {
            if (modal) modal.style.display = 'none';
        });
    }

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Set today as minimum booking date
    const dateInput = document.getElementById('date');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.min = today;
    }
});
