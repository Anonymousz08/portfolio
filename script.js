document.addEventListener("DOMContentLoaded", function () {
  // Initialize all components
  initLoader();
  initCursor();
  initNavigation();
  initScrollAnimations();
  //   initHeroAnimations();
  initSkillsAnimation();
  initContactForm();
  initSmoothScrolling();
  initParallaxEffects();
});

// ====================================
// LOADING SCREEN
// ====================================
function initLoader() {
  const loadingScreen = document.querySelector(".loading-screen");
  const letters = document.querySelectorAll(".letter");
  const progressBar = document.querySelector(".progress-bar");

  if (!loadingScreen || !letters.length || !progressBar) return;

  // Animate letters
  letters.forEach((letter, index) => {
    setTimeout(() => {
      letter.style.opacity = "1";
      letter.style.transform = "translateY(0)";
      letter.style.transition =
        "all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)";
    }, index * 100);
  });

  // Animate progress bar
  let progress = 0;
  const progressInterval = setInterval(() => {
    progress += Math.random() * 15;
    if (progress > 100) {
      progress = 100;
      clearInterval(progressInterval);

      // Hide loading screen
      setTimeout(() => {
        loadingScreen.classList.add("hidden");
        document.body.style.overflow = "visible";

        // Start hero animations
        setTimeout(() => {
          startHeroAnimations();
        }, 300);

        // Remove loading screen after transition
        setTimeout(() => {
          if (loadingScreen.parentNode) {
            loadingScreen.parentNode.removeChild(loadingScreen);
          }
        }, 1000);
      }, 500);
    }
    progressBar.style.width = progress + "%";
  }, 100);

  // Fallback: Hide loading screen after 4 seconds
  setTimeout(() => {
    if (!loadingScreen.classList.contains("hidden")) {
      loadingScreen.classList.add("hidden");
      document.body.style.overflow = "visible";
      startHeroAnimations();
    }
  }, 4000);
}

