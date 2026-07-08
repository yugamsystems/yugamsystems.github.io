/* Yugam design-v2 enhancement layer — ambient constellation + page effects.
   Progressive: every feature degrades gracefully if its target is absent. */
(function () {
    'use strict';

    var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* ===== Ambient constellation =============================================
       Like the homepage constellation but without mouse tracking — suitable
       for inner-page heroes where content legibility matters more. */
    function ambientConstellation() {
        if (reducedMotion) return;
        var hosts = document.querySelectorAll('[data-constellation-ambient]');
        if (!hosts.length) return;

        hosts.forEach(function (host) {
            var canvas = document.createElement('canvas');
            canvas.className = 'yg-constellation';
            canvas.setAttribute('aria-hidden', 'true');
            host.insertBefore(canvas, host.firstChild);

            var ctx = canvas.getContext('2d');
            var dpr = Math.min(window.devicePixelRatio || 1, 2);
            var W = 0, H = 0, nodes = [];
            var LINK = 120;
            var running = true, raf = null;

            function resize() {
                W = host.clientWidth;
                H = host.clientHeight;
                canvas.width = W * dpr;
                canvas.height = H * dpr;
                canvas.style.width = W + 'px';
                canvas.style.height = H + 'px';
                ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
                var target = Math.min(45, Math.floor((W * H) / (window.innerWidth < 768 ? 32000 : 22000)));
                while (nodes.length < target) nodes.push(spawn());
                nodes.length = target;
            }

            function spawn() {
                return {
                    x: Math.random() * W,
                    y: Math.random() * H,
                    vx: (Math.random() - 0.5) * 0.22,
                    vy: (Math.random() - 0.5) * 0.22,
                    r: 1 + Math.random() * 1.4
                };
            }

            function step() {
                if (!running) return;
                ctx.clearRect(0, 0, W, H);
                var i, j, a, b, d, dx, dy, alpha;

                for (i = 0; i < nodes.length; i++) {
                    a = nodes[i];
                    a.x += a.vx; a.y += a.vy;
                    if (a.x < -10) a.x = W + 10;
                    else if (a.x > W + 10) a.x = -10;
                    if (a.y < -10) a.y = H + 10;
                    else if (a.y > H + 10) a.y = -10;
                }

                ctx.lineWidth = 1;
                for (i = 0; i < nodes.length; i++) {
                    a = nodes[i];
                    for (j = i + 1; j < nodes.length; j++) {
                        b = nodes[j];
                        dx = a.x - b.x; dy = a.y - b.y;
                        d = dx * dx + dy * dy;
                        if (d < LINK * LINK) {
                            alpha = (1 - Math.sqrt(d) / LINK) * 0.18;
                            ctx.strokeStyle = 'rgba(139,105,20,' + alpha.toFixed(3) + ')';
                            ctx.beginPath();
                            ctx.moveTo(a.x, a.y);
                            ctx.lineTo(b.x, b.y);
                            ctx.stroke();
                        }
                    }
                }

                for (i = 0; i < nodes.length; i++) {
                    a = nodes[i];
                    ctx.fillStyle = 'rgba(139,105,20,0.4)';
                    ctx.beginPath();
                    ctx.arc(a.x, a.y, a.r, 0, Math.PI * 2);
                    ctx.fill();
                }

                raf = requestAnimationFrame(step);
            }

            window.addEventListener('resize', resize);

            new IntersectionObserver(function (entries) {
                var visible = entries[0].isIntersecting;
                if (visible && !running) { running = true; step(); }
                else if (!visible && running) {
                    running = false;
                    if (raf) cancelAnimationFrame(raf);
                }
            }).observe(host);

            resize();
            step();
        });
    }

    /* ===== Page-load reveal ================================================
       Fades the body in from transparent on first paint — eliminates any
       flash of unstyled content on slower connections. */
    function pageReveal() {
        if (reducedMotion) return;
        document.documentElement.style.opacity = '0';
        document.documentElement.style.transition = 'opacity .45s ease';
        requestAnimationFrame(function () {
            requestAnimationFrame(function () {
                document.documentElement.style.opacity = '1';
            });
        });
    }

    /* ===== Homepage headline word reveal =======================================
       Splits the hero h1 into per-word spans and staggers them in with a
       translateY slide, matching the prototype's line-reveal intent while
       staying robust across all viewport widths. Homepage only. */
    function headlineWordReveal() {
        if (reducedMotion) return;
        var h1 = document.querySelector('.hero[data-constellation] .hero__headline');
        if (!h1) return;

        // Take over from the generic reveal system
        h1.classList.remove('reveal', 'reveal-delay-1');
        h1.style.opacity = '1';

        var words = [];
        var children = Array.prototype.slice.call(h1.childNodes);
        h1.innerHTML = '';

        children.forEach(function (node) {
            if (node.nodeType === 3) { // plain text
                var parts = node.textContent.split(/(\s+)/);
                parts.forEach(function (part) {
                    if (!part) return;
                    if (/^\s+$/.test(part)) {
                        h1.appendChild(document.createTextNode(part));
                    } else {
                        var span = document.createElement('span');
                        span.className = 'hw';
                        span.textContent = part;
                        h1.appendChild(span);
                        words.push(span);
                    }
                });
            } else { // element node (em, strong…)
                var wrap = document.createElement('span');
                wrap.className = 'hw';
                wrap.appendChild(node);
                h1.appendChild(wrap);
                words.push(wrap);
            }
        });

        words.forEach(function (word, i) {
            setTimeout(function () { word.classList.add('hw--vis'); }, 180 + i * 85);
        });
    }

    /* ===== Hero scroll cue ====================================================
       Injects a pulsing teak line at the bottom of the homepage hero.
       Fades out once the user starts scrolling. */
    function scrollCue() {
        if (reducedMotion) return;
        var hero = document.querySelector('.hero[data-constellation]');
        if (!hero) return;

        var cue = document.createElement('div');
        cue.className = 'hero__scroll-cue';
        cue.innerHTML = '<div class="hero__scroll-cue__bar"></div>';
        hero.appendChild(cue);

        window.addEventListener('scroll', function () {
            cue.style.opacity = window.scrollY > 80 ? '0' : '1';
        }, { passive: true });
    }

    pageReveal();
    ambientConstellation();
    headlineWordReveal();
    scrollCue();

})();
