/**
 * ALZENTO - Scripts de Conversión, Micro-interacciones y UI Moderna
 */

const CONFIG = {
  waNumber: "573023137141",
  waDefaultMessage: "Hola, vi tu página web y quisiera información para conseguir clientes en Google para mi negocio.",
};

const MARQUEE_ITEMS = [
  "Clientes desde Google", "WhatsApp en un clic", "Diseño que convierte",
  "SEO desde el primer día", "Sin formularios inútiles", "Negocios locales",
  "Carga en menos de 1s", "Dominio & Hosting incluido"
];

const PROYECTOS = [
  {
    sector: "Cerrajería",
    name: "Cerrajería Segura",
    desc: "Diseñada para búsquedas de urgencia extrema. El cliente llega con la puerta cerrada y escribe en segundos.",
    bg: "linear-gradient(135deg, #182234, #0f172a)",
    tags: ["SEO Local", "Urgencias 24h", "WhatsApp directo"]
  },
  {
    sector: "Barbería",
    name: "Barbería Kings Club",
    desc: "Catálogo de cortes y reservas directas a WhatsApp sin tener que contestar llamadas.",
    bg: "linear-gradient(135deg, #2b1810, #140d0a)",
    tags: ["Reservas WhatsApp", "Google Maps", "Móvil First"]
  },
  {
    sector: "Electricidad",
    name: "Electricista Express",
    desc: "Posicionada para emergencias locales. Recibe contactos semanales sin pagar pauta.",
    bg: "linear-gradient(135deg, #102619, #0a1810)",
    tags: ["Tráfico Orgánico", "Carga Rápida", "Contacto Inmediato"]
  }
];

document.addEventListener("DOMContentLoaded", () => {
  // 1. Año dinámico
  const yearEl = document.getElementById("year-placeholder");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // 2. WhatsApp links inteligentes con pre-redacción contextual
  updateWhatsAppLinks();

  // 3. Marquee
  initMarquee();

  // 4. Proyectos
  renderProyectos();

  // 5. Interacción de Tipografía en Hero (Proximidad Cursor Letra por Letra)
  initHeroTypographyInteractive();

  // 5.1 Consola Interactiva del Hero (Showcase de Sectores Dual)
  initHeroStageSectors();

  // 6. Spotlight Cursor en Cards
  initSpotlightCards();

  // 7. Botones Magnéticos
  initMagneticButtons();

  // 8. Acordeón de FAQ (Cajitas independientes)
  initFaqAccordion();

  // 9. Floating WhatsApp Popup Proactivo
  initFloatingWaPopup();

  // 10. Intersection Observer
  initScrollAnimations();

  // 11. Navbar Scroll
  initNavbarScroll();

  // 12. Parallax en Silueta
  initSiluetaParallax();

  // 13. Rayo Láser Energético en Cómo Funciona (Efecto Scroll)
  initSolucionLaserScroll();

  // 14. Barra de Progreso de Lectura
  initScrollProgressBar();
});

// ─── 1. WHATSAPP LINKS INTELIGENTES (CRO CONTEXTUAL) ───
function updateWhatsAppLinks() {
  document.querySelectorAll(".wa-link").forEach(link => {
    const customMsg = link.getAttribute("data-wa-msg");
    const msg = customMsg || CONFIG.waDefaultMessage;
    link.href = `https://wa.me/${CONFIG.waNumber}?text=${encodeURIComponent(msg)}`;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
  });
}

// ─── 2. MARQUEE ───
function initMarquee() {
  const marqueeTrack = document.getElementById("dynamic-marquee");
  if (marqueeTrack) {
    const renderItems = () => MARQUEE_ITEMS.map(i => `<span class="marquee-item">${i}</span>`).join("");
    marqueeTrack.innerHTML = renderItems() + renderItems();
  }
}

