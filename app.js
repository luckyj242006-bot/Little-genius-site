"use strict";
/* Little Genius 3.0: learning games for ages 3 to 10, in English and Hindi. */
const app = document.getElementById('app');
const esc = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const pick = a => a[Math.floor(Math.random() * a.length)];
const rnd = (a, b) => a + Math.floor(Math.random() * (b - a + 1));
const shuf = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };

/* ---------- saved progress (this device only) ---------- */
const KEY = 'littlegenius.v1';
const defaults = () => ({name:'', level:null, lang:'en', stars:0, stickers:0, sound:true, voice:true, stats:{}, streak:0, lastDay:'', traced:0, adv:{}, today:{d:'',n:0}, vp:{en:'',hi:''}});
function load() { try { const d = JSON.parse(localStorage.getItem(KEY)); if (d && typeof d === 'object') return Object.assign(defaults(), d); } catch (e) {} return defaults(); }
function save() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {} }
let S = load();
if (S.level && (S.level < 1 || S.level > 4)) S.level = 2;
if (S.lang !== 'hi') S.lang = 'en';
document.documentElement.lang = S.lang;

/* ---------- text in the current language ---------- */
function t(k, v) {
  let s = (I[S.lang] && I[S.lang][k] !== undefined) ? I[S.lang][k] : I.en[k];
  if (typeof s !== 'string') return s;
  if (v) for (const x in v) s = s.split('{' + x + '}').join(v[x]);
  return s;
}
/* a template with {w} as speech parts, so the word itself is read in its own language */
function tparts(k, w, cl) {
  const tpl = I[S.lang][k] || I.en[k]; const i = tpl.indexOf('{w}');
  if (i < 0) return [[tpl, S.lang]];
  return [[tpl.slice(0, i), S.lang], [w, cl], [tpl.slice(i + 3), S.lang]].filter(p => p[0].trim());
}
const L2 = o => o[S.lang] !== undefined ? o[S.lang] : o.en;
const LCODE = {en:'en-IN', hi:'hi-IN'};
function stat(sub, ok) { const s = S.stats[sub] || (S.stats[sub] = {t:0, c:0}); s.t++; if (ok) s.c++; save(); }

/* ---------- voice (read aloud) ---------- */
const voices = {};
const CFG = {audio:false};   /* set audio:true after adding recordings to the audio/ folder (see PLAY_STORE_GUIDE.md) */
let allVoices = [], curAudio = null;
const NATURAL = /natural|neural|online|enhanced|premium|wavenet|google|samantha|zira|heera|neerja|swara|lekha|kalpana|veena|female/i;
function pickVoices() {
  if (!('speechSynthesis' in window)) return;
  allVoices = speechSynthesis.getVoices();
  for (const l of ['en', 'hi']) {
    const v = allVoices.filter(x => x.lang.toLowerCase().replace('_', '-').startsWith(l));
    const chosen = S.vp && S.vp[l] && v.find(x => x.name === S.vp[l]);
    const score = x => (/natural|neural|online|wavenet/i.test(x.name) ? 3 : 0) + (/en-in|hi-in/i.test(x.lang) ? 2 : 0) + (NATURAL.test(x.name) ? 1 : 0) + (x.localService ? 0 : 1);
    voices[l] = chosen || v.slice().sort((a, b) => score(b) - score(a))[0] || null;
  }
}
if ('speechSynthesis' in window) { pickVoices(); speechSynthesis.onvoiceschanged = pickVoices; }
function stopAudio() { try { if (curAudio) { curAudio.pause(); curAudio = null; } } catch (e) {} try { 'speechSynthesis' in window && speechSynthesis.cancel(); } catch (e) {} }
/* play a recorded clip audio/<folder>/<node>.<lang>.mp3 if present, else read the text with the phone voice */
function sayClip(folder, node, text) {
  if (!S.voice) return;
  if (!CFG.audio) return say(text);
  try {
    stopAudio();
    const a = new Audio('audio/' + folder + '/' + node + '.' + S.lang + '.mp3'); curAudio = a;
    a.onerror = () => { if (curAudio === a) { curAudio = null; say(text); } };
    const p = a.play(); if (p && p.catch) p.catch(() => { if (curAudio === a) { curAudio = null; say(text); } });
  } catch (e) { say(text); }
}
function say(text, lang) {
  if (!S.voice || !('speechSynthesis' in window)) return;
  try {
    stopAudio();
    const parts = Array.isArray(text) ? text : [[text, lang || S.lang]];
    for (const [tx, lg] of parts) {
      if (!tx || !String(tx).trim()) continue;
      const u = new SpeechSynthesisUtterance(String(tx));
      const v = voices[lg]; if (v) u.voice = v;
      u.lang = v ? v.lang : LCODE[lg]; u.rate = .85; u.pitch = 1.1;
      speechSynthesis.speak(u);
    }
  } catch (e) {}
}

/* ---------- sound effects (no audio files needed) ---------- */
let ac;
function tone(freqs, dur = .12, type = 'sine', vol = .14) {
  if (!S.sound) return;
  try {
    ac = ac || new (window.AudioContext || window.webkitAudioContext)();
    const t0 = ac.currentTime;
    freqs.forEach((f, i) => { const o = ac.createOscillator(), g = ac.createGain(); o.type = type; o.frequency.value = f; g.gain.setValueAtTime(vol, t0 + i * dur); g.gain.exponentialRampToValueAtTime(.001, t0 + i * dur + dur * 1.7); o.connect(g); g.connect(ac.destination); o.start(t0 + i * dur); o.stop(t0 + i * dur + dur * 1.8); });
  } catch (e) {}
}
const sfx = {ok:() => tone([660, 880]), no:() => tone([240, 190], .14, 'triangle'), win:() => tone([523, 659, 784, 1047], .13), tap:() => tone([520], .06)};

/* ---------- small UI helpers ---------- */
function burst() {
  if (matchMedia('(prefers-reduced-motion:reduce)').matches) return;
  const c = ['#FFC83D', '#FF8A6B', '#5FD3A6', '#7CC6FF', '#B9A4FF', '#FF9EC4'];
  for (let i = 0; i < 26; i++) { const s = document.createElement('i'); s.className = 'cf'; s.style.cssText = `left:${rnd(8, 92)}vw;background:${c[i % 6]};--x:${rnd(-80, 80)}px;animation-delay:${Math.random() * .2}s`; document.body.appendChild(s); setTimeout(() => s.remove(), 1900); }
}
function toast(m) { const d = document.createElement('div'); d.className = 'toast'; d.setAttribute('role', 'status'); d.textContent = m; document.body.appendChild(d); setTimeout(() => d.remove(), 2200); }
function updChip() { const c = app.querySelector('.chip'); if (c) { c.textContent = '⭐ ' + S.stars; c.classList.remove('pulse'); void c.offsetWidth; c.classList.add('pulse'); } }
function pad2(n) { return String(n).padStart(2, '0'); }
function dayKey(d) { return d.getFullYear() + '-' + pad2(d.getMonth() + 1) + '-' + pad2(d.getDate()); }
function markDay() { const td = dayKey(new Date()); if (S.lastDay === td) return; const y = new Date(); y.setDate(y.getDate() - 1); S.streak = S.lastDay === dayKey(y) ? S.streak + 1 : 1; S.lastDay = td; save(); }
function streakNow() { const td = new Date(), y = new Date(); y.setDate(y.getDate() - 1); return (S.lastDay === dayKey(td) || S.lastDay === dayKey(y)) ? S.streak : 0; }
function addStars(n) { markDay(); S.stars += n; const td = dayKey(new Date()); if (S.today.d !== td) S.today = {d:td, n:0}; S.today.n += n; save(); updChip(); }
const GOAL = 10;
function todayN() { return S.today && S.today.d === dayKey(new Date()) ? S.today.n : 0; }
const STK = ['🦄','🚀','🐳','🦖','🐼','🌈','🎈','🐢','🦋','🍉','🐙','🎨','🦊','🐝','🏆','👑','🪁','🐘','🚂','🎠','🧸','🌻','⚽','🛸'];
const PER_STICKER = 6;
function checkStickers() { const got = []; while (S.stickers < STK.length && S.stars >= (S.stickers + 1) * PER_STICKER) { got.push(STK[S.stickers]); S.stickers++; } save(); return got; }

