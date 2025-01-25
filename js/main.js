// Smooth scroll functionality
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Intersection Observer for fade-in animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-visible');
        }
    });
});

document.querySelectorAll('.skills, .hobby, .Orgs').forEach((el) => {
    el.classList.add('fade-in');
    observer.observe(el);
});

// Initialize tilt effect
document.addEventListener('DOMContentLoaded', function() {
    VanillaTilt.init(document.querySelectorAll(".skills1, .skills2"), {
        max: 15,
        speed: 400,
        glare: true,
        "max-glare": 0.2
    });
});

// Optional: Add scroll progress indicator
window.addEventListener('scroll', () => {
    const scrollProgress = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
    const progressBar = document.querySelector('.scroll-progress');
    if (progressBar) {
        progressBar.style.width = `${scrollProgress * 100}%`;
    }
});

function createParticles() {
  const title = document.querySelector('.Title');
  for (let i = 0; i < 75; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.cssText = `
      position: absolute;
      width: ${Math.random() * 20 + 5}px;
      height: ${Math.random() * 20 + 5}px;
      background: rgba(104, 244, 165, ${Math.random() * 0.5 + 0.2});
      box-shadow: 0 0 ${Math.random() * 10 + 5}px rgba(104, 244, 165, 0.8);
      border-radius: 50%;
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      pointer-events: none;
      z-index: 1;
    `;
    title.appendChild(particle);
    animateParticle(particle);
  }
}

function animateParticle(particle) {
  const animation = particle.animate([
    { 
      transform: 'translate(0, 0) scale(1)',
      opacity: Math.random() * 0.5 + 0.5
    },
    { 
      transform: `translate(${Math.random() * 300 - 150}px, ${Math.random() * 300 - 150}px) scale(${Math.random() * 0.5 + 0.5})`,
      opacity: Math.random() * 0.3 + 0.2
    }
  ], {
    duration: 5000 + Math.random() * 5000,
    direction: 'alternate',
    iterations: Infinity,
    easing: 'ease-in-out'
  });
}
function typeWriterEffect() {
  const text = " AI ";
  const element = document.querySelector('.AI-text');
  let index = 0;
  
  function type() {
    if (index < text.length) {
      element.textContent += text.charAt(index);
      index++;
      setTimeout(type, 150);
    }
  }
  
  element.textContent = '';
  type();
}

function addParallaxEffect() {
  const title = document.querySelector('.Title');
  
  title.addEventListener('mousemove', (e) => {
    const { left, top, width, height } = title.getBoundingClientRect();
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;
    
    document.querySelector('.cloud1').style.transform = 
      `translate(${x * 30}px, ${y * 30}px)`;
    document.querySelector('.cloud2').style.transform = 
      `translate(${-x * 20}px, ${-y * 20}px)`;
  });
}

document.addEventListener('DOMContentLoaded', () => {
    createParticles();
    typeWriterEffect();
    addParallaxEffect();
});
