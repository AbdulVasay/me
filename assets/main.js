const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
const finePointer = matchMedia("(hover: hover) and (pointer: fine)").matches;

// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

// "ON AIR" intro sting: shown once per session, skipped for reduced motion.
(function () {
  const intro = document.getElementById("intro");
  let seen = false;
  try { seen = sessionStorage.getItem("introSeen") === "1"; } catch (e) {}
  if (reduceMotion || seen) { intro.remove(); return; }
  document.body.classList.add("intro-on");
  setTimeout(function () {
    intro.classList.add("done");
    document.body.classList.remove("intro-on");
    try { sessionStorage.setItem("introSeen", "1"); } catch (e) {}
    setTimeout(function () { intro.remove(); }, 700);
  }, 1500);
})();

// Background: drifting data-network of connected nodes.
(function () {
  const canvas = document.getElementById("net");
  const ctx = canvas.getContext("2d");
  let w, h, dpr, nodes = [];
  const mouse = { x: -9999, y: -9999 };
  const colors = ["139,92,246", "34,211,238", "244,63,94"];

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = canvas.width = innerWidth * dpr;
    h = canvas.height = innerHeight * dpr;
    const count = Math.min(90, Math.floor((innerWidth * innerHeight) / 16000));
    nodes = Array.from({ length: count }, function () {
      return {
        x: Math.random() * w, y: Math.random() * h,
        vx: (Math.random() - .5) * .35 * dpr, vy: (Math.random() - .5) * .35 * dpr,
        r: (Math.random() * 1.6 + .6) * dpr,
        c: colors[Math.floor(Math.random() * colors.length)]
      };
    });
  }

  function draw() {
    ctx.clearRect(0, 0, w, h);
    const max = 130 * dpr;
    for (let i = 0; i < nodes.length; i++) {
      const a = nodes[i];
      if (!reduceMotion) {
        a.x += a.vx; a.y += a.vy;
        if (a.x < 0 || a.x > w) a.vx *= -1;
        if (a.y < 0 || a.y > h) a.vy *= -1;
        // gentle pull towards the cursor
        const mx = mouse.x - a.x, my = mouse.y - a.y, md = Math.hypot(mx, my);
        if (md < 180 * dpr) { a.x += mx * .004; a.y += my * .004; }
      }
      for (let j = i + 1; j < nodes.length; j++) {
        const b = nodes[j];
        const d = Math.hypot(a.x - b.x, a.y - b.y);
        if (d < max) {
          ctx.strokeStyle = "rgba(" + a.c + "," + (1 - d / max) * .22 + ")";
          ctx.lineWidth = dpr * .8;
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
        }
      }
      ctx.fillStyle = "rgba(" + a.c + ",.8)";
      ctx.beginPath(); ctx.arc(a.x, a.y, a.r, 0, Math.PI * 2); ctx.fill();
    }
    if (!reduceMotion) requestAnimationFrame(draw);
  }

  addEventListener("resize", resize);
  addEventListener("mousemove", function (e) { mouse.x = e.clientX * dpr; mouse.y = e.clientY * dpr; });
  resize();
  draw();
})();

// Cursor glow + scroll progress + nav state
(function () {
  const root = document.documentElement;
  const glow = document.querySelector(".cursor-glow");
  const nav = document.querySelector(".nav");
  if (finePointer) {
    addEventListener("mousemove", function (e) {
      glow.style.setProperty("--mx", e.clientX + "px");
      glow.style.setProperty("--my", e.clientY + "px");
    });
  }
  function onScroll() {
    const max = root.scrollHeight - innerHeight;
    document.querySelector(".progress").style.setProperty("--p", max > 0 ? scrollY / max : 0);
    nav.classList.toggle("scrolled", scrollY > 8);
  }
  addEventListener("scroll", onScroll, { passive: true });
  onScroll();
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

// Active section highlight in nav
(function () {
  if (!("IntersectionObserver" in window)) return;
  const links = document.querySelectorAll("#menu a");
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

// Scroll reveal with a small stagger between siblings
(function () {
  const items = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) {
    items.forEach(function (el) { el.classList.add("in"); });
    return;
  }
  items.forEach(function (el) {
    const sibs = Array.prototype.filter.call(el.parentElement.children, function (c) { return c.classList.contains("reveal"); });
    el.style.setProperty("--d", Math.min(sibs.indexOf(el), 6) * 0.08 + "s");
  });
  const io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        const el = entry.target;
        el.classList.add("in");
        io.unobserve(el);
        // drop the stagger once revealed so hover effects respond instantly
        setTimeout(function () { el.style.removeProperty("--d"); }, 1400);
      }
    });
  }, { threshold: 0.12 });
  items.forEach(function (el) { io.observe(el); });
})();

