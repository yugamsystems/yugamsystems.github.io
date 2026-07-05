/* Yugam enhancement layer — progressive, dependency-free.
   Every feature checks for its target and degrades to nothing if absent. */
(function () {
    'use strict';

    var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* ================= 1. Constellation hero =================
       Expands the Yugam logo — nodes joined by lines — into a living
       field behind any section marked data-constellation. */
    function constellation() {
        if (reducedMotion) return;
        var host = document.querySelector('[data-constellation]');
        if (!host) return;

        var canvas = document.createElement('canvas');
        canvas.className = 'yg-constellation';
        canvas.setAttribute('aria-hidden', 'true');
        host.insertBefore(canvas, host.firstChild);

        var ctx = canvas.getContext('2d');
        var dpr = Math.min(window.devicePixelRatio || 1, 2);
        var W = 0, H = 0, nodes = [], mouse = { x: -9999, y: -9999 };
        var LINK = 130, MOUSE_LINK = 160;
        var running = true, raf = null;

        function resize() {
            W = host.clientWidth; H = host.clientHeight;
            canvas.width = W * dpr; canvas.height = H * dpr;
            canvas.style.width = W + 'px'; canvas.style.height = H + 'px';
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            var target = Math.min(70, Math.floor((W * H) / (window.innerWidth < 768 ? 26000 : 17000)));
            while (nodes.length < target) nodes.push(spawn());
            nodes.length = target;
        }

        function spawn() {
            return {
                x: Math.random() * W,
                y: Math.random() * H,
                vx: (Math.random() - 0.5) * 0.35,
                vy: (Math.random() - 0.5) * 0.35,
                r: 1.2 + Math.random() * 1.8
            };
        }

        function step() {
            if (!running) return;
            ctx.clearRect(0, 0, W, H);
            var i, j, a, b, d, dx, dy, alpha;

            for (i = 0; i < nodes.length; i++) {
                a = nodes[i];
                a.x += a.vx; a.y += a.vy;
                if (a.x < -10) a.x = W + 10; else if (a.x > W + 10) a.x = -10;
                if (a.y < -10) a.y = H + 10; else if (a.y > H + 10) a.y = -10;
            }

            ctx.lineWidth = 1;
            for (i = 0; i < nodes.length; i++) {
                a = nodes[i];
                for (j = i + 1; j < nodes.length; j++) {
                    b = nodes[j];
                    dx = a.x - b.x; dy = a.y - b.y;
                    d = dx * dx + dy * dy;
                    if (d < LINK * LINK) {
                        alpha = (1 - Math.sqrt(d) / LINK) * 0.24;
                        ctx.strokeStyle = 'rgba(139,105,20,' + alpha.toFixed(3) + ')';
                        ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
                    }
                }
                dx = a.x - mouse.x; dy = a.y - mouse.y;
                d = dx * dx + dy * dy;
                if (d < MOUSE_LINK * MOUSE_LINK) {
                    alpha = (1 - Math.sqrt(d) / MOUSE_LINK) * 0.35;
                    ctx.strokeStyle = 'rgba(139,105,20,' + alpha.toFixed(3) + ')';
                    ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(mouse.x, mouse.y); ctx.stroke();
                }
            }

            for (i = 0; i < nodes.length; i++) {
                a = nodes[i];
                ctx.fillStyle = 'rgba(139,105,20,0.55)';
                ctx.beginPath(); ctx.arc(a.x, a.y, a.r, 0, Math.PI * 2); ctx.fill();
            }
            raf = requestAnimationFrame(step);
        }

        host.addEventListener('mousemove', function (e) {
            var rect = host.getBoundingClientRect();
            mouse.x = e.clientX - rect.left; mouse.y = e.clientY - rect.top;
        });
        host.addEventListener('mouseleave', function () { mouse.x = -9999; mouse.y = -9999; });
        window.addEventListener('resize', resize);

        new IntersectionObserver(function (entries) {
            var visible = entries[0].isIntersecting;
            if (visible && !running) { running = true; step(); }
            else if (!visible && running) { running = false; if (raf) cancelAnimationFrame(raf); }
        }).observe(host);

        resize();
        step();
    }

    /* ================= 2. Count-up metrics =================
       Animates the number inside .metric__value / [data-count]
       the first time it scrolls into view. "68%" counts 0→68,
       "24 min" counts 0→24; prefix/suffix text is preserved. */
    function countUp() {
        var els = document.querySelectorAll('.metric__value, [data-count]');
        if (!els.length) return;

        var run = function (el) {
            var text = el.textContent;
            var m = text.match(/([\d][\d,.]*)/);
            if (!m) return;
            var target = parseFloat(m[1].replace(/,/g, ''));
            if (isNaN(target)) return;
            if (reducedMotion) return; /* leave final value as-is */
            var prefix = text.slice(0, m.index);
            var suffix = text.slice(m.index + m[1].length);
            var decimals = (m[1].split('.')[1] || '').length;
            var t0 = null, DUR = 1100;
            function frame(ts) {
                if (!t0) t0 = ts;
                var p = Math.min((ts - t0) / DUR, 1);
                var eased = 1 - Math.pow(1 - p, 3);
                el.textContent = prefix + (target * eased).toFixed(decimals) + suffix;
                if (p < 1) requestAnimationFrame(frame);
                else el.textContent = text;
            }
            requestAnimationFrame(frame);
            /* Failsafe: rAF pauses in background tabs — guarantee the exact
               original text lands even if the animation never finishes. */
            setTimeout(function () { el.textContent = text; }, DUR + 400);
        };

        var seen = new WeakSet();
        var io = new IntersectionObserver(function (entries) {
            entries.forEach(function (en) {
                if (en.isIntersecting && !seen.has(en.target)) {
                    seen.add(en.target);
                    run(en.target);
                    io.unobserve(en.target);
                }
            });
        }, { threshold: 0.4 });
        els.forEach(function (el) { io.observe(el); });
    }

    /* ================= 3. Scroll reveal, sitewide =================
       Honors the homepage's existing .reveal classes and auto-tags
       the card grids on every other page. */
    function reveals() {
        var autoTargets = document.querySelectorAll(
            '.stack-card, .beyond-card, .education-card, .total-card, ' +
            '.prompt-card, .faq__item, .insight-card, .case-card'
        );
        autoTargets.forEach(function (el, i) {
            /* Only hide elements safely below the fold — anything visible
               (or nearly visible) at load stays visible. */
            if (!el.classList.contains('reveal') &&
                el.getBoundingClientRect().top > window.innerHeight * 0.9) {
                el.classList.add('yg-reveal');
                el.style.transitionDelay = Math.min((i % 6) * 70, 350) + 'ms';
            }
        });

        var els = document.querySelectorAll('.yg-reveal, .reveal');
        if (!els.length) return;
        if (reducedMotion) {
            els.forEach(function (el) { el.classList.add('yg-visible', 'visible'); });
            return;
        }
        var io = new IntersectionObserver(function (entries) {
            entries.forEach(function (en) {
                if (en.isIntersecting) {
                    en.target.classList.add('yg-visible', 'visible');
                    io.unobserve(en.target);
                }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
        els.forEach(function (el) { io.observe(el); });
    }

    /* ================= 4. Reading progress =================
       Thin teak bar on long-form pages (articles, FAQ). */
    function progress() {
        if (!document.querySelector('.article, .faq')) return;
        var bar = document.createElement('div');
        bar.className = 'yg-progress';
        document.body.appendChild(bar);
        var update = function () {
            var doc = document.documentElement;
            var max = doc.scrollHeight - window.innerHeight;
            bar.style.width = (max > 0 ? (window.scrollY / max) * 100 : 0) + '%';
        };
        window.addEventListener('scroll', update, { passive: true });
        update();
    }

    function init() {
        constellation();
        countUp();
        reveals();
        progress();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