function pip(mood = 'happy', size = 110) {
  return `<svg class="pip ${mood}" viewBox="0 0 120 120" width="${size}" height="${size}" role="img" aria-label="Pip"><path d="M60 8l14.5 30.6 33.5 4.4-24.6 23.2 6.2 33.2L60 82.8 30.4 99.4l6.2-33.2L12 43l33.5-4.4z" fill="#FFC83D" stroke="#E5A100" stroke-width="5" stroke-linejoin="round"/><circle cx="48" cy="56" r="5.5" fill="#1F2A5C"/><circle cx="72" cy="56" r="5.5" fill="#1F2A5C"/><circle cx="49.8" cy="54.3" r="1.8" fill="#fff"/><circle cx="73.8" cy="54.3" r="1.8" fill="#fff"/><path d="M50 67q10 9 20 0" fill="none" stroke="#1F2A5C" stroke-width="4" stroke-linecap="round"/><circle cx="39" cy="66" r="5" fill="#FF8A6B" opacity=".6"/><circle cx="81" cy="66" r="5" fill="#FF8A6B" opacity=".6"/></svg>`;
}

/* ---------- navigation ---------- */
const screens = {};
let timer = null;
function go(name, arg) {
  clearTimeout(timer);
  stopAudio();
  stopRec();
  (screens[name] || screens.home)(arg);
  window.scrollTo(0, 0);
}
function bindGo() { app.querySelectorAll('[data-go]').forEach(b => b.onclick = () => { sfx.tap(); go(b.dataset.go); }); }
function shell(title, body, back = 'home') {
  app.innerHTML = `<div class="screen"><header class="top"><button class="back" data-go="${back}" aria-label="${esc(t('back'))}">‹</button><h1>${esc(title)}</h1><div class="chip" aria-label="${S.stars} ${esc(t('stars'))}">⭐ ${S.stars}</div></header>${body}</div>`;
  bindGo();
}
function dotsHtml(n, i) { return `<div class="dots" aria-hidden="true">${Array.from({length:n}, (_, k) => `<span class="${k < i ? 'on' : k === i ? 'cur' : ''}"></span>`).join('')}</div>`; }
const COL = ['--coral', '--sun', '--mint', '--blue', '--lilac', '--pink'];
const cv = i => `--c:var(${COL[i % 6]});--d:var(${COL[i % 6]}D)`;
const chipsOf = c => `--c:var(${c});--d:var(${c}D)`;
const ageBands = ['3–4', '5–6', '7–8', '9–10'];

/* ---------- first run ---------- */
screens.onboard = (keep) => {
  const nm = (keep && keep.name) || '';
  app.innerHTML = `<div class="screen center"><div class="hero">${pip('happy', 130)}</div><h1 class="title">${esc(t('hello'))}</h1>
  <div class="langrow" role="group" aria-label="${esc(t('askLang'))}"><button class="lang ${S.lang === 'en' ? 'sel' : ''}" data-l="en">English</button><button class="lang ${S.lang === 'hi' ? 'sel' : ''}" data-l="hi">हिन्दी</button></div>
  <p class="sub">${esc(t('askName'))}</p><input id="nm" class="input" maxlength="14" placeholder="${esc(t('namePh'))}" autocomplete="off" aria-label="${esc(t('namePh'))}" value="${esc(nm)}">
  <p class="sub">${esc(t('askAge'))}</p><div class="ages4">${ageBands.map((a, i) => `<button class="btn" style="${cv(i)}" data-lv="${i + 1}">${a}</button>`).join('')}</div></div>`;
  app.querySelectorAll('[data-l]').forEach(b => b.onclick = () => { S.lang = b.dataset.l; document.documentElement.lang = S.lang; save(); sfx.tap(); screens.onboard({name:app.querySelector('#nm').value}); });
  app.querySelectorAll('[data-lv]').forEach(b => b.onclick = () => { S.name = app.querySelector('#nm').value.trim(); S.level = +b.dataset.lv; save(); sfx.ok(); go('home'); });
  setTimeout(() => say(t('hello') + ' ' + t('askName')), 300);
};

/* ---------- home ---------- */
const TILES = [
  {id:'abc', e:'🅰️', k:'t_letters', c:'--coral'}, {id:'trace', e:'✍️', k:'t_trace', c:'--sun'},
  {id:'math', e:'🔢', k:'t_math', c:'--mint'}, {id:'words', e:'🖼️', k:'t_words', c:'--blue'},
  {id:'spell', e:'🧩', k:'t_spell', c:'--lilac'}, {id:'say', e:'🎤', k:'t_say', c:'--pink'},
  {id:'story', e:'📖', k:'t_story', c:'--coral'}, {id:'puzzles', e:'🧠', k:'t_puzzles', c:'--lilac'},
  {id:'explore', e:'🌍', k:'t_explore', c:'--sun'}
];
const dayNo = () => Math.floor((Date.now() - new Date().getTimezoneOffset() * 60000) / 864e5);
function ringHtml(n) {
  const f = Math.min(1, n / GOAL), C = 2 * Math.PI * 26;
  return `<svg class="ring" viewBox="0 0 64 64" width="64" height="64" aria-hidden="true"><circle cx="32" cy="32" r="26" fill="none" stroke="#E3EEF8" stroke-width="9"/><circle cx="32" cy="32" r="26" fill="none" stroke="${f >= 1 ? '#2FA77A' : '#FFB400'}" stroke-width="9" stroke-linecap="round" stroke-dasharray="${(f * C).toFixed(1)} ${C.toFixed(1)}" transform="rotate(-90 32 32)"/><text x="32" y="39" text-anchor="middle" font-size="22">${f >= 1 ? '🎉' : '⭐'}</text></svg>`;
}
screens.home = () => {
  if (!S.level) return screens.onboard();
  const hi = t('greet', {n: S.name || t('friend')});
  const sk = streakNow(), tn = todayN();
  const sod = CA.ADV[dayNo() % CA.ADV.length], fact = CX.FACTS[(dayNo() * 7 + 3) % CX.FACTS.length];
  app.innerHTML = `<div class="screen"><header class="homeTop"><div class="chip" aria-label="${S.stars} ${esc(t('stars'))}">⭐ ${S.stars}</div>${sk ? `<div class="chip fire" aria-label="${esc(t('streak', {n:sk}))}">🔥 ${sk}</div>` : ''}<span class="sp"></span><button class="round" id="lng" aria-label="${esc(t('langBtn'))}">${S.lang === 'en' ? 'अ' : 'A'}</button><button class="round" id="stk" aria-label="${esc(t('stickers'))}">🎒</button><button class="round" id="par" aria-label="${esc(t('parents'))}">🔒</button></header>
  <div class="greet"><button class="pipbtn" id="pip" aria-label="${esc(t('hearPip'))}">${pip('happy', 96)}</button><div class="bubble">${esc(hi)}</div></div>
  <button class="hero-card bg-${sod.nodes[sod.start].bg}" id="sod"><span class="hc-art" aria-hidden="true">${sod.icon}</span><span class="hc-txt"><small>${esc(t('sod'))}</small><b>${esc(L2(sod.title))}</b><i>${esc(L2(sod.origin))}</i></span><span class="hc-go">▶</span></button>
  <div class="goal"><div class="ringbox" aria-hidden="true">${ringHtml(tn)}</div><div><b>${esc(tn >= GOAL ? t('goalDone') : t('goalT'))}</b><div class="small">⭐ ${Math.min(tn, GOAL)} / ${GOAL}</div></div></div>
  <nav class="grid">${TILES.map(x => `<button class="tile" style="${chipsOf(x.c)}" data-go="${x.id}"><span class="ic" aria-hidden="true">${x.e}</span>${esc(t(x.k))}</button>`).join('')}</nav>
  <button class="fact" id="fct"><span class="fe" aria-hidden="true">${fact.e}</span><span><small>${esc(t('didYouKnow'))}</small>${esc(L2(fact))}</span></button></div>`;
  bindGo();
  app.querySelector('#pip').onclick = () => { sfx.tap(); say(hi); };
  app.querySelector('#stk').onclick = () => { sfx.tap(); go('stickers'); };
  app.querySelector('#par').onclick = () => { sfx.tap(); gate(); };
  app.querySelector('#sod').onclick = () => { sfx.tap(); go('adv', {id:sod.id, node:sod.start, hist:[], from:'home'}); };
  app.querySelector('#fct').onclick = () => { sfx.tap(); say(L2(fact)); };
  app.querySelector('#lng').onclick = () => { S.lang = S.lang === 'en' ? 'hi' : 'en'; document.documentElement.lang = S.lang; save(); sfx.tap(); go('home'); };
};