// ─── 3. PROYECTOS ───
function renderProyectos() {
  const prjContainer = document.getElementById("proyectos-container");
  if (!prjContainer) return;

  prjContainer.innerHTML = PROYECTOS.map((p, i) => `
    <div class="proyecto-card glass-panel spotlight-card reveal reveal-delay-${i}">
      <div class="proyecto-thumb-rich" style="background: ${p.bg}">
        <div class="mini-browser">
          <div class="mb-bar">
            <div class="dot r"></div><div class="dot y"></div><div class="dot g"></div>
          </div>
          <div class="mb-content">
            <span class="mb-badge-google">📍 Posicionado en Google</span>
            <div class="mb-hero-text">${p.name.toUpperCase()}</div>
            <div class="mb-cta-mock">💬 WhatsApp Directo</div>
          </div>
        </div>
      </div>
      <div class="proyecto-info">
        <div class="proyecto-sector">${p.sector}</div>
        <div class="proyecto-name">${p.name}</div>
        <p class="proyecto-desc">${p.desc}</p>
        <div class="proyecto-tags">
          ${p.tags.map(t => `<span class="tag">${t}</span>`).join('')}
        </div>
      </div>
    </div>
  `).join("");
}

// ─── 4. TIPOGRAFÍA INTERACTIVA DEL HERO ───
function initHeroTypographyInteractive() {
  const title = document.getElementById("hero-main-title");
  if (!title) return;

  function wrapCharacters(node) {
    const children = Array.from(node.childNodes);
    children.forEach(child => {
      if (child.nodeType === Node.TEXT_NODE) {
        const text = child.textContent;
        // Separar por palabras para que NUNCA se rompan palabras por la mitad
        const words = text.split(" ");
        const fragment = document.createDocumentFragment();

        words.forEach((word, wIdx) => {
          if (word.length > 0) {
            const wordSpan = document.createElement("span");
            wordSpan.className = "word";
            for (let i = 0; i < word.length; i++) {
              const charSpan = document.createElement("span");
              charSpan.className = "char";
              charSpan.textContent = word[i];
              wordSpan.appendChild(charSpan);
            }
            fragment.appendChild(wordSpan);
          }
          if (wIdx < words.length - 1) {
            fragment.appendChild(document.createTextNode(" "));
          }
        });
        child.replaceWith(fragment);
      } else if (child.nodeType === Node.ELEMENT_NODE) {
        wrapCharacters(child);
      }
    });
  }

  wrapCharacters(title);

  const chars = Array.from(title.querySelectorAll(".char"));
  if (chars.length === 0) return;

  let rectsCache = [];
  function updateRects() {
    rectsCache = chars.map(span => {
      const r = span.getBoundingClientRect();
      return {
        span,
        isEm: span.closest("em") !== null,
        cx: r.left + r.width / 2,
        cy: r.top + r.height / 2
      };
    });
  }

  updateRects();
  window.addEventListener("resize", updateRects, { passive: true });
  window.addEventListener("scroll", updateRects, { passive: true });

  const radius = 135;
  let mouseX = -9999;
  let mouseY = -9999;
  let isHovering = false;
  let animationFrameId = null;

  function onMouseMove(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
    if (!isHovering) {
      isHovering = true;
      scheduleRender();
    }
  }

  function onMouseLeave() {
    isHovering = false;
    mouseX = -9999;
    mouseY = -9999;
    scheduleRender();
  }

  function scheduleRender() {
    if (animationFrameId) return;
    animationFrameId = requestAnimationFrame(renderProximity);
  }

  function renderProximity() {
    animationFrameId = null;

    rectsCache.forEach(item => {
      const dx = mouseX - item.cx;
      const dy = mouseY - item.cy;
      const dist = Math.hypot(dx, dy);

      if (dist < radius) {
        const rawT = 1 - (dist / radius);
        const t = rawT * rawT;

        if (item.isEm) {
          item.span.style.color = `rgba(34, 197, 94, ${0.45 + 0.55 * t})`;
          item.span.style.webkitTextStroke = `1.2px #4ade80`;
          item.span.style.textShadow = `0 0 ${(20 * t).toFixed(1)}px rgba(74, 222, 128, ${(0.85 * t).toFixed(2)})`;
          item.span.style.transform = `translateY(${(-3 * t).toFixed(1)}px) scale(${(1 + 0.08 * t).toFixed(2)})`;
        } else {
          item.span.style.color = t > 0.35 ? "#4ade80" : "#ffffff";
          item.span.style.textShadow = `0 0 ${(16 * t).toFixed(1)}px rgba(34, 197, 94, ${(0.95 * t).toFixed(2)})`;
          item.span.style.transform = `translateY(${(-3.5 * t).toFixed(1)}px) scale(${(1 + 0.08 * t).toFixed(2)})`;
        }
      } else {
        item.span.style.color = "";
        item.span.style.webkitTextStroke = "";
        item.span.style.textShadow = "";
        item.span.style.transform = "";
      }
    });

    if (isHovering) {
      scheduleRender();
    }
  }

  const heroSection = document.getElementById("hero");
  if (heroSection) {
    heroSection.addEventListener("mousemove", onMouseMove, { passive: true });
    heroSection.addEventListener("mouseleave", onMouseLeave, { passive: true });
  }
}

