/**
 * ALZENTO - Scripts de Conversión y UI
 */

const CONFIG = {
  waNumber: "573023137141",
  waDefaultMessage: "Hola, vi tu p\u00e1gina y quisiera informaci\u00f3n sobre c\u00f3mo conseguir clientes para mi negocio con una p\u00e1gina web.",
};

const MARQUEE_ITEMS = [
  "Clientes desde Google", "WhatsApp en un clic", "Diseño que convierte", "Entrega en 48h",
  "SEO desde el día 1", "Sin formularios inútiles", "Resultados medibles", "Negocios locales"
];

const SERVICIOS = [
  {
    tag: "Base", isFeatured: false, icon: "🌐", title: "Página web profesional",
    desc: "Un sitio rápido, claro y diseñado para que quien te encuentre en Google sepa de inmediato que eres la opción correcta.",
    features: ["Diseño adaptado a tu negocio", "Carga rápida en móvil y PC", "Dominio y hosting incluidos", "Sin complicaciones técnicas de tu parte"]
  },
  {
    tag: "★ Más solicitado", isFeatured: true, icon: "📍", title: "SEO local en Google",
    desc: "Aparecer cuando alguien busca tu servicio en tu ciudad. Eso es lo que produce clientes reales, no seguidores.",
    features: ["Palabras clave de tu sector", "Ficha en Google Maps optimizada", "Textos pensados para posicionar", "Visibilidad local sostenida"]
  },
  {
    tag: "Conversión", isFeatured: false, icon: "💬", title: "Integración con WhatsApp",
    desc: "Cada visitante tiene un camino directo a tu WhatsApp. Sin rodeos, sin formularios, sin barreras.",
    features: ["Botón flotante siempre visible", "Mensaje de contacto pre-escrito", "Llamadas a la acción estratégicas", "Clic directo desde el móvil"]
  }
];

const PROYECTOS = [
  {
    sector: "Cerrajería", name: "Cerrajería Segura Bogotá",
    desc: "Página diseñada para búsquedas de urgencia. El visitante llega, ve lo que necesita y escribe en segundos.",
    bg: "linear-gradient(135deg, #1a1a2e, #16213e)",
    tags: ["SEO local", "WhatsApp directo", "Urgencias 24h"]
  },
  {
    sector: "Barbería", name: "Barbería Kings Medellín",
    desc: "Reservas por WhatsApp y galería de trabajos para que el cliente llegue convencido antes de sentarse en la silla.",
    bg: "linear-gradient(135deg, #1a0a0a, #2d1b1b)",
    tags: ["Reservas sin llamadas", "Galería de trabajos", "Tráfico local"]
  },
  {
    sector: "Electricista", name: "Electricista Cali Express",
    desc: "Posicionado para búsquedas urgentes. Genera contactos nuevos cada semana sin invertir en publicidad paga.",
    bg: "linear-gradient(135deg, #0a1a0a, #1a2d1b)",
    tags: ["SEO orgánico", "Sin pauta paga", "Contacto inmediato"]
  }
];

