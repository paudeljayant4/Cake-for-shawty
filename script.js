/**
 * ============================================
 * ROMANTIC FLOWER ANIMATION - PREMIUM JS
 * For Himani 🌹
 * ============================================
 */

// DOM Elements
const flower = document.getElementById('flower');
const music = document.getElementById('bgMusic');
const message = document.getElementById('loveMsg');
const subtitle = document.getElementById('subtitle');
const instruction = document.getElementById('instruction');

// State
let isBloomed = false;
let clickCount = 0;

// ============================================
// AMBIENT HEARTS - Continuous background effect
// ============================================
function createAmbientHearts() {
  setInterval(() => {
    const heart = document.createElement('div');
    heart.className = 'heart';
    heart.textContent = ['❤️', '💖', '💕', '💗', '🌹'][Math.floor(Math.random() * 5)];
    heart.style.left = (10 + Math.random() * 80) + '%';
    heart.style.bottom = '0';
    heart.style.fontSize = (20 + Math.random() * 12) + 'px';
    heart.style.animationDuration = (5 + Math.random() * 3) + 's';
    document.body.appendChild(heart);

    setTimeout(() => heart.remove(), 8000);
  }, 1800);
}
createAmbientHearts();

// ============================================
// AMBIENT SPARKLES - Subtle background magic
// ============================================
function createAmbientSparkle() {
  const sparkle = document.createElement('div');
  sparkle.className = 'sparkle';
  sparkle.style.position = 'fixed';
  sparkle.style.left = Math.random() * 100 + 'vw';
  sparkle.style.top = Math.random() * 100 + 'vh';
  sparkle.style.width = (3 + Math.random() * 4) + 'px';
  sparkle.style.height = sparkle.style.width;
  sparkle.style.opacity = '0.5';
  sparkle.style.zIndex = '1';
  
  const tx = (Math.random() - 0.5) * 80;
  const ty = (Math.random() - 0.5) * 80;
  sparkle.style.setProperty('--tx', tx + 'px');
  sparkle.style.setProperty('--ty', ty + 'px');
  
  document.body.appendChild(sparkle);
  setTimeout(() => sparkle.remove(), 1500);
}
setInterval(createAmbientSparkle, 1000);

// ============================================
// MAIN CLICK HANDLER
// ============================================
flower.addEventListener('click', function(e) {
  clickCount++;
  
  // Prevent text selection on rapid clicks
  e.preventDefault();
  
  if (!isBloomed) {
    // === FIRST CLICK - BLOOM SEQUENCE ===
    isBloomed = true;
    
    // Add bloom class to trigger petal animations
    flower.classList.add('bloom');
    
    // Add bloomed state for gentle rocking after bloom completes
    setTimeout(() => {
      flower.classList.add('bloomed');
    }, 2000);
    
    // Play music with error handling for browser autoplay policies
    music.volume = 0.6;
    music.play().catch(err => {
      console.log('Audio playback was prevented:', err.message);
    });
    
    // Show love message with delay
    setTimeout(() => {
      message.classList.add('show');
    }, 800);
    
    // Fade out subtitle
    subtitle.style.transition = 'opacity 1s ease';
    subtitle.style.opacity = '0';
    
    // Update instruction text
    instruction.textContent = '✨ Keep tapping for more magic ✨';
    
    // Create big sparkle burst from center
    const rect = flower.getBoundingClientRect();
    createSparkleBurst(
      rect.left + rect.width / 2,
      rect.top + rect.height / 2,
      24
    );
    
    // Launch rose emojis from flower
    for (let i = 0; i < 8; i++) {
      setTimeout(() => {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.textContent = '🌹';
        heart.style.left = (45 + Math.random() * 10) + '%';
        heart.style.bottom = '40%';
        heart.style.fontSize = (24 + Math.random() * 8) + 'px';
        document.body.appendChild(heart);
        setTimeout(() => heart.remove(), 6000);
      }, i * 150);
    }
    
  } else {
    // === SUBSEQUENT CLICKS - EXTRA MAGIC ===
    const rect = flower.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Use actual click position if available
    const sparkX = e.clientX || centerX;
    const sparkY = e.clientY || centerY;
    
    // Sparkle burst at click location
    createSparkleBurst(sparkX, sparkY, 16);
    
    // Launch floating stars/sparkles from center
    for (let i = 0; i < 3; i++) {
      setTimeout(() => {
        const sparkle = document.createElement('div');
        sparkle.className = 'heart';
        sparkle.textContent = ['✨', '💫', '⭐'][Math.floor(Math.random() * 3)];
        sparkle.style.left = (centerX - 20 + Math.random() * 40) + 'px';
        sparkle.style.bottom = (window.innerHeight - centerY + 20) + 'px';
        sparkle.style.fontSize = (18 + Math.random() * 10) + 'px';
        document.body.appendChild(sparkle);
        setTimeout(() => sparkle.remove(), 6000);
      }, i * 200);
    }
  }
});

// ============================================
// SPARKLE BURST EFFECT
// ============================================
function createSparkleBurst(startX, startY, count) {
  for (let i = 0; i < count; i++) {
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';
    
    sparkle.style.left = startX + 'px';
    sparkle.style.top = startY + 'px';
    
    // Calculate radial distribution
    const angle = (i / count) * Math.PI * 2;
    const distance = 70 + Math.random() * 130;
    const tx = Math.cos(angle) * distance;
    const ty = Math.sin(angle) * distance;
    
    sparkle.style.setProperty('--tx', tx + 'px');
    sparkle.style.setProperty('--ty', ty + 'px');
    
    // Random size variation
    const size = 6 + Math.random() * 8;
    sparkle.style.width = size + 'px';
    sparkle.style.height = size + 'px';
    
    document.body.appendChild(sparkle);
    setTimeout(() => sparkle.remove(), 1500);
  }
}

// ============================================
// KEYBOARD ACCESSIBILITY
// ============================================
flower.addEventListener('keydown', function(e) {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    flower.click();
  }
});

// ============================================
// ENHANCED TOUCH SUPPORT
// ============================================
flower.addEventListener('touchstart', function(e) {
  e.preventDefault();
  const touch = e.touches[0];
  const clickEvent = new MouseEvent('click', {
    clientX: touch.clientX,
    clientY: touch.clientY,
    bubbles: true,
    cancelable: true
  });
  flower.dispatchEvent(clickEvent);
}, { passive: false });

// Add press feedback for touch devices
flower.addEventListener('touchend', function() {
  flower.style.transform = 'scale(1.02)';
  setTimeout(() => {
    if (!flower.classList.contains('bloomed')) {
      flower.style.transform = '';
    }
  }, 150);
});
