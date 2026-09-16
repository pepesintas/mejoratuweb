/* ═══════════════════════════════════════════════════════════
   AMBIENTE — dos cosas, y ninguna imprescindible.

   1. Apariciones escalonadas al entrar en pantalla.
   2. El decorado: el cielo con los pájaros sobre la cabecera
      y la cordillera que cierra la página.

   Todo es adorno. Sin JavaScript la web se lee entera y con
   los mismos textos: lo único que se pierde son los dibujos.
   Y si el visitante pide menos movimiento, no se anima nada.

   Van dibujados aquí, en SVG, y no como imágenes: no cuesta
   ni una petición de red ni un kilobyte de descarga extra,
   que es justo lo que predicamos en el artículo de velocidad.
   ═══════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  var quieto = window.matchMedia &&
               window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Solo con JS activo escondemos los bloques para revelarlos.
  // Sin JS la página se lee completa, que es como debe ser.
  if (!quieto) document.documentElement.className += ' js';

  /* ── el decorado ──────────────────────────────────────────
     Un pájaro de tinta: dos trazos, como los dibujaría
     cualquiera en el margen de un cuaderno. */
  function ave(id) {
    return '<symbol id="' + id + '" viewBox="0 0 30 12">' +
             '<path d="M1 8.5 Q7.5 1 14.5 7.5 Q21 1 29 8.5"/>' +
           '</symbol>';
  }

  /* Cielo sobre la cabecera: dos pájaros y, en pantallas
     anchas, la traza de puntos que sube hacia la esquina. */
  var CIELO =
    '<svg viewBox="0 0 1440 700" preserveAspectRatio="xMidYMin slice" ' +
         'aria-hidden="true" focusable="false">' +
      '<defs>' +
        ave('ave-a') +
        '<radialGradient id="luz" cx="78%" cy="8%" r="62%">' +
          '<stop offset="0%" stop-color="#175A67" stop-opacity=".07"/>' +
          '<stop offset="100%" stop-color="#175A67" stop-opacity="0"/>' +
        '</radialGradient>' +
      '</defs>' +
      '<rect width="1440" height="700" fill="url(#luz)"/>' +

      // el sol bajo, apenas insinuado
      '<circle class="tinta bruma" cx="1168" cy="150" r="96" ' +
              'stroke-width="1.1" stroke-opacity=".17"/>' +

      // la traza que sube, con sus signos de más
      '<g class="solo-ancho">' +
        '<path class="asciende" d="M905 545 C1010 522 1078 452 1128 362 ' +
              'C1170 288 1232 236 1330 198"/>' +
        '<g class="tinta" stroke-width="1.6" stroke-opacity=".3">' +
          '<path d="M1311 196 L1330 197.5 M1330 197.5 L1317.5 211"/>' +
          '<path d="M962 486 h14 M969 479 v14"/>' +
          '<path d="M1086 396 h11 M1091.5 390.5 v11"/>' +
          '<path d="M1218 282 h9 M1222.5 277.5 v9"/>' +
        '</g>' +
      '</g>' +

      '<g class="vuela" opacity=".5"><g class="aletea">' +
        '<use class="ave" href="#ave-a" x="120" y="196" width="30" height="12"/>' +
      '</g></g>' +
      '<g class="vuela vuela-2" opacity=".38"><g class="aletea">' +
        '<use class="ave" href="#ave-a" x="40" y="272" width="21" height="9" ' +
             'stroke-width="1.3"/>' +
      '</g></g>' +
    '</svg>';

  /* Cordillera: cuatro crestas, niebla entre ellas, cuatro
     pinos en la de delante y tres pájaros arriba. */
  /* Cordillera: tres cadenas con la cresta perfilada a tinta,
     niebla en los valles, pinos en la loma de delante y tres
     pájaros. Cierra la página a ancho completo. */
  var CRESTA_1 = 'M0 206 L86 146 L130 178 L208 110 L264 160 L320 130 ' +
                 'L362 170 L432 120 L502 182 L558 150 L606 180 L692 126 ' +
                 'L744 168 L814 138 L878 184 L942 146 L1008 174 L1074 128 ' +
                 'L1142 176 L1212 150 L1286 188 L1352 160 L1440 192';
  var CRESTA_2 = 'M0 240 L74 202 L134 226 L216 176 L288 224 L350 198 ' +
                 'L422 234 L494 190 L562 230 L642 204 L718 238 L792 200 ' +
                 'L868 232 L948 194 L1022 230 L1106 202 L1182 236 ' +
                 'L1262 208 L1342 238 L1440 214';
  var LOMA    = 'M0 270 C120 256 202 264 302 260 C422 255 502 246 622 256 ' +
                'C742 266 822 252 942 258 C1062 264 1162 254 1282 260 ' +
                'C1362 264 1402 268 1440 264';
  var CIERRA  = ' L1440 300 L0 300 Z';

  function pino(x, y, alto, ancho) {
    return '<path d="M' + x + ' ' + (y - alto) + ' l' + ancho + ' ' + alto +
           ' h-' + (ancho * 2) + ' Z"/>';
  }

  var PAISAJE =
    '<div class="paisaje" aria-hidden="true">' +
    '<svg viewBox="0 26 1440 274" preserveAspectRatio="xMidYMax slice" ' +
         'focusable="false">' +
      '<defs>' + ave('ave-b') +
        '<linearGradient id="aire" x1="0" y1="0" x2="0" y2="1">' +
          '<stop offset="0%" stop-color="#175A67" stop-opacity="0"/>' +
          '<stop offset="100%" stop-color="#175A67" stop-opacity=".05"/>' +
        '</linearGradient>' +
      '</defs>' +
      '<rect width="1440" height="300" fill="url(#aire)"/>' +

      // sol naciente, solo el contorno
      '<circle class="tinta" cx="1088" cy="118" r="58" ' +
              'stroke-width="1.2" stroke-opacity=".22"/>' +

      // cadena lejana
      '<path class="relleno" opacity=".10" d="' + CRESTA_1 + CIERRA + '"/>' +
      '<path class="tinta" stroke-width="1.1" stroke-opacity=".22" d="' + CRESTA_1 + '"/>' +

      // cadena media
      '<path class="relleno" opacity=".13" d="' + CRESTA_2 + CIERRA + '"/>' +
      '<path class="tinta" stroke-width="1.1" stroke-opacity=".2" d="' + CRESTA_2 + '"/>' +

      // niebla en el valle
      '<g class="tinta bruma" stroke-width="1.4" stroke-opacity=".17">' +
        '<path d="M96 250 h138"/><path d="M268 257 h86"/>' +
        '<path d="M612 246 h112"/><path d="M754 254 h64"/>' +
        '<path d="M1040 252 h128"/><path d="M1198 259 h72"/>' +
      '</g>' +

      // loma de delante y su pinar
      '<path class="relleno" opacity=".17" d="' + LOMA + CIERRA + '"/>' +
      '<path class="tinta" stroke-width="1.1" stroke-opacity=".26" d="' + LOMA + '"/>' +
      '<g class="relleno" opacity=".3">' +
        pino(196, 262, 26, 8) + pino(222, 264, 19, 6) + pino(242, 263, 23, 7) +
        pino(700, 258, 21, 6) + pino(722, 259, 15, 5) +
        pino(1024, 259, 24, 7) + pino(1048, 261, 17, 5) + pino(1066, 260, 21, 6) +
      '</g>' +

      '<g class="vuela" opacity=".4"><g class="aletea">' +
        '<use class="ave" href="#ave-b" x="150" y="56" width="34" height="14"/>' +
      '</g></g>' +
      '<g class="vuela vuela-2" opacity=".32"><g class="aletea">' +
        '<use class="ave" href="#ave-b" x="60" y="92" width="24" height="10" ' +
             'stroke-width="1.3"/>' +
      '</g></g>' +
      '<g class="vuela vuela-3" opacity=".26"><g class="aletea">' +
        '<use class="ave" href="#ave-b" x="220" y="50" width="18" height="8" ' +
             'stroke-width="1.2"/>' +
      '</g></g>' +
    '</svg></div>';

  function decorar() {
    var body = document.body;
    if (!body || body.querySelector('.cielo')) return;

    var cielo = document.createElement('div');
    cielo.className = 'cielo';
    cielo.setAttribute('aria-hidden', 'true');
    cielo.innerHTML = CIELO;
    body.insertBefore(cielo, body.firstChild);

    // Al final del todo: la cordillera cierra la página a ancho
    // completo, por debajo del pie, sin tocar la maquetación de
    // arriba (y por tanto sin mover nada al cargar).
    body.insertAdjacentHTML('beforeend', PAISAJE);
  }

  function revelar() {
    var items = document.querySelectorAll('.rv');
    if (!items.length) return;

    if (quieto || !('IntersectionObserver' in window)) {
      for (var i = 0; i < items.length; i++) items[i].classList.add('visible');
      return;
    }

    var obs = new IntersectionObserver(function (entradas) {
      var n = 0;
      entradas.forEach(function (e) {
        if (!e.isIntersecting) return;
        var el = e.target;
        var d = el.getAttribute('data-rv');
        // El retardo cuenta dentro de cada tanda visible, no del
        // documento entero: si no, lo de abajo tardaría segundos.
        el.style.transitionDelay = (d !== null ? d : String(n * 80)) + 'ms';
        el.classList.add('visible');
        obs.unobserve(el);
        n++;
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    for (var j = 0; j < items.length; j++) obs.observe(items[j]);
  }

  function arranca() { decorar(); revelar(); }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', arranca);
  } else {
    arranca();
  }
})();