/* ---------- multiple-choice engine ---------- */
function playMC(sub, title, makeQ, n = 5, opt = {}) {
  const back = opt.back || 'home'; let i = 0, good = 0; const used = new Set();
  const next = () => { if (i >= n) return finish(good, n, opt.again || (() => playMC(sub, title, makeQ, n, opt)), opt.againLabel, back); draw(makeQ(used, i)); };
  const draw = q => {
    shell(title, `${dotsHtml(n, i)}<div class="card"><button class="round" id="rp" aria-label="${esc(t('hearAgain'))}">🔊</button>${q.prompt}</div><div class="opts">${q.opts.map((o, k) => `<button class="opt" data-k="${k}">${o.t}</button>`).join('')}</div><div class="pipwrap">${pip('happy', 80)}</div>`, back);
    i++; say(q.say);
    let tried = false, done = false;
    app.querySelector('#rp').onclick = () => say(q.say);
    app.querySelectorAll('.opt').forEach(b => b.onclick = () => {
      if (done) return; const o = q.opts[+b.dataset.k];
      if (o.ok) { done = true; b.classList.add('right'); sfx.ok(); burst(); if (!tried) { good++; addStars(1); stat(sub, true); } say(pick(t('praise'))); timer = setTimeout(next, 1500); }
      else { b.classList.add('wrong'); sfx.no(); if (!tried) { tried = true; stat(sub, false); } say(t('tryAgain')); b.disabled = true; }
    });
  };
  next();
}
function finish(good, n, again, againLabel, back = 'home', extra = 0) {
  const bonus = extra || (good === n && n > 1 ? 2 : 0); if (bonus) addStars(bonus);
  const got = checkStickers(); sfx.win(); burst();
  const sum = n === 1 ? (good ? t('gotIt1') : t('found1')) : t('firstTry', {g:good, n});
  const head = S.name ? t('greatjob', {n:esc(S.name)}) : t('greatjob0');
  shell(good === n ? t('perfect') : t('welldone'), `<div class="center"><div class="hero">${pip('cheer', 130)}</div><h2 class="title">${head}</h2><p class="sub">${esc(sum)}<br>${esc(t('earned', {x:good + bonus}))}${bonus ? esc(t('bonus')) : ''}</p>${got.length ? `<div class="card"><div class="big">${got.join(' ')}</div><p class="sub">${esc(t('newSticker'))}</p></div>` : ''}</div><button class="btn wide" id="again">${esc(againLabel || t('again'))}</button><button class="btn plain" data-go="home">${esc(t('home'))}</button>`, back);
  app.querySelector('#again').onclick = () => { sfx.tap(); again(); };
  say(head);
}
/* make 3 options from the right answer and a pool of wrong ones */
function opts3(right, pool, fmt = x => esc(x)) {
  const wrong = shuf(pool.filter(x => x !== right)).slice(0, 2);
  return shuf([{t:fmt(right), ok:1}, ...wrong.map(x => ({t:fmt(x), ok:0}))]);
}

/* ---------- letters ---------- */
let letterTab = null;
screens.abc = () => {
  const tab = letterTab || S.lang;
  const grid = (list, off) => `<div class="lgrid">${list.map((l, i) => `<button class="lt ${l[0].length > 1 ? 'lt2' : ''}" style="${cv(i + off)}" data-t="${tab}" data-i="${i + off}" aria-label="${esc(l[0])}">${l[0]}</button>`).join('')}</div>`;
  const body = tab === 'en'
    ? grid(CB.LET, 0)
    : `<h2 class="hd">${esc(t('vowels'))}</h2>${grid(CB.SWAR, 0)}<h2 class="hd">${esc(t('consonants'))}</h2>${grid(CB.VYAN, CB.SWAR.length)}`;
  const all = tab === 'en' ? CB.LET : CB.SWAR.concat(CB.VYAN);
  shell(t('t_letters'), `<div class="tabs" role="tablist"><button class="tab ${tab === 'en' ? 'sel' : ''}" data-tab="en">ABC</button><button class="tab ${tab === 'hi' ? 'sel' : ''}" data-tab="hi">अ आ इ</button></div>
  <div class="card" id="lc"><p class="sub">${esc(t('tapLetter'))}</p></div>${body}<button class="btn wide" id="pg">🎮 ${esc(t('playLetter'))}</button>`);
  app.querySelectorAll('[data-tab]').forEach(b => b.onclick = () => { letterTab = b.dataset.tab; sfx.tap(); go('abc'); });
  const lc = app.querySelector('#lc');
  app.querySelectorAll('.lt').forEach(b => b.onclick = () => {
    app.querySelectorAll('.lt.on').forEach(x => x.classList.remove('on')); b.classList.add('on'); sfx.tap();
    const [L, w, e] = all[+b.dataset.i];
    if (tab === 'en') {
      const x = L === 'X'; const idx = x ? w.length - 1 : 0;
      lc.innerHTML = `<div class="big">${L}${L.toLowerCase()}</div><div class="em">${e}</div><div class="wd">${esc(w.slice(0, idx))}<b>${esc(w[idx])}</b>${esc(w.slice(idx + 1))}</div>`;
      say(x ? `X. X is at the end of ${w}.` : `${L}. ${L} is for ${w}.`, 'en');
    } else {
      const k = w.indexOf(L) === 0 ? L.length : 0;
      lc.innerHTML = `<div class="big">${L}</div><div class="em">${e}</div><div class="wd"><b>${esc(w.slice(0, k))}</b>${esc(w.slice(k))}</div>`;
      say(`${L} से ${w}।`, 'hi');
    }
  });
  app.querySelector('#pg').onclick = () => { sfx.tap(); playMC('abc', t('letterGame'), used => letterQ(tab, used), 5, {back:'abc'}); };
};
function letterQ(tab, used) {
  if (tab === 'en') {
    const pool = CB.LET.filter(l => l[0] !== 'X' && !used.has(l[0])); const l = pick(pool); used.add(l[0]);
    return {prompt:`<div class="em">${l[2]}</div><div class="ask">${esc(t('startsWith', {w:l[1]}))}</div>`, say:tparts('startsWith', l[1], 'en'), opts:opts3(l[0], CB.LET.filter(x => x[0] !== 'X').map(x => x[0]))};
  }
  const grp = Math.random() < .35 ? CB.SWAR : CB.VYAN;
  const pool = grp.filter(l => !used.has(l[0])); const l = pick(pool.length ? pool : grp); used.add(l[0]);
  return {prompt:`<div class="em">${l[2]}</div><div class="ask">${esc(t('startsWith', {w:l[1]}))}</div>`, say:tparts('startsWith', l[1], 'hi'), opts:opts3(l[0], grp.map(x => x[0]))};
}

