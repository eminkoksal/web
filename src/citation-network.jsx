/* The citation network band on the home page (Emin Style v1.2).

   Data: public/assets/citation-network.json, a precomputed layout of the
   citation network from "The Intellectual DNA of the Turkish Competition
   Board" (SSRN 2026): the largest connected component among the Board's own
   decisions, 5,359 decisions and 15,689 citations. x is the decision date
   (1998 to 2025), y a one-dimensional force layout, d the number of times a
   decision is cited, e the citation pairs (citing, cited), top the twelve most
   cited decisions. The file is fetched only when the band nears the viewport.

   The drawing is plain canvas, outside React: three stacked layers (edges,
   nodes, an overlay for the time line, the travelling citations and hover). */
import React from 'react';

const { useEffect, useRef } = React;

const PAPER = '245,242,235';
const CORAL = '#F37338';
const TAU = Math.PI * 2;
const easeInOut = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const fmt = (n) => Math.round(n).toLocaleString('en-US');

function mountNetwork(band, D, total) {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const q = (sel) => band.querySelector(sel);
  const cE = q('[data-layer="edges"]'), cN = q('[data-layer="nodes"]'), cO = q('[data-layer="over"]');
  const gE = cE.getContext('2d'), gN = cN.getContext('2d'), gO = cO.getContext('2d');
  const tip = q('.hm-net__tip'), tag = q('.hm-net__tag'), axis = q('.hm-net__axis');
  const cursorEl = q('.hm-net__cursor'), numEl = q('.hm-net__num'), headEl = q('.hm-net__head'), noteEl = q('.hm-net__note');
  const N = D.n, M = D.m, X = D.x, Y = D.y, DEG = D.d, E = D.e;
  const DUR = 4200;

  const isTop = new Uint8Array(N);
  D.top.forEach((i) => { isTop[i] = 1; });
  const px = new Float32Array(N), py = new Float32Array(N), pr = new Float32Array(N);
  const adj = Array.from({ length: N }, () => []);
  for (let k = 0; k < M; k++) { adj[E[2 * k]].push(k); adj[E[2 * k + 1]].push(k); }
  /* an edge can be drawn once both of its decisions exist; nodes are sorted by date */
  const when = (k) => Math.max(E[2 * k], E[2 * k + 1]);
  const order = Array.from({ length: M }, (_, k) => k).sort((a, b) => when(a) - when(b));
  let maxAbsY = 0;
  for (let i = 0; i < N; i++) maxAbsY = Math.max(maxAbsY, Math.abs(Y[i]));

  let w = 0, h = 0, padX = 0, sx = 1, cy = 0, lineEnd = 0;
  let nodeAt = 0, edgeAt = 0, state = 'idle', t0 = 0, visible = false, hover = -1, running = false, raf = 0, dead = false;
  const pulses = [];

  function layout() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = band.clientWidth; h = band.clientHeight;
    [cE, cN, cO].forEach((c) => { c.width = Math.round(w * dpr); c.height = Math.round(h * dpr); });
    [gE, gN, gO].forEach((g) => g.setTransform(dpr, 0, 0, dpr, 0, 0));
    const small = w < 700;
    padX = Math.max(18, w * 0.035);
    sx = (w - 2 * padX) / D.w;
    const head = headEl.getBoundingClientRect().bottom - band.getBoundingClientRect().top;
    const axisB = 16 + noteEl.offsetHeight + 12;
    axis.style.bottom = axisB + 'px';
    cursorEl.style.bottom = (axisB + 28) + 'px';
    lineEnd = h - axisB - 50;
    const top = head + 30, bottom = h - axisB - 62;
    const half = Math.max(60, (bottom - top) / 2);
    const sy = small ? half / maxAbsY : Math.min(sx * 2.1, half / maxAbsY);
    cy = top + half;
    for (let i = 0; i < N; i++) {
      px[i] = padX + X[i] * sx;
      py[i] = cy + Y[i] * sy;
      pr[i] = Math.max(small ? 0.6 : 0.8, (0.5 + 0.76 * Math.sqrt(DEG[i])) * Math.max(sx, 0.5));
    }
    axis.textContent = '';
    for (let yr = 1998; yr <= 2025; yr += 3) {
      const s = document.createElement('span');
      s.textContent = yr;
      s.style.left = (padX + (yr + 0.5 - D.t0) / (D.t1 - D.t0) * (w - 2 * padX)) + 'px';
      axis.appendChild(s);
    }
    /* the label on the most cited decision: a leader out of the swarm, text beside it */
    const m = D.top[0], down = py[m] >= cy, end = down ? bottom + 22 : top - 22;
    tag.querySelector('i').textContent = Math.floor(D.t0 + X[m] / D.w * (D.t1 - D.t0)) + ' · cited ' + DEG[m] + ' times';
    const flip = px[m] + tag.offsetWidth + 12 > w;
    tag.classList.toggle('is-up', !down);
    tag.classList.toggle('is-flip', flip);
    tag.style.left = (flip ? px[m] - tag.offsetWidth + 0.5 : px[m] - 0.5) + 'px';
    tag.style.top = (down ? py[m] + pr[m] + 3 : end) + 'px';
    tag.style.height = Math.max(12, Math.abs(end - py[m]) - pr[m] - 3) + 'px';
  }

  function drawEdges(from, to) {
    if (to <= from) return;
    gE.beginPath();
    for (let i = from; i < to; i++) {
      const k = order[i], a = E[2 * k], b = E[2 * k + 1];
      gE.moveTo(px[a], py[a]); gE.lineTo(px[b], py[b]);
    }
    gE.strokeStyle = `rgba(${PAPER},${w < 700 ? 0.05 : 0.095})`;
    gE.lineWidth = w < 700 ? 0.4 : 0.6;
    gE.stroke();
  }
  function dots(from, to, style, pick) {
    gN.fillStyle = style; gN.beginPath();
    for (let i = from; i < to; i++) if (pick(i)) { gN.moveTo(px[i] + pr[i], py[i]); gN.arc(px[i], py[i], pr[i], 0, TAU); }
    gN.fill();
  }
  function drawNodes(from, to) {
    dots(from, to, `rgba(${PAPER},${w < 700 ? 0.4 : 0.62})`, (i) => !isTop[i] && DEG[i] < 3);
    dots(from, to, `rgba(${PAPER},.92)`, (i) => !isTop[i] && DEG[i] >= 3);
    dots(from, to, CORAL, (i) => isTop[i]);
  }
  function drawAll() {
    gE.clearRect(0, 0, w, h); gN.clearRect(0, 0, w, h);
    drawEdges(0, edgeAt); drawNodes(0, nodeAt);
  }
  function finish() {
    nodeAt = N; edgeAt = M; state = 'done';
    drawAll();
    cursorEl.style.opacity = 0; tag.style.opacity = 1;
    numEl.textContent = fmt(total);
  }

  function frame(now) {
    if (dead) return;
    if (state === 'reveal') {
      const p = Math.min(1, (now - t0) / DUR), e = easeInOut(p), cx = e * D.w;
      const n0 = nodeAt, e0 = edgeAt;
      while (nodeAt < N && X[nodeAt] <= cx) nodeAt++;
      while (edgeAt < M && when(order[edgeAt]) < nodeAt) edgeAt++;
      drawEdges(e0, edgeAt); drawNodes(n0, nodeAt);
      numEl.textContent = fmt(total * (edgeAt / M));
      cursorEl.style.opacity = p < 0.97 ? 1 : 0;
      cursorEl.style.left = (padX + cx * sx) + 'px';
      cursorEl.textContent = Math.min(2025, Math.floor(D.t0 + e * (D.t1 - D.t0)));
      if (p >= 1) finish();
    }
    gO.clearRect(0, 0, w, h);
    if (state === 'reveal') {
      /* the time line sweeping from 1998 to 2025 */
      const lx = padX + easeInOut(Math.min(1, (now - t0) / DUR)) * D.w * sx;
      gO.strokeStyle = 'rgba(243,115,56,.55)'; gO.lineWidth = 1;
      gO.beginPath(); gO.moveTo(lx, cy - maxAbsY * 2.2 * sx); gO.lineTo(lx, lineEnd); gO.stroke();
    }
    if (state === 'done' && !reduce) {
      /* citations travelling from the citing decision back to the cited one */
      if (pulses.length < 16 && Math.random() < 0.2) {
        const k = (Math.random() * M) | 0;
        pulses.push({ a: E[2 * k], b: E[2 * k + 1], s: now, d: 1100 + Math.random() * 1500 });
      }
      for (let i = pulses.length - 1; i >= 0; i--) {
        const u = pulses[i], t = (now - u.s) / u.d;
        if (t >= 1) { pulses.splice(i, 1); continue; }
        const tt = easeInOut(t), t2 = Math.max(0, tt - 0.16), al = Math.sin(Math.PI * t);
        const ax = px[u.a], ay = py[u.a], bx = px[u.b], by = py[u.b];
        gO.strokeStyle = `rgba(243,115,56,${0.75 * al})`; gO.lineWidth = 1.2;
        gO.beginPath(); gO.moveTo(ax + (bx - ax) * t2, ay + (by - ay) * t2); gO.lineTo(ax + (bx - ax) * tt, ay + (by - ay) * tt); gO.stroke();
        gO.fillStyle = `rgba(243,115,56,${al})`;
        gO.beginPath(); gO.arc(ax + (bx - ax) * tt, ay + (by - ay) * tt, 2, 0, TAU); gO.fill();
      }
    }
    if (hover > -1 && state === 'done') {
      const es = adj[hover];
      gO.strokeStyle = 'rgba(243,115,56,.85)'; gO.lineWidth = 1; gO.beginPath();
      for (const k of es) { gO.moveTo(px[E[2 * k]], py[E[2 * k]]); gO.lineTo(px[E[2 * k + 1]], py[E[2 * k + 1]]); }
      gO.stroke();
      gO.fillStyle = CORAL; gO.beginPath();
      for (const k of es) {
        const o = E[2 * k] === hover ? E[2 * k + 1] : E[2 * k];
        gO.moveTo(px[o] + pr[o] + 1, py[o]); gO.arc(px[o], py[o], pr[o] + 1, 0, TAU);
      }
      gO.moveTo(px[hover] + pr[hover] + 2.5, py[hover]); gO.arc(px[hover], py[hover], pr[hover] + 2.5, 0, TAU);
      gO.fill();
    }
    if (visible && (state === 'reveal' || (state === 'done' && (!reduce || hover > -1)))) raf = requestAnimationFrame(frame);
    else running = false;
  }
  function kick() { if (!running && !dead) { running = true; raf = requestAnimationFrame(frame); } }

  layout();
  if (reduce) finish(); else numEl.textContent = '0';
  band.classList.add('is-ready');

  const io = new IntersectionObserver((en) => {
    visible = en[0].isIntersecting;
    if (visible && state === 'idle' && en[0].intersectionRatio > 0.3) { state = 'reveal'; t0 = performance.now(); }
    if (visible) kick();
  }, { threshold: [0, 0.3, 0.6] });
  io.observe(band);

  let rt = 0;
  const onResize = () => { clearTimeout(rt); rt = setTimeout(() => { layout(); drawAll(); kick(); }, 120); };
  window.addEventListener('resize', onResize);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => { if (!dead) { layout(); drawAll(); } });

  const onMove = (ev) => {
    if (state !== 'done') return;
    const r = band.getBoundingClientRect(), mx = ev.clientX - r.left, my = ev.clientY - r.top;
    let best = -1, bd = 1e9;
    for (let i = 0; i < N; i++) {
      const dx = px[i] - mx;
      if (dx > 16 || dx < -16) continue;
      const dy = py[i] - my, d = Math.sqrt(dx * dx + dy * dy) - pr[i];
      if (d < bd) { bd = d; best = i; }
    }
    hover = bd < 9 ? best : -1;
    if (hover > -1) {
      const yr = Math.floor(D.t0 + X[hover] / D.w * (D.t1 - D.t0)), c = DEG[hover];
      tip.firstChild.textContent = 'Decision ' + D.id[hover];
      tip.lastChild.textContent = yr + ' · cited ' + c + (c === 1 ? ' time' : ' times');
      tip.style.left = Math.min(w - 230, px[hover] + 16) + 'px';
      tip.style.top = (py[hover] - 52) + 'px';
      tip.style.opacity = 1;
      band.style.cursor = 'crosshair';
    } else { tip.style.opacity = 0; band.style.cursor = ''; }
    kick();
  };
  const onLeave = () => { hover = -1; tip.style.opacity = 0; kick(); };
  band.addEventListener('mousemove', onMove);
  band.addEventListener('mouseleave', onLeave);

  return () => {
    dead = true; cancelAnimationFrame(raf); clearTimeout(rt); io.disconnect();
    window.removeEventListener('resize', onResize);
    band.removeEventListener('mousemove', onMove);
    band.removeEventListener('mouseleave', onLeave);
  };
}

