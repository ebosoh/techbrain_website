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
            navbar.style.boxShadow = '0 10px 30px rgba(0,0,0,0.5)';
        } else {
            navbar.classList.remove('scrolled');
            navbar.style.background = 'var(--glass-bg)';
            navbar.style.boxShadow = 'none';
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
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    /* --- Typewriter Effect --- */
    const textElement = document.getElementById('typewriter');
    const words = [
        "Pioneering Intelligent Solutions",
        "Enterprise Cybersecurity Defense",
        "AWS, GCP, & Azure Cloud Integration",
        "AI Agent & RAG Architectures",
        "Biometric Identity & Forensics"
    ];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 80;

    function type() {
        const currentWord = words[wordIndex];

        if (isDeleting) {
            textElement.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 40;
        } else {
            textElement.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 80;
        }

        if (!isDeleting && charIndex === currentWord.length) {
            isDeleting = true;
            typeSpeed = 2500; // Pause at end
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typeSpeed = 500;
        }

        setTimeout(type, typeSpeed);
    }
    if (textElement) type();

    /* --- Stats Counter Animation --- */
    const statsSection = document.querySelector('.about-stats');
    const statNumbers = document.querySelectorAll('.stat-number');
    let started = false;

    if (statsSection && statNumbers.length > 0) {
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
    }

    /* --- Client Logo Ticker Cloner (Infinite Ribbon) --- */
    const tickerTrack = document.querySelector('.ticker-track');
    if (tickerTrack) {
        const items = Array.from(tickerTrack.children);
        // Duplicate once for seamless sliding
        items.forEach(item => {
            const clone = item.cloneNode(true);
            tickerTrack.appendChild(clone);
        });
    }

    /* --- Particle Background (Canvas) --- */
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
            columns = Math.floor(width / 25) + 1;
            yPositions = Array(columns).fill(0).map(() => Math.random() * height);
            colors = Array(columns).fill('normal');
            columnStreams = Array(columns).fill(0).map(() => 
                Array(150).fill(0).map(() => Math.random() < 0.5 ? '0' : '1')
            );
            speeds = Array(columns).fill(0).map(() => Math.random() * 1.5 + 1.2); // Base speed: 1.2 to 2.7
            trailLengths = Array(columns).fill(0).map(() => Math.floor(Math.random() * 8) + 10); // Length: 10 to 18
        }

        window.addEventListener('resize', resize);
        resize();

        let threatState = 0; // 0: Normal, 1: Intrusion, 2: Defense (Containment), 3: Mitigated
        
        // Alert boxes DOM links
        const alert1 = document.getElementById('hero-alert-1');
        const alert2 = document.getElementById('hero-alert-2');
        const alert3 = document.getElementById('hero-alert-3');

        function cycleThreatTimeline() {
            // State 1: Intrusion starts (Red)
            setTimeout(() => {
                threatState = 1;
                for (let i = 0; i < columns; i++) {
                    if (Math.random() < 0.4) colors[i] = 'red';
                }
                if (alert1) alert1.classList.add('show');
                if (alert2) alert2.classList.remove('show');
                if (alert3) alert3.classList.remove('show');

                // State 2: Defense containment starts (Cyan)
                setTimeout(() => {
                    threatState = 2;
                    for (let i = 0; i < columns; i++) {
                        if (colors[i] === 'red' || Math.random() < 0.4) colors[i] = 'cyan';
                    }
                    if (alert1) alert1.classList.remove('show');
                    if (alert2) alert2.classList.add('show');
                    if (alert3) alert3.classList.remove('show');

                    // State 3: Threat Quarantined (Green)
                    setTimeout(() => {
                        threatState = 3;
                        for (let i = 0; i < columns; i++) {
                            colors[i] = 'green';
                        }
                        if (alert1) alert1.classList.remove('show');
                        if (alert2) alert2.classList.remove('show');
                        if (alert3) alert3.classList.add('show');

                        // Reset to normal loop after 4 seconds
                        setTimeout(() => {
                            threatState = 0;
                            colors.fill('normal');
                            if (alert1) alert1.classList.remove('show');
                            if (alert2) alert2.classList.remove('show');
                            if (alert3) alert3.classList.remove('show');
                            
                            // Re-trigger cycle
                            cycleThreatTimeline();
                        }, 4000);

                    }, 5000);

                }, 5000);

            }, 4000);
        }

        // Start cycle
        cycleThreatTimeline();

        function drawMatrix() {
            // Clear canvas fully to draw clean, sharp trails without blur
            ctx.fillStyle = 'rgba(10, 25, 47, 1.0)';
            ctx.fillRect(0, 0, width, height);

            ctx.font = 'bold 20px Courier New';

            for (let i = 0; i < columns; i++) {
                const leadY = yPositions[i];
                const trailLength = trailLengths[i];
                const stream = columnStreams[i];
                const gridIndex = Math.floor(leadY / 22);

                // Draw the vertical streak of characters
                for (let j = 0; j < trailLength; j++) {
                    const charY = leadY - (j * 22);
                    if (charY < -20 || charY > height + 20) continue;

                    // Stable index mapping to keep digits static in screen space as they fall
                    const charIdx = ((gridIndex - j) % 150 + 150) % 150;
                    const char = stream[charIdx] || '0';

                    // Opacity gradient along the trail
                    let opacity = 1 - (j / trailLength);
                    if (opacity < 0.15) opacity = 0.15;

                    if (colors[i] === 'red') {
                        ctx.fillStyle = `rgba(255, 51, 51, ${opacity})`;
                    } else if (colors[i] === 'cyan') {
                        ctx.fillStyle = `rgba(0, 216, 255, ${opacity})`;
                    } else if (colors[i] === 'green') {
                        ctx.fillStyle = `rgba(0, 255, 204, ${opacity})`;
                    } else {
                        // Normal state: semi-transparent green/blue mix
                        const isGreen = (i % 2 === 0);
                        if (isGreen) {
                            ctx.fillStyle = `rgba(0, 255, 204, ${opacity * 0.55})`;
                        } else {
                            ctx.fillStyle = `rgba(0, 180, 216, ${opacity * 0.55})`;
                        }
                    }

                    // Bright white lead character
                    if (j === 0) {
                        ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
                    }

                    ctx.fillText(char, i * 25, charY);
                }

                // Speed adjustments based on color states
                let speedMultiplier = 1;
                if (colors[i] === 'red') speedMultiplier = 2.2;
                else if (colors[i] === 'cyan') speedMultiplier = 1.4;
                const speed = speeds[i] * speedMultiplier;

                yPositions[i] += speed;

                // Reset column when it fully flows off screen
                const maxLimit = height + trailLength * 22;
                if (yPositions[i] > maxLimit) {
                    yPositions[i] = -30;
                    columnStreams[i] = Array(150).fill(0).map(() => Math.random() < 0.5 ? '0' : '1');
                    speeds[i] = Math.random() * 1.5 + 1.2;
                    trailLengths[i] = Math.floor(Math.random() * 8) + 10;
                }
            }
            requestAnimationFrame(drawMatrix);
        }
        
        drawMatrix();
    }

    /* --- Enterprise Services tabbed catalog data --- */
    const enterpriseServices = {
        'cyber': {
            title: 'Enterprise Cybersecurity Solutions',
            mockupImage: 'cybersecurity_dashboard.webp',
            mockupDesc: 'Enterprise-grade threat intelligence and unified security defense dashboard, designed to detect, isolate, and mitigate threats in real time.',
            list: [
                { icon: 'fa-shield-halved', title: 'Unified EDR/XDR', desc: 'Extended detection and response across endpoints, networks, and cloud infrastructures.', image: 'cybersecurity_dashboard.webp' },
                { icon: 'fa-user-lock', title: 'Identity & Access (IAM)', desc: 'Zero-trust identity verification, Single Sign-On, and multi-factor access protocols.', image: 'biometrics_mobile.webp' },
                { icon: 'fa-bug', title: 'Penetration Testing', desc: 'Active white-hat hacking assessments to uncover system and application vulnerabilities.', image: 'cyber_threat_center.webp' },
                { icon: 'fa-network-wired', title: 'Managed SOC (24/7)', desc: 'Continuous security operations monitoring, triage, and threat mitigation.', image: 'cybersecurity_dashboard.webp' },
                { icon: 'fa-cloud-shield', title: 'Cloud Security (CSPM)', desc: 'Posture management and vulnerability scanning for multi-cloud deployments.', image: 'cloud_dashboard.webp' },
                { icon: 'fa-mask', title: 'Threat Hunting', desc: 'Proactive search for advanced persistent threats embedded in network structures.', image: 'cyber_threat_center.webp' },
                { icon: 'fa-triangle-exclamation', title: 'Incident Response', desc: 'Rapid containment, malware analysis, and disaster recovery following security breaches.', image: 'cybersecurity_forensics.webp' },
                { icon: 'fa-file-shield', title: 'Compliance & Audits', desc: 'Aligning enterprise security frameworks with ISO 27001, GDPR, and local regulations.', image: 'legal_compliance.webp' },
                { icon: 'fa-user-shield', title: 'Security Training', desc: 'Phishing simulations and cybersecurity training programs for organizational staff.', image: 'web_applications.webp' },
                { icon: 'fa-key', title: 'Data Encryption', desc: 'End-to-end data encryption protocols for storage databases and transit pipelines.', image: 'biometrics_mobile.webp' }
            ]
        },
        'cloud': {
            title: 'Multi-Cloud Enterprise Scale',
            mockupImage: 'cloud_dashboard.webp',
            mockupDesc: 'Seamless multi-cloud dashboard connecting Amazon Web Services (AWS), Google Cloud Platform (GCP), and Microsoft Azure deployments.',
            list: [
                { icon: 'fa-cloud-arrow-up', title: 'Cloud Migration', desc: 'Zero-downtime database and system migrations to public or hybrid clouds.', image: 'cloud_dashboard.webp' },
                { icon: 'fa-cubes', title: 'Kubernetes & DevOps', desc: 'Infrastructure as Code (IaC) and CI/CD pipelines for automated scaling.', image: 'kenya_semiconductors.webp' },
                { icon: 'fa-chart-line', title: 'Cost Optimization', desc: 'FinOps audits to eliminate cloud waste and scale resource usage efficiently.', image: 'africa_fintech.webp' },
                { icon: 'fa-server', title: 'AWS Cloud Architecture', desc: 'High-availability architecture design using Amazon Web Services.', image: 'cloud_dashboard.webp' },
                { icon: 'fa-brands fa-google', title: 'Google Cloud Platform', desc: 'AI-centric cloud environments and big data integrations using GCP.', image: 'web_applications.webp' },
                { icon: 'fa-brands fa-microsoft', title: 'Microsoft Azure', desc: 'Enterprise active directory integrations and hybrid cloud systems via Azure.', image: 'cloud_dashboard.webp' }
            ]
        },
        'forensics': {
            title: 'Digital Forensics & Biometrics',
            mockupImage: 'biometrics_mobile.webp',
            mockupDesc: 'Holographic device scanner UI illustrating multi-factor identity authorization and digital evidence extraction protocols.',
            list: [
                { icon: 'fa-fingerprint', title: 'Biometric Auth', desc: 'Implementing iris scan, facial recognition, and fingerprint authentication nodes.', image: 'biometrics_mobile.webp' },
                { icon: 'fa-laptop-file', title: 'Computer Forensics', desc: 'Post-incident hard drive replication and forensic recovery of lost data.', image: 'cybersecurity_forensics.webp' },
                { icon: 'fa-mobile-screen-button', title: 'Mobile Forensics', desc: 'Extracting data, messages, and application logs from encrypted mobile devices.', image: 'biometrics_mobile.webp' },
                { icon: 'fa-database', title: 'Database Cryptanalysis', desc: 'Recovering corrupted or ransomware-locked database records securely.', image: 'cybersecurity_forensics.webp' },
                { icon: 'fa-envelope-open-text', title: 'Network & Email Forensics', desc: 'Tracing headers and routing nodes to isolate source of malicious traffic.', image: 'cyber_threat_center.webp' },
                { icon: 'fa-address-card', title: 'Biometric KYC', desc: 'Automated identity verification systems for banking and security portals.', image: 'biometrics_mobile.webp' },
                { icon: 'fa-user-secret', title: 'Insider Threat Auditing', desc: 'Tracking user behaviors to identify and contain internal data leak points.', image: 'cyber_threat_center.webp' },
                { icon: 'fa-gavel', title: 'Legal Expert Testimony', desc: 'Preparing chain-of-custody documentation and expert testimony for courts.', image: 'legal_compliance.webp' }
            ]
        },
        'surveillance': {
            title: 'Surveillance & Access Control',
            mockupImage: 'surveillance_tablet.webp',
            mockupDesc: 'Smart control panel depicting motion sensor status, remote locks, and AI analytics on a central interface.',
            list: [
                { icon: 'fa-video', title: 'IP CCTV Networks', desc: 'Designing and deploying high-definition network camera surveillance.', image: 'surveillance_tablet.webp' },
                { icon: 'fa-brain', title: 'AI Video Analytics', desc: 'Machine vision overlays for motion detection, loitering, and virtual fences.', image: 'cyber_threat_center.webp' },
                { icon: 'fa-door-closed', title: 'Biometric Doors', desc: 'Access controllers integrated with magnetic locks and readers.', image: 'biometrics_mobile.webp' },
                { icon: 'fa-walkie-talkie', title: 'Perimeter Intrusion', desc: 'Seismic and fiber-optic perimeter detection systems.', image: 'surveillance_tablet.webp' }
            ]
        },
        'ai': {
            title: 'Artificial Intelligence Solutions',
            mockupImage: 'ai_agent_dashboard.webp',
            mockupDesc: 'Holographic display showing an active generative AI agent workflow, combining RAG architectures and model pipelines.',
            list: [
                { icon: 'fa-brain', title: 'Custom LLMs & RAG', desc: 'Retrieval Augmented Generation pipelines for searching local data corpuses.', image: 'ai_chatbot_interface.webp' },
                { icon: 'fa-eye', title: 'Computer Vision Systems', desc: 'Image classification, object counting, and quality control systems.', image: 'predictive_maintenance.webp' },
                { icon: 'fa-chart-pie', title: 'Predictive Analytics', desc: 'Analyzing telemetry datasets to forecast machinery or server faults.', image: 'predictive_maintenance.webp' },
                { icon: 'fa-robot', title: 'Autonomous AI Agents', desc: 'Specialized agentic workers performing automated business workflows.', image: 'collaborative_agents.webp' },
                { icon: 'fa-comments', title: 'Booking Conversational AI', desc: 'Automating customer intake and scheduling via text/voice AI agents.', image: 'booking_appointment.webp' }
            ]
        }
    };

    const serviceListContainer = document.getElementById('services-grid-list');
    const serviceMockupImg = document.getElementById('service-mockup-img');
    const serviceMockupTitle = document.getElementById('service-mockup-title');
    const serviceMockupDesc = document.getElementById('service-mockup-desc-text');
    const servicesTabBtns = document.querySelectorAll('.services-tab-btn');

    function renderServices(categoryKey) {
        const catData = enterpriseServices[categoryKey];
        if (!catData) return;

        // Update mockup panel
        if (serviceMockupImg) serviceMockupImg.src = catData.mockupImage;
        if (serviceMockupTitle) serviceMockupTitle.innerText = catData.title;
        if (serviceMockupDesc) serviceMockupDesc.innerText = catData.mockupDesc;

        // Render grid items
        if (serviceListContainer) {
            serviceListContainer.innerHTML = catData.list.map((srv, idx) => `
                <div class="service-card-item" data-index="${idx}" data-category="${categoryKey}">
                    <div class="icon-box"><i class="fa-solid ${srv.icon}"></i></div>
                    <h4>${srv.title}</h4>
                    <p>${srv.desc}</p>
                    <a href="#" class="learn-more">Learn More <i class="fa-solid fa-arrow-right"></i></a>
                </div>
            `).join('');

            // Add Click Listeners to dynamically rendered items
            serviceListContainer.querySelectorAll('.service-card-item').forEach(item => {
                item.addEventListener('click', (e) => {
                    e.preventDefault();
                    const cat = item.getAttribute('data-category');
                    const idx = parseInt(item.getAttribute('data-index'));
                    openServiceDetail(cat, idx);
                });
            });
        }
    }

    // Tab switcher events
    servicesTabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            servicesTabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const targetCat = btn.getAttribute('data-tab');
            renderServices(targetCat);
        });
    });

    // Render initial category (cybersecurity)
    if (servicesTabBtns.length > 0) {
        renderServices('cyber');
    }

    /* --- Service Detail Modal Logic --- */
    const serviceModal = document.getElementById('service-modal');
    const closeServiceModal = document.querySelector('.close-modal-service');
    const modalImage = document.getElementById('modal-service-image');
    const modalTitle = document.getElementById('modal-service-title');
    const modalDesc = document.getElementById('modal-service-description');

    // Detailed Descriptions for modal popups
    const serviceDetails = {
        'cyber': {
            'Unified EDR/XDR': 'Proactive protection, monitoring threats across server assets, computer interfaces, and user terminals. Includes automatic firewall isolated routing.',
            'Identity & Access (IAM)': 'Enterprise zero trust configurations integrating secure Single-Sign-On and automated biometric policies across local networks.',
            'Penetration Testing': 'Simulating active security bypass scenarios to test server room networks, data pipelines, and customer login interfaces.',
            'Managed SOC (24/7)': 'Constant oversight and system auditing by local cybersecurity team. Automatic warning logs are cataloged on hard disk.',
            'Cloud Security (CSPM)': 'Continuous monitoring of cloud asset configurations to prevent open server leaks on AWS, GCP, and Azure.'
        },
        'cloud': {
            'Cloud Migration': 'Zero-downtime transfers of business records, web assets, and operational logs to cloud servers.',
            'Kubernetes & DevOps': 'Configuring scalable server architectures and deployment automations to handle enterprise traffic spikes.'
        },
        'forensics': {
            'Biometric Auth': 'Configuring Iris scan and Face validation interfaces. Blended imagery ensures inclusive system integration.',
            'Computer Forensics': 'Reconstructing forensic timelines of breaches on computer workstations, recovering deleted system logs, and compiling chain of custody reports.'
        },
        'surveillance': {
            'IP CCTV Networks': 'Deploying high-definition surveillance camera grids mapped securely to localized physical control rooms.',
            'AI Video Analytics': 'Using computer vision algorithms on server nodes to identify unrecognized intrusions, unauthorized vehicles, and perimeter breeches.'
        },
        'ai': {
            'Custom LLMs & RAG': 'Deploying localized Large Language Models running RAG configurations to search corporate data archives privately on local systems.',
            'Autonomous AI Agents': 'Designing autonomous workspace workflows where custom AI agents interact to write documents, coordinate sales operations, or log events.'
        }
    };

    function getHumanFriendlyDescription(category, item) {
        if (serviceDetails[category] && serviceDetails[category][item.title]) {
            return serviceDetails[category][item.title];
        }
        
        const templates = [
            `Our approach to **${item.title}** focuses on long-term stability and resilience. ${item.desc} This is designed to eliminate operational vulnerabilities and streamline your systems' workflow.`,
            `We specialize in integrating **${item.title}** directly into your enterprise infrastructure. ${item.desc} This implementation helps keep your critical data pipelines protected, efficient, and fully compliant.`,
            `By deploying **${item.title}**, we help your organization achieve greater agility and robust security. ${item.desc} This setup is optimized to maximize performance and prevent unexpected system bottlenecks.`,
            `We offer comprehensive management and deployment for **${item.title}**. ${item.desc} This ensures seamless cross-platform operations and high-speed telemetry across all nodes.`
        ];
        
        const idx = (item.title.length + item.desc.length) % templates.length;
        return templates[idx];
    }

    function openServiceDetail(category, index) {
        const catData = enterpriseServices[category];
        if (!catData) return;
        const item = catData.list[index];
        if (!item) return;

        const detailText = getHumanFriendlyDescription(category, item);

        if (modalTitle) modalTitle.innerText = item.title;
        if (modalImage) modalImage.src = item.image || catData.mockupImage;
        if (modalDesc) {
            modalDesc.innerHTML = `
                <p><strong>Service Catalog:</strong> ${catData.title}</p>
                <p>${detailText}</p>
                <h4 style="margin: 20px 0 10px; color: var(--color-accent);">Enterprise Highlights</h4>
                <ul style="list-style: disc; margin-left: 20px; color: var(--color-text-muted);">
                    <li>Optimized for low-bandwidth environments</li>
                    <li>24/7 Security Operations Center monitoring integration</li>
                    <li>Zero-trust validation architecture</li>
                    <li>Full compliance auditing trails logged on local server</li>
                </ul>
            `;
        }

        if (serviceModal) {
            serviceModal.style.display = 'flex';
            serviceModal.offsetHeight;
            serviceModal.classList.add('show');
        }
    }

    if (closeServiceModal) {
        closeServiceModal.addEventListener('click', () => {
            serviceModal.classList.remove('show');
            setTimeout(() => {
                serviceModal.style.display = 'none';
            }, 300);
        });
    }

    // Close on outside click
    window.addEventListener('click', (e) => {
        if (e.target == serviceModal) {
            serviceModal.classList.remove('show');
            setTimeout(() => {
                serviceModal.style.display = 'none';
            }, 300);
        }
    });

    /* --- Dynamic Tech and AI News Fetcher --- */
    async function fetchTechNews() {
        const feedUrl = 'https://techcabal.com/feed';
        // Use rss2json API proxy to bypass CORS
        const proxyUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(feedUrl)}`;
        
        const tickerContainer = document.getElementById('news-ticker-briefs');
        const cardsContainer = document.getElementById('news-cards-feed');

        const fallbackNews = [
            {
                title: "Senegal Launches Sovereignty AI Supercomputer and Data Storage Facility",
                pubDate: "2026-06-10 09:00:00",
                link: "https://techcabal.com/",
                description: "Senegal's government has commissioned a high-density supercomputer center to host AI infrastructure locally, helping startups keep sovereign data on the continent.",
                categories: ["AI Infrastructure"]
            },
            {
                title: "South Africa Promotes AI Solutions in Rural Healthcare Diagnostics",
                pubDate: "2026-06-08 14:15:00",
                link: "https://techcabal.com/",
                description: "Clinics in Eastern Cape are deploying AI diagnostics tools to analyze X-rays, speeding up tuberculosis detection from days to under ten minutes.",
                categories: ["HealthTech"]
            },
            {
                title: "Kenya Enacts Comprehensive Data Shield & Zero Trust Framework",
                pubDate: "2026-06-06 11:30:00",
                link: "https://techcabal.com/",
                description: "Kenya's technology regulatory authority has published rules enforcing zero trust protocols for financial and cloud data, boosting cybersecurity requirements.",
                categories: ["Cybersecurity"]
            },
            {
                title: "African Developers Build Open-Source LLMs for Indigenous Languages",
                pubDate: "2026-06-03 16:45:00",
                link: "https://techcabal.com/",
                description: "A collaborative effort has resulted in new generative models trained on Swahili, Yoruba, and Zulu, reducing language barriers in conversational systems.",
                categories: ["Generative AI"]
            },
            {
                title: "Nigeria's Tech Hubs Witness Surge in Venture Funding for Enterprise AI",
                pubDate: "2026-06-01 10:00:00",
                link: "https://techcabal.com/",
                description: "Startups building local LLM agent systems and RAG database architectures in Lagos secured major funding rounds from global enterprise investors.",
                categories: ["Venture Capital"]
            }
        ];

        try {
            const response = await fetch(proxyUrl);
            if (!response.ok) throw new Error("RSS Proxy response failed");
            const data = await response.json();
            
            if (data.status === 'ok' && data.items && data.items.length > 0) {
                renderNewsContent(data.items.slice(0, 3), data.items.slice(0, 6));
            } else {
                renderNewsContent(fallbackNews.slice(0, 3), fallbackNews);
            }
        } catch (error) {
            console.warn("Dynamic news fetch failed, loading secure fallback.", error);
            renderNewsContent(fallbackNews.slice(0, 3), fallbackNews);
        }
    }

    function renderNewsContent(cardNews, tickerNews) {
        const tickerContainer = document.getElementById('news-ticker-briefs');
        const cardsContainer = document.getElementById('news-cards-feed');

        if (tickerContainer) {
            tickerContainer.innerHTML = tickerNews.map(article => {
                const dateObj = new Date(article.pubDate);
                const timeStr = dateObj.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
                return `
                    <div class="news-ticker-item">
                        <div class="news-ticker-meta">[INTEL BRIEFING | ${timeStr}]</div>
                        <div>${article.title}</div>
                    </div>
                `;
            }).join('');
        }

        if (cardsContainer) {
            cardsContainer.innerHTML = cardNews.map(article => {
                const dateObj = new Date(article.pubDate);
                const dateStr = dateObj.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
                const tag = article.categories && article.categories.length > 0 ? article.categories[0] : 'TECH NEWS';
                
                // Strip HTML and truncate
                const rawDesc = article.description || '';
                const cleanDesc = rawDesc.replace(/<[^>]*>/g, '').trim();
                const shortDesc = cleanDesc.length > 130 ? cleanDesc.substring(0, 130) + '...' : cleanDesc || 'Click to view the full details of this technological development.';

                return `
                    <div class="news-item-card glass-panel">
                        <div class="news-item-content">
                            <div class="news-item-tag">${tag}</div>
                            <h3 class="news-item-title">${article.title}</h3>
                            <p class="news-item-summary">${shortDesc}</p>
                        </div>
                        <a href="${article.link}" target="_blank" class="news-item-action">
                            Source Coverage <i class="fa-solid fa-arrow-up-right-from-square" style="font-size: 0.8rem;"></i>
                        </a>
                    </div>
                `;
            }).join('');
        }
    }

    // Fetch news on load
    fetchTechNews();

    /* --- Client Apps Mock Login Modal --- */
    const loginModal = document.getElementById('login-modal');
    const closeLoginModal = document.querySelector('.close-login-modal');

    const webApplications = {
        'mydoc': {
            name: 'myDOC',
            url: 'https://script.google.com/macros/s/AKfycbyMX1q7M14WhXsskbElNNJqVwIlyMJ1aZOfZx5WL8GwqdUz5sblYrEzOiOeUhk0yBYuCA/exec',
            email: 'techbrainai.test@gmail.com',
            password: 'apptest12345',
            instructions: 'Welcome to myDOC - a comprehensive digital clinic management system. Use the test credentials below to explore the application. After logging in, you\'ll have access to patient management, appointment scheduling, billing, and more.'
        }
    };

    window.openLoginModal = function (appKey) {
        const app = webApplications[appKey];
        if (!app) return;

        document.getElementById('login-app-name').innerText = `${app.name} Login`;
        document.getElementById('login-instructions-text').innerText = app.instructions;
        document.getElementById('login-email').innerText = app.email;
        document.getElementById('login-password').innerText = app.password;
        document.getElementById('open-app-btn').href = app.url;

        if (loginModal) {
            loginModal.style.display = 'flex';
            setTimeout(() => {
                loginModal.classList.add('show');
            }, 10);
        }
    };

    if (closeLoginModal) {
        closeLoginModal.addEventListener('click', () => {
            loginModal.classList.remove('show');
            setTimeout(() => {
                loginModal.style.display = 'none';
            }, 300);
        });
    }

    window.addEventListener('click', (e) => {
        if (e.target == loginModal) {
            loginModal.classList.remove('show');
            setTimeout(() => {
                loginModal.style.display = 'none';
            }, 300);
        }
    });

    window.copyToClipboard = function (elementId) {
        const element = document.getElementById(elementId);
        const text = element.innerText;

        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);

        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);

        const copyBtn = event.target.closest('.copy-btn');
        const originalHTML = copyBtn.innerHTML;
        copyBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
        copyBtn.style.background = 'var(--color-accent)';
        copyBtn.style.color = 'var(--color-primary)';

        setTimeout(() => {
            copyBtn.innerHTML = originalHTML;
            copyBtn.style.background = 'transparent';
            copyBtn.style.color = 'var(--color-secondary)';
        }, 2000);
    };

    /* --- Booking Form Submission --- */
    const bookingForm = document.getElementById('booking-form');
    const successModal = document.getElementById('modal');
    const closeSuccessModal = document.querySelector('.close-modal');

    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Show Success Modal
            if (successModal) {
                successModal.style.display = 'flex';
            }
            bookingForm.reset();
        });
    }

    if (closeSuccessModal) {
        closeSuccessModal.addEventListener('click', () => {
            if (successModal) successModal.style.display = 'none';
        });
    }

    window.addEventListener('click', (e) => {
        if (e.target == successModal) {
            successModal.style.display = 'none';
        }
    });

});
