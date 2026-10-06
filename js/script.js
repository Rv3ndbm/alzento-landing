/**
 * ALZENTO - Scripts de Conversión, Micro-interacciones y UI Moderna
 */

const CONFIG = {
  waNumber: "573023137141",
  waDefaultMessage: "Hola, vi tu página web y quisiera información para conseguir clientes en Google para mi negocio.",
};

const MARQUEE_ITEMS = [
  "Clientes desde Google", "WhatsApp en un clic", "Diseño que convierte", "Entrega en 48h",
  "SEO desde el día 1", "Sin formularios inútiles", "Resultados medibles", "Negocios locales",
  "Score 99+ Velocidad", "Dominio & Hosting incluido", "Cero letras pequeñas"
];

const SECTORES_DATA = {
  cerrajero: {
    query: "cerrajero urgente cerca de mi",
    name: "Cerrajería Segura Bogotá — Urgencias 24/7 en tu zona",
    domain: "www.cerrajeriasegura.co",
    rating: "5.0 (84 opiniones)",
    highlight: "· Llegamos en 20 min",
    desc: "¿Olvidaste tus llaves o chapa trabada? Servicio profesional urgente en Bogotá. Precios justos sin sorpresas y contacto directo en un clic.",
    msg: "Hola! Busqué cerrajero urgente en Google y necesito abrir una chapa. ¿Están disponibles?"
  },
  barberia: {
    query: "mejor barbería cerca de mi",
    name: "Barbería Kings Club Medellín — Reserva tu turno hoy",
    domain: "www.kingsbarberia.co",
    rating: "4.9 (112 opiniones)",
    highlight: "· Cortes clásicos & barba",
    desc: "Cortes de cabello y afeitado tradicional con barberos expertos en Medellín. Agenda tu cita directa por WhatsApp sin llamadas ni filas.",
    msg: "Hola! Vi su barbería en Google, quiero agendar un corte y barba para hoy."
  },
  odontologo: {
    query: "urgencias odontológicas 24h",
    name: "Clínica Dental Sonrisas Cali — Atención Inmediata",
    domain: "www.clinicadentalsonrisas.com",
    rating: "5.0 (64 opiniones)",
    highlight: "· Especialistas certificados",
    desc: "Dolor dental agudo o emergencias. Odontólogos de guardia en Cali. Instalaciones modernas, atención sin dolor y contacto por WhatsApp.",
    msg: "Hola, busqué dentista de urgencia en Google, ¿tienen cita libre de inmediato?"
  },
  electricista: {
    query: "electricista a domicilio urgente",
    name: "Electricista Cali Express — Emergencias 24 Horas",
    domain: "www.electricistacali.com",
    rating: "4.9 (95 opiniones)",
    highlight: "· Técnicos certificados",
    desc: "Cortocircuitos, instalación de tableros y reparaciones eléctricas urgentes. Presupuesto sin compromiso. Llegamos en 30 minutos.",
    msg: "Buenas tardes, vi su página en Google, tengo un corto en mi casa, ¿pueden venir?"
  },
  taller: {
    query: "taller mecánico frenos cerca",
    name: "Taller Mecánico Master — Diagnóstico y Frenos",
    domain: "www.tallermasterauto.co",
    rating: "5.0 (72 opiniones)",
    highlight: "· Repuestos originales",
    desc: "Mantenimiento preventivo, frenos, suspensión y scanner automotriz. Garantía por escrito en cada reparación. Cotiza por WhatsApp.",
    msg: "Hola, encontré su taller en Google, ¿hacen revisión de frenos y cambio de aceite hoy?"
  }
};

