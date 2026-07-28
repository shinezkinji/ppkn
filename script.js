/* =============================================================
   SISTEM HUKUM INDONESIA — script.js
   ============================================================= */

// ================= Preloader =================
window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  setTimeout(() => {
    preloader.classList.add('hide');
    document.body.classList.add('loaded');
    animateCounters();
    const heroStempel = document.getElementById('heroStempel');
    if (heroStempel) heroStempel.classList.add('stamp-in');
  }, 450);
});

// ================= Elemen umum =================
const navbar = document.getElementById('navbar');
const navMenu = document.getElementById('navMenu');
const navToggle = document.getElementById('navToggle');
const navLinks = document.querySelectorAll('.nav-link');
const scrollProgress = document.getElementById('scrollProgress');
const backToTop = document.getElementById('backToTop');

// ================= Navbar saat scroll + progress bar + tombol ke atas =================
function handleScroll() {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

  navbar.classList.toggle('scrolled', scrollTop > 40);
  scrollProgress.style.width = progress + '%';
  backToTop.classList.toggle('show', scrollTop > 600);
}
window.addEventListener('scroll', handleScroll, { passive: true });
handleScroll();

// ================= Menu navigasi mobile =================
navToggle.addEventListener('click', () => {
  navMenu.classList.toggle('active');
  navToggle.classList.toggle('active');
  document.body.classList.toggle('no-scroll');
});

// ================= Tombol navigasi: smooth scroll ke tiap bagian =================
function smoothScrollTo(targetId) {
  const target = document.querySelector(targetId);
  if (!target) return;
  const offset = navbar.offsetHeight - 1;
  const top = target.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top, behavior: 'smooth' });
}

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    smoothScrollTo(link.getAttribute('href'));
    navMenu.classList.remove('active');
    navToggle.classList.remove('active');
    document.body.classList.remove('no-scroll');
  });
});

backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// ================= Scrollspy: menandai tombol navigasi yang aktif =================
const spySections = document.querySelectorAll('section[id], header[id]');
const spyObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach((link) => {
          link.classList.toggle('active', link.dataset.section === id);
        });
      }
    });
  },
  { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
);
spySections.forEach((sec) => spyObserver.observe(sec));

// ================= Reveal saat scroll =================
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
);
revealEls.forEach((el) => revealObserver.observe(el));

// ================= Stempel di footer: animasi saat terlihat =================
const footerStempel = document.getElementById('footerStempel');
if (footerStempel) {
  const stempelObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('stamp-in');
          stempelObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.4 }
  );
  stempelObserver.observe(footerStempel);
}

// ================= Animasi angka statistik =================
function animateCounters() {
  document.querySelectorAll('.stat-number').forEach((el) => {
    const target = parseInt(el.dataset.count, 10) || 0;
    const duration = 1400;
    const start = performance.now();
    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * target).toLocaleString('id-ID');
      if (progress < 1) requestAnimationFrame(tick);
      else el.textContent = target.toLocaleString('id-ID');
    }
    requestAnimationFrame(tick);
  });
}

// ================= Tab Sistem Peradilan =================
const tabButtons = document.querySelectorAll('.tab-btn');
const tabPanels = document.querySelectorAll('.tab-panel');
tabButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    tabButtons.forEach((b) => b.classList.remove('active'));
    tabPanels.forEach((p) => p.classList.remove('active'));
    btn.classList.add('active');
    const panel = document.getElementById('tab-' + btn.dataset.tab);
    if (panel) panel.classList.add('active');
  });
});

// ================= Tahun berjalan di footer =================
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();
