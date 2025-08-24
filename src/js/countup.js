function animateCount(el, target, duration = 3000) {
  const startTime = performance.now();

  function update(currentTime) {
    const progress = Math.min((currentTime - startTime) / duration, 1);
    const value = Math.floor(progress * target);
    el.textContent = value.toLocaleString(); // add commas

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      el.textContent = target.toLocaleString(); // ensure final value
    }
  }

  requestAnimationFrame(update);
}

document.addEventListener("DOMContentLoaded", () => {
  const counters = document.querySelectorAll(".countup");

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.getAttribute("data-countup"), 10);
          animateCount(el, target);
          obs.unobserve(el);
        }
      });
    },
    { threshold: 0.6 }
  );

  counters.forEach((el) => observer.observe(el));
});
