const flower = document.getElementById('flower');
const music = document.getElementById('bgMusic');
const message = document.getElementById('loveMsg');
const subtitle = document.getElementById('subtitle');
const instruction = document.getElementById('instruction');

let isBloomed = false;
let clickCount = 0;

/* CREATE HEARTS */
function createHearts(){
  setInterval(()=>{
    const heart = document.createElement('div');
    heart.className = 'heart';
    heart.innerText = ['❤️','💖','💕','💗','🌹'][Math.floor(Math.random()*5)];
    heart.style.left = Math.random() * 100 + '%';
    heart.style.bottom = '0';
    heart.style.animationDuration = (5 + Math.random() * 3) + 's';
    document.body.appendChild(heart);

    setTimeout(()=>{
      heart.remove();
    },8000);
  },1500);
}
createHearts();

/* CLICK EVENT */
flower.addEventListener('click', function(e){
  clickCount++;
  
  // First click - bloom the flower
  if(!isBloomed){
    // Bloom
    flower.classList.add('bloom');
    
    // Add bloomed state for gentle rocking
    setTimeout(() => {
      flower.classList.add('bloomed');
    }, 2000);
    
    isBloomed = true;
    
    // Play music with error handling
    music.volume = 0.6;
    music.play().catch(err => {
      console.log('Audio autoplay was prevented:', err);
    });
    
    // Show message
    setTimeout(() => {
      message.classList.add('show');
    }, 800);
    
    // Hide subtitle
    subtitle.style.opacity = '0';
    subtitle.style.transition = 'opacity 1s ease';
    
    // Update instruction
    instruction.innerText = '✨ Keep tapping for more magic ✨';
    
    // Big sparkle burst
    createSparkleBurst(e, 24);
    
    // Extra hearts on bloom
    for(let i=0; i<8; i++){
      setTimeout(() => {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.innerText = '🌹';
        heart.style.left = (45 + Math.random() * 10) + '%';
        heart.style.bottom = '40%';
        document.body.appendChild(heart);
        setTimeout(() => heart.remove(), 6000);
      }, i * 150);
    }
  } else {
    // Subsequent clicks - add sparkles and effects
    createSparkleBurst(e, 16);
    
    // Add floating hearts from flower center
    const rect = flower.getBoundingClientRect();
    for(let i=0; i<3; i++){
      setTimeout(() => {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.innerText = ['✨','💫','⭐'][Math.floor(Math.random()*3)];
        heart.style.left = (rect.left + rect.width/2 - 20 + Math.random() * 40) + 'px';
        heart.style.bottom = (rect.top + rect.height/2) + 'px';
        heart.style.fontSize = (18 + Math.random() * 10) + 'px';
        document.body.appendChild(heart);
        setTimeout(() => heart.remove(), 6000);
      }, i * 200);
    }
  }
});

/* SPARKLE BURST */
function createSparkleBurst(e, count){
  const rect = flower.getBoundingClientRect();
  const centerX = rect.left + rect.width/2;
  const centerY = rect.top + rect.height/2;
  
  // Use click position or center
  const startX = e.clientX || centerX;
  const startY = e.clientY || centerY;

  for(let i=0; i<count; i++){
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';
    
    sparkle.style.left = startX + 'px';
    sparkle.style.top = startY + 'px';
    
    const angle = (i / count) * Math.PI * 2;
    const distance = 80 + Math.random() * 120;
    const tx = Math.cos(angle) * distance;
    const ty = Math.sin(angle) * distance;
    
    sparkle.style.setProperty('--tx', tx + 'px');
    sparkle.style.setProperty('--ty', ty + 'px');
    
    // Random size variation
    const size = 6 + Math.random() * 8;
    sparkle.style.width = size + 'px';
    sparkle.style.height = size + 'px';
    
    document.body.appendChild(sparkle);
    
    setTimeout(()=>{
      sparkle.remove();
    },1500);
  }
}

/* KEYBOARD SUPPORT */
flower.addEventListener('keydown', function(e){
  if(e.key === 'Enter' || e.key === ' '){
    e.preventDefault();
    const rect = flower.getBoundingClientRect();
    flower.click();
  }
});

/* TOUCH ENHANCEMENT */
flower.addEventListener('touchstart', function(e){
  e.preventDefault();
  const touch = e.touches[0];
  const clickEvent = new MouseEvent('click', {
    clientX: touch.clientX,
    clientY: touch.clientY
  });
  flower.dispatchEvent(clickEvent);
}, {passive: false});

/* ADD INITIAL AMBIENT SPARKLES */
function createAmbientSparkle(){
  const sparkle = document.createElement('div');
  sparkle.className = 'sparkle';
  sparkle.style.position = 'fixed';
  sparkle.style.left = Math.random() * 100 + 'vw';
  sparkle.style.top = Math.random() * 100 + 'vh';
  sparkle.style.width = '4px';
  sparkle.style.height = '4px';
  sparkle.style.opacity = '0.6';
  sparkle.style.zIndex = '1';
  
  const tx = (Math.random() - 0.5) * 100;
  const ty = (Math.random() - 0.5) * 100;
  sparkle.style.setProperty('--tx', tx + 'px');
  sparkle.style.setProperty('--ty', ty + 'px');
  
  document.body.appendChild(sparkle);
  
  setTimeout(() => sparkle.remove(), 1500);
}

// Create ambient sparkles occasionally
setInterval(createAmbientSparkle, 800);
