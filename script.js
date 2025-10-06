// Open letter function
function openLetter() {
    const closedLetter = document.getElementById('closed-letter');
    const letterContainer = document.getElementById('letter-container');
    
    // Add opening animation
    closedLetter.style.transform = 'scale(0.8)';
    closedLetter.style.opacity = '0';
    
    setTimeout(() => {
        closedLetter.style.display = 'none';
        letterContainer.style.display = 'block';
        letterContainer.style.opacity = '0';
        letterContainer.style.transform = 'translateY(50px)';
        
        // Fade in letter
        setTimeout(() => {
            letterContainer.style.transition = 'all 0.8s ease';
            letterContainer.style.opacity = '1';
            letterContainer.style.transform = 'translateY(0)';
        }, 100);
    }, 500);
}

// Create floating hearts when button is clicked
function createHeart() {
    const heartsContainer = document.getElementById('floating-hearts');
    const heart = document.createElement('div');
    heart.className = 'heart';
    heart.innerHTML = '💖';
    
    // Random position at the bottom of the screen
    heart.style.left = Math.random() * 100 + '%';
    heart.style.bottom = '0px';
    
    heartsContainer.appendChild(heart);
    
    // Remove heart after animation completes
    setTimeout(() => {
        if (heart.parentNode) {
            heart.parentNode.removeChild(heart);
        }
    }, 3000);
}

// Create floating particles
function createParticle() {
    const particlesContainer = document.getElementById('particles');
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Random size between 1-4px
    const size = Math.random() * 3 + 1;
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';
    
    // Random horizontal position
    particle.style.left = Math.random() * 100 + '%';
    
    // Random animation duration between 4-8 seconds
    const duration = Math.random() * 4 + 4;
    particle.style.animationDuration = duration + 's';
    
    particlesContainer.appendChild(particle);
    
    // Remove particle after animation completes
    setTimeout(() => {
        if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
        }
    }, duration * 1000);
}

// Create particles periodically
function startParticleAnimation() {
    setInterval(createParticle, 800);
}

// Add click effect to the letter
function addLetterClickEffect() {
    const letter = document.querySelector('.letter');
    if (letter) {
        letter.addEventListener('click', function() {
            // Create a burst of hearts
            for (let i = 0; i < 5; i++) {
                setTimeout(() => {
                    createHeart();
                }, i * 100);
            }
        });
    }
}

// Add click effect to the envelope
function addEnvelopeClickEffect() {
    const closedLetter = document.getElementById('closed-letter');
    if (closedLetter) {
        closedLetter.addEventListener('click', openLetter);
        closedLetter.addEventListener('touchstart', function(e) {
            e.preventDefault();
            openLetter();
        });
    }
}

// Add typing effect to the letter content
function addTypingEffect() {
    const paragraphs = document.querySelectorAll('.letter-content p');
    let delay = 1000; // Start after 1 second
    
    paragraphs.forEach((paragraph, index) => {
        const originalText = paragraph.textContent;
        paragraph.textContent = '';
        paragraph.style.opacity = '0';
        
        setTimeout(() => {
            paragraph.style.transition = 'opacity 0.5s ease';
            paragraph.style.opacity = '1';
            typeText(paragraph, originalText, 50);
        }, delay);
        
        delay += 2000; // 2 seconds between paragraphs
    });
}

function typeText(element, text, speed) {
    let i = 0;
    const timer = setInterval(() => {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
        } else {
            clearInterval(timer);
        }
    }, speed);
}

// Add scroll-triggered animations
function addScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 1s ease forwards';
            }
        });
    });
    
    const letter = document.querySelector('.letter');
    observer.observe(letter);
}

// Add CSS for fadeInUp animation
function addScrollAnimationCSS() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .letter {
            opacity: 0;
        }
    `;
    document.head.appendChild(style);
}

// Add moon phase animation
function animateMoonPhases() {
    const moon = document.querySelector('.moon');
    let phase = 0;
    
    setInterval(() => {
        phase += 0.01;
        const glowIntensity = 0.3 + 0.2 * Math.sin(phase);
        moon.style.boxShadow = `
            0 0 ${30 + 10 * Math.sin(phase)}px rgba(255, 255, 255, ${glowIntensity}),
            0 0 ${60 + 20 * Math.sin(phase)}px rgba(255, 255, 255, ${glowIntensity * 0.7}),
            0 0 ${90 + 30 * Math.sin(phase)}px rgba(255, 255, 255, ${glowIntensity * 0.4})
        `;
    }, 100);
}

// Add keyboard interactions
function addKeyboardInteractions() {
    document.addEventListener('keydown', function(event) {
        // Press 'L' for love hearts
        if (event.key.toLowerCase() === 'l') {
            createHeart();
        }
        // Press 'M' for moon effect
        if (event.key.toLowerCase() === 'm') {
            const moon = document.querySelector('.moon');
            moon.style.animation = 'none';
            setTimeout(() => {
                moon.style.animation = 'moonGlow 4s ease-in-out infinite alternate';
            }, 10);
        }
        // Press 'P' for particles
        if (event.key.toLowerCase() === 'p') {
            for (let i = 0; i < 3; i++) {
                setTimeout(createParticle, i * 200);
            }
        }
    });
}

// Add touch interactions for mobile
function addTouchInteractions() {
    let touchStartY = 0;
    
    document.addEventListener('touchstart', function(event) {
        touchStartY = event.touches[0].clientY;
    });
    
    document.addEventListener('touchend', function(event) {
        const touchEndY = event.changedTouches[0].clientY;
        const deltaY = touchStartY - touchEndY;
        
        // Swipe up to create hearts
        if (deltaY > 50) {
            createHeart();
        }
    });
}

// Initialize all animations and interactions
function init() {
    // Start particle animation
    startParticleAnimation();
    
    // Add envelope click effect
    addEnvelopeClickEffect();
    
    // Add letter click effect
    addLetterClickEffect();
    
    // Add scroll animations
    addScrollAnimationCSS();
    addScrollAnimations();
    
    // Add moon phase animation
    animateMoonPhases();
    
    // Add keyboard interactions
    addKeyboardInteractions();
    
    // Add touch interactions
    addTouchInteractions();
    
    // Add typing effect (optional - uncomment if desired)
    // addTypingEffect();
    
    console.log('💕 จดหมายรักเว็บไซต์เริ่มต้นแล้ว 💕');
    console.log('กด L สำหรับหัวใจ, M สำหรับพระจันทร์, P สำหรับอนุภาค');
}

// Start when DOM is loaded
document.addEventListener('DOMContentLoaded', init);