/* ---------- numbers ---------- */
const MEM = ['🍎', '⭐', '🐟', '🎈', '🚗', '🐥', '🍓', '🌸'];
const numName = n => (S.lang === 'hi' ? CB.NUM_HI : CB.NUM_EN)[n];
screens.math = () => {
  shell(t('numTitle'), `<div class="card" id="nc"><p class="sub">${esc(t('learnNums'))}</p></div><div class="lgrid">${Array.from({length:20}, (_, i) => `<button class="lt" style="${cv(i)}" data-n="${i + 1}">${i + 1}</button>`).join('')}</div><button class="btn wide" id="pg">🎮 ${esc(t('playNums'))}</button>`);
  const nc = app.querySelector('#nc');
  app.querySelectorAll('.lt').forEach(b => b.onclick = () => {
    app.querySelectorAll('.lt.on').forEach(x => x.classList.remove('on')); b.classList.add('on'); sfx.tap();
    const n = +b.dataset.n; const em = MEM[n % MEM.length];
    nc.innerHTML = `<div class="big">${n}</div><div class="items">${em.repeat(Math.min(n, 20))}</div><div class="wd">${CB.NUM_EN[n]} · ${CB.NUM_HI[n]}</div>`;
    say(numName(n));
  });
  app.querySelector('#pg').onclick = () => { sfx.tap(); playMC('math', t('numTitle'), mathQ, 5, {back:'math'}); };
};
function numOpts(ans, spread = 3, min = 0) {
  const set = new Set([ans]); let guard = 0;
  while (set.size < 3 && guard++ < 60) { const d = ans + rnd(-spread, spread); if (d >= min && d !== ans) set.add(d); }
  while (set.size < 3) set.add(ans + set.size);
  return shuf([...set]).map(n => ({t:String(n), ok:n === ans ? 1 : 0}));
}
function mathQ() {
  const L = S.level, em = pick(MEM);
  const kinds = {1:['count', 'count', 'bigger', 'numname', 'after'], 2:['count', 'addpic', 'subpic', 'missing', 'bigger', 'before', 'after', 'numname'], 3:['add', 'sub', 'mul', 'missing', 'tens', 'bigger', 'oddeven'], 4:['add3', 'sub3', 'mul12', 'div', 'half', 'word', 'round', 'oddeven', 'missing']}[L];
  const k = pick(kinds);
  const ask = (txt, sp) => `<div class="ask">${esc(txt)}</div>`;
  switch (k) {
    case 'count': { const n = rnd(1, L === 1 && Math.random() > .3 ? 5 : 10); return {prompt:`<div class="items">${em.repeat(n)}</div>${ask(t('howMany'))}`, say:t('howMany'), opts:numOpts(n, 2, 1)}; }
    case 'bigger': { const mx = L === 1 ? 10 : L === 2 ? 20 : 99, a = rnd(1, mx); let b = rnd(1, mx); if (b === a) b = a + 1; const big = Math.random() < .6 || L === 1; const q = t(big ? 'bigger' : 'smaller'); const ans = big ? Math.max(a, b) : Math.min(a, b); return {prompt:`<div class="eq">${a} &nbsp;&nbsp; ${b}</div>${ask(q)}`, say:q, opts:shuf([a, b]).map(n => ({t:String(n), ok:n === ans ? 1 : 0}))}; }
    case 'numname': { const n = rnd(1, L === 1 ? 10 : 20); const nm = numName(n); const q = t('find', {w:nm}); return {prompt:`<div class="eq">${esc(nm)}</div>${ask(q)}`, say:tparts('find', nm, S.lang), opts:numOpts(n, 3, 1)}; }
    case 'after': { const n = rnd(1, L === 1 ? 9 : 19); const q = t('after', {n}); return {prompt:`<div class="eq">${n}, ?</div>${ask(q)}`, say:q, opts:numOpts(n + 1, 2, 0)}; }
    case 'before': { const n = rnd(2, 20); const q = t('before', {n}); return {prompt:`<div class="eq">?, ${n}</div>${ask(q)}`, say:q, opts:numOpts(n - 1, 2, 0)}; }
    case 'addpic': { const a = rnd(1, 6), b = rnd(1, 10 - a); return {prompt:`<div class="items">${em.repeat(a)}</div><div class="plus">+</div><div class="items">${em.repeat(b)}</div>${ask(t('altogether'))}`, say:`${a} ${t('plus')} ${b}. ${t('altogether')}`, opts:numOpts(a + b, 2, 1)}; }
    case 'subpic': { const a = rnd(3, 10), b = rnd(1, a - 1); const q = t('takeaway', {a, b}); return {prompt:`<div class="items">${em.repeat(a)}</div>${ask(q)}`, say:q, opts:numOpts(a - b, 2, 0)}; }
    case 'missing': {
      const st = L === 2 ? pick([1, 2]) : L === 3 ? pick([2, 5, 10]) : pick([3, 4, 6, 7, 25, 50]); const s0 = rnd(0, 6) * (st > 5 ? st : 1) + (L === 2 ? 0 : st);
      const seq = [0, 1, 2, 3, 4].map(i => s0 + i * st); const h = rnd(1, 3);
      return {prompt:`<div class="eq">${seq.map((v, i) => i === h ? '__' : v).join(', ')}</div>${ask(t('missing'))}`, say:t('missing'), opts:numOpts(seq[h], Math.max(2, st), 0)};
    }
    case 'add': { const a = rnd(10, 40), b = rnd(5, 30); return {prompt:`<div class="eq">${a} + ${b} = ?</div>`, say:`${a} ${t('plus')} ${b}. ${t('whatAnswer')}`, opts:numOpts(a + b, 5, 1)}; }
    case 'sub': { const a = rnd(20, 60), b = rnd(5, a - 5); return {prompt:`<div class="eq">${a} − ${b} = ?</div>`, say:`${a} ${t('minus')} ${b}. ${t('whatAnswer')}`, opts:numOpts(a - b, 5, 0)}; }
    case 'mul': { const x = pick([2, 3, 4, 5, 10]), y = rnd(1, 10); return {prompt:`<div class="eq">${x} × ${y} = ?</div>`, say:`${x} ${t('times')} ${y}. ${t('whatAnswer')}`, opts:numOpts(x * y, Math.max(3, x), 1)}; }
    case 'tens': { const n = rnd(11, 99); const q = t('tens', {n}); return {prompt:`<div class="eq">${n}</div>${ask(q)}`, say:q, opts:numOpts(Math.floor(n / 10), 2, 0)}; }
    case 'oddeven': { const n = rnd(1, L === 3 ? 50 : 200); const q = t('evenodd', {n}); const ev = n % 2 === 0; return {prompt:`<div class="eq">${n}</div>${ask(q)}`, say:q, opts:[{t:esc(t('even')), ok:ev ? 1 : 0}, {t:esc(t('odd')), ok:ev ? 0 : 1}]}; }
    case 'add3': { const a = rnd(100, 600), b = rnd(50, 350); return {prompt:`<div class="eq">${a} + ${b} = ?</div>`, say:`${a} ${t('plus')} ${b}. ${t('whatAnswer')}`, opts:numOpts(a + b, 20, 1)}; }
    case 'sub3': { const a = rnd(300, 900), b = rnd(50, a - 100); return {prompt:`<div class="eq">${a} − ${b} = ?</div>`, say:`${a} ${t('minus')} ${b}. ${t('whatAnswer')}`, opts:numOpts(a - b, 20, 1)}; }
    case 'mul12': { const x = rnd(3, 12), y = rnd(3, 12); return {prompt:`<div class="eq">${x} × ${y} = ?</div>`, say:`${x} ${t('times')} ${y}. ${t('whatAnswer')}`, opts:numOpts(x * y, 8, 1)}; }
    case 'div': { const b = rnd(2, 10), c = rnd(2, 12), a = b * c; return {prompt:`<div class="eq">${a} ÷ ${b} = ?</div>`, say:`${a} ${t('divided')} ${b}. ${t('whatAnswer')}`, opts:numOpts(c, 3, 1)}; }
    case 'half': { if (Math.random() < .5) { const n = rnd(2, 50) * 2; const q = t('half', {n}); return {prompt:`<div class="eq">${n}</div>${ask(q)}`, say:q, opts:numOpts(n / 2, 4, 1)}; } const n = 4 * rnd(2, 25); const q = t('quarter', {n}); return {prompt:`<div class="eq">${n}</div>${ask(q)}`, say:q, opts:numOpts(n / 4, 4, 1)}; }
    case 'round': { let n = rnd(11, 999); if (n % 10 === 0) n++; const q = t('round', {n}); return {prompt:`<div class="eq">${n}</div>${ask(q)}`, say:q, opts:numOpts(Math.round(n / 10) * 10, 20, 0).map((o, i, arr) => o)}; }
    case 'word': {
      const nm = t(Math.random() < .5 ? 'name1' : 'name2'); const w = pick(['add', 'sub', 'mul', 'div']); let q, ans;
      if (w === 'add') { const a = rnd(12, 60), b = rnd(8, 40); q = t('wAdd', {n:nm, a, b}); ans = a + b; }
      else if (w === 'sub') { const a = rnd(20, 80), b = rnd(5, a - 5); q = t('wSub', {n:nm, a, b}); ans = a - b; }
      else if (w === 'mul') { const a = rnd(3, 9), b = rnd(3, 9); q = t('wMul', {a, b}); ans = a * b; }
      else { const b = rnd(2, 9), c = rnd(2, 9); q = t('wDiv', {a:b * c, b}); ans = c; }
      return {prompt:`<div class="story">${esc(q)}</div>`, say:q, opts:numOpts(ans, 5, 1)};
    }
  }
}

