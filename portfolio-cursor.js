// Custom Cursor Effect
document.addEventListener('DOMContentLoaded', function() {
    // Create cursor element
    const cursor = document.createElement('div');
    cursor.className = 'cursor';
    document.body.appendChild(cursor);

    // Create cursor trails
    const trails = [];
    for (let i = 0; i < 5; i++) {
        const trail = document.createElement('div');
        trail.className = 'cursor-trail';
        document.body.appendChild(trail);
        trails.push({ element: trail, x: 0, y: 0 });
    }

    // Create parallax background
    const parallaxBg = document.createElement('div');
    parallaxBg.className = 'parallax-bg';
    document.body.insertBefore(parallaxBg, document.body.firstChild);

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;

    // Mouse movement handler
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        // Update CSS custom properties for parallax effect
        const xPercent = (mouseX / window.innerWidth) * 100;
        const yPercent = (mouseY / window.innerHeight) * 100;
        
        document.documentElement.style.setProperty('--mouse-x', xPercent + '%');
        document.documentElement.style.setProperty('--mouse-y', yPercent + '%');
    });

    // Smooth cursor animation
    function animateCursor() {
        const ease = 0.15;
        
        cursorX += (mouseX - cursorX) * ease;
        cursorY += (mouseY - cursorY) * ease;
        
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';

        // Animate trails
        trails.forEach((trail, index) => {
            const delay = (index + 1) * 0.05;
            trail.x += (cursorX - trail.x) * (ease - delay);
            trail.y += (cursorY - trail.y) * (ease - delay);
            
            trail.element.style.left = trail.x + 'px';
            trail.element.style.top = trail.y + 'px';
            trail.element.style.opacity = 1 - (index * 0.2);
        });

        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Hover effects for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .skill-card, .info-item, input, textarea');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.classList.add('hover');
            element.style.transform = 'translateY(-2px)';
        });
        
        element.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover');
            element.style.transform = '';
        });
    });

    // Parallax effect on scroll
    let ticking = false;
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.hero::before, .about::before, .skills::before');
        
        parallaxElements.forEach((element, index) => {
            const speed = (index + 1) * 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
        
        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    });

    // Glitch effect on text hover
    const glitchTexts = document.querySelectorAll('.highlight, .logo h2, .section-header h2');
    
    glitchTexts.forEach(text => {
        text.addEventListener('mouseenter', () => {
            text.style.animation = 'glitch 0.5s ease-in-out';
        });
        
        text.addEventListener('animationend', () => {
            text.style.animation = '';
        });
    });

    // Add glitch keyframes dynamically
    const glitchStyle = document.createElement('style');
    glitchStyle.textContent = `
        @keyframes glitch {
            0%, 100% { transform: translateX(0); }
            10% { transform: translateX(-2px) skew(-1deg); }
            20% { transform: translateX(2px) skew(1deg); }
            30% { transform: translateX(-1px) skew(-1deg); }
            40% { transform: translateX(1px) skew(1deg); }
            50% { transform: translateX(-2px) skew(-1deg); }
            60% { transform: translateX(2px) skew(1deg); }
            70% { transform: translateX(-1px) skew(-1deg); }
            80% { transform: translateX(1px) skew(1deg); }
            90% { transform: translateX(-2px) skew(-1deg); }
        }
        
        @keyframes matrix-rain {
            0% { transform: translateY(-100px); opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { transform: translateY(100vh); opacity: 0; }
        }
    `;
    document.head.appendChild(glitchStyle);

    // Matrix rain effect (Easter egg on click)
    let matrixActive = false;
    
    document.addEventListener('click', (e) => {
        if (e.ctrlKey && !matrixActive) {
            createMatrixRain();
        }
    });

    function createMatrixRain() {
        matrixActive = true;
        const characters = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
        
        for (let i = 0; i < 50; i++) {
            setTimeout(() => {
                const drop = document.createElement('div');
                drop.textContent = characters[Math.floor(Math.random() * characters.length)];
                drop.style.cssText = `
                    position: fixed;
                    left: ${Math.random() * 100}vw;
                    top: -100px;
                    color: #00ff88;
                    font-family: monospace;
                    font-size: ${Math.random() * 20 + 10}px;
                    pointer-events: none;
                    z-index: 10000;
                    animation: matrix-rain ${Math.random() * 3 + 2}s linear forwards;
                `;
                
                document.body.appendChild(drop);
                
                setTimeout(() => {
                    drop.remove();
                }, 5000);
            }, i * 100);
        }
        
        setTimeout(() => {
            matrixActive = false;
        }, 5000);
    }

    // Responsive cursor for mobile
    if (window.innerWidth <= 768) {
        cursor.style.display = 'none';
        trails.forEach(trail => trail.element.style.display = 'none');
        document.body.style.cursor = 'auto';
    }
}); 