document.addEventListener("DOMContentLoaded", () => {
  // 1. Año actual
  const yearEl = document.getElementById("year-placeholder");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // 2. Links WhatsApp
  const waUrl = `https://wa.me/${CONFIG.waNumber}?text=${encodeURIComponent(CONFIG.waDefaultMessage)}`;
  document.querySelectorAll(".wa-link").forEach(link => {
    link.href = waUrl;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
  });

  // 3. Marquee
  const marqueeTrack = document.getElementById("dynamic-marquee");
  if (marqueeTrack) {
    const renderItems = () => MARQUEE_ITEMS.map(i => `<span class="marquee-item">${i}</span>`).join("");
    marqueeTrack.innerHTML = renderItems() + renderItems();
  }

  // 4. Servicios
  const srvContainer = document.getElementById("servicios-container");
  if (srvContainer) {
    srvContainer.innerHTML = SERVICIOS.map((s, i) => `
      <div class="servicio-card glass-panel reveal reveal-delay-${i} ${s.isFeatured ? 'featured' : ''}">
        <span class="servicio-tag">${s.tag}</span>
        <div class="servicio-icon">${s.icon}</div>
        <div class="servicio-title">${s.title}</div>
        <p class="servicio-desc">${s.desc}</p>
        <ul class="servicio-features">
          ${s.features.map(f => `<li>${f}</li>`).join('')}
        </ul>
      </div>
    `).join("");
  }

  // 5. Proyectos
  const prjContainer = document.getElementById("proyectos-container");
  if (prjContainer) {
    prjContainer.innerHTML = PROYECTOS.map((p, i) => `
      <div class="proyecto-card glass-panel reveal reveal-delay-${i}">
        <div class="proyecto-thumb" style="background: ${p.bg}">
          <div class="browser-mock">
            <div class="browser-bar"><div class="dot r"></div><div class="dot y"></div><div class="dot g"></div></div>
            <div class="browser-content">
              <div class="bc-hero-bg"><span class="bc-hero-text">${p.name.toUpperCase()}</span></div>
              <div class="bc-row"><div class="bc-box"></div><div class="bc-box dark"></div></div>
              <div class="bc-row"><div class="bc-box dark"></div><div class="bc-box"></div><div class="bc-box dark"></div></div>
              <div class="bc-cta"></div>
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

  // 6. Intersection Observer — threshold bajo para disparar pronto
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        // Barra de visualización: activar su contenedor padre también
        if (entry.target.classList.contains("problema-visual")) {
          const card = entry.target.querySelector(".visual-card");
          if (card) card.classList.add("active");
        }
        if (entry.target.classList.contains("counter")) {
          animateCounter(entry.target);
        }
        obs.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    rootMargin: "0px 0px -5% 0px", // Dispara cuando el elemento está casi en pantalla
    threshold: 0
  });

  // Observar todos los elementos animados (incluidos los inyectados por JS)
  function observeAll() {
    document.querySelectorAll(".reveal, .reveal-blur, .counter").forEach(el => {
      observer.observe(el);
    });
  }
  observeAll();

  // 7. Navbar scroll
  const navbar = document.getElementById("navbar");
  if (navbar) {
    window.addEventListener("scroll", () => {
      navbar.classList.toggle("scrolled", window.scrollY > 50);
    }, { passive: true });
  }

  // 8. Parallax en silueta (mouse)
  const siluetaWrapper = document.getElementById("silueta-wrapper");
  const siluetaImg = document.getElementById("silueta-img");
  if (siluetaWrapper && siluetaImg) {
    document.addEventListener("mousemove", (e) => {
      const rect = siluetaWrapper.getBoundingClientRect();
      if (rect.top > window.innerHeight || rect.bottom < 0) return;
      const dx = (e.clientX / window.innerWidth - 0.5);
      const dy = (e.clientY / window.innerHeight - 0.5);
      siluetaImg.style.transform = `translate(${dx * 14}px, ${dy * 9}px)`;
    });
  }

  // 9. Google Search Mock
  initGoogleMock();
});

// ─── GOOGLE SEARCH MOCK ───
function initGoogleMock() {
  const gmText = document.getElementById("gm-text");
  const gmResults = document.getElementById("gm-results");
  if (!gmText || !gmResults) return;

  const searches = [
    {
      query: "cerrajero cerca de mi",
      results: [
        { highlight: false, domain: "competencia.com", title: "Cerrajería rápida — Servicio 24h", snippet: "Abrimos puertas, cambio de cerraduras..." },
        { highlight: true, domain: "tucerrajeriabogota.com", title: "✦ Cerrajería Segura Bogotá — Urgencias 24/7", snippet: "Llámanos ahora. Respuesta inmediata en tu zona." },
      ]
    },
    {
      query: "barbería cerca medellín",
      results: [
        { highlight: false, domain: "barberia-city.co", title: "Barberías en Medellín", snippet: "Encuentra tu barbería ideal con reseñas..." },
        { highlight: true, domain: "kingsbarberia.co", title: "✦ Barbería Kings Medellín — Reserva tu turno hoy", snippet: "Cortes premium. Reserva directa por WhatsApp." },
      ]
    },
    {
      query: "electricista urgente cali",
      results: [
        { highlight: false, domain: "servicios-generales.co", title: "Electricistas en Cali", snippet: "Lista de profesionales certificados..." },
        { highlight: true, domain: "electricistacali.com", title: "✦ Electricista Cali Express — Emergencias 24h", snippet: "Llegamos en 30 minutos. Presupuesto gratis." },
      ]
    }
  ];

  let searchIdx = 0;

  function runSearch() {
    const s = searches[searchIdx % searches.length];
    searchIdx++;
    let charIdx = 0;
    gmText.textContent = "";
    gmResults.innerHTML = "";

    const typeInterval = setInterval(() => {
      if (charIdx < s.query.length) {
        gmText.textContent += s.query[charIdx++];
      } else {
        clearInterval(typeInterval);
        // Mostrar resultados escalonados
        s.results.forEach((r, i) => {
          const el = document.createElement("div");
          el.className = `gm-result${r.highlight ? " highlight" : ""}`;
          el.innerHTML = `
            <div class="gm-result-top">
              <div class="gm-favicon"></div>
              <span class="gm-domain">${r.domain}</span>
            </div>
            <div class="gm-title">${r.title}</div>
            <div class="gm-snippet">${r.snippet}</div>
          `;
          gmResults.appendChild(el);
          setTimeout(() => el.classList.add("visible"), i * 350 + 200);
        });

        // Borrar y repetir
        setTimeout(() => {
          const eraseInterval = setInterval(() => {
            if (gmText.textContent.length > 0) {
              gmText.textContent = gmText.textContent.slice(0, -1);
            } else {
              clearInterval(eraseInterval);
              gmResults.innerHTML = "";
              setTimeout(runSearch, 500);
            }
          }, 28);
        }, 4200);
      }
    }, 65);
  }

  setTimeout(runSearch, 1200);
}

// ─── CONTADOR ANIMADO ───
function animateCounter(el) {
  const target = +el.getAttribute("data-target");
  const duration = 2000;
  const startTime = performance.now();

  function update(now) {
    const elapsed = now - startTime;
    if (elapsed < duration) {
      const progress = elapsed / duration;
      el.textContent = Math.floor(target * (1 - Math.pow(2, -10 * progress)));
      requestAnimationFrame(update);
    } else {
      el.textContent = target;
    }
  }
  requestAnimationFrame(update);
}