/* ---------- picture words ---------- */
const catName = c => L2(CB.VCATS.find(x => x.id === c) || {en:c});
function vocabPool() { const L = Math.min(3, S.level); return CB.VOCAB.filter(v => v.l <= L); }
const vtext = (v, lg) => lg === 'hi' ? v.hi : v.en;
screens.words = () => {
  shell(t('wordsTitle'), `<p class="sub">${esc(t('pickCat'))}</p><div class="grid">${CB.VCATS.map((c, i) => `<button class="tile small" style="${cv(i)}" data-cat="${c.id}"><span class="ic" aria-hidden="true">${c.e}</span>${esc(L2(c))}</button>`).join('')}</div>
  <h2 class="hd">${esc(t('playWords'))}</h2><div class="slist"><button class="btn" id="g1" style="--c:var(--mint);--d:var(--mintD)">🖼️ ${esc(t('g_pic'))}</button><button class="btn" id="g2" style="--c:var(--blue);--d:var(--blueD)">👂 ${esc(t('g_listen'))}</button><button class="btn" id="g3" style="--c:var(--lilac);--d:var(--lilacD)">🔁 ${esc(t('g_trans'))}</button></div>`);
  app.querySelectorAll('[data-cat]').forEach(b => b.onclick = () => { sfx.tap(); go('vocab', b.dataset.cat); });
  const mk = kind => () => { sfx.tap(); playMC('words', t('wordsTitle'), used => wordQ(kind, used), 5, {back:'words'}); };
  app.querySelector('#g1').onclick = mk('pic'); app.querySelector('#g2').onclick = mk('listen'); app.querySelector('#g3').onclick = mk('trans');
};
screens.vocab = cat => {
  const list = CB.VOCAB.filter(v => v.c === cat);
  shell(catName(cat), `<div class="card" id="vc"><p class="sub">${esc(t('tapLetter'))}</p></div><div class="vgrid">${list.map((v, i) => `<button class="vt" data-i="${i}" aria-label="${esc(v.en)}"><span class="ve">${v.e}</span><span class="vw">${esc(vtext(v, S.lang))}</span></button>`).join('')}</div>`, 'words');
  const vc = app.querySelector('#vc');
  app.querySelectorAll('.vt').forEach(b => b.onclick = () => {
    app.querySelectorAll('.vt.on').forEach(x => x.classList.remove('on')); b.classList.add('on'); sfx.tap();
    const v = list[+b.dataset.i];
    vc.innerHTML = `<div class="em">${v.e}</div><div class="wd">${esc(v.en)}</div><div class="wd hi">${esc(v.hi)}</div><p class="sub">${esc(v.ro)}</p>`;
    say(S.lang === 'hi' ? [[v.hi, 'hi'], [v.en, 'en']] : [[v.en, 'en'], [v.hi, 'hi']]);
  });
};
function wordQ(kind, used) {
  const pool = vocabPool(); let cand = pool.filter(v => !used.has(v.en)); if (!cand.length) { used.clear(); cand = pool; }
  const v = pick(cand); used.add(v.en);
  const others = shuf(pool.filter(x => x.en !== v.en));
  if (kind === 'pic') {
    const lg = S.lang; const wrong = others.filter(x => vtext(x, lg) !== vtext(v, lg)).slice(0, 2);
    return {prompt:`<div class="em">${v.e}</div><div class="ask">${esc(t('whatIsThis'))}</div>`, say:t('whatIsThis'), opts:shuf([{t:esc(vtext(v, lg)), ok:1}, ...wrong.map(x => ({t:esc(vtext(x, lg)), ok:0}))])};
  }
  if (kind === 'listen') {
    const wrong = others.slice(0, 2);
    return {prompt:`<div class="em">🔊</div><div class="ask">${esc(t('whichPicture'))}</div>`, say:[[vtext(v, S.lang), S.lang]], opts:shuf([v, ...wrong].map(x => ({t:`<span class="bigemoji">${x.e}</span>`, ok:x === v ? 1 : 0})))};
  }
  const toHi = Math.random() < .5; const src = toHi ? v.en : v.hi; const key = toHi ? 'toHindi' : 'toEnglish'; const srcLg = toHi ? 'en' : 'hi'; const tgt = toHi ? 'hi' : 'en';
  const wrong = others.filter(x => vtext(x, tgt) !== vtext(v, tgt)).slice(0, 2);
  const fmt = x => esc(vtext(x, tgt)) + (tgt === 'hi' ? `<small class="ro">${esc(x.ro)}</small>` : '');
  return {prompt:`<div class="em">${v.e}</div><div class="wd">${esc(src)}</div><div class="ask">${esc(t(key, {w:src}))}</div>`, say:tparts(key, src, srcLg), opts:shuf([{t:fmt(v), ok:1}, ...wrong.map(x => ({t:fmt(x), ok:0}))])};
}