// ====================================
// CUSTOM CURSOR - SMOOTH MOVEMENT
// ====================================
function initCursor() {
  const cursor = document.querySelector(".cursor");
  const cursorFollower = document.querySelector(".cursor-follower");

  if (!cursor || !cursorFollower) return;

  // Only show cursor on desktop
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

  // Update mouse position (no direct cursor update here)
  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  // Get cursor dimensions for centering
  const cursorRect = cursor.getBoundingClientRect();
  const followerRect = cursorFollower.getBoundingClientRect();

  const cursorHalfWidth = cursorRect.width / 2;
  const cursorHalfHeight = cursorRect.height / 2;
  const followerHalfWidth = followerRect.width / 2;
  const followerHalfHeight = followerRect.height / 2;

  // Smooth animation for both cursors
  function animateCursors() {
    // Main cursor - faster interpolation for responsiveness
    cursorX += (mouseX - cursorX) * 0.2;
    cursorY += (mouseY - cursorY) * 0.2;

    // Follower cursor - slower interpolation for trailing effect
    followerX += (mouseX - followerX) * 0.1;
    followerY += (mouseY - followerY) * 0.1;

    // Update positions (centered on mouse position)
    cursor.style.left = cursorX - cursorHalfWidth + "px";
    cursor.style.top = cursorY - cursorHalfHeight + "px";

    cursorFollower.style.left = followerX - followerHalfWidth + "px";
    cursorFollower.style.top = followerY - followerHalfHeight + "px";

    requestAnimationFrame(animateCursors);
  }
  animateCursors();

  // Cursor hover effects
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

// ====================================
// NAVIGATION
// ====================================
function initNavigation() {
  const navbar = document.querySelector(".navbar");
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");
  const navLinks = document.querySelectorAll(".nav-link");

  if (!navbar || !hamburger || !navMenu) return;

  // Mobile menu toggle
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
    document.body.style.overflow = navMenu.classList.contains("active")
      ? "hidden"
      : "visible";
  });

  // Close menu when clicking nav links
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active");
      navMenu.classList.remove("active");
      document.body.style.overflow = "visible";
    });
  });

  // Close menu when clicking outside
  document.addEventListener("click", (e) => {
    if (!navbar.contains(e.target) && navMenu.classList.contains("active")) {
      hamburger.classList.remove("active");
      navMenu.classList.remove("active");
      document.body.style.overflow = "visible";
    }
  });

  // Navbar scroll effect
  let lastScrollY = window.scrollY;

  window.addEventListener("scroll", () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > 100) {
      navbar.style.background = "rgba(10, 10, 15, 0.95)";
      navbar.style.backdropFilter = "blur(20px)";
    } else {
      navbar.style.background = "rgba(10, 10, 15, 0.8)";
      navbar.style.backdropFilter = "blur(20px)";
    }

    // Hide navbar on scroll down, show on scroll up
    if (currentScrollY > lastScrollY && currentScrollY > 100) {
      navbar.style.transform = "translateY(-100%)";
    } else {
      navbar.style.transform = "translateY(0)";
    }

    lastScrollY = currentScrollY;
  });

  // Active section highlighting
  const sections = document.querySelectorAll("section[id]");

  function highlightNavigation() {
    let current = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;

      if (scrollY >= sectionTop - 200) {
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

// ====================================
// HERO ANIMATIONS
// ====================================
function startHeroAnimations() {
  const titleLines = document.querySelectorAll(".title-line");
  const heroSubtitle = document.querySelector(".hero-subtitle");
  const heroStats = document.querySelector(".hero-stats");
  const heroCta = document.querySelector(".hero-cta");
  const heroVisual = document.querySelector(".hero-visual");
  const scrollIndicator = document.querySelector(".scroll-indicator");

  // Animate title lines
  titleLines.forEach((line, index) => {
    setTimeout(() => {
      line.style.opacity = "1";
      line.style.transform = "translateY(0)";
      line.style.transition = "all 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55)";
    }, index * 200);
  });

  // Animate other elements
  const elements = [
    heroSubtitle,
    heroStats,
    heroCta,
    heroVisual,
    scrollIndicator,
  ];

  elements.forEach((element, index) => {
    if (element) {
      setTimeout(() => {
        element.style.opacity = "1";
        element.style.transform =
          element === heroVisual ? "translateX(0)" : "translateY(0)";
        element.style.transition =
          "all 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55)";
      }, 600 + index * 150);
    }
  });
}
// ====================================
// ABOUT SECTION CUBE ANIMATION
// ====================================
document.addEventListener("DOMContentLoaded", function () {
  // Enhanced Cube Interactions
  const cube = document.querySelector(".floating-cube");
  const cubeContainer = document.querySelector(".floating-cube-container");
  let isHovering = false;
  let mouseX = 0;
  let mouseY = 0;

  // Mouse tracking for 3D effect
  if (cubeContainer) {
    cubeContainer.addEventListener("mousemove", (e) => {
      if (!isHovering) return;

      const rect = cubeContainer.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      mouseX = ((e.clientX - centerX) / rect.width) * 100;
      mouseY = ((e.clientY - centerY) / rect.height) * 100;

      if (cube) {
        cube.style.transform = `
                    rotateX(${mouseY * 0.5}deg) 
                    rotateY(${mouseX * 0.5}deg) 
                    scale(1.1)
                `;
      }
    });

    cubeContainer.addEventListener("mouseenter", () => {
      isHovering = true;
      if (cube) {
        cube.style.animationPlayState = "paused";
      }
    });

    cubeContainer.addEventListener("mouseleave", () => {
      isHovering = false;
      if (cube) {
        cube.style.animationPlayState = "running";
        cube.style.transform = "";
      }
    });
  }

  // Interactive particles - follow cursor
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

  // Code snippet interactions
  const codeSnippets = document.querySelectorAll(".code-snippet");
  codeSnippets.forEach((snippet, index) => {
    snippet.addEventListener("mouseenter", () => {
      snippet.style.animationPlayState = "paused";
      snippet.style.zIndex = "10";
    });

    snippet.addEventListener("mouseleave", () => {
      snippet.style.animationPlayState = "running";
      snippet.style.zIndex = "1";
    });

    // Click to cycle through different code snippets
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
        brackets[0].textContent = randomCode[0];
        text.textContent = randomCode[1];
        if (brackets[1] && randomCode[2]) {
          brackets[1].textContent = randomCode[2];
        }
      }

      // Add click effect
      snippet.style.transform = "scale(1.2)";
      setTimeout(() => {
        snippet.style.transform = "scale(1)";
      }, 200);
    });
  });

  // Intersection Observer for animations
  const observerOptions = {
    threshold: 0.2,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate-in");
      }
    });
  }, observerOptions);

  // Observe elements for animation
  const aboutElements = document.querySelectorAll(
    ".about-intro, .about-description, .highlight"
  );
  aboutElements.forEach((el) => observer.observe(el));

  // Dynamic tech stack rotation
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

  // Rotate tech stack every 8 seconds
  let currentTechIndex = 0;
  setInterval(() => {
    const faces = document.querySelectorAll(".cube-face");
    if (faces.length > 0) {
      const randomFace = faces[Math.floor(Math.random() * faces.length)];
      const icon = randomFace.querySelector(".tech-icon");
      const text = randomFace.querySelector("span");

      if (icon && text) {
        // Fade out
        randomFace.style.opacity = "0.5";

        setTimeout(() => {
          // Change content
          const newTech = techStacks[currentTechIndex % techStacks.length];
          icon.textContent = newTech.icon;
          text.textContent = newTech.text;
          currentTechIndex++;

          // Fade in
          randomFace.style.opacity = "1";
        }, 300);
      }
    }
  }, 8000);

  // Performance optimization: Pause animations when not visible
  const aboutSection = document.querySelector(".about");
  if (aboutSection) {
    const visibilityObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const animations = entry.target.querySelectorAll(
            ".floating-cube, .particle, .code-snippet"
          );
          animations.forEach((element) => {
            if (entry.isIntersecting) {
              element.style.animationPlayState = "running";
            } else {
              element.style.animationPlayState = "paused";
            }
          });
        });
      },
      { threshold: 0.1 }
    );

    visibilityObserver.observe(aboutSection);
  }

  // Add keyboard interactions
  document.addEventListener("keydown", (e) => {
    if (e.key === "Space" && cube) {
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
      touchStartY = e.touches[0].clientY;
    });

    cubeContainer.addEventListener("touchmove", (e) => {
      e.preventDefault();
      const touchX = e.touches[0].clientX;
      const touchY = e.touches[0].clientY;

      const deltaX = (touchX - touchStartX) * 0.5;
      const deltaY = (touchY - touchStartY) * 0.5;

      if (cube) {
        cube.style.transform = `rotateX(${deltaY}deg) rotateY(${deltaX}deg) scale(1.1)`;
      }
    });

    cubeContainer.addEventListener("touchend", () => {
      if (cube) {
        cube.style.transform = "";
      }
    });
  }
});

