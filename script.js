// Open letter function
function openLetter() {
    playPage()
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
    
    // Render attachments gallery and bind interactions
    renderGallery();
    bindGiftInteractions();
    bindCakeInteraction();
    revealAttachmentsAfterReading();
    initAudioOnce();
    
    console.log('💕 จดหมายรักเว็บไซต์เริ่มต้นแล้ว 💕');
    console.log('กด L สำหรับหัวใจ, M สำหรับพระจันทร์, P สำหรับอนุภาค');
}

// Start when DOM is loaded
document.addEventListener('DOMContentLoaded', init);

// ---------- Attachments Feature ----------
const photoPaths = [
    // Put your image filenames in the photos/ folder and list them here
    // Example placeholders:
    'photos/IM.JPG',
].concat([...Array(48)].map((_, i) => `photos/IM${i+2}.jpeg`));

function renderGallery() {
    // Album cover images
    const main = document.getElementById('album-main');
    const s1 = document.getElementById('album-s1');
    const s2 = document.getElementById('album-s2');
    const s3 = document.getElementById('album-s3');
    if (photoPaths.length > 0 && main) main.src = photoPaths[0];
    if (photoPaths.length > 1 && s1) s1.src = photoPaths[1];
    if (photoPaths.length > 2 && s2) s2.src = photoPaths[2];
    if (photoPaths.length > 3 && s3) s3.src = photoPaths[3];

    // Modal grid
    const grid = document.getElementById('albumGrid');
    if (!grid) return;
    grid.innerHTML = '';
    photoPaths.forEach(src => {
        const img = document.createElement('img');
        img.src = src;
        img.alt = 'our-memory';
        grid.appendChild(img);
    });
}

async function downloadAllPhotos() {
    await ensureZipDeps();
    if (!window.JSZip || !window.saveAs) {
        alert('ไม่สามารถโหลดเครื่องมือดาวน์โหลดได้ กรุณารีเฟรชหน้าแล้วลองใหม่');
        return;
    }
    const overlay = document.getElementById('downloadOverlay');
    const bar = document.getElementById('downloadProgress');
    const status = document.getElementById('downloadStatus');
    if (overlay) overlay.style.display = 'flex';
    const setProgress = (p, msg) => {
        if (bar) bar.style.width = Math.max(1, Math.floor(p)) + '%';
        if (status && msg) status.textContent = msg;
    };
    const zip = new JSZip();
    const folder = zip.folder('our-photos');

    const fetchAsBlob = async (url) => {
        const res = await fetch(url, { cache: 'no-cache' });
        if (!res.ok) throw new Error('Fetch failed: ' + url);
        return await res.blob();
    };

    for (let i = 0; i < photoPaths.length; i++) {
        try {
            setProgress((i / photoPaths.length) * 60, `กำลังดึงรูปที่ ${i+1}/${photoPaths.length}`);
            const blob = await fetchAsBlob(photoPaths[i]);
            const name = photoPaths[i].split('/').pop() || `photo-${i+1}.jpg`;
            folder.file(name, blob);
        } catch (e) {
            console.warn('Skip file due to error:', photoPaths[i], e);
        }
    }

    setProgress(75, 'กำลังบีบอัดไฟล์เป็น ZIP…');
    const content = await zip.generateAsync({ type: 'blob' }, (meta) => {
        setProgress(75 + meta.percent * 0.25, 'กำลังบีบอัดไฟล์เป็น ZIP…');
    });
    setProgress(100, 'เสร็จสิ้น กำลังบันทึกไฟล์…');
    saveAs(content, 'our-photos.zip');
    const sfx = document.getElementById('sfxSuccess');
    if (sfx) { try { sfx.currentTime = 0; sfx.play(); } catch(e) {} }
    setTimeout(() => { if (overlay) overlay.style.display = 'none'; }, 600);
}

function scrollToAttachments() {
    const el = document.getElementById('attachments');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
}

