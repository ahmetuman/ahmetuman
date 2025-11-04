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

    const logoContainer = document.querySelector('.tech-stack-container');
    if (logoContainer) {
        const logos = Array.from(logoContainer.getElementsByClassName('tech-logo'));
        let logoData = [];
        const padding = 20;

        let containerWidth = logoContainer.getBoundingClientRect().width;
        let containerHeight = logoContainer.getBoundingClientRect().height;

        logos.forEach(logo => {
            const logoWidth = logo.offsetWidth;
            const logoHeight = logo.offsetHeight;
            
            let speed = (Math.random() - 0.5) * 1;
            if (speed > -0.2 && speed < 0.2) speed = speed > 0 ? 0.2 : -0.2;

            let x, y, hasCollision;
            let attempts = 0;
            const maxAttempts = 200;

            do {
                hasCollision = false;
                attempts++;
                x = Math.random() * (containerWidth - logoWidth);
                y = Math.random() * (containerHeight - logoHeight);

                for (const other of logoData) {
                    const overlaps = (
                        x < other.x + other.width + padding &&
                        x + logoWidth + padding > other.x &&
                        y < other.y + other.height + padding &&
                        y + logoHeight + padding > other.y
                    );

                    if (overlaps) {
                        hasCollision = true;
                        break;
                    }
                }
            } while (hasCollision && attempts < maxAttempts);
            
            if (attempts >= maxAttempts) {
            }

            let data = {
                element: logo,
                x: x,
                y: y,
                speed: speed,
                width: logoWidth,
                height: logoHeight
            };

            logoData.push(data);
            logo.style.transform = `translate(${data.x}px, ${data.y}px)`;
        });

        function animateLogos() {
            logoData.forEach(data => {
                data.x += data.speed;

                if (data.x + data.width > containerWidth) {
                    data.x = containerWidth - data.width;
                    data.speed = -data.speed;
                } else if (data.x < 0) {
                    data.x = 0;
                    data.speed = -data.speed;
                }
                
                data.element.style.transform = `translate(${data.x}px, ${data.y}px)`;
            });

            requestAnimationFrame(animateLogos);
        }
        
        window.addEventListener('resize', () => {
            containerWidth = logoContainer.getBoundingClientRect().width;
            containerHeight = logoContainer.getBoundingClientRect().height;
        });

        animateLogos();
    }
});