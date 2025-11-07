// Footer year
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* ========= Scroll reveal: add data-reveal to elements you want animated ========= */
const revealables = document.querySelectorAll("[data-reveal]");
if ("IntersectionObserver" in window && revealables.length){
  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach(e => {
      if (e.isIntersecting){
        e.target.classList.add("reveal-in");
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -10% 0px" });
  revealables.forEach(el => io.observe(el));
} else {
  // fallback
  revealables.forEach(el => el.classList.add("reveal-in"));
}

/* ========= Button ripple (subtle) ========= */
document.addEventListener("click", (e) => {
  const btn = e.target.closest(".btn");
  if (!btn) return;
  const r = document.createElement("span");
  const rect = btn.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  r.style.position = "absolute";
  r.style.width = r.style.height = size + "px";
  r.style.left = e.clientX - rect.left - size/2 + "px";
  r.style.top  = e.clientY - rect.top  - size/2 + "px";
  r.style.borderRadius = "50%";
  r.style.background = "rgba(255,255,255,.18)";
  r.style.transform = "scale(0)";
  r.style.transition = "transform .45s ease, opacity .6s ease";
  btn.appendChild(r);
  requestAnimationFrame(() => r.style.transform = "scale(1.6)");
  setTimeout(() => { r.style.opacity = "0"; setTimeout(()=> r.remove(), 250) }, 230);
});

/* ========= Contact form demo handler ========= */
const form = document.getElementById("contactForm");
if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const { name, email, message } = form;
    const status = document.getElementById("formStatus");
    if (![name.value.trim(), email.value.trim(), message.value.trim()].every(Boolean)){
      status.textContent = "Please fill all fields.";
      return;
    }
    status.textContent = "Thanks! Your message was sent ❤️ .";
    form.reset();
  });
}