function bindGiftInteractions() {
    const gift = document.getElementById('giftBox');
    const giftContents = document.getElementById('giftContents');
    const albumCover = document.getElementById('albumCover');
    const albumModal = document.getElementById('albumModal');
    const albumBackdrop = document.getElementById('albumBackdrop');
    const albumClose = document.getElementById('albumClose');
    if (!gift) return;
    gift.addEventListener('click', () => {
        playPop()
        gift.classList.toggle('gift-open');
        if (giftContents) {
            const isOpen = gift.classList.contains('gift-open');
            giftContents.style.display = isOpen ? 'block' : 'none';
        }
        // Small heart burst when opening
        for (let i = 0; i < 6; i++) setTimeout(createHeart, i * 120);
    });

    const openAlbum = () => { if (albumModal) albumModal.style.display = 'block'; playClick(); };
    const closeAlbum = () => { if (albumModal) albumModal.style.display = 'none'; };
    if (albumCover) albumCover.addEventListener('click', openAlbum);
    if (albumBackdrop) albumBackdrop.addEventListener('click', closeAlbum);
    if (albumClose) albumClose.addEventListener('click', closeAlbum);
}

function bindCakeInteraction() {
    const candle = document.querySelector('.candle .flame');
    if (!candle) return;
    let lit = true;
    const toggleFlame = () => {
        lit = !lit;
        candle.style.display = lit ? 'block' : 'none';
        if (!lit) setTimeout(() => { lit = true; candle.style.display = 'block'; }, 1200);
    };
    const cake = document.getElementById('cake');
    if (cake) cake.addEventListener('click', () => { toggleFlame(); playClick(); });
}

async function ensureZipDeps() {
    const loadScript = (src) => new Promise((resolve, reject) => {
        const s = document.createElement('script');
        s.src = src;
        s.onload = resolve;
        s.onerror = reject;
        document.head.appendChild(s);
    });
    if (!window.JSZip) {
        try { await loadScript('https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js'); } catch (e) {}
    }
    if (!window.saveAs) {
        try { await loadScript('https://cdnjs.cloudflare.com/ajax/libs/FileSaver.js/2.0.5/FileSaver.min.js'); } catch (e) {}
    }
}

function revealAttachmentsAfterReading() {
    const sentinel = document.getElementById('letter-end-sentinel');
    const attachments = document.getElementById('attachments');
    if (!sentinel || !attachments) return;
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                attachments.style.display = 'block';
                attachments.style.opacity = '0';
                attachments.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    attachments.style.transition = 'all 0.6s ease';
                    attachments.style.opacity = '1';
                    attachments.style.transform = 'translateY(0)';
                }, 50);
                observer.disconnect();
            }
        });
    }, { threshold: 1.0 });
    observer.observe(sentinel);
}

// ---------- Audio ----------
function initAudioOnce() {
    const bgm = document.getElementById('bgmAudio');
    const toggle = document.getElementById('musicToggle');
    if (!bgm || !toggle) return;
    let initialized = false;
    const tryInit = () => {
        if (initialized) return;
        initialized = true;
        toggle.style.display = 'flex';
        try { bgm.volume = 0.35; bgm.play(); } catch(e) {}
    };
    document.addEventListener('click', tryInit, { once: true });
    document.addEventListener('touchstart', tryInit, { once: true });
    toggle.addEventListener('click', () => {
        if (bgm.paused) { try { bgm.play(); } catch(e) {} } else { bgm.pause(); }
    });
}

function playClick() {
    const s = document.getElementById('sfxClick');
    if (!s) return;
    try { s.currentTime = 0; s.play(); } catch(e) {}
}

function playPop() {
    const pop_index = getRandomInt(1, 3)
    const audio = document.getElementById("sfxPop")
    audio.src = `audio/pop${pop_index}.mp3`
    audio.play()
}

function playPage() {
    const page_index = getRandomInt(1,2)
    const audio = document.getElementById("sfxPage")
    audio.src = `audio/page${page_index}.mp3`
    audio.play()
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }