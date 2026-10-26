const modules = {
  extraction: {
    title: 'Separation & Extraction Techniques',
    content: `
      <h3>Liquid-Liquid & Acid-Base Extraction</h3>
      <p><strong>Core:</strong> Exploit pKa and polarity. Neutrals stay organic. Carboxylic acids (pKa ~4-5) deprotonate with NaOH → aqueous salt. Amines protonate with HCl → aqueous salt. Reverse later.</p>
      <p><strong>Classic:</strong> Separate fluorenone (neutral), benzoic acid, 4-chloroaniline.</p>
      <ul>
        <li>Sequence: NaOH extract (acid → water), then HCl extract (base → water), neutral remains organic.</li>
        <li>Multiple small extractions > one large (distribution coefficient).</li>
        <li>Break emulsions with brine or gentle swirling.</li>
        <li>Density: diethyl ether floats; DCM sinks.</li>
      </ul>
      <p class="warning">Always vent the sep funnel! Never shake violently.</p>
      <p><strong>Resources:</strong> Lisa Nichols Ch. 4, MIT OCW Work-Up I video.</p>
    `
  },
  reflux: {
    title: 'Reflux & Reaction Monitoring',
    content: `
      <h3>Reflux Setup</h3>
      <p>Keeps reaction at solvent BP without loss. Water-cooled condenser returns vapor.</p>
      <p><strong>Classic:</strong> t-butanol → t-butyl chloride with conc. HCl (SN1).</p>
      <ul>
        <li>Use heating mantle, boiling chips or stir bar.</li>
        <li>Water in bottom of condenser, out top.</li>
        <li>Work-up: bicarb wash, brine, dry with MgSO4/Na2SO4, filter, evaporate.</li>
        <li>Monitor by TLC.</li>
      </ul>
      <p class="warning">Watch for bumping. Know your solvent BP.</p>
    `
  },
  transformations: {
    title: 'Functional Group Transformations',
    content: `
      <h3>Fischer Esterification & More</h3>
      <p>Acid-catalyzed: carboxylic acid + alcohol ↔ ester + water. Drive equilibrium with excess alcohol or water removal.</p>
      <p><strong>Classic:</strong> Salicylic acid + MeOH → methyl salicylate (oil of wintergreen).</p>
      <ul>
        <li>Mechanism: protonation, nucleophilic attack, loss of water.</li>
        <li>Isolate by phase separation or filtration of salts.</li>
      </ul>
    `
  },
  purification: {
    title: 'Purification & Characterization',
    content: `
      <h3>Recrystallization & Melting Point</h3>
      <p>Dissolve impure solid in minimum hot solvent, cool slowly → pure crystals. Impurities stay dissolved.</p>
      <p><strong>Classic:</strong> Acetanilide or aspirin.</p>
      <ul>
        <li>Solvent: soluble hot, insoluble cold. Test mixed solvents.</li>
        <li>Hot gravity filtration (fluted paper, preheat funnel).</li>
        <li>Slow cool, then ice bath. Vacuum filter (Buchner).</li>
        <li>Mp: sharp and matching literature = pure; broad/depressed = impure.</li>
      </ul>
      <p class="warning">Too much solvent = no crystals. Cool too fast = impure or oiling out.</p>
    `
  }
};

function showModule(key) {
  const m = modules[key];
  document.getElementById('content').innerHTML = `<div class="module"><h2>${m.title}</h2>${m.content}</div>`;
  document.getElementById('chat-panel').style.display = 'none';
}

function showChat() {
  document.getElementById('content').innerHTML = '<h2>AI Teacher Chat</h2><p>Ask me anything about the techniques. I specialize in extraction nuances, reflux setup, recrystallization solvent choice, pKa decisions, common pitfalls, and work-ups.</p>';
  document.getElementById('chat-panel').style.display = 'block';
  if (!document.getElementById('chat-log').innerHTML) {
    addMessage('teacher', 'Hey there, lab rat. What technique are we corrupting today? Extraction layers, reflux setup, recrystallization solvent, or something else?');
  }
}

function addMessage(who, text) {
  const log = document.getElementById('chat-log');
  const div = document.createElement('div');
  div.innerHTML = `<strong>${who === 'user' ? 'You' : 'AI Teacher'}:</strong> ${text}`;
  log.appendChild(div);
  log.scrollTop = log.scrollHeight;
}

const knowledge = [
  { keywords: ['extraction', 'separatory', 'pka', 'acid-base', 'layer'], response: 'Acid-base extraction: Treat with base (NaOH) to pull carboxylic acids into aqueous layer as salts. Then acid (HCl) to pull amines. Neutral stays in organic. Multiple small volumes are better. Check density to know which layer is which. Emulsions? Add brine or swirl gently. Always vent!' },
  { keywords: ['reflux', 'condenser', 'heating'], response: 'Reflux: Heat to solvent boiling point with condenser returning vapor. Use heating mantle + stir/boiling chips. Water flows bottom-to-top in condenser. For SN1 like t-BuCl, after reaction wash with bicarb (remove acid), brine, dry with anhydrous salt, filter, evaporate.' },
  { keywords: ['recrystallization', 'recryst', 'melting', 'solvent choice'], response: 'Recrystallization: Choose solvent where compound is soluble hot, insoluble cold. Use minimum volume of hot solvent. Hot gravity filter to remove insolubles. Cool slowly for pure crystals. Vacuum filter, wash with cold solvent. Mp range: pure = sharp match to lit; impure = depressed and broad. Too much solvent or fast cooling = failure.' },
  { keywords: ['esterification', 'fischer', 'methyl salicylate'], response: 'Fischer: Acid-catalyzed equilibrium. Protonate carbonyl, alcohol attacks, lose water. Drive with excess MeOH or remove water. Classic for oil of wintergreen from salicylic acid. Work-up carefully to remove catalyst and unreacted acid.' },
  { keywords: ['drying', 'mgso4', 'na2so4', 'brine'], response: 'Dry organic layer with anhydrous MgSO4 (faster) or Na2SO4. Add until free-flowing powder. Filter off. Brine wash first helps remove water.' },
  { keywords: ['emulsion'], response: 'Emulsions in extraction: Don\'t shake hard. Add saturated brine, gentle swirling, or let sit. Sometimes a little methanol or ethanol helps. Centrifuge if desperate.' }
];

function sendMessage() {
  const input = document.getElementById('user-input');
  const text = input.value.trim();
  if (!text) return;
  addMessage('user', text);
  input.value = '';
  const lower = text.toLowerCase();
  let reply = 'I\'m specialized in extraction (pKa layers, sep funnel tricks), reflux (setup, work-up), recrystallization (solvent choice, slow cooling, Mp), and esterification equilibria. Ask me about a specific step, common mistake, or the classic experiments (three-component mix, t-butyl chloride, methyl salicylate, acetanilide recryst).';
  for (const k of knowledge) {
    if (k.keywords.some(kw => lower.includes(kw))) {
      reply = k.response;
      break;
    }
  }
  setTimeout(() => addMessage('teacher', reply), 400);
}

// Initial
showModule('extraction');