const PROYECTOS = [
  {
    sector: "Cerrajería",
    name: "Cerrajería Segura Bogotá",
    desc: "Optimizada para búsquedas locales de urgencia extrema. El visitante llega con la puerta trabada, ve la garantía de 20 minutos y escribe al WhatsApp en segundos.",
    bg: "linear-gradient(135deg, #182234, #0f172a)",
    stat: "+24 Contactos / mes",
    tags: ["SEO Local", "Urgencias 24h", "WhatsApp directo"]
  },
  {
    sector: "Barbería & Estilo",
    name: "Barbería Kings Club Medellín",
    desc: "Reservas directas por WhatsApp con catálogo de estilos fotográficos y reseñas 5 estrellas de Google Maps. Cero tiempo perdido respondiendo llamadas.",
    bg: "linear-gradient(135deg, #2b1810, #140d0a)",
    stat: "Turnos llenos semanales",
    tags: ["Reservas WhatsApp", "Google Maps #1", "Móvil First"]
  },
  {
    sector: "Electricidad",
    name: "Electricista Cali Express",
    desc: "Estructura posicionada para términos de alta intención comercial. Genera llamadas y mensajes continuos de clientes nuevos sin invertir un solo peso en publicidad paga.",
    bg: "linear-gradient(135deg, #102619, #0a1810)",
    stat: "+19 Clientes / mes",
    tags: ["Tráfico 100% Orgánico", "Score 99 PageSpeed", "Cierre Inmediato"]
  }
];

document.addEventListener("DOMContentLoaded", () => {
  // 1. Año dinámico en Footer
  const yearEl = document.getElementById("year-placeholder");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // 2. WhatsApp default links
  updateWhatsAppLinks();

  // 3. Marquee Dinámico
  initMarquee();

  // 4. Proyectos
  renderProyectos();

  // 5. Interacción de Tipografía en Hero (Efecto Proximidad Cursor Letra por Letra)
  initHeroTypographyInteractive();

  // 6. Efecto Spotlight Cursor en Cards
  initSpotlightCards();

  // 7. Micro-interacción Botones Magnéticos
  initMagneticButtons();

  // 8. Simulador de Búsqueda de Google Ultra Mejorado
  initEnhancedGoogleSimulator();

  // 9. Acordeón de Preguntas Frecuentes
  initFaqAccordion();

  // 10. Floating WhatsApp Popup Proactivo
  initFloatingWaPopup();

  // 11. Intersection Observer para Animaciones Reveal y Contadores
  initScrollAnimations();

  // 12. Navbar Scroll
  initNavbarScroll();

  // 13. Parallax en Silueta del Fundador
  initSiluetaParallax();
});

// ─── 1. WHATSAPP LINKS ───
function updateWhatsAppLinks() {
  const defaultUrl = `https://wa.me/${CONFIG.waNumber}?text=${encodeURIComponent(CONFIG.waDefaultMessage)}`;
  document.querySelectorAll(".wa-link").forEach(link => {
    if (!link.getAttribute("data-custom-wa")) {
      link.href = defaultUrl;
    }
    link.target = "_blank";
    link.rel = "noopener noreferrer";
  });
}

// ─── 2. MARQUEE DINÁMICO ───
function initMarquee() {
  const marqueeTrack = document.getElementById("dynamic-marquee");
  if (marqueeTrack) {
    const renderItems = () => MARQUEE_ITEMS.map(i => `<span class="marquee-item">${i}</span>`).join("");
    marqueeTrack.innerHTML = renderItems() + renderItems();
  }
}