/* ---------- word builder ---------- */
function spellPool() {
  const L = S.level;
  if (S.lang === 'hi') {
    const r = {1:[2, 2], 2:[2, 3], 3:[3, 4], 4:[3, 6]}[L];
    return CB.VOCAB.filter(v => !/\s/.test(v.hi) && CB.splitHindi(v.hi).length >= r[0] && CB.splitHindi(v.hi).length <= r[1]).map(v => ({e:v.e, w:v.hi, parts:CB.splitHindi(v.hi), ro:v.ro}));
  }
  const r = {1:[3, 3], 2:[3, 4], 3:[4, 6], 4:[5, 12]}[L];
  return CB.VOCAB.filter(v => /^[a-z]+$/.test(v.en) && v.en.length >= r[0] && v.en.length <= r[1]).map(v => ({e:v.e, w:v.en, parts:[...v.en], ro:''}));
}
screens.spell = () => {
  const pool = shuf(spellPool()).slice(0, 4), n = pool.length; let wi = 0, good = 0;
  const next = () => { if (wi >= n) return finish(good, n, () => go('spell')); draw(pool[wi]); };
  const draw = it => {
    let tiles = it.parts.slice(), g = 0; do { tiles = shuf(tiles); } while (tiles.join('') === it.parts.join('') && g++ < 5);
    shell(t('spellTitle'), `${dotsHtml(n, wi)}<div class="card"><button class="round" id="rp" aria-label="${esc(t('hearAgain'))}">🔊</button><div class="em">${it.e}</div><div class="slots">${it.parts.map(() => '<span class="slot"></span>').join('')}</div></div><div class="tiles">${tiles.map(c => `<button class="tile2" data-c="${esc(c)}">${esc(c)}</button>`).join('')}</div><div class="msg" id="msg" role="status">${esc(t('tapOrder'))}</div>`);
    wi++; const sp = tparts('canSpell', it.w, S.lang); say(sp);
    const slots = app.querySelectorAll('.slot'); let pos = 0, tried = false;
    app.querySelector('#rp').onclick = () => say([[it.w, S.lang]]);
    app.querySelectorAll('.tile2').forEach(b => b.onclick = () => {
      if (pos >= it.parts.length) return;
      if (b.dataset.c === it.parts[pos]) {
        slots[pos].textContent = b.dataset.c; pos++; b.disabled = true; sfx.tap();
        if (pos === it.parts.length) { sfx.ok(); burst(); if (!tried) { good++; addStars(1); stat('spell', true); } app.querySelector('#msg').textContent = it.w + '!'; say([[it.w, S.lang], [pick(t('praise')), S.lang]]); timer = setTimeout(next, 1800); }
      } else { b.classList.remove('wrong'); void b.offsetWidth; b.classList.add('wrong'); sfx.no(); if (!tried) { tried = true; stat('spell', false); } app.querySelector('#msg').textContent = t('tryLetter'); }
    });
  };
  next();
};

/* ---------- say it (voice practice) ---------- */
let rec = null;
function stopRec() { try { rec && rec.abort(); } catch (e) {} rec = null; }
const HOMO = {bee:['be'], sun:['son'], bear:['bare'], pig:['big'], bus:['bust'], fox:['fax'], cow:['how'], egg:['eg'], hat:['hot'], star:['stir']};
screens.say = () => {
  const L = S.level, lg = S.lang;
  const base = CB.VOCAB.filter(v => lg === 'hi' ? true : /^[a-z]+$/.test(v.en)).filter(v => v.l <= Math.min(3, L + (L > 2 ? 1 : 0)));
  const pool = shuf(base).slice(0, 4), n = pool.length; let wi = 0, good = 0;
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  const next = () => { if (wi >= n) return finish(good, n, () => go('say')); draw(pool[wi]); };
  const draw = v => {
    const w = vtext(v, lg); let manual = !SR, tried = false, done = false;
    shell(t('sayTitle'), `${dotsHtml(n, wi)}<div class="card"><button class="round" id="rp" aria-label="${esc(t('hearAgain'))}">🔊</button><div class="em">${v.e}</div><div class="wd">${esc(w)}</div>${lg === 'hi' ? `<p class="sub">${esc(v.ro)}</p>` : ''}</div><button class="btn mic" id="mic">${manual ? esc(t('saidIt')) : esc(t('tapSay'))}</button><div class="msg" id="msg" role="status">${manual ? esc(t('sayAloud')) : esc(t('listenFirst'))}</div>`);
    wi++; say(t('listenNow', {w}), lg);
    const msg = x => app.querySelector('#msg').textContent = x, mic = app.querySelector('#mic');
    const win = () => { if (done) return; done = true; stopRec(); mic.classList.remove('live'); sfx.ok(); burst(); if (!tried) { good++; addStars(1); stat('say', true); } msg(t('youSaid', {w})); say([[w, lg]]); timer = setTimeout(next, 1800); };
    const fallback = () => { manual = true; mic.classList.remove('live'); mic.textContent = t('saidIt'); msg(t('sayAloud')); };
    app.querySelector('#rp').onclick = () => say([[w, lg]]);
    mic.onclick = () => {
      if (done) return; if (manual) return win(); stopRec();
      try {
        rec = new SR(); rec.lang = LCODE[lg]; rec.maxAlternatives = 5; rec.interimResults = false;
        rec.onresult = ev => {
          const alts = [...ev.results[0]].map(a => a.transcript.toLowerCase());
          const ok = lg === 'hi' ? [w, v.ro.toLowerCase(), v.en] : [w, ...(HOMO[w] || [])];
          if (alts.some(tx => tx.split(/\s+/).some(x => ok.includes(x.replace(/[.,!?।]/g, ''))) || (lg === 'hi' && tx.includes(w)))) win();
          else { if (!tried) { tried = true; stat('say', false); } sfx.no(); msg(t('almost')); say([[w, lg]]); }
        };
        rec.onerror = ev => { mic.classList.remove('live'); if (ev.error === 'no-speech') msg(t('noHear')); else if (ev.error !== 'aborted') fallback(); };
        rec.onend = () => mic.classList.remove('live');
        mic.classList.add('live'); msg(t('listening')); rec.start();
      } catch (e) { fallback(); }
    };
  };
  next();
};

/* ---------- stories ---------- */
screens.read = ([si, p]) => {
  const s = CS.STORIES[si], last = s.pages.length - 1;
  if (p > last) {
    const qs = s.quiz;
    return playMC('story', L2(s.title), (u, i) => { const q = qs[i]; const ob = (S.lang === 'hi' ? q[3] : q[1]).split('|'); return {prompt:`<div class="em">❓</div><div class="ask">${esc(S.lang === 'hi' ? q[2] : q[0])}</div>`, say:S.lang === 'hi' ? q[2] : q[0], opts:shuf(ob.map((x, k) => ({t:esc(x), ok:k === 0 ? 1 : 0})))}; }, qs.length, {back:'story', again:() => go('story'), againLabel:t('moreStories')});
  }
  const pg = s.pages[p], tx = S.lang === 'hi' ? pg[2] : pg[1];
  shell(L2(s.title), `${dotsHtml(s.pages.length, p)}<div class="card"><button class="round" id="rp" aria-label="${esc(t('readMe'))}">🔊</button><div class="items sc" aria-hidden="true">${pg[0]}</div><p class="story">${esc(tx)}</p></div><div class="nav"><button class="btn" id="pv" ${p ? '' : 'disabled'}>${esc(t('prev'))}</button><button class="btn" style="--c:var(--mint);--d:var(--mintD)" id="nx">${p === last ? esc(t('quizTime')) : esc(t('next'))}</button></div>`, 'story');
  sayClip('story' + si, p, tx);
  app.querySelector('#rp').onclick = () => sayClip('story' + si, p, tx);
  app.querySelector('#pv').onclick = () => { sfx.tap(); go('read', [si, p - 1]); };
  app.querySelector('#nx').onclick = () => { sfx.tap(); go('read', [si, p + 1]); };
};

