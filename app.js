'use strict';
(() => {
  const $ = (sel, el = document) => el.querySelector(sel);
  const $$ = (sel, el = document) => [...el.querySelectorAll(sel)];
  const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const enc = encodeURIComponent;

  /* ================= icons ================= */
  const ICONS = {
    music: '<path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>',
    list: '<path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/>',
    listPlus: '<path d="M11 12H3M16 6H3M16 18H3M18 9v6M21 12h-6"/>',
    star: '<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z"/>',
    sliders: '<path d="M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 16h6"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    search: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
    play: '<path d="M7 4.5v15a1 1 0 0 0 1.5.86l12.5-7.5a1 1 0 0 0 0-1.72L8.5 3.64A1 1 0 0 0 7 4.5z"/>',
    pause: '<rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/>',
    metro: '<path d="M12 11.5 17.5 3M7.2 21h9.6a2 2 0 0 0 1.94-2.49L15.5 5.5A2 2 0 0 0 13.56 4h-3.12a2 2 0 0 0-1.94 1.5L5.26 18.5A2 2 0 0 0 7.2 21zM7 16h10"/>',
    scroll: '<path d="M12 5v14M19 12l-7 7-7-7"/>',
    share: '<path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8M16 6l-4-4-4 4M12 2v13"/>',
    edit: '<path d="M12 20h9M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4z"/>',
    printer: '<path d="M6 9V2h12v7M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2M6 14h12v8H6z"/>',
    stage: '<path d="M8 3H5a2 2 0 0 0-2 2v3M21 8V5a2 2 0 0 0-2-2h-3M3 16v3a2 2 0 0 0 2 2h3M16 21h3a2 2 0 0 0 2-2v-3"/>',
    chevL: '<path d="m15 18-6-6 6-6"/>',
    chevR: '<path d="m9 18 6-6-6-6"/>',
    up: '<path d="m18 15-6-6-6 6"/>',
    down: '<path d="m6 9 6 6 6-6"/>',
    x: '<path d="M18 6 6 18M6 6l12 12"/>',
    check: '<path d="M20 6 9 17l-5-5"/>',
    transpose: '<path d="M7 4v16M7 4 3 8M7 4l4 4M17 20V4M17 20l-4-4M17 20l4-4"/>',
    lock: '<rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
    users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>',
    download: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>',
    upload: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12"/>',
    trash: '<path d="M3 6h18M8 6V4h8v2M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>',
    calendar: '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',
    link: '<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>',
    copy: '<rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>',
    file: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/>',
    volume: '<path d="M11 5 6 9H2v6h4l5 4zM15.54 8.46a5 5 0 0 1 0 7.07M19.07 4.93a10 10 0 0 1 0 14.14"/>',
    mute: '<path d="M11 5 6 9H2v6h4l5 4zM22 9l-6 6M16 9l6 6"/>',
    info: '<circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>',
    help: '<circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3M12 17h.01"/>',
    hand: '<path d="M18 11V6a2 2 0 0 0-4 0M14 10V4a2 2 0 0 0-4 0v2M10 10.5V6a2 2 0 0 0-4 0v8"/><path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"/>',
    mic: '<path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2M12 19v3"/>',
    piano: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="M8 4v10M12 4v16M16 4v10M6 14h4M14 14h4"/>',
    guitar: '<path d="m11.9 12.1 4.51-4.51M20.1 2.3a1 1 0 0 0-1.4 0l-1.11 1.1a1 1 0 0 0 0 1.4l1.1 1.1a1 1 0 0 0 1.41 0l1.1-1.1a1 1 0 0 0 0-1.4z"/><path d="M6 16h.01M10.1 11.3a3 3 0 0 0-4.25.9l-.03.06a3 3 0 0 1-2.6 1.7 2.12 2.12 0 0 0-1.5 3.62l4.99 5a2.12 2.12 0 0 0 3.62-1.5 3 3 0 0 1 1.7-2.6l.05-.03a3 3 0 0 0 .9-4.25z"/>',
  };
  const icon = (n, cls = '') => `<svg class="ic ${cls}" viewBox="0 0 24 24" aria-hidden="true">${ICONS[n] || ''}</svg>`;

  /* ================= storage ================= */
  const LIB_KEY = 'stobite-chords:library';
  const SET_KEY = 'stobite-chords:setlists';
  const PREF_KEY = 'stobite-chords:prefs';
  const TEAM_KEY = 'stobite-chords:team';

  function readJSON(key, fallback) {
    try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; } catch { return fallback; }
  }
  function writeJSON(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); return true; } catch { toast('Could not save on this device (storage blocked or full)'); return false; }
  }

  // The library is either personal (this device only) or a team's (synced through Supabase).
  // A team's songs are cached on the device too, so everything works offline.
  let team = readJSON(TEAM_KEY, null); // { id, name, code, role, myName }
  const spaceKey = (k) => `stobite-chords:team:${team.id}:${k}`;
  const libKey = () => (team ? spaceKey('songs') : LIB_KEY);
  const setKey = () => (team ? spaceKey('setlists') : SET_KEY);
  const syncedKey = () => spaceKey('synced');
  const sync = { client: null, channel: null, status: 'off', detail: '', timer: 0, pushing: false, again: false, members: [], userId: null, pendingRefresh: false };
  let synced = { songs: {}, sets: {} }; // what the server has: id -> { u: updated, d: deleted }

  const starterById = Object.fromEntries(STARTER_SONGS.map((s) => [s.id, s]));
  let songs = [], setlists = [];
  function loadSpace() {
    songs = readJSON(libKey(), null);
    if (!Array.isArray(songs)) songs = team ? [] : STARTER_SONGS.map((s) => ({ ...s, tags: [...s.tags] }));
    for (const s of songs) {
      if (!Array.isArray(s.tags)) s.tags = !s.updated && starterById[s.id] ? [...starterById[s.id].tags] : [];
    }
    setlists = readJSON(setKey(), []);
    if (!Array.isArray(setlists)) setlists = [];
    synced = team ? readJSON(syncedKey(), { songs: {}, sets: {} }) : { songs: {}, sets: {} };
  }
  loadSpace();
  const prefs = Object.assign(
    { mode: 'numbers', part: 'keys', size: 20, theme: 'auto', favs: [], recent: [], metroSound: true, sort: 'title', scrollSpeed: 3 },
    readJSON(PREF_KEY, {}),
  );
  delete prefs.shift; delete prefs.defaultShift; // replaced by myKey / songKeys
  writeJSON(libKey(), songs);

  function saveLibrary() { const ok = writeJSON(libKey(), songs); scheduleSync(); return ok; }
  function saveSets() { const ok = writeJSON(setKey(), setlists); scheduleSync(); return ok; }
  function savePrefs() { writeJSON(PREF_KEY, prefs); }
  const byId = (id) => songs.find((s) => s.id === id);
  const setById = (id) => setlists.find((s) => s.id === id);
  const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
  const isFav = (id) => prefs.favs.includes(id);

  const HUES = [258, 282, 312, 338, 8, 24, 152, 172, 196, 218];
  function hueOf(str) {
    let h = 0;
    for (const ch of String(str)) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
    return HUES[h % HUES.length];
  }

  /* ================= music theory ================= */
  const NOTE_SEMI = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 };
  const SHARPS = ['C', 'C♯', 'D', 'D♯', 'E', 'F', 'F♯', 'G', 'G♯', 'A', 'A♯', 'B'];
  const FLATS = ['C', 'D♭', 'D', 'E♭', 'E', 'F', 'G♭', 'G', 'A♭', 'A', 'B♭', 'B'];
  const DEGREE_SEMI = { 1: 0, 2: 2, 3: 4, 4: 5, 5: 7, 6: 9, 7: 11 };
  const SEMI_DEGREE = ['1', 'b2', '2', 'b3', '3', '4', '#4', '5', 'b6', '6', 'b7', '7'];
  // Chromatic sol-fa by semitone above "do": do de re ma mi fa fi so zi la ta ti
  // The band's chromatic sol-fa, one name per semitone above "do" (editable in Settings → Chord language).
  const DEFAULT_SOLFA = ['do', 'di', 're', 'mo', 'mi', 'fa', 'fi', 'so', 'zi', 'la', 'to', 'ti'];
  const SOLFA_LABELS = ['1', '♯1 / ♭2', '2', '♯2 / ♭3', '3', '4', '♯4 / ♭5', '5', '♯5 / ♭6', '6', '♯6 / ♭7', '7'];
  const solfaOf = (semi) => (language.solfa && language.solfa[semi]) || DEFAULT_SOLFA[semi];
  const FLAT_KEYS = new Set(['F', 'Bb', 'Eb', 'Ab', 'Db', 'Gb', 'Dm', 'Gm', 'Cm', 'Fm', 'Bbm', 'Ebm']);
  const LETTERS = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
  // The keys the band uses (minor keys from older songs still work).
  const KEYS = ['C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab', 'A', 'Bb', 'B'];
  const TIMES = ['4/4', '3/4', '6/8', '2/4', '12/8', '9/8', '2/2'];
  const TAG_SUGGESTIONS = ['Praise', 'Worship', 'Hymn', 'Gospel', 'Communion', 'Offering', 'Altar call', 'Christmas', 'Easter', 'Kids', 'Opening', 'Closing'];

  const normAcc = (a) => (a === '♭' ? 'b' : a === '♯' ? '#' : a || '');
  const prettyAcc = (a) => (a === 'b' ? '♭' : a === '#' ? '♯' : '');
  const prettyKey = (k) => String(k || '').replace(/^([A-G])b/, '$1♭').replace(/^([A-G])#/, '$1♯');
  const prettyQual = (q) => q.replace(/b(?=\d)/g, '♭').replace(/#(?=\d)/g, '♯');

  /** Words and symbols people type -> one spelling: "flat6"/"6flat"/"♭6" -> b6, "aug" -> +, "dim" -> °. */
  function normTok(t) {
    return String(t)
      .replace(/flat/gi, 'b').replace(/sharp/gi, '#').replace(/♭/g, 'b').replace(/♯/g, '#')
      .replace(/half-?dim(?:inished)?/gi, 'ø')
      .replace(/aug(?:mented|ment)?/gi, '+')
      .replace(/dim(?:inished)?/gi, '°');
  }
  /** Turn typed words into symbols inside a chord, keeping everything else as written. */
  const symbolizeTok = (t) => String(t).replace(/flat/gi, '♭').replace(/sharp/gi, '♯');

  const QUAL_RE = /^(?:maj|min|m|M|Δ|sus|add|no|°|ø|\+|-|[b#](?=\d)|\d|\(|\)|,)*$/;
  // Accidental may come before (b6, #4) or after the number (6b, 5#); "7b9" keeps b9 as an extension.
  const NUM_RE = /^([b#]?)([1-7])([b#](?!\d))?([^/]*?)(?:\/([b#]?)([1-7])([b#](?!\d))?)?$/;
  const LET_RE = /^([A-G])([b#]?)([^/]*?)(?:\/([A-G])([b#]?))?$/;

  function parseNum(tok) {
    const m = NUM_RE.exec(normTok(tok));
    if (!m || !QUAL_RE.test(m[4])) return null;
    return {
      acc: m[1] || m[3] || '', post: !m[1] && !!m[3], deg: +m[2], qual: m[4],
      bass: m[6] ? { acc: m[5] || m[7] || '', post: !m[5] && !!m[7], deg: +m[6] } : null,
    };
  }
  const noteSemi = (letter, acc) => (NOTE_SEMI[letter] + (acc === '#' ? 1 : acc === 'b' ? -1 : 0) + 12) % 12;
  function parseLetter(tok) {
    const m = LET_RE.exec(normTok(tok));
    if (!m || !QUAL_RE.test(m[3])) return null;
    return { root: noteSemi(m[1], m[2]), qual: m[3], bass: m[4] ? noteSemi(m[4], m[5]) : null };
  }
  function keyInfo(key) {
    const m = /^([A-G])([b#♭♯]?)(m?)$/.exec(String(key || '').trim());
    if (!m) return null;
    const acc = normAcc(m[2]);
    return { semi: noteSemi(m[1], acc), letter: LETTERS.indexOf(m[1]), minor: !!m[3], flat: acc === 'b' || FLAT_KEYS.has(m[1] + acc + m[3]) };
  }
  const numSemi = (acc, deg) => (DEGREE_SEMI[deg] + (acc === '#' ? 1 : acc === 'b' ? -1 : 0) + 12) % 12;

  /** "Em" in key G -> "6m", "C/E" in C -> "1/3" */
  function letterToNumber(tok, key) {
    const p = parseLetter(tok), k = keyInfo(key);
    if (!p || !k) return tok;
    const deg = (s) => SEMI_DEGREE[(s - k.semi + 12) % 12];
    return deg(p.root) + p.qual + (p.bass != null ? '/' + deg(p.bass) : '');
  }

  const ACC_SIGN = { '-2': '𝄫', '-1': '♭', 0: '', 1: '♯', 2: '𝄪' };
  /** Spell scale degree (with accidental) in a key using the right letter: 3 in C♯ is E♯, ♭7 in C is B♭. */
  function spellRoot(acc, deg, k) {
    const letter = LETTERS[(k.letter + deg - 1) % 7];
    const semi = (k.semi + numSemi(acc, deg)) % 12;
    const diff = ((semi - NOTE_SEMI[letter] + 18) % 12) - 6;
    return { name: letter + (ACC_SIGN[diff] ?? ''), semi, letter: LETTERS.indexOf(letter) };
  }

  /* ---------- the band's chord language ---------- */
  const LANG_KEY = 'stobite-chords:language';
  // [id, label, quality as written in a chord]
  const QUALITIES = [
    ['maj', 'Major', ''], ['min', 'Minor', 'm'], ['dim', 'Diminished', '°'], ['aug', 'Augmented', '+'],
    ['min#5', 'Minor ♯5', 'm#5'], ['sus4', 'Sus 4', 'sus4'], ['sus2', 'Sus 2', 'sus2'],
    ['7', 'Dominant 7', '7'], ['maj7', 'Major 7', 'maj7'], ['m7', 'Minor 7', 'm7'], ['dim7', 'Diminished 7', '°7'],
  ];
  const QCODE = Object.fromEntries(QUALITIES.map((q) => [q[0], q[2]]));
  const DEFAULT_LANGUAGE = {
    plain: { 1: 'maj', 2: 'min', 3: 'min', 4: 'maj', 5: 'maj', 6: 'min', 7: 'dim' },
    custom: [
      { name: '4m', root: '4', quality: 'min' },
      { name: '1#', root: '6', quality: 'maj' },
      { name: '4#', root: '2', quality: 'maj' },
      { name: '5#', root: '3', quality: 'maj' },
      { name: '6#', root: '2', quality: 'min#5' },
    ],
    solfa: DEFAULT_SOLFA.slice(),
    updated: 0,
  };
  let language = readJSON(LANG_KEY, null) || JSON.parse(JSON.stringify(DEFAULT_LANGUAGE));
  const customFor = (main) => language.custom.find((c) => c.name && normTok(c.name) === main);
  const sameQual = (a, b) => normTok(a).replace(/^(min|-)/, 'm') === normTok(b).replace(/^(min|-)/, 'm');

  function splitBass(n) {
    const i = n.lastIndexOf('/');
    if (i > 0) {
      const b = /^([b#]?)([1-7])([b#]?)$/.exec(n.slice(i + 1));
      if (b) return [n.slice(0, i), { acc: b[1] || b[3] || '', post: !b[1] && !!b[3], deg: +b[2] }];
    }
    return [n, null];
  }

  /**
   * Read a chord the way the band speaks it. Plain 2, 3, 6 are minor; special names like 1# or 6#
   * come from the language settings. Returns { acc, deg, qual (real quality), shown (quality to print), label, custom, bass }.
   */
  function resolveChord(tok, songKey) {
    let n = normTok(tok);
    if (!/^[b#]?[1-7]/.test(n)) {
      if (!parseLetter(n) || !keyInfo(songKey)) return null;
      n = letterToNumber(n, songKey);
    }
    const [main, bass] = splitBass(n);
    const c = customFor(main);
    if (c) {
      const r = /^([b#]?)([1-7])$/.exec(normTok(c.root));
      if (r) return { acc: r[1], post: false, deg: +r[2], qual: QCODE[c.quality] ?? '', shown: '', label: c.name, solfa: (c.solfa || '').trim(), custom: true, bass };
    }
    const p = parseNum(main);
    if (!p) return null;
    const implied = p.acc ? '' : (QCODE[language.plain[p.deg]] ?? '');
    let qual = p.qual, shown = p.qual;
    if (!qual) qual = implied;
    else if (!p.acc && sameQual(qual, implied)) shown = '';
    return { acc: p.acc, post: p.post, deg: p.deg, qual, shown, label: null, custom: false, bass: bass || p.bass };
  }
  const parseAny = resolveChord;

  function degName(acc, deg, post, mode, key) {
    if (mode === 'solfa') return solfaOf(numSemi(acc, deg));
    if (mode === 'letters') { const k = keyInfo(key); if (k) return spellRoot(acc, deg, k).name; }
    return post ? deg + prettyAcc(acc) : prettyAcc(acc) + deg;
  }
  const prettyName = (label) => normTok(label).replace(/b(?=\d)|(?<=\d)b/g, '♭').replace(/#/g, '♯');

  /** One chord token -> display HTML for the current mode (numbers / solfa / letters) and part (keys / bass). */
  function chordHTML(tok, o) {
    const r = resolveChord(tok, o.songKey);
    if (!r) return esc(tok);
    if (o.part === 'bass') {
      const b = r.bass || r;
      return esc(degName(b.acc, b.deg, b.post, o.mode, o.viewKey));
    }
    const bassHTML = r.bass ? '/' + esc(degName(r.bass.acc, r.bass.deg, r.bass.post, o.mode, o.viewKey)) : '';
    const q = (x) => (x ? `<span class="q">${esc(prettyQual(x))}</span>` : '');
    if (o.mode === 'letters') return esc(degName(r.acc, r.deg, false, 'letters', o.viewKey)) + q(r.qual) + bassHTML;
    if (r.custom) {
      if (o.mode === 'solfa' && r.solfa) return esc(r.solfa) + bassHTML;
      if (o.mode === 'solfa') {
        const m = /^([b#]?)([1-7])(.*)$/.exec(normTok(r.label));
        if (m) return esc(degName(m[1], +m[2], false, 'solfa')) + q(m[3].replace(/#/g, '♯').replace(/^b$/, '♭')) + bassHTML;
      }
      return esc(prettyName(r.label)) + bassHTML;
    }
    return esc(degName(r.acc, r.deg, r.post, o.mode, o.viewKey)) + q(r.shown) + bassHTML;
  }
  /** Clickable chord: tapping it opens the note spelling. */
  const chordBtn = (tok, o) => (resolveChord(tok, o.songKey) ? `<span class="ch" data-ch="${esc(tok)}">${chordHTML(tok, o)}</span>` : esc(tok));

  /* ================= chord spelling ================= */
  /** Chord quality -> chord tones as {semi above root, letter step above root, label}. */
  function chordTones(q) {
    let s = normTok(q).replace(/[()\s,]/g, '');
    let third = { semi: 4, step: 2, label: '3' }, fifth = { semi: 7, step: 4, label: '5' }, seventh = null, power = false;
    const ext = [];
    const eat = (re) => { const m = re.exec(s); if (m) s = s.slice(m[0].length); return m; };
    const tone = (n, acc = '') => {
      const base = { 2: [2, 1], 4: [5, 3], 6: [9, 5], 9: [14, 1], 11: [17, 3], 13: [21, 5] }[n];
      if (!base) return null;
      return { semi: base[0] + (acc === '#' ? 1 : acc === 'b' ? -1 : 0), step: base[1], label: prettyAcc(acc) + n };
    };
    const upper = (n) => { if (n >= 9) ext.push(tone(9)); if (n === 11) ext.push(tone(11)); if (n === 13) ext.push(tone(13)); };
    let m;
    if (eat(/^ø7?/)) { third = { semi: 3, step: 2, label: '♭3' }; fifth = { semi: 6, step: 4, label: '♭5' }; seventh = { semi: 10, step: 6, label: '♭7' }; }
    else if (eat(/^°/)) { third = { semi: 3, step: 2, label: '♭3' }; fifth = { semi: 6, step: 4, label: '♭5' }; if (eat(/^7/)) seventh = { semi: 9, step: 6, label: '𝄫7' }; }
    else if (eat(/^\+/)) { fifth = { semi: 8, step: 4, label: '♯5' }; }
    else if ((m = eat(/^(?:maj|M|Δ)(13|11|9|7)?/))) { if (m[1]) { seventh = { semi: 11, step: 6, label: '7' }; upper(+m[1]); } }
    else if (eat(/^(?:min|m|-)/)) { third = { semi: 3, step: 2, label: '♭3' }; }
    if (!seventh && (m = eat(/^(?:maj|M|Δ)(13|11|9|7)/))) { seventh = { semi: 11, step: 6, label: '7' }; upper(+m[1]); }
    else if (!seventh && (m = eat(/^(13|11|9|7)/))) { seventh = { semi: 10, step: 6, label: '♭7' }; upper(+m[1]); }
    else if ((m = eat(/^6(?:\/?9)?/))) { ext.push(tone(6)); if (m[0].includes('9')) ext.push(tone(9)); }
    else if (eat(/^5$/)) power = true;
    else if (eat(/^2(?!\d)/)) ext.push(tone(2));
    let guard = 0;
    while (s && guard++ < 20) {
      if (eat(/^sus2/)) { third = { semi: 2, step: 1, label: '2' }; continue; }
      if (eat(/^sus4?/)) { third = { semi: 5, step: 3, label: '4' }; continue; }
      if (eat(/^\+/)) { fifth = { semi: 8, step: 4, label: '♯5' }; continue; }
      if ((m = eat(/^(?:maj|M|Δ)7/))) { seventh = { semi: 11, step: 6, label: '7' }; continue; }
      if ((m = eat(/^add([b#]?)(\d+)/))) { const t = tone(+m[2], m[1]); if (t) ext.push(t); continue; }
      if ((m = eat(/^([b#])(\d+)/))) {
        const n = +m[2];
        if (n === 5) fifth = { semi: m[1] === 'b' ? 6 : 8, step: 4, label: prettyAcc(m[1]) + '5' };
        else { const t = tone(n, m[1]); if (t) ext.push(t); }
        continue;
      }
      if ((m = eat(/^(\d+)/))) {
        const n = +m[1];
        if (n === 7 && !seventh) seventh = { semi: 10, step: 6, label: '♭7' };
        else { const t = tone(n); if (t) ext.push(t); }
        continue;
      }
      s = s.slice(1);
    }
    const out = [{ semi: 0, step: 0, label: '1' }];
    if (!power) out.push(third);
    out.push(fifth);
    if (seventh) out.push(seventh);
    for (const e of ext) if (e && !out.some((x) => x.semi % 12 === e.semi % 12)) out.push(e);
    return out;
  }

  function qualityName(q) {
    const n = normTok(q).replace(/[()\s]/g, '');
    const names = {
      '': 'major', m: 'minor', min: 'minor', '-': 'minor', '°': 'diminished', '+': 'augmented', ø: 'half-diminished', ø7: 'half-diminished',
      m7b5: 'half-diminished', 7: 'dominant 7th', m7: 'minor 7th', maj7: 'major 7th', M7: 'major 7th', '°7': 'diminished 7th',
      sus: 'suspended 4th', sus4: 'suspended 4th', sus2: 'suspended 2nd', 5: 'power chord', 6: 'major 6th', m6: 'minor 6th',
      9: 'dominant 9th', m9: 'minor 9th', maj9: 'major 9th', add9: 'add 9', 2: 'add 2', '7sus4': '7 suspended 4th',
      'm#5': 'minor ♯5', M: 'major', maj: 'major',
    };
    return names[n] || prettyQual(n);
  }

  /** Notes of a chord built on a degree of a key, spelled with the right letters. */
  function chordNotes(acc, deg, qual, k) {
    const root = spellRoot(acc, deg, k);
    return chordTones(qual).map((t) => {
      const letter = LETTERS[(root.letter + t.step) % 7];
      const target = (root.semi + t.semi) % 12;
      const diff = ((target - NOTE_SEMI[letter] + 18) % 12) - 6;
      return { name: letter + (ACC_SIGN[diff] ?? ''), semi: target, interval: t.semi };
    });
  }

  /** Spell a chord in a key: its real name (e.g. "D major") and its notes as letters. */
  function spellChord(tok, songKey, viewKey) {
    const r = resolveChord(tok, songKey);
    const k = keyInfo(viewKey) || keyInfo(songKey) || keyInfo('C');
    if (!r) return null;
    const root = spellRoot(r.acc, r.deg, k);
    const notes = chordNotes(r.acc, r.deg, r.qual, k);
    let bass = null;
    if (r.bass) {
      const b = spellRoot(r.bass.acc, r.bass.deg, k);
      const inChord = notes.find((n) => n.semi === b.semi);
      bass = { name: inChord ? inChord.name : b.name, semi: b.semi };
    }
    return { r, key: k, rootName: root.name, rootSemi: root.semi, name: `${root.name} ${qualityName(r.qual)}`, notes, bass };
  }

  /** Small piano with the chord's notes lit up (bass note in its own colour, an octave below). */
  function pianoSVG(sp) {
    const lit = new Map();
    const start = sp.bass ? 12 : 0;
    if (sp.bass) lit.set(sp.bass.semi, 'bass');
    sp.notes.forEach((n, i) => {
      let abs = start + sp.rootSemi + (n.interval % 12);
      if (i > 0 && abs <= start + sp.rootSemi) abs += 12;
      if (!lit.has(abs)) lit.set(abs, i === 0 ? 'root' : 'tone');
    });
    const maxAbs = Math.max(...lit.keys());
    const octaves = Math.max(2, Math.ceil((maxAbs + 1) / 12));
    const WHITE = [0, 2, 4, 5, 7, 9, 11], BLACK = { 1: 0, 3: 1, 6: 3, 8: 4, 10: 5 };
    const ww = 24, wh = 96, bw = 15, bh = 60, W = ww * 7 * octaves;
    let whites = '', blacks = '';
    for (let o = 0; o < octaves; o++) {
      WHITE.forEach((sm, i) => {
        const abs = o * 12 + sm, c = lit.get(abs), x = (o * 7 + i) * ww;
        whites += `<rect x="${x + 0.5}" y="0.5" width="${ww - 1}" height="${wh}" rx="4" class="pk w ${c || ''}"/>`;
        if (c) whites += `<circle cx="${x + ww / 2}" cy="${wh - 14}" r="5" class="pd ${c}"/>`;
      });
      for (const [sm, i] of Object.entries(BLACK)) {
        const abs = o * 12 + +sm, c = lit.get(abs), x = (o * 7 + i + 1) * ww - bw / 2;
        blacks += `<rect x="${x}" y="0.5" width="${bw}" height="${bh}" rx="3" class="pk b ${c || ''}"/>`;
      }
    }
    return `<svg class="piano" viewBox="0 0 ${W + 1} ${wh + 1}" role="img" aria-label="Piano showing ${esc(sp.notes.map((n) => n.name).join(', '))}">${whites}${blacks}</svg>`;
  }

  /* ================= chart parsing ================= */
  const SECTION_RE = /^\s*(?:\{\s*(.+?)\s*\}|((?:verse|chorus|pre-?chorus|bridge|intro|outro|tag|ending|interlude|refrain|coda|vamp|instrumental|hook|turnaround)(?:\s*\d+)?(?:\s*\(.*\))?)\s*:?)\s*$/i;
  const FILLER_RE = /^(?:\|+|-|\/|%|x\d+|\(x\d+\)|N\.?C\.?)$/i;
  const isChordTok = (t) => !!(parseNum(t) || parseLetter(t) || customFor(splitBass(normTok(t))[0]));

  function isChordLine(line) {
    if (!line || line.includes('[') || !line.trim()) return false;
    const toks = line.trim().split(/\s+/);
    return toks.some(isChordTok) && toks.every((t) => isChordTok(t) || FILLER_RE.test(t));
  }

  /** Chords typed on their own line above the lyric -> inline [chord] markers at the same columns. */
  function mergeChordLine(chordLine, lyric) {
    const toks = [];
    chordLine.replace(/\S+/g, (t, i) => { if (isChordTok(t)) toks.push({ t, i }); return t; });
    const len = lyric.trimEnd().length;
    let out = lyric.trimEnd();
    const inside = toks.filter((x) => x.i < len), beyond = toks.filter((x) => x.i >= len);
    for (let j = inside.length - 1; j >= 0; j--) out = out.slice(0, inside[j].i) + `[${inside[j].t}]` + out.slice(inside[j].i);
    for (const x of beyond) out += ` [${x.t}]`;
    return out;
  }

  function toInlineLines(text) {
    const src = String(text || '').replace(/\r/g, '').replace(/\t/g, '    ').split('\n');
    const out = [];
    for (let i = 0; i < src.length; i++) {
      const line = src[i];
      if (isChordLine(line)) {
        const next = src[i + 1];
        if (next != null && next.trim() && !isChordLine(next) && !SECTION_RE.test(next) && !next.includes('[') && !next.trim().startsWith('#')) {
          out.push(mergeChordLine(line, next));
          i++;
        } else {
          out.push(line.trim().split(/\s+/).map((t) => (isChordTok(t) ? `[${t}]` : t)).join(' '));
        }
        continue;
      }
      out.push(line);
    }
    return out;
  }

  function parseInline(line) {
    const segs = [], re = /\[([^\]]*)\]/g;
    let last = 0, chord = null, m;
    while ((m = re.exec(line))) {
      const text = line.slice(last, m.index);
      if (chord !== null || text) segs.push({ chord, text });
      chord = m[1].trim();
      last = re.lastIndex;
    }
    segs.push({ chord, text: line.slice(last) });
    return segs;
  }

  function sectionKind(name) {
    const n = name.toLowerCase();
    if (/pre-?chorus/.test(n)) return 'pre';
    if (/refrain/.test(n)) return 'refrain';
    if (/chorus|hook/.test(n)) return 'chorus';
    if (/bridge/.test(n)) return 'bridge';
    if (/verse/.test(n)) return 'verse';
    return 'other';
  }

  function renderLine(line, o) {
    if (!line.trim()) return '<div class="gap"></div>';
    if (line.trim().startsWith('#')) return `<div class="note">${esc(line.trim().replace(/^#+\s*/, ''))}</div>`;
    const segs = parseInline(line);
    if (o.part === 'lyrics') {
      const t = segs.map((s) => s.text).join('').replace(/\s+/g, ' ').trim();
      return t ? `<div class="plain">${esc(t)}</div>` : '';
    }
    if (!segs.some((s) => s.chord !== null)) return `<div class="plain">${esc(line)}</div>`;
    const hasText = segs.some((s) => s.text.trim());
    let html = `<div class="ln${hasText ? '' : ' only'}">`;
    for (const s of segs) {
      // First word sits under the chord; the rest become separate pieces so long lines wrap on phones.
      const words = s.text.match(/^\S*\s*|\S+\s*/g) || [''];
      words.forEach((w, k) => {
        const c = k === 0 && s.chord !== null
          ? `<span class="c">${s.chord.split(/\s+/).map((t) => chordBtn(t, o)).join(' ')}</span>` : '';
        html += `<span class="sg">${c}<span class="l">${esc(w)}</span></span>`;
      });
    }
    return html + '</div>';
  }

  function renderChart(text, o) {
    const blocks = [];
    let cur = { name: null, lines: [] };
    for (const raw of toInlineLines(text)) {
      const line = raw.replace(/\s+$/, '');
      const sec = line.trim() && SECTION_RE.exec(line);
      if (sec) { blocks.push(cur); cur = { name: sec[1] || sec[2], lines: [] }; continue; }
      cur.lines.push(line);
    }
    blocks.push(cur);
    let html = '';
    for (const b of blocks) {
      while (b.lines.length && !b.lines[0].trim()) b.lines.shift();
      while (b.lines.length && !b.lines[b.lines.length - 1].trim()) b.lines.pop();
      if (!b.name && !b.lines.length) continue;
      html += `<section class="blk k-${b.name ? sectionKind(b.name) : 'none'}">`;
      if (b.name) html += `<div class="blk-label">${esc(b.name)}</div>`;
      for (const line of b.lines) html += renderLine(line, o);
      html += '</section>';
    }
    return html;
  }

  function chordsUsed(text, o) {
    const seen = new Set(), out = [];
    for (const line of toInlineLines(text)) {
      line.replace(/\[([^\]]*)\]/g, (m, c) => {
        for (const t of c.trim().split(/\s+/)) {
          if (!isChordTok(t)) continue;
          const h = chordHTML(t, o);
          if (!seen.has(h)) { seen.add(h); out.push(`<b class="ch" data-ch="${esc(t)}">${h}</b>`); }
        }
        return m;
      });
    }
    return out;
  }

  /** On save: letter chords (G, C/E, Em) become numbers in the song's key, keeping chord-line columns. */
  function convertLetters(text, key) {
    let changed = 0;
    const conv = (t) => {
      if (!parseNum(t) && parseLetter(t) && keyInfo(key)) { changed++; return letterToNumber(symbolizeTok(t), key); }
      return isChordTok(t) ? symbolizeTok(t) : t;
    };
    const out = String(text).split('\n').map((line) => {
      if (isChordLine(line)) {
        let res = '';
        line.replace(/\S+/g, (t, i) => {
          const col = res.length ? Math.max(i, res.length + 1) : i;
          res = res.padEnd(col, ' ') + conv(t);
          return t;
        });
        return res;
      }
      return line.replace(/\[([^\]]+)\]/g, (m, t) => '[' + t.trim().split(/\s+/).map(conv).join(' ') + ']');
    }).join('\n');
    return { text: out, changed };
  }

  const stripChords = (t) => String(t || '').replace(/\[[^\]]*\]/g, '');

  /* ================= shell ================= */
  const state = { part: prefs.part, route: null, query: '', tag: null, selecting: false, selected: new Set(), visible: [], song: null, set: null, setIdx: 0, viewKey: null, viewKeyFor: null, scrollMode: false, wake: null };

  $('#app').innerHTML = `
    <aside class="side" id="side"></aside>
    <main class="main" id="main"></main>
    <nav class="tabs" id="tabs"></nav>`;
  const main = $('#main');
  const dock = document.createElement('div');
  dock.className = 'dock';
  dock.id = 'dock';
  document.body.append(dock);

  const NAV = [
    { key: 'songs', href: '#/', icon: 'music', label: 'Songs' },
    { key: 'sets', href: '#/sets', icon: 'list', label: 'Setlists' },
    { key: 'favorites', href: '#/favorites', icon: 'star', label: 'Favorites' },
    { key: 'settings', href: '#/settings', icon: 'sliders', label: 'Settings' },
  ];

  function navKey(r) {
    if (r.name === 'songs') return r.fav ? 'favorites' : 'songs';
    if (r.name === 'sets' || r.name === 'set' || (r.name === 'song' && r.setId)) return 'sets';
    if (r.name === 'settings' || r.name === 'language') return 'settings';
    return 'songs';
  }

  function renderNav() {
    const active = navKey(state.route);
    const counts = { songs: songs.length, sets: setlists.length, favorites: prefs.favs.filter(byId).length };
    const recentSets = [...setlists].sort(bySetDate).slice(0, 6);
    $('#side').innerHTML = `
      <a class="brand" href="#/"><span class="logo"><img src="icon.svg" alt=""></span><span>Stobite Chords<small>Chord charts for worship</small></span></a>
      <a class="btn primary new" href="#/new">${icon('plus')}New song</a>
      <nav class="nav">${NAV.map((n) => `<a href="${n.href}" class="${n.key === active ? 'on' : ''}">${icon(n.icon)}${n.label}${counts[n.key] != null ? `<span class="n">${counts[n.key]}</span>` : ''}</a>`).join('')}</nav>
      ${recentSets.length ? `<div class="side-h">Setlists</div><div class="side-sets">${recentSets.map((s) => `<a href="#/set/${enc(s.id)}" style="--h:${hueOf(s.id)}"><i></i><span>${esc(s.name)}</span></a>`).join('')}</div>` : ''}
      <a class="side-foot sync-pill" href="#/settings" data-sync>${syncPill()}</a>`;
    $('#tabs').innerHTML = NAV.map((n) => `<a href="${n.href}" class="${n.key === active ? 'on' : ''}">${icon(n.icon)}${n.label}</a>`).join('');
  }

  function applyTheme() {
    if (prefs.theme === 'auto') delete document.documentElement.dataset.theme;
    else document.documentElement.dataset.theme = prefs.theme;
    const dark = prefs.theme === 'dark' || (prefs.theme === 'auto' && matchMedia('(prefers-color-scheme: dark)').matches);
    $('meta[name="theme-color"]').setAttribute('content', dark ? '#0e0c18' : '#f5f4fb');
  }
  applyTheme();
  matchMedia('(prefers-color-scheme: dark)').addEventListener?.('change', applyTheme);

  /* ================= routing ================= */
  function parseRoute() {
    const h = location.hash || '#/';
    if (h.startsWith('#import=')) return { name: 'import', code: h.slice(8) };
    if (h.startsWith('#join=')) return { name: 'join', code: decodeURIComponent(h.slice(6)) };
    const p = h.replace(/^#\/?/, '').split('/').map((x) => decodeURIComponent(x));
    switch (p[0]) {
      case 'favorites': return { name: 'songs', fav: true };
      case 'sets': return { name: 'sets' };
      case 'set': return p[2] != null && p[2] !== '' ? { name: 'song', setId: p[1], index: +p[2] || 0 } : { name: 'set', id: p[1] };
      case 's': return { name: 'song', id: p[1] };
      case 'e': return { name: 'edit', id: p[1] };
      case 'new': return { name: 'edit', id: null };
      case 'settings': return { name: 'settings' };
      case 'language': return { name: 'language' };
      default: return { name: 'songs', fav: false };
    }
  }

  function route() {
    const r = parseRoute();
    if (r.name === 'import') { handleIncomingLink(r.code); return; }
    if (r.name === 'join') {
      history.replaceState(null, '', location.pathname + location.search + '#/');
      route();
      if (team && team.code === r.code.replace(/[^A-Za-z0-9]/g, '').toUpperCase()) toast(`You're already in ${team.name}`);
      else if (!cloudReady()) toast('Team sync isn’t switched on in this copy of the app');
      else openJoinTeam(r.code);
      return;
    }
    state.route = r;
    stopScroll(true);
    toggleMetro(false);
    if (r.name !== 'song') { exitStage(); releaseWake(); }
    document.body.classList.toggle('focus', r.name === 'song' || r.name === 'edit');
    document.body.classList.remove('bass', 'lyrics');
    renderNav();
    if (r.name !== 'songs') { state.selecting = false; state.selected = new Set(); $('#selbar')?.remove(); }
    if (r.name === 'songs') viewSongs(r.fav);
    else if (r.name === 'sets') viewSets();
    else if (r.name === 'set') viewSet(r.id);
    else if (r.name === 'song') viewSong(r);
    else if (r.name === 'edit') viewEditor(r.id);
    else if (r.name === 'settings') viewSettings();
    else if (r.name === 'language') viewLanguage();
    window.scrollTo(0, 0);
    renderDock();
  }
  const go = (hash) => { location.hash = hash; };

  /* ================= songs view ================= */
  function allTags() {
    const set = new Map();
    for (const s of songs) for (const t of s.tags || []) set.set(t.toLowerCase(), t);
    return [...set.values()].sort((a, b) => a.localeCompare(b));
  }

  function songCard(s, picked) {
    return `<a class="song-card${picked ? ' picked' : ''}" href="#/s/${enc(s.id)}" data-id="${esc(s.id)}" style="--h:${hueOf(s.title)}">
      <span class="pick">${icon('check')}</span>
      <span class="av">${esc(prettyKey(s.key) || '—')}</span>
      <span class="sc-body">
        <span class="sc-title">${esc(s.title)}</span>
        <span class="sc-artist">${esc(s.artist || 'Unknown artist')}</span>
        ${s.tags && s.tags.length ? `<span class="sc-tags">${s.tags.slice(0, 3).map((t) => `<i>${esc(t)}</i>`).join('')}</span>` : ''}
      </span>
      <span class="sc-meta">${isFav(s.id) ? icon('star', 'fill star') : ''}${s.tempo ? `<span>${esc(s.tempo)} bpm</span>` : ''}${s.time ? `<span>${esc(s.time)}</span>` : ''}</span>
    </a>`;
  }

  function viewSongs(fav) {
    document.title = fav ? 'Favorites · Stobite Chords' : 'Stobite Chords';
    const recent = prefs.recent.map(byId).filter(Boolean).slice(0, 8);
    const tags = allTags();
    if (state.tag && !tags.includes(state.tag)) state.tag = null;
    main.innerHTML = `
      <header class="topbar">
        <div class="tb-title"><h1>${fav ? 'Favorites' : 'Songs'}</h1><p class="sub"><span id="count"></span>${team ? ` · <a class="sync-pill inline" href="#/settings" data-sync>${syncPill()}</a>` : ''}</p></div>
        <div class="tb-actions">
          <button class="btn ghost${state.selecting ? ' on' : ''}" data-act="select" title="Select songs to delete">${icon(state.selecting ? 'x' : 'check')}<span class="hide-sm">${state.selecting ? 'Done' : 'Select'}</span></button>
          <button class="btn ghost" data-act="import" title="Import songs">${icon('download')}<span class="hide-sm">Import</span></button>
          <button class="btn ghost" data-act="share-lib" title="Share library">${icon('share')}<span class="hide-sm">Share</span></button>
          <a class="btn primary" href="#/new">${icon('plus')}<span>New</span></a>
        </div>
      </header>
      <div class="content">
        ${!fav && recent.length > 1 ? `<h2 class="h-sm">Jump back in</h2><div class="rail">${recent.map((s) => `
          <a class="rc" href="#/s/${enc(s.id)}" style="--h:${hueOf(s.title)}"><b>${esc(s.title)}</b><span>Key ${esc(prettyKey(s.key))}</span></a>`).join('')}</div>` : ''}
        <div class="searchbar">${icon('search')}<input type="search" id="q" placeholder="Search title, artist or lyrics…" value="${esc(state.query)}" autocomplete="off"></div>
        <div class="filters">
          <div class="chips" id="chips">
            <button class="chip${state.tag ? '' : ' on'}" data-tag="">All</button>
            ${tags.map((t) => `<button class="chip${state.tag === t ? ' on' : ''}" data-tag="${esc(t)}">${esc(t)}</button>`).join('')}
          </div>
          <select class="sort" id="sort" aria-label="Sort songs">
            ${[['title', 'A–Z'], ['artist', 'Artist'], ['key', 'Key'], ['recent', 'Newest']].map(([v, l]) => `<option value="${v}"${prefs.sort === v ? ' selected' : ''}>${l}</option>`).join('')}
          </select>
        </div>
        <div class="song-grid" id="list"></div>
      </div>`;
    const q = $('#q');
    q.addEventListener('input', () => { state.query = q.value; fillList(fav); });
    $('#list').addEventListener('click', (e) => {
      if (!state.selecting) return;
      const c = e.target.closest('.song-card');
      if (!c) return;
      e.preventDefault();
      const id = c.dataset.id;
      state.selected.has(id) ? state.selected.delete(id) : state.selected.add(id);
      c.classList.toggle('picked', state.selected.has(id));
      drawSelectBar();
    });
    $('#sort').addEventListener('change', (e) => { prefs.sort = e.target.value; savePrefs(); fillList(fav); });
    $('#chips').addEventListener('click', (e) => {
      const c = e.target.closest('[data-tag]');
      if (!c) return;
      state.tag = c.dataset.tag || null;
      $$('#chips .chip').forEach((x) => x.classList.toggle('on', (x.dataset.tag || null) === state.tag));
      fillList(fav);
    });
    fillList(fav);
  }

  function fillList(fav) {
    const q = state.query.trim().toLowerCase();
    const base = fav ? songs.filter((s) => isFav(s.id)) : songs;
    const sorters = {
      title: (a, b) => a.title.localeCompare(b.title),
      artist: (a, b) => (a.artist || '~').localeCompare(b.artist || '~') || a.title.localeCompare(b.title),
      key: (a, b) => (a.key || '~').localeCompare(b.key || '~') || a.title.localeCompare(b.title),
      recent: (a, b) => (b.updated || 0) - (a.updated || 0) || a.title.localeCompare(b.title),
    };
    const list = base
      .filter((s) => !state.tag || (s.tags || []).includes(state.tag))
      .filter((s) => !q || `${s.title} ${s.artist} ${(s.tags || []).join(' ')} ${stripChords(s.chart)}`.toLowerCase().includes(q))
      .sort(sorters[prefs.sort] || sorters.title);
    $('#count').textContent = `${list.length === base.length ? '' : list.length + ' of '}${base.length} song${base.length === 1 ? '' : 's'}`;
    state.visible = list.map((s) => s.id);
    $('#list').classList.toggle('selecting', !!state.selecting);
    $('#list').innerHTML = list.map((s) => songCard(s, state.selecting && state.selected.has(s.id))).join('') || (fav && !base.length
      ? emptyState('star', 'No favorites yet', 'Tap the star on any song to keep it here for quick access.', '<a class="btn soft" href="#/">Browse songs</a>')
      : emptyState('search', 'No songs found', songs.length ? 'Try a different search or filter.' : 'Add your first song to get started.', '<a class="btn primary" href="#/new">' + icon('plus') + 'New song</a>'));
    drawSelectBar();
  }

  function drawSelectBar() {
    let bar = $('#selbar');
    if (!state.selecting) { bar?.remove(); return; }
    if (!bar) { bar = document.createElement('div'); bar.id = 'selbar'; bar.className = 'selbar'; main.append(bar); }
    const n = state.selected.size;
    bar.innerHTML = `<span><b>${n}</b> selected</span>
      <button class="btn ghost" data-act="select-all">${state.visible.length && state.visible.every((id) => state.selected.has(id)) ? 'Clear' : 'Select all'}</button>
      <button class="btn danger-fill" data-act="delete-selected" ${n ? '' : 'disabled'}>${icon('trash')}Delete</button>`;
  }

  /** Delete songs (after asking), removing them from favorites, recents and setlists. Offers Undo. */
  function confirmDelete(ids) {
    const list = ids.map(byId).filter(Boolean);
    if (!list.length) return false;
    const what = list.length === 1 ? `“${list[0].title}”` : `${list.length} songs`;
    if (!confirm(team ? `Delete ${what} for everyone in ${team.name}?` : `Delete ${what} from your library?`)) return false;
    const snap = { songs: [...songs], setlists: JSON.parse(JSON.stringify(setlists)), favs: [...prefs.favs], recent: [...prefs.recent] };
    const gone = new Set(ids);
    songs = songs.filter((s) => !gone.has(s.id));
    prefs.favs = prefs.favs.filter((x) => !gone.has(x));
    prefs.recent = prefs.recent.filter((x) => !gone.has(x));
    const stamp = Date.now();
    for (const st of setlists) {
      const n = st.items.length;
      st.items = st.items.filter((i) => !gone.has(i.songId));
      if (st.items.length !== n) st.updated = stamp;
    }
    saveLibrary(); saveSets(); savePrefs(); renderNav();
    toast(`Deleted ${what}`, 'Undo', () => {
      songs = snap.songs; setlists = snap.setlists; prefs.favs = snap.favs; prefs.recent = snap.recent;
      const now = Date.now(); // newer than the delete, so teammates get the songs back too
      for (const x of songs) if (gone.has(x.id)) x.updated = now;
      for (const st of setlists) if (st.items.some((i) => gone.has(i.songId))) st.updated = now;
      saveLibrary(); saveSets(); savePrefs(); route();
      toast('Restored');
    });
    return true;
  }

  const emptyState = (ic, title, text, action = '') =>
    `<div class="empty"><div class="bubble">${icon(ic)}</div><h3>${title}</h3><p>${text}</p>${action}</div>`;

  /* ================= song view ================= */
  function viewOpts(s) {
    return { mode: prefs.mode, part: state.part, songKey: s.key, viewKey: myKey(s) };
  }
  /** The key the band plays the song in: the setlist's key, else the song's "we play it in", else the original. */
  function songKeyInContext(s) {
    const item = state.set && state.set.items[state.setIdx];
    return (item && item.key) || s.playKey || s.key;
  }
  const KEY_BY_SEMI = ['C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab', 'A', 'Bb', 'B'];
  function keyFromSemi(semi, minor) { return KEY_BY_SEMI[((semi % 12) + 12) % 12] + (minor ? 'm' : ''); }
  /** My key: the band's key moved by my personal transposition for this song (kept on this device only). */
  /** My key for a song: the key I picked for this song, else my usual key (Settings), else the band's key. Device only. */
  function myKey(s) {
    const band = songKeyInContext(s), k = keyInfo(band);
    if (!k) return band;
    const pick = (prefs.songKeys || {})[s.id] || prefs.myKey;
    const p = keyInfo(pick);
    return p ? keyFromSemi(p.semi, k.minor) : band;
  }
  /** What a song follows when it has no key of its own: my usual key, or the band's key. */
  const defaultKeyFor = (s) => { const k = keyInfo(songKeyInContext(s)), p = keyInfo(prefs.myKey); return p && k ? keyFromSemi(p.semi, k.minor) : songKeyInContext(s); };

  function pushRecent(id) {
    prefs.recent = [id, ...prefs.recent.filter((x) => x !== id)].slice(0, 10);
    savePrefs();
  }

  function viewSong(r) {
    let s, set = null, idx = 0;
    if (r.setId) {
      set = setById(r.setId);
      if (!set || !set.items.length) { go(set ? '#/set/' + enc(set.id) : '#/sets'); return; }
      idx = Math.max(0, Math.min(r.index, set.items.length - 1));
      s = byId(set.items[idx].songId);
      if (!s) { toast('That song is no longer in your library'); go('#/set/' + enc(set.id)); return; }
    } else {
      s = byId(r.id);
      if (!s) { go('#/'); return; }
    }
    state.song = s; state.set = set; state.setIdx = idx;
    pushRecent(s.id);
    const ctx = set ? `${set.id}:${idx}` : s.id;
    state.viewKeyFor = ctx;
    const key = songKeyInContext(s);
    const fav = isFav(s.id);
    const prev = set && idx > 0 ? byId(set.items[idx - 1].songId) : null;
    const next = set && idx < set.items.length - 1 ? byId(set.items[idx + 1].songId) : null;
    document.title = `${s.title} · Stobite Chords`;
    main.innerHTML = `
      <header class="topbar">
        <a class="btn ghost" href="${set ? '#/set/' + enc(set.id) : '#/'}">${icon('chevL')}<span>${set ? 'Setlist' : 'Songs'}</span></a>
        <div class="tb-actions">
          <button class="btn ghost icon-only${fav ? ' on' : ''}" data-act="fav" title="${fav ? 'Remove from favorites' : 'Add to favorites'}">${icon('star', fav ? 'fill star' : '')}</button>
          <button class="btn ghost icon-only" data-act="add-to-set" title="Add to setlist">${icon('listPlus')}</button>
          <button class="btn ghost icon-only" data-act="share-song" title="Share song">${icon('share')}</button>
          <button class="btn ghost icon-only hide-sm" data-act="print" title="Print">${icon('printer')}</button>
          <button class="btn ghost icon-only danger" data-act="delete-song" title="Delete song">${icon('trash')}</button>
          <a class="btn soft" href="#/e/${enc(s.id)}">${icon('edit')}<span class="hide-sm">Edit</span></a>
        </div>
      </header>
      <div class="content narrow">
        <section class="hero" style="--h:${hueOf(s.title)}">
          <div>
            ${set ? `<a class="eyebrow" href="#/set/${enc(set.id)}">${icon('list')}${esc(set.name)} · ${idx + 1} of ${set.items.length}</a>`
              : s.tags && s.tags.length ? `<span class="eyebrow">${esc(s.tags.join(' · '))}</span>` : ''}
            <h1>${esc(s.title)}</h1>
            ${s.artist ? `<p class="hero-artist">${esc(s.artist)}</p>` : ''}
          </div>
          <div class="stats">
            <button class="stat stat-btn key-flip" data-act="flip-key" title="Tap to see the original key">
              <span class="flip"><span class="face"><span>Key</span><b>${esc(prettyKey(key) || '—')}</b><small class="mine" id="mineKey"></small></span>
              <span class="face back"><span>Original</span><b>${esc(prettyKey(s.key) || '—')}</b></span></span></button>
            <button class="stat stat-btn" data-act="metro" title="Start metronome"><span>Tempo</span><b>${esc(s.tempo || '—')}<small> bpm</small></b><i class="beat" id="heroBeat"></i></button>
            <div class="stat"><span>Time</span><b>${esc(s.time || '—')}</b></div>
          </div>
        </section>
        ${s.info ? `<div class="info-card">${icon('info')}<div>${esc(s.info)}</div></div>` : ''}
        <div class="controls" id="controls"></div>
        <div class="used" id="used"></div>
        <article class="chart-card" id="chartCard">
          <div class="stage-title">${esc(s.title)}${set ? ` · ${idx + 1}/${set.items.length}` : ''}</div>
          <div class="chart" id="chart"></div>
        </article>
        ${set ? `<nav class="set-nav">
          ${prev ? `<a href="#/set/${enc(set.id)}/${idx - 1}"><small>${icon('chevL')}Previous</small><b>${esc(prev.title)}</b></a>` : '<span class="dim"></span>'}
          ${next ? `<a class="next" href="#/set/${enc(set.id)}/${idx + 1}"><small>${icon('chevR')}Next up</small><b>${esc(next.title)}</b></a>` : ''}
        </nav>` : ''}
      </div>`;
    drawSong();
    requestWake();
    bindSwipe($('#chartCard'));
  }

  function drawSong() {
    const s = state.song;
    if (!s) return;
    const band = songKeyInContext(s), bk = keyInfo(band), mine = myKey(s);
    const lyrics = state.part === 'lyrics';
    const keyOpts = bk ? KEY_BY_SEMI.map((x) => {
      const kk = x + (bk.minor ? 'm' : '');
      const tags = [kk === band ? 'band' : '', kk === s.key && kk !== band ? 'original' : ''].filter(Boolean).join(', ');
      return `<option value="${esc(kk)}"${kk === mine ? ' selected' : ''}>${esc(prettyKey(kk))}${tags ? ` (${tags})` : ''}</option>`;
    }).join('') : '';
    $('#controls').innerHTML = `
      ${bk ? `<label class="tp-wrap${mine !== band ? ' moved' : ''}" title="Transpose for me (only on this device)">${icon('transpose')}<select class="pill-select tp" id="tp" aria-label="Transpose for me">${keyOpts}</select></label>` : ''}
      ${lyrics ? '' : `<div class="seg" role="group" aria-label="Chord names">
        ${[['numbers', '1 2 3'], ['solfa', 'do re mi'], ['letters', 'C D E']].map(([v, l]) =>
          `<button data-mode="${v}" aria-pressed="${prefs.mode === v}">${l}</button>`).join('')}
      </div>`}
      <div class="seg" role="group" aria-label="Text size"><button data-size="-2" aria-label="Smaller text">A−</button><button data-size="2" aria-label="Bigger text">A+</button></div>
      <button class="tool" data-act="stage" title="Full screen (F)">${icon('stage')}<span class="hide-sm">Full screen</span></button>
      <div class="seg part" role="group" aria-label="Show chords for">
        ${[['keys', 'piano', 'Keys'], ['bass', 'guitar', 'Bass'], ['lyrics', 'mic', 'Lyrics']].map(([v, ic, l]) =>
          `<button data-part="${v}" aria-pressed="${state.part === v}">${icon(ic)}${l}</button>`).join('')}
      </div>`;
    const mk = $('#mineKey');
    if (mk) mk.textContent = mine !== band ? `You: ${prettyKey(mine)}` : '';
    document.body.classList.toggle('bass', state.part === 'bass');
    document.body.classList.toggle('lyrics', lyrics);
    document.documentElement.style.setProperty('--lyric', prefs.size + 'px');
    const o = viewOpts(s);
    const used = lyrics ? [] : chordsUsed(s.chart, o);
    $('#used').innerHTML = used.length ? `<span>${state.part === 'bass' ? 'Bass notes' : 'Chords'}</span>${used.join('')}` : '';
    $('#chart').innerHTML = renderChart(s.chart, o) || '<p class="sub">This song has no lyrics yet. Tap Edit to add them.</p>';
    $('#tp')?.addEventListener('change', (e) => {
      const v = e.target.value;
      prefs.songKeys = prefs.songKeys || {};
      if (v === defaultKeyFor(s)) delete prefs.songKeys[s.id]; // same as usual: just follow it
      else prefs.songKeys[s.id] = v;
      savePrefs();
      drawSong();
      toast(v === band ? 'Back to the band’s key' : `Showing ${prettyKey(v)} for you`);
    });
  }

  function setStep(delta) {
    if (!state.set) return;
    const i = state.setIdx + delta;
    if (i < 0 || i >= state.set.items.length) return;
    go(`#/set/${enc(state.set.id)}/${i}`);
  }

  function bindSwipe(el) {
    if (!el || !state.set) return;
    let x0 = 0, y0 = 0, t0 = 0;
    el.addEventListener('touchstart', (e) => { const t = e.touches[0]; x0 = t.clientX; y0 = t.clientY; t0 = Date.now(); }, { passive: true });
    el.addEventListener('touchend', (e) => {
      const t = e.changedTouches[0], dx = t.clientX - x0, dy = t.clientY - y0;
      if (Date.now() - t0 < 600 && Math.abs(dx) > 80 && Math.abs(dy) < 60) setStep(dx < 0 ? 1 : -1);
    }, { passive: true });
  }

  /* ---------- autoscroll ---------- */
  const scroller = { on: false, raf: 0, last: 0, acc: 0 };
  const speedPx = () => 6 + prefs.scrollSpeed * 6;
  function scrollStep(t) {
    const dt = Math.min(0.1, (t - scroller.last) / 1000);
    scroller.last = t;
    scroller.acc += dt * speedPx();
    const whole = Math.floor(scroller.acc);
    if (whole >= 1) { window.scrollBy(0, whole); scroller.acc -= whole; }
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) { playScroll(false); return; }
    scroller.raf = requestAnimationFrame(scrollStep);
  }
  function playScroll(on) {
    if (on === scroller.on) return;
    scroller.on = on;
    cancelAnimationFrame(scroller.raf);
    if (on) { scroller.last = performance.now(); scroller.acc = 0; scroller.raf = requestAnimationFrame(scrollStep); }
    renderDock();
  }
  function startScroll() {
    if (!state.scrollMode) { state.scrollMode = true; playScroll(true); }
    else playScroll(!scroller.on);
    markTools();
  }
  function stopScroll(silent) {
    state.scrollMode = false;
    playScroll(false);
    if (!silent) { markTools(); renderDock(); }
  }

  /* ---------- metronome ---------- */
  const metro = { on: false, ctx: null, timer: 0, next: 0, beat: 0, beats: 4, bpm: 80, bpmFor: null };
  function beatsFor(time) {
    const [n, d] = String(time || '4/4').split('/').map(Number);
    if (!n) return 4;
    if (d === 8 && n % 3 === 0 && n >= 6) return n / 3;
    return Math.min(n, 12);
  }
  const metroNow = () => (metro.ctx ? metro.ctx.currentTime : performance.now() / 1000);
  function metroClick(t, accent) {
    const ctx = metro.ctx, osc = ctx.createOscillator(), g = ctx.createGain();
    osc.frequency.value = accent ? 1760 : 1180;
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(accent ? 0.5 : 0.3, t + 0.002);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.06);
    osc.connect(g).connect(ctx.destination);
    osc.start(t);
    osc.stop(t + 0.07);
  }
  function metroTick() {
    while (metro.next < metroNow() + 0.12) {
      const b = metro.beat;
      if (metro.ctx && prefs.metroSound) metroClick(metro.next, b === 0);
      setTimeout(() => { if (metro.on) flashBeat(b); }, Math.max(0, (metro.next - metroNow()) * 1000));
      metro.beat = (metro.beat + 1) % metro.beats;
      metro.next += 60 / metro.bpm;
    }
  }
  function flashBeat(b) {
    const dots = $$('#dock .beat-dots i');
    dots.forEach((d, i) => { d.classList.toggle('hit', i === b); d.classList.toggle('acc', i === 0); });
    const hb = $('#heroBeat');
    if (hb) { hb.classList.remove('hit'); void hb.offsetWidth; hb.classList.add('hit'); hb.classList.toggle('acc', b === 0); setTimeout(() => hb.classList.remove('hit'), 110); }
  }
  function toggleMetro(force) {
    const on = force ?? !metro.on;
    if (on === metro.on) return;
    if (on) {
      const s = state.song;
      if (!s) return;
      if (metro.bpmFor !== s.id) { metro.bpm = Number(s.tempo) || 80; metro.bpmFor = s.id; }
      metro.beats = beatsFor(s.time);
      try {
        metro.ctx = metro.ctx || new (window.AudioContext || window.webkitAudioContext)();
        metro.ctx.resume();
      } catch { metro.ctx = null; }
      metro.beat = 0;
      metro.next = metroNow() + 0.06;
      metro.on = true;
      metro.timer = setInterval(metroTick, 25);
      metroTick();
    } else {
      clearInterval(metro.timer);
      metro.on = false;
    }
    renderDock();
    markTools();
  }

  function markTools() {
    const c = $('#controls');
    if (!c) return;
    c.querySelector('[data-act="scroll"]')?.classList.toggle('on', state.scrollMode);
    c.querySelector('[data-act="metro"]')?.classList.toggle('on', metro.on);
  }

  /* ---------- stage mode ---------- */
  function enterStage() {
    document.body.classList.add('stage');
    try { document.documentElement.requestFullscreen?.().catch(() => {}); } catch { /* unsupported */ }
    renderDock();
  }
  function exitStage() {
    if (!document.body.classList.contains('stage')) return;
    document.body.classList.remove('stage');
    try { if (document.fullscreenElement) document.exitFullscreen(); } catch { /* ignore */ }
    renderDock();
  }
  document.addEventListener('fullscreenchange', () => { if (!document.fullscreenElement) exitStage(); });

  /* ---------- dock ---------- */
  function renderDock() {
    const inSong = state.route && state.route.name === 'song' && state.song;
    const g = [];
    if (inSong && document.body.classList.contains('stage')) {
      const set = state.set, i = state.setIdx;
      g.push(`<div class="dg stage-dock">
        <span class="dt title">${esc(state.song.title)}${set ? ` <small>${i + 1} / ${set.items.length}</small>` : ''}</span>
        <span class="size-pair"><button class="db" data-d="size-" title="Smaller text">A−</button><button class="db" data-d="size+" title="Bigger text">A+</button></span>
        <button class="db" data-d="stage-off" title="Leave full screen">${icon('x')}</button></div>`);
    }
    if (inSong && state.scrollMode) {
      g.push(`<div class="dg">
        <button class="db go" data-d="scroll-toggle" title="${scroller.on ? 'Pause' : 'Play'}">${icon(scroller.on ? 'pause' : 'play', 'fill')}</button>
        <button class="db" data-d="slower" title="Slower">−</button>
        <span class="dt"><small>Speed</small>${prefs.scrollSpeed}</span>
        <button class="db" data-d="faster" title="Faster">+</button>
        <button class="db" data-d="scroll-off" title="Stop auto-scroll">${icon('x')}</button></div>`);
    }
    if (inSong && metro.on) {
      g.push(`<div class="dg">
        <span class="beat-dots">${'<i></i>'.repeat(metro.beats)}</span>
        <button class="db" data-d="bpm-" title="Slower">−</button>
        <span class="dt"><small>BPM</small>${metro.bpm}</span>
        <button class="db" data-d="bpm+" title="Faster">+</button>
        <button class="db${prefs.metroSound ? '' : ' muted'}" data-d="sound" title="${prefs.metroSound ? 'Mute click' : 'Unmute click'}">${icon(prefs.metroSound ? 'volume' : 'mute')}</button>
        <button class="db" data-d="metro-off" title="Stop metronome">${icon('x')}</button></div>`);
    }
    dock.innerHTML = g.join('');
    dock.classList.toggle('show', g.length > 0);
  }

  dock.addEventListener('click', (e) => {
    const b = e.target.closest('[data-d]');
    if (!b) return;
    switch (b.dataset.d) {
      case 'prev': setStep(-1); break;
      case 'next': setStep(1); break;
      case 'stage-off': exitStage(); break;
      case 'size-': case 'size+': changeSize(b.dataset.d === 'size+' ? 2 : -2); break;
      case 'scroll-toggle': playScroll(!scroller.on); break;
      case 'slower': case 'faster':
        prefs.scrollSpeed = Math.min(10, Math.max(1, prefs.scrollSpeed + (b.dataset.d === 'faster' ? 1 : -1)));
        savePrefs(); renderDock(); break;
      case 'scroll-off': stopScroll(); break;
      case 'bpm-': case 'bpm+':
        metro.bpm = Math.min(260, Math.max(30, metro.bpm + (b.dataset.d === 'bpm+' ? 2 : -2)));
        renderDock(); break;
      case 'sound': prefs.metroSound = !prefs.metroSound; savePrefs(); renderDock(); break;
      case 'metro-off': toggleMetro(false); break;
    }
  });

  function changeSize(d) {
    prefs.size = Math.min(40, Math.max(12, prefs.size + d));
    savePrefs();
    document.documentElement.style.setProperty('--lyric', prefs.size + 'px');
  }

  document.addEventListener('keydown', (e) => {
    if (!state.route || state.route.name !== 'song' || e.metaKey || e.ctrlKey || e.altKey) return;
    if (e.target.closest && e.target.closest('input, textarea, select, dialog')) return;
    switch (e.key) {
      case ' ': e.preventDefault(); startScroll(); break;
      case 'ArrowRight': if (state.set) { e.preventDefault(); setStep(1); } break;
      case 'ArrowLeft': if (state.set) { e.preventDefault(); setStep(-1); } break;
      case '+': case '=': changeSize(2); break;
      case '-': changeSize(-2); break;
      case 'm': case 'M': toggleMetro(); break;
      case 'f': case 'F': document.body.classList.contains('stage') ? exitStage() : enterStage(); break;
      case 'e': case 'E': go('#/e/' + enc(state.song.id)); break;
      case 'Escape': exitStage(); break;
    }
  });

  /* ================= global click actions ================= */
  main.addEventListener('click', (e) => {
    const ch = e.target.closest('.ch');
    if (ch && state.route && (state.route.name === 'song' || state.route.name === 'edit')) {
      if (state.route.name === 'song') openChord(ch.dataset.ch, state.song.key, viewOpts(state.song).viewKey);
      else { const k = $('#f').key.value; openChord(ch.dataset.ch, k, k); }
      return;
    }
    const b = e.target.closest('[data-act],[data-mode],[data-part],[data-size],[data-theme-set]');
    if (!b) return;
    const s = state.song;
    const inSong = state.route && state.route.name === 'song';
    if (b.dataset.mode) { prefs.mode = b.dataset.mode; savePrefs(); inSong ? drawSong() : viewSettings(); return; }
    if (b.dataset.part) {
      state.part = b.dataset.part;
      if (!inSong) { prefs.part = b.dataset.part; savePrefs(); viewSettings(); } else drawSong();
      return;
    }
    if (b.dataset.size) { changeSize(+b.dataset.size); if (!inSong) viewSettings(); return; }
    if (b.dataset.themeSet) { prefs.theme = b.dataset.themeSet; savePrefs(); applyTheme(); viewSettings(); return; }
    switch (b.dataset.act) {
      case 'import': openImport(); break;
      case 'select':
        state.selecting = !state.selecting; state.selected = new Set();
        viewSongs(state.route.fav); break;
      case 'select-all': {
        const all = state.visible.every((id) => state.selected.has(id));
        state.selected = all ? new Set() : new Set(state.visible);
        fillList(state.route.fav); break;
      }
      case 'delete-selected':
        if (confirmDelete([...state.selected])) { state.selecting = false; state.selected = new Set(); viewSongs(state.route.fav); }
        break;
      case 'delete-song': {
        const back = state.set ? '#/set/' + enc(state.set.id) : '#/';
        if (confirmDelete([s.id])) go(back);
        break;
      }
      case 'share-lib': openShare(songs, 'your library', setlists); break;
      case 'fav': toggleFav(s); break;
      case 'add-to-set': openAddToSet(s); break;
      case 'share-song': openShare([s], `“${s.title}”`); break;
      case 'print': window.print(); break;
      case 'flip-key': {
        const flips = $$('.key-flip', main);
        const show = !flips.some((f) => f.classList.contains('flipped'));
        flips.forEach((f) => f.classList.toggle('flipped', show));
        clearTimeout(state.flipTimer);
        if (show) state.flipTimer = setTimeout(() => flips.forEach((f) => f.classList.remove('flipped')), 3000);
        break;
      }
      case 'scroll': startScroll(); break;
      case 'metro': toggleMetro(); break;
      case 'stage': enterStage(); break;
      case 'new-set': newSet(); break;
    }
  });

  function toggleFav(s) {
    if (!s) return;
    const on = !isFav(s.id);
    prefs.favs = on ? [...prefs.favs, s.id] : prefs.favs.filter((x) => x !== s.id);
    savePrefs();
    const b = main.querySelector('[data-act="fav"]');
    if (b) { b.classList.toggle('on', on); b.innerHTML = icon('star', on ? 'fill star' : ''); b.title = on ? 'Remove from favorites' : 'Add to favorites'; }
    renderNav();
    toast(on ? 'Added to favorites' : 'Removed from favorites');
  }

  /* ================= setlists ================= */
  function nextSunday() {
    const d = new Date();
    d.setDate(d.getDate() + ((7 - d.getDay()) % 7));
    const pad = (n) => String(n).padStart(2, '0');
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  }
  const bySetDate = (a, b) => (b.date || '').localeCompare(a.date || '') || (b.updated || 0) - (a.updated || 0);
  function dateParts(iso) {
    const d = iso ? new Date(iso + 'T12:00:00') : null;
    if (!d || isNaN(d)) return { wd: 'Set', day: '•', long: 'No date' };
    return {
      wd: d.toLocaleDateString(undefined, { weekday: 'short' }),
      day: d.getDate(),
      long: d.toLocaleDateString(undefined, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }),
    };
  }

  function newSet(withSong) {
    const date = nextSunday();
    const set = { id: uid(), name: 'Sunday Service', date, notes: '', items: withSong ? [{ songId: withSong.id, key: '' }] : [], updated: Date.now() };
    setlists.push(set);
    saveSets();
    return set;
  }

  function viewSets() {
    document.title = 'Setlists · Stobite Chords';
    const list = [...setlists].sort(bySetDate);
    main.innerHTML = `
      <header class="topbar">
        <div class="tb-title"><h1>Setlists</h1><p class="sub">${list.length} setlist${list.length === 1 ? '' : 's'}</p></div>
        <div class="tb-actions"><button class="btn primary" id="newSet">${icon('plus')}<span>New setlist</span></button></div>
      </header>
      <div class="content">
        ${list.length ? `<div class="set-grid">${list.map((s) => {
          const d = dateParts(s.date);
          const items = s.items.map((it) => ({ it, song: byId(it.songId) })).filter((x) => x.song);
          return `<a class="set-card" href="#/set/${enc(s.id)}" style="--h:${hueOf(s.id)}">
            <span class="date-pill"><small>${esc(d.wd)}</small><b>${esc(d.day)}</b></span>
            <span class="sb"><h3>${esc(s.name)}</h3><p>${esc(d.long)} · ${items.length} song${items.length === 1 ? '' : 's'}</p>
              ${items.length ? `<ol>${items.slice(0, 4).map((x) => `<li><b>${esc(prettyKey(x.it.key || x.song.key))}</b>${esc(x.song.title)}</li>`).join('')}${items.length > 4 ? `<li>+ ${items.length - 4} more</li>` : ''}</ol>` : ''}
            </span></a>`;
        }).join('')}</div>`
          : emptyState('list', 'Plan your next service', 'Group songs into a setlist, choose the key for each one, then flip through them on stage.', `<button class="btn primary" id="newSet2">${icon('plus')}New setlist</button>`)}
      </div>`;
    const make = () => { const s = newSet(); go('#/set/' + enc(s.id)); };
    $('#newSet').addEventListener('click', make);
    $('#newSet2')?.addEventListener('click', make);
  }

  function viewSet(id) {
    const set = setById(id);
    if (!set) { go('#/sets'); return; }
    document.title = `${set.name} · Stobite Chords`;
    main.innerHTML = `
      <header class="topbar">
        <a class="btn ghost" href="#/sets">${icon('chevL')}<span>Setlists</span></a>
        <div class="tb-actions">
          <button class="btn ghost icon-only" id="shareSet" title="Share setlist">${icon('share')}</button>
          <button class="btn ghost icon-only danger" id="delSet" title="Delete setlist">${icon('trash')}</button>
          <a class="btn primary" id="startSet" href="#/set/${enc(set.id)}/0">${icon('play', 'fill')}<span>Start</span></a>
        </div>
      </header>
      <div class="content narrow">
        <div class="card set-head">
          <input class="field title-input" id="setName" value="${esc(set.name)}" aria-label="Setlist name" placeholder="Setlist name">
          <div class="set-meta">
            <label class="pill-input">${icon('calendar')}<input type="date" id="setDate" value="${esc(set.date || '')}"></label>
            <span class="count" id="setCount"></span>
          </div>
          <div class="field"><textarea id="setNotes" rows="2" placeholder="Notes for the team — who's leading, special moments…">${esc(set.notes || '')}</textarea></div>
        </div>
        <div class="set-items" id="items"></div>
        <button class="btn add-songs" id="addSongs">${icon('plus')}Add songs</button>
      </div>`;
    const save = () => { set.updated = Date.now(); saveSets(); };
    $('#setName').addEventListener('input', (e) => { set.name = e.target.value.trim() || 'Untitled setlist'; save(); });
    $('#setName').addEventListener('change', renderNav);
    $('#setDate').addEventListener('change', (e) => { set.date = e.target.value; save(); });
    $('#setNotes').addEventListener('input', (e) => { set.notes = e.target.value; save(); });
    $('#shareSet').addEventListener('click', () => openShare(set.items.map((it) => byId(it.songId)).filter(Boolean), `“${set.name}”`, [set]));
    $('#delSet').addEventListener('click', () => {
      if (!confirm(`Delete the setlist “${set.name}”? Your songs stay in the library.`)) return;
      setlists = setlists.filter((x) => x !== set);
      saveSets(); toast('Setlist deleted'); go('#/sets');
    });
    $('#addSongs').addEventListener('click', () => openPicker(set, drawItems));

    function drawItems() {
      const n = set.items.length;
      $('#setCount').textContent = `${n} song${n === 1 ? '' : 's'}`;
      $('#startSet').toggleAttribute('disabled', !n);
      $('#items').innerHTML = set.items.map((it, i) => {
        const s = byId(it.songId);
        if (!s) {
          return `<div class="set-item" style="--h:0"><span class="num">${i + 1}</span><span class="si-body"><b>Missing song</b><small>It was deleted from the library</small></span>
            <div class="si-btns"><button data-rm="${i}" title="Remove">${icon('x')}</button></div></div>`;
        }
        const k = keyInfo(s.key);
        const opts = k ? KEYS.filter((x) => keyInfo(x).minor === k.minor) : [];
        return `<div class="set-item" style="--h:${hueOf(s.title)}">
          <span class="num">${i + 1}</span>
          <a class="si-body" href="#/set/${enc(set.id)}/${i}"><b>${esc(s.title)}</b><small>${esc(s.artist || '')}${s.tempo ? ` · ${esc(s.tempo)} bpm` : ''}</small></a>
          ${k ? `<select class="si-key" data-key="${i}" aria-label="Key for this service">${opts.map((x) =>
            `<option value="${x === s.key ? '' : esc(x)}"${(it.key || s.key) === x ? ' selected' : ''}>${esc(prettyKey(x))}${x === s.key ? ' ★' : ''}</option>`).join('')}</select>` : ''}
          <div class="si-btns">
            <button data-mv="${i}" data-d="-1" title="Move up" ${i === 0 ? 'disabled' : ''}>${icon('up')}</button>
            <button data-mv="${i}" data-d="1" title="Move down" ${i === n - 1 ? 'disabled' : ''}>${icon('down')}</button>
            <button data-rm="${i}" title="Remove from setlist">${icon('x')}</button>
          </div></div>`;
      }).join('') || `<div class="empty" style="padding:28px 20px"><p style="margin:0">No songs yet. Add a few below.</p></div>`;
    }
    $('#items').addEventListener('click', (e) => {
      const mv = e.target.closest('[data-mv]'), rm = e.target.closest('[data-rm]');
      if (mv) {
        const i = +mv.dataset.mv, j = i + +mv.dataset.d;
        [set.items[i], set.items[j]] = [set.items[j], set.items[i]];
        save(); drawItems();
      } else if (rm) {
        set.items.splice(+rm.dataset.rm, 1);
        save(); drawItems();
      }
    });
    $('#items').addEventListener('change', (e) => {
      const sel = e.target.closest('[data-key]');
      if (!sel) return;
      set.items[+sel.dataset.key].key = sel.value;
      save();
    });
    drawItems();
  }

  function openPicker(set, done) {
    const chosen = new Set();
    const inSet = new Set(set.items.map((x) => x.songId));
    const d = modal(`
      <h2>Add songs</h2>
      <p>Pick songs for “${esc(set.name)}”.</p>
      <div class="searchbar sm">${icon('search')}<input type="search" id="pq" placeholder="Search songs…" autocomplete="off"></div>
      <div class="pick-list" id="pl"></div>
      <div class="row"><form method="dialog"><button class="btn ghost">Cancel</button></form><button class="btn primary" id="pAdd" disabled>Add</button></div>`);
    const draw = () => {
      const q = $('#pq', d).value.trim().toLowerCase();
      $('#pl', d).innerHTML = [...songs].sort((a, b) => a.title.localeCompare(b.title))
        .filter((s) => !q || `${s.title} ${s.artist}`.toLowerCase().includes(q))
        .map((s) => `<label class="pick-row" style="--h:${hueOf(s.title)}"><input type="checkbox" value="${esc(s.id)}"${chosen.has(s.id) ? ' checked' : ''}>
          <span class="av">${esc(prettyKey(s.key))}</span><span><b>${esc(s.title)}</b><small>${esc(s.artist || '')}</small></span>${inSet.has(s.id) ? '<em>In set</em>' : ''}</label>`).join('')
        || '<p style="padding:12px 8px">No songs match.</p>';
    };
    $('#pq', d).addEventListener('input', draw);
    $('#pl', d).addEventListener('change', (e) => {
      if (e.target.checked) chosen.add(e.target.value); else chosen.delete(e.target.value);
      const b = $('#pAdd', d);
      b.disabled = !chosen.size;
      b.textContent = chosen.size ? `Add ${chosen.size} song${chosen.size > 1 ? 's' : ''}` : 'Add';
    });
    $('#pAdd', d).addEventListener('click', () => {
      for (const id of chosen) set.items.push({ songId: id, key: '' });
      set.updated = Date.now(); saveSets();
      toast(`Added ${chosen.size} song${chosen.size > 1 ? 's' : ''}`);
      d.close(); done();
    });
    draw();
  }

  function openAddToSet(s) {
    const list = [...setlists].sort(bySetDate);
    const d = modal(`
      <h2>Add to setlist</h2>
      <p>Add “${esc(s.title)}” to a service.</p>
      <div class="stack">
        ${list.map((x) => `<button class="btn" data-set="${esc(x.id)}">${icon('list')}<span style="flex:1;text-align:left">${esc(x.name)}<br><small class="sub">${esc(dateParts(x.date).long)}</small></span>${x.items.some((i) => i.songId === s.id) ? '<small class="sub">Already in</small>' : ''}</button>`).join('')}
        <button class="btn soft" data-set="__new">${icon('plus')}New setlist</button>
      </div>
      <div class="row"><form method="dialog"><button class="btn ghost">Close</button></form></div>`);
    d.addEventListener('click', (e) => {
      const b = e.target.closest('[data-set]');
      if (!b) return;
      if (b.dataset.set === '__new') {
        const set = newSet(s);
        d.close(); renderNav(); toast('New setlist created'); go('#/set/' + enc(set.id));
        return;
      }
      const set = setById(b.dataset.set);
      set.items.push({ songId: s.id, key: '' });
      set.updated = Date.now(); saveSets();
      d.close(); toast(`Added to “${set.name}”`);
    });
  }

  /* ================= editor ================= */
  const chordButtons = () => ['1', '2', '3', '4', '5', '6', '7', ...language.custom.map((c) => c.name).filter(Boolean), 'b7', '1/3', '5/7', '4/5', 'b7/5'];

  function viewEditor(id) {
    const existing = id ? byId(id) : null;
    if (id && !existing) { go('#/'); return; }
    const s = existing || { title: '', artist: '', key: 'C', tempo: '', time: '4/4', info: '', chart: '', tags: [] };
    const keys = KEYS.includes(s.key) ? KEYS : [s.key, ...KEYS];
    const times = TIMES.includes(s.time) ? TIMES : [s.time, ...TIMES];
    document.title = `${existing ? 'Edit' : 'New song'} · Stobite Chords`;
    document.body.classList.toggle('bass', state.part === 'bass');
    main.innerHTML = `
      <header class="topbar lined">
        <a class="btn ghost" href="${existing ? '#/s/' + enc(id) : '#/'}">${icon('x')}<span>Cancel</span></a>
        <div class="tb-title" style="text-align:center"><b>${existing ? 'Edit song' : 'New song'}</b></div>
        <div class="tb-actions">
          ${existing ? `<button class="btn ghost icon-only danger" id="del" title="Delete song">${icon('trash')}</button>` : ''}
          <button class="btn primary" id="save">Save</button>
        </div>
      </header>
      <div class="content wrap-editor" style="padding-top:16px">
        <form class="card" id="f" onsubmit="return false">
          <div class="fields">
            <label class="field full">Title<input name="title" required value="${esc(s.title)}" placeholder="Song title"></label>
            <label class="field full">Artist / writer<input name="artist" value="${esc(s.artist)}" placeholder="Who wrote or sings it"></label>
            <label class="field">Original key<select name="key">${keys.map((k) => `<option value="${esc(k)}"${k === s.key ? ' selected' : ''}>${esc(prettyKey(k))}</option>`).join('')}</select></label>
            <label class="field">We play it in<select name="playKey"><option value="">Same as original</option>${keys.map((k) => `<option value="${esc(k)}"${k === s.playKey ? ' selected' : ''}>${esc(prettyKey(k))}</option>`).join('')}</select></label>
            <div class="field">Tempo (bpm)<div class="with-btn"><input name="tempo" type="number" inputmode="numeric" min="20" max="300" value="${esc(s.tempo)}" placeholder="72" aria-label="Tempo"><button type="button" class="btn soft" id="tap" title="Tap along to the beat">${icon('hand')}Tap</button></div></div>
            <label class="field time">Time<select name="time">${times.map((t) => `<option${t === s.time ? ' selected' : ''}>${esc(t)}</option>`).join('')}</select></label>
            <div class="field full">Tags<input name="tags" value="${esc((s.tags || []).join(', '))}" placeholder="Worship, Communion…" autocomplete="off">
              <div class="tag-suggest" id="tagSug"></div></div>
            <label class="field full">Info<textarea name="info" rows="2" placeholder="Feel, arrangement, capo, who leads it…">${esc(s.info)}</textarea></label>
          </div>
        </form>
        <div class="split">
          <div class="card pane">
            <div class="pane-h"><h2>Lyrics &amp; chords</h2><button type="button" class="link" id="helpBtn">How to write chords</button></div>
            <div class="chordbar" id="cbar">
              ${[...new Set(chordButtons())].map((c) => `<button type="button" data-ins="[${esc(c)}]">${esc(prettyName(c))}</button>`).join('')}
              <button type="button" data-ins="[]" data-back="1">[ ]</button>
              ${['♭', '♯', 'm', '7', '+', '°', '/'].map((x) => `<button type="button" class="symb" data-ins="${x}" title="Type ${x}">${x}</button>`).join('')}
              ${['Verse', 'Chorus', 'Bridge'].map((x) => `<button type="button" class="secb" data-sec="${x}">${x}</button>`).join('')}
            </div>
            <textarea id="chartInput" spellcheck="false" autocapitalize="sentences" placeholder="Verse 1&#10;[1]Jesus is the [7]answer&#10;&#10;— or put the chords on the line above —&#10;&#10;1                   7&#10;Jesus is the answer">${esc(s.chart)}</textarea>
          </div>
          <div class="card pane preview-card">
            <div class="pane-h"><h2>Preview</h2><span class="sub">${state.part === 'bass' ? 'Bass view' : state.part === 'lyrics' ? 'Lyrics view' : 'Keys view'} · ${{ numbers: 'numbers', solfa: 'solfa', letters: 'letters' }[prefs.mode]}</span></div>
            <div class="chart preview" id="preview"></div>
          </div>
        </div>
        <details class="card help" id="help">
          <summary>${icon('help')}How to write chords</summary>
          <p><b>Option 1: brackets.</b> Put the chord in square brackets right before the word or syllable where it's played:</p>
          <pre>[1]Jesus is the [7]answer
for the world to[6]day [b7/5]</pre>
          <p><b>Option 2: chords above.</b> Type the chords on their own line and line them up with spaces over the lyric (the box uses fixed-width letters so it lines up):</p>
          <pre>1                   7
Jesus is the answer</pre>
          <p><b>Numbers:</b> <code>1</code>–<code>7</code>. Add <code>m</code> for minor (<code>6m</code>), plus anything like <code>7</code>, <code>maj7</code>, <code>sus4</code>, <code>°</code>, <code>add9</code>. Flats and sharps can go before or after the number: <code>♭7</code>, <code>6♭</code>, <code>5♯</code>, <code>♯4</code>. Type the word <code>flat</code> or <code>sharp</code> (or <code>b</code> / <code>#</code>) and it turns into ♭ / ♯.</p>
          <p><b>Augmented &amp; diminished:</b> type <code>aug</code> or <code>+</code> (<code>1+</code>), and <code>dim</code> or <code>°</code> (<code>2°</code>, <code>7°7</code>). Half-diminished: <code>ø</code> or <code>m7b5</code>.</p>
          <p><b>Tap any chord</b> on a song to see the notes in it, on a keyboard, with their numbers and sol-fa.</p>
          <p><b>Slash chords:</b> <code>1/5</code> means 1 over 5 in the bass. Keys see <code>1/5</code>; bass sees just <code>5</code>.</p>
          <p><b>Letter chords</b> like <code>G</code>, <code>C/E</code>, <code>Em</code> are fine too. They're turned into numbers using the song's key when you save.</p>
          <p><b>Sections:</b> put <code>Verse 1</code>, <code>Chorus</code>, <code>Bridge</code>… on their own line, or anything in braces like <code>{Vamp}</code>. Each gets its own colour. Lines starting with <code>#</code> are small notes.</p>
        </details>
      </div>`;

    const f = $('#f'), ta = $('#chartInput'), pv = $('#preview');
    const draw = () => {
      const key = f.key.value;
      pv.innerHTML = renderChart(ta.value, { mode: prefs.mode, part: state.part, songKey: key, viewKey: key })
        || '<p class="sub">Your chart will show here as you type.</p>';
    };
    // Typing "flat" or "sharp" inside a chord turns into ♭ / ♯ straight away (lyrics are left alone).
    ta.addEventListener('input', () => {
      const before = ta.value;
      if (/flat|sharp/i.test(before)) {
        const after = before.split('\n').map((line) => {
          if (isChordLine(line)) {
            // keep each chord in the same column so it stays over the right word
            return line.replace(/\S+/g, (t) => { const n = isChordTok(t) ? symbolizeTok(t) : t; return n + ' '.repeat(t.length - n.length); });
          }
          return line.replace(/\[([^\]]*)\]/g, (m, c) => '[' + symbolizeTok(c) + ']');
        }).join('\n');
        if (after !== before) {
          const pos = ta.selectionStart + (after.length - before.length);
          ta.value = after;
          ta.setSelectionRange(pos, pos);
        }
      }
      draw();
    });
    f.key.addEventListener('change', draw);
    draw();

    // tags
    const parseTags = () => f.tags.value.split(',').map((t) => t.trim()).filter(Boolean);
    const drawTags = () => {
      const cur = parseTags().map((t) => t.toLowerCase());
      const sugg = [...new Set([...TAG_SUGGESTIONS, ...allTags()])];
      $('#tagSug').innerHTML = sugg.map((t) => `<button type="button" class="chip${cur.includes(t.toLowerCase()) ? ' on' : ''}" data-tag="${esc(t)}">${esc(t)}</button>`).join('');
    };
    $('#tagSug').addEventListener('click', (e) => {
      const c = e.target.closest('[data-tag]');
      if (!c) return;
      const t = c.dataset.tag, cur = parseTags();
      const has = cur.some((x) => x.toLowerCase() === t.toLowerCase());
      f.tags.value = (has ? cur.filter((x) => x.toLowerCase() !== t.toLowerCase()) : [...cur, t]).join(', ');
      drawTags();
    });
    f.tags.addEventListener('input', drawTags);
    drawTags();

    // tap tempo
    let taps = [];
    $('#tap').addEventListener('click', (e) => {
      const now = performance.now();
      if (taps.length && now - taps[taps.length - 1] > 2000) taps = [];
      taps.push(now);
      taps = taps.slice(-6);
      if (taps.length >= 2) {
        const avg = (taps[taps.length - 1] - taps[0]) / (taps.length - 1);
        f.tempo.value = Math.round(60000 / avg);
      }
      const b = e.currentTarget;
      b.classList.remove('tap-flash'); void b.offsetWidth; b.classList.add('tap-flash');
    });

    // Keep the phone keyboard open while tapping chord buttons.
    $('#cbar').addEventListener('pointerdown', (e) => { if (e.target.closest('button')) e.preventDefault(); });
    $('#cbar').addEventListener('click', (e) => {
      const b = e.target.closest('button');
      if (!b) return;
      const start = ta.selectionStart, end = ta.selectionEnd;
      let ins = b.dataset.ins;
      if (b.dataset.sec) {
        // A heading needs its own line, but no blank lines around it.
        const before = ta.value[start - 1], after = ta.value[end];
        ins = (before && before !== '\n' ? '\n' : '') + b.dataset.sec + (after && after !== '\n' ? '\n' : '');
      }
      ta.setRangeText(ins, start, end, 'end');
      if (b.dataset.back) ta.setSelectionRange(start + 1, start + 1);
      ta.focus();
      draw();
    });
    $('#helpBtn').addEventListener('click', () => { const h = $('#help'); h.open = true; h.scrollIntoView({ behavior: 'smooth' }); });

    $('#save').addEventListener('click', () => {
      const title = f.title.value.trim();
      if (!title) { f.title.focus(); toast('Give the song a title'); return; }
      const key = f.key.value;
      const { text, changed } = convertLetters(ta.value.replace(/\s+$/, ''), key);
      const data = {
        title, artist: f.artist.value.trim(), key,
        tempo: f.tempo.value ? Math.round(+f.tempo.value) : '',
        time: f.time.value, info: f.info.value.trim(), chart: text, tags: [...new Set(parseTags())], updated: Date.now(),
        playKey: f.playKey.value && f.playKey.value !== key ? f.playKey.value : '',
      };
      let sid;
      if (existing) { Object.assign(existing, data); sid = existing.id; }
      else { sid = uid(); songs.push({ id: sid, ...data }); }
      if (!saveLibrary()) return;
      toast(changed ? `Saved. ${changed} letter chord${changed > 1 ? 's' : ''} turned into numbers (key of ${prettyKey(key)})` : 'Saved');
      go('#/s/' + enc(sid));
    });
    $('#del')?.addEventListener('click', () => {
      if (confirmDelete([existing.id])) go('#/');
    });
  }

  /* ================= settings ================= */
  function viewSettings() {
    document.title = 'Settings · Stobite Chords';
    const ownKeys = Object.keys(prefs.songKeys || {}).filter(byId).length;
    const seg = (attr, cur, opts) => `<div class="seg">${opts.map(([v, l]) => `<button data-${attr}="${v}" aria-pressed="${cur === v}">${l}</button>`).join('')}</div>`;
    main.innerHTML = `
      <header class="topbar"><div class="tb-title"><h1>Settings</h1><p class="sub">Make it yours</p></div></header>
      <div class="content narrow">
        ${teamCardHTML()}
        <section class="card"><h2>Chord language</h2>
          <div class="srow"><div><b>How we name chords</b><small>${esc(languageSummary())}</small></div>
            <button class="btn soft" id="langEdit">${icon('lock')}Edit</button></div>
        </section>
        <section class="card"><h2>Appearance</h2>
          <div class="srow"><div><b>Theme</b><small>Follow your device, or choose one</small></div>
            ${seg('theme-set', prefs.theme, [['auto', 'Auto'], ['light', 'Light'], ['dark', 'Dark']])}</div>
          <div class="srow"><div><b>Text size</b><small>Currently ${prefs.size}px</small></div>
            <div class="seg"><button data-size="-2">A−</button><button data-size="2">A+</button></div></div>
        </section>
        <section class="card"><h2>Charts</h2>
          <div class="srow"><div><b>Chord names</b><small>How chords are written</small></div>
            ${seg('mode', prefs.mode, [['numbers', '1 2 3'], ['solfa', 'do re mi'], ['letters', 'C D E']])}</div>
          <div class="srow"><div><b>My default view</b><small>What opens for you on this device. Bass shows only the bass note (1/5 → 5)</small></div>
            ${seg('part', prefs.part, [['keys', 'Keys'], ['bass', 'Bass'], ['lyrics', 'Lyrics']])}</div>
          <div class="srow"><div><b>My key</b><small>Every song shows in this key for you, so tapping a chord shows it in this key. Only on this device. ${ownKeys ? `${ownKeys} song${ownKeys > 1 ? 's have' : ' has'} a key of its own. <button class="link" id="clearSongKeys">Use my key for all</button>` : 'A song you change yourself keeps its own key.'}</small></div>
            <select class="pill-select" id="myKeySel" aria-label="My key"><option value="">Band’s key</option>${KEYS.map((k) =>
              `<option value="${k}"${k === prefs.myKey ? ' selected' : ''}>${esc(prettyKey(k))}</option>`).join('')}</select></div>
          <div class="srow"><div><b>Metronome click</b><small>Off = flashing light only</small></div>
            <button class="switch" role="switch" id="snd" aria-checked="${prefs.metroSound}" aria-label="Metronome click sound"></button></div>
        </section>
        <section class="card"><h2>Library</h2>
          <div class="srow"><div><b>Share or back up</b><small>${songs.length} songs and ${setlists.length} setlists as one file</small></div>
            <button class="btn soft" data-act="share-lib">${icon('share')}Share library</button></div>
          <div class="srow"><div><b>Import</b><small>Add songs someone shared with you</small></div>
            <button class="btn" data-act="import">${icon('download')}Import</button></div>
          <div class="srow"><div><b>Starter hymns</b><small>Put back any of the included hymns you deleted</small></div>
            <button class="btn" id="restore">Restore</button></div>
          ${team ? '' : `<div class="srow"><div><b>Erase everything</b><small>Removes all songs and setlists from this device</small></div>
            <button class="btn danger" id="wipe">${icon('trash')}Erase</button></div>`}
        </section>
        <p class="about"><b>Stobite Chords</b> · ${team ? `Songs are shared with ${esc(team.name)} and kept on this device for offline use.` : 'Your songs stay on this device.'}<br>Keyboard: Space scroll · ←/→ setlist · M metronome · F stage · +/− size</p>
      </div>`;
    $('#snd').addEventListener('click', () => { prefs.metroSound = !prefs.metroSound; savePrefs(); viewSettings(); });
    $('#restore').addEventListener('click', () => { mergeAll({ songs: STARTER_SONGS.map((s) => ({ ...s, tags: [...s.tags] })), setlists: [] }); viewSettings(); });
    bindTeamCard();
    $('#langEdit').addEventListener('click', unlockLanguage);
    $('#myKeySel').addEventListener('change', (e) => {
      prefs.myKey = e.target.value;
      savePrefs();
      toast(prefs.myKey ? `Every song now shows in ${prettyKey(prefs.myKey)} for you` : 'Songs show in the band’s key');
      viewSettings();
    });
    $('#clearSongKeys')?.addEventListener('click', () => { prefs.songKeys = {}; savePrefs(); toast('All songs use your key'); viewSettings(); });
    $('#wipe')?.addEventListener('click', () => {
      if (!confirm('Erase ALL songs and setlists on this device? This cannot be undone. Share your library first if you want a backup.')) return;
      songs = []; setlists = []; prefs.favs = []; prefs.recent = [];
      saveLibrary(); saveSets(); savePrefs(); renderNav(); toast('Everything erased'); viewSettings();
    });
  }

  /* ================= sharing ================= */
  const APP_ID = 'stobite-chords';
  const cleanSong = (s) => ({
    id: s.id, title: s.title, artist: s.artist || '', key: s.key || '', tempo: s.tempo || '', time: s.time || '',
    info: s.info || '', tags: s.tags || [], chart: s.chart || '', updated: s.updated || 0, playKey: s.playKey || '',
  });
  const cleanSet = (s) => ({ id: s.id, name: s.name, date: s.date || '', notes: s.notes || '', items: s.items.map((i) => ({ songId: i.songId, key: i.key || '' })), updated: s.updated || 0 });
  const pack = (list, sets = []) => ({ app: APP_ID, version: 2, exported: new Date().toISOString(), songs: list.map(cleanSong), setlists: sets.map(cleanSet) });
  const safeName = (s) => s.replace(/[^\w\- ]+/g, '').trim().replace(/\s+/g, '-') || 'songs';

  function b64u(bytes) {
    let s = '';
    for (let i = 0; i < bytes.length; i++) s += String.fromCharCode(bytes[i]);
    return btoa(s).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  }
  function unb64u(str) {
    str = str.replace(/-/g, '+').replace(/_/g, '/');
    while (str.length % 4) str += '=';
    return Uint8Array.from(atob(str), (c) => c.charCodeAt(0));
  }
  async function encodeLink(obj) {
    const bytes = new TextEncoder().encode(JSON.stringify(obj));
    if ('CompressionStream' in window) {
      try {
        const stream = new Blob([bytes]).stream().pipeThrough(new CompressionStream('deflate-raw'));
        return 'z' + b64u(new Uint8Array(await new Response(stream).arrayBuffer()));
      } catch { /* fall through to plain */ }
    }
    return 'j' + b64u(bytes);
  }
  async function decodeLink(code) {
    const bytes = unb64u(code.slice(1));
    if (code[0] === 'z') {
      const stream = new Blob([bytes]).stream().pipeThrough(new DecompressionStream('deflate-raw'));
      return JSON.parse(await new Response(stream).text());
    }
    return JSON.parse(new TextDecoder().decode(bytes));
  }
  const canLink = () => /^https?:$/.test(location.protocol);

  async function copyText(text) {
    try { await navigator.clipboard.writeText(text); return true; } catch {
      const t = document.createElement('textarea');
      t.value = text; t.style.position = 'fixed'; t.style.opacity = '0';
      document.body.append(t); t.select();
      let ok = false;
      try { ok = document.execCommand('copy'); } catch { /* ignore */ }
      t.remove();
      return ok;
    }
  }

  function download(name, text) {
    const url = URL.createObjectURL(new Blob([text], { type: 'application/json' }));
    const a = Object.assign(document.createElement('a'), { href: url, download: name });
    document.body.append(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 2000);
  }

  function modal(html, cls = '') {
    const d = document.createElement('dialog');
    d.className = 'modal ' + cls;
    d.innerHTML = html;
    document.body.append(d);
    d.addEventListener('close', () => d.remove());
    d.addEventListener('click', (e) => { if (e.target === d) d.close(); });
    d.showModal();
    return d;
  }

  function openShare(list, label, sets = []) {
    if (!list.length && !sets.length) { toast('Nothing to share yet'); return; }
    const payload = pack(list, sets);
    const json = JSON.stringify(payload, null, 1);
    const base = sets.length === 1 && list.length !== songs.length ? safeName(sets[0].name)
      : list.length === 1 ? safeName(list[0].title) : `stobite-chords-library-${new Date().toISOString().slice(0, 10)}`;
    const name = base + '.json';
    const file = typeof File === 'function' ? new File([json], name, { type: 'application/json' }) : null;
    const nativeFiles = !!(file && navigator.canShare && navigator.canShare({ files: [file] }));
    const link = canLink() && json.length < 60000;
    const d = modal(`
      <h2>Share ${esc(label)}</h2>
      <p>${list.length} song${list.length === 1 ? '' : 's'}${sets.length ? ` · ${sets.length} setlist${sets.length > 1 ? 's' : ''}` : ''}. The other person opens Stobite Chords, taps <b>Import</b>, and picks the file or pastes what you sent.${link ? ' A link imports with one tap.' : ''}</p>
      <div class="stack">
        ${nativeFiles ? `<button class="btn primary" data-x="native">${icon('share')}Share file…</button>` : ''}
        ${link ? `<button class="btn${nativeFiles ? '' : ' primary'}" data-x="link">${icon('link')}Copy share link</button>` : ''}
        <button class="btn" data-x="download">${icon('file')}Download file</button>
        <button class="btn" data-x="copy">${icon('copy')}Copy as text</button>
      </div>
      <div class="row"><form method="dialog"><button class="btn ghost">Close</button></form></div>`);
    d.addEventListener('click', async (e) => {
      const x = e.target.closest('[data-x]')?.dataset.x;
      if (!x) return;
      try {
        if (x === 'native') await navigator.share({ files: [file], title: name });
        else if (x === 'download') { download(name, json); toast('File saved'); }
        else if (x === 'copy') toast((await copyText(json)) ? 'Copied. Paste it in a message' : 'Could not copy on this browser');
        else if (x === 'link') {
          const url = location.origin + location.pathname + '#import=' + (await encodeLink(payload));
          toast((await copyText(url)) ? 'Link copied' : 'Could not copy on this browser');
        }
        d.close();
      } catch (err) {
        if (err && err.name !== 'AbortError') toast('Sharing failed: ' + err.message);
      }
    });
  }

  function extractPayload(obj) {
    const list = Array.isArray(obj) ? obj : Array.isArray(obj?.songs) ? obj.songs : obj?.song ? [obj.song] : obj?.title ? [obj] : null;
    if (!list) throw new Error('No songs found');
    const outSongs = list.filter((s) => s && typeof s.title === 'string' && s.title.trim()).map((s) => ({
      id: typeof s.id === 'string' && s.id ? s.id : uid(),
      title: s.title.trim().slice(0, 200),
      artist: String(s.artist || '').slice(0, 200),
      key: String(s.key || ''),
      tempo: Number(s.tempo) ? Math.round(Number(s.tempo)) : '',
      time: String(s.time || ''),
      info: String(s.info || ''),
      tags: Array.isArray(s.tags) ? s.tags.map(String).slice(0, 20) : [],
      chart: String(s.chart ?? s.lyrics ?? ''),
      playKey: String(s.playKey || '').slice(0, 8),
      updated: Number(s.updated) || 0,
    }));
    const outSets = (Array.isArray(obj?.setlists) ? obj.setlists : [])
      .filter((s) => s && typeof s.name === 'string' && Array.isArray(s.items))
      .map((s) => ({
        id: typeof s.id === 'string' && s.id ? s.id : uid(), name: s.name.slice(0, 200), date: String(s.date || ''), notes: String(s.notes || ''),
        items: s.items.filter((i) => i && typeof i.songId === 'string').map((i) => ({ songId: i.songId, key: String(i.key || '') })),
        updated: Number(s.updated) || 0,
      }));
    return { songs: outSongs, setlists: outSets };
  }

  async function parseImportText(text) {
    text = text.trim();
    const m = /#import=([A-Za-z0-9_-]+)/.exec(text);
    if (m) return decodeLink(m[1]);
    return JSON.parse(text);
  }

  const sameSong = (a, b) => ['title', 'artist', 'key', 'tempo', 'time', 'info', 'chart'].every((k) => String(a[k] ?? '') === String(b[k] ?? ''));

  /** Adds new items; replaces something you already have only when the incoming copy is newer. */
  function mergeAll(data) {
    let added = 0, updated = 0, skipped = 0, setsAdded = 0;
    for (const s of data.songs) {
      const mine = byId(s.id);
      if (!mine) {
        if (songs.some((x) => sameSong(x, s))) { skipped++; continue; }
        songs.push(s); added++;
      } else if (sameSong(mine, s) || (s.updated || 0) <= (mine.updated || 0)) skipped++;
      else { Object.assign(mine, s); updated++; }
    }
    for (const st of data.setlists) {
      const mine = setById(st.id);
      if (!mine) { setlists.push(st); setsAdded++; }
      else if ((st.updated || 0) > (mine.updated || 0)) { Object.assign(mine, st); setsAdded++; }
    }
    saveLibrary(); saveSets(); renderNav();
    const parts = [];
    if (added) parts.push(`${added} song${added > 1 ? 's' : ''} added`);
    if (updated) parts.push(`${updated} updated`);
    if (setsAdded) parts.push(`${setsAdded} setlist${setsAdded > 1 ? 's' : ''}`);
    if (skipped) parts.push(`${skipped} already had`);
    toast(parts.join(' · ') || 'Nothing to import');
  }

  function openImport() {
    const d = modal(`
      <h2>Import songs</h2>
      <p>Pick a file someone shared with you, or paste the text or link they sent. Songs you already have aren't duplicated.</p>
      <div class="stack"><label class="btn primary">${icon('upload')}Choose file…<input type="file" id="imf" accept=".json,application/json,text/plain" multiple hidden></label></div>
      <textarea id="imt" rows="4" placeholder="…or paste here"></textarea>
      <div class="row"><form method="dialog"><button class="btn ghost">Cancel</button></form><button class="btn" data-x="paste">Import pasted</button></div>`);
    const done = () => { d.close(); route(); };
    $('#imf', d).addEventListener('change', async (e) => {
      try {
        const all = { songs: [], setlists: [] };
        for (const file of e.target.files) {
          const p = extractPayload(JSON.parse(await file.text()));
          all.songs.push(...p.songs); all.setlists.push(...p.setlists);
        }
        mergeAll(all); done();
      } catch (err) { toast('Could not read that file: ' + err.message); }
    });
    d.addEventListener('click', async (e) => {
      if (e.target.closest('[data-x="paste"]')) {
        try { mergeAll(extractPayload(await parseImportText($('#imt', d).value))); done(); }
        catch (err) { toast('That doesn’t look like a shared song: ' + err.message); }
      }
    });
  }

  async function handleIncomingLink(code) {
    history.replaceState(null, '', location.pathname + location.search + '#/');
    route();
    let data;
    try { data = extractPayload(await decodeLink(code)); } catch { toast('That share link is broken or incomplete'); return; }
    const n = data.songs.length;
    const d = modal(`
      <h2>Import ${data.setlists.length ? 'setlist' : `${n} song${n > 1 ? 's' : ''}`}?</h2>
      <p>Someone shared this with you.${data.setlists.length ? ` Setlist: <b>${esc(data.setlists[0].name)}</b>.` : ''}</p>
      <ul class="titles">${data.songs.map((s) => `<li><b>${esc(s.title)}</b>${s.artist ? ` · ${esc(s.artist)}` : ''}</li>`).join('')}</ul>
      <div class="row"><form method="dialog"><button class="btn ghost">Not now</button></form><button class="btn primary" data-x="go">Add to my library</button></div>`);
    d.addEventListener('click', (e) => {
      if (!e.target.closest('[data-x="go"]')) return;
      mergeAll(data);
      d.close();
      if (data.setlists.length) go('#/set/' + enc(data.setlists[0].id));
      else if (n === 1 && byId(data.songs[0].id)) go('#/s/' + enc(data.songs[0].id));
      else route();
    });
  }

  /* ================= team sync (Supabase) ================= */
  const CFG = window.STOBITE_SUPABASE || {};
  const cloudReady = () => !!(CFG.url && CFG.anonKey);
  const SUPABASE_JS = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.117.2/dist/umd/supabase.js';

  function loadSupabase() {
    if (window.supabase && window.supabase.createClient) return Promise.resolve();
    return new Promise((resolve, reject) => {
      const el = document.createElement('script');
      el.src = SUPABASE_JS;
      el.onload = resolve;
      el.onerror = () => { el.remove(); reject(new Error('No internet connection')); };
      document.head.append(el);
    });
  }

  /** Supabase client with a signed-in (anonymous) user for this device. */
  async function cloud() {
    if (!cloudReady()) throw new Error('Team sync is not switched on yet');
    if (!sync.client) {
      await loadSupabase();
      sync.client = window.supabase.createClient(CFG.url, CFG.anonKey, {
        auth: { persistSession: true, autoRefreshToken: true, storageKey: 'stobite-chords:auth' },
      });
    }
    const { data: { session } } = await sync.client.auth.getSession();
    if (session) sync.userId = session.user.id;
    else {
      const { data, error } = await sync.client.auth.signInAnonymously();
      if (error) throw error;
      sync.userId = data.user.id;
    }
    return sync.client;
  }

  function setSync(status, detail = '') {
    sync.status = status;
    sync.detail = detail;
    for (const el of $$('[data-sync]')) el.innerHTML = syncPill();
  }
  function syncPill() {
    if (!team) return `<i class="dot off"></i>On this device only`;
    const label = { synced: esc(team.name), syncing: 'Syncing…', offline: 'Offline · changes will sync', error: 'Sync problem', off: esc(team.name) }[sync.status] || esc(team.name);
    return `<i class="dot ${sync.status}"></i>${label}`;
  }

  const songToRow = (s) => ({
    team_id: team.id, id: s.id, title: (s.title || '').slice(0, 200), artist: (s.artist || '').slice(0, 200), key: (s.key || '').slice(0, 8),
    tempo: Number(s.tempo) ? Math.round(Number(s.tempo)) : null, time: (s.time || '').slice(0, 8), info: s.info || '', tags: s.tags || [],
    chart: s.chart || '', updated: s.updated || 0, deleted: false,
    ...(sync.noPlayKey ? {} : { play_key: (s.playKey || '').slice(0, 8) }),
  });
  const rowToSong = (r) => ({
    id: r.id, title: r.title, artist: r.artist, key: r.key, tempo: r.tempo ?? '', time: r.time, info: r.info, tags: r.tags || [], chart: r.chart, updated: Number(r.updated) || 0,
    playKey: r.play_key ?? (byId(r.id) || {}).playKey ?? '',
  });
  const setToRow = (st) => ({
    team_id: team.id, id: st.id, name: (st.name || '').slice(0, 200), date: (st.date || '').slice(0, 10), notes: st.notes || '',
    items: (st.items || []).map((i) => ({ songId: i.songId, key: i.key || '' })), updated: st.updated || 0, deleted: false,
  });
  const rowToSet = (r) => ({ id: r.id, name: r.name, date: r.date, notes: r.notes, items: Array.isArray(r.items) ? r.items : [], updated: Number(r.updated) || 0 });
  const blankSong = (id, u) => ({ ...songToRow({ id, title: '' }), updated: u, deleted: true });
  const blankSet = (id, u) => ({ ...setToRow({ id, name: '' }), updated: u, deleted: true });

  /** Merge rows from the server into this device. Newest edit wins. Returns true if anything changed here. */
  function applyRemote(songRows = [], setRows = []) {
    let changed = false;
    const merge = (rows, list, marks, toLocal, find) => {
      for (const r of rows) {
        const u = Number(r.updated) || 0, mine = find(r.id), mark = marks[r.id];
        if (r.deleted) {
          if (mine && (mine.updated || 0) <= u) { list.splice(list.indexOf(mine), 1); changed = true; }
          if (!mine || (mine.updated || 0) <= u) marks[r.id] = { u, d: true };
        } else if (!mine) {
          if (mark && !mark.d && u <= mark.u) continue; // deleted here, not yet sent
          list.push(toLocal(r)); marks[r.id] = { u, d: false }; changed = true;
        } else if (u > (mine.updated || 0)) {
          Object.assign(mine, toLocal(r)); marks[r.id] = { u, d: false }; changed = true;
        } else if (u === (mine.updated || 0)) marks[r.id] = { u, d: false };
      }
    };
    merge(songRows, songs, synced.songs, rowToSong, byId);
    merge(setRows, setlists, synced.sets, rowToSet, setById);
    if (changed) { writeJSON(libKey(), songs); writeJSON(setKey(), setlists); }
    writeJSON(syncedKey(), synced);
    return changed;
  }

  async function fetchAll(table) {
    const out = [];
    for (let from = 0; ; from += 1000) {
      const { data, error } = await sync.client.from(table).select('*').eq('team_id', team.id).range(from, from + 999);
      if (error) throw error;
      out.push(...data);
      if (data.length < 1000) return out;
    }
  }

  async function pullAll() {
    const [songRows, setRows] = await Promise.all([fetchAll('songs'), fetchAll('setlists')]);
    if (applyRemote(songRows, setRows)) refreshView();
  }

  /** Send everything that changed on this device since the last sync. */
  async function pushDirty() {
    if (!team || !sync.client) return;
    if (sync.pushing) { sync.again = true; return; }
    sync.pushing = true;
    try {
      do {
        sync.again = false;
        const now = Date.now();
        const songRows = songs.filter((x) => { const m = synced.songs[x.id]; return !m || m.d || (x.updated || 0) > m.u; }).map(songToRow);
        for (const [id, m] of Object.entries(synced.songs)) if (!m.d && !byId(id)) songRows.push(blankSong(id, Math.max(now, m.u + 1)));
        const setRows = setlists.filter((x) => { const m = synced.sets[x.id]; return !m || m.d || (x.updated || 0) > m.u; }).map(setToRow);
        for (const [id, m] of Object.entries(synced.sets)) if (!m.d && !setById(id)) setRows.push(blankSet(id, Math.max(now, m.u + 1)));
        if (!songRows.length && !setRows.length) break;
        setSync('syncing');
        for (const [table, rows, marks] of [['songs', songRows, synced.songs], ['setlists', setRows, synced.sets]]) {
          for (let i = 0; i < rows.length; i += 200) {
            const chunk = rows.slice(i, i + 200);
            let { error } = await sync.client.from(table).upsert(chunk, { onConflict: 'team_id,id' });
            if (error && table === 'songs' && /play_key/.test(error.message)) {
              sync.noPlayKey = true; // database not updated yet: sync everything else
              ({ error } = await sync.client.from(table).upsert(chunk.map(({ play_key, ...rest }) => rest), { onConflict: 'team_id,id' }));
            }
            if (error) throw error;
            for (const r of chunk) marks[r.id] = { u: r.updated, d: r.deleted };
          }
        }
        writeJSON(syncedKey(), synced);
      } while (sync.again);
      setSync('synced');
    } catch (err) {
      setSync(navigator.onLine ? 'error' : 'offline', err.message || String(err));
      clearTimeout(sync.retry);
      sync.retry = setTimeout(pushDirty, 15000); // patchy signal: try again shortly
    } finally {
      sync.pushing = false;
    }
  }

  function scheduleSync() {
    if (!team) return;
    clearTimeout(sync.timer);
    if (!navigator.onLine) { setSync('offline'); return; }
    if (!sync.client) return; // startSync() will push once connected
    sync.timer = setTimeout(pushDirty, 500);
  }

  function subscribe() {
    if (sync.channel) sync.client.removeChannel(sync.channel);
    const f = `team_id=eq.${team.id}`;
    sync.channel = sync.client.channel('team-' + team.id)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'songs', filter: f }, (p) => onRemote('songs', p.new))
      .on('postgres_changes', { event: '*', schema: 'public', table: 'setlists', filter: f }, (p) => onRemote('setlists', p.new))
      .on('postgres_changes', { event: '*', schema: 'public', table: 'team_members', filter: f }, () => loadMembers())
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'teams', filter: `id=eq.${team.id}` }, (p) => { if (p.new && p.new.language) applyTeamLanguage(p.new.language); })
      .subscribe();
  }

  function onRemote(table, row) {
    if (!row || !row.id) return;
    const editing = state.route && state.route.name === 'edit' && table === 'songs' && state.route.id === row.id;
    const changed = table === 'songs' ? applyRemote([row], []) : applyRemote([], [row]);
    if (!changed) return;
    const who = sync.members.find((m) => m.user_id === row.updated_by);
    if (editing) toast(`${who ? who.display_name : 'Someone'} just changed this song. Saving will keep your version.`);
    refreshView();
  }

  async function loadMembers() {
    if (!team || !sync.client) return;
    const { data } = await sync.client.from('team_members').select('user_id, display_name, role, joined_at').eq('team_id', team.id).order('joined_at');
    if (!data) return;
    sync.members = data;
    const me = data.find((m) => m.user_id === sync.userId);
    if (me && me.role !== team.role) { team.role = me.role; writeJSON(TEAM_KEY, team); }
    if (state.route && state.route.name === 'settings' && !main.contains(document.activeElement)) viewSettings();
  }

  /** Connect, re-join if this device lost its sign-in, then pull, push and listen for live changes. */
  async function startSync() {
    if (!team || !cloudReady()) return;
    try {
      setSync('syncing');
      const c = await cloud();
      let { data: t, error } = await c.from('teams').select('id, name, join_code, language').eq('id', team.id).maybeSingle();
      if (error && /language/.test(error.message)) {
        sync.noLangColumn = true;
        ({ data: t, error } = await c.from('teams').select('id, name, join_code').eq('id', team.id).maybeSingle());
      }
      if (error) throw error;
      if (t) Object.assign(team, { name: t.name, code: t.join_code });
      if (t && t.language) applyTeamLanguage(t.language);
      else if (t && (sync.langPending || (language.updated || 0) > 0)) pushLanguage();
      else {
        const { data: j, error: e2 } = await c.rpc('join_team', { code: team.code, my_name: team.myName });
        if (e2) throw new Error(/code/i.test(e2.message) ? 'This team’s code has changed. Ask your leader for the new one.' : e2.message);
        Object.assign(team, { name: j.name, code: j.join_code });
      }
      writeJSON(TEAM_KEY, team);
      await pullAll();
      await backfillPlayKeys();
      subscribe();
      loadMembers();
      await pushDirty();
      setSync('synced');
      renderNav();
    } catch (err) {
      setSync(navigator.onLine ? 'error' : 'offline', err.message || String(err));
    }
  }

  /** Once per team: send "we play it in" keys that were saved before the database had room for them. */
  async function backfillPlayKeys() {
    const flag = spaceKey('playkey-backfill');
    if (readJSON(flag, false)) return;
    const withKey = songs.filter((x) => x.playKey);
    if (withKey.length) {
      const { error } = await sync.client.from('songs').upsert(withKey.map(songToRow), { onConflict: 'team_id,id' });
      if (error) { if (/play_key/.test(error.message)) sync.noPlayKey = true; return; }
    }
    writeJSON(flag, true);
  }

  /** Re-draw whatever is on screen after a teammate's change (never mid-typing). */
  function refreshView() {
    renderNav();
    const r = state.route;
    if (!r || r.name === 'edit') return;
    const a = document.activeElement;
    if (a && main.contains(a) && /INPUT|TEXTAREA|SELECT/.test(a.tagName)) { sync.pendingRefresh = true; return; }
    const y = window.scrollY;
    if (r.name === 'songs') viewSongs(r.fav);
    else if (r.name === 'sets') viewSets();
    else if (r.name === 'set') viewSet(r.id);
    else if (r.name === 'song') viewSong(r);
    else if (r.name === 'settings') viewSettings();
    window.scrollTo(0, y);
  }
  document.addEventListener('focusout', () => { if (sync.pendingRefresh) { sync.pendingRefresh = false; setTimeout(refreshView, 50); } });

  /** Switch this device into a team's library (or back to personal when t is null). */
  function enterTeam(t, startingSongs, startingSets) {
    if (sync.channel && sync.client) { sync.client.removeChannel(sync.channel); sync.channel = null; }
    team = t;
    if (team) {
      writeJSON(TEAM_KEY, team);
      if (startingSongs) writeJSON(libKey(), startingSongs);
      if (startingSets) writeJSON(setKey(), startingSets);
    } else {
      try { localStorage.removeItem(TEAM_KEY); } catch { /* ignore */ }
    }
    loadSpace();
    sync.members = [];
    setSync(team ? 'syncing' : 'off');
    renderNav();
    if (team) startSync();
  }

  const copyOf = (x) => JSON.parse(JSON.stringify(x));
  const inviteLink = () => location.origin + location.pathname + '#join=' + team.code;
  const prettyCode = (c) => String(c || '').replace(/(.{4})(?=.)/g, '$1-');

  function openCreateTeam() {
    const d = modal(`
      <h2>Create a team</h2>
      <p>Everyone who joins sees the same songs and setlists, and changes show up on every phone straight away.</p>
      <div class="fields one">
        <label class="field">Team name<input id="tName" placeholder="e.g. Grace Chapel Band" maxlength="80"></label>
        <label class="field">Your name<input id="tMe" placeholder="How the team sees you" maxlength="60" value="${esc(prefs.myName || '')}"></label>
        <label class="check"><input type="checkbox" id="tCopy" checked> Put my ${songs.length} songs${setlists.length ? ` and ${setlists.length} setlists` : ''} in the team library</label>
      </div>
      <div class="row"><form method="dialog"><button class="btn ghost">Cancel</button></form><button class="btn primary" id="tGo">Create team</button></div>`);
    $('#tGo', d).addEventListener('click', async (e) => {
      const name = $('#tName', d).value.trim(), me = $('#tMe', d).value.trim();
      if (!name || !me) { toast('Add a team name and your name'); return; }
      e.currentTarget.disabled = true;
      try {
        const c = await cloud();
        const { data, error } = await c.rpc('create_team', { team_name: name, my_name: me });
        if (error) throw error;
        prefs.myName = me; savePrefs();
        const copy = $('#tCopy', d).checked;
        enterTeam({ id: data.id, name: data.name, code: data.join_code, role: 'leader', myName: me }, copy ? copyOf(songs) : [], copy ? copyOf(setlists) : []);
        d.close();
        toast(`Team “${data.name}” created`);
        go('#/settings');
        viewSettings();
      } catch (err) {
        e.currentTarget.disabled = false;
        toast('Could not create the team: ' + (err.message || err));
      }
    });
  }

  function openJoinTeam(code = '') {
    const d = modal(`
      <h2>Join a team</h2>
      <p>Enter the code your team leader shared. You'll see the team's songs and setlists, and your changes are shared with them.</p>
      <div class="fields one">
        <label class="field">Team code<input id="jCode" placeholder="ABCD-2345" value="${esc(prettyCode(code))}" autocapitalize="characters" autocomplete="off"></label>
        <label class="field">Your name<input id="jMe" placeholder="How the team sees you" maxlength="60" value="${esc(prefs.myName || '')}"></label>
        ${songs.length ? `<label class="check"><input type="checkbox" id="jCopy"> Also add my ${songs.length} songs to the team</label>` : ''}
        ${team ? `<p class="warn">You'll leave “${esc(team.name)}” on this device.</p>` : ''}
      </div>
      <div class="row"><form method="dialog"><button class="btn ghost">Cancel</button></form><button class="btn primary" id="jGo">Join team</button></div>`);
    $('#jGo', d).addEventListener('click', async (e) => {
      const c0 = $('#jCode', d).value.trim(), me = $('#jMe', d).value.trim();
      if (!c0 || !me) { toast('Add the team code and your name'); return; }
      e.currentTarget.disabled = true;
      try {
        const c = await cloud();
        const { data, error } = await c.rpc('join_team', { code: c0, my_name: me });
        if (error) throw new Error(/no team/i.test(error.message) ? 'No team has that code. Check it with your leader.' : error.message);
        prefs.myName = me; savePrefs();
        const copy = $('#jCopy', d)?.checked;
        const personalSongs = team ? readJSON(LIB_KEY, []) : songs;
        enterTeam({ id: data.id, name: data.name, code: data.join_code, role: 'member', myName: me }, copy ? copyOf(personalSongs) : readJSON(`stobite-chords:team:${data.id}:songs`, []), undefined);
        d.close();
        toast(`Welcome to ${data.name}`);
        go('#/');
      } catch (err) {
        e.currentTarget.disabled = false;
        toast(err.message || String(err));
      }
    });
  }

  function openLeaveTeam() {
    const d = modal(`
      <h2>Leave “${esc(team.name)}”?</h2>
      <p>The team keeps its songs. You can rejoin later with the code. Do you want a copy of the team's ${songs.length} songs on this phone?</p>
      <div class="stack">
        <button class="btn primary" data-x="keep">Leave and keep a copy</button>
        <button class="btn danger" data-x="drop">Leave without a copy</button>
      </div>
      <div class="row"><form method="dialog"><button class="btn ghost">Cancel</button></form></div>`);
    d.addEventListener('click', async (e) => {
      const x = e.target.closest('[data-x]')?.dataset.x;
      if (!x) return;
      const teamSongs = copyOf(songs), teamSets = copyOf(setlists), old = team;
      try {
        if (sync.client && sync.userId) await sync.client.from('team_members').delete().eq('team_id', old.id).eq('user_id', sync.userId);
      } catch { /* offline: leaving locally is still fine */ }
      for (const k of ['songs', 'setlists', 'synced']) { try { localStorage.removeItem(`stobite-chords:team:${old.id}:${k}`); } catch { /* ignore */ } }
      enterTeam(null);
      if (x === 'keep') mergeAll({ songs: teamSongs, setlists: teamSets });
      d.close();
      toast(`You left ${old.name}`);
      viewSettings();
    });
  }

  function teamCardHTML() {
    if (!cloudReady()) {
      return `<section class="card team-card"><h2>Team</h2>
        <div class="srow"><div><b>Team sync isn't switched on yet</b><small>Songs stay on this device. Use Share to send them to people.</small></div></div></section>`;
    }
    if (!team) {
      return `<section class="card team-card"><h2>Team</h2>
        <div class="team-empty">
          <div class="bubble">${icon('users')}</div>
          <div><b>Share one library with your band</b><small>Everyone sees the same songs and setlists, and edits show up on every phone straight away.</small></div>
        </div>
        <div class="team-actions"><button class="btn primary" id="tCreate">${icon('plus')}Create a team</button><button class="btn" id="tJoin">${icon('users')}Join a team</button></div>
      </section>`;
    }
    const leader = team.role === 'leader';
    return `<section class="card team-card"><h2>Team</h2>
      <div class="team-head">
        <div class="logo sm">${esc((team.name || '?')[0].toUpperCase())}</div>
        <div><b>${esc(team.name)}</b><small>You're ${esc(team.myName)} · ${leader ? 'Leader' : 'Member'}</small></div>
        <span class="sync-pill" data-sync>${syncPill()}</span>
      </div>
      ${sync.status === 'error' && sync.detail ? `<p class="warn">${esc(sync.detail)}</p>` : ''}
      <div class="code-box">
        <div><small>Team code</small><b>${esc(prettyCode(team.code))}</b></div>
        <div class="code-btns">
          <button class="btn soft" id="tInvite">${icon('share')}Invite</button>
          ${leader ? `<button class="btn ghost" id="tNewCode" title="Make a new code (the old one stops working)">New code</button>` : ''}
        </div>
      </div>
      <div class="members">${sync.members.length ? sync.members.map((m) => `
        <div class="member"><span class="av" style="--h:${hueOf(m.user_id)}">${esc((m.display_name || '?')[0].toUpperCase())}</span>
          <span><b>${esc(m.display_name)}${m.user_id === sync.userId ? ' (you)' : ''}</b><small>${m.role === 'leader' ? 'Leader' : 'Member'}</small></span>
          ${leader && m.user_id !== sync.userId ? `<button class="btn ghost icon-only danger" data-rm-member="${esc(m.user_id)}" title="Remove from team">${icon('x')}</button>` : ''}
        </div>`).join('') : '<p class="sub">Loading members…</p>'}</div>
      <div class="team-actions">
        ${leader ? '' : `<button class="btn soft" id="tClaim">${icon('lock')}Make me leader</button>`}
        <button class="btn" id="tSync">${icon('scroll')}Sync now</button><button class="btn danger" id="tLeave">Leave team</button>
      </div>
      <p class="team-note">Removing the app from your home screen signs this phone out. The team's songs stay safe: rejoin with the code${leader ? ', then use Make me leader with the admin password' : ''}.</p>
    </section>`;
  }

  function bindTeamCard() {
    $('#tCreate')?.addEventListener('click', openCreateTeam);
    $('#tJoin')?.addEventListener('click', () => openJoinTeam());
    $('#tLeave')?.addEventListener('click', openLeaveTeam);
    $('#tSync')?.addEventListener('click', () => startSync());
    $('#tClaim')?.addEventListener('click', claimLeader);
    $('#tInvite')?.addEventListener('click', async () => {
      const text = `Join ${team.name} on Stobite Chords: ${inviteLink()}  (team code ${prettyCode(team.code)})`;
      try {
        if (navigator.share) { await navigator.share({ title: `Join ${team.name}`, text, url: inviteLink() }); return; }
      } catch (err) { if (err.name === 'AbortError') return; }
      toast((await copyText(text)) ? 'Invite copied. Paste it in your team chat' : 'Code: ' + prettyCode(team.code));
    });
    $('#tNewCode')?.addEventListener('click', async () => {
      if (!confirm('Make a new team code? The old code and invite links stop working. People already in the team stay in.')) return;
      try {
        const { data, error } = await sync.client.rpc('new_team_code', { t: team.id });
        if (error) throw error;
        team.code = data; writeJSON(TEAM_KEY, team); viewSettings(); toast('New code made');
      } catch (err) { toast('Could not change the code: ' + (err.message || err)); }
    });
    for (const b of $$('[data-rm-member]')) {
      b.addEventListener('click', async () => {
        const m = sync.members.find((x) => x.user_id === b.dataset.rmMember);
        if (!m || !confirm(`Remove ${m.display_name} from the team? Also make a new code if they shouldn't rejoin.`)) return;
        const { error } = await sync.client.from('team_members').delete().eq('team_id', team.id).eq('user_id', m.user_id);
        if (error) toast('Could not remove: ' + error.message); else loadMembers();
      });
    }
  }

  /* ---------- chord language: shared with the team, editable behind a password ---------- */
  const ROOTS = ['1', 'b2', '2', 'b3', '3', '4', '#4', '5', 'b6', '6', 'b7', '7'];
  /** What a special name sounds like in sol-fa if nobody has named it: 1# -> do♯. */
  function solfaGuess(name) {
    const m = /^([b#]?)([1-7])(.*)$/.exec(normTok(name || ''));
    return m ? solfaOf(numSemi(m[1], +m[2])) + m[3].replace(/#/g, '♯').replace(/^b$/, '♭') : '';
  }
  const qualLabel = (id) => (QUALITIES.find((q) => q[0] === id) || [, id])[1];

  function languageSummary() {
    const minors = Object.entries(language.plain).filter(([, q]) => q === 'min').map(([d]) => d);
    const parts = [];
    if (minors.length) parts.push(`${minors.join(', ')} are minor`);
    for (const [d, q] of Object.entries(language.plain)) if (q !== 'min' && q !== 'maj') parts.push(`${d} is ${qualLabel(q).toLowerCase()}`);
    if (language.custom.length) parts.push('special: ' + language.custom.map((c) => prettyName(c.name)).join(', '));
    return parts.join(' · ');
  }

  function applyTeamLanguage(l) {
    if (!l || !l.plain || !Array.isArray(l.custom)) return;
    if ((l.updated || 0) <= (language.updated || 0)) { if ((language.updated || 0) > (l.updated || 0)) pushLanguage(); return; }
    language = l;
    writeJSON(LANG_KEY, language);
    refreshView();
  }

  async function pushLanguage() {
    if (!team) return;
    sync.langPending = true;
    if (!sync.client || sync.noLangColumn) {
      if (sync.noLangColumn) toast('Saved on this phone. Run the small database update to share it with the team.');
      return;
    }
    const { data, error } = await sync.client.from('teams').update({ language }).eq('id', team.id).select('id');
    if (error) {
      if (/language/.test(error.message)) { sync.noLangColumn = true; toast('Saved on this phone. Run the small database update to share it with the team.'); }
      else toast('Saved on this phone. Could not share it yet: ' + error.message);
      return;
    }
    sync.langPending = false;
    if (!data || !data.length) toast('Saved on this phone. Only the team leader can change the team’s language.');
  }

  const isUnlocked = () => { try { return sessionStorage.getItem('stobite-chords:lang-unlocked') === '1'; } catch { return false; } };

  /** Ask the database whether this is the admin password (it's never stored in the app). */
  async function checkAdmin(pw) {
    const c = await cloud();
    const { data, error } = await c.rpc('check_admin', { pw });
    if (error) throw new Error(/check_admin|function/i.test(error.message) ? 'The database needs its latest update first' : error.message);
    return data === true;
  }

  /** Password prompt for admin-only actions. onOk(password) runs after the database accepts it. */
  function askAdminPassword(title, text, onOk) {
    const d = modal(`
      <div class="chord-head"><div class="chord-big lockbig">${icon('lock')}</div>
        <div><h2>${esc(title)}</h2><p>${esc(text)}</p></div></div>
      <div class="fields one"><label class="field">Admin password<input type="password" id="pw" autocomplete="current-password"></label></div>
      <div class="row"><form method="dialog"><button class="btn ghost">Cancel</button></form><button class="btn primary" id="pwGo">Unlock</button></div>`);
    const input = $('#pw', d), go1 = $('#pwGo', d);
    setTimeout(() => input.focus(), 50);
    const tryIt = async () => {
      if (!cloudReady()) { toast('Needs the online version of the app'); return; }
      go1.disabled = true; go1.textContent = 'Checking…';
      try {
        if (await checkAdmin(input.value)) { d.close(); await onOk(input.value); }
        else { toast('That password isn’t right'); input.select(); }
      } catch (err) {
        toast(navigator.onLine ? (err.message || String(err)) : 'Connect to the internet to check the password');
      } finally {
        go1.disabled = false; go1.textContent = 'Unlock';
      }
    };
    go1.addEventListener('click', tryIt);
    input.addEventListener('keydown', (e) => { if (e.key === 'Enter') { e.preventDefault(); tryIt(); } });
  }

  function unlockLanguage() {
    if (isUnlocked()) { go('#/language'); return; }
    askAdminPassword('Chord language', 'Only the music director can change how chords are named.', () => {
      try { sessionStorage.setItem('stobite-chords:lang-unlocked', '1'); } catch { /* ignore */ }
      go('#/language');
    });
  }

  function claimLeader() {
    askAdminPassword('Make me leader', 'For the music director: take the leader role for this team, so you can manage members and the code.', async (pw) => {
      const { error } = await sync.client.rpc('claim_leader', { t: team.id, pw });
      if (error) { toast('Could not make you leader: ' + error.message); return; }
      team.role = 'leader';
      writeJSON(TEAM_KEY, team);
      await loadMembers();
      viewSettings();
      toast('You’re the leader now. Remove anyone who shouldn’t be in the team.');
    });
  }

  function viewLanguage() {
    if (!isUnlocked()) { go('#/settings'); return; }
    document.title = 'Chord language · Stobite Chords';
    const draft = JSON.parse(JSON.stringify(language));
    if (!Array.isArray(draft.solfa) || draft.solfa.length !== 12) draft.solfa = DEFAULT_SOLFA.slice();
    state.langKey = state.langKey || 'F';
    const qualOpts = (cur) => QUALITIES.map(([id, label]) => `<option value="${id}"${id === cur ? ' selected' : ''}>${label}</option>`).join('');
    const rootOpts = (cur) => ROOTS.map((r) => `<option value="${r}"${normTok(cur) === r ? ' selected' : ''}>${prettyName(r)}</option>`).join('');
    const example = (root, q) => {
      const r = /^([b#]?)([1-7])$/.exec(normTok(root || ''));
      const k = keyInfo(state.langKey);
      if (!r || !k) return '';
      const name = spellRoot(r[1], +r[2], k).name + prettyQual(QCODE[q] ?? '');
      return `<b>${esc(name)}</b> ${esc(chordNotes(r[1], +r[2], QCODE[q] ?? '', k).map((n) => n.name).join(' '))}`;
    };
    main.innerHTML = `
      <header class="topbar lined">
        <a class="btn ghost" href="#/settings">${icon('chevL')}<span>Settings</span></a>
        <div class="tb-title" style="text-align:center"><b>Chord language</b></div>
        <div class="tb-actions"><button class="btn primary" id="langSave">Save</button></div>
      </header>
      <div class="content narrow" id="langWrap" style="padding-top:16px">
        <div class="card lang-intro">
          <p>${team ? `Saved changes apply to everyone in <b>${esc(team.name)}</b>.` : 'Saved changes apply on this device.'} Examples are shown in the key of
            <select class="pill-select" id="langKey">${KEYS.map((k) => `<option value="${k}"${k === state.langKey ? ' selected' : ''}>${esc(prettyKey(k))}</option>`).join('')}</select></p>
        </div>
        <section class="card"><h2>A number on its own</h2>
          <div class="lang-list" id="plainRows">${[1, 2, 3, 4, 5, 6, 7].map((d) => `
            <div class="lang-row"><span class="num-badge">${d}</span>
              <select data-plain="${d}">${qualOpts(draft.plain[d])}</select>
              <span class="lang-ex" data-ex-plain="${d}">${example(String(d), draft.plain[d])}</span></div>`).join('')}
          </div>
        </section>
        <section class="card"><h2>Sol-fa names</h2>
          <p class="sub" style="margin-bottom:12px">What each note is called when you choose do re mi.</p>
          <div class="solfa-grid">${draft.solfa.map((n, i) => `
            <label class="solfa-cell"><small>${SOLFA_LABELS[i]}</small><input data-solfa="${i}" value="${esc(n)}" maxlength="6" aria-label="Sol-fa for ${SOLFA_LABELS[i]}"></label>`).join('')}
          </div>
        </section>
        <section class="card"><h2>Special names</h2>
          <p class="sub" style="margin-bottom:12px">A name the band says, and the chord it means. For example 1♯ = the 6 chord made major.</p>
          <div class="lang-list" id="customRows"></div>
          <button class="btn add-songs" id="addName">${icon('plus')}Add a name</button>
        </section>
        <div class="row" style="justify-content:space-between">
          <button class="btn ghost" id="langReset">Reset to the band's defaults</button>
          <button class="btn ghost" id="langLock">${icon('lock')}Lock</button>
        </div>
      </div>`;
    const drawCustom = () => {
      $('#customRows').innerHTML = draft.custom.map((c, i) => `
        <div class="lang-row custom">
          <input class="lang-name" data-cname="${i}" value="${esc(c.name)}" maxlength="8" placeholder="e.g. 2#" aria-label="Name">
          <span class="eq">=</span>
          <select data-croot="${i}" aria-label="Built on">${rootOpts(c.root)}</select>
          <select data-cq="${i}" aria-label="Chord type">${qualOpts(c.quality)}</select>
          <label class="lang-solfa"><span>Sol-fa</span><input data-csolfa="${i}" value="${esc(c.solfa || '')}" maxlength="10" placeholder="${esc(solfaGuess(c.name))}" aria-label="Sol-fa name"></label>
          <span class="lang-ex" data-ex-custom="${i}">${example(c.root, c.quality)}</span>
          <button class="btn ghost icon-only danger" data-cdel="${i}" title="Remove">${icon('x')}</button>
        </div>`).join('') || '<p class="sub">No special names yet.</p>';
    };
    const drawExamples = () => {
      for (const d of [1, 2, 3, 4, 5, 6, 7]) $(`[data-ex-plain="${d}"]`).innerHTML = example(String(d), draft.plain[d]);
      draft.custom.forEach((c, i) => { const el = $(`[data-ex-custom="${i}"]`); if (el) el.innerHTML = example(c.root, c.quality); });
    };
    drawCustom();
    $('#langKey').addEventListener('change', (e) => { state.langKey = e.target.value; drawExamples(); });
    $('#langWrap').addEventListener('change', (e) => {
      const t = e.target;
      if (t.dataset.plain) { draft.plain[t.dataset.plain] = t.value; drawExamples(); }
      else if (t.dataset.croot) { draft.custom[+t.dataset.croot].root = t.value; drawExamples(); }
      else if (t.dataset.cq) { draft.custom[+t.dataset.cq].quality = t.value; drawExamples(); }
    });
    $('#langWrap').addEventListener('input', (e) => {
      const t = e.target;
      if (t.dataset.cname) {
        draft.custom[+t.dataset.cname].name = t.value.trim();
        const so = $(`[data-csolfa="${t.dataset.cname}"]`);
        if (so) so.placeholder = solfaGuess(t.value.trim());
      } else if (t.dataset.csolfa) draft.custom[+t.dataset.csolfa].solfa = t.value.trim();
      else if (t.dataset.solfa) draft.solfa[+t.dataset.solfa] = t.value.trim();
    });
    $('#customRows').addEventListener('click', (e) => {
      const b = e.target.closest('[data-cdel]');
      if (b) { draft.custom.splice(+b.dataset.cdel, 1); drawCustom(); }
    });
    $('#addName').addEventListener('click', () => { draft.custom.push({ name: '', root: '1', quality: 'maj' }); drawCustom(); $$('.lang-name').pop()?.focus(); });
    $('#langReset').addEventListener('click', () => {
      if (!confirm('Put the chord language back to the defaults?')) return;
      Object.assign(draft, JSON.parse(JSON.stringify(DEFAULT_LANGUAGE)));
      $$('[data-plain]').forEach((el) => { el.value = draft.plain[el.dataset.plain]; });
      $$('[data-solfa]').forEach((el) => { el.value = draft.solfa[+el.dataset.solfa]; });
      drawCustom(); drawExamples();
    });
    $('#langLock').addEventListener('click', () => { try { sessionStorage.removeItem('stobite-chords:lang-unlocked'); } catch { /* ignore */ } go('#/settings'); });
    $('#langSave').addEventListener('click', () => {
      draft.custom = draft.custom.filter((c) => c.name);
      const names = draft.custom.map((c) => normTok(c.name));
      const bad = draft.custom.find((c) => !/^[b#]?[1-7]/.test(normTok(c.name)) || /^[1-7]$/.test(normTok(c.name)) || c.name.includes('/'));
      if (bad) { toast(`“${bad.name}” needs to start with a number and add something, like 2# or 5m`); return; }
      if (new Set(names).size !== names.length) { toast('Two special names are the same'); return; }
      draft.solfa = draft.solfa.map((n, i) => n || DEFAULT_SOLFA[i]);
      language = { ...draft, updated: Date.now() };
      writeJSON(LANG_KEY, language);
      pushLanguage();
      toast('Chord language saved');
      go('#/settings');
    });
  }

  window.addEventListener('online', () => startSync());
  window.addEventListener('offline', () => { if (team) setSync('offline'); });
  document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'visible' && team && sync.client) startSync(); });

  /* ================= misc ================= */
  let toastTimer;
  function toast(msg, actionLabel, action) {
    const t = $('#toast');
    t.textContent = msg;
    t.classList.toggle('has-action', !!action);
    if (action) {
      const b = document.createElement('button');
      b.textContent = actionLabel;
      b.addEventListener('click', () => { t.classList.remove('show'); action(); }, { once: true });
      t.append(b);
    }
    t.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove('show'), action ? 6000 : 2800);
  }

  /* ---------- chord sheet: tap a chord to see its notes ---------- */
  function openChord(tok, songKey, viewKey) {
    const sp = spellChord(tok, songKey, viewKey);
    if (!sp) return;
    const o = { mode: prefs.mode, part: 'keys', songKey, viewKey };
    modal(`
      <div class="chord-head">
        <div class="chord-big">${chordHTML(tok, o)}</div>
        <div><h2>${esc(sp.name)}${sp.bass ? ` <span class="over">over ${esc(sp.bass.name)}</span>` : ''}</h2><p>Key of ${esc(prettyKey(viewKey || songKey || 'C'))}</p></div>
      </div>
      ${pianoSVG(sp)}
      <div class="notes">${sp.notes.map((n, i) => `<div class="note-chip${i === 0 ? ' first' : ''}"><b>${esc(n.name)}</b></div>`).join('')}</div>
      ${sp.bass ? `<div class="bass-line"><i></i>Bass plays <b>${esc(sp.bass.name)}</b></div>` : ''}
      <div class="row"><form method="dialog"><button class="btn primary">Done</button></form></div>`, 'sheet');
  }


  // Keep the screen awake while a song is open (phones on a music stand).
  async function requestWake() {
    try { if ('wakeLock' in navigator && !state.wake) state.wake = await navigator.wakeLock.request('screen'); } catch { /* not allowed */ }
  }
  function releaseWake() { try { state.wake?.release(); } catch { /* ignore */ } state.wake = null; }
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible' && state.route && state.route.name === 'song') { state.wake = null; requestWake(); }
  });

  // No accidental zooming while playing (iOS ignores the viewport setting, so block the gestures too).
  for (const ev of ['gesturestart', 'gesturechange', 'gestureend']) document.addEventListener(ev, (e) => e.preventDefault(), { passive: false });
  document.addEventListener('touchmove', (e) => { if (e.touches.length > 1) e.preventDefault(); }, { passive: false });

  window.addEventListener('hashchange', route);
  route();
  if (team) startSync();

  if ('serviceWorker' in navigator && canLink()) navigator.serviceWorker.register('sw.js').catch(() => {});
})();