// Utility function to create random glitch effect
function createGlitchEffect() {
  const cube = document.querySelector(".floating-cube");
  if (!cube) return;

  const originalTransform = cube.style.transform;

  // Quick glitch sequence
  const glitchFrames = [
    "rotateX(45deg) rotateY(0deg) translateX(5px)",
    "rotateX(-30deg) rotateY(90deg) translateX(-3px)",
    "rotateX(0deg) rotateY(45deg) translateY(2px)",
    originalTransform,
  ];

  glitchFrames.forEach((frame, index) => {
    setTimeout(() => {
      cube.style.transform = frame;
    }, index * 50);
  });
}

// Call glitch effect randomly
setInterval(() => {
  if (Math.random() < 0.1) {
    // 10% chance every 5 seconds
    createGlitchEffect();
  }
}, 5000);

// ====================================
// SCROLL ANIMATIONS
// ====================================
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll(
    ".about-intro, .about-description, .highlight, .about-visual, .skills-category, .education-card, .contact-info, .contact-form, .project-card"
  );

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0) translateX(0) scale(1)";
          entry.target.style.transition =
            "all 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55)";

          // Special animation for highlights
          if (entry.target.classList.contains("highlight")) {
            const highlights = document.querySelectorAll(".highlight");
            const index = Array.from(highlights).indexOf(entry.target);
            entry.target.style.transitionDelay = `${index * 0.1}s`;
          }
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }
  );

  animatedElements.forEach((el) => {
    observer.observe(el);
  });
}