// ─── 4.1 CONSOLA INTERACTIVA DEL HERO (SHOWCASE DE SECTORES DUAL) ───
const HERO_SECTORS = {
  cerrajero: {
    query: "cerrajero urgente cerca de mi",
    name: "Cerrajería Segura Bogotá",
    rating: "5.0 (84 opiniones)",
    desc: "Servicio a domicilio en 20 min. Apertura de puertas y cambio de guardas garantizado.",
    avatar: "C",
    clientMsg: "Hola, los vi en los primeros de Google. Se me trabó la cerradura, ¿pueden venir ahora?",
    bizMsg: "¡Hola! Claro que sí, tenemos un técnico a 15 minutos en tu sector. ¿Cuál es tu dirección?"
  },
  barberia: {
    query: "mejor barbería cerca de mi",
    name: "Barbería Kings Club Medellín",
    rating: "4.9 (112 opiniones)",
    desc: "Cortes de autor, perfilado de barba y toalla caliente. Agenda tu cita directa en segundos.",
    avatar: "B",
    clientMsg: "Hola, vi su barbería en Google, ¿tienen espacio para corte y barba hoy a las 4 PM?",
    bizMsg: "¡Hola! Sí, tenemos turno disponible con Carlos a las 4:00 PM. ¿Te agendamos?"
  },
  odontologo: {
    query: "urgencias odontológicas 24h",
    name: "Clínica Dental Sonrisas Cali",
    rating: "5.0 (64 opiniones)",
    desc: "Atención prioritaria para dolor agudo o emergencias. Odontólogos certificados.",
    avatar: "D",
    clientMsg: "Buenas tardes, busqué dentista de urgencia en Google. Tengo dolor fuerte en una muela.",
    bizMsg: "Hola, podemos atenderte de inmediato en nuestra sede norte. ¿Te apartamos el box?"
  },
  electricista: {
    query: "electricista a domicilio urgente",
    name: "Electricista Cali Express",
    rating: "4.9 (95 opiniones)",
    desc: "Cortocircuitos, instalación de tableros y emergencias eléctricas certificadas.",
    avatar: "E",
    clientMsg: "Hola, vi su web en Google. Se fue la luz en mi local y huele a quemado, ¿pueden revisar?",
    bizMsg: "¡Hola! Desconecta la llave general por seguridad. Vamos saliendo hacia allá en 15 min."
  }
};

