"use strict";
/* Puzzles for children: riddles, odd one out, patterns, memory match, slide puzzle, mini sudoku. */
const PUZZLES = [
  {id:'riddle', e:'🤔', k:'pz_riddle', c:'--coral'}, {id:'odd', e:'🧐', k:'pz_odd', c:'--sun'},
  {id:'pattern', e:'🔮', k:'pz_pattern', c:'--mint'}, {id:'memory', e:'🃏', k:'pz_memory', c:'--blue'},
  {id:'slide', e:'🧱', k:'pz_slide', c:'--lilac'}, {id:'sudoku', e:'🔲', k:'pz_sudoku', c:'--pink'}
];
screens.puzzles = () => {
  shell(t('pzTitle'), `<p class="sub">${esc(t('pzPick'))}</p><div class="grid">${PUZZLES.map(x => `<button class="tile" style="${chipsOf(x.c)}" data-pz="${x.id}"><span class="ic" aria-hidden="true">${x.e}</span>${esc(t(x.k))}</button>`).join('')}</div>`);
  app.querySelectorAll('[data-pz]').forEach(b => b.onclick = () => { sfx.tap(); go('pz', b.dataset.pz); });
};
screens.pz = id => {
  const again = () => go('pz', id), o = {back:'puzzles', again};
  const name = t('pz_' + id);
  if (id === 'riddle') return playMC('puzzle', name, used => riddleQ(used), 6, o);
  if (id === 'odd') return playMC('puzzle', name, used => oddQ(used), 6, o);
  if (id === 'pattern') return playMC('puzzle', name, used => patQ(used), 6, o);
  if (id === 'memory') return memoryGame(name, again);
  if (id === 'slide') return slideGame(name, again);
  return sudokuGame(name, again);
};
function winPuzzle(again) {
  stat('puzzle', true); addStars(1); sfx.win(); burst();
  timer = setTimeout(() => finish(1, 1, again, t('again'), 'puzzles', 2), 900);
}

/* riddles */
function riddleQ(used) {
  const pool = topicPool({q:CX.RIDDLES}); let c = pool.filter(q => !used.has(q.q.en)); if (!c.length) { used.clear(); c = pool; }
  const q = pick(c); used.add(q.q.en);
  return {prompt:`<div class="em">${q.e}</div><div class="ask">${esc(L2(q.q))}</div>`, say:L2(q.q), opts:shuf(L2(q.o).map((x, k) => ({t:esc(x), ok:k === 0 ? 1 : 0})))};
}

/* odd one out */
const NEAR = [['fruit', 'veg'], ['animal', 'bird'], ['animal', 'sea'], ['bird', 'sky'], ['vehicle', 'sport']];
function oddQ(used) {
  const L = S.level; let a, b;
  if (L >= 3 && Math.random() < .7) { const p = pick(NEAR); const f = Math.random() < .5; a = CX.ODD.find(g => g.k === p[f ? 0 : 1]); b = CX.ODD.find(g => g.k === p[f ? 1 : 0]); }
  else { a = pick(CX.ODD); b = pick(CX.ODD.filter(g => g !== a)); }
  const n = L <= 2 ? 2 : 3, same = shuf(a.i).slice(0, n), odd = pick(b.i);
  const q = t('q_odd');
  return {prompt:`<div class="em">🧐</div><div class="ask">${esc(q)}</div>`, say:q, opts:shuf([...same.map(x => ({t:`<span class="bigemoji">${x}</span>`, ok:0})), {t:`<span class="bigemoji">${odd}</span>`, ok:1}])};
}