/* ---------- explore (quiz topics) ---------- */
const EXTRA_TOPICS = [{id:'english', e:'🔤', k:'tp_english', c:'--blue', cl:'en'}, {id:'hindi', e:'🇮🇳', k:'tp_hindi', c:'--coral', cl:'hi'}];
screens.explore = () => {
  const all = CT.TOPICS.map(x => ({id:x.id, e:x.e, name:L2(x), c:x.c})).concat(EXTRA_TOPICS.map(x => ({id:x.id, e:x.e, name:t(x.k), c:x.c})));
  shell(t('exploreTitle'), `<p class="sub">${esc(t('pickTopic'))}</p><div class="grid">${all.map(x => `<button class="tile small" style="${chipsOf(x.c)}" data-tp="${x.id}"><span class="ic" aria-hidden="true">${x.e}</span>${esc(x.name)}</button>`).join('')}</div>`);
  app.querySelectorAll('[data-tp]').forEach(b => b.onclick = () => { sfx.tap(); go('topic', b.dataset.tp); });
};
screens.topic = id => {
  const ex = EXTRA_TOPICS.find(x => x.id === id);
  if (ex) return playMC('explore', t(ex.k), used => langQ(ex.cl, used), 6, {back:'explore', again:() => go('topic', id)});
  const tp = CT.TOPICS.find(x => x.id === id);
  playMC('explore', L2(tp), used => topicQ(tp, used), 6, {back:'explore', again:() => go('topic', id)});
};
function topicPool(tp) {
  const L = S.level; let p = tp.q.filter(q => q.l === L || q.l === L - 1);
  if (p.length < 6) p = tp.q.filter(q => q.l <= L + 1 && q.l >= L - 1);
  if (p.length < 6) p = tp.q.filter(q => q.l <= L + 2);
  return p.length ? p : tp.q;
}
function topicQ(tp, used) {
  const pool = topicPool(tp); let c = pool.filter(q => !used.has(q.q.en)); if (!c.length) { used.clear(); c = pool; }
  const q = pick(c); used.add(q.q.en); const ob = L2(q.o);
  return {prompt:`<div class="em">${q.e}</div><div class="ask">${esc(L2(q.q))}</div>`, say:L2(q.q), opts:shuf(ob.map((x, k) => ({t:esc(x), ok:k === 0 ? 1 : 0})))};
}
/* generated language questions: cl = language of the words being practised */
function langQ(cl, used) {
  const L = S.level;
  const kinds = L === 1 ? ['opp', 'rhyme'] : L === 2 ? ['opp', 'rhyme', 'female', cl === 'en' ? 'article' : 'swar'] : ['opp', 'rhyme', 'female', 'plural', cl === 'en' ? 'article' : 'swar'];
  const kind = pick(kinds); const emoji = {opp:'↔️', rhyme:'🎵', plural:'👥', female:'👩', article:'✏️', swar:'🔤'}[kind];
  let w, right, pool, key = 'q_' + kind;
  if (kind === 'opp') { const pair = pick(CB.OPP[cl]); const flip = Math.random() < .5; w = pair[flip ? 1 : 0]; right = pair[flip ? 0 : 1]; pool = CB.OPP[cl].flat(); }
  else if (kind === 'rhyme') { const grp = pick(CB.RHYME[cl]); const s = shuf(grp); w = s[0]; right = s[1]; pool = CB.RHYME[cl].filter(g => g !== grp).flat(); }
  else if (kind === 'plural') { const pair = pick(CB.PLURAL[cl]); w = pair[0]; right = pair[1]; pool = CB.PLURAL[cl].map(p => p[1]); if (cl === 'en') pool = pool.concat([w + 's', w + 'es', w + 'ies']); }
  else if (kind === 'female') { const pair = pick(CB.GENDER[cl]); w = pair[0]; right = pair[1]; pool = CB.GENDER[cl].map(p => p[0]); }
  else if (kind === 'article') { const pair = pick(CB.ARTICLE); w = pair[0]; right = pair[1]; pool = ['a', 'an', 'the']; }
  else { right = pick(CT.SWAR_ONLY); pool = CT.VYAN_SAMPLE; return {prompt:`<div class="em">${emoji}</div><div class="ask">${esc(t(key))}</div>`, say:t(key), opts:opts3(right, pool, x => `<span class="bigletter">${esc(x)}</span>`)}; }
  pool = [...new Set(pool)].filter(x => x !== right && x !== w);
  const q = t(key, {w});
  return {prompt:`<div class="em">${emoji}</div><div class="wd">${esc(w)}</div><div class="ask">${esc(q)}</div>`, say:tparts(key, w, cl), opts:opts3(right, pool.concat(right))};
}

/* ---------- writing practice ---------- */
const TRACE_SETS = {
  abc:'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''), small:'abcdefghijklmnopqrstuvwxyz'.split(''), num:'0123456789'.split(''),
  swar:CB.SWAR.map(x => x[0]).filter(x => x !== 'ऋ'), vyan:CB.VYAN.map(x => x[0])
};
let traceTab = null; const tracedNow = new Set();
screens.trace = () => {
  const tab = traceTab || (S.lang === 'hi' ? 'swar' : 'abc');
  shell(t('traceTitle'), `<div class="tabs tabs5" role="tablist">${['abc', 'small', 'num', 'swar', 'vyan'].map(k => `<button class="tab ${tab === k ? 'sel' : ''}" data-tab="${k}">${esc(t('tr_' + (k === 'small' ? 'small' : k === 'num' ? 'num' : k)))}</button>`).join('')}</div><p class="sub">${esc(t('pickChar'))}</p><div class="lgrid">${TRACE_SETS[tab].map((c, i) => `<button class="lt ${c.length > 1 ? 'lt2' : ''}" style="${cv(i)}" data-ch="${esc(c)}" aria-label="${esc(c)}">${esc(c)}</button>`).join('')}</div>`);
  app.querySelectorAll('[data-tab]').forEach(b => b.onclick = () => { traceTab = b.dataset.tab; sfx.tap(); go('trace'); });
  app.querySelectorAll('[data-ch]').forEach(b => b.onclick = () => { sfx.tap(); go('tracing', b.dataset.ch); });
};
screens.tracing = ch => {
  shell(t('traceTitle'), `<div class="card tracecard"><canvas id="cv" width="720" height="720" aria-label="${esc(ch)}"></canvas></div><p class="sub center">${esc(t('traceHint'))}</p><div class="nav"><button class="btn" id="clr" style="--c:#fff;--d:var(--line)">${esc(t('clear'))}</button><button class="btn" id="dn" style="--c:var(--mint);--d:var(--mintD)">${esc(t('done'))}</button></div>`, 'trace');
  const cvs = app.querySelector('#cv'), ctx = cvs.getContext('2d');
  const ghost = () => {
    ctx.clearRect(0, 0, 720, 720);
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    const size = ch.length > 1 ? 380 : 520; ctx.font = `800 ${size}px 'Baloo 2', 'Noto Sans Devanagari', system-ui, sans-serif`;
    ctx.lineWidth = 6; ctx.strokeStyle = '#B9CFE4'; ctx.fillStyle = '#EAF3FB';
    ctx.fillText(ch, 360, 380); ctx.strokeText(ch, 360, 380);
  };
  ghost();
  let drawing = false, last = null, ink = 0;
  const pos = e => { const r = cvs.getBoundingClientRect(); return [(e.clientX - r.left) * 720 / r.width, (e.clientY - r.top) * 720 / r.height]; };
  cvs.onpointerdown = e => { drawing = true; last = pos(e); try { cvs.setPointerCapture(e.pointerId); } catch (x) {} ctx.beginPath(); ctx.arc(last[0], last[1], 14, 0, 7); ctx.fillStyle = '#E0583A'; ctx.fill(); e.preventDefault(); };
  cvs.onpointermove = e => { if (!drawing) return; const p = pos(e); ctx.strokeStyle = '#E0583A'; ctx.lineWidth = 28; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(last[0], last[1]); ctx.lineTo(p[0], p[1]); ctx.stroke(); ink += Math.hypot(p[0] - last[0], p[1] - last[1]); last = p; };
  cvs.onpointerup = cvs.onpointercancel = () => { drawing = false; };
  app.querySelector('#clr').onclick = () => { sfx.tap(); ink = 0; ghost(); };
  app.querySelector('#dn').onclick = () => {
    sfx.ok(); burst();
    if (!tracedNow.has(ch) && ink > 200) { tracedNow.add(ch); S.traced++; addStars(1); stat('trace', true); }
    toast(t('traced')); say(t('traced')); timer = setTimeout(() => go('trace'), 900);
  };
};

