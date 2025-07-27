// Fade-in on scroll
const fadeinObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
    }
  });
}, {
  threshold: 0.1
});

document.querySelectorAll('.fadein').forEach(el => fadeinObserver.observe(el));



//background-music and the beginning//
 const overlay = document.getElementById('start-overlay');
  const audio = document.getElementById('ambient-audio');
  let started = false;

  function startExperience() {
    if (!started) {
      audio.play().catch(err => console.log('Autoplay blocked:', err));
      overlay.classList.add('fade-out');
     document.body.classList.remove('no-scroll'); 
      setTimeout(() => {
        overlay.remove(); 
      }, 800);
      started = true;
    }
  }

  overlay.addEventListener('click', startExperience);




// Smooth scroll + bounce (bird link)

const birdLink = document.querySelector('.bird-link');
if (birdLink) {
  birdLink.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.getElementById('and-wings-anchor');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
      // Force reflow for bounce animation
      target.classList.remove('bounce');
      // Use requestAnimationFrame for reliable reflow
      requestAnimationFrame(() => target.classList.add('bounce'));
    }
  });
}


// Scene 6 – shot & fall animation

const scene6 = document.querySelector('.scene-6-parent');
if (scene6) {
  const shotUp = scene6.querySelector('.shot-up-icon');
  const birdFall = scene6.querySelector('.bird-fall-icon');
  const shotDown = scene6.querySelector('.shot-down-icon');
  const observer6 = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        shotUp?.classList.add('shot-up-animate');
        birdFall?.classList.add('bird-fall-animate');
        shotDown?.classList.add('shot-down-animate');
        obs.unobserve(scene6);
      }
    });
  }, { threshold: 0.5 });
  observer6.observe(scene6);
}


// Scene 7 – running with ribbons

const scene7 = document.querySelector('.scene-7-parent');
if (scene7) {
  const runningIcon = scene7.querySelector('.running-icon');
  const ribbonsRight = [
    scene7.querySelector('.ribbon-blue-icon'),
    scene7.querySelector('.ribbon-pink-long-icon'),
    scene7.querySelector('.ribbon-pink-curve-icon')
  ];
  const ribbonsLeft = [
    scene7.querySelector('.ribbon-yellow-icon'),
    scene7.querySelector('.ribbon-pink-short-icon')
  ];
  const observer7 = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        runningIcon?.classList.add('running-move-right');
        ribbonsRight.forEach(ribbon => {
          if (ribbon) {
            const delay = Math.random() * 0.8;
            ribbon.style.animationDelay = `${delay}s`;
            ribbon.classList.add('ribbon', 'ribbon-right', 'animate');
          }
        });
        ribbonsLeft.forEach(ribbon => {
          if (ribbon) {
            const delay = Math.random() * 0.8;
            ribbon.style.animationDelay = `${delay}s`;
            ribbon.classList.add('ribbon', 'ribbon-left', 'animate');
          }
        });
        obs.unobserve(scene7);
      }
    });
  }, { threshold: 0.5 });
  observer7.observe(scene7);
}


// Scene 5 – chase animation

const scene5 = document.querySelector('.scene-5-parent');
if (scene5) {
  const chaseIcon = scene5.querySelector('.chase-icon');
  const observer5 = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        chaseIcon?.classList.add('chase-move-right');
        obs.unobserve(scene5);
      }
    });
  }, { threshold: 0.5 });
  observer5.observe(scene5);
}


// Scene 9 – visibility trigger

const scene9 = document.querySelector('.scene-9-parent');
if (scene9) {
  const observer9 = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        scene9.classList.add('scene9-visible');
      }
    });
  }, { threshold: 0.3 });
  observer9.observe(scene9);
  // Also trigger by scroll
  function onScrollScene9() {
    const rect = scene9.getBoundingClientRect();
    const inView = rect.top < window.innerHeight && rect.bottom > 0;
    if (inView) {
      scene9.classList.add('scrolled-in');
    }
  }
  window.addEventListener('scroll', onScrollScene9, { passive: true });
}







// Scene 8 – click to swap image with transparent video


function swapToGif() {
  const standing = document.getElementById('standingImg');
  const gif = document.getElementById('fireGif');
  if (!standing || !gif) return;
  standing.classList.add('fade-out');
  setTimeout(() => {
    standing.style.display = 'none';
    gif.style.display = 'block';
    gif.classList.add('fade-in');
  }, 1000); // match the CSS transition time
}



//confetti//



const confettiContainer = document.querySelector('.confetti-container');
let confettiInterval = null;

function createConfettiPiece() {
  if (!confettiContainer) return;
  const confetti = document.createElement('div');
  confetti.classList.add('confetti');
  const size = Math.random() * 6 + 6;
  const colors = ['#FFC700', '#FF3CAC', '#00F0FF', '#B28DFF', '#FF8A00'];
  const color = colors[Math.floor(Math.random() * colors.length)];
  const left = Math.random() * 100;
  const duration = Math.random() * 2 + 3;
  const delay = Math.random();
  confetti.style.width = `${size}px`;
  confetti.style.height = `${size * 1.2}px`;
  confetti.style.backgroundColor = color;
  confetti.style.left = `${left}%`;
  confetti.style.animationDuration = `${duration}s`;
  confetti.style.animationDelay = `${delay}s`;
  confettiContainer.appendChild(confetti);
  setTimeout(() => {
    confetti.remove();
  }, (duration + delay) * 1000);
}

function startConfettiLoop() {
  if (!confettiInterval) {
    confettiInterval = setInterval(createConfettiPiece, 100);
  }
}

function stopConfettiLoop() {
  if (confettiInterval) {
    clearInterval(confettiInterval);
    confettiInterval = null;
  }
}

const scene7El = document.querySelector('.scene-7');
if (scene7El) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        startConfettiLoop();
      } else {
        stopConfettiLoop();
      }
    });
  }, { threshold: 0.5 });
  observer.observe(scene7El);
}







//glowing particle//


function createParticle() {
  const container = document.querySelector('.particles-scene10');
  if (!container) return;
  const particle = document.createElement('div');
  particle.classList.add('particle');
  // Random start position
  particle.style.left = `${Math.random() * window.innerWidth}px`;
  particle.style.top = `${window.innerHeight}px`;
  // Random size
  const size = Math.random() * 6 + 4;
  particle.style.width = `${size}px`;
  particle.style.height = `${size}px`;
  container.appendChild(particle);
  setTimeout(() => {
    particle.remove();
  }, 4000); // match animation duration
}

setInterval(createParticle, 100);