/* what comes next */
function patQ(used) {
  const L = S.level; let seq, right, step = 0, numeric = true;
  if (L === 1) {
    const [x, y] = shuf(CX.ODD[rnd(0, 2)].i).slice(0, 2); const s = [x, y, x, y, x]; seq = s; right = y; numeric = false;
  } else if (L === 2 && Math.random() < .6) {
    const [x, y, z] = shuf(CX.ODD[rnd(0, 3)].i).slice(0, 3); const kind = rnd(0, 1);
    const base = kind ? [x, x, y] : [x, y, z]; seq = [...base, ...base].slice(0, base.length * 2 - 1); right = base[base.length - 1]; numeric = false;
  } else if (L <= 2) {
    const st = pick([1, 2]), a = rnd(1, 8); seq = [a, a + st, a + 2 * st, a + 3 * st]; right = a + 4 * st; step = st;
  } else if (L === 3) {
    const st = pick([2, 3, 4, 5, 10]), a = rnd(1, 20); const down = Math.random() < .3 && a > 5 * st;
    const k = down ? -st : st; seq = [a, a + k, a + 2 * k, a + 3 * k]; right = a + 4 * k; step = st;
  } else {
    const kind = rnd(0, 3);
    if (kind === 0) { const a = pick([1, 2, 3]); seq = [a, a * 2, a * 4, a * 8]; right = a * 16; step = a * 4; }
    else if (kind === 1) { seq = [1, 4, 9, 16]; right = 25; step = 5; }
    else if (kind === 2) { const a = rnd(1, 5); seq = [a, a + 1, a + 3, a + 6]; right = a + 10; step = 2; }
    else { seq = [2, 3, 5, 8]; right = 13; step = 3; }
  }
  const key = seq.join(',') + right; if (used.has(key) && used.size < 8) return patQ(used); used.add(key);
  let opts;
  if (numeric) { const w = new Set(); [step || 1, 1, 2, step * 2 || 3, 3].forEach(d => { w.add(right + d); if (right - d > 0) w.add(right - d); }); w.delete(right); opts = opts3(right, [...w].filter(v => v > 0).concat([right + 1, right + 2])); }
  else { const pool = [...new Set(seq)].concat(CX.ODD[5].i.slice(0, 3)); opts = opts3(right, pool.filter(x => x !== right), x => `<span class="bigemoji">${x}</span>`); }
  const q = t('q_pat');
  return {prompt:`<div class="seq">${seq.map(x => `<span>${esc(x)}</span>`).join('')}<span class="qm">?</span></div><div class="ask">${esc(q)}</div>`, say:q, opts};
}

/* memory match */
function memoryGame(title, again) {
  const L = S.level, np = [3, 4, 6, 8][L - 1], cols = np === 3 ? 3 : 4;
  let cards;
  if (L <= 2) { cards = shuf(CX.ODD.flatMap(g => g.i)).slice(0, np).flatMap((e, i) => [{p:i, h:`<span class="bigemoji">${e}</span>`}, {p:i, h:`<span class="bigemoji">${e}</span>`}]); }
  else {
    const v = shuf(CB.VOCAB.filter(x => x.e && (S.lang === 'hi' ? x.hi : x.en))).slice(0, np);
    const word = x => S.lang === 'hi' ? x.hi : x.en, wl = S.lang;
    cards = v.flatMap((x, i) => [{p:i, h:`<span class="bigemoji">${x.e}</span>`}, {p:i, h:`<span class="mw">${esc(word(x))}</span>`, w:word(x), wl}]);
  }
  cards = shuf(cards); let open = [], moves = 0, left = np, lock = false;
  const view = () => {
    shell(title, `<p class="sub center">${esc(t('memHelp'))}</p><div class="mgrid" style="grid-template-columns:repeat(${cols},1fr)">${cards.map((c, i) => `<button class="mcard ${c.up || c.done ? 'up' : ''} ${c.done ? 'done' : ''}" data-i="${i}" aria-label="${c.up || c.done ? '' : '?'}"><span class="mf">${c.up || c.done ? c.h : '❓'}</span></button>`).join('')}</div><p class="msg">${esc(t('moves', {n:moves}))} · ${esc(t('pairsLeft', {n:left}))}</p>`, 'puzzles');
    app.querySelectorAll('.mcard').forEach(b => b.onclick = () => flip(+b.dataset.i));
  };
  const flip = i => {
    const c = cards[i]; if (lock || c.up || c.done) return;
    c.up = true; sfx.tap(); if (c.w) say(c.w, c.wl); open.push(i);
    if (open.length === 2) {
      moves++; const [a, b] = open.map(k => cards[k]); open = [];
      if (a.p === b.p) { a.done = b.done = true; a.up = b.up = false; left--; sfx.ok(); view(); if (!left) return winPuzzle(again); return; }
      lock = true; view(); timer = setTimeout(() => { a.up = b.up = false; lock = false; sfx.no(); view(); }, 1000); return;
    }
    view();
  };
  view();
}

