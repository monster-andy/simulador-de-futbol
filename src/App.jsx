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

// --- BASE DE DATOS REALISTA DE LOS 36 CLUBES CON TUS PUNTUACIONES (1 - 10) ---
const CLUBS_26_27 = [
  // 🇪🇸 ESPAÑA (5)
  { id: 'rmd', name: 'Real Madrid', country: 'España', flag: '🇪🇸', userRating: 8.8, att: 93, def: 88, mid: 92, ovr: 91, form: '+8', stars: ['Kylian Mbappé', 'Vinícius Jr.', 'Jude Bellingham', 'Rodrygo', 'Endrick'] },
  { id: 'fcb', name: 'FC Barcelona', country: 'España', flag: '🇪🇸', userRating: 9.5, att: 96, def: 90, mid: 95, ovr: 95, form: '+9', stars: ['Lamine Yamal', 'Robert Lewandowski', 'Raphinha', 'Pedri', 'Dani Olmo'] },
  { id: 'atm', name: 'Atlético de Madrid', country: 'España', flag: '🇪🇸', userRating: 7.9, att: 83, def: 82, mid: 82, ovr: 82, form: '+3', stars: ['Julián Álvarez', 'Antoine Griezmann', 'Conor Gallagher', 'Alexander Sørloth'] },
  { id: 'vll', name: 'Villarreal CF', country: 'España', flag: '🇪🇸', userRating: 5.0, att: 72, def: 70, mid: 71, ovr: 71, form: '0', stars: ['Ayoze Pérez', 'Álex Baena', 'Gerard Moreno', 'Dani Parejo'] },
  { id: 'bet', name: 'Real Betis', country: 'España', flag: '🇪🇸', userRating: 7.5, att: 81, def: 79, mid: 81, ovr: 80, form: '+1', stars: ['Isco', 'Giovani Lo Celso', 'Vitor Roque', 'Ez Abde'] },

  // 🏴󠁧󠁢󠁥󠁮󠁧󠁿 INGLATERRA (5)
  { id: 'liv', name: 'Liverpool FC', country: 'Inglaterra', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', userRating: 8.5, att: 90, def: 88, mid: 89, ovr: 89, form: '+7', stars: ['Mohamed Salah', 'Luis Díaz', 'Alexis Mac Allister', 'Trent Alexander-Arnold'] },
  { id: 'mci', name: 'Manchester City', country: 'Inglaterra', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', userRating: 8.5, att: 90, def: 88, mid: 89, ovr: 89, form: '+7', stars: ['Erling Haaland', 'Kevin De Bruyne', 'Phil Foden', 'Rodri'] },
  { id: 'ars', name: 'Arsenal FC', country: 'Inglaterra', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', userRating: 9.0, att: 92, def: 92, mid: 92, ovr: 92, form: '+8', stars: ['Bukayo Saka', 'Martin Ødegaard', 'Kai Havertz', 'Declan Rice'] },
  { id: 'avl', name: 'Aston Villa', country: 'Inglaterra', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', userRating: 7.5, att: 81, def: 79, mid: 81, ovr: 80, form: '+2', stars: ['Ollie Watkins', 'Jhon Durán', 'Youri Tielemans', 'Emiliano Martínez'] },
  { id: 'mun', name: 'Manchester United', country: 'Inglaterra', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', userRating: 6.0, att: 75, def: 74, mid: 75, ovr: 75, form: '-1', stars: ['Bruno Fernandes', 'Marcus Rashford', 'Rasmus Højlund', 'Kobbie Mainoo'] },

  // 🇮🇹 ITALIA (4)
  { id: 'int', name: 'Inter de Milán', country: 'Italia', flag: '🇮🇹', userRating: 8.5, att: 89, def: 89, mid: 89, ovr: 89, form: '+6', stars: ['Lautaro Martínez', 'Marcus Thuram', 'Nicolò Barella', 'Hakan Çalhanoğlu'] },
  { id: 'rom', name: 'AS Roma', country: 'Italia', flag: '🇮🇹', userRating: 6.0, att: 75, def: 74, mid: 75, ovr: 75, form: '0', stars: ['Paulo Dybala', 'Artem Dovbyk', 'Lorenzo Pellegrini'] },
  { id: 'nap', name: 'Napoli', country: 'Italia', flag: '🇮🇹', userRating: 6.0, att: 75, def: 74, mid: 75, ovr: 75, form: '0', stars: ['Romelu Lukaku', 'Khvicha Kvaratskhelia', 'Scott McTominay'] },
  { id: 'com', name: 'Como 1907', country: 'Italia', flag: '🇮🇹', userRating: 7.5, att: 80, def: 78, mid: 80, ovr: 79, form: '+3', stars: ['Nico Paz', 'Andrea Belotti', 'Gabriel Strefezza'] },

  // 🇩🇪 ALEMANIA (4)
  { id: 'bay', name: 'Bayern Múnich', country: 'Alemania', flag: '🇩🇪', userRating: 9.6, att: 97, def: 91, mid: 95, ovr: 95, form: '+9', stars: ['Harry Kane', 'Jamal Musiala', 'Leroy Sané', 'Michael Olise'] },
  { id: 'bvb', name: 'Borussia Dortmund', country: 'Alemania', flag: '🇩🇪', userRating: 7.0, att: 79, def: 77, mid: 79, ovr: 78, form: '+1', stars: ['Serhou Guirassy', 'Julian Brandt', 'Karim Adeyemi'] },
  { id: 'stu', name: 'VfB Stuttgart', country: 'Alemania', flag: '🇩🇪', userRating: 4.0, att: 68, def: 66, mid: 67, ovr: 67, form: '-1', stars: ['Deniz Undav', 'Ermedin Demirović', 'Enzo Millot'] },
  { id: 'rbl', name: 'RB Leipzig', country: 'Alemania', flag: '🇩🇪', userRating: 4.0, att: 68, def: 66, mid: 67, ovr: 67, form: '-1', stars: ['Lois Openda', 'Benjamin Šeško', 'Xavi Simons'] },

  // 🇫🇷 FRANCIA (3)
  { id: 'psg', name: 'Paris Saint-Germain', country: 'Francia', flag: '🇫🇷', userRating: 9.7, att: 98, def: 92, mid: 96, ovr: 96, form: '+10', stars: ['Bradley Barcola', 'Ousmane Dembélé', 'Vitinha', 'Achraf Hakimi'] },
  { id: 'lil', name: 'Lille OSC', country: 'Francia', flag: '🇫🇷', userRating: 4.0, att: 68, def: 66, mid: 67, ovr: 67, form: '0', stars: ['Jonathan David', 'Edon Zhegrova', 'Osame Sahraoui'] },
  { id: 'len', name: 'RC Lens', country: 'Francia', flag: '🇫🇷', userRating: 3.0, att: 64, def: 62, mid: 63, ovr: 63, form: '-1', stars: ['Florian Sotoca', 'Przemysław Frankowski', 'M\'Bala Nzola'] },

  // 🇵🇹 PORTUGAL (2)
  { id: 'spo', name: 'Sporting CP', country: 'Portugal', flag: '🇵🇹', userRating: 7.0, att: 79, def: 77, mid: 79, ovr: 78, form: '+2', stars: ['Viktor Gyökeres', 'Francisco Trincão', 'Pedro Gonçalves'] },
  { id: 'por', name: 'FC Porto', country: 'Portugal', flag: '🇵🇹', userRating: 6.0, att: 75, def: 74, mid: 75, ovr: 75, form: '0', stars: ['Samu Omorodion', 'Galeno', 'Nico González'] },

  // 🇳🇱 PAÍSES BAJOS (2)
  { id: 'psv', name: 'PSV Eindhoven', country: 'Países Bajos', flag: '🇳🇱', userRating: 6.0, att: 75, def: 74, mid: 75, ovr: 75, form: '0', stars: ['Luuk de Jong', 'Johan Bakayoko', 'Ismael Saibari'] },
  { id: 'fey', name: 'Feyenoord', country: 'Países Bajos', flag: '🇳🇱', userRating: 6.0, att: 75, def: 74, mid: 75, ovr: 75, form: '0', stars: ['Santiago Giménez', 'Igor Paixão', 'Quintem Timber'] },

  // 🇹🇷 TURQUÍA (2)
  { id: 'gal', name: 'Galatasaray', country: 'Turquía', flag: '🇹🇷', userRating: 5.0, att: 72, def: 70, mid: 71, ovr: 71, form: '0', stars: ['Victor Osimhen', 'Mauro Icardi', 'Dries Mertens'] },
  { id: 'fen', name: 'Fenerbahçe', country: 'Turquía', flag: '🇹🇷', userRating: 5.0, att: 72, def: 70, mid: 71, ovr: 71, form: '0', stars: ['Youssef En-Nesyri', 'Edin Džeko', 'Dušan Tadić'] },

  // 🇳🇴 NORUEGA (2)
  { id: 'bod', name: 'Bodø/Glimt', country: 'Noruega', flag: '🇳🇴', userRating: 6.0, att: 75, def: 74, mid: 75, ovr: 75, form: '+1', stars: ['Jens Petter Hauge', 'Ulrik Saltnes', 'Håkon Evjen'] },
  { id: 'vik', name: 'Viking FK', country: 'Noruega', flag: '🇳🇴', userRating: 2.0, att: 60, def: 58, mid: 59, ovr: 59, form: '-2', stars: ['Lars-Jørgen Salvesen', 'Zlatko Tripić', 'Sondre Auklend'] },

  // OTROS PAÍSES CLASIFICADOS (7)
  { id: 'las', name: 'LASK Linz', country: 'Austria', flag: '🇦🇹', userRating: 3.0, att: 64, def: 62, mid: 63, ovr: 63, form: '0', stars: ['Robert Žulj', 'Marin Ljubičić', 'Moses Uzor'] },
  { id: 'cbr', name: 'Club Brujas', country: 'Bélgica', flag: '🇧🇪', userRating: 5.0, att: 72, def: 70, mid: 71, ovr: 71, form: '0', stars: ['Hans Vanaken', 'Christos Tzolis', 'Andreas Skov Olsen'] },
  { id: 'aek', name: 'AEK Atenas', country: 'Grecia', flag: '🇬🇷', userRating: 3.0, att: 64, def: 62, mid: 63, ovr: 63, form: '0', stars: ['Levi García', 'Erik Lamela', 'Roberto Pereyra'] },
  { id: 'sla', name: 'Slavia Praga', country: 'República Checa', flag: '🇨🇿', userRating: 3.0, att: 64, def: 62, mid: 63, ovr: 63, form: '0', stars: ['Tomáš Chorý', 'Lukáš Provod', 'Christos Zafeiris'] },
  { id: 'sha', name: 'Shakhtar Donetsk', country: 'Ucrania', flag: '🇺🇦', userRating: 2.0, att: 60, def: 58, mid: 59, ovr: 59, form: '-1', stars: ['Heorhiy Sudakov', 'Eguinaldo', 'Danylo Sikan'] },
  { id: 'sbr', name: 'Slovan Bratislava', country: 'Eslovaquia', flag: '🇸🇰', userRating: 1.0, att: 55, def: 52, mid: 53, ovr: 53, form: '-3', stars: ['Vladimír Weiss', 'Dávid Štrelec', 'Tigran Barseghyan'] },
  { id: 'sab', name: 'Sabah FK', country: 'Azerbaiyán', flag: '🇦🇿', userRating: 4.0, att: 68, def: 66, mid: 67, ovr: 67, form: '0', stars: ['Joy-Lance Mickels', 'Bojan Šekerika', 'Daviti Volkovi'] }
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

  useEffect(() => {
    initTournament();
  }, []);

  useEffect(() => {
    if (logsEndRef.current) {
      logsEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [matchLogs]);

  const initTournament = () => {
    const initialStandings = CLUBS_26_27.map(club => ({
      ...club,
      mp: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, gd: 0, pts: 0
    }));

    const generatedFixtures = generateLeagueFixtures(CLUBS_26_27);

    setStandings(initialStandings);
    setFixtures(generatedFixtures);
    setCurrentMatchday(1);
    setSelectedMatch(null);
    setPlayoffs(null);
    setR16(null);
    setQf(null);
    setSf(null);
    setFinalMatch(null);
    setChampion(null);
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

      const curFixed = fixedFixtures[m] || [];
      curFixed.forEach((f, idx) => {
        const homeTeam = getTeam(f.h);
        const awayTeam = getTeam(f.a);
        if (homeTeam && awayTeam) {
          const hIdx = teams.findIndex(t => t.id === homeTeam.id);
          const aIdx = teams.findIndex(t => t.id === awayTeam.id);
          if (!used.has(hIdx) && !used.has(aIdx)) {
            used.add(hIdx);
            used.add(aIdx);
            matchday.push({
              id: `m_${m + 1}_f${idx}`,
              matchday: m + 1,
              home: homeTeam,
              away: awayTeam,
              scoreHome: null,
              scoreAway: null,
              events: [],
              stats: null
            });
          }
        }
      });

      for (let i = 0; i < teams.length; i++) {
        if (used.has(i)) continue;
        const homeTeam = teams[i];

        let oppIdx = -1;
        for (let j = i + 1; j < teams.length; j++) {
          if (!used.has(j)) {
            oppIdx = j;
            break;
          }
        }

        if (oppIdx !== -1) {
          const awayTeam = teams[oppIdx];
          used.add(i);
          used.add(oppIdx);

          matchday.push({
            id: `m_${m + 1}_a${i}`,
            matchday: m + 1,
            home: m % 2 === 0 ? homeTeam : awayTeam,
            away: m % 2 === 0 ? awayTeam : homeTeam,
            scoreHome: null,
            scoreAway: null,
            events: [],
            stats: null
          });
        }
      }

      rounds.push(matchday);
    }
    return rounds;
  };

  const calculateMatchResult = (home, away, isLeg2 = false, leg1Result = null) => {
    const homeBonus = isLeg2 ? 0.15 : 0.30;
    const ratingHomeEffective = home.userRating + homeBonus;
    const ratingAwayEffective = away.userRating;

    const ratingRatio = ratingHomeEffective / Math.max(0.5, ratingAwayEffective);
    
    let xG_home = Math.max(0.1, Math.min(4.5, (ratingHomeEffective * 0.22) * Math.pow(ratingRatio, 0.85)));
    let xG_away = Math.max(0.05, Math.min(4.0, (ratingAwayEffective * 0.20) / Math.pow(ratingRatio, 0.85)));

    const ratingDiff = ratingHomeEffective - ratingAwayEffective;
    if (ratingDiff > 4.5) {
      xG_home += 0.8;
      xG_away = Math.max(0.02, xG_away * 0.25);
    } else if (ratingDiff < -4.5) {
      xG_home = Math.max(0.05, xG_home * 0.25);
      xG_away += 0.8;
    }

    const generateRealisticGoals = (xg) => {
      let goals = 0;
      let p = Math.exp(-xg);
      let prob = p;
      let u = Math.random();

      while (u > prob && goals < 7) {
        goals++;
        p = (p * xg) / goals;
        prob += p;
      }
      return goals;
    };

    let gHome = generateRealisticGoals(xG_home);
    let gAway = generateRealisticGoals(xG_away);

    const events = [];
    const minutesUsed = new Set();

    const getRandomMin = () => {
      let m = Math.floor(Math.random() * 90) + 1;
      while (minutesUsed.has(m)) m = Math.floor(Math.random() * 90) + 1;
      minutesUsed.add(m);
      return m;
    };

    const addGoals = (count, team, isHome) => {
      for (let i = 0; i < count; i++) {
        const min = getRandomMin();
        const scorer = team.stars[Math.floor(Math.random() * team.stars.length)];
        const assister = team.stars.filter(s => s !== scorer)[Math.floor(Math.random() * (team.stars.length - 1))] || 'su compañero';

        const templates = [
          `¡GOOOOL DE ${team.name.toUpperCase()}! ${scorer} define con maestría tras asistencia de ${assister}.`,
          `¡GOLAZO! ${scorer} saca un disparo imparable al ángulo. ¡Avanza ${team.name}!`,
          `¡GOL DE ${team.name.toUpperCase()}! Imponente remate de cabeza de ${scorer}.`
        ];

        events.push({
          minute: min,
          type: 'GOAL',
          teamName: team.name,
          text: templates[i % templates.length],
          isHome
        });
      }
    };

    addGoals(gHome, home, true);
    addGoals(gAway, away, false);

    const extraPlays = Math.floor(Math.random() * 3) + 2;
    for (let i = 0; i < extraPlays; i++) {
      const min = getRandomMin();
      const isHome = Math.random() > 0.48;
      const t = isHome ? home : away;
      const star = t.stars[Math.floor(Math.random() * t.stars.length)];

      events.push({
        minute: min,
        type: 'PLAY',
        teamName: t.name,
        text: `¡OCASIÓN CLARA! Remate potente de ${star} que se estrella en el poste.`,
        isHome
      });
    }

    events.sort((a, b) => a.minute - b.minute);

    const posHome = Math.min(74, Math.max(32, Math.round(50 + (home.mid - away.mid) * 1.5)));
    const posAway = 100 - posHome;

    return {
      scoreHome: gHome,
      scoreAway: gAway,
      events,
      stats: {
        possession: [posHome, posAway],
        shots: [gHome + 5, gAway + 4],
        shotsOnTarget: [gHome + 2, gAway + 2]
      }
    };
  };

  const openMatchModal = (match) => {
    setSelectedMatch(match);
    setLiveMatch({ ...match });
    setLiveMin(match.scoreHome !== null ? 90 : 0);
    setMatchLogs(match.events || []);
    setIsSimulating(false);
  };

  const startSimulation = (match) => {
    if (!match || match.scoreHome !== null) return;

    const res = calculateMatchResult(match.home, match.away);
    const fullMatchData = { ...match, ...res };

    if (simSpeed === 0) {
      setLiveMin(90);
      setLiveMatch(fullMatchData);
      setMatchLogs(res.events);
      applyMatchResult(match, res);
    } else {
      setIsSimulating(true);
      setLiveMatch(fullMatchData);
      setLiveMin(0);
      setMatchLogs([]);

      let m = 0;
      const intervalTime = simSpeed === 1 ? 50 : simSpeed === 2 ? 20 : 5;

      const interval = setInterval(() => {
        m += 1;
        setLiveMin(m);

        const currentEvents = res.events.filter(e => e.minute === m);
        if (currentEvents.length > 0) {
          setMatchLogs(prev => [...prev, ...currentEvents]);
        }

        if (m >= 90) {
          clearInterval(interval);
          setIsSimulating(false);
          applyMatchResult(match, res);
        }
      }, intervalTime);
    }
  };

  const applyMatchResult = (match, res) => {
    setFixtures(prev => {
      const next = [...prev];
      const mday = match.matchday - 1;
      const idx = next[mday].findIndex(x => x.id === match.id);
      if (idx !== -1) {
        next[mday][idx] = { ...next[mday][idx], ...res };
      }
      return next;
    });

    setStandings(prev => {
      const next = prev.map(t => ({ ...t }));
      const h = next.find(t => t.id === match.home.id);
      const a = next.find(t => t.id === match.away.id);

      if (h && a) {
        h.mp += 1; a.mp += 1;
        h.gf += res.scoreHome; h.ga += res.scoreAway;
        a.gf += res.scoreAway; a.ga += res.scoreHome;
        h.gd = h.gf - h.ga; a.gd = a.gf - a.ga;

        if (res.scoreHome > res.scoreAway) {
          h.w += 1; h.pts += 3;
          a.l += 1;
        } else if (res.scoreAway > res.scoreHome) {
          a.w += 1; a.pts += 3;
          h.l += 1;
        } else {
          h.d += 1; h.pts += 1;
          a.d += 1; a.pts += 1;
        }
      }

      return next.sort((a, b) => b.pts - a.pts || b.gd - a.gd || b.gf - a.gf);
    });
  };

  const simulateFullMatchday = () => {
    if (currentMatchday > 8) return;
    const currentFixtures = fixtures[currentMatchday - 1];
    currentFixtures.forEach(m => {
      if (m.scoreHome === null) {
        const res = calculateMatchResult(m.home, m.away);
        applyMatchResult(m, res);
      }
    });

    if (currentMatchday < 8) {
      setCurrentMatchday(prev => prev + 1);
    }
  };

  const simulateEntireLeaguePhase = () => {
    for (let m = 0; m < 8; m++) {
      fixtures[m].forEach(match => {
        if (match.scoreHome === null) {
          const res = calculateMatchResult(match.home, match.away);
          applyMatchResult(match, res);
        }
      });
    }
    setCurrentMatchday(8);
  };

  const generatePlayoffsAndR16 = () => {
    if (standings.some(t => t.mp < 8)) return;

    const top8 = standings.slice(0, 8);
    const playoffTeams = standings.slice(8, 24);

    const newPlayoffs = [];
    for (let i = 0; i < 8; i++) {
      const seedHigh = playoffTeams[i];
      const seedLow = playoffTeams[15 - i];

      const leg1Res = calculateMatchResult(seedLow, seedHigh);
      const leg2Res = calculateMatchResult(seedHigh, seedLow, true, leg1Res);

      const aggHome = leg1Res.scoreAway + leg2Res.scoreHome;
      const aggAway = leg1Res.scoreHome + leg2Res.scoreAway;

      let winner = aggHome >= aggAway ? seedHigh : seedLow;
      newPlayoffs.push({ id: `po_${i}`, teamHigh: seedHigh, teamLow: seedLow, leg1: leg1Res, leg2: leg2Res, aggHigh: aggHome, aggLow: aggAway, winner });
    }
    setPlayoffs(newPlayoffs);

    const playoffWinners = newPlayoffs.map(p => p.winner);
    const newR16 = [];
    for (let i = 0; i < 8; i++) {
      const topTeam = top8[i];
      const poWinner = playoffWinners[i];

      const leg1Res = calculateMatchResult(poWinner, topTeam);
      const leg2Res = calculateMatchResult(topTeam, poWinner, true, leg1Res);

      const aggTop = leg1Res.scoreAway + leg2Res.scoreHome;
      const aggPO = leg1Res.scoreHome + leg2Res.scoreAway;

      let winner = aggTop >= aggPO ? topTeam : poWinner;
      newR16.push({ id: `r16_${i}`, home: topTeam, away: poWinner, leg1: leg1Res, leg2: leg2Res, aggHome: aggTop, aggAway: aggPO, winner });
    }
    setR16(newR16);

    const r16Winners = newR16.map(r => r.winner);
    const newQf = [];
    for (let i = 0; i < 4; i++) {
      const t1 = r16Winners[i * 2];
      const t2 = r16Winners[i * 2 + 1];

      const leg1Res = calculateMatchResult(t2, t1);
      const leg2Res = calculateMatchResult(t1, t2, true, leg1Res);

      const agg1 = leg1Res.scoreAway + leg2Res.scoreHome;
      const agg2 = leg1Res.scoreHome + leg2Res.scoreAway;

      let winner = agg1 >= agg2 ? t1 : t2;
      newQf.push({ id: `qf_${i}`, home: t1, away: t2, leg1: leg1Res, leg2: leg2Res, aggHome: agg1, aggAway: agg2, winner });
    }
    setQf(newQf);

    const qfWinners = newQf.map(q => q.winner);
    const newSf = [];
    for (let i = 0; i < 2; i++) {
      const t1 = qfWinners[i * 2];
      const t2 = qfWinners[i * 2 + 1];

      const leg1Res = calculateMatchResult(t2, t1);
      const leg2Res = calculateMatchResult(t1, t2, true, leg1Res);

      const agg1 = leg1Res.scoreAway + leg2Res.scoreHome;
      const agg2 = leg1Res.scoreHome + leg2Res.scoreAway;

      let winner = agg1 >= agg2 ? t1 : t2;
      newSf.push({ id: `sf_${i}`, home: t1, away: t2, leg1: leg1Res, leg2: leg2Res, aggHome: agg1, aggAway: agg2, winner });
    }
    setSf(newSf);

    const sfWinners = newSf.map(s => s.winner);
    const finalRes = calculateMatchResult(sfWinners[0], sfWinners[1]);
    let champ = finalRes.scoreHome >= finalRes.scoreAway ? sfWinners[0] : sfWinners[1];

    setFinalMatch({ home: sfWinners[0], away: sfWinners[1], result: finalRes, winner: champ });
    setChampion(champ);
    setActiveTab('bracket');
  };

  return (
    <div className="min-h-screen bg-[#070d19] text-slate-100 font-sans pb-12">
      <header className="relative bg-gradient-to-r from-[#091540] via-[#0d1b2a] to-[#070d19] border-b border-blue-900/40 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-blue-600 via-indigo-500 to-amber-400 flex items-center justify-center border border-blue-300/30">
              <Trophy className="w-7 h-7 text-yellow-300" />
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-blue-200 uppercase">
                UEFA Champions League
              </h1>
              <p className="text-xs text-blue-300 font-medium tracking-widest uppercase">
                Simulador Oficial • Temporada 2026/2027
              </p>
            </div>
          </div>

          <div className="flex items-center bg-slate-900/90 p-1.5 rounded-xl border border-slate-800">
            <button onClick={() => setActiveTab('league')} className={`px-4 py-2 rounded-lg text-xs font-bold transition ${activeTab === 'league' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'}`}>
              Fase de Liga
            </button>
            <button onClick={() => setActiveTab('bracket')} className={`px-4 py-2 rounded-lg text-xs font-bold transition ${activeTab === 'bracket' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'}`}>
              Playoffs y Cuadro
            </button>
            <button onClick={() => setActiveTab('teams')} className={`px-4 py-2 rounded-lg text-xs font-bold transition ${activeTab === 'teams' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'}`}>
              Puntuaciones (1-10)
            </button>
          </div>

          <button onClick={initTournament} className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl text-xs font-semibold text-slate-200 flex items-center gap-2">
            <RefreshCw className="w-3.5 h-3.5 text-blue-400" /> Reiniciar Torneo
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        {activeTab === 'league' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-7 bg-slate-900/80 border border-slate-800 rounded-2xl p-4 shadow-xl">
              <div className="flex items-center justify-between mb-3 pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-blue-400" />
                  <h3 className="text-sm font-extrabold text-white uppercase">Clasificación General (36 Equipos)</h3>
                </div>
                <span className="text-[11px] font-bold text-slate-400">Jornada {currentMatchday} de 8</span>
              </div>

              <div className="overflow-x-auto max-h-[640px] overflow-y-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-950 text-slate-400 uppercase font-bold sticky top-0">
                    <tr>
                      <th className="p-2">Pos</th>
                      <th className="p-2">Club</th>
                      <th className="p-2 text-center">PJ</th>
                      <th className="p-2 text-center">PG</th>
                      <th className="p-2 text-center">PE</th>
                      <th className="p-2 text-center">PP</th>
                      <th className="p-2 text-center font-black text-white">Pts</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 font-medium">
                    {standings.map((t, idx) => (
                      <tr key={t.id} className="hover:bg-slate-800/60 transition">
                        <td className="p-2 font-bold">{idx + 1}</td>
                        <td className="p-2 font-bold text-white flex items-center gap-2">
                          <span>{t.flag}</span>
                          <span className="truncate max-w-[140px]">{t.name}</span>
                        </td>
                        <td className="p-2 text-center text-slate-300">{t.mp}</td>
                        <td className="p-2 text-center text-slate-400">{t.w}</td>
                        <td className="p-2 text-center text-slate-400">{t.d}</td>
                        <td className="p-2 text-center text-slate-400">{t.l}</td>
                        <td className="p-2 text-center font-black text-amber-400 font-mono text-sm">{t.pts}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="lg:col-span-5 space-y-4">
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-xl space-y-3">
                <span className="text-xs font-extrabold text-blue-400 uppercase block">Opciones de Simulación</span>
                <div className="grid grid-cols-2 gap-2">
                  <button onClick={simulateFullMatchday} disabled={currentMatchday > 8} className="py-2.5 px-3 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5">
                    <Play className="w-3.5 h-3.5 fill-current" /> Simular Jornada {currentMatchday}
                  </button>
                  <button onClick={simulateEntireLeaguePhase} className="py-2.5 px-3 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" /> Simular Todo
                  </button>
                </div>

                {standings.every(t => t.mp === 8) && (
                  <button onClick={generatePlayoffsAndR16} className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs rounded-xl transition flex items-center justify-center gap-2 uppercase">
                    <Trophy className="w-4 h-4 text-yellow-300" /> Avanzar a Eliminatorias
                  </button>
                )}
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-xl space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                  <span className="text-xs font-extrabold text-slate-200 uppercase">Partidos de la Jornada {currentMatchday}</span>
                </div>

                <div className="space-y-2 max-h-[440px] overflow-y-auto pr-1">
                  {fixtures[currentMatchday - 1]?.map(match => (
                    <div key={match.id} onClick={() => openMatchModal(match)} className="p-3 rounded-xl border border-slate-800/80 bg-slate-950/60 hover:border-blue-500/80 transition cursor-pointer flex items-center justify-between">
                      <div className="flex items-center gap-2 w-5/12">
                        <span>{match.home.flag}</span>
                        <span className="text-xs font-bold text-white truncate">{match.home.name}</span>
                      </div>
                      <div className="w-2/12 text-center font-mono text-xs font-black px-2 py-1 bg-slate-900 rounded border border-slate-800 text-amber-400">
                        {match.scoreHome !== null ? `${match.scoreHome} - ${match.scoreAway}` : 'VS'}
                      </div>
                      <div className="flex items-center justify-end gap-2 w-5/12 text-right">
                        <span className="text-xs font-bold text-white truncate">{match.away.name}</span>
                        <span>{match.away.flag}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'teams' && (
          <div className="space-y-4">
            <h3 className="text-base font-black text-white uppercase">Puntuaciones del Usuario (Escala 1 - 10)</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {CLUBS_26_27.map(c => (
                <div key={c.id} className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{c.flag}</span>
                      <div>
                        <h4 className="font-bold text-xs text-white">{c.name}</h4>
                        <span className="text-[10px] text-slate-400">{c.country}</span>
                      </div>
                    </div>
                    <span className="font-black text-yellow-300 text-sm px-2 py-1 rounded bg-slate-950 border border-amber-500/30">
                      ★ {c.userRating}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {selectedMatch && liveMatch && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
            <div className="p-4 bg-slate-950 border-b border-slate-800 flex justify-between items-center">
              <span className="text-xs font-black text-white uppercase">Matchday {selectedMatch.matchday} • Simulación</span>
              <button onClick={() => setSelectedMatch(null)} className="p-1 text-slate-400 hover:text-white"><X className="w-5 h-5" /></button>
            </div>

            <div className="p-6 bg-slate-900 border-b border-slate-800 text-center space-y-4">
              <div className="flex items-center justify-around">
                <div className="text-center w-1/3">
                  <span className="text-4xl block">{liveMatch.home.flag}</span>
                  <h3 className="font-extrabold text-sm text-white">{liveMatch.home.name}</h3>
                </div>
                <div className="text-center w-1/3">
                  <div className="text-3xl font-black font-mono text-white bg-slate-950 py-2 rounded-xl border border-slate-800">
                    {liveMatch.scoreHome !== null ? `${liveMatch.scoreHome} - ${liveMatch.scoreAway}` : 'VS'}
                  </div>
                </div>
                <div className="text-center w-1/3">
                  <span className="text-4xl block">{liveMatch.away.flag}</span>
                  <h3 className="font-extrabold text-sm text-white">{liveMatch.away.name}</h3>
                </div>
              </div>

              {selectedMatch.scoreHome === null && !isSimulating && (
                <button onClick={() => startSimulation(selectedMatch)} className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs rounded-xl shadow uppercase">
                  Simular Partido Ahora
                </button>
              )}
            </div>

            <div className="p-4 overflow-y-auto space-y-2 flex-1">
              {matchLogs.map((log, i) => (
                <div key={i} className="p-2 rounded bg-slate-950 text-xs text-slate-300 flex items-center gap-2">
                  <span className="font-bold text-blue-400">{log.minute}'</span>
                  <span>{log.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}