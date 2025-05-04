// Custom cursor
const cursor = document.querySelector(".cursor");
const cursorFollower = document.querySelector(".cursor-follower");
const links = document.querySelectorAll(
  "a, button, .btn, .project-card, .skill-item"
);

document.addEventListener("mousemove", (e) => {
  cursor.style.left = e.clientX + "px";
  cursor.style.top = e.clientY + "px";

  setTimeout(() => {
    cursorFollower.style.left = e.clientX + "px";
    cursorFollower.style.top = e.clientY + "px";
  }, 100);
});

links.forEach((link) => {
  link.addEventListener("mouseenter", () => {
    cursor.classList.add("expand");
    cursorFollower.classList.add("expand");
  });

  link.addEventListener("mouseleave", () => {
    cursor.classList.remove("expand");
    cursorFollower.classList.remove("expand");
  });
});

// Header scroll effect
const header = document.querySelector("header");
const backToTop = document.querySelector(".back-to-top");

window.addEventListener("scroll", () => {
  if (window.scrollY > 100) {
    header.classList.add("header-scrolled");
    if (backToTop) backToTop.classList.add("active");
  } else {
    header.classList.remove("header-scrolled");
    if (backToTop) backToTop.classList.remove("active");
  }
});

// Mobile menu toggle
const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector("nav");

if (menuToggle) {
  menuToggle.addEventListener("click", () => {
    menuToggle.classList.toggle("active");
    nav.classList.toggle("active");
  });
}

// Active nav link
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;

    if (window.scrollY >= sectionTop - 200) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href").substring(1) === current) {
      link.classList.add("active");
    }
  });
});

// Form submission
const contactForm = document.getElementById("contactForm");

if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Get form values
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const subject = document.getElementById("subject").value;
    const message = document.getElementById("message").value;

    // Here you would normally send the data to a server
    console.log("Form submitted:", { name, email, subject, message });

    // Show success message
    alert("Thank you for your message. I will get back to you soon!");

    // Reset form
    contactForm.reset();
  });
}

// Three.js background
const initThreeBackground = () => {
  const container = document.getElementById("canvas-container");
  if (!container) return;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  container.appendChild(renderer.domElement);

  // Create particles
  const particlesGeometry = new THREE.BufferGeometry();
  const particlesCount = 2000;

  const posArray = new Float32Array(particlesCount * 3);

  for (let i = 0; i < particlesCount * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 10;
  }

  particlesGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(posArray, 3)
  );

  const particlesMaterial = new THREE.PointsMaterial({
    size: 0.02,
    color: 0x6c63ff,
    transparent: true,
    opacity: 0.8,
  });

  const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
  scene.add(particlesMesh);

  camera.position.z = 3;

  // Mouse movement effect
  document.addEventListener("mousemove", animateParticles);

  let mouseX = 0;
  let mouseY = 0;

  function animateParticles(event) {
    mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
  }

  // Animation loop
  const clock = new THREE.Clock();

  const animate = () => {
    requestAnimationFrame(animate);

    const elapsedTime = clock.getElapsedTime();

    // Rotate particles
    particlesMesh.rotation.y = elapsedTime * 0.05;

    // Follow mouse
    particlesMesh.rotation.x += mouseY * 0.001;
    particlesMesh.rotation.y += mouseX * 0.001;

    renderer.render(scene, camera);
  };

  animate();

  // Handle window resize
  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
};

// Intersection Observer for animations
const initObserver = () => {
  const appearOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -100px 0px",
  };

  const appearOnScroll = new IntersectionObserver(function (
    entries,
    appearOnScroll
  ) {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("appear");
      appearOnScroll.unobserve(entry.target);
    });
  },
  appearOptions);

  document
    .querySelectorAll(
      ".skill-category, .project-card, .section-title, .about-content > div"
    )
    .forEach((el) => {
      el.classList.add("fade-in");
      appearOnScroll.observe(el);
    });
};

// Scroll reveal animation
const initScrollReveal = () => {
  const revealElements = document.querySelectorAll(".reveal-text");

  revealElements.forEach((element, index) => {
    const text = element.textContent;
    element.textContent = "";

    for (let i = 0; i < text.length; i++) {
      const span = document.createElement("span");
      span.textContent = text[i];
      span.style.animationDelay = `${i * 0.05 + index * 0.3}s`;
      span.classList.add("reveal-letter");
      element.appendChild(span);
    }
  });
};

// Initialize everything
document.addEventListener("DOMContentLoaded", () => {
  initThreeBackground();
  initObserver();
  initScrollReveal();

  // Add back to top button if not already in HTML
  if (!document.querySelector(".back-to-top")) {
    const backToTopButton = document.createElement("div");
    backToTopButton.classList.add("back-to-top");
    backToTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
    document.body.appendChild(backToTopButton);

    backToTopButton.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // Add fade-in class to elements for animation
  document
    .querySelectorAll(
      ".section-title, .skill-category, .project-card, .about-content > div"
    )
    .forEach((el) => {
      el.classList.add("fade-in");
    });

  // Add missing CSS animations
  const style = document.createElement("style");
  style.innerHTML = `
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(50px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .fade-in {
            opacity: 0;
            transform: translateY(50px);
            transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }
        
        .fade-in.appear {
            opacity: 1;
            transform: translateY(0);
        }
        
        .reveal-letter {
            display: inline-block;
            opacity: 0;
            animation: revealLetter 0.5s forwards;
        }
        
        @keyframes revealLetter {
            from {
                opacity: 0;
                transform: translateY(50%);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        /* Mobile nav styles */
        @media (max-width: 768px) {
            .menu-toggle {
                display: block;
            }
            
            nav {
                position: fixed;
                top: 80px;
                right: -100%;
                width: 80%;
                height: calc(100vh - 80px);
                background: rgba(255, 255, 255, 0.95);
                backdrop-filter: blur(10px);
                transition: 0.5s;
                padding: 40px;
                z-index: 999;
            }
            
            nav.active {
                right: 0;
            }
            
            nav ul {
                flex-direction: column;
                align-items: flex-start;
            }
            
            nav ul li {
                margin: 15px 0;
            }
            
            .menu-toggle.active .bar:nth-child(1) {
                transform: translateY(8px) rotate(45deg);
            }
            
            .menu-toggle.active .bar:nth-child(2) {
                opacity: 0;
            }
            
            .menu-toggle.active .bar:nth-child(3) {
                transform: translateY(-8px) rotate(-45deg);
            }
            
            .about-content, .contact-content {
                grid-template-columns: 1fr;
            }
            
            .hero h1 {
                font-size: 4.5rem;
            }
            
            .section {
                padding: 8rem 0;
            }
        }
    `;
  document.head.appendChild(style);
});