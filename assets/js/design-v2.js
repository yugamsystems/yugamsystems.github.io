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

    pageReveal();
    ambientConstellation();

})();