/* slide puzzle */
function slideGame(title, again) {
  const L = S.level, [R, C] = [[2, 2], [2, 3], [3, 3], [3, 4]][L - 1], N = R * C;
  const sym = L <= 2 ? shuf(CX.ODD[0].i).slice(0, N - 1) : Array.from({length:N - 1}, (_, i) => String(i + 1));
  let g = Array.from({length:N}, (_, i) => i < N - 1 ? i : -1);   /* -1 is the empty space */
  const nbr = z => { const r = Math.floor(z / C), c = z % C, o = []; if (r > 0) o.push(z - C); if (r < R - 1) o.push(z + C); if (c > 0) o.push(z - 1); if (c < C - 1) o.push(z + 1); return o; };
  let z = N - 1, prev = -1;
  for (let k = 0; k < [8, 14, 40, 70][L - 1]; k++) { const o = nbr(z).filter(x => x !== prev); const m = pick(o); g[z] = g[m]; g[m] = -1; prev = z; z = m; }
  const solved = () => g.every((v, i) => v === (i < N - 1 ? i : -1));
  if (solved()) { g[N - 1] = g[N - 2]; g[N - 2] = -1; }
  let moves = 0;
  const view = () => {
    shell(title, `<p class="sub center">${esc(t('slideHelp'))}</p><div class="sgrid2" style="grid-template-columns:repeat(${C},1fr)">${g.map((v, i) => v < 0 ? '<div class="sl empty"></div>' : `<button class="sl" data-i="${i}">${sym[v]}</button>`).join('')}</div><p class="msg">${esc(t('moves', {n:moves}))}</p><p class="small center">${sym.join(' ')}</p><button class="btn plain" id="sh">${esc(t('shuffle'))}</button>`, 'puzzles');
    app.querySelectorAll('.sl[data-i]').forEach(b => b.onclick = () => {
      const i = +b.dataset.i, e = g.indexOf(-1); if (!nbr(i).includes(e)) { sfx.no(); return; }
      g[e] = g[i]; g[i] = -1; moves++; sfx.tap(); view(); if (solved()) winPuzzle(again);
    });
    app.querySelector('#sh').onclick = () => { sfx.tap(); again(); };
  };
  view();
}

/* mini sudoku (4 x 4, with pictures) */
function sudokuGame(title, again) {
  const L = S.level, sy = shuf(CX.SYM).slice(0, 4), pm = shuf([0, 1, 2, 3]);
  const rows = [...shuf([0, 1]), ...shuf([2, 3])], cols = [...shuf([0, 1]), ...shuf([2, 3])];
  const sol = rows.map(r => cols.map(c => pm[CX.SUD[r][c]]));
  const cells = [...Array(16).keys()]; const hide = new Set(shuf(cells).slice(0, [4, 6, 8, 10][L - 1]));
  const g = sol.flat().map((v, i) => hide.has(i) ? -1 : v);
  let selC = -1, selS = -1;
  const view = () => {
    shell(title, `<p class="sub center">${esc(t('sudHelp'))}</p><div class="sud">${g.map((v, i) => `<button class="sc ${v >= 0 && !hide.has(i) ? 'fixed' : ''} ${i === selC ? 'sel' : ''} ${(i % 4 === 1) ? 'rb' : ''} ${(Math.floor(i / 4) === 1) ? 'bb' : ''}" data-i="${i}" ${v >= 0 && !hide.has(i) ? 'disabled' : ''} aria-label="${v >= 0 ? sy[v] : '?'}">${v >= 0 ? sy[v] : ''}</button>`).join('')}</div><div class="pal">${sy.map((x, k) => `<button class="pb ${k === selS ? 'sel' : ''}" data-k="${k}">${x}</button>`).join('')}</div><p class="msg">${esc(t('pickPic'))}</p>`, 'puzzles');
    app.querySelectorAll('.sc').forEach(b => b.onclick = () => { selC = +b.dataset.i; if (selS >= 0) return put(); view(); });
    app.querySelectorAll('.pb').forEach(b => b.onclick = () => { selS = +b.dataset.k; if (selC >= 0) return put(); view(); });
  };
  const put = () => {
    if (sol.flat()[selC] === selS) { g[selC] = selS; hide.delete(selC); selC = -1; selS = -1; sfx.ok(); view(); if (g.every(v => v >= 0)) winPuzzle(again); }
    else { sfx.no(); stat('puzzle', false); const c = app.querySelector(`.sc[data-i="${selC}"]`); if (c) { c.classList.add('wrong'); setTimeout(() => c.classList.remove('wrong'), 450); } selS = -1; app.querySelectorAll('.pb').forEach(b => b.classList.remove('sel')); }
  };
  view();
}
