// ==========================================
// 1. MOBILE NAVIGATION
// ==========================================

const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

menuToggle?.addEventListener("click", () => {

  const open = navLinks.classList.toggle("open");

  menuToggle.setAttribute("aria-expanded", String(open));

  menuToggle.setAttribute(
    "aria-label",
    open ? "Close menu" : "Open menu"
  );

  menuToggle.textContent = open ? "×" : "☰";

});

navLinks?.querySelectorAll("a").forEach(link => {

  link.addEventListener("click", () => {

    navLinks.classList.remove("open");

    menuToggle?.setAttribute("aria-expanded", "false");

    if (menuToggle) {
      menuToggle.textContent = "☰";
      menuToggle.setAttribute("aria-label", "Open menu");
    }

  });

});


// ==========================================
// 2. PROJECT FILTERS
// ==========================================

const filterButtons = document.querySelectorAll(".filter-btn");
const projectRows = document.querySelectorAll(".project-row");

filterButtons.forEach(button => {

  button.addEventListener("click", () => {

    filterButtons.forEach(item => {
      item.classList.toggle("is-active", item === button);
    });

    const filter = button.dataset.filter;

    projectRows.forEach(row => {

      const category = row.dataset.category;

      row.hidden = (
        filter !== "all" && category !== filter
      );

    });

  });

});


// ==========================================
// 3. PROJECT DETAILS MODAL
// ==========================================

const projectModal = document.getElementById("project-modal");

const modalTitle = document.getElementById("modal-title");

const modalDescription = document.getElementById(
  "modal-description"
);

document.querySelectorAll(".details-trigger").forEach(button => {

  button.addEventListener("click", () => {

    modalTitle.textContent =
      button.dataset.title || "Project details";

    modalDescription.textContent =
      button.dataset.description || "";

    projectModal?.showModal();

  });

});


// CLOSE PROJECT MODAL

document.querySelector(".modal-close")?.addEventListener(
  "click",
  () => {
    projectModal?.close();
  }
);

projectModal?.addEventListener("click", event => {

  if (event.target === projectModal) {
    projectModal.close();
  }

});


// ==========================================
// 4. PROFILE IMAGE LIGHTBOX
// ==========================================

const profileImage = document.getElementById("profile-image");

const imageLightbox = document.getElementById("image-lightbox");

const imageClose = document.querySelector(".image-close");


// OPEN IMAGE

function openProfileImage() {

  if (imageLightbox && !imageLightbox.open) {
    imageLightbox.showModal();
  }

}


// CLOSE IMAGE

function closeProfileImage() {

  if (imageLightbox?.open) {
    imageLightbox.close();
  }

}


// CLICK IMAGE

profileImage?.addEventListener("click", openProfileImage);


// KEYBOARD SUPPORT

profileImage?.addEventListener("keydown", event => {

  if (event.key === "Enter" || event.key === " ") {

    event.preventDefault();

    openProfileImage();

  }

});


// CLOSE BUTTON

imageClose?.addEventListener("click", closeProfileImage);


// CLICK OUTSIDE IMAGE

imageLightbox?.addEventListener("click", event => {

  if (event.target === imageLightbox) {
    closeProfileImage();
  }

});


// ==========================================
// 5. PARTICLE BACKGROUND
// ==========================================

const canvas = document.getElementById("particle-canvas");

const ctx = canvas?.getContext("2d");

if (canvas && ctx) {

  let particles = [];

  let width = window.innerWidth;

  let height = window.innerHeight;

  let animationId;

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  const particleColor = "#c7f36b";

  // CREATE PARTICLES

  function createParticles() {

    const count = Math.min(
      100,
      Math.floor((width * height) / 11000)
    );

    particles = [];

    for (let i = 0; i < count; i++) {

      particles.push({

        x: Math.random() * width,

        y: Math.random() * height,

        vx: (Math.random() - 0.5) * 0.45,

        vy: (Math.random() - 0.5) * 0.45,

        radius: Math.random() * 1.5 + 0.5

      });

    }

  }


  // RESIZE CANVAS

  function resizeCanvas() {

    const dpr = Math.min(
      window.devicePixelRatio || 1,
      2
    );

    width = window.innerWidth;

    height = window.innerHeight;

    canvas.width = width * dpr;

    canvas.height = height * dpr;

    canvas.style.width = `${width}px`;

    canvas.style.height = `${height}px`;

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    createParticles();

    if (reducedMotion) {
      drawParticles(false);
    }

  }


  // DRAW PARTICLES

  function drawParticles(move = true) {

    ctx.clearRect(0, 0, width, height);


    // PARTICLE MOVEMENT

    particles.forEach(particle => {

      if (move) {

        particle.x += particle.vx;

        particle.y += particle.vy;

      }


      // SCREEN BOUNDARIES

      if (particle.x < 0) {
        particle.x = 0;
        particle.vx *= -1;
      }

      if (particle.x > width) {
        particle.x = width;
        particle.vx *= -1;
      }

      if (particle.y < 0) {
        particle.y = 0;
        particle.vy *= -1;
      }

      if (particle.y > height) {
        particle.y = height;
        particle.vy *= -1;
      }


      // DRAW DOT

      ctx.beginPath();

      ctx.arc(
        particle.x,
        particle.y,
        particle.radius,
        0,
        Math.PI * 2
      );

      ctx.fillStyle = particleColor;

      ctx.fill();

    });


    // CONNECT NEARBY PARTICLES

    for (let i = 0; i < particles.length; i++) {

      for (let j = i + 1; j < particles.length; j++) {

        const a = particles[i];

        const b = particles[j];

        const dx = a.x - b.x;

        const dy = a.y - b.y;

        const distance = Math.sqrt(
          dx * dx + dy * dy
        );

        if (distance < 125) {

          ctx.beginPath();

          ctx.moveTo(a.x, a.y);

          ctx.lineTo(b.x, b.y);

          const opacity =
            0.16 * (1 - distance / 125);

          ctx.strokeStyle =
            `rgba(199, 243, 107, ${opacity})`;

          ctx.lineWidth = 0.7;

          ctx.stroke();

        }

      }

    }

  }


  // ANIMATION LOOP

  function animateParticles() {

    drawParticles(true);

    if (!reducedMotion) {

      animationId = requestAnimationFrame(
        animateParticles
      );

    }

  }


  // INITIALIZE

  resizeCanvas();

  if (!reducedMotion) {

    animateParticles();

  }


  // RESIZE EVENT

  window.addEventListener("resize", () => {

    cancelAnimationFrame(animationId);

    resizeCanvas();

    if (!reducedMotion) {
      animateParticles();
    }

  });

}


// ==========================================
// 6. SCROLL REVEAL ANIMATIONS
// ==========================================

const revealElements = document.querySelectorAll(
  ".section, .project-row, .tool-group, .intro-strip"
);

if (
  "IntersectionObserver" in window &&
  !window.matchMedia("(prefers-reduced-motion: reduce)").matches
) {

  const observer = new IntersectionObserver(

    entries => {

      entries.forEach(entry => {

        if (entry.isIntersecting) {

          entry.target.classList.add("visible");

          observer.unobserve(entry.target);

        }

      });

    },

    {
      threshold: 0.12
    }

  );


  revealElements.forEach(element => {

    element.classList.add("reveal");

    observer.observe(element);

  });

}


// ==========================================
// 7. CURRENT YEAR
// ==========================================

const currentYear = new Date().getFullYear();

document.querySelectorAll(".footer > span").forEach(element => {

  element.textContent =
    `Designed & built by Abhijith U. · ${currentYear}`;

});