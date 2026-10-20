"use strict";
/* ---------- start ---------- */
go(S.level ? 'home' : 'onboard');
if ('serviceWorker' in navigator && /^https?:/.test(location.protocol)) { navigator.serviceWorker.register('sw.js').catch(() => {}); }
