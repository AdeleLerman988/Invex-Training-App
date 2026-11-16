/* Theme switcher. The blocking head script applies the saved look before paint.
   This file only wires the control and live swaps. */
(function () {
  var LOOKS = {
    original: 'themes/original.css',
    'adele-1': 'themes/steel-warehouse-training.css',
    'adele-2': 'themes/adele-2.css'
  };
  var CELEB = {
    original: 'original',
    'adele-1': 'sparks',
    'adele-2': 'confetti'
  };
  var FOUNDRY = 'themes/steel-warehouse-training-dark.css';

  function current() {
    var key = document.documentElement.getAttribute('data-look');
    return LOOKS[key] ? key : 'adele-1';
  }

  function sync(key) {
    var group = document.querySelector('.look-switch');
    if (!group) return;
    var buttons = group.querySelectorAll('[role="radio"]');
    Array.prototype.forEach.call(buttons, function (btn) {
      var on = btn.getAttribute('data-look') === key;
      btn.setAttribute('aria-checked', on ? 'true' : 'false');
      btn.tabIndex = on ? 0 : -1;
    });
  }

  function apply(key) {
    if (!LOOKS[key]) key = 'adele-1';
    var link = document.getElementById('invex-theme');
    document.documentElement.setAttribute('data-look', key);
    document.documentElement.setAttribute('data-quiz-celebrate', CELEB[key]);
    try { localStorage.setItem('invex_look', key); } catch (e) {}
    if (link && link.getAttribute('href') !== LOOKS[key]) link.setAttribute('href', LOOKS[key]);
    sync(key);
    syncFoundry();
    if (typeof window.drawWheel === 'function') {
      try { window.drawWheel(); } catch (e) {}
    }
    if (typeof window.GC !== 'undefined' && typeof window.activeGroup !== 'undefined') {
      document.querySelectorAll('.gf-btn').forEach(function (btn) {
        btn.style.background = '';
        btn.style.borderColor = '';
        btn.style.color = '';
      });
      var active = document.getElementById('gf-' + window.activeGroup);
      var tone = window.GC[window.activeGroup];
      if (active && tone) {
        active.style.background = tone.bg;
        active.style.borderColor = tone.bc;
        active.style.color = tone.tc;
      }
    }
  }

  function move(dir) {
    var order = ['original', 'adele-1', 'adele-2'];
    var i = order.indexOf(current());
    if (i < 0) i = 1;
    var next = order[(i + dir + order.length) % order.length];
    apply(next);
    var btn = document.querySelector('.look-switch [data-look="' + next + '"]');
    if (btn) btn.focus();
  }

  document.addEventListener('click', function (e) {
    var btn = e.target.closest && e.target.closest('.look-switch [data-look]');
    if (!btn) return;
    apply(btn.getAttribute('data-look'));
  });

  document.addEventListener('keydown', function (e) {
    var group = e.target.closest && e.target.closest('.look-switch');
    if (!group) return;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') { e.preventDefault(); move(1); }
    else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { e.preventDefault(); move(-1); }
    else if (e.key === 'Home') { e.preventDefault(); apply('original'); document.querySelector('.look-switch [data-look="original"]').focus(); }
    else if (e.key === 'End') { e.preventDefault(); apply('adele-2'); document.querySelector('.look-switch [data-look="adele-2"]').focus(); }
  });

  function foundryOn() {
    return current() === 'adele-1' && document.documentElement.getAttribute('data-theme') === 'dark';
  }

  function syncFoundry() {
    var link = document.getElementById('invex-theme-dark');
    var on = foundryOn();
    if (on) {
      if (!link) {
        link = document.createElement('link');
        link.id = 'invex-theme-dark';
        link.rel = 'stylesheet';
        var theme = document.getElementById('invex-theme');
        if (theme && theme.parentNode) theme.parentNode.insertBefore(link, theme.nextSibling);
        else document.head.appendChild(link);
      }
      if (link.getAttribute('href') !== FOUNDRY) link.setAttribute('href', FOUNDRY);
    } else if (link && link.parentNode) {
      link.parentNode.removeChild(link);
    }
    var logos = document.querySelectorAll('.sw-logo-img, .sw-login-logo');
    Array.prototype.forEach.call(logos, function (img) {
      if (!img.getAttribute('data-logo-light')) img.setAttribute('data-logo-light', img.getAttribute('src'));
      var next = on ? 'assets/logo-footer.svg' : img.getAttribute('data-logo-light');
      if (next && img.getAttribute('src') !== next) img.setAttribute('src', next);
    });
  }

  function placeSwitcher() {
    var sw = document.querySelector('.look-switch');
    var actions = document.querySelector('.sw-util-actions');
    if (!sw) return;
    var phone = window.matchMedia('(max-width: 767px)').matches;
    if (phone && actions) {
      if (sw.parentNode !== actions) actions.appendChild(sw);
      sw.classList.add('is-in-menu');
    } else {
      if (sw.parentNode !== document.body) document.body.appendChild(sw);
      sw.classList.remove('is-in-menu');
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { sync(current()); syncFoundry(); placeSwitcher(); });
  } else {
    sync(current());
    syncFoundry();
    placeSwitcher();
  }
  window.addEventListener('resize', placeSwitcher);

  window.applyLook = apply;
  window.syncFoundry = syncFoundry;
  window.placeSwitcher = placeSwitcher;
})();