// ─── 3. PROYECTOS / CASOS REALES ───
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
            <span class="mb-badge-google">📍 Posicionado #1 Google</span>
            <div class="mb-hero-text">${p.name.toUpperCase()}</div>
            <div style="font-size: 0.68rem; color: #94a3b8;">⭐⭐⭐⭐⭐ 5.0 · Servicio Garantizado</div>
            <div class="mb-cta-mock">💬 WhatsApp Directo</div>
          </div>
        </div>
      </div>
      <div class="proyecto-info">
        <div class="proyecto-sector">${p.sector} · <strong style="color: #4ade80;">${p.stat}</strong></div>
        <div class="proyecto-name">${p.name}</div>
        <p class="proyecto-desc">${p.desc}</p>
        <div class="proyecto-tags">
          ${p.tags.map(t => `<span class="tag">${t}</span>`).join('')}
        </div>
      </div>
    </div>
  `).join("");
}

// ─── 4. TIPOGRAFÍA INTERACTIVA DEL HERO CON EL CURSOR ───
/**
 * Envuelve cada letra del H1 en un <span> y calcula en tiempo real
 * la distancia euclidiana entre el cursor y el centro de cada letra.
 * Conforme el cursor se acerca, la letra cambia suavemente de color,
 * eleva su escala y emite un resplandor esmeralda / neon individual.
 */
function initHeroTypographyInteractive() {
  const title = document.getElementById("hero-main-title");
  if (!title) return;

  // Transformar nodos de texto a spans de caracteres preservando etiquetas <br> y <em>
  function wrapCharacters(node) {
    const children = Array.from(node.childNodes);
    children.forEach(child => {
      if (child.nodeType === Node.TEXT_NODE) {
        const text = child.textContent;
        const fragment = document.createDocumentFragment();
        for (let i = 0; i < text.length; i++) {
          const char = text[i];
          if (char === " " || char === "\n") {
            fragment.appendChild(document.createTextNode(char));
          } else {
            const span = document.createElement("span");
            span.className = "char";
            span.textContent = char;
            fragment.appendChild(span);
          }
        }
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

  // Actualizar rectángulos inicialmente y en resize/scroll
  updateRects();
  window.addEventListener("resize", updateRects, { passive: true });
  window.addEventListener("scroll", updateRects, { passive: true });

  const radius = 145; // Radio de influencia en px
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
        // Cuanto más cerca, mayor intensidad t entre 0 y 1
        const rawT = 1 - (dist / radius);
        const t = rawT * rawT; // Easing cuadrático para suavidad

        if (item.isEm) {
          // Letras dentro de <em> (originalmente huecas con borde)
          item.span.style.color = `rgba(34, 197, 94, ${0.45 + 0.55 * t})`;
          item.span.style.webkitTextStroke = `1.2px #4ade80`;
          item.span.style.textShadow = `0 0 ${(22 * t).toFixed(1)}px rgba(74, 222, 128, ${(0.85 * t).toFixed(2)})`;
          item.span.style.transform = `translateY(${(-3.5 * t).toFixed(1)}px) scale(${(1 + 0.08 * t).toFixed(2)})`;
        } else {
          // Letras estándar blancas
          item.span.style.color = t > 0.4 ? "#4ade80" : "#ffffff";
          item.span.style.textShadow = `0 0 ${(18 * t).toFixed(1)}px rgba(34, 197, 94, ${(0.95 * t).toFixed(2)})`;
          item.span.style.transform = `translateY(${(-4 * t).toFixed(1)}px) scale(${(1 + 0.09 * t).toFixed(2)})`;
        }
      } else {
        // Reset a estado original
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

// ─── 5. SPOTLIGHT CURSOR EN TARJETAS ───
function initSpotlightCards() {
  document.addEventListener("mousemove", (e) => {
    const cards = document.querySelectorAll(".spotlight-card");
    cards.forEach(card => {
      const rect = card.getBoundingClientRect();
      // Solo calcular si está cerca de la pantalla
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
  // Solo en dispositivos con puntero fino (Desktop / Mouse)
  if (!window.matchMedia("(pointer: fine)").matches) return;

  const magneticBtns = document.querySelectorAll(".btn-magnetic");
  magneticBtns.forEach(btn => {
    btn.addEventListener("mousemove", (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - (rect.left + rect.width / 2);
      const y = e.clientY - (rect.top + rect.height / 2);
      btn.style.transform = `translate(${x * 0.22}px, ${y * 0.22}px)`;
    });

    btn.addEventListener("mouseleave", () => {
      btn.style.transform = "translate(0px, 0px)";
      setTimeout(() => { btn.style.transform = ""; }, 300);
    });
  });
}

// ─── 7. SIMULADOR DE BÚSQUEDA DE GOOGLE MEJORADO ───
function initEnhancedGoogleSimulator() {
  const chipsContainer = document.getElementById("sim-chips");
  const gmText = document.getElementById("gm-text");
  const simDomain = document.getElementById("sim-domain");
  const simTitle = document.getElementById("sim-title");
  const simRating = document.getElementById("sim-rating");
  const simDesc = document.getElementById("sim-desc");
  const simWaBtn = document.getElementById("sim-wa-btn");
  const simBtnText = document.getElementById("sim-btn-text");
  const customInput = document.getElementById("sim-custom-input");
  const customBtn = document.getElementById("sim-custom-btn");
  const activeCard = document.getElementById("gm-active-card");

  if (!gmText || !simTitle) return;

  let currentKey = "cerrajero";
  let typingTimer = null;
  let autoCycleTimer = null;
  let userInteracted = false;

  const keys = Object.keys(SECTORES_DATA);
  let cycleIdx = 0;

  function setSector(key, customName = null) {
    const data = SECTORES_DATA[key] || SECTORES_DATA.cerrajero;
    currentKey = key;

    // Actualizar botones de chips
    if (chipsContainer) {
      chipsContainer.querySelectorAll(".sim-chip").forEach(btn => {
        btn.classList.toggle("active", btn.getAttribute("data-sector") === key && !customName);
      });
    }

    // Efecto de typing en la query
    const targetQuery = customName ? `${customName.toLowerCase()} cerca de mi` : data.query;
    typeQuery(targetQuery, () => {
      // Animar flash en la tarjeta de resultados
      if (activeCard) {
        activeCard.style.transform = "scale(0.98)";
        setTimeout(() => { activeCard.style.transform = "scale(1)"; }, 180);
      }

      const displayName = customName ? `${customName} — Servicio Profesional 24h` : data.name;
      const cleanSlug = customName ? customName.toLowerCase().replace(/[^a-z0-9]/g, "") : "negociolocal";
      const displayDomain = customName ? `www.${cleanSlug}.com` : data.domain;
      const displayDesc = customName
        ? `Servicio inmediato y garantizado de ${customName}. Cotiza directamente por WhatsApp en 1 clic y con los mejores precios.`
        : data.desc;
      const waMsg = customName
        ? `Hola, vi cómo se vería "${customName}" posicionado en Google con ALZENTO y quiero cotizar mi página web.`
        : data.msg;

      simTitle.textContent = displayName;
      simDomain.textContent = displayDomain;
      simDesc.textContent = displayDesc;
      if (simRating) simRating.textContent = data.rating;

      if (simWaBtn) {
        const waLink = `https://wa.me/${CONFIG.waNumber}?text=${encodeURIComponent(waMsg)}`;
        simWaBtn.href = waLink;
        simWaBtn.setAttribute("data-custom-wa", "true");
        simWaBtn.target = "_blank";
        simWaBtn.rel = "noopener noreferrer";
      }

      if (simBtnText) {
        simBtnText.textContent = customName ? `Cotizar la web de ${customName}` : "Escribir por WhatsApp a este negocio";
      }
    });
  }

  function typeQuery(text, onComplete) {
    if (typingTimer) clearInterval(typingTimer);
    gmText.textContent = "";
    let i = 0;
    typingTimer = setInterval(() => {
      if (i < text.length) {
        gmText.textContent += text[i++];
      } else {
        clearInterval(typingTimer);
        typingTimer = null;
        if (onComplete) onComplete();
      }
    }, 45);
  }

  // Clic en chips
  if (chipsContainer) {
    chipsContainer.addEventListener("click", (e) => {
      const chip = e.target.closest(".sim-chip");
      if (!chip) return;
      userInteracted = true;
      stopAutoCycle();
      const sector = chip.getAttribute("data-sector");
      setSector(sector);
    });
  }

  // Input personalizado
  function handleCustomSubmit() {
    if (!customInput) return;
    const val = customInput.value.trim();
    if (!val) return;
    userInteracted = true;
    stopAutoCycle();
    setSector("cerrajero", val);
  }

  if (customBtn && customInput) {
    customBtn.addEventListener("click", handleCustomSubmit);
    customInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        handleCustomSubmit();
      }
    });
  }

  // Auto-ciclo suave si el usuario no interactúa
  function startAutoCycle() {
    if (userInteracted) return;
    autoCycleTimer = setTimeout(() => {
      cycleIdx = (cycleIdx + 1) % keys.length;
      setSector(keys[cycleIdx]);
      startAutoCycle();
    }, 7000);
  }

  function stopAutoCycle() {
    if (autoCycleTimer) {
      clearTimeout(autoCycleTimer);
      autoCycleTimer = null;
    }
  }

  // Iniciar en el primer sector tras carga
  setTimeout(() => {
    setSector("cerrajero");
    startAutoCycle();
  }, 1000);
}

// ─── 8. ACORDEÓN DE PREGUNTAS FRECUENTES (FAQ) ───
function initFaqAccordion() {
  const faqItems = document.querySelectorAll(".faq-item");
  faqItems.forEach(item => {
    const btn = item.querySelector(".faq-question");
    if (!btn) return;

    btn.addEventListener("click", () => {
      const isOpen = item.classList.contains("active");

      // Cerrar los demás acordeones para mantener orden visual
      faqItems.forEach(other => {
        if (other !== item) {
          other.classList.remove("active");
          const otherBtn = other.querySelector(".faq-question");
          if (otherBtn) otherBtn.setAttribute("aria-expanded", "false");
        }
      });

      // Alternar el actual
      item.classList.toggle("active", !isOpen);
      btn.setAttribute("aria-expanded", String(!isOpen));
    });
  });
}

// ─── 9. FLOATING WHATSAPP POPUP PROACTIVO ───
function initFloatingWaPopup() {
  const popup = document.getElementById("floating-wa-popup");
  const closeBtn = document.getElementById("fwp-close-btn");
  if (!popup) return;

  let dismissed = false;

  // Mostrar a los 5 segundos
  setTimeout(() => {
    if (!dismissed) {
      popup.classList.add("show");
    }
  }, 5000);

  if (closeBtn) {
    closeBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      dismissed = true;
      popup.classList.remove("show");
    });
  }
}

