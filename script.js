document.addEventListener("DOMContentLoaded", function () {
  initLoader();
  initCursor();
  initNavigation();
  initScrollAnimations();
  initSkillsAnimation();
  initContactForm();
  initSmoothScrolling();
  initParallaxEffects();
});

/* ================ LOADING SCREEN ================ */
function initLoader() {
  const loadingScreen = document.querySelector(".loading-screen");
  const letters = document.querySelectorAll(".letter");
  const progressBar = document.querySelector(".progress-bar");

  if (!loadingScreen || letters.length === 0 || !progressBar) return;

  // Animate letters
  letters.forEach((letter, index) => {
    setTimeout(() => {
      letter.style.opacity = "1";
      letter.style.transform = "translateY(0)";
      letter.style.transition = "all 0.6s cubic-bezier(0.68,-0.55,0.265,1.55)";
    }, index * 100);
  });

  // Animate progress bar
  let progress = 0;
  const progressInterval = setInterval(() => {
    progress += Math.random() * 15;
    if (progress > 100) {
      progress = 100;
      clearInterval(progressInterval);

      setTimeout(() => {
        loadingScreen.classList.add("hidden");
        document.body.style.overflow = "visible";

        setTimeout(() => {
          startHeroAnimations();
        }, 300);

        setTimeout(() => {
          if (loadingScreen.parentNode)
            loadingScreen.parentNode.removeChild(loadingScreen);
        }, 1000);
      }, 500);
    }
    progressBar.style.width = progress + "%";
  }, 100);

  setTimeout(() => {
    if (!loadingScreen.classList.contains("hidden")) {
      loadingScreen.classList.add("hidden");
      document.body.style.overflow = "visible";
      startHeroAnimations();
    }
  }, 4000);
}

/* ================ CUSTOM CURSOR ================ */
function initCursor() {
  const cursor = document.querySelector(".cursor");
  const cursorFollower = document.querySelector(".cursor-follower");

  if (!cursor || !cursorFollower) return;
  if (window.innerWidth <= 768) {
    cursor.style.display = "none";
    cursorFollower.style.display = "none";
    return;
  }

  let mouseX = 0,
    mouseY = 0;
  let cursorX = 0,
    cursorY = 0;
  let followerX = 0,
    followerY = 0;

  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animateCursors() {
    cursorX += (mouseX - cursorX) * 0.2;
    cursorY += (mouseY - cursorY) * 0.2;
    followerX += (mouseX - followerX) * 0.1;
    followerY += (mouseY - followerY) * 0.1;

    cursor.style.left = cursorX - cursor.offsetWidth / 2 + "px";
    cursor.style.top = cursorY - cursor.offsetHeight / 2 + "px";
    cursorFollower.style.left =
      followerX - cursorFollower.offsetWidth / 2 + "px";
    cursorFollower.style.top =
      followerY - cursorFollower.offsetHeight / 2 + "px";

    requestAnimationFrame(animateCursors);
  }
  animateCursors();

  const hoverElements = document.querySelectorAll(
    "a, button, .project-card, .skill-item"
  );
  hoverElements.forEach((el) => {
    el.addEventListener("mouseenter", () => {
      cursor.style.transform = "scale(1.5)";
      cursorFollower.style.transform = "scale(1.5)";
    });

    el.addEventListener("mouseleave", () => {
      cursor.style.transform = "scale(1)";
      cursorFollower.style.transform = "scale(1)";
    });
  });
}

/* ================ NAVIGATION BAR ================ */
function initNavigation() {
  const navbar = document.querySelector(".navbar");
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");
  const navLinks = document.querySelectorAll(".nav-link");

  if (!navbar || !hamburger || !navMenu) return;

  // Hamburger menu
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
    document.body.style.overflow = navMenu.classList.contains("active")
      ? "hidden"
      : "visible";
  });

  // Close menu on link click
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active");
      navMenu.classList.remove("active");
      document.body.style.overflow = "visible";
    });
  });

  // Close menu on click outside
  document.addEventListener("click", (e) => {
    if (!navbar.contains(e.target) && navMenu.classList.contains("active")) {
      hamburger.classList.remove("active");
      navMenu.classList.remove("active");
      document.body.style.overflow = "visible";
    }
  });

  // Scroll effect and section highlighting
  let lastScrollY = window.scrollY;

  window.addEventListener("scroll", () => {
    const currentScrollY = window.scrollY;
    navbar.style.background =
      currentScrollY > 100 ? "rgba(10,10,15,0.95)" : "rgba(10,10,15,0.8)";

    // Hide/show navbar on scroll direction
    navbar.style.transform =
      currentScrollY > lastScrollY && currentScrollY > 100
        ? "translateY(-100%)"
        : "translateY(0)";

    lastScrollY = currentScrollY;
  });

  // Highlight active section
  const sections = document.querySelectorAll("section[id]");
  function highlightNavigation() {
    let current = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      if (window.scrollY >= sectionTop - 200) {
        current = section.getAttribute("id");
      }
    });
    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  }
  window.addEventListener("scroll", highlightNavigation);
}

/* ================ HERO ANIMATIONS ================ */
function startHeroAnimations() {
  const titleLines = document.querySelectorAll(".title-line");
  const heroSubtitle = document.querySelector(".hero-subtitle");
  const heroStats = document.querySelector(".hero-stats");
  const heroCta = document.querySelector(".hero-cta");
  const heroVisual = document.querySelector(".hero-visual");
  const scrollIndicator = document.querySelector(".scroll-indicator");

  titleLines.forEach((line, index) => {
    setTimeout(() => {
      line.style.opacity = "1";
      line.style.transform = "translateY(0)";
      line.style.transition = "all 0.8s cubic-bezier(.68,-.55,.265,1.55)";
    }, index * 200);
  });

  [heroSubtitle, heroStats, heroCta, heroVisual, scrollIndicator].forEach(
    (element, index) => {
      if (element) {
        setTimeout(() => {
          element.style.opacity = "1";
          element.style.transform =
            element === heroVisual ? "translateX(0)" : "translateY(0)";
          element.style.transition =
            "all 0.8s cubic-bezier(.68,-.55,.265,1.55)";
        }, 600 + index * 150);
      }
    }
  );
}

/* ================ ABOUT SECTION 3D CUBE & ANIMATION ================ */
document.addEventListener("DOMContentLoaded", function () {
  const cube = document.querySelector(".floating-cube");
  const cubeContainer = document.querySelector(".floating-cube-container");
  let isHovering = false;

  if (cubeContainer) {
    cubeContainer.addEventListener("mousemove", (e) => {
      if (!isHovering) return;
      const rect = cubeContainer.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const mouseX = ((e.clientX - centerX) / rect.width) * 100;
      const mouseY = ((e.clientY - centerY) / rect.height) * 100;
      if (cube) {
        cube.style.transform = `rotateX(${mouseY * 0.5}deg) rotateY(${
          mouseX * 0.5
        }deg) scale(1.1)`;
      }
    });
    cubeContainer.addEventListener("mouseenter", () => {
      isHovering = true;
      if (cube) cube.style.animationPlayState = "paused";
    });
    cubeContainer.addEventListener("mouseleave", () => {
      isHovering = false;
      if (cube) {
        cube.style.animationPlayState = "running";
        cube.style.transform = "";
      }
    });
  }

  // Particles follow cursor in about section
  const particles = document.querySelectorAll(".particle");
  document.addEventListener("mousemove", (e) => {
    const aboutSection = document.querySelector(".about-visual");
    if (!aboutSection) return;
    const rect = aboutSection.getBoundingClientRect();
    if (
      e.clientX >= rect.left &&
      e.clientX <= rect.right &&
      e.clientY >= rect.top &&
      e.clientY <= rect.bottom
    ) {
      particles.forEach((particle, index) => {
        const speed = 0.05 + index * 0.01;
        const x = (e.clientX - rect.left) * speed;
        const y = (e.clientY - rect.top) * speed;
        setTimeout(() => {
          particle.style.transform = `translate(${x}px, ${y}px)`;
        }, index * 100);
      });
    }
  });

  // Code snippets floating interaction
  const codeSnippets = document.querySelectorAll(".code-snippet");
  codeSnippets.forEach((snippet) => {
    snippet.addEventListener("mouseenter", () => {
      snippet.style.animationPlayState = "paused";
      snippet.style.zIndex = "10";
    });
    snippet.addEventListener("mouseleave", () => {
      snippet.style.animationPlayState = "running";
      snippet.style.zIndex = "1";
    });
    // Cycle through code texts on click
    snippet.addEventListener("click", () => {
      const codeTexts = [
        ["{ ", "React", " }"],
        ["< ", "HTML", " />"],
        ["() => ", "Arrow", ""],
        ["async ", "await", "()"],
        ["const ", "variable", " ="],
        ["import ", "module", ""],
      ];
      const randomCode =
        codeTexts[Math.floor(Math.random() * codeTexts.length)];
      const brackets = snippet.querySelectorAll(".code-bracket");
      const text = snippet.querySelector(".code-text");
      if (brackets.length >= 1 && text) {
        brackets[0].textContent = randomCode;
        text.textContent = randomCode[1];
        if (brackets[1] && randomCode[2]) {
          brackets[1].textContent = randomCode[2];
        }
      }
      snippet.style.transform = "scale(1.2)";
      setTimeout(() => {
        snippet.style.transform = "scale(1)";
      }, 200);
    });
  });

  // Dynamic tech stack rotation (every 8s)
  const techStacks = [
    { icon: "⚛️", text: "React" },
    { icon: "⚡", text: "Node.js" },
    { icon: "🎮", text: "Unreal" },
    { icon: "📱", text: "Mobile" },
    { icon: "🌐", text: "Web" },
    { icon: "🎯", text: "MERN" },
    { icon: "🐍", text: "Python" },
    { icon: "🔧", text: "API" },
    { icon: "💾", text: "MongoDB" },
    { icon: "🚀", text: "Deploy" },
  ];
  let currentTechIndex = 0;
  setInterval(() => {
    const faces = document.querySelectorAll(".cube-face");
    if (faces.length > 0) {
      const randomFace = faces[Math.floor(Math.random() * faces.length)];
      const icon = randomFace.querySelector(".tech-icon");
      const text = randomFace.querySelector("span");
      if (icon && text) {
        randomFace.style.opacity = "0.5";
        setTimeout(() => {
          const newTech = techStacks[currentTechIndex % techStacks.length];
          icon.textContent = newTech.icon;
          text.textContent = newTech.text;
          currentTechIndex++;
          randomFace.style.opacity = "1";
        }, 300);
      }
    }
  }, 8000);

  // Keyboard accessibility for cube (Space for glitch effect)
  document.addEventListener("keydown", (e) => {
    if (e.code === "Space" && cube) {
      e.preventDefault();
      cube.style.animation = "none";
      cube.style.transform = "rotateX(720deg) rotateY(720deg) scale(1.2)";
      setTimeout(() => {
        cube.style.animation = "floatRotate 20s infinite linear";
        cube.style.transform = "";
      }, 1000);
    }
  });

  // Touch support for mobile
  if (cubeContainer && "ontouchstart" in window) {
    let touchStartX, touchStartY;
    cubeContainer.addEventListener("touchstart", (e) => {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches.clientY;
    });
    cubeContainer.addEventListener("touchmove", (e) => {
      e.preventDefault();
      const touchX = e.touches.clientX;
      const touchY = e.touches.clientY;
      const deltaX = (touchX - touchStartX) * 0.5;
      const deltaY = (touchY - touchStartY) * 0.5;
      if (cube) {
        cube.style.transform = `rotateX(${deltaY}deg) rotateY(${deltaX}deg) scale(1.1)`;
      }
    });
    cubeContainer.addEventListener("touchend", () => {
      if (cube) cube.style.transform = "";
    });
  }
});

