document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.main-nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    const scrollArrow = document.getElementById('scroll-to-about');
    if (scrollArrow) {
        scrollArrow.addEventListener('click', function(event) {
            event.preventDefault();
            const aboutSection = document.querySelector('#about');
            if (aboutSection) {
                aboutSection.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    }

    const card = document.getElementById('project-card');
    const img = document.getElementById('project-image');
    const title = document.getElementById('project-title');
    const desc = document.getElementById('project-desc');
    const prev = document.getElementById('proj-prev');
    const next = document.getElementById('proj-next');

    let projects = [];
    let writings = [];
    let index = 0;
    let timerId;

    function renderProject(i) {
        const p = projects[i];
        if (!p) return;
        card.style.opacity = 0;
        setTimeout(() => {
            img.src = p.image || p.img;
            title.textContent = p.title;
            desc.textContent = p.desc;
            card.dataset.url = p.url || '';
            card.style.opacity = 1;
        }, 120);
    }

    function advance(step) {
        index = (index + step + projects.length) % projects.length;
        renderProject(index);
        restartTimer();
    }

    function restartTimer() {
        if (timerId) clearInterval(timerId);
        timerId = setInterval(() => advance(1), 20000);
    }

    function renderWritings() {
        const grid = document.getElementById('writings-grid');
        if (!grid || writings.length === 0) return;
        grid.innerHTML = '';
        writings.slice(0, 6).forEach(w => {
            const link = document.createElement('a');
            link.className = 'writing-card';
            link.href = w.url || 'https://medium.com/@ahmetuman5';
            link.target = '_blank';
            link.rel = 'noopener';
            link.innerHTML = `
                <img class="writing-thumb" src="${w.image}" alt="" />
                <h4 class="writing-title">${w.title}</h4>
                <p class="writing-summary">${w.summary}</p>
            `;
            grid.appendChild(link);
        });
    }

    function typeText(el, text, speed) {
        if (!el) return;
        el.textContent = '';
        let i = 0;
        (function tick() {
            if (i <= text.length) {
                el.textContent = text.slice(0, i);
                i++;
                setTimeout(tick, speed);
            } else {
                setTimeout(() => { i = 0; tick(); }, 2600);
            }
        })();
    }

    const data = {
        "welcome": {
            "headline": "Hi, I'm Ahmet. Welcome to my portfolio.",
            "subhead": "I build intelligent systems, craft robust software, and write about it."
        },
        "socials": {
            "linkedin": "https://www.linkedin.com/in/ahmet-uman",
            "github": "https://github.com/ahmetuman",
            "twitter": "https://twitter.com/ahmettuyuson",
            "medium": "https://medium.com/@ahmetuman5"
        },
        "cvUrl": "ahmetuman_resume.pdf",
        "about": {
            "image": "kedi.jpg",
            "paragraphs": [
                "Computer Engineering graduate specialized in computer vision, graphics, and algorithms. Hands-on experience in accelerating, deploying, and scaling AI models using TensorFlow, PyTorch, and CUDA.",
                "Delivered production-level solutions in face recognition, image generation, OCR, and synthetic data. Skilled in CI/CD, Docker, and Linux environments with a passion for optimizing model efficiency and inference performance."
            ]
        },
        "techStack": [
            "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
            "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg",
            "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg",
            "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg",
            "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/opencv/opencv-original.svg",
            "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
            "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg",
            "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg",
            "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg"
        ],
        "experience": [
            { "title": "Artificial Intelligence Engineer Intern - Baykar Teknoloji", "date": "08/2025 – 09/2025", "desc": "Researched and implemented Gaussian Splatting techniques for synthetic data generation. Deployed and benchmarked state-of-the-art open-source repositories on GPU clusters using CUDA and PyTorch. Collaborated with AI Software Technologies Department to integrate synthetic data pipelines." },
            { "title": "Artificial Intelligence Engineer Intern - InfoDif", "date": "06/2025 – 07/2025", "desc": "Conducted research on Word Sense Disambiguation (WSD) for semantic analysis. Implemented AI-powered Chess Bot and image detection algorithms for Sudoku puzzles using computer vision and rule-based reasoning. Supported R&D by labeling and curating image datasets." },
            { "title": "Mental Arts Internship Training Program - BTS Group", "date": "10/2024 – 05/2025", "desc": "Participated in comprehensive training program covering AI, Data, DevOps, and Software Engineering. Optimized Docker, Kubernetes, and CI/CD pipelines for production environments." },
            { "title": "Computer Engineering Intern - BITES Defence and Aerospace", "date": "07/2024 – 09/2024", "desc": "Designed and developed face recognition system, optimizing database query performance from 250ms to 75ms. Developed HOG-based face recognition model with Dlib and OpenCV, reducing GPU inference time by 40%. Built low-latency API with FastAPI for real-time queries." },
            { "title": "Problem Setter & Instructor - ACM Hacettepe", "date": "11/2022 – 03/2024", "desc": "Prepared 7 algorithmic problems (2 hard, 3 medium, 2 easy) for HUPROG'24, one of Turkey's largest competitive programming contests. Taught Dynamic Programming and Graph Algorithms to 12 students." }
        ],
        "education": [
            {
                "logo": "https://upload.wikimedia.org/wikipedia/commons/4/43/Hacettepe_University_logo.png",
                "university": "Hacettepe University",
                "meta": "Bachelor's Degree in Computer Engineering • 2021",
                "desc": "Relevant Courses: Computer Graphics, Image Processing, Machine Learning, Data Management, Theory of Computation, Data-Intensive Applications, Defense Industry 401, Computational Photography. Communities: ACM Hacettepe (RD Member), Free Software Community (Board Member), Knights Board Game Club."
            }
        ],
        "projects": [
            {
                "title": "Graduation Project: LLM-Supported Image Generation in Fashion Domain",
                "desc": "Developed an LLM-supported image generation system using Stable Diffusion model as part of a project supported by HAVELSAN SUIT. Focused on model efficiency and inference optimization, experimenting with ControlNET and Hiera Fashion techniques.",
                "image": "https://picsum.photos/seed/p1/1200/700",
                "url": "https://github.com/ahmetuman"
            },
            {
                "title": "Tooningo - AI-Powered Comic Book Translation",
                "desc": "Developed OCR + CV models (YOLO, Tesseract OCR) for multilingual comic translation as part of Hacettepe Technopark Pre-Incubation. Cut inference time by 50%, reducing OCR latency from 120ms to 60ms with CUDA. Applied layer pruning & fusion for efficiency.",
                "image": "https://picsum.photos/seed/p2/1200/700",
                "url": "https://github.com/ahmetuman"
            }
        ],
        "writings": [
            {
                "title": "GANs for Data Augmentation",
                "summary": "How synthetic data can unlock performance when real data is scarce.",
                "image": "https://picsum.photos/seed/w1/900/560",
                "url": "https://medium.com/@ahmetuman5"
            },
            {
                "title": "Structure from Motion Basics",
                "summary": "From images to point clouds with COLMAP and practical tips.",
                "image": "https://picsum.photos/seed/w2/900/560",
                "url": "https://medium.com/@ahmetuman5"
            },
            {
                "title": "Optimizing Inference",
                "summary": "Strategies to squeeze latency on CPU/GPU without sacrificing accuracy.",
                "image": "https://picsum.photos/seed/w3/900/560",
                "url": "https://medium.com/@ahmetuman5"
            },
            {
                "title": "Vision on the Edge",
                "summary": "Deploying computer vision models to edge devices reliably.",
                "image": "https://picsum.photos/seed/w4/900/560",
                "url": "https://medium.com/@ahmetuman5"
            },
            {
                "title": "Modern CUDA Patterns",
                "summary": "Designing GPU kernels for throughput and maintainability.",
                "image": "https://picsum.photos/seed/w5/900/560",
                "url": "https://medium.com/@ahmetuman5"
            },
            {
                "title": "Choosing Embeddings",
                "summary": "Trade-offs across sentence transformers for search and clustering.",
                "image": "https://picsum.photos/seed/w6/900/560",
                "url": "https://medium.com/@ahmetuman5"
            }
        ],
        "contact": {
            "title": "Let's work together",
            "desc": "Open to collaborations, roles, and interesting problems. Based in Ankara, TR.",
            "email": "mailto:ahmetuman5@gmail.com?subject=Hi%20Ahmet!",
            "phone": "+90 543 516 1931",
            "emailAddress": "ahmetuman5@gmail.com"
        }
    };

    (function() {
        const socials = data.socials || {};
        const cvUrl = data.cvUrl || '#';
        const about = data.about || {};
        const tech = data.techStack || [];
        const exp = data.experience || [];
        const edu = data.education || [];
        const welcome = data.welcome || {};
        const contact = data.contact || {};
        projects = data.projects || [];
        writings = data.writings || [];

            const linkLinkedin = document.getElementById('link-linkedin');
            const linkGithub = document.getElementById('link-github');
            const linkTwitter = document.getElementById('link-twitter');
            const linkCv = document.getElementById('link-cv');
            const linkMedium = document.getElementById('link-medium');
            if (linkLinkedin) linkLinkedin.href = socials.linkedin || '#';
            if (linkGithub) linkGithub.href = socials.github || '#';
            if (linkTwitter) linkTwitter.href = socials.twitter || '#';
            if (linkMedium) linkMedium.href = socials.medium || '#';
            if (linkCv) linkCv.href = cvUrl;

            const aboutImg = document.getElementById('about-img');
            const aboutText = document.getElementById('about-text');
            if (aboutImg && about.image) aboutImg.src = about.image;
            if (aboutText && Array.isArray(about.paragraphs)) {
                aboutText.innerHTML = '';
                about.paragraphs.forEach(p => {
                    const el = document.createElement('p');
                    el.textContent = p;
                    aboutText.appendChild(el);
                });
            }

            const techStrip = document.getElementById('tech-strip');
            if (techStrip) {
                techStrip.innerHTML = '';
                tech.forEach(src => {
                    const i = document.createElement('img');
                    i.src = src;
                    i.alt = '';
                    techStrip.appendChild(i);
                });
            }

            const expTimeline = document.getElementById('exp-timeline');
            if (expTimeline) {
                expTimeline.innerHTML = '';
                exp.forEach(item => {
                    const wrap = document.createElement('div');
                    wrap.className = 'timeline-item';
                    wrap.innerHTML = `
                        <div class="timeline-dot"></div>
                        <div class="timeline-content">
                            <h3 class="timeline-title">${item.title}</h3>
                            <p class="timeline-meta">${item.date}</p>
                            <p class="timeline-desc">${item.desc}</p>
                        </div>`;
                    expTimeline.appendChild(wrap);
                });
            }

            const eduTimeline = document.getElementById('edu-timeline');
            if (eduTimeline) {
                eduTimeline.innerHTML = '';
                edu.forEach(e => {
                    const wrap = document.createElement('div');
                    wrap.className = 'edu-item';
                    wrap.innerHTML = `
                        <div class="edu-logo"><img src="${e.logo}" alt="${e.university}" /></div>
                        <div class="edu-content">
                            <h3 class="edu-title">${e.university}</h3>
                            <p class="edu-meta">${e.meta}</p>
                            <p class="edu-desc">${e.desc}</p>
                        </div>`;
                    eduTimeline.appendChild(wrap);
                });
            }

            const hero = document.getElementById('welcome-hero');
            const sub = document.getElementById('welcome-sub');
            if (hero && welcome.headline) typeText(hero, welcome.headline, 85);
            if (sub && welcome.subhead) sub.textContent = welcome.subhead;

            const contactTitle = document.getElementById('contact-title');
            const contactDesc = document.getElementById('contact-desc');
            const contactEmail = document.getElementById('contact-email');
            const contactPhone = document.getElementById('contact-phone');
            if (contactTitle && contact.title) contactTitle.textContent = contact.title;
            if (contactDesc && contact.desc) contactDesc.textContent = contact.desc;
            if (contactEmail && contact.email) contactEmail.href = contact.email;
            if (contactPhone && contact.phone) contactPhone.textContent = contact.phone;
            if (card && prev && next && projects.length) {
                renderProject(index);
                restartTimer();
                prev.addEventListener('click', () => advance(-1));
                next.addEventListener('click', () => advance(1));
            }
            renderWritings();
            if (card) {
                card.addEventListener('click', () => {
                    const url = card.dataset.url;
                    if (url) window.open(url, '_blank');
                });
            }
    })();
});