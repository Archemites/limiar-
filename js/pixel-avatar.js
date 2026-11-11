/**
 * Gerador e Conversor de Retratos Pixel Art 8-Bit
 * Utiliza ESTRITAMENTE as 8 cores exatas extraídas do livro LIMIAR+.pdf em fundo Pitch Black (#000000)
 */

window.PixelAvatar = (function () {
  // As 8 cores exatas do livro LIMIAR+.pdf
  const PALETTE = [
    [0, 0, 0],         // 0: #000000 (Pitch Black)
    [255, 255, 255],   // 1: #ffffff (White)
    [255, 0, 0],       // 2: #ff0000 (Vigor Red)
    [255, 255, 0],     // 3: #ffff00 (Acuidade Yellow)
    [0, 0, 255],       // 4: #0000ff (Psicometria Blue)
    [255, 0, 255],     // 5: #ff00ff (Esoterismo / Insano Magenta)
    [249, 203, 156],   // 6: #f9cb9c (Razão Peach)
    [133, 32, 12]      // 7: #85200c (Morte Dark Blood Red)
  ];

  const BAYER_4X4 = [
    [0, 8, 2, 10],
    [12, 4, 14, 6],
    [3, 11, 1, 9],
    [15, 7, 13, 5]
  ];

  function rgbCss(idx) {
    const c = PALETTE[idx] || PALETTE[0];
    return `rgb(${c[0]},${c[1]},${c[2]})`;
  }

  function seededRandom(seed) {
    let s = seed % 2147483647;
    if (s <= 0) s += 2147483646;
    return function () {
      s = (s * 16807) % 2147483647;
      return (s - 1) / 2147483646;
    };
  }

  /**
   * Desenha um retrato 24x24 em Pitch Black (#000000) usando apenas as cores do livro
   */
  function generatePortrait(canvas, preset = "caveira", seed = 1337) {
    const ctx = canvas.getContext("2d");
    const W = 24;
    const H = 24;
    const scale = 8;
    canvas.width = W * scale;
    canvas.height = H * scale;
    canvas.style.imageRendering = "pixelated";
    ctx.imageSmoothingEnabled = false;

    const rng = seededRandom(seed);
    // 100% Pitch Black (#000000)
    const grid = Array.from({ length: H }, () => Array(W).fill(0));

    function setPx(x, y, col) {
      if (x >= 0 && x < W && y >= 0 && y < H) {
        grid[y][x] = col;
      }
    }

    function fillRect(x, y, w, h, col) {
      for (let yy = y; yy < y + h; yy++) {
        for (let xx = x; xx < x + w; xx++) {
          setPx(xx, yy, col);
        }
      }
    }

    if (preset === "caveira") {
      // Caveira da capa de LIMIAR+ (branco, amarelo, vermelho, magenta em fundo #000000)
      fillRect(7, 4, 10, 10, 3);
      fillRect(8, 3, 8, 12, 1);
      fillRect(6, 6, 12, 7, 1);
      fillRect(9, 14, 6, 5, 1);
      // Sombra lateral direita em preto puro + dithering vermelho/magenta/amarelo igual à capa
      fillRect(14, 5, 4, 8, 0);
      setPx(15, 6, 2);
      setPx(16, 7, 5);
      setPx(14, 8, 3);
      setPx(16, 9, 2);
      setPx(15, 11, 7);
      // Olhos fundos pretos com brilho amarelo/vermelho
      fillRect(8, 8, 3, 3, 0);
      fillRect(13, 8, 3, 3, 0);
      setPx(9, 9, 2);
      setPx(14, 9, 3);
      // Cavidade nasal
      setPx(11, 12, 0);
      setPx(12, 12, 0);
      setPx(11, 13, 2);
      // Dentes
      for (let x = 9; x <= 14; x += 2) {
        setPx(x, 16, 0);
        setPx(x, 17, 2);
      }
      // Gotejamento inferior igual à capa
      setPx(10, 19, 3);
      setPx(10, 20, 2);
      setPx(10, 21, 5);
      // Pino esquerdo da capa
      setPx(5, 6, 3);
      setPx(4, 5, 2);
      setPx(3, 5, 1);
    } else {
      // Retrato de Perito minimalista em alto contraste (Branco, Pêssego #f9cb9c e acentos cromáticos da capa)
      const accentColors = [2, 3, 4, 5, 6, 7];
      const acc = accentColors[Math.floor(rng() * accentColors.length)];

      // Silhueta dos ombros (contorno branco fino sobre preto puro)
      fillRect(5, 18, 14, 5, 1);
      fillRect(6, 19, 12, 4, 0);
      // Colarinho / Gravata
      setPx(11, 18, acc);
      setPx(12, 18, acc);
      setPx(11, 19, acc);
      setPx(12, 20, acc);

      // Rosto (Branco + sombra lateral em #f9cb9c / #ff0000 / #000000 estilo glitch da capa)
      fillRect(8, 6, 8, 9, 1);
      fillRect(7, 8, 10, 5, 1);
      fillRect(10, 15, 4, 3, 6);

      // Sombra dramática noir no lado direito do rosto
      fillRect(13, 7, 3, 7, 0);
      setPx(13, 7, 6);
      setPx(13, 9, acc);
      setPx(14, 11, 2);
      setPx(13, 13, 7);

      // Olhos
      fillRect(8, 9, 3, 2, 0);
      fillRect(13, 9, 3, 2, 0);
      setPx(9, 9, 1);
      setPx(14, 9, acc);

      // Boca
      fillRect(10, 13, 4, 1, 0);
      if (rng() > 0.5) {
        // Cigarro aceso (branco + ponta vermelha/amarela)
        setPx(14, 13, 1);
        setPx(15, 13, 1);
        setPx(16, 13, 2);
        setPx(16, 12, 3);
      }

      // Cabelo / Chapéu minimalista
      if (preset === "policial" || preset === "investigador") {
        fillRect(5, 5, 14, 1, 1);
        fillRect(7, 3, 10, 2, 1);
        fillRect(8, 4, 8, 1, acc);
      } else {
        fillRect(7, 4, 10, 2, 1);
        setPx(7, 6, 1);
        setPx(16, 6, acc);
      }
    }

    for (let y = 0; y < H; y++) {
      for (let x = 0; x < W; x++) {
        ctx.fillStyle = rgbCss(grid[y][x]);
        ctx.fillRect(x * scale, y * scale, scale, scale);
      }
    }

    return canvas.toDataURL("image/png");
  }

  /**
   * Desenha a foto enviada pelo usuário em sua qualidade e cores originais (sem filtro 8-bit)
   */
  function drawPhotoToCanvas(imgElement, canvas) {
    const size = 512;
    canvas.width = size;
    canvas.height = size;
    canvas.style.imageRendering = "auto";

    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, size, size);
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

    const side = Math.min(imgElement.width, imgElement.height);
    const sx = (imgElement.width - side) / 2;
    const sy = (imgElement.height - side) / 2;
    ctx.drawImage(imgElement, sx, sy, side, side, 0, 0, size, size);

    return canvas.toDataURL("image/png");
  }

  let cachedSkullImg = null;
  let cachedCustomUrl = null;
  let cachedCustomImg = null;

  function drawSkullToCanvas(canvas, img) {
    canvas.width = 192;
    canvas.height = 192;
    canvas.style.imageRendering = "pixelated";
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.imageSmoothingEnabled = false;
    const pad = 6;
    ctx.drawImage(img, pad, pad, canvas.width - pad * 2, canvas.height - pad * 2);
  }

  function render(canvas, opts) {
    if (!canvas) return;
    const options = opts || {};
    if (options.mode === "custom" && options.customDataUrl) {
      if (
        cachedCustomUrl === options.customDataUrl &&
        cachedCustomImg &&
        cachedCustomImg.complete &&
        cachedCustomImg.naturalWidth > 0
      ) {
        drawPhotoToCanvas(cachedCustomImg, canvas);
        return;
      }
      const img = new Image();
      img.onload = function () {
        cachedCustomUrl = options.customDataUrl;
        cachedCustomImg = img;
        drawPhotoToCanvas(img, canvas);
      };
      img.src = options.customDataUrl;
      return;
    }
    if (options.mode === "skull" && window.LIMIAR_ASSETS && window.LIMIAR_ASSETS.skullPngBase64) {
      if (cachedSkullImg && cachedSkullImg.complete && cachedSkullImg.naturalWidth > 0) {
        drawSkullToCanvas(canvas, cachedSkullImg);
        return;
      }
      // Desenha fallback imediato enquanto carrega o PNG da caveira
      generatePortrait(canvas, "caveira", options.seed || 1337);
      const img = new Image();
      img.onload = function () {
        cachedSkullImg = img;
        drawSkullToCanvas(canvas, img);
      };
      img.src = "data:image/png;base64," + window.LIMIAR_ASSETS.skullPngBase64;
      return;
    }
    const preset = options.mode === "skull" ? "caveira" : options.avatarPreset || "investigador";
    generatePortrait(canvas, preset, options.seed || 1337);
  }

  return {
    render,
    generatePortrait,
    drawPhotoToCanvas,
    ditherImageToCanvas: drawPhotoToCanvas,
    PALETTE
  };
})();
