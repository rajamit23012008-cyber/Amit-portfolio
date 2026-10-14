/**
 * AMIT RAJ - SOFTWARE DEVELOPER PORTFOLIO INTERACTIVE SCRIPT
 * Features:
 * - Dynamic Background Particle / Constellation Mesh Canvas
 * - Realistic Typing Effect with Dev Titles
 * - Web Audio API 8-Bit Retro Sound Synthesizer
 * - Playable HTML5 Canvas Arcade Mini-Game ("Bug Hunter & Code Runner")
 * - 3D Card Interactive Tilt & Glow
 * - Interactive Navigation, ScrollSpy & Mobile Menu
 * - 1-Click Copy Email to Clipboard & Mail Client Trigger
 */

document.addEventListener('DOMContentLoaded', () => {
  // Update footer year dynamically
  const yearEl = document.getElementById('current-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ==========================================================================
     1. BACKGROUND PARTICLES CONSTELLATION CANVAS
     ========================================================================== */
  const bgCanvas = document.getElementById('bg-canvas');
  if (bgCanvas) {
    const ctx = bgCanvas.getContext('2d');
    let width, height;
    let particles = [];
    const particleCount = window.innerWidth < 768 ? 35 : 70;
    const mouse = { x: null, y: null, radius: 130 };

    function resize() {
      width = bgCanvas.width = window.innerWidth;
      height = bgCanvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    window.addEventListener('mousemove', (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });

    window.addEventListener('mouseout', () => {
      mouse.x = null;
      mouse.y = null;
    });

    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.7;
        this.vy = (Math.random() - 0.5) * 0.7;
        this.size = Math.random() * 2 + 1;
        this.color = Math.random() > 0.4 ? 'rgba(0, 245, 212, ' : 'rgba(168, 85, 247, ';
        this.alpha = Math.random() * 0.6 + 0.2;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;

        // Mouse repulsion
        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouse.radius) {
            const force = (mouse.radius - dist) / mouse.radius;
            this.x -= (dx / dist) * force * 3;
            this.y -= (dy / dist) * force * 3;
          }
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color + this.alpha + ')';
        ctx.shadowBlur = 8;
        ctx.shadowColor = this.color.includes('245') ? '#00f5d4' : '#a855f7';
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    function animateParticles() {
      ctx.clearRect(0, 0, width, height);

      // Connect particles with subtle lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 110) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            const lineAlpha = (1 - dist / 110) * 0.15;
            ctx.strokeStyle = `rgba(0, 245, 212, ${lineAlpha})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      particles.forEach(p => {
        p.update();
        p.draw();
      });

      requestAnimationFrame(animateParticles);
    }
    animateParticles();
  }

  /* ==========================================================================
     2. DYNAMIC TYPEWRITER EFFECT
     ========================================================================== */
  const typewriterEl = document.getElementById('typewriter');
  if (typewriterEl) {
    const roles = [
      'Aspiring Software Developer 💻',
      'B.Tech CSE Core Student @ JECRC 🎓',
      'Tech Enthusiast & Problem Solver ⚡',
      'Passionate C++ & Full-Stack Coder 🚀',
      'Cricket Player & Cinema Fan 🏏🎬'
    ];

    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 95;

    function type() {
      const currentRole = roles[roleIndex];

      if (isDeleting) {
        typewriterEl.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 45;
      } else {
        typewriterEl.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 90;
      }

      if (!isDeleting && charIndex === currentRole.length) {
        typingSpeed = 2200; // Pause at completion
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typingSpeed = 400;
      }

      setTimeout(type, typingSpeed);
    }
    type();
  }

  /* ==========================================================================
     3. WEB AUDIO RETRO SOUND SYNTHESIZER
     ========================================================================== */
  let audioCtx = null;
  let sfxEnabled = true;

  function initAudio() {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        audioCtx = new AudioContext();
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  }

  const sfxToggleBtn = document.getElementById('sfx-toggle');
  const sfxIcon = document.getElementById('sfx-icon');

  if (sfxToggleBtn && sfxIcon) {
    sfxToggleBtn.addEventListener('click', () => {
      initAudio();
      sfxEnabled = !sfxEnabled;
      if (sfxEnabled) {
        sfxIcon.className = 'fa-solid fa-volume-high';
        playTone(600, 0.08, 'triangle');
      } else {
        sfxIcon.className = 'fa-solid fa-volume-xmark';
      }
    });
  }

  function playTone(freq, duration, type = 'square') {
    if (!sfxEnabled) return;
    initAudio();
    if (!audioCtx) return;

    try {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

      gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch (e) {
      // Audio autoplay policy catch
    }
  }

  function playLaserSound() {
    if (!sfxEnabled) return;
    initAudio();
    if (!audioCtx) return;

    try {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sawtooth';

      osc.frequency.setValueAtTime(880, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(110, audioCtx.currentTime + 0.15);

      gain.gain.setValueAtTime(0.09, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.15);

      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.15);
    } catch (e) {}
  }

  function playScoreSound() {
    if (!sfxEnabled) return;
    playTone(523.25, 0.08, 'sine');
    setTimeout(() => playTone(659.25, 0.08, 'sine'), 60);
    setTimeout(() => playTone(783.99, 0.12, 'sine'), 120);
  }

  function playExplodeSound() {
    if (!sfxEnabled) return;
    initAudio();
    if (!audioCtx) return;

    try {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(140, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(30, audioCtx.currentTime + 0.25);

      gain.gain.setValueAtTime(0.12, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.25);

      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.25);
    } catch (e) {}
  }

  /* ==========================================================================
     4. INTERACTIVE ARCADE CANVAS MINI GAME: "BUG HUNTER & CODE RUNNER"
     ========================================================================== */
  const arcadeCanvas = document.getElementById('arcade-canvas');
  if (arcadeCanvas) {
    const actx = arcadeCanvas.getContext('2d');
    const scoreEl = document.getElementById('game-score');
    const highscoreEl = document.getElementById('game-highscore');
    const livesEl = document.getElementById('game-lives');
    const overlay = document.getElementById('game-overlay');
    const overlayTitle = document.getElementById('overlay-title');
    const overlayMsg = document.getElementById('overlay-msg');
    const startBtn = document.getElementById('start-game-btn');

    // Controls
    const btnLeft = document.getElementById('btn-left');
    const btnRight = document.getElementById('btn-right');
    const btnFire = document.getElementById('btn-fire');

    let highscore = parseInt(localStorage.getItem('amit_game_highscore')) || 0;
    if (highscoreEl) highscoreEl.textContent = highscore;

    let gameActive = false;
    let score = 0;
    let lives = 3;
    let animationId = null;

    // Player Object
    const player = {
      x: arcadeCanvas.width / 2 - 18,
      y: arcadeCanvas.height - 45,
      width: 36,
      height: 30,
      speed: 7,
      isMovingLeft: false,
      isMovingRight: false,
      color: '#00f5d4'
    };

    let bullets = [];
    let enemies = [];
    let orbs = [];
    let explosions = [];
    let enemySpawnCounter = 0;
    let orbSpawnCounter = 0;

    function resetGame() {
      score = 0;
      lives = 3;
      bullets = [];
      enemies = [];
      orbs = [];
      explosions = [];
      enemySpawnCounter = 0;
      orbSpawnCounter = 0;
      player.x = arcadeCanvas.width / 2 - 18;
      updateHud();
    }

    function updateHud() {
      if (scoreEl) scoreEl.textContent = score;
      if (livesEl) livesEl.textContent = lives;
      if (highscoreEl) highscoreEl.textContent = highscore;
    }

    function createExplosion(x, y, color = '#f72585') {
      for (let i = 0; i < 15; i++) {
        explosions.push({
          x: x,
          y: y,
          vx: (Math.random() - 0.5) * 6,
          vy: (Math.random() - 0.5) * 6,
          radius: Math.random() * 3 + 1,
          color: color,
          alpha: 1,
          decay: Math.random() * 0.03 + 0.02
        });
      }
    }

    // Keyboard Listeners
    window.addEventListener('keydown', (e) => {
      if (!gameActive) return;
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        player.isMovingLeft = true;
      }
      if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        player.isMovingRight = true;
      }
      if (e.code === 'Space') {
        e.preventDefault();
        fireBullet();
      }
    });

    window.addEventListener('keyup', (e) => {
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        player.isMovingLeft = false;
      }
      if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        player.isMovingRight = false;
      }
    });

    // Touch / Button Controls
    if (btnLeft) {
      btnLeft.addEventListener('mousedown', () => player.isMovingLeft = true);
      btnLeft.addEventListener('mouseup', () => player.isMovingLeft = false);
      btnLeft.addEventListener('touchstart', (e) => { e.preventDefault(); player.isMovingLeft = true; });
      btnLeft.addEventListener('touchend', (e) => { e.preventDefault(); player.isMovingLeft = false; });
    }
    if (btnRight) {
      btnRight.addEventListener('mousedown', () => player.isMovingRight = true);
      btnRight.addEventListener('mouseup', () => player.isMovingRight = false);
      btnRight.addEventListener('touchstart', (e) => { e.preventDefault(); player.isMovingRight = true; });
      btnRight.addEventListener('touchend', (e) => { e.preventDefault(); player.isMovingRight = false; });
    }
    if (btnFire) {
      btnFire.addEventListener('click', (e) => {
        e.preventDefault();
        fireBullet();
      });
      btnFire.addEventListener('touchstart', (e) => {
        e.preventDefault();
        fireBullet();
      });
    }

    function fireBullet() {
      if (!gameActive) return;
      playLaserSound();
      bullets.push({
        x: player.x + player.width / 2 - 2,
        y: player.y - 4,
        width: 4,
        height: 12,
        speed: 10,
        color: '#00f5d4'
      });
    }

    function updateGame() {
      // Move Player
      if (player.isMovingLeft && player.x > 0) {
        player.x -= player.speed;
      }
      if (player.isMovingRight && player.x < arcadeCanvas.width - player.width) {
        player.x += player.speed;
      }

      // Update Bullets
      for (let i = bullets.length - 1; i >= 0; i--) {
        bullets[i].y -= bullets[i].speed;
        if (bullets[i].y < -15) {
          bullets.splice(i, 1);
        }
      }

      // Spawn Bugs / Enemies
      enemySpawnCounter++;
      if (enemySpawnCounter > 42) {
        enemySpawnCounter = 0;
        const size = Math.random() * 20 + 22;
        enemies.push({
          x: Math.random() * (arcadeCanvas.width - size),
          y: -size,
          width: size,
          height: size,
          speed: Math.random() * 2.2 + 1.8,
          color: Math.random() > 0.5 ? '#f72585' : '#ef4444'
        });
      }

      // Spawn Clean Code Orbs
      orbSpawnCounter++;
      if (orbSpawnCounter > 130) {
        orbSpawnCounter = 0;
        orbs.push({
          x: Math.random() * (arcadeCanvas.width - 24) + 12,
          y: -15,
          radius: 9,
          speed: 2,
          color: '#a855f7'
        });
      }

      // Update Enemies
      for (let i = enemies.length - 1; i >= 0; i--) {
        const e = enemies[i];
        e.y += e.speed;

        // Check collision with bullets
        for (let j = bullets.length - 1; j >= 0; j--) {
          const b = bullets[j];
          if (
            b.x < e.x + e.width &&
            b.x + b.width > e.x &&
            b.y < e.y + e.height &&
            b.y + b.height > e.y
          ) {
            playExplodeSound();
            createExplosion(e.x + e.width / 2, e.y + e.height / 2, e.color);
            bullets.splice(j, 1);
            enemies.splice(i, 1);
            score += 15;
            if (score > highscore) {
              highscore = score;
              localStorage.setItem('amit_game_highscore', highscore);
            }
            updateHud();
            break;
          }
        }

        // Check collision with player
        if (
          e &&
          player.x < e.x + e.width &&
          player.x + player.width > e.x &&
          player.y < e.y + e.height &&
          player.y + player.height > e.y
        ) {
          playExplodeSound();
          createExplosion(player.x + player.width / 2, player.y + player.height / 2, '#ef4444');
          enemies.splice(i, 1);
          lives--;
          updateHud();

          if (lives <= 0) {
            endGame();
            return;
          }
        }

        // Out of bounds
        if (e && e.y > arcadeCanvas.height + 30) {
          enemies.splice(i, 1);
        }
      }

      // Update Orbs
      for (let i = orbs.length - 1; i >= 0; i--) {
        const orb = orbs[i];
        orb.y += orb.speed;

        // Collision with player
        const dx = (player.x + player.width / 2) - orb.x;
        const dy = (player.y + player.height / 2) - orb.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < player.width / 2 + orb.radius) {
          playScoreSound();
          createExplosion(orb.x, orb.y, '#a855f7');
          score += 35;
          if (score % 150 === 0 && lives < 5) lives++;
          if (score > highscore) {
            highscore = score;
            localStorage.setItem('amit_game_highscore', highscore);
          }
          updateHud();
          orbs.splice(i, 1);
        } else if (orb.y > arcadeCanvas.height + 20) {
          orbs.splice(i, 1);
        }
      }

      // Update Particle Explosions
      for (let i = explosions.length - 1; i >= 0; i--) {
        const p = explosions[i];
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= p.decay;
        if (p.alpha <= 0) explosions.splice(i, 1);
      }
    }

    function drawGame() {
      actx.clearRect(0, 0, arcadeCanvas.width, arcadeCanvas.height);

      // Starfield background
      actx.fillStyle = 'rgba(255, 255, 255, 0.4)';
      for (let i = 0; i < 25; i++) {
        const sx = (i * 29 + (Date.now() * 0.05)) % arcadeCanvas.width;
        const sy = (i * 47 + (Date.now() * 0.1)) % arcadeCanvas.height;
        actx.fillRect(sx, sy, 1.5, 1.5);
      }

      // Draw Player Ship (Futuristic Neon Polygon)
      actx.save();
      actx.translate(player.x, player.y);

      // Thruster flame
      actx.beginPath();
      actx.moveTo(player.width / 2 - 5, player.height);
      actx.lineTo(player.width / 2, player.height + 8 + Math.random() * 6);
      actx.lineTo(player.width / 2 + 5, player.height);
      actx.fillStyle = '#f72585';
      actx.shadowColor = '#f72585';
      actx.shadowBlur = 10;
      actx.fill();

      // Ship body
      actx.beginPath();
      actx.moveTo(player.width / 2, 0);
      actx.lineTo(player.width, player.height);
      actx.lineTo(player.width / 2, player.height - 6);
      actx.lineTo(0, player.height);
      actx.closePath();
      actx.fillStyle = '#00f5d4';
      actx.shadowColor = '#00f5d4';
      actx.shadowBlur = 12;
      actx.fill();

      // Cockpit
      actx.beginPath();
      actx.arc(player.width / 2, player.height / 2, 4, 0, Math.PI * 2);
      actx.fillStyle = '#ffffff';
      actx.fill();
      actx.restore();

      // Draw Bullets
      bullets.forEach(b => {
        actx.save();
        actx.fillStyle = b.color;
        actx.shadowColor = b.color;
        actx.shadowBlur = 10;
        actx.fillRect(b.x, b.y, b.width, b.height);
        actx.restore();
      });

      // Draw Enemies (Bug blocks)
      enemies.forEach(e => {
        actx.save();
        actx.fillStyle = e.color;
        actx.shadowColor = e.color;
        actx.shadowBlur = 12;

        actx.beginPath();
        actx.rect(e.x, e.y, e.width, e.height);
        actx.fill();

        // Inner glowing core
        actx.fillStyle = '#ffffff';
        actx.fillRect(e.x + 6, e.y + 6, e.width - 12, e.height - 12);
        actx.restore();
      });

      // Draw Orbs (Clean Code Cores)
      orbs.forEach(orb => {
        actx.save();
        actx.beginPath();
        actx.arc(orb.x, orb.y, orb.radius, 0, Math.PI * 2);
        actx.fillStyle = orb.color;
        actx.shadowColor = orb.color;
        actx.shadowBlur = 15;
        actx.fill();

        actx.beginPath();
        actx.arc(orb.x, orb.y, orb.radius * 0.45, 0, Math.PI * 2);
        actx.fillStyle = '#ffffff';
        actx.fill();
        actx.restore();
      });

      // Draw Explosions
      explosions.forEach(p => {
        actx.save();
        actx.beginPath();
        actx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        actx.fillStyle = p.color;
        actx.globalAlpha = p.alpha;
        actx.shadowColor = p.color;
        actx.shadowBlur = 8;
        actx.fill();
        actx.restore();
      });
    }

    function gameLoop() {
      if (!gameActive) return;
      updateGame();
      drawGame();
      animationId = requestAnimationFrame(gameLoop);
    }

    function startGame() {
      initAudio();
      resetGame();
      gameActive = true;
      if (overlay) overlay.classList.add('hidden');
      if (animationId) cancelAnimationFrame(animationId);
      animationId = requestAnimationFrame(gameLoop);
    }

    function endGame() {
      gameActive = false;
      if (overlay) {
        overlay.classList.remove('hidden');
        if (overlayTitle) overlayTitle.textContent = 'SYSTEM OVERLOAD!';
        if (overlayMsg) overlayMsg.innerHTML = `Final Score: <strong style="color:var(--cyan);">${score}</strong> | High Score: <strong style="color:var(--pink);">${highscore}</strong>`;
        if (startBtn) startBtn.innerHTML = '<i class="fa-solid fa-rotate-right"></i> PLAY AGAIN';
      }
    }

    if (startBtn) {
      startBtn.addEventListener('click', startGame);
    }
  }

  /* ==========================================================================
     5. HERO CODE CARD 3D INTERACTIVE TILT EFFECT
     ========================================================================== */
  const codeCard = document.getElementById('code-card');
  if (codeCard) {
    codeCard.addEventListener('mousemove', (e) => {
      const rect = codeCard.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -10;
      const rotateY = ((x - centerX) / centerX) * 10;

      codeCard.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
    });

    codeCard.addEventListener('mouseleave', () => {
      codeCard.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
    });
  }

  /* ==========================================================================
     6. NAVBAR & SMOOTH SCROLLING
     ========================================================================== */
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  // Sticky Navbar Blur Effect
  window.addEventListener('scroll', () => {
    if (navbar) {
      if (window.scrollY > 40) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }
    highlightActiveNavLink();
  });

  // Mobile Menu Toggle
  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      const spans = hamburger.querySelectorAll('span');
      if (navMenu.classList.contains('open')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
      } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      }
    });

    // Close menu when clicking link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        const spans = hamburger.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      });
    });
  }

  // Active Nav Link Scroll Spy
  function highlightActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset + 120;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop;
      const sectionId = current.getAttribute('id');

      if (scrollY >= sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  /* ==========================================================================
     7. COPY EMAIL BUTTON WITH TOOLTIP
     ========================================================================== */
  const copyBtn = document.getElementById('copy-email-btn');
  const copyTooltip = document.getElementById('copy-tooltip');
  const emailVal = 'rajamit802212@gmail.com';

  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(emailVal).then(() => {
        playTone(700, 0.09, 'sine');
        if (copyTooltip) {
          copyTooltip.classList.add('show');
          setTimeout(() => {
            copyTooltip.classList.remove('show');
          }, 2000);
        }
      }).catch(() => {
        alert('Copied: ' + emailVal);
      });
    });
  }

  /* ==========================================================================
     8. CONTACT FORM HANDLER
     ========================================================================== */
  const contactForm = document.getElementById('contact-form');
  const formToast = document.getElementById('form-toast');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('form-name').value;
      const email = document.getElementById('form-email').value;
      const subject = document.getElementById('form-subject').value;
      const message = document.getElementById('form-message').value;

      playTone(880, 0.12, 'triangle');

      // Construct mailto url for Amit Raj
      const bodyContent = `Hello Amit,\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;
      const mailtoUrl = `mailto:rajamit802212@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyContent)}`;

      if (formToast) {
        formToast.classList.add('show');
        setTimeout(() => {
          window.location.href = mailtoUrl;
        }, 600);
      } else {
        window.location.href = mailtoUrl;
      }
    });
  }
});