/* total: the headline figure, counted up as the network draws.
   tag: the label for the most cited decision (its year and count are read from the data).
   children: the right-hand text and buttons. */
function CitationNetwork({ src = 'assets/citation-network.json', total, eyebrow, tag, note, children }) {
  const ref = useRef(null);
  useEffect(() => {
    const band = ref.current;
    let unmount = null, gone = false;
    const load = () => {
      fetch(src)
        .then((r) => { if (!r.ok) throw new Error(r.status); return r.json(); })
        .then((data) => { if (!gone) unmount = mountNetwork(band, data, total); })
        .catch(() => { band.classList.add('is-ready'); });   /* no data: the figure and the text still stand */
    };
    const io = new IntersectionObserver((en) => {
      if (en[0].isIntersecting) { io.disconnect(); load(); }
    }, { rootMargin: '900px 0px' });
    io.observe(band);
    return () => { gone = true; io.disconnect(); if (unmount) unmount(); };
  }, [src, total]);

  return (
    <section className="hm-net" ref={ref} aria-label="Citation network of the Turkish Competition Board">
      <canvas data-layer="edges" aria-hidden="true" />
      <canvas data-layer="nodes" aria-hidden="true" />
      <canvas data-layer="over" aria-hidden="true" />
      <div className="container hm-net__head">
        <div>
          {eyebrow}
          <span className="hm-net__num">{total.toLocaleString('en-US')}</span>
        </div>
        <div>{children}</div>
      </div>
      <div className="hm-net__tag" aria-hidden="true"><span><b>{tag}</b><i /></span></div>
      <div className="hm-net__cursor" aria-hidden="true" />
      <div className="hm-net__axis" aria-hidden="true" />
      <div className="hm-net__note"><div className="container"><p>{note}</p></div></div>
      <div className="hm-net__tip" aria-hidden="true"><b /><span /></div>
    </section>
  );
}

export default CitationNetwork;