function initHeroStageSectors() {
  const chips = document.querySelectorAll("#hero-sector-chips .stage-chip");
  const queryEl = document.getElementById("hero-search-query");
  const nameEl = document.getElementById("hero-biz-name");
  const ratingEl = document.getElementById("hero-biz-rating");
  const descEl = document.getElementById("hero-biz-desc");
  const avatarEl = document.getElementById("hero-wa-avatar-char");
  const titleEl = document.getElementById("hero-wa-biz-title");
  const clientTextEl = document.getElementById("hero-chat-client-text");
  const bizTextEl = document.getElementById("hero-chat-biz-text");
  const stage = document.getElementById("hero-stage");

  if (!chips.length || !queryEl) return;

  const sectorKeys = Object.keys(HERO_SECTORS);
  let currentIdx = 0;
  let autoTimer = null;
  let userInteracted = false;

  function switchSector(key) {
    const data = HERO_SECTORS[key] || HERO_SECTORS.cerrajero;

    chips.forEach(chip => {
      chip.classList.toggle("active", chip.getAttribute("data-sector") === key);
    });

    if (queryEl) queryEl.textContent = data.query;
    if (nameEl) nameEl.textContent = data.name;
    if (ratingEl) ratingEl.textContent = data.rating;
    if (descEl) descEl.textContent = data.desc;
    if (avatarEl) avatarEl.textContent = data.avatar;
    if (titleEl) titleEl.textContent = data.name.split(" ").slice(0, 2).join(" ");
    if (clientTextEl) clientTextEl.textContent = data.clientMsg;
    if (bizTextEl) bizTextEl.textContent = data.bizMsg;
  }

  chips.forEach(chip => {
    chip.addEventListener("click", () => {
      userInteracted = true;
      if (autoTimer) clearTimeout(autoTimer);
      const sector = chip.getAttribute("data-sector");
      switchSector(sector);
    });
  });

  function autoCycle() {
    if (userInteracted) return;
    autoTimer = setTimeout(() => {
      currentIdx = (currentIdx + 1) % sectorKeys.length;
      switchSector(sectorKeys[currentIdx]);
      autoCycle();
    }, 6000);
  }

  autoCycle();

  // 3D tilt sutil en mousemove sobre la consola
  if (stage && window.matchMedia("(pointer: fine)").matches) {
    stage.addEventListener("mousemove", (e) => {
      const rect = stage.getBoundingClientRect();
      const x = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
      const y = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
      stage.style.transform = `perspective(1000px) rotateX(${-y * 2.2}deg) rotateY(${x * 2.2}deg) translateY(-3px)`;
    });

    stage.addEventListener("mouseleave", () => {
      stage.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)";
    });
  }
}

// ─── 5. SPOTLIGHT CURSOR EN TARJETAS ───
function initSpotlightCards() {
  document.addEventListener("mousemove", (e) => {
    const cards = document.querySelectorAll(".spotlight-card");
    cards.forEach(card => {
      const rect = card.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > window.innerHeight) return;

      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      card.style.setProperty("--mouse-x", `${x}px`);
      card.style.setProperty("--mouse-y", `${y}px`);
    });
  }, { passive: true });
}

// ─── 6. BOTONES MAGNÉTICOS ───
function initMagneticButtons() {
  if (!window.matchMedia("(pointer: fine)").matches) return;

  const magneticBtns = document.querySelectorAll(".btn-magnetic");
  magneticBtns.forEach(btn => {
    btn.addEventListener("mousemove", (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - (rect.left + rect.width / 2);
      const y = e.clientY - (rect.top + rect.height / 2);
      btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
    });

    btn.addEventListener("mouseleave", () => {
      btn.style.transform = "translate(0px, 0px)";
      setTimeout(() => { btn.style.transform = ""; }, 250);
    });
  });
}

// ─── 8. ACORDEÓN DE PREGUNTAS FRECUENTES (CAJITAS INDEPENDIENTES) ───
function initFaqAccordion() {
  const faqBoxes = document.querySelectorAll(".faq-box");
  if (!faqBoxes.length) return;

  faqBoxes.forEach(box => {
    const btn = box.querySelector(".faq-box-btn");
    if (!btn) return;

    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const isOpen = box.classList.contains("open");

      // 1. Cerrar cualquier otra cajita abierta (sin tocar jamás ninguna otra clase)
      faqBoxes.forEach(other => {
        if (other !== box) {
          other.classList.remove("open");
          const otherBtn = other.querySelector(".faq-box-btn");
          if (otherBtn) otherBtn.setAttribute("aria-expanded", "false");
        }
      });

      // 2. Si estaba abierta se cierra; si estaba cerrada se abre
      if (isOpen) {
        box.classList.remove("open");
        btn.setAttribute("aria-expanded", "false");
      } else {
        box.classList.add("open");
        btn.setAttribute("aria-expanded", "true");
      }
    });
  });
}

// ─── 9. POPUP PROACTIVO WHATSAPP ───
function initFloatingWaPopup() {
  const popup = document.getElementById("floating-wa-popup");
  const closeBtn = document.getElementById("fwp-close-btn");
  if (!popup) return;

  let dismissed = false;

  setTimeout(() => {
    if (!dismissed) {
      popup.classList.add("show");
    }
  }, 4500);

  if (closeBtn) {
    closeBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      dismissed = true;
      popup.classList.remove("show");
    });
  }
}

