"use strict";
/* Stories hub (read-along + choose-your-path adventures) and the adventure player. */
let storyTab = 'adv';
const endCount = s => Object.values(s.nodes).filter(n => n.end).length;
const seenOf = s => (S.adv[s.id] && S.adv[s.id].seen) ? S.adv[s.id].seen.length : 0;
screens.story = () => {
  const adv = storyTab === 'adv';
  let body = `<div class="tabs" role="tablist"><button class="tab ${adv ? 'sel' : ''}" role="tab" aria-selected="${adv}" data-tab="adv">${esc(t('tabAdv'))}</button><button class="tab ${adv ? '' : 'sel'}" role="tab" aria-selected="${!adv}" data-tab="read">${esc(t('tabRead'))}</button></div>`;
  if (adv) {
    const card = (s, i) => `<button class="tile row adv" style="${cv(i + 3)}" data-a="${s.id}"><span class="ic" aria-hidden="true">${s.icon}</span><span class="grow">${esc(L2(s.title))}<small class="age">${esc(L2(s.origin))} · ${esc(t('ages', {a:s.a}))}</small><small class="age">${seenOf(s) ? '🌟 ' + esc(t('endsFound', {a:seenOf(s), b:endCount(s)})) : '✨'}</small></span></button>`;
    const grp = (g, k) => `<h2 class="hd">${esc(t(k))}</h2><div class="slist">${CA.ADV.filter(s => s.group === g).map(card).join('')}</div>`;
    body += `<p class="sub">${esc(t('advHub'))}</p>${grp('epic', 'grpEpic')}${grp('tale', 'grpTale')}`;
  } else {
    body += `<p class="sub">${esc(t('pickStory'))}</p><div class="slist">${CS.STORIES.map((s, i) => `<button class="tile row" style="${cv(i + 3)}" data-s="${i}"><span class="ic" aria-hidden="true">${s.e}</span><span>${esc(L2(s.title))}<small class="age">${esc(t('ages', {a:s.a}))}</small></span></button>`).join('')}</div>`;
  }
  shell(t('storyTitle'), body);
  app.querySelectorAll('[data-tab]').forEach(b => b.onclick = () => { storyTab = b.dataset.tab; sfx.tap(); go('story'); });
  app.querySelectorAll('[data-s]').forEach(b => b.onclick = () => { sfx.tap(); go('read', [+b.dataset.s, 0]); });
  app.querySelectorAll('[data-a]').forEach(b => b.onclick = () => { sfx.tap(); const s = CA.ADV.find(x => x.id === b.dataset.a); go('adv', {id:s.id, node:s.start, hist:[], from:'story'}); });
};

const REWARD = {wise:3, ok:2, oops:1};
screens.adv = o => {
  const s = CA.ADV.find(x => x.id === o.id), n = s.nodes[o.node], hi = S.lang === 'hi';
  const tx = hi ? n.hi : n.en, back = o.from || 'story';
  const art = `<div class="scn bg-${n.bg}"><span class="sun" aria-hidden="true"></span><div class="art" aria-hidden="true">${n.art}</div></div>`;
  const nextTo = (to) => { sfx.tap(); go('adv', Object.assign({}, o, {node:to, hist:o.hist.concat(o.node)})); };
  if (!n.end) {
    shell(L2(s.title), `${art}<div class="card narr"><button class="round" id="rp" aria-label="${esc(t('readMe'))}">🔊</button><p class="story">${esc(tx)}</p></div><h2 class="hd center">${esc(t('chooseWhat'))}</h2><div class="choices">${n.c.map((c, k) => `<button class="choice" style="${cv(k + 1)}" data-c="${k}"><span class="num">${k + 1}</span><span>${esc(hi ? c.hi : c.en)}</span></button>`).join('')}</div>`, back);
    sayClip('adv-' + s.id, o.node, tx);
    app.querySelector('#rp').onclick = () => sayClip('adv-' + s.id, o.node, tx);
    app.querySelectorAll('[data-c]').forEach(b => b.onclick = () => nextTo(n.c[+b.dataset.c].to));
    return;
  }
  /* an ending */
  const rec = S.adv[s.id] || (S.adv[s.id] = {seen:[]}); let gain = 0;
  if (!rec.seen.includes(o.node)) { rec.seen.push(o.node); gain = REWARD[n.end]; if (gain) addStars(gain); stat('adv', n.end !== 'oops'); save(); }
  const got = checkStickers();
  if (n.end === 'oops') sfx.no(); else { sfx.win(); if (n.end === 'wise') burst(); }
  const head = t(n.end === 'wise' ? 'endWise' : n.end === 'ok' ? 'endOk' : 'endOops');
  const lesson = L2(s.lesson), good = n.end !== 'oops';
  const btns = good
    ? `<button class="btn wide" id="again">${esc(t('tryOther'))}</button><button class="btn plain" id="more">${esc(t('moreAdv'))}</button>`
    : `<button class="btn wide" id="bk">${esc(t('goBack'))}</button><button class="btn plain" id="again">${esc(t('startOver'))}</button>`;
  shell(L2(s.title), `${art}<div class="card narr end-${n.end}"><button class="round" id="rp" aria-label="${esc(t('readMe'))}">🔊</button><h2 class="title">${esc(head)}</h2><p class="story">${esc(tx)}</p></div>
  ${good ? `<div class="lesson"><small>${esc(t('lessonIs'))}</small><button class="lsn" id="ls">💡 ${esc(lesson)}</button></div>` : ''}
  <p class="sub center">${gain ? esc(t('newEnding', {x:gain})) + '<br>' : ''}🌟 ${esc(t('endsFound', {a:rec.seen.length, b:endCount(s)}))}</p>${got.length ? `<div class="card"><div class="big">${got.join(' ')}</div><p class="sub">${esc(t('newSticker'))}</p></div>` : ''}${btns}`, back);
  sayClip('adv-' + s.id, o.node, good ? tx + ' ' + lesson : tx);
  app.querySelector('#rp').onclick = () => sayClip('adv-' + s.id, o.node, good ? tx + ' ' + lesson : tx);
  const ls = app.querySelector('#ls'); if (ls) ls.onclick = () => say(lesson);
  const m = app.querySelector('#more'); if (m) m.onclick = () => { sfx.tap(); go('story'); };
  const bk = app.querySelector('#bk'); if (bk) bk.onclick = () => { sfx.tap(); const h = o.hist.slice(), prev = h.pop(); go('adv', Object.assign({}, o, {node:prev, hist:h})); };
  app.querySelector('#again').onclick = () => { sfx.tap(); go('adv', Object.assign({}, o, {node:s.start, hist:[]})); };
};