// ─── 10. SCROLL REVEAL Y CONTADORES ───
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        if (entry.target.classList.contains("counter")) {
          animateCounter(entry.target);
        }
        obs.unobserve(entry.target);
      }
    });
  }, {
    rootMargin: "0px 0px -40px 0px",
    threshold: 0.05
  });

  document.querySelectorAll(".reveal, .reveal-blur, .counter").forEach(el => {
    observer.observe(el);
  });
}

function animateCounter(el) {
  const target = +el.getAttribute("data-target");
  if (!target) return;
  const duration = 1800;
  const startTime = performance.now();

  function update(now) {
    const elapsed = now - startTime;
    if (elapsed < duration) {
      const progress = elapsed / duration;
      // Curva easeOutExpo
      const current = Math.floor(target * (1 - Math.pow(2, -10 * progress)));
      el.textContent = current;
      requestAnimationFrame(update);
    } else {
      el.textContent = target;
    }
  }
  requestAnimationFrame(update);
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

// ─── 12. PARALLAX EN SILUETA FUNDADOR ───
function initSiluetaParallax() {
  const siluetaWrapper = document.getElementById("silueta-wrapper");
  const siluetaImg = document.getElementById("silueta-img");
  if (!siluetaWrapper || !siluetaImg) return;

  // Solo en desktops
  if (!window.matchMedia("(pointer: fine)").matches) return;

  document.addEventListener("mousemove", (e) => {
    const rect = siluetaWrapper.getBoundingClientRect();
    if (rect.top > window.innerHeight || rect.bottom < 0) return;
    const dx = (e.clientX / window.innerWidth - 0.5);
    const dy = (e.clientY / window.innerHeight - 0.5);
    siluetaImg.style.transform = `translate(${dx * 14}px, ${dy * 8}px)`;
  }, { passive: true });
}