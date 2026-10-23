(function () {
  // Reveal sections as they scroll in. Only elements below the first screen are hidden first, so the page is complete at rest.
  if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  document.documentElement.classList.add('js');
  var groups = ['.sec-head > *', '.services .col', '.steps li', '.carousel', '.products .col', '.band .wrap > div:first-child > *', '.link-row', '.fact', '.company .about', '.contact .side > *', '.contact form'];
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { rootMargin: '0px 0px -8% 0px' });
  groups.forEach(function (sel) {
    document.querySelectorAll(sel).forEach(function (el, i) {
      if (el.getBoundingClientRect().top < window.innerHeight) return;
      el.classList.add('rv');
      el.style.setProperty('--d', (i % 4) * 0.09 + 's');
      io.observe(el);
    });
  });
  var steps = document.querySelector('.steps');
  if (steps && steps.getBoundingClientRect().top >= window.innerHeight) { steps.classList.add('rv-line'); io.observe(steps); }
})();
(function () {
  var track = document.getElementById('car-track');
  var slides = track.querySelectorAll('.slide');
  var tabs = document.querySelectorAll('.car-tabs [data-go]');
  var prev = document.getElementById('car-prev'), next = document.getElementById('car-next');
  function current() { return Math.round(track.scrollLeft / track.clientWidth); }
  function go(i) { i = Math.max(0, Math.min(slides.length - 1, i)); track.scrollTo({ left: i * track.clientWidth }); }
  slides.forEach(function (sl, k) { var c = sl.querySelector('.count'); if (c) c.textContent = (k + 1) + ' / ' + slides.length; });
  function sync() {
    var i = current();
    tabs.forEach(function (t, k) { t.setAttribute('aria-selected', k === i ? 'true' : 'false'); });
    slides.forEach(function (sl, k) { sl.classList.toggle('active', k === i); });
    prev.disabled = i === 0; next.disabled = i === slides.length - 1;
  }
  tabs.forEach(function (t) { t.addEventListener('click', function () { go(+t.dataset.go); }); });
  prev.addEventListener('click', function () { go(current() - 1); });
  next.addEventListener('click', function () { go(current() + 1); });
  track.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowRight') { e.preventDefault(); go(current() + 1); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); go(current() - 1); }
  });
  track.addEventListener('scroll', function () { window.requestAnimationFrame(sync); }, { passive: true });
  sync();
})();
document.getElementById('contact-form').addEventListener('submit', function (e) {
  e.preventDefault();
  var note = document.getElementById('form-note');
  var missing = ['f-name', 'f-reach', 'f-msg'].filter(function (id) { return !document.getElementById(id).value.trim(); });
  if (missing.length) {
    note.textContent = 'Fill in your name, a way to reach you, and a message.';
    document.getElementById(missing[0]).focus();
    return;
  }
  var v = function (id) { return document.getElementById(id).value.trim(); };
  var text = 'Habari Mwendavano,\n\n' + v('f-msg') + '\n\nTopic: ' + v('f-topic') + '\nName: ' + v('f-name') + '\nContact: ' + v('f-reach');
  var url = 'https://wa.me/255789947608?text=' + encodeURIComponent(text);
  note.innerHTML = 'Opening WhatsApp. If nothing opens, <a href="' + url + '" target="_blank" rel="noopener">tap here</a> or message +255 789 947 608.';
  var w = window.open(url, '_blank');
  if (w) { w.opener = null; } else { window.location.href = url; }
});
