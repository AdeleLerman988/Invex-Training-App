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
    'adele-1': 'spark',
    'adele-2': 'confetti'
  };

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

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { sync(current()); });
  } else {
    sync(current());
  }

  window.applyLook = apply;
})();