/* ---------- stickers ---------- */
screens.stickers = () => {
  const left = STK.length - S.stickers;
  const note = left ? t('stkNext', {x:(S.stickers + 1) * PER_STICKER, y:S.stars}) : t('stkAll');
  shell(t('stkTitle'), `<div class="sgrid">${STK.map((s, i) => i < S.stickers ? `<div class="stk">${s}</div>` : `<div class="stk lock" aria-label="${esc(t('locked'))}">${s}</div>`).join('')}</div><p class="sub center" style="margin-top:18px">${esc(note)}</p>`);
};

/* ---------- parent corner ---------- */
function gate() {
  const a = rnd(6, 9), b = rnd(6, 9), r = a * b, o = shuf([r, r + a, r - b, r + 10]);
  const m = document.createElement('div'); m.className = 'modal';
  m.innerHTML = `<div class="sheet" role="dialog" aria-modal="true" aria-label="${esc(t('gateTitle'))}"><h2>${esc(t('gateTitle'))}</h2><p class="sub">${esc(t('gateText', {q:a + ' × ' + b}))}</p><div class="opts">${o.map(x => `<button class="opt" data-v="${x}">${x}</button>`).join('')}</div><button class="btn plain" id="x">${esc(t('cancel'))}</button></div>`;
  document.body.appendChild(m);
  m.querySelector('#x').onclick = () => m.remove();
  m.querySelectorAll('.opt').forEach(b2 => b2.onclick = () => { if (+b2.dataset.v === r) { m.remove(); go('parent'); } else { b2.classList.add('wrong'); b2.disabled = true; } });
}
screens.parent = () => {
  const SUBS = ['abc', 'math', 'words', 'spell', 'say', 'story', 'explore', 'puzzle', 'adv'];
  const bars = SUBS.map(k => {
    const s = S.stats[k], nm = t('sub_' + k);
    if (!s || !s.t) return `<div class="row2"><span>${esc(nm)}</span><span class="small">${esc(t('notYet'))}</span></div>`;
    const p = Math.round(s.c / s.t * 100);
    return `<div><div class="row2" style="padding-bottom:0"><span>${esc(nm)}</span><span class="small">${esc(t('pctRight', {p, t:s.t}))}</span></div><div class="bar" role="img" aria-label="${p}%"><i style="width:${p}%"></i></div></div>`;
  }).join('');
  shell(t('parentTitle'), `
  <div class="sec"><h2>${esc(t('pgProgress'))}</h2><p>${esc(t('pgSummary', {s:S.stars, k:S.stickers, m:STK.length, t:S.traced}))}</p><p>${esc(t('pgAdvSum', {n:Object.values(S.adv).reduce((a, x) => a + (x.seen ? x.seen.length : 0), 0)}))}</p>${bars}</div>
  <div class="sec"><h2>${esc(t('pgLang'))}</h2><p>${esc(t('pgLangNote'))}</p><div class="seg two"><button class="btn ${S.lang === 'en' ? 'sel' : ''}" data-l="en" aria-pressed="${S.lang === 'en'}">English</button><button class="btn ${S.lang === 'hi' ? 'sel' : ''}" data-l="hi" aria-pressed="${S.lang === 'hi'}">हिन्दी</button></div></div>
  <div class="sec"><h2>${esc(t('pgLevel'))}</h2><p>${esc(t('pgLevelNote'))}</p><div class="seg four">${ageBands.map((a, i) => `<button class="btn ${S.level === i + 1 ? 'sel' : ''}" data-lv="${i + 1}" aria-pressed="${S.level === i + 1}">${a}</button>`).join('')}</div></div>
  <div class="sec"><h2>${esc(t('pgName'))}</h2><input id="nm" class="input" maxlength="14" value="${esc(S.name)}" placeholder="${esc(t('namePh'))}" aria-label="${esc(t('pgName'))}"></div>
  <div class="sec"><h2>${esc(t('pgSound'))}</h2><div class="row2"><span>${esc(t('pgFx'))}</span><button class="sw" data-t="sound" aria-pressed="${S.sound}" aria-label="${esc(t('pgFx'))}"></button></div><div class="row2"><span>${esc(t('pgVoice'))}</span><button class="sw" data-t="voice" aria-pressed="${S.voice}" aria-label="${esc(t('pgVoice'))}"></button></div></div>
  <div class="sec"><h2>${esc(t('pgVoicePick'))}</h2><p>${esc(t('pgVoiceNote'))}</p>${['en', 'hi'].map(l => { const vs = allVoices.filter(x => x.lang.toLowerCase().replace('_', '-').startsWith(l)); return vs.length ? `<div class="row2"><select class="vsel" data-vl="${l}" aria-label="${l === 'en' ? 'English' : 'हिन्दी'}"><option value="">${l === 'en' ? 'English' : 'हिन्दी'}: ${esc(t('pgVoiceAuto'))}</option>${vs.map(x => `<option value="${esc(x.name)}" ${S.vp[l] === x.name ? 'selected' : ''}>${esc(x.name)}</option>`).join('')}</select><button class="btn" style="min-height:44px;font-size:18px;padding:6px 14px" data-vt="${l}">🔊</button></div>` : ''; }).join('')}</div>
  <div class="sec"><h2>${esc(t('pgPrivacy'))}</h2><p>${esc(t('pgPrivacyText'))}</p></div>
  <div class="sec"><h2>${esc(t('pgReset'))}</h2><button class="btn plain" id="rs" style="margin-top:0">${esc(t('pgResetBtn'))}</button></div>
  <p class="small center">${esc(t('version'))}</p>`);
  app.querySelectorAll('[data-l]').forEach(b => b.onclick = () => { S.lang = b.dataset.l; document.documentElement.lang = S.lang; save(); sfx.tap(); go('parent'); });
  app.querySelectorAll('[data-lv]').forEach(b => b.onclick = () => { S.level = +b.dataset.lv; save(); sfx.tap(); go('parent'); });
  app.querySelectorAll('[data-vl]').forEach(sel => sel.onchange = () => { S.vp[sel.dataset.vl] = sel.value; save(); pickVoices(); say(sel.dataset.vl === 'hi' ? 'नमस्ते! मैं पिप हूँ।' : 'Hello! I am Pip.', sel.dataset.vl); });
  app.querySelectorAll('[data-vt]').forEach(b => b.onclick = () => say(b.dataset.vt === 'hi' ? 'नमस्ते! चलो साथ में सीखें।' : 'Hello! Let us learn together.', b.dataset.vt));
  app.querySelectorAll('[data-t]').forEach(b => b.onclick = () => { const k = b.dataset.t; S[k] = !S[k]; save(); b.setAttribute('aria-pressed', S[k]); if (k === 'sound') sfx.ok(); });
  app.querySelector('#nm').onchange = e => { S.name = e.target.value.trim(); save(); toast(t('nameSaved')); };
  app.querySelector('#rs').onclick = () => { if (confirm(t('pgResetAsk'))) { S = Object.assign(defaults(), {name:S.name, level:S.level, lang:S.lang}); save(); go('home'); } };
};

