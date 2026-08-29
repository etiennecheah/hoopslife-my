import React, { useState, useEffect, useRef, useMemo, useCallback, memo } from "react";
import {
  Trophy, Dumbbell, HeartPulse, TrendingUp, TrendingDown, Users, DollarSign,
  Newspaper, Star, Award, Activity, ChevronRight, Zap, Shield,
  Target, Plane, Flag, RotateCcw, Home, Sparkles, Brain, Gauge,
  Radio, Gem, Download, Share2, Search
} from "lucide-react";

/* ---------------------------------------------------------
   TROPHY & AWARD ICON LIBRARY
   A distinct hand-drawn icon per award/trophy CATEGORY (not per
   single achievement id — the same award repeated across age tiers,
   e.g. "U15 Top Scorer" / "U17 Top Scorer" / "MSSM Top Scorer", shares
   one icon, same as a real trophy design is reused year to year).
   All match lucide's API: <Icon size={16} color="..." />, viewBox
   0 0 24 24, stroke-based line art.
--------------------------------------------------------- */
const svgIcon = (paths) => ({ size = 16, color = "currentColor", style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={style}>
    {paths}
  </svg>
);

const IconTopScorer = svgIcon(<><circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="4"/><circle cx="12" cy="12" r="0.5" fill="currentColor"/></>);
const IconTopRebounder = svgIcon(<><path d="M6 14a6 6 0 0 1 12 0"/><path d="M4 14h16"/><path d="M8 10l1.5 4M16 10l-1.5 4"/></>);
const IconTopAssist = svgIcon(<><circle cx="6" cy="17" r="2.3"/><circle cx="18" cy="7" r="2.3"/><path d="M8.2 15.3 15.8 8.7"/><path d="M15.8 8.7l-3-.4M15.8 8.7l.6 3"/></>);
const IconTopSteal = svgIcon(<><path d="M4 16c3-1 5-4 5-8"/><path d="M6 6l3 2-1 3"/><circle cx="17" cy="9" r="3"/></>);
const IconTopBlock = svgIcon(<><path d="M12 3v7"/><path d="M8 6l4-3 4 3"/><path d="M5 14a7 7 0 0 0 14 0"/><path d="M5 14h14"/></>);
const IconPlayerOfTournament = svgIcon(<><circle cx="12" cy="9" r="5"/><path d="M9 13.5 7 21l5-3 5 3-2-7.5"/></>);
const IconFinalMVP = svgIcon(<><path d="M4 9l2-4 3 3 3-4 3 4 3-3 2 4"/><path d="M4 9h16l-1.5 8h-13z"/><path d="M9 13h6"/></>);
const IconChampion = svgIcon(<><path d="M7 4h10v6a5 5 0 0 1-10 0V4z"/><path d="M7 6H4a2 2 0 0 0 2 5M17 6h3a2 2 0 0 1-2 5"/><path d="M12 15v3M8 21h8l-1-3H9z"/></>);
const IconRunnerUp = svgIcon(<><circle cx="12" cy="14" r="6"/><path d="M9 3h6l-1.5 6.5h-3z"/><text x="12" y="17" fontSize="7" fill="currentColor" stroke="none" textAnchor="middle">2</text></>);
const IconThirdPlace = svgIcon(<><circle cx="12" cy="14" r="6"/><path d="M9 3h6l-1.5 6.5h-3z"/><text x="12" y="17" fontSize="7" fill="currentColor" stroke="none" textAnchor="middle">3</text></>);
const IconStateRep = svgIcon(<><path d="M12 21s-6-5.5-6-10a6 6 0 0 1 12 0c0 4.5-6 10-6 10z"/><circle cx="12" cy="11" r="2.2"/></>);
const IconShortlist = svgIcon(<><rect x="5" y="4" width="14" height="17" rx="1.5"/><path d="M9 3h6v3H9z"/><path d="M8.5 13l2 2 4-4"/></>);
const IconNationalTeam = svgIcon(<><path d="M8 4l-3 2v15h14V6l-3-2"/><path d="M8 4a4 4 0 0 0 8 0"/><path d="M11 10.5l1 1.8 1-1.8"/></>);
const IconTeamOfTournament = svgIcon(<><circle cx="12" cy="6" r="2"/><circle cx="5" cy="14" r="2"/><circle cx="19" cy="14" r="2"/><circle cx="8.5" cy="20" r="2"/><circle cx="15.5" cy="20" r="2"/></>);
const IconTurnedPro = svgIcon(<><path d="M5 4h11l3 3v13H5z"/><path d="M9 12h6M9 16h6M9 8h3"/><path d="M15 19l2-2 2 2v3l-2-1-2 1z"/></>);
const IconDebut = svgIcon(<><circle cx="12" cy="7" r="2.3"/><path d="M4 12l6-3M20 12l-6-3"/><path d="M4 12v3M20 12v3"/><path d="M8 21v-5l4-2 4 2v5"/></>);
const IconStarter = svgIcon(<><rect x="3" y="14" width="3" height="7"/><rect x="8" y="10" width="3" height="11"/><rect x="13" y="5" width="3" height="16" stroke="currentColor" fill="currentColor" fillOpacity="0.15"/><rect x="18" y="11" width="3" height="10"/></>);
const IconWonderkid = svgIcon(<><circle cx="12" cy="13" r="6"/><path d="M12 3v2M5 6l1.5 1.5M19 6l-1.5 1.5"/><path d="M12 13l-1-1.8 2-.2z" fill="currentColor"/></>);
const IconStandout = svgIcon(<><path d="M12 21V7"/><path d="M7 12l5-5 5 5"/><ellipse cx="12" cy="21" rx="7" ry="2"/></>);
const IconMVPCrown = svgIcon(<><path d="M4 8l3 3 5-6 5 6 3-3-2 10H6z"/><path d="M6 20h12"/></>);
const IconRookie = svgIcon(<><circle cx="12" cy="12" r="9"/><text x="12" y="16" fontSize="10" fill="currentColor" stroke="none" textAnchor="middle">R</text></>);
const IconSixthMan = svgIcon(<><rect x="3" y="16" width="18" height="3" rx="0.5"/><circle cx="7" cy="10" r="2"/><circle cx="12" cy="8" r="2"/><circle cx="17" cy="10" r="2"/><path d="M7 12v2M12 10v2M17 12v2"/></>);
const IconClubLoyal = svgIcon(<><path d="M12 20s-7-4.5-7-10a4.5 4.5 0 0 1 7-3.7A4.5 4.5 0 0 1 19 10c0 5.5-7 10-7 10z"/></>);
const IconJourneyman = svgIcon(<><path d="M3 12h4l2-7 4 14 2-7h6"/></>);
const IconAsiaCup = svgIcon(<><ellipse cx="12" cy="10" rx="6" ry="6"/><path d="M12 4a6 8 0 0 1 0 12"/><path d="M12 16v3"/><path d="M8 21h8l-1-2H9z"/></>);
const IconMedal = svgIcon(<><circle cx="12" cy="15" r="5"/><path d="M9 10L7 3h4l1.5 4"/><path d="M15 10l2-7h-4l-1.5 4"/></>);
const IconQuarterfinal = svgIcon(<><path d="M4 4v6h6"/><path d="M20 4v6h-6"/><path d="M4 20v-6h6"/><path d="M20 20v-6h-6"/><circle cx="12" cy="12" r="2"/></>);
const IconNBA = svgIcon(<><circle cx="12" cy="12" r="8"/><path d="M12 4v16M4 12h16M6 6.5c2 2 10 2 12 0M6 17.5c2-2 10-2 12 0"/></>);
const IconEuroLeague = svgIcon(<><circle cx="12" cy="12" r="8"/><circle cx="12" cy="6" r="1" fill="currentColor" stroke="none"/><circle cx="16.9" cy="9.5" r="1" fill="currentColor" stroke="none"/><circle cx="15.1" cy="15" r="1" fill="currentColor" stroke="none"/><circle cx="8.9" cy="15" r="1" fill="currentColor" stroke="none"/><circle cx="7.1" cy="9.5" r="1" fill="currentColor" stroke="none"/></>);
const IconAsiaPro = svgIcon(<><circle cx="9" cy="9" r="5"/><path d="M9 4v10M4 9h10"/><path d="M15 15l6 6M21 15l-6 6"/></>);
const IconOverseasAward = svgIcon(<><circle cx="12" cy="8" r="5"/><path d="M12 5.3l1 2.2 2.3.3-1.7 1.6.4 2.3-2-1.1-2 1.1.4-2.3-1.7-1.6 2.3-.3z" fill="currentColor" stroke="none"/><path d="M8.5 12.5L7 21l5-3 5 3-1.5-8.5"/></>);
const IconFanFavorite = svgIcon(<><path d="M12 20s-7-4.4-7-9.5A4 4 0 0 1 12 8a4 4 0 0 1 7 2.5C19 15.6 12 20 12 20z"/><path d="M4 6c1 1 2 1.5 3 1.5M20 6c-1 1-2 1.5-3 1.5"/></>);
const IconFinanciallySet = svgIcon(<><ellipse cx="12" cy="6" rx="7" ry="2.5"/><path d="M5 6v6c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5V6"/><path d="M5 12v6c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5v-6"/></>);
const IconVeteran = svgIcon(<><path d="M12 3l8 3v6c0 5-3.5 7.8-8 9-4.5-1.2-8-4-8-9V6z"/><path d="M9 12l2 2 4-4"/></>);
const IconGradCap = svgIcon(<><path d="M2 9l10-4 10 4-10 4z"/><path d="M6 11v5c0 1.5 3 3 6 3s6-1.5 6-3v-5"/><path d="M20 9v6"/></>);
const IconDiploma = svgIcon(<><rect x="4" y="5" width="16" height="11" rx="1"/><path d="M7 8h10M7 11h6"/><path d="M9 16v4l3-1.5 3 1.5v-4"/></>);
const IconMamakWarrior = svgIcon(<><path d="M8 3v5a4 4 0 0 0 8 0V3"/><path d="M7 3h10"/><path d="M9 21h6l-1-13H10z"/><path d="M16 6h2a2 2 0 0 1 0 4h-1.5"/></>);
const IconMoneyball = svgIcon(<><path d="M4 20V10l5-3 5 3 6-3v10l-6 3-5-3z"/><path d="M9 7v10M14 10v10"/></>);
const IconGlassCannon = svgIcon(<><circle cx="12" cy="12" r="8"/><path d="M13 5l-4 8h3l-1 6 5-9h-3z" fill="currentColor" stroke="none"/></>);
const IconKampungLegend = svgIcon(<><path d="M4 12l8-7 8 7"/><path d="M6 11v9h12v-9"/><path d="M12 15l-1.5 2h3z" fill="currentColor" stroke="none"/></>);
const IconRebelsCrossover = svgIcon(<><circle cx="6" cy="18" r="2"/><circle cx="18" cy="6" r="2"/><path d="M8 17c4-1 8-6 9-10"/><path d="M14.5 6.5l2.5.5.5 2.5"/></>);
const IconStreetKing = svgIcon(<><path d="M4 18h16l-1.5-8-3.5 3-3-6-3 6-3.5-3z"/><path d="M4 20h16"/></>);
// Rival-tied achievements — two figures at different heights (you rose
// above), an open door swinging shut (a chance that closed on their side
// first), and a tipped scale (the head-to-head settled, permanently).
const IconRivalBeaten = svgIcon(<><circle cx="7" cy="14" r="3"/><circle cx="17" cy="16" r="3" opacity="0.4"/><path d="M7 8v3M5 9l2-2 2 2"/></>);
const IconRivalGotAway = svgIcon(<><rect x="6" y="3" width="9" height="18" rx="1"/><circle cx="12.5" cy="12" r="0.6" fill="currentColor" stroke="none"/><path d="M17 4l3 2v13l-3 2" opacity="0.5"/></>);
const IconSettledScore = svgIcon(<><path d="M12 3v15"/><path d="M5 7h14"/><path d="M5 7l-2.5 5.5a3 3 0 0 0 5 0z"/><path d="M19 7l2.5 5.5a3 3 0 0 1-5 0z" opacity="0.4"/><path d="M8 21h8"/></>);



/* ---------------------------------------------------------
   PALETTE / TOKENS
--------------------------------------------------------- */
const C = {
  ink: "#0A0A0A",
  ink2: "#141414",
  ink3: "#1B1B1B",
  line: "#262626",
  amber: "#F97316",
  amberBright: "#FB923C",
  red: "#DC2626",
  teal: "#A1A1AA",
  gold: "#F97316",
  trophyGold: "#FACC15",
  chalk: "#F8FAFC",
  chalkDim: "#71717A",
};

const FontStyle = memo(() => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
    .f-display{ font-family:'Inter', sans-serif; font-weight:800; letter-spacing:-0.01em; }
    .f-body{ font-family:'Inter', sans-serif; font-weight:400; }
    .f-mono{ font-family:'Inter', sans-serif; font-weight:600; font-variant-numeric: tabular-nums; letter-spacing:0; }
    .court-hero{
      background-image:
        linear-gradient(180deg, #0A0A0A 0%, #0A0A0A 100%);
    }
    .scoreboard{
      font-family:'Inter', sans-serif;
      font-weight:800;
      font-variant-numeric: tabular-nums;
      background: #0A0A0A;
      border: 1px solid #262626;
    }
    .hairline-rule{
      height:1px;
      background: #262626;
    }
    ::-webkit-scrollbar{ width:8px; height:8px; }
    ::-webkit-scrollbar-thumb{ background:#262626; border-radius:8px; }

    /* Tactile feedback shared by every choice-grid button across the game
       (events, injury recovery, off-season plan, identity/rival pickers) —
       filter/transform rather than border-color, since these buttons set
       their border via inline style, which always wins over a Tailwind
       hover: class on specificity. This way one rule reaches everywhere. */
    .choice-card{ transition: transform 0.12s ease, filter 0.12s ease; }
    .choice-card:hover{ filter: brightness(1.12); }
    .choice-card:active{ transform: scale(0.97); }

    /* Same tactile language for Primary/Secondary buttons. */
    .btn-tactile{ transition: transform 0.12s ease, filter 0.12s ease; }
    .btn-tactile:hover:not(:disabled){ filter: brightness(1.08); }
    .btn-tactile:active:not(:disabled){ transform: scale(0.97); }

    /* A visible, on-brand focus ring for text inputs. Every input in the
       game sets outline:none via inline style with nothing to replace it,
       which drops focus indication entirely — this restores it globally
       without editing each input. */
    input:focus, textarea:focus{
      outline: none;
      box-shadow: 0 0 0 2px rgba(249,115,22,0.45);
    }
  `}</style>
));

/* ---------------------------------------------------------
   GAME DATA
--------------------------------------------------------- */
const POSITIONS = [
  { id: "PG", name: "Point Guard", tag: "Floor general", desc: "Playmaking and vision run the offense through you.",
    weights: { shooting:.15, playmaking:.30, defense:.15, rebounding:.05, athleticism:.15, iq:.20 } },
  { id: "SG", name: "Shooting Guard", tag: "Bucket-getter", desc: "Scoring off the catch and off the dribble.",
    weights: { shooting:.30, playmaking:.15, defense:.15, rebounding:.05, athleticism:.20, iq:.15 } },
  { id: "SF", name: "Small Forward", tag: "Two-way wing", desc: "A bit of everything — scores, defends, glues it together.",
    weights: { shooting:.20, playmaking:.15, defense:.20, rebounding:.15, athleticism:.20, iq:.10 } },
  { id: "PF", name: "Power Forward", tag: "Interior force", desc: "Physical scoring and rebounding around the paint.",
    weights: { shooting:.10, playmaking:.10, defense:.20, rebounding:.30, athleticism:.20, iq:.10 } },
  { id: "C", name: "Center", tag: "Paint anchor", desc: "Rim protection and boards — the last line of defense.",
    weights: { shooting:.05, playmaking:.05, defense:.30, rebounding:.35, athleticism:.15, iq:.10 } },
];

/* ============================================================
   PLAYING STYLE — chosen once at creation, permanent.
   Deliberately does NOT touch computeOverall(), attribute costs, or any
   value generateLeagueSeasonStats() already returns (ppg/rpg/apg/spg/bpg/
   fgPct/threePct/tr). Those numbers are read in 60+ places across awards,
   standings strength, HBL/shortlist eligibility, and championship odds —
   changing any of them by identity would mean some identity is simply
   "better" for a given overall, which is exactly the balance risk to
   avoid. Style only drives NEW, purely-additive display stats (shot
   composition — see styleShotProfile()) and narrative flavor text. Two
   players can share the exact same six attributes, same overall, same
   tr, same award odds, and still read as different players.
============================================================ */
const PLAYING_STYLES = [
  { id: "slasher", label: "Slasher", icon: "⚡", tagline: "Lives at the rim", bestFit: ["SG", "SF", "PG"] },
  { id: "3d", label: "3&D", icon: "🎯", tagline: "Space and stop", bestFit: ["SG", "SF", "PF"] },
  { id: "playmaker", label: "Playmaker", icon: "🧠", tagline: "Pass-first floor general", bestFit: ["PG", "SG"] },
  { id: "sharpshooter", label: "Sharpshooter", icon: "🏹", tagline: "Catch, gather, fire", bestFit: ["SG", "PG", "SF"] },
  { id: "anchor", label: "Post Anchor", icon: "🛡️", tagline: "Paint on lockdown", bestFit: ["C", "PF"] },
  { id: "twoway", label: "Two-Way Wing", icon: "⚙️", tagline: "A bit of everything", bestFit: ["SF", "SG", "PF"] },
];
function getPlayingStyle(id) { return PLAYING_STYLES.find(s => s.id === id) || null; }

// Shot-composition bias per style: how a given ppg/threePct DISPLAYS as
// attempt volume, not how much of it there is. Purely cosmetic — see the
// block comment above.
const STYLE_SHOT_BIAS = {
  slasher:      { three: 0.55, ft: 1.55 },
  "3d":         { three: 1.55, ft: 0.70 },
  playmaker:    { three: 0.90, ft: 1.00 },
  sharpshooter: { three: 1.80, ft: 0.60 },
  anchor:       { three: 0.30, ft: 1.15 },
  twoway:       { three: 1.00, ft: 1.00 },
};
/* Derives display-only shot-attempt volumes from the ALREADY-COMPUTED
   ppg/threePct — called after generateLeagueSeasonStats, never inside it,
   and its output is never read back into tr, awards, or eligibility
   anywhere. Falls back to a neutral (twoway) split for legacy saves with
   no playingStyle set, so old careers still get sensible numbers. */
function styleShotProfile(leagueStats, styleId) {
  const bias = STYLE_SHOT_BIAS[styleId] || STYLE_SHOT_BIAS.twoway;
  const tpa = clamp(round1((leagueStats.threePct / 8) * bias.three), 0.2, 12);
  const fta = clamp(round1((leagueStats.ppg / 6) * bias.ft), 0.2, 11);
  return { tpa, fta };
}
// One-line flavor text for the box score — pure narration, no numeric effect.
function styleFlavorNote(styleId, profile) {
  switch (styleId) {
    case "slasher": return `A season built on getting downhill — ${profile.fta} free-throw attempts a night.`;
    case "3d": return `Floor-spacer and pest on the other end — ${profile.tpa} three-point attempts a night.`;
    case "playmaker": return "Ran the offense first, looked for his own shot second.";
    case "sharpshooter": return `Lived beyond the arc — ${profile.tpa} three-point attempts a night.`;
    case "anchor": return "Anchored the paint on both ends, letting the offense find him.";
    case "twoway": return "No single number stands out — the stat sheet that quietly wins games.";
    default: return null;
  }
}

const HOMETOWNS = [
  "Johor", "Kedah", "Kelantan", "Kuala Lumpur",
  "Labuan", "Melaka", "Negeri Sembilan", "Pahang", "Pulau Pinang",
  "Perak", "Perlis", "Putrajaya", "Sabah", "Sarawak",
  "Selangor", "Terengganu",
];

/* Development resources vary by state — some programmes simply have deeper
   pockets and better facilities than others. This shapes the odds of a
   season's training paying off, not a guarantee. */
const STATE_TIER = {
  "Selangor": 1, "Johor": 1,
  "Negeri Sembilan": 2, "Sabah": 2, "Kuala Lumpur": 2, "Kedah": 2, "Perak": 2, "Pulau Pinang": 2,
};
function getStateTier(hometown) { return STATE_TIER[hometown] || 3; }
const TIER_META = {
  1: { name: "Tier 1", tag: "Elite Programme", bonusChance: 0.40, color: "#E8C766" },
  2: { name: "Tier 2", tag: "Strong Programme", bonusChance: 0.25, color: "#3FA98A" },
  3: { name: "Tier 3", tag: "Grassroots Programme", bonusChance: 0.07, color: "#8B8B93" },
};

const STAT_LIST = ["shooting", "playmaking", "defense", "rebounding", "athleticism", "iq"];
const STAT_META = {
  shooting: { label: "Shooting", icon: Target },
  playmaking: { label: "Playmaking", icon: Zap },
  defense: { label: "Defense", icon: Shield },
  rebounding: { label: "Rebounding", icon: Activity },
  athleticism: { label: "Athleticism", icon: Gauge },
  iq: { label: "Basketball IQ", icon: Brain },
};

/* ============================================================
   MALAYSIAN CLUB SYSTEM (players join from age 18)
   Each club has an identity that shapes salary, fame, playing
   time, development, and specific perks/risks.
============================================================ */
const PRO_CLUBS = [
  {
    id: "ns_matrix", name: "NS Matrix Deers", state: "Negeri Sembilan", tier: "pro",
    salaryMult: 1.6, fameMult: 1.4, devMult: 1.15,
    startingFiveDifficulty: 0.75, // hard to crack the starting five
    prestige: 100,
    blurb: "Malaysia's dominant force — the most trophies, the biggest spotlight, and the deepest pockets. Elite pay, but you must fight through a loaded roster for starter minutes.",
    perks: ["Highest salary & benefits", "Most championships", "Biggest spotlight"],
    risks: ["Must fight for the starting five"],
  },
  {
    id: "johor_tigers", name: "Johor Southern Tigers", state: "Johor", tier: "pro",
    salaryMult: 1.35, fameMult: 1.2, devMult: 1.05,
    startingFiveDifficulty: 0.5,
    prestige: 85, shootingClub: true,
    blurb: "The clear number two — strong pay and a run-and-gun system built for shooters, especially from deep. Not as rich as the Deers, but a genuine contender.",
    perks: ["Good salary", "Run-and-gun suits shooters", "3PT-friendly system"],
    risks: ["Second fiddle to the Deers financially"],
  },
  {
    id: "kl_titans", name: "KL Titans", state: "Kuala Lumpur", tier: "pro",
    salaryMult: 1.1, fameMult: 1.0, devMult: 1.35,
    startingFiveDifficulty: 0.4,
    prestige: 60, strictCoach: true,
    blurb: "A brand-new franchise led by the best coach in the country — a strict, disciplined living legend renowned for developing players. The future is unwritten.",
    perks: ["Best coach in Malaysia", "Elite player development"],
    risks: ["Strict, demanding culture", "Unproven as a team"],
  },
  {
    id: "penang_sunrise", name: "Penang Sunrise Youngster", state: "Pulau Pinang", tier: "pro",
    salaryMult: 0.85, fameMult: 0.95, devMult: 1.0,
    startingFiveDifficulty: 0.4,
    prestige: 55, prefersLocal: "Pulau Pinang", shootingClub: true, bankruptcyChance: 0.04,
    blurb: "A club with over 100 years of history and a run-and-gun identity. Favours Penang-born players. Not wealthy — and, rarely, money troubles can bite.",
    perks: ["Historic club", "Run-and-gun system", "Loves Penang locals"],
    risks: ["Modest finances", "Small bankruptcy risk (<5%)"],
  },
  {
    id: "kl_aseel", name: "KL Aseel", state: "Kuala Lumpur", tier: "pro",
    salaryMult: 1.0, fameMult: 1.8, devMult: 0.85,
    startingFiveDifficulty: 0.45,
    prestige: 50, marketingClub: true, bankruptcyChance: 0.04,
    blurb: "The social-media darlings — packed with influencer players and marketing muscle. Joining means endorsements and fame, but the coaching and structure run loose.",
    perks: ["Huge fame & endorsements", "Influencer culture"],
    risks: ["Loose coaching & strategy", "Small bankruptcy risk (<5%)"],
  },
  {
    id: "sarawak_cola", name: "Sarawak Cola Warriors", state: "Sarawak", tier: "pro",
    salaryMult: 0.95, fameMult: 1.1, devMult: 0.9,
    startingFiveDifficulty: 0.3,
    prestige: 52, eastMalaysia: true, firstOptionChance: 0.55,
    blurb: "The lone East Malaysian side, with a massive, passionate fanbase but leaner training resources. Few West-side players make the move — so those who do often become the first offensive option.",
    perks: ["Huge fanbase", "Likely to be the first offensive option"],
    risks: ["Leaner training resources", "Far from the West-side scene"],
  },
];

const SEMI_PRO_CLUBS = [
  { id: "sp_mbc_kirin", name: "MBC Kirin", state: "Selangor" },
  { id: "sp_gostrong", name: "Gostrong", state: "Kuala Lumpur" },
  { id: "sp_sba", name: "Selangor Basketball Association", state: "Selangor" },
  { id: "sp_96bc", name: "96 Basketball Club", state: "Kuala Lumpur" },
  { id: "sp_shinsei16", name: "Shinsei 16", state: "Selangor" },
  { id: "sp_speedhunters", name: "Speed Hunters", state: "Kuala Lumpur" },
  { id: "sp_borneo", name: "Borneo Sharks", state: "Sabah" },
  { id: "sp_farmcochem", name: "Farmcochem", state: "Perak" },
  { id: "sp_parkcity", name: "Parkcity Heat", state: "Kuala Lumpur" },
  { id: "sp_keeming", name: "Keeming Basketball Club", state: "Selangor" },
  { id: "sp_rising", name: "Rising Stars", state: "Selangor" },
].map(c => ({
  ...c, tier: "semipro",
  salaryMult: 1, fameMult: 0.8, devMult: 0.9,
  startingFiveDifficulty: 0.25, prestige: 30,
  blurb: `A semi-pro side competing in the development leagues. Lower pay than a pro club, but real minutes and a place to prove yourself.`,
  perks: ["Steady minutes", "A place to develop"],
  risks: ["Semi-pro pay", "No direct MBL team"],
}));

function getClub(id) {
  return PRO_CLUBS.find(c => c.id === id) || SEMI_PRO_CLUBS.find(c => c.id === id) || null;
}
/* U20/U23 D-League composition: pro clubs field a B-team here (the player
   can already be assigned to one — see generateClubOffers/computeClubTerms)
   alongside all semi-pro sides, matching the design comment on LEAGUE
   above. Three sites previously built D-league team identity from
   SEMI_PRO_CLUBS alone: NPC club-name generation (x2) and the standings
   table itself — meaning a player actually signed to a pro club's B-team
   could open their own league standings and not find their own team in
   it. Shared here so all three stay consistent. MBL keeps using PRO_CLUBS
   only elsewhere, unaffected — only the six first teams play in it. */
const DLEAGUE_CLUBS = [...PRO_CLUBS, ...SEMI_PRO_CLUBS];
function isSemiProClub(club) { return !!club && club.tier === "semipro"; }

/* ============================================================
   LEAGUE SYSTEM
   The Major Basketball League (MBL) is the ONLY pro league —
   only the six pro clubs' first teams play in it, and each is
   allowed 3 import players, so local rotation spots are scarce.
   New pros develop in the U20 & U23 D-Leagues (pro B-teams +
   all semi-pro sides) until their rating earns an MBL spot.
============================================================ */
const LEAGUE = {
  mbl: { id: "mbl", name: "Major Basketball League", short: "MBL" },
  u23: { id: "u23", name: "U23 D-League", short: "U23 D-League" },
  u20: { id: "u20", name: "U20 D-League", short: "U20 D-League" },
};
// Rating (overall*0.7 + popularity*0.3) needed to genuinely hold an MBL rotation spot.
const MBL_RATING_THRESHOLD = 65;
// U23 D-League is only playable up to and including age 23; from 24 the player
// must be in the MBL (as bench if their rating isn't there yet).
const U23_MAX_AGE = 23;
// At 18: chance to immediately contribute to the MBL first team.
const PRO_STRAIGHT_CONTRIBUTE_CHANCE = 0.20; // can contribute right away
const PRO_WONDERKID_CHANCE = 0.15;           // wonderkids: locked rotation spot at 18

/* ============================================================
   OVERSEAS CAREER — three tiers of world-class leagues, gated by
   rating. Once a player's rating clears a tier's floor, there's a
   per-season chance of offers from the HIGHEST tier they currently
   qualify for. If their rating later drops below their current
   tier's floor, they're released and re-evaluated against the tier
   ladder from the top down — landing in whichever tier they still
   clear, or back to a hometown MBL club if they clear none at all.
   A player can also be scouted UP a tier mid-career if their overall
   later clears a higher tier's floor while already abroad.

   Thresholds (Asia 74 / EuroLeague 78 / NBA 81) and the offer chance
   (88%, unchanged) are calibrated against the underlying growth curve
   — see growthAmount()/matGrowth()'s "breakout"/"star emergence"
   mechanics — to land close to the target career odds: ~1-in-4 ever
   get an Asia Pro offer, ~1-in-7 EuroLeague, ~1-in-10 NBA. Simulated
   result: Asia ~30-32%, EuroLeague ~15%, NBA ~8.5-9%.
============================================================ */
const OVERSEAS_OFFER_CHANCE = 0.88; // per season, once eligible for any tier

const OVERSEAS_TIERS = [
  {
    id: "nba", label: "NBA", threshold: 85,
    teams: [
      { name: "Dallas Mavericks", league: "NBA", salaryPerSeason: 14000000 },
      { name: "Atlanta Hawks", league: "NBA", salaryPerSeason: 14000000 },
      { name: "Boston Celtics", league: "NBA", salaryPerSeason: 14000000 },
      { name: "Los Angeles Lakers", league: "NBA", salaryPerSeason: 20000000 },
      { name: "Detroit Pistons", league: "NBA", salaryPerSeason: 14000000 },
      { name: "San Antonio Spurs", league: "NBA", salaryPerSeason: 14000000 },
    ],
    roleBands: [
      { min: 81, max: 83, role: "Rotation", awardChance: 0 },
      { min: 84, max: 87, role: "Starter", awardChance: 0.15 },
      { min: 88, max: 999, role: "First Option", awardChance: 0.40 },
    ],
    achId: "nba_player",
  },
  {
    id: "europe", label: "EuroLeague", threshold: 80,
    teams: [
      { name: "Real Madrid", league: "Europe League", salaryPerSeason: 8000000 },
      { name: "Barcelona Club", league: "Europe League", salaryPerSeason: 8000000 },
      { name: "Moscow Centre", league: "Europe League", salaryPerSeason: 8000000 },
      { name: "Olympiacos", league: "Europe League", salaryPerSeason: 8000000 },
      { name: "Fenerbahce", league: "Europe League", salaryPerSeason: 8000000 },
      { name: "Istanbul Club", league: "Europe League", salaryPerSeason: 8000000 },
    ],
    roleBands: [
      { min: 78, max: 81, role: "Rotation", awardChance: 0 },
      { min: 82, max: 83, role: "Starter", awardChance: 0.15 },
      { min: 84, max: 999, role: "First Option", awardChance: 0.45 },
    ],
    achId: "euroleague_player",
  },
  {
    id: "asia", label: "Asia Pro", threshold: 75,
    teams: [
      { name: "Shanghai Sharks", league: "CBA", country: "China", salaryPerSeason: 5000000 },
      { name: "Beijing Ducks", league: "CBA", country: "China", salaryPerSeason: 5000000 },
      { name: "Guangdong Tigers", league: "CBA", country: "China", salaryPerSeason: 5000000 },
      { name: "Liaoning Leopards", league: "CBA", country: "China", salaryPerSeason: 5000000 },
      { name: "New Taipei Kings", league: "TPBL", country: "Taiwan", salaryPerSeason: 3500000 },
      { name: "Formosa Dreamers", league: "TPBL", country: "Taiwan", salaryPerSeason: 3500000 },
      { name: "Hsinchu Lioneers", league: "TPBL", country: "Taiwan", salaryPerSeason: 3500000 },
      { name: "Fubon Braves", league: "TPBL", country: "Taiwan", salaryPerSeason: 3500000 },
      { name: "Levanga Hokkaido", league: "B.League Premier", country: "Japan", salaryPerSeason: 3500000 },
      { name: "Sendai 89ers", league: "B.League Premier", country: "Japan", salaryPerSeason: 3500000 },
      { name: "Chiba Jets", league: "B.League Premier", country: "Japan", salaryPerSeason: 3500000 },
      { name: "Alvark Tokyo", league: "B.League Premier", country: "Japan", salaryPerSeason: 3500000 },
    ],
    roleBands: [
      { min: 74, max: 77, role: "Rotation", awardChance: 0 },
      { min: 78, max: 80, role: "Starter", awardChance: 0.15 },
      { min: 81, max: 999, role: "First Option", awardChance: 0.45 },
    ],
    achId: "asia_pro_player",
  },
];

const OVERSEAS_ROLE_MULT = { "First Option": 1.05, "Starter": 0.75, "Rotation": 0.45 };

const OVERSEAS_AWARDS_BY_POSITION = {
  PG: ["Assists Leader", "All-Star", "Clutch Player of the Year"],
  SG: ["Scoring Champion", "All-Star", "Sixth Man of the Year"],
  SF: ["All-Star", "Most Improved Player", "All-Defensive Team"],
  PF: ["All-Star", "Rebounding Leader", "All-Defensive Team"],
  C: ["Defensive Player of the Year", "Rebounding Leader", "Blocks Leader", "All-Star"],
};

function overseasRoleBand(tier, rating) {
  return tier.roleBands.find(b => rating >= b.min && rating <= b.max) || tier.roleBands[tier.roleBands.length - 1];
}
function highestOverseasTier(rating) {
  return OVERSEAS_TIERS.find(t => rating >= t.threshold) || null;
}

/* Overseas stat line — these are literally the best leagues on Earth, so the
   role multiplier (Rotation/Starter/First Option, mirroring the senior
   national team's role system) does the heavy lifting: a First Option's
   already-elite attributes (88+/82+/75+ rating to even be here) translate
   into star-level counting stats, while a Rotation player stays modest
   despite being individually talented, reflecting limited NBA/EuroLeague/
   Asia-pro minutes on a stacked roster. */
function generateOverseasStats(stats, position, height, role, tierId) {
  const roleM = OVERSEAS_ROLE_MULT[role] || 0.45;
  // Competition scaling is now tier-specific: NBA is the hardest anchor,
  // EuroLeague next, Asia Pro easiest — so the SAME player's rating produces
  // very different output depending which tier they're actually playing in.
  // A dominant player who drops down a tier (or several) blows past normal
  // caps; a player who's barely qualifying for a tougher tier looks like a
  // struggling fringe rotation piece there, not a star.
  const overallScale = computeOverall(stats, position);
  const compMult = competitionMult(overallScale, LEAGUE_TIER_ANCHOR[tierId] ?? 76);
  const m = roleM * compMult;
  const nudge = positionStatNudges(position);
  const apgPosBonus = (position === "PG" ? 1.8 : position === "SG" ? 0.5 : 0) + nudge.apg;
  const rpgPosBonus = (position === "C" ? 3.2 : position === "PF" ? 1.6 : 0) + nudge.rpg;
  const pctMult = 0.75 + compMult * 0.25;
  const ppg = clamp(round1((2 + nudge.ppg + stats.shooting * 0.19 + stats.athleticism * 0.03 + stats.playmaking * 0.02) * m * randFloat(0.85, 1.2)), 0.5, 38);
  const rpg = clamp(round1((1 + rpgPosBonus + stats.rebounding * 0.11 + stats.athleticism * 0.02) * m * randFloat(0.85, 1.15)), 0.3, 17);
  const apg = clamp(round1((0.4 + apgPosBonus + stats.playmaking * 0.045) * m * randFloat(0.85, 1.15)), 0.2, 9);
  const spg = clamp(round1((-0.9 + stats.defense * 0.042 + stats.athleticism * 0.005) * m * randFloat(0.85, 1.15)), 0.2, 3.1);
  // round1 AFTER the nudge — computeBlocks already rounds, so adding the
  // nudge afterwards reintroduced float error (1.9 + 0.3 = 2.1999999999999997,
  // which rendered raw and overflowed its box).
  const bpg = round1(computeBlocks(stats, position, height, m) + (Math.random() < 0.6 ? nudge.bpg : 0));
  const fgPct = computeFgPct(stats, position, 20, 0.3, 0.06, 0.92, 1.08, 15, 65, pctMult);
  const threePct = clamp(round1((12 + nudge.threePct + Math.max(0, stats.shooting - 25) * 0.4 + Math.max(0, stats.iq - 30) * 0.12) * pctMult * randFloat(0.85, 1.15)), 0, 52);
  return { ppg, rpg, apg, spg, bpg, fgPct, threePct, role };
}

const ACHIEVEMENT_META = {
  national_debut: { label: "Malaysia International", icon: IconNationalTeam },
  overseas_pro: { label: "Went Pro Overseas", icon: Plane },
  nba_player: { label: "NBA Player", icon: IconNBA },
  euroleague_player: { label: "EuroLeague Player", icon: IconEuroLeague },
  asia_pro_player: { label: "Asia Pro Player", icon: IconAsiaPro },
  overseas_award_winner: { label: "Overseas Award Winner", icon: IconOverseasAward },
  fan_favorite: { label: "Fan Favorite", icon: IconFanFavorite },
  financially_set: { label: "Financially Set", icon: IconFinanciallySet },
  elite_talent: { label: "Elite Talent", icon: Gem },
  veteran: { label: "Long-Career Veteran", icon: IconVeteran },
  u15_rep: { label: "U15 State Rep", icon: IconStateRep },
  u15_champion: { label: "U15 National Champion", icon: IconChampion },
  u15_runner_up: { label: "U15 First Runner-Up", icon: IconRunnerUp },
  u15_third: { label: "U15 Second Runner-Up", icon: IconThirdPlace },
  u15_top_scorer: { label: "U15 Top Scorer", icon: IconTopScorer },
  u15_top_rebounder: { label: "U15 Top Rebounder", icon: IconTopRebounder },
  u15_top_assists: { label: "U15 Top Assists", icon: IconTopAssist },
  u15_top_steals: { label: "U15 Top Steals", icon: IconTopSteal },
  u15_top_blocks: { label: "U15 Top Blocks", icon: IconTopBlock },
  u15_pot: { label: "U15 Player of the Tournament", icon: IconPlayerOfTournament },
  u15_final_mvp: { label: "U15 Final MVP", icon: IconFinalMVP },
  national_shortlist: { label: "National Youth Shortlist", icon: IconShortlist },
  bukit_jalil_alumnus: { label: "Bukit Jalil Alumnus", icon: IconGradCap },
  u16_national: { label: "U16 National Team", icon: IconNationalTeam },
  u16_asia_cup: { label: "FIBA U16 Asia Cup", icon: IconAsiaCup },
  u16_tot: { label: "U16 Team of the Tournament", icon: IconTeamOfTournament },
  u17_jumpclass: { label: "U17 Jumpclass Player", icon: IconStandout },
  u17_champion: { label: "U17 National Champion", icon: IconChampion },
  a17_rep: { label: "U17 State Rep", icon: IconStateRep },
  a17_champion: { label: "U17 National Champion", icon: IconChampion },
  a17_runner_up: { label: "U17 First Runner-Up", icon: IconRunnerUp },
  a17_third: { label: "U17 Second Runner-Up", icon: IconThirdPlace },
  a17_top_scorer: { label: "U17 Top Scorer", icon: IconTopScorer },
  a17_top_rebounder: { label: "U17 Top Rebounder", icon: IconTopRebounder },
  a17_top_assists: { label: "U17 Top Assists", icon: IconTopAssist },
  a17_top_steals: { label: "U17 Top Steals", icon: IconTopSteal },
  a17_top_blocks: { label: "U17 Top Blocks", icon: IconTopBlock },
  a17_pot: { label: "U17 Player of the Tournament", icon: IconPlayerOfTournament },
  a17_final_mvp: { label: "U17 Final MVP", icon: IconFinalMVP },
  a17_shortlist: { label: "U18 National Shortlist", icon: IconShortlist },
  hbl_import: { label: "Taiwan HBL Import", icon: Plane },
  hbl_champion: { label: "HBL Champion", icon: IconChampion },
  hbl_top_scorer: { label: "HBL Top Scorer", icon: IconTopScorer },
  hbl_top_rebounder: { label: "HBL Top Rebounder", icon: IconTopRebounder },
  hbl_top_assists: { label: "HBL Top Assists", icon: IconTopAssist },
  hbl_top_steals: { label: "HBL Top Steals", icon: IconTopSteal },
  hbl_top_blocks: { label: "HBL Top Blocks", icon: IconTopBlock },
  hbl_mvp: { label: "HBL Most Valuable Player", icon: IconMVPCrown },
  uba_scholar: { label: "Taiwan UBA Scholar", icon: IconGradCap },
  uba_champion: { label: "UBA Champion", icon: IconChampion },
  uba_graduate: { label: "UBA Graduate", icon: IconDiploma },
  uba_mvp: { label: "UBA Most Valuable Player", icon: IconMVPCrown },
  u18_national: { label: "U18 National Team", icon: IconNationalTeam },
  u18_asia_cup: { label: "FIBA U18 Asia Cup", icon: IconAsiaCup },
  u18_tot: { label: "U18 Team of the Tournament", icon: IconTeamOfTournament },
  turned_pro: { label: "Turned Pro", icon: IconTurnedPro },
  club_loyal: { label: "One-Club Loyalty", icon: IconClubLoyal },
  journeyman: { label: "Well-Travelled", icon: IconJourneyman },
  rival_beaten: { label: "Rival Beaten", icon: IconRivalBeaten },
  the_one_that_got_away: { label: "The One That Got Away", icon: IconRivalGotAway },
  settled_score: { label: "Settled Score", icon: IconSettledScore },
  mbl_debut: { label: "MBL Debut", icon: IconDebut },
  mbl_starter: { label: "MBL Starter", icon: IconStarter },
  wonderkid: { label: "Wonderkid", icon: IconWonderkid },
  dleague_star: { label: "D-League Standout", icon: IconStandout },
  mbl_mvp: { label: "MBL MVP", icon: IconMVPCrown },
  dleague_mvp: { label: "D-League MVP", icon: IconMVPCrown },
  mbl_roty: { label: "MBL Rookie of the Year", icon: IconRookie },
  mbl_sixth_man: { label: "MBL Sixth Man of the Year", icon: IconSixthMan },
  nt_qualifier: { label: "Asia Cup Qualifiers", icon: IconQuarterfinal },
  nt_asia_cup: { label: "FIBA Asia Cup", icon: IconAsiaCup },
  nt_quarterfinal: { label: "Asia Cup Quarter-Finalist", icon: IconQuarterfinal },
  sea_games: { label: "SEA Games", icon: IconNationalTeam },
  sea_games_bronze: { label: "SEA Games Bronze", icon: IconMedal },
  sea_games_silver: { label: "SEA Games Silver", icon: IconMedal },
  sea_games_gold: { label: "SEA Games Gold", icon: IconMedal },
  sea_games_multi: { label: "Multiple SEA Games Medals", icon: IconMedal },
  sea_games_setl: { label: "SEA Games Full Set", icon: IconMedal, hidden: true },
  mbl_champion: { label: "MBL Champion", icon: IconChampion },
  dleague_champion: { label: "D-League Champion", icon: IconChampion },
  mssm_rep: { label: "MSSM State Rep", icon: IconStateRep },
  mssm_champion: { label: "MSSM Champion", icon: IconChampion },
  mssm_top_scorer: { label: "MSSM Top Scorer", icon: IconTopScorer },
  mssm_top_rebounder: { label: "MSSM Top Rebounder", icon: IconTopRebounder },
  mssm_top_assists: { label: "MSSM Top Assists", icon: IconTopAssist },
  mssm_top_steals: { label: "MSSM Top Steals", icon: IconTopSteal },
  mssm_top_blocks: { label: "MSSM Top Blocks", icon: IconTopBlock },
  mssm_pot: { label: "MSSM Player of the Tournament", icon: IconPlayerOfTournament },
  mssm_final_mvp: { label: "MSSM Final MVP", icon: IconFinalMVP },
  student_athlete: { label: "Student-Athlete", icon: IconGradCap },
  college_graduate: { label: "College Graduate", icon: IconDiploma },
  // --- Hidden achievements: not hinted at anywhere in the UI, only unlocked
  // by hitting the Success tier of a specific high-risk event choice. ---
  mamak_warrior: { label: "The Mamak Warrior", icon: IconMamakWarrior, hidden: true },
  moneyball_mastermind: { label: "Moneyball Mastermind", icon: IconMoneyball, hidden: true },
  glass_cannon: { label: "Glass Cannon", icon: IconGlassCannon, hidden: true },
  kampung_legend: { label: "Kampung Legend", icon: IconKampungLegend, hidden: true },
  rebels_crossover: { label: "The Rebel's Crossover", icon: IconRebelsCrossover, hidden: true },
  street_king: { label: "Street King", icon: IconStreetKing, hidden: true },
};

/* Counterintuitively, the deep talent pools in Tier 1 states make the U15
   squad HARDER to crack, while thinner Tier 3 pools mean more of the kids
   who show up get picked. */
const U15_SELECTION_CHANCE = { 1: 0.70, 2: 0.85, 3: 0.95 };

/* Team result probabilities, from the perspective of one selected player
   (16 states/territories field a squad; only one can win it all). Deeper
   Tier 1 talent pools mean those squads are genuinely more likely to make
   deep runs — Tier 3 squads can still shock everyone, just less often. */
const U15_TEAM_RESULT_OPTIONS_BY_TIER = {
  1: [
    { id: "champion", weight: 15 },
    { id: "runner_up", weight: 13 },
    { id: "third", weight: 12 },
    { id: "quarterfinalist", weight: 60 },
  ],
  2: [
    { id: "champion", weight: 8 },
    { id: "runner_up", weight: 8 },
    { id: "third", weight: 12 },
    { id: "quarterfinalist", weight: 72 },
  ],
  3: [
    { id: "champion", weight: 3 },
    { id: "runner_up", weight: 3 },
    { id: "third", weight: 10 },
    { id: "quarterfinalist", weight: 84 },
  ],
};
const U15_TEAM_RESULT_META = {
  champion: { label: "Champions", achId: "u15_champion", popularity: 15 },
  runner_up: { label: "First Runner-Up", achId: "u15_runner_up", popularity: 8 },
  third: { label: "Second Runner-Up", achId: "u15_third", popularity: 5 },
  quarterfinalist: { label: "Quarter-Finalist", achId: null, popularity: 0 },
};

/* Individual award odds scale with how strong the generated stat line is,
   benchmarked against real MABA U15 National Championship leaderboards
   (PPG ~19 top / RPG ~13 top / APG ~5.1 top / SPG ~6.5 top / BPG ~4.2 top).
   Even a leader-caliber season only wins the award ~30% of the time —
   plenty of players post great numbers and still get edged out. */
const U15_AWARD_META = {
  top_scorer: { label: "Top Scorer", achId: "u15_top_scorer", popularity: 6 },
  top_rebounder: { label: "Top Rebounder", achId: "u15_top_rebounder", popularity: 6 },
  top_assists: { label: "Top Assists", achId: "u15_top_assists", popularity: 6 },
  top_steals: { label: "Top Steals", achId: "u15_top_steals", popularity: 6 },
  top_blocks: { label: "Top Blocks", achId: "u15_top_blocks", popularity: 6 },
  pot: { label: "Player of the Tournament", achId: "u15_pot", popularity: 14 },
  final_mvp: { label: "Final MVP", achId: "u15_final_mvp", popularity: 16 },
};

/* National Youth Shortlist: ~50 players nationwide get invited to train at
   Bukit Jalil Sports School. Base rate reflects roughly 50 picks out of a
   couple hundred tournament participants; tournament performance (rating,
   awards, team result) shifts the odds sharply from there. */
const U15_SHORTLIST_BASE = 0.06;
const U15_SHORTLIST_TR_WEIGHT = 0.55;
const U15_SHORTLIST_AWARD_BONUS = {
  top_scorer: 0.04, top_rebounder: 0.04, top_assists: 0.04, top_steals: 0.04, top_blocks: 0.04,
  pot: 0.15, final_mvp: 0.18,
};
const U15_SHORTLIST_TEAM_BONUS = { champion: 0.10, runner_up: 0.07, third: 0.04, quarterfinalist: 0 };

function computeShortlistChance(u15Stats, awardIds, teamResultId, highlyTalented) {
  let c = U15_SHORTLIST_BASE + (u15Stats.tr / 100) * U15_SHORTLIST_TR_WEIGHT;
  awardIds.forEach(id => { c += U15_SHORTLIST_AWARD_BONUS[id] || 0; });
  c += U15_SHORTLIST_TEAM_BONUS[teamResultId] || 0;
  // Prodigies get noticed — scouts are watching for exactly this kind of talent.
  if (highlyTalented) c += 0.30;
  return clamp(c, 0.03, 0.90);
}

/* ============================================================
   AGE 17 — NATIONAL U17 CHAMPIONSHIP (own-age)
   Mirrors the U15 structure: selection odds by tier, tournament
   stat line, team result, awards, and a national shortlist that
   can lead to a second Bukit Jalil bootcamp.
============================================================ */
const A17_SELECTION_CHANCE = { 1: 0.70, 2: 0.85, 3: 0.95 };
const A17_TEAM_RESULT_OPTIONS_BY_TIER = {
  1: [
    { id: "champion", weight: 15 },
    { id: "runner_up", weight: 13 },
    { id: "third", weight: 12 },
    { id: "quarterfinalist", weight: 60 },
  ],
  2: [
    { id: "champion", weight: 8 },
    { id: "runner_up", weight: 8 },
    { id: "third", weight: 12 },
    { id: "quarterfinalist", weight: 72 },
  ],
  3: [
    { id: "champion", weight: 3 },
    { id: "runner_up", weight: 3 },
    { id: "third", weight: 10 },
    { id: "quarterfinalist", weight: 84 },
  ],
};
const A17_TEAM_RESULT_META = {
  champion: { label: "Champions", achId: "a17_champion", popularity: 15 },
  runner_up: { label: "First Runner-Up", achId: "a17_runner_up", popularity: 8 },
  third: { label: "Second Runner-Up", achId: "a17_third", popularity: 5 },
  quarterfinalist: { label: "Quarter-Finalist", achId: null, popularity: 0 },
};
const A17_AWARD_META = {
  top_scorer: { label: "Top Scorer", achId: "a17_top_scorer", popularity: 6 },
  top_rebounder: { label: "Top Rebounder", achId: "a17_top_rebounder", popularity: 6 },
  top_assists: { label: "Top Assists", achId: "a17_top_assists", popularity: 6 },
  top_steals: { label: "Top Steals", achId: "a17_top_steals", popularity: 6 },
  top_blocks: { label: "Top Blocks", achId: "a17_top_blocks", popularity: 6 },
  pot: { label: "Player of the Tournament", achId: "a17_pot", popularity: 14 },
  final_mvp: { label: "Final MVP", achId: "a17_final_mvp", popularity: 16 },
};
const A17_SHORTLIST_BASE = 0.06;
const A17_SHORTLIST_TR_WEIGHT = 0.55;
const A17_SHORTLIST_AWARD_BONUS = {
  top_scorer: 0.04, top_rebounder: 0.04, top_assists: 0.04, top_steals: 0.04, top_blocks: 0.04,
  pot: 0.15, final_mvp: 0.18,
};
const A17_SHORTLIST_TEAM_BONUS = { champion: 0.10, runner_up: 0.07, third: 0.04, quarterfinalist: 0 };

function computeA17ShortlistChance(a17Stats, awardIds, teamResultId, highlyTalented) {
  let c = A17_SHORTLIST_BASE + (a17Stats.tr / 100) * A17_SHORTLIST_TR_WEIGHT;
  awardIds.forEach(id => { c += A17_SHORTLIST_AWARD_BONUS[id] || 0; });
  c += A17_SHORTLIST_TEAM_BONUS[teamResultId] || 0;
  if (highlyTalented) c += 0.30;
  return clamp(c, 0.03, 0.90);
}

/* ============================================================
   AGE 16 — TWO PATHS
   Bukit Jalil alumni -> U16 national selection (70%).
   Everyone else (and U16 rejects) -> U17 jumpclass trial (30%).
============================================================ */

// --- Option 1: U16 National Team -> FIBA U16 Asia Cup Qualifiers (5 teams,
// top 3 advance) -> Asia Cup (12 teams) ---
const U16_SELECTION_CHANCE = 0.70;   // Bukit Jalil alumni who make the U16 squad
const U16_SELECTION_CHANCE_PRODIGY = 0.96; // prodigies are near-locks for the actual squad
const U16_QUALIFY_CHANCE = 0.60;     // top 3 of the 5-team qualifiers advance to the Asia Cup
const U16_TOT_CHANCE = 0.05;         // player named to Team of the Tournament
// The Asia Cup proper has 12 teams. As an underdog, Malaysia's best realistic
// finish is a Quarter-Final (<20%); most of the time they sit 10th-12th.
const U16_ASIACUP_RESULT_OPTIONS = [
  { id: "quarterfinal", weight: 18 },
  { id: "place_10", weight: 30 },
  { id: "place_11", weight: 28 },
  { id: "place_12", weight: 24 },
];
// The top 3 of the 5-team qualifiers advance, so missing out means finishing
// 4th or 5th there.
const U16_QUALIFIER_EXIT_OPTIONS = [
  { id: "qual_4th", weight: 55 },
  { id: "qual_5th", weight: 45 },
];
const U16_RESULT_META = {
  quarterfinal: { label: "Asia Cup Quarter-Finalist", popularity: 20 },
  place_10: { label: "Asia Cup — 10th Place", popularity: 12 },
  place_11: { label: "Asia Cup — 11th Place", popularity: 11 },
  place_12: { label: "Asia Cup — 12th Place", popularity: 10 },
  qual_2nd: { label: "Qualifiers — 2nd (Did Not Advance)", popularity: 5 },
  qual_3rd: { label: "Qualifiers — 3rd (Did Not Advance)", popularity: 4 },
  qual_4th: { label: "Qualifiers — 4th (Did Not Advance)", popularity: 3 },
  qual_5th: { label: "Qualifiers — 5th (Did Not Advance)", popularity: 2 },
};

/* U16 stat line vs continental competition. Malaysia is an underdog, so the
   baseline is deliberately modest — but there's a ~7% "NBA-talent" spike that
   lets a special prospect average around 20 a game and stand out. */
function generateU16TournamentStats(stats, position, height) {
  const nbaTalent = Math.random() < 0.07;
  const apgPosBonus = position === "PG" ? 1.4 : position === "SG" ? 0.3 : 0;
  const rpgPosBonus = position === "C" ? 2.6 : position === "PF" ? 1.3 : 0;
  const scale = nbaTalent ? randFloat(1.5, 1.9) : randFloat(0.7, 1.0);
  const ppg = clamp(round1((2 + stats.shooting * 0.13 + stats.athleticism * 0.03) * scale), 1, 26);
  const rpg = clamp(round1((0.8 + rpgPosBonus + stats.rebounding * 0.08) * (nbaTalent ? randFloat(1.2, 1.5) : randFloat(0.75, 1.05))), 0.5, 14);
  const apg = clamp(round1((0.4 + apgPosBonus + stats.playmaking * 0.035) * (nbaTalent ? randFloat(1.2, 1.5) : randFloat(0.75, 1.05))), 0.2, 7);
  const spg = clamp(round1((-0.9 + stats.defense * 0.042 + stats.athleticism * 0.005) * randFloat(0.85, 1.15)), 0.2, 3.1);
  const bpg = computeBlocks(stats, position, height, nbaTalent ? randFloat(1.2, 1.5) : randFloat(0.75, 1.05));
  const fgPct = computeFgPct(stats, position, 18, 0.26, 0.05, 0.9, 1.06, 12, 58);
  const threePct = clamp(round1((10 + Math.max(0, stats.shooting - 30) * 0.38 + Math.max(0, stats.iq - 35) * 0.1) * randFloat(0.8, 1.1)), 0, 46);
  return { ppg, rpg, apg, spg, bpg, fgPct, threePct, nbaTalent };
}

/* ============================================================
   AGE 18 — U18 NATIONAL TEAM -> FIBA U18 ASIA CUP
   Gated behind accepting the U18 Bukit Jalil bootcamp at 17.
   Same structure as U16: 5-team qualifiers (top 3 advance) -> 12-team Asia Cup.
============================================================ */
const U18_SELECTION_CHANCE = 0.70;   // U18 bootcamp players who make the national squad
const U18_SELECTION_CHANCE_PRODIGY = 0.96; // prodigies are near-locks for the actual squad
const U18_QUALIFY_CHANCE = 0.60;     // top 3 of the 5-team qualifiers advance
const U18_TOT_CHANCE = 0.05;         // player named to Team of the Tournament
const U18_ASIACUP_RESULT_OPTIONS = [
  { id: "quarterfinal", weight: 18 },
  { id: "place_10", weight: 30 },
  { id: "place_11", weight: 28 },
  { id: "place_12", weight: 24 },
];
const U18_QUALIFIER_EXIT_OPTIONS = [
  { id: "qual_4th", weight: 55 },
  { id: "qual_5th", weight: 45 },
];
const U18_RESULT_META = {
  quarterfinal: { label: "Asia Cup Quarter-Finalist", popularity: 22 },
  place_10: { label: "Asia Cup — 10th Place", popularity: 13 },
  place_11: { label: "Asia Cup — 11th Place", popularity: 12 },
  place_12: { label: "Asia Cup — 12th Place", popularity: 11 },
  qual_2nd: { label: "Qualifiers — 2nd (Did Not Advance)", popularity: 6 },
  qual_3rd: { label: "Qualifiers — 3rd (Did Not Advance)", popularity: 5 },
  qual_4th: { label: "Qualifiers — 4th (Did Not Advance)", popularity: 4 },
  qual_5th: { label: "Qualifiers — 5th (Did Not Advance)", popularity: 3 },
};

/* ============================================================
   TAIWAN HBL — HIGH SCHOOL BASKETBALL LEAGUE (overseas student-athlete)
   Offered right after the National U17 Championship to any player who
   clears the rating threshold. One year of eligibility only (age 18).
   Taiwanese high-school programmes are built around long-hours stamina
   work, so the season actually LOWERS fatigue rather than raising it,
   and the imported player is always slotted in as a starter.
   Accepting also locks in a Malaysia U18 national call-up.
============================================================ */
/* HBL IMPORT SCOUTING
   Taiwanese programmes scout the National U17 Championship in person, so
   eligibility reflects WHAT THE SCOUTS SAW, not just a rating check.

   The old flat "overall >= 45" gate passed 96.4% of players once the
   attribute-point system raised the average 17-year-old to ~49.5 overall.
   Raising the number alone is unworkable: the field is so bunched at 17
   that 50 -> 34%, 55 -> 17%, 60 -> 3% — a two-point move swings the rate
   several-fold. Worse, a pure rating check can reject a Final MVP while
   accepting a bench player one point higher.

   Instead: a modest ability floor, then a CHANCE built from tournament
   performance. Import slots are limited, so clearing the bar is never a
   guarantee. */
const HBL_RATING_THRESHOLD = 48;      // ability floor to be considered at all
const HBL_BASE_CHANCE      = 0.02;    // bare-minimum prospect, nothing else
const HBL_AWARD_BONUS      = 0.10;    // per individual award (max 2 counted)
const HBL_MARQUEE_BONUS    = 0.12;    // extra for Player of the Tournament / Final MVP
const HBL_TEAM_RUN_BONUS   = 0.10;    // champions (half for runners-up) = more games on show
const HBL_ABILITY_SCALE    = 0.010;   // per point of overall above the floor
const HBL_MAX_CHANCE       = 0.75;    // even a superb tournament is never certain

/* Probability that at least one Taiwanese programme offers an import spot. */
function hblOfferChance(overall, awards, teamResultId) {
  if (overall < HBL_RATING_THRESHOLD) return 0;
  const aw = awards || [];
  let c = HBL_BASE_CHANCE;
  c += Math.min(2, aw.length) * HBL_AWARD_BONUS;
  if (aw.includes("pot") || aw.includes("final_mvp")) c += HBL_MARQUEE_BONUS;
  if (teamResultId === "champion") c += HBL_TEAM_RUN_BONUS;
  else if (teamResultId === "runner_up") c += HBL_TEAM_RUN_BONUS * 0.5;
  c += Math.max(0, overall - HBL_RATING_THRESHOLD) * HBL_ABILITY_SCALE;
  return Math.min(HBL_MAX_CHANCE, c);
}
const HBL_OFFER_COUNT = 3;           // only a subset of schools bid in any given year
const HBL_GAMES_MIN = 16;
const HBL_GAMES_MAX = 20;
const HBL_FATIGUE_RECOVERY = 25;     // stamina-focused programme: fatigue drops
const HBL_GROWTH_BONUS_MIN = 2;      // extra per-stat growth vs staying home
const HBL_GROWTH_BONUS_MAX = 4;
const HBL_TEAMS = [
  { id: "nan_shan", name: "Nan Shan High School", cn: "南山高中", city: "New Taipei" },
  { id: "song_shan", name: "Song Shan High School", cn: "松山高中", city: "Taipei" },
  { id: "neng_jen", name: "Neng Jen Home Economics & Commercial Vocational School", cn: "能仁家商", city: "Taipei" },
  { id: "guang_fu", name: "Guang Fu High School", cn: "光復高中", city: "Taoyuan" },
  { id: "dong_tai", name: "Dong Tai High School", cn: "東泰高中", city: "Hsinchu" },
];

/* HBL production is generated on the same scale as the National U17
   Championship (comparable level of competition), and because the import
   always starts, there is a real shot at the league's individual awards. */
function generateHblSeasonStats(stats, position, height) {
  return generateU15TournamentStats(stats, position, height);
}

/* ============================================================
   TAIWAN UBA — UNIVERSITY BASKETBALL LEAGUE
   The natural next step after a season in the HBL: Taiwanese
   universities offer four-year scholarships (ages 19-22, graduating
   at 23). Taking one is mutually exclusive with signing a Malaysian
   semi-pro/pro contract — the player commits to one or the other.

   Each programme has its own tendencies, which the player is NOT
   told up front: NCCU is the perennial champion but stacked enough
   that an import usually comes off the bench, while the smaller
   programmes hand out starting roles far more readily.
============================================================ */
const UBA_GAMES_MIN = 24;
const UBA_GAMES_MAX = 28;
const UBA_OFFER_COUNT = 3;           // scholarships on the table each year
const UBA_YEARS = 4;                 // eligibility: ages 19, 20, 21, 22
const UBA_GRADUATION_AGE = 23;
const UBA_TEAMS = [
  { id: "nccu", name: "National Chengchi University", cn: "國立政治大學", short: "NCCU",
    starterChance: 0.15, titleChance: 0.90 },
  { id: "ntsu", name: "National Taiwan Sports University", cn: "國立體育大學", short: "NTSU",
    starterChance: 0.80, titleChance: 0.04 },
  { id: "ntua", name: "National Taiwan University of Arts", cn: "國立臺灣藝術大學", short: "NTUA",
    starterChance: 0.80, titleChance: 0.02 },
  { id: "shih_hsin", name: "Shih Hsin University", cn: "世新大學", short: "SHU",
    starterChance: 0.80, titleChance: 0.02 },
  { id: "fu_jen", name: "Fu Jen Catholic University", cn: "輔仁大學", short: "FJU",
    starterChance: 0.80, titleChance: 0.02 },
  { id: "chien_hsin", name: "Chien Hsin University of Science and Technology", cn: "健行科技大學", short: "CHU",
    starterChance: 0.50, titleChance: 0.05 },
];

/* UBA GRADUATE -> TAIWAN PRO (TPBL) IMPORT PATHWAY
   On graduating UBA, there's a chance a player gets scouted directly into
   the Taiwan Professional Basketball League as an Asian import — no need
   to sign with an MBL/semi-pro club back home first. Declining (or missing
   the roll) falls through to the normal domestic club-offers flow.
   Reuses the same OVERSEAS_TIERS-shaped structure (roleBands, teams, achId)
   so it can be handled by the existing overseas-offer screen/handlers. */
const UBA_TPBL_IMPORT_CHANCE = 0.35; // chance of this offer firing at graduation, instead of going straight to domestic offers
const UBA_TPBL_IMPORT_TIER = {
  id: "tpbl_import", label: "Taiwan Pro (TPBL)", threshold: 0,
  teams: [
    { name: "New Taipei Kings", league: "TPBL", country: "Taiwan", salaryPerSeason: 3500000 },
    { name: "Formosa Dreamers", league: "TPBL", country: "Taiwan", salaryPerSeason: 3500000 },
    { name: "Hsinchu Lioneers", league: "TPBL", country: "Taiwan", salaryPerSeason: 3500000 },
    { name: "Fubon Braves", league: "TPBL", country: "Taiwan", salaryPerSeason: 3500000 },
  ],
  // Role bands are calibrated lower than the general "Asia Pro" overseas
  // tier (threshold 75) since a fresh UBA graduate is rarely that
  // developed yet — this is meant as a genuine "import opportunity for a
  // promising grad," not an elite-only path.
  roleBands: [
    { min: 0, max: 54, role: "Rotation", awardChance: 0 },
    { min: 55, max: 64, role: "Starter", awardChance: 0.10 },
    { min: 65, max: 999, role: "First Option", awardChance: 0.25 },
  ],
  achId: "asia_pro_player",
};

// ALL_OVERSEAS_TIERS — used for id-keyed lookups (season stat generation,
// release/promotion checks) so a signed tpbl_import player is recognized
// wherever any signed overseas player is recognized. Deliberately NOT used
// by highestOverseasTier() (which stays scoped to OVERSEAS_TIERS only) —
// that function drives the general "you're good enough to get scouted"
// roll for domestic pros, and tpbl_import should only ever be reached via
// the dedicated UBA-graduation offer, never as a random overseas offer for
// an ordinary MBL player.
const ALL_OVERSEAS_TIERS = [...OVERSEAS_TIERS, UBA_TPBL_IMPORT_TIER];

/* UBA production sits at development-league level, so it reuses the same
   generator as the U20/U23 D-Leagues — role (Starter vs Rotation) drives
   the minutes, exactly as it does domestically. */
function generateUbaSeasonStats(stats, position, height, role) {
  return generateLeagueSeasonStats(stats, position, "u23", role, height);
}

/* U18 stat line vs continental competition — same underdog baseline as U16,
   with the same ~7% NBA-talent spike toward a 20+ ppg standout. */
function generateU18TournamentStats(stats, position, height) {
  const nbaTalent = Math.random() < 0.07;
  const apgPosBonus = position === "PG" ? 1.4 : position === "SG" ? 0.3 : 0;
  const rpgPosBonus = position === "C" ? 2.6 : position === "PF" ? 1.3 : 0;
  const scale = nbaTalent ? randFloat(1.5, 1.9) : randFloat(0.7, 1.0);
  const ppg = clamp(round1((2 + stats.shooting * 0.13 + stats.athleticism * 0.03) * scale), 1, 26);
  const rpg = clamp(round1((0.8 + rpgPosBonus + stats.rebounding * 0.08) * (nbaTalent ? randFloat(1.2, 1.5) : randFloat(0.75, 1.05))), 0.5, 14);
  const apg = clamp(round1((0.4 + apgPosBonus + stats.playmaking * 0.035) * (nbaTalent ? randFloat(1.2, 1.5) : randFloat(0.75, 1.05))), 0.2, 7);
  const spg = clamp(round1((-0.9 + stats.defense * 0.042 + stats.athleticism * 0.005) * randFloat(0.85, 1.15)), 0.2, 3.1);
  const bpg = computeBlocks(stats, position, height, nbaTalent ? randFloat(1.2, 1.5) : randFloat(0.75, 1.05));
  const fgPct = computeFgPct(stats, position, 18, 0.26, 0.05, 0.9, 1.06, 12, 58);
  const threePct = clamp(round1((10 + Math.max(0, stats.shooting - 30) * 0.38 + Math.max(0, stats.iq - 35) * 0.1) * randFloat(0.8, 1.1)), 0, 46);
  return { ppg, rpg, apg, spg, bpg, fgPct, threePct, nbaTalent };
}


/* ============================================================
   SENIOR NATIONAL TEAM — FIBA ASIA CUP CYCLE
   Qualifiers run over 3 phases across 3 years (4 games each),
   top 4 advance. The Asia Cup itself is every 4 years starting
   2029, so a full cycle is: qualifiers 2026/27/28 -> Cup 2029,
   qualifiers 2030/31/32 -> Cup 2033, and so on.
   Tryout offered at 65+ rating; 70% make the squad each phase. D-League
   (U20/U23) players get their own, lower threshold — 65 was calibrated
   for near-MBL-caliber talent, and structurally almost no player still in
   the D-League could ever reach it (reaching it would mean their overall
   already clears the MBL promotion bar too, converting them out of U20/U23
   the same season). This threshold is instead calibrated so a genuine
   development-league standout — clearly the best prospect in that pool,
   not just anyone — can get an early look.
============================================================ */
const NT_RATING_THRESHOLD = 65;      // rating to receive a national tryout (MBL players)
const NT_RATING_THRESHOLD_DLEAGUE = 65; // rating to receive a national tryout (U20/U23 players)
const NT_MAKE_SQUAD_CHANCE = 0.65;   // chance to make the squad once tried out (rating <= 80)
const NT_QUALIFY_CHANCE = 0.50;      // Malaysia advancing through the qualifiers
const NT_QUARTERFINAL_CHANCE = 0.20; // if at the Asia Cup, chance to reach the QF (else 10-12th)
/* Asia Cup finals sit on EVEN years. The SEA Games run on odd years from
   2027, and the old 2029 anchor put the Asia Cup on odd years too — the
   SEA Games then displaced every single Asia Cup finals, removing the
   marquee event from the game entirely. Shifting the anchor keeps both. */
const ASIA_CUP_FIRST_YEAR = 2030;    // first Asia Cup finals

/* SEA GAMES — biennial regional championship, first edition 2027.
   Malaysia is a genuine contender here (unlike the continental Asia Cup),
   so the floor is 5th and a medal is realistically in play. */
const SEA_GAMES_FIRST_YEAR = 2027;
const SEA_GAMES_INTERVAL = 2;
const SEA_GAMES_NATIONS = [
  "Malaysia", "Singapore", "Vietnam", "Thailand", "Philippines", "Indonesia",
  "Brunei", "Laos", "Timor-Leste", "Myanmar", "Cambodia",
];
/* Placement odds. Philippines/Indonesia are the regional powers, so gold is
   rare; bronze is the realistic medal target at 35%. Malaysia never finishes
   below 5th — the regional field drops off sharply after the top handful. */
const SEA_GAMES_PLACEMENTS = [
  { place: 1, label: "Gold Medal",   chance: 0.07, achId: "sea_games_gold",   pop: 34, games: [5, 6] },
  { place: 2, label: "Silver Medal", chance: 0.14, achId: "sea_games_silver", pop: 26, games: [5, 6] },
  { place: 3, label: "Bronze Medal", chance: 0.35, achId: "sea_games_bronze", pop: 20, games: [5, 6] },
  { place: 4, label: "4th Place",    chance: 0.24, achId: "sea_games",        pop: 12, games: [4, 5] },
  { place: 5, label: "5th Place",    chance: 0.20, achId: "sea_games",        pop: 9,  games: [4, 5] },
];
function rollSeaGamesPlacement() {
  const r = Math.random();
  let acc = 0;
  for (const p of SEA_GAMES_PLACEMENTS) {
    acc += p.chance;
    if (r < acc) return p;
  }
  return SEA_GAMES_PLACEMENTS[SEA_GAMES_PLACEMENTS.length - 1];
}

// What national event (if any) happens in a given calendar year.
// SEA Games takes priority in a clash — it's the shorter, closer tournament
// and a qualifier phase can slip a year without breaking the Asia Cup cycle.
/* Every national event happening in a given year, in the order they'd be
   played. Real calendars run the SEA Games and an Asia Cup qualifier window
   in the same year (different months), so a season can carry TWO call-ups —
   all three qualifier phases survive alongside the biennial SEA Games. */
function nationalEventsForYear(year) {
  if (year < 2026) return [];
  const out = [];
  // SEA Games run mid-year, before the Asia Cup windows.
  if (year >= SEA_GAMES_FIRST_YEAR && (year - SEA_GAMES_FIRST_YEAR) % SEA_GAMES_INTERVAL === 0) {
    out.push({ type: "sea_games", year });
  }
  if ((year - ASIA_CUP_FIRST_YEAR) % 4 === 0 && year >= ASIA_CUP_FIRST_YEAR) {
    out.push({ type: "cup", year });
  } else {
    const offset = (((ASIA_CUP_FIRST_YEAR - year) % 4) + 4) % 4; // 3,2,1 before a cup
    if (offset === 3) out.push({ type: "qualifier", phase: 1, year });
    else if (offset === 2) out.push({ type: "qualifier", phase: 2, year });
    else if (offset === 1) out.push({ type: "qualifier", phase: 3, year });
  }
  return out;
}

/* Back-compat single-event accessor. Returns the first event of the year so
   any caller that only handles one still behaves sensibly. */
function nationalEventForYear(year) {
  const list = nationalEventsForYear(year);
  return list.length ? list[0] : null;
}

/* National-team role multipliers — mirrors the club league system's role
   scaling. "First Option" is the go-to option, above even a regular Starter. */
const NT_ROLE_MULT = { "First Option": 1.15, "Starter": 1.0, "Rotation": 0.62, "Bench": 0.32 };

/* Senior international stat line. Malaysia is a continental underdog, so the
   baseline is modest — scaled by the player's role on the national team
   (First Option > Starter > Rotation > Bench, exactly like club minutes).
   A standout performance lets output spike well above the role's usual
   ceiling, per the national-team selection rules. */
/* SEA Games stat line. The regional field is materially weaker than the
   continental Asia Cup — Brunei, Laos, Timor-Leste and Cambodia are well
   below Malaysia's level — so counting stats run noticeably higher than the
   Asia Cup baseline for the same player and role. */
function generateSeaGamesStats(stats, position, height, role, standout) {
  const base = generateNationalStats(stats, position, height, role, standout);
  const boost = randFloat(1.18, 1.34);
  const pct = (v, lo, hi) => clamp(Math.round(v * randFloat(1.02, 1.07)), lo, hi);
  return {
    ppg: round1(base.ppg * boost),
    rpg: round1(base.rpg * boost),
    apg: round1(base.apg * boost),
    spg: round1(base.spg * boost),
    bpg: round1(base.bpg * boost),
    fgPct: pct(base.fgPct, 25, 68),
    threePct: pct(base.threePct, 15, 52),
    role: base.role,
    standout: base.standout,
  };
}

function generateNationalStats(stats, position, height, role, standout) {
  const roleM = (NT_ROLE_MULT[role] || 0.62) * (standout ? randFloat(1.4, 1.8) : 1);
  const overallScale = computeOverall(stats, position);
  const overallMult = clamp((overallScale - 30) / 50, 0.15, 1.4);
  const m = roleM * overallMult;
  const apgPosBonus = position === "PG" ? 1.5 : position === "SG" ? 0.3 : 0;
  const rpgPosBonus = position === "C" ? 2.8 : position === "PF" ? 1.4 : 0;
  const ppg = clamp(round1((2 + stats.shooting * 0.14 + stats.athleticism * 0.03) * m * randFloat(0.85, 1.15)), 1, 30);
  const rpg = clamp(round1((0.8 + rpgPosBonus + stats.rebounding * 0.085) * m * randFloat(0.85, 1.15)), 0.5, 15);
  const apg = clamp(round1((0.4 + apgPosBonus + stats.playmaking * 0.04) * m * randFloat(0.85, 1.15)), 0.2, 8);
  const spg = clamp(round1((-0.9 + stats.defense * 0.042 + stats.athleticism * 0.005) * m * randFloat(0.85, 1.15)), 0.2, 3.1);
  const bpg = computeBlocks(stats, position, height, m);
  const fgPct = computeFgPct(stats, position, 18, 0.27, 0.05, 0.9, 1.06, 12, 60);
  const threePct = clamp(round1((10 + Math.max(0, stats.shooting - 30) * 0.38 + Math.max(0, stats.iq - 35) * 0.1) * randFloat(0.8, 1.1)), 0, 48);
  return { ppg, rpg, apg, spg, bpg, fgPct, threePct, standout: !!standout, role };
}

const U17_JUMPCLASS_CHANCE = 0.30;   // chance a non-Bukit-Jalil player is picked to play up
// Team result depends on home-state tier; only Tier 1/2 realistically contend.
const U17_TEAM_RESULT_OPTIONS_BY_TIER = {
  1: [ { id: "champion", weight: 8 }, { id: "runner_up", weight: 10 }, { id: "quarterfinalist", weight: 82 } ],
  2: [ { id: "champion", weight: 4 }, { id: "runner_up", weight: 7 }, { id: "quarterfinalist", weight: 89 } ],
  3: [ { id: "champion", weight: 1 }, { id: "runner_up", weight: 3 }, { id: "quarterfinalist", weight: 96 } ],
};
const U17_TEAM_RESULT_META = {
  champion: { label: "U17 Champions", achId: "u17_champion", popularity: 16 },
  runner_up: { label: "U17 First Runner-Up", achId: null, popularity: 8 },
  quarterfinalist: { label: "U17 Quarter-Finalist", achId: null, popularity: 0 },
};

/* As an underage jumpclass player facing bigger, older opponents, output is
   suppressed — good numbers are hard to come by and awards are a long shot. */
function generateU17TournamentStats(stats, position, height) {
  const apgPosBonus = position === "PG" ? 1.2 : 0;
  const rpgPosBonus = position === "C" ? 2.2 : position === "PF" ? 1.0 : 0;
  const damp = randFloat(0.6, 0.9); // underage suppression
  const ppg = clamp(round1((2 + stats.shooting * 0.14 + stats.athleticism * 0.025) * damp), 1, 24);
  const rpg = clamp(round1((0.8 + rpgPosBonus + stats.rebounding * 0.09) * randFloat(0.7, 0.95)), 0.5, 13);
  const apg = clamp(round1((0.4 + apgPosBonus + stats.playmaking * 0.035) * randFloat(0.7, 0.95)), 0.2, 6);
  const spg = clamp(round1((-0.9 + stats.defense * 0.042) * randFloat(0.85, 1.15)), 0.2, 3.1);
  const bpg = computeBlocks(stats, position, height, randFloat(0.6, 1.0));
  const fgPct = computeFgPct(stats, position, 17, 0.24, 0.05, 0.88, 1.04, 12, 55);
  const threePct = clamp(round1((9 + Math.max(0, stats.shooting - 32) * 0.36 + Math.max(0, stats.iq - 38) * 0.1) * randFloat(0.75, 1.05)), 0, 44);
  return { ppg, rpg, apg, spg, bpg, fgPct, threePct };
}

/* Stat-leader awards are rare for a jumpclass player; championship is the
   realistic path to hardware for a strong Tier 1/2 team. Uses the same real
   tournament thresholds as the National U15/U17 competitions — jumpclass
   players just rarely clear them, since their output is suppressed. */
function rollU17Awards(u17) {
  const chance = (val, lo, hi, max) => clamp((val - lo) / (hi - lo), 0, 1) * max;
  const awards = [];
  if (Math.random() < chance(u17.ppg, 21, 32, 0.10)) awards.push("top_scorer");
  if (Math.random() < chance(u17.rpg, 11.5, 16, 0.10)) awards.push("top_rebounder");
  if (Math.random() < chance(u17.apg, 4.2, 7, 0.10)) awards.push("top_assists");
  if (Math.random() < chance(u17.spg, 2.5, 3.1, 0.10)) awards.push("top_steals");
  if (Math.random() < chance(u17.bpg, 1.5, 4.3, 0.10)) awards.push("top_blocks");
  return awards;
}

/* ============================================================
   MSSM — Majlis Sukan Sekolah-Sekolah Malaysia
   A national schools competition open to ages 16-18, held every
   year, representing the player's home state. Capped at 12 games.
   Selection cascades from the bigger competitions: any player
   selected for the National U17 squad, or who is a Malaysia
   national-team representative (U16/U18 youth team or the senior
   squad) that year, is automatically selected for MSSM too.
============================================================ */
const MSSM_SELECTION_CHANCE = { 1: 0.80, 2: 0.90, 3: 0.97 }; // base chance when not auto-qualified
const MSSM_TEAM_RESULT_OPTIONS_BY_TIER = {
  1: [ { id: "champion", weight: 10 }, { id: "runner_up", weight: 12 }, { id: "third", weight: 14 }, { id: "quarterfinalist", weight: 64 } ],
  2: [ { id: "champion", weight: 5 }, { id: "runner_up", weight: 8 }, { id: "third", weight: 12 }, { id: "quarterfinalist", weight: 75 } ],
  3: [ { id: "champion", weight: 2 }, { id: "runner_up", weight: 4 }, { id: "third", weight: 10 }, { id: "quarterfinalist", weight: 84 } ],
};
const MSSM_TEAM_RESULT_META = {
  champion: { label: "MSSM Champions", achId: "mssm_champion", popularity: 14 },
  runner_up: { label: "MSSM First Runner-Up", achId: null, popularity: 7 },
  third: { label: "MSSM Second Runner-Up", achId: null, popularity: 4 },
  quarterfinalist: { label: "MSSM Quarter-Finalist", achId: null, popularity: 0 },
};
const MSSM_AWARD_META = {
  top_scorer: { label: "MSSM Top Scorer", achId: "mssm_top_scorer", popularity: 6 },
  top_rebounder: { label: "MSSM Top Rebounder", achId: "mssm_top_rebounder", popularity: 6 },
  top_assists: { label: "MSSM Top Assists", achId: "mssm_top_assists", popularity: 6 },
  top_steals: { label: "MSSM Top Steals", achId: "mssm_top_steals", popularity: 6 },
  top_blocks: { label: "MSSM Top Blocks", achId: "mssm_top_blocks", popularity: 6 },
  pot: { label: "MSSM Player of the Tournament", achId: "mssm_pot", popularity: 14 },
  final_mvp: { label: "MSSM Final MVP", achId: "mssm_final_mvp", popularity: 16 },
};

/* Own-age school-level stat line (same shape as the National U15/U17
   generator), plus how many games the run lasted — 12 at most. */
/* Own-age school-level stat line, plus how many games the run lasted — 12 at
   most. MSSM spans ages 16-18 in one bracket, so a 16-year-old genuinely
   faces 17-18-year-old schoolmates — the same "facing older opponents"
   reality as jumpclass National U17. So at 16, MSSM draws from the exact
   same (suppressed) formula shape as jumpclass; at 17+, it draws from the
   same full-baseline shape as the National U15/U17 Championship generator.
   This guarantees a player's National U17 and MSSM lines stay consistent
   in the same year, instead of a suppressed one sitting next to a full one. */
function generateMSSMStats(stats, position, height, age) {
  const games = randInt(6, 12); // capped at 12 games
  if (age <= 16) {
    // Same shape as generateU17TournamentStats (jumpclass).
    const apgPosBonus = position === "PG" ? 1.2 : 0;
    const rpgPosBonus = position === "C" ? 2.2 : position === "PF" ? 1.0 : 0;
    const damp = randFloat(0.65, 0.95);
    const ppg = clamp(round1((2 + stats.shooting * 0.14 + stats.athleticism * 0.025) * damp), 1, 24);
    const rpg = clamp(round1((0.8 + rpgPosBonus + stats.rebounding * 0.09) * randFloat(0.75, 1.0)), 0.5, 13);
    const apg = clamp(round1((0.4 + apgPosBonus + stats.playmaking * 0.035) * randFloat(0.75, 1.0)), 0.2, 6);
    const spg = clamp(round1((-0.9 + stats.defense * 0.042) * randFloat(0.85, 1.15)), 0.2, 3.1);
    const bpg = computeBlocks(stats, position, height, randFloat(0.65, 1.0));
    const fgPct = computeFgPct(stats, position, 17, 0.24, 0.05, 0.88, 1.04, 12, 55);
    const threePct = clamp(round1((9 + Math.max(0, stats.shooting - 32) * 0.36 + Math.max(0, stats.iq - 38) * 0.1) * randFloat(0.75, 1.05)), 0, 44);
    const tr = clamp(Math.round((ppg / 24) * 32 + (rpg / 13) * 16 + (apg / 6) * 14 + (spg / 3.1) * 12 + (bpg / 3) * 8 + (fgPct / 55) * 12 + (threePct / 44) * 6), 0, 100);
    return { ppg, rpg, apg, spg, bpg, fgPct, threePct, tr, games };
  }
  // Age 17-18: same shape as generateU15TournamentStats (own-age baseline).
  const apgPosBonus = position === "PG" ? 1.6 : position === "SG" ? 0.4 : 0;
  const rpgPosBonus = position === "C" ? 3.0 : position === "PF" ? 1.5 : 0;
  const noise = age === 17 ? randFloat(0.85, 1.1) : randFloat(0.9, 1.2); // 18yo, oldest bracket, slight edge
  const ppg = clamp(round1((3 + stats.shooting * 0.20 + stats.athleticism * 0.035 + stats.playmaking * 0.02) * noise), 2, 32);
  const rpg = clamp(round1((1 + rpgPosBonus + stats.rebounding * 0.12 + stats.athleticism * 0.02) * noise), 1, 16);
  const apg = clamp(round1((0.5 + apgPosBonus + stats.playmaking * 0.045) * noise), 0.3, 7);
  const spg = clamp(round1((-0.9 + stats.defense * 0.042 + stats.athleticism * 0.005) * noise), 0.2, 3.1);
  const bpg = computeBlocks(stats, position, height, noise);
  const fgPct = computeFgPct(stats, position, 20, 0.3, 0.06, 0.92, 1.08, 15, 62);
  const threePct = clamp(round1((12 + Math.max(0, stats.shooting - 25) * 0.4 + Math.max(0, stats.iq - 30) * 0.12) * randFloat(0.85, 1.15)), 0, 50);
  const tr = clamp(Math.round((ppg / 32) * 30 + (rpg / 15) * 15 + (apg / 6.5) * 15 + (spg / 3.1) * 15 + (bpg / 4.3) * 10 + (fgPct / 60) * 10 + (threePct / 45) * 5), 0, 100);
  return { ppg, rpg, apg, spg, bpg, fgPct, threePct, tr, games };
}

/* Resolves MSSM for a given season: if `guaranteed` is false, rolls the
   base state-tier selection chance first. When selected (guaranteed or
   rolled), generates the tournament, applies gains/achievements, and marks
   the result pending for its own reveal screen. Pure-ish: takes a player,
   returns an updated one — never sets screen/save itself. */
function resolveMSSM(base, guaranteed) {
  let p = { ...base, achievements: [...base.achievements] };
  const tier = getStateTier(p.hometown);
  const selected = guaranteed || Math.random() < MSSM_SELECTION_CHANCE[tier];
  if (!selected) {
    p.mssmPendingReveal = false;
    return p;
  }
  const stats = generateMSSMStats(p.stats, p.position, p.height, p.age);
  const teamResult = weightedPick(MSSM_TEAM_RESULT_OPTIONS_BY_TIER[tier]);
  const teamMeta = MSSM_TEAM_RESULT_META[teamResult.id];
  const awardIds = rollU15Awards(stats, teamResult.id);

  let popGain = 6 + teamMeta.popularity;
  const achievements = [...p.achievements, "mssm_rep"];
  if (teamMeta.achId) achievements.push(teamMeta.achId);
  awardIds.forEach(id => {
    achievements.push(MSSM_AWARD_META[id].achId);
    popGain += MSSM_AWARD_META[id].popularity;
  });

  p.popularity = clamp(p.popularity + popGain);
  p.morale = clamp(p.morale + 5 + awardIds.length * 2);
  p.achievements = Array.from(new Set(achievements));
  p.mssmPendingReveal = true;
  p.mssmStats = stats;
  p.mssmResultLabel = teamMeta.label;
  p.mssmAwards = awardIds;
  p.mssmGuaranteed = guaranteed;
  p.history = [...p.history, {
    age: p.age, tierLabel: "MSSM", note: `Represented ${p.hometown} at MSSM — finished as ${teamMeta.label}.${guaranteed ? " Selection was automatic off the back of your national/state squad spot this year." : ""}`,
    tournament: "MSSM", category: "mssm", stats, awards: awardIds, games: stats.games,
  }];
  return p;
}

/* ============================================================
   CLUTCH MOMENTS — high-stakes, game-deciding decisions that can
   appear at the climax of ANY tournament (National U15/U17, MSSM,
   U20/U23 D-League, MBL, Asia Cup Qualifiers/Finals, and so on).
   These aren't everyday events — they're reserved for the moment a
   tournament is genuinely on the line: succeed, and the team goes on
   to the title; fail, and it's an early exit instead. The tension is
   the point, which is also why these stay out of any patch notes.
============================================================ */
const CLUTCH_TRIGGER_CHANCE = 0.40; // chance a "so close" result becomes a clutch moment instead

const CLUTCH_EVENTS = [
  {
    id: "clutch_last_shot",
    title: "Down 2, 5 Seconds Left",
    desc: "Your team trails by two. The ball is in your hands with five seconds on the clock.",
    choices: [
      { id: "pullup_three", label: "Pull-up three to win it", successChance: 0.50, icon: "hoopShot",
        winNote: "The three is pure. Buzzer sounds as it drops through — you win it outright.",
        loseNote: "The three rims out at the buzzer. No second chance." },
      { id: "crossover_layup", label: "Crossover, drive to tie it", successChance: 0.50, icon: "run",
        winNote: "You shake your man and finish through contact — tied, and the game goes to overtime.",
        loseNote: "You get a hand stripped clean on the drive. The clock runs out." },
    ],
  },
  {
    id: "clutch_trust_the_pass",
    title: "Down 2, Teammate Wide Open",
    desc: "Same scoreboard — down two, five seconds left — but this time a teammate is standing wide open in the corner.",
    choices: [
      { id: "iso_score", label: "Go isolation, take it yourself", successChance: 0.30, icon: "flair",
        winNote: "You rise up over the defense and bury it. Bedlam on the bench.",
        loseNote: "The shot doesn't fall. You had it in your hands, and it slips away." },
      { id: "pass_teammate", label: "Kick it out to the open man", successChance: 0.70, icon: "passArrow",
        winNote: "He catches, sets, buries it. Trusting the extra pass wins the game.",
        loseNote: "He airballs the open look. Brutal way for it to end, but it was the right read." },
    ],
  },
  {
    id: "clutch_free_throws",
    title: "Two Free Throws, Down One",
    desc: "No time left on the clock. You're at the line for two shots, trailing by one. The first one drops — tied. Everything comes down to the second.",
    choices: [
      { id: "routine", label: "Full routine — dribble, breathe, shoot", successChance: 0.62, icon: "balance",
        winNote: "Same routine as always. It falls clean — your team escapes with the win.",
        loseNote: "The routine doesn't save it this time — it rims out. Overtime, and your legs feel it." },
      { id: "quick_trigger", label: "Quick trigger — no hesitation", successChance: 0.52, icon: "flame",
        winNote: "No time to think, no time to miss. It's in.",
        loseNote: "Rushed it, and it shows. Short off the back rim." },
    ],
  },
];

const EVENT_POOL = [
  { id: "trials", stages: ["youth"], title: "State Selection Trials", scene: "gym_training",
    desc: "The state youth coach is running trials for the SUKMA squad this week.",
    choices: [
      { label: "Push through the extra reps", icon: "flame", stats: { athleticism: 2 }, fatigue: 15, relationships: { coach: 5 },
        result: "You out-work everyone on the floor. Coach notices your engine." },
      { label: "Pace yourself and stay sharp", icon: "balance", stats: { iq: 2 }, fatigue: 5,
        result: "Smart and controlled — you make the squad without burning out." },
    ]},
  { id: "media_day", stages: ["amateur", "pro"], title: "Media Day", scene: "press_media", brandLogo: true,
    desc: "A local basketball media outlet — Prime Court — wants a quote about your season.",
    choices: [
      { label: "Give a confident soundbite", icon: "megaphone", popularity: 8, relationships: { coach: -3 },
        result: "The clip does numbers online. Coach mutters about keeping your head level." },
      { label: "Credit the team", icon: "team", popularity: 3, relationships: { coach: 5, team: 5 },
        result: "Low-key and professional. Your teammates appreciate it." },
    ]},
  { id: "sponsor_local", stages: ["amateur", "pro"], financial: true, title: "Sportswear Offer", scene: "contract_signing",
    desc: "A homegrown sportswear brand wants to sponsor your boots and gear.",
    choices: [
      { label: "Sign the deal", icon: "penCheck", money: 3000, fatigue: 5,
        result: "Extra cash in the pocket — extra appearances on the calendar." },
      { label: "Hold out for a bigger brand", icon: "clockWait", popularity: -2,
        result: "You pass. The brand signs a rival instead." },
    ]},
  { id: "ankle_scare", stages: ["youth", "amateur", "pro"], title: "Ankle Scare", scene: "medical",
    desc: "You rolled your ankle in practice. It aches, but it might just be minor.",
    choices: [
      { label: "Sit out and rest it properly", icon: "bed", fatigue: -20,
        result: "You recover fully. No lingering setback." },
      { label: "Play through it", icon: "run", fatigue: 10, stats: { athleticism: -3 }, relationships: { coach: 4 },
        result: "You gut it out — but the ankle nags at you the rest of the season." },
    ]},
  { id: "rival_trash_talk", stages: ["amateur", "pro"], title: "Rival Beef", scene: "confrontation",
    desc: "A rising star from a rival team calls you out in an interview.",
    choices: [
      { label: "Clap back publicly", icon: "megaphone", popularity: 6, morale: 5, relationships: { coach: -4 },
        result: "The rivalry sells tickets. Coach isn't thrilled about the drama." },
      { label: "Let your game answer", icon: "hoopShot", stats: { iq: 1 }, relationships: { coach: 4 },
        result: "You stay quiet — and it fuels a monster performance." },
    ]},
  { id: "film_study", stages: ["amateur", "pro"], title: "Extra Film Session", scene: "video_analysis",
    desc: "Your coach wants you in early for extra film study before games.",
    choices: [
      { label: "Show up early, every time", icon: "checkYes", stats: { iq: 3 }, fatigue: 8, relationships: { coach: 6 },
        result: "You start seeing the game a full step ahead." },
      { label: "Skip it, protect your rest", icon: "bed", fatigue: -5, relationships: { coach: -5 },
        result: "Coach notices. You feel fresher, at least." },
    ]},
  { id: "overseas_scout", stages: ["pro"], minAge: 22, minOverall: 75, notAbroad: true, title: "Scouts Are Watching", scene: "scouting",
    desc: "Scouts from an overseas league are in the stands this week.",
    choices: [
      // guaranteesOverseasOffer: "Play to impress" has no risk tiers (see
      // spec sheet — it's a flat Guaranteed effect), so success = whenever
      // this is picked. Raised minOverall to 75 (above the Asia Pro tier's
      // own 70 floor) so this guarantee is a genuine step up from the
      // normal ~88%-per-season roll, not just a free skip of it the first
      // moment a player becomes eligible.
      { label: "Play to impress", icon: "star", fatigue: 12, popularity: 6, guaranteesOverseasOffer: true,
        result: "You ball out. Word travels fast — scouts abroad are taking notes." },
      { label: "Stick to the game plan", icon: "clipboard", relationships: { coach: 6, team: 4 },
        result: "You trust the system. Your team wins, quietly." },
    ]},
  /* Team Chemistry pays off / costs you — the relationship itself was
     previously read only for release/offer risk, with no direct payoff a
     player could see or chase. These two give it one in each direction,
     reusing the same event infrastructure (gating, choice deltas, result
     text) as everything else in this pool rather than a parallel system. */
  { id: "mentor_moment", stages: ["pro"], notAbroad: true, requiresClub: true, minTeamRelationship: 70,
    title: "A Veteran Pulls You Aside", scene: "debate",
    desc: "Your team's longest-tenured player has noticed the work you put in. He offers extra film sessions — no cameras, no coaches, just the two of you.",
    choices: [
      { label: "Take him up on it", icon: "whistle", stats: { iq: 4 }, relationships: { team: 8 },
        result: "Hours of film later, the game slows down for you in ways it hadn't before." },
      { label: "Stick to your own routine", icon: "dumbbell", relationships: { team: -2 },
        result: "You trust your own process. He doesn't ask twice." },
    ]},
  { id: "trade_rumors", stages: ["pro"], notAbroad: true, requiresClub: true, maxTeamRelationship: 30,
    title: "Trade Rumors", scene: "confrontation",
    desc: "Word's gotten back to you: the front office has taken calls about moving you. You can force the issue, or try to fix it from the inside.",
    choices: [
      { label: "Request the trade", icon: "doorExit", flag: "requestTrade",
        result: "You make it known you want out. Your agent starts making calls — a transfer window opens this season." },
      { label: "Fight for your spot", icon: "raisedHand", relationships: { team: 10 }, fatigue: 6,
        result: "You put your head down and work. Slowly, the room starts to believe in you again." },
    ]},
  { id: "family_event", stages: ["youth", "amateur", "pro"], title: "Family Occasion", scene: "family_home",
    desc: "Your family has a big gathering the same week as training camp.",
    choices: [
      { label: "Go home for it", icon: "houseHeart", relationships: { family: 10 }, fatigue: -5,
        result: "You needed that. You come back grounded." },
      { label: "Stay and train", icon: "dumbbell", relationships: { family: -8 }, stats: { athleticism: 2 },
        result: "Gains on the court, distance at home." },
    ]},
  { id: "contract_talk", stages: ["pro"], financial: true, title: "Contract Talks", scene: "negotiation_table",
    desc: "Your agent says the club is open to renegotiating your deal.",
    choices: [
      { label: "Push hard for more money", icon: "dollarUp", money: 5000, relationships: { coach: -4 },
        result: "You get paid. Management remembers the ask." },
      { label: "Take a fair, modest raise", icon: "handshake", money: 2000, relationships: { coach: 5 },
        result: "Everyone leaves the table happy." },
    ]},
  { id: "charity", stages: ["pro"], title: "Charity Match Invitation", scene: "charity_jersey",
    desc: "Organizers want you for a charity exhibition game.",
    choices: [
      { label: "Show up and show out", icon: "star", popularity: 8, fatigue: 8,
        result: "Great PR — fans love seeing you give back." },
      { label: "Pass, protect your body", icon: "shieldCheck", fatigue: -5,
        result: "Nobody notices. You stay fresh." },
    ]},
  { id: "teammate_conflict", stages: ["amateur", "pro"], title: "Locker Room Tension", scene: "locker_room",
    desc: "Two teammates are feuding over minutes, dragging the vibe down.",
    choices: [
      { label: "Step in and mediate", icon: "handshake", relationships: { team: 10 }, fatigue: 5,
        result: "You play peacemaker. The locker room resets." },
      { label: "Stay out of it", icon: "doorExit", relationships: { team: -4 },
        result: "Not your circus. The tension lingers a while." },
    ]},
  { id: "preseason_camp", stages: ["pro"], financial: true, title: "Off-Season Skills Camp", scene: "weight_room",
    desc: "A pricey off-season camp abroad promises real development.",
    choices: [
      { label: "Pay your way in", icon: "dollarUp", money: -4000, stats: { shooting: 2, athleticism: 2 },
        result: "Worth every ringgit — you come back sharper." },
      { label: "Train at home instead", icon: "dumbbell", stats: { iq: 1 },
        result: "Cheaper and familiar, still useful." },
    ]},
  { id: "documentary", stages: ["pro"], minOverall: 74, title: "Documentary Offer", scene: "documentary_film",
    desc: "A streaming platform wants to film a season-long documentary on your career.",
    choices: [
      { label: "Let them in", icon: "cameraOpen", popularity: 15, relationships: { family: -5 },
        result: "Your profile explodes. Your family isn't thrilled about the cameras." },
      { label: "Keep it private", icon: "lock", relationships: { family: 5 },
        result: "You protect your peace. The opportunity passes." },
    ]},
  { id: "clutch_moment", stages: ["youth", "amateur", "pro"], title: "Clutch Moment", scene: "clutch_pressure",
    desc: "Down one, three seconds left, ball in your hands.",
    choices: [
      { label: "Take the shot", icon: "hoopShot", stats: { iq: 1 }, popularity: 6, morale: 8,
        result: "Bottom of the net. Your name is on every group chat tonight." },
      { label: "Pass to the open man", icon: "passArrow", relationships: { team: 8 }, morale: 3,
        result: "The extra pass wins the game. Your teammates won't forget it." },
    ]},
  { id: "injury_major", stages: ["pro"], minAge: 26, title: "Serious Injury Scare", scene: "hospital_care",
    desc: "You feel something pop during a hard drive to the rim.",
    choices: [
      { label: "Get it done properly — surgery", icon: "scalpel", fatigue: 30, stats: { athleticism: -5 }, money: -3000,
        result: "A long road back, but you do it right." },
      { label: "Try rehab without surgery", icon: "stretch", fatigue: 15, stats: { athleticism: -2 },
        result: "Faster return, but it never quite feels the same." },
    ]},

  /* ============================================================
     PROBABILITY-BRANCHED EVENTS (with hidden achievements)
     Each choice below carries an `outcomes` array of weighted tiers
     (success / failure / critical) instead of a single fixed result.
     See handleChooseEvent for resolution logic.
  ============================================================ */
  { id: "mamak_night", stages: ["youth", "amateur", "pro"], title: "Mamak Session", scene: "mamak_table",
    desc: "The squad's heading to the mamak after a brutal practice, the night before a big fixture. Roti canai, teh tarik, and loud voices till 2am.",
    choices: [
      { label: "Go all in — stay till closing", icon: "moonClock", risk: "risky",
        outcomes: [
          { tier: "success", chance: 0.50, relationships: { team: 15 }, popularity: 6, morale: 10, fatigue: 8,
            achievement: "mamak_warrior",
            result: "Three hours of teh tarik and trash talk forges something real. The squad plays for each other the next day — you can feel it on the floor." },
          { tier: "failure", chance: 0.40, fatigue: 18, morale: -4, stats: { iq: -2 },
            result: "You're running on two hours of sleep and roti canai grease. Legs feel like concrete at practice." },
          { tier: "critical", chance: 0.10, fatigue: 28, morale: -10, relationships: { coach: -12 }, stats: { athleticism: -3 },
            result: "Coach catches you stumbling in at 3am on CCTV. You're benched for the next fixture — old-school discipline, no exceptions." },
        ]},
      { label: "Say hi, then head home early", icon: "doorExit", risk: "safe",
        outcomes: [
          { tier: "success", chance: 0.85, relationships: { team: 4 }, fatigue: -5,
            result: "You keep it brief and get real rest. Nobody's mad, nobody's especially close either." },
          { tier: "failure", chance: 0.13, relationships: { team: -3 },
            result: "A few teammates clock you as standoffish for bailing early." },
          { tier: "critical", chance: 0.02, relationships: { team: -8, coach: 2 },
            result: "The team starts calling you 'the robot' behind your back. It stings more than you expected." },
        ]},
    ]},

  { id: "analytics_offer", stages: ["pro"], financial: true, minAge: 20, title: "The Analytics Pitch", scene: "data_chart",
    desc: "A sports-data startup wants to overhaul your training with shot-charting, load management, and cold, hard numbers. Your old-school coach thinks it's nonsense — 'ball don't lie, spreadsheets do.'",
    choices: [
      { label: "Commit to the data-driven program", icon: "chartUp", risk: "risky",
        outcomes: [
          { tier: "success", chance: 0.45, stats: { shooting: 4, iq: 3 }, money: 2000, relationships: { coach: -6 },
            achievement: "moneyball_mastermind",
            result: "The numbers were right. Your shot selection transforms and your efficiency jumps — even coach grudgingly checks the printouts now." },
          { tier: "failure", chance: 0.40, stats: { shooting: 1 }, fatigue: 10, relationships: { coach: -8 },
            result: "The program overhauls your mechanics mid-season. Marginal gains, and coach is openly annoyed you're 'overthinking a simple game.'" },
          { tier: "critical", chance: 0.15, stats: { shooting: -4, iq: -2 }, relationships: { coach: -15, team: -5 }, morale: -12,
            result: "You break your natural rhythm chasing 'optimal' release angles. Slump city. Coach benches you and tells the press you 'lost the plot.'" },
        ]},
      { label: "Stick with the coach's old-school methods", icon: "whistle", risk: "safe",
        outcomes: [
          { tier: "success", chance: 0.85, stats: { iq: 1 }, relationships: { coach: 8 },
            result: "Fundamentals, repetition, respect. Coach trusts you more for staying loyal to the process." },
          { tier: "failure", chance: 0.13, stats: {},
            result: "Steady as ever — you don't improve much, but you don't regress either." },
          { tier: "critical", chance: 0.02, relationships: { coach: 4 }, morale: -6,
            result: "You quietly wonder if you're falling behind players embracing modern training. Coach is happy, though." },
        ]},
    ]},

  { id: "outdoor_court_grind", stages: ["youth", "amateur"], title: "Night Runs on Cracked Concrete", scene: "street_court",
    desc: "Coach wants extra reps — tonight, on the badly lit outdoor court behind the community hall. Cracked concrete, one working floodlight, zero cushioning.",
    choices: [
      { label: "Go all-out, full intensity", icon: "flame", risk: "risky",
        outcomes: [
          { tier: "success", chance: 0.50, stats: { athleticism: 5, defense: 2 }, relationships: { coach: 8 }, popularity: 4,
            achievement: "glass_cannon",
            result: "You drop 40 on a court that's basically a hazard zone. Word spreads fast — 'that kid balls on anything.'" },
          { tier: "failure", chance: 0.40, fatigue: 15, stats: { athleticism: -2 },
            result: "You roll an ankle stepping in a crack you couldn't see. Sore, swollen, nothing serious — just a rough night." },
          { tier: "critical", chance: 0.10, stats: { athleticism: -15, rebounding: -5 }, fatigue: 35, morale: -20,
            result: "Your knee buckles awkwardly on the uneven surface. It's a serious ligament tear — the kind of injury that ends seasons and, sometimes, quietly ends careers on courts like this one." },
        ]},
      { label: "Do a controlled, lighter session", icon: "balance", risk: "safe",
        outcomes: [
          { tier: "success", chance: 0.85, stats: { athleticism: 1 }, relationships: { coach: 2 },
            result: "Smart and unspectacular. You get the work in without rolling the dice." },
          { tier: "failure", chance: 0.13, relationships: { coach: -3 },
            result: "Coach mutters that you're 'not hungry enough' for playing it safe." },
          { tier: "critical", chance: 0.02, fatigue: 10, relationships: { coach: -6 },
            result: "You still catch your foot on a crack even going easy. Some courts just aren't safe, full stop." },
        ]},
    ]},

  { id: "kampung_homecoming", stages: ["youth", "amateur", "pro"], financial: true, title: "Kampung Homecoming", scene: "kampung_village",
    desc: "Your childhood coach invites you back to run a free clinic for kids on the dusty kampung court where you first picked up a ball — same week a paid corporate appearance is on offer across town.",
    choices: [
      { label: "Go home — run the free clinic", icon: "handHeart", risk: "risky",
        outcomes: [
          { tier: "success", chance: 0.50, popularity: 14, morale: 12, relationships: { family: 10 },
            achievement: "kampung_legend",
            result: "Photos of you coaching barefoot kids on that same dusty court go viral for all the right reasons. 'Never forgot where he came from' — the headline writes itself." },
          { tier: "failure", chance: 0.40, popularity: -1, money: -500,
            result: "It rains the whole session, turnout is thin, and you're out the travel cost. Sweet gesture, mostly unseen." },
          { tier: "critical", chance: 0.10, money: -1500, relationships: { family: -4 }, morale: -6,
            result: "The corporate brand you skipped publicly drops you as 'unreliable.' Your family also wonders aloud why you keep turning down paid work for free clinics." },
        ]},
      { label: "Take the paid corporate appearance", icon: "tieDollar", risk: "safe",
        outcomes: [
          { tier: "success", chance: 0.85, money: 4000, popularity: 3,
            result: "Easy money, professional, forgettable. The brand's happy." },
          { tier: "failure", chance: 0.13, money: 2000, relationships: { family: -3 },
            result: "The event undersells you and the pay is lower than promised. Family notes you missed the kampung clinic for this." },
          { tier: "critical", chance: 0.02, money: 1000, relationships: { family: -8 }, popularity: -3,
            result: "A clip of you looking bored at the corporate event goes around. Meanwhile your old coach quietly stops calling." },
        ]},
    ]},

  { id: "scholarship_standoff", stages: ["youth"], minAge: 16, title: "The Old-School Standoff", scene: "debate",
    desc: "Your coach benches you for 'playing too flashy' and gives an ultimatum: fall in line in front of the state scouts this weekend, or keep playing your instinctive, highlight-reel game and risk your scholarship spot entirely.",
    choices: [
      { label: "Defy him — play your natural game", icon: "flair", risk: "risky",
        outcomes: [
          { tier: "success", chance: 0.45, stats: { playmaking: 4, athleticism: 2 }, popularity: 10, relationships: { coach: -10 },
            achievement: "rebels_crossover",
            result: "You cross an opponent so hard he falls down, then hit the dagger three. Scouts in the stands are already texting each other. Coach is furious but can't argue with the result." },
          { tier: "failure", chance: 0.35, relationships: { coach: -15 }, morale: -10,
            result: "The flash plays don't land this time — a couple of turnovers in front of the exact people you wanted to impress. Coach isn't shy about saying 'I told you so.'" },
          { tier: "critical", chance: 0.20, relationships: { coach: -25, family: -8 }, morale: -20, stats: { iq: -3 },
            result: "Coach pulls you at halftime and reports 'attitude problems' to the state programme. Your scholarship spot for next season is quietly reassigned to someone more 'coachable.'" },
        ]},
      { label: "Fall in line, play the disciplined system", icon: "rulebook", risk: "safe",
        outcomes: [
          { tier: "success", chance: 0.85, relationships: { coach: 10 }, stats: { iq: 2 },
            result: "Boring, effective, exactly what was asked. Your scholarship is safe and coach's trust is restored." },
          { tier: "failure", chance: 0.13, stats: { playmaking: -1 }, morale: -4,
            result: "You suppress your instincts so hard you look hesitant out there. Scouts don't see much to remember." },
          { tier: "critical", chance: 0.02, morale: -10, relationships: { coach: 5 },
            result: "You play it so safe you barely register with the scouts at all — coach is pleased, but you wonder what you gave up." },
        ]},
    ]},

  { id: "underground_3x3", stages: ["amateur", "pro"], financial: true, minAge: 19, title: "Underground Cash Tournament", scene: "street_cash",
    desc: "A friend invites you to an unsanctioned underground 3x3 tournament — street ballers, real cash on the line, no club insurance, no medical staff, no rules against 'physical' defense.",
    choices: [
      { label: "Enter the tournament", icon: "trophyCash", risk: "risky",
        outcomes: [
          { tier: "success", chance: 0.45, money: 5000, popularity: 8, stats: { athleticism: 2, defense: 2 },
            achievement: "street_king",
            result: "You run the table against grown men who've been playing street ball since before you were born. Cash in hand, and the street-ball crowd knows your name now." },
          { tier: "failure", chance: 0.40, fatigue: 20, stats: { athleticism: -2 }, money: -200,
            result: "You get bodied by bigger, rougher players all night and bow out early. Entry fee gone, pride bruised." },
          { tier: "critical", chance: 0.15, stats: { athleticism: -10, defense: -3 }, fatigue: 30, money: -500, relationships: { coach: -10 },
            result: "An undercut on a fast break sends you hard into the concrete. No medic on site, no insurance, and your club finds out you were playing unsanctioned street ball off the books." },
        ]},
      { label: "Skip it, stay in club-sanctioned shape", icon: "shieldCheck", risk: "safe",
        outcomes: [
          { tier: "success", chance: 0.85, fatigue: -5, relationships: { coach: 3 },
            result: "You rest up instead. Nothing gained, nothing risked." },
          { tier: "failure", chance: 0.13, popularity: -1,
            result: "Friends give you grief for 'playing it too safe.' No real cost beyond some banter." },
          { tier: "critical", chance: 0.02, relationships: { team: -3 },
            result: "Word gets around that you turned down your crew to 'protect your career.' A few street-ball friends keep their distance now." },
        ]},
    ]},

  { id: "viral_clip", stages: ["amateur", "pro"], minAge: 17, title: "You Went Viral", scene: "social_media", brandLogo: true,
    desc: "Local basketball media outlet Prime Court posted a clip from last week's game — hundreds of thousands of views overnight. Comments are split between hype and hate.",
    choices: [
      { label: "Lean into it, post a follow-up", icon: "phoneTrend", risk: "risky",
        outcomes: [
          { tier: "success", chance: 0.5, popularity: 14, money: 800,
            result: "Your follow-up post takes off too. Brands are sliding into your DMs." },
          { tier: "failure", chance: 0.35, popularity: -4,
            result: "The follow-up flops and feels try-hard. The moment passes awkwardly." },
          { tier: "critical", chance: 0.15, popularity: -9, relationships: { coach: -6 },
            result: "You say something in the caption that ages badly. Your coach pulls you aside about 'managing your brand.'" },
        ]},
      { label: "Stay quiet, let it speak for itself", icon: "phoneMute", risk: "safe",
        outcomes: [
          { tier: "success", chance: 0.85, popularity: 6, relationships: { coach: 2 },
            result: "You let your game do the talking. Coach appreciates the level head." },
          { tier: "failure", chance: 0.15, popularity: 1,
            result: "The moment fades fast without any follow-up. Onto the next game." },
        ]},
    ]},

  { id: "new_head_coach", stages: ["pro"], minAge: 18, title: "New Head Coach", scene: "coach_meeting", 
    desc: "Your club just fired the head coach mid-season. The new hire is reshuffling rotations and wants a private meeting with every player.",
    choices: [
      { label: "Make your case for more minutes", icon: "raisedHand", risk: "risky",
        outcomes: [
          { tier: "success", chance: 0.4, relationships: { coach: 10 }, stats: { iq: 1 },
            result: "The new coach respects the directness and pencils you in for a bigger role." },
          { tier: "failure", chance: 0.45, relationships: { coach: -6 },
            result: "It comes across as entitled before you've even played a game for him." },
          { tier: "critical", chance: 0.15, relationships: { coach: -14 }, morale: -8,
            result: "He tells you flatly to earn it first. The meeting ends cold." },
        ]},
      { label: "Just say you're ready to work", icon: "handshake", risk: "safe",
        outcomes: [
          { tier: "success", chance: 0.85, relationships: { coach: 5 },
            result: "Simple, professional, no red flags. He appreciates the low-maintenance approach." },
          { tier: "failure", chance: 0.15, relationships: { coach: 1 },
            result: "Forgettable meeting. You're a blank slate to him for now." },
        ]},
    ]},

  { id: "close_call", stages: ["pro"], minAge: 18, title: "Ankle Roll — Scary Landing", scene: "court_fall", 
    desc: "You come down awkwardly off a rebound and the ankle rolls hard. It doesn't feel right, but the adrenaline's masking how bad it is.",
    choices: [
      { label: "Play through it", icon: "run", risk: "risky",
        outcomes: [
          { tier: "success", chance: 0.45, relationships: { coach: 6, team: 4 },
            result: "It loosens up and you finish the game. Toughness noted by everyone in the locker room." },
          { tier: "failure", chance: 0.35, fatigue: 15, stats: { athleticism: -2 },
            result: "You grit through it, but you're clearly compromised the rest of the way." },
          { tier: "critical", chance: 0.2, stats: { athleticism: -8 }, fatigue: 25, slowStart: true,
            result: "You aggravate it badly trying to push through. It's going to slow your start to next season." },
        ]},
      { label: "Come out immediately", icon: "stopHand", risk: "safe",
        outcomes: [
          { tier: "success", chance: 0.9, relationships: { coach: 2 },
            result: "Smart call — it's just a mild tweak. You're back within the week." },
          { tier: "failure", chance: 0.1, relationships: { team: -2 },
            result: "A couple of teammates mutter about you being 'soft.' It stings, but your ankle's fine." },
        ]},
    ]},

  { id: "endorsement_offer", stages: ["pro"], financial: true, minAge: 19, minOverall: 55, title: "Local Brand Wants You", scene: "brand_deal", 
    desc: "A Malaysian sportswear brand offers you a modest endorsement deal — decent money, but the contract has an exclusivity clause locking you to them for two years.",
    choices: [
      { label: "Sign it", icon: "penCheck", fatigue: 0, money: 12000, popularity: 5, relationships: { coach: 1 },
        result: "You sign. Steady extra income, and your face is on a billboard in your hometown now." },
      { label: "Hold out for a bigger offer", icon: "clockWait", risk: "risky",
        outcomes: [
          { tier: "success", chance: 0.35, money: 28000, popularity: 10,
            result: "A bigger brand comes calling a few weeks later. The patience pays off." },
          { tier: "failure", chance: 0.5, money: 0,
            result: "No better offer materializes, and the original deal's already gone to someone else." },
          { tier: "critical", chance: 0.15, popularity: -3,
            result: "Word gets around that you turned down good money and got nothing. A little embarrassing." },
        ]},
    ]},

  { id: "family_milestone", stages: ["youth", "amateur", "pro"], title: "Family Milestone", scene: "family_home", 
    desc: "It's your parents' anniversary, and they've asked you to come home for the celebration — but it clashes with a scheduled team session.",
    choices: [
      { label: "Go home for it", icon: "houseHeart", relationships: { family: 12, coach: -3 }, morale: 8,
        result: "You make it home. Your family means everything, and it shows in how they look at you." },
      { label: "Stay and train", icon: "dumbbell", relationships: { family: -6, coach: 4 }, stats: { iq: 1 },
        result: "You stay behind and put in the work. Coach notices the dedication; home notices the absence." },
    ]},

  { id: "contract_leverage", stages: ["pro"], financial: true, minAge: 20, minOverall: 62, title: "Agent Wants to Push for More", scene: "agent_leverage", 
    desc: "Your agent thinks you're being underpaid relative to your production and wants to go public with a trade request to force your club's hand.",
    choices: [
      { label: "Let him go public", icon: "megaphone", risk: "risky",
        outcomes: [
          { tier: "success", chance: 0.4, money: 15000, popularity: 6,
            result: "The pressure works — the club renegotiates rather than risk losing you for nothing." },
          { tier: "failure", chance: 0.4, relationships: { coach: -10, team: -5 },
            result: "The club calls your bluff. Nothing changes except how the locker room sees you now." },
          { tier: "critical", chance: 0.2, relationships: { coach: -16 }, morale: -10,
            result: "Management is furious at being pressured in the media. Your minutes quietly shrink." },
        ]},
      { label: "Handle it quietly, internally", icon: "lock", risk: "safe",
        outcomes: [
          { tier: "success", chance: 0.6, money: 6000, relationships: { coach: 2 },
            result: "A private conversation gets you a modest bump without burning any bridges." },
          { tier: "failure", chance: 0.4, money: 0,
            result: "Management hears you out politely and changes nothing." },
        ]},
    ]},

  { id: "community_clinic", stages: ["amateur", "pro"], title: "Community Clinic Invite", scene: "community_kids", 
    desc: "A community center in a lower-income neighborhood asks you to run a free weekend basketball clinic for local kids.",
    choices: [
      { label: "Say yes", icon: "checkYes", fatigue: 10, popularity: 9, relationships: { family: 4 },
        result: "The kids' faces say it all. Local papers pick up a small feature on it — good, honest exposure." },
      { label: "Politely decline — you need the rest", icon: "bed", fatigue: -8, popularity: -1,
        result: "You prioritize recovery. Nobody blames you, but the invite doesn't come around again." },
    ]},
];

/* ---------------------------------------------------------
   STATE FLAG ICONS (official flag images)
--------------------------------------------------------- */
const FLAG_IMAGES = {
  "Johor": "data:image/webp;base64,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wX/wH/wH/8F/8B/8B//Bf/Af/Af/wX/wH/wH/8F/8B/8B//Bf/Af/Af/wX/wH/wH/8F/8B/8B//Bf/Af/Af/wX/wH/wH/8F/8B/8B//Bf/Af/Af/wX/wH/wH/8F/8B/8B//Bf/Af/Af/wX/wH/wH/8F/8B/8B//Bf/Af/Af/wX/wH/wH/8F/8B/8B//Bf6Y+8D/8D//D//A//A//w//wP/wP/8P/8D/8D//D//A//A//w//wP/wP/8P/8D/8D//D//A//A//w//wP/wP/8P/8D/8D//D//A//A//w//wP/wP/8P/8D/8D//D//A//A//w//wP/wP/8P/8D/8D//D//A//A//w//wP/wP/8P/8D/8D//D//A//A//w//wP/wP/8P/8D/8D//D//A//A//w//wP/wP/8P/8D/8D//D//A//A//w//wP/wP/8P/8D/8D//D//A//A//w//wP/wP/8P/8D/8D//D//A//A//w//wP/wP/8P/8D/8D//D//A//A//w//wP/wP/8P/8D/8D//D//A//A//w//wP/wP/8P/8D/8D//D//A//A//w//wP/wP/8P/8D/8D//D//A//A//w//wP/wP/8P/8D/8D//D//A//A//w//wP/wP/8P/8D/8D//D//A//A//w//wP/wP/8P/8D/8D//D//A//A//w//wP/wP/8P/8D/8D//D//A//A//w//wP/wP/8P/8D/8D//D//A//A//w//wP/wP/8P/8D/8D//D//A//A//w//wP/wP/8P/8D/8D//D//A//A//w//wP/wP/8P/8D/8D//D//A//A//w//wP/wP/8P/8D/8D//D//A//A//w//wP/wP/8P/8D/8D//D//A//A//w//wP/wP/8P/8D/8D//D//A//A//w//wP/wP/8P/8D/8D//D//A//A//w//wP/wP/8P/8D/8D//D//A//A//w//wP/wP/8P/8D/8D//D//A//A//w//wP/wP/8P/8D/8D//D//A//A//w//wP/wP/8P/8D/8D//D//A//A//w//wP/wP/8P/8D/8D//D//A//A//w//wP/wP/8P/8D/8D//D//A//A//w//wP/wP/8P/8D/8D//D//A//A//w//wP/wP/8P/8D/8D//D//A//A//w//wP/wP/8P/8D/8D//D//A//A//w//wP/wP/8P/8D/8D//D//A//A//w//wP/wP/8P/8D/8D//D//A//A//w//wP/wP/8P/8D/8D//D//A//A//w//wP/wP/8P/8D/8D//D//A//A//w//wP/wP/8P/8D/8D//D//A//A//w//wP/wP/8P/8D/8D//D//A//A//w//wP/wP/8P/8D/8D//D//A//A//w//wP/wP/8P/8D/8D//D//A//A//w//wP/wP/8P/8D/8D//D//A//A//w//wP/wP/8P/8D/8D//D//A//A//w//wP/wP/8P/8D/8D//D//A//A//w//wP/wP/8P/8D/8D//D//A//A//w//wP/wP/8P/8D/8D//D//A//A//w//wP/wP/8P/8D/8D//D//A//A//w//wP/wP/8P/chU=",
  "Kedah": "data:image/png;base64,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",
  "Kelantan": "data:image/webp;base64,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",
  "Kuala Lumpur": "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4NCjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iMTIwMCIgaGVpZ2h0PSI2MDAiIHZpZXdCb3g9IjAgMCA1Mzc2IDI2ODgiPg0KPHJlY3QgZmlsbD0iI2ZmZiIgd2lkdGg9IjUzNzYiIGhlaWdodD0iMjY4OCIvPg0KPHJlY3QgZmlsbD0iIzAwMzU2YSIgeT0iODk2IiB3aWR0aD0iNTM3NiIgaGVpZ2h0PSI4OTYiLz4NCjxwYXRoIHN0cm9rZT0iI2RjMjQxZiIgc3Ryb2tlLXdpZHRoPSIxMjgiIGQ9Ik0wLDE5Mmg1Mzc2IE0wLDQ0OGg1Mzc2IE0wLDcwNGg1Mzc2IE0wLDE5ODRoNTM3NiBNMCwyMjQwaDUzNzYgTTAsMjQ5Nmg1Mzc2Ii8+DQo8cGF0aCBmaWxsPSIjZmZkMTAwIiBkPSJtIDEzNDMuODc1MSwxMDYzLjk5OTkgMjQuOTY2NiwxNzAuODAwMSA5Ni42MDAxLC0xNDMuMDMzNCAtNTEuOCwxNjQuNzMzMyAxNDkuMSwtODcuMDMzMiAtMTE4LjA2NjYsMTI2IDE3Mi4xOTk4LC0xMy43NjY4IC0xNjEsNjIuMyAxNjEsNjIuMyAtMTcyLjE5OTgsLTEzLjc2NjUgMTE4LjA2NjYsMTI2IC0xNDkuMSwtODcuMDMzMyA1MS44LDE2NC43MzMxIC05Ni42MDAxLC0xNDMuMDMzMiAtMjQuOTY2NiwxNzAuNzk5OCAtMjQuOTY2NiwtMTcwLjc5OTggLTk2LjYsMTQzLjAzMzIgNTEuNzk5OSwtMTY0LjczMzEgLTE0OS4wOTk5LDg3LjAzMzMgMTE4LjA2NjYsLTEyNiAtMTcyLjIwMDIsMTMuNzY2NSAxNjEsLTYyLjMgLTE2MSwtNjIuMyAxNzIuMjAwMiwxMy43NjY4IC0xMTguMDY2NiwtMTI2IDE0OS4wOTk5LDg3LjAzMzIgLTUxLjc5OTksLTE2NC43MzMzIDk2LjYsMTQzLjAzMzQgeiBNIDEyMDMuODc1LDEwNzEgYSAyOTguNjY2NjcsMjk4LjY2NjY3IDAgMSAwIDAsNTQ2IDMzNiwzMzYgMCAxIDEgMCwtNTQ2IHoiLz4NCjwvc3ZnPg==",
  "Labuan": "data:image/webp;base64,UklGRrhzAABXRUJQVlA4TKtzAAAv/87fAWpSGwBBAsL/T9utW0RMAL5uCArJCcIG0ZS2kfb4LPT4XIOJHM/ZdBYTsIDjusXIJUxhaElKaU5AgmJMKAASPrAV6f/X3272kj0w7IAXQDaLYFhEfJYRnyhmTpbAzJcCh+fO/wmDQpWJZgaVYeZEx9M3nJzJCnAB14bhLuDMldFR0XRywolitIyKbfw/zJwNYEl1E6Q6dVHV8WXm1l91ZVQVs70rKKvuoPqq7qCWVlDJoKMKR5Vbx9VHVQVUSdVWMYPjSq5lpjUcW9WJqmOmY8t0lnBVpy6baBhsyQXVUeVW/bdxVW1VFXeGTW3tTTJWH1kjoiIBLb2jBQ1YYUME2R7T2tqbpMnEx0Vx2KDjkLjem0P14ZiCGVA4HK73fwIwKfs/T26kS/auz9j36OU8reYT9K7XZadc04f8fhe/xghP1GBEHiRRTaIIAqFdHSAwqsnGmORLX0GImssYoTv0VqiNCaIm4zskqrlEEiRBHaH2Mm61ezJCd0hEEKhm6RAhTA1JIIyIS/RsEk89GaE7BIlqHoRukqjmwYjo6QTqqeZRdxCqQbiFETpBDydIbEyNickD1C5RuSYhhHLXq2nXq0CIJKhZxKovkNRgTHZghO6QiELUIBPkRYIkMcbGGBF3EEYkQWGMSPociTA1D0Z3+CJkClGjSOhlLxMRNRljRB4kMaLmwbpCA5kwRCoB5BfIOTYBAKTBEvipGQgAIVwr7Fy5hVmS/k+A5WrbljlygpHGTINmtd1whhqHmZmZmZmZNB7u4wYzM8mn01LVXzX0fv9fx+f7lEeZJwtTnaMsTFqoF08S6oWZ3SloY2Z3Et/GTFHUojYVhanPqUDMdkdhZpQWHYA2ZnswjtpUJh1KmdLA6oVqUUmY2eqFUhiQFtoojtrUpvMw5YH/ouKwFrUZqhBMwzwTRS3KbE8chlYonYkWqjRaix6eMSgAMzN2EiZtHAYAkDT//wjC6O40GANJkprmReHIORxJ6P8E2JX2f73c5mYCXUrbKzMzMzMzMzMzo8zMzCBHeFd7zv8c0ff3/zf/X7D2bKXZcR3OmdTqA+YK+8B3wtH4CjxhjuqAsjNypStQ2qgK9KtKM0d16CjUGqvQVoE+lekEtFegKurMLTO7TWWq1Ae2CuxsoT5wwgy1ZsdlqObszFa+A1WmKnegSjPHXIc5O6qDhq0MW4d2TJWuwKpTuQ2uwjuqzV04PZnWYeipMqkyqQ3pVIaKca/AFVbKFagy7Bhb5h2N6zDDN9Azk6l3FdwZCbRtm3Zj2/oxhm3bdoatH9u2+WNbdRvd2u2wFdv6tkPbtk1VW6/7brZ9e9m2bdu20f8J8Gf+/765/f/tf2+v8/Pz8/Pz8/OTP5rM8Xw+HvfH8zhe88eDiIqqipiFjIiqOozIHkZEVKtq3PcQEVVVEbOQiKrDqIjsYUSqqkbFcyMTFVUVkT2MGqOqKlnEEVF1iIo6FhIRVS9VkT2MqKpWRXYSEamqGrOHiKiqqpg9jIhWVUV2EomqehmRPYyoqqrqbOQQMaJeWnHsIaqqDqNq9hBVFfWqkY0cRsRLqyJmD1F1iIqoLGRERFVFZQ830Yqqqpg9xIiqqopZyIiqqqjMIvoPiQEAAsrOzrbt2qyH7Zqbm2tutm3btm3Otm279X8CynoF//M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///O/8L/wP//zP//zP//zP//zP//zP//zP/8L/wv/8z81Hm4VHWldvUI6W8pZZklvS5HZjlxxtruyHPekme/IL323u9UnIxgMBgfCO3786xfPuqjZljKLHdmz8z0UF3okLO5EUNoZr/wLTlVXrJrhzLoQ9IZRtKYxlFZweOs4vF0C6JBI7pSEBSOTgvPFD/Gf6/nCrTdkrz7EakMsXdWC2cwR3XQ+ZIyl8wiyNuV4t2+fGP0h4aoVMthWPLugI1GJp/zyLrg3rgPBGLJFLDx3YBKGocYLvO8Zb7bW5Ms39aiZgp/URs9QojWgwxESmDrimsbflvLZi3y8skt27QhG42hq63g8IAnDUHq7/2Nbb/EVmorsOabOzTm6c8WhTnD9pyVjONkmsqmCC04tcMY72yGAoGQShm4v+L2tFizX1JzRTWyTsx6Zx7uOwNML7zaKKnsuWsw6k5/v/bCxf/73bbnggTMF73n9Ca9fqCkZ3MsML+vUPhy8fTGIed73W3PyhbKZwsUnu/uDR3QpGd5gM44ZC2Sz9uQX+QgI2+484RW7nD74SndISCn+0slcXKzoVhvSDgGR7S0XLFzMbVuI1j/aAkkO55QuLlZ0dQL0PuKQmkq38JFjBFl7rj6EH6S/ycpdvu+dg+AlaJQ5BOsZVdVgxJscUlN2XHiEipLATSFzPJMXKaZaB2NasyOeywgRFQzG+m07fQjMWrxCk79tREdIZOh417/LjMHntQfzXuR7V+lyKhdKC0SEjgNP2fu2t4KZ26cOccfGHGMiQaGGdEzpYiQA5r7YIZHyu4WEgPrc9rl2MHv+klWPrfPAeIn9vHAkVRfKxgbmP9PN5knWmSno4y5PHSIKldC69uTlbtGe3FFUXaSYm0BlPOPNZo/upQXCPI+f0KZVu4xClbzQ9y5T1WdOgrYAj3tKFwsTUDH1wvJT/qbIjqtsnmTP/lCooNl7usV0ksGtmzvZfKimYV9dEriCOQW7LJRNb6is53zoHNF5xHFCdb58qLI9fHUiOKFfZPmh4lZP60OO4E09Mnue46FQfbM3dQjb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PfjCi206zifPH2PoB2VdfaKx93h68XV/HrfV85MjTrlwH92UmOGgK8dgumLbDd5jicwdJ/v8Umf99fFxw07vnevRG72y5sn43BOfMdXxMa4u+rcqffGtvQc6IP08e9zzit8+OPWIiz8z59mdzC1yilz8vqmnfPvcR/2sTPoBJbZ92Ib3fnHMs8uX/fJ3zsr3bX8s4NOzsrKy7rL88st/Jcb//M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///E++AA==",
  "Melaka": "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMjAwIiBoZWlnaHQ9IjYwMCIgdmlld0JveD0iMCAwIDI4OCAxNDQiIGZpbGw9IiMwMDJiN2YiPg0KPHBhdGggZD0iTTAgMEgyODhWMTQ0SDB6IiBmaWxsPSIjYzMwMDAwIi8+DQo8cGF0aCBkPSJNMCAwSDEyOFYxNDRIMHoiLz4NCjxwYXRoIGQ9Ik0wIDcySDI4OHY3MkgweiIgZmlsbD0iI2ZmZiIvPg0KPGNpcmNsZSBjeD0iNjQiIGN5PSIzNiIgcj0iMjkiIGZpbGw9IiNmY2QxMTYiLz4NCjxjaXJjbGUgY3g9Ijc0IiBjeT0iMzYiIHI9IjI5Ii8+DQo8cGF0aCBkPSJtOTMgMzYgLTM0LjM3MTMyMyAxMS4xNjc5MiAyMS4yNDI2NDYtMjkuMjM3OTk0djM2LjE0MDE0OGwtMjEuMjQyNjQ2LTI5LjIzNzk5NHoiIGZpbGw9IiNmY2QxMTYiLz4NCjwvc3ZnPg==",
  "Negeri Sembilan": "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMjAwIiBoZWlnaHQ9IjYwMCIgdmlld0JveD0iMCAwIDQgMiI+DQo8cGF0aCBkPSJNMCAwaDR2MkgweiIgZmlsbD0iI2RjMjQxZiIvPg0KPHBhdGggZD0iTTAgMHYyaDR6Ii8+DQo8cGF0aCBkPSJNMCAxaDJWMGgydjJIMHoiIGZpbGw9IiNmZmQxMDAiLz4NCjwvc3ZnPg==",
  "Pahang": "data:image/webp;base64,UklGRjwAAABXRUJQVlA4TDAAAAAvv8N3AA8w//M///MfeCCTtpl/03PQNxH9z/Of//znP//5z/+K8Z///Oc///nP/wo=",
  "Pulau Pinang": "data:image/webp;base64,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",
  "Perak": "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMjAwcHgiIGhlaWdodD0iNjAwcHgiIHZpZXdCb3g9IjAgMCA2IDMiPg0KPHJlY3Qgd2lkdGg9IjYiIGhlaWdodD0iMyIvPg0KPHJlY3QgZmlsbD0iI2ZjZDExNiIgd2lkdGg9IjYiIGhlaWdodD0iMiIvPg0KPHJlY3QgZmlsbD0iI2ZmZiIgd2lkdGg9IjYiIGhlaWdodD0iMSIvPg0KPC9zdmc+",
  "Perlis": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAT4AAACfCAMAAABX0UX9AAAAD1BMVEX70BUAKHn/1AyjjVEAGnyiGzyjAAAAzUlEQVR4nO3QQRGAMAAEsSvgXzMidqavREI2AAAAAAAAAAAAAAAAAAAAAAAAAAAAAACA6x6CvQT7CHYI9CX6En2JvkRfoi/Rl+hL9CX6En2JvkRfoi/Rl+hL9CX6En2JvkRfoi/Rl+hL9CX6En2JvkRfoi/Rl+hL9CX6En2JvkRfoi/Rl+hL9CX6En2JvkRfoi/Rl+hL9CX6En2JvkRfoi/Rl+hL9CX6En2JvkRfoi/Rl+hL9CX6En2JvkRfoi/Rl+hL9CX6En2JvkRf8gMtEWwTQ+zcRwAAAABJRU5ErkJggg==",
  "Putrajaya": "data:image/webp;base64,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",
  "Sabah": "data:image/webp;base64,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sYnqPXajAsAsDcn71gKEcGA5wSsLAymM+ETuauNBDH3PEzv9OJBDxVIdpZNmgyIOV9E5KQk0se1zKictBlV0P0DjpPkgjItrCZx2Okhjj1fkTT0OxNF5rZ62lcWAPkZ9pGzfwkAhfQ/TtcctQSTHlxK1I24gk61PUTT9EpDKYV/JWfEgEEuPtfW07EEQ6GXX24RMl+IMiqmYp6JiX+JBNVvs1pKw0wEgnF1PS+QrdxSIZ/Rj2qXb5wv6OTCHcL3uCxLqklRItIqTnEFFPZJ/EKz67X6gpC7T3hEr/dG2oKbKSZmESnuoKyiqYtRTIqU53AVktfe+WvqUn9IGpNU/+QttejjRBeTVaeBpPVXKXN4eRLbL1mJ6JGVsCAGldR5xspYSFZ2eHwx66zHxkpYCqR5unxaiANUNSn5If0B+/ec///nPf/7zn//85z//+c9//vOf//znP/9JxkB+/ec///nPf/7zn//85z//+c9//vOf//znP//5z3/+85///Oc///nPf/7zn/8+9x/y+1/y++s//ve///3vf//73//+97///e9///vf//73v//973//+9///ve///3vf//73//+97///e9///vf//73v//973//+9///ve///3vf//73//+97///e9///vf//73//+BCg==",
  "Sarawak": "data:image/webp;base64,UklGRo5OAABXRUJQVlA4TIJOAAAv/87fAWpy3EiSImWW/14vNRz+ImICKHVszW8+rS3pL8tRbbIzGoA4PBf7aa9KVCbWnI6AoiQB1yIumrwLHjkLuJPotONZc8Of2Gix/n/9fyvDXbtDImmS5i7d3SUR3V2aW3J318S09nef/z7/38bh9XmsRXOZgO4hwAAg0TzuRTwJSdD3TrhLhOaSnegayS6JehYTsM8iusODbpHmPgEiydlnIwOwSGPTiDoHJ0GSSPMxOBNgnQYTgOxOI3ISA3B3t+Y6A7foyd3JTiT5FI40mjvkRz0Zm4FOQKfgkeQMwe8ZuLvOAB3CLenufu+1nNa2rThDknpgcKPorWkiHaQBhlY4sezjR4aZmZnjGQYAWDQ3286u/xDcNnIk9e7e8dIDcuxyVeOd/3/93DgXZmZmOmZmZmZmZmZmZmZmZmbGf0kr7e/7/X4+7/fn8/nu7/v7zshVIoehzFEb8mHrA911e2GF2dVG5fVSJVMjeXTuNNfdbEDlDbehDZV7raHZMMfjP+DI4zK0Mxd6h9E6d76KUX+AjzyjamcM2i2kNljaF+6s7lB/AgWq20rruLqK8S/AdRswNXIYfNorQ3aY3Z23kfv4+DSHmugcULVurHD6RHPc7VEVkopwUstz2S1V6dh/gaC7ivkunPgz6ZiMgdrOXntBQ0CtFXCpKswad4fbxgdhZtn3HxjCnYqDikEzh56RawEAGUlvqz2jsm37Otv2fQAr27Zt27YZaya2nQwLCLJtp20FVbEMlZnE+MH998DaliRJkiTdDwE+VGK1xRlipkJM9JdHJPay/V9/tykz01ZmHq/MzMzMzMzMzMzMzMzMmn7w/X3g/fl9Pv+8BRQ8JJGwnEkgCSUJAw39VcNAQknCQEKuaCAJg2Mhe1lYamEkoeAhGrbraCg4SKth9TCQENBQD90soISAhpNp2DQkGgoW1mnojoPBmYRe85BpKFjocjxEw/uqhrUSSANIGDkoSiANZxoKEkISBhZ6+iccBgAINqlm27Zt27Zt27Zt27Zt27bNh20AIG3DAaw0K27pPy1IklxbTeIakJduFB7Ou3v0caiZ7WB1dRAIuFR+l1EO7Jf06thUWfv4s8Ns/NIvlH6h9AulXyj9QukXSr9Q+oXSL5R+ofQLpV8o/ULpF0q/UPqF0i+UfqH0C6VfKP1C6RdKv1D6hdIvlH6h9AulXyj9QukXSr9Q+oXSL5R+ofQLpV8o/ULpF0q/UPqF0i+UfqH0C6VfKP1C6RdKv1D6hdIvlH6h9AulXyj9QukXSr9Q+oXSL5R+ofQLpV8o/ULpF0q/UPqF0i+UfqH0C6VfKP1C6RdKv1D6hdIvlH6h9AulXyj9QukXSr9Q+oXSL5R+ofQLpV8o/ULpF0q/UPqF0i+UfqH0C6VfKP1C6RdKv1D6hdIvlH6h9AulXyj9QukXSr9Q+oXSL5R+ofQLpV8o/ULpF0q/UPqF0i+UfqH0C6VfKP1C6RdKv1D6hdIvlH6h9AulXyj9QukXSr9Q+oXSL5R+ofQLpV8o/ULpF0q/UPqF0i+UfqH0C6VfKP1C6RdKv1D6hdIvlH6h9AulXyj9QukXSr9Q+oXSL5R+ofQLpV8o/ULpF0q/UPqF0i+UfqH0C6VfKP1C6RdKv1D6hdIvlH6h9AulXyj9QukXSr9Q+oXSL5R+ofQLpV8o/ULpF0q/UPqF0i+UfqH0C6VfKP1C6RdKv1D6hdIvlH6h9AulXyj9QukXSr9Q+oXSL5R+ofQLpV8o/ULpF0q/UPqF0i+UfqH0C6VfKP1C6RdKv1D6hdIvlH6h9AulXyj9QukXSr9Q+oXSL5R+ofQLpV8o/ULpF0q/UPqF0i+UfqH0C6VfKP1C6RdKv1D6hdIvlH6h9AulXyj9QukXSr9Q+oXSL5R+ofQLpV8o/ULpF0q/UPqF0i+UfqH0C6VfKP1C6RdKv1D6hdIvlH6h9AulXyj9QukXSr9Q+oXSL5R+ofQLpV8o/ULpF0q/UPqF0i+UfqH0C6VfKP1C6RdKv1D6hdIvlH6h9AulXyj9QukXSr9Q+oXSL5R+ofQLpV8o/ULpF0q/UPqF0i+UfqH0C6VfKP1C6RdKv1D6hdIvlH6h9AulXyj9QukXSr9Q+oXSL5R+ofQLpV8o/ULpF0q/UPqF0i+UfqH0C6VfKP1C6RdKv1D6hdIvlH6h9AulXyj9QukXSr9Q+oXSL5R+ofQLpV8o/ULpF0q/UPqF0i+UfqH0C6VfKP1C6RdKv1D6hdIvlH6h9AulXyj9QukXSr9Q+oXSL5R+ofQLpV8o/ULpF0q/UPqF0i+UfqH0C6VfKP1C6RdKv1D6hdIvlH6h9AulXyj9QukXSr9Q+oXSL5R+ofQLpV8o/ULpF0q/UPqF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",
  "Selangor": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAT4AAACfCAMAAABX0UX9AAAAkFBMVEX9uRPSIyr////ofSDQFyv/vRLPACv/wRHPAADSHibWP0TQABLSISjRFR7PAAbRGiLREBvQBhTxyMn66+vz0dLllJb23d788/Puvb745OXZU1fUNjzstrfaW1/PAAvcZ2rWREnfd3rqra7hgILTLTPhg4XiiYzmmJrecHPoo6XXS0/ZWV3llpj01dbvwsPbYmVVVY1fAAAE9klEQVR4nO3cfVeqShjG4fDsU4O8a4amoalpdnb6/b/dARHlMVDyhqVrvH9/V3utaw8wM4w+GDfd49PDbXdtoNORD4p8UOSDIh/UPfHZcTX+uaT74PN8y1XK8pxIqShwzFr+aJL+fHZs9trrv4Stbd3vfu+rNj/d+UzLnXVa+br93tio6yLWm890hyNh97IwVOB4td0Cdeazo6EceKO28ut9eGjM57lTiWda9T0zdunLF72F4rJtR3XPWgx9+Wy1EkOvp2ofeUma8pnqOY8XTqx62bL05DP9QV5v4Hg1s2VpyWcGXXHba+bCTdKRz1YDqdfAM2OXjnzyvtdt4ombpSFftBTP3HljV66hI5/3KvTG/vlfMS8W1o7PVmK2PFLnf8V7u3gLRjs+S0yXQ/f8jc92WxPypZlzcem+O+d/Ra1bbfKlRX0xX65w6frvLfLtMg0x+D7Prza2w5V8acFUTPkKBt/RvTCdYpMvTYnB1/s5abHnrp+3SvcEybfNGwu+gk15879w1VZBxuVsWuTbZ4kHx7db8CNBL76oV18qSG6LttMi3yE5ZS64do1sRRxOX2PBbHVMviRzKK7d4smw7WdT6tFrr0W+Q85M8JVM+py31nHkS5LTlpeiW1+SuzrmG5IvLhKvdful7zfkdmrcTEXORbuCWvG5gmVVulV1tDBO6sysSwS14pMP3kX5Tl+yzv3R84fv/vYQgl588oo8sdui+gV+seDCUxX2aO6C79Rm1dGmaq7BKXXypRVMXraFo02FzX1d+cSQ+ijn20+dpd12JfKbf1AzPvF2/G/5OJKvMrft18H3yxd950GmQdnPWb0ju8FqctiFuVs+ueHSiUp+zJscD735pSf/tOLzxQvyor3mpIKnLte8Sd5GoJSsIg5zvucB+XLZkeD7LHz0ZiuOZIo8J18+Vzw7RkXPjnS9u1ugZZTk2yZvfmHRzc/t5rcH1Jp8h462Ut5+zuPM8czNba3Ybki+Q0pcveuCqYspHyjpJIZ8ac6nGH7m+f2n7RSafLvkum1a4UB9MmDJt8uRG6EVPsCbvOslX5Z8j7GucMTK2ZBvn/clH74VNj/dEU+X7oumYu5X4Vy97Q0vPXyvH58tnx6dCpfv5V9xoB/f8VGNZdnb8jrSkM/w5TG194Y+DpikI59hybMu4+b8tOQzog85/hq7fvXkMyI5e1429alATfmMQH40qxP96vBA5XTlMxzzRcz/No18qFdbvnj+t5AD0Kj/izQ05osnMLY8CDQ1oro/lK8zn2G77bUcgRtlXXYOsiSt+eIVSGSsxBou7L/bbn2CmvMlp4HUZCmPtAwWtX2Pn/Z8RvK1JJGajxer6Wg0XX68eRx9v870HD+I82v8+jTjfvgainxQ5IMiHxT5oG6e789N9/j070338A8Derj2/9/pnh6vPf5Pd+17x5meHq999z3dtX3ORD4o8kGRD4p8UOSDIh8U+aDIB0U+KPJBkQ+KfFDkgyIfFPmgyAdFPijyQZEPinxQ5IMiHxT5oMgHRT4o8kGRD4p8UOSDIh8U+aDIB0U+KPJBkQ+KfFDkgyIfFPmgyAdFPijyQZEPinxQ5IMiHxT5oMgHRT4o8kGRD4p8UOSDIh8U+aDIB0U+KPJBkQ+KfFDkgyIfFPmgyAdFPijyQZEPinxQ5IMiHxT5oMgHRT4o8kGRD4p8ULfO9z+UcKhsU256PAAAAABJRU5ErkJggg==",
  "Terengganu": "data:image/webp;base64,UklGRmQ7AABXRUJQVlA4TFg7AAAv/87fAf8nJEjw/3jrBEzA/Ce2e5LitpGUTP9lHy4d/CJiAgA9VkIlTDcGoGa7DeYmvGUZLgg5X3A/l7BM7VLU9pE+rz/+/2cp6f/vcWbYUVlcw11zQSRNXIs2I9uc1hdZWlSatFjRTmm9XhO2YMvLyOwV2vJ6kWUvsnXEFixTaBXDDXdxyUAUEQRlm5n7H5rhcM6D5zkX5vmM6P8E0K22bXnkfMtUAJjCmdCsBnyYQa5AHRhThZsNZCZtBarATJEis62twOzMi38Npue5Ivo/AVD+53/+53/+53/+53/+53/+53/+53/+53/+53/+53/+53/+53/+53/+53/+53/+53/+53/+53/+53/+53/+53/+53/+53/+53/+53/+53/+53/+53/+53/+53/+53/+53/+53/+53/+53/+53/+53/+53/+53/+53/+53/+53/+53/+53/+53/+53/+53/+53/+53/+53/+53/+53/+53/+53/+53/+53/+53/+53/+53/+53/+53/+53/+53/+53/+53/+53/+53/+53/+53/+53/+53/+53/+53/+53/+53/+53/+53/+53/+53/+53/+53/+53/+53/+53/+53/+53/+53/+53/+53/+53/+53/+53/+53/+53/+53/+53/+53/+53/+53/+53/+53/+53/+53/+53/+53/+53/+53/+53/+53/+53/+53/+53/+53/+53/+53/+53/+53/+53/+53/+53/+53/+53/+53/+53/+53/+53/+53/+53/+53/+53/+53/+53/+53/+53/+53/+53/+53/+53/+53/+53/+53/+53/+53/+53/+53/+53/+53/+53/+53/+5/9/1ZLyI//xH//xH//xH//xH//xH//xH//xH//xH//xH//xH//xH//xH//xH//xH//xH//xH//xH//xH//xH//xH//xH//xH//xH//xH//xH//xH//xH//xH//xH//xH//xH//xH//xH//xH//xH//xH//xH//xH//xH//xH//xH//xH//xH//xH//xH//xH//xH//xH//xH//xH//xH//xH//xH//xH//xH//xH//xH//xH//xH//xH//xH//xH//xH//xH/8p//Ef//Ef//Ef//Ef//Ef//Ef//Hf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Ia/heMrX57352A0jO5H/wpLhNO094pOmPfTCu66f9x7XMU/lrh8/e+OZGZNHxdjJ/2HbcPrB3QaPnZSc+sQLCz/IKyzatruyupXUHdm9pWjVN7k5/3nh8btunHhuvwjyr9g8tGhg1FkDzkmYmJSUlHRdcnJy8m2pfzkt+bSvTUpKGpuQcPaAAZ2jOpDfxzLCLyf/8R//8R//8R//8Z/yn/If//Ef//Ef//Ef//Ef//Ef//Ef//Ef//Ef//Ef//Ef//Ef//Ef//Ef//Ef//Ef//Ef//Ef//Ef//Ef//Ef//Ef//Ef//Ef//Ef//Ef//Ef//Ef//Ef//Ef//Ef//Ef//Ef//Ef//Ef//Ef//Ef//Ef//Ef//Ef//Ef//Ef//Ef//Ef//Ef//Ef//Ef//Ef//Ef//Ef//Ef//Ef//Ef//Ef//Ef//Ef//Ef//Ef//Ef//Ef//Ef//Ef//Ef//Ef//Ef//Ef//FfG8b//M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M///M//1A8=",
};

/* Prime Court — the in-universe Malaysian basketball media outlet behind
   Media Day and viral-clip events. User-provided original logo asset. */
const PRIME_COURT_LOGO = "data:image/png;base64,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9tlgOKyDnGSL5ARKqZSQoVBESnHvPXcfcMCBH3/8MeccwFKnjHENut59191PP/0UAJqmyfIUergarBCCAgmGI6+99upBBx307bdzOOdCSF3nyA0uhNhnn33ef//9nj17xGMxw6hMvrd2TZS7bBlXnmzGtjGFyShTSt1881+TySTJT/tp5RxKqbwe7+DBAwkqzRQF5WdbcsYBaAbJWbFRAhBQUhFEyuh999+fSCQoo1gUYO3Wtet22/dPNpuUQjG0Fko2drF6DJQFYBfSBjkZfmhrTUS88MIL+vXv39zUVDT1BVCpKy6/zOf32WQDWULHNdcbLb7N7Erg0iaws7a17D3bEs8C3P0SC61LERSEttzl0Yy+A7ff/pprr00FvkED6wCwcePGSy+9VBvTWM5zcc7jscb99t3/5VdeDYVCNgU8scKzxscff3LIIYf88OOP4UiNFKJMJ6jIYYZ87zzTowtrI+GaH3/88fBxh9/y179JKSmjwrRgE53lcvbZ50x84w2/39fU1MSNCoMciCiFCIUjP/z4/UFjxrz11tucp0xUtLLohg8f/v7UqQMGDIhGG1PyvcqSt2W+r6sVKb6OedcDCJFCeH3+b775+puvv8kqTM+7rQcOHuh8aihCHp/fcmd20iS4PkFSKsPj/fnnn7+f/4OD6ybPQyopDY+nb5++hBTOLwRSqoQJshhQoMIVTyOwKU2TbegBgJKyffv2559/vmkmGWepTJ6MFEzGWCIe23PPvY4//vhUNl2eImQdAC45PlaloqfC1PGOfJWt2jocCxsBLcXsSqw5ACK56cabw5GwQxXrTBJ6819v+WXhAr/fn38rQ0HLKB6L7Th0xwmvv15TE8mS7Jzzt99+e/z4o+rr64OhkGmarW9dQmHYRAQCQcrY32695cgjj1q27DduMIunDSyIZtxhh7337rudO3WKNUYzxW55O0YIEQiEEommk046efLkdxljukcg0fa7KXYYPHjKlCnbbzcwGiuRSLcF0Zg0+2AVjgPk78uAhDBGhTC//XYOcVE/36N7j/SphgqVHBRPOYacxqAEGePJZPMvi36x7573m/pXPXv1LjZvWDIhBB1ivZRqLZ00iARIXV2tlPn1DVCKiGecfnq/fgOaEk2U0pzqC80GgFddcYXhMXIEQnrRGhrqm5uaSWnonrbyqXchntHlAcAyE79djK9C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1xTBdSJ2vVLeqCMQIgmhhPopPjXjrY/WLrv2ootGnXoyPvP3xNzvQArq9xGvh3BuB9opKpSJOMbj1DDorjt7jzrSN2a0sduulpcjJGE0DSdAKeXMXLth8V8fWfzs8yoapfUNSiEKSSBFB5IeXW4iPxU7zITNAcIAkKjWOMZaa7bbtvelF/U58xRf796EEI0bDIxJKXT3xIL586+68uqp/5rq8fqCoTohzA6QbuxEewwLBp033YVVnk74H9CARUC6sANXDNq8sNi29cJypzFv6BUcbHN58028qoNO30ZJaRj858WLz/y/M19/7TXD41GancDmUtlpp50mT5581K+Oat640eP12RGGwrnUAkOzilORBPzBed/8cOYlf3zjrLNvvPvO/s3h5L9eMz+chStXi1hY1zIpgoRzo3dvfsjBxnFH8UEH0doQ0cWaCgljVqWjUoiKco5CrHp58k/3PxaZNw/q6mioFoV00iUhZEdh8tbDpEt5KFBKMWliJEoJhPrv2mPk8J6njfb16UU0OS0FQplUUvfFNTdvfPTRR++//8E1a1YFgrWoVPmaPW+wD9zECHHzViWdUBtie75ah61YG/XaJllNLPDf0P4vUiTaXuIm6ehfvn6lDJB9qNxyr+SSQnoMY/r06ReNvfjpp5/SsESWfudMCLHPL/d56eWXhw8fnkgkDI9H5AGycDWDWoFKJb01foL44jNPvvXGa5dccenv7769gXE598vIl1+Tn36iy1ewXXfyHHQgHzCAdu+uJ06TfRNKLa4npRCRcgaEtnz6+cI7793w7gzl9UFDFyklERpcAjOPXsi7IDa6ALEYlBkQITASUwnT16Wh4VeH9xgzouHIYbyu1lbrlFAqldI8y1LKiS9OvPOuu77++ivD49skraedSb/jFqTiN/cLyy/cqMBS7pgVb/vI23eQFo5KPsvdpvqCQjuVt+vINHzoM888vVPfvtffcL1pCh1kRySMcdM0Dz98yOTJk8eMOSkai3q9vnxmaRlrrNv/gsHa8IbmW6646qUnJlx6zTVnnn123cD9CSGm421RSg0bCqn6VkSCCIwCIa0//rz8iadWTJqcbImQ+npUiEIQkqnUIWNk6EAOtjrcAIBSopQyTdXaiknTEwjU9u/X7fijux93dGBAf/1xJQShlFCQSnLOKWVSyWlvvHXfPfdOf3c6AA2GaqWU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";
function PrimeCourtLogo({ width = 90 }) {
  const h = Math.round(width * (213/500));
  return <img src={PRIME_COURT_LOGO} alt="Prime Court" width={width} height={h} style={{ width, height: h, objectFit: "contain", display: "block" }} />;
}

const FlagIcon = memo(function FlagIcon({ name, size = 32 }) {
  const src = FLAG_IMAGES[name];
  const hh = Math.round(size * 0.6);
  if (!src) return <div style={{ width: size, height: hh, background: C.ink3, borderRadius: 3, flexShrink: 0 }} />;
  return (
    <img
      src={src}
      alt={`${name} flag`}
      width={size}
      height={hh}
      style={{ width: size, height: hh, objectFit: "cover", borderRadius: 3, display: "block", flexShrink: 0, border: "1px solid rgba(0,0,0,0.25)" }}
    />
  );
})
/* ---------------------------------------------------------
   HELPERS
--------------------------------------------------------- */
const clamp = (v, min = 0, max = 100) => Math.max(min, Math.min(max, v));
const randInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const pick = (arr) => arr[randInt(0, arr.length - 1)];
/* Picks n distinct random items, preserving no particular order. */
const sampleN = (arr, n) => {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = randInt(0, i);
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy.slice(0, Math.min(n, copy.length));
};
function pick3(arr) {
  const copy = [...arr];
  const out = [];
  while (copy.length && out.length < 3) {
    out.push(copy.splice(randInt(0, copy.length - 1), 1)[0]);
  }
  return out;
}
const rm = (n) => `RM ${Math.round(n).toLocaleString()}`;
const round1 = (n) => Math.round(n * 10) / 10;
const randFloat = (min, max) => min + Math.random() * (max - min);

function weightedPick(options) {
  const total = options.reduce((s, o) => s + o.weight, 0);
  let r = Math.random() * total;
  for (const o of options) {
    if (r < o.weight) return o;
    r -= o.weight;
  }
  return options[options.length - 1];
}

/* Generates a U15 National Championship stat line from the player's
   attributes, calibrated against real MABA tournament leaderboards
   (with scoring pushed higher so the very best scorers post 21-32 PPG).
   Position shapes the box score too: point guards distribute more, and
   centers clean the glass harder. */
function generateU15TournamentStats(stats, position, height) {
  const apgPosBonus = position === "PG" ? 1.6 : position === "SG" ? 0.4 : 0;
  const rpgPosBonus = position === "C" ? 3.0 : position === "PF" ? 1.5 : 0;
  const ppg = clamp(round1((3 + stats.shooting * 0.20 + stats.athleticism * 0.035 + stats.playmaking * 0.02) * randFloat(0.85, 1.2)), 2, 32);
  const rpg = clamp(round1((1 + rpgPosBonus + stats.rebounding * 0.12 + stats.athleticism * 0.02) * randFloat(0.85, 1.15)), 1, 16);
  const apg = clamp(round1((0.5 + apgPosBonus + stats.playmaking * 0.045) * randFloat(0.85, 1.15)), 0.3, 7);
  const spg = clamp(round1((-0.9 + stats.defense * 0.042 + stats.athleticism * 0.005) * randFloat(0.85, 1.15)), 0.2, 3.1);
  const bpg = computeBlocks(stats, position, height, randFloat(0.8, 1.2));
  const fgPct = computeFgPct(stats, position, 20, 0.3, 0.06, 0.92, 1.08, 15, 62);
  const threePct = clamp(round1((12 + Math.max(0, stats.shooting - 25) * 0.4 + Math.max(0, stats.iq - 30) * 0.12) * randFloat(0.85, 1.15)), 0, 50);
  const tr = clamp(Math.round((ppg / 32) * 30 + (rpg / 15) * 15 + (apg / 6.5) * 15 + (spg / 3.1) * 15 + (bpg / 4.3) * 10 + (fgPct / 60) * 10 + (threePct / 45) * 5), 0, 100);
  return { ppg, rpg, apg, spg, bpg, fgPct, threePct, tr };
}

/* Each award is an independent roll — a great stat line raises the odds but
   never guarantees it, since only one player wins each category. */
function rollU15Awards(u15, teamResultId) {
  const chance = (val, lo, hi, max) => clamp((val - lo) / (hi - lo), 0, 1) * max;
  const awards = [];
  if (Math.random() < chance(u15.ppg, 21, 32, 0.30)) awards.push("top_scorer");
  if (Math.random() < chance(u15.rpg, 11.5, 16, 0.30)) awards.push("top_rebounder");
  if (Math.random() < chance(u15.apg, 4.2, 7, 0.30)) awards.push("top_assists");
  if (Math.random() < chance(u15.spg, 2.5, 3.1, 0.30)) awards.push("top_steals");
  if (Math.random() < chance(u15.bpg, 1.5, 4.3, 0.30)) awards.push("top_blocks");
  if (Math.random() < chance(u15.tr, 55, 100, 0.15)) awards.push("pot");
  if ((teamResultId === "champion" || teamResultId === "runner_up") && Math.random() < chance(u15.tr, 45, 100, 0.30)) {
    awards.push("final_mvp");
  }
  return awards;
}

/* Players who make Malaysia's U16 national team also compete that same year
   in the National U17 Tournament — held in different months, same calendar
   year. Facing genuine 17-year-olds, their output sits between a random
   jumpclass invite (suppressed) and a true 17-year-old (full baseline):
   normally a touch below full age-17 form, but ~15% of the time a genuinely
   outstanding talent matches or even exceeds it. */
function generateU16NationalU17Stats(stats, position, height) {
  const outstanding = Math.random() < 0.15;
  const damp = outstanding ? randFloat(1.0, 1.2) : randFloat(0.86, 0.98);
  const apgPosBonus = position === "PG" ? 1.6 : position === "SG" ? 0.4 : 0;
  const rpgPosBonus = position === "C" ? 3.0 : position === "PF" ? 1.5 : 0;
  const ppg = clamp(round1((3 + stats.shooting * 0.20 + stats.athleticism * 0.035 + stats.playmaking * 0.02) * damp * randFloat(0.9, 1.1)), 2, 30);
  const rpg = clamp(round1((1 + rpgPosBonus + stats.rebounding * 0.12 + stats.athleticism * 0.02) * damp * randFloat(0.9, 1.1)), 1, 15);
  const apg = clamp(round1((0.5 + apgPosBonus + stats.playmaking * 0.045) * damp * randFloat(0.9, 1.1)), 0.3, 6.5);
  const spg = clamp(round1((-0.9 + stats.defense * 0.042 + stats.athleticism * 0.005) * damp * randFloat(0.9, 1.1)), 0.2, 3.1);
  const bpg = computeBlocks(stats, position, height, damp * randFloat(0.85, 1.05));
  const fgPct = computeFgPct(stats, position, 19, 0.29, 0.06, 0.9, 1.06, 14, 60);
  const threePct = clamp(round1((11 + Math.max(0, stats.shooting - 27) * 0.38 + Math.max(0, stats.iq - 32) * 0.11) * randFloat(0.82, 1.12)), 0, 48);
  const tr = clamp(Math.round((ppg / 30) * 30 + (rpg / 14) * 15 + (apg / 6) * 15 + (spg / 3.1) * 15 + (bpg / 4.3) * 10 + (fgPct / 58) * 10 + (threePct / 45) * 5), 0, 100);
  return { ppg, rpg, apg, spg, bpg, fgPct, threePct, tr, outstanding };
}

/* Per-game stat line for a full league season (D-League U20/U23 or MBL).
   Calibrated to real MABA leaderboards:
   - D-League leaders: PPG ~20, RPG ~13, APG ~6, SPG ~5, BPG ~3, FG% ~50, 3P% ~40
   - MBL is dominated by import players; a LOCAL player is doing very well to
     post 12-16 PPG, so local output is scaled down and role (minutes) matters.
   `role`: "Starter" | "Rotation" | "Bench" scales opportunity/usage. */
/* Blocks per game, driven mainly by height and position. Realistically only
   centers (and the tallest players) average 2+ BPG; guards rarely block.
   height ~ cm. A 175cm guard lands near 0; a 205cm center can push past 2-3. */
function computeBlocks(stats, position, height, mult) {
  const h = height || 180;
  const heightFactor = clamp((h - 180) / 25, 0, 1.6);        // 180cm=0 ... 220cm~1.6
  const posCeil = position === "C" ? 3.6 : position === "PF" ? 1.8 : position === "SF" ? 0.9 : 0.5;
  const skill = (Math.max(0, stats.defense - 45) * 0.02 + Math.max(0, stats.rebounding - 45) * 0.015);
  const raw = posCeil * (0.35 + heightFactor * 0.65) * (0.6 + skill) * mult;
  // Only centers may exceed 2 BPG; everyone else is capped below that.
  const cap = position === "C" ? 4.5 : 1.9;
  return clamp(round1(raw * randFloat(0.8, 1.2)), 0, cap);
}

/* Field goal % must be position-aware: centers (and, less sharply, power
   forwards) take most of their shots close to the rim — dunks, put-backs,
   post moves — so their efficiency comes from proximity/finishing, not
   perimeter shooting touch. A center with poor long-range "shooting" skill
   should still finish at a high percentage; that same skill attribute
   should instead show up in a poor 3P%, which is untouched by this. Guards
   and wings stay tied closely to their shooting skill, as before.
   `base`/`shootingCoef`/`iqCoef` preserve each context's own tier scale
   (youth/suppressed/pro all call this with their own tuned constants) —
   only HOW shooting skill factors in changes by position. */
function computeFgPct(stats, position, base, shootingCoef, iqCoef, noiseLo, noiseHi, floor, ceiling, extraMult = 1) {
  let posBase = base, posShootingCoef = shootingCoef;
  if (position === "C") { posBase = base + 24; posShootingCoef = shootingCoef * 0.45; }
  else if (position === "PF") { posBase = base + 14; posShootingCoef = shootingCoef * 0.68; }
  else if (position === "SG") { posBase = base + 2; }
  const fg = (posBase + stats.shooting * posShootingCoef + stats.iq * iqCoef) * extraMult * randFloat(noiseLo, noiseHi);
  return clamp(round1(fg), floor, ceiling);
}

/* ============================================================
   PROFESSIONAL LEAGUE COMPETITION HIERARCHY
   Every pro league (domestic and overseas) has a "tier anchor" — the
   rating at which a player produces average (not dominant, not
   overmatched) production in that league. A player's actual output
   scales with the GAP between their rating and the league they're
   currently playing in, not their rating in isolation. This is what
   makes an NBA-caliber player crush MBL competition (35+ PPG) while a
   merely-MBL-caliber player would be overmatched and struggle if they
   somehow ended up in the NBA — the same rating means very different
   things depending which level of competition it's measured against.

   Hierarchy (hardest to easiest): NBA > EuroLeague > Asia Pro > MBL.
============================================================ */
const LEAGUE_TIER_ANCHOR = { mbl: 60, u20: 55, u23: 55, asia: 72, europe: 79, nba: 85 };

/* ============================================================
   LEAGUE NPCs — the players you're actually competing against

   Without these you post 22 PPG and have no idea whether that's
   good. NPCs are run through the SAME generateLeagueSeasonStats()
   as the player, so leaderboards are directly comparable rather
   than a parallel invented model.

   Two properties matter and both were tuned by simulation:

   1. RATING CURVE. `floor + pow(random, curve) * span` — heavily
      skewed so most of the league sits near the floor and stars are
      rare. Flatter curves produced a 36.7 PPG league leader, absurd
      for a domestic league. At 4.5/17 the MBL leader averages ~27.8
      PPG and the median player is 66 overall.

   2. UNEVEN ATTRIBUTES. Each NPC gets two strengths and one
      weakness. With uniform profiles a single NPC led points,
      rebounds, assists AND steals in the same season; real leagues
      have specialists. Variance drops that to ~1%.

   NPCs persist on the save and age with the player, so chasing the
   same scorer across several seasons is a real arc.
============================================================ */
const NPC_ROSTER = [
  { name: "Ting Chun Hong", pos: "SG", tags: ["MVP","TOP_SCORER"], startAge: 28, ovr: 90, league: "mbl" },
  { name: "Wong Yi Hou", pos: "SF", tags: ["MVP","TOP_SCORER"], startAge: 29, ovr: 85, league: "mbl" },
  { name: "Anthony Liew", pos: "C", tags: ["TOP_REBOUNDER","DPOY"], startAge: 29, ovr: 82, league: "mbl" },
  { name: "John Wong", pos: "SG", tags: ["MVP","TOP_SCORER"], startAge: 30, ovr: 85, league: "mbl" },
  { name: "Ong Wei Yong", pos: "PG", tags: ["TOP_ASSIST"], startAge: 31, ovr: 80, league: "mbl" },
  { name: "Heng Yee Tong", pos: "PG", tags: ["TOP_ASSIST"], startAge: 31, ovr: 80, league: "mbl" },
  { name: "Jayson Lee", pos: "SF", tags: ["TOP_SCORER"], startAge: 32, ovr: 80, league: "mbl" },
  { name: "Ooi Xian Fu", pos: "SG", tags: ["MVP","TOP_SCORER"], startAge: 32, ovr: 85, league: "mbl" },
  { name: "Nicholas Tem", pos: "SF", tags: ["TOP_SCORER"], startAge: 33, ovr: 80, league: "mbl" },
  { name: "Wee Yong Gan", pos: "SG", tags: ["TOP_SCORER"], startAge: 34, ovr: 80, league: "mbl" },
  { name: "Matthew Chin", pos: "PF", tags: ["TOP_REBOUNDER"], startAge: 34, ovr: 80, league: "mbl" },
  { name: "MAEGEN", pos: "C", tags: ["TOP_REBOUNDER"], startAge: 35, ovr: 80, league: "mbl" },
  { name: "Lim Chee Wei", pos: "PG", tags: ["TOP_ASSIST","MVP"], startAge: 22, ovr: 73, league: "mbl" },
  { name: "Hiew Jia Hao", pos: "SF", tags: ["TOP_SCORER","MVP"], startAge: 22, ovr: 73, league: "mbl" },
  { name: "Lee Jing Hung", pos: "PF", tags: ["TOP_REBOUNDER"], startAge: 22, ovr: 68, league: "mbl" },
  { name: "Tan Chi Sheng", pos: "PG", tags: ["TOP_ASSIST"], startAge: 23, ovr: 68, league: "mbl" },
  { name: "Brian Tang", pos: "SG", tags: [], startAge: 23, ovr: 68, league: "mbl" },
  { name: "John Tang", pos: "SG", tags: ["TOP_SCORER"], startAge: 23, ovr: 68, league: "mbl" },
  { name: "Te Yi Hang", pos: "SF", tags: [], startAge: 23, ovr: 68, league: "mbl" },
  { name: "Cheah Zi Hong", pos: "PG", tags: ["TOP_ASSIST","TOP_SCORER"], startAge: 24, ovr: 70, league: "mbl" },
  { name: "Chua Xin Zhi", pos: "C", tags: ["TOP_REBOUNDER","DPOY"], startAge: 24, ovr: 70, league: "mbl" },
  { name: "Lim Wan Seong", pos: "PF", tags: ["TOP_REBOUNDER"], startAge: 24, ovr: 68, league: "mbl" },
  { name: "Keshmendip", pos: "SF", tags: ["TOP_SCORER"], startAge: 24, ovr: 68, league: "mbl" },
  { name: "Lai Kok Weng", pos: "SG", tags: ["TOP_SCORER"], startAge: 24, ovr: 68, league: "mbl" },
  { name: "Edward Siau", pos: "PG", tags: ["TOP_SCORER","TOP_ASSIST"], startAge: 25, ovr: 70, league: "mbl" },
  { name: "Phan Zheng Hao", pos: "C", tags: ["DPOY"], startAge: 25, ovr: 68, league: "mbl" },
  { name: "Chong Zhen Yang", pos: "SF", tags: ["TOP_SCORER","MVP"], startAge: 25, ovr: 75, league: "mbl" },
  { name: "Khoo Wei Lin", pos: "PG", tags: ["TOP_SCORER","TOP_ASSIST","MVP"], startAge: 18, ovr: 70, league: "mbl" },
  { name: "Chua Yen Joon", pos: "SF", tags: [], startAge: 18, ovr: 58, league: "mbl" },
  { name: "Siau Gen Liang", pos: "PF", tags: ["TOP_REBOUNDER"], startAge: 18, ovr: 58, league: "mbl" },
  { name: "Yap Jin Xi", pos: "C", tags: ["TOP_REBOUNDER","DPOY","MVP"], startAge: 19, ovr: 65, league: "mbl" },
  { name: "Lee Yong Ding", pos: "SG", tags: ["TOP_SCORER"], startAge: 19, ovr: 58, league: "mbl" },
  { name: "Matthew Lim", pos: "PG", tags: ["TOP_ASSIST"], startAge: 19, ovr: 58, league: "mbl" },
  { name: "Oscar Tan", pos: "SF", tags: ["TOP_SCORER"], startAge: 19, ovr: 58, league: "mbl" },
  { name: "Ang Chuen Heng", pos: "SG", tags: ["TOP_SCORER"], startAge: 19, ovr: 58, league: "mbl" },
  { name: "Yin Wei Sheng", pos: "PF", tags: ["TOP_REBOUNDER","DPOY"], startAge: 20, ovr: 60, league: "mbl" },
  { name: "Aw Xun Yi", pos: "PG", tags: ["MVP"], startAge: 20, ovr: 61, league: "mbl" },
  { name: "Brandon Kho", pos: "C", tags: ["DPOY"], startAge: 20, ovr: 58, league: "mbl" },
  { name: "Ing Zhin Yuen", pos: "C", tags: [], startAge: 20, ovr: 58, league: "mbl" },
  { name: "Ng Zhi Yi", pos: "PF", tags: [], startAge: 20, ovr: 58, league: "mbl" },
  { name: "James Siau", pos: "SF", tags: ["TOP_SCORER"], startAge: 21, ovr: 58, league: "mbl" },
  { name: "Ng Man Bing", pos: "PG", tags: ["TOP_ASSIST"], startAge: 21, ovr: 58, league: "mbl" },
  { name: "Ng Man Biu", pos: "PG", tags: ["TOP_ASSIST"], startAge: 21, ovr: 58, league: "mbl" },
  { name: "Tan Yu Xiang", pos: "PF", tags: ["TOP_REBOUNDER","DPOY","MVP"], startAge: 20, ovr: 57, league: "u23" },
  { name: "Bennedict Ong", pos: "SG", tags: ["TOP_SCORER","MVP"], startAge: 20, ovr: 55, league: "u23" },
  { name: "Teng Kai Sheng", pos: "PG", tags: ["TOP_SCORER","TOP_ASSIST","MVP"], startAge: 21, ovr: 57, league: "u23" },
  { name: "Jeremie Tan", pos: "C", tags: ["TOP_SCORER","DPOY"], startAge: 15, ovr: 42, league: "u20" },
  { name: "San Chu Huay", pos: "PG", tags: ["TOP_ASSIST"], startAge: 15, ovr: 40, league: "u20" },
  { name: "Sham Wei Kun", pos: "SG", tags: [], startAge: 15, ovr: 40, league: "u20" },
  { name: "Lucas Tai", pos: "SF", tags: ["TOP_SCORER"], startAge: 16, ovr: 40, league: "u20" },
  { name: "Lim Kuan Yit", pos: "PG", tags: ["TOP_ASSIST"], startAge: 16, ovr: 40, league: "u20" },
];
/* Tag -> attribute boost. Applied zero-sum around the player's target
   overall (same bias-subtraction technique used in bodyModifiers): every
   named player's WEIGHTED overall stays anchored near their authored
   rating, while the tagged stat(s) rise and the rest fall to compensate.
   This is what makes a "TOP_SCORER" reliably shooting-heavy without
   inflating their overall beyond what was authored. */
const NPC_TAG_BOOST = {
  TOP_SCORER: { shooting: 14, athleticism: 6 },
  TOP_ASSIST: { playmaking: 16, iq: 6 },
  TOP_REBOUNDER: { rebounding: 16, athleticism: 6 },
  DPOY: { defense: 16, iq: 6 },
};
function namedNpcStats(pos, ovr, tags) {
  const w = posWeights(pos);
  const raw = {}; STAT_LIST.forEach(k => { raw[k] = 0; });
  const touched = new Set();
  (tags || []).forEach(tag => {
    const b = NPC_TAG_BOOST[tag];
    if (b) Object.keys(b).forEach(k => { raw[k] += b[k]; touched.add(k); });
  });
  if ((tags || []).includes("MVP")) {
    /* No single stat means "best player" — boost whichever attributes
       matter most for this position. MUST skip anything another tag
       already boosted: an MVP+TOP_SCORER wing was double-stacking shooting
       (+14 from the tag, +6 more from MVP picking it again as a top-weighted
       stat), pushing a single attribute to 99 and the league-leader PPG to
       37 against a calibrated ~28 ceiling. */
    const untouched = STAT_LIST.filter(k => !touched.has(k)).sort((a, b2) => w[b2] - w[a]);
    untouched.slice(0, 2).forEach(k => { raw[k] += 6; });
  }
  let bias = 0;
  STAT_LIST.forEach(k => { bias += raw[k] * (w[k] || 0); });
  const out = {};
  STAT_LIST.forEach(k => { out[k] = clamp(Math.round(ovr + raw[k] - bias), 1, 99); });
  return out;
}

const NPC_LEAGUE_CFG = {
  mbl: { size: 40, floor: 65, curve: 4.5, span: 17 },
  u23: { size: 36, floor: 52, curve: 3.8, span: 20 },
  u20: { size: 36, floor: 48, curve: 3.8, span: 20 },
};
/* Full names, one flat list — replaces the old NPC_FIRST x NPC_LAST random
   pairing (25 x 25 = 625 combos), which mixed naming traditions in ways
   that didn't read as real Malaysian names ("Wong Zulkifli", "Ravi Wei
   Sheng"). Each entry here is already a coherent whole, so there's no
   pairing left to get wrong. 48 names — comfortably above the "40-60 to
   avoid repeats" range discussed with the person, and not a power of two,
   but at this size the seed-modulo bias toward earlier entries is not
   something a player would ever notice in play. Used by both the filler
   NPCs across MBL/U20/U23 boards (npcNameFromSeed) and the Rival system
   (rollRival) — the 51-player authored roster (NPC_ROSTER) is untouched,
   this only covers names nothing else names for you. */
const NPC_FILLER_NAMES = [
  "Amir Hakimi Rosli", "Farid Zulkarnain", "Danial Haziq Rahman", "Aiman Syafiq Ismail",
  "Hafiz Iskandar", "Zulhelmi Aziz", "Amirul Hakim Bakar", "Haziq Mokhtar",
  "Rizal Firdaus", "Nazrin Shah Osman", "Adam Haikal", "Aidil Danish",
  "Amsyar Rosli", "Naufal Hakim", "Iqbal Rahman", "Syamil Hakimi",
  "Fitri Zulkifli", "Akmal Haris",
  "Wong Jia Hao", "Tan Wei Sheng", "Lim Kang Wei", "Chong Boon Huat",
  "Lee Chee Keong", "Ong Yew Ming", "Cheng Swee Lim", "Chan Zhi Yang",
  "Yap Wei Jian", "Teoh Jun Kai", "Khoo Chun Ming", "Ho Kar Weng",
  "Chin Yong Han", "Ng Jian Hao", "Goh Wei Lun",
  "Ravi Chandran", "Arjun Menon", "Kumar Krishnan", "Bala Sivam",
  "Vinod Nathan", "Suresh Raj", "Deva Kumar", "Prakash Nair",
  "Naveen Pillai", "Manoj Subramaniam",
  "Jerome Anak Bunsu", "Alexius Anak Rimong", "Nicholas Sagau", "Timothy Ujing",
  "Ambrose Anak Nyanggau",
];

/* ============================================================
   RIVAL NPC — generated once at U15 selection, advances one season
   at a time in lockstep with the player's own Continue click.
   Deliberately reuses the REAL attribute-point functions
   (computeSeasonPoints, attrPointCost, attrAgeCap, posWeights,
   computeOverall, MBL_RATING_THRESHOLD, PRO_CLUBS/DLEAGUE_CLUBS)
   rather than a parallel reimplementation — the rival's calibration is
   inherited from the already-validated attribute system, not a separate
   balance pass. Simulated at 20,000 careers before writing this: mean
   peak overall ~66, >=65: 52%, >=70: 21% — a genuine competitive peer,
   not a pushover or an outlier. Never reads or affects the player's own
   stats, tr, or award odds — a fully independent second data thread.
============================================================ */
function rollRival(playerPosition, playerHometown, customName, customPosition) {
  const talentTier = rollTalentTier();
  const highlyTalented = Math.random() < 0.15;
  // Defaults to the player's own position if the player didn't pick one,
  // but the rival's stats are always shaped by ITS OWN position, not the
  // player's — a customized rival playing a different position needs its
  // stat weighting to actually match that position, not the player's.
  const position = customPosition || playerPosition;
  const w = posWeights(position);
  const stats = {};
  STAT_LIST.forEach(s => {
    let base = randInt(29, 37);
    const bonus = Math.round(w[s] * 26);
    if (highlyTalented) base += randInt(7, 13);
    stats[s] = clamp(base + bonus, 1, 99);
  });
  // Different state for narrative contrast — never the player's own.
  const otherStates = HOMETOWNS.filter(h => h !== playerHometown);
  const hometown = pick(otherStates.length ? otherStates : HOMETOWNS);
  const name = (customName && customName.trim()) ? customName.trim().slice(0, 24) : pick(NPC_FILLER_NAMES);
  return {
    name, position, hometown, talentTier,
    // Rolled once, not per-season, so each rival develops consistently:
    // half play position-optimized (mirrors "efficient" play in the
    // balance simulation), half develop well-rounded (mirrors "casual"
    // play) — variety rival-to-rival, not randomness within one rival.
    strategy: Math.random() < 0.5 ? "greedy" : "even",
    age: 15, stats, league: null, clubName: null,
    caps: 0, mblSeasons: 0, titles: 0,
    peakOverall: computeOverall(stats, position),
    retired: false, slowDecliner: Math.random() < 0.2,
  };
}
function advanceRivalOneSeason(rival, excludeClubId) {
  if (!rival || rival.retired) return rival;
  const r = { ...rival, stats: { ...rival.stats } };
  r.age += 1;
  if (r.age <= 40) {
    const perfBonus = pick([-2, -1, 0, 0, 2, 2, 4, 6]);
    // Shaped exactly like a real player object so the REAL
    // computeSeasonPoints (facility bonus, talent multiplier, trainer
    // bump) applies identically — no reimplemented formula to drift.
    const seasonPtsInput = { age: r.age, hometown: r.hometown, league: r.league, abroad: false, clubId: r.clubName ? "x" : null, talentTier: r.talentTier };
    let left = computeSeasonPoints(seasonPtsInput, perfBonus);
    const cap = attrAgeCap(r.age, r.stats);
    const w = posWeights(r.position);
    let guard = 0;
    while (left > 0 && guard++ < 60) {
      const eligible = STAT_LIST.filter(s => r.stats[s] < cap);
      if (!eligible.length) break;
      let target;
      if (r.strategy === "greedy") {
        target = eligible.reduce((best, s) => {
          const ratioS = w[s] / attrPointCost(r.stats[s], s, r.position);
          const ratioBest = w[best] / attrPointCost(r.stats[best], best, r.position);
          return ratioS > ratioBest ? s : best;
        }, eligible[0]);
      } else {
        target = eligible.reduce((lowest, s) => (r.stats[s] < r.stats[lowest] ? s : lowest), eligible[0]);
      }
      const cost = attrPointCost(r.stats[target], target, r.position);
      if (cost > left) break;
      r.stats[target] = clamp(r.stats[target] + 1, 1, 99);
      left -= cost;
    }
    if (r.age < 18 && Math.random() < 0.5) STAT_LIST.forEach(s => { r.stats[s] = clamp(r.stats[s] + 1, 1, 99); });
    if (r.age >= 33) {
      const yearsPast = r.age - 32;
      let decline = 1 + Math.floor(yearsPast * 0.8);
      if (r.slowDecliner) decline = Math.max(1, Math.round(decline * 0.5));
      STAT_LIST.forEach(s => { r.stats[s] = clamp(r.stats[s] - randInt(Math.max(0, decline - 1), decline + 1), 1, 99); });
    }
  }
  const ovr = computeOverall(r.stats, r.position);
  r.peakOverall = Math.max(r.peakOverall, ovr);
  if (r.age >= 18) {
    const newLeague = ovr >= MBL_RATING_THRESHOLD ? "mbl" : (r.age <= 20 ? "u20" : "u23");
    // Re-roll a club on a league change, first assignment, an occasional
    // transfer, OR if the player has since transferred INTO the rival's
    // club — that last check runs every season regardless of whether the
    // rival's own situation changed, since it's the player's move that
    // could create the collision, not the rival's.
    const excludeClub = excludeClubId ? getClub(excludeClubId) : null;
    const collidesWithPlayer = excludeClub && r.clubName === excludeClub.name;
    if (newLeague !== r.league || !r.clubName || collidesWithPlayer || Math.random() < (newLeague === "mbl" ? 0.10 : 0.18)) {
      const basePool = newLeague === "mbl" ? PRO_CLUBS : DLEAGUE_CLUBS;
      const pool = basePool.filter(c => c.id !== excludeClubId);
      r.clubName = pick(pool.length ? pool : basePool).name;
    }
    r.league = newLeague;
    if (newLeague === "mbl") {
      r.mblSeasons += 1;
      const club = PRO_CLUBS.find(c => c.name === r.clubName);
      const titleChance = clamp(0.05 + ((club ? club.prestige : 50) / 100) * 0.18, 0.02, 0.35);
      if (Math.random() < titleChance) r.titles += 1;
    }
    if (ovr >= 65 && Math.random() < 0.22) r.caps += 1;
  }
  if (r.age >= 40 || (r.age >= 34 && ovr < 45 && Math.random() < 0.3)) r.retired = true;
  return r;
}

/* Attribute profile for one NPC: position-shaped, then given two
   strengths and a weakness so specialists emerge. */
function npcAttributes(pos, target) {
  const w = posWeights(pos);
  const pool = [...STAT_LIST];
  const s1 = pool.splice(randInt(0, pool.length - 1), 1)[0];
  const s2 = pool.splice(randInt(0, pool.length - 1), 1)[0];
  const wk = pool.splice(randInt(0, pool.length - 1), 1)[0];
  const out = {};
  STAT_LIST.forEach(k => {
    let v = target + (w[k] - 1 / 6) * 40;
    if (k === s1) v += 10 + Math.random() * 8;
    else if (k === s2) v += 4 + Math.random() * 6;
    else if (k === wk) v -= 10 + Math.random() * 10;
    else v += (Math.random() - 0.5) * 8;
    out[k] = clamp(Math.round(v), 1, 99);
  });
  return out;
}

/* Deterministic PRNG so an NPC's attributes can be rebuilt from a seed
   rather than stored. Saves ~15KB per save file — full attribute objects
   tripled the payload (7.6KB -> 22.8KB), and localStorage.setItem is
   synchronous, so that showed up as stutter on screen transitions. */
function npcRand(seed) {
  let x = seed >>> 0;
  return () => {
    x = (x * 1664525 + 1013904223) >>> 0;
    return x / 4294967296;
  };
}
/* Rebuild an NPC's attribute spread from its seed. Memoised in a module-level
   cache keyed by seed+ovr — this is derived data, never persisted. */
const _npcStatCache = new Map();
function npcStatsFromSeed(pos, ovr, seed) {
  /* Key on the SEED only. Keying on ovr too meant every NPC got a fresh key
     each season as they developed, so 40 NPCs x 20 seasons blew past the
     400-entry cap and forced repeated full clears. The seed fixes the SHAPE
     of the spread; the rating just shifts it, applied below. */
  const key = `${pos}|${seed}`;
  const cached = _npcStatCache.get(key);
  if (cached) {
    const out = {};
    STAT_LIST.forEach(k => { out[k] = clamp(cached.base[k] + (ovr - cached.ovr), 1, 99); });
    return out;
  }
  const rnd = npcRand(seed);
  const w = posWeights(pos);
  const pool = [...STAT_LIST];
  const s1 = pool.splice(Math.floor(rnd() * pool.length), 1)[0];
  const s2 = pool.splice(Math.floor(rnd() * pool.length), 1)[0];
  const wk = pool.splice(Math.floor(rnd() * pool.length), 1)[0];
  const out = {};
  STAT_LIST.forEach(k => {
    let v = ovr + (w[k] - 1 / 6) * 40;
    if (k === s1) v += 10 + rnd() * 8;
    else if (k === s2) v += 4 + rnd() * 6;
    else if (k === wk) v -= 10 + rnd() * 10;
    else v += (rnd() - 0.5) * 8;
    out[k] = clamp(Math.round(v), 1, 99);
  });
  if (_npcStatCache.size > 400) _npcStatCache.clear();
  _npcStatCache.set(key, { base: out, ovr });
  return out;
}
/* Name and club are also derived from the seed rather than stored — the
   strings dominated the payload (a name plus a club name is ~45 bytes per
   NPC before JSON overhead). Only pos/ovr/seed/age/height persist. */
function npcNameFromSeed(seed) {
  return NPC_FILLER_NAMES[seed % NPC_FILLER_NAMES.length];
}
function npcClubFromSeed(seed, leagueId) {
  const pool = leagueId === "mbl" ? PRO_CLUBS : DLEAGUE_CLUBS;
  return pool[(seed >>> 15) % pool.length].name;
}
/* Resolve a stored NPC record into a full one for display/simulation. */
function npcResolve(n, leagueId) {
  if (n.stats && n.name) return n;
  return {
    ...n,
    name: n.name || npcNameFromSeed(n.seed),
    clubName: n.clubName || npcClubFromSeed(n.seed, leagueId),
    stats: n.stats || npcStatsFromSeed(n.pos, n.ovr, n.seed),
  };
}

/* Fast name -> roster-entry lookup. */
const NPC_ROSTER_BY_NAME = {};
NPC_ROSTER.forEach(r => { NPC_ROSTER_BY_NAME[r.name] = r; });

/* Simple deterministic string hash, used to give named players a fixed
   club/height rather than storing those on the save. */
function _strHash(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) >>> 0;
  return h;
}
function namedNpcClub(name, leagueId) {
  const pool = leagueId === "mbl" ? PRO_CLUBS : DLEAGUE_CLUBS;
  return pool[_strHash(name) % pool.length].name;
}
const NPC_ARCHETYPE_HEIGHT = { PG: 183, SG: 190, SF: 196, PF: 202, C: 208 };

/* Which league a named player is CURRENTLY in — from persisted state if the
   season has run at least once, otherwise their roster starting point. */
function namedNpcCurrentLeague(p, entry) {
  const st = p.namedNpcs && p.namedNpcs[entry.name];
  return st ? st.league : entry.league;
}
function namedNpcRetired(p, entry) {
  const st = p.namedNpcs && p.namedNpcs[entry.name];
  return st ? !!st.retired : false;
}
/* How many authored roster players currently occupy a given league — used
   to size the procedural filler pool so the two systems don't overlap. */
function activeNamedCountForLeague(p, leagueId) {
  return NPC_ROSTER.filter(r => !namedNpcRetired(p, r) && namedNpcCurrentLeague(p, r) === leagueId).length;
}

/* Initialise (once) the persisted state for all 51 authored players: age,
   rating, current league, and a randomly rolled retirement age (same 33-38
   band the procedural system already uses). Idempotent — safe to call every
   season. Only ~150 bytes on the save (three numbers x 51), since name/pos/
   tags live in the hardcoded roster, never persisted. */
function ensureNamedNpcState(p) {
  if (p.namedNpcs) return p;
  const state = {};
  NPC_ROSTER.forEach(r => {
    state[r.name] = { age: r.startAge, ovr: r.ovr, league: r.league, retireAge: randInt(33, 38), retired: false };
  });
  return { ...p, namedNpcs: state };
}

/* Advance every authored player one season: ageing, growth/decline (reusing
   the SAME age-banded curve the procedural system uses, so a Veteran and a
   random D-Leaguer age the same way), U20->U23->MBL promotion, and
   retirement. Called unconditionally once per season regardless of what
   league the PLAYER is in — Next Gen players need to progress through their
   own ladder even while you're off at U15 trials or playing overseas. */
function advanceNamedNpcs(p) {
  p = ensureNamedNpcState(p);
  const state = {};
  Object.keys(p.namedNpcs).forEach(name => {
    const n = { ...p.namedNpcs[name] };
    if (!n.retired) {
      n.age += 1;
      if (n.age > n.retireAge) {
        n.retired = true;
      } else {
        const delta = n.age < 25 ? randInt(0, 2) : n.age < 29 ? randInt(0, 1) : -randInt(0, 2);
        n.ovr = clamp(n.ovr + delta, 1, 99);
        if (n.league === "u20" && n.age > 20) n.league = "u23";
        if ((n.league === "u20" || n.league === "u23") && n.ovr >= MBL_RATING_THRESHOLD) n.league = "mbl";
      }
    }
    state[name] = n;
  });
  return { ...p, namedNpcs: state };
}

/* Resolve one authored roster entry into a full display/stat-generation
   record for the league they're CURRENTLY in. */
function resolveNamedNpc(p, entry, leagueId) {
  const st = p.namedNpcs && p.namedNpcs[entry.name];
  const age = st ? st.age : entry.startAge;
  const ovr = st ? st.ovr : entry.ovr;
  return {
    name: entry.name, pos: entry.pos, age,
    clubName: namedNpcClub(entry.name, leagueId),
    height: NPC_ARCHETYPE_HEIGHT[entry.pos] || 190,
    stats: namedNpcStats(entry.pos, ovr, entry.tags),
  };
}

function makeNpc(leagueId, usedNames) {
  const cfg = NPC_LEAGUE_CFG[leagueId] || NPC_LEAGUE_CFG.mbl;
  const pos = POSITIONS[randInt(0, POSITIONS.length - 1)].id;
  const ovr = Math.round(cfg.floor + Math.pow(Math.random(), cfg.curve) * cfg.span);
  // Roll seeds until the derived name is unused, so duplicates stay rare
  // without needing to store the name itself.
  let seed, guard = 0;
  do {
    seed = (Math.random() * 0xffffffff) >>> 0;
  } while (usedNames.has(npcNameFromSeed(seed)) && ++guard < 40);
  usedNames.add(npcNameFromSeed(seed));
  // Persisted fields only — name, club and attributes are all derived.
  return {
    pos, ovr, seed,
    age: randInt(19, 31),
    height: pos === "C" ? randInt(198, 212) : pos === "PF" ? randInt(193, 205) : randInt(178, 196),
  };
}

/* Build (or top up) the NPC pool for a league. Called lazily the first
   time a player competes in that league. */
function ensureNpcPool(p, leagueId) {
  if (!leagueId || !NPC_LEAGUE_CFG[leagueId]) return p;
  /* Only the current league's pool is ever displayed, but a player who came
     up through U20 -> U23 -> MBL was carrying all three on the save forever.
     Drop the ones no longer in use. */
  const pools = {};
  if (p.npcPools && p.npcPools[leagueId]) pools[leagueId] = p.npcPools[leagueId];
  const cfg = NPC_LEAGUE_CFG[leagueId];
  // Only generate as many procedural fillers as authored roster players
  // DON'T already cover for this league, so the two systems never overlap.
  // MBL alone has 43 authored players against a 40 target, so it typically
  // needs zero filler; U20/U23 lean almost entirely on procedural fill.
  const target = Math.max(0, cfg.size - activeNamedCountForLeague(p, leagueId));
  let list = pools[leagueId] ? [...pools[leagueId]] : [];
  const usedNames = new Set(list.map(n => n.name));
  NPC_ROSTER.forEach(r => usedNames.add(r.name)); // never collide with an authored name
  while (list.length < target) list.push(makeNpc(leagueId, usedNames));
  if (list.length > target) list = list.slice(0, target);
  pools[leagueId] = list;
  return { ...p, npcPools: pools };
}

/* Age the pool one season: NPCs develop, peak, decline and retire —
   replaced by fresh young players. This is what makes chasing the same
   scorer over several seasons feel like a rivalry. */
function ageNpcPool(p, leagueId) {
  if (!p.npcPools || !p.npcPools[leagueId]) return p;
  const cfg = NPC_LEAGUE_CFG[leagueId];
  const used = new Set();
  const list = p.npcPools[leagueId].map(n => {
    const age = n.age + 1;
    if (age > randInt(33, 37)) return null;           // retires
    const delta = age < 25 ? randInt(0, 2) : age < 29 ? randInt(0, 1) : -randInt(0, 2);
    used.add(npcNameFromSeed(n.seed));
    // Development shifts the rating; attributes are re-derived from it.
    return { ...n, age, ovr: clamp((n.ovr || 65) + delta, 1, 99) };
  }).filter(Boolean);
  while (list.length < cfg.size) list.push(makeNpc(leagueId, used));
  return { ...p, npcPools: { ...p.npcPools, [leagueId]: list } };
}

/* Season stat lines for every NPC in a league, plus the player's own
   line, ranked. Returns the leaderboards and the player's rank in each. */
/* League standings. Club strength comes from prestige, with the player's
   own club nudged by how well they personally played — a star lifts their
   side, a bench player doesn't. Deterministic per season so revisiting the
   screen shows the same table. */
function buildStandings(p, leagueId, myLine, seasonSeed, wonTitle, totalGames) {
  const clubs = leagueId === "mbl" ? PRO_CLUBS : DLEAGUE_CLUBS;
  /* Must match the SAME season length the player's own games-played count
     uses (fullGames, rolled 30-40 for MBL / 20-25 for D-League) — a hardcoded
     24/20 here meant the standings table showed every club at a fixed game
     count while the player's own recap said "29 games" from a season that
     was actually 40 games long. Falls back to the old constants only if no
     game count was supplied (keeps this callable from older code paths). */
  const games = totalGames || (leagueId === "mbl" ? 24 : 20);
  const rnd = npcRand(seasonSeed >>> 0);
  const myClub = getClub(p.clubId);
  const rows = clubs.map(c => {
    // Prestige 30-100 maps to a baseline win rate of roughly .25-.75.
    let strength = 0.25 + ((c.prestige || 50) - 30) / 140;
    if (myClub && c.id === myClub.id && myLine) {
      // Your production tilts your own club's season.
      strength += clamp((myLine.tr || 50) - 50, -25, 30) * 0.004;
    }
    strength = Math.max(0.08, Math.min(0.92, strength + (rnd() - 0.5) * 0.18));
    const w = Math.round(strength * games);
    return {
      id: c.id, name: c.name, w, l: games - w,
      pct: w / games,
      me: !!(myClub && c.id === myClub.id),
    };
  }).sort((a, b) => b.pct - a.pct || b.w - a.w);
  /* If the player actually won the title, their club must finish top of the
     table — otherwise the recap showed "Champions" next to a 4th-place
     10-14 record, which is nonsense. Swap them with the leader and give
     them a record that justifies it. */
  if (wonTitle) {
    const mi = rows.findIndex(r => r.me);
    if (mi > 0) {
      const top = rows[0];
      const mine = rows[mi];
      const w = Math.max(mine.w, top.w + 1, Math.round(games * 0.62));
      mine.w = Math.min(games, w);
      mine.l = games - mine.w;
      mine.pct = mine.w / games;
      rows.splice(mi, 1);
      rows.unshift(mine);
      rows.sort((a, b) => (a.me ? -1 : b.me ? 1 : 0) || b.pct - a.pct);
    }
  }
  const playoffCut = Math.min(4, Math.max(2, Math.floor(rows.length / 2)));
  const myIndex = rows.findIndex(r => r.me);
  return { rows, playoffCut, myPlace: myIndex >= 0 ? myIndex + 1 : null };
}

/* Award race. Rather than a bare probability, each contender carries the
   stat line that justifies it, so the player can see WHY they're behind. */
function buildAwardRace(p, leagueId, myLine, board) {
  if (!board || !myLine) return null;
  const contenders = [];
  const seen = new Set();
  const pushFrom = (key, label) => {
    (board.boards[key] || []).slice(0, 3).forEach(r => {
      const id = r.me ? "__ME__" : r.name;
      if (seen.has(id)) {
        const c = contenders.find(x => x.id === id);
        if (c) c.cases.push(`${r.value.toFixed(1)} ${label}`);
        return;
      }
      seen.add(id);
      contenders.push({ id, name: r.name, clubName: r.clubName, me: !!r.me,
        cases: [`${r.value.toFixed(1)} ${label}`], score: 0 });
    });
  };
  pushFrom("ppg", "PPG");
  pushFrom("rpg", "RPG");
  pushFrom("apg", "APG");
  // Score = how many leaderboards you appear near the top of, weighted to scoring.
  contenders.forEach(c => {
    c.score = c.cases.reduce((t, cs) => t + (cs.includes("PPG") ? 1.6 : 1.0), 0);
  });
  // Take the top 4 FIRST, then share the odds among them — normalising over
  // everyone and slicing afterwards left the displayed odds summing to ~81%.
  contenders.sort((a, b) => b.score - a.score);
  const top = contenders.slice(0, 4);
  const total = top.reduce((t, c) => t + c.score, 0) || 1;
  let running = 0;
  top.forEach((c, i) => {
    if (i === top.length - 1) c.odds = Math.max(0, 100 - running);   // absorb rounding
    else { c.odds = Math.round((c.score / total) * 100); running += c.odds; }
  });
  return top;
}

const NPC_LEADER_KEYS = ["ppg", "rpg", "apg", "spg", "bpg"];
function roleForRating(ovr, cfg) {
  const rel = (ovr - cfg.floor) / cfg.span;
  return rel > 0.75 ? "Starter"
    : rel > 0.4 ? (Math.random() < 0.75 ? "Starter" : "Rotation")
    : rel > 0.18 ? (Math.random() < 0.45 ? "Starter" : "Rotation") : "Rotation";
}
function buildLeagueBoard(p, leagueId, myLine) {
  const cfg = NPC_LEAGUE_CFG[leagueId];
  // Authored roster players currently active in this league.
  const namedRows = NPC_ROSTER
    .filter(r => !namedNpcRetired(p, r) && namedNpcCurrentLeague(p, r) === leagueId)
    .map(entry => {
      const n = resolveNamedNpc(p, entry, leagueId);
      const ovr = computeOverall(n.stats, n.pos);
      const role = roleForRating(ovr, cfg);
      return { name: n.name, clubName: n.clubName, pos: n.pos,
        ...generateLeagueSeasonStats(n.stats, n.pos, leagueId, role, n.height) };
    });
  // Procedural filler for whatever's left of the target size.
  const list = (p.npcPools && p.npcPools[leagueId]) || [];
  const proceduralRows = list.map(raw => {
    const n = npcResolve(raw, leagueId);
    const ovr = computeOverall(n.stats, n.pos);
    const role = roleForRating(ovr, cfg);
    return { name: n.name, clubName: n.clubName, pos: n.pos,
      ...generateLeagueSeasonStats(n.stats, n.pos, leagueId, role, n.height) };
  });
  const rows = [...namedRows, ...proceduralRows];
  const mine = myLine ? { name: "__ME__", clubName: null, pos: p.position, me: true, ...myLine } : null;
  const all = mine ? [...rows, mine] : rows;
  const boards = {}, ranks = {};
  NPC_LEADER_KEYS.forEach(k => {
    const sorted = all.slice().sort((a, b) => b[k] - a[k]);
    boards[k] = sorted.slice(0, 5).map(x => ({ name: x.name, clubName: x.clubName, value: x[k], me: !!x.me }));
    ranks[k] = mine ? 1 + all.filter(x => x[k] > mine[k]).length : null;
  });
  return { boards, ranks, fieldSize: all.length };
}


function competitionMult(rating, tierAnchor) {
  return clamp(0.5 + (rating - tierAnchor) / 30, 0.18, 1.9);
}

/* Small, deliberate position-based nudges layered on top of whatever the
   position's attribute weighting already produces — reflecting the role
   each position naturally leans into on a real court. Centers specifically
   shoot a notably higher field-goal % than other positions since their
   attempts are mostly close-range, in the paint. */
function positionStatNudges(position) {
  switch (position) {
    case "PG": return { apg: 1.2, rpg: 0, ppg: 0, threePct: 0, bpg: 0 };
    case "SG": return { apg: 0, rpg: 0, ppg: 0, threePct: 3, bpg: 0 };
    case "SF": return { apg: 0, rpg: 0, ppg: 1.0, threePct: 0, bpg: 0 };
    case "PF": return { apg: 0, rpg: 0, ppg: 0, threePct: 0, bpg: 0.3 };
    case "C":  return { apg: 0, rpg: 0, ppg: 0, threePct: 0, bpg: 0 };
    default:   return { apg: 0, rpg: 0, ppg: 0, threePct: 0, bpg: 0 };
  }
}

/* Retroactively upgrades (or confirms) a tournament result after a clutch
   moment resolves. Works uniformly across every tournament shape — youth
   tiers, national team knockouts, league championships — because it only
   needs the "before" and "after" result metadata, not the flow's internal
   structure. On a win: patches the just-built history entry's text, swaps
   the achievement, and adds a popularity/morale bump for the heroics. On a
   loss: the original (lesser) result already stands untouched. */
function applyClutchUpgrade(p, pending, won) {
  if (!won) return p;
  const { historyIndex, upgradeMeta, previousMeta } = pending;
  const history = [...p.history];
  const entry = history[historyIndex];
  const findText = (previousMeta && (previousMeta.noteText || previousMeta.label)) || null;
  const replaceText = (upgradeMeta && (upgradeMeta.noteText || upgradeMeta.label)) || null;
  if (entry && findText && replaceText) {
    history[historyIndex] = {
      ...entry,
      note: entry.note.split(findText).join(replaceText),
      champion: true,
    };
  }
  let achievements = p.achievements;
  if (previousMeta && previousMeta.achId) achievements = achievements.filter(a => a !== previousMeta.achId);
  if (upgradeMeta && upgradeMeta.achId) achievements = Array.from(new Set([...achievements, upgradeMeta.achId]));
  const popBump = ((upgradeMeta && upgradeMeta.popularity) || 0) - ((previousMeta && previousMeta.popularity) || 0) + 10;
  return {
    ...p,
    history,
    achievements,
    popularity: clamp(p.popularity + popBump),
    morale: clamp(p.morale + 15),
  };
}

function generateLeagueSeasonStats(stats, position, leagueId, role, height) {
  const roleMult = role === "Starter" ? 1.0 : role === "Rotation" ? 0.62 : 0.32;
  // Competition scaling: how this player's rating compares to what's
  // "normal" for this specific league, not a flat suppression. This is what
  // lets a dominant player crushing a weaker league blow past normal caps.
  const overallScale = computeOverall(stats, position);
  const compMult = competitionMult(overallScale, LEAGUE_TIER_ANCHOR[leagueId] ?? 60);
  const m = roleMult * compMult;
  const nudge = positionStatNudges(position);
  const apgPosBonus = (position === "PG" ? 1.8 : position === "SG" ? 0.5 : 0) + nudge.apg;
  const rpgPosBonus = (position === "C" ? 3.2 : position === "PF" ? 1.6 : 0) + nudge.rpg;
  // Percentages get a gentler version of the same scaling — tougher
  // competition dents efficiency somewhat, but nowhere near as sharply as
  // counting stats, since a player still shoots at their real skill level
  // on the looks they do get.
  const pctMult = 0.75 + compMult * 0.25;

  const ppg = clamp(round1((2 + nudge.ppg + stats.shooting * 0.19 + stats.athleticism * 0.03 + stats.playmaking * 0.02) * m * randFloat(0.85, 1.2)), 0.5, 38);
  const rpg = clamp(round1((1 + rpgPosBonus + stats.rebounding * 0.11 + stats.athleticism * 0.02) * m * randFloat(0.85, 1.15)), 0.3, 17);
  const apg = clamp(round1((0.4 + apgPosBonus + stats.playmaking * 0.045) * m * randFloat(0.85, 1.15)), 0.2, 9);
  const spg = clamp(round1((-0.9 + stats.defense * 0.042 + stats.athleticism * 0.005) * m * randFloat(0.85, 1.15)), 0.2, 3.1);
  // round1 AFTER the nudge — computeBlocks already rounds, so adding the
  // nudge afterwards reintroduced float error (1.9 + 0.3 = 2.1999999999999997,
  // which rendered raw and overflowed its box).
  const bpg = round1(computeBlocks(stats, position, height, m) + (Math.random() < 0.6 ? nudge.bpg : 0));
  const fgPct = computeFgPct(stats, position, 20, 0.3, 0.06, 0.92, 1.08, 15, 65, pctMult);
  const threePct = clamp(round1((12 + nudge.threePct + Math.max(0, stats.shooting - 25) * 0.4 + Math.max(0, stats.iq - 30) * 0.12) * pctMult * randFloat(0.85, 1.15)), 0, 52);
  const tr = clamp(Math.round((ppg / 25) * 32 + (rpg / 13) * 16 + (apg / 6) * 14 + (spg / 3.1) * 12 + (bpg / 3.2) * 8 + (fgPct / 58) * 12 + (threePct / 45) * 6), 0, 100);
  return { ppg, rpg, apg, spg, bpg, fgPct, threePct, tr, role, leagueId };
}

/* Season-end league awards. Common to U20 / U23 / MBL, with extra MBL-only ones.
   Each is an independent roll — strong numbers raise the odds, but only a few
   players win each per season, so nothing is guaranteed. */
const LEAGUE_AWARD_META = {
  top_scorer:   { label: "Top Scorer", short: "Top Scorer" },
  top_rebounder:{ label: "Top Rebounder", short: "Top Rebounder" },
  top_assists:  { label: "Top Assists", short: "Top Assists" },
  top_steals:   { label: "Top Steals", short: "Top Steals" },
  top_blocks:   { label: "Top Blocks", short: "Top Blocks" },
  dpoy:         { label: "Most Defensive Player", short: "DPOY" },
  tot:          { label: "Team of the Tournament", short: "Team of Tourney" },
  mvp:          { label: "Most Valuable Player", short: "MVP" },
  sixth_man:    { label: "Sixth Man of the Year", short: "6th Man" },   // MBL, rotation role only
  roty:         { label: "Rookie of the Year", short: "ROTY" },          // MBL, first MBL season only
};

/* Season awards.

   Stat-leader awards (Top Scorer, Top Rebounder, etc.) are now DECIDED BY
   THE LEADERBOARD, not rolled independently. Previously this function only
   saw the player's own line, so a 23.4 PPG season had a ~28% shot at Top
   Scorer even while sitting 7th of 41 — the recap awarded a title the
   standings flatly contradicted. If you did not lead the category, you
   cannot win it.

   Voted awards (MVP, DPOY, Team of the Tournament) stay probabilistic —
   they aren't decided by a single number — but are now GATED on actually
   being near the top of something, so they can't appear out of nowhere. */
function rollLeagueAwards(st, { leagueId, role, isFirstMblSeason, board }) {
  // Ranks are 1-based within the league field (NPC pool + the player).
  const rank = (k) => (board && board.ranks && board.ranks[k]) || null;
  const leads = (k) => rank(k) === 1;
  const topN = (k, n) => { const r = rank(k); return r != null && r <= n; };
  if (board && board.ranks) {
    const awards = [];
    if (leads("ppg")) awards.push("top_scorer");
    if (leads("rpg")) awards.push("top_rebounder");
    if (leads("apg")) awards.push("top_assists");
    if (leads("spg")) awards.push("top_steals");
    if (leads("bpg")) awards.push("top_blocks");
    const chanceB = (val, lo, hi, max) => clamp((val - lo) / (hi - lo), 0, 1) * max;
    /* DPOY: "top 3 in steals OR blocks" was far too loose — a point guard
       leads steals almost by default and was winning it ~55% of seasons.
       Require leading a defensive category outright, or being top-3 in
       BOTH, and lower the vote chance. */
    const defElite = leads("spg") || leads("bpg") || (topN("spg", 3) && topN("bpg", 3));
    if (defElite && Math.random() < chanceB(st.tr, 66, 100, 0.34)) awards.push("dpoy");
    // Team of the season: top-5 in any major category.
    if ((topN("ppg", 5) || topN("rpg", 5) || topN("apg", 5)) && Math.random() < chanceB(st.tr, 62, 100, 0.55)) awards.push("tot");
    // MVP: top-3 in something major, then the vote.
    if ((topN("ppg", 3) || topN("rpg", 3) || topN("apg", 3)) && Math.random() < chanceB(st.tr, 70, 100, 0.45)) awards.push("mvp");
    const mblB = leagueId === "mbl";
    if (mblB && role === "Rotation" && Math.random() < chanceB(st.tr, 66, 96, 0.20)) awards.push("sixth_man");
    if (mblB && isFirstMblSeason && Math.random() < chanceB(st.tr, 60, 92, 0.34)) awards.push("roty");
    return awards;
  }
  // Fallback for contexts with no league field (kept for safety).
  return rollLeagueAwardsLegacy(st, { leagueId, role, isFirstMblSeason });
}

function rollLeagueAwardsLegacy(st, { leagueId, role, isFirstMblSeason }) {
  const chance = (val, lo, hi, max) => clamp((val - lo) / (hi - lo), 0, 1) * max;
  const mbl = leagueId === "mbl";
  // Minimum stat average required to even be in the running for a stat-leader
  // award (below these, the award is simply not achievable — chance = 0).
  const ppgLo = mbl ? 18 : 21, ppgHi = mbl ? 30 : 32;
  const rpgLo = mbl ? 9.5 : 11.5, rpgHi = mbl ? 15 : 16;
  const apgLo = mbl ? 3.5 : 4.2, apgHi = 8;
  const spgLo = mbl ? 1.4 : 2.5, spgHi = 3.1;
  const bpgLo = mbl ? 1.1 : 1.5, bpgHi = mbl ? 3.2 : 4.3;
  const awards = [];
  if (Math.random() < chance(st.ppg, ppgLo, ppgHi, 0.28)) awards.push("top_scorer");
  if (Math.random() < chance(st.rpg, rpgLo, rpgHi, 0.28)) awards.push("top_rebounder");
  if (Math.random() < chance(st.apg, apgLo, apgHi, 0.28)) awards.push("top_assists");
  if (Math.random() < chance(st.spg, spgLo, spgHi, 0.28)) awards.push("top_steals");
  if (Math.random() < chance(st.bpg, bpgLo, bpgHi, 0.28)) awards.push("top_blocks");
  // Defensive Player: driven by steals + blocks together.
  if (Math.random() < chance(st.spg + st.bpg, (spgLo + bpgLo), (spgHi + bpgHi), 0.22)) awards.push("dpoy");
  // Team of the Tournament: strong all-round rating.
  if (Math.random() < chance(st.tr, 62, 100, 0.30)) awards.push("tot");
  // MVP: only the very best seasons.
  if (Math.random() < chance(st.tr, 72, 100, 0.16)) awards.push("mvp");
  // MBL-only awards.
  if (mbl && role === "Rotation" && Math.random() < chance(st.tr, 55, 90, 0.25)) awards.push("sixth_man");
  if (mbl && isFirstMblSeason && Math.random() < chance(st.tr, 45, 90, 0.35)) awards.push("roty");
  return awards;
}



function posWeights(posId) { return POSITIONS.find(p => p.id === posId).weights; }

function computeOverall(stats, posId) {
  const w = posWeights(posId);
  let total = 0;
  STAT_LIST.forEach(s => { total += stats[s] * w[s]; });
  return Math.round(total);
}

function getStageForAge(age) {
  if (age < 18) return "youth";
  return "pro";
}

function shortHome(h) { return h.split(",")[0]; }

function baseSalary(stage, abroad, overall, club) {
  if (stage === "youth") return 200;
  if (stage === "amateur") return 3000;
  if (abroad) return Math.round(60000 + overall * 2500);
  const base = 8000 + overall * 700;
  const mult = club ? club.salaryMult : 1;
  return Math.round(base * mult);
}

/* Monthly salary at signing / renewal, by league and role.
   - MBL:        RM3,500 (bench) -> RM10,000 (star starter), scaled by role + rating
   - Pro D-League (U20/U23): RM2,000-2,999, nudged by club wealth
   - Semi-pro:   RM1,700-2,100, nudged by club wealth
   The monthly figure is locked for the 2-year contract term. */
const CONTRACT_TERM_YEARS = 1; // first-ever contract is always 1 year

/* ============================================================
   "CONTINUE STUDY OR NOT?" — one-time decision at age 19.
   Not every player gets this offer — it's weighted by IQ (academically
   inclined players are more likely to have it on the table at all).
   Choosing study locks the player to semi-pro clubs / U20-U23 D-League
   only, for ages 19-22 (4 seasons), in exchange for faster IQ growth and
   lighter fatigue. At 23, they "graduate" and are free to sign pro again.
============================================================ */
const STUDY_OFFER_BASE = 0.20;      // floor chance, even at 0 IQ
const STUDY_OFFER_IQ_WEIGHT = 0.30; // scales up to +30% at 99 IQ (so 20%-50% range)
const STUDY_IQ_BONUS = 2;           // extra IQ growth per season while studying
const STUDY_FATIGUE_BONUS = 10;     // extra fatigue recovery per season while studying
const STUDY_END_AGE = 22;           // last year of study; graduates at 23

function computeStudyOfferChance(iq) {
  return clamp(STUDY_OFFER_BASE + (iq / 100) * STUDY_OFFER_IQ_WEIGHT, 0.20, 0.50);
}

/* Contract length offered:
   - First professional contract: always 2 years.
   - Ages 33-34: short, 1-2 year deals (winding-down career).
   - Age 35+: 1 year only.
   - Otherwise: anywhere from 1 to 5 years (better players tend to get longer). */
function offeredContractYears(p, { firstProSigning = false } = {}) {
  if (firstProSigning) return CONTRACT_TERM_YEARS;
  if (p.age >= 35) return 1;
  if (p.age >= 33) return randInt(1, 2);
  const overall = computeOverall(p.stats, p.position);
  const rating = overall * 0.7 + p.popularity * 0.3;
  // Higher-rated players are offered longer security.
  if (rating >= 78) return randInt(3, 5);
  if (rating >= 66) return randInt(2, 4);
  return randInt(1, 3);
}

function contractMonthlySalary({ leagueId, role, club, semiPro }) {
  if (leagueId === "mbl") {
    const lo = 3500, hi = 10000;
    const roleBase = role === "Starter" ? 0.7 : role === "Rotation" ? 0.4 : 0.12;
    const wealth = club ? clamp((club.salaryMult - 0.85) / (1.6 - 0.85), 0, 1) : 0.5;
    const t = clamp(roleBase + wealth * 0.3, 0, 1);
    return Math.round(lo + t * (hi - lo));
  }
  if (semiPro) {
    const lo = 1700, hi = 2100;
    const t = clamp(((club ? club.salaryMult : 1) - 0.85) / (1.6 - 0.85), 0, 1);
    return Math.round(lo + t * (hi - lo));
  }
  const lo = 2000, hi = 2999;
  const t = clamp(((club ? club.salaryMult : 1) - 0.85) / (1.6 - 0.85), 0, 1);
  return Math.round(lo + t * (hi - lo));
}

/* ============================================================
   BODY SYSTEM (height / weight / wingspan)

   Set once at creation, permanent for the career. Body doesn't
   grant free rating — it SHAPES the starting attribute spread,
   so a long-armed big starts better at rim protection and boards
   while a compact guard starts quicker and steadier from range.
   Every build sums to roughly the same total, so no body is
   strictly better; they're different starting shapes.
============================================================ */
const BODY_LIMITS = {
  height:   [154, 215],
  weight:   [55, 140],
  wingspan: [150, 245],
  reachMin: -6,   // wingspan may sit slightly under height
  reachMax: 35,   // hard ceiling: a 195cm player tops out at a 230cm span
};
// Clamp a wingspan against BOTH the absolute limits and the reach rule,
// so the two constraints can never disagree (e.g. a 154cm player can't
// reach the 245cm absolute max — the +35 rule caps them at 189cm).
function wingspanBounds(height) {
  const h = height || 180;
  return {
    min: Math.max(BODY_LIMITS.wingspan[0], h + BODY_LIMITS.reachMin),
    max: Math.min(BODY_LIMITS.wingspan[1], h + BODY_LIMITS.reachMax),
  };
}
function clampWingspan(height, wingspan) {
  const b = wingspanBounds(height);
  return Math.max(b.min, Math.min(b.max, wingspan));
}

// Typical frame per position — used only as the midpoint that body
// modifiers measure deviation FROM. Sliders are not limited to these.
const BODY_RANGES = {
  PG: { h: [168, 190], w: [62, 92],  s: [-2, 14] },
  SG: { h: [175, 196], w: [68, 98],  s: [-2, 15] },
  SF: { h: [182, 202], w: [74, 106], s: [-2, 16] },
  PF: { h: [188, 208], w: [82, 118], s: [-2, 17] },
  C:  { h: [193, 215], w: [88, 130], s: [-2, 18] },
};
function defaultBody(posId) {
  const r = BODY_RANGES[posId] || BODY_RANGES.SF;
  const height = Math.round((r.h[0] + r.h[1]) / 2);
  return {
    height,
    weight: Math.round((r.w[0] + r.w[1]) / 2),
    wingspan: clampWingspan(height, height + 6),
  };
}
/* Returns per-attribute modifiers from the body build. Deliberately
   near zero-sum: length and mass help inside, compactness helps
   outside, so no single build dominates. */
function bodyModifiers({ height, weight, reach, position }) {
  const h = height || 180, w = weight || 80, r = reach == null ? 6 : reach;
  const rng = BODY_RANGES[position] || BODY_RANGES.SF;
  const midH = (rng.h[0] + rng.h[1]) / 2;
  const midW = (rng.w[0] + rng.w[1]) / 2;
  const bmi = w / Math.pow(h / 100, 2);

  /* Soft response curve. The sliders span 61cm of height and 85kg of weight,
     so a linear model produced ±20 swings at the extremes (a 215cm/140kg
     centre lost 10 athleticism). Raising the deviation to a fractional power
     keeps normal builds responsive while compressing absurd ones. */
  const soft = (d, k) => Math.sign(d) * Math.pow(Math.abs(d), 0.72) * k;
  const dh = soft(h - midH, 1), dw = soft(w - midW, 1), dr = soft(r - 6, 1);
  const dwPos = Math.max(0, dw);

  const raw = {
    shooting:    -dh * 0.42 - dr * 0.26 - dwPos * 0.13,
    playmaking:  -dh * 0.47 - dwPos * 0.16,
    defense:      dr * 0.68 + dh * 0.13 + dw * 0.13,
    rebounding:   dh * 0.52 + dr * 0.62 + dw * 0.16,
    athleticism: -dw * 0.37 - Math.max(0, dh) * 0.16 + (bmi < 21 ? 1 : 0),
    iq:           0,
  };

  /* Zero-sum correction. Positions that concentrate weight on defense +
     rebounding (C: .65 combined) would otherwise gain far more from an
     extreme frame than they lose on the perimeter, making "max everything"
     strictly optimal (5.4 OVR swing before this). Since position weights
     sum to 1, subtracting the weighted mean forces the weighted total to
     zero — body changes your SHAPE, never your rating. */
  const wts = posWeights(position);
  let bias = 0;
  STAT_LIST.forEach(k => { bias += raw[k] * (wts[k] || 0); });

  /* Final safety clamp. Deliberately absurd builds (a 154cm 140kg centre)
     could still swing a single attribute by ~19, which would gut a starting
     stat. ±10 keeps even silly frames playable; the zero-sum property is
     preserved to within rounding because clamping is symmetric. */
  const out = {};
  STAT_LIST.forEach(k => { out[k] = clamp(Math.round(raw[k] - bias), -10, 10); });
  return out;
}

/* ============================================================
   CAREER INVESTMENTS — spending money on your own career

   Money was previously a scoreboard: earned all career, never spent,
   and ignored by legacyTitle(). These four upkeep options give it a
   job, and each optimises for a DIFFERENT outcome so none is a
   strictly-correct purchase:

     trainer  -> peak rating      (+1 attribute point/season)
     science  -> durability       (half injury risk, slower decline, +1 season)
     family   -> stability        (no overseas settling-in dip, no bad-season spiral)
     agent    -> access           (overseas offers 75%->95%, better role band)

   Costs are a PERCENTAGE of monthly salary, not flat RM. Career
   earnings span RM438k (domestic) to RM121M (NBA) — a 280x range —
   so flat pricing would be pocket change at the top and crippling at
   the bottom. All four total 72% of salary, so nobody can run
   everything; two is 45%, which is the intended real choice.
============================================================ */
const INVESTMENTS = {
  trainer: { id: "trainer", label: "Personal Trainer",       pct: 0.25 },
  science: { id: "science", label: "Sports Science & Physio", pct: 0.20 },
  family:  { id: "family",  label: "Support Your Family",     pct: 0.15 },
  agent:   { id: "agent",   label: "Elite Agent",             pct: 0.12 },
};
const AGENT_RATING_BOOST = 3;             // effective rating uplift for overseas scouting only
const INVESTMENT_MAX_PCT = 0.72;          // cannot commit more than this
const OVERSEAS_SETTLING_DIP = [2, 5];     // first-season-abroad form dip, removed by family support

function hasInvestment(p, id) {
  return !!(p && p.investments && p.investments[id]);
}
function investmentPct(p) {
  if (!p || !p.investments) return 0;
  return Object.keys(INVESTMENTS).reduce(
    (t, k) => t + (p.investments[k] ? INVESTMENTS[k].pct : 0), 0
  );
}
/* Monthly upkeep in RM, charged against the contract salary. */
function investmentUpkeep(p) {
  const salary = p && p.contractSalary ? p.contractSalary : 0;
  return Math.round(salary * investmentPct(p));
}

/* Retirement wealth tiers. legacyTitle() describes what you ACHIEVED;
   this is the independent axis of what the career LEFT you with, so
   spending is a genuine trade-off rather than free upside. Thresholds
   are calibrated against a ~RM1.16M gross domestic career. */
const WEALTH_TIERS = [
  { id: "set_for_life", label: "Set for Life", min: 5000000, note: "Never has to work again." },
  { id: "comfortable",  label: "Comfortable",  min: 900000,  note: "Home paid off. Could open a gym or academy." },
  { id: "stable",       label: "Stable",       min: 500000,  note: "A cushion — but a second career is coming." },
  { id: "modest",       label: "Modest",       min: 200000,  note: "Enough to retrain. The game gave, but not much." },
  { id: "nothing_left", label: "Nothing Left", min: 0,       note: "Years of basketball, little to show for it." },
];
function wealthTier(money) {
  return WEALTH_TIERS.find(t => (money || 0) >= t.min) || WEALTH_TIERS[WEALTH_TIERS.length - 1];
}

/* ============================================================
   ATTRIBUTE POINT SYSTEM (replaces the old Training screen)

   Each season the player earns a pool of points and spends them
   raising attributes directly. Three levers keep this from
   collapsing the career curve:

   1. COST CURVE — rises with the attribute value, and is scaled by
      the position weight. Without the weight scaling, concentrated
      positions (C: .30 def + .35 reb) out-min-max spread ones
      (SF: .22/.15/.20/.13) by ~7 OVR. Scaling cuts that to ~3.
   2. AGE CAPS — hard ceiling per attribute that rises with age, so
      a 15-year-old can't dump everything into one stat.
   3. TALENT TIERS — a per-career points multiplier. Pure point-buy
      makes every career identical (p10 66 / p90 72 in testing);
      the multiplier restores the spread that makes NBA reachable
      but rare.
============================================================ */
const ATTR_COST_BANDS = [[45, 1], [60, 2], [72, 3], [82, 4], [90, 5], [Infinity, 7]];
function attrRawCost(value) {
  for (const [ceil, c] of ATTR_COST_BANDS) if (value < ceil) return c;
  return 7;
}
// Weight-scaled cost: raising a stat your position leans on costs more.
function attrPointCost(value, statKey, posId) {
  const w = posWeights(posId)[statKey] || 0;
  return Math.max(1, Math.round(attrRawCost(value) * (0.70 + 1.8 * w)));
}

const ATTR_AGE_CAPS = {
  15: 46, 16: 52, 17: 58, 18: 64, 19: 69, 20: 73, 21: 77, 22: 80,
  23: 83, 24: 86, 25: 88, 26: 90, 27: 92, 28: 94, 29: 95, 30: 96,
};
function attrAgeCap(age, stats) {
  let cap;
  if (age <= 14) cap = 46;
  else if (age > 30) cap = 99;
  else cap = ATTR_AGE_CAPS[age] || 46;
  // A prodigy can roll starting attributes ABOVE the age cap (playmaking can
  // start at 58 against a cap of 46). Without this the cap would block them
  // from spending at all — ~18% of creation points were being silently
  // wasted, and 1.25% of players could spend nothing. Lift the cap to sit
  // just above their best attribute so they always have somewhere to invest.
  if (stats) {
    const best = Math.max(...STAT_LIST.map(k => stats[k] || 0));
    if (best >= cap) cap = Math.min(99, best + 4);
  }
  return cap;
}

// Talent tiers — rolled once at career creation, persistent.
const TALENT_TIERS = [
  { id: "common", label: "Common", chance: 0.55, mult: 1.00 },
  { id: "talented", label: "Talented", chance: 0.27, mult: 1.28 },
  { id: "elite", label: "Elite", chance: 0.14, mult: 1.62 },
  { id: "generational", label: "Generational", chance: 0.04, mult: 2.15 },
];
function rollTalentTier() {
  const r = Math.random();
  let acc = 0;
  for (const t of TALENT_TIERS) { acc += t.chance; if (r < acc) return t.id; }
  return "common";
}
function talentMult(id) {
  const t = TALENT_TIERS.find(x => x.id === id);
  return t ? t.mult : 1.00;
}

/* Base points per season by age. Reduced from 13/14/15/13/7/4 after testing:
   the original curve had the MEDIAN player gaining 1.2-1.4 OVR every season
   from 22 to 30, so 89% of guards and 99% of centres drifted past the MBL
   threshold just by showing up. Lower base makes prime-years progress feel
   earned and keeps MBL a milestone rather than a formality. The late-career
   values fall proportionally less, so veterans still have something to spend.
   Nudged +2 across the board after real playtesting showed even a
   reasonably-played career (even-split spending, not min-maxed) only
   reached 70+ overall about 1 time in 5 — simulated at 20k careers per
   variant: even-split 70+ rate went 18.7% -> 30.4%, efficient-spend 70+
   went 33.0% -> 46.1%, while the 80+ ceiling barely moved (1.1% -> 4.8%),
   so the top tier stays rare rather than becoming trivial. */
const ATTR_BASE_POINTS = [[17, 12], [22, 13], [26, 14], [30, 12], [33, 8], [Infinity, 5]];
function attrBasePoints(age) {
  for (const [ceil, v] of ATTR_BASE_POINTS) if (age <= ceil) return v;
  return 4;
}

/* Season points = (base + noise + performance + facility) * talent multiplier.
   `perfBonus` comes from last season's tier (set in the season resolver);
   `facility` from the state programme / club quality. */
function computeSeasonPoints(p, perfBonus = 0) {
  const base = attrBasePoints(p.age);
  const noise = randInt(-1, 1);
  let facility = 0;
  if (p.age < 19 && p.hometown) {
    const tier = getStateTier(p.hometown);
    facility = tier === 1 ? 2 : tier === 2 ? 1 : 0;
  } else if (p.league === "mbl") facility = 2;
  else if (p.abroad) facility = 2;
  else if (p.clubId) facility = 1;
  const raw = base + noise + perfBonus + facility;
  let pts = Math.max(1, Math.round(raw * talentMult(p.talentTier)));
  // Personal trainer: extra year-round individual work. Only from 18, when
  // there's a salary to pay for it.
  if (p.age >= 18 && hasInvestment(p, "trainer")) pts += 1;
  return pts;
}

/* growthAmount() removed — the attribute-point system replaced per-season
   automatic growth entirely. It had no remaining call sites. */

const TIER_LABELS = ["Rough", "Struggling", "Steady", "Solid", "Breakout", "Legendary"];
const TIER_NOTES = {
  0: ["A season to forget. The bench got very familiar.", "Nothing clicked. Minutes dried up fast."],
  1: ["An up-and-down year with more downs.", "Flashes of promise, buried in inconsistency."],
  2: ["A steady, unspectacular season — you did your job.", "Reliable minutes, nothing flashy."],
  3: ["A genuinely solid campaign. Coaches trust you now.", "You held your own against good competition."],
  4: ["A breakout year. People are starting to talk.", "You took a real leap this season."],
  5: ["An all-time season. Highlight reels everywhere.", "You were, simply, the best player on the floor most nights."],
};

function simulateSeason(player) {
  const overall = computeOverall(player.stats, player.position);
  // Coach trust was previously read only for release/offer risk — it never
  // touched the season itself. A coach who trusts you gives you the run to
  // actually show it; one who doesn't leaves you fighting for minutes no
  // matter how well you played. Kept deliberately small (±3 at the extremes,
  // default 50 = 0) so it nudges a borderline tier rather than overriding
  // the ability/morale/fatigue formula that already drives this.
  const coachFactor = ((player.relationships && player.relationships.coach) - 50 || 0) * 0.06;
  const score = overall * 0.55 + player.morale * 0.25 + (100 - player.fatigue) * 0.2 + coachFactor;
  let tier = 0;
  if (score >= 80) tier = 5;
  else if (score >= 68) tier = 4;
  else if (score >= 55) tier = 3;
  else if (score >= 42) tier = 2;
  else if (score >= 28) tier = 1;
  const club = getClub(player.clubId);
  const fameMult = club ? club.fameMult : 1;
  const popularityDelta = Math.round([-3, 0, 2, 5, 9, 14][tier] * fameMult);
  const moraleDelta = [-8, -3, 2, 5, 8, 12][tier];
  // Student athletes under 18 earn no income.
  const earns = player.age >= 18;
  // Club players earn their locked monthly contract salary (×12 for the season);
  // otherwise fall back to the legacy amateur/overseas model.
  let salary = 0;
  if (earns) {
    if (player.contractSalary && (player.clubId || player.semiProClub || player.abroad)) {
      salary = player.contractSalary * 12;
    } else {
      salary = baseSalary(player.stage, player.abroad, overall, club);
    }
  }
  const bonus = earns ? Math.round(salary * (tier / 8)) : 0;
  return {
    overall, tier, tierLabel: TIER_LABELS[tier], note: pick(TIER_NOTES[tier]),
    popularityDelta, moraleDelta, salary, bonus, moneyDelta: salary + bonus,
  };
}

function legacyTitle(p) {
  if (p.peakOverall >= 88 && p.nationalCaps > 0 && p.abroadEver) return "Malaysian Basketball Legend";
  if (p.abroadEver && p.peakOverall >= 75) return "International Pro";
  if (p.nationalCaps > 0) return "National Team Veteran";
  if (p.peakOverall >= 65) return "Solid Professional";
  return "Journeyman Baller";
}

/* The single headline used on a Hall of Fame card — the most impressive
   tier this career actually reached, checked in descending order. Tint
   drives the card's badge color (gold for the very top tier, neutral for
   everything else, dim for a career that never really took off). */
function hallOfFameTier(p) {
  const has = id => (p.achievements || []).includes(id);
  if (has("nba_player")) return { label: "NBA Player", icon: "🌏", tint: "gold" };
  if (has("euroleague_player")) return { label: "EuroLeague Player", icon: "🥈", tint: "neutral" };
  if (has("asia_pro_player")) return { label: "Asia Pro Player", icon: "🥉", tint: "neutral" };
  if (has("mbl_champion")) return { label: "MBL Champion", icon: "🏆", tint: "amber" };
  if (has("uba_graduate")) return { label: "UBA Graduate", icon: "🎓", tint: "neutral" };
  if (has("hbl_import")) return { label: "Taiwan HBL Import", icon: "✈️", tint: "neutral" };
  return { label: "Retired in Malaysia", icon: "🏀", tint: "dim" };
}

const HALL_OF_FAME_KEY = "hoops_life_hall_of_fame";
const HALL_OF_FAME_MAX = 50;

/* Snapshots a just-finished career into the Hall of Fame. Purely additive —
   never touches the active career save — and capped so it can't grow
   unbounded over months of play (oldest entries drop off first). */
function saveToHallOfFame(p, careerSummary) {
  try {
    if (typeof window === "undefined" || !window.localStorage) return;
    const tier = hallOfFameTier(p);
    const pro = (careerSummary && careerSummary.proCareer) || null;
    const entry = {
      id: `${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
      name: p.name || "Unnamed Player",
      position: p.position,
      jersey: p.jersey,
      hometown: p.hometown,
      peakOverall: p.peakOverall,
      tierLabel: tier.label,
      tierIcon: tier.icon,
      tierTint: tier.tint,
      avg: pro ? { ppg: pro.avg.ppg, rpg: pro.avg.rpg, apg: pro.avg.apg, spg: pro.avg.spg, bpg: pro.avg.bpg, fgPct: pro.avg.fgPct, threePct: pro.avg.threePct } : { ppg: 0, rpg: 0, apg: 0, spg: 0, bpg: 0, fgPct: 0, threePct: 0 },
      games: pro ? pro.games : 0,
      retiredAge: p.age,
      trophies: (careerSummary.clubs || []).reduce((sum, c) => sum + (c.titles || 0), 0),
      timestamp: Date.now(),
    };
    const raw = window.localStorage.getItem(HALL_OF_FAME_KEY);
    const list = raw ? JSON.parse(raw) : [];
    list.unshift(entry);
    if (list.length > HALL_OF_FAME_MAX) list.length = HALL_OF_FAME_MAX;
    window.localStorage.setItem(HALL_OF_FAME_KEY, JSON.stringify(list));
  } catch (e) { /* Hall of Fame is a bonus feature — never let it block retirement */ }
}

function loadHallOfFame() {
  try {
    if (typeof window === "undefined" || !window.localStorage) return [];
    const raw = window.localStorage.getItem(HALL_OF_FAME_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) { return []; }
}

const ACHIEVEMENT_GALLERY_KEY = "hoops_life_achievement_gallery";

/* Records the first time each achievement is ever earned, across every
   career ever played — not just the current one. Hooked into the main
   save() function so it stays in sync automatically without needing to
   touch every individual place an achievement gets granted. Only writes
   to storage when there's actually something new to record. */
/* PERFORMANCE: this runs on every save (60+ call sites). It was doing a
   synchronous localStorage read + JSON.parse + write each time, on the main
   thread, even when the player had unlocked nothing new. The fast path below
   skips all of that unless the achievement list actually changed. */
let _lastSyncedAchSig = null;
function syncAchievementGallery(p) {
  try {
    if (typeof window === "undefined" || !window.localStorage) return;
    if (!p || !p.achievements || p.achievements.length === 0) return;
    const sig = p.achievements.length + ":" + p.achievements[p.achievements.length - 1];
    if (sig === _lastSyncedAchSig) return;   // nothing new since last save
    _lastSyncedAchSig = sig;
    const raw = window.localStorage.getItem(ACHIEVEMENT_GALLERY_KEY);
    const gallery = raw ? JSON.parse(raw) : {};
    let changed = false;
    p.achievements.forEach(id => {
      if (!gallery[id]) {
        gallery[id] = { unlockedAt: Date.now(), playerName: p.name || "Unnamed Player" };
        changed = true;
      }
    });
    if (changed) window.localStorage.setItem(ACHIEVEMENT_GALLERY_KEY, JSON.stringify(gallery));
  } catch (e) { /* the gallery is a bonus feature — never let it block a save */ }
}

function loadAchievementGallery() {
  try {
    if (typeof window === "undefined" || !window.localStorage) return {};
    const raw = window.localStorage.getItem(ACHIEVEMENT_GALLERY_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (e) { return {}; }
}

function checkAchievements(p) {
  const set = new Set(p.achievements);
  if (p.nationalTeam) set.add("national_debut");
  /* SEA Games medal badges. Counted from history rather than a running
     tally so they stay correct if a career is reloaded mid-run. Team
     medals only — the SEA Games award no individual honours in this game. */
  {
    const seaMedals = (p.history || []).filter(h => h.tournament && /^SEA Games — (Gold|Silver|Bronze) Medal$/.test(h.tournament));
    if (seaMedals.length >= 2) set.add("sea_games_multi");
    const kinds = new Set(seaMedals.map(h => h.tournament.split("— ")[1]));
    if (kinds.has("Gold Medal") && kinds.has("Silver Medal") && kinds.has("Bronze Medal")) set.add("sea_games_setl");
  }
  if (p.abroad || p.abroadEver) set.add("overseas_pro");
  if (p.popularity >= 80) set.add("fan_favorite");
  if (p.money >= 500000) set.add("financially_set");
  if (p.peakOverall >= 88) set.add("elite_talent");
  if (p.seasonNum >= 15) set.add("veteran");
  if (p.clubHistory && p.clubHistory.length >= 4) set.add("journeyman");
  /* Rival-tied achievements. All three read player.rival, which nothing
     else in the game reads or is affected by — purely additive, same
     achievement system, no new mechanics. Peak overall only ever rises for
     both sides, so "beaten" and "got away" fire once and stay earned even
     if the gap later closes back up; that's the intended behaviour for a
     badge marking a moment that happened, not a currently-true state. */
  if (p.rival) {
    if (p.peakOverall > p.rival.peakOverall) set.add("rival_beaten");
    if (p.rival.caps > 0 && (p.nationalCaps || 0) === 0) set.add("the_one_that_got_away");
    if ((p.mblTitles || 0) > 0 && (p.mblTitles || 0) > p.rival.titles) set.add("settled_score");
  }
  return Array.from(set);
}

/* Works out the concrete terms a given club would offer this player right now:
   which league they'd play in, their role, and the exact monthly salary — so
   offers can be shown with real numbers before the player signs.
   `firstProSigning` applies the 18-year-old wonderkid/contributor split. */
function computeClubTerms(p, club, { firstProSigning = false } = {}) {
  const overall = computeOverall(p.stats, p.position);
  const rating = overall * 0.7 + p.popularity * 0.3;
  const semiPro = isSemiProClub(club);
  const over23 = p.age > U23_MAX_AGE;

  // Base role from squad depth at the club.
  const starterRoll = (rating - club.prestige) / 100 + 0.5;
  let role;
  if (starterRoll > club.startingFiveDifficulty + 0.15) role = "Starter";
  else if (starterRoll > club.startingFiveDifficulty - 0.15) role = "Rotation";
  else role = "Bench";

  let firstOption = false;
  if (club.firstOptionChance && p.__offerFirstOption && p.__offerFirstOption[club.id]) {
    firstOption = true; role = "Starter";
  }

  let league;
  if (semiPro) {
    // Semi-pro clubs only field development-league sides; not available past 23.
    league = (p.age <= 20) ? "u20" : "u23";
  } else if (firstProSigning && !over23) {
    // Decided at signing time via the wonderkid/contributor split; preview as MBL-bench
    // or D-League depending on a stored roll so the shown terms match the outcome.
    league = p.__proSplitLeague || ((p.age <= 20) ? "u20" : "u23");
    if (league === "mbl") role = p.__proSplitRole || "Bench";
  } else if (over23) {
    // 24+: MBL only, bench if rating isn't there yet.
    league = "mbl";
    if (rating < MBL_RATING_THRESHOLD) role = "Bench";
  } else {
    league = (rating >= MBL_RATING_THRESHOLD) ? "mbl" : ((p.age <= 20) ? "u20" : "u23");
  }

  const salary = contractMonthlySalary({ leagueId: league, role, club, semiPro });
  const years = offeredContractYears(p, { firstProSigning });
  return { league, role, salary, firstOption, semiPro, years };
}

/* ============================================================
   CONTRACT NEGOTIATION
   Leverage is read from the SAME rating used to generate offers in the
   first place (computeClubTerms's overall*0.7 + popularity*0.3), compared
   against the club's own prestige — a star being lowballed by a middling
   club has real leverage; a fringe player at an elite club doesn't. The
   Elite Agent investment adds a flat, felt bonus on top, giving it a
   mechanical reason to exist beyond its current overseas-scouting bump.
   Simulated across 8 representative scenarios before writing this: fair
   matchups land at ~40% leverage (win rates 25-40%), a star at a weak
   club tops out around 72-80% (capped — even elite talent keeps some
   real risk), and role asks are consistently harder/riskier than money
   asks at every leverage level, by design. */
function negotiationLeverage(p, club) {
  const overall = computeOverall(p.stats, p.position);
  const rating = overall * 0.7 + p.popularity * 0.3;
  const diff = rating - club.prestige;
  let score = 0.40 + clamp(diff / 80, -0.28, 0.32);
  if (hasInvestment(p, "agent")) score += 0.12;
  return clamp(score, 0.08, 0.80);
}
function negotiationTier(score) {
  return score < 0.35 ? "low" : score < 0.55 ? "medium" : "high";
}
function negotiationOdds(score, askType) {
  const roleFactor = askType === "role" ? 0.62 : 1;
  const winChance = clamp(score * roleFactor, 0.05, 0.85);
  const walkBase = askType === "role" ? 0.10 : 0.05;
  const walkChance = clamp(walkBase + (1 - score) * (askType === "role" ? 0.22 : 0.15), 0.04, 0.45);
  const holdChance = clamp(1 - winChance - walkChance, 0.03, 1);
  return { winChance, holdChance, walkChance };
}
// Bench -> Rotation -> Starter. Deliberately stops there (no First Option
// negotiation) to keep the first pass of this system well-scoped.
function nextRoleTier(role) {
  if (role === "Bench") return "Rotation";
  if (role === "Rotation") return "Starter";
  return null;
}
// Used to tell an upgrade from a downgrade when role shifts on its own
// between seasons (not via signing/negotiation), so the player gets the
// right framing rather than always reading as bad news.
const ROLE_RANK = { Bench: 0, Rotation: 1, Starter: 2 };

/* ============================================================
   TRADE REQUEST — a player-initiated exit, distinct from Trade Rumors
   (which is club-initiated and only ever fires when Team Chemistry is
   already low). Deliberately shares its sibling relationship with the
   Contract Negotiation system above: same "make a case, see the odds"
   shape, reusing the SAME rating formula (overall*0.7 + popularity*0.3).
   One asymmetry, on purpose: low Team Chemistry HELPS the case here
   (a club unhappy with you is more willing to let you go), the opposite
   of how it factors into negotiation. Simulated across 6 representative
   scenarios before writing this: a genuinely justified ask (a benched
   player at a struggling relationship) lands a clean grant most of the
   time (~65% case strength); an unjustified one (a happy Starter asking
   anyway) risks real harsh consequences (~50% harsh-deny chance) rather
   than just quietly failing. */
function tradeRequestCase(p, club, reason) {
  const overall = computeOverall(p.stats, p.position);
  const rating = overall * 0.7 + p.popularity * 0.3;
  let base;
  if (reason === "role") {
    base = p.starterStatus === "Bench" ? 0.55 : p.starterStatus === "Rotation" ? 0.35 : 0.15;
  } else if (reason === "contender") {
    const diff = rating - club.prestige;
    base = 0.30 + clamp(diff / 100, -0.20, 0.35);
  } else {
    base = 0.22; // "fresh" — no specific grievance, weakest baseline case
  }
  const chemBoost = (50 - p.relationships.team) / 100;
  base += chemBoost * 0.4;
  return clamp(base, 0.08, 0.75);
}
// Splits the case strength into four outcomes. Among grants, a stronger
// player (rating well above the league's MBL bar) is more likely to land
// a real transfer-window outcome rather than just being cut loose with no
// leverage; among denials, a weaker case draws a harsher response.
function tradeRequestOutcome(caseStrength, p) {
  const overall = computeOverall(p.stats, p.position);
  const ratingBand = clamp((overall - 45) / 40, 0.1, 0.9);
  const grantChance = caseStrength;
  const grantWellShare = clamp(0.3 + ratingBand * 0.5, 0.15, 0.9);
  const harshShare = clamp(0.6 - caseStrength * 0.7, 0.1, 0.7);
  return {
    grantWell: grantChance * grantWellShare,
    grantPoorly: grantChance * (1 - grantWellShare),
    denySoft: (1 - grantChance) * (1 - harshShare),
    denyHarsh: (1 - grantChance) * harshShare,
  };
}
const TRADE_REQUEST_REASONS = [
  { id: "role", label: "Bigger Role", icon: "star", tagline: p => `Still ${p.starterStatus || "Bench"}` },
  { id: "contender", label: "Chase a Contender", icon: "trophyCash", tagline: () => "A real shot at winning" },
  { id: "fresh", label: "Fresh Start", icon: "doorExit", tagline: () => "No specific complaint" },
];

/* Generates a set of club offers (pro + semi-pro) for a player, weighted by
   the player's overall + fame and each club's prestige and preferences. Elite
   clubs only chase strong players; weaker players lean toward semi-pro sides.
   Each offer carries concrete terms (league, role, salary). Always returns at
   least one offer (a semi-pro club will take almost anyone). */
function generateClubOffers(p, { count = 3, excludeId = null, firstProSigning = false } = {}) {
  const overall = computeOverall(p.stats, p.position);
  const rating = overall * 0.7 + p.popularity * 0.3;
  const over23 = p.age > U23_MAX_AGE;
  // Study-track players (the age-19 "continue study or not" choice) can only
  // sign with semi-pro clubs until they graduate at 23 — applies to every
  // offer scenario (first signing, transfer, release, expiry) automatically.
  const semiProOnly = !!p.studying && !over23;
  // Over-23 players can't sign with semi-pro sides (no MBL team there).
  const pool = semiProOnly ? [...SEMI_PRO_CLUBS] : (over23 ? [...PRO_CLUBS] : [...PRO_CLUBS, ...SEMI_PRO_CLUBS]);

  // Pre-roll the first-pro-signing split once, and which Sarawak-style clubs give first option,
  // so the previewed terms match what the player actually gets on signing.
  if (firstProSigning && !p.__proSplitLeague) {
    const roll = Math.random();
    if (roll < PRO_WONDERKID_CHANCE) { p.__proSplitLeague = "mbl"; p.__proSplitRole = "Rotation"; p.__proWonderkid = true; }
    else if (roll < PRO_WONDERKID_CHANCE + PRO_STRAIGHT_CONTRIBUTE_CHANCE) { p.__proSplitLeague = "mbl"; p.__proSplitRole = "Bench"; }
    else { p.__proSplitLeague = (p.age <= 20) ? "u20" : "u23"; }
  }
  p.__offerFirstOption = p.__offerFirstOption || {};
  PRO_CLUBS.forEach(c => {
    if (c.firstOptionChance && p.__offerFirstOption[c.id] === undefined) {
      p.__offerFirstOption[c.id] = Math.random() < c.firstOptionChance;
    }
  });

  const scored = pool.filter(c => c.id !== excludeId).map(c => {
    let interest = 100 - Math.abs(c.prestige - rating); // clubs want players near their level
    if (c.prestige > rating + 15) interest -= (c.prestige - rating) * 1.5; // elite clubs cool on weaker players
    if (c.prefersLocal && c.prefersLocal === p.hometown) interest += 25;
    if (c.state === p.hometown) interest += 10;
    if (c.shootingClub && p.stats.shooting >= 70) interest += 15;
    if (c.tier === "semipro") interest = Math.max(interest, 45) + randInt(-8, 12);
    else interest += randInt(-15, 15); // noise
    return { club: c, interest };
  });
  scored.sort((a, b) => b.interest - a.interest);
  let chosen = scored.slice(0, count).map(s => s.club);
  if (chosen.length === 0) {
    const fallbackPool = semiProOnly ? SEMI_PRO_CLUBS : (over23 ? PRO_CLUBS : SEMI_PRO_CLUBS);
    const fallback = fallbackPool.filter(c => c.id !== excludeId);
    if (fallback.length) chosen.push(pick(fallback));
  }
  return chosen.map(club => ({ club, terms: computeClubTerms(p, club, { firstProSigning }) }));
}

/* Decides a club-related career event for the current season:
   'stay' (nothing changes / re-sign), 'offers' (transfer window with choices),
   or 'released' (let go). Weighted by performance, relationships, morale, and
   whether the club has money troubles. */
function rollClubEvent(p) {
  const overall = computeOverall(p.stats, p.position);
  const club = getClub(p.clubId);
  const rating = overall * 0.7 + p.popularity * 0.3;

  // Club bankruptcy (Penang / Aseel) forces a move regardless.
  if (club && club.bankruptcyChance && Math.random() < club.bankruptcyChance) {
    return { type: "bankrupt" };
  }

  // A requested trade (from the Trade Rumors event, low Team Chemistry)
  // guarantees a transfer window opens THIS season — same path an organic
  // one takes below, just skipping the roll. One-shot: consumed here so it
  // doesn't linger into future seasons if this branch is somehow skipped.
  if (p.pendingForcedTransferRequest) {
    p.pendingForcedTransferRequest = false;
    return { type: "offers" };
  }

  // Release risk: poor form, bad relationships, or low morale.
  let releaseChance = 0.05;
  if (rating < club.prestige - 25) releaseChance += 0.15; // badly outclassed at the club
  if (p.relationships.coach < 25) releaseChance += 0.12;
  if (p.relationships.team < 25) releaseChance += 0.08;
  if (p.morale < 25) releaseChance += 0.06;
  if (p.age >= 33) releaseChance += 0.05;
  // Strong family ties read as stability off the court — clubs are a
  // little slower to cut a player whose life outside basketball is settled.
  if (p.relationships.family >= 80) releaseChance -= 0.04;
  releaseChance = clamp(releaseChance, 0, 0.6);
  if (Math.random() < releaseChance) return { type: "released" };

  /* Transfer-window opportunity. This used to fire ~8 of 15 seasons for a
     good player: outgrowing your club pushed the chance to 0.48 and a strong
     player at a mid-table side trips that EVERY year, so the offers screen
     kept yanking them out of contracts that had years left. That reads as
     "my club keeps getting rid of me". Now it's rare while a deal is
     running, and only common once the contract is nearly up. */
  const yearsLeft = typeof p.contractYearsLeft === "number" ? p.contractYearsLeft : 0;
  let offerChance = yearsLeft >= 2 ? 0.06 : 0.28;
  if (rating > club.prestige + 10) offerChance += yearsLeft >= 2 ? 0.05 : 0.2;
  if (p.relationships.coach < 40 || p.morale < 40) offerChance += 0.12; // unhappy players look around
  offerChance = clamp(offerChance, 0, 0.75);
  if (Math.random() < offerChance) return { type: "offers" };

  return { type: "stay" };
}

function newPlayer({ name, position, hometown, height, jersey }) {
  const w = posWeights(position);
  const stats = {};
  // Starting attributes tuned so a 15-year-old averages ~40 overall
  // (~48 for the 15% highly-talented prodigies).
  const highlyTalented = Math.random() < 0.15;
  STAT_LIST.forEach(s => {
    let base = randInt(29, 37);
    const bonus = Math.round(w[s] * 26);
    if (highlyTalented) base += randInt(7, 13);
    stats[s] = clamp(base + bonus, 1, 99);
  });
  const overall = computeOverall(stats, position);
  const heightWillGrow = Math.random() < 0.3;
  const heightGrowthCutoff = heightWillGrow ? randInt(19, 23) : 16;
  return {
    name: name || "Ayden Rahman",
    position, hometown,
    jersey: (jersey === "" || jersey === null || jersey === undefined) ? randInt(0, 99) : clamp(Number(jersey), 0, 99),
    age: 15, seasonNum: 1, year: 2026,
    stats,
    highlyTalented,
    weight: null,
    wingspan: null,
    reach: null,
    natQueue: [],
    natQueueYear: null,
    investments: { trainer: false, science: false, family: false, agent: false },
    settledAbroad: false,
    talentTier: (function(){
      // Prodigies (the pre-existing 15% flag) are guaranteed at least Elite,
      // so the two systems agree rather than contradicting each other.
      const rolled = rollTalentTier();
      if (!highlyTalented) return rolled === "generational" ? "elite" : rolled;
      return (rolled === "common" || rolled === "talented") ? "elite" : rolled;
    })(),
    seasonPoints: 0,
    lastPerfBonus: 0,
    slowDecliner: Math.random() < 0.20,
    height: height || 175,
    heightWillGrow, heightGrowthCutoff,
    fatigue: 20, morale: 65, popularity: 5, money: 0,
    relationships: { coach: 50, team: 50, family: 60 },
    stage: "youth",
    teamName: `${shortHome(hometown)} Youth Selection`,
    abroad: false, abroadEver: false, pendingOverseas: null, overseasTierId: null, overseasLeague: null, pendingOverseasOffer: null, pendingClutchMoment: null, pendingGuaranteedOverseasOffer: false, pendingForcedTransferRequest: false, pendingInjuryDecision: null, recentlyRehabbed: false, restedOffseason: false, offseasonPlan: null, playingStyle: null, rival: null, tradeRequestCooldown: 0, seasonsAtClub: 0, mblTitles: 0,
    nationalTeam: false, nationalCaps: 0,
    achievements: [],
    peakOverall: overall,
    clubId: null, clubHistory: [], starterStatus: null,
    league: null, mblContributor: false, wonderkid: false, hadMblSeason: false,
    semiProClub: null, contractSalary: 0, contractYearsLeft: 0,
    mssmPendingReveal: false, age18MssmResolved: false, lastSeasonLeagueAwards: [], studying: false, studyDecisionResolved: false, studyGraduated: false,
    history: [],
    retired: false, retireReason: null,
  };
}

/* Backfills any missing fields on a loaded save so older saves (from earlier
   versions) don't crash the newer code. */
function normalizePlayer(p) {
  if (!p || typeof p !== "object") return p;
  const d = {
    stats: {}, relationships: { coach: 50, team: 50, family: 60 },
    achievements: [], history: [], clubHistory: [],
    clubId: null, starterStatus: null, league: null,
    mblContributor: false, wonderkid: false, hadMblSeason: false, semiProClub: null,
    contractSalary: 0, contractYearsLeft: 0,
    mssmPendingReveal: false, age18MssmResolved: false, lastSeasonLeagueAwards: [], studying: false, studyDecisionResolved: false, studyGraduated: false,
    abroad: false, abroadEver: false, pendingOverseas: null, overseasTierId: null, overseasLeague: null, pendingOverseasOffer: null, pendingClutchMoment: null, pendingGuaranteedOverseasOffer: false, pendingForcedTransferRequest: false, pendingInjuryDecision: null, recentlyRehabbed: false, restedOffseason: false, offseasonPlan: null, playingStyle: null, rival: null, tradeRequestCooldown: 0, seasonsAtClub: 0, mblTitles: 0,
    nationalTeam: false, nationalCaps: 0, morale: 60, fatigue: 20,
    popularity: 5, money: 0, highlyTalented: false,
    slowDecliner: false, slowStartNextSeason: false,
    u18Eligible: false, age16Resolved: false, age17Resolved: false, age18Resolved: false,
    pendingHblOffer: false, hblTeamId: null, hblTeamName: null, hblSeasonPending: false,
    hblOfferIds: null,
    hblStats: null, hblAwards: null, hblEver: false,
    hblGames: null, hblTeamResult: null, hblGains: null, hblResultPending: false, age18NextScreen: null,
    pendingUbaOffer: false, ubaOffers: null, uba: false, ubaTeamId: null,
    ubaTeamName: null, ubaRole: null, ubaYearsLeft: 0, ubaEver: false, ubaGraduated: false,
  };
  const out = { ...d, ...p };
  // Backfill the calendar year for saves made before the timeline existed.
  if (typeof out.year !== "number") out.year = 2011 + (out.age || 15);
  // Backfill career stage from age for saves predating the "stage" field, or
  // where it somehow desyncs from age (e.g. an old save stuck mid-transition).
  if (out.stage !== "youth" && out.stage !== "pro") {
    out.stage = (out.age || 15) < 18 ? "youth" : "pro";
  } else if (out.age >= 18 && out.stage === "youth") {
    out.stage = "pro";
  }
  out.relationships = { ...d.relationships, ...(p.relationships || {}) };
  out.achievements = Array.isArray(p.achievements) ? p.achievements : [];
  out.history = Array.isArray(p.history) ? p.history : [];
  out.clubHistory = Array.isArray(p.clubHistory) ? p.clubHistory : [];
  return out;
}


/* ---------------------------------------------------------
   SMALL UI PIECES
--------------------------------------------------------- */
const StatBar = memo(function StatBar({ statKey, value, delta }) {
  const meta = STAT_META[statKey];
  const Icon = meta.icon;
  return (
    <div className="flex items-center gap-2 mb-2">
      <Icon size={13} color={C.chalkDim} />
      <span className="f-body text-xs w-24 shrink-0" style={{ color: C.chalkDim }}>{meta.label}</span>
      <div className="flex-1 h-[3px] rounded-full overflow-hidden" style={{ background: C.ink3 }}>
        <div className="h-full" style={{ width: `${value}%`, background: C.chalk }} />
      </div>
      <span className="f-mono text-xs w-7 text-right" style={{ color: C.chalk }}>{value}</span>
      {delta ? (
        <span className="f-mono text-[10px] w-8" style={{ color: delta > 0 ? C.chalk : C.red }}>
          {delta > 0 ? `+${delta}` : delta}
        </span>
      ) : <span className="w-8" />}
    </div>
  );
})

function Meter({ label, value, icon: Icon, color }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <span className="f-body text-xs flex items-center gap-1.5" style={{ color: C.chalk }}>
          <Icon size={13} color={C.chalkDim} /> {label}
        </span>
        <span className="f-mono text-[11px] font-semibold" style={{ color: C.chalk }}>{Math.round(value)}</span>
      </div>
      <div className="h-[5px] rounded-full overflow-hidden" style={{ background: C.ink3, border: `1px solid ${C.line}` }}>
        <div className="h-full" style={{ width: `${clamp(value)}%`, background: color }} />
      </div>
    </div>
  );
}

const Badge = memo(function Badge({ children, icon: Icon }) {
  return (
    <span className="f-mono text-[9px] uppercase tracking-wide px-2.5 py-1 rounded-full inline-flex items-center gap-1.5" style={{ background: "rgba(250,204,21,0.10)", color: C.trophyGold, border: `1px solid rgba(250,204,21,0.35)` }}>
      {Icon && <Icon size={11} color={C.trophyGold} />}
      {children}
    </span>
  );
})

function PrimaryButton({ children, onClick, disabled, full }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`btn-tactile f-body text-sm font-bold px-6 py-3.5 rounded-full transition flex items-center justify-center gap-2 ${full ? "w-full" : ""}`}
      style={{
        background: disabled ? C.ink3 : C.amber,
        color: disabled ? C.chalkDim : "#1A0A00",
        opacity: disabled ? 0.6 : 1,
        cursor: disabled ? "not-allowed" : "pointer",
      }}
    >
      {children}
    </button>
  );
}

function SecondaryButton({ children, onClick, full }) {
  return (
    <button
      onClick={onClick}
      className={`btn-tactile f-body text-sm font-semibold px-6 py-3.5 rounded-full border transition ${full ? "w-full" : ""}`}
      style={{ borderColor: C.line, color: C.chalk, background: C.ink3 }}
    >
      {children}
    </button>
  );
}

/* Deterministic circular "crest" badge for clubs/teams — no artwork needed,
   just a consistent gradient + initials derived from the club name so the
   same club always renders the same badge. */
const CREST_PALETTES = [
  ["#F97316", "#7C2D12"], ["#3B82F6", "#1E3A8A"], ["#10B981", "#065F46"],
  ["#DC2626", "#7F1D1D"], ["#A855F7", "#581C87"], ["#EAB308", "#713F12"],
  ["#06B6D4", "#164E63"], ["#6B7280", "#1F2937"],
];
/* Crest colours/initials are pure functions of the club name, but were being
   recomputed for every row on every render. Cached — club names repeat
   constantly across the ledger, career summary and offer screens. */
const _crestPaletteCache = new Map();
function crestPalette(name) {
  const key = name || "";
  const hit = _crestPaletteCache.get(key);
  if (hit) return hit;
  let hash = 0;
  for (let i = 0; i < key.length; i++) hash = (hash * 31 + key.charCodeAt(i)) >>> 0;
  const val = CREST_PALETTES[hash % CREST_PALETTES.length];
  _crestPaletteCache.set(key, val);
  return val;
}
function crestInitials(name) {
  if (!name) return "??";
  const words = name.replace(/[^\w\s]/g, "").split(/\s+/).filter(Boolean);
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return (words[0][0] + words[words.length - 1][0]).toUpperCase();
}
const ClubCrest = memo(function ClubCrest({ name, size = 44 }) {
  const [c1, c2] = crestPalette(name);
  return (
    <div
      className="rounded-full flex items-center justify-center flex-shrink-0 f-body font-extrabold"
      style={{ width: size, height: size, background: `linear-gradient(135deg, ${c1}, ${c2})`, color: "#fff", fontSize: size * 0.32 }}
    >
      {crestInitials(name)}
    </div>
  );
})

/* Bold color-blocked rating badge — the signature "OVR" square. */
const OvrBadge = memo(function OvrBadge({ value, size = 64, color }) {
  return (
    <div className="rounded-2xl flex flex-col items-center justify-center flex-shrink-0" style={{ width: size, height: size, background: color || C.amber }}>
      <div className="f-mono font-bold uppercase" style={{ fontSize: size * 0.13, color: "rgba(0,0,0,0.55)", letterSpacing: "0.06em" }}>OVR</div>
      <div className="f-body font-extrabold" style={{ fontSize: size * 0.36, color: "#1A0A00", lineHeight: 1 }}>{value}</div>
    </div>
  );
})

/* Colored jersey/position pill: "#7 PG" */
const PosPill = memo(function PosPill({ jersey, position }) {
  return (
    <span className="f-body font-bold text-white px-2.5 py-1 rounded-full" style={{ background: C.red, fontSize: 11 }}>
      #{jersey} {position}
    </span>
  );
})

/* Career timeline — one full-width card per history entry, styled just like
   the per-club summary cards: tinted background, crest, a horizontal info
   line (age · games · league, never truncated), the full note sentence on
   its own line, and — when the entry carries a stat line — every stat laid
   out in one horizontal row so nothing gets cut off or squeezed into a
   fixed-width column. */
/* PERFORMANCE: this is the single heaviest component in the game. Every row
   renders a crest, a 7-cell stat grid and award chips (~35 DOM nodes), and
   history grows every season — by age 35 that's ~1,400 nodes. It previously
   re-rendered in full on every player state change (points spent, banner
   set, navigation), which is what made long careers feel laggy.

   Three fixes: memo() so it only re-renders when history actually changes,
   useMemo on the reversed copy, and an initial window of recent seasons with
   an explicit "show all" rather than mounting the entire career at once. */
const LEDGER_WINDOW = 12;
const CareerLedger = memo(function CareerLedger({ history, maxHeight = 420 }) {
  const entries = history || [];
  const [showAll, setShowAll] = useState(false);
  const ordered = useMemo(() => entries.slice().reverse(), [entries]);
  const visible = useMemo(
    () => (showAll ? ordered : ordered.slice(0, LEDGER_WINDOW)),
    [ordered, showAll]
  );
  const hiddenCount = ordered.length - visible.length;
  return (
    <div className="space-y-2.5 overflow-y-auto pr-1" style={{ maxHeight }}>
      {entries.length === 0 && (
        <div className="px-4 py-6 text-center f-body text-xs rounded-2xl" style={{ background: C.ink3, color: C.chalkDim }}>
          No career history yet.
        </div>
      )}
      {visible.map((h, i) => {
        const hasStats = !!h.stats;
        const label = h.clubName || h.tournament || h.tierLabel || "Career Update";
        const [c1, c2] = crestPalette(label);
        const awardList = [...(h.leagueAwards || []), ...(h.awards || [])];
        const infoLine = [
          `Age ${h.age}`,
          h.games != null ? `${h.games} games` : null,
          h.leagueId && LEAGUE[h.leagueId] ? LEAGUE[h.leagueId].short : null,
        ].filter(Boolean).join(" · ");

        return (
          <div key={i} className="p-4 rounded-2xl" style={{ background: `linear-gradient(160deg, ${c1}22, ${c2}11)`, border: `1px solid ${c1}44` }}>
            <div className="flex items-center gap-3">
              <ClubCrest name={label} size={34} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="f-display text-sm" style={{ color: C.chalk, fontWeight: 800 }}>{label}</span>
                  {h.champion && <Trophy size={13} color={C.trophyGold} className="flex-shrink-0" />}
                  {h.national && <span className="flex-shrink-0">🇲🇾</span>}
                  {h.injury && <span className="flex-shrink-0" title="Injury">🩹</span>}
                </div>
                <div className="f-body text-xs mt-0.5" style={{ color: C.chalkDim }}>{infoLine}</div>
              </div>
            </div>

            {/* Full sentence, always horizontal, never truncated. */}
            <p className="f-body text-xs mt-3 leading-relaxed" style={{ color: C.chalk }}>{h.note}</p>

            {hasStats && (
              <div className="grid grid-cols-7 gap-1 mt-3 pt-3" style={{ borderTop: `1px solid ${c1}33` }}>
                {[["PPG", h.stats.ppg], ["RPG", h.stats.rpg], ["APG", h.stats.apg], ["SPG", h.stats.spg], ["BPG", h.stats.bpg], ["FG%", h.stats.fgPct], ["3P%", h.stats.threePct]].map(([lbl, val]) => (
                  <div key={lbl} className="text-center">
                    <div className="f-mono text-xs font-bold" style={{ color: C.chalk }}>{val}</div>
                    <div className="f-mono text-[8px] uppercase" style={{ color: C.chalkDim }}>{lbl}</div>
                  </div>
                ))}
              </div>
            )}

            {awardList.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-3">
                {awardList.map(a => (
                  <span key={a} className="f-mono text-[8.5px] px-2 py-0.5 rounded-full" style={{ background: "rgba(250,204,21,0.1)", color: C.trophyGold, border: `1px solid rgba(250,204,21,0.3)` }}>
                    {(LEAGUE_AWARD_META[a] && LEAGUE_AWARD_META[a].short) || (U15_AWARD_META[a] && U15_AWARD_META[a].label) || (ACHIEVEMENT_META[a] && ACHIEVEMENT_META[a].label) || a}
                  </span>
                ))}
              </div>
            )}
          </div>
        );
      })}
      {hiddenCount > 0 && (
        <button
          onClick={() => setShowAll(true)}
          className="btn-tactile w-full f-mono text-[10px] uppercase tracking-widest py-2.5 rounded-xl transition"
          style={{ background: C.ink3, color: C.chalkDim, border: `1px solid ${C.line}` }}
        >
          Show {hiddenCount} earlier season{hiddenCount > 1 ? "s" : ""}
        </button>
      )}
    </div>
  );
})

/* ---------------------------------------------------------
   START SCREEN
--------------------------------------------------------- */
function StartScreen({ onStart, savedGame, onContinue, onViewHallOfFame, onViewAchievements }) {
  const [name, setName] = useState("");
  const [position, setPosition] = useState("PG");
  const [hometown, setHometown] = useState(HOMETOWNS[0]);
  const [hometownSearch, setHometownSearch] = useState("");
  // Height/weight/wingspan are chosen on the Body Setup screen that follows;
  // this placeholder is overwritten there before any stats are generated.
  const height = 178;
  const [jersey, setJersey] = useState("");

  const handleJerseyChange = (val) => {
    if (val === "") { setJersey(""); return; }
    const n = val.replace(/[^0-9]/g, "").slice(0, 2);
    setJersey(n === "" ? "" : String(clamp(Number(n), 0, 99)));
  };

  return (
    <div className="court-hero min-h-full w-full flex flex-col items-center px-4 py-10 sm:py-14">
      <div className="w-full max-w-md text-center mb-8">
        <div className="flex items-center justify-center gap-2 mb-3">
          <div className="h-px w-10" style={{ background: C.line }} />
          <span className="f-mono text-[11px] tracking-[0.3em] uppercase" style={{ color: C.teal }}>Career Simulator</span>
          <div className="h-px w-10" style={{ background: C.line }} />
        </div>
        <h1 className="f-display text-4xl sm:text-5xl uppercase font-bold" style={{ color: C.chalk }}>
          Hoops Life: <span style={{ color: C.amberBright }}>The Climb</span>
        </h1>
        <p className="f-body text-sm mt-3" style={{ color: C.chalkDim }}>
          15 years old. A ball in your hands. One path from Malaysian gyms to the pros — and maybe beyond.
        </p>
        <button onClick={onViewHallOfFame} className="btn-tactile f-mono text-[11px] uppercase tracking-widest mt-4 inline-flex items-center gap-1.5 transition" style={{ color: C.chalkDim }}>
          🏛️ Hall of Fame
        </button>
        <span style={{ color: C.chalkDim, margin: "0 8px" }}>·</span>
        <button onClick={onViewAchievements} className="btn-tactile f-mono text-[11px] uppercase tracking-widest mt-4 inline-flex items-center gap-1.5 transition" style={{ color: C.chalkDim }}>
          🏆 Achievements
        </button>
      </div>

      {savedGame && (
        <div className="w-full max-w-md mb-6 p-4 rounded-xl flex items-center justify-between" style={{ background: C.ink2, border: `1px solid ${C.line}` }}>
          <div>
            <div className="f-display text-sm uppercase" style={{ color: C.chalk }}>{savedGame.name}</div>
            <div className="f-body text-xs" style={{ color: C.chalkDim }}>Age {savedGame.age} · {savedGame.teamName}</div>
          </div>
          <button onClick={onContinue} className="btn-tactile f-display text-xs uppercase px-4 py-2 rounded-xl" style={{ background: C.teal, color: "#052620" }}>
            Continue Career
          </button>
        </div>
      )}

      <div className="w-full max-w-md rounded-[28px] p-6" style={{ background: C.ink2, border: `1px solid ${C.line}` }}>
        <div className="grid grid-cols-3 gap-3 mb-5">
          <div className="col-span-2">
            <label className="f-mono text-[11px] uppercase tracking-widest" style={{ color: C.chalkDim }}>Player Name</label>
            <input
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Ayden Rahman"
              className="f-body w-full mt-1 px-3 py-2 rounded-xl outline-none"
              style={{ background: C.ink3, color: C.chalk, border: `1px solid ${C.line}` }}
            />
          </div>
          <div>
            <label className="f-mono text-[11px] uppercase tracking-widest" style={{ color: C.chalkDim }}>Jersey #</label>
            <div className="relative mt-1">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 f-mono text-sm" style={{ color: C.chalkDim }}>#</span>
              <input
                value={jersey}
                onChange={e => handleJerseyChange(e.target.value)}
                placeholder="00"
                inputMode="numeric"
                className="f-mono w-full px-3 py-2 pl-6 rounded-xl outline-none text-center"
                style={{ background: C.ink3, color: C.chalk, border: `1px solid ${C.line}` }}
              />
            </div>
          </div>
        </div>

        <label className="f-mono text-[11px] uppercase tracking-widest" style={{ color: C.chalkDim }}>Position</label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2 mb-5">
          {POSITIONS.map(p => (
            <button
              key={p.id}
              onClick={() => setPosition(p.id)}
              className="choice-card text-left px-3 py-2 rounded-xl transition"
              style={{
                background: position === p.id ? C.ink3 : "transparent",
                border: `1px solid ${position === p.id ? C.amber : C.line}`,
              }}
            >
              <div className="flex items-center justify-between">
                <span className="f-display text-sm" style={{ color: C.chalk }}>{p.name}</span>
                <span className="f-mono text-[10px]" style={{ color: C.amberBright }}>{p.id}</span>
              </div>
              <div className="f-body text-[11px] mt-0.5" style={{ color: C.chalkDim }}>{p.desc}</div>
            </button>
          ))}
        </div>

        <label className="f-mono text-[11px] uppercase tracking-widest" style={{ color: C.chalkDim }}>Hometown</label>
        <div className="relative mt-2">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2" color={C.chalkDim} />
          <input
            value={hometownSearch}
            onChange={e => setHometownSearch(e.target.value)}
            placeholder="Search state"
            className="f-body w-full pl-9 pr-3 py-2.5 rounded-xl outline-none text-sm"
            style={{ background: C.ink3, color: C.chalk, border: `1px solid ${C.line}` }}
          />
        </div>
        <div className="grid grid-cols-2 gap-2 mt-2 mb-2 max-h-64 overflow-y-auto pr-1">
          {HOMETOWNS.filter(h => h.toLowerCase().includes(hometownSearch.toLowerCase())).map(h => {
            const tier = getStateTier(h);
            const tm = TIER_META[tier];
            const selected = hometown === h;
            return (
              <button
                key={h}
                onClick={() => setHometown(h)}
                className="choice-card flex items-center gap-2.5 px-2.5 py-2.5 rounded-xl transition text-left"
                style={{
                  background: selected ? C.ink3 : "transparent",
                  border: `1px solid ${selected ? C.amber : C.line}`,
                }}
              >
                <FlagIcon name={h} size={24} />
                <span className="f-body text-xs flex-1 truncate" style={{ color: selected ? C.chalk : C.chalkDim }}>
                  {h}
                </span>
                <span
                  className="rounded-full shrink-0"
                  style={{ width: 6, height: 6, background: tm.color }}
                  title={`${tm.name} — ${tm.tag}`}
                />
              </button>
            );
          })}
          {HOMETOWNS.filter(h => h.toLowerCase().includes(hometownSearch.toLowerCase())).length === 0 && (
            <div className="col-span-2 py-6 text-center f-body text-xs" style={{ color: C.chalkDim }}>No states match "{hometownSearch}"</div>
          )}
        </div>
        <div className="flex items-center gap-3 mb-6 flex-wrap">
          {[1, 2, 3].map(t => (
            <span key={t} className="f-mono text-[9px] flex items-center gap-1" style={{ color: C.chalkDim }}>
              <span className="rounded-full inline-block" style={{ width: 6, height: 6, background: TIER_META[t].color }} />
              {TIER_META[t].name} · {TIER_META[t].tag}
            </span>
          ))}
        </div>

        <PrimaryButton full onClick={() => onStart({ name, position, hometown, height, jersey })}>
          Start Career <ChevronRight size={14} className="inline ml-1" />
        </PrimaryButton>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------
   PLAYER CARD (signature element)
--------------------------------------------------------- */
function PlayerCard({ p, overall }) {
  const pos = POSITIONS.find(x => x.id === p.position);
  const style = p.playingStyle ? getPlayingStyle(p.playingStyle) : null;
  return (
    <div className="rounded-[24px] p-5 relative overflow-hidden" style={{ background: C.ink2, border: `1px solid ${C.line}` }}>
      <div className="relative flex items-start gap-3.5">
        <OvrBadge value={overall} size={68} />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            {!p.abroad && <FlagIcon name={p.hometown} size={18} />}
            <PosPill jersey={p.jersey} position={pos.id} />
            {style && (
              <span className="f-mono text-[9px] uppercase px-2 py-0.5 rounded-full inline-flex items-center gap-1"
                style={{ background: "rgba(251,146,60,0.10)", color: C.amberBright, border: `1px solid rgba(251,146,60,0.35)` }}>
                {style.icon} {style.label}
              </span>
            )}
            {p.highlyTalented && (
              <span className="f-mono text-[9px] uppercase flex items-center gap-0.5" style={{ color: C.trophyGold }}>
                <Gem size={9} /> Prodigy
              </span>
            )}
          </div>
          <div className="f-display text-2xl mt-1.5 truncate" style={{ color: C.chalk, fontWeight: 800 }}>{p.name}</div>
          <div className="f-body text-xs mt-1 flex items-center gap-2 flex-wrap" style={{ color: C.chalkDim }}>
            {p.teamName && !p.abroad && <ClubCrest name={p.teamName} size={18} />}
            <span>{p.teamName}{p.abroad ? " · Abroad" : ""}{p.nationalTeam ? " · 🇲🇾 Malaysia Int'l" : ""}</span>
            {p.starterStatus && !p.abroad && (
              <span className="f-mono text-[9px] uppercase px-2 py-0.5 rounded-full" style={{ color: C.trophyGold, border: `1px solid rgba(250,204,21,0.35)` }}>
                {p.starterStatus}
              </span>
            )}
            {p.league && !p.abroad && (
              <span className="f-mono text-[9px] uppercase px-2 py-0.5 rounded-full" style={{ color: p.league === "mbl" ? C.amber : C.teal, border: `1px solid ${C.line}` }}>
                {LEAGUE[p.league].short}
              </span>
            )}
          </div>
          {!p.abroad && p.age < 19 && (
            <div className="f-mono text-[9px] uppercase tracking-widest mt-1" style={{ color: TIER_META[getStateTier(p.hometown)].color }}>
              {TIER_META[getStateTier(p.hometown)].name} · {TIER_META[getStateTier(p.hometown)].tag}
            </div>
          )}
        </div>
        <div className="scoreboard rounded-2xl px-3 py-2 text-center flex-shrink-0">
          <div className="f-mono text-[9px] uppercase" style={{ color: C.chalkDim }}>Age</div>
          <div className="f-mono text-xl font-bold" style={{ color: C.chalk }}>{p.age}</div>
          {p.year && <div className="f-mono text-[9px]" style={{ color: C.chalkDim }}>{p.year}</div>}
        </div>
      </div>
      <div className="hairline-rule relative mt-4 mb-4" />
      <div className="relative flex items-center gap-4">
        <div className="text-center">
          <div className="f-mono text-2xl font-bold" style={{ color: C.chalk }}>{p.seasonNum - 1}</div>
          <div className="f-mono text-[9px] uppercase" style={{ color: C.chalkDim }}>Seasons</div>
        </div>
        <div className="h-8 w-px" style={{ background: C.line }} />
        <div className="text-center">
          <div className="f-mono text-2xl font-bold" style={{ color: C.chalk }}>{p.height}</div>
          <div className="f-mono text-[9px] uppercase" style={{ color: C.chalkDim }}>cm</div>
        </div>
        {/* Weight and wingspan were collected at creation and then never shown
            again — the player couldn't see the frame they'd chosen, or why
            their attributes were shaped that way. Surfaced here alongside
            height so the body build stays visible all career. */}
        {p.weight != null && (
          <>
            <div className="h-8 w-px" style={{ background: C.line }} />
            <div className="text-center">
              <div className="f-mono text-2xl font-bold" style={{ color: C.chalk }}>{p.weight}</div>
              <div className="f-mono text-[9px] uppercase" style={{ color: C.chalkDim }}>kg</div>
            </div>
          </>
        )}
        {p.wingspan != null && (
          <>
            <div className="h-8 w-px" style={{ background: C.line }} />
            <div className="text-center">
              <div className="f-mono text-2xl font-bold" style={{ color: C.chalk }}>{p.wingspan}</div>
              <div className="f-mono text-[9px] uppercase" style={{ color: C.chalkDim }}>span</div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------
   HUB SCREEN
--------------------------------------------------------- */
function Hub({ player, onPlaySeason, onRetireConsider, onManageInvestments, onRequestTrade, banner }) {
  const overall = computeOverall(player.stats, player.position);
  const [tab, setTab] = useState("attrs");
  // Same conditional-tab pattern as the season recap's League Context tabs
  // (Standings/Leaders/Award Race) — a tab only appears once there's
  // something to show in it, and the active tab safely falls back to the
  // first available one if it was somehow left pointing at a hidden tab.
  const hasLockerRoom = player.stage === "pro" && !player.abroad && !!player.clubId;
  const TABS = [
    ["attrs", "Attributes", true],
    ["wellbeing", "Wellbeing", true],
    ["rival", "Rival", !!player.rival],
    ["career", "Career", true],
  ].filter(t => t[2]);
  const active = TABS.some(t => t[0] === tab) ? tab : TABS[0][0];
  return (
    <div className="min-h-full w-full px-4 py-6 sm:py-10" style={{ background: C.ink }}>
      <div className="max-w-md mx-auto">
        {banner && (
          <div className="mb-4 p-3 rounded-xl f-body text-sm flex items-center gap-2" style={{ background: "rgba(20,184,166,0.12)", border: `1px solid ${C.teal}`, color: C.teal }}>
            <Sparkles size={14} /> {banner}
          </div>
        )}

        <PlayerCard p={player} overall={overall} />

        {/* One card visible at a time instead of everything stacked — the
            Hub had grown to 4-5 full cards before reaching the Continue
            button once relationships, injuries, and the rival tracker were
            all added on top of the original Attributes/Wellbeing grid. */}
        <div className="flex gap-1.5 mt-4">
          {TABS.map(([id, label]) => (
            <button key={id} onClick={() => setTab(id)}
              className="btn-tactile flex-1 f-mono text-[10px] uppercase tracking-wide py-2 rounded-xl transition"
              style={active === id
                ? { background: C.amber, color: C.ink, border: `1px solid ${C.amber}`, fontWeight: 800 }
                : { background: C.ink3, color: C.chalkDim, border: `1px solid ${C.line}` }}>
              {label}
            </button>
          ))}
        </div>

        {active === "attrs" && (
          <div className="rounded-xl p-4 mt-3" style={{ background: C.ink2, border: `1px solid ${C.line}` }}>
            {STAT_LIST.map(s => <StatBar key={s} statKey={s} value={player.stats[s]} />)}
          </div>
        )}

        {active === "wellbeing" && (
          <div className="flex flex-col gap-3 mt-3">
            <div className="rounded-xl p-4" style={{ background: C.ink2, border: `1px solid ${C.line}` }}>
              <div className="space-y-2">
                <Meter label="Morale" value={player.morale} icon={HeartPulse} color={C.chalk} />
                <Meter label="Fatigue" value={player.fatigue} icon={Activity} color={C.chalkDim} />
                <Meter label="Popularity" value={player.popularity} icon={Radio} color={C.chalk} />
                <Meter label="Family" value={player.relationships.family} icon={Home} color={C.chalk} />
              </div>
            </div>
            {/* Coach Trust / Team Chemistry only mean anything once there's
                an actual locker room — a domestic pro club. They reset to
                50/50 on every new signing, so showing them before that would
                just be a flat, meaningless bar. */}
            {hasLockerRoom && (
              <div className="rounded-xl p-4" style={{ background: C.ink2, border: `1px solid ${C.line}` }}>
                <div className="f-display text-xs uppercase tracking-wide mb-3" style={{ color: C.chalkDim }}>Locker Room</div>
                <div className="space-y-2">
                  <Meter label="Coach Trust" value={player.relationships.coach} icon={Star} color={C.chalk} />
                  <Meter label="Team Chemistry" value={player.relationships.team} icon={Users} color={C.chalk} />
                </div>
              </div>
            )}
          </div>
        )}

        {active === "rival" && player.rival && (
          <div className="rounded-xl p-4 mt-3" style={{ background: C.ink2, border: `1px solid ${C.line}` }}>
            <div className="flex items-center gap-2 mb-3">
              <ClubCrest name={player.name} size={32} />
              <div className="flex-1 min-w-0">
                <div className="f-body text-xs font-semibold truncate" style={{ color: C.chalk }}>{player.name}</div>
                <div className="f-mono text-[9px]" style={{ color: C.chalkDim }}>You</div>
              </div>
              <span className="f-mono text-[9px] flex-shrink-0" style={{ color: C.chalkDim }}>VS</span>
              <div className="flex-1 min-w-0 text-right">
                <div className="f-body text-xs font-semibold truncate" style={{ color: C.chalk }}>{player.rival.name}</div>
                <div className="f-mono text-[9px] truncate" style={{ color: C.chalkDim }}>
                  {player.rival.retired ? "Retired" : (player.rival.clubName || `${player.rival.hometown} · Youth`)}
                </div>
              </div>
              <ClubCrest name={player.rival.name} size={32} />
            </div>
            {(() => {
              const rivalOvr = computeOverall(player.rival.stats, player.rival.position);
              const rows = [
                { label: "Overall", mine: overall, theirs: rivalOvr },
                { label: "Peak OVR", mine: player.peakOverall || overall, theirs: player.rival.peakOverall },
                { label: "Nat'l Caps", mine: player.nationalCaps || 0, theirs: player.rival.caps },
              ];
              return (
                <div className="grid grid-cols-3 gap-2">
                  {rows.map(row => (
                    <div key={row.label} className="text-center">
                      <div className="flex items-center justify-center gap-1">
                        <span className="f-mono text-sm font-extrabold" style={{ color: row.mine >= row.theirs ? C.amberBright : C.chalkDim }}>{row.mine}</span>
                        <span className="f-mono text-[9px]" style={{ color: C.chalkDim }}>–</span>
                        <span className="f-mono text-sm font-extrabold" style={{ color: row.theirs > row.mine ? C.amberBright : C.chalkDim }}>{row.theirs}</span>
                      </div>
                      <div className="f-mono text-[8px] uppercase tracking-wide mt-0.5" style={{ color: C.chalkDim }}>{row.label}</div>
                    </div>
                  ))}
                </div>
              );
            })()}
          </div>
        )}

        {active === "career" && (
          <div className="flex flex-col gap-3 mt-3">
            <div className="rounded-xl p-4 flex items-center justify-between" style={{ background: C.ink2, border: `1px solid ${C.line}` }}>
              {player.age >= 18 ? (
                <div className="flex items-center gap-3 flex-wrap">
                  <div className="flex items-center gap-2">
                    <DollarSign size={16} color={C.gold} />
                    <span className="f-mono text-lg" style={{ color: C.chalk }}>{rm(player.money)}</span>
                  </div>
                  {player.contractSalary > 0 && (
                    <span className="f-mono text-[10px] uppercase tracking-wide px-2 py-1 rounded-xl" style={{ background: C.ink3, color: C.teal, border: `1px solid ${C.line}` }}>
                      {rm(player.contractSalary)}/mo · {player.contractYearsLeft}yr left
                    </span>
                  )}
                </div>
              ) : (
                <span className="f-mono text-[11px] uppercase tracking-widest" style={{ color: C.chalkDim }}>Student Athlete</span>
              )}
              {player.achievements.length > 0 && (
                <div className="flex flex-wrap gap-1.5 justify-end">
                  {player.achievements.map(a => <Badge key={a} icon={ACHIEVEMENT_META[a].icon}>{ACHIEVEMENT_META[a].label}</Badge>)}
                </div>
              )}
            </div>

            {/* Career investments — only meaningful once there's a salary to spend. */}
            {player.age >= 18 && player.contractSalary > 0 && (
              <button onClick={onManageInvestments}
                className="choice-card w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition"
                style={{ background: C.ink2, border: `1px solid ${investmentPct(player) > 0 ? C.amber : C.line}` }}>
                <span className="text-[17px]">💼</span>
                <div className="text-left flex-1 min-w-0">
                  <div className="f-display text-[13px]" style={{ color: C.chalk }}>Career Investments</div>
                  <div className="f-body text-[10px] mt-0.5" style={{ color: C.chalkDim }}>
                    {investmentPct(player) > 0
                      ? `${Object.keys(INVESTMENTS).filter(k => player.investments && player.investments[k]).length} active · ${rm(investmentUpkeep(player))}/mo`
                      : "Spend on your career — trainer, physio, family, agent"}
                  </div>
                </div>
                <ChevronRight size={15} color={C.chalkDim} />
              </button>
            )}

            {/* Trade Request — the "player asks to leave" mirror of Trade
                Rumors (which is club-initiated and only fires on low Team
                Chemistry). Doesn't appear at all until a full season has
                been played at the club; shown disabled with the countdown
                during a post-denial cooldown, rather than just vanishing,
                so it's clear WHY it's unavailable rather than looking gone. */}
            {player.clubId && !player.abroad && (player.seasonsAtClub || 0) >= 1 && (
              <button onClick={() => (player.tradeRequestCooldown > 0 ? null : onRequestTrade())}
                disabled={player.tradeRequestCooldown > 0}
                className={player.tradeRequestCooldown > 0 ? "w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition" : "choice-card w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition"}
                style={{
                  background: C.ink2,
                  border: `1px solid ${player.tradeRequestCooldown > 0 ? C.line : "rgba(251,146,60,0.4)"}`,
                  opacity: player.tradeRequestCooldown > 0 ? 0.55 : 1,
                  cursor: player.tradeRequestCooldown > 0 ? "not-allowed" : "pointer",
                }}>
                <span className="text-[17px]">🚪</span>
                <div className="text-left flex-1 min-w-0">
                  <div className="f-display text-[13px]" style={{ color: C.chalk }}>Request a Trade</div>
                  <div className="f-body text-[10px] mt-0.5" style={{ color: C.chalkDim }}>
                    {player.tradeRequestCooldown > 0
                      ? `${player.tradeRequestCooldown} season${player.tradeRequestCooldown === 1 ? "" : "s"} until you can ask again`
                      : `You've been at ${player.teamName} ${player.seasonsAtClub} season${player.seasonsAtClub === 1 ? "" : "s"}`}
                  </div>
                </div>
                {!(player.tradeRequestCooldown > 0) && <ChevronRight size={15} color={C.chalkDim} />}
              </button>
            )}

            {player.history.length > 0 && (
              <div className="rounded-2xl p-4" style={{ background: C.ink2, border: `1px solid ${C.line}` }}>
                <div className="f-display text-xs uppercase tracking-wide mb-3 flex items-center gap-1" style={{ color: C.chalkDim }}>
                  <Newspaper size={12} /> Career Timeline
                </div>
                <CareerLedger history={player.history} maxHeight={340} />
              </div>
            )}
          </div>
        )}

        <div className="flex gap-3 mt-4">
          <PrimaryButton full onClick={onPlaySeason}>Continue <ChevronRight size={14} className="inline ml-1" /></PrimaryButton>
          {player.age >= 30 && <SecondaryButton onClick={onRetireConsider}>Retire</SecondaryButton>}
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------
   TRAINING SCREEN
--------------------------------------------------------- */
function BodySetup({ player, onConfirm }) {
  const d = defaultBody(player.position);
  const [height, setHeight] = useState(d.height);
  const [weight, setWeight] = useState(d.weight);
  const [wingspan, setWingspan] = useState(d.wingspan);

  // Height changes can invalidate the current wingspan (the +35cm reach rule
  // moves with height), so re-clamp whenever height moves.
  const applyHeight = (h) => {
    setHeight(h);
    setWingspan(w => clampWingspan(h, w));
  };
  const wb = wingspanBounds(height);
  const reach = wingspan - height;
  const mods = bodyModifiers({ height, weight, reach, position: player.position });

  return (
    <div className="min-h-full w-full flex items-start justify-center px-4 py-8" style={{ background: C.ink }}>
      <div className="max-w-md w-full">
        <div className="flex items-center gap-2 mb-1">
          <Gauge size={16} color={C.amberBright} />
          <span className="f-display text-sm uppercase tracking-wide" style={{ color: C.amberBright }}>Build Your Frame</span>
        </div>
        <p className="f-body text-[11.5px] mb-4" style={{ color: C.chalkDim }}>
          Permanent for this career. Your frame shapes where you naturally start —
          length and mass help inside, a compact build helps outside. No build is
          stronger overall; they lead to different players.
        </p>

        <div className="rounded-[20px] px-4 py-1 mb-4" style={{ background: C.ink2, border: `1px solid ${C.line}` }}>
          <div className="py-3" style={{ borderBottom: `1px solid ${C.line}` }}>
            <div className="flex justify-between items-baseline mb-2">
              <span className="f-display text-[12px]" style={{ color: C.chalk }}>Height</span>
              <span className="f-mono text-[18px]" style={{ color: C.amberBright }}>{height} cm</span>
            </div>
            <input type="range" min={BODY_LIMITS.height[0]} max={BODY_LIMITS.height[1]} value={height}
              onChange={e => applyHeight(Number(e.target.value))} className="w-full" style={{ accentColor: C.amber }} />
            <div className="flex justify-between mt-1">
              <span className="f-mono text-[9px]" style={{ color: C.chalkDim }}>{BODY_LIMITS.height[0]} cm</span>
              <span className="f-mono text-[9px]" style={{ color: C.chalkDim }}>{BODY_LIMITS.height[1]} cm</span>
            </div>
          </div>

          <div className="py-3" style={{ borderBottom: `1px solid ${C.line}` }}>
            <div className="flex justify-between items-baseline mb-2">
              <span className="f-display text-[12px]" style={{ color: C.chalk }}>Weight</span>
              <span className="f-mono text-[18px]" style={{ color: C.amberBright }}>{weight} kg</span>
            </div>
            <input type="range" min={BODY_LIMITS.weight[0]} max={BODY_LIMITS.weight[1]} value={weight}
              onChange={e => setWeight(Number(e.target.value))} className="w-full" style={{ accentColor: C.amber }} />
            <div className="flex justify-between mt-1">
              <span className="f-mono text-[9px]" style={{ color: C.chalkDim }}>{BODY_LIMITS.weight[0]} kg · lean</span>
              <span className="f-mono text-[9px]" style={{ color: C.chalkDim }}>{BODY_LIMITS.weight[1]} kg · powerful</span>
            </div>
          </div>

          <div className="py-3">
            <div className="flex justify-between items-baseline mb-2">
              <span className="f-display text-[12px]" style={{ color: C.chalk }}>Wingspan</span>
              <span className="f-mono text-[18px]" style={{ color: C.amberBright }}>{wingspan} cm</span>
            </div>
            <input type="range" min={wb.min} max={wb.max} value={wingspan}
              onChange={e => setWingspan(Number(e.target.value))} className="w-full" style={{ accentColor: C.amber }} />
            <div className="flex justify-between mt-1">
              <span className="f-mono text-[9px]" style={{ color: C.chalkDim }}>{wb.min} cm</span>
              <span className="f-mono text-[9px]" style={{ color: reach > 0 ? C.teal : C.chalkDim }}>
                {reach >= 0 ? `+${reach}` : reach} cm vs height
              </span>
              <span className="f-mono text-[9px]" style={{ color: C.chalkDim }}>{wb.max} cm</span>
            </div>
            <p className="f-body text-[9.5px] mt-2" style={{ color: C.chalkDim }}>
              Wingspan can't exceed your height by more than {BODY_LIMITS.reachMax} cm.
            </p>
          </div>
        </div>

        <div className="f-mono text-[10px] uppercase tracking-widest mb-2" style={{ color: C.chalkDim }}>
          Effect on starting attributes
        </div>
        <div className="grid grid-cols-3 gap-2 mb-5">
          {STAT_LIST.map(k => {
            const v = mods[k] || 0;
            const col = v > 0 ? "#10B981" : v < 0 ? C.red : C.chalkDim;
            return (
              <div key={k} className="rounded-xl px-2 py-2.5 text-center"
                style={{ background: C.ink3, border: `1px solid ${C.line}` }}>
                <div className="f-mono text-[15px] font-bold" style={{ color: col }}>
                  {v > 0 ? `+${v}` : v === 0 ? "—" : v}
                </div>
                <div className="f-mono text-[8.5px] mt-0.5" style={{ color: C.chalkDim }}>{STAT_META[k].label}</div>
              </div>
            );
          })}
        </div>

        <PrimaryButton full onClick={() => onConfirm({ height, weight, wingspan, reach })}>
          Continue <ChevronRight size={14} className="inline ml-1" />
        </PrimaryButton>
      </div>
    </div>
  );
}

function InvestmentsScreen({ player, onConfirm, onBack }) {
  const [sel, setSel] = useState(() => ({ ...(player.investments || {}) }));
  const salary = player.contractSalary || 0;
  const pct = Object.keys(INVESTMENTS).reduce((t, k) => t + (sel[k] ? INVESTMENTS[k].pct : 0), 0);
  const upkeep = Math.round(salary * pct);
  const net = salary - upkeep;
  const banked = net * 12;
  const projected = player.money + banked * Math.max(1, 34 - player.age);
  const tierNow = wealthTier(projected);

  const META = {
    trainer: { icon: "🏋️", sub: "Extra individual sessions year-round.",
      eff: ["+1 attribute point every season"] },
    science: { icon: "🩺", sub: "Load management, recovery and treatment.",
      eff: ["Injury risk halved", "Guided rehab — full speed, zero risk", "Slower decline after 33", "+1 playable season"] },
    family: { icon: "🏠", sub: "Send money home and fly them out to see you.",
      eff: ["No settling-in dip when you move abroad", "A bad season stops spiralling"] },
    agent: { icon: "📈", sub: "Real representation. Gets you seen, gets you in the room.",
      eff: ["Scouts rate you 3 higher for overseas moves"], risk: true },
  };

  const toggle = (k) => {
    const would = pct + (sel[k] ? -INVESTMENTS[k].pct : INVESTMENTS[k].pct);
    if (!sel[k] && would > INVESTMENT_MAX_PCT) return;
    setSel(a => ({ ...a, [k]: !a[k] }));
  };

  const barColor = pct > 0.6 ? C.red : pct > 0.45 ? C.trophyGold : "#10B981";

  return (
    <div className="min-h-full w-full flex items-start justify-center px-4 py-8" style={{ background: C.ink }}>
      <div className="max-w-md w-full">
        <div className="rounded-[20px] p-4 mb-3.5" style={{ background: C.ink2, border: `1px solid ${C.amber}` }}>
          <div className="flex items-center gap-3.5">
            <div>
              <div className="f-mono text-[22px] leading-none" style={{ color: C.amberBright }}>{rm(salary)}</div>
              <div className="f-mono text-[10px] uppercase tracking-widest mt-1" style={{ color: C.chalkDim }}>Monthly salary</div>
            </div>
            <div className="ml-auto text-right">
              <div className="f-mono text-[19px] leading-none" style={{ color: pct > 0.6 ? C.red : C.chalk }}>{rm(net)}</div>
              <div className="f-mono text-[10px] uppercase tracking-widest mt-1" style={{ color: C.chalkDim }}>Take-home</div>
            </div>
          </div>
          <div className="h-[7px] rounded-full mt-3 overflow-hidden" style={{ background: C.ink3 }}>
            <div className="h-full rounded-full" style={{ width: `${Math.min(100, pct * 100)}%`, background: barColor, transition: "width .18s" }} />
          </div>
          <div className="flex justify-between mt-1.5">
            <span className="f-mono text-[9px]" style={{ color: C.chalkDim }}>{Math.round(pct * 100)}% committed</span>
            <span className="f-mono text-[9px]" style={{ color: C.chalkDim }}>Max {Math.round(INVESTMENT_MAX_PCT * 100)}%</span>
          </div>
        </div>

        {salary <= 0 && (
          <p className="f-body text-[11px] mb-3 px-1" style={{ color: C.trophyGold }}>
            You're not earning yet — investments become available once you sign a contract.
          </p>
        )}

        {Object.keys(INVESTMENTS).map(k => {
          const inv = INVESTMENTS[k], m = META[k], on = !!sel[k];
          const would = pct + (on ? 0 : inv.pct);
          const locked = !on && (would > INVESTMENT_MAX_PCT || salary <= 0);
          return (
            <div key={k} onClick={() => !locked && toggle(k)}
              className={`rounded-2xl px-4 py-3.5 mb-2 transition ${locked ? "" : "choice-card cursor-pointer"}`}
              style={{ background: on ? "#171310" : C.ink2, border: `1px solid ${on ? C.amber : C.line}`, opacity: locked ? 0.45 : 1, cursor: locked ? "not-allowed" : "pointer" }}>
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5 f-mono text-[12px]"
                  style={{ background: on ? C.amber : "transparent", border: `1.5px solid ${on ? C.amber : C.line}`, color: C.ink }}>
                  {on ? "✓" : ""}
                </div>
                <span className="text-[19px] w-7 text-center shrink-0">{m.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="f-display text-[13.5px]" style={{ color: C.chalk }}>
                    {inv.label}
                    {m.risk && (
                      <span className="f-mono text-[8.5px] ml-1.5 px-1.5 py-0.5 rounded-full"
                        style={{ color: C.trophyGold, background: "rgba(250,204,21,0.1)", border: "1px solid rgba(250,204,21,0.35)" }}>HIGH RISK</span>
                    )}
                  </div>
                  <div className="f-body text-[10.5px] mt-0.5" style={{ color: C.chalkDim }}>{m.sub}</div>
                </div>
                <div className="text-right shrink-0">
                  <div className="f-mono text-[14px]" style={{ color: C.amberBright }}>{Math.round(inv.pct * 100)}%</div>
                  <div className="f-mono text-[9px]" style={{ color: C.chalkDim }}>{rm(Math.round(salary * inv.pct))}/mo</div>
                </div>
              </div>
              <div className="flex flex-wrap gap-1.5 mt-2.5 pl-[52px]">
                {m.eff.map((e, i) => (
                  <span key={i} className="f-mono text-[9px] px-2 py-1 rounded-full"
                    style={{ background: C.ink3, color: "#10B981", border: `1px solid ${C.line}` }}>{e}</span>
                ))}
              </div>
            </div>
          );
        })}

        <div className="rounded-2xl px-4 py-3 mt-3" style={{ background: C.ink2, border: `1px solid ${C.line}` }}>
          <div className="f-mono text-[10px] uppercase tracking-widest mb-2" style={{ color: C.chalkDim }}>Retirement outlook</div>
          {WEALTH_TIERS.map(t => {
            const isNow = t.id === tierNow.id;
            return (
              <div key={t.id} className="flex items-center gap-2 py-1.5"
                style={{ opacity: isNow ? 1 : 0.32, borderBottom: t.id === "nothing_left" ? "none" : `1px solid ${C.line}` }}>
                <span className="f-display text-[11.5px] w-[92px] shrink-0" style={{ color: isNow ? C.trophyGold : C.chalkDim }}>{t.label}</span>
                <span className="f-body text-[9.5px] flex-1" style={{ color: C.chalkDim }}>{isNow ? t.note : ""}</span>
                <span className="f-mono text-[9px]" style={{ color: C.chalkDim }}>{t.min ? rm(t.min) + "+" : "—"}</span>
              </div>
            );
          })}
        </div>

        {pct > 0.6 && (
          <p className="f-body text-[10.5px] mt-2.5 px-1" style={{ color: C.red }}>
            Overcommitted — a released or injured season could leave you unable to keep these up.
          </p>
        )}

        <div className="grid grid-cols-3 gap-2.5 mt-4">
          <SecondaryButton full onClick={onBack}>Back</SecondaryButton>
          <div className="col-span-2">
            <PrimaryButton full onClick={() => onConfirm(sel)}>Confirm</PrimaryButton>
          </div>
        </div>
      </div>
    </div>
  );
}

function AttributeBuilder({ player, points, onConfirm, creation = false }) {
  const [alloc, setAlloc] = useState({});
  const cap = attrAgeCap(player.age, player.stats);
  const cur = (k) => player.stats[k] + (alloc[k] || 0);
  const spent = STAT_LIST.reduce((t, k) => {
    let sum = 0;
    for (let v = player.stats[k]; v < cur(k); v++) sum += attrPointCost(v, k, player.position);
    return t + sum;
  }, 0);
  const left = points - spent;
  const projected = {};
  STAT_LIST.forEach(k => { projected[k] = cur(k); });
  const projOvr = computeOverall(projected, player.position);

  const inc = (k) => {
    const c = attrPointCost(cur(k), k, player.position);
    if (cur(k) < cap && left >= c) setAlloc(a => ({ ...a, [k]: (a[k] || 0) + 1 }));
  };
  const dec = (k) => { if ((alloc[k] || 0) > 0) setAlloc(a => ({ ...a, [k]: a[k] - 1 })); };

  return (
    <div className="min-h-full w-full flex items-start justify-center px-4 py-8" style={{ background: C.ink }}>
      <div className="max-w-md w-full">
        <div className="rounded-[20px] p-4 mb-3.5 flex items-center gap-3.5"
          style={{ background: C.ink2, border: `1px solid ${C.amber}` }}>
          <div>
            <div className="f-display text-3xl leading-none" style={{ color: C.amberBright }}>{left}</div>
            <div className="f-mono text-[10px] uppercase tracking-widest mt-0.5" style={{ color: C.chalkDim }}>Points to spend</div>
            <div className="f-mono text-[10px] mt-0.5" style={{ color: C.teal }}>
              {creation ? `Build your 15-year-old · cap ${cap}` : `Season ${player.seasonNum} · age ${player.age} · cap ${cap}`}
            </div>
          </div>
          <div className="ml-auto text-right">
            <div className="f-mono text-2xl leading-none" style={{ color: C.trophyGold }}>{projOvr}</div>
            <div className="f-mono text-[10px] uppercase tracking-widest mt-0.5" style={{ color: C.chalkDim }}>Overall</div>
          </div>
        </div>

        {creation && (
          <p className="f-body text-[11.5px] mb-3 px-1" style={{ color: C.chalkDim }}>
            Shape your player before the <span style={{ color: C.chalk }}>National U15 selection trials</span> — the
            state coaches judge you on exactly these numbers.
          </p>
        )}
        {STAT_LIST.map(k => {
          const v = cur(k), c = attrPointCost(v, k, player.position);
          const atCap = v >= cap, gained = alloc[k] || 0;
          return (
            <div key={k} className="rounded-2xl px-4 py-3 mb-2" style={{ background: C.ink2, border: `1px solid ${C.line}` }}>
              <div className="flex items-center gap-3">
                <span className="f-display text-[13px] w-[78px] shrink-0" style={{ color: C.chalk }}>{STAT_META[k].label}</span>
                <div className="flex-1 h-2 rounded-full relative" style={{ background: C.ink3 }}>
                  <div className="h-full rounded-full absolute left-0 top-0"
                    style={{ width: `${player.stats[k]}%`, background: `linear-gradient(90deg, #38BDF8, ${C.amber})` }} />
                  {gained > 0 && (
                    <div className="h-full absolute top-0 rounded-full"
                      style={{ left: `${player.stats[k]}%`, width: `${gained}%`, background: C.trophyGold, opacity: 0.55 }} />
                  )}
                  <div className="absolute rounded-sm" style={{ left: `${cap}%`, top: -4, width: 2, height: 16, background: C.trophyGold }} />
                </div>
                <span className="f-mono text-[19px] w-8 text-right" style={{ color: C.chalk }}>{v}</span>
                <button onClick={() => dec(k)} disabled={gained === 0}
                  className="btn-tactile w-8 h-8 rounded-[10px] text-lg font-bold shrink-0 transition"
                  style={{ background: C.ink3, border: `1px solid ${C.line}`, color: C.chalk, opacity: gained === 0 ? 0.25 : 1 }}>−</button>
                <button onClick={() => inc(k)} disabled={atCap || left < c}
                  className="btn-tactile w-8 h-8 rounded-[10px] text-lg font-bold shrink-0 transition"
                  style={{ background: C.amber, border: `1px solid ${C.amber}`, color: C.ink, opacity: (atCap || left < c) ? 0.25 : 1 }}>+</button>
              </div>
              <div className="flex justify-between mt-1.5 pl-[90px]">
                <span className="f-mono text-[9.5px]" style={{ color: C.chalkDim }}>
                  Start {player.stats[k]}{gained > 0 ? ` · +${gained}` : ""}
                </span>
                <span className="f-mono text-[9.5px] font-bold" style={{ color: atCap ? C.trophyGold : C.amberBright }}>
                  {atCap ? `At age cap ${cap}` : `Next +1 · ${c} pt`}
                </span>
              </div>
            </div>
          );
        })}

        <div className="grid grid-cols-3 gap-2.5 mt-4">
          <SecondaryButton full onClick={() => setAlloc({})}>Reset</SecondaryButton>
          <div className="col-span-2">
            <PrimaryButton full onClick={() => onConfirm(alloc)}>{creation ? "Begin Career" : "Confirm Season"}</PrimaryButton>
          </div>
        </div>
        {left > 0 && (
          <p className="f-body text-[10.5px] text-center mt-2.5" style={{ color: C.trophyGold }}>
            {left} point{left > 1 ? "s" : ""} unspent — {creation ? "spend them before the U15 trials." : "they don't carry over."}
          </p>
        )}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------
   EVENT SCREEN
--------------------------------------------------------- */
/* Turns a choice's raw effect fields into up to 2 preview pills for the
   event card UI. Probability-tiered choices (choice.outcomes) show the real
   Success/Risk percentages; deterministic choices show their single most
   notable guaranteed effect(s) instead, with no percentage (since certain). */
function deriveEffectPills(choice) {
  if (choice.outcomes) {
    const successTier = choice.outcomes.find(o => o.tier === "success");
    const successPct = successTier ? Math.round(successTier.chance * 100) : null;
    const riskPct = successPct != null ? 100 - successPct : null;
    return [
      { label: "Success", pct: successPct, positive: true },
      { label: "Risk", pct: riskPct, positive: false },
    ];
  }
  const entries = [];
  if (choice.stats) {
    Object.entries(choice.stats).forEach(([k, v]) => {
      if (v) entries.push({ label: `${v > 0 ? "+" : ""}${v} ${STAT_META[k] ? STAT_META[k].label : k}`, score: v });
    });
  }
  if (choice.fatigue) entries.push({ label: choice.fatigue > 0 ? "More Tired" : "Recovery", score: -choice.fatigue });
  if (choice.morale) entries.push({ label: `${choice.morale > 0 ? "+" : ""}${choice.morale} Morale`, score: choice.morale });
  if (choice.popularity) entries.push({ label: `${choice.popularity > 0 ? "+" : ""}${choice.popularity} Fame`, score: choice.popularity });
  if (choice.money) entries.push({ label: choice.money > 0 ? `+${rm(choice.money)}` : rm(choice.money), score: choice.money / 100 });
  if (choice.relationships) {
    const relLabel = { coach: "Coach", team: "Team", family: "Family" };
    Object.entries(choice.relationships).forEach(([k, v]) => {
      if (v) entries.push({ label: `${v > 0 ? "+" : ""}${v} ${relLabel[k] || k}`, score: v });
    });
  }
  entries.sort((a, b) => b.score - a.score);
  const pills = [];
  if (entries.length && entries[0].score > 0) pills.push({ label: entries[0].label, pct: null, positive: true });
  const worst = entries[entries.length - 1];
  if (worst && worst.score < 0 && worst !== entries[0]) pills.push({ label: worst.label, pct: null, positive: false });
  return pills;
}

/* ============================================================
   EVENT SCENE ILLUSTRATIONS — richer, multi-element original vector
   scenes (never photos — see conversation for why) for event cards.
   Each scene is a small layered composition, not a single icon, so
   cards read as "a scene about X" rather than a generic glyph.
============================================================ */
/* ============================================================
   CHOICE ICONS — simple, single-concept glyphs (one per choice, not
   per event) so the two options in an event are visually distinct
   and instantly readable, on top of the event's thematic gradient.
============================================================ */
/* ============================================================
   CHOICE ICONS — emoji glyphs, one per choice. Emoji are used
   deliberately over hand-drawn line art: they read instantly at
   small sizes, are unambiguous, and render consistently across
   phones and desktops without any asset loading.
============================================================ */
const CHOICE_ICONS = {
  flame: "\u{1F525}",          // go all-out / full intensity
  balance: "\u2696\uFE0F",        // pace yourself / controlled
  bed: "\u{1F6CC}",             // rest / sit out
  run: "\u{1F3C3}",             // play through it / drive
  megaphone: "\u{1F4E2}",       // speak out publicly
  team: "\u{1F465}",            // credit the team
  penCheck: "\u270D\uFE0F",       // sign the deal
  clockWait: "\u23F3",         // hold out / wait
  shieldCheck: "\u{1F6E1}\uFE0F",  // protect yourself / decline
  star: "\u2B50",              // give everything / show out
  clipboard: "\u{1F4CB}",       // stick to the game plan
  houseHeart: "\u{1F3E0}",      // go home for family
  dumbbell: "\u{1F3CB}\uFE0F",     // stay and train
  dollarUp: "\u{1F4B0}",        // push for money / pay
  handshake: "\u{1F91D}",       // make peace / fair deal
  doorExit: "\u{1F6AA}",        // leave / stay out of it
  lock: "\u{1F512}",            // keep it private
  cameraOpen: "\u{1F3A5}",      // let the cameras in
  hoopShot: "\u{1F3C0}",        // take the shot
  passArrow: "\u{1F93E}",       // pass to the open man
  scalpel: "\u{1F3E5}",         // surgery
  stretch: "\u{1F9D8}",         // rehab / stretching
  moonClock: "\u{1F319}",       // stay out late
  chartUp: "\u{1F4C8}",         // data-driven
  whistle: "\u23F1\uFE0F",        // old-school coaching drills
  handHeart: "\u2764\uFE0F",      // give back / free clinic
  tieDollar: "\u{1F4BC}",       // paid corporate gig
  flair: "\u2728",             // play your natural, flashy game
  rulebook: "\u{1F4D6}",        // fall in line / the system
  trophyCash: "\u{1F3C6}",      // enter the tournament
  phoneTrend: "\u{1F4F1}",      // post a follow-up
  phoneMute: "\u{1F910}",       // stay quiet
  raisedHand: "\u{1F64B}",      // make your case
  stopHand: "\u{1F6D1}",        // come out immediately
  xDecline: "\u274C",          // decline
  checkYes: "\u2705",          // say yes
};
const renderChoiceIcon = (key) => CHOICE_ICONS[key] || "\u{1F3C0}";

const EVENT_SCENES = {
  gym_training: { grad: ["#78350F", "#1C0A00"], render: (c) => (<>
    <rect x="7" y="10" width="2" height="4" rx="0.5" stroke={c}/><rect x="15" y="10" width="2" height="4" rx="0.5" stroke={c}/>
    <rect x="9" y="11.3" width="6" height="1.4" rx="0.5" stroke={c}/>
    <path d="M4 15l3-2M4 9l3 2M20 15l-3-2M20 9l-3 2" stroke={c}/>
  </>)},
  press_media: { grad: ["#164E63", "#0A0A0A"], render: (c) => (<>
    <rect x="9" y="6" width="6" height="9" rx="3" stroke={c}/><path d="M6 12a6 6 0 0 0 12 0" stroke={c}/><path d="M12 18v2M9 20h6" stroke={c}/>
    <rect x="17" y="4" width="4" height="3" rx="0.5" stroke="#22D3EE"/><path d="M18.5 3.3v.9" stroke="#22D3EE"/>
  </>)},
  contract_signing: { grad: ["#1E293B", "#0A0A0A"], render: (c) => (<>
    <rect x="5" y="4" width="10" height="14" rx="1" stroke={c}/><path d="M7.5 8h5M7.5 11h5M7.5 14h3" stroke={c}/>
    <path d="M14 20l6-6 1.5 1.5-6 6-2 .5z" stroke="#FACC15" fill="none"/>
  </>)},
  medical: { grad: ["#7F1D1D", "#0A0A0A"], render: (c) => (<>
    <rect x="9" y="4" width="6" height="16" rx="2" stroke={c}/><path d="M10.5 9h3M10.5 12h3M10.5 15h3" stroke={c} opacity="0.5"/>
    <rect x="10.4" y="6.5" width="3.2" height="3.2" rx="0.5" fill="#EF4444" stroke="none"/>
    <path d="M12 6.7v2.8M10.6 8.1h2.8" stroke="#0A0A0A"/>
  </>)},
  confrontation: { grad: ["#7C2D12", "#0A0A0A"], render: (c) => (<>
    <path d="M4 8a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3v2a3 3 0 0 1-3 3H8l-2 2v-2H7a3 3 0 0 1-3-3z" stroke={c}/>
    <path d="M20 12a2.5 2.5 0 0 0-2.5-2.5h-3A2.5 2.5 0 0 0 12 12v1.5a2.5 2.5 0 0 0 2.5 2.5h1l1.5 1.5v-1.5h.5a2.5 2.5 0 0 0 2.5-2.5z" stroke="#EF4444"/>
    <path d="M8 6.5v1.5M8 9.5v.1" stroke={c}/>
  </>)},
  video_analysis: { grad: ["#1E3A5F", "#0A0A0A"], render: (c) => (<>
    <rect x="3" y="5" width="18" height="12" rx="1.5" stroke={c}/><path d="M9 20h6M12 17v3" stroke={c}/>
    <path d="M7 13l3-3 2.5 2 4.5-4.5" stroke="#22D3EE"/><circle cx="17" cy="7.5" r="1.1" fill="#22D3EE" stroke="none"/>
  </>)},
  national_pride: { grad: ["#7F1D1D", "#0A0A0A"], render: (c) => (<>
    <path d="M7 3v18" stroke={c}/><path d="M7 4h11l-2.5 3L18 10H7z" fill="#FACC15" stroke="none" opacity="0.9"/>
  </>)},
  scouting: { grad: ["#1E293B", "#0A0A0A"], render: (c) => (<>
    <circle cx="8" cy="13" r="3" stroke={c}/><circle cx="16" cy="13" r="3" stroke={c}/>
    <path d="M11 12h2M9.5 10l1-2h3l1 2" stroke={c}/>
    <path d="M4 6q4-2 8 0M12 6q4-2 8 0" stroke={c} opacity="0.5"/>
  </>)},
  family_home: { grad: ["#365314", "#0A0A0A"], render: (c) => (<>
    <path d="M4 12l8-7 8 7" stroke={c}/><path d="M6 11v9h12v-9" stroke={c}/><path d="M10 20v-5h4v5" stroke={c}/>
    <path d="M12 8.5l1.3 1.9-1.3 1.9-1.3-1.9z" fill="#EF4444" stroke="none"/>
  </>)},
  community_kids: { grad: ["#365314", "#0A0A0A"], render: (c) => (<>
    <circle cx="6" cy="9" r="1.8" stroke={c}/><path d="M3.2 17v-3a2.8 2.8 0 0 1 5.6 0v3" stroke={c}/>
    <circle cx="12" cy="7" r="2.1" stroke={c}/><path d="M8.7 17v-3.5a3.3 3.3 0 0 1 6.6 0V17" stroke={c}/>
    <circle cx="18" cy="9" r="1.8" stroke={c}/><path d="M15.2 17v-3a2.8 2.8 0 0 1 5.6 0v3" stroke={c}/>
  </>)},
  locker_room: { grad: ["#1E293B", "#0A0A0A"], render: (c) => (<>
    <rect x="4" y="4" width="5" height="13" rx="0.5" stroke={c}/><rect x="10" y="4" width="5" height="13" rx="0.5" stroke={c}/><rect x="16" y="4" width="5" height="13" rx="0.5" stroke={c}/>
    <circle cx="7.5" cy="10" r="0.4" fill={c} stroke="none"/><circle cx="13.5" cy="10" r="0.4" fill={c} stroke="none"/><circle cx="19.5" cy="10" r="0.4" fill={c} stroke="none"/>
    <path d="M3 19h18" stroke={c}/>
  </>)},
  data_chart: { grad: ["#164E63", "#0A0A0A"], render: (c) => (<>
    <path d="M4 20V9M9 20v-6M14 20V6M19 20v-9" stroke="#22D3EE"/>
    <circle cx="16" cy="6" r="3.4" stroke={c}/><path d="M18.4 8.4L21 11" stroke={c}/>
  </>)},
  street_court: { grad: ["#0F172A", "#000000"], render: (c) => (<>
    <path d="M4 4l4 4M4 8l4-4M4 8l4 4M4 12l4-4M4 12l4 4M4 16l4-4M4 16l4 4M4 20l4-4M12 4l4 4M12 8l4-4M12 8l4 4M12 12l4-4M12 12l4 4M12 16l4-4M12 16l4 4M12 20l4-4" stroke={c} opacity="0.35"/>
    <circle cx="18.5" cy="5" r="2.3" fill="none" stroke="#FACC15"/>
    <path d="M17 15.5l1.5-1.5 1.5 1.5-1.5 1.5z" fill="#FACC15" stroke="none"/>
  </>)},
  kampung_village: { grad: ["#365314", "#0A0A0A"], render: (c) => (<>
    <path d="M6 13l6-5 6 5" stroke={c}/><rect x="7.5" y="13" width="9" height="6" stroke={c}/>
    <path d="M4 19h16" stroke={c}/><path d="M4 19v-3M20 19v-3M4 16h16" stroke={c} opacity="0.6"/>
    <path d="M18 4c1.5 1 1.5 3 0 4M18 4c-1.5 1-1.5 3 0 4M18 4v9" stroke="#65A30D"/>
  </>)},
  social_media: { grad: ["#4C1D95", "#0A0A0A"], render: (c) => (<>
    <rect x="8" y="3" width="8" height="18" rx="1.5" stroke={c}/><path d="M11 19h2" stroke={c}/>
    <path d="M12 8.5l1 1.8-1 1.8-1-1.8z" fill="#EC4899" stroke="none"/>
    <path d="M17 6l1.5-1M18.5 9h1.7M17 12l1.5 1" stroke="#EC4899" opacity="0.8"/>
  </>)},
  coach_meeting: { grad: ["#1E293B", "#0A0A0A"], render: (c) => (<>
    <rect x="6" y="3" width="10" height="14" rx="1" stroke={c}/><path d="M9 3v-.5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1V3" stroke={c}/>
    <path d="M8.5 9l2 2 3.5-4" stroke="#22C55E"/>
    <circle cx="18" cy="16" r="3" stroke="#FACC15"/><path d="M18 16v2M16.5 19.5l3-3" stroke="#FACC15" opacity="0.7"/>
  </>)},
  clutch_pressure: { grad: ["#7C2D12", "#0A0A0A"], render: (c) => (<>
    <rect x="3" y="6" width="18" height="8" rx="1" stroke={c}/><path d="M6.5 9.5h2.5M6.5 11.5h2M11 9.5h2.5v4H11zM16 9.5h2M16 11.5h2.5" stroke={c}/>
    <circle cx="12" cy="19" r="2.6" stroke="#FACC15"/><path d="M12 17.6V19l1 .8" stroke="#FACC15"/>
  </>)},
  mamak_table: { grad: ["#78350F", "#1C0A00"], render: (c) => (<>
    <path d="M3 12h18l-1.5 2H4.5z" stroke={c}/><path d="M6 14v5M18 14v5" stroke={c} opacity="0.6"/>
    <path d="M9 12V7a1.5 1.5 0 0 1 3 0v5" stroke="#FACC15"/>
    <ellipse cx="16.5" cy="9" rx="2.2" ry="1.3" stroke="#FACC15"/>
  </>)},
  negotiation_table: { grad: ["#1E293B", "#0A0A0A"], render: (c) => (<>
    <path d="M3 15h18" stroke={c}/><path d="M5 15v4M19 15v4" stroke={c} opacity="0.6"/>
    <path d="M6 12a2.5 2.5 0 0 1 2.5-2.5H10a2.5 2.5 0 0 1 2.5 2.5v.5a2.5 2.5 0 0 1-2.5 2.5H8l-1.5 1.5V15H8a2.5 2.5 0 0 1-2-1z" stroke="#22C55E"/>
    <path d="M11.5 9.5a2.5 2.5 0 0 1 2.5-2.5H15a2.5 2.5 0 0 1 2.5 2.5V10A2.5 2.5 0 0 1 15 12.5h-1.5L12 14v-1.5h.5a2.5 2.5 0 0 1-1-1z" stroke="#FB923C"/>
  </>)},
  brand_deal: { grad: ["#581C87", "#0A0A0A"], render: (c) => (<>
    <path d="M4 4h7l9 9-7 7-9-9z" stroke={c}/><circle cx="9" cy="9" r="1.4" fill={c} stroke="none"/>
    <path d="M14.5 15.5l2-1.8 1.9 1.9-2 1.8z" fill="#FACC15" stroke="none"/>
  </>)},
  agent_leverage: { grad: ["#7C2D12", "#0A0A0A"], render: (c) => (<>
    <path d="M4 4l3 8-3 8" stroke={c}/><path d="M7 12h13" stroke={c}/>
    <path d="M15 9l4 3-4 3" stroke="#FACC15"/>
  </>)},
  hospital_care: { grad: ["#7F1D1D", "#0A0A0A"], render: (c) => (<>
    <path d="M4 20V10l8-6 8 6v10" stroke={c}/><path d="M4 20h16" stroke={c}/>
    <rect x="10.4" y="12" width="3.2" height="3.2" rx="0.5" fill="#EF4444" stroke="none"/>
    <path d="M12 12.2v2.8M10.6 13.6h2.8" stroke="#0A0A0A"/>
  </>)},
  court_fall: { grad: ["#7F1D1D", "#0A0A0A"], render: (c) => (<>
    <path d="M3 19h18" stroke={c} opacity="0.5"/>
    <circle cx="9" cy="9" r="1.6" stroke="#EF4444"/><path d="M9 10.6v3.5M9 12l-3 2M9 12l3.5 1M6 14l-1 3.5M12.5 13l2 4" stroke="#EF4444"/>
    <path d="M16 6l1.3 1.3M19 8l-1.6.5M17.5 4.5l-.5 1.6" stroke={c} opacity="0.6"/>
  </>)},
  debate: { grad: ["#78350F", "#1C0A00"], render: (c) => (<>
    <circle cx="7" cy="9" r="3" stroke={c}/><path d="M3 19v-3a4 4 0 0 1 8 0v3" stroke={c}/>
    <circle cx="17" cy="9" r="3" stroke="#FB923C"/><path d="M13 19v-3a4 4 0 0 1 8 0v3" stroke="#FB923C"/>
    <path d="M11 8h2M11 10h2" stroke={c}/>
  </>)},
  street_cash: { grad: ["#365314", "#0A0A0A"], render: (c) => (<>
    <path d="M4 4l4 4M4 8l4-4M4 8l4 4M4 12l4-4M12 4l4 4M12 8l4-4M12 8l4 4" stroke={c} opacity="0.3"/>
    <rect x="14" y="13" width="8" height="6" rx="1" stroke="#FACC15"/><circle cx="18" cy="16" r="1.3" stroke="#FACC15"/>
    <rect x="2" y="15" width="8" height="6" rx="1" stroke="#FACC15" opacity="0.6"/>
  </>)},
  charity_jersey: { grad: ["#365314", "#0A0A0A"], render: (c) => (<>
    <path d="M8 4l-4 3 2 3h2v10h8V10h2l2-3-4-3-2 2h-4z" stroke={c}/>
    <path d="M12 8.3l1 1.7-1 1.7-1-1.7z" fill="#EF4444" stroke="none"/>
  </>)},
  documentary_film: { grad: ["#164E63", "#0A0A0A"], render: (c) => (<>
    <rect x="3" y="8" width="15" height="11" rx="1" stroke={c}/>
    <path d="M3 8l1.5-3.5h3L6 8M9 8l1.5-3.5h3L12 8M15 8l1.5-3.5h1.5L17.2 8" stroke={c}/>
    <path d="M18 11l4-2.3v9.6L18 16" stroke="#22D3EE"/>
  </>)},
  weight_room: { grad: ["#78350F", "#1C0A00"], render: (c) => (<>
    <rect x="2" y="9" width="3" height="6" rx="0.5" stroke={c}/><rect x="19" y="9" width="3" height="6" rx="0.5" stroke={c}/>
    <rect x="5" y="10.5" width="2.5" height="3" stroke={c}/><rect x="16.5" y="10.5" width="2.5" height="3" stroke={c}/>
    <path d="M7.5 12h9" stroke="#FB923C" strokeWidth="2.2"/>
  </>)},
};

const svgScene = ({ size = 34, color = "currentColor" }, children) => (
  <svg width="70%" height="70%" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    {children}
  </svg>
);

function EventChoiceIcon({ risk, scene, icon, brandLogo }) {
  const sceneDef = scene && EVENT_SCENES[scene];
  const [c1, c2] = sceneDef ? sceneDef.grad : risk === "risky" ? ["#78350F", "#1C0A00"] : risk === "safe" ? ["#1E293B", "#0A0A0A"] : ["#1B1B1B", "#0A0A0A"];
  const accent = risk === "risky" ? "#FB923C" : risk === "safe" ? "#94A3B8" : "#A1A1AA";
  return (
    <div className="aspect-[16/11] mx-3 mt-3 rounded-2xl flex items-center justify-center relative overflow-hidden" style={{ background: `linear-gradient(150deg, ${c1}, ${c2})` }}>
      {risk && <span className="absolute bottom-2 left-2.5 f-mono text-[9px] uppercase tracking-wide font-bold" style={{ color: "rgba(255,255,255,0.55)" }}>{risk}</span>}
      {brandLogo && <div className="absolute top-2 right-2" style={{ filter: "drop-shadow(0 2px 6px rgba(0,0,0,0.6))" }}><PrimeCourtLogo width={54} /></div>}
      {icon
        ? <span style={{ fontSize: 40, lineHeight: 1, filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.55))" }}>{renderChoiceIcon(icon)}</span>
        : sceneDef ? svgScene({}, sceneDef.render(accent)) : <Dumbbell size={32} color={C.chalkDim} strokeWidth={1.6} />}
    </div>
  );
}

function EventScreen({ event, onChoose }) {
  return (
    <div className="min-h-full w-full flex items-center justify-center px-4 py-10" style={{ background: C.ink }}>
      <div className="max-w-md w-full rounded-[28px] p-6" style={{ background: C.ink2, border: `1px solid ${C.line}` }}>
        <div className="f-mono text-[10px] uppercase tracking-widest mb-1.5" style={{ color: C.chalkDim }}>Season Event</div>
        <div className="f-display text-xl font-extrabold mb-1.5" style={{ color: C.chalk }}>{event.title}</div>
        <p className="f-body text-[13px] mb-4" style={{ color: C.chalkDim }}>{event.desc}</p>
        <div className="grid grid-cols-2 gap-3">
          {event.choices.map((c, i) => {
            const pills = deriveEffectPills(c);
            return (
              <button key={i} onClick={() => onChoose(c)} className="choice-card text-left rounded-[20px] overflow-hidden transition"
                style={{ background: C.ink3, border: `1px solid ${C.line}` }}>
                <div className="text-center text-[13px] font-bold py-3" style={{ color: C.chalk }}>{c.label}</div>
                <EventChoiceIcon risk={c.risk} scene={c.scene || event.scene} icon={c.icon} brandLogo={event.brandLogo} />
                <div className="p-3 flex flex-col gap-2">
                  {pills.length === 0 && (
                    <div className="text-center f-mono text-[10px] py-2 rounded-full" style={{ background: C.ink2, color: C.chalkDim }}>Nothing changes</div>
                  )}
                  {pills.map((p, j) => (
                    <div key={j} className="flex items-center justify-between px-3 py-2 rounded-full text-[12px] font-semibold"
                      style={{ background: p.positive ? "rgba(16,185,129,0.14)" : "rgba(239,68,68,0.14)", color: p.positive ? "#10B981" : "#EF4444" }}>
                      <span className="flex items-center gap-1.5">
                        {p.positive ? <TrendingUp size={13} /> : <TrendingDown size={13} />}
                        {p.label}
                      </span>
                      {p.pct != null && (
                        <span className="f-mono text-[11px] font-extrabold px-2 py-0.5 rounded-full"
                          style={{ background: p.positive ? "rgba(16,185,129,0.22)" : "rgba(239,68,68,0.22)" }}>
                          {p.pct}%
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------
   INJURY RECOVERY SCREEN
   Shown after a serious in-season injury, before the season recap —
   same "compute normally, defer the screen" pattern as a Clutch Moment.
   Reuses EventScreen's exact choice-grid chrome; pills are hand-authored
   here rather than via deriveEffectPills() since the outcomes are
   conditional/probabilistic rather than fixed stat deltas.
--------------------------------------------------------- */
function InjuryRecoveryScreen({ pending, onChoose }) {
  const hasScience = pending.hasScience;
  return (
    <div className="min-h-full w-full flex items-center justify-center px-4 py-10" style={{ background: C.ink }}>
      <div className="max-w-md w-full rounded-[28px] p-6" style={{ background: C.ink2, border: `1px solid ${C.line}` }}>
        <div className="f-mono text-[10px] uppercase tracking-widest mb-1.5" style={{ color: C.chalkDim }}>Injury · {pending.missed} Games Missed</div>
        <div className="f-display text-xl font-extrabold mb-1.5" style={{ color: C.chalk }}>Recovery Plan</div>
        <p className="f-body text-[13px] mb-4" style={{ color: C.chalkDim }}>
          The physio lays out how to handle the rest of the recovery. One gets you back to full speed sooner. One protects you properly.
        </p>
        <div className={`grid ${hasScience ? "grid-cols-1" : "grid-cols-2"} gap-3`}>
          <button onClick={() => onChoose("rush")} className="choice-card text-left rounded-[20px] overflow-hidden transition" style={{ background: C.ink3, border: `1px solid ${C.line}` }}>
            <div className="text-center text-[13px] font-bold py-3" style={{ color: C.chalk }}>Rush Back</div>
            <EventChoiceIcon risk="risky" icon="flame" />
            <div className="p-3 flex flex-col gap-2">
              <div className="flex items-center justify-between px-3 py-2 rounded-full text-[12px] font-semibold" style={{ background: "rgba(16,185,129,0.14)", color: "#10B981" }}>
                <span className="flex items-center gap-1.5"><TrendingUp size={13} /> Back to full speed</span>
                <span className="f-mono text-[11px] font-extrabold px-2 py-0.5 rounded-full" style={{ background: "rgba(16,185,129,0.22)" }}>Now</span>
              </div>
              <div className="flex items-center justify-between px-3 py-2 rounded-full text-[12px] font-semibold" style={{ background: "rgba(239,68,68,0.14)", color: "#EF4444" }}>
                <span className="flex items-center gap-1.5"><TrendingDown size={13} /> Permanent damage risk</span>
                <span className="f-mono text-[11px] font-extrabold px-2 py-0.5 rounded-full" style={{ background: "rgba(239,68,68,0.22)" }}>35%</span>
              </div>
            </div>
          </button>
          <button onClick={() => onChoose("full")} className="choice-card text-left rounded-[20px] overflow-hidden transition" style={{ background: C.ink3, border: `1px solid ${C.line}` }}>
            <div className="text-center text-[13px] font-bold py-3" style={{ color: C.chalk }}>Full Rehab</div>
            <EventChoiceIcon risk="safe" icon="stretch" />
            <div className="p-3 flex flex-col gap-2">
              <div className="flex items-center justify-between px-3 py-2 rounded-full text-[12px] font-semibold" style={{ background: "rgba(239,68,68,0.14)", color: "#EF4444" }}>
                <span className="flex items-center gap-1.5"><TrendingDown size={13} /> Slow start next season</span>
                <span className="f-mono text-[11px] font-extrabold px-2 py-0.5 rounded-full" style={{ background: "rgba(239,68,68,0.22)" }}>Kept</span>
              </div>
              <div className="flex items-center justify-between px-3 py-2 rounded-full text-[12px] font-semibold" style={{ background: "rgba(16,185,129,0.14)", color: "#10B981" }}>
                <span className="flex items-center gap-1.5"><TrendingUp size={13} /> Fully sound, no damage</span>
                <span className="f-mono text-[11px] font-extrabold px-2 py-0.5 rounded-full" style={{ background: "rgba(16,185,129,0.22)" }}>100%</span>
              </div>
            </div>
          </button>
          {hasScience && (
            <button onClick={() => onChoose("guided")} className="choice-card text-left rounded-[20px] overflow-hidden transition" style={{ background: C.ink3, border: `1px solid ${C.amber}` }}>
              <div className="text-center text-[13px] font-bold py-3" style={{ color: C.chalk }}>Guided Rehab <span className="f-mono text-[10px]" style={{ color: C.amberBright }}>· Sports Science</span></div>
              <EventChoiceIcon risk="safe" icon="scalpel" />
              <div className="p-3 flex flex-col gap-2">
                <div className="flex items-center justify-between px-3 py-2 rounded-full text-[12px] font-semibold" style={{ background: "rgba(16,185,129,0.14)", color: "#10B981" }}>
                  <span className="flex items-center gap-1.5"><TrendingUp size={13} /> Back to full speed</span>
                  <span className="f-mono text-[11px] font-extrabold px-2 py-0.5 rounded-full" style={{ background: "rgba(16,185,129,0.22)" }}>Now</span>
                </div>
                <div className="flex items-center justify-between px-3 py-2 rounded-full text-[12px] font-semibold" style={{ background: "rgba(16,185,129,0.14)", color: "#10B981" }}>
                  <span className="flex items-center gap-1.5"><TrendingUp size={13} /> Fully sound, no damage</span>
                  <span className="f-mono text-[11px] font-extrabold px-2 py-0.5 rounded-full" style={{ background: "rgba(16,185,129,0.22)" }}>100%</span>
                </div>
              </div>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------
   OFF-SEASON PLAN SCREEN
   One meaningful choice in front of attribute spending, shown every
   season. Same choice-grid chrome as EventScreen/InjuryRecoveryScreen.
--------------------------------------------------------- */
function OffseasonPlanScreen({ player, onChoose }) {
  // Commercial deals don't fit a minor or a scholarship athlete — the same
  // rule handleConfirmTraining already applies to financial events. The
  // exact inverse of this condition is also what makes Overseas Camp
  // sponsored rather than costed below — same "who actually has income"
  // check, reused rather than duplicated with slightly different logic.
  const canCommercial = player.age >= 18 && !player.hblSeasonPending && !player.uba;
  const PLANS = [
    { id: "summer", label: "Summer League", icon: "trophyCash", risk: "risky",
      pills: [
        { label: "Popularity", value: "+6", positive: true },
        { label: "Scout visibility", value: "Up", positive: true },
        { label: "Fatigue", value: "+10", positive: false },
      ] },
    { id: "camp", label: "Overseas Camp", icon: "dumbbell", risk: null,
      pills: [
        { label: "Bonus development points", value: "+2", positive: true },
        { label: "Coach Trust", value: "+5", positive: true },
        canCommercial
          ? { label: "Cost", value: rm(4000), positive: false }
          : { label: "Cost", value: "Sponsored", positive: true },
      ] },
    { id: "rest", label: "Rest & Recover", icon: "bed", risk: "safe",
      pills: [
        { label: "Fatigue", value: "\u221225", positive: true },
        { label: "Injury risk next season", value: "\u221230%", positive: true },
        { label: "Development points", value: "\u22122", positive: false },
      ] },
  ];
  if (canCommercial) {
    PLANS.push({ id: "tour", label: "Commercial Tour", icon: "megaphone", risk: "risky",
      pills: [
        { label: "Money", value: `+${rm(8000)}`, positive: true },
        { label: "Popularity", value: "+10", positive: true },
        { label: "Team Chemistry", value: "\u22124", positive: false },
      ] });
  }
  return (
    <div className="min-h-full w-full flex items-center justify-center px-4 py-10" style={{ background: C.ink }}>
      <div className="max-w-md w-full rounded-[28px] p-6" style={{ background: C.ink2, border: `1px solid ${C.line}` }}>
        <div className="f-mono text-[10px] uppercase tracking-widest mb-1.5" style={{ color: C.chalkDim }}>Season {player.seasonNum} · Off-season</div>
        <div className="f-display text-xl font-extrabold mb-1.5" style={{ color: C.chalk }}>Off-season Plan</div>
        <p className="f-body text-[13px] mb-4" style={{ color: C.chalkDim }}>How do you spend the months before training camp?</p>
        <div className="grid grid-cols-2 gap-3">
          {PLANS.map(plan => (
            <button key={plan.id} onClick={() => onChoose(plan.id)} className="choice-card text-left rounded-[20px] overflow-hidden transition"
              style={{ background: C.ink3, border: `1px solid ${C.line}` }}>
              <div className="text-center text-[13px] font-bold py-3" style={{ color: C.chalk }}>{plan.label}</div>
              <EventChoiceIcon risk={plan.risk} icon={plan.icon} />
              <div className="p-3 flex flex-col gap-2">
                {plan.pills.map((pl, j) => (
                  <div key={j} className="flex items-center justify-between px-3 py-2 rounded-full text-[12px] font-semibold"
                    style={{ background: pl.positive ? "rgba(16,185,129,0.14)" : "rgba(239,68,68,0.14)", color: pl.positive ? "#10B981" : "#EF4444" }}>
                    <span className="flex items-center gap-1.5">
                      {pl.positive ? <TrendingUp size={13} /> : <TrendingDown size={13} />}
                      {pl.label}
                    </span>
                    <span className="f-mono text-[11px] font-extrabold px-2 py-0.5 rounded-full"
                      style={{ background: pl.positive ? "rgba(16,185,129,0.22)" : "rgba(239,68,68,0.22)" }}>
                      {pl.value}
                    </span>
                  </div>
                ))}
              </div>
            </button>
          ))}
        </div>
        <p className="f-body text-[10px] mt-3" style={{ color: C.chalkDim }}>
          *Scout visibility only matters once you already qualify for overseas interest.
        </p>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------
   CHOOSE IDENTITY SCREEN
   Shown once, right after Body Setup. Permanent for the career.
--------------------------------------------------------- */
function ChooseIdentityScreen({ player, onChoose }) {
  return (
    <div className="min-h-full w-full flex items-center justify-center px-4 py-10" style={{ background: C.ink }}>
      <div className="max-w-md w-full rounded-[28px] p-6" style={{ background: C.ink2, border: `1px solid ${C.line}` }}>
        <div className="f-mono text-[10px] uppercase tracking-widest mb-1.5" style={{ color: C.chalkDim }}>Career Creation</div>
        <div className="f-display text-xl font-extrabold mb-1.5" style={{ color: C.chalk }}>Choose Your Identity</div>
        <p className="f-body text-[13px] mb-4" style={{ color: C.chalkDim }}>
          How do you want to be known? This shapes how your game shows up on the stat sheet — not how good you are, just what kind of good. Permanent for this career.
        </p>
        <div className="grid grid-cols-2 gap-3">
          {PLAYING_STYLES.map(style => {
            const fits = style.bestFit.includes(player.position);
            return (
              <button key={style.id} onClick={() => onChoose(style.id)} className="choice-card text-left rounded-[20px] overflow-hidden transition"
                style={{ background: C.ink3, border: `1px solid ${fits ? "rgba(250,204,21,0.35)" : C.line}` }}>
                <div className="text-center text-[13px] font-bold pt-3" style={{ color: C.chalk }}>{style.label}</div>
                <div className="text-center f-body text-[10px] pb-1" style={{ color: C.chalkDim }}>{style.tagline}</div>
                <div className="text-center py-2" style={{ fontSize: 26 }}>{style.icon}</div>
                <div className="px-3 pb-3 flex items-center justify-center gap-1 flex-wrap">
                  {style.bestFit.map(pos => (
                    <span key={pos} className="f-mono text-[8.5px] uppercase px-2 py-0.5 rounded-full"
                      style={{
                        background: pos === player.position ? "rgba(250,204,21,0.10)" : C.ink2,
                        color: pos === player.position ? C.trophyGold : C.chalkDim,
                        border: `1px solid ${pos === player.position ? "rgba(250,204,21,0.35)" : C.line}`,
                      }}>
                      {pos}
                    </span>
                  ))}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------
   NAME YOUR RIVAL SCREEN
   Shown once, right after Choose Your Identity. Name and position are
   player-defined — an empty name or unpicked position just falls back to
   a random one inside rollRival(), so nothing here is a hard requirement.
--------------------------------------------------------- */
function NameRivalScreen({ player, onConfirm }) {
  const [name, setName] = useState("");
  const [position, setPosition] = useState(player.position);
  return (
    <div className="min-h-full w-full flex items-center justify-center px-4 py-10" style={{ background: C.ink }}>
      <div className="max-w-md w-full rounded-[28px] p-6" style={{ background: C.ink2, border: `1px solid ${C.line}` }}>
        <div className="f-mono text-[10px] uppercase tracking-widest mb-1.5" style={{ color: C.chalkDim }}>Career Creation</div>
        <div className="f-display text-xl font-extrabold mb-1.5" style={{ color: C.chalk }}>Name Your Rival</div>
        <p className="f-body text-[13px] mb-4" style={{ color: C.chalkDim }}>
          Someone your age, selected the same week you were. Base them on a real friend, a name you like, or leave it blank and let one find you.
        </p>

        <label className="f-mono text-[11px] uppercase tracking-widest" style={{ color: C.chalkDim }}>Rival's Name</label>
        <input
          value={name}
          onChange={e => setName(e.target.value.slice(0, 24))}
          placeholder="e.g. Farid Zulkarnain"
          className="f-body w-full mt-1 mb-4 px-3 py-2.5 rounded-xl outline-none text-sm"
          style={{ background: C.ink3, color: C.chalk, border: `1px solid ${C.line}` }}
        />

        <label className="f-mono text-[11px] uppercase tracking-widest" style={{ color: C.chalkDim }}>Position</label>
        <div className="grid grid-cols-5 gap-2 mt-2 mb-5">
          {POSITIONS.map(p => (
            <button key={p.id} onClick={() => setPosition(p.id)}
              className="choice-card text-center py-2.5 rounded-xl transition"
              style={{ background: position === p.id ? C.ink3 : "transparent", border: `1px solid ${position === p.id ? C.amber : C.line}` }}>
              <span className="f-display text-xs" style={{ color: position === p.id ? C.amberBright : C.chalk }}>{p.id}</span>
            </button>
          ))}
        </div>

        <PrimaryButton full onClick={() => onConfirm(name, position)}>
          {name.trim() ? `Lock In ${name.trim().split(" ")[0]}` : "Continue"} <ChevronRight size={14} className="inline ml-1" />
        </PrimaryButton>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------
   U15 NATIONAL SELECTION SCREEN
--------------------------------------------------------- */
function U15SelectionScreen({ player, selected, onContinue }) {
  const tier = getStateTier(player.hometown);
  const tm = TIER_META[tier];
  return (
    <div className="court-hero min-h-full w-full flex items-center justify-center px-4 py-10">
      <div className="max-w-md w-full rounded-[28px] p-6 text-center" style={{ background: C.ink2, border: `1px solid ${C.line}` }}>
        <div className="flex items-center justify-center gap-2 mb-3">
          <FlagIcon name={player.hometown} size={22} />
          <span className="f-mono text-[11px] uppercase tracking-widest" style={{ color: tm.color }}>
            {player.hometown} Selection Trials
          </span>
        </div>
        {selected ? (
          <>
            <Trophy size={32} color={C.trophyGold} className="mx-auto mb-3" />
            <div className="f-display text-xl uppercase" style={{ color: C.chalk }}>Selected!</div>
            <p className="f-body text-sm mt-2" style={{ color: C.chalkDim }}>
              Out of everyone who tried out, you've made {player.hometown}'s squad as a state representative at the
              National U15 Championship. Your name is up on the noticeboard — this is where it starts.
            </p>
          </>
        ) : (
          <>
            <Users size={32} color={C.chalkDim} className="mx-auto mb-3" />
            <div className="f-display text-xl uppercase" style={{ color: C.chalk }}>Not This Time</div>
            <p className="f-body text-sm mt-2" style={{ color: C.chalkDim }}>
              The {player.hometown} U15 squad list goes up without your name on it. It stings — but plenty of careers
              have started from exactly this spot. Time to get back in the gym.
            </p>
          </>
        )}
        {player.rival && (
          <div className="mt-4 mb-1 p-3 rounded-2xl text-left flex items-center gap-3" style={{ background: C.ink3, border: `1px solid ${C.line}` }}>
            <ClubCrest name={player.rival.name} size={40} />
            <div className="flex-1 min-w-0">
              <div className="f-mono text-[9px] uppercase tracking-widest" style={{ color: C.chalkDim }}>Also Selected This Year</div>
              <div className="f-display text-sm truncate" style={{ color: C.chalk }}>{player.rival.name}</div>
              <div className="f-body text-[10.5px]" style={{ color: C.chalkDim }}>{player.rival.position} · {player.rival.hometown}</div>
            </div>
          </div>
        )}
        <PrimaryButton full onClick={onContinue}>
          Continue <ChevronRight size={14} className="inline ml-1" />
        </PrimaryButton>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------
   U15 TOURNAMENT RESULTS SCREEN
--------------------------------------------------------- */
const StatCell = memo(function StatCell({ label, value }) {
  return (
    <div className="text-center">
      <div className="f-mono text-lg font-bold" style={{ color: C.chalk }}>{value}</div>
      <div className="f-mono text-[9px] uppercase" style={{ color: C.chalkDim }}>{label}</div>
    </div>
  );
})

function U15TournamentScreen({ player, onContinue }) {
  const u15 = player.u15Stats;
  const teamMeta = U15_TEAM_RESULT_META[player.u15TeamResult];
  const awards = player.u15Awards || [];
  return (
    <div className="min-h-full w-full flex items-center justify-center px-4 py-10" style={{ background: C.ink }}>
      <div className="max-w-md w-full rounded-[28px] p-6" style={{ background: C.ink2, border: `1px solid ${C.line}` }}>
        <div className="flex items-center gap-2 mb-1">
          <Trophy size={16} color={C.trophyGold} />
          <span className="f-display text-sm uppercase tracking-wide" style={{ color: C.gold }}>
            National U15 Championship — Final Result
          </span>
        </div>
        <div className="f-display text-lg uppercase mt-1" style={{ color: C.chalk }}>{teamMeta.label}</div>
        <p className="f-body text-xs mb-4" style={{ color: C.chalkDim }}>
          {player.hometown}'s campaign in the tournament, and your individual stat line.
        </p>

        <div className="grid grid-cols-4 gap-y-3 p-3 rounded-xl mb-3" style={{ background: C.ink3 }}>
          <StatCell label="PPG" value={u15.ppg} />
          <StatCell label="RPG" value={u15.rpg} />
          <StatCell label="APG" value={u15.apg} />
          <StatCell label="SPG" value={u15.spg} />
          <StatCell label="BPG" value={u15.bpg} />
          <StatCell label="FG%" value={`${u15.fgPct}%`} />
          <StatCell label="3P%" value={`${u15.threePct}%`} />
        </div>

        <div className="mb-4">
          <div className="f-mono text-[10px] uppercase tracking-widest mb-2" style={{ color: C.chalkDim }}>Awards</div>
          {awards.length > 0 ? (
            <div className="flex flex-wrap gap-1.5">
              {awards.map(id => <Badge key={id}>{U15_AWARD_META[id].label}</Badge>)}
            </div>
          ) : (
            <p className="f-body text-xs" style={{ color: C.chalkDim }}>
              No individual awards this time — but the tournament experience alone is worth plenty.
            </p>
          )}
        </div>

        <PrimaryButton full onClick={onContinue}>
          Continue <ChevronRight size={14} className="inline ml-1" />
        </PrimaryButton>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------
   NATIONAL YOUTH SHORTLIST SCREEN
--------------------------------------------------------- */
function U15ShortlistScreen({ player, onAccept, onDecline }) {
  return (
    <div className="court-hero min-h-full w-full flex items-center justify-center px-4 py-10">
      <div className="max-w-md w-full rounded-[28px] p-6" style={{ background: C.ink2, border: `1px solid ${C.line}` }}>
        <div className="flex items-center gap-2 mb-3">
          <Flag size={16} color={C.gold} />
          <span className="f-mono text-[11px] uppercase tracking-widest" style={{ color: C.gold }}>National Youth Shortlist</span>
        </div>
        <div className="f-display text-xl uppercase" style={{ color: C.chalk }}>You Made the Pool</div>
        <p className="f-body text-sm mt-2" style={{ color: C.chalkDim }}>
          {player.u15Awards && player.u15Awards.length > 0
            ? "Winning tournament hardware like that makes this an easy call for the scouts — out of everyone who played, you're one of roughly 50 players nationwide shortlisted for the national youth pool."
            : "Basketball Malaysia's talent scouts have been watching the tournament — and out of everyone who played, you're one of roughly 50 players nationwide shortlisted for the national youth pool."}
        </p>
        <p className="f-body text-sm mt-3" style={{ color: C.chalkDim }}>
          The invitation: three months living and training at Bukit Jalil Sports School with the country's best
          U15 talent. The coaching and competition are a real step up — but it's intense, and it comes with a
          higher chance of picking up an injury along the way.
        </p>
        <div className="grid grid-cols-2 gap-3 mt-5">
          <SecondaryButton onClick={onDecline}>Stay Home</SecondaryButton>
          <PrimaryButton onClick={onAccept}>Go to Bukit Jalil</PrimaryButton>
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------
   BUKIT JALIL BOOTCAMP RESULT SCREEN
--------------------------------------------------------- */
function U15BootcampResultScreen({ player, onContinue }) {
  const gains = player.bootcampGains || {};
  return (
    <div className="min-h-full w-full flex items-center justify-center px-4 py-10" style={{ background: C.ink }}>
      <div className="max-w-md w-full rounded-[28px] p-6" style={{ background: C.ink2, border: `1px solid ${C.line}` }}>
        <div className="flex items-center gap-2 mb-1">
          <Trophy size={16} color={C.trophyGold} />
          <span className="f-display text-sm uppercase tracking-wide" style={{ color: C.gold }}>Bukit Jalil Sports School</span>
        </div>
        <p className="f-body text-sm mb-4" style={{ color: C.chalkDim }}>
          Three months of elite training alongside the country's best U15 talent is behind you.
        </p>

        <div className="mb-4">
          <div className="f-mono text-[10px] uppercase tracking-widest mb-2" style={{ color: C.chalkDim }}>Development</div>
          <div className="grid grid-cols-2 gap-2">
            {STAT_LIST.map(s => (
              <div key={s} className="flex items-center justify-between px-3 py-2 rounded-xl" style={{ background: C.ink3 }}>
                <span className="f-body text-xs" style={{ color: C.chalkDim }}>{STAT_META[s].label}</span>
                <span className="f-mono text-xs" style={{ color: C.teal }}>+{gains[s] ?? 0}</span>
              </div>
            ))}
          </div>
        </div>

        {player.bootcampInjury && (
          <div className="mb-4 p-3 rounded-xl" style={{ background: "rgba(229,72,77,0.1)", border: `1px solid ${C.red}` }}>
            <div className="f-display text-xs uppercase" style={{ color: C.red }}>Injury Setback</div>
            <p className="f-body text-xs mt-1" style={{ color: C.chalkDim }}>{player.bootcampInjury}</p>
          </div>
        )}

        <PrimaryButton full onClick={onContinue}>
          Continue <ChevronRight size={14} className="inline ml-1" />
        </PrimaryButton>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------
   NATIONAL U17 CHAMPIONSHIP (AGE 17) SCREENS
--------------------------------------------------------- */
function A17TournamentScreen({ player, onContinue }) {
  const s = player.a17Stats;
  const teamMeta = A17_TEAM_RESULT_META[player.a17TeamResult];
  const awards = player.a17Awards || [];
  if (!s) {
    return (
      <div className="court-hero min-h-full w-full flex items-center justify-center px-4 py-10">
        <div className="max-w-md w-full rounded-[28px] p-6 text-center" style={{ background: C.ink2, border: `1px solid ${C.line}` }}>
          <Users size={32} color={C.chalkDim} className="mx-auto mb-3" />
          <div className="f-display text-xl uppercase" style={{ color: C.chalk }}>Not Selected</div>
          <p className="f-body text-sm mt-2 mb-5" style={{ color: C.chalkDim }}>
            The {player.hometown} U17 squad list goes up without your name on it this year. Keep grinding — there's
            still a whole career ahead.
          </p>
          <PrimaryButton full onClick={onContinue}>Continue <ChevronRight size={14} className="inline ml-1" /></PrimaryButton>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-full w-full flex items-center justify-center px-4 py-10" style={{ background: C.ink }}>
      <div className="max-w-md w-full rounded-[28px] p-6" style={{ background: C.ink2, border: `1px solid ${C.line}` }}>
        <div className="flex items-center gap-2 mb-1">
          <Trophy size={16} color={C.trophyGold} />
          <span className="f-display text-sm uppercase tracking-wide" style={{ color: C.gold }}>
            National U17 Championship — Final Result
          </span>
        </div>
        <div className="f-display text-lg uppercase mt-1" style={{ color: C.chalk }}>{teamMeta.label}</div>
        <p className="f-body text-xs mb-4" style={{ color: C.chalkDim }}>
          {player.hometown}'s campaign in the tournament, and your individual stat line.
        </p>

        <div className="grid grid-cols-4 gap-y-3 p-3 rounded-xl mb-3" style={{ background: C.ink3 }}>
          <StatCell label="PPG" value={s.ppg} />
          <StatCell label="RPG" value={s.rpg} />
          <StatCell label="APG" value={s.apg} />
          <StatCell label="SPG" value={s.spg} />
          <StatCell label="BPG" value={s.bpg} />
          <StatCell label="FG%" value={`${s.fgPct}%`} />
          <StatCell label="3P%" value={`${s.threePct}%`} />
        </div>

        <div className="mb-4">
          <div className="f-mono text-[10px] uppercase tracking-widest mb-2" style={{ color: C.chalkDim }}>Awards</div>
          {awards.length > 0 ? (
            <div className="flex flex-wrap gap-1.5">
              {awards.map(id => <Badge key={id}>{A17_AWARD_META[id].label}</Badge>)}
            </div>
          ) : (
            <p className="f-body text-xs" style={{ color: C.chalkDim }}>
              No individual awards this time — but the tournament experience alone is worth plenty.
            </p>
          )}
        </div>

        <PrimaryButton full onClick={onContinue}>
          Continue <ChevronRight size={14} className="inline ml-1" />
        </PrimaryButton>
      </div>
    </div>
  );
}

function A17ShortlistScreen({ player, onAccept, onDecline }) {
  return (
    <div className="court-hero min-h-full w-full flex items-center justify-center px-4 py-10">
      <div className="max-w-md w-full rounded-[28px] p-6" style={{ background: C.ink2, border: `1px solid ${C.line}` }}>
        <div className="flex items-center gap-2 mb-3">
          <Flag size={16} color={C.gold} />
          <span className="f-mono text-[11px] uppercase tracking-widest" style={{ color: C.gold }}>U18 National Shortlist</span>
        </div>
        <div className="f-display text-xl uppercase" style={{ color: C.chalk }}>You Made the Pool</div>
        <p className="f-body text-sm mt-2" style={{ color: C.chalkDim }}>
          {player.a17Awards && player.a17Awards.length > 0
            ? "Winning tournament hardware like that makes this an easy call for the scouts — out of everyone who played, you're one of roughly 50 players nationwide shortlisted for the U18 national pool."
            : "Basketball Malaysia's scouts have been watching the U17s — and out of everyone who played, you're one of roughly 50 players nationwide shortlisted for the U18 national pool."}
        </p>
        <p className="f-body text-sm mt-3" style={{ color: C.chalkDim }}>
          The invitation: three months living and training at Bukit Jalil Sports School with the country's best
          talent. The coaching and competition are a real step up — but it's intense, and it comes with a higher
          chance of picking up an injury along the way.
        </p>
        <div className="grid grid-cols-2 gap-3 mt-5">
          <SecondaryButton onClick={onDecline}>Stay Home</SecondaryButton>
          <PrimaryButton onClick={onAccept}>Go to Bukit Jalil</PrimaryButton>
        </div>
      </div>
    </div>
  );
}

function A17BootcampResultScreen({ player, onContinue }) {
  const gains = player.bootcampGains || {};
  return (
    <div className="min-h-full w-full flex items-center justify-center px-4 py-10" style={{ background: C.ink }}>
      <div className="max-w-md w-full rounded-[28px] p-6" style={{ background: C.ink2, border: `1px solid ${C.line}` }}>
        <div className="flex items-center gap-2 mb-1">
          <Trophy size={16} color={C.trophyGold} />
          <span className="f-display text-sm uppercase tracking-wide" style={{ color: C.gold }}>Bukit Jalil Sports School</span>
        </div>
        <p className="f-body text-sm mb-4" style={{ color: C.chalkDim }}>
          Another three months of elite training alongside the country's best young talent is behind you.
        </p>

        <div className="mb-4">
          <div className="f-mono text-[10px] uppercase tracking-widest mb-2" style={{ color: C.chalkDim }}>Development</div>
          <div className="grid grid-cols-2 gap-2">
            {STAT_LIST.map(s => (
              <div key={s} className="flex items-center justify-between px-3 py-2 rounded-xl" style={{ background: C.ink3 }}>
                <span className="f-body text-xs" style={{ color: C.chalkDim }}>{STAT_META[s].label}</span>
                <span className="f-mono text-xs" style={{ color: C.teal }}>+{gains[s] ?? 0}</span>
              </div>
            ))}
          </div>
        </div>

        {player.bootcampInjury && (
          <div className="mb-4 p-3 rounded-xl" style={{ background: "rgba(229,72,77,0.1)", border: `1px solid ${C.red}` }}>
            <div className="f-display text-xs uppercase" style={{ color: C.red }}>Injury Setback</div>
            <p className="f-body text-xs mt-1" style={{ color: C.chalkDim }}>{player.bootcampInjury}</p>
          </div>
        )}

        <PrimaryButton full onClick={onContinue}>
          Continue <ChevronRight size={14} className="inline ml-1" />
        </PrimaryButton>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------
   U16 FIBA ASIA CUP RESULT SCREEN
--------------------------------------------------------- */
function U16ResultScreen({ player, onContinue }) {
  const s = player.age16Stats || {};
  const gains = player.age16Gains || {};
  const hasGains = Object.keys(gains).length > 0;
  return (
    <div className="min-h-full w-full flex items-center justify-center px-4 py-10" style={{ background: C.ink }}>
      <div className="max-w-md w-full rounded-[28px] p-6" style={{ background: C.ink2, border: `1px solid ${C.line}` }}>
        <div className="flex items-center gap-2 mb-1">
          <Flag size={16} color={C.gold} />
          <span className="f-display text-sm uppercase tracking-wide" style={{ color: C.gold }}>Malaysia U16 · FIBA Asia Cup Qualifiers</span>
        </div>
        <div className="f-display text-lg uppercase mt-1" style={{ color: C.chalk }}>{player.age16ResultLabel}</div>
        <p className="f-body text-xs mb-3" style={{ color: C.chalkDim }}>
          {player.age16Qualified
            ? "Malaysia got through the 5-team qualifiers and into the 12-team Asia Cup proper — a rare, hard-won result."
            : "Malaysia couldn't get out of the 5-team qualifying group this cycle, and didn't reach the Asia Cup."}
        </p>

        {s.nbaTalent && (
          <div className="mb-3 p-2 rounded-xl text-center" style={{ background: "rgba(250,204,21,0.1)", border: `1px solid ${C.trophyGold}` }}>
            <span className="f-mono text-[11px] uppercase tracking-widest" style={{ color: C.gold }}>★ Standout Performer ★</span>
          </div>
        )}

        <div className="grid grid-cols-4 gap-y-3 p-3 rounded-xl mb-3" style={{ background: C.ink3 }}>
          <StatCell label="PPG" value={s.ppg} />
          <StatCell label="RPG" value={s.rpg} />
          <StatCell label="APG" value={s.apg} />
          <StatCell label="SPG" value={s.spg} />
          <StatCell label="BPG" value={s.bpg} />
          <StatCell label="FG%" value={`${s.fgPct}%`} />
          <StatCell label="3P%" value={`${s.threePct}%`} />
        </div>

        <div className="mb-4">
          <div className="f-mono text-[10px] uppercase tracking-widest mb-2" style={{ color: C.chalkDim }}>Honours</div>
          <div className="flex flex-wrap gap-1.5">
            <Badge>U16 National Team</Badge>
            {player.age16Qualified && <Badge>FIBA U16 Asia Cup</Badge>}
            {player.age16TOT && <Badge>Team of the Tournament</Badge>}
          </div>
          {!player.age16TOT && (
            <p className="f-body text-[11px] mt-2" style={{ color: C.chalkDim }}>
              Not named to the Team of the Tournament this time.
            </p>
          )}
        </div>

        {hasGains && (
          <div className="mb-4">
            <div className="f-mono text-[10px] uppercase tracking-widest mb-2" style={{ color: C.chalkDim }}>Development</div>
            <div className="grid grid-cols-3 gap-1.5">
              {STAT_LIST.filter(st => gains[st]).map(st => (
                <div key={st} className="flex items-center justify-between px-2 py-1.5 rounded-xl" style={{ background: C.ink3 }}>
                  <span className="f-body text-[10px]" style={{ color: C.chalkDim }}>{STAT_META[st].label}</span>
                  <span className="f-mono text-[10px]" style={{ color: C.teal }}>+{gains[st]}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {player.age16NatU17Stats && (
          <div className="mb-4 p-3 rounded-xl" style={{ background: C.ink3, border: `1px solid ${C.line}` }}>
            <div className="f-mono text-[10px] uppercase tracking-widest mb-1.5" style={{ color: C.chalkDim }}>Also This Year — National U17 Tournament</div>
            <p className="f-body text-xs mb-2" style={{ color: C.chalkDim }}>
              Different months, same year — you also suited up for {player.hometown} against genuine 17-year-olds. Finished as <span style={{ color: C.chalk }}>{player.age16NatU17ResultLabel}</span>.
            </p>
            <div className="grid grid-cols-7 gap-1">
              {[["PPG", player.age16NatU17Stats.ppg], ["RPG", player.age16NatU17Stats.rpg], ["APG", player.age16NatU17Stats.apg], ["SPG", player.age16NatU17Stats.spg], ["BPG", player.age16NatU17Stats.bpg], ["FG%", player.age16NatU17Stats.fgPct], ["3P%", player.age16NatU17Stats.threePct]].map(([lbl, val]) => (
                <div key={lbl} className="text-center">
                  <div className="f-mono text-xs font-bold" style={{ color: C.chalk }}>{val}</div>
                  <div className="f-mono text-[8px] uppercase" style={{ color: C.chalkDim }}>{lbl}</div>
                </div>
              ))}
            </div>
            {player.age16NatU17Awards && player.age16NatU17Awards.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-2.5">
                {player.age16NatU17Awards.map(a => (
                  <span key={a} className="f-mono text-[8.5px] px-2 py-0.5 rounded-full" style={{ background: "rgba(250,204,21,0.1)", color: C.trophyGold, border: `1px solid rgba(250,204,21,0.3)` }}>
                    {U15_AWARD_META[a] ? U15_AWARD_META[a].label : a}
                  </span>
                ))}
              </div>
            )}
          </div>
        )}

        <PrimaryButton full onClick={onContinue}>
          Continue <ChevronRight size={14} className="inline ml-1" />
        </PrimaryButton>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------
   U18 FIBA ASIA CUP RESULT SCREEN
--------------------------------------------------------- */
function NationalTryoutScreen({ player, tryout, onAttend, onDecline }) {
  const ev = tryout.event;
  const highRated = tryout.rating > 80;
  const title = ev.type === "sea_games" ? "SEA Games"
    : ev.type === "qualifier" ? `Asia Cup Qualifiers — Phase ${ev.phase}`
    : "FIBA Asia Cup";
  return (
    <div className="court-hero min-h-full w-full flex items-center justify-center px-4 py-10">
      <div className="max-w-md w-full rounded-[28px] p-6" style={{ background: C.ink2, border: `1px solid ${C.line}` }}>
        <div className="flex items-center gap-2 mb-3">
          <Flag size={16} color={C.gold} />
          <span className="f-mono text-[11px] uppercase tracking-widest" style={{ color: C.gold }}>National Team Call</span>
        </div>
        <div className="f-display text-xl uppercase" style={{ color: C.chalk }}>Tryout Invitation</div>
        <p className="f-body text-sm mt-2" style={{ color: C.chalkDim }}>
          Basketball Malaysia has invited you to trials for the <span style={{ color: C.chalk }}>{title}</span> ({ev.year}).
          Representing your country is a huge honour — but the national camp is demanding and eats into your off-season.
        </p>
        <p className="f-body text-xs mt-3" style={{ color: highRated ? C.gold : C.chalkDim }}>
          {highRated
            ? "You're one of the country's best — the coaches would be foolish to leave you out."
            : tryout.wonAwardThisSeason
              ? "Your season's hardware got their attention — but a squad spot still has to be earned at trials."
              : "You'll have to earn your place against the other invitees."}
        </p>
        <div className="grid grid-cols-2 gap-3 mt-5">
          <SecondaryButton onClick={onDecline}>Skip This Time</SecondaryButton>
          <PrimaryButton onClick={onAttend}>Attend Tryout</PrimaryButton>
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------
   CONTINUE STUDY OR NOT? (age 19)
--------------------------------------------------------- */
function StudyDecisionScreen({ onStudy, onFocus }) {
  return (
    <div className="court-hero min-h-full w-full flex items-center justify-center px-4 py-10">
      <div className="max-w-md w-full rounded-[28px] p-6" style={{ background: C.ink2, border: `1px solid ${C.line}` }}>
        <div className="f-mono text-[10px] uppercase tracking-widest mb-1.5" style={{ color: C.chalkDim }}>Life Decision</div>
        <div className="f-display text-xl font-extrabold mb-1.5" style={{ color: C.chalk }}>Continue Study or Not?</div>
        <p className="f-body text-[13px] mb-4" style={{ color: C.chalkDim }}>
          A university has offered you a place. Balancing a degree with basketball is possible — but it means stepping back from the pro pathway for a few years.
        </p>
        <div className="grid grid-cols-2 gap-3">
          <button onClick={onStudy} className="choice-card text-left rounded-[20px] overflow-hidden transition" style={{ background: C.ink3, border: `1px solid ${C.line}` }}>
            <div className="text-center text-[13px] font-bold py-3" style={{ color: C.chalk }}>Continue Study</div>
            <div className="aspect-[16/11] mx-3 rounded-2xl flex items-center justify-center relative overflow-hidden" style={{ background: "linear-gradient(150deg, #164E63, #0A0A0A)" }}>
              <Brain size={34} color="#22D3EE" strokeWidth={1.6} />
            </div>
            <div className="p-3 flex flex-col gap-2">
              <div className="flex items-center justify-between px-3 py-2 rounded-full text-[12px] font-semibold" style={{ background: "rgba(16,185,129,0.14)", color: "#10B981" }}>
                <span className="flex items-center gap-1.5"><TrendingUp size={13} />Faster IQ Growth</span>
              </div>
              <div className="flex items-center justify-between px-3 py-2 rounded-full text-[12px] font-semibold" style={{ background: "rgba(16,185,129,0.14)", color: "#10B981" }}>
                <span className="flex items-center gap-1.5"><TrendingUp size={13} />Lighter Fatigue</span>
              </div>
              <div className="flex items-center justify-between px-3 py-2 rounded-full text-[12px] font-semibold" style={{ background: "rgba(239,68,68,0.14)", color: "#EF4444" }}>
                <span className="flex items-center gap-1.5"><TrendingDown size={13} />Semi-Pro Only Until 23</span>
              </div>
            </div>
          </button>
          <button onClick={onFocus} className="choice-card text-left rounded-[20px] overflow-hidden transition" style={{ background: C.ink3, border: `1px solid ${C.line}` }}>
            <div className="text-center text-[13px] font-bold py-3" style={{ color: C.chalk }}>Focus on Basketball</div>
            <div className="aspect-[16/11] mx-3 rounded-2xl flex items-center justify-center relative overflow-hidden" style={{ background: "linear-gradient(150deg, #78350F, #1C0A00)" }}>
              <Dumbbell size={34} color={C.gold} strokeWidth={1.6} />
            </div>
            <div className="p-3 flex flex-col gap-2">
              <div className="flex items-center justify-between px-3 py-2 rounded-full text-[12px] font-semibold" style={{ background: "rgba(16,185,129,0.14)", color: "#10B981" }}>
                <span className="flex items-center gap-1.5"><TrendingUp size={13} />Stay on Pro Path</span>
              </div>
              <div className="flex items-center justify-between px-3 py-2 rounded-full text-[12px] font-semibold" style={{ background: "rgba(16,185,129,0.14)", color: "#10B981" }}>
                <span className="flex items-center gap-1.5"><TrendingUp size={13} />No Restrictions</span>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

function NationalResultScreen({ event, onContinue }) {
  const s = event.stats || {};
  return (
    <div className="min-h-full w-full flex items-center justify-center px-4 py-10" style={{ background: C.ink }}>
      <div className="max-w-md w-full rounded-[28px] p-6" style={{ background: C.ink2, border: `1px solid ${C.line}` }}>
        <div className="flex items-center gap-2 mb-1">
          <Flag size={16} color={C.gold} />
          <span className="f-display text-sm uppercase tracking-wide" style={{ color: C.gold }}>🇲🇾 Malaysia National Team</span>
        </div>
        <div className="f-display text-lg uppercase mt-1" style={{ color: C.chalk }}>{event.label}</div>
        <p className="f-body text-xs mb-3" style={{ color: C.chalkDim }}>
          {event.type === "sea_games"
            ? "Eleven Southeast Asian nations, one podium. Malaysia are genuine contenders here — a medal is within reach."
            : event.type === "qualifier"
              ? "Every game in the qualifiers matters — the top four teams advance to the Asia Cup."
              : "The FIBA Asia Cup: Asia's best on the biggest stage."}
        </p>

        {s.role && (
          <div className="mb-3">
            <span className="f-mono text-[9px] uppercase px-2 py-0.5 rounded-full" style={{ color: C.gold, border: `1px solid ${C.amber}` }}>
              {s.role}
            </span>
          </div>
        )}

        {s.standout && (
          <div className="mb-3 p-2 rounded-xl text-center" style={{ background: "rgba(250,204,21,0.1)", border: `1px solid ${C.trophyGold}` }}>
            <span className="f-mono text-[11px] uppercase tracking-widest" style={{ color: C.gold }}>★ Standout Performer ★</span>
          </div>
        )}

        <div className="grid grid-cols-4 gap-y-3 p-3 rounded-xl mb-3" style={{ background: C.ink3 }}>
          <StatCell label="PPG" value={s.ppg} />
          <StatCell label="RPG" value={s.rpg} />
          <StatCell label="APG" value={s.apg} />
          <StatCell label="SPG" value={s.spg} />
          <StatCell label="BPG" value={s.bpg} />
          <StatCell label="FG%" value={`${s.fgPct}%`} />
          <StatCell label="3P%" value={`${s.threePct}%`} />
        </div>

        <PrimaryButton full onClick={onContinue}>
          Continue <ChevronRight size={14} className="inline ml-1" />
        </PrimaryButton>
      </div>
    </div>
  );
}

function U18ResultScreen({ player, onContinue }) {
  if (!player.age18Made) {
    return (
      <div className="court-hero min-h-full w-full flex items-center justify-center px-4 py-10">
        <div className="max-w-md w-full rounded-[28px] p-6 text-center" style={{ background: C.ink2, border: `1px solid ${C.line}` }}>
          <Users size={32} color={C.chalkDim} className="mx-auto mb-3" />
          <div className="f-display text-xl uppercase" style={{ color: C.chalk }}>Just Missed Out</div>
          <p className="f-body text-sm mt-2 mb-5" style={{ color: C.chalkDim }}>
            You trained hard with the U18 national pool, but the coaches went another direction for the final Asia
            Cup Qualifiers squad. A tough break — but the exposure counts, and there's a whole senior career ahead.
          </p>
          <PrimaryButton full onClick={onContinue}>Continue <ChevronRight size={14} className="inline ml-1" /></PrimaryButton>
        </div>
      </div>
    );
  }
  const s = player.age18Stats || {};
  const gains = player.age18Gains || {};
  const hasGains = Object.keys(gains).length > 0;
  return (
    <div className="min-h-full w-full flex items-center justify-center px-4 py-10" style={{ background: C.ink }}>
      <div className="max-w-md w-full rounded-[28px] p-6" style={{ background: C.ink2, border: `1px solid ${C.line}` }}>
        <div className="flex items-center gap-2 mb-1">
          <Flag size={16} color={C.gold} />
          <span className="f-display text-sm uppercase tracking-wide" style={{ color: C.gold }}>Malaysia U18 · FIBA Asia Cup Qualifiers</span>
        </div>
        <div className="f-display text-lg uppercase mt-1" style={{ color: C.chalk }}>{player.age18ResultLabel}</div>
        <p className="f-body text-xs mb-3" style={{ color: C.chalkDim }}>
          {player.age18Qualified
            ? "Malaysia got through the 5-team qualifiers and into the 12-team Asia Cup proper — a rare, hard-won result."
            : "Malaysia couldn't get out of the 5-team qualifying group this cycle, and didn't reach the Asia Cup."}
        </p>

        {s.nbaTalent && (
          <div className="mb-3 p-2 rounded-xl text-center" style={{ background: "rgba(250,204,21,0.1)", border: `1px solid ${C.trophyGold}` }}>
            <span className="f-mono text-[11px] uppercase tracking-widest" style={{ color: C.gold }}>★ Standout Performer ★</span>
          </div>
        )}

        <div className="grid grid-cols-4 gap-y-3 p-3 rounded-xl mb-3" style={{ background: C.ink3 }}>
          <StatCell label="PPG" value={s.ppg} />
          <StatCell label="RPG" value={s.rpg} />
          <StatCell label="APG" value={s.apg} />
          <StatCell label="SPG" value={s.spg} />
          <StatCell label="BPG" value={s.bpg} />
          <StatCell label="FG%" value={`${s.fgPct}%`} />
          <StatCell label="3P%" value={`${s.threePct}%`} />
        </div>

        <div className="mb-4">
          <div className="f-mono text-[10px] uppercase tracking-widest mb-2" style={{ color: C.chalkDim }}>Honours</div>
          <div className="flex flex-wrap gap-1.5">
            <Badge>U18 National Team</Badge>
            {player.age18Qualified && <Badge>FIBA U18 Asia Cup</Badge>}
            {player.age18TOT && <Badge>Team of the Tournament</Badge>}
          </div>
          {!player.age18TOT && (
            <p className="f-body text-[11px] mt-2" style={{ color: C.chalkDim }}>
              Not named to the Team of the Tournament this time.
            </p>
          )}
        </div>

        {hasGains && (
          <div className="mb-4">
            <div className="f-mono text-[10px] uppercase tracking-widest mb-2" style={{ color: C.chalkDim }}>Development</div>
            <div className="grid grid-cols-3 gap-1.5">
              {STAT_LIST.filter(st => gains[st]).map(st => (
                <div key={st} className="flex items-center justify-between px-2 py-1.5 rounded-xl" style={{ background: C.ink3 }}>
                  <span className="f-body text-[10px]" style={{ color: C.chalkDim }}>{STAT_META[st].label}</span>
                  <span className="f-mono text-[10px]" style={{ color: C.teal }}>+{gains[st]}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <PrimaryButton full onClick={onContinue}>
          Continue <ChevronRight size={14} className="inline ml-1" />
        </PrimaryButton>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------
   MSSM RESULT SCREEN
--------------------------------------------------------- */
function MSSMResultScreen({ player, onContinue }) {
  const s = player.mssmStats || {};
  const awards = player.mssmAwards || [];
  return (
    <div className="min-h-full w-full flex items-center justify-center px-4 py-10" style={{ background: C.ink }}>
      <div className="max-w-md w-full rounded-[28px] p-6" style={{ background: C.ink2, border: `1px solid ${C.line}` }}>
        <div className="flex items-center gap-2 mb-1">
          <Trophy size={16} color={C.gold} />
          <span className="f-display text-sm uppercase tracking-wide" style={{ color: C.gold }}>MSSM · {player.hometown}</span>
        </div>
        <div className="f-display text-lg uppercase mt-1" style={{ color: C.chalk }}>{player.mssmResultLabel}</div>
        <p className="f-body text-xs mb-3" style={{ color: C.chalkDim }}>
          {player.mssmGuaranteed
            ? "Your national/state squad spot this year earned you an automatic call-up to MSSM too."
            : `Majlis Sukan Sekolah-Sekolah Malaysia — ${player.hometown}'s run this year, ${s.games} games.`}
        </p>

        <div className="grid grid-cols-4 gap-y-3 p-3 rounded-xl mb-3" style={{ background: C.ink3 }}>
          <StatCell label="PPG" value={s.ppg} />
          <StatCell label="RPG" value={s.rpg} />
          <StatCell label="APG" value={s.apg} />
          <StatCell label="SPG" value={s.spg} />
          <StatCell label="BPG" value={s.bpg} />
          <StatCell label="FG%" value={`${s.fgPct}%`} />
          <StatCell label="3P%" value={`${s.threePct}%`} />
          <StatCell label="Games" value={s.games} />
        </div>

        <div className="mb-4">
          <div className="f-mono text-[10px] uppercase tracking-widest mb-2" style={{ color: C.chalkDim }}>Awards</div>
          {awards.length > 0 ? (
            <div className="flex flex-wrap gap-1.5">
              {awards.map(id => <Badge key={id}>{MSSM_AWARD_META[id] ? MSSM_AWARD_META[id].label : id}</Badge>)}
            </div>
          ) : (
            <p className="f-body text-xs" style={{ color: C.chalkDim }}>No individual awards this time.</p>
          )}
        </div>

        <PrimaryButton full onClick={onContinue}>
          Continue <ChevronRight size={14} className="inline ml-1" />
        </PrimaryButton>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------
   U17 JUMPCLASS RESULT SCREEN
--------------------------------------------------------- */
function U17ResultScreen({ player, onContinue }) {
  const s = player.age16Stats || {};
  const gains = player.age16Gains || {};
  const awards = player.age16Awards || [];
  return (
    <div className="min-h-full w-full flex items-center justify-center px-4 py-10" style={{ background: C.ink }}>
      <div className="max-w-md w-full rounded-[28px] p-6" style={{ background: C.ink2, border: `1px solid ${C.line}` }}>
        <div className="flex items-center gap-2 mb-1">
          <TrendingUp size={16} color={C.teal} />
          <span className="f-display text-sm uppercase tracking-wide" style={{ color: C.teal }}>National U17 Championship · Jumpclass</span>
        </div>
        <div className="f-display text-lg uppercase mt-1" style={{ color: C.chalk }}>{player.age16ResultLabel}</div>
        <p className="f-body text-xs mb-3" style={{ color: C.chalkDim }}>
          Playing up a full year against older, stronger opponents is brutal — but the experience is priceless.
        </p>

        <div className="grid grid-cols-4 gap-y-3 p-3 rounded-xl mb-3" style={{ background: C.ink3 }}>
          <StatCell label="PPG" value={s.ppg} />
          <StatCell label="RPG" value={s.rpg} />
          <StatCell label="APG" value={s.apg} />
          <StatCell label="SPG" value={s.spg} />
          <StatCell label="BPG" value={s.bpg} />
          <StatCell label="FG%" value={`${s.fgPct}%`} />
          <StatCell label="3P%" value={`${s.threePct}%`} />
        </div>

        <div className="mb-4">
          <div className="f-mono text-[10px] uppercase tracking-widest mb-2" style={{ color: C.chalkDim }}>Awards</div>
          {awards.length > 0 ? (
            <div className="flex flex-wrap gap-1.5">
              {awards.map(id => <Badge key={id}>{U15_AWARD_META[id].label}</Badge>)}
            </div>
          ) : (
            <p className="f-body text-xs" style={{ color: C.chalkDim }}>
              No individual awards — holding your own against older players is a win in itself.
            </p>
          )}
        </div>

        <div className="mb-4">
          <div className="f-mono text-[10px] uppercase tracking-widest mb-2" style={{ color: C.chalkDim }}>Development</div>
          <div className="grid grid-cols-3 gap-1.5">
            {STAT_LIST.filter(st => gains[st]).map(st => (
              <div key={st} className="flex items-center justify-between px-2 py-1.5 rounded-xl" style={{ background: C.ink3 }}>
                <span className="f-body text-[10px]" style={{ color: C.chalkDim }}>{STAT_META[st].label}</span>
                <span className="f-mono text-[10px]" style={{ color: C.teal }}>+{gains[st]}</span>
              </div>
            ))}
          </div>
        </div>

        <PrimaryButton full onClick={onContinue}>
          Continue <ChevronRight size={14} className="inline ml-1" />
        </PrimaryButton>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------
   CLUB OFFERS SCREEN
--------------------------------------------------------- */
function ClubOffersScreen({ player, offers, context, onJoin, onStay, onRetire, onNegotiate }) {
  const headings = {
    join: { icon: Trophy, color: C.gold, kicker: "Turning Pro", title: "Choose Your First Club",
      sub: "Offers are on the table. Where you sign shapes your money, your fame, your minutes, and your development." },
    transfer: { icon: Plane, color: C.teal, kicker: "Transfer Window", title: "Offers Are Coming In",
      sub: `You're at ${context.oldClubName}. Stay put, or take a new challenge elsewhere?` },
    released: { icon: Newspaper, color: C.red, kicker: "Released", title: "Time to Find a New Home",
      sub: `${context.oldClubName} let you go. These clubs are willing to take you on.` },
    bankrupt: { icon: Newspaper, color: C.red, kicker: "Club Folded", title: "Time to Find a New Home",
      sub: `${context.oldClubName} folded. You're a free agent — pick your next move.` },
    /* An established pro without a club. Previously every clubless path fell
       back to "join", so a veteran returning from overseas — or caught by the
       clubless safety net — was told they were "Turning Pro" and choosing
       their "First Club" for the fifth time. */
    free_agent: { icon: Newspaper, color: C.teal, kicker: "Free Agent", title: "Choose Your Next Club",
      sub: "You're without a club. These sides have a place for you." },
  };
  if (context.studyTrack) {
    headings.join = { icon: Brain, color: "#22D3EE", kicker: "Student-Athlete", title: "Choose a Semi-Pro Home",
      sub: "Only semi-pro clubs are on the table while you're studying — real development-league minutes until you graduate at 23." };
  } else if (context.graduated) {
    headings.join = { icon: Award, color: C.gold, kicker: "Graduated", title: "Sign With a Pro Club",
      sub: "You're free of the semi-pro restriction now — pro clubs are back on the table, MBL included if your rating earns it." };
  }
  const h = headings[context.mode] || headings.join;
  const Icon = h.icon;
  const canStay = context.mode === "transfer";
  const canRetire = player.age >= 30 && ["transfer", "released", "bankrupt"].includes(context.mode);
  const currentClub = canStay ? getClub(player.clubId) : null;
  const stayTerms = currentClub ? computeClubTerms(player, currentClub, { firstProSigning: false }) : null;
  return (
    <div className="min-h-full w-full flex items-center justify-center px-4 py-10" style={{ background: C.ink }}>
      <div className="max-w-md w-full rounded-[28px] p-6" style={{ background: C.ink2, border: `1px solid ${C.line}` }}>
        <div className="flex items-center gap-2 mb-1">
          <Icon size={16} color={h.color} />
          <span className="f-mono text-[11px] uppercase tracking-widest" style={{ color: h.color }}>{h.kicker}</span>
        </div>
        <div className="f-display text-xl uppercase" style={{ color: C.chalk }}>{h.title}</div>
        <p className="f-body text-xs mt-1 mb-4" style={{ color: C.chalkDim }}>{h.sub}</p>

        {canStay && currentClub && stayTerms && (
          <div className="mb-4 p-3 rounded-xl" style={{ background: "rgba(20,184,166,0.08)", border: `1px solid ${C.teal}` }}>
            <div className="flex items-center justify-between">
              <span className="f-display text-sm uppercase flex items-center gap-2" style={{ color: C.chalk }}>
                <ClubCrest name={currentClub.name} size={26} /> {currentClub.name}
              </span>
              <span className="f-mono text-[9px] uppercase px-1.5 py-0.5 rounded-full" style={{ background: C.ink2, color: C.teal, border: `1px solid ${C.line}` }}>
                Current Team
              </span>
            </div>
            <div className="flex items-center gap-2 mt-2 p-2 rounded-xl" style={{ background: C.ink2 }}>
              <div className="flex-1">
                <div className="f-mono text-[8px] uppercase" style={{ color: C.chalkDim }}>League</div>
                <div className="f-mono text-[11px]" style={{ color: stayTerms.league === "mbl" ? C.gold : C.teal }}>{LEAGUE[stayTerms.league].short}</div>
              </div>
              <div className="flex-1">
                <div className="f-mono text-[8px] uppercase" style={{ color: C.chalkDim }}>Role</div>
                <div className="f-mono text-[11px]" style={{ color: C.chalk }}>{stayTerms.firstOption ? "1st Option" : stayTerms.role}</div>
              </div>
              <div className="flex-1 text-center">
                <div className="f-mono text-[8px] uppercase" style={{ color: C.chalkDim }}>Term</div>
                <div className="f-mono text-[11px]" style={{ color: C.chalk }}>{stayTerms.years || 2}yr</div>
              </div>
              <div className="flex-1 text-right">
                <div className="f-mono text-[8px] uppercase" style={{ color: C.chalkDim }}>Salary</div>
                <div className="f-mono text-[11px]" style={{ color: C.gold }}>{rm(stayTerms.salary)}/mo</div>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-2.5">
          {offers.map(({ club, terms }) => (
            <div key={club.id} className="rounded-xl p-3" style={{ background: C.ink3, border: `1px solid ${C.line}` }}>
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5 min-w-0">
                  <ClubCrest name={club.name} size={32} />
                  <div className="min-w-0">
                    <div className="f-display text-sm font-bold truncate" style={{ color: C.chalk }}>{club.name}</div>
                    <div className="f-mono text-[10px]" style={{ color: C.chalkDim }}>{club.state} · {club.tier === "semipro" ? "Semi-Pro" : "Pro"}</div>
                  </div>
                </div>
              </div>

              {/* Concrete offer terms */}
              <div className="flex items-center gap-2 mt-2.5 p-2 rounded-xl" style={{ background: C.ink2 }}>
                <div className="flex-1">
                  <div className="f-mono text-[8px] uppercase" style={{ color: C.chalkDim }}>League</div>
                  <div className="f-mono text-[11px]" style={{ color: terms.league === "mbl" ? C.gold : C.teal }}>{LEAGUE[terms.league].short}</div>
                </div>
                <div className="flex-1">
                  <div className="f-mono text-[8px] uppercase" style={{ color: C.chalkDim }}>Role</div>
                  <div className="f-mono text-[11px]" style={{ color: C.chalk }}>{terms.firstOption ? "1st Option" : terms.role}</div>
                </div>
                <div className="flex-1 text-center">
                  <div className="f-mono text-[8px] uppercase" style={{ color: C.chalkDim }}>Term</div>
                  <div className="f-mono text-[11px]" style={{ color: C.chalk }}>{terms.years || 2}yr</div>
                </div>
                <div className="flex-1 text-right">
                  <div className="f-mono text-[8px] uppercase" style={{ color: C.chalkDim }}>Salary</div>
                  <div className="f-mono text-[11px]" style={{ color: C.gold }}>{rm(terms.salary)}/mo</div>
                </div>
              </div>

              <div className="flex gap-2 mt-2.5">
                <button onClick={() => onJoin({ club, terms })}
                  className="choice-card flex-1 f-body text-[12px] font-bold py-2 rounded-full transition"
                  style={{ background: C.ink2, color: C.chalk, border: `1px solid ${C.line}` }}>
                  Accept
                </button>
                {/* Only offered with 2+ offers on the table — walking away
                    from your only offer would leave nothing to fall back
                    on, so negotiation simply isn't available on the last one. */}
                {offers.length > 1 && (
                  <button onClick={() => onNegotiate(club, terms)}
                    className="choice-card flex-1 f-body text-[12px] font-bold py-2 rounded-full transition"
                    style={{ background: "rgba(251,146,60,0.12)", color: C.amberBright, border: `1px solid rgba(251,146,60,0.4)` }}>
                    Negotiate
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {canStay && (
          <div className="mt-3">
            <SecondaryButton full onClick={onStay}>
              Stay at {context.oldClubName}{stayTerms ? ` — ${rm(stayTerms.salary)}/mo` : ""}
            </SecondaryButton>
          </div>
        )}

        {canRetire && (
          <button onClick={onRetire} className="choice-card w-full flex items-center justify-center gap-2 mt-3 p-3.5 rounded-xl transition" style={{ background: C.ink3, border: `1px solid ${C.line}` }}>
            <RotateCcw size={14} color={C.chalkDim} />
            <span className="f-body text-sm font-semibold" style={{ color: C.chalkDim }}>Retire — End Your Professional Career</span>
          </button>
        )}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------
   NEGOTIATE OFFER SCREEN
   Two-step: pick what to push for, then commit. Reached only from an
   offer's "Negotiate" button (2+ offers on the table). Leverage/odds come
   from negotiationLeverage/negotiationOdds — see the block comment there
   for the simulation this was calibrated against.
--------------------------------------------------------- */
function NegotiateOfferScreen({ player, club, terms, onCommit }) {
  const [ask, setAsk] = useState(null);
  const score = negotiationLeverage(player, club);
  const tier = negotiationTier(score);
  const tierColor = tier === "high" ? "#10B981" : tier === "medium" ? C.amberBright : "#EF4444";
  const canPushRole = !!nextRoleTier(terms.role);
  const moneyOdds = negotiationOdds(score, "money");
  const roleOdds = canPushRole ? negotiationOdds(score, "role") : null;

  const ASK_META = {
    money: { label: "Push For Money", icon: "dollarUp", tagline: `Same ${terms.years || 2}yr ${terms.role} deal`, odds: moneyOdds },
    role: canPushRole ? { label: "Push For Role", icon: "star", tagline: `${terms.role} → ${nextRoleTier(terms.role)}`, odds: roleOdds } : null,
  };
  const active = ask && ASK_META[ask] ? ask : null;

  return (
    <div className="min-h-full w-full flex items-center justify-center px-4 py-10" style={{ background: C.ink }}>
      <div className="max-w-md w-full rounded-[28px] p-6" style={{ background: C.ink2, border: `1px solid ${C.line}` }}>
        <div className="f-mono text-[10px] uppercase tracking-widest mb-1.5" style={{ color: C.chalkDim }}>{club.name} · Negotiation</div>
        <div className="f-display text-xl font-extrabold mb-1.5" style={{ color: C.chalk }}>
          {active ? `${ASK_META[active].label}?` : "What do you push for?"}
        </div>
        <p className="f-body text-[13px] mb-4" style={{ color: C.chalkDim }}>
          {active
            ? "One ask at a time — pushing for everything at once reads as greedy and hurts your odds on both."
            : `Their opening offer: ${rm(terms.salary)}/mo, ${terms.years || 2}-year ${terms.firstOption ? "1st Option" : terms.role} deal.`}
        </p>

        <div className="flex items-center gap-2 mb-4 px-3 py-2.5 rounded-xl" style={{ background: C.ink3 }}>
          <span className="f-mono text-[9px] uppercase tracking-wide flex-shrink-0" style={{ color: C.chalkDim }}>Leverage</span>
          <div className="flex-1 h-1.5 rounded-full overflow-hidden flex gap-0.5" style={{ background: C.ink }}>
            {[0, 1, 2].map(i => (
              <div key={i} className="flex-1 rounded-full" style={{ background: i < (tier === "high" ? 3 : tier === "medium" ? 2 : 1) ? tierColor : C.ink }} />
            ))}
          </div>
          <span className="f-mono text-[10px] font-extrabold uppercase flex-shrink-0" style={{ color: tierColor }}>{tier}</span>
        </div>

        {!active && (
          <div className={`grid ${ASK_META.role ? "grid-cols-2" : "grid-cols-1"} gap-3`}>
            <button onClick={() => setAsk("money")} className="choice-card text-left rounded-[20px] overflow-hidden transition" style={{ background: C.ink3, border: `1px solid ${C.line}` }}>
              <div className="text-center text-[13px] font-bold py-3" style={{ color: C.chalk }}>Push For Money</div>
              <div className="text-center f-body text-[9.5px] pb-1" style={{ color: C.chalkDim }}>{ASK_META.money.tagline}</div>
              <EventChoiceIcon icon="dollarUp" />
              <div className="p-3 flex flex-col gap-2">
                <div className="flex items-center justify-between px-3 py-2 rounded-full text-[10.5px] font-semibold" style={{ background: "rgba(16,185,129,0.14)", color: "#10B981" }}>
                  <span>They meet your ask</span><span className="f-mono font-extrabold">{Math.round(moneyOdds.winChance * 100)}%</span>
                </div>
                <div className="flex items-center justify-between px-3 py-2 rounded-full text-[10.5px] font-semibold" style={{ background: "rgba(239,68,68,0.14)", color: "#EF4444" }}>
                  <span>They walk away</span><span className="f-mono font-extrabold">{Math.round(moneyOdds.walkChance * 100)}%</span>
                </div>
              </div>
            </button>
            {ASK_META.role && (
              <button onClick={() => setAsk("role")} className="choice-card text-left rounded-[20px] overflow-hidden transition" style={{ background: C.ink3, border: `1px solid ${C.line}` }}>
                <div className="text-center text-[13px] font-bold py-3" style={{ color: C.chalk }}>Push For Role</div>
                <div className="text-center f-body text-[9.5px] pb-1" style={{ color: C.chalkDim }}>{ASK_META.role.tagline}</div>
                <EventChoiceIcon icon="star" />
                <div className="p-3 flex flex-col gap-2">
                  <div className="flex items-center justify-between px-3 py-2 rounded-full text-[10.5px] font-semibold" style={{ background: "rgba(16,185,129,0.14)", color: "#10B981" }}>
                    <span>They meet your ask</span><span className="f-mono font-extrabold">{Math.round(roleOdds.winChance * 100)}%</span>
                  </div>
                  <div className="flex items-center justify-between px-3 py-2 rounded-full text-[10.5px] font-semibold" style={{ background: "rgba(239,68,68,0.14)", color: "#EF4444" }}>
                    <span>They walk away</span><span className="f-mono font-extrabold">{Math.round(roleOdds.walkChance * 100)}%</span>
                  </div>
                </div>
              </button>
            )}
          </div>
        )}

        {active && (
          <>
            {active === "role" && (
              <p className="f-body text-[11.5px] mb-3" style={{ color: C.chalkDim }}>
                A role jump asks more of them than a bigger paycheck does — someone else on the roster loses minutes for you to gain them. Lower odds, higher risk, same leverage underneath.
              </p>
            )}
            <div className="grid grid-cols-2 gap-3">
              <button onClick={() => onCommit(active)} className="choice-card text-left rounded-[20px] overflow-hidden transition" style={{ background: C.ink3, border: `1px solid ${C.line}` }}>
                <div className="text-center text-[13px] font-bold py-3" style={{ color: C.chalk }}>Accept As-Is</div>
                <div className="text-center f-body text-[9.5px] pb-1" style={{ color: C.chalkDim }}>No risk</div>
                <EventChoiceIcon icon="handshake" />
                <div className="p-3">
                  <div className="text-center px-3 py-2 rounded-full text-[10px] font-semibold" style={{ background: C.ink2, color: C.teal }}>
                    {rm(terms.salary)}/mo, locked in
                  </div>
                </div>
              </button>
              <button onClick={() => onCommit(active)} className="choice-card text-left rounded-[20px] overflow-hidden transition" style={{ background: C.ink3, border: `1px solid ${C.amber}` }}>
                <div className="text-center text-[13px] font-bold py-3" style={{ color: C.chalk }}>{ASK_META[active].label}</div>
                <div className="text-center f-body text-[9.5px] pb-1" style={{ color: C.chalkDim }}>Commit to the ask</div>
                <EventChoiceIcon icon={ASK_META[active].icon} />
                <div className="p-3 flex flex-col gap-2">
                  <div className="flex items-center justify-between px-3 py-2 rounded-full text-[10.5px] font-semibold" style={{ background: "rgba(16,185,129,0.14)", color: "#10B981" }}>
                    <span>They meet your ask</span><span className="f-mono font-extrabold">{Math.round(ASK_META[active].odds.winChance * 100)}%</span>
                  </div>
                  <div className="flex items-center justify-between px-3 py-2 rounded-full text-[10.5px] font-semibold" style={{ background: "rgba(239,68,68,0.14)", color: "#EF4444" }}>
                    <span>They walk away</span><span className="f-mono font-extrabold">{Math.round(ASK_META[active].odds.walkChance * 100)}%</span>
                  </div>
                </div>
              </button>
            </div>
            <button onClick={() => setAsk(null)} className="btn-tactile f-mono text-[10px] uppercase tracking-widest mt-4 transition" style={{ color: C.chalkDim }}>← Choose a different ask</button>
          </>
        )}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------
   TRADE REQUEST SCREEN
   Reached from the Hub's Career tab. Single-step, unlike negotiation's
   two-step ask-then-commit — reason and commitment are the same click
   here, since "which reason, then whether to go through with it" would
   be one decision split into two for no real benefit.
--------------------------------------------------------- */
function TradeRequestScreen({ player, club, onCommit }) {
  const cases = TRADE_REQUEST_REASONS.map(r => ({ ...r, strength: tradeRequestCase(player, club, r.id) }));
  const avgStrength = cases.reduce((a, c) => a + c.strength, 0) / cases.length;
  const tier = avgStrength < 0.30 ? "low" : avgStrength < 0.45 ? "medium" : "high";
  const tierColor = tier === "high" ? "#10B981" : tier === "medium" ? C.amberBright : "#EF4444";
  return (
    <div className="min-h-full w-full flex items-center justify-center px-4 py-10" style={{ background: C.ink }}>
      <div className="max-w-md w-full rounded-[28px] p-6" style={{ background: C.ink2, border: `1px solid ${C.line}` }}>
        <div className="f-mono text-[10px] uppercase tracking-widest mb-1.5" style={{ color: C.chalkDim }}>{club.name} · Trade Request</div>
        <div className="f-display text-xl font-extrabold mb-1.5" style={{ color: C.chalk }}>Why do you want out?</div>
        <p className="f-body text-[13px] mb-4" style={{ color: C.chalkDim }}>
          The reason isn't flavor — it changes your case. A weak ask can still be granted, just not on your terms, and a bad one can cost you more than a "no."
        </p>

        <div className="flex items-center gap-2 mb-4 px-3 py-2.5 rounded-xl" style={{ background: C.ink3 }}>
          <span className="f-mono text-[9px] uppercase tracking-wide flex-shrink-0" style={{ color: C.chalkDim }}>Your Standing</span>
          <div className="flex-1 h-1.5 rounded-full overflow-hidden flex gap-0.5" style={{ background: C.ink }}>
            {[0, 1, 2].map(i => (
              <div key={i} className="flex-1 rounded-full" style={{ background: i < (tier === "high" ? 3 : tier === "medium" ? 2 : 1) ? tierColor : C.ink }} />
            ))}
          </div>
          <span className="f-mono text-[10px] font-extrabold uppercase flex-shrink-0" style={{ color: tierColor }}>{tier}</span>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {cases.map(c => (
            <button key={c.id} onClick={() => onCommit(c.id)} className="choice-card text-left rounded-[18px] overflow-hidden transition" style={{ background: C.ink3, border: `1px solid ${C.line}` }}>
              <div className="text-center text-[11.5px] font-bold pt-2.5" style={{ color: C.chalk }}>{c.label}</div>
              <div className="text-center f-body text-[8.5px] pb-1" style={{ color: C.chalkDim }}>{c.tagline(player)}</div>
              <EventChoiceIcon icon={c.icon} />
              <div className="px-2 pb-2.5">
                <div className="flex items-center justify-center px-2 py-1.5 rounded-full text-[10px] font-extrabold" style={{ background: "rgba(16,185,129,0.14)", color: "#10B981" }}>
                  {Math.round(c.strength * 100)}%
                </div>
              </div>
            </button>
          ))}
        </div>

        <div className="mt-4 pt-3 flex items-center gap-1.5" style={{ borderTop: `1px solid ${C.line}` }}>
          <span className="text-[12px]">⚠️</span>
          <p className="f-body text-[10.5px]" style={{ color: C.chalkDim }}>A denial locks out another request for 2 seasons. A weak case risks a harsh one.</p>
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------
   CLUTCH MOMENT SCREEN
--------------------------------------------------------- */
function ClutchMomentScreen({ pending, onChoose }) {
  if (!pending) return null;
  const event = CLUTCH_EVENTS.find(e => e.id === pending.clutchEventId) || CLUTCH_EVENTS[0];
  return (
    <div className="min-h-full w-full flex items-center justify-center px-4 py-10" style={{ background: C.ink }}>
      <div className="max-w-md w-full rounded-[28px] p-6" style={{ background: C.ink2, border: `1px solid ${C.trophyGold}` }}>
        <div className="f-mono text-[10px] uppercase tracking-widest mb-1.5" style={{ color: C.trophyGold }}>⚡ Clutch Moment</div>
        <div className="f-display text-xl font-extrabold mb-1.5" style={{ color: C.chalk }}>{event.title}</div>
        <p className="f-body text-[13px] mb-4" style={{ color: C.chalkDim }}>{event.desc}</p>
        <div className="grid grid-cols-2 gap-3">
          {event.choices.map((c, i) => (
            <button key={c.id} onClick={() => onChoose(c)} className="choice-card text-left rounded-[20px] overflow-hidden transition"
              style={{ background: C.ink3, border: `1px solid ${C.line}` }}>
              <div className="text-center text-[13px] font-bold py-3 px-2" style={{ color: C.chalk }}>{c.label}</div>
              <EventChoiceIcon scene="clutch_pressure" icon={c.icon} />
              <div className="p-3">
                <div className="flex items-center justify-between px-3 py-2 rounded-full text-[12px] font-semibold" style={{ background: "rgba(16,185,129,0.14)", color: "#10B981" }}>
                  <span className="flex items-center gap-1.5"><TrendingUp size={13} />Success</span>
                  <span className="f-mono text-[11px] font-extrabold px-2 py-0.5 rounded-full" style={{ background: "rgba(16,185,129,0.22)" }}>{Math.round(c.successChance * 100)}%</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------
   OVERSEAS OFFERS SCREEN
--------------------------------------------------------- */
/* ---------------------------------------------------------
   TAIWAN HBL OFFERS SCREEN (post-U17, student-athlete route)
--------------------------------------------------------- */
/* ---------------------------------------------------------
   TAIWAN UBA SCHOLARSHIP OFFERS (post-HBL, ages 19-22)
--------------------------------------------------------- */
/* ---------------------------------------------------------
   TAIWAN HBL SEASON RESULT
--------------------------------------------------------- */
function HblSeasonScreen({ player, onContinue }) {
  const s = player.hblStats;
  const awards = player.hblAwards || [];
  const teamMeta = A17_TEAM_RESULT_META[player.hblTeamResult] || { label: "Season Complete" };
  const gains = player.hblGains || {};
  if (!s) return null;
  return (
    <div className="min-h-full w-full flex items-center justify-center px-4 py-10" style={{ background: C.ink }}>
      <div className="max-w-md w-full rounded-[28px] p-6" style={{ background: C.ink2, border: `1px solid ${C.line}` }}>
        <div className="flex items-center gap-2 mb-1">
          <Trophy size={16} color={C.trophyGold} />
          <span className="f-display text-sm uppercase tracking-wide" style={{ color: C.gold }}>
            Taiwan HBL — Season Result
          </span>
        </div>
        <div className="f-display text-lg uppercase mt-1" style={{ color: C.chalk }}>{teamMeta.label}</div>
        <p className="f-body text-xs mb-4" style={{ color: C.chalkDim }}>
          Your import year at {player.hblTeamName}
          {player.hblGames ? ` — ${player.hblGames} games as a starter.` : "."}
        </p>

        <div className="grid grid-cols-4 gap-y-3 p-3 rounded-xl mb-3" style={{ background: C.ink3 }}>
          <StatCell label="PPG" value={s.ppg} />
          <StatCell label="RPG" value={s.rpg} />
          <StatCell label="APG" value={s.apg} />
          <StatCell label="SPG" value={s.spg} />
          <StatCell label="BPG" value={s.bpg} />
          <StatCell label="FG%" value={`${s.fgPct}%`} />
          <StatCell label="3P%" value={`${s.threePct}%`} />
        </div>

        <div className="mb-4">
          <div className="f-mono text-[10px] uppercase tracking-widest mb-2" style={{ color: C.chalkDim }}>Awards</div>
          {awards.length > 0 ? (
            <div className="flex flex-wrap gap-1.5">
              {awards.map(id => <Badge key={id}>{A17_AWARD_META[id] ? A17_AWARD_META[id].label : id}</Badge>)}
            </div>
          ) : (
            <p className="f-body text-xs" style={{ color: C.chalkDim }}>
              No individual honours this season — but a full year of starter minutes abroad counts for plenty.
            </p>
          )}
        </div>

        {Object.keys(gains).length > 0 && (
          <div className="mb-4">
            <div className="f-mono text-[10px] uppercase tracking-widest mb-2" style={{ color: C.chalkDim }}>Development</div>
            <div className="grid grid-cols-3 gap-2 p-3 rounded-xl" style={{ background: C.ink3 }}>
              {STAT_LIST.filter(k => gains[k]).map(k => (
                <div key={k} className="text-center">
                  <div className="f-mono text-sm font-bold" style={{ color: "#10B981" }}>+{gains[k]}</div>
                  <div className="f-mono text-[8px] uppercase" style={{ color: C.chalkDim }}>{STAT_META[k].label}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        <PrimaryButton full onClick={onContinue}>
          Continue <ChevronRight size={14} className="inline ml-1" />
        </PrimaryButton>
      </div>
    </div>
  );
}

function UbaOffersScreen({ player, onAccept, onDecline }) {
  const offers = (player && player.ubaOffers) || [];
  const resolved = offers
    .map(o => ({ team: UBA_TEAMS.find(t => t.id === o.id), role: o.role }))
    .filter(o => o.team);
  return (
    <div className="min-h-full w-full flex items-center justify-center px-4 py-10" style={{ background: C.ink }}>
      <div className="max-w-md w-full rounded-[28px] p-6" style={{ background: C.ink2, border: `1px solid ${C.line}` }}>
        <div className="flex items-center gap-2 mb-1">
          <Plane size={16} color={C.trophyGold} />
          <span className="f-mono text-[11px] uppercase tracking-widest" style={{ color: C.trophyGold }}>University Scholarship Offer</span>
        </div>
        <div className="f-display text-xl font-extrabold mb-1.5" style={{ color: C.chalk }}>Taiwan UBA Scholarships</div>
        <p className="f-body text-[13px] mb-4" style={{ color: C.chalkDim }}>
          Your HBL season earned you scholarship offers from Taiwanese universities — <span style={{ color: C.chalk }}>four years of eligibility</span>, ages 19 to 22. Every programme is different: some want you leading the floor, others have a deeper roster. Take one, or go home and turn professional in Malaysia.
        </p>
        <div className="flex flex-col gap-2.5">
          {resolved.map(({ team, role }) => (
            <button key={team.id} onClick={() => onAccept(team, role)} className="choice-card w-full text-left p-3 rounded-xl transition"
              style={{ background: C.ink3, border: `1px solid ${C.line}` }}>
              <div className="flex items-center gap-2.5 min-w-0">
                <ClubCrest name={team.short} size={32} />
                <div className="min-w-0 flex-1">
                  <div className="f-display text-sm font-bold truncate" style={{ color: C.chalk }}>{team.name}</div>
                  <div className="f-mono text-[10px]" style={{ color: C.chalkDim }}>{team.cn}</div>
                </div>
              </div>
              <div className="flex items-center gap-2 mt-2.5 p-2 rounded-xl" style={{ background: C.ink2 }}>
                <div className="flex-1">
                  <div className="f-mono text-[8px] uppercase" style={{ color: C.chalkDim }}>League</div>
                  <div className="f-mono text-[11px]" style={{ color: C.trophyGold }}>Taiwan UBA</div>
                </div>
                <div className="flex-1">
                  <div className="f-mono text-[8px] uppercase" style={{ color: C.chalkDim }}>Role</div>
                  <div className="f-mono text-[11px]" style={{ color: role === "Starter" ? "#10B981" : C.chalk }}>{role}</div>
                </div>
                <div className="flex-1 text-right">
                  <div className="f-mono text-[8px] uppercase" style={{ color: C.chalkDim }}>Term</div>
                  <div className="f-mono text-[11px]" style={{ color: C.chalk }}>{UBA_YEARS}yr</div>
                </div>
              </div>
            </button>
          ))}
        </div>
        <div className="mt-4">
          <SecondaryButton full onClick={onDecline}>Return to Malaysia &amp; Turn Pro</SecondaryButton>
        </div>
      </div>
    </div>
  );
}

function HblOffersScreen({ player, onAccept, onDecline }) {
  // The shortlist is rolled once when the offer is created and stored on the
  // player, so it stays stable across re-renders. Older saves that predate
  // that field fall back to a fresh sample.
  const ids = player && player.hblOfferIds;
  const offeredTeams = (ids && ids.length)
    ? HBL_TEAMS.filter(t => ids.includes(t.id))
    : sampleN(HBL_TEAMS, HBL_OFFER_COUNT);
  return (
    <div className="min-h-full w-full flex items-center justify-center px-4 py-10" style={{ background: C.ink }}>
      <div className="max-w-md w-full rounded-[28px] p-6" style={{ background: C.ink2, border: `1px solid ${C.line}` }}>
        <div className="flex items-center gap-2 mb-1">
          <Plane size={16} color={C.trophyGold} />
          <span className="f-mono text-[11px] uppercase tracking-widest" style={{ color: C.trophyGold }}>Overseas Student-Athlete Offer</span>
        </div>
        <div className="f-display text-xl font-extrabold mb-1.5" style={{ color: C.chalk }}>Taiwan HBL Scouts Want You</div>
        <p className="f-body text-[13px] mb-3" style={{ color: C.chalkDim }}>
          Your U17 form caught the eye of Taiwanese high-school programmes. You'd have <span style={{ color: C.chalk }}>one year of eligibility</span> at 18 — a single HBL season abroad before you turn pro. Take the leap, or stay and keep developing at home.
        </p>
        <div className="flex flex-col gap-2.5">
          {offeredTeams.map(team => (
            <button key={team.id} onClick={() => onAccept(team)} className="choice-card w-full text-left p-3 rounded-xl transition"
              style={{ background: C.ink3, border: `1px solid ${C.line}` }}>
              <div className="flex items-center gap-2.5 min-w-0">
                <ClubCrest name={team.name} size={32} />
                <div className="min-w-0">
                  <div className="f-display text-sm font-bold truncate" style={{ color: C.chalk }}>{team.name}</div>
                  <div className="f-mono text-[10px]" style={{ color: C.chalkDim }}>{team.cn} · {team.city}</div>
                </div>
              </div>
            </button>
          ))}
        </div>
        <div className="mt-4">
          <SecondaryButton full onClick={onDecline}>Stay in Malaysia</SecondaryButton>
        </div>
      </div>
    </div>
  );
}

function OverseasOffersScreen({ player, offer, onSign, onDecline }) {
  if (!offer) return null;
  const { tier, teams, role, awardChance, years } = offer;
  const monthlyRange = teams.map(t => Math.round(t.salaryPerSeason / 12));
  return (
    <div className="min-h-full w-full flex items-center justify-center px-4 py-10" style={{ background: C.ink }}>
      <div className="max-w-md w-full rounded-[28px] p-6" style={{ background: C.ink2, border: `1px solid ${C.line}` }}>
        <div className="flex items-center gap-2 mb-1">
          <Plane size={16} color={C.trophyGold} />
          <span className="f-mono text-[11px] uppercase tracking-widest" style={{ color: C.trophyGold }}>Overseas Interest</span>
        </div>
        <div className="f-display text-xl font-extrabold mb-1.5" style={{ color: C.chalk }}>{tier.label} Clubs Want You</div>
        <p className="f-body text-[13px] mb-3" style={{ color: C.chalkDim }}>
          Your rating has scouts from {tier.label === "NBA" ? "the NBA" : tier.label === "EuroLeague" ? "Europe" : "Asia's top leagues"} circling{awardChance > 0 ? ` — ${Math.round(awardChance * 100)}% shot at a personal award this season` : ""}. Every national team game is guaranteed while you're overseas.
        </p>
        <div className="flex flex-col gap-2.5">
          {teams.map((team, i) => (
            <button key={team.name} onClick={() => onSign(team)} className="choice-card w-full text-left p-3 rounded-xl transition"
              style={{ background: C.ink3, border: `1px solid ${C.line}` }}>
              <div className="flex items-center gap-2.5 min-w-0">
                <ClubCrest name={team.name} size={32} />
                <div className="min-w-0">
                  <div className="f-display text-sm font-bold truncate" style={{ color: C.chalk }}>{team.name}</div>
                  <div className="f-mono text-[10px]" style={{ color: C.chalkDim }}>{team.league}{team.country ? ` · ${team.country}` : ""}</div>
                </div>
              </div>
              {/* Concrete offer terms — same layout as domestic club offers */}
              <div className="flex items-center gap-2 mt-2.5 p-2 rounded-xl" style={{ background: C.ink2 }}>
                <div className="flex-1">
                  <div className="f-mono text-[8px] uppercase" style={{ color: C.chalkDim }}>League</div>
                  <div className="f-mono text-[11px]" style={{ color: C.trophyGold }}>{tier.label}</div>
                </div>
                <div className="flex-1">
                  <div className="f-mono text-[8px] uppercase" style={{ color: C.chalkDim }}>Role</div>
                  <div className="f-mono text-[11px]" style={{ color: C.chalk }}>{role}</div>
                </div>
                <div className="flex-1 text-center">
                  <div className="f-mono text-[8px] uppercase" style={{ color: C.chalkDim }}>Term</div>
                  <div className="f-mono text-[11px]" style={{ color: C.chalk }}>{years}yr</div>
                </div>
                <div className="flex-1 text-right">
                  <div className="f-mono text-[8px] uppercase" style={{ color: C.chalkDim }}>Salary</div>
                  <div className="f-mono text-[11px]" style={{ color: C.gold }}>{rm(monthlyRange[i])}/mo</div>
                </div>
              </div>
            </button>
          ))}
        </div>
        <div className="mt-4">
          <SecondaryButton full onClick={onDecline}>Stay in Malaysia</SecondaryButton>
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------
   RESULT SCREEN
--------------------------------------------------------- */
/* League context on the season recap — Standings / Leaders / Award Race
   behind tabs. Tabbed rather than stacked so the recap stays short: all
   three at once pushed the Continue button far below the fold. */
const LeagueContext = memo(function LeagueContext({ summary }) {
  const [tab, setTab] = useState("standings");
  const board = summary.leagueBoard;
  const standings = summary.leagueStandings;
  const race = summary.awardRace;
  const TABS = [
    ["standings", "Standings", !!standings],
    ["leaders", "Leaders", !!board],
    ["race", "Award Race", !!(race && race.length)],
  ].filter(t => t[2]);
  if (!TABS.length) return null;
  const active = TABS.some(t => t[0] === tab) ? tab : TABS[0][0];
  const ord = (n) => n === 1 ? "1st" : n === 2 ? "2nd" : n === 3 ? "3rd" : `${n}th`;

  return (
    <div className="mt-4 pt-3" style={{ borderTop: `1px solid ${C.line}` }}>
      <div className="flex gap-1.5 mb-3">
        {TABS.map(([id, label]) => (
          <button key={id} onClick={() => setTab(id)}
            className="btn-tactile flex-1 f-mono text-[10px] uppercase tracking-wide py-2 rounded-xl transition"
            style={active === id
              ? { background: C.amber, color: C.ink, border: `1px solid ${C.amber}`, fontWeight: 800 }
              : { background: C.ink3, color: C.chalkDim, border: `1px solid ${C.line}` }}>
            {label}
          </button>
        ))}
      </div>

      {active === "standings" && standings && (
        <>
          <div className="f-mono text-[9px] uppercase tracking-widest text-center mb-2" style={{ color: C.chalkDim }}>
            {summary.leagueLabel} · {summary.leagueYear} Regular Season
          </div>
          <div className="rounded-2xl px-3" style={{ background: C.ink3, border: `1px solid ${C.line}` }}>
            {standings.rows.map((r, i) => (
              <div key={r.id} className="flex items-center gap-2.5 py-2"
                style={{
                  borderBottom: i === standings.rows.length - 1 ? "none" : `1px solid ${C.line}`,
                  ...(r.me ? { background: "rgba(249,115,22,0.07)", marginLeft: -12, marginRight: -12, paddingLeft: 12, paddingRight: 12, borderLeft: `2px solid ${C.amber}` } : {}),
                }}>
                <span className="f-mono text-[11px] w-3 text-right shrink-0" style={{ color: r.me ? C.amberBright : C.chalkDim }}>{i + 1}</span>
                <ClubCrest name={r.name} size={22} />
                <span className="f-body text-[11.5px] flex-1 truncate" style={{ color: r.me ? C.amberBright : C.chalk, fontWeight: r.me ? 700 : 400 }}>
                  {r.name}
                </span>
                {i === 0 && (
                  <span className="f-mono text-[8px] px-1.5 py-0.5 rounded-full shrink-0"
                    style={{ background: "rgba(250,204,21,0.15)", color: C.trophyGold }}>1st</span>
                )}
                {r.me && (
                  <span className="f-mono text-[8px] px-1.5 py-0.5 rounded-full shrink-0"
                    style={{ background: "rgba(249,115,22,0.2)", color: C.amberBright }}>YOU</span>
                )}
                <span className="f-mono text-[10.5px] shrink-0" style={{ color: C.chalkDim }}>{r.w}-{r.l}</span>
                <span className="f-mono text-[10.5px] w-9 text-right shrink-0" style={{ color: r.me ? C.amberBright : C.chalk }}>
                  {r.pct.toFixed(3).slice(1)}
                </span>
              </div>
            ))}
          </div>
          {standings.myPlace && (
            <p className="f-body text-[10px] mt-2" style={{ color: C.chalkDim }}>
              Top {standings.playoffCut} make the playoffs. You're{" "}
              <b style={{ color: standings.myPlace <= standings.playoffCut ? C.amberBright : C.red }}>{ord(standings.myPlace)}</b>
              {standings.myPlace <= standings.playoffCut ? " — in the playoff picture." : " — outside the cut."}
            </p>
          )}
        </>
      )}

      {active === "leaders" && board && (
        <>
          {[["ppg", "Points"], ["rpg", "Rebounds"], ["apg", "Assists"]].map(([key, label]) => {
            const rows = board.boards[key] || [];
            const myRank = board.ranks[key];
            const inTop = rows.slice(0, 3).some(r => r.me);
            return (
              <div key={key} className="mb-2.5">
                <div className="flex items-baseline justify-between mb-1">
                  <span className="f-mono text-[9.5px] uppercase tracking-wide" style={{ color: C.amberBright }}>{label}</span>
                  <span className="f-mono text-[9px]" style={{ color: myRank <= 3 ? C.trophyGold : C.chalkDim }}>
                    You: {ord(myRank)} of {board.fieldSize}
                  </span>
                </div>
                {rows.slice(0, 3).map((r, i) => (
                  <div key={i} className="flex items-center gap-2 py-[3px]"
                    style={r.me ? { background: "rgba(249,115,22,0.08)", marginLeft: -6, marginRight: -6, paddingLeft: 6, paddingRight: 6, borderRadius: 6 } : {}}>
                    <span className="f-mono text-[9px] w-3" style={{ color: r.me ? C.amberBright : C.chalkDim }}>{i + 1}</span>
                    <span className="f-body text-[10.5px] flex-1 truncate" style={{ color: r.me ? C.amberBright : C.chalk }}>
                      {r.me ? "You" : r.name}
                      {r.clubName && <span style={{ color: C.chalkDim }}> · {r.clubName}</span>}
                    </span>
                    <span className="f-mono text-[11px]" style={{ color: r.me ? C.amberBright : C.chalk }}>{r.value.toFixed(1)}</span>
                  </div>
                ))}
                {!inTop && (
                  <div className="flex items-center gap-2 py-[3px] mt-0.5"
                    style={{ background: "rgba(249,115,22,0.08)", marginLeft: -6, marginRight: -6, paddingLeft: 6, paddingRight: 6, borderRadius: 6 }}>
                    <span className="f-mono text-[9px] w-3" style={{ color: C.amberBright }}>{myRank}</span>
                    <span className="f-body text-[10.5px] flex-1" style={{ color: C.amberBright }}>You</span>
                    <span className="f-mono text-[11px]" style={{ color: C.amberBright }}>{summary.leagueStats[key].toFixed(1)}</span>
                  </div>
                )}
              </div>
            );
          })}
        </>
      )}

      {active === "race" && race && (
        <>
          <div className="f-mono text-[9px] uppercase tracking-widest text-center mb-2" style={{ color: C.chalkDim }}>
            Most Valuable Player
          </div>
          {race.map((c, i) => (
            <div key={i} className="mb-2.5">
              <div className="flex items-center gap-2">
                <span className="f-body text-[11.5px] flex-1 truncate" style={{ color: c.me ? C.amberBright : C.chalk, fontWeight: c.me ? 700 : 400 }}>
                  {c.me ? "You" : c.name}
                  {c.clubName && <span className="f-mono text-[9px]" style={{ color: C.chalkDim }}> · {c.clubName}</span>}
                </span>
                <span className="f-mono text-[11px]" style={{ color: c.me ? C.amberBright : C.chalkDim }}>{c.odds}%</span>
              </div>
              <div className="h-[5px] rounded-full mt-1.5 overflow-hidden" style={{ background: C.ink3 }}>
                <div className="h-full rounded-full" style={{ width: `${c.odds}%`, background: c.me ? C.amber : C.chalkDim }} />
              </div>
              <div className="f-mono text-[9px] mt-1" style={{ color: C.chalkDim }}>{c.cases.join(" · ")}</div>
            </div>
          ))}
        </>
      )}
    </div>
  );
});

const ResultScreen = memo(function ResultScreen({ summary, onContinue }) {
  const [advancing, setAdvancing] = useState(false);
  const [advanceError, setAdvanceError] = useState(false);
  /* Paint the pressed state first, THEN run the off-season on the next
     frame. Doing both in the same tick meant the button never visibly
     responded while the main thread was busy.
     Bug fix: `advancing` was only ever set true, never reset. If onContinue
     didn't end in a screen change for ANY reason — an exception on some
     edge-case save, or the app-level re-entrancy guard in
     handleContinueAfterResult firing at a bad moment — this button stayed
     disabled forever with literally nothing left to retry it. A season
     that fails to advance normally unmounts this screen (screen changes
     away from "result"), which is what actually resets `advancing` in the
     success case; the fallback below only fires if that DIDN'T happen. */
  const handleAdvance = () => {
    if (advancing) return;
    setAdvancing(true);
    setAdvanceError(false);
    requestAnimationFrame(() => {
      setTimeout(() => {
        try {
          onContinue();
        } catch (e) {
          console.error("Season transition failed:", e);
          setAdvancing(false);
          setAdvanceError(true);
          return;
        }
        // Safety net: if this screen is still mounted ~1.5s later, the
        // transition silently didn't happen (e.g. blocked by a stale
        // re-entrancy guard) rather than throwing. Re-enable the button
        // instead of leaving the player stuck with no way to retry.
        setTimeout(() => setAdvancing(false), 1500);
      }, 0);
    });
  };
  return (
    <div className="min-h-full w-full flex items-center justify-center px-4 py-10" style={{ background: C.ink }}>
      <div className="max-w-md w-full rounded-[28px] p-6" style={{ background: C.ink2, border: `1px solid ${C.line}` }}>
        <div className="flex items-center gap-2 mb-4">
          <Trophy size={16} color={C.trophyGold} />
          <span className="f-display text-sm uppercase tracking-wide" style={{ color: C.gold }}>Season {summary.seasonNum} Recap</span>
        </div>

        {summary.trainingText && (
          <div className="mb-3">
            <div className="f-mono text-[10px] uppercase tracking-widest mb-1" style={{ color: C.chalkDim }}>Training</div>
            <p className="f-body text-sm" style={{ color: C.chalk }}>{summary.trainingText}</p>
          </div>
        )}

        <div className="mb-3">
          <div className="f-mono text-[10px] uppercase tracking-widest mb-1 flex items-center gap-2" style={{ color: C.chalkDim }}>
            <span>Event</span>
            {summary.eventTier === "success" && (
              <span className="px-1.5 py-0.5 rounded" style={{ background: C.ink3, color: C.chalk, border: `1px solid ${C.line}` }}>Success</span>
            )}
            {summary.eventTier === "failure" && (
              <span className="px-1.5 py-0.5 rounded" style={{ background: C.ink3, color: C.chalkDim, border: `1px solid ${C.line}` }}>Setback</span>
            )}
            {summary.eventTier === "critical" && (
              <span className="px-1.5 py-0.5 rounded" style={{ background: "rgba(220,38,38,0.14)", color: C.red, border: `1px solid ${C.red}` }}>Critical Failure</span>
            )}
          </div>
          <p className="f-body text-sm" style={{ color: C.chalk }}>{summary.eventText}</p>
          {summary.eventAchievementLabel && (
            <div className="mt-2 p-2.5 rounded-lg flex items-center gap-2" style={{ background: "rgba(250,204,21,0.10)", border: `1px solid ${C.trophyGold}` }}>
              <Gem size={14} color={C.trophyGold} />
              <span className="f-body text-xs font-semibold" style={{ color: C.trophyGold }}>Hidden Achievement Unlocked: {summary.eventAchievementLabel}</span>
            </div>
          )}
        </div>

        <div className="mb-4 p-3 rounded-xl" style={{ background: C.ink3 }}>
          <div className="f-display text-sm uppercase" style={{ color: C.amberBright }}>{summary.tierLabel} Season</div>
          <p className="f-body text-xs mt-1" style={{ color: C.chalkDim }}>{summary.note}</p>
          <div className="flex gap-4 mt-3">
            <div>
              <div className="f-mono text-xs" style={{ color: C.gold }}>{rm(summary.moneyDelta)}</div>
              <div className="f-mono text-[9px] uppercase" style={{ color: C.chalkDim }}>Earned</div>
            </div>
            <div>
              <div className="f-mono text-xs" style={{ color: summary.popularityDelta >= 0 ? C.teal : C.red }}>
                {summary.popularityDelta >= 0 ? "+" : ""}{summary.popularityDelta}
              </div>
              <div className="f-mono text-[9px] uppercase" style={{ color: C.chalkDim }}>Popularity</div>
            </div>
          </div>
        </div>

        {summary.leagueStats && (
          <div className="mb-4">
            <div className="f-mono text-[10px] uppercase tracking-widest mb-2 flex items-center justify-between" style={{ color: C.chalkDim }}>
              <span>{summary.leagueLabel} Season Averages</span>
              <span style={{ color: C.amberBright }}>{summary.leagueStats.role}</span>
            </div>
            {(summary.gamesPlayed != null || summary.wonChampionship) && (
              <div className="flex items-center gap-2 mb-2">
                {summary.gamesPlayed != null && (
                  <span className="f-mono text-[10px] px-2 py-0.5 rounded-xl" style={{ background: C.ink3, color: C.chalk, border: `1px solid ${C.line}` }}>
                    {summary.gamesPlayed} games
                  </span>
                )}
                {summary.wonChampionship && (
                  <span className="f-mono text-[10px] px-2 py-0.5 rounded-xl flex items-center gap-1" style={{ background: "rgba(250,204,21,0.18)", color: C.trophyGold, border: `1px solid ${C.trophyGold}` }}>
                    <Trophy size={10} /> Champions
                  </span>
                )}
              </div>
            )}
            {summary.injury && (
              <div className="mb-2 p-2 rounded-xl" style={{ background: "rgba(229,72,77,0.1)", border: `1px solid ${C.red}` }}>
                <span className="f-body text-[11px]" style={{ color: C.red }}>
                  {summary.injury.serious
                    ? `Serious injury — you missed ${summary.injury.missed} games this season.`
                    : `Injury setback — you missed ${summary.injury.missed} games this season.`}
                </span>
                {summary.injuryRecoveryNote && (
                  <div className="f-body text-[11px] mt-1.5 pt-1.5" style={{ color: C.chalkDim, borderTop: `1px solid rgba(220,38,38,0.3)` }}>
                    {summary.injuryRecoveryNote}
                  </div>
                )}
              </div>
            )}
            <div className="grid grid-cols-4 gap-y-3 p-3 rounded-xl" style={{ background: C.ink3 }}>
              <StatCell label="PPG" value={summary.leagueStats.ppg} />
              <StatCell label="RPG" value={summary.leagueStats.rpg} />
              <StatCell label="APG" value={summary.leagueStats.apg} />
              <StatCell label="SPG" value={summary.leagueStats.spg} />
              <StatCell label="BPG" value={summary.leagueStats.bpg} />
              <StatCell label="FG%" value={`${summary.leagueStats.fgPct}%`} />
              <StatCell label="3P%" value={`${summary.leagueStats.threePct}%`} />
              {summary.shotProfile && <StatCell label="3PA" value={summary.shotProfile.tpa} />}
              {summary.shotProfile && <StatCell label="FTA" value={summary.shotProfile.fta} />}
            </div>
            {summary.styleNote && (
              <div className="mt-2 flex items-center gap-1.5">
                {summary.playingStyle && getPlayingStyle(summary.playingStyle) && (
                  <span className="flex-shrink-0" style={{ fontSize: 12 }}>{getPlayingStyle(summary.playingStyle).icon}</span>
                )}
                <p className="f-body text-[10.5px] italic" style={{ color: C.chalkDim }}>{summary.styleNote}</p>
              </div>
            )}
            {summary.leagueAwards && summary.leagueAwards.length > 0 && (
              <div className="mt-2">
                <div className="f-mono text-[9px] uppercase tracking-widest mb-1.5" style={{ color: C.gold }}>Season Awards</div>
                <div className="flex flex-wrap gap-1.5">
                  {summary.leagueAwards.map(a => (
                    <span key={a} className="f-mono text-[9px] px-1.5 py-0.5 rounded-xl" style={{ background: "rgba(250,204,21,0.12)", color: C.trophyGold, border: `1px solid ${C.line}` }}>
                      {LEAGUE_AWARD_META[a] ? LEAGUE_AWARD_META[a].label : a}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {(summary.leagueBoard || summary.leagueStandings) && (
              <LeagueContext summary={summary} />
            )}
          </div>
        )}

        <PrimaryButton full disabled={advancing} onClick={handleAdvance}>{advancing ? "Advancing…" : (<>Continue <ChevronRight size={14} className="inline ml-1" /></>)}</PrimaryButton>
      </div>
    </div>
  );
})

/* ---------------------------------------------------------
   RETIRED SCREEN
--------------------------------------------------------- */
/* Aggregates a player's pro-season history into per-club average stat lines
   (grouped by club, ordered by how the career unfolded). Only club league
   seasons carry stats + clubId, so youth tournaments are naturally excluded. */
/* Renders a shareable PNG "career card" for the retirement screen using the
   Canvas API (no external libraries). Returns an HTMLCanvasElement. */
function drawChipRow(ctx, items, x, y, maxWidth, opts = {}) {
  const { font = "10px 'Inter', sans-serif", padX = 10, padY = 6, gap = 8, lineHeight = 30,
          bg = "rgba(250,204,21,0.14)", border = C.trophyGold, text = C.trophyGold } = opts;
  ctx.font = font;
  let cx = x, cy = y;
  items.forEach(label => {
    const w = ctx.measureText(label).width + padX * 2;
    if (cx + w > x + maxWidth) { cx = x; cy += lineHeight; }
    ctx.fillStyle = bg;
    ctx.strokeStyle = border;
    ctx.lineWidth = 1;
    roundRectPath(ctx, cx, cy, w, 22, 6);
    ctx.fill(); ctx.stroke();
    ctx.fillStyle = text;
    ctx.textBaseline = "middle";
    ctx.fillText(label, cx + padX, cy + 12);
    cx += w + gap;
  });
  return cy + lineHeight;
}
function roundRectPath(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

/* Draws a simplified Malaysia flag (14 stripes -> simplified to a few bands
   for legibility at small size, blue canton, yellow star+crescent) directly
   with canvas primitives — no async image loading needed inside a
   synchronous canvas-build function. */
function drawFlagMY(ctx, x, y, w, h) {
  roundRectPath(ctx, x, y, w, h, 2);
  ctx.save();
  ctx.clip();
  ctx.fillStyle = "#CC0001";
  ctx.fillRect(x, y, w, h);
  ctx.fillStyle = "#FFFFFF";
  const stripeH = h / 7;
  for (let i = 1; i < 7; i += 2) ctx.fillRect(x, y + i * stripeH, w, stripeH);
  ctx.fillStyle = "#010066";
  ctx.fillRect(x, y, w * 0.45, h * 4 / 7);
  ctx.fillStyle = "#FFCC00";
  ctx.beginPath();
  ctx.arc(x + w * 0.16, y + h * 0.28, h * 0.16, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#010066";
  ctx.beginPath();
  ctx.arc(x + w * 0.20, y + h * 0.28, h * 0.13, 0, Math.PI * 2);
  ctx.fill();
  // 14-point star, simplified as a small filled circle-with-points
  ctx.fillStyle = "#FFCC00";
  const scx = x + w * 0.30, scy = y + h * 0.28, sr = h * 0.13;
  ctx.beginPath();
  for (let i = 0; i < 14; i++) {
    const ang = (Math.PI * 2 * i) / 14 - Math.PI / 2;
    const r = i % 2 === 0 ? sr : sr * 0.45;
    const px = scx + Math.cos(ang) * r, py = scy + Math.sin(ang) * r;
    if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
  }
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

function generateCareerCardCanvas(player, careerSummary, title, flagImg) {
  const SCALE = 2; // export at 2x pixel density for a crisp, HD download/share
  const W = 1000;
  const MARGIN = 24;
  const GAP = 16;
  const headerH = 244;
  const colPlayerW = 440, colNatW = 240, colAwardsW = 240;

  const shownClubs = careerSummary.clubs.slice(0, 6);
  const extraClubs = careerSummary.clubs.length - shownClubs.length;
  const gridGap = 14;
  const cardW = (W - MARGIN * 2 - gridGap * 2) / 3;
  const cardH = 192;
  const gridRows = Math.ceil(Math.max(shownClubs.length, 1) / 3);
  const gridH = shownClubs.length ? gridRows * cardH + (gridRows - 1) * gridGap : 0;

  const H = MARGIN + headerH + GAP + gridH + (extraClubs > 0 ? 30 : 0) + 60 + MARGIN;

  const canvas = document.createElement("canvas");
  canvas.width = W * SCALE;
  canvas.height = H * SCALE;
  const ctx = canvas.getContext("2d");
  ctx.scale(SCALE, SCALE);

  // Background
  ctx.fillStyle = C.ink;
  ctx.fillRect(0, 0, W, H);

  // ---- Header row: Player | National Team | Individual Awards ----
  const px = MARGIN, nx = px + colPlayerW + GAP, ax = nx + colNatW + GAP;
  const hy = MARGIN;

  // Player card
  ctx.fillStyle = C.ink2;
  roundRectPath(ctx, px, hy, colPlayerW, headerH, 16);
  ctx.fill();
  ctx.strokeStyle = C.line; ctx.lineWidth = 1;
  roundRectPath(ctx, px, hy, colPlayerW, headerH, 16);
  ctx.stroke();

  ctx.textAlign = "left";
  ctx.font = "700 10px 'Inter', sans-serif";
  ctx.fillStyle = C.chalkDim;
  ctx.fillText("CAREER COMPLETE", px + 20, hy + 26);

  ctx.font = "800 32px 'Inter', sans-serif";
  ctx.fillStyle = C.chalk;
  ctx.fillText(player.name.toUpperCase(), px + 20, hy + 62);

  // Jersey + position pill
  const posName = (POSITIONS.find(x => x.id === player.position) || {}).id || player.position;
  ctx.font = "700 10px 'Inter', sans-serif";
  const pillLabel = `#${player.jersey} ${posName}`;
  const pillW = ctx.measureText(pillLabel).width + 20;
  ctx.fillStyle = "#DC2626";
  roundRectPath(ctx, px + 20, hy + 74, pillW, 22, 11);
  ctx.fill();
  ctx.fillStyle = "#FFFFFF";
  ctx.textBaseline = "middle";
  ctx.fillText(pillLabel, px + 30, hy + 85);
  ctx.textBaseline = "alphabetic";

  // Hometown flag + identity details, sitting to the right of the jersey pill.
  let dx = px + 20 + pillW + 10;
  if (flagImg) {
    const fw = 26, fh = 17;
    const fy = hy + 74 + (22 - fh) / 2;
    ctx.save();
    roundRectPath(ctx, dx, fy, fw, fh, 3);
    ctx.clip();
    ctx.drawImage(flagImg, dx, fy, fw, fh);
    ctx.restore();
    ctx.strokeStyle = "rgba(255,255,255,0.25)";
    ctx.lineWidth = 1;
    roundRectPath(ctx, dx, fy, fw, fh, 3);
    ctx.stroke();
    dx += fw + 8;
  }
  ctx.font = "600 11px 'Inter', sans-serif";
  ctx.fillStyle = C.chalkDim;
  ctx.textBaseline = "middle";
  const detailBits = [
    player.hometown,
    player.height ? `${player.height}cm` : null,
    `Retired at ${player.age}`,
  ].filter(Boolean);
  ctx.fillText(detailBits.join("  ·  "), dx, hy + 86);
  ctx.textBaseline = "alphabetic";

  // OVR badge + value, top-right of player card
  const ovrSize = 56;
  ctx.fillStyle = C.gold;
  roundRectPath(ctx, px + colPlayerW - 20 - ovrSize, hy + 18, ovrSize, ovrSize, 12);
  ctx.fill();
  ctx.textAlign = "center";
  ctx.font = "700 9px 'Inter', sans-serif";
  ctx.fillStyle = "rgba(0,0,0,0.55)";
  ctx.fillText("OVR", px + colPlayerW - 20 - ovrSize / 2, hy + 34);
  ctx.font = "800 24px 'Inter', sans-serif";
  ctx.fillStyle = "#1A0A00";
  ctx.fillText(String(player.peakOverall), px + colPlayerW - 20 - ovrSize / 2, hy + 60);
  ctx.textAlign = "right";
  ctx.font = "600 10px 'Inter', sans-serif";
  ctx.fillStyle = C.chalkDim;
  ctx.fillText(`${rm(player.money)} career`, px + colPlayerW - 20, hy + 90);
  ctx.textAlign = "left";

  // Achievement badge pills (up to 4, most recent first)
  const achList = (player.achievements || []).filter(a => ACHIEVEMENT_META[a]).slice(-4).reverse();
  if (achList.length) {
    const labels = achList.map(a => ACHIEVEMENT_META[a].label);
    drawChipRow(ctx, labels, px + 20, hy + 106, colPlayerW - 40, { font: "600 10px 'Inter', sans-serif", lineHeight: 26, bg: "rgba(250,204,21,0.12)", border: C.trophyGold, text: C.trophyGold });
  }

  // Bottom stat row: career averages (games-weighted across the whole pro career)
  const proAvg = (careerSummary.proCareer && careerSummary.proCareer.avg) || { ppg: 0, rpg: 0, apg: 0 };
  const playerStatY = hy + headerH - 34;
  ctx.strokeStyle = C.line; ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(px + 20, playerStatY - 24); ctx.lineTo(px + colPlayerW - 20, playerStatY - 24); ctx.stroke();
  const pStats = [["PPG", proAvg.ppg], ["RPG", proAvg.rpg], ["APG", proAvg.apg]];
  const pStatW = (colPlayerW - 40) / 3;
  pStats.forEach(([lbl, val], i) => {
    const bx = px + 20 + pStatW * i + pStatW / 2;
    ctx.textAlign = "center";
    ctx.font = "800 18px 'Inter', sans-serif";
    ctx.fillStyle = C.chalk;
    ctx.fillText(String(val), bx, playerStatY);
    ctx.font = "700 8px 'Inter', sans-serif";
    ctx.fillStyle = C.chalkDim;
    ctx.fillText(lbl, bx, playerStatY + 14);
  });
  ctx.textAlign = "left";

  // National team card
  ctx.fillStyle = "rgba(220,38,38,0.10)";
  roundRectPath(ctx, nx, hy, colNatW, headerH, 16);
  ctx.fill();
  ctx.strokeStyle = "rgba(220,38,38,0.35)"; ctx.lineWidth = 1;
  roundRectPath(ctx, nx, hy, colNatW, headerH, 16);
  ctx.stroke();

  drawFlagMY(ctx, nx + 18, hy + 20, 30, 20);
  ctx.font = "700 9px 'Inter', sans-serif";
  ctx.fillStyle = C.chalkDim;
  ctx.fillText("NATIONAL TEAM", nx + 56, hy + 28);
  ctx.font = "800 16px 'Inter', sans-serif";
  ctx.fillStyle = C.chalk;
  ctx.fillText("Malaysia", nx + 56, hy + 46);

  if (careerSummary.national) {
    const nStats = [["GAMES", careerSummary.national.games || 0], ["PPG", careerSummary.national.avg.ppg], ["APG", careerSummary.national.avg.apg]];
    const nStatW = (colNatW - 36) / 3;
    nStats.forEach(([lbl, val], i) => {
      const bx = nx + 18 + nStatW * i + nStatW / 2;
      ctx.textAlign = "center";
      ctx.font = "800 17px 'Inter', sans-serif";
      ctx.fillStyle = C.chalk;
      ctx.fillText(String(val), bx, hy + 92);
      ctx.font = "700 8px 'Inter', sans-serif";
      ctx.fillStyle = C.chalkDim;
      ctx.fillText(lbl, bx, hy + 106);
    });
    ctx.textAlign = "left";
  } else {
    ctx.font = "600 11px 'Inter', sans-serif";
    ctx.fillStyle = C.chalkDim;
    ctx.textAlign = "center";
    ctx.fillText("Empty trophy case", nx + colNatW / 2, hy + 150);
    ctx.textAlign = "left";
  }

  // Individual Awards card
  ctx.fillStyle = "rgba(250,204,21,0.08)";
  roundRectPath(ctx, ax, hy, colAwardsW, headerH, 16);
  ctx.fill();
  ctx.strokeStyle = "rgba(250,204,21,0.3)"; ctx.lineWidth = 1;
  roundRectPath(ctx, ax, hy, colAwardsW, headerH, 16);
  ctx.stroke();
  ctx.font = "700 9px 'Inter', sans-serif";
  ctx.fillStyle = C.trophyGold;
  ctx.fillText("INDIVIDUAL AWARDS", ax + 18, hy + 28);

  // Build a league-aware award list straight from each club's own awards +
  // leagues, so "Top Assists" can be tagged with exactly which league it
  // was won in, rather than a single flattened career-wide count.
  const awardsWithLeague = [];
  (careerSummary.clubs || []).forEach(c => {
    const leagueTag = c.leagues && c.leagues.length ? c.leagues.join("/") : null;
    (c.awards || []).forEach(a => {
      awardsWithLeague.push({ id: a.id, count: a.count, league: leagueTag });
    });
  });

  if (awardsWithLeague.length) {
    const glyphs = awardsWithLeague.slice(0, 4).map(a => (a.id === "mvp" ? "🏅" : a.id === "tot" || a.id === "dpoy" ? "⭐" : "🏆"));
    ctx.font = "34px sans-serif";
    glyphs.forEach((g, i) => {
      ctx.fillText(g, ax + 18 + i * 48, hy + 90);
    });
    ctx.font = "600 10px 'Inter', sans-serif";
    ctx.fillStyle = C.chalkDim;
    const label = awardsWithLeague.slice(0, 3).map(a => {
      const name = LEAGUE_AWARD_META[a.id] ? LEAGUE_AWARD_META[a.id].short : a.id;
      return `${a.count}× ${name}${a.league ? ` (${a.league})` : ""}`;
    }).join("  ·  ");
    ctx.fillText(label, ax + 18, hy + 130, colAwardsW - 36);
  } else {
    ctx.font = "600 11px 'Inter', sans-serif";
    ctx.fillStyle = C.chalkDim;
    ctx.fillText("No individual", ax + 18, hy + 90);
    ctx.fillText("awards", ax + 18, hy + 106);
  }

  // ---- Club grid ----
  let gy = MARGIN + headerH + GAP;
  shownClubs.forEach((c, i) => {
    const col = i % 3, row = Math.floor(i / 3);
    const gx2 = MARGIN + col * (cardW + gridGap);
    const cy2 = gy + row * (cardH + gridGap);
    const [c1, c2] = crestPalette(c.clubName);
    const grad = ctx.createLinearGradient(gx2, cy2, gx2, cy2 + cardH);
    grad.addColorStop(0, c1 + "38");
    grad.addColorStop(1, c2 + "18");
    ctx.fillStyle = grad;
    roundRectPath(ctx, gx2, cy2, cardW, cardH, 14);
    ctx.fill();
    ctx.strokeStyle = c1 + "55"; ctx.lineWidth = 1;
    roundRectPath(ctx, gx2, cy2, cardW, cardH, 14);
    ctx.stroke();

    // Crest circle
    const crestR = 26;
    const ccx = gx2 + cardW / 2, ccy = cy2 + 20 + crestR;
    const crestGrad = ctx.createLinearGradient(ccx - crestR, ccy - crestR, ccx + crestR, ccy + crestR);
    crestGrad.addColorStop(0, c1);
    crestGrad.addColorStop(1, c2);
    ctx.fillStyle = crestGrad;
    ctx.beginPath();
    ctx.arc(ccx, ccy, crestR, 0, Math.PI * 2);
    ctx.fill();
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = "800 16px 'Inter', sans-serif";
    ctx.fillStyle = "#FFFFFF";
    ctx.fillText(crestInitials(c.clubName), ccx, ccy + 1);
    ctx.textBaseline = "alphabetic";

    ctx.font = "700 13px 'Inter', sans-serif";
    ctx.fillStyle = C.chalk;
    let displayName = c.clubName;
    if (ctx.measureText(displayName).width > cardW - 20) {
      while (ctx.measureText(displayName + "…").width > cardW - 20 && displayName.length > 3) displayName = displayName.slice(0, -1);
      displayName += "…";
    }
    ctx.fillText(displayName, ccx, cy2 + 20 + crestR * 2 + 16);
    // Games played, with any titles won sitting on the same line just above
    // the stat row — keeps the trophy clear of the stat labels below.
    const metaY = cy2 + 20 + crestR * 2 + 30;
    ctx.font = "600 9px 'Inter', sans-serif";
    const gamesText = `${c.games || 0} games`;
    if (c.titles > 0) {
      const trophyText = `🏆 ${c.titles}×`;
      ctx.font = "11px sans-serif";
      const tw = ctx.measureText(trophyText).width;
      ctx.font = "600 9px 'Inter', sans-serif";
      const gw = ctx.measureText(gamesText).width;
      const totalW = gw + 8 + tw;
      const startX = ccx - totalW / 2;
      ctx.textAlign = "left";
      ctx.fillStyle = C.chalkDim;
      ctx.fillText(gamesText, startX, metaY);
      ctx.font = "11px sans-serif";
      ctx.fillStyle = C.trophyGold;
      ctx.fillText(trophyText, startX + gw + 8, metaY);
      ctx.textAlign = "center";
    } else {
      ctx.fillStyle = C.chalkDim;
      ctx.fillText(gamesText, ccx, metaY);
    }

    const cStats = [["PPG", c.avg.ppg], ["RPG", c.avg.rpg], ["APG", c.avg.apg], ["SPG", c.avg.spg], ["BPG", c.avg.bpg]];
    const cStatW = (cardW - 20) / 5;
    cStats.forEach(([lbl, val], j) => {
      const bx = gx2 + 10 + cStatW * j + cStatW / 2;
      ctx.font = "800 12px 'Inter', sans-serif";
      ctx.fillStyle = C.chalk;
      ctx.fillText(String(val), bx, cy2 + cardH - 34);
      ctx.font = "700 7px 'Inter', sans-serif";
      ctx.fillStyle = C.chalkDim;
      ctx.fillText(lbl, bx, cy2 + cardH - 20);
    });

    ctx.textAlign = "left";
  });

  let footerY = gy + gridH + (shownClubs.length ? 14 : 0);
  if (extraClubs > 0) {
    ctx.textAlign = "center";
    ctx.font = "11px 'Inter', sans-serif";
    ctx.fillStyle = C.chalkDim;
    ctx.fillText(`+ ${extraClubs} more club${extraClubs > 1 ? "s" : ""}`, W / 2, footerY);
    ctx.textAlign = "left";
    footerY += 24;
  }

  ctx.textAlign = "center";
  ctx.font = "10px 'Inter', sans-serif";
  ctx.fillStyle = C.chalkDim;
  ctx.fillText("HOOPS LIFE: THE CLIMB", W / 2, H - MARGIN - 10);

  return canvas;
}

/* Every history entry belongs to exactly one competition category. New entries
   carry an explicit `category`; older saves are classified from the markers
   that were already being written (tier label, league name, club id), so
   existing careers split correctly too. */
function classifyHistoryEntry(h) {
  if (!h) return null;
  if (h.category) return h.category;
  if (h.national) return "national";
  const tl = h.tierLabel || "";
  const ln = h.leagueName || "";
  if (tl === "Taiwan HBL" || ln === "Taiwan HBL") return "hbl";
  if (tl.startsWith("Taiwan UBA") || ln === "Taiwan UBA") return "uba";
  if (tl === "MSSM") return "mssm";
  if (tl === "U15 State Rep") return "u15";
  if (tl === "U17 State Rep" || tl === "National U17 Tournament" || tl === "U17 Jumpclass") return "u17";
  if (tl === "U16 National Team") return "u16";
  if (tl === "U18 National Team") return "u18";
  if (h.clubId || h.leagueId) return "pro";
  if (h.clubName) return "pro";
  return null;
}

const CAREER_CATEGORY_META = [
  { id: "u15", label: "National U15", perGame: false },
  { id: "u16", label: "FIBA U16 Asia Cup", perGame: false },
  { id: "u17", label: "National U17", perGame: false },
  { id: "u18", label: "FIBA U18 Asia Cup", perGame: false },
  { id: "mssm", label: "MSSM", perGame: false },
  { id: "hbl", label: "Taiwan HBL", perGame: true },
  { id: "uba", label: "Taiwan UBA", perGame: true },
  { id: "pro", label: "Pro Career", perGame: true },
];

function buildCareerSummary(history) {
  const order = [];
  const byClub = {};
  const careerAwards = {}; // award id -> count across whole career
  const nat = { apps: 0, games: 0, sum: { ppg: 0, rpg: 0, apg: 0, spg: 0, bpg: 0, fgPct: 0, threePct: 0 } };
  // Per-competition aggregates. Each category is kept entirely separate —
  // a UBA scholarship season is university basketball, not professional
  // output, so it must never be folded into the pro averages.
  const cats = {};
  CAREER_CATEGORY_META.forEach(c => {
    cats[c.id] = { seasons: 0, games: 0, sum: { ppg: 0, rpg: 0, apg: 0, spg: 0, bpg: 0 } };
  });
  (history || []).forEach(h => {
    if (!h || !h.stats) return;
    if (h.national) {
      nat.apps += 1;
      if (typeof h.games === "number") nat.games += h.games;
      ["ppg", "rpg", "apg", "spg", "bpg", "fgPct", "threePct"].forEach(k => { nat.sum[k] += h.stats[k] || 0; });
      return;
    }
    const cat = classifyHistoryEntry(h);
    if (cat && cats[cat]) {
      const c = cats[cat];
      const g = h.games || 0;
      c.seasons += 1;
      c.games += g;
      // Tournament categories average per appearance; league categories are
      // games-weighted so a 40-game season outweighs a short one.
      const w = CAREER_CATEGORY_META.find(m => m.id === cat).perGame ? (g || 1) : 1;
      c.weight = (c.weight || 0) + w;
      ["ppg", "rpg", "apg", "spg", "bpg"].forEach(k => { c.sum[k] += (h.stats[k] || 0) * w; });
    }
    // Overseas seasons have a team name but no domestic clubId — group by
    // name instead so they still show up in the career-by-club breakdown.
    const groupKey = h.clubId || h.clubName;
    if (!groupKey) return;
    if (!byClub[groupKey]) {
      byClub[groupKey] = {
        clubId: groupKey, clubName: h.clubName || "Club",
        leagues: new Set(), seasons: 0, games: 0, titles: 0,
        sum: { ppg: 0, rpg: 0, apg: 0, spg: 0, bpg: 0, fgPct: 0, threePct: 0 },
        awards: {},
      };
      order.push(groupKey);
    }
    const gClub = byClub[groupKey];
    gClub.seasons += 1;
    if (typeof h.games === "number") gClub.games += h.games;
    if (h.champion) gClub.titles += 1;
    if (h.leagueName) gClub.leagues.add(h.leagueName);
    else if (h.leagueId && LEAGUE[h.leagueId]) gClub.leagues.add(LEAGUE[h.leagueId].short);
    ["ppg", "rpg", "apg", "spg", "bpg", "fgPct", "threePct"].forEach(k => { gClub.sum[k] += h.stats[k] || 0; });
    (h.leagueAwards || []).forEach(a => {
      gClub.awards[a] = (gClub.awards[a] || 0) + 1;
      careerAwards[a] = (careerAwards[a] || 0) + 1;
    });
  });
  const clubs = order.map(id => {
    const g = byClub[id];
    const avg = {};
    Object.keys(g.sum).forEach(k => { avg[k] = Math.round((g.sum[k] / g.seasons) * 10) / 10; });
    const awardOrder = ["mvp", "roty", "sixth_man", "tot", "dpoy", "top_scorer", "top_rebounder", "top_assists", "top_steals", "top_blocks"];
    // Known domestic award ids first (in order), then any custom ones (e.g.
    // overseas awards like "Scoring Champion") that don't match that list.
    const extraIds = Object.keys(g.awards).filter(a => !awardOrder.includes(a));
    const awards = [...awardOrder, ...extraIds].filter(a => g.awards[a]).map(a => ({ id: a, count: g.awards[a] }));
    return { clubId: id, clubName: g.clubName, seasons: g.seasons, games: g.games, titles: g.titles, leagues: Array.from(g.leagues), avg, awards };
  });
  const awardOrder = ["mvp", "roty", "sixth_man", "tot", "dpoy", "top_scorer", "top_rebounder", "top_assists", "top_steals", "top_blocks"];
  const extraCareerIds = Object.keys(careerAwards).filter(a => !awardOrder.includes(a));
  const totalAwards = [...awardOrder, ...extraCareerIds].filter(a => careerAwards[a]).map(a => ({ id: a, count: careerAwards[a] }));
  let national = null;
  if (nat.apps > 0) {
    const avg = {};
    Object.keys(nat.sum).forEach(k => { avg[k] = Math.round((nat.sum[k] / nat.apps) * 10) / 10; });
    national = { apps: nat.apps, games: nat.games, avg };
  }
  // Per-competition breakdown, in career order, skipping empty categories.
  const categories = CAREER_CATEGORY_META.map(meta => {
    const c = cats[meta.id];
    if (!c || c.seasons === 0) return null;
    const denom = c.weight || c.seasons || 1;
    const avg = {};
    Object.keys(c.sum).forEach(k => { avg[k] = Math.round((c.sum[k] / denom) * 10) / 10; });
    return { id: meta.id, label: meta.label, seasons: c.seasons, games: c.games, perGame: meta.perGame, avg };
  }).filter(Boolean);

  // proCareer stays available for the career card, but now reflects ONLY
  // professional club seasons — UBA and HBL are reported separately.
  const proCat = categories.find(c => c.id === "pro");
  const proCareer = proCat ? { games: proCat.games, avg: proCat.avg } : null;

  return { clubs, totalAwards, national, categories, proCareer };
}

function AchievementGalleryScreen({ gallery, onBack }) {
  const ids = Object.keys(ACHIEVEMENT_META);
  const unlockedCount = ids.filter(id => gallery[id]).length;
  const pct = Math.round((unlockedCount / ids.length) * 100);

  return (
    <div className="court-hero min-h-full w-full px-4 py-10 sm:py-14">
      <div className="w-full max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-2">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="text-xl">🏆</span>
              <span className="f-display text-2xl font-black" style={{ color: C.chalk }}>Achievement Gallery</span>
            </div>
            <div className="f-body text-sm mt-1" style={{ color: C.chalkDim }}>Every badge you've ever earned, across every career.</div>
          </div>
          <button onClick={onBack} className="btn-tactile f-mono text-xs px-4 py-2 rounded-full" style={{ background: C.ink3, color: C.chalkDim, border: `1px solid ${C.line}` }}>← Back</button>
        </div>

        <div className="rounded-[20px] p-5 mt-5" style={{ background: C.ink2, border: `1px solid ${C.line}` }}>
          <div className="flex items-center justify-between mb-2.5">
            <span className="f-display text-sm font-bold" style={{ color: C.chalk }}>{unlockedCount} / {ids.length} Unlocked</span>
            <span className="f-mono text-xs font-bold" style={{ color: C.trophyGold }}>{pct}%</span>
          </div>
          <div className="h-2.5 rounded-full overflow-hidden" style={{ background: C.ink3 }}>
            <div className="h-full rounded-full" style={{ width: `${pct}%`, background: `linear-gradient(90deg, ${C.amber}, ${C.trophyGold})` }} />
          </div>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-8 gap-2.5 mt-6">
          {ids.map(id => {
            const meta = ACHIEVEMENT_META[id];
            const unlocked = !!gallery[id];
            const Icon = meta.icon;
            const isMystery = meta.hidden && !unlocked;
            return (
              <div
                key={id}
                className="relative rounded-2xl p-3 text-center"
                style={{
                  background: unlocked ? C.ink2 : C.ink3,
                  border: `1px solid ${unlocked ? (meta.hidden ? "rgba(168,85,247,0.4)" : C.line) : C.line}`,
                  opacity: unlocked ? 1 : 0.5,
                }}
              >
                {meta.hidden && unlocked && <div className="absolute top-1.5 right-1.5 text-[9px]">✨</div>}
                <div className="flex items-center justify-center" style={{ height: 30 }}>
                  {isMystery ? (
                    <span className="text-lg" style={{ color: C.chalkDim }}>🔒</span>
                  ) : (
                    <Icon size={26} color={unlocked ? C.trophyGold : C.chalkDim} />
                  )}
                </div>
                <div className="f-mono text-[9px] font-bold mt-2 leading-tight" style={{ color: unlocked ? C.chalk : C.chalkDim }}>
                  {isMystery ? "???" : meta.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function HallOfFameScreen({ entries, onBack, onPlayAgain }) {
  const total = entries.length;
  const bestOvr = total ? Math.max(...entries.map(e => e.peakOverall)) : 0;
  const nbaCareers = entries.filter(e => e.tierLabel === "NBA Player").length;
  const totalTrophies = entries.reduce((s, e) => s + (e.trophies || 0), 0);
  const tintStyle = (tint) => {
    if (tint === "gold") return { border: "rgba(250,204,21,0.35)", bg: "linear-gradient(180deg, rgba(250,204,21,0.07), " + C.ink2 + ")", badgeBg: "rgba(250,204,21,0.14)", badgeColor: C.trophyGold, badgeBorder: "rgba(250,204,21,0.35)" };
    if (tint === "amber") return { border: C.line, bg: C.ink2, badgeBg: "rgba(249,115,22,0.14)", badgeColor: C.amberBright, badgeBorder: "rgba(249,115,22,0.35)" };
    if (tint === "dim") return { border: C.line, bg: C.ink2, badgeBg: C.ink3, badgeColor: C.chalkDim, badgeBorder: C.line };
    return { border: C.line, bg: C.ink2, badgeBg: "rgba(248,250,252,0.08)", badgeColor: C.chalk, badgeBorder: C.line };
  };

  return (
    <div className="court-hero min-h-full w-full px-4 py-10 sm:py-14">
      <div className="w-full max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-2">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="text-xl">🏛️</span>
              <span className="f-display text-2xl font-black" style={{ color: C.chalk }}>Hall of Fame</span>
            </div>
            <div className="f-body text-sm mt-1" style={{ color: C.chalkDim }}>Every career you've ever played, in one place.</div>
          </div>
          <button onClick={onBack} className="btn-tactile f-mono text-xs px-4 py-2 rounded-full" style={{ background: C.ink3, color: C.chalkDim, border: `1px solid ${C.line}` }}>← Back</button>
        </div>

        <div className="flex mt-5 rounded-[20px] py-5" style={{ background: C.ink2, border: `1px solid ${C.line}` }}>
          {[["Careers Played", total, C.chalk], ["Best Peak OVR", bestOvr || "—", C.trophyGold], ["NBA Careers", nbaCareers, C.chalk], ["Total Trophies", totalTrophies, C.chalk]].map(([label, val, color], i) => (
            <div key={label} className="flex-1 text-center" style={i < 3 ? { borderRight: `1px solid ${C.line}` } : {}}>
              <div className="f-display text-2xl font-black" style={{ color }}>{val}</div>
              <div className="f-mono text-[9px] uppercase tracking-widest mt-0.5" style={{ color: C.chalkDim }}>{label}</div>
            </div>
          ))}
        </div>

        {total === 0 ? (
          <div className="text-center py-20">
            <div className="text-4xl mb-3">🏛️</div>
            <div className="f-body text-sm" style={{ color: C.chalkDim }}>No careers retired yet. Finish one to start your collection.</div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
            {entries.map((e, i) => {
              const t = tintStyle(e.tierTint);
              const isNewest = i === 0;
              return (
                <div key={e.id} className="rounded-[20px] p-5 relative" style={{ background: t.bg, border: `1px solid ${isNewest ? C.amber : t.border}` }}>
                  {isNewest && (
                    <div className="absolute -top-2.5 right-4 f-mono text-[9px] font-extrabold px-2.5 py-0.5 rounded-full" style={{ background: C.amber, color: "#1A0A00" }}>JUST RETIRED</div>
                  )}
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-1.5 mb-1">
                        <FlagIcon name={e.hometown} size={16} />
                        <span className="f-mono text-[10px]" style={{ color: C.chalkDim }}>{e.hometown}</span>
                      </div>
                      <div className="f-display text-lg font-bold" style={{ color: C.chalk }}>{e.name}</div>
                      <div className="f-mono text-[10px] mt-0.5" style={{ color: C.chalkDim }}>#{e.jersey} {e.position}</div>
                    </div>
                    <div className="rounded-xl px-3 py-1.5 text-center" style={{ background: e.tierTint === "gold" ? `linear-gradient(160deg, ${C.trophyGold}, ${C.amber})` : C.ink3, border: e.tierTint === "gold" ? "none" : `1px solid ${isNewest ? C.amber : C.line}` }}>
                      <div className="f-mono text-[8px] font-bold" style={{ color: e.tierTint === "gold" ? "rgba(0,0,0,0.55)" : C.chalkDim }}>PEAK</div>
                      <div className="font-black text-xl" style={{ color: e.tierTint === "gold" ? "#1A0A00" : C.chalk }}>{e.peakOverall}</div>
                    </div>
                  </div>

                  <div className="inline-flex items-center gap-1.5 f-display font-extrabold text-[13px] px-3 py-1.5 rounded-full mt-4" style={{ background: t.badgeBg, color: t.badgeColor, border: `1px solid ${t.badgeBorder}` }}>
                    <span>{e.tierIcon}</span>{e.tierLabel}
                  </div>

                  <div className="grid grid-cols-4 gap-x-3 gap-y-2.5 mt-4">
                    {[["PPG", e.avg.ppg], ["RPG", e.avg.rpg], ["APG", e.avg.apg], ["SPG", e.avg.spg ?? 0], ["BPG", e.avg.bpg ?? 0], ["FG%", e.avg.fgPct != null ? `${e.avg.fgPct}%` : "—"], ["3P%", e.avg.threePct != null ? `${e.avg.threePct}%` : "—"]].map(([lbl, val]) => (
                      <div key={lbl}>
                        <div className="f-display font-extrabold text-[15px]" style={{ color: C.chalk }}>{val}</div>
                        <div className="f-mono text-[8px] font-bold uppercase tracking-widest" style={{ color: C.chalkDim }}>{lbl}</div>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between mt-4 pt-3" style={{ borderTop: `1px solid ${C.line}` }}>
                    <span className="f-mono text-[11px]" style={{ color: C.chalkDim }}>{e.games} games · retired at {e.retiredAge}</span>
                    <span className="f-mono text-[11px] font-bold" style={{ color: e.trophies > 0 ? C.trophyGold : C.chalkDim }}>🏆 {e.trophies}</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <div className="mt-8 text-center">
          <PrimaryButton onClick={onPlayAgain}>+ Start New Career</PrimaryButton>
        </div>
      </div>
    </div>
  );
}

function RetiredScreen({ player, onPlayAgain, onViewHallOfFame, onViewAchievements }) {
  const overall = computeOverall(player.stats, player.position);
  const title = legacyTitle(player);
  const careerSummary = buildCareerSummary(player.history);
  const [cardStatus, setCardStatus] = useState(null); // null | 'saving' | 'saved' | 'sharing' | 'error'

  const makeBlob = () => new Promise(async (resolve, reject) => {
    try {
      // Custom @font-face fonts must be fully loaded before canvas text draws
      // with them — otherwise the export silently falls back to a system font.
      if (document.fonts && document.fonts.load) {
        await Promise.all([
          document.fonts.load("800 32px 'Inter'"),
          document.fonts.load("800 24px 'Inter'"),
          document.fonts.load("800 18px 'Inter'"),
          document.fonts.load("800 17px 'Inter'"),
          document.fonts.load("800 16px 'Inter'"),
          document.fonts.load("800 13px 'Inter'"),
          document.fonts.load("700 13px 'Inter'"),
          document.fonts.load("700 10px 'Inter'"),
          document.fonts.load("700 9px 'Inter'"),
          document.fonts.load("700 8px 'Inter'"),
          document.fonts.load("600 11px 'Inter'"),
          document.fonts.load("600 10px 'Inter'"),
          document.fonts.load("400 11px 'Inter'"),
        ]).catch(() => {});
        if (document.fonts.ready) await document.fonts.ready;
      }
      // Canvas drawImage is synchronous, so the state flag has to be fully
      // decoded before we start painting or it silently draws nothing.
      let flagImg = null;
      const flagSrc = FLAG_IMAGES[player.hometown];
      if (flagSrc) {
        flagImg = await new Promise(res => {
          const im = new Image();
          im.onload = () => res(im);
          im.onerror = () => res(null);
          im.src = flagSrc;
        });
      }
      const canvas = generateCareerCardCanvas(player, careerSummary, title, flagImg);
      canvas.toBlob(blob => blob ? resolve(blob) : reject(new Error("toBlob failed")), "image/png");
    } catch (e) { reject(e); }
  });

  const handleSaveImage = async () => {
    setCardStatus("saving");
    try {
      const blob = await makeBlob();
      const filename = `${(player.name || "career").replace(/\s+/g, "_")}_career_card.png`;

      // Mobile browsers (notably Chrome and Safari on iOS, and plenty of
      // Android builds too) don't reliably support downloading a blob via
      // <a download> — they just navigate to the blob URL instead of saving
      // it, so nothing visibly happens. Where the Web Share API with files
      // is available, route through the native share sheet instead (with a
      // "Save Image"-style prompt) since that's the mechanism that actually
      // results in a saved file on mobile.
      if (navigator.share && navigator.canShare) {
        try {
          const file = new File([blob], filename, { type: "image/png" });
          if (navigator.canShare({ files: [file] })) {
            await navigator.share({ files: [file], title: `${player.name} — Career Summary` });
            setCardStatus("saved");
            setTimeout(() => setCardStatus(null), 2000);
            return;
          }
        } catch (shareErr) {
          // User cancelled the share sheet, or sharing failed outright —
          // fall through to the direct-download attempt below rather than
          // showing an error for what may just be a cancellation.
        }
      }

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 2000);
      setCardStatus("saved");
      setTimeout(() => setCardStatus(null), 2000);
    } catch (e) {
      setCardStatus("error");
      setTimeout(() => setCardStatus(null), 2500);
    }
  };

  const handleShareImage = async () => {
    setCardStatus("sharing");
    try {
      const blob = await makeBlob();
      const file = new File([blob], `${(player.name || "career").replace(/\s+/g, "_")}_career_card.png`, { type: "image/png" });
      if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({ files: [file], title: `${player.name} — Career Summary`, text: "My Hoops Life: The Climb career summary" });
        setCardStatus(null);
      } else {
        // No native share support — fall back to a download.
        await handleSaveImage();
      }
    } catch (e) {
      setCardStatus(null); // user likely cancelled the share sheet — no error banner
    }
  };

  return (
    <div className="court-hero min-h-full w-full flex items-center justify-center px-4 py-10">
      <div className="max-w-md w-full rounded-[28px] p-6 text-center" style={{ background: C.ink2, border: `1px solid ${C.line}` }}>
        <Trophy size={32} color={C.trophyGold} className="mx-auto mb-3" />
        <div className="f-mono text-[11px] uppercase tracking-widest" style={{ color: C.chalkDim }}>Career Retired</div>
        <div className="flex items-center justify-center gap-3 mt-1">
          <div className="f-display text-2xl uppercase" style={{ color: C.chalk }}>{player.name}</div>
          <OvrBadge value={player.peakOverall} size={48} color={C.trophyGold} />
        </div>
        <div className="f-display text-lg uppercase mt-1" style={{ color: C.amberBright }}>{title}</div>

        <div className="flex items-center justify-center gap-2 mt-3 mb-1">
          {player.hometown && <FlagIcon name={player.hometown} size={18} />}
          <span className="f-body text-xs" style={{ color: C.chalkDim }}>
            {POSITIONS.find(x => x.id === player.position)?.name || player.position} · {player.hometown}
          </span>
        </div>

        <div className="grid grid-cols-4 gap-2 mt-4 mb-2 p-3 rounded-xl" style={{ background: C.ink3 }}>
          <div className="text-center">
            <div className="f-mono text-sm font-bold" style={{ color: C.chalk }}>#{player.jersey}</div>
            <div className="f-mono text-[8px] uppercase" style={{ color: C.chalkDim }}>Jersey</div>
          </div>
          <div className="text-center">
            <div className="f-mono text-sm font-bold" style={{ color: C.chalk }}>{player.height}cm</div>
            <div className="f-mono text-[8px] uppercase" style={{ color: C.chalkDim }}>Height</div>
          </div>
          <div className="text-center">
            <div className="f-mono text-sm font-bold" style={{ color: C.chalk }}>{player.position}</div>
            <div className="f-mono text-[8px] uppercase" style={{ color: C.chalkDim }}>Position</div>
          </div>
          <div className="text-center">
            <div className="f-mono text-sm font-bold" style={{ color: C.chalk }}>{player.age}</div>
            <div className="f-mono text-[8px] uppercase" style={{ color: C.chalkDim }}>Retired At</div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 my-6">
          <div>
            <div className="f-mono text-xl font-bold" style={{ color: C.gold }}>{player.seasonNum - 1}</div>
            <div className="f-mono text-[9px] uppercase" style={{ color: C.chalkDim }}>Seasons</div>
          </div>
          <div>
            <div className="f-mono text-xl font-bold" style={{ color: C.gold }}>{player.peakOverall}</div>
            <div className="f-mono text-[9px] uppercase" style={{ color: C.chalkDim }}>Peak OVR</div>
          </div>
          <div>
            <div className="f-mono text-xl font-bold" style={{ color: C.gold }}>{(careerSummary.national && careerSummary.national.games) || 0}</div>
            <div className="f-mono text-[9px] uppercase" style={{ color: C.chalkDim }}>Games for MAS</div>
          </div>
        </div>

        <div className="f-mono text-lg mb-4" style={{ color: C.chalk }}>{rm(player.money)} career earnings</div>

        {player.rival && (() => {
          const rivalOvr = player.rival.peakOverall;
          const mineWins = (player.peakOverall > rivalOvr ? 1 : rivalOvr > player.peakOverall ? 0 : 0.5)
            + ((player.nationalCaps || 0) > player.rival.caps ? 1 : player.rival.caps > (player.nationalCaps || 0) ? 0 : 0.5);
          const verdict = mineWins > 1 ? "You had the better career" : mineWins < 1 ? `${player.rival.name} had the better career` : "Dead even, across an entire career";
          return (
            <div className="mb-5 text-left">
              <div className="f-mono text-[10px] uppercase tracking-widest mb-2 text-center" style={{ color: C.chalkDim }}>The Rivalry, Settled</div>
              <div className="p-4 rounded-xl text-center mb-3" style={{ background: "rgba(250,204,21,0.08)", border: `1px solid rgba(250,204,21,0.3)` }}>
                <span className="f-display text-sm" style={{ color: C.trophyGold }}>🏆 {verdict}</span>
              </div>
              <div className="p-3 rounded-xl" style={{ background: C.ink3, border: `1px solid ${C.line}` }}>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2"><ClubCrest name={player.name} size={28} /><span className="f-body text-xs font-semibold" style={{ color: C.chalk }}>{player.name}</span></div>
                  <div className="flex items-center gap-2"><span className="f-body text-xs font-semibold" style={{ color: C.chalk }}>{player.rival.name}</span><ClubCrest name={player.rival.name} size={28} /></div>
                </div>
                <div className="grid grid-cols-3 gap-2 items-center">
                  <div className="text-center f-mono text-base font-extrabold" style={{ color: player.peakOverall >= rivalOvr ? C.amberBright : C.chalkDim }}>{player.peakOverall}</div>
                  <div className="text-center f-mono text-[8px] uppercase tracking-wide" style={{ color: C.chalkDim }}>Peak OVR</div>
                  <div className="text-center f-mono text-base font-extrabold" style={{ color: rivalOvr >= player.peakOverall ? C.amberBright : C.chalkDim }}>{rivalOvr}</div>
                  <div className="text-center f-mono text-base font-extrabold" style={{ color: (player.nationalCaps || 0) >= player.rival.caps ? C.amberBright : C.chalkDim }}>{player.nationalCaps || 0}</div>
                  <div className="text-center f-mono text-[8px] uppercase tracking-wide" style={{ color: C.chalkDim }}>Nat'l Caps</div>
                  <div className="text-center f-mono text-base font-extrabold" style={{ color: player.rival.caps >= (player.nationalCaps || 0) ? C.amberBright : C.chalkDim }}>{player.rival.caps}</div>
                </div>
              </div>
            </div>
          );
        })()}

        {careerSummary.totalAwards.length > 0 && (
          <div className="mb-5">
            <div className="f-mono text-[10px] uppercase tracking-widest mb-2" style={{ color: C.chalkDim }}>Career Season Awards</div>
            <div className="flex flex-wrap gap-1.5 justify-center">
              {careerSummary.totalAwards.map(a => (
                <span key={a.id} className="f-mono text-[10px] px-2 py-0.5 rounded-xl" style={{ background: "rgba(250,204,21,0.14)", color: C.trophyGold, border: `1px solid ${C.line}` }}>
                  {a.count}× {LEAGUE_AWARD_META[a.id] ? LEAGUE_AWARD_META[a.id].short : a.id}
                </span>
              ))}
            </div>
          </div>
        )}

        {careerSummary.national && (
          <div className="mb-5 text-left">
            <div className="f-mono text-[10px] uppercase tracking-widest mb-2 text-center" style={{ color: C.chalkDim }}>National Team Career</div>
            <div className="p-3 rounded-xl" style={{ background: C.ink3, border: `1px solid ${C.gold}` }}>
              <div className="flex items-center justify-between mb-2">
                <span className="f-display text-xs uppercase" style={{ color: C.chalk }}>🇲🇾 Malaysia</span>
                <span className="f-mono text-[9px]" style={{ color: C.chalkDim }}>
                  {careerSummary.national.games || 0} {careerSummary.national.games === 1 ? "game" : "games"} played
                </span>
              </div>
              <div className="grid grid-cols-7 gap-1">
                {[["PPG", careerSummary.national.avg.ppg], ["RPG", careerSummary.national.avg.rpg], ["APG", careerSummary.national.avg.apg], ["SPG", careerSummary.national.avg.spg], ["BPG", careerSummary.national.avg.bpg], ["FG%", careerSummary.national.avg.fgPct], ["3P%", careerSummary.national.avg.threePct]].map(([lbl, val]) => (
                  <div key={lbl} className="text-center">
                    <div className="f-mono text-[11px] font-bold" style={{ color: C.gold }}>{val}</div>
                    <div className="f-mono text-[8px] uppercase" style={{ color: C.chalkDim }}>{lbl}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {careerSummary.categories && careerSummary.categories.length > 0 && (
          <div className="mb-6 text-left">
            <div className="f-mono text-[10px] uppercase tracking-widest mb-2 text-center" style={{ color: C.chalkDim }}>Averages By Competition</div>
            <div className="grid grid-cols-1 gap-2">
              {careerSummary.categories.map(cat => {
                const isPro = cat.id === "pro";
                return (
                  <div key={cat.id} className="p-3 rounded-xl" style={{ background: C.ink3, border: `1px solid ${isPro ? C.amber : C.line}` }}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="f-display text-xs uppercase" style={{ color: C.chalk }}>{cat.label}</span>
                      <span className="f-mono text-[9px]" style={{ color: C.chalkDim }}>
                        {cat.perGame && cat.games > 0
                          ? `${cat.seasons} season${cat.seasons === 1 ? "" : "s"} · ${cat.games} games`
                          : `${cat.seasons} appearance${cat.seasons === 1 ? "" : "s"}`}
                      </span>
                    </div>
                    <div className="grid grid-cols-5 gap-1">
                      {[["PPG", cat.avg.ppg], ["RPG", cat.avg.rpg], ["APG", cat.avg.apg], ["SPG", cat.avg.spg], ["BPG", cat.avg.bpg]].map(([lbl, val]) => (
                        <div key={lbl} className="text-center">
                          <div className="f-mono text-xs font-bold" style={{ color: isPro ? C.gold : C.chalk }}>{val}</div>
                          <div className="f-mono text-[8px] uppercase" style={{ color: C.chalkDim }}>{lbl}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {careerSummary.clubs.length > 0 && (
          <div className="mb-6 text-left">
            <div className="f-mono text-[10px] uppercase tracking-widest mb-2 text-center" style={{ color: C.chalkDim }}>Career Averages by Club</div>
            <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
              {careerSummary.clubs.map(c => {
                const [c1, c2] = crestPalette(c.clubName);
                return (
                  <div key={c.clubId} className="p-3 rounded-2xl" style={{ background: `linear-gradient(160deg, ${c1}22, ${c2}11)`, border: `1px solid ${c1}44` }}>
                    <div className="flex items-center gap-2 mb-2">
                      <ClubCrest name={c.clubName} size={30} />
                      <div className="flex-1 min-w-0">
                        <div className="f-display text-xs uppercase truncate" style={{ color: C.chalk }}>{c.clubName}</div>
                        <div className="f-mono text-[9px]" style={{ color: C.chalkDim }}>
                          {c.seasons} {c.seasons === 1 ? "season" : "seasons"}{c.games ? ` · ${c.games} games` : ""}{c.leagues.length ? ` · ${c.leagues.join(", ")}` : ""}
                        </div>
                      </div>
                    </div>
                    {c.titles > 0 && (
                      <div className="mb-2">
                        <span className="f-mono text-[9px] px-1.5 py-0.5 rounded-full inline-flex items-center gap-1" style={{ background: "rgba(250,204,21,0.16)", color: C.trophyGold, border: `1px solid ${C.trophyGold}` }}>
                          <Trophy size={9} /> {c.titles}× Champion
                        </span>
                      </div>
                    )}
                    <div className="grid grid-cols-7 gap-1">
                      {[["PPG", c.avg.ppg], ["RPG", c.avg.rpg], ["APG", c.avg.apg], ["SPG", c.avg.spg], ["BPG", c.avg.bpg], ["FG%", c.avg.fgPct], ["3P%", c.avg.threePct]].map(([lbl, val]) => (
                        <div key={lbl} className="text-center">
                          <div className="f-mono text-[11px] font-bold" style={{ color: C.chalk }}>{val}</div>
                          <div className="f-mono text-[8px] uppercase" style={{ color: C.chalkDim }}>{lbl}</div>
                        </div>
                      ))}
                    </div>
                    {c.awards.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {c.awards.map(a => (
                          <span key={a.id} className="f-mono text-[8.5px] px-1.5 py-0.5 rounded-full" style={{ background: "rgba(250,204,21,0.1)", color: C.trophyGold, border: `1px solid ${C.line}` }}>
                            {a.count > 1 ? `${a.count}× ` : ""}{LEAGUE_AWARD_META[a.id] ? LEAGUE_AWARD_META[a.id].short : a.id}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {player.history.length > 0 && (
          <div className="mb-6 text-left">
            <div className="f-mono text-[10px] uppercase tracking-widest mb-2 text-center" style={{ color: C.chalkDim }}>Full Career Timeline</div>
            <CareerLedger history={player.history} maxHeight={280} />
          </div>
        )}

        {player.achievements.length > 0 && (
          <div className="flex flex-wrap gap-1.5 justify-center mb-6">
            {player.achievements.map(a => ACHIEVEMENT_META[a] ? <Badge key={a} icon={ACHIEVEMENT_META[a].icon}>{ACHIEVEMENT_META[a].label}</Badge> : null)}
          </div>
        )}

        <div className="grid grid-cols-2 gap-3 mb-3">
          <SecondaryButton full onClick={handleSaveImage}>
            <Download size={13} className="inline mr-1" />
            {cardStatus === "saving" ? "Saving…" : cardStatus === "saved" ? "Saved!" : "Save Image"}
          </SecondaryButton>
          <SecondaryButton full onClick={handleShareImage}>
            <Share2 size={13} className="inline mr-1" />
            {cardStatus === "sharing" ? "Sharing…" : "Share"}
          </SecondaryButton>
        </div>
        {cardStatus === "error" && (
          <p className="f-body text-[11px] mb-3" style={{ color: C.red }}>Couldn't generate the image — try again.</p>
        )}

        <PrimaryButton full onClick={onPlayAgain}>
          <RotateCcw size={13} className="inline mr-1" /> Start a New Career
        </PrimaryButton>
        <div className="mt-2.5 grid grid-cols-2 gap-2.5">
          <SecondaryButton full onClick={onViewHallOfFame}>🏛️ Hall of Fame</SecondaryButton>
          <SecondaryButton full onClick={onViewAchievements}>🏆 Achievements</SecondaryButton>
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------
   MAIN APP
--------------------------------------------------------- */
export default function App() {
  const [screen, setScreen] = useState("start");
  const [player, setPlayer] = useState(null);
  const [savedGame, setSavedGame] = useState(null);
  const [banner, setBanner] = useState(null);
  const [currentEvent, setCurrentEvent] = useState(null);
  const [pending, setPending] = useState({ trainingText: "" });
  const [summary, setSummary] = useState(null);
  const [u15Selected, setU15Selected] = useState(false);
  const [a17Selected, setA17Selected] = useState(false);
  const [clubOffers, setClubOffers] = useState([]);
  const [clubOfferContext, setClubOfferContext] = useState({ mode: "join" });
  // Which offer is currently being negotiated — transient UI state, same
  // tier as clubOffers/clubOfferContext, never persisted onto the player.
  const [negotiatingOffer, setNegotiatingOffer] = useState(null);
  const [nationalEvent, setNationalEvent] = useState(null);
  const [nationalTryout, setNationalTryout] = useState(null);
  const usedEvents = useRef([]);

  // Storage: uses window.storage when available (Claude.ai artifact runtime),
  // and falls back to plain browser localStorage everywhere else — this is
  // what makes the save system work once deployed to a normal webpage.
  const hasArtifactStorage = typeof window !== "undefined" && window.storage && typeof window.storage.get === "function";

  useEffect(() => {
    (async () => {
      try {
        if (hasArtifactStorage) {
          const res = await window.storage.get("career", false);
          if (res && res.value) setSavedGame(normalizePlayer(JSON.parse(res.value)));
        } else if (typeof window !== "undefined" && window.localStorage) {
          const raw = window.localStorage.getItem("hoops_life_career");
          if (raw) setSavedGame(normalizePlayer(JSON.parse(raw)));
        }
      } catch (e) { /* no save yet */ }
    })();
  }, []);

  /* Saves are fire-and-forget: nothing in the UI awaits the result, so the
     serialize + write is deferred out of the current frame. Previously a
     ~40KB stringify + synchronous localStorage write happened inline during
     state updates, which showed up as stutter on longer careers. */
  /* These read + JSON.parse from localStorage. Called inline in JSX they ran
     on every render while their screen was open, and returned a fresh object
     each time — which also defeated memoisation downstream. Recomputed only
     when the screen actually changes. */
  const galleryData = useMemo(
    () => (screen === "achievement_gallery" ? loadAchievementGallery() : null),
    [screen]
  );
  const hofData = useMemo(
    () => (screen === "hall_of_fame" ? loadHallOfFame() : null),
    [screen]
  );

  /* True once the player has signed at least one professional contract.
     Used to stop the "Turning Pro / Choose Your First Club" headline
     reappearing every time a veteran becomes a free agent. */
  const hasTurnedProBefore = (p) =>
    !!(p && ((p.clubHistory && p.clubHistory.length > 0) ||
             (p.achievements && p.achievements.includes("turned_pro"))));
  const joinOrFreeAgent = (p, extra = {}) =>
    ({ mode: hasTurnedProBefore(p) ? "free_agent" : "join", ...extra });

  const saveTimer = useRef(null);
  const save = (p) => {
    if (saveTimer.current) clearTimeout(saveTimer.current);
    const snapshot = p;
    saveTimer.current = setTimeout(async () => {
      try {
        // Deferred with the write: this reads + parses + writes localStorage,
        // which was still blocking the main thread on any season that
        // unlocked an achievement.
        syncAchievementGallery(snapshot);
        const json = JSON.stringify(snapshot);
        if (hasArtifactStorage) {
          await window.storage.set("career", json, false);
        } else if (typeof window !== "undefined" && window.localStorage) {
          window.localStorage.setItem("hoops_life_career", json);
        }
      } catch (e) {}
    }, 0);
  };
  const clearSave = async () => {
    try {
      if (hasArtifactStorage) {
        await window.storage.delete("career", false);
      } else if (typeof window !== "undefined" && window.localStorage) {
        window.localStorage.removeItem("hoops_life_career");
      }
    } catch (e) {}
  };

  const handleStart = (data) => {
    let p = newPlayer(data);
    // Frame first, then attributes — body modifiers shape the starting
    // spread the player is allocating on top of.
    setPlayer(p);
    save(p);
    setScreen("body_setup");
  };

  const handleConfirmBody = ({ height, weight, wingspan }) => {
    // Re-clamp server-side rather than trusting the slider bounds, so the
    // limits hold even if the values arrive from an edited save.
    const hh = clamp(height, BODY_LIMITS.height[0], BODY_LIMITS.height[1]);
    const ww = clamp(weight, BODY_LIMITS.weight[0], BODY_LIMITS.weight[1]);
    const ws = clampWingspan(hh, wingspan);
    const reach = ws - hh;
    let p = { ...player, stats: { ...player.stats }, height: hh, weight: ww, wingspan: ws, reach };
    const mods = bodyModifiers({ height, weight, reach, position: p.position });
    STAT_LIST.forEach(k => { p.stats[k] = clamp(p.stats[k] + (mods[k] || 0), 1, 99); });
    p.seasonPoints = computeSeasonPoints(p, 0);
    p.creationBuild = true;
    setPlayer(p);
    save(p);
    setScreen("choose_identity");
  };

  // Playing style is picked once, right after body, before the first
  // attribute allocation — permanent for the career. Purely a flavor tag;
  // see the PLAYING_STYLES block comment for what it deliberately doesn't
  // touch.
  const handleChooseIdentity = (styleId) => {
    const p = { ...player, playingStyle: styleId };
    setPlayer(p);
    save(p);
    setScreen("name_rival");
  };

  // Player-customized rival — name and position are theirs to set (an
  // empty name or no position picked falls back to a random one inside
  // rollRival, so this is never a blocking requirement).
  const handleNameRival = (rivalName, rivalPosition) => {
    const p = { ...player, rival: rollRival(player.position, player.hometown, rivalName, rivalPosition) };
    setPlayer(p);
    save(p);
    setScreen("creation_build");
  };

  // Runs once the creation allocation is confirmed — this is the original
  // handleStart body, now gated behind the attribute builder.
  const runU15Selection = (basePlayer) => {
    let p = { ...basePlayer, creationBuild: false, seasonPoints: 0 };
    const tier = getStateTier(p.hometown);
    const chance = U15_SELECTION_CHANCE[tier];
    const selected = Math.random() < chance;
    setU15Selected(selected);
    if (selected) {
      const u15Stats = generateU15TournamentStats(p.stats, p.position, p.height);
      const teamResult = weightedPick(U15_TEAM_RESULT_OPTIONS_BY_TIER[tier]);
      const teamMeta = U15_TEAM_RESULT_META[teamResult.id];
      const awardIds = rollU15Awards(u15Stats, teamResult.id);

      let popGain = 8 + teamMeta.popularity;
      const achievements = [...p.achievements, "u15_rep"];
      if (teamMeta.achId) achievements.push(teamMeta.achId);
      awardIds.forEach(id => {
        achievements.push(U15_AWARD_META[id].achId);
        popGain += U15_AWARD_META[id].popularity;
      });

      // Winning any individual award (stat-leader, Player of the Tournament, or Final MVP)
      // is an automatic lock for the national youth shortlist.
      const nationalShortlisted = awardIds.length > 0 || Math.random() < computeShortlistChance(u15Stats, awardIds, teamResult.id, p.highlyTalented);

      p = {
        ...p,
        popularity: clamp(p.popularity + popGain),
        morale: clamp(p.morale + 10 + awardIds.length * 2),
        achievements,
        u15Stats,
        u15Awards: awardIds,
        u15TeamResult: teamResult.id,
        nationalShortlisted,
        history: [...p.history, { age: p.age, tierLabel: "U15 State Rep", note: `Selected as a ${p.hometown} state representative; finished as ${teamMeta.label} at the National U15 Championship.`, tournament: "National U15 Championship", category: "u15", stats: u15Stats, awards: awardIds }],
      };
      if (teamResult.id === "runner_up" && Math.random() < CLUTCH_TRIGGER_CHANCE) {
        p.pendingClutchMoment = {
          historyIndex: p.history.length - 1,
          upgradeMeta: U15_TEAM_RESULT_META.champion,
          previousMeta: U15_TEAM_RESULT_META.runner_up,
          resumeScreen: "u15_result",
          clutchEventId: pick(CLUTCH_EVENTS).id,
        };
        setPlayer(p);
        save(p);
        setScreen("clutch_moment");
        return;
      }
    } else {
      p = {
        ...p,
        morale: clamp(p.morale - 5),
        history: [...p.history, { age: p.age, tierLabel: "Not Selected", note: `Missed the cut for ${p.hometown}'s National U15 Championship squad.` }],
      };
    }
    setPlayer(p);
    setScreen("u15_result");
    save(p);
  };

  const handleConfirmCreationBuild = (alloc) => {
    let p = { ...player, stats: { ...player.stats } };
    STAT_LIST.forEach(s => {
      const g = (alloc && alloc[s]) || 0;
      if (g > 0) p.stats[s] = clamp(p.stats[s] + g, 1, 99);
    });
    runU15Selection(p);
  };

  const handleU15TournamentContinue = () => {
    setBanner(null);
    setScreen(player.nationalShortlisted ? "u15_shortlist" : "hub");
  };

  const handleAcceptBootcamp = () => {
    let p = { ...player, stats: { ...player.stats } };
    const gains = {};
    STAT_LIST.forEach(s => {
      const g = randInt(2, 6);
      p.stats[s] = clamp(p.stats[s] + g, 1, 99);
      gains[s] = g;
    });
    p.popularity = clamp(p.popularity + randInt(10, 18));
    p.morale = clamp(p.morale + 5);
    p.fatigue = clamp(p.fatigue + 40);

    let injuryText = null;
    if (Math.random() < 0.25) {
      const injStat = pick(["athleticism", "defense", "rebounding"]);
      const loss = randInt(3, 7);
      p.stats[injStat] = clamp(p.stats[injStat] - loss, 1, 99);
      p.fatigue = clamp(p.fatigue + 20);
      injuryText = `An overuse injury during the intense camp schedule cost you some ${STAT_META[injStat].label.toLowerCase()}.`;
    }

    p.achievements = Array.from(new Set([...p.achievements, "national_shortlist", "bukit_jalil_alumnus"]));
    p.history = [...p.history, {
      age: p.age, tierLabel: "Bukit Jalil Camp",
      note: injuryText ? "Completed 3 months at Bukit Jalil Sports School — picked up a knock along the way." : "Completed 3 months of elite training at Bukit Jalil Sports School.",
    }];
    p.bootcampGains = gains;
    p.bootcampInjury = injuryText;

    setPlayer(p);
    setScreen("u15_bootcamp_result");
    save(p);
  };

  const handleDeclineBootcamp = () => {
    let p = { ...player, relationships: { ...player.relationships } };
    p.relationships.family = clamp(p.relationships.family + 5);
    p.achievements = Array.from(new Set([...p.achievements, "national_shortlist"]));
    p.history = [...p.history, { age: p.age, tierLabel: "Shortlisted", note: "Turned down the Bukit Jalil Sports School invite to stay close to home." }];
    setPlayer(p);
    setBanner("You were shortlisted for the national youth pool but chose to stay home this time.");
    setScreen("hub");
    save(p);
  };

  // Resolves the age-16 branch: Bukit Jalil alumni -> U16 national team,
  // everyone else (and U16 non-selections) -> U17 jumpclass trial.
  const resolveAge16 = (base) => {
    let p = { ...base, stats: { ...base.stats } };
    const trainedBukitJalil = (p.achievements || []).includes("bukit_jalil_alumnus");

    // --- Option 1: U16 national selection for Bukit Jalil alumni ---
    if (trainedBukitJalil && Math.random() < (p.highlyTalented ? U16_SELECTION_CHANCE_PRODIGY : U16_SELECTION_CHANCE)) {
      const u16Stats = generateU16TournamentStats(p.stats, p.position, p.height);
      const qualified = Math.random() < U16_QUALIFY_CHANCE;
      let resultId;
      if (qualified) {
        resultId = weightedPick(U16_ASIACUP_RESULT_OPTIONS).id;
      } else {
        resultId = weightedPick(U16_QUALIFIER_EXIT_OPTIONS).id;
      }
      const resultMeta = U16_RESULT_META[resultId];
      const tot = Math.random() < U16_TOT_CHANCE;

      let popGain = 12 + resultMeta.popularity + (tot ? 14 : 0);
      // Qualifying to the Asia Cup itself boosts development + fame.
      const gains = {};
      if (qualified) {
        STAT_LIST.forEach(s => {
          const g = randInt(1, 3);
          p.stats[s] = clamp(p.stats[s] + g, 1, 99);
          gains[s] = g;
        });
        popGain += 6;
      }
      if (tot) {
        STAT_LIST.forEach(s => { const g = randInt(1, 2); p.stats[s] = clamp(p.stats[s] + g, 1, 99); gains[s] = (gains[s] || 0) + g; });
      }

      // These same players also compete in the National U17 Tournament this
      // year — different months, same calendar year — playing up against
      // genuine 17-year-olds. Output sits between a jumpclass invite and a
      // true 17yo, per generateU16NationalU17Stats.
      const natU17Stats = generateU16NationalU17Stats(p.stats, p.position, p.height);
      const tier = getStateTier(p.hometown);
      const natU17TeamResult = weightedPick(A17_TEAM_RESULT_OPTIONS_BY_TIER[tier]);
      const natU17TeamMeta = A17_TEAM_RESULT_META[natU17TeamResult.id];
      const natU17Awards = rollU15Awards(natU17Stats, natU17TeamResult.id);
      const natU17Achievements = [];
      if (natU17TeamMeta.achId) natU17Achievements.push(natU17TeamMeta.achId);
      natU17Awards.forEach(id => {
        natU17Achievements.push(A17_AWARD_META[id].achId);
        popGain += A17_AWARD_META[id].popularity;
      });
      popGain += 5 + natU17TeamMeta.popularity;

      const achievements = Array.from(new Set([
        ...p.achievements, "u16_national", ...(qualified ? ["u16_asia_cup"] : []), ...(tot ? ["u16_tot"] : []),
        ...natU17Achievements,
      ]));
      p = {
        ...p,
        popularity: clamp(p.popularity + popGain),
        morale: clamp(p.morale + 8 + (qualified ? 5 : 0) + (tot ? 5 : 0)),
        achievements,
        age16Path: "u16",
        age16Qualified: qualified,
        age16TOT: tot,
        age16Stats: u16Stats,
        age16ResultLabel: resultMeta.label,
        age16Gains: gains,
        age16NatU17Stats: natU17Stats,
        age16NatU17ResultLabel: natU17TeamMeta.label,
        age16NatU17Awards: natU17Awards,
        history: [
          ...p.history,
          { age: 16, tierLabel: "U16 National Team", note: `Represented Malaysia U16 at the FIBA U16 Asia Cup Qualifiers — ${resultMeta.label}.`, tournament: "FIBA U16 Asia Cup", category: "u16", stats: u16Stats, awards: (tot ? ["u16_tot"] : []) },
          { age: 16, tierLabel: "National U17 Tournament", note: `Also turned out for ${p.hometown} at the National U17 Tournament this year — finished as ${natU17TeamMeta.label}${natU17Stats.outstanding ? ", standing out against players a year older." : "."}`, tournament: "National U17 Tournament", category: "u17", stats: natU17Stats, awards: natU17Awards },
        ],
      };
      const u16HistoryIndex = p.history.length - 2; // the U16 Asia Cup entry specifically, before MSSM potentially appends more
      // Being a Malaysia youth national representative auto-qualifies for MSSM too.
      p = resolveMSSM(p, true);
      // So close to the quarter-finals — a knockout-game clutch moment can
      // still push the campaign into the QF instead of a 10th-place finish.
      if (resultId === "place_10" && Math.random() < CLUTCH_TRIGGER_CHANCE) {
        p.pendingClutchMoment = {
          historyIndex: u16HistoryIndex,
          upgradeMeta: U16_RESULT_META.quarterfinal,
          previousMeta: U16_RESULT_META.place_10,
          resumeScreen: "age16_u16_result",
          clutchEventId: pick(CLUTCH_EVENTS).id,
        };
        setPlayer(p);
        save(p);
        setScreen("clutch_moment");
        return;
      }
      setPlayer(p);
      save(p);
      setScreen("age16_u16_result");
      return;
    }

    // --- Option 2: U17 jumpclass trial (non-alumni, or U16 non-selection) ---
    if (Math.random() < U17_JUMPCLASS_CHANCE) {
      const u17Stats = generateU17TournamentStats(p.stats, p.position, p.height);
      const tier = getStateTier(p.hometown);
      const teamResult = weightedPick(U17_TEAM_RESULT_OPTIONS_BY_TIER[tier]);
      const teamMeta = U17_TEAM_RESULT_META[teamResult.id];
      const awardIds = rollU17Awards(u17Stats);

      let popGain = 6 + teamMeta.popularity;
      awardIds.forEach(id => { popGain += U15_AWARD_META[id].popularity; });
      // Underage experience still develops the player a little.
      const gains = {};
      STAT_LIST.forEach(s => { const g = randInt(1, 3); p.stats[s] = clamp(p.stats[s] + g, 1, 99); gains[s] = g; });

      const achievements = Array.from(new Set([
        ...p.achievements, "u17_jumpclass",
        ...(teamMeta.achId ? [teamMeta.achId] : []),
        ...awardIds.map(id => U15_AWARD_META[id].achId),
      ]));
      p = {
        ...p,
        popularity: clamp(p.popularity + popGain),
        morale: clamp(p.morale + 6 + awardIds.length * 2),
        achievements,
        age16Path: "u17",
        age16Stats: u17Stats,
        age16Awards: awardIds,
        age16ResultLabel: teamMeta.label,
        age16Gains: gains,
        history: [...p.history, { age: 16, tierLabel: "U17 Jumpclass", note: `Played up a year at the National U17 Championship — ${teamMeta.label}.`, tournament: "National U17 Championship", stats: u17Stats, awards: awardIds }],
      };
      // Selected for a National U17 squad -> auto-qualifies for MSSM too.
      p = resolveMSSM(p, true);
      setPlayer(p);
      save(p);
      setScreen("age16_u17_result");
      return;
    }

    // --- Neither path: quiet development year, MSSM still possible on its own merits ---
    p = resolveMSSM(p, false);
    setPlayer(p);
    save(p);
    if (p.mssmPendingReveal) {
      setScreen("mssm_result");
    } else {
      setBanner("At 16, you keep grinding at state level — no national call-up this year, but the work continues.");
      setScreen("hub");
    }
  };

  const handleAge16Continue = () => {
    setBanner(null);
    setScreen(player.mssmPendingReveal ? "mssm_result" : "hub");
  };

  // Resolves the age-17 branch: National U17 Championship, mirroring U15.
  const resolveAge17 = (base) => {
    let p = { ...base, stats: { ...base.stats } };
    const tier = getStateTier(p.hometown);
    const selected = Math.random() < A17_SELECTION_CHANCE[tier];
    setA17Selected(selected);

    // Taiwanese HBL programmes scout the National U17 Championship itself —
    // they're evaluating what they see on court in that tournament, so a
    // player who didn't even make the state squad has nothing for scouts to
    // judge. Eligibility now requires actually playing in the tournament
    // (selected === true), on top of the usual ability threshold.
    // HBL eligibility is decided AFTER the tournament resolves — scouts are
    // judging awards, team run and stat line, none of which exist yet here.
    let hblEligible = false;
    let hblOfferIds = null;

    if (selected) {
      const a17Stats = generateU15TournamentStats(p.stats, p.position, p.height);
      const teamResult = weightedPick(A17_TEAM_RESULT_OPTIONS_BY_TIER[tier]);
      const teamMeta = A17_TEAM_RESULT_META[teamResult.id];
      const awardIds = rollU15Awards(a17Stats, teamResult.id);

      let popGain = 8 + teamMeta.popularity;
      const achievements = [...p.achievements, "a17_rep"];
      if (teamMeta.achId) achievements.push(teamMeta.achId);
      awardIds.forEach(id => {
        achievements.push(A17_AWARD_META[id].achId);
        popGain += A17_AWARD_META[id].popularity;
      });

      const a17Shortlisted = awardIds.length > 0 || Math.random() < computeA17ShortlistChance(a17Stats, awardIds, teamResult.id, p.highlyTalented);

      // Taiwanese scouts decide on the strength of the tournament itself.
      hblEligible = Math.random() < hblOfferChance(computeOverall(p.stats, p.position), awardIds, teamResult.id);
      // Only a subset of programmes have an import slot open in any given
      // year, rolled once here so the shortlist stays stable across renders.
      hblOfferIds = hblEligible ? sampleN(HBL_TEAMS, HBL_OFFER_COUNT).map(t => t.id) : null;

      p = {
        ...p,
        popularity: clamp(p.popularity + popGain),
        morale: clamp(p.morale + 10 + awardIds.length * 2),
        achievements,
        a17Stats,
        a17Awards: awardIds,
        a17TeamResult: teamResult.id,
        a17Shortlisted,
        pendingHblOffer: hblEligible,
        hblOfferIds,
        history: [...p.history, { age: 17, tierLabel: "U17 State Rep", note: `Selected as a ${p.hometown} state representative; finished as ${teamMeta.label} at the National U17 Championship.`, tournament: "National U17 Championship", category: "u17", stats: a17Stats, awards: awardIds }],
      };
      const a17HistoryIndex = p.history.length - 1; // capture before MSSM potentially appends more
      // Selected for the National U17 squad -> auto-qualifies for MSSM too.
      p = resolveMSSM(p, true);
      if (teamResult.id === "runner_up" && Math.random() < CLUTCH_TRIGGER_CHANCE) {
        p.pendingClutchMoment = {
          historyIndex: a17HistoryIndex,
          upgradeMeta: A17_TEAM_RESULT_META.champion,
          previousMeta: A17_TEAM_RESULT_META.runner_up,
          resumeScreen: "a17_result",
          clutchEventId: pick(CLUTCH_EVENTS).id,
        };
        setPlayer(p);
        save(p);
        setScreen("clutch_moment");
        return;
      }
      setPlayer(p);
      save(p);
      setScreen("a17_result");
    } else {
      p = {
        ...p,
        morale: clamp(p.morale - 5),
        pendingHblOffer: hblEligible,
        hblOfferIds,
        history: [...p.history, { age: 17, tierLabel: "Not Selected", note: `Missed the cut for ${p.hometown}'s National U17 Championship squad.` }],
      };
      // Still gets a shot at MSSM on its own merits.
      p = resolveMSSM(p, false);
      setPlayer(p);
      save(p);
      setScreen("a17_result");
    }
  };

  // Every branch of the age-17 chain (tournament -> MSSM -> shortlist ->
  // bootcamp) funnels through here on its way back to the hub, so the HBL
  // offer is shown exactly once no matter which route the player took.
  const routeAfterAge17 = (p) => {
    if (p && p.pendingHblOffer) { setScreen("hbl_offers"); return true; }
    return false;
  };

  const handleA17TournamentContinue = () => {
    setBanner(null);
    if (player.mssmPendingReveal) { setScreen("mssm_result"); return; }
    if (player.a17Shortlisted) { setScreen("a17_shortlist"); return; }
    if (routeAfterAge17(player)) return;
    setScreen("hub");
  };

  const handleAcceptA17Bootcamp = () => {
    let p = { ...player, stats: { ...player.stats } };
    const gains = {};
    STAT_LIST.forEach(s => {
      const g = randInt(2, 6);
      p.stats[s] = clamp(p.stats[s] + g, 1, 99);
      gains[s] = g;
    });
    p.popularity = clamp(p.popularity + randInt(10, 18));
    p.morale = clamp(p.morale + 5);
    p.fatigue = clamp(p.fatigue + 40);

    let injuryText = null;
    if (Math.random() < 0.25) {
      const injStat = pick(["athleticism", "defense", "rebounding"]);
      const loss = randInt(3, 7);
      p.stats[injStat] = clamp(p.stats[injStat] - loss, 1, 99);
      p.fatigue = clamp(p.fatigue + 20);
      injuryText = `An overuse injury during the intense camp schedule cost you some ${STAT_META[injStat].label.toLowerCase()}.`;
    }

    p.achievements = Array.from(new Set([...p.achievements, "a17_shortlist", "bukit_jalil_alumnus"]));
    p.u18Eligible = true;
    p.history = [...p.history, {
      age: p.age, tierLabel: "Bukit Jalil Camp",
      note: injuryText ? "Completed another 3 months at Bukit Jalil Sports School — picked up a knock along the way." : "Completed another 3 months of elite training at Bukit Jalil Sports School.",
    }];
    p.bootcampGains = gains;
    p.bootcampInjury = injuryText;

    setPlayer(p);
    setScreen("a17_bootcamp_result");
    save(p);
  };

  const handleDeclineA17Bootcamp = () => {
    let p = { ...player, relationships: { ...player.relationships } };
    p.relationships.family = clamp(p.relationships.family + 5);
    p.achievements = Array.from(new Set([...p.achievements, "a17_shortlist"]));
    p.history = [...p.history, { age: p.age, tierLabel: "Shortlisted", note: "Turned down the U18 Bukit Jalil invite to stay close to home." }];
    setPlayer(p);
    setBanner("You were shortlisted for the U18 national pool but chose to stay home this time.");
    save(p);
    if (routeAfterAge17(p)) return;
    setScreen("hub");
  };

  const handleA17Continue = () => {
    setBanner(null);
    if (routeAfterAge17(player)) return;
    setScreen("hub");
  };

  const handleHblSeasonContinue = () => {
    let p = { ...player };
    const next = p.age18NextScreen || "age18_result";
    p.hblResultPending = false;
    p.age18NextScreen = null;
    setPlayer(p);
    save(p);
    setBanner(null);
    setScreen(next);
  };

  const handleAcceptUbaOffer = (team, role) => {
    let p = { ...player };
    p.pendingUbaOffer = false;
    p.ubaOffers = null;
    p.uba = true;
    p.ubaEver = true;
    p.ubaTeamId = team.id;
    p.ubaTeamName = team.name;
    p.ubaRole = role;
    p.ubaYearsLeft = UBA_YEARS;
    p.teamName = team.name;
    // A scholarship is not a pro contract — no club, no wage.
    p.clubId = null; p.league = null; p.semiProClub = null;
    p.contractSalary = 0; p.contractYearsLeft = 0;
    p.starterStatus = role;
    p.morale = clamp(p.morale + 10);
    p.popularity = clamp(p.popularity + 6);
    p.achievements = Array.from(new Set([...p.achievements, "uba_scholar"]));
    p.history = [...p.history, {
      age: p.age, tierLabel: "UBA Scholarship",
      note: `Accepted a four-year scholarship at ${team.name} (${team.cn}) in the Taiwan UBA — joining as a ${role.toLowerCase()}.`,
    }];
    setPlayer(p);
    save(p);
    setBanner(`Scholarship signed with ${team.name}. Four years of UBA basketball ahead.`);
    setScreen("hub");
  };

  const handleDeclineUbaOffer = () => {
    let p = { ...player };
    p.pendingUbaOffer = false;
    p.ubaOffers = null;
    p.history = [...p.history, {
      age: p.age, tierLabel: "UBA Offer",
      note: "Turned down the Taiwan UBA scholarships to come home and start a professional career in Malaysia.",
    }];
    const offers = generateClubOffers(p, { count: 3, firstProSigning: true });
    p.achievements = Array.from(new Set([...p.achievements, "turned_pro"]));
    setPlayer(p);
    save(p);
    setClubOffers(offers);
    setClubOfferContext({ mode: "join" });
    setScreen("club_offers");
  };

  const handleAcceptHblOffer = (team) => {
    let p = { ...player, stats: { ...player.stats } };
    p.pendingHblOffer = false;
    p.hblOfferIds = null;
    p.hblTeamId = team.id;
    p.hblTeamName = team.name;
    p.hblSeasonPending = true;   // the season itself is played at 18
    p.hblEver = true;
    // Committing to an overseas programme locks in the U18 national call-up.
    p.u18Eligible = true;
    p.morale = clamp(p.morale + 12);
    p.popularity = clamp(p.popularity + 10);
    p.achievements = Array.from(new Set([...p.achievements, "hbl_import"]));
    p.history = [...p.history, {
      age: 17, tierLabel: "HBL Signing",
      note: `Accepted a student-athlete place at ${team.name} (${team.cn}) in ${team.city} — heading to Taiwan for a season in the HBL.`,
    }];
    setPlayer(p);
    save(p);
    setBanner(`You're off to Taiwan with ${team.name}. One year of HBL eligibility awaits.`);
    setScreen("hub");
  };

  const handleDeclineHblOffer = () => {
    let p = { ...player, relationships: { ...player.relationships } };
    p.pendingHblOffer = false;
    p.hblOfferIds = null;
    p.relationships.family = clamp(p.relationships.family + 6);
    p.history = [...p.history, {
      age: 17, tierLabel: "HBL Offer",
      note: "Turned down the Taiwan HBL student-athlete offer to keep developing at home in Malaysia.",
    }];
    setPlayer(p);
    save(p);
    setBanner("You turned down Taiwan and stayed in Malaysia.");
    setScreen("hub");
  };

  // Resolves the age-18 branch: U18 national team -> FIBA U18 Asia Cup.
  // Only reached by players who accepted the U18 Bukit Jalil bootcamp.
  const resolveAge18 = (base) => {
    let p = { ...base, stats: { ...base.stats } };
    const wentHbl = !!p.hblSeasonPending;
    // An HBL season gets its own recap screen before the U18 result;
    // finish() defers whatever screen would normally come next.
    const finish = (pp, nextScreen) => {
      if (pp.hblResultPending) {
        pp.age18NextScreen = nextScreen;
        setPlayer(pp); save(pp); setScreen("hbl_season"); return;
      }
      setPlayer(pp); save(pp); setScreen(nextScreen);
    };

    // --- Taiwan HBL season (age 18, single year of eligibility) ---
    if (wentHbl) {
      const hblStats = generateHblSeasonStats(p.stats, p.position, p.height);
      const games = randInt(HBL_GAMES_MIN, HBL_GAMES_MAX);
      const teamResult = weightedPick(A17_TEAM_RESULT_OPTIONS_BY_TIER[2]);
      const teamMeta = A17_TEAM_RESULT_META[teamResult.id];
      // Starters get a real shot at the individual honours, judged on the
      // same statistical bar as the National U17 Championship.
      const awardIds = rollU15Awards(hblStats, teamResult.id);
      const hblAwardAch = {
        top_scorer: "hbl_top_scorer", top_rebounder: "hbl_top_rebounder",
        top_assists: "hbl_top_assists", top_steals: "hbl_top_steals",
        top_blocks: "hbl_top_blocks", pot: "hbl_mvp", final_mvp: "hbl_mvp",
      };
      const ach = [...p.achievements];
      if (teamResult.id === "champion") ach.push("hbl_champion");
      awardIds.forEach(id => { if (hblAwardAch[id]) ach.push(hblAwardAch[id]); });

      // Stamina-first Taiwanese programme: the season leaves the player
      // FRESHER than they started, unlike a domestic grind.
      p.fatigue = clamp(p.fatigue - HBL_FATIGUE_RECOVERY, 0, 100);
      p.popularity = clamp(p.popularity + 8 + teamMeta.popularity + awardIds.length * 3);
      p.morale = clamp(p.morale + 8 + awardIds.length * 2);
      // Better coaching + more minutes than staying home: faster development.
      const hblGains = {};
      STAT_LIST.forEach(s => {
        const g = randInt(HBL_GROWTH_BONUS_MIN, HBL_GROWTH_BONUS_MAX);
        p.stats[s] = clamp(p.stats[s] + g, 1, 99);
        hblGains[s] = g;
      });
      p.achievements = Array.from(new Set(ach));
      p.hblStats = hblStats;
      p.hblAwards = awardIds;
      p.hblGames = games;
      p.hblTeamResult = teamResult.id;
      p.hblGains = hblGains;
      p.hblResultPending = true;   // show the HBL recap before the U18 screen
      p.hblSeasonPending = false;
      // Finishing an HBL season puts the player on Taiwanese university
      // radars — scholarship offers land the following year.
      p.pendingUbaOffer = true;
      p.ubaOffers = sampleN(UBA_TEAMS, UBA_OFFER_COUNT).map(t => ({
        id: t.id,
        role: Math.random() < t.starterChance ? "Starter" : "Rotation",
      }));
      p.history = [...p.history, {
        age: 18, tierLabel: "Taiwan HBL",
        note: `Starting year at ${p.hblTeamName} in the Taiwan HBL — ${games} games, finished as ${teamMeta.label}.`,
        tournament: `Taiwan HBL · ${p.hblTeamName}`, category: "hbl",
        stats: hblStats, awards: awardIds, games,
        champion: teamResult.id === "champion" || undefined,
      }];
    }

    // Made the U18 national squad? HBL imports are guaranteed a place.
    if (wentHbl || Math.random() < (base.highlyTalented ? U18_SELECTION_CHANCE_PRODIGY : U18_SELECTION_CHANCE)) {
      const u18Stats = generateU18TournamentStats(p.stats, p.position, p.height);
      const qualified = Math.random() < U18_QUALIFY_CHANCE;
      const resultId = qualified
        ? weightedPick(U18_ASIACUP_RESULT_OPTIONS).id
        : weightedPick(U18_QUALIFIER_EXIT_OPTIONS).id;
      const resultMeta = U18_RESULT_META[resultId];
      const tot = Math.random() < U18_TOT_CHANCE;

      let popGain = 14 + resultMeta.popularity + (tot ? 16 : 0);
      const gains = {};
      if (qualified) {
        STAT_LIST.forEach(s => { const g = randInt(1, 3); p.stats[s] = clamp(p.stats[s] + g, 1, 99); gains[s] = g; });
        popGain += 7;
      }
      if (tot) {
        STAT_LIST.forEach(s => { const g = randInt(1, 2); p.stats[s] = clamp(p.stats[s] + g, 1, 99); gains[s] = (gains[s] || 0) + g; });
      }

      const achievements = Array.from(new Set([...p.achievements, "u18_national", ...(qualified ? ["u18_asia_cup"] : []), ...(tot ? ["u18_tot"] : [])]));
      p = {
        ...p,
        popularity: clamp(p.popularity + popGain),
        morale: clamp(p.morale + 8 + (qualified ? 5 : 0) + (tot ? 5 : 0)),
        achievements,
        age18Made: true,
        age18Qualified: qualified,
        age18TOT: tot,
        age18Stats: u18Stats,
        age18ResultLabel: resultMeta.label,
        age18Gains: gains,
        history: [...p.history, { age: 18, tierLabel: "U18 National Team", note: `Represented Malaysia U18 at the FIBA U18 Asia Cup Qualifiers — ${resultMeta.label}.`, tournament: "FIBA U18 Asia Cup", category: "u18", stats: u18Stats, awards: (tot ? ["u18_tot"] : []) }],
      };
      const u18HistoryIndex = p.history.length - 1;
      p.age18MssmResolved = true;
      // Being a Malaysia youth national representative auto-qualifies for MSSM too.
      p = resolveMSSM(p, true);
      // So close to the quarter-finals — a knockout-game clutch moment can
      // still push the campaign into the QF instead of a 10th-place finish.
      if (resultId === "place_10" && Math.random() < CLUTCH_TRIGGER_CHANCE) {
        p.pendingClutchMoment = {
          historyIndex: u18HistoryIndex,
          upgradeMeta: U18_RESULT_META.quarterfinal,
          previousMeta: U18_RESULT_META.place_10,
          resumeScreen: "age18_result",
          clutchEventId: pick(CLUTCH_EVENTS).id,
        };
        finish(p, "clutch_moment");
        return;
      }
      finish(p, "age18_result");
      return;
    }

    // Didn't make the final national cut.
    p = {
      ...p,
      age18Made: false,
      morale: clamp(p.morale - 4),
      history: [...p.history, { age: 18, tierLabel: "U18 Trials", note: "Trained with the U18 national pool but didn't make the final squad for the Asia Cup Qualifiers." }],
    };
    p.age18MssmResolved = true;
    // Still gets a shot at MSSM on its own merits.
    p = resolveMSSM(p, false);
    finish(p, "age18_result");
  };

  // After an age-18 youth event resolves, an 18-year-old who hasn't signed yet
  // goes straight to their first pro/semi-pro contract offers; otherwise, hub.
  const proceedFromYouthEvent = () => {
    setBanner(null);
    const p = player;
    if (p && p.age >= 18 && p.stage === "pro" && !p.abroad && !p.clubId) {
      // A player returning from the HBL chooses between a Taiwanese
      // university scholarship and a Malaysian contract — never both.
      if (p.pendingUbaOffer) { setPlayer(p); save(p); setScreen("uba_offers"); return; }
      const offers = generateClubOffers(p, { count: 3, firstProSigning: true });
      const np = { ...p, achievements: Array.from(new Set([...p.achievements, "turned_pro"])) };
      setPlayer(np);
      save(np);
      setClubOffers(offers);
      setClubOfferContext({ mode: "join" });
      setScreen("club_offers");
      return;
    }
    setScreen("hub");
  };

  const handleAge18Continue = () => {
    if (player.mssmPendingReveal) { setBanner(null); setScreen("mssm_result"); return; }
    proceedFromYouthEvent();
  };

  // Shared continue handler for the MSSM reveal screen — routes to whatever
  // would normally come next for the player's current context (U17 shortlist,
  // first pro contract offers, or just back to the hub).
  const handleMSSMContinue = () => {
    let p = { ...player };
    p.mssmPendingReveal = false;
    setBanner(null);
    if (p.age === 17 && p.a17Shortlisted) {
      setPlayer(p);
      save(p);
      setScreen("a17_shortlist");
      return;
    }
    if (p.age >= 18 && p.stage === "pro" && !p.abroad && !p.clubId) {
      // A player returning from the HBL chooses between a Taiwanese
      // university scholarship and a Malaysian contract — never both.
      if (p.pendingUbaOffer) { setPlayer(p); save(p); setScreen("uba_offers"); return; }
      const offers = generateClubOffers(p, { count: 3, firstProSigning: true });
      const np = { ...p, achievements: Array.from(new Set([...p.achievements, "turned_pro"])) };
      setPlayer(np);
      save(np);
      setClubOffers(offers);
      setClubOfferContext({ mode: "join" });
      setScreen("club_offers");
      return;
    }
    setPlayer(p);
    save(p);
    if (p.age === 17 && routeAfterAge17(p)) return;
    setScreen("hub");
  };

  const handleDeclineTryout = () => {
    let p = { ...player };
    const ph = nationalTryout?.event?.phase;
    p.history = [...p.history, { age: p.age, tierLabel: "NT Tryout", note: ph ? `Turned down the national tryout for the Asia Cup Qualifiers (Phase ${ph}) to focus on the club season.` : "Turned down the national team tryout to focus on the club season." }];
    setPlayer(p);
    save(p);
    setNationalTryout(null);
    // A declined call-up doesn't cancel any OTHER tournament this year.
    if (resolveNextNationalEvent(p)) return;
    if (!goHubOrPendingClub(p, "You skipped the national tryout this time.")) {
      setBanner("You skipped the national tryout this time.");
      setScreen("hub");
    }
  };

  const handleAttendTryout = () => {
    let p = { ...player, stats: { ...player.stats } };
    const natEvent = nationalTryout.event;
    const rating = nationalTryout.rating;
    const eliteRating = rating > 70;
    // Squad selection: >80 rating is a lock (100%); everyone else is 65% —
    // unless they already won MVP or Team of the Tournament this season,
    // which guarantees a squad spot regardless of rating.
    const squadChance = (eliteRating || nationalTryout.wonMvpOrTot) ? 1.0 : NT_MAKE_SQUAD_CHANCE;
    // Standout-performance chance: tiered by rating. 100% lock above 83,
    // 60% above 81, 30% for the existing elite band (>70), 10% otherwise.
    const standoutChance = rating > 83 ? 1.0 : rating > 81 ? 0.60 : eliteRating ? 0.30 : 0.10;
    const madeSquad = Math.random() < squadChance;

    if (!madeSquad) {
      p.morale = clamp(p.morale - 4);
      p.history = [...p.history, { age: p.age, tierLabel: "NT Trials", note: natEvent.type === "sea_games" ? "Attended national trials for the SEA Games but didn't make the final squad." : natEvent.type === "qualifier" ? `Attended national trials for the Asia Cup Qualifiers (Phase ${natEvent.phase}) but didn't make the final squad.` : "Attended the national tryout but didn't make the Asia Cup squad." }];
      setPlayer(p);
      save(p);
      setNationalTryout(null);
      // Missing out on one squad doesn't rule you out of the other event.
      if (resolveNextNationalEvent(p)) return;
      setBanner("You didn't make the national squad this time — keep pushing.");
      setScreen("hub");
      return;
    }

    // Made the squad — role is set by rating tier, and the generated stats
    // follow that role (First Option gets the most usage, Bench the least).
    let ntRole;
    if (rating >= 85) ntRole = "First Option";
    else if (rating >= 80) ntRole = "Starter";
    else if (rating >= 75) ntRole = "Rotation";
    else ntRole = "Bench"; // 71-74, and the floor for anyone below that too

    const standout = Math.random() < standoutChance;
    const nStats = natEvent.type === "sea_games"
      ? generateSeaGamesStats(p.stats, p.position, p.height, ntRole, standout)
      : generateNationalStats(p.stats, p.position, p.height, ntRole, standout);
    p.nationalTeam = true;
    p.nationalCaps = (p.nationalCaps || 0) + 1;
    let label, resultNote, achId, popGain, ntGames, qualified = null, qf = null;
    const isSea = natEvent.type === "sea_games";
    if (isSea) {
      const res = rollSeaGamesPlacement();
      label = `SEA Games — ${res.label}`;
      achId = res.achId;
      popGain = res.pop;
      ntGames = randInt(res.games[0], res.games[1]);
      const medal = res.place <= 3;
      resultNote = medal
        ? `Won ${res.label.toLowerCase()} with Malaysia (${ntRole}) at the SEA Games${standout ? ", and was one of the tournament's standout players." : "."}`
        : `Represented Malaysia (${ntRole}) at the SEA Games, finishing ${res.label.toLowerCase()}${standout ? " — with a standout individual campaign." : "."}`;
      if (medal) p.achievements = Array.from(new Set([...p.achievements, "sea_games"]));
    } else if (natEvent.type === "qualifier") {
      label = `Asia Cup Qualifiers — Phase ${natEvent.phase}`;
      resultNote = `Represented Malaysia (${ntRole}) in the FIBA Asia Cup Qualifiers (Phase ${natEvent.phase})${standout ? " — and turned in a standout performance." : "."}`;
      achId = "nt_qualifier"; popGain = 10; ntGames = randInt(3, 5);
    } else {
      qualified = Math.random() < NT_QUALIFY_CHANCE;
      if (qualified) {
        qf = Math.random() < NT_QUARTERFINAL_CHANCE;
        if (qf) { label = "FIBA Asia Cup — Quarter-Finalist"; achId = "nt_quarterfinal"; popGain = 25; ntGames = randInt(6, 8); }
        else { const place = randInt(10, 12); label = `FIBA Asia Cup — ${place}th Place`; achId = "nt_asia_cup"; popGain = 18; ntGames = randInt(5, 6); }
        resultNote = `Played for Malaysia (${ntRole}) at the FIBA Asia Cup — ${label.split("— ")[1]}${standout ? ", with a standout campaign." : "."}`;
      } else {
        label = "Asia Cup — Did Not Qualify";
        resultNote = `Malaysia fell short in the qualifiers and missed the Asia Cup finals this cycle. You played your part as the squad's ${ntRole.toLowerCase()}.`;
        achId = "nt_qualifier"; popGain = 8; ntGames = randInt(3, 5);
      }
    }
    if (standout) popGain += 6;
    p.popularity = clamp(p.popularity + popGain);
    p.morale = clamp(p.morale + 6);
    if (achId) p.achievements = Array.from(new Set([...p.achievements, achId]));
    p.history = [...p.history, { age: p.age, tierLabel: "🇲🇾 Malaysia", note: resultNote, tournament: label, stats: nStats, national: true, games: ntGames }];
    p.achievements = checkAchievements(p);
    // So close to the quarter-finals — a chance for a knockout-game clutch
    // moment to still push the campaign into the QF instead.
    if (!isSea && qualified && !qf && Math.random() < CLUTCH_TRIGGER_CHANCE) {
      p.pendingClutchMoment = {
        historyIndex: p.history.length - 1,
        upgradeMeta: { label: "FIBA Asia Cup — Quarter-Finalist", noteText: "Quarter-Finalist", achId: "nt_quarterfinal", popularity: 25 },
        previousMeta: { label, noteText: label.split("— ")[1], achId, popularity: popGain },
        resumeScreen: "national_result",
        clutchEventId: pick(CLUTCH_EVENTS).id,
        natEventPatch: { stats: nStats, phase: natEvent.phase, type: natEvent.type },
      };
      setPlayer(p);
      save(p);
      setNationalTryout(null);
      setScreen("clutch_moment");
      return;
    }
    setPlayer(p);
    save(p);
    setNationalTryout(null);
    setNationalEvent({ label, stats: nStats, phase: natEvent.phase, type: natEvent.type });
    setScreen("national_result");
  };

  const handleChooseStudy = () => {
    let p = { ...player, stats: { ...player.stats } };
    const oldClub = p.clubId ? getClub(p.clubId) : null;
    p.clubId = null;
    p.starterStatus = null;
    p.contractSalary = 0;
    p.contractYearsLeft = 0;
    p.league = null;
    p.studying = true;
    p.achievements = Array.from(new Set([...p.achievements, "student_athlete"]));
    p.history = [...p.history, {
      age: 19, tierLabel: "Continuing Study",
      note: oldClub
        ? `You leave ${oldClub.name} to balance university with basketball — semi-pro clubs and the development leagues only, until you graduate at 23.`
        : "You choose to balance university with basketball — semi-pro clubs and the development leagues only, until you graduate at 23.",
    }];
    const offers = generateClubOffers(p, { count: 3 });
    setPlayer(p);
    save(p);
    setClubOffers(offers);
    setClubOfferContext({ mode: "join", studyTrack: true });
    setScreen("club_offers");
  };

  const handleFocusBasketball = () => {
    let p = { ...player };
    p.history = [...p.history, { age: 19, tierLabel: "Focused on Basketball", note: "You turn down the university offer to focus fully on your basketball career." }];
    setPlayer(p);
    save(p);
    setScreen("hub");
  };

  const handleJoinClub = (offer) => {
    // offer = { club, terms: { league, role, salary, firstOption, semiPro } }
    const club = offer.club;
    const terms = offer.terms || computeClubTerms(player, club, { firstProSigning: !player.league });
    let p = { ...player, stats: { ...player.stats } };
    const semiPro = terms.semiPro;

    p.clubId = club.id;
    p.teamName = club.name;
    p.starterStatus = terms.role;
    p.abroad = false;
    p.semiProClub = semiPro ? club.id : null;
    p.league = terms.league;
    p.mblContributor = terms.league === "mbl";
    p.clubHistory = Array.from(new Set([...(p.clubHistory || []), club.id]));
    p.relationships = { ...p.relationships, coach: 50, team: 50 };
    p.morale = clamp(p.morale + 6);
    // Fresh locker room, fresh clock — a Trade Request needs at least one
    // full season at the club it's aimed at, so this resets on every signing.
    p.seasonsAtClub = 0;

    // Wonderkid flag / MBL debut badge.
    if (p.__proWonderkid && terms.league === "mbl") {
      p.wonderkid = true;
      p.achievements = Array.from(new Set([...p.achievements, "wonderkid"]));
    }
    if (terms.league === "mbl" && !p.achievements.includes("mbl_debut")) {
      p.achievements = Array.from(new Set([...p.achievements, "mbl_debut"]));
    }

    // Build the signing note.
    const leagueShort = LEAGUE[terms.league].short;
    const years = terms.years || CONTRACT_TERM_YEARS;
    let note = semiPro
      ? `Signed a ${years}-year semi-pro deal with ${club.name} as a ${terms.role.toLowerCase()} in the ${leagueShort}`
      : `Signed a ${years}-year deal with ${club.name} as a ${terms.role.toLowerCase()} in the ${leagueShort}`;
    if (p.wonderkid && terms.league === "mbl") note += " — a rare wonderkid breakthrough";
    if (terms.firstOption && terms.league !== "mbl") note += ", and as one of the few West-side imports you're the first offensive option";
    if (club.marketingClub) p.popularity = clamp(p.popularity + 12);
    if (club.strictCoach) note += ". The legendary coach runs a tight ship";

    // Lock the contract at the exact salary + length shown in the offer.
    p.contractSalary = terms.salary;
    p.contractYearsLeft = years;
    note += `. (${rm(p.contractSalary)}/month)`;

    // Clear the one-time offer-preview rolls now that a choice is made.
    delete p.__proSplitLeague; delete p.__proSplitRole; delete p.__proWonderkid; delete p.__offerFirstOption;

    p.history = [...p.history, { age: p.age, tierLabel: "Signed", note }];
    p.achievements = checkAchievements(p);
    if (p.clubHistory.length === 1 && p.age >= 30) {
      p.achievements = Array.from(new Set([...p.achievements, "club_loyal"]));
    }

    setPlayer(p);
    save(p);
    setBanner(note);
    setScreen("hub");
  };

  const handleStartNegotiate = (club, terms) => {
    setNegotiatingOffer({ club, terms });
    setScreen("negotiate_offer");
  };

  // Resolves a negotiation attempt. WIN signs immediately with the improved
  // terms — reuses handleJoinClub directly rather than duplicating its
  // achievement/history/salary-lock logic, so a negotiated signing goes
  // through the exact same path a normal one does, just with better terms.
  // HOLD and WALK both return to the offer list without signing anything.
  //
  // The Coach Trust cost only applies on HOLD/WALK, not WIN — handleJoinClub
  // already resets coach/team to a neutral 50/50 on any new signing (a
  // fresh locker room), so a penalty applied before calling it would just
  // be silently overwritten. It only actually persists — and only actually
  // matters — when nothing gets signed this click.
  const handleCommitNegotiation = (askType) => {
    const { club, terms } = negotiatingOffer;
    // Defensive: "role" is only ever a real ask when there's a next tier to
    // reach (the UI already hides the option otherwise, but this handler
    // shouldn't rely on that being the only way it's ever called).
    const effectiveAsk = (askType === "role" && !nextRoleTier(terms.role)) ? "money" : askType;
    const score = negotiationLeverage(player, club);
    const { winChance, walkChance } = negotiationOdds(score, effectiveAsk);
    const roll = Math.random();

    if (roll < winChance) {
      let newTerms = { ...terms };
      if (effectiveAsk === "money") {
        newTerms.salary = Math.round(terms.salary * randFloat(1.15, 1.30));
      } else {
        const newRole = nextRoleTier(terms.role);
        newTerms.role = newRole;
        newTerms.salary = contractMonthlySalary({ leagueId: terms.league, role: newRole, club, semiPro: terms.semiPro });
      }
      setNegotiatingOffer(null);
      handleJoinClub({ club, terms: newTerms });
      return;
    }

    let p = { ...player, relationships: { ...player.relationships, coach: clamp(player.relationships.coach - 4) } };
    setNegotiatingOffer(null);
    if (roll < winChance + walkChance) {
      setClubOffers(prev => prev.filter(o => o.club.id !== club.id));
      setBanner(`${club.name} pulls the offer — they've moved on to another name on the board.`);
    } else {
      setBanner(`${club.name} holds firm. The original offer's still on the table.`);
    }
    setPlayer(p);
    save(p);
    setScreen("club_offers");
  };

  const handleRequestTrade = () => setScreen("trade_request");

  // Resolves a trade request into one of four outcomes. GRANT_WELL and
  // GRANT_POORLY both reuse the exact "transfer"/"released" club-offer
  // context modes that mid-contract transfers and releases already use —
  // same screen, same flavor headers, nothing new to build there. Only
  // DENY_SOFT/DENY_HARSH keep the player in place, with a cooldown either
  // way so this can't just be retried every season until it works.
  const handleCommitTradeRequest = (reason) => {
    const club = getClub(player.clubId);
    const caseStrength = tradeRequestCase(player, club, reason);
    const { grantWell, grantPoorly, denyHarsh } = tradeRequestOutcome(caseStrength, player);
    const roll = Math.random();
    let p = { ...player, relationships: { ...player.relationships }, stats: { ...player.stats } };

    if (roll < grantWell) {
      const offers = generateClubOffers(p, { count: 3, excludeId: club.id });
      p.history = [...p.history, { age: p.age, tierLabel: "Transfer Granted", note: `${club.name} agrees to hear offers — word is a few clubs have already been asking.` }];
      p.achievements = checkAchievements(p);
      setPlayer(p);
      save(p);
      setClubOffers(offers);
      setClubOfferContext({ mode: "transfer", oldClubName: club.name });
      setScreen("club_offers");
      return;
    }
    if (roll < grantWell + grantPoorly) {
      const offers = generateClubOffers(p, { count: 3, excludeId: club.id });
      const oldClubName = club.name;
      p.clubId = null; p.teamName = null; p.starterStatus = null;
      p.contractSalary = 0; p.contractYearsLeft = 0; p.semiProClub = null;
      p.history = [...p.history, { age: p.age, tierLabel: "Released", note: `"You want out? Don't let the door hit you." ${oldClubName} releases you outright — no say in where you land next.` }];
      p.achievements = checkAchievements(p);
      setPlayer(p);
      save(p);
      setClubOffers(offers);
      setClubOfferContext({ mode: "released", oldClubName });
      setScreen("club_offers");
      return;
    }

    // Denied, either way — the cooldown is what stops this from just being
    // retried every season until the dice cooperate.
    p.tradeRequestCooldown = 2;
    if (roll < grantWell + grantPoorly + denyHarsh) {
      const downgraded = player.starterStatus === "Starter" ? "Rotation" : player.starterStatus === "Rotation" ? "Bench" : player.starterStatus;
      p.starterStatus = downgraded;
      p.contractSalary = contractMonthlySalary({ leagueId: player.league, role: downgraded, club, semiPro: !!player.semiProClub });
      p.relationships.coach = clamp(p.relationships.coach - 10);
      setBanner(`"Asking to leave? Fine — you can ask for minutes too." ${club.name} heard you, and isn't pretending otherwise.`);
    } else {
      p.relationships.coach = clamp(p.relationships.coach - 4);
      setBanner(`${club.name} says no. You're under contract, and they're not in the business of favors.`);
    }
    setPlayer(p);
    save(p);
    setScreen("hub");
  };

  const handleStayClub = () => {
    let p = { ...player };
    const club = getClub(p.clubId);
    p.morale = clamp(p.morale + 4);
    p.relationships = { ...p.relationships, coach: clamp(p.relationships.coach + 3), team: clamp(p.relationships.team + 3) };
    // Use the exact same terms calculation shown in the preview (ClubOffersScreen's
    // "Stay at X for RM.../mo" button) — previously this recomputed salary from the
    // player's stale stored role instead of the freshly-rolled one shown on screen,
    // so the applied role/salary could silently differ from what was displayed.
    const terms = computeClubTerms(p, club, { firstProSigning: false });
    p.starterStatus = terms.role;
    p.league = terms.league;
    p.contractSalary = terms.salary;
    p.contractYearsLeft = terms.years;
    p.history = [...p.history, { age: p.age, tierLabel: "Re-signed", note: `Re-signed a ${terms.years}-year deal with ${club.name} as a ${terms.role.toLowerCase()} — ${rm(p.contractSalary)}/month.` }];
    setPlayer(p);
    save(p);
    setBanner(`You re-signed with ${club.name} at ${rm(p.contractSalary)}/month.`);
    setScreen("hub");
  };

  const handleContinue = async () => {
    const p = normalizePlayer(savedGame);
    // Same safety net as the season-continue flow: never load into the hub
    // with a clubless pro player stuck with no way to sign.
    if (p && p.stage === "pro" && !p.abroad && !p.clubId) {
      const veteran = hasTurnedProBefore(p);
      const offers = generateClubOffers(p, { count: 3, firstProSigning: !veteran && !p.league });
      const np = veteran ? p : { ...p, achievements: Array.from(new Set([...p.achievements, "turned_pro"])) };
      setPlayer(np);
      save(np);
      setClubOffers(offers);
      setClubOfferContext(joinOrFreeAgent(np));
      setScreen("club_offers");
      return;
    }
    setPlayer(p);
    setScreen("hub");
  };

  const handlePlaySeason = () => {
    setBanner(null);
    setScreen("offseason_plan");
  };

  /* Off-season plan — the one meaningful choice in front of attribute
     spending. Every effect reuses an existing field or an existing
     mechanism rather than inventing a new one: popularity/fatigue/money/
     relationships are the same fields every event choice already touches;
     the injury-chance discount reuses Rest & Recover's own flag pattern
     from the Recovery Plan system; the overseas guarantee reuses the exact
     flag "Play to impress" sets, since a probability nudge on that specific
     roll is documented as having ~no effect once already eligible (88%
     baseline compounds to ~100% either way — only a guarantee is felt).
     Season points are computed here (not in handlePlaySeason) so a plan's
     point adjustment applies before the training screen ever renders. */
  const handleOffseasonPlan = (planId) => {
    let p = { ...player, relationships: { ...player.relationships } };
    const basePts = computeSeasonPoints(p, p.lastPerfBonus || 0);
    let ptsAdjust = 0;
    let note = "";

    if (planId === "summer") {
      p.popularity = clamp(p.popularity + 6);
      p.fatigue = clamp(p.fatigue + 10);
      p.pendingGuaranteedOverseasOffer = true;
      note = "Summer League gets you in front of a bigger crowd. ";
    } else if (planId === "camp") {
      // Sponsored, not costed, for anyone without real income — the exact
      // same population Commercial Tour already excludes for the opposite
      // reason (age < 18, or on an HBL/UBA scholarship). Previously this
      // charged everyone RM 4,000 regardless, which for a student with
      // p.money already at 0 just silently clamped to "free" with no
      // acknowledgment — same outcome, but accidental rather than earned,
      // and with no flavor explaining why a broke 16-year-old could still
      // afford a trip abroad.
      const noIncome = p.age < 18 || p.hblSeasonPending || p.uba;
      p.relationships.coach = clamp(p.relationships.coach + 5);
      ptsAdjust = 2;
      if (noIncome) {
        const tier = TIER_META[getStateTier(p.hometown)];
        note = tier.name === "Tier 1"
          ? `Sponsored by ${p.hometown}'s Elite Programme — an intensive camp abroad, working with international coaches. `
          : `Family and school pitch in to cover the trip — an intensive camp abroad, working with international coaches. `;
      } else {
        const cost = 4000;
        p.money = Math.max(0, p.money - cost);
        note = "An intensive camp abroad, working with international coaches. ";
      }
    } else if (planId === "rest") {
      p.fatigue = clamp(p.fatigue - 25);
      p.restedOffseason = true;
      ptsAdjust = -2;
      note = "A genuine off-season — properly rested, for once. ";
    } else if (planId === "tour") {
      p.money += 8000;
      p.popularity = clamp(p.popularity + 10);
      p.relationships.team = clamp(p.relationships.team - 4);
      note = "A commercial tour — good money, though not everyone in the locker room loves the spotlight. ";
    }

    p.seasonPoints = Math.max(1, basePts + ptsAdjust);
    p.offseasonPlan = planId;
    setPending(prev => ({ ...prev, offseasonNote: note }));
    setPlayer(p);
    save(p);
    setScreen("training");
  };

  /* Resolves the next pending national call-up for this season. Returns
     true if it took over the screen (so the caller must stop), false if
     there was nothing to do. Called both inline during the season and
     again after a national result screen closes, so a second event in
     the same year still gets played. */
  const resolveNextNationalEvent = (p) => {
    // ---- Senior national team: FIBA Asia Cup qualifiers & finals ----
    // Runs by calendar year. Players overseas are 100% guaranteed to play in
    // every national team game — no tryout roll, straight to the squad.
    // Domestic players get a tryout offered at 65+ rating, OR guaranteed if
    // the player won ANY award this season. The PLAYER decides whether to
    // attend; squad selection & the tournament resolve after that.
    // A season can carry more than one call-up (e.g. SEA Games + an Asia Cup
    // qualifier window). Seed the queue once per season, then take the next
    // pending event; whatever remains is resolved after this screen closes.
    if (!p.natQueueYear || p.natQueueYear !== p.year) {
      p.natQueueYear = p.year;
      p.natQueue = nationalEventsForYear(p.year);
    }
    const natEvent = (p.natQueue && p.natQueue.length) ? p.natQueue[0] : null;
    if (natEvent) p.natQueue = p.natQueue.slice(1);
    if (natEvent && p.age >= 18 && !p.retired && p.abroad) {
      const overallOs = computeOverall(p.stats, p.position);
      let ntRole;
      if (overallOs >= 85) ntRole = "First Option";
      else if (overallOs >= 80) ntRole = "Starter";
      else if (overallOs >= 75) ntRole = "Rotation";
      else ntRole = "Bench";
      const standout = Math.random() < (overallOs > 80 ? 0.30 : 0.10);
      const isSea = natEvent.type === "sea_games";
      const nStats = isSea
        ? generateSeaGamesStats(p.stats, p.position, p.height, ntRole, standout)
        : generateNationalStats(p.stats, p.position, p.height, ntRole, standout);
      p.nationalTeam = true;
      p.nationalCaps = (p.nationalCaps || 0) + 1;
      let label, resultNote, achId, popGain, ntGames, qualified = null, qf = null;
      if (isSea) {
        const res = rollSeaGamesPlacement();
        label = `SEA Games — ${res.label}`;
        achId = res.achId;
        popGain = res.pop;
        ntGames = randInt(res.games[0], res.games[1]);
        const medal = res.place <= 3;
        resultNote = medal
          ? `Won ${res.label.toLowerCase()} with Malaysia (${ntRole}) at the SEA Games${standout ? ", and was one of the tournament's standout players." : "."}`
          : `Represented Malaysia (${ntRole}) at the SEA Games, finishing ${res.label.toLowerCase()}${standout ? " — with a standout individual campaign." : "."}`;
        // Every medallist also banks the generic SEA Games appearance badge.
        if (medal) p.achievements = Array.from(new Set([...p.achievements, "sea_games"]));
      } else if (natEvent.type === "qualifier") {
        label = `Asia Cup Qualifiers — Phase ${natEvent.phase}`;
        resultNote = `Represented Malaysia (${ntRole}) in the FIBA Asia Cup Qualifiers (Phase ${natEvent.phase}) — flying in from ${p.teamName || "overseas"}${standout ? ", and turned in a standout performance." : "."}`;
        achId = "nt_qualifier"; popGain = 10; ntGames = randInt(3, 5);
      } else {
        qualified = Math.random() < NT_QUALIFY_CHANCE;
        if (qualified) {
          qf = Math.random() < NT_QUARTERFINAL_CHANCE;
          if (qf) { label = "FIBA Asia Cup — Quarter-Finalist"; achId = "nt_quarterfinal"; popGain = 25; ntGames = randInt(6, 8); }
          else { const place = randInt(10, 12); label = `FIBA Asia Cup — ${place}th Place`; achId = "nt_asia_cup"; popGain = 18; ntGames = randInt(5, 6); }
          resultNote = `Played for Malaysia (${ntRole}) at the FIBA Asia Cup — ${label.split("— ")[1]}${standout ? ", with a standout campaign." : "."}`;
        } else {
          label = "Asia Cup — Did Not Qualify";
          resultNote = "Malaysia fell short in the qualifiers and missed the Asia Cup finals this cycle.";
          achId = "nt_qualifier"; popGain = 8; ntGames = randInt(3, 5);
        }
      }
      if (standout) popGain += 6;
      p.popularity = clamp(p.popularity + popGain);
      p.morale = clamp(p.morale + 6);
      if (achId) p.achievements = Array.from(new Set([...p.achievements, achId]));
      p.history = [...p.history, { age: p.age, tierLabel: "🇲🇾 Malaysia", note: resultNote, tournament: label, stats: nStats, national: true, games: ntGames }];
      p.achievements = checkAchievements(p);
      if (!isSea && qualified && !qf && Math.random() < CLUTCH_TRIGGER_CHANCE) {
        p.pendingClutchMoment = {
          historyIndex: p.history.length - 1,
          upgradeMeta: { label: "FIBA Asia Cup — Quarter-Finalist", noteText: "Quarter-Finalist", achId: "nt_quarterfinal", popularity: 25 },
          previousMeta: { label, noteText: label.split("— ")[1], achId, popularity: popGain },
          resumeScreen: "national_result",
          clutchEventId: pick(CLUTCH_EVENTS).id,
          natEventPatch: { stats: nStats, phase: natEvent.phase, type: natEvent.type },
        };
        setPlayer(p);
        save(p);
        setScreen("clutch_moment");
        return true;
      }
      setPlayer(p);
      save(p);
      setNationalEvent({ label, stats: nStats, phase: natEvent.phase, type: natEvent.type });
      setScreen("national_result");
      return true;
    }
    if (natEvent && p.age >= 18 && !p.retired) {
      const overall = computeOverall(p.stats, p.position);
      const wonAwardThisSeason = (p.lastSeasonLeagueAwards || []).length > 0;
      const wonMvpOrTot = (p.lastSeasonLeagueAwards || []).includes("mvp") || (p.lastSeasonLeagueAwards || []).includes("tot");
      const isDLeague = p.league === "u20" || p.league === "u23";
      const effectiveThreshold = isDLeague ? NT_RATING_THRESHOLD_DLEAGUE : NT_RATING_THRESHOLD;
      if (overall >= effectiveThreshold || wonAwardThisSeason) {
        setPlayer(p);
        save(p);
        setNationalTryout({ event: natEvent, rating: overall, wonAwardThisSeason, wonMvpOrTot });
        setScreen("national_tryout");
        return true;
      }
    }
    return false;
  };

  const handleConfirmTraining = (alloc) => {
    let p = { ...player, stats: { ...player.stats }, fatigue: player.fatigue };
    const parts = [];
    let totalGain = 0;
    STAT_LIST.forEach(s => {
      const g = (alloc && alloc[s]) || 0;
      if (g > 0) {
        p.stats[s] = clamp(p.stats[s] + g, 1, 99);
        parts.push(`${STAT_META[s].label} +${g}`);
        totalGain += g;
      }
    });
    // Fatigue scales with how hard you pushed this season.
    p.fatigue = clamp(p.fatigue + (totalGain > 0 ? Math.min(14, 4 + totalGain) : -20), 0, 100);
    if (totalGain === 0) p.morale = clamp(p.morale + 5);
    p.seasonPoints = 0;
    p.lastPerfBonus = 0;
    const offseasonNote = pending.offseasonNote || "";
    const text = totalGain > 0
      ? `${offseasonNote}Development this season: ${parts.join(", ")}.`
      : `${offseasonNote}You bank the off-season for recovery rather than development.`;
    setPending({ trainingText: text });
    setPlayer(p);

    const stageKey = p.abroad ? "pro" : p.stage;
    // Money/commercial events don't fit a minor or an amateur student-athlete:
    // under-18s can't sign commercial deals, and HBL/UBA scholarship players
    // would forfeit their eligibility by taking paid opportunities.
    const noMoneyEvents = p.age < 18 || !!p.hblSeasonPending || !!p.uba;
    const pool = EVENT_POOL.filter(e => {
      if (!e.stages.includes(stageKey)) return false;
      if (e.financial && noMoneyEvents) return false;
      if (e.minAge && p.age < e.minAge) return false;
      if (e.minOverall && computeOverall(p.stats, p.position) < e.minOverall) return false;
      if (e.notAbroad && p.abroad) return false;
      if (e.requiresClub && !p.clubId) return false;
      if (e.minTeamRelationship != null && p.relationships.team < e.minTeamRelationship) return false;
      if (e.maxTeamRelationship != null && p.relationships.team > e.maxTeamRelationship) return false;
      if (usedEvents.current.includes(e.id)) return false;
      return true;
    });
    const chosenPool = pool.length > 0 ? pool : EVENT_POOL.filter(e => e.stages.includes(stageKey) && !(e.financial && noMoneyEvents));
    const ev = pick(chosenPool);
    usedEvents.current.push(ev.id);
    setCurrentEvent(ev);
    setScreen("event");
  };

  const handleChooseEvent = (rawChoice) => {
    let p = {
      ...player,
      stats: { ...player.stats },
      relationships: { ...player.relationships },
    };

    // Probability-branched choices (new system): roll a weighted outcome tier
    // and treat its deltas/result/achievement as the effective "choice."
    let choice = rawChoice;
    let eventTier = null;
    let eventAchievementLabel = null;
    if (rawChoice.outcomes) {
      const roll = Math.random();
      let cumulative = 0;
      let picked = rawChoice.outcomes[rawChoice.outcomes.length - 1]; // fallback to last tier
      for (const o of rawChoice.outcomes) {
        cumulative += o.chance;
        if (roll < cumulative) { picked = o; break; }
      }
      choice = picked;
      eventTier = picked.tier;
      if (picked.achievement && !p.achievements.includes(picked.achievement)) {
        eventAchievementLabel = ACHIEVEMENT_META[picked.achievement]?.label || null;
      }
    }

    if (choice.stats) Object.entries(choice.stats).forEach(([k, v]) => { p.stats[k] = clamp(p.stats[k] + v, 1, 99); });
    if (choice.relationships) Object.entries(choice.relationships).forEach(([k, v]) => { p.relationships[k] = clamp(p.relationships[k] + v); });
    if (choice.fatigue) p.fatigue = clamp(p.fatigue + choice.fatigue);
    if (choice.morale) p.morale = clamp(p.morale + choice.morale);
    if (choice.popularity) p.popularity = clamp(p.popularity + choice.popularity);
    if (choice.money) p.money = Math.max(0, p.money + choice.money);
    if (choice.flag === "nationalTeam") p.nationalTeam = true;
    // Trade Rumors -> "Request the trade": guarantees a transfer window
    // opens this season (consumed in rollClubEvent, which runs later this
    // same click, further down in handleContinueAfterResult).
    if (choice.flag === "requestTrade") p.pendingForcedTransferRequest = true;
    if (choice.slowStart) p.slowStartNextSeason = true;
    if (choice.achievement) p.achievements = Array.from(new Set([...p.achievements, choice.achievement]));
    // "Play to impress" (overseas_scout event) guarantees this season's
    // overseas-offer check bypasses the usual per-season roll. Carried on
    // the player object since the choice made here is read back later, in a
    // DIFFERENT click (handleContinueAfterResult) — `choice` itself is out
    // of scope there.
    if (choice.guaranteesOverseasOffer) p.pendingGuaranteedOverseasOffer = true;

    const sim = simulateSeason(p);
    p.morale = clamp(p.morale + sim.moraleDelta);
    p.popularity = clamp(p.popularity + sim.popularityDelta);
    p.money += sim.moneyDelta;
    /* Career investments are charged monthly against the contract salary.
       This is what turns money from a scoreboard into a resource — and what
       makes the retirement wealth tier a genuine trade-off. */
    const upkeep = investmentUpkeep(p) * 12;
    if (upkeep > 0) {
      p.money = Math.max(0, p.money - upkeep);
      p.investmentSpend = (p.investmentSpend || 0) + upkeep;
    }
    p.peakOverall = Math.max(p.peakOverall, sim.overall);
    // Season quality feeds next season's attribute-point pool: a breakout
    // year earns you more development points than a season on the bench.
    p.lastPerfBonus = [-2, -1, 0, 2, 4, 6][sim.tier] || 0;

    // Pro players compete in a league (MBL or a D-League) — generate a box score.
    let leagueStats = null;
    let leagueLabel = null;
    let leagueAwards = [];
    let gamesPlayed = null;
    let wonChampionship = false;
    let injury = null;
    let leagueBoard = null;
    let leagueStandings = null;
    let awardRace = null;
    if (p.stage === "pro" && !p.abroad && p.clubId && p.league) {
      const role = p.starterStatus || "Bench";
      leagueStats = generateLeagueSeasonStats(p.stats, p.position, p.league, role, p.height);
      leagueLabel = LEAGUE[p.league].short;

      /* League context: build the NPC pool on first entry, age it every
         season after, then rank the player's line against it. */
      p = ensureNpcPool(p, p.league);
      if (p.npcAgedYear !== p.year) {
        p = ageNpcPool(p, p.league);
        p.npcAgedYear = p.year;
      }
      leagueBoard = buildLeagueBoard(p, p.league, leagueStats);
      awardRace = buildAwardRace(p, p.league, leagueStats, leagueBoard);

      // Games per season: MBL ~30-40, D-Leagues ~20-25.
      const fullGames = p.league === "mbl" ? randInt(30, 40) : randInt(20, 25);

      // Injury risk. A serious injury costs most of the season and lingers into next.
      // Base risk rises with age and fatigue; young, fresh players are safer.
      let injuryChance = 0.06 + Math.max(0, p.age - 30) * 0.015 + Math.max(0, p.fatigue - 60) * 0.002;
      injuryChance = clamp(injuryChance, 0.04, 0.28);
      // Sports science: load management and proper treatment roughly halve
      // how often a season gets derailed.
      if (hasInvestment(p, "science")) injuryChance *= 0.5;
      // A full rehab (Recovery Plan choice, last time out) properly healed
      // rather than just running the clock — one season of reduced risk,
      // then consumed. Rest & Recover (off-season plan) earns the same
      // discount for the same reason — a body that actually got to rest.
      // Tracked as separate flags (different origins) but same discount,
      // and each clears independently so they don't mask one another.
      if (p.recentlyRehabbed) { injuryChance *= 0.7; p.recentlyRehabbed = false; }
      if (p.restedOffseason) { injuryChance *= 0.7; p.restedOffseason = false; }
      if (Math.random() < injuryChance) {
        const serious = Math.random() < 0.45; // ~45% of injuries are season-wrecking
        if (serious) {
          gamesPlayed = Math.max(3, Math.round(fullGames * randFloat(0.15, 0.35)));
          injury = { serious: true, missed: fullGames - gamesPlayed };
          p.slowStartNextSeason = true; // lingers into next year
          p.morale = clamp(p.morale - 15);
          p.fatigue = clamp(p.fatigue + 10);
          // A serious injury now comes with a real recovery decision instead
          // of just a text flag — resolved on an interstitial screen shown
          // after this season's recap, same pattern as a Clutch Moment
          // (compute the season normally, defer only the screen transition).
          p.pendingInjuryDecision = { missed: injury.missed, hasScience: hasInvestment(p, "science") };
        } else {
          gamesPlayed = Math.round(fullGames * randFloat(0.6, 0.85));
          injury = { serious: false, missed: fullGames - gamesPlayed };
          p.morale = clamp(p.morale - 6);
        }
      } else {
        gamesPlayed = fullGames;
      }

      // A slow start (recovering from last year's serious injury) suppresses output.
      if (p.slowStartNextSeason && !injury) {
        ["ppg", "rpg", "apg", "spg", "bpg"].forEach(k => { leagueStats[k] = round1(leagueStats[k] * randFloat(0.7, 0.85)); });
        leagueStats.tr = Math.round(leagueStats.tr * 0.85);
        p.slowStartNextSeason = false; // recovered after one rebuilding year
      }

      // Championship: depends on club prestige, the player's season, and league.
      const club = getClub(p.clubId);
      let titleChance = 0.05 + (club ? (club.prestige / 100) * 0.18 : 0) + (leagueStats.tr / 100) * 0.12;
      if (injury && injury.serious) titleChance *= 0.4; // hard to win while hurt
      titleChance = clamp(titleChance, 0.02, 0.42);
      wonChampionship = Math.random() < titleChance;
      if (wonChampionship) {
        p.popularity = clamp(p.popularity + 10);
        p.morale = clamp(p.morale + 10);
        p.achievements = Array.from(new Set([...p.achievements, p.league === "mbl" ? "mbl_champion" : "dleague_champion"]));
        // MBL titles only, matching how the rival's own title count is
        // tracked (advanceRivalOneSeason only increments r.titles on an
        // MBL win) — keeps the "Settled Score" comparison apples-to-apples.
        if (p.league === "mbl") p.mblTitles = (p.mblTitles || 0) + 1;
      }
      // Built AFTER the title roll — it needs to know whether you won, or the
      // table can show you 4th while the recap calls you champions.
      leagueStandings = buildStandings(p, p.league, leagueStats, (p.year || 2026) * 31 + p.seasonNum, wonChampionship, fullGames);

      // Track whether this is the player's first-ever MBL season (for Rookie of the Year).
      const isFirstMblSeason = p.league === "mbl" && !p.hadMblSeason;
      if (p.league === "mbl") p.hadMblSeason = true;

      leagueAwards = rollLeagueAwards(leagueStats, { leagueId: p.league, role, isFirstMblSeason, board: leagueBoard });

      // Badges from notable seasons.
      if ((p.league === "u20" || p.league === "u23") && leagueStats.tr >= 78) {
        p.achievements = Array.from(new Set([...p.achievements, "dleague_star"]));
      }
      if (p.league === "mbl" && role === "Starter") {
        p.achievements = Array.from(new Set([...p.achievements, "mbl_starter"]));
      }
      // Winning MVP or ROTY is a career milestone worth a permanent badge.
      if (leagueAwards.includes("mvp")) p.achievements = Array.from(new Set([...p.achievements, p.league === "mbl" ? "mbl_mvp" : "dleague_mvp"]));
      if (leagueAwards.includes("roty")) p.achievements = Array.from(new Set([...p.achievements, "mbl_roty"]));
      if (leagueAwards.includes("sixth_man")) p.achievements = Array.from(new Set([...p.achievements, "mbl_sixth_man"]));
      // Popularity bump for winning hardware.
      if (leagueAwards.length) p.popularity = clamp(p.popularity + leagueAwards.length * 3 + (leagueAwards.includes("mvp") ? 8 : 0));
    }

    // University basketball in Taiwan: development-league level production,
    // no wage, and a title race dominated by one programme.
    if (p.stage === "pro" && p.uba && p.ubaTeamId) {
      const team = UBA_TEAMS.find(t => t.id === p.ubaTeamId);
      if (team) {
        const role = p.ubaRole || "Rotation";
        p.starterStatus = role;
        leagueStats = generateUbaSeasonStats(p.stats, p.position, p.height, role);
        leagueLabel = "Taiwan UBA";
        gamesPlayed = randInt(UBA_GAMES_MIN, UBA_GAMES_MAX);
        wonChampionship = Math.random() < team.titleChance;
        if (wonChampionship) {
          p.popularity = clamp(p.popularity + 10);
          p.morale = clamp(p.morale + 10);
          p.achievements = Array.from(new Set([...p.achievements, "uba_champion"]));
        }
        // Only starters carry enough usage to contend for individual honours.
        if (role === "Starter") {
          leagueAwards = rollLeagueAwards(leagueStats, { leagueId: "u23", role });
          if (leagueAwards.includes("mvp")) {
            p.achievements = Array.from(new Set([...p.achievements, "uba_mvp"]));
          }
          if (leagueAwards.length) {
            p.popularity = clamp(p.popularity + leagueAwards.length * 3 + (leagueAwards.includes("mvp") ? 8 : 0));
          }
        }
      }
    }

    // Overseas players compete in their own elite league — same shared
    // variables (leagueStats/leagueLabel/leagueAwards/gamesPlayed) so the
    // season recap and Career Ledger render it exactly like a domestic season.
    if (p.stage === "pro" && p.abroad && p.overseasTierId) {
      const tier = ALL_OVERSEAS_TIERS.find(t => t.id === p.overseasTierId);
      if (tier) {
        let overallOs = computeOverall(p.stats, p.position);
        /* Settling-in dip: a real form penalty in the first season(s) abroad
           for a player whose family isn't supported. Halves each season so it
           fades rather than being permanent. */
        if (p.settlingDip) {
          overallOs = Math.max(1, overallOs - p.settlingDip);
          p.settlingDip = Math.floor(p.settlingDip / 2);
          if (p.settlingDip === 0) p.settledAbroad = true;
        }
        const band = overseasRoleBand(tier, overallOs);
        p.starterStatus = band.role; // role can shift with rating, same as domestic
        leagueStats = generateOverseasStats(p.stats, p.position, p.height, band.role, tier.id);
        leagueLabel = tier.label;
        gamesPlayed = tier.id === "nba" ? randInt(65, 82) : randInt(30, 45); // NBA plays a much longer season
        if (band.awardChance > 0 && Math.random() < band.awardChance) {
          const list = OVERSEAS_AWARDS_BY_POSITION[p.position] || ["All-Star"];
          const award = pick(list);
          leagueAwards = [award];
          p.achievements = Array.from(new Set([...p.achievements, "overseas_award_winner"]));
          p.popularity = clamp(p.popularity + 15);
          p.morale = clamp(p.morale + 10);
        }
      }
    }

    p.history = [...p.history, {
      age: p.age, tierLabel: leagueLabel ? `${leagueLabel} · ${sim.tierLabel}` : sim.tierLabel,
      note: sim.note,
      tournament: leagueLabel
        ? (p.uba
            ? `Taiwan UBA · ${p.ubaTeamName}`
            : p.abroad
              ? `${p.teamName}${p.overseasLeague ? " · " + p.overseasLeague : ""}`
              : `${LEAGUE[p.league].name}${p.teamName ? " · " + p.teamName : ""}`)
        : null,
      stats: leagueStats || undefined,
      clubId: (leagueStats && !p.abroad && !p.uba) ? p.clubId : undefined,
      clubName: leagueStats ? p.teamName : undefined,
      leagueId: (leagueStats && !p.abroad && !p.uba) ? p.league : undefined,
      leagueName: leagueLabel || undefined,
      category: leagueStats ? (p.uba ? "uba" : "pro") : undefined,
      leagueAwards: leagueAwards.length ? leagueAwards : undefined,
      games: gamesPlayed != null ? gamesPlayed : undefined,
      champion: wonChampionship || undefined,
      injury: injury || undefined,
    }];
    p.achievements = checkAchievements(p);
    // Persisted so the next handler (season continue -> national tryout check)
    // can see this season's awards even though it runs in a separate closure.
    p.lastSeasonLeagueAwards = leagueAwards;

    // Display-only shot-composition flavor for the recap box score. Reads
    // leagueStats but never writes to it — the object saved into p.history
    // above is untouched, so nothing here can leak into the Career Timeline
    // record or anything computed from it later.
    const shotProfile = leagueStats ? styleShotProfile(leagueStats, p.playingStyle) : null;
    const styleNote = leagueStats ? styleFlavorNote(p.playingStyle, shotProfile) : null;

    setSummary({
      seasonNum: p.seasonNum,
      trainingText: pending.trainingText,
      eventText: choice.result,
      eventTier, eventAchievementLabel,
      tierLabel: sim.tierLabel,
      note: sim.note,
      moneyDelta: sim.moneyDelta,
      popularityDelta: sim.popularityDelta,
      leagueStats, leagueLabel, leagueAwards, leagueBoard, leagueStandings, awardRace,
      leagueYear: p.year,
      gamesPlayed, wonChampionship, injury,
      playingStyle: p.playingStyle, shotProfile, styleNote,
    });
    setPlayer(p);
    setScreen(p.pendingInjuryDecision ? "injury_recovery" : "result");
  };

  /* The off-season resolution is ~490 lines and runs synchronously: ageing,
     decline, contract events, national team, overseas, retirement. On a
     phone that can block long enough to swallow taps, which is why Continue
     seemed to need 3-4 presses. The ref guards re-entry so a burst of taps
     can't run it twice, and the button below shows a pressed state
     immediately so the tap always registers visually. */
  /* Previously guarded with a 600ms-locked ref (advancingRef) as a second,
     app-level re-entrancy lock on top of ResultScreen's own `advancing`
     state. That extra lock was the actual bug: if it was ever left `true`
     when this ran again (a stray re-entrant call, timer drift), every
     future call became a silent, total no-op — no state change, no error,
     nothing left to retry it, since ResultScreen's button was ALSO already
     disabled. ResultScreen already fully prevents re-entrant calls on its
     own (button disables synchronously on click), so this second lock was
     redundant as well as unsafe. Removed rather than re-timed. */
  const handleContinueAfterResult = useCallback(() => {
    let p = { ...player, stats: { ...player.stats } };
    p.age += 1;
    p.seasonNum += 1;
    p.year = (p.year || (2011 + player.age)) + 1;
    p.fatigue = clamp(p.fatigue - 10);
    // Every authored rival advances one season here, unconditionally — this
    // is the ONE point every season passes through regardless of the
    // player's own league, age or overseas status, which is what lets Next
    // Gen NPCs climb their own ladder even while you're off at U15 trials.
    p = advanceNamedNpcs(p);
    // Same unconditional-every-season pattern as the authored roster above —
    // the rival climbs their own ladder in lockstep with the player's own
    // age, regardless of what screen this season actually routes through.
    if (p.rival) p.rival = advanceRivalOneSeason(p.rival, p.clubId);
    // Trade Request bookkeeping — both reset on a new signing (handleJoinClub),
    // so this only ever ticks forward while actually AT a club, same as the
    // gate that reads them in the Hub's Career tab.
    if (p.clubId) p.seasonsAtClub = (p.seasonsAtClub || 0) + 1;
    if (p.tradeRequestCooldown > 0) p.tradeRequestCooldown -= 1;

    // Natural maturation: every attribute develops each off-season — held
    // back before 23 on purpose, so most players are genuinely still
    // developing through the U23 D-League. From 23-30, there's now also a
    // rare (13%) "star emergence" spike on top of the normal roll — since
    // this applies to ALL six stats (not just the 2 trained ones), it's the
    // main lever that lets a real minority of careers reach overseas-caliber
    // overall (Asia 71+, EuroLeague 78+, NBA 81+) rather than that ceiling
    // being effectively unreachable, while most careers still land well
    // below it — training alone can't get there if the other 4 stats lag.
    // NOTE: with the attribute-point system, development is driven by the
    // points the player spends each season. Maturity growth is kept only as
    // a small "natural physical development" trickle for under-20s — the
    // old curve applied +1-2 to ALL SIX stats every season on top of
    // training, which stacked with points inflates NBA-tier careers from
    // ~2% to ~48%. Points are now the primary lever.
    let matGrowth;
    if (p.age < 18) matGrowth = Math.random() < 0.5 ? 1 : 0;
    else matGrowth = 0;
    if (matGrowth > 0) {
      STAT_LIST.forEach(s => { p.stats[s] = clamp(p.stats[s] + matGrowth, 1, 99); });
    }

    // Study-track bonus: faster IQ growth and lighter fatigue while balancing
    // university with basketball (ages 19-22 inclusive, 4 seasons total).
    if (p.studying && p.age <= STUDY_END_AGE + 1) {
      p.stats.iq = clamp(p.stats.iq + STUDY_IQ_BONUS, 1, 99);
      p.fatigue = clamp(p.fatigue - STUDY_FATIGUE_BONUS);
    }

    let heightMsg = null;
    if (p.heightWillGrow && p.age <= p.heightGrowthCutoff) {
      const grow = randInt(1, 3);
      /* Wingspan has to grow with height. Previously only p.height changed,
         so a spurt silently shrank the player's reach — and a short player
         near the wingspan floor could end up BELOW the legal minimum
         (154cm/150cm span growing to 163cm left a -13 reach against a -6
         limit). Arms grow slightly faster than height in a real spurt, so
         wingspan gains a touch more, then gets clamped to stay legal.
         Cap now matches BODY_LIMITS rather than a stale hard-coded 208. */
      p.height = Math.min(p.height + grow, BODY_LIMITS.height[1]);
      if (p.wingspan != null) {
        const armGrow = grow + (Math.random() < 0.35 ? 1 : 0);
        p.wingspan = clampWingspan(p.height, p.wingspan + armGrow);
        p.reach = p.wingspan - p.height;
      }
      heightMsg = `Growth spurt — you're now ${p.height}cm.`;
    }

    const newStage = getStageForAge(p.age);
    let bannerMsg = null;
    let enteringPro = false;
    if (newStage !== p.stage) {
      p.stage = newStage;
      if (newStage === "pro" && !p.abroad) {
        enteringPro = true; // handled after youth-tournament checks below
      }
    }
    if (heightMsg) bannerMsg = bannerMsg ? `${heightMsg} ${bannerMsg}` : heightMsg;

    if (p.nationalTeam) p.nationalCaps += 1;

    // Age-related decline: the body starts breaking down around 33-34, and the
    // drop-off grows each year. ~20% of players are "slow decliners" who age more
    // gracefully (set once at creation as p.slowDecliner).
    if (p.age >= 33) {
      const yearsPast = p.age - 32;            // 1 at age 33, 2 at 34, ...
      let declinePerStat = 1 + Math.floor(yearsPast * 0.8); // grows each year
      if (p.slowDecliner) declinePerStat = Math.max(1, Math.round(declinePerStat * 0.5));
      // Sports science keeps the body going a year or two longer than it
      // otherwise would.
      if (hasInvestment(p, "science")) declinePerStat = Math.max(1, declinePerStat - 1);
      STAT_LIST.forEach(s => {
        const drop = randInt(Math.max(0, declinePerStat - 1), declinePerStat + 1);
        p.stats[s] = clamp(p.stats[s] - drop, 1, 99);
      });
    }

    // League progression for established pros (not the first-signing season).
    if (p.stage === "pro" && !p.abroad && p.clubId && p.league) {
      const overall = computeOverall(p.stats, p.position);
      const rating = overall * 0.7 + p.popularity * 0.3;
      const club = getClub(p.clubId);
      const atSemiPro = isSemiProClub(club);
      let leagueChanged = false;

      if (atSemiPro) {
        // Semi-pro sides have no MBL team. Player can only move up by signing with a
        // pro club (handled via offers). Keep them in the correct D-League by age,
        // but past 23 a semi-pro club can't keep them at the right level -> free agency.
        if (p.league === "u20" && p.age > 20) { p.league = "u23"; leagueChanged = true; }
        if (p.age > U23_MAX_AGE) {
          // Forced out of the semi-pro D-League system; becomes a free agent.
          const offers = generateClubOffers(p, { count: 3, excludeId: p.clubId });
          p.history = [...p.history, { age: p.age, tierLabel: "Aged Out", note: `At ${p.age}, you've aged out of the ${club.name} development setup — time to find a new club.` }];
          p.clubId = null; p.semiProClub = null; p.starterStatus = null;
          p.contractSalary = 0; p.contractYearsLeft = 0;
          setPlayer(p); save(p);
          setClubOffers(offers);
          setClubOfferContext({ mode: "transfer", oldClubName: club.name, agedOut: true });
          setScreen("club_offers");
          return;
        }
        // Role can still shift with rating even without a league change.
        const freshSemiProRole = computeClubTerms(p, club, { firstProSigning: false }).role;
        if (freshSemiProRole !== p.starterStatus) { p.starterStatus = freshSemiProRole; leagueChanged = true; }
      } else if (p.league !== "mbl" && rating >= MBL_RATING_THRESHOLD) {
        // Earned a real MBL spot with a pro club.
        p.league = "mbl"; p.mblContributor = true;
        p.starterStatus = rating >= MBL_RATING_THRESHOLD + 12 ? "Rotation" : "Bench";
        if (!p.achievements.includes("mbl_debut")) p.achievements = Array.from(new Set([...p.achievements, "mbl_debut"]));
        bannerMsg = `You've earned a spot in the Major Basketball League with ${p.teamName}!`;
        leagueChanged = true;
      } else if (p.league !== "mbl" && p.age > U23_MAX_AGE) {
        // Age 24+: D-Leagues are closed. Move up to the MBL, as bench if not ready.
        p.league = "mbl"; p.mblContributor = true;
        p.starterStatus = rating >= MBL_RATING_THRESHOLD ? "Rotation" : "Bench";
        if (!p.achievements.includes("mbl_debut")) p.achievements = Array.from(new Set([...p.achievements, "mbl_debut"]));
        bannerMsg = `At ${p.age}, you've moved up to the MBL with ${p.teamName}${p.starterStatus === "Bench" ? " — a bench role for now, until your game catches up." : "."}`;
        leagueChanged = true;
      } else if (p.league === "u20" && p.age > 20) {
        p.league = "u23"; leagueChanged = true;
      } else if (p.league === "mbl" && rating < MBL_RATING_THRESHOLD - 12 && p.age <= U23_MAX_AGE) {
        // Young MBL player who fell off — back to the development league to rebuild.
        p.league = p.age <= 20 ? "u20" : "u23";
        bannerMsg = bannerMsg || `You've dropped back to the ${LEAGUE[p.league].short} to find your form.`;
        leagueChanged = true;
      } else if (p.league === "mbl") {
        // Stayed in the MBL: role can shift with rating — using the SAME
        // club-relative calculation as signing (computeClubTerms), not a
        // flat league-wide bar. That mismatch used to be the actual bug
        // here: a player could be correctly awarded Starter at signing
        // (comfortably ahead of THIS club's own competitiveness) and then
        // get silently downgraded the very next season purely because a
        // flat absolute threshold didn't care which club they were at —
        // dropping even after a season where their rating went UP, as
        // long as it stayed under the fixed bar. Every previous session's
        // role checks now go through the one formula that actually
        // determines a role anywhere in the game.
        const newRole = computeClubTerms(p, club, { firstProSigning: false }).role;
        if (newRole !== p.starterStatus) {
          const oldRole = p.starterStatus;
          p.starterStatus = newRole;
          leagueChanged = true;
          const roleMsg = ROLE_RANK[newRole] > ROLE_RANK[oldRole]
            ? `Your form's earned you more minutes — you're a ${newRole.toLowerCase()} at ${p.teamName} now.`
            : `Your role's shifted to ${newRole.toLowerCase()} at ${p.teamName} — the roster and your current form don't line up for ${oldRole.toLowerCase()} minutes right now.`;
          bannerMsg = bannerMsg ? `${bannerMsg} ${roleMsg}` : roleMsg;
          // A banner set here can still be silently discarded — later this
          // same season, an overseas offer, national tryout, or injury can
          // each take their own early-return path without ever reaching the
          // final setBanner call. history is never subject to that: it's
          // baked into `p` itself, so the explanation survives regardless
          // of what else this season decides is more important to show.
          p.history = [...p.history, { age: p.age, tierLabel: ROLE_RANK[newRole] > ROLE_RANK[oldRole] ? "Role Increased" : "Role Decreased", note: roleMsg }];
        }
      } else {
        // Stayed in a pro club's D-League team without promotion — role can
        // still shift with rating, using the same calculation as the offer
        // preview so it never silently drifts out of sync.
        const freshRole = computeClubTerms(p, club, { firstProSigning: false }).role;
        if (freshRole !== p.starterStatus) {
          const oldRole = p.starterStatus;
          p.starterStatus = freshRole;
          leagueChanged = true;
          const roleMsg = ROLE_RANK[freshRole] > ROLE_RANK[oldRole]
            ? `Your form's earned you more minutes — you're a ${freshRole.toLowerCase()} at ${p.teamName} now.`
            : `Your role's shifted to ${freshRole.toLowerCase()} at ${p.teamName} — the roster and your current form don't line up for ${oldRole.toLowerCase()} minutes right now.`;
          bannerMsg = bannerMsg ? `${bannerMsg} ${roleMsg}` : roleMsg;
          p.history = [...p.history, { age: p.age, tierLabel: ROLE_RANK[freshRole] > ROLE_RANK[oldRole] ? "Role Increased" : "Role Decreased", note: roleMsg }];
        }
      }

      // If the league or role changed, refresh the locked salary to match the new band.
      if (leagueChanged && p.contractSalary > 0) {
        p.contractSalary = contractMonthlySalary({ leagueId: p.league, role: p.starterStatus, club, semiPro: atSemiPro });
      }
    }

    p.achievements = checkAchievements(p);

    // Age 16 special: national U16 / U17 jumpclass pathway (resolves once).
    if (p.age === 16 && !p.age16Resolved) {
      p.age16Resolved = true;
      setPlayer(p);
      save(p);
      resolveAge16(p);
      return;
    }

    // Age 17 special: National U17 Championship (resolves once).
    if (p.age === 17 && !p.age17Resolved) {
      p.age17Resolved = true;
      setPlayer(p);
      save(p);
      resolveAge17(p);
      return;
    }

    // Age 18 special: U18 national team -> FIBA U18 Asia Cup (only for players
    // who accepted the U18 Bukit Jalil bootcamp). Resolves once.
    if (p.age === 18 && p.u18Eligible && !p.age18Resolved) {
      p.age18Resolved = true;
      setPlayer(p);
      save(p);
      resolveAge18(p);
      return;
    }

    // Age 18 special: MSSM for players who did NOT go through the U18 Asia
    // Cup path this year (that path resolves MSSM internally instead).
    if (p.age === 18 && !p.u18Eligible && !p.age18MssmResolved) {
      p.age18MssmResolved = true;
      p = resolveMSSM(p, false);
      if (p.mssmPendingReveal) {
        setPlayer(p);
        save(p);
        setScreen("mssm_result");
        return;
      }
    }

    // First time turning pro (at 18): present initial club offers with real terms.
    if (enteringPro && !p.clubId) {
      // A player returning from the HBL chooses between a Taiwanese
      // university scholarship and a Malaysian contract — never both.
      if (p.pendingUbaOffer) { setPlayer(p); save(p); setScreen("uba_offers"); return; }
      const offers = generateClubOffers(p, { count: 3, firstProSigning: true });
      p.achievements = Array.from(new Set([...p.achievements, "turned_pro"]));
      setPlayer(p);
      save(p);
      setClubOffers(offers);
      setClubOfferContext({ mode: "join" });
      setScreen("club_offers");
      return;
    }

    // Age 19 special: "Continue Study or Not?" — a one-time life decision.
    // Not every player gets this offer; the chance scales with IQ. Players
    // already on a Taiwanese scholarship are studying abroad, so they skip it.
    if (p.age === 19 && !p.studyDecisionResolved && !p.uba && !p.ubaGraduated) {
      p.studyDecisionResolved = true;
      const offerChance = computeStudyOfferChance(p.stats.iq);
      if (Math.random() < offerChance) {
        setPlayer(p);
        save(p);
        setScreen("study_decision");
        return;
      }
    }

    // UBA eligibility is exactly four years (19-22). Graduating at 23 frees
    // the player to sign a professional contract back home — or, with some
    // chance, go straight into the Taiwan Pro League (TPBL) as an import.
    if (p.uba && !p.ubaGraduated) {
      p.ubaYearsLeft = Math.max(0, (p.ubaYearsLeft || 0) - 1);
      if (p.ubaYearsLeft <= 0 || p.age >= UBA_GRADUATION_AGE) {
        const alma = p.ubaTeamName;
        p.uba = false;
        p.ubaGraduated = true;
        p.ubaRole = null;
        p.starterStatus = null;
        p.teamName = null;
        p.achievements = Array.from(new Set([...p.achievements, "uba_graduate"]));
        p.history = [...p.history, {
          age: p.age, tierLabel: "Graduated",
          note: `Graduated from ${alma} after four years in the Taiwan UBA.`,
        }];

        const overallGrad = computeOverall(p.stats, p.position);
        if (Math.random() < UBA_TPBL_IMPORT_CHANCE) {
          const band = overseasRoleBand(UBA_TPBL_IMPORT_TIER, overallGrad);
          const teams = pick3(UBA_TPBL_IMPORT_TIER.teams);
          p.pendingOverseasOffer = { tier: UBA_TPBL_IMPORT_TIER, teams, role: band.role, awardChance: band.awardChance, years: randInt(1, 3) };
          p.history[p.history.length - 1].note += " Taiwan Pro League (TPBL) scouts are interested in keeping you in the league as an import.";
          setPlayer(p);
          save(p);
          setScreen("overseas_offers");
          return;
        }

        p.history[p.history.length - 1].note += " Free to sign a professional contract back home.";
        const offers = generateClubOffers(p, { count: 3 });
        setPlayer(p);
        save(p);
        setClubOffers(offers);
        setClubOfferContext({ mode: "join", graduated: true });
        setScreen("club_offers");
        return;
      }
    }

    // Age 23: study-track graduation. Free to sign with pro clubs (and chase
    // an MBL spot) again — resolves before the generic "aged out of semi-pro"
    // logic below, which would otherwise only fire a year later, at 24.
    if (p.age === 23 && p.studying && !p.studyGraduated) {
      p.studying = false;
      p.studyGraduated = true;
      const oldClub = p.clubId ? getClub(p.clubId) : null;
      p.clubId = null; p.starterStatus = null; p.contractSalary = 0; p.contractYearsLeft = 0; p.league = null;
      p.achievements = Array.from(new Set([...p.achievements, "college_graduate"]));
      p.history = [...p.history, {
        age: 23, tierLabel: "Graduated",
        note: `You graduate${oldClub ? ` from your programme at ${oldClub.name}` : ""} — free to sign with a pro club and chase an MBL spot again.`,
      }];
      const offers = generateClubOffers(p, { count: 3 });
      setPlayer(p);
      save(p);
      setClubOffers(offers);
      setClubOfferContext({ mode: "join", graduated: true });
      setScreen("club_offers");
      return;
    }

    // Recurring pro-career club events (stay / offers / released / bankrupt).
    if (p.stage === "pro" && !p.abroad && p.clubId) {
      // Count down the current contract each season.
      if (typeof p.contractYearsLeft === "number" && p.contractYearsLeft > 0) {
        p.contractYearsLeft -= 1;
      }
      const ev = rollClubEvent(p);
      // Release / bankruptcy can cut a contract short (drama or money troubles).
      if (ev.type === "released" || ev.type === "bankrupt") {
        const oldClub = getClub(p.clubId);
        const offers = generateClubOffers(p, { count: 3, excludeId: p.clubId });
        p.clubId = null;
        p.starterStatus = null;
        p.contractSalary = 0;
        p.contractYearsLeft = 0;
        p.history = [...p.history, {
          age: p.age, tierLabel: ev.type === "bankrupt" ? "Club Folded" : "Released",
          note: ev.type === "bankrupt"
            ? `${oldClub.name} ran into money trouble and folded — you're a free agent.`
            : `${oldClub.name} released you from your contract.`,
        }];
        p.morale = clamp(p.morale - (ev.type === "bankrupt" ? 8 : 14));
        // QUEUE rather than return. These club branches used to jump straight
        // to the offers screen, which meant the national-team and overseas
        // checks further down were never reached — an elite player hit them in
        // only ~27% of seasons and could finish a career at OVR 86 with zero
        // caps and zero overseas offers. Queued offers are shown after the
        // bigger career events resolve.
        p.pendingClubOffers = { offers, context: { mode: ev.type, oldClubName: oldClub.name } };
      } else if (p.contractYearsLeft <= 0) {
        // Contract expired: must re-sign or move (free agency).
        const offers = generateClubOffers(p, { count: 3, excludeId: p.clubId });
        p.pendingClubOffers = { offers, context: { mode: "transfer", oldClubName: getClub(p.clubId).name, expiring: true } };
      } else if (ev.type === "offers") {
        // Mid-contract transfer interest: a chance to move despite time left.
        const offers = generateClubOffers(p, { count: 3, excludeId: p.clubId });
        if (offers.length > 0) {
          p.pendingClubOffers = { offers, context: { mode: "transfer", oldClubName: getClub(p.clubId).name } };
        }
      }
      // else 'stay' — nothing changes this season.
    }

    // ---- Overseas career: re-evaluate standing for players already abroad ----
    // Tier thresholds are checked against raw overall ability, not the
    // popularity-blended "rating" used domestically — an overseas scout cares
    // about your actual basketball ability, not your fame back home.
    if (p.stage === "pro" && p.abroad) {
      const overallAbroad = computeOverall(p.stats, p.position);
      const currentTier = ALL_OVERSEAS_TIERS.find(t => t.id === p.overseasTierId);

      if (currentTier && overallAbroad < currentTier.threshold) {
        // Fell below the current tier's floor — released. Re-evaluate against
        // the tier ladder from the top down; fall back to a hometown MBL club
        // if no tier qualifies anymore.
        const oldTeamName = p.teamName;
        const newTier = highestOverseasTier(overallAbroad);
        p.contractSalary = 0; p.contractYearsLeft = 0; p.starterStatus = null;
        if (newTier) {
          const band = overseasRoleBand(newTier, overallAbroad);
          const teams = pick3(newTier.teams);
          p.overseasTierId = null;
          p.pendingOverseasOffer = { tier: newTier, teams, role: band.role, awardChance: band.awardChance, years: randInt(1, 3) };
          p.history = [...p.history, { age: p.age, tierLabel: "Released", note: `${oldTeamName} lets you go as your form dips — but ${newTier.label} clubs are still interested.` }];
          setPlayer(p);
          save(p);
          setScreen("overseas_offers");
          return;
        } else {
          p.abroad = false; p.overseasTierId = null; p.teamName = null; p.overseasLeague = null;
          const offers = generateClubOffers(p, { count: 3 });
          p.history = [...p.history, { age: p.age, tierLabel: "Released", note: `${oldTeamName} lets you go — time to find a new club back home.` }];
          setPlayer(p);
          save(p);
          setClubOffers(offers);
          setClubOfferContext({ mode: "released", oldClubName: oldTeamName });
          setScreen("club_offers");
          return;
        }
      }

      // Improved enough to now qualify for a HIGHER tier than their current
      // one — scouts come calling for a step up, same odds as any other
      // offer. Without this, a player who signs Asia-tier young and later
      // grows past EuroLeague/NBA level would be stuck forever.
      if (currentTier) {
        const bestQualifying = highestOverseasTier(overallAbroad);
        const currentIdx = ALL_OVERSEAS_TIERS.findIndex(t => t.id === currentTier.id);
        const bestIdx = bestQualifying ? ALL_OVERSEAS_TIERS.findIndex(t => t.id === bestQualifying.id) : -1;
        if (bestQualifying && bestIdx >= 0 && bestIdx < currentIdx && Math.random() < OVERSEAS_OFFER_CHANCE) {
          const band = overseasRoleBand(bestQualifying, overallAbroad);
          const teams = pick3(bestQualifying.teams);
          p.pendingOverseasOffer = { tier: bestQualifying, teams, role: band.role, awardChance: band.awardChance, years: randInt(1, 3) };
          p.history = [...p.history, { age: p.age, tierLabel: "Scouted Up", note: `Your form has ${bestQualifying.label} scouts circling — a step up from ${p.teamName}.` }];
          setPlayer(p);
          save(p);
          setScreen("overseas_offers");
          return;
        }
      }

      // Contract countdown for players who remain abroad.
      if (typeof p.contractYearsLeft === "number" && p.contractYearsLeft > 0) {
        p.contractYearsLeft -= 1;
      }
      if (p.contractYearsLeft <= 0 && currentTier) {
        // Contract expired — re-offered from the best tier they currently qualify for.
        const bestTier = highestOverseasTier(overallAbroad) || currentTier;
        const band = overseasRoleBand(bestTier, overallAbroad);
        const teams = pick3(bestTier.teams);
        p.pendingOverseasOffer = { tier: bestTier, teams, role: band.role, awardChance: band.awardChance, years: randInt(1, 3) };
        setPlayer(p);
        save(p);
        setScreen("overseas_offers");
        return;
      }

      // Role can still shift with overall even mid-contract, same as domestic clubs.
      if (currentTier) {
        const freshRole = overseasRoleBand(currentTier, overallAbroad).role;
        if (freshRole !== p.starterStatus) p.starterStatus = freshRole;
      }
    }

    // ---- Overseas career: new offer for eligible domestic pro players ----
    // Gated on raw overall, not the popularity-blended domestic "rating" —
    // otherwise a merely-decent player with high local fame could wrongly
    // qualify for offers meant for genuinely elite basketball ability.
    // p.pendingGuaranteedOverseasOffer (set by the "Scouts Are Watching" ->
    // Play to impress choice, back in handleChooseEvent) bypasses the usual
    // per-season roll and guarantees an offer outright, as long as the
    // player already qualifies for some tier. Read from the player object
    // rather than a local `choice` — the choice that set this flag was made
    // on a different click, in a different function's scope.
    if (p.stage === "pro" && !p.abroad && p.clubId) {
      const overallD = computeOverall(p.stats, p.position);
      // An elite agent gets a borderline player in front of the right people,
      // effectively lowering the rating at which overseas clubs will look.
      const scoutedAs = overallD + (hasInvestment(p, "agent") ? AGENT_RATING_BOOST : 0);
      const qualifyingTier = highestOverseasTier(scoutedAs);
      const guaranteed = !!p.pendingGuaranteedOverseasOffer && !!qualifyingTier;
      // One-shot: this season's guarantee shouldn't silently keep applying
      // to every future season's check too.
      if (p.pendingGuaranteedOverseasOffer) p.pendingGuaranteedOverseasOffer = false;
      /* Elite agent buys ACCESS. Note a per-season roll bonus is worthless
         here: the roll repeats every eligible season, so 75% compounds to
         ~100% anyway (measured 99.5% vs 99.8% — no effect). The agent's real
         value is getting you SEEN at a rating scouts would otherwise pass
         over, which is a threshold change, not a probability change. */
      if (qualifyingTier && (guaranteed || Math.random() < OVERSEAS_OFFER_CHANCE)) {
        const band = overseasRoleBand(qualifyingTier, overallD);
        const teams = pick3(qualifyingTier.teams);
        p.pendingOverseasOffer = { tier: qualifyingTier, teams, role: band.role, awardChance: band.awardChance, years: randInt(1, 3) };
        setPlayer(p);
        save(p);
        setScreen("overseas_offers");
        return;
      }
    }

    if (resolveNextNationalEvent(p)) return;

    let forcedRetire = null;
    if (p.age >= 40) forcedRetire = "Father Time is undefeated. Your body has called it.";
    // A player on a university scholarship still has a guaranteed place on
    // the roster, so a low rating can't wash them out mid-degree.
    else if (p.stage === "pro" && !p.uba && computeOverall(p.stats, p.position) < 45) forcedRetire = "Your overall has fallen below what any club can use. You hang up the sneakers.";

    setPlayer(p);
    save(p);

    if (forcedRetire) {
      const retiredPlayer = { ...p, retired: true, retireReason: forcedRetire };
      saveToHallOfFame(retiredPlayer, buildCareerSummary(retiredPlayer.history));
      setPlayer(retiredPlayer);
      setScreen("retired");
      clearSave();
      return;
    }

    // Safety net: a pro player 18+ should never be stranded without a club
    // and no way back to signing. If every other check above somehow missed
    // it (e.g. an edge case carried over from an older save), catch it here.
    // Players on a UBA scholarship have no club by design, so they're exempt.
    if (p.stage === "pro" && !p.abroad && !p.uba && !p.pendingUbaOffer && !p.clubId) {
      const veteran = hasTurnedProBefore(p);
      const offers = generateClubOffers(p, { count: 3, firstProSigning: !veteran && !p.league });
      const np = veteran ? p : { ...p, achievements: Array.from(new Set([...p.achievements, "turned_pro"])) };
      setPlayer(np);
      save(np);
      setClubOffers(offers);
      setClubOfferContext(joinOrFreeAgent(np));
      setScreen("club_offers");
      return;
    }

    // Drain any club offers queued earlier this season. They were deferred so
    // the national-team and overseas checks above could still run.
    if (p.pendingClubOffers) {
      const q = p.pendingClubOffers;
      const np = { ...p, pendingClubOffers: null };
      setPlayer(np);
      save(np);
      setClubOffers(q.offers);
      setClubOfferContext(q.context);
      setBanner(bannerMsg);
      setScreen("club_offers");
      return;
    }

    setBanner(bannerMsg);
    setScreen("hub");
  }, [player, pending]);


  // Any flow that lands back on the hub mid-season must also drain the queue,
  // otherwise a pending contract situation would be silently dropped.
  const goHubOrPendingClub = (p, banner) => {
    if (p && p.pendingClubOffers) {
      const q = p.pendingClubOffers;
      const np = { ...p, pendingClubOffers: null };
      setPlayer(np);
      save(np);
      setClubOffers(q.offers);
      setClubOfferContext(q.context);
      if (banner) setBanner(banner);
      setScreen("club_offers");
      return true;
    }
    return false;
  };

  const handleManageInvestments = () => setScreen("investments");
  const handleConfirmInvestments = (sel) => {
    const p = { ...player, investments: { ...sel } };
    setPlayer(p);
    save(p);
    setScreen("hub");
  };

  const handleRetireConsider = () => {
    const retiredPlayer = { ...player, retired: true, retireReason: "You walk away on your own terms." };
    saveToHallOfFame(retiredPlayer, buildCareerSummary(retiredPlayer.history));
    setPlayer(retiredPlayer);
    setScreen("retired");
    clearSave();
  };

  // Shared resolver for every clutch moment, regardless of which tournament
  // triggered it — the choice's own success chance decides the outcome, and
  // applyClutchUpgrade patches history/achievements uniformly either way.
  const handleClutchChoice = (choice) => {
    let p = { ...player, achievements: [...player.achievements] };
    const pending = p.pendingClutchMoment;
    const won = Math.random() < choice.successChance;
    p = applyClutchUpgrade(p, pending, won);
    p.pendingClutchMoment = null;
    p.clutchResultNote = won ? choice.winNote : choice.loseNote;
    p.achievements = checkAchievements(p);
    setPlayer(p);
    save(p);
    // Some flows (senior national team) also drive a separate display state
    // for their result screen, not just the history entry — patch that too.
    if (pending.natEventPatch) {
      const finalLabel = won ? pending.upgradeMeta.label : pending.previousMeta.label;
      setNationalEvent({ ...pending.natEventPatch, label: finalLabel });
    }
    setBanner(won ? `⚡ ${choice.winNote}` : choice.loseNote);
    setScreen(pending.resumeScreen);
  };

  // Resolves the Recovery Plan choice queued by a serious in-season injury.
  // The season itself (games missed, morale/fatigue hit) is already fully
  // computed and sitting in `summary` — this only decides what carries
  // forward: whether the slow start next season is cleared, and whether
  // rushing back costs a permanent stat.
  const handleInjuryRecoveryChoice = (choiceId) => {
    let p = { ...player, stats: { ...player.stats } };
    p.pendingInjuryDecision = null;
    let note;
    if (choiceId === "guided") {
      // Sports Science's actual payoff for this moment: the speed of
      // rushing back with none of its risk.
      p.slowStartNextSeason = false;
      note = "The medical staff clear you ahead of schedule — properly this time. Full speed, no shortcuts.";
    } else if (choiceId === "rush") {
      p.slowStartNextSeason = false;
      if (Math.random() < 0.35) {
        const hurtStat = pick(["athleticism", "defense", "rebounding"]);
        const loss = randInt(2, 4);
        p.stats[hurtStat] = clamp(p.stats[hurtStat] - loss, 1, 99);
        note = `It doesn't hold. The ${STAT_META[hurtStat].label.toLowerCase()} never fully comes back — down ${loss} for good.`;
      } else {
        note = "You push the timeline and it holds. Back to full speed, no lasting damage.";
      }
    } else {
      // Full Rehab: slowStartNextSeason stays true (unchanged, as before
      // this system existed) — a properly-healed body is a little less
      // likely to break down again next time out.
      p.recentlyRehabbed = true;
      note = "You take the full timeline. It costs you the start of next season, but there's nothing to worry about long-term.";
    }
    p.achievements = checkAchievements(p);
    setPlayer(p);
    save(p);
    // Shown on the result screen itself, right next to the existing injury
    // line — a banner would only surface on the NEXT Hub visit, well after
    // the recap that's actually about this injury.
    setSummary(s => ({ ...s, injuryRecoveryNote: note }));
    setScreen("result");
  };

  const handleAcceptOverseasOffer = (team) => {
    // Any domestic club offers queued this season are void once you sign
    // abroad — leaving them queued would pop a stale Malaysian transfer
    // screen after the move.
    const offer = player.pendingOverseasOffer;
    if (!offer) return;
    let p = { ...player, pendingClubOffers: null };
    /* Moving abroad used to have NO downside at all. A young Malaysian
       landing in Europe or the NBA should take time to settle — unless
       family is being supported and flown out, which removes the dip.
       Applied once, on the first move abroad only. */
    if (!p.abroadEver && !hasInvestment(p, "family")) {
      const dip = randInt(OVERSEAS_SETTLING_DIP[0], OVERSEAS_SETTLING_DIP[1]);
      p.settlingDip = dip;
      p.morale = clamp(p.morale - 10);
    } else {
      p.settlingDip = 0;
      p.settledAbroad = true;
    }
    // Leaving the domestic system entirely — clear club/league state.
    p.clubId = null; p.starterStatus = offer.role; p.league = null; p.semiProClub = null;
    p.abroad = true; p.abroadEver = true;
    p.teamName = team.name;
    p.overseasTierId = offer.tier.id;
    p.overseasLeague = team.league;
    p.contractSalary = Math.round(team.salaryPerSeason / 12);
    p.contractYearsLeft = offer.years || randInt(1, 3);
    p.pendingOverseasOffer = null;
    if (offer.tier.achId) p.achievements = Array.from(new Set([...p.achievements, offer.tier.achId]));
    p.history = [...p.history, {
      age: p.age, tierLabel: `${offer.tier.label} Signing`,
      note: `You sign with ${team.name} (${team.league}) as a ${offer.role.toLowerCase()} — ${rm(p.contractSalary)}/month.`,
    }];
    p.achievements = checkAchievements(p);
    setPlayer(p);
    save(p);
    setBanner(`You've signed with ${team.name} of the ${team.league}.`);
    setScreen("hub");
  };

  const handleDeclineOverseasOffer = () => {
    let p = { ...player, pendingOverseasOffer: null };
    if (p.abroad) {
      // Already abroad (released or contract expired) and declining the new
      // overseas options — there's no "stay abroad" fallback, so head home.
      const oldTeamName = p.teamName;
      p.abroad = false; p.overseasTierId = null; p.teamName = null; p.overseasLeague = null;
      p.contractSalary = 0; p.contractYearsLeft = 0; p.starterStatus = null;
      const offers = generateClubOffers(p, { count: 3 });
      p.history = [...p.history, { age: p.age, tierLabel: "Returned Home", note: oldTeamName ? `You leave ${oldTeamName} and return to Malaysia to continue your career domestically.` : "You return to Malaysia to continue your career domestically." }];
      setPlayer(p);
      save(p);
      setClubOffers(offers);
      setClubOfferContext(joinOrFreeAgent(p));
      setScreen("club_offers");
      return;
    }
    // Not abroad and no domestic club yet — this is the UBA-graduate TPBL
    // import offer being declined. Unlike the normal "stay put at my
    // existing club" decline, this player has nowhere to go yet, so route
    // them into domestic club offers instead of leaving them clubless.
    if (!p.clubId && p.stage === "pro") {
      p.history = [...p.history, { age: p.age, tierLabel: "Stayed Home", note: "You turn down the Taiwan Pro League interest to sign domestically instead." }];
      const offers = generateClubOffers(p, { count: 3 });
      setPlayer(p);
      save(p);
      setClubOffers(offers);
      setClubOfferContext({ mode: "join", graduated: true });
      setScreen("club_offers");
      return;
    }
    p.history = [...p.history, { age: p.age, tierLabel: "Stayed Home", note: "You turn down interest from overseas to stay in Malaysia." }];
    setPlayer(p);
    save(p);
    if (!goHubOrPendingClub(p)) setScreen("hub");
  };

  const handlePlayAgain = () => {
    setPlayer(null);
    setSavedGame(null);
    setBanner(null);
    setSummary(null);
    setCurrentEvent(null);
    usedEvents.current = [];
    setScreen("start");
  };

  return (
    <div className="w-full min-h-screen" style={{ background: C.ink }}>
      <FontStyle />
      {screen === "start" && <StartScreen onStart={handleStart} savedGame={savedGame} onContinue={handleContinue} onViewHallOfFame={() => setScreen("hall_of_fame")} onViewAchievements={() => setScreen("achievement_gallery")} />}
      {screen === "u15_result" && player && (
        <U15SelectionScreen
          player={player}
          selected={u15Selected}
          onContinue={() => { setBanner(null); setScreen(u15Selected ? "u15_tournament" : "hub"); }}
        />
      )}
      {screen === "u15_tournament" && player && (
        <U15TournamentScreen
          player={player}
          onContinue={handleU15TournamentContinue}
        />
      )}
      {screen === "u15_shortlist" && player && (
        <U15ShortlistScreen
          player={player}
          onAccept={handleAcceptBootcamp}
          onDecline={handleDeclineBootcamp}
        />
      )}
      {screen === "u15_bootcamp_result" && player && (
        <U15BootcampResultScreen
          player={player}
          onContinue={() => { setBanner(null); setScreen("hub"); }}
        />
      )}
      {screen === "age16_u16_result" && player && (
        <U16ResultScreen player={player} onContinue={handleAge16Continue} />
      )}
      {screen === "age16_u17_result" && player && (
        <U17ResultScreen player={player} onContinue={handleAge16Continue} />
      )}
      {screen === "a17_result" && player && (
        <A17TournamentScreen player={player} onContinue={handleA17TournamentContinue} />
      )}
      {screen === "a17_shortlist" && player && (
        <A17ShortlistScreen
          player={player}
          onAccept={handleAcceptA17Bootcamp}
          onDecline={handleDeclineA17Bootcamp}
        />
      )}
      {screen === "hbl_season" && player && (
        <HblSeasonScreen player={player} onContinue={handleHblSeasonContinue} />
      )}
      {screen === "uba_offers" && player && (
        <UbaOffersScreen
          player={player}
          onAccept={handleAcceptUbaOffer}
          onDecline={handleDeclineUbaOffer}
        />
      )}
      {screen === "hbl_offers" && player && (
        <HblOffersScreen
          player={player}
          onAccept={handleAcceptHblOffer}
          onDecline={handleDeclineHblOffer}
        />
      )}
      {screen === "a17_bootcamp_result" && player && (
        <A17BootcampResultScreen player={player} onContinue={handleA17Continue} />
      )}
      {screen === "age18_result" && player && (
        <U18ResultScreen player={player} onContinue={handleAge18Continue} />
      )}
      {screen === "mssm_result" && player && (
        <MSSMResultScreen player={player} onContinue={handleMSSMContinue} />
      )}
      {screen === "national_tryout" && player && nationalTryout && (
        <NationalTryoutScreen player={player} tryout={nationalTryout} onAttend={handleAttendTryout} onDecline={handleDeclineTryout} />
      )}
      {screen === "national_result" && player && nationalEvent && (
        <NationalResultScreen event={nationalEvent} onContinue={() => { setBanner(null); if (resolveNextNationalEvent({ ...player })) return; if (!goHubOrPendingClub(player)) setScreen("hub"); }} />
      )}
      {screen === "study_decision" && player && (
        <StudyDecisionScreen onStudy={handleChooseStudy} onFocus={handleFocusBasketball} />
      )}
      {screen === "clutch_moment" && player && player.pendingClutchMoment && (
        <ClutchMomentScreen pending={player.pendingClutchMoment} onChoose={handleClutchChoice} />
      )}
      {screen === "overseas_offers" && player && player.pendingOverseasOffer && (
        <OverseasOffersScreen player={player} offer={player.pendingOverseasOffer} onSign={handleAcceptOverseasOffer} onDecline={handleDeclineOverseasOffer} />
      )}
      {screen === "club_offers" && player && (
        <ClubOffersScreen
          player={player}
          offers={clubOffers}
          context={clubOfferContext}
          onJoin={handleJoinClub}
          onStay={handleStayClub}
          onRetire={handleRetireConsider}
          onNegotiate={handleStartNegotiate}
        />
      )}
      {screen === "negotiate_offer" && player && negotiatingOffer && (
        <NegotiateOfferScreen player={player} club={negotiatingOffer.club} terms={negotiatingOffer.terms} onCommit={handleCommitNegotiation} />
      )}
      {screen === "trade_request" && player && player.clubId && (
        <TradeRequestScreen player={player} club={getClub(player.clubId)} onCommit={handleCommitTradeRequest} />
      )}
      {screen === "hub" && player && (
        <Hub
          player={player}
          banner={banner}
          onPlaySeason={handlePlaySeason}
          onRetireConsider={handleRetireConsider}
          onManageInvestments={handleManageInvestments}
          onRequestTrade={handleRequestTrade}
        />
      )}
      {screen === "body_setup" && player && <BodySetup player={player} onConfirm={handleConfirmBody} />}
      {screen === "choose_identity" && player && <ChooseIdentityScreen player={player} onChoose={handleChooseIdentity} />}
      {screen === "name_rival" && player && <NameRivalScreen player={player} onConfirm={handleNameRival} />}
      {screen === "creation_build" && player && <AttributeBuilder player={player} points={player.seasonPoints || 0} creation onConfirm={handleConfirmCreationBuild} />}
      {screen === "investments" && player && (
        <InvestmentsScreen player={player} onConfirm={handleConfirmInvestments} onBack={() => setScreen("hub")} />
      )}
      {screen === "offseason_plan" && player && <OffseasonPlanScreen player={player} onChoose={handleOffseasonPlan} />}
      {screen === "training" && player && <AttributeBuilder player={player} points={player.seasonPoints || 0} onConfirm={handleConfirmTraining} />}
      {screen === "event" && currentEvent && <EventScreen event={currentEvent} onChoose={handleChooseEvent} />}
      {screen === "injury_recovery" && player && player.pendingInjuryDecision && (
        <InjuryRecoveryScreen pending={player.pendingInjuryDecision} onChoose={handleInjuryRecoveryChoice} />
      )}
      {screen === "result" && summary && <ResultScreen summary={summary} onContinue={handleContinueAfterResult} />}
      {screen === "retired" && player && <RetiredScreen player={player} onPlayAgain={handlePlayAgain} onViewHallOfFame={() => setScreen("hall_of_fame")} onViewAchievements={() => setScreen("achievement_gallery")} />}
      {screen === "hall_of_fame" && (
        <HallOfFameScreen
          entries={hofData || []}
          onBack={() => setScreen("start")}
          onPlayAgain={handlePlayAgain}
        />
      )}
      {screen === "achievement_gallery" && (
        <AchievementGalleryScreen
          gallery={galleryData || {}}
          onBack={() => setScreen("start")}
        />
      )}
    </div>
  );
}
