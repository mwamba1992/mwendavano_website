// Hold the hero animation until the fonts are in, so it plays in the real typefaces (never longer than half a second).
(function () {
  var root = document.documentElement;
  if (!document.fonts || !window.matchMedia('(prefers-reduced-motion: no-preference)').matches) return;
  root.classList.add('wait');
  var go = function () { root.classList.remove('wait'); };
  document.fonts.ready.then(go);
  setTimeout(go, 500);
})();
