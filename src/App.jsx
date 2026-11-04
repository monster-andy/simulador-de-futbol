import React, { useState, useEffect, useRef } from 'react';

// --- ICONOS SVG EN LÍNEA PARA EVITAR ERRORES DE IMPORTACIÓN ---
const Trophy = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 21h8m-4-4v4m0-14a5 5 0 005 5h1a2 2 0 002-2V6a2 2 0 00-2-2h-1a5 5 0 00-5 5zm0 0a5 5 0 01-5 5H3a2 2 0 01-2-2V6a2 2 0 012-2h1a5 5 0 015 5z" />
  </svg>
);

const RefreshCw = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
  </svg>
);

const Shield = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
);

const Play = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 5v14l11-7z" />
  </svg>
);

const Sparkles = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
  </svg>
);

const Flame = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
  </svg>
);

const X = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

// --- BASE DE DATOS DE LOS 36 CLUBES CON TUS PUNTUACIONES PERSONALIZADAS ---
const CLUBS_26_27 = [
  { id: 'rmd', name: 'Real Madrid', country: 'España', flag: '🇪🇸', userRating: 8.8, att: 93, def: 88, mid: 92, ovr: 91, form: '+8', stars: ['Kylian Mbappé', 'Vinícius Jr.', 'Jude Bellingham', 'Rodrygo'] },
  { id: 'fcb', name: 'FC Barcelona', country: 'España', flag: '🇪🇸', userRating: 9.5, att: 96, def: 90, mid: 95, ovr: 95, form: '+9', stars: ['Lamine Yamal', 'Robert Lewandowski', 'Raphinha', 'Pedri'] },
  { id: 'atm', name: 'Atlético de Madrid', country: 'España', flag: '🇪🇸', userRating: 7.9, att: 83, def: 82, mid: 82, ovr: 82, form: '+3', stars: ['Julián Álvarez', 'Antoine Griezmann', 'Conor Gallagher'] },
  { id: 'vll', name: 'Villarreal CF', country: 'España', flag: '🇪🇸', userRating: 5.0, att: 72, def: 70, mid: 71, ovr: 71, form: '0', stars: ['Ayoze Pérez', 'Álex Baena', 'Gerard Moreno'] },
  { id: 'bet', name: 'Real Betis', country: 'España', flag: '🇪🇸', userRating: 7.5, att: 81, def: 79, mid: 81, ovr: 80, form: '+1', stars: ['Isco', 'Giovani Lo Celso', 'Vitor Roque'] },
  { id: 'liv', name: 'Liverpool FC', country: 'Inglaterra', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', userRating: 8.5, att: 90, def: 88, mid: 89, ovr: 89, form: '+7', stars: ['Mohamed Salah', 'Luis Díaz', 'Alexis Mac Allister'] },
  { id: 'mci', name: 'Manchester City', country: 'Inglaterra', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', userRating: 8.5, att: 90, def: 88, mid: 89, ovr: 89, form: '+7', stars: ['Erling Haaland', 'Kevin De Bruyne', 'Phil Foden', 'Rodri'] },
  { id: 'ars', name: 'Arsenal FC', country: 'Inglaterra', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', userRating: 9.0, att: 92, def: 92, mid: 92, ovr: 92, form: '+8', stars: ['Bukayo Saka', 'Martin Ødegaard', 'Declan Rice'] },
  { id: 'avl', name: 'Aston Villa', country: 'Inglaterra', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', userRating: 7.5, att: 81, def: 79, mid: 81, ovr: 80, form: '+2', stars: ['Ollie Watkins', 'Jhon Durán', 'Emiliano Martínez'] },
  { id: 'mun', name: 'Manchester United', country: 'Inglaterra', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', userRating: 6.0, att: 75, def: 74, mid: 75, ovr: 75, form: '-1', stars: ['Bruno Fernandes', 'Marcus Rashford', 'Rasmus Højlund'] },
  { id: 'int', name: 'Inter de Milán', country: 'Italia', flag: '🇮🇹', userRating: 8.5, att: 89, def: 89, mid: 89, ovr: 89, form: '+6', stars: ['Lautaro Martínez', 'Marcus Thuram', 'Nicolò Barella'] },
  { id: 'rom', name: 'AS Roma', country: 'Italia', flag: '🇮🇹', userRating: 6.0, att: 75, def: 74, mid: 75, ovr: 75, form: '0', stars: ['Paulo Dybala', 'Artem Dovbyk', 'Lorenzo Pellegrini'] },
  { id: 'nap', name: 'Napoli', country: 'Italia', flag: '🇮🇹', userRating: 6.0, att: 75, def: 74, mid: 75, ovr: 75, form: '0', stars: ['Romelu Lukaku', 'Khvicha Kvaratskhelia', 'Scott McTominay'] },
  { id: 'com', name: 'Como 1907', country: 'Italia', flag: '🇮🇹', userRating: 7.5, att: 80, def: 78, mid: 80, ovr: 79, form: '+3', stars: ['Nico Paz', 'Andrea Belotti', 'Gabriel Strefezza'] },
  { id: 'bay', name: 'Bayern Múnich', country: 'Alemania', flag: '🇩🇪', userRating: 9.6, att: 97, def: 91, mid: 95, ovr: 95, form: '+9', stars: ['Harry Kane', 'Jamal Musiala', 'Leroy Sané', 'Michael Olise'] },
  { id: 'bvb', name: 'Borussia Dortmund', country: 'Alemania', flag: '🇩🇪', userRating: 7.0, att: 79, def: 77, mid: 79, ovr: 78, form: '+1', stars: ['Serhou Guirassy', 'Julian Brandt', 'Karim Adeyemi'] },
  { id: 'stu', name: 'VfB Stuttgart', country: 'Alemania', flag: '🇩🇪', userRating: 4.0, att: 68, def: 66, mid: 67, ovr: 67, form: '-1', stars: ['Deniz Undav', 'Ermedin Demirović'] },
  { id: 'rbl', name: 'RB Leipzig', country: 'Alemania', flag: '🇩🇪', userRating: 4.0, att: 68, def: 66, mid: 67, ovr: 67, form: '-1', stars: ['Lois Openda', 'Benjamin Šeško', 'Xavi Simons'] },
  { id: 'psg', name: 'Paris Saint-Germain', country: 'Francia', flag: '🇫🇷', userRating: 9.7, att: 98, def: 92, mid: 96, ovr: 96, form: '+10', stars: ['Bradley Barcola', 'Ousmane Dembélé', 'Vitinha', 'Achraf Hakimi'] },
  { id: 'lil', name: 'Lille OSC', country: 'Francia', flag: '🇫🇷', userRating: 4.0, att: 68, def: 66, mid: 67, ovr: 67, form: '0', stars: ['Jonathan David', 'Edon Zhegrova'] },
  { id: 'len', name: 'RC Lens', country: 'Francia', flag: '🇫🇷', userRating: 3.0, att: 64, def: 62, mid: 63, ovr: 63, form: '-1', stars: ['Florian Sotoca', 'Przemysław Frankowski'] },
  { id: 'spo', name: 'Sporting CP', country: 'Portugal', flag: '🇵🇹', userRating: 7.0, att: 79, def: 77, mid: 79, ovr: 78, form: '+2', stars: ['Viktor Gyökeres', 'Francisco Trincão'] },
  { id: 'por', name: 'FC Porto', country: 'Portugal', flag: '🇵🇹', userRating: 6.0, att: 75, def: 74, mid: 75, ovr: 75, form: '0', stars: ['Samu Omorodion', 'Galeno'] },
  { id: 'psv', name: 'PSV Eindhoven', country: 'Países Bajos', flag: '🇳🇱', userRating: 6.0, att: 75, def: 74, mid: 75, ovr: 75, form: '0', stars: ['Luuk de Jong', 'Johan Bakayoko'] },
  { id: 'fey', name: 'Feyenoord', country: 'Países Bajos', flag: '🇳🇱', userRating: 6.0, att: 75, def: 74, mid: 75, ovr: 75, form: '0', stars: ['Santiago Giménez', 'Igor Paixão'] },
  { id: 'gal', name: 'Galatasaray', country: 'Turquía', flag: '🇹🇷', userRating: 5.0, att: 72, def: 70, mid: 71, ovr: 71, form: '0', stars: ['Victor Osimhen', 'Mauro Icardi'] },
  { id: 'fen', name: 'Fenerbahçe', country: 'Turquía', flag: '🇹🇷', userRating: 5.0, att: 72, def: 70, mid: 71, ovr: 71, form: '0', stars: ['Youssef En-Nesyri', 'Edin Džeko'] },
  { id: 'bod', name: 'Bodø/Glimt', country: 'Noruega', flag: '🇳🇴', userRating: 6.0, att: 75, def: 74, mid: 75, ovr: 75, form: '+1', stars: ['Jens Petter Hauge', 'Ulrik Saltnes'] },
  { id: 'vik', name: 'Viking FK', country: 'Noruega', flag: '🇳🇴', userRating: 2.0, att: 60, def: 58, mid: 59, ovr: 59, form: '-2', stars: ['Lars-Jørgen Salvesen', 'Zlatko Tripić'] },
  { id: 'las', name: 'LASK Linz', country: 'Austria', flag: '🇦🇹', userRating: 3.0, att: 64, def: 62, mid: 63, ovr: 63, form: '0', stars: ['Robert Žulj', 'Marin Ljubičić'] },
  { id: 'cbr', name: 'Club Brujas', country: 'Bélgica', flag: '🇧🇪', userRating: 5.0, att: 72, def: 70, mid: 71, ovr: 71, form: '0', stars: ['Hans Vanaken', 'Christos Tzolis'] },
  { id: 'aek', name: 'AEK Atenas', country: 'Grecia', flag: '🇬🇷', userRating: 3.0, att: 64, def: 62, mid: 63, ovr: 63, form: '0', stars: ['Levi García', 'Erik Lamela'] },
  { id: 'sla', name: 'Slavia Praga', country: 'República Checa', flag: '🇨🇿', userRating: 3.0, att: 64, def: 62, mid: 63, ovr: 63, form: '0', stars: ['Tomáš Chorý', 'Lukáš Provod'] },
  { id: 'sha', name: 'Shakhtar Donetsk', country: 'Ucrania', flag: '🇺🇦', userRating: 2.0, att: 60, def: 58, mid: 59, ovr: 59, form: '-1', stars: ['Heorhiy Sudakov', 'Danylo Sikan'] },
  { id: 'sbr', name: 'Slovan Bratislava', country: 'Eslovaquia', flag: '🇸🇰', userRating: 1.0, att: 55, def: 52, mid: 53, ovr: 53, form: '-3', stars: ['Vladimír Weiss', 'Dávid Štrelec'] },
  { id: 'sab', name: 'Sabah FK', country: 'Azerbaiyán', flag: '🇦🇿', userRating: 4.0, att: 68, def: 66, mid: 67, ovr: 67, form: '0', stars: ['Joy-Lance Mickels', 'Daviti Volkovi'] }
];

export default function App() {
  const [activeTab, setActiveTab] = useState('league');
  const [standings, setStandings] = useState([]);
  const [fixtures, setFixtures] = useState([]);
  const [currentMatchday, setCurrentMatchday] = useState(1);
  const [selectedMatch, setSelectedMatch] = useState(null);
  
  const [simSpeed, setSimSpeed] = useState(1);
  const [isSimulating, setIsSimulating] = useState(false);
  const [liveMatch, setLiveMatch] = useState(null);
  const [liveMin, setLiveMin] = useState(0);
  const [matchLogs, setMatchLogs] = useState([]);
  const logsEndRef = useRef(null);

  const [playoffs, setPlayoffs] = useState(null);
  const [r16, setR16] = useState(null);
  const [qf, setQf] = useState(null);
  const [sf, setSf] = useState(null);
  const [finalMatch, setFinalMatch] = useState(null);
  const [champion, setChampion] = useState(null);

  useEffect(() => { initTournament(); }, []);
  useEffect(() => { logsEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [matchLogs]);

  const initTournament = () => {
    const initialStandings = CLUBS_26_27.map(club => ({ ...club, mp: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, gd: 0, pts: 0 }));
    setStandings(initialStandings);
    setFixtures(generateLeagueFixtures(CLUBS_26_27));
    setCurrentMatchday(1);
    setSelectedMatch(null);
    setPlayoffs(null); setR16(null); setQf(null); setSf(null); setFinalMatch(null); setChampion(null);
  };

  const generateLeagueFixtures = (teams) => {
    const rounds = [];
    const getTeam = (id) => teams.find(t => t.id === id);
    const fixedFixtures = [
      [{ h: 'rmd', a: 'int' }, { h: 'fcb', a: 'fey' }, { h: 'por', a: 'mci' }, { h: 'lil', a: 'bet' }, { h: 'liv', a: 'atm' }],
      [{ h: 'avl', a: 'fen' }, { h: 'rom', a: 'rmd' }, { h: 'las', a: 'liv' }, { h: 'atm', a: 'mun' }, { h: 'gal', a: 'fcb' }],
      [{ h: 'psg', a: 'fcb' }, { h: 'bay', a: 'ars' }, { h: 'int', a: 'sha' }, { h: 'avl', a: 'vik' }, { h: 'mci', a: 'aek' }],
      [{ h: 'fcb', a: 'avl' }, { h: 'atm', a: 'bay' }, { h: 'mun', a: 'rom' }, { h: 'rmd', a: 'aek' }, { h: 'fen', a: 'liv' }, { h: 'rbl', a: 'mci' }],
      [{ h: 'ars', a: 'bvb' }, { h: 'mci', a: 'nap' }, { h: 'rmd', a: 'psv' }, { h: 'cbr', a: 'liv' }, { h: 'psg', a: 'rom' }],
      [{ h: 'fcb', a: 'mci' }, { h: 'ars', a: 'rmd' }],
      [{ h: 'int', a: 'liv' }, { h: 'mun', a: 'bay' }],
      [{ h: 'sha', a: 'rmd' }, { h: 'fcb', a: 'com' }]
    ];

    for (let m = 0; m < 8; m++) {
      const matchday = [];
      const used = new Set();
      (fixedFixtures[m] || []).forEach((f, idx) => {
        const homeTeam = getTeam(f.h), awayTeam = getTeam(f.a);
        if (homeTeam && awayTeam) {
          used.add(teams.findIndex(t => t.id === homeTeam.id));
          used.add(teams.findIndex(t => t.id === awayTeam.id));
          matchday.push({ id: `m_${m+1}_f${idx}`, matchday: m+1, home: homeTeam, away: awayTeam, scoreHome: null, scoreAway: null, events: [], stats: null });
        }
      });
      for (let i = 0; i < teams.length; i++) {
        if (used.has(i)) continue;
        let oppIdx = -1;
        for (let j = i + 1; j < teams.length; j++) { if (!used.has(j)) { oppIdx = j; break; } }
        if (oppIdx !== -1) {
          used.add(i); used.add(oppIdx);
          matchday.push({ id: `m_${m+1}_a${i}`, matchday: m+1, home: m%2===0?teams[i]:teams[oppIdx], away: m%2===0?teams[oppIdx]:teams[i], scoreHome: null, scoreAway: null, events: [], stats: null });
        }
      }
      rounds.push(matchday);
    }
    return rounds;
  };

  const calculateMatchResult = (home, away, isLeg2 = false) => {
    const ratingHomeEffective = home.userRating + (isLeg2 ? 0.15 : 0.30);
    const ratingAwayEffective = away.userRating;
    const ratingRatio = ratingHomeEffective / Math.max(0.5, ratingAwayEffective);
    
    let xG_home = Math.max(0.1, Math.min(4.5, (ratingHomeEffective * 0.22) * Math.pow(ratingRatio, 0.85)));
    let xG_away = Math.max(0.05, Math.min(4.0, (ratingAwayEffective * 0.20) / Math.pow(ratingRatio, 0.85)));

    const generateRealisticGoals = (xg) => {
      let goals = 0, p = Math.exp(-xg), prob = p, u = Math.random();
      while (u > prob && goals < 7) { goals++; p = (p * xg) / goals; prob += p; }
      return goals;
    };

    let gHome = generateRealisticGoals(xG_home), gAway = generateRealisticGoals(xG_away);
    const events = [];
    const minutesUsed = new Set();
    const getRandomMin = () => { let m = Math.floor(Math.random() * 90) + 1; while (minutesUsed.has(m)) m = Math.floor(Math.random() * 90) + 1; minutesUsed.add(m); return m; };

    const addGoals = (count, team, isHome) => {
      for (let i = 0; i < count; i++) {
        const min = getRandomMin();
        const scorer = team.stars[Math.floor(Math.random() * team.stars.length)];
        events.push({ minute: min, type: 'GOAL', teamName: team.name, text: `¡GOOOOL DE ${team.name.toUpperCase()}! Marca ${scorer}.`, isHome });
      }
    };
    addGoals(gHome, home, true);
    addGoals(gAway, away, false);
    events.sort((a, b) => a.minute - b.minute);

    return { scoreHome: gHome, scoreAway: gAway, events, stats: { possession: [52, 48], shots: [gHome+4, gAway+4] } };
  };

  const openMatchModal = (match) => { setSelectedMatch(match); setLiveMatch({ ...match }); setLiveMin(match.scoreHome !== null ? 90 : 0); setMatchLogs(match.events || []); setIsSimulating(false); };

  const startSimulation = (match) => {
    if (!match || match.scoreHome !== null) return;
    const res = calculateMatchResult(match.home, match.away);
    setLiveMatch({ ...match, ...res });
    setLiveMin(90); setMatchLogs(res.events); applyMatchResult(match, res);
  };

  const applyMatchResult = (match, res) => {
    setFixtures(prev => {
      const next = [...prev];
      const mday = match.matchday - 1;
      const idx = next[mday].findIndex(x => x.id === match.id);
      if (idx !== -1) next[mday][idx] = { ...next[mday][idx], ...res };
      return next;
    });
    setStandings(prev => {
      const next = prev.map(t => ({ ...t }));
      const h = next.find(t => t.id === match.home.id), a = next.find(t => t.id === match.away.id);
      if (h && a) {
        h.mp++; a.mp++; h.gf += res.scoreHome; h.ga += res.scoreAway; a.gf += res.scoreAway; a.ga += res.scoreHome;
        h.gd = h.gf - h.ga; a.gd = a.gf - a.ga;
        if (res.scoreHome > res.scoreAway) { h.w++; h.pts += 3; a.l++; }
        else if (res.scoreAway > res.scoreHome) { a.w++; a.pts += 3; h.l++; }
        else { h.d++; h.pts++; a.d++; a.pts++; }
      }
      return next.sort((a, b) => b.pts - a.pts || b.gd - a.gd || b.gf - a.gf);
    });
  };

  const simulateFullMatchday = () => {
    if (currentMatchday > 8) return;
    fixtures[currentMatchday - 1].forEach(m => { if (m.scoreHome === null) applyMatchResult(m, calculateMatchResult(m.home, m.away)); });
    if (currentMatchday < 8) setCurrentMatchday(prev => prev + 1);
  };

  const simulateEntireLeaguePhase = () => {
    fixtures.forEach(mday => mday.forEach(match => { if (match.scoreHome === null) applyMatchResult(match, calculateMatchResult(match.home, match.away)); }));
    setCurrentMatchday(8);
  };

  return (
    <div className="min-h-screen bg-[#070d19] text-slate-100 font-sans pb-12">
      <header className="bg-gradient-to-r from-[#091540] via-[#0d1b2a] to-[#070d19] border-b border-blue-900/40 shadow-2xl p-4 flex justify-between items-center max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <Trophy className="w-8 h-8 text-yellow-300" />
          <h1 className="text-xl font-black uppercase">UEFA Champions League 26/27</h1>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setActiveTab('league')} className={`px-3 py-1.5 rounded text-xs font-bold ${activeTab === 'league' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-300'}`}>Fase de Liga</button>
          <button onClick={() => setActiveTab('teams')} className={`px-3 py-1.5 rounded text-xs font-bold ${activeTab === 'teams' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-300'}`}>Ratings</button>
          <button onClick={initTournament} className="p-1.5 bg-slate-800 rounded text-blue-400"><RefreshCw className="w-4 h-4" /></button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        {activeTab === 'league' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-4">
              <h3 className="text-sm font-bold mb-3 uppercase text-blue-400">Tabla General (36 Equipos)</h3>
              <div className="max-h-[550px] overflow-y-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-950 text-slate-400 sticky top-0">
                    <tr><th className="p-2">Pos</th><th className="p-2">Club</th><th className="p-2 text-center">PJ</th><th className="p-2 text-center">Pts</th></tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {standings.map((t, idx) => (
                      <tr key={t.id} className="hover:bg-slate-800/50">
                        <td className="p-2 font-bold">{idx + 1}</td>
                        <td className="p-2 font-bold flex items-center gap-2"><span>{t.flag}</span>{t.name}</td>
                        <td className="p-2 text-center">{t.mp}</td>
                        <td className="p-2 text-center font-black text-amber-400">{t.pts}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="lg:col-span-5 space-y-4">
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3">
                <button onClick={simulateFullMatchday} disabled={currentMatchday > 8} className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 font-bold text-xs rounded-xl flex items-center justify-center gap-2">
                  <Play className="w-4 h-4 fill-current" /> Simular Jornada {currentMatchday}
                </button>
                <button onClick={simulateEntireLeaguePhase} className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 font-bold text-xs rounded-xl flex items-center justify-center gap-2">
                  <Sparkles className="w-4 h-4" /> Simular Toda la Fase
                </button>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-2 max-h-[400px] overflow-y-auto">
                <h4 className="text-xs font-bold text-slate-300">Partidos Jornada {currentMatchday}</h4>
                {fixtures[currentMatchday - 1]?.map(match => (
                  <div key={match.id} onClick={() => openMatchModal(match)} className="p-2.5 bg-slate-950 rounded-lg border border-slate-800 flex justify-between items-center cursor-pointer hover:border-blue-500">
                    <span className="text-xs font-bold">{match.home.flag} {match.home.name}</span>
                    <span className="font-mono text-amber-400 font-bold text-xs">{match.scoreHome !== null ? `${match.scoreHome}-${match.scoreAway}` : 'VS'}</span>
                    <span className="text-xs font-bold">{match.away.name} {match.away.flag}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'teams' && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {CLUBS_26_27.map(c => (
              <div key={c.id} className="bg-slate-900 border border-slate-800 rounded-xl p-3 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{c.flag}</span>
                  <span className="font-bold text-xs">{c.name}</span>
                </div>
                <span className="font-black text-amber-400 text-xs">★ {c.userRating}</span>
              </div>
            ))}
          </div>
        )}
      </main>

      {selectedMatch && liveMatch && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md p-6 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-sm">Simulación de Partido</h3>
              <button onClick={() => setSelectedMatch(null)}><X className="w-5 h-5" /></button>
            </div>
            <div className="text-center space-y-2">
              <div className="flex justify-around items-center">
                <span className="font-bold text-xs">{liveMatch.home.flag} {liveMatch.home.name}</span>
                <span className="font-mono text-2xl font-black text-amber-400">{liveMatch.scoreHome !== null ? `${liveMatch.scoreHome} - ${liveMatch.scoreAway}` : 'VS'}</span>
                <span className="font-bold text-xs">{liveMatch.away.name} {liveMatch.away.flag}</span>
              </div>
              {selectedMatch.scoreHome === null && (
                <button onClick={() => startSimulation(selectedMatch)} className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl">
                  Simular Resultado
                </button>
              )}
            </div>
            <div className="max-h-40 overflow-y-auto space-y-1 text-xs">
              {matchLogs.map((log, i) => (
                <div key={i} className="bg-slate-950 p-2 rounded text-slate-300">
                  <span className="text-blue-400 font-bold">{log.minute}'</span> {log.text}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