/* ================ SCROLL ANIMATIONS ================ */
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll(
    ".about-intro, .about-description, .about-visual, .skills-category, .education-card, .contact-info, .contact-form, .project-card"
  );
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0) translateX(0) scale(1)";
          entry.target.style.transition =
            "all 0.8s cubic-bezier(.68,-.55,.265,1.55)";
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
  );
  animatedElements.forEach((el) => observer.observe(el));
}

/* ================ SKILLS BAR ANIMATION ================ */
function initSkillsAnimation() {
  const skillsSection = document.querySelector("#skills");
  const skillBars = document.querySelectorAll(".skill-progress");
  if (!skillsSection || skillBars.length === 0) return;
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          skillBars.forEach((bar, index) => {
            const width = bar.getAttribute("data-width");
            if (width) {
              setTimeout(() => {
                bar.style.width = width + "%";
              }, index * 100);
            }
          });
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -20px 0px" }
  );
  observer.observe(skillsSection);
}

/* ============ CONTACT FORM VALIDATION & MAILTO ============ */
function initContactForm() {
  const form = document.querySelector(".form");
  const submitBtn = document.querySelector(".submit-btn");
  if (!form || !submitBtn) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = "<span>Preparing Email...</span>";
    submitBtn.disabled = true;
    // Gather form values
    const name = form.querySelector("[name='name']").value.trim();
    const email = form.querySelector("[name='email']").value.trim();
    const message = form.querySelector("[name='message']").value.trim();
    const subject = encodeURIComponent(`Message from ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\n${message}`
    );
    const mailtoLink = `mailto:amritanand8882@gmail.com?subject=${subject}&body=${body}`;
    window.location.href = mailtoLink;
    setTimeout(() => {
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
      form.reset();
    }, 2000);
  });

  // Form validation
  const inputs = form.querySelectorAll("input, textarea");
  inputs.forEach((input) => {
    input.addEventListener("blur", validateInput);
    input.addEventListener("input", clearValidation);
  });

  function validateInput(e) {
    const input = e.target;
    const value = input.value.trim();
    input.classList.remove("error");
    if (input.hasAttribute("required") && !value) {
      showInputError(input, "This field is required");
      return false;
    }
    if (input.type === "email" && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        showInputError(input, "Please enter a valid email address");
        return false;
      }
    }
    return true;
  }
  function showInputError(input, message) {
    input.classList.add("error");
    input.style.borderColor = "#ef4444";
    const existingError = input.parentNode.querySelector(".error-message");
    if (existingError) existingError.remove();
    const errorDiv = document.createElement("div");
    errorDiv.className = "error-message";
    errorDiv.style.color = "#ef4444";
    errorDiv.style.fontSize = "0.75rem";
    errorDiv.style.marginTop = "4px";
    errorDiv.textContent = message;
    input.parentNode.appendChild(errorDiv);
  }
  function clearValidation(e) {
    const input = e.target;
    input.classList.remove("error");
    input.style.borderColor = "";
    const errorMessage = input.parentNode.querySelector(".error-message");
    if (errorMessage) errorMessage.remove();
  }
}

