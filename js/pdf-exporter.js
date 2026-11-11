/**
 * LIMIAR+ // EXPORTADOR PDF EDITÁVEL (ACROFORM) — FICHA ESSENCIAL (PÁGINA ÚNICA)
 * Pitch Black (#000000) | Fonte Silkscreen | Estritamente as 8 cores do livro LIMIAR+.pdf
 * Contém apenas o essencial da ficha: Identidade, Constelação Craniana (5 Atributos),
 * Vida & Status, Sanidade & Escala Abissal/Distúrbios, e Quem é você?
 */
(function (root) {
  "use strict";

  function getPDFLib() {
    if (root && root.PDFLib) return root.PDFLib;
    if (typeof window !== "undefined" && window.PDFLib) return window.PDFLib;
    throw new Error("PDFLib não carregado.");
  }

  function base64ToUint8Array(b64) {
    const clean = b64.replace(/^data:[^;]+;base64,/, "");
    if (typeof atob === "function") {
      const bin = atob(clean);
      const arr = new Uint8Array(bin.length);
      for (let i = 0; i < bin.length; i++) arr[i] = bin.charCodeAt(i);
      return arr;
    }
    return new Uint8Array(Buffer.from(clean, "base64"));
  }

  function formatSigned(n) {
    const v = Number(n || 0);
    return v >= 0 ? `+${v}` : `${v}`;
  }

  async function buildEditablePdfBytes(state) {
    const PDFLib = getPDFLib();
    const { PDFDocument, rgb, StandardFonts } = PDFLib;

    // Estritamente as 8 cores exatas do livro LIMIAR+.pdf
    const C = {
      black: rgb(0, 0, 0),
      white: rgb(1, 1, 1),
      vigor: rgb(1, 0, 0), // #ff0000
      acuidade: rgb(1, 1, 0), // #ffff00
      psicometria: rgb(0, 0, 1), // #0000ff
      esoterismo: rgb(1, 0, 1), // #ff00ff
      razao: rgb(0.976, 0.796, 0.612), // #f9cb9c
      morte: rgb(0.522, 0.125, 0.047), // #85200c
      fieldBg: rgb(0, 0, 0)
    };

    const pdfDoc = await PDFDocument.create();
    const fk = (root && root.fontkit) || (typeof window !== "undefined" && window.fontkit);
    if (fk && pdfDoc.registerFontkit) {
      pdfDoc.registerFontkit(fk);
    }

    const embedded =
      (root && (root.LIMIAR_ASSETS || root.LIMIAR_EMBEDDED_ASSETS)) ||
      (typeof window !== "undefined" && (window.LIMIAR_ASSETS || window.LIMIAR_EMBEDDED_ASSETS)) ||
      {};

    let silkFont;
    let silkBold;
    const regB64 = embedded.silkscreenTtfBase64 || embedded.silkscreenRegularB64;
    const boldB64 = embedded.silkscreenBoldTtfBase64 || embedded.silkscreenBoldB64;
    if (regB64 && fk) {
      silkFont = await pdfDoc.embedFont(base64ToUint8Array(regB64));
      silkBold = boldB64 ? await pdfDoc.embedFont(base64ToUint8Array(boldB64)) : silkFont;
    } else {
      silkFont = await pdfDoc.embedFont(StandardFonts.CourierBold);
      silkBold = silkFont;
    }

    let logoImg = null;
    let skullImg = null;
    const logoB64 = embedded.logoPngBase64 || embedded.logoPngB64;
    const skullB64 = embedded.skullPngBase64 || embedded.skullPngB64;
    if (logoB64) {
      logoImg = await pdfDoc.embedPng(base64ToUint8Array(logoB64));
    }
    if (state && state.avatarPngDataUrl && state.avatarPngDataUrl.startsWith("data:image/png")) {
      try {
        skullImg = await pdfDoc.embedPng(base64ToUint8Array(state.avatarPngDataUrl));
      } catch (e) {
        skullImg = null;
      }
    }
    if (!skullImg && skullB64) {
      skullImg = await pdfDoc.embedPng(base64ToUint8Array(skullB64));
    }

    const form = pdfDoc.getForm();

    function paintPitchBlackPage(page) {
      const { width, height } = page.getSize();
      page.drawRectangle({ x: 0, y: 0, width, height, color: C.black });
      page.drawRectangle({
        x: 16,
        y: 16,
        width: width - 32,
        height: height - 32,
        borderColor: C.white,
        borderWidth: 1,
        color: C.black
      });
    }

    function drawBookHeading(page, text, x, y, size, color) {
      const col = color || C.white;
      page.drawText(text, { x, y, size, font: silkFont, color: col });
      const w = silkFont.widthOfTextAtSize(text, size);
      page.drawLine({
        start: { x, y: y - 2 },
        end: { x: x + w, y: y - 2 },
        thickness: 1.2,
        color: col
      });
    }

    function drawCornerNode(page, x, y, w, h, borderColor) {
      const col = borderColor || C.white;
      page.drawRectangle({
        x,
        y,
        width: w,
        height: h,
        color: C.black,
        borderColor: col,
        borderWidth: 1
      });
      const tick = 5;
      page.drawLine({ start: { x: x - 2, y: y + h + 2 }, end: { x: x + tick, y: y + h + 2 }, thickness: 1, color: col });
      page.drawLine({ start: { x: x - 2, y: y + h + 2 }, end: { x: x - 2, y: y + h - tick }, thickness: 1, color: col });
      page.drawLine({ start: { x: x + w + 2, y: y - 2 }, end: { x: x + w - tick, y: y - 2 }, thickness: 1, color: col });
      page.drawLine({ start: { x: x + w + 2, y: y - 2 }, end: { x: x + w + 2, y: y + tick }, thickness: 1, color: col });
    }

    function addTextField(page, name, val, x, y, w, h, opts) {
      const options = opts || {};
      const tf = form.createTextField(name);
      tf.setText(val !== undefined && val !== null ? String(val) : "");
      if (options.multiline) tf.enableMultiline();
      tf.addToPage(page, {
        x,
        y,
        width: w,
        height: h,
        textColor: options.textColor || C.white,
        backgroundColor: C.fieldBg,
        borderColor: options.borderColor || C.white,
        borderWidth: options.borderWidth !== undefined ? options.borderWidth : 0.8
      });
      if (options.fontSize) {
        tf.setFontSize(options.fontSize);
      }
      return tf;
    }

    function addCheckBox(page, name, checked, x, y, size, borderColor) {
      const cb = form.createCheckBox(name);
      cb.addToPage(page, {
        x,
        y,
        width: size || 11,
        height: size || 11,
        textColor: C.white,
        backgroundColor: C.black,
        borderColor: borderColor || C.white,
        borderWidth: 1
      });
      if (checked) cb.check();
      return cb;
    }

    // ========================================================================
    // PÁGINA ÚNICA A4: FICHA ESSENCIAL DO PERITO
    // ========================================================================
    const page1 = pdfDoc.addPage([595.28, 841.89]);
    paintPitchBlackPage(page1);

    // 1. TOPO: LOGO + IDENTIDADE ESSENCIAL
    if (logoImg) {
      page1.drawImage(logoImg, { x: 28, y: 784, width: 172, height: 24 });
    } else {
      drawBookHeading(page1, "LIMIAR+", 28, 790, 18, C.white);
    }
    page1.drawText("[ FICHA DE PERITO // EDITÁVEL ]", {
      x: 28,
      y: 772,
      size: 6.5,
      font: silkFont,
      color: C.white
    });

    page1.drawText("PERITO:", { x: 222, y: 806, size: 7, font: silkFont, color: C.white });
    addTextField(page1, "char_name", state.name || "", 265, 801, 152, 14, { fontSize: 8.5, textColor: C.acuidade });

    page1.drawText("JOGADOR:", { x: 425, y: 806, size: 7, font: silkFont, color: C.white });
    addTextField(page1, "player_name", state.player || "", 474, 801, 94, 14, { fontSize: 8 });

    page1.drawText("PROFISSÃO:", { x: 222, y: 788, size: 7, font: silkFont, color: C.white });
    addTextField(page1, "profession_name", state.professionName || "", 278, 783, 139, 14, { fontSize: 8, textColor: C.acuidade });

    page1.drawText("BÔNUS:", { x: 425, y: 788, size: 7, font: silkFont, color: C.white });
    addTextField(page1, "profession_bonus", state.professionBonusText || "", 462, 783, 106, 14, { fontSize: 7 });

    page1.drawText("EQUIP. INICIAL:", { x: 222, y: 770, size: 7, font: silkFont, color: C.razao });
    addTextField(page1, "profession_equipment", state.professionEquipmentText || "", 296, 765, 272, 14, {
      fontSize: 7.5,
      textColor: C.white
    });

    page1.drawLine({ start: { x: 24, y: 760 }, end: { x: 571, y: 760 }, thickness: 1, color: C.white });

    // ========================================================================
    // 2. CONSTELAÇÃO CRANIANA DOS 5 ATRIBUTOS AO REDOR DA CAVEIRA
    // ========================================================================
    drawBookHeading(page1, "Atributos:", 28, 748, 10, C.white);
    page1.drawText("5 PONTOS INICIAIS (MÍN 0, MÁX 5)", { x: 392, y: 749, size: 7, font: silkFont, color: C.acuidade });

    // NÚCLEO CENTRAL: CAVEIRA DO LIMIAR+
    const coreX = 227;
    const coreY = 562;
    const coreW = 140;
    const coreH = 150;
    drawCornerNode(page1, coreX, coreY, coreW, coreH, C.white);

    if (skullImg) {
      page1.drawImage(skullImg, { x: coreX + 18, y: coreY + 24, width: 104, height: 114 });
    }
    page1.drawText("PERITO", { x: coreX + 52, y: coreY + 10, size: 7, font: silkFont, color: C.white });

    // Linhas de Circuito Ortogonais
    page1.drawLine({ start: { x: 204, y: 676 }, end: { x: coreX, y: 676 }, thickness: 1, color: C.vigor });
    page1.drawLine({ start: { x: coreX + coreW, y: 676 }, end: { x: 390, y: 676 }, thickness: 1, color: C.acuidade });
    page1.drawLine({ start: { x: 204, y: 588 }, end: { x: coreX, y: 588 }, thickness: 1, color: C.esoterismo });
    page1.drawLine({ start: { x: coreX + coreW, y: 588 }, end: { x: 390, y: 588 }, thickness: 1, color: C.psicometria });
    page1.drawLine({ start: { x: 297, y: coreY }, end: { x: 297, y: 544 }, thickness: 1.2, color: C.razao });

    function drawOrbitalAttrNode(attrKey, title, x, y, w, h, color, subNote) {
      drawCornerNode(page1, x, y, w, h, color);
      drawBookHeading(page1, title, x + 10, y + h - 22, 10.5, color);

      const totVal = state.totals ? state.totals[attrKey] : 0;

      addTextField(page1, `attr_${attrKey}_total`, formatSigned(totVal), x + w - 46, y + h - 30, 36, 22, {
        fontSize: 12,
        textColor: color,
        borderColor: color
      });

      if (subNote) {
        page1.drawText(subNote, { x: x + 10, y: y + 14, size: 6.5, font: silkFont, color: C.white });
      }
    }

    drawOrbitalAttrNode("vigor", "* Vigor:", 28, 636, 176, 76, C.vigor, "CORPO, FORÇA, RESISTÊNCIA");
    drawOrbitalAttrNode("acuidade", "* Acuidade:", 390, 636, 176, 76, C.acuidade, "PRECISÃO, REFLEXOS, ATENÇÃO");
    drawOrbitalAttrNode("esoterismo", "* Esoterismo:", 28, 548, 176, 76, C.esoterismo, "AFINIDADE COM O INDIZÍVEL");
    drawOrbitalAttrNode("psicometria", "* Psicometria:", 390, 548, 176, 76, C.psicometria, "");

    const intTot = state.totals ? state.totals.inteligencia : 0;
    const sapTot = state.totals ? state.totals.sapiencia : -3;

    addCheckBox(page1, "chk_psi_int", state.psiPrimary === "inteligencia", 398, 574, 9, C.psicometria);
    page1.drawText("INTELIGÊNCIA:", { x: 412, y: 576, size: 6.5, font: silkFont, color: C.white });
    addTextField(page1, "attr_inteligencia_total", formatSigned(intTot), 482, 572, 28, 14, { fontSize: 8.5 });

    addCheckBox(page1, "chk_psi_sap", state.psiPrimary === "sapiencia", 398, 556, 9, C.psicometria);
    page1.drawText("SAPIÊNCIA:", { x: 412, y: 558, size: 6.5, font: silkFont, color: C.white });
    addTextField(page1, "attr_sapiencia_total", formatSigned(sapTot), 482, 554, 28, 14, { fontSize: 8.5 });

    // * Razão na base do Crânio
    drawCornerNode(page1, 160, 492, 275, 52, C.razao);
    drawBookHeading(page1, "* Razão:", 172, 522, 10.5, C.razao);
    page1.drawText("RESISTÊNCIA MENTAL", { x: 172, y: 502, size: 6.5, font: silkFont, color: C.white });
    addTextField(page1, "attr_razao_total", formatSigned(state.totals ? state.totals.razao : 0), 388, 506, 36, 22, {
      fontSize: 12,
      textColor: C.razao,
      borderColor: C.razao
    });

    page1.drawLine({ start: { x: 24, y: 480 }, end: { x: 571, y: 480 }, thickness: 1, color: C.white });

    // ========================================================================
    // 3. A CARNE (* VIDA) vs O ABISMO VERTICAL (* SANIDADE)
    // ========================================================================
    drawBookHeading(page1, "* Vida: Vigor + 2d6", 28, 462, 10, C.vigor);

    page1.drawText("VIDA ATUAL:", { x: 28, y: 438, size: 7, font: silkFont, color: C.vigor });
    addTextField(page1, "hp_current", String(state.hpCurrent ?? 7), 86, 433, 34, 18, {
      fontSize: 10,
      textColor: C.vigor,
      borderColor: C.vigor
    });

    page1.drawText("MÁX:", { x: 128, y: 438, size: 7, font: silkFont, color: C.white });
    addTextField(page1, "hp_max", String(state.hpMax ?? 7), 154, 433, 32, 18, { fontSize: 10 });

    page1.drawText("2d6:", { x: 194, y: 438, size: 7, font: silkFont, color: C.white });
    addTextField(page1, "hp_2d6", String(state.hpRolled2d6 ?? 7), 218, 433, 26, 18, { fontSize: 9 });

    drawCornerNode(page1, 28, 374, 226, 48, C.white);
    page1.drawText("TICKS DE SANGRAMENTO:", { x: 36, y: 404, size: 6.8, font: silkFont, color: C.vigor });
    addTextField(page1, "bleed_ticks", String(state.bleedTicks ?? 0), 160, 400, 32, 14, { fontSize: 8, textColor: C.vigor });

    page1.drawText("TICKS DE INFECÇÃO:", { x: 36, y: 384, size: 6.8, font: silkFont, color: C.acuidade });
    addTextField(page1, "infection_ticks", String(state.infectionTicks ?? 0), 160, 380, 32, 14, { fontSize: 8, textColor: C.acuidade });

    drawBookHeading(page1, "Status comuns:", 28, 352, 9.5, C.white);
    const statusList = [
      { id: "insano", name: "Insano (Dobro de perda mental)" },
      { id: "sangrando", name: "Sangrando (1d4 a cada 5 min)" },
      { id: "envenenado", name: "Envenenado (1d4 a cada 10 min)" },
      { id: "em_chamas", name: "Em chamas (1d8 por turno)" },
      { id: "atordoado", name: "Atordoado (Perde próximo turno)" },
      { id: "infeccao", name: "Infecção (1d10 / Gangrena 1h)" },
      { id: "embriagado", name: "Embriagado (3 bebidas seguidas)" }
    ];

    statusList.forEach((st, idx) => {
      const sy = 328 - idx * 24;
      const checked = state.statuses && Boolean(state.statuses[st.id]);
      addCheckBox(page1, `status_${st.id}`, checked, 28, sy, 11, C.vigor);
      page1.drawText(st.name, { x: 45, y: sy + 2, size: 7.5, font: silkFont, color: C.white });
    });

    // Divisor Vertical
    page1.drawLine({ start: { x: 266, y: 140 }, end: { x: 266, y: 480 }, thickness: 1, color: C.white });

    // Coluna Direita: * Sanidade: Razão + 2d6
    drawBookHeading(page1, "* Sanidade: Razão + 2d6", 278, 462, 10, C.razao);

    page1.drawText("SAN. ATUAL:", { x: 278, y: 438, size: 7, font: silkFont, color: C.razao });
    addTextField(page1, "san_current", String(state.sanCurrent ?? 7), 338, 433, 34, 18, {
      fontSize: 10,
      textColor: C.razao,
      borderColor: C.razao
    });

    page1.drawText("MÁX:", { x: 378, y: 438, size: 7, font: silkFont, color: C.white });
    addTextField(page1, "san_max", String(state.sanMax ?? 7), 404, 433, 32, 18, { fontSize: 10 });

    page1.drawText("2d6:", { x: 442, y: 438, size: 7, font: silkFont, color: C.white });
    addTextField(page1, "san_2d6", String(state.sanRolled2d6 ?? 7), 466, 433, 24, 18, { fontSize: 9 });

    addCheckBox(page1, "chk_insane", Boolean(state.isInsane), 498, 436, 11, C.esoterismo);
    page1.drawText("INSANO", { x: 513, y: 438, size: 7.5, font: silkFont, color: C.esoterismo });

    // Escala Abaixo de 0
    drawCornerNode(page1, 278, 252, 288, 172, C.white);
    drawBookHeading(page1, "Abaixo de 0:", 286, 408, 8.5, C.white);

    const abyssRungs = [
      { range: "0 SANIDADE", effect: "Teste de Razão / Insano", col: C.esoterismo },
      { range: "-1 a -10", effect: "<Paranoia e Alucinações>", col: C.white },
      { range: "-11 a -20", effect: "<Psicose grave e agressividade>", col: C.acuidade },
      { range: "-21 a -40", effect: "<Dificuldade motora(-1 Acuidade) e toques>", col: C.esoterismo },
      { range: "-41 a -60", effect: "<Dano cerebral perm. -5 em todos os testes>", col: C.vigor },
      { range: "-61 ou menos", effect: "< M O R T E >", col: C.morte }
    ];

    abyssRungs.forEach((r, idx) => {
      const ry = 386 - idx * 22;
      page1.drawRectangle({
        x: 286,
        y: ry - 4,
        width: 272,
        height: 18,
        color: C.black,
        borderColor: r.col,
        borderWidth: 0.6
      });
      page1.drawText(r.range, { x: 292, y: ry + 2, size: 6.5, font: silkBold, color: r.col });
      page1.drawText(r.effect, { x: 360, y: ry + 2, size: 6, font: silkFont, color: r.col });
    });

    // Distúrbios
    drawCornerNode(page1, 278, 148, 288, 96, C.esoterismo);
    drawBookHeading(page1, "Distúrbios (3 dias entre -5 e 1):", 286, 228, 8, C.esoterismo);

    page1.drawText("DIAS:", { x: 500, y: 228, size: 6.5, font: silkFont, color: C.white });
    addTextField(page1, "low_sanity_days", String(state.lowSanityDays ?? 0), 530, 225, 26, 13, { fontSize: 8 });

    const disItems = [
      { id: "depressao", label: "* Depressão (Teste Psicometria em grupo)" },
      { id: "esquizofrenia", label: "* Esquizofrenia (Alucinações / Perde turno)" },
      { id: "ansiedade", label: "* Ansiedade (Descanso metade / Crise Razão)" }
    ];
    disItems.forEach((d, idx) => {
      const dy = 202 - idx * 20;
      const checked = state.disorders && Boolean(state.disorders[d.id]);
      addCheckBox(page1, `disorder_${d.id}`, checked, 286, dy, 10, C.esoterismo);
      page1.drawText(d.label, { x: 302, y: dy + 2, size: 7, font: silkFont, color: C.white });
    });

    // ========================================================================
    // 4. RODAPÉ DA PÁGINA ÚNICA: QUEM É VOCÊ?
    // ========================================================================
    page1.drawLine({ start: { x: 24, y: 140 }, end: { x: 571, y: 140 }, thickness: 1, color: C.white });
    drawBookHeading(page1, "Quem é você?", 28, 122, 10, C.white);

    page1.drawText("* Uma frase de história:", { x: 28, y: 102, size: 7, font: silkFont, color: C.razao });
    addTextField(page1, "history_phrase", state.historyPhrase || "", 28, 28, 260, 68, {
      multiline: true,
      fontSize: 8.5
    });

    page1.drawText("* Primeiro contato com o Indizível:", { x: 306, y: 102, size: 7, font: silkFont, color: C.esoterismo });
    addTextField(page1, "first_contact", state.firstContact || "", 306, 28, 260, 68, {
      multiline: true,
      fontSize: 8.5
    });

    return await pdfDoc.save();
  }

  async function exportEditablePdf(state) {
    const bytes = await buildEditablePdfBytes(state);
    if (typeof window !== "undefined" && typeof document !== "undefined") {
      const blob = new Blob([bytes], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      const safeName = (state && state.name ? state.name : "Perito").replace(/[^a-zA-Z0-9_-]+/g, "_");
      a.href = url;
      a.download = `Ficha_Limiar+_${safeName}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(() => URL.revokeObjectURL(url), 5000);
    }
    return bytes;
  }

  root.LimiarPdfExporter = {
    buildEditablePdfBytes,
    exportEditablePdf
  };
})(typeof window !== "undefined" ? window : global);