// ====================================
// SKILLS ANIMATION
// ====================================
function initSkillsAnimation() {
  const skillsSection = document.querySelector("#skills");
  const skillBars = document.querySelectorAll(".skill-progress");

  if (!skillsSection || !skillBars.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          skillBars.forEach((bar, index) => {
            const width = bar.getAttribute("data-width");
            if (width) {
              // Stagger the animations for better effect
              setTimeout(() => {
                bar.style.width = width + "%";
              }, index * 100); // Reduced randomness for consistency
            }
          });

          // Stop observing after animation starts (prevents re-triggering)
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1, // Reduced from 0.5 to 0.1 (10% visibility)
      rootMargin: "0px 0px -20px 0px", // Trigger slightly before element enters viewport
    }
  );

  observer.observe(skillsSection);
}

// Alternative: Individual skill item observation (even more reliable)
function initSkillsAnimationIndividual() {
  const skillItems = document.querySelectorAll(".skill-item");

  if (!skillItems.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const progressBar = entry.target.querySelector(".skill-progress");
          if (progressBar) {
            const width = progressBar.getAttribute("data-width");
            if (width) {
              // Small delay for smooth animation
              setTimeout(() => {
                progressBar.style.width = width + "%";
              }, 200);
            }
          }
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.3, // 30% of individual skill item
      rootMargin: "0px 0px -10px 0px",
    }
  );

  skillItems.forEach((item) => observer.observe(item));
}

// ====================================
// CONTACT FORM
// ====================================
// function initContactForm() {
//   const form = document.querySelector(".form");
//   const submitBtn = document.querySelector(".submit-btn");

//   if (!form || !submitBtn) return;

//   form.addEventListener("submit", async (e) => {
//     e.preventDefault();

//     const originalText = submitBtn.innerHTML;
//     submitBtn.innerHTML = "<span>Sending...</span>";
//     submitBtn.disabled = true;

//     // Simulate form submission (replace with actual form handling)
//     try {
//       await new Promise((resolve) => setTimeout(resolve, 2000));

//       // Success feedback
//       submitBtn.innerHTML = "<span>Message Sent!</span>";
//       submitBtn.style.background =
//         "linear-gradient(135deg, #10b981 0%, #059669 100%)";

//       // Reset form
//       form.reset();

//       setTimeout(() => {
//         submitBtn.innerHTML = originalText;
//         submitBtn.style.background = "";
//         submitBtn.disabled = false;
//       }, 3000);
//     } catch (error) {
//       // Error feedback
//       submitBtn.innerHTML = "<span>Failed to Send</span>";
//       submitBtn.style.background =
//         "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)";

//       setTimeout(() => {
//         submitBtn.innerHTML = originalText;
//         submitBtn.style.background = "";
//         submitBtn.disabled = false;
//       }, 3000);
//     }
//   });

//   // Form validation
//   const inputs = form.querySelectorAll("input, textarea");

//   inputs.forEach((input) => {
//     input.addEventListener("blur", validateInput);
//     input.addEventListener("input", clearValidation);
//   });

//   function validateInput(e) {
//     const input = e.target;
//     const value = input.value.trim();

//     // Remove existing error styling
//     input.classList.remove("error");

//     // Validation rules
//     if (input.hasAttribute("required") && !value) {
//       showInputError(input, "This field is required");
//       return false;
//     }

//     if (input.type === "email" && value) {
//       const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//       if (!emailRegex.test(value)) {
//         showInputError(input, "Please enter a valid email address");
//         return false;
//       }
//     }

//     return true;
//   }

//   function showInputError(input, message) {
//     input.classList.add("error");
//     input.style.borderColor = "#ef4444";

//     // Remove existing error message
//     const existingError = input.parentNode.querySelector(".error-message");
//     if (existingError) {
//       existingError.remove();
//     }

//     // Add error message
//     const errorDiv = document.createElement("div");
//     errorDiv.className = "error-message";
//     errorDiv.style.color = "#ef4444";
//     errorDiv.style.fontSize = "0.75rem";
//     errorDiv.style.marginTop = "4px";
//     errorDiv.textContent = message;

//     input.parentNode.appendChild(errorDiv);
//   }