/* ================ SMOOTH SCROLLING FOR NAV LINKS ================ */
function initSmoothScrolling() {
  const navLinks = document.querySelectorAll('a[href^="#"]');
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      const targetId = link.getAttribute("href");
      const targetSection = document.querySelector(targetId);
      if (targetSection) {
        e.preventDefault();
        const navbarHeight = document.querySelector(".navbar").offsetHeight;
        const targetPosition = targetSection.offsetTop - navbarHeight;
        window.scrollTo({ top: targetPosition, behavior: "smooth" });
      }
    });
  });
}

/* ================ HERO & TECH SECTION PARALLAX ================ */
function initParallaxEffects() {
  const heroOrbs = document.querySelectorAll(".gradient-orb");
  const techOrbit = document.querySelector(".tech-orbit");
  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset;
    // Parallax for hero orbs
    heroOrbs.forEach((orb, index) => {
      const speed = 0.5 + index * 0.2;
      orb.style.transform = `translateY(${scrolled * speed}px)`;
    });
    // Rotate tech orbit if present
    if (techOrbit) {
      techOrbit.style.transform = `rotate(${scrolled * 0.1}deg)`;
    }
  });
}

/* ================ PERFORMANCE & ACCESSIBILITY ================ */
// Debounce utility
function debounce(func, wait, immediate) {
  let timeout;
  return function (...args) {
    const later = () => {
      timeout = null;
      if (!immediate) func(...args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func(...args);
  };
}

// Throttle utility
function throttle(func, limit) {
  let inThrottle;
  return function () {
    if (!inThrottle) {
      func.apply(this, arguments);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// Optimize scroll events
const optimizedScroll = throttle(() => {}, 16); // placeholder, for future use
window.addEventListener("scroll", optimizedScroll);

// Responsive cursor: hide on mobile, show on desktop
window.addEventListener(
  "resize",
  debounce(() => {
    const cursor = document.querySelector(".cursor");
    const cursorFollower = document.querySelector(".cursor-follower");
    if (window.innerWidth <= 768) {
      if (cursor) cursor.style.display = "none";
      if (cursorFollower) cursorFollower.style.display = "none";
    } else {
      if (cursor) cursor.style.display = "block";
      if (cursorFollower) cursorFollower.style.display = "block";
    }
  }, 250)
);

// Error handling
window.addEventListener("error", (e) => {
  console.warn("Portfolio JS Error:", e.message);
});

// Accessibility: close mobile menu with Esc
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav-menu");
    if (hamburger && navMenu && navMenu.classList.contains("active")) {
      hamburger.classList.remove("active");
      navMenu.classList.remove("active");
      document.body.style.overflow = "visible";
    }
  }
});

// Respect reduced motion
const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
);
if (prefersReducedMotion.matches) {
  document.documentElement.style.setProperty("--transition-fast", "0.01ms");
  document.documentElement.style.setProperty("--transition-base", "0.01ms");
  document.documentElement.style.setProperty("--transition-slow", "0.01ms");
}