// Count-up stats
(function () {
  const nums = document.querySelectorAll("[data-count]");
  function run(el) {
    const target = +el.dataset.count;
    if (reduceMotion) { el.textContent = target; return; }
    const start = performance.now(), dur = 1600;
    (function step(now) {
      const t = Math.min((now - start) / dur, 1);
      el.textContent = Math.round(target * (1 - Math.pow(1 - t, 3)));
      if (t < 1) requestAnimationFrame(step);
    })(start);
  }
  if (!("IntersectionObserver" in window)) { nums.forEach(run); return; }
  const io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) { run(entry.target); io.unobserve(entry.target); }
    });
  }, { threshold: 0.6 });
  nums.forEach(function (el) { io.observe(el); });
})();

// Typing rotator in the hero
(function () {
  const el = document.querySelector(".rotator");
  if (!el) return;
  const words = el.dataset.words.split("|");
  if (reduceMotion) { el.textContent = words[0]; return; }
  let w = 0, i = 0, deleting = false;
  (function tick() {
    const word = words[w];
    i += deleting ? -1 : 1;
    el.textContent = word.slice(0, i);
    let delay = deleting ? 30 : 65;
    if (!deleting && i === word.length) { deleting = true; delay = 1800; }
    else if (deleting && i === 0) { deleting = false; w = (w + 1) % words.length; delay = 300; }
    setTimeout(tick, delay);
  })();
})();

// Broadcast timecode on the hero monitor (HH:MM:SS:FF at 25 fps)
(function () {
  const el = document.getElementById("timecode");
  if (!el) return;
  const pad = function (n) { return String(n).padStart(2, "0"); };
  const t0 = performance.now();
  setInterval(function () {
    const f = Math.floor((performance.now() - t0) / 40);
    el.textContent = pad(Math.floor(f / 90000)) + ":" + pad(Math.floor(f / 1500) % 60) + ":" + pad(Math.floor(f / 25) % 60) + ":" + pad(f % 25);
  }, 40);
})();

// Pointer effects: spotlight cards, 3D tilt, magnetic buttons
(function () {
  if (!finePointer) return;

  document.querySelectorAll(".spot").forEach(function (el) {
    el.addEventListener("mousemove", function (e) {
      const r = el.getBoundingClientRect();
      el.style.setProperty("--x", e.clientX - r.left + "px");
      el.style.setProperty("--y", e.clientY - r.top + "px");
    });
  });

  if (reduceMotion) return;

  document.querySelectorAll(".tilt").forEach(function (el) {
    el.addEventListener("mousemove", function (e) {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - .5;
      const py = (e.clientY - r.top) / r.height - .5;
      el.style.transform = "perspective(900px) rotateX(" + (-py * 8) + "deg) rotateY(" + (px * 10) + "deg)";
    });
    el.addEventListener("mouseleave", function () { el.style.transform = ""; });
  });

  document.querySelectorAll(".magnetic").forEach(function (el) {
    el.addEventListener("mousemove", function (e) {
      const r = el.getBoundingClientRect();
      el.style.transform = "translate(" + (e.clientX - r.left - r.width / 2) * .2 + "px," + (e.clientY - r.top - r.height / 2) * .3 + "px)";
    });
    el.addEventListener("mouseleave", function () { el.style.transform = ""; });
  });
})();

// Timeline line fills as you scroll through it
(function () {
  const tl = document.querySelector(".timeline");
  if (!tl) return;
  function update() {
    const r = tl.getBoundingClientRect();
    const v = (innerHeight * .6 - r.top) / r.height;
    tl.style.setProperty("--fill", Math.max(0, Math.min(1, v)));
  }
  addEventListener("scroll", update, { passive: true });
  update();
})();

// Project filters
(function () {
  const buttons = document.querySelectorAll(".filter");
  const cards = document.querySelectorAll(".projects .card");
  buttons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      buttons.forEach(function (b) { b.classList.toggle("active", b === btn); });
      const f = btn.dataset.filter;
      cards.forEach(function (c) {
        const show = f === "all" || c.dataset.cat === f;
        c.classList.toggle("hide", !show);
        c.classList.remove("pop");
        if (show) { void c.offsetWidth; c.classList.add("pop"); }
      });
    });
  });
})();
