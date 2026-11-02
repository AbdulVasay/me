// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

// Theme toggle: remembers the visitor's choice; falls back to the OS setting.
// The saved theme is applied early by an inline script in <head> to avoid a flash.
(function () {
  const root = document.documentElement;
  document.getElementById("theme-toggle").addEventListener("click", function () {
    const isDark = root.dataset.theme
      ? root.dataset.theme === "dark"
      : matchMedia("(prefers-color-scheme: dark)").matches;
    const next = isDark ? "light" : "dark";
    root.dataset.theme = next;
    try { localStorage.setItem("theme", next); } catch (e) {}
  });
})();

// Mobile menu
(function () {
  const btn = document.getElementById("menu-toggle");
  const menu = document.getElementById("menu");
  btn.addEventListener("click", function () {
    const open = menu.classList.toggle("open");
    btn.setAttribute("aria-expanded", open);
  });
  menu.addEventListener("click", function (e) {
    if (e.target.tagName === "A") {
      menu.classList.remove("open");
      btn.setAttribute("aria-expanded", "false");
    }
  });
})();

// Nav border on scroll + active section link
(function () {
  const nav = document.querySelector(".nav");
  const links = document.querySelectorAll("#menu a");
  const onScroll = function () { nav.classList.toggle("scrolled", window.scrollY > 8); };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  if (!("IntersectionObserver" in window)) return;
  const spy = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      links.forEach(function (a) {
        a.classList.toggle("active", a.getAttribute("href") === "#" + entry.target.id);
      });
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  document.querySelectorAll("main section[id]").forEach(function (s) { spy.observe(s); });
})();

// Scroll reveal
(function () {
  const items = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) {
    items.forEach(function (el) { el.classList.add("in"); });
    return;
  }
  const io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("in");
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  items.forEach(function (el) { io.observe(el); });
})();

// Typing rotator in the hero
(function () {
  const el = document.querySelector(".rotator");
  if (!el) return;
  const words = el.dataset.words.split("|");
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
    el.textContent = words[0];
    return;
  }
  let w = 0, i = 0, deleting = false;
  (function tick() {
    const word = words[w];
    i += deleting ? -1 : 1;
    el.textContent = word.slice(0, i);
    let delay = deleting ? 35 : 70;
    if (!deleting && i === word.length) { deleting = true; delay = 1800; }
    else if (deleting && i === 0) { deleting = false; w = (w + 1) % words.length; delay = 300; }
    setTimeout(tick, delay);
  })();
})();