//   function clearValidation(e) {
//     const input = e.target;
//     input.classList.remove("error");
//     input.style.borderColor = "";

//     const errorMessage = input.parentNode.querySelector(".error-message");
//     if (errorMessage) {
//       errorMessage.remove();
//     }
//   }
// }
function initContactForm() {
  const form = document.querySelector(".form");
  const submitBtn = document.querySelector(".submit-btn");

  if (!form || !submitBtn) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = "<span>Preparing Email...</span>";
    submitBtn.disabled = true;

    // Collect form values
    const name = form.querySelector("input[name='name']").value.trim();
    const email = form.querySelector("input[name='email']").value.trim();
    const message = form.querySelector("textarea[name='message']").value.trim();

    // Create the mailto link
    const subject = encodeURIComponent(`Message from ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\n${message}`
    );
    const mailtoLink = `mailto:amritanand8882@gmail.com?subject=${subject}&body=${body}`;

    // Open default email client
    window.location.href = mailtoLink;

    // Restore button after short delay
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
    if (existingError) {
      existingError.remove();
    }

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
    if (errorMessage) {
      errorMessage.remove();
    }
  }
}

// ====================================
// SMOOTH SCROLLING
// ====================================
function initSmoothScrolling() {
  const navLinks = document.querySelectorAll('a[href^="#"]');

  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();

      const targetId = link.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        const navbarHeight = document.querySelector(".navbar").offsetHeight;
        const targetPosition = targetSection.offsetTop - navbarHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });
}

// ====================================
// PARALLAX EFFECTS
// ====================================
function initParallaxEffects() {
  const heroOrbs = document.querySelectorAll(".gradient-orb");
  const techOrbit = document.querySelector(".tech-orbit");

  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;

    // Parallax for hero orbs
    heroOrbs.forEach((orb, index) => {
      const speed = 0.5 + index * 0.2;
      orb.style.transform = `translateY(${scrolled * speed}px)`;
    });

    // Rotate tech orbit on scroll
    if (techOrbit) {
      techOrbit.style.transform = `rotate(${scrolled * 0.1}deg)`;
    }
  });
}

// ====================================
// UTILITY FUNCTIONS
// ====================================
function debounce(func, wait, immediate) {
  let timeout;
  return function executedFunction(...args) {
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

function throttle(func, limit) {
  let inThrottle;
  return function () {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// ====================================
// PERFORMANCE OPTIMIZATIONS
// ====================================
// Optimize scroll events
const optimizedScroll = throttle(() => {
  // Scroll-based animations here
}, 16); // 60fps

window.addEventListener("scroll", optimizedScroll);

// Lazy load images when implemented
function initLazyLoading() {
  const images = document.querySelectorAll("img[data-src]");

  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove("lazy");
        imageObserver.unobserve(img);
      }
    });
  });

  images.forEach((img) => imageObserver.observe(img));
}

// ====================================
// RESPONSIVE HANDLING
// ====================================
window.addEventListener(
  "resize",
  debounce(() => {
    // Reinitialize cursor for screen size changes
    if (window.innerWidth <= 768) {
      const cursor = document.querySelector(".cursor");
      const cursorFollower = document.querySelector(".cursor-follower");
      if (cursor) cursor.style.display = "none";
      if (cursorFollower) cursorFollower.style.display = "none";
    } else {
      const cursor = document.querySelector(".cursor");
      const cursorFollower = document.querySelector(".cursor-follower");
      if (cursor) cursor.style.display = "block";
      if (cursorFollower) cursorFollower.style.display = "block";
    }
  }, 250)
);

// ====================================
// ERROR HANDLING
// ====================================
window.addEventListener("error", (e) => {
  console.warn("Portfolio JS Error:", e.message);
  // Graceful degradation - ensure site still works
});

// ====================================
// ACCESSIBILITY IMPROVEMENTS
// ====================================
document.addEventListener("keydown", (e) => {
  // Close mobile menu with Escape key
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

// Respect user's motion preferences
const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
);

if (prefersReducedMotion.matches) {
  document.documentElement.style.setProperty("--transition-fast", "0.01ms");
  document.documentElement.style.setProperty("--transition-base", "0.01ms");
  document.documentElement.style.setProperty("--transition-slow", "0.01ms");
}
