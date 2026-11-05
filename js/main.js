/**
 * MAAZ VHORA - PORTFOLIO INTERACTIVE ENGINE
 * Canvas animations, interactive terminal, project modal, theme switcher,
 * form validation, smooth scrolling, and custom micro-interactions.
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  /* --------------------------------------------------------------------------
     1. Theme Switcher (Dark / Light) with LocalStorage
     -------------------------------------------------------------------------- */
  const htmlEl = document.documentElement;
  const themeToggleBtn = document.getElementById('theme-toggle');

  const getPreferredTheme = () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) return savedTheme;
    return 'light';
  };

  const setTheme = (theme) => {
    htmlEl.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  };

  setTheme(getPreferredTheme());

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = htmlEl.getAttribute('data-theme') || 'dark';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      setTheme(newTheme);
    });
  }

  /* --------------------------------------------------------------------------
     2. Scroll Progress & Sticky Header
     -------------------------------------------------------------------------- */
  const header = document.getElementById('header');
  const scrollProgressBar = document.getElementById('scroll-progress');
  const backToTopBtn = document.getElementById('back-to-top');

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

    if (scrollProgressBar) {
      scrollProgressBar.style.width = `${scrollPercent}%`;
    }

    if (header) {
      if (scrollTop > 30) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }

    if (backToTopBtn) {
      if (scrollTop > 400) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }
  });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* --------------------------------------------------------------------------
     5. Active Navigation Link Spy
     -------------------------------------------------------------------------- */
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  const highlightNav = () => {
    const scrollPos = window.scrollY + 160;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        navLinks.forEach((link) => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', highlightNav);

  /* --------------------------------------------------------------------------
     6. Mobile Drawer Navigation
     -------------------------------------------------------------------------- */
  const mobileToggle = document.getElementById('mobile-toggle');
  const mobileClose = document.getElementById('mobile-close');
  const mobileDrawer = document.getElementById('mobile-nav-drawer');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  const openMobileMenu = () => {
    if (mobileDrawer) {
      mobileDrawer.classList.add('active');
      mobileDrawer.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }
  };

  const closeMobileMenu = () => {
    if (mobileDrawer) {
      mobileDrawer.classList.remove('active');
      mobileDrawer.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  };

  if (mobileToggle) mobileToggle.addEventListener('click', openMobileMenu);
  if (mobileClose) mobileClose.addEventListener('click', closeMobileMenu);
  mobileLinks.forEach((link) => link.addEventListener('click', closeMobileMenu));

  /* --------------------------------------------------------------------------
     7. Typewriter Effect
     -------------------------------------------------------------------------- */
  const typewriterTarget = document.getElementById('typewriter-text');
  const phrases = [
    'Modern JavaScript',
    'High-Performance Backend',
    'Crafted User Interfaces'
  ];

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typeSpeed = 90;

  const handleTypewriter = () => {
    if (!typewriterTarget) return;

    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
      typewriterTarget.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
      typeSpeed = 40;
    } else {
      typewriterTarget.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
      typeSpeed = 90;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
      typeSpeed = 1800; // Pause at full word
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typeSpeed = 400; // Pause before new word
    }

    setTimeout(handleTypewriter, typeSpeed);
  };

  handleTypewriter();

  /* --------------------------------------------------------------------------
     8. Interactive 3D Flip Card (Photo <-> Welcome & Intro)
     -------------------------------------------------------------------------- */
  const heroFlipCard = document.getElementById('hero-flip-card');
  if (heroFlipCard) {
    // Touch tap / click toggle (empowers mobile visitors and accessibility)
    heroFlipCard.addEventListener('click', (e) => {
      // Don't toggle flip if visitor clicked an action button or link on the back face
      if (e.target.closest('a') || e.target.closest('button')) {
        return;
      }
      heroFlipCard.classList.toggle('is-flipped');
    });

    // Keyboard accessibility: Enter or Space toggles the card flip
    heroFlipCard.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        if (!e.target.closest('a') && !e.target.closest('button')) {
          e.preventDefault();
          heroFlipCard.classList.toggle('is-flipped');
        }
      }
    });
  }

  /* --------------------------------------------------------------------------
     9. Animated Stats Counter (Intersection Observer)
     -------------------------------------------------------------------------- */
  const counters = document.querySelectorAll('.counter');
  let hasCounted = false;

  const countObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !hasCounted) {
          hasCounted = true;
          counters.forEach((counter) => {
            const target = +counter.getAttribute('data-target');
            let count = 0;
            const duration = 1600;
            const stepTime = 25;
            const steps = duration / stepTime;
            const increment = target / steps;

            const timer = setInterval(() => {
              count += increment;
              if (count >= target) {
                counter.textContent = target;
                clearInterval(timer);
              } else {
                counter.textContent = Math.floor(count);
              }
            }, stepTime);
          });
          observer.disconnect();
        }
      });
    },
    { threshold: 0.3 }
  );

  const metricsSection = document.querySelector('.metrics-grid');
  if (metricsSection) countObserver.observe(metricsSection);

  /* --------------------------------------------------------------------------
     10. Interactive CLI Terminal
     -------------------------------------------------------------------------- */
  const terminalInput = document.getElementById('terminal-input');
  const terminalOutput = document.getElementById('terminal-output');
  const terminalClearBtn = document.getElementById('terminal-clear');

  const terminalCommands = {
    help: 'Available commands: <span class="t-highlight">about</span>, <span class="t-highlight">skills</span>, <span class="t-highlight">projects</span>, <span class="t-highlight">contact</span>, <span class="t-highlight">resume</span>, <span class="t-highlight">clear</span>, <span class="t-highlight">whoami</span>, <span class="t-highlight">date</span>, <span class="t-highlight">sudo</span>',
    whoami: 'Maaz Vhora | Assistant Full-Stack Engineer &amp; UI Architect based in Vadodara, Gujarat.',
    about: 'Computer Science &amp; Engineering student at ITM (sls) Baroda University with a passion for web development and clean code.',
    skills: 'Core Stack: HTML5, CSS3, Tailwind CSS, JavaScript, React, Node.js, MongoDB, Git &amp; GitHub.',
    projects: '<div style="line-height:1.6;"><span style="color:#ffffff;font-weight:700;">📂 Public GitHub Projects (maazvhora):</span><br>[1] <span style="color:#ffffff;font-weight:600;">Apple Official Store Clone</span> — Pixel-perfect UI showcase<br>&nbsp;&nbsp;&nbsp;&nbsp;🔗 Demo: <a href="https://apple-clone-weld-zeta.vercel.app" target="_blank" style="color:#E7E1D2;text-decoration:underline;">apple-clone-weld-zeta.vercel.app</a> | 🐙 <a href="https://github.com/maazvhora/appleClone" target="_blank" style="color:#E7E1D2;text-decoration:underline;">GitHub</a><br>[2] <span style="color:#ffffff;font-weight:600;">Spider-Man Interactive Web Experience</span> — Real-time web physics &amp; canvas<br>&nbsp;&nbsp;&nbsp;&nbsp;🔗 Demo: <a href="https://spider-man-portfolio-rww2.vercel.app" target="_blank" style="color:#E7E1D2;text-decoration:underline;">spider-man-portfolio-rww2.vercel.app</a> | 🐙 <a href="https://github.com/maazvhora/spider-man-portfolio" target="_blank" style="color:#E7E1D2;text-decoration:underline;">GitHub</a><br>[3] <span style="color:#ffffff;font-weight:600;">Mamo TechnoLabs Digital Agency Portal</span> — Corporate IT agency showcase<br>&nbsp;&nbsp;&nbsp;&nbsp;🐙 <a href="https://github.com/maazvhora/mamotechnolabs" target="_blank" style="color:#E7E1D2;text-decoration:underline;">github.com/maazvhora/mamotechnolabs</a><br>[4] <span style="color:#ffffff;font-weight:600;">Textify Live Text Processing Tool</span> — Instant string analysis &amp; formatting<br>&nbsp;&nbsp;&nbsp;&nbsp;🐙 <a href="https://github.com/maazvhora/Text" target="_blank" style="color:#E7E1D2;text-decoration:underline;">github.com/maazvhora/Text</a><br>[5] <span style="color:#ffffff;font-weight:600;">Snip URL Shortener &amp; API</span> — Full-stack Express &amp; MongoDB link redirection<br>&nbsp;&nbsp;&nbsp;&nbsp;🔗 Demo: <a href="https://short-d002gez4m-maaz-ad5e.vercel.app/" target="_blank" style="color:#E7E1D2;text-decoration:underline;">short-d002gez4m-maaz-ad5e.vercel.app</a> | 🐙 <a href="https://github.com/maazvhora/shortUrl" target="_blank" style="color:#E7E1D2;text-decoration:underline;">GitHub</a></div>',
    contact: 'Email: vhoramaaz606@gmail.com | Phone: +91 7041493457 | LinkedIn: https://www.linkedin.com/in/maaz-vhora-106925353 | GitHub: https://github.com/maazvhora',
    resume: 'Maaz Vhora Resume: <a href="assets/resume.pdf" target="_blank" style="color:#fff3e6;text-decoration:underline;font-weight:600;">[View PDF]</a> | <a href="assets/Maaz_Vhora_Resume.pdf" download="Maaz_Vhora_Resume.pdf" style="color:#fff3e6;text-decoration:underline;font-weight:600;">[Download PDF]</a>',
    date: () => new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata', dateStyle: 'full', timeStyle: 'medium' }) + ' (IST)',
    sudo: 'Permission denied: you already have supreme root access to browse this portfolio!',
  };

  const commandHistory = [];
  let historyIndex = -1;

  if (terminalInput && terminalOutput) {
    terminalInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const rawCmd = terminalInput.value.trim();
        const cmd = rawCmd.toLowerCase();
        if (!rawCmd) return;

        commandHistory.push(rawCmd);
        historyIndex = commandHistory.length;

        // Print entered command
        const cmdLine = document.createElement('div');
        cmdLine.className = 'terminal-line';
        cmdLine.innerHTML = `<span class="t-prompt">maaz@dev:~$</span> <span class="t-cmd">${rawCmd}</span>`;
        terminalOutput.appendChild(cmdLine);

        // Process output
        if (cmd === 'clear') {
          terminalOutput.innerHTML = '';
        } else if (terminalCommands[cmd]) {
          const resLine = document.createElement('div');
          resLine.className = 'terminal-line t-response';
          const content = typeof terminalCommands[cmd] === 'function' ? terminalCommands[cmd]() : terminalCommands[cmd];
          resLine.innerHTML = content;
          terminalOutput.appendChild(resLine);
        } else {
          const errLine = document.createElement('div');
          errLine.className = 'terminal-line t-response';
          errLine.innerHTML = `zsh: command not found: <span style="color:#ef4444">${rawCmd}</span>. Type <span class="t-highlight">help</span> for a list of available commands.`;
          terminalOutput.appendChild(errLine);
        }

        terminalInput.value = '';
        terminalOutput.scrollTop = terminalOutput.scrollHeight;
      } else if (e.key === 'ArrowUp') {
        if (historyIndex > 0) {
          historyIndex--;
          terminalInput.value = commandHistory[historyIndex] || '';
        }
      } else if (e.key === 'ArrowDown') {
        if (historyIndex < commandHistory.length - 1) {
          historyIndex++;
          terminalInput.value = commandHistory[historyIndex] || '';
        } else {
          historyIndex = commandHistory.length;
          terminalInput.value = '';
        }
      }
    });

    if (terminalClearBtn) {
      terminalClearBtn.addEventListener('click', () => {
        terminalOutput.innerHTML = '';
      });
    }
  }

  /* --------------------------------------------------------------------------
     11. Skills Filter & Progress Animation
     -------------------------------------------------------------------------- */
  const skillTabs = document.querySelectorAll('.filter-tab');
  const skillCards = document.querySelectorAll('.skill-card');

  skillTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      skillTabs.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.getAttribute('data-filter');

      skillCards.forEach((card) => {
        const cat = card.getAttribute('data-category');
        if (filter === 'all' || cat === filter) {
          card.style.display = 'flex';
          setTimeout(() => (card.style.opacity = '1'), 10);
        } else {
          card.style.display = 'none';
          card.style.opacity = '0';
        }
      });
    });
  });

  // Animate skill bars on viewport entry
  const skillsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animated');
        }
      });
    },
    { threshold: 0.15 }
  );

  skillCards.forEach((card) => skillsObserver.observe(card));

  /* --------------------------------------------------------------------------
     12. Projects Filter
     -------------------------------------------------------------------------- */
  const projectFilterBtns = document.querySelectorAll('.project-filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  projectFilterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      projectFilterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach((card) => {
        const cat = card.getAttribute('data-category');
        if (filter === 'all' || cat === filter) {
          card.style.display = 'flex';
          setTimeout(() => (card.style.opacity = '1'), 20);
        } else {
          card.style.opacity = '0';
          setTimeout(() => (card.style.display = 'none'), 250);
        }
      });
    });
  });

  /* --------------------------------------------------------------------------
     13. Project Quick-View Modal Data & Handlers
     -------------------------------------------------------------------------- */
  const projectModal = document.getElementById('project-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalContent = document.getElementById('modal-content');

  const projectDatabase = {
    p1: {
      title: 'Apple Official Store & Products Clone',
      image: 'assets/images/project-apple.jpg',
      category: 'Frontend & UI Clone',
      year: '2024',
      overview:
        'A pixel-perfect, high-fidelity Apple Store clone featuring product showcases for iPhone 15 Pro, MacBook Pro, Apple Watch, smooth interactive navigation, responsive typography, and Apple’s signature minimalist design aesthetic.',
      features: [
        'Interactive Apple product showcase grid with modern device specifications and sleek previews',
        'Fluid navigation bar with responsive drawer, micro-interactions, and quick preview tabs',
        'Production asset optimization deployed live on Vercel with instant edge caching',
        'Clean, accessible semantic HTML5 and vanilla CSS architecture'
      ],
      tech: ['HTML5', 'CSS3', 'JavaScript', 'Vercel', 'Responsive UI'],
      liveUrl: 'https://apple-clone-weld-zeta.vercel.app',
      githubUrl: 'https://github.com/maazvhora/appleClone'
    },
    p2: {
      title: 'Spider-Man Interactive Web Experience',
      image: 'assets/images/project-spiderman.jpg',
      category: 'Creative UI & Physics',
      year: '2024',
      overview:
        'An interactive superhero web application concept featuring dynamic Spider-Man web physics, HTML5 Canvas silk particle simulations, Miles Morales & Peter Parker dual-hue accents, and responsive UI.',
      features: [
        'Real-time Spider-Man web-slinger cursor interaction with elastic catenary silk curves',
        'Click-to-burst web splat shockwave animations with dual Spider-Sense pulse rings',
        'High-frequency 60 FPS HTML5 Canvas engine with zero frame drops',
        'Modern TypeScript codebase with modular component architecture'
      ],
      tech: ['TypeScript', 'Canvas API', 'CSS3', 'JavaScript', 'Web Physics', 'Vercel'],
      liveUrl: 'https://spider-man-portfolio-rww2.vercel.app',
      githubUrl: 'https://github.com/maazvhora/spider-man-portfolio'
    },
    p3: {
      title: 'Mamo TechnoLabs Digital Agency Portal',
      image: 'assets/images/project-mamotechno.jpg',
      category: 'Enterprise & Agency Web',
      year: '2024',
      overview:
        'A corporate digital agency platform featuring modern IT services, software development capabilities, cloud consulting solutions, client statistics counters, and lead generation sections.',
      features: [
        'Corporate service showcase cards highlighting Cloud, AI, and Custom Development',
        'Dynamic client statistics counters and testimonial carousel components',
        'Interactive contact funnel with field validation and conversion triggers',
        'Glassmorphic dark design system with responsive layouts across all viewports'
      ],
      tech: ['HTML5', 'CSS3', 'JavaScript', 'Corporate UI', 'Glassmorphism'],
      liveUrl: 'https://github.com/maazvhora/mamotechnolabs',
      githubUrl: 'https://github.com/maazvhora/mamotechnolabs'
    },
    p4: {
      title: 'Textify Live Text Processing Tool',
      image: 'assets/images/project-textify.jpg',
      category: 'JavaScript Utility',
      year: '2024',
      overview:
        'A fast, lightweight client-side text processing tool featuring instant word & character counting, case transformers (uppercase, lowercase, title case), whitespace cleanups, and formatted live previews.',
      features: [
        'Instant live character, word, sentence, and space calculation as you type',
        'One-click case transformers: UPPERCASE, lowercase, Title Case, and Sentence case',
        'Extra whitespace cleaner, text copy-to-clipboard, and clear utilities',
        'Zero-dependency vanilla JavaScript execution with instant DOM reaction'
      ],
      tech: ['JavaScript', 'HTML5', 'CSS3', 'DOM API', 'Text Utilities'],
      liveUrl: 'https://github.com/maazvhora/Text',
      githubUrl: 'https://github.com/maazvhora/Text'
    },
    p5: {
      title: 'Snip — Modern URL Shortener & API',
      image: 'assets/images/project-shorturl.jpg',
      category: 'Full-Stack & Backend Tool',
      year: '2024',
      overview:
        'A full-stack URL-shortening web application and REST API built with Node.js, Express, EJS, and MongoDB. Converts long, cumbersome links into clean, shareable short URLs with lightning-fast redirection, click routing, and persistent cloud storage.',
      features: [
        'Instant URL hashing and unique short-ID generation using NanoID & ShortID algorithms',
        'High-speed redirect routing engine backed by MongoDB connection pooling',
        'RESTful API endpoints for programmatic link creation and retrieval',
        'Clean, accessible responsive UI built with semantic EJS views and modern CSS'
      ],
      tech: ['Node.js', 'Express.js', 'MongoDB', 'Mongoose', 'EJS', 'REST API'],
      liveUrl: 'https://short-d002gez4m-maaz-ad5e.vercel.app/',
      githubUrl: 'https://github.com/maazvhora/shortUrl'
    }
  };

  const openProjectModal = (projectId) => {
    const data = projectDatabase[projectId];
    if (!data || !projectModal || !modalContent) return;

    modalContent.innerHTML = `
      <img src="${data.image}" alt="${data.title}" class="modal-img">
      <div class="project-meta">
        <span class="project-category-badge">${data.category}</span>
        <span class="project-year">${data.year}</span>
      </div>
      <h2 class="modal-title">${data.title}</h2>
      <p class="modal-overview">${data.overview}</p>
      
      <h3 class="modal-section-title">Key Architectural Highlights</h3>
      <ul class="modal-feature-list">
        ${data.features.map((feat) => `<li>${feat}</li>`).join('')}
      </ul>

      <div class="modal-cta-row">
        ${data.liveUrl && data.liveUrl !== '#' && !data.liveUrl.includes('github.com') ? `
          <a href="${data.liveUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-live-demo">
            <span class="live-dot"></span>
            <span>Visit Live Demo</span>
          </a>
        ` : `
          <a href="#contact" class="btn btn-primary" onclick="document.getElementById('modal-close-btn').click()">
            Discuss Similar Project
          </a>
        `}
        <a href="${data.githubUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-github">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
          <span>View on GitHub</span>
        </a>
      </div>
    `;

    projectModal.classList.add('active');
    projectModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeProjectModal = () => {
    if (projectModal) {
      projectModal.classList.remove('active');
      projectModal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  };

  document.querySelectorAll('.view-project-btn').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const pid = btn.getAttribute('data-project');
      openProjectModal(pid);
    });
  });

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeProjectModal);

  if (projectModal) {
    projectModal.addEventListener('click', (e) => {
      if (e.target === projectModal) closeProjectModal();
    });
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeProjectModal();
      closeMobileMenu();
    }
  });

  /* --------------------------------------------------------------------------
     14. Toast Notification Utility
     -------------------------------------------------------------------------- */
  const toastContainer = document.getElementById('toast-container');

  const showToast = (message, type = 'success') => {
    if (!toastContainer) return;

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    const icon = type === 'success' ? '✓' : 'ℹ';
    toast.innerHTML = `<span style="font-weight:bold">${icon}</span><span>${message}</span>`;

    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.classList.add('hiding');
      setTimeout(() => toast.remove(), 300);
    }, 3200);
  };

  /* --------------------------------------------------------------------------
     15. One-Click Copy to Clipboard
     -------------------------------------------------------------------------- */
  const copyBtns = document.querySelectorAll('.copy-email-btn');
  copyBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const email = btn.getAttribute('data-email') || 'vhoramaaz606@gmail.com';
      navigator.clipboard
        .writeText(email)
        .then(() => {
          showToast(`Copied ${email} to clipboard!`, 'success');
        })
        .catch(() => {
          showToast('Failed to copy. Please manually copy email.', 'error');
        });
    });
  });

  /* --------------------------------------------------------------------------
     16. Live Local Time Clock
     -------------------------------------------------------------------------- */
  const liveClockEl = document.getElementById('live-clock');

  const updateClock = () => {
    if (!liveClockEl) return;
    const now = new Date();
    // Format in IST (India Standard Time UTC+5:30)
    const options = {
      timeZone: 'Asia/Kolkata',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    };
    liveClockEl.textContent = `${now.toLocaleTimeString('en-US', options)} (IST • UTC+5:30)`;
  };

  updateClock();
  setInterval(updateClock, 1000);

  /* --------------------------------------------------------------------------
     17. Contact Form Interactive Validation & Real Email Delivery
     -------------------------------------------------------------------------- */
  const contactForm = document.getElementById('contact-form');
  const nameInput = document.getElementById('form-name');
  const emailInput = document.getElementById('form-email');
  const projectTypeSelect = document.getElementById('form-project-type');
  const timelineSelect = document.getElementById('form-budget');
  const messageInput = document.getElementById('form-message');
  const submitBtn = document.getElementById('form-submit-btn');
  const statusAlert = document.getElementById('form-status-alert');

  const nameError = document.getElementById('name-error');
  const emailError = document.getElementById('email-error');
  const messageError = document.getElementById('message-error');

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const escapeHtml = (str) => {
    const div = document.createElement('div');
    div.textContent = str || '';
    return div.innerHTML;
  };

  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      let isValid = true;

      // Clear previous error states
      [nameError, emailError, messageError].forEach((err) => {
        if (err) err.textContent = '';
      });
      [nameInput, emailInput, messageInput].forEach((inp) => {
        inp?.parentElement?.classList.remove('has-error');
      });
      if (statusAlert) {
        statusAlert.style.display = 'none';
        statusAlert.className = 'form-status-alert';
        statusAlert.innerHTML = '';
      }

      // Name validation
      const nameVal = nameInput ? nameInput.value.trim() : '';
      if (!nameVal) {
        if (nameError) nameError.textContent = 'Please enter your name';
        nameInput?.parentElement?.classList.add('has-error');
        isValid = false;
      } else if (nameVal.length < 2) {
        if (nameError) nameError.textContent = 'Name must be at least 2 characters';
        nameInput?.parentElement?.classList.add('has-error');
        isValid = false;
      }

      // Email validation
      const emailVal = emailInput ? emailInput.value.trim() : '';
      if (!emailVal) {
        if (emailError) emailError.textContent = 'Please enter your email address';
        emailInput?.parentElement?.classList.add('has-error');
        isValid = false;
      } else if (!validateEmail(emailVal)) {
        if (emailError) emailError.textContent = 'Please enter a valid email address';
        emailInput?.parentElement?.classList.add('has-error');
        isValid = false;
      }

      // Message validation
      const messageVal = messageInput ? messageInput.value.trim() : '';
      if (!messageVal) {
        if (messageError) messageError.textContent = 'Please enter your message';
        messageInput?.parentElement?.classList.add('has-error');
        isValid = false;
      } else if (messageVal.length < 10) {
        if (messageError) messageError.textContent = 'Message should be at least 10 characters';
        messageInput?.parentElement?.classList.add('has-error');
        isValid = false;
      }

      if (!isValid) {
        // Focus first field with error
        if ((!nameVal || nameVal.length < 2) && nameInput) nameInput.focus();
        else if ((!emailVal || !validateEmail(emailVal)) && emailInput) emailInput.focus();
        else if (messageInput) messageInput.focus();
        return;
      }

      // Loading state
      const originalBtnHtml = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = `<span class="spinner-sm"></span><span>Sending to Maaz Vhora...</span>`;

      const projectTypeVal = projectTypeSelect ? projectTypeSelect.value : 'Full-Stack Web App';
      const timelineVal = timelineSelect ? timelineSelect.value : 'Immediate (< 1 month)';

      const payload = {
        name: nameVal,
        email: emailVal,
        projectType: projectTypeVal,
        timeline: timelineVal,
        message: messageVal,
        _subject: `New Portfolio Inquiry from ${nameVal} (${projectTypeVal})`,
        _replyto: emailVal,
        _template: 'table',
        _captcha: 'false'
      };

      try {
        const response = await fetch('https://formsubmit.co/ajax/vhoramaaz606@gmail.com', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(payload)
        });

        const data = await response.json().catch(() => ({}));

        if (response.ok || data.success === 'true' || data.success === true) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalBtnHtml;
          contactForm.reset();

          if (statusAlert) {
            statusAlert.className = 'form-status-alert success';
            statusAlert.style.display = 'flex';
            statusAlert.innerHTML = `
              <div class="alert-icon-wrap" aria-hidden="true">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
              <div class="alert-body">
                <div class="alert-header-row">
                  <span class="alert-title">Inquiry Sent Successfully!</span>
                  <span class="alert-delivered-chip">
                    <span class="alert-live-dot" aria-hidden="true"></span>
                    <span>Delivered</span>
                  </span>
                </div>
                <p class="alert-message">
                  Your message has been delivered to <span class="alert-email-pill">vhoramaaz606@gmail.com</span>. Maaz will review it and reply directly to <span class="alert-email-pill">${escapeHtml(emailVal)}</span> shortly.
                </p>
              </div>
            `;
          }
          showToast('Inquiry sent! Delivered to vhoramaaz606@gmail.com', 'success');
        } else {
          throw new Error(data.message || 'Form submission encountered an issue');
        }
      } catch (err) {
        console.warn('Direct delivery encountered error, activating mailto fallback:', err);
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnHtml;

        const mailtoUrl = `mailto:vhoramaaz606@gmail.com?subject=${encodeURIComponent('Portfolio Inquiry from ' + nameVal)}&body=${encodeURIComponent(
          `Hello Maaz,\n\nName: ${nameVal}\nEmail: ${emailVal}\nProject Type: ${projectTypeVal}\nTimeline: ${timelineVal}\n\nMessage:\n${messageVal}\n`
        )}`;

        if (statusAlert) {
          statusAlert.className = 'form-status-alert warning';
          statusAlert.style.display = 'flex';
          statusAlert.innerHTML = `
            <div class="alert-icon-wrap" aria-hidden="true">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
            </div>
            <div class="alert-body">
              <div class="alert-header-row">
                <span class="alert-title">Submission Notice</span>
              </div>
              <p class="alert-message">
                Your network blocked automated API delivery. <a href="${mailtoUrl}" class="alert-link">Click here to open email app directly with your message pre-filled</a>.
              </p>
            </div>
          `;
        }

        window.location.href = mailtoUrl;
        showToast('Opening your email app to reach vhoramaaz606@gmail.com', 'info');
      }
    });
  }

  /* --------------------------------------------------------------------------
     18. Dynamic Copyright Year
     -------------------------------------------------------------------------- */
  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

});

