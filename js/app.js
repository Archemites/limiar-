/**
 * LIMIAR+ // GUIA DE CRIAÇÃO PASSO A PASSO (5 ETAPAS DEDICADAS)
 * Cada etapa é uma página limpa contendo apenas o essencial + guia explicativo.
 */
(function () {
  "use strict";

  const STORAGE_KEY = "limiar_plus_wizard_v5";
  const ATTRS = ["vigor", "acuidade", "psicometria", "esoterismo", "razao"];

  const ATTR_INFO = {
    vigor: {
      name: "* Vigor",
      color: "#ff0000",
      guide:
        "Define sua força física, fôlego e resistência corporal. É somado aos dados para calcular sua Vida (Vigor + 2d6), aumenta seu dano desarmado e é usado no 2º passo da Defesa para reduzir o dano recebido pela metade."
    },
    acuidade: {
      name: "* Acuidade",
      color: "#ffff00",
      guide:
        "Define sua precisão, reflexos, pontaria e atenção aos detalhes. É o atributo usado na Iniciativa, nos Ataques (corpo a corpo ou à distância) e no 1º passo da Defesa (Bloqueio ou Esquiva)."
    },
    psicometria: {
      name: "* Psicometria",
      color: "#0000ff",
      guide:
        "Define sua capacidade mental e social. Na próxima etapa (Etapa 02), você escolherá se sua Psicometria será focada em Inteligência (estudo, medicina, técnica) ou Sapiência (intuição, conversa). O não escolhido fica com -3."
    },
    esoterismo: {
      name: "* Esoterismo",
      color: "#ff00ff",
      guide:
        "Define sua sensibilidade e compreensão do Indizível. Usado quando seu Perito investiga rituais, símbolos ocultos, artefatos anômalos ou fenômenos que atravessam o Véu."
    },
    razao: {
      name: "* Razão",
      color: "#f9cb9c",
      guide:
        "Define seu equilíbrio psicológico perante o horror. É somada aos dados para calcular sua Sanidade (Razão + 2d6) e é testada quando você chega a 0 de Sanidade para evitar ficar Insano."
    }
  };

  function createDefaultState() {
    return {
      step: 1,
      focusedAttr: "vigor",
      name: "HELENA VANCE",
      professionId: "detetive",
      psiPrimary: "inteligencia",
      basePoints: {
        vigor: 1,
        acuidade: 1,
        psicometria: 2,
        esoterismo: 0,
        razao: 1
      },
      hpRolled2d6: 8,
      sanRolled2d6: 8,
      historyPhrase: "Ex-plantonista do turno da madrugada que encontrou arquivos apagados no porão do hospital municipal.",
      firstContact: "Ouviu uma frequência impossível no rádio que fez todos os espelhos da sala refletirem outro lugar.",
      avatarMode: "skull",
      avatarSeed: 108,
      customAvatarDataUrl: null,
      profSearch: ""
    };
  }

  let state = createDefaultState();

  function formatSigned(val) {
    const n = Number(val || 0);
    return n >= 0 ? `+${n}` : `${n}`;
  }

  function getActiveProfession() {
    const list = window.LIMIAR_DATA ? window.LIMIAR_DATA.professions : [];
    return list.find((p) => p.id === state.professionId) || list[0] || null;
  }

  function getProfBonusTags(prof) {
    if (!prof) return [];
    const tags = [];
    const b = prof.bonuses || {};
    const sb = prof.subBonuses || {};

    if (b.vigor) tags.push({ text: `${formatSigned(b.vigor)} VIGOR`, color: "#ff0000" });
    if (b.acuidade) tags.push({ text: `${formatSigned(b.acuidade)} ACUIDADE`, color: "#ffff00" });
    if (b.psicometria) tags.push({ text: `${formatSigned(b.psicometria)} PSICOMETRIA`, color: "#0000ff" });
    if (b.esoterismo) tags.push({ text: `${formatSigned(b.esoterismo)} ESOTERISMO`, color: "#ff00ff" });
    if (b.razao) tags.push({ text: `${formatSigned(b.razao)} RAZÃO`, color: "#f9cb9c" });

    if (sb.inteligencia) tags.push({ text: `${formatSigned(sb.inteligencia)} INTELIGÊNCIA`, color: "#0000ff" });
    if (sb.sapiencia) tags.push({ text: `${formatSigned(sb.sapiencia)} SAPIÊNCIA`, color: "#0000ff" });
    if (sb.sanidadeMax) tags.push({ text: `${formatSigned(sb.sanidadeMax)} SANIDADE MÁX.`, color: "#f9cb9c" });
    if (sb.vidaMax) tags.push({ text: `${formatSigned(sb.vidaMax)} VIDA MÁX.`, color: "#ff0000" });

    return tags;
  }

  function getProfBonusText(prof) {
    if (!prof) return "";
    const parts = getProfBonusTags(prof).map((t) => t.text);
    if (prof.specialBonus) parts.push(prof.specialBonus);
    return parts.join(" | ") || "Sem modificador fixo";
  }

  function getProfessionBonusFor(key) {
    const prof = getActiveProfession();
    if (!prof) return 0;
    if (prof.bonuses && prof.bonuses[key] !== undefined) return Number(prof.bonuses[key] || 0);
    if (prof.subBonuses && prof.subBonuses[key] !== undefined) return Number(prof.subBonuses[key] || 0);
    return 0;
  }

  function getTotalAttr(attrKey) {
    return Number(state.basePoints[attrKey] || 0) + getProfessionBonusFor(attrKey);
  }

  function getPsicometriaSubs() {
    const psiTotal = getTotalAttr("psicometria");
    const intProf = getProfessionBonusFor("inteligencia");
    const sapProf = getProfessionBonusFor("sapiencia");

    const intBase = state.psiPrimary === "inteligencia" ? psiTotal : -3;
    const sapBase = state.psiPrimary === "sapiencia" ? psiTotal : -3;

    return {
      inteligencia: intBase + intProf,
      sapiencia: sapBase + sapProf
    };
  }

  function getHpMax() {
    return Math.max(1, getTotalAttr("vigor") + Number(state.hpRolled2d6 || 7) + getProfessionBonusFor("vidaMax"));
  }

  function getSanMax() {
    return Math.max(1, getTotalAttr("razao") + Number(state.sanRolled2d6 || 7) + getProfessionBonusFor("sanidadeMax"));
  }

  function clampBasePoints() {
    if (!state.basePoints || typeof state.basePoints !== "object") {
      state.basePoints = { vigor: 0, acuidade: 0, psicometria: 0, esoterismo: 0, razao: 0 };
    }
    let spent = 0;
    ATTRS.forEach((attr) => {
      let v = Math.max(0, Math.min(5, Math.floor(Number(state.basePoints[attr] || 0))));
      if (spent + v > 5) {
        v = Math.max(0, 5 - spent);
      }
      state.basePoints[attr] = v;
      spent += v;
    });
  }

  // ==========================================================================
  // NAVEGAÇÃO ENTRE AS 5 PÁGINAS (UMA PÁGINA POR ETAPA)
  // ==========================================================================

  function goToStep(stepNum) {
    const s = Math.max(1, Math.min(5, Number(stepNum || 1)));
    state.step = s;

    document.querySelectorAll(".step-tab").forEach((tab) => {
      tab.setAttribute("aria-selected", Number(tab.dataset.step) === s ? "true" : "false");
    });

    for (let i = 1; i <= 5; i++) {
      const page = document.getElementById(`page-step-${i}`);
      if (page) {
        if (i === s) {
          page.hidden = false;
          page.classList.remove("step-page");
          void page.offsetWidth;
          page.classList.add("step-page");
        } else {
          page.hidden = true;
        }
      }
    }

    if (window.LimiarSound) window.LimiarSound.blip(340 + s * 60, 0.03);
    renderAll();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // ==========================================================================
  // RENDERIZAÇÃO DE CADA ETAPA
  // ==========================================================================

  function renderAll() {
    renderStep1Attributes();
    renderStep2Psicometria();
    renderStep3Professions();
    renderStep4Vitals();
    renderStep5Final();
    renderAvatars();
    saveState();
  }

  function renderStep1Attributes() {
    clampBasePoints();
    const spent = ATTRS.reduce((acc, k) => acc + Number(state.basePoints[k] || 0), 0);
    const remaining = 5 - spent;

    const spentEl = document.getElementById("p1-points-spent");
    const badgeEl = document.getElementById("p1-points-badge");
    if (spentEl) spentEl.textContent = String(spent);

    if (badgeEl) {
      if (remaining === 0) {
        badgeEl.textContent = "5 DE 5 PONTOS DISTRIBUÍDOS (MÁXIMO ATINGIDO)";
        badgeEl.style.borderColor = "#ffffff";
        badgeEl.style.color = "#ffffff";
      } else {
        badgeEl.textContent = `RESTAM ${remaining} PONTO(S) PARA DISTRIBUIR`;
        badgeEl.style.borderColor = "#ffff00";
        badgeEl.style.color = "#ffff00";
      }
    }

    ATTRS.forEach((attr) => {
      const val = Number(state.basePoints[attr] || 0);
      const profMod = getProfessionBonusFor(attr);
      const totalVal = getTotalAttr(attr);
      const otherSpent = spent - val;
      const maxForAttr = Math.max(0, 5 - otherSpent);
      const valEl = document.getElementById(`p1-val-${attr}`);
      const pipsEl = document.getElementById(`p1-pips-${attr}`);
      const modEl = document.getElementById(`p1-mod-${attr}`);

      if (valEl) valEl.textContent = formatSigned(totalVal);

      if (modEl) {
        const prof = getActiveProfession();
        const profLabel = prof ? prof.name : "PROFISSÃO";
        if (attr === "psicometria") {
          const intMod = getProfessionBonusFor("inteligencia");
          const sapMod = getProfessionBonusFor("sapiencia");
          const subs = getPsicometriaSubs();
          const modParts = [];
          if (intMod !== 0) modParts.push(`${formatSigned(intMod)} INT`);
          if (sapMod !== 0) modParts.push(`${formatSigned(sapMod)} SAP`);
          modEl.innerHTML = `
            <span style="opacity:0.85;">${modParts.length ? `MOD. ${escapeHtml(profLabel)}: <strong style="color:#ffff00;">${modParts.join(", ")}</strong>` : `BASE: ${val} PT(S)`}</span>
            <span>INT <strong>${formatSigned(subs.inteligencia)}</strong> / SAP <strong>${formatSigned(subs.sapiencia)}</strong></span>
          `;
        } else if (profMod !== 0) {
          modEl.innerHTML = `
            <span>MOD. ${escapeHtml(profLabel)}: <strong style="color:var(--attr-color, #ffffff);">${formatSigned(profMod)}</strong></span>
            <span>TOTAL: <strong style="font-size:0.95rem; color:var(--attr-color, #ffffff);">${formatSigned(totalVal)}</strong></span>
          `;
        } else {
          modEl.innerHTML = `
            <span style="opacity:0.65;">MOD. PROFISSÃO: +0</span>
            <span>TOTAL: <strong style="font-size:0.9rem; color:var(--attr-color, #ffffff);">${formatSigned(totalVal)}</strong></span>
          `;
        }
      }

      if (pipsEl) {
        pipsEl.innerHTML = "";
        for (let i = 1; i <= 5; i++) {
          const isLocked = i > maxForAttr;
          const btn = document.createElement("button");
          btn.type = "button";
          btn.className = "pip-btn" + (i <= val ? " is-active" : "") + (isLocked ? " is-disabled" : "");
          btn.textContent = i <= val ? "■" : "□";
          if (isLocked) {
            btn.title = "Limite máximo de 5 pontos atingido";
          }
          btn.addEventListener("click", (e) => {
            e.stopPropagation();
            state.focusedAttr = attr;
            const cur = Number(state.basePoints[attr] || 0);
            const others = ATTRS.reduce((acc, k) => acc + (k === attr ? 0 : Number(state.basePoints[k] || 0)), 0);
            const maxAllowed = Math.max(0, 5 - others);
            const desired = cur === i ? i - 1 : i;

            if (desired > maxAllowed) {
              if (window.LimiarSound) window.LimiarSound.blip(150, 0.06);
              if (badgeEl) {
                badgeEl.textContent = "LIMITE DE 5 PONTOS ATINGIDO!";
                badgeEl.style.borderColor = "#ff0000";
                badgeEl.style.color = "#ff0000";
                badgeEl.classList.remove("pop-anim");
                void badgeEl.offsetWidth;
                badgeEl.classList.add("pop-anim");
              }
              return;
            }

            state.basePoints[attr] = desired;
            if (window.LimiarSound) window.LimiarSound.blip(300 + i * 70, 0.04);
            renderAll();
          });
          pipsEl.appendChild(btn);
        }
      }
    });

    // Guia contextual do atributo focado
    const info = ATTR_INFO[state.focusedAttr] || ATTR_INFO.vigor;
    const guideBox = document.getElementById("p1-attr-guide-box");
    const guideTitle = document.getElementById("p1-guide-attr-title");
    const guideText = document.getElementById("p1-guide-attr-text");

    if (guideBox) guideBox.style.borderColor = info.color;
    if (guideTitle) {
      guideTitle.style.color = info.color;
      guideTitle.textContent = `COMO FUNCIONA ${info.name.toUpperCase()}:`;
    }
    if (guideText) guideText.textContent = info.guide;
  }

  function renderStep2Psicometria() {
    const psiBase = Number(state.basePoints.psicometria || 0);
    const inlineEl = document.getElementById("p2-psi-base-inline");
    if (inlineEl) inlineEl.textContent = formatSigned(psiBase);

    const isInt = state.psiPrimary === "inteligencia";
    const cardInt = document.getElementById("p2-card-int");
    const cardSap = document.getElementById("p2-card-sap");
    const badgeInt = document.getElementById("p2-badge-int");
    const badgeSap = document.getElementById("p2-badge-sap");
    const scoreInt = document.getElementById("p2-score-int");
    const scoreSap = document.getElementById("p2-score-sap");

    if (cardInt) cardInt.classList.toggle("is-selected", isInt);
    if (cardSap) cardSap.classList.toggle("is-selected", !isInt);

    if (badgeInt) {
      badgeInt.textContent = isInt ? "ESCOLHIDO (VALOR CHEIO)" : "NÃO ESCOLHIDO (-3)";
      badgeInt.style.background = isInt ? "#0000ff" : "#000000";
    }
    if (badgeSap) {
      badgeSap.textContent = !isInt ? "ESCOLHIDO (VALOR CHEIO)" : "NÃO ESCOLHIDO (-3)";
      badgeSap.style.background = !isInt ? "#0000ff" : "#000000";
    }

    if (scoreInt) {
      scoreInt.textContent = formatSigned(isInt ? psiBase : -3);
      scoreInt.style.borderColor = isInt ? "#0000ff" : "#ffffff";
    }
    if (scoreSap) {
      scoreSap.textContent = formatSigned(!isInt ? psiBase : -3);
      scoreSap.style.borderColor = !isInt ? "#0000ff" : "#ffffff";
    }
  }

  function renderMiniAttrCardsHtml() {
    const subs = getPsicometriaSubs();
    const psiBase = Number(state.basePoints.psicometria || 0);
    const intBase = state.psiPrimary === "inteligencia" ? psiBase : -3;
    const sapBase = state.psiPrimary === "sapiencia" ? psiBase : -3;

    function pipsStr(n) {
      let s = "";
      for (let i = 1; i <= 5; i++) s += i <= n ? "■" : "□";
      return s;
    }

    function card(title, color, pipsText, modVal, totalVal) {
      const hasMod = Number(modVal || 0) !== 0;
      return `
        <div style="border:1px solid ${color}; padding:5px 9px; display:flex; flex-direction:column; gap:2px; min-width:112px; background:#000000;">
          <div style="display:flex; justify-content:space-between; align-items:center; gap:8px;">
            <span style="color:${color}; font-size:0.68rem;">${title}</span>
            <strong style="color:${color}; font-size:1.05rem; line-height:1;">${formatSigned(totalVal)}</strong>
          </div>
          <div style="font-size:0.68rem; color:${color}; letter-spacing:1px;">${pipsText}</div>
          ${
            hasMod
              ? `<div style="font-size:0.6rem; color:${color}; border-top:1px dotted ${color}; padding-top:2px;">PROF.: ${formatSigned(modVal)}</div>`
              : `<div style="font-size:0.58rem; opacity:0.55;">SEM MOD. PROF.</div>`
          }
        </div>
      `;
    }

    return [
      card("* VIGOR", "#ff0000", pipsStr(state.basePoints.vigor), getProfessionBonusFor("vigor"), getTotalAttr("vigor")),
      card("* ACUIDADE", "#ffff00", pipsStr(state.basePoints.acuidade), getProfessionBonusFor("acuidade"), getTotalAttr("acuidade")),
      card(
        "* INTELIGÊNCIA",
        "#0000ff",
        `PSI ${pipsStr(psiBase)} (${formatSigned(intBase)})`,
        getProfessionBonusFor("inteligencia"),
        subs.inteligencia
      ),
      card(
        "* SAPIÊNCIA",
        "#0000ff",
        `PSI ${pipsStr(psiBase)} (${formatSigned(sapBase)})`,
        getProfessionBonusFor("sapiencia"),
        subs.sapiencia
      ),
      card("* ESOTERISMO", "#ff00ff", pipsStr(state.basePoints.esoterismo), getProfessionBonusFor("esoterismo"), getTotalAttr("esoterismo")),
      card("* RAZÃO", "#f9cb9c", pipsStr(state.basePoints.razao), getProfessionBonusFor("razao"), getTotalAttr("razao"))
    ].join("");
  }

  function renderStep3Professions() {
    const prof = getActiveProfession();

    const nameEl = document.getElementById("p3-selected-prof-name");
    const bonusEl = document.getElementById("p3-selected-prof-bonus");
    const equipEl = document.getElementById("p3-selected-prof-equip");
    const stripEl = document.getElementById("p3-attrs-preview-strip");

    if (prof && nameEl) nameEl.textContent = `* ${prof.name}`;
    if (prof && bonusEl) bonusEl.textContent = `BÔNUS: ${getProfBonusText(prof)}`;
    if (prof && equipEl) equipEl.textContent = `EQUIPAMENTO INICIAL: ${prof.equipmentText || "Nenhum"}`;

    if (stripEl) {
      stripEl.innerHTML = renderMiniAttrCardsHtml();
    }

    const gridEl = document.getElementById("p3-professions-grid");
    if (!gridEl || !window.LIMIAR_DATA) return;

    const q = (state.profSearch || "").trim().toLowerCase();
    const list = window.LIMIAR_DATA.professions.filter((p) => {
      if (!q) return true;
      return (
        p.name.toLowerCase().includes(q) ||
        getProfBonusText(p).toLowerCase().includes(q) ||
        (p.equipmentText || "").toLowerCase().includes(q)
      );
    });

    gridEl.innerHTML = "";
    list.forEach((p, idx) => {
      const isSelected = p.id === state.professionId;
      const tags = getProfBonusTags(p);

      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "prof-item-card" + (isSelected ? " is-selected" : "");
      btn.style.animationDelay = `${Math.min(idx * 12, 200)}ms`;

      const tagsHtml = tags
        .map((t) => `<span style="color:${t.color}; font-size:0.7rem;">${escapeHtml(t.text)}</span>`)
        .join(" &bull; ");

      btn.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:baseline; width:100%; border-bottom:1px dotted #ffffff; padding-bottom:4px;">
          <strong style="color:#ffff00; font-size:0.84rem;">* ${escapeHtml(p.name)}</strong>
          <span style="font-size:0.6rem; opacity:0.8;">${isSelected ? "[ ATIVO ]" : ""}</span>
        </div>
        <div>${tagsHtml || `<span style="font-size:0.7rem; opacity:0.8;">Habilidade Especial</span>`}</div>
        ${p.specialBonus ? `<div style="font-size:0.66rem; color:#ff00ff;">★ ${escapeHtml(p.specialBonus)}</div>` : ""}
        <div style="font-size:0.66rem; color:#f9cb9c; border-top:1px dotted #ffffff; padding-top:4px; margin-top:auto; width:100%;">
          EQUIP.: <span style="color:#ffffff;">${escapeHtml(p.equipmentText || "Nenhum")}</span>
        </div>
      `;

      btn.addEventListener("click", () => {
        state.professionId = p.id;
        if (window.LimiarSound) window.LimiarSound.blip(450, 0.04);
        renderAll();
      });

      gridEl.appendChild(btn);
    });
  }

  function renderStep4Vitals() {
    const vig = getTotalAttr("vigor");
    const raz = getTotalAttr("razao");
    const hpMax = getHpMax();
    const sanMax = getSanMax();
    const sanBonus = getProfessionBonusFor("sanidadeMax");

    const vigEl = document.getElementById("p4-vigor-val");
    const hpInp = document.getElementById("p4-hp-2d6-input");
    const hpTotEl = document.getElementById("p4-hp-total-val");
    const pulseBar = document.getElementById("p4-hp-pulse-bar");

    if (vigEl) vigEl.textContent = formatSigned(vig);
    if (hpInp && document.activeElement !== hpInp) hpInp.value = String(state.hpRolled2d6);
    if (hpTotEl) hpTotEl.textContent = `${hpMax} DE VIDA`;

    if (pulseBar) {
      pulseBar.innerHTML = "";
      for (let i = 0; i < Math.min(36, hpMax); i++) {
        const pip = document.createElement("span");
        pip.className = "pulse-pip";
        pulseBar.appendChild(pip);
      }
    }

    const razEl = document.getElementById("p4-razao-val");
    const sanInp = document.getElementById("p4-san-2d6-input");
    const sanTotEl = document.getElementById("p4-san-total-val");
    const sanNoteEl = document.getElementById("p4-san-prof-note");

    if (razEl) razEl.textContent = formatSigned(raz);
    if (sanInp && document.activeElement !== sanInp) sanInp.value = String(state.sanRolled2d6);
    if (sanTotEl) sanTotEl.textContent = `${sanMax} DE SANIDADE`;
    if (sanNoteEl) {
      sanNoteEl.textContent = sanBonus ? `(+${sanBonus} de bônus de ${getActiveProfession()?.name})` : "";
    }
  }

  function renderStep5Final() {
    const nameInp = document.getElementById("p5-char-name");
    const histInp = document.getElementById("p5-history");
    const contInp = document.getElementById("p5-contact");
    const sumBox = document.getElementById("p5-summary-box");

    if (nameInp && document.activeElement !== nameInp) nameInp.value = state.name || "";
    if (histInp && document.activeElement !== histInp) histInp.value = state.historyPhrase || "";
    if (contInp && document.activeElement !== contInp) contInp.value = state.firstContact || "";

    const prof = getActiveProfession();

    if (sumBox) {
      sumBox.innerHTML = `
        <div style="width:100%; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px;">
          <div>
            <span style="font-size:0.65rem; opacity:0.75;">FICHA PRONTA PARA EXPORTAÇÃO:</span>
            <div style="font-size:1rem; color:#ffff00; font-weight:700;">${escapeHtml(state.name || "PERITO")} // ${escapeHtml(prof ? prof.name : "")}</div>
            <div style="font-size:0.72rem; color:#f9cb9c; margin-top:2px;">EQUIPAMENTO INICIAL: <span style="color:#ffffff;">${escapeHtml(prof ? prof.equipmentText : "")}</span></div>
          </div>
          <div style="display:flex; gap:8px; font-size:0.74rem;">
            <span style="border:1px solid #ff0000; background:#ff0000; color:#000000; padding:4px 10px; font-weight:700;">VIDA: ${getHpMax()}</span>
            <span style="border:1px solid #f9cb9c; background:#f9cb9c; color:#000000; padding:4px 10px; font-weight:700;">SANIDADE: ${getSanMax()}</span>
          </div>
        </div>
        <div style="display:flex; flex-wrap:wrap; gap:8px; width:100%;">
          ${renderMiniAttrCardsHtml()}
        </div>
      `;
    }
  }

  function renderAvatars() {
    if (!window.PixelAvatar) return;
    const prof = getActiveProfession();
    const opts = {
      seed: state.avatarSeed,
      mode: state.avatarMode || "skull",
      customDataUrl: state.customAvatarDataUrl,
      avatarPreset: prof ? prof.avatarPreset : "investigador"
    };
    const c1 = document.getElementById("skull-canvas-step1");
    const c5 = document.getElementById("skull-canvas-step5");
    if (c1) window.PixelAvatar.render(c1, opts);
    if (c5) window.PixelAvatar.render(c5, opts);
  }

  // ==========================================================================
  // UTILITÁRIOS, SORTEIO E EXPORTAÇÃO PDF
  // ==========================================================================

  function randInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function randomizeAll() {
    if (!window.LIMIAR_DATA) return;
    const names = window.LIMIAR_DATA.randomNames || ["HELENA VANCE"];
    const hists = window.LIMIAR_DATA.randomBackstories || [];
    const conts = window.LIMIAR_DATA.randomContacts || [];
    const profs = window.LIMIAR_DATA.professions || [];

    state.name = names[randInt(0, names.length - 1)].toUpperCase();
    state.professionId = profs[randInt(0, profs.length - 1)].id;
    state.psiPrimary = Math.random() > 0.5 ? "inteligencia" : "sapiencia";

    state.basePoints = { vigor: 0, acuidade: 0, psicometria: 0, esoterismo: 0, razao: 0 };
    for (let i = 0; i < 5; i++) {
      state.basePoints[ATTRS[randInt(0, ATTRS.length - 1)]] += 1;
    }

    state.hpRolled2d6 = randInt(1, 6) + randInt(1, 6);
    state.sanRolled2d6 = randInt(1, 6) + randInt(1, 6);
    if (hists.length) state.historyPhrase = hists[randInt(0, hists.length - 1)];
    if (conts.length) state.firstContact = conts[randInt(0, conts.length - 1)];
    state.avatarSeed = randInt(1, 9999);

    if (window.LimiarSound) window.LimiarSound.roll();
    renderAll();
  }

  async function triggerPdfExport(btnEl) {
    const prev = btnEl ? btnEl.textContent : "";
    if (btnEl) btnEl.textContent = "[ GERANDO PDF... ]";
    try {
      const prof = getActiveProfession();
      const subs = getPsicometriaSubs();
      const c5 = document.getElementById("skull-canvas-step5") || document.getElementById("skull-canvas-step1");
      const payload = {
        ...state,
        professionName: prof ? prof.name : "",
        professionBonusText: getProfBonusText(prof),
        professionEquipmentText: prof ? prof.equipmentText || "" : "",
        hpCurrent: getHpMax(),
        hpMax: getHpMax(),
        sanCurrent: getSanMax(),
        sanMax: getSanMax(),
        totals: {
          vigor: getTotalAttr("vigor"),
          acuidade: getTotalAttr("acuidade"),
          psicometria: getTotalAttr("psicometria"),
          esoterismo: getTotalAttr("esoterismo"),
          razao: getTotalAttr("razao"),
          inteligencia: subs.inteligencia,
          sapiencia: subs.sapiencia
        },
        profBonuses: {
          vigor: getProfessionBonusFor("vigor"),
          acuidade: getProfessionBonusFor("acuidade"),
          psicometria: getProfessionBonusFor("psicometria"),
          esoterismo: getProfessionBonusFor("esoterismo"),
          razao: getProfessionBonusFor("razao"),
          inteligencia: getProfessionBonusFor("inteligencia"),
          sapiencia: getProfessionBonusFor("sapiencia"),
          vidaMax: getProfessionBonusFor("vidaMax"),
          sanidadeMax: getProfessionBonusFor("sanidadeMax")
        },
        avatarPngDataUrl: c5 ? c5.toDataURL("image/png") : null
      };
      await window.LimiarPdfExporter.exportEditablePdf(payload);
    } catch (err) {
      alert("Erro ao exportar PDF: " + (err && err.message ? err.message : err));
    } finally {
      if (btnEl) btnEl.textContent = prev;
    }
  }

  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {}
  }

  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        state = Object.assign(createDefaultState(), JSON.parse(raw));
      }
    } catch (e) {
      state = createDefaultState();
    }
    clampBasePoints();
  }

  function escapeHtml(str) {
    return String(str || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  function bindEvents() {
    // Abas e botões de avanço/recuo de etapa
    document.querySelectorAll(".step-tab").forEach((tab) => {
      tab.addEventListener("click", () => goToStep(Number(tab.dataset.step)));
    });
    document.querySelectorAll("[data-goto]").forEach((btn) => {
      btn.addEventListener("click", () => goToStep(Number(btn.dataset.goto)));
    });

    // Foco nos nódulos de atributo da Etapa 01
    document.querySelectorAll("[data-focus-attr]").forEach((node) => {
      node.addEventListener("click", () => {
        state.focusedAttr = node.dataset.focusAttr;
        renderStep1Attributes();
      });
    });

    // Escolha Inteligência vs Sapiência na Etapa 02
    document.querySelectorAll("[data-psi-pick]").forEach((card) => {
      card.addEventListener("click", () => {
        state.psiPrimary = card.dataset.psiPick;
        if (window.LimiarSound) window.LimiarSound.blip(480, 0.04);
        renderAll();
      });
    });

    // Busca de profissão na Etapa 03
    document.getElementById("p3-search-input")?.addEventListener("input", (e) => {
      state.profSearch = e.target.value;
      renderStep3Professions();
    });

    // Rolagens 2d6 na Etapa 04
    document.getElementById("p4-btn-roll-hp")?.addEventListener("click", () => {
      state.hpRolled2d6 = randInt(1, 6) + randInt(1, 6);
      if (window.LimiarSound) window.LimiarSound.roll();
      const el = document.getElementById("p4-hp-total-val");
      if (el) {
        el.classList.remove("pop-anim");
        void el.offsetWidth;
        el.classList.add("pop-anim");
      }
      renderAll();
    });

    document.getElementById("p4-hp-2d6-input")?.addEventListener("input", (e) => {
      state.hpRolled2d6 = Math.max(2, Math.min(12, Number(e.target.value || 7)));
      renderAll();
    });

    document.getElementById("p4-btn-roll-san")?.addEventListener("click", () => {
      state.sanRolled2d6 = randInt(1, 6) + randInt(1, 6);
      if (window.LimiarSound) window.LimiarSound.roll();
      const el = document.getElementById("p4-san-total-val");
      if (el) {
        el.classList.remove("pop-anim");
        void el.offsetWidth;
        el.classList.add("pop-anim");
      }
      renderAll();
    });

    document.getElementById("p4-san-2d6-input")?.addEventListener("input", (e) => {
      state.sanRolled2d6 = Math.max(2, Math.min(12, Number(e.target.value || 7)));
      renderAll();
    });

    // Etapa 05: Quem é você?
    document.getElementById("p5-char-name")?.addEventListener("input", (e) => {
      state.name = e.target.value;
      renderStep5Final();
      saveState();
    });
    document.getElementById("p5-history")?.addEventListener("input", (e) => {
      state.historyPhrase = e.target.value;
      saveState();
    });
    document.getElementById("p5-contact")?.addEventListener("input", (e) => {
      state.firstContact = e.target.value;
      saveState();
    });

    document.getElementById("p5-btn-rand-history")?.addEventListener("click", () => {
      const list = window.LIMIAR_DATA ? window.LIMIAR_DATA.randomBackstories || [] : [];
      if (list.length) {
        state.historyPhrase = list[randInt(0, list.length - 1)];
        renderStep5Final();
        saveState();
      }
    });

    document.getElementById("p5-btn-rand-contact")?.addEventListener("click", () => {
      const list = window.LIMIAR_DATA ? window.LIMIAR_DATA.randomContacts || [] : [];
      if (list.length) {
        state.firstContact = list[randInt(0, list.length - 1)];
        renderStep5Final();
        saveState();
      }
    });

    // Avatar na Etapa 05
    document.getElementById("p5-btn-skull")?.addEventListener("click", () => {
      state.avatarMode = "skull";
      state.customAvatarDataUrl = null;
      renderAvatars();
      saveState();
    });
    document.getElementById("p5-btn-face")?.addEventListener("click", () => {
      state.avatarMode = "face";
      state.customAvatarDataUrl = null;
      state.avatarSeed = randInt(1, 9999);
      renderAvatars();
      saveState();
    });
    document.getElementById("skull-canvas-step5")?.addEventListener("click", () => {
      state.avatarSeed = randInt(1, 9999);
      renderAvatars();
      saveState();
    });
    document.getElementById("p5-avatar-upload")?.addEventListener("change", (e) => {
      const file = e.target.files && e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => {
        state.customAvatarDataUrl = reader.result;
        state.avatarMode = "custom";
        renderAvatars();
        saveState();
      };
      reader.readAsDataURL(file);
      e.target.value = "";
    });

    // Ações Globais e Exportação PDF
    document.getElementById("btn-random-all")?.addEventListener("click", randomizeAll);
    document.getElementById("btn-reset-all")?.addEventListener("click", () => {
      state = createDefaultState();
      state.name = "";
      state.historyPhrase = "";
      state.firstContact = "";
      goToStep(1);
    });

    document.getElementById("btn-top-export-pdf")?.addEventListener("click", (e) => triggerPdfExport(e.currentTarget));
    document.getElementById("p5-btn-export-pdf")?.addEventListener("click", (e) => triggerPdfExport(e.currentTarget));
  }

  document.addEventListener("DOMContentLoaded", () => {
    loadState();
    bindEvents();
    goToStep(state.step || 1);
  });
})();
