const flower = document.getElementById('flower');
const music = document.getElementById('bgMusic');
const message = document.getElementById('loveMsg');

/* CREATE HEARTS */
function createHearts(){
  setInterval(()=>{
    const heart = document.createElement('div');
    heart.className = 'heart';
    heart.innerText = '❤️';
    heart.style.left = Math.random() * 100 + '%';
    heart.style.bottom = '0';
    document.body.appendChild(heart);

    setTimeout(()=>{
      heart.remove();
    },6000);
  },2000);
}
createHearts();

/* CLICK EVENT */
flower.addEventListener('click', function(e){

  // Bloom
  flower.classList.add('bloom');

  // Play music
  music.play();

  // Show message
  message.classList.add('show');

  // Sparkles
  const rect = flower.getBoundingClientRect();

  for(let i=0;i<12;i++){
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';

    sparkle.style.left = (rect.left + rect.width/2) + 'px';
    sparkle.style.top = (rect.top + rect.height/2) + 'px';

    const angle = (i / 12) * Math.PI * 2;
    const distance = 100;
    const tx = Math.cos(angle) * distance;
    const ty = Math.sin(angle) * distance;

    sparkle.style.setProperty('--tx', tx + 'px');
    sparkle.style.setProperty('--ty', ty + 'px');

    document.body.appendChild(sparkle);

    setTimeout(()=>{
      sparkle.remove();
    },1500);
  }

});