// ─── 10. SCROLL REVEAL ───
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        obs.unobserve(entry.target);
      }
    });
  }, {
    rootMargin: "0px 0px -40px 0px",
    threshold: 0.05
  });

  document.querySelectorAll(".reveal, .reveal-blur").forEach(el => {
    observer.observe(el);
  });
}

// ─── 11. NAVBAR SCROLL ───
function initNavbarScroll() {
  const navbar = document.getElementById("navbar");
  if (navbar) {
    window.addEventListener("scroll", () => {
      navbar.classList.toggle("scrolled", window.scrollY > 40);
    }, { passive: true });
  }
}

// ─── 12. PARALLAX SILUETA ───
function initSiluetaParallax() {
  const siluetaWrapper = document.getElementById("silueta-wrapper");
  const siluetaImg = document.getElementById("silueta-img");
  if (!siluetaWrapper || !siluetaImg) return;

  if (!window.matchMedia("(pointer: fine)").matches) return;

  document.addEventListener("mousemove", (e) => {
    const rect = siluetaWrapper.getBoundingClientRect();
    if (rect.top > window.innerHeight || rect.bottom < 0) return;
    const dx = (e.clientX / window.innerWidth - 0.5);
    const dy = (e.clientY / window.innerHeight - 0.5);
    siluetaImg.style.transform = `translate(${dx * 12}px, ${dy * 7}px)`;
  }, { passive: true });
}

// ─── 13. RAYO LÁSER DINÁMICO EN 'CÓMO FUNCIONA' (SCROLL-DRIVEN) ───
function initSolucionLaserScroll() {
  const section = document.getElementById("solucion");
  const beam = document.getElementById("solucion-laser-beam");
  const stepCards = [
    document.getElementById("step-card-1"),
    document.getElementById("step-card-2"),
    document.getElementById("step-card-3")
  ];

  if (!section || !beam) return;

  const isMobile = () => window.innerWidth <= 768;

  function handleScrollProgress() {
    const rect = section.getBoundingClientRect();
    const windowH = window.innerHeight;

    // Rango de activación mientras la sección transita la pantalla
    const startPoint = windowH * 0.75;
    const endPoint = windowH * 0.15;
    const scrollRange = rect.height + (startPoint - endPoint);
    const scrollDistance = startPoint - rect.top;

    let progress = scrollDistance / scrollRange;
    progress = Math.max(0, Math.min(1, progress));

    const percent = Math.min(100, Math.max(0, progress * 100));

    if (isMobile()) {
      beam.style.height = `${percent}%`;
      beam.style.width = "100%";
    } else {
      beam.style.width = `${percent}%`;
      beam.style.height = "100%";
    }

    // Activar estados energizados con halo progresivo
    if (stepCards[0]) {
      stepCards[0].classList.toggle("energized", progress >= 0.12);
    }
    if (stepCards[1]) {
      stepCards[1].classList.toggle("energized", progress >= 0.45);
    }
    if (stepCards[2]) {
      stepCards[2].classList.toggle("energized", progress >= 0.78);
    }
  }

  // Interacción manual por hover
  stepCards.forEach(card => {
    if (!card) return;
    card.addEventListener("mouseenter", () => {
      card.classList.add("energized");
    });
    card.addEventListener("mouseleave", () => {
      handleScrollProgress();
    });
  });

  let ticking = false;
  window.addEventListener("scroll", () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        handleScrollProgress();
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  window.addEventListener("resize", handleScrollProgress, { passive: true });
  handleScrollProgress();
}

// ─── 14. BARRA DE PROGRESO DE LECTURA (TOP LASER BAR) ───
function initScrollProgressBar() {
  const progressBar = document.getElementById("scroll-progress-bar");
  if (!progressBar) return;

  function updateBar() {
    const scrollY = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (docHeight <= 0) return;
    const percent = Math.min(100, Math.max(0, (scrollY / docHeight) * 100));
    progressBar.style.width = `${percent}%`;
  }

  let ticking = false;
  window.addEventListener("scroll", () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        updateBar();
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  updateBar();
}