(function () {
  const root = document.documentElement;
  const hexagonContainer = document.getElementById('hexagon__container');

  // INPUT FIELD
  const backgroundColor = document.getElementById('bg-color');
  const hexagonColor = document.getElementById('hexagon-color');
  const textColor = document.getElementById('text-color');
  const hexagonSize = document.getElementById('hexagon-size');
  const containerSkewX = document.getElementById('container-skew-X');
  const containerSkewY = document.getElementById('container-skew-Y');
  const hexagonGap = document.getElementById('hexagon-gap');
  const hexagonAmount = document.getElementById('hexagon-amount');
  const hexagonFirstRow = document.getElementById('hexagon-first-row');
  const hexagonRotation = document.getElementById('hexagon-rotation');
  const hexagonScale = document.getElementById('hexagon-scale');
  const hexagonTransition = document.getElementById('hexagon-transition');
  const mediaQuery_1 = document.getElementById('media-query--1');
  const mediaQuery_2 = document.getElementById('media-query--2');
  const mediaQuery_3 = document.getElementById('media-query--3');

  // OUTPUT HTML CSS
  const htmlTextField = document.getElementById('html');
  const cssTextField = document.getElementById('css');

  // FUNCTIONS
  function changeBackgroundColor(value) {
    root.style.setProperty('--color-bg', value);
    generateCSStext();
  }

  function changeHexagonColor(value) {
    root.style.setProperty('--color-inner-hexagon', value);
    generateCSStext();
  }

  function changeTextColor(value) {
    root.style.setProperty('--color-text', value);
    generateCSStext();
  }

  function changeHexagonSize(value) {
    root.style.setProperty('--width-hexagon-outer', value + 'vw');
    generateCSStext();
  }

  function changeAmountFirstRow(value) {
    root.style.setProperty('--amount-of-hexagons', value);
    generateHexagons(hexagonAmount.value);
  }

  function changeGap(value) {
    root.style.setProperty('--size-hexagon-inner', 100 - value + '%');
    generateCSStext();
  }

  function skewX(value) {
    root.style.setProperty('--skew-X', value + 'deg');
    generateCSStext();
  }

  function skewY(value) {
    root.style.setProperty('--skew-Y', value + 'deg');
    generateCSStext();
  }

  function rotateHexagon(value) {
    root.style.setProperty('--hover-rotation', value + 'deg');
    generateCSStext();
  }

  function scaleHexagon(value) {
    root.style.setProperty('--hover-scale', value);
    generateCSStext();
  }

  function transitionHexagon(value) {
    root.style.setProperty('--hover-transition', value + 's');
    generateCSStext();
  }

  function generateOneLine(value) {
    let html_firstRow = '';
    for (let i = 0; i < value; i++) {
      html_firstRow += `
      <div class="hexagon__outer first-row_margin-top">
        <div class="hexagon__inner">${i + 1}
        </div>
      </div>`;
    }
    generateHTMLtext(value);
    return html_firstRow;
  }

  function generateRows(value) {
    let html = '';
    let i = 0;

    // add css class (margin-top) to first row
    for (let j = 0; j < hexagonFirstRow.value; j++) {
      i++;
      html += `
      <div class="hexagon__outer first-row_margin-top">
        <div class="hexagon__inner">${i}
        </div>
      </div>`;
    }

    // generate rows, even rows will get a css class
    let k = 0;
    while (k < value - hexagonFirstRow.value) {
      i++;
      if (k === 0 || k % ((hexagonFirstRow.value - 1) * 2 + 1) === 0) {
        html += `
          <div class="hexagon__outer even-rows__margin-left">
            <div class="hexagon__inner">${i}
            </div>
          </div>`;
      } else {
        html += `
          <div class="hexagon__outer">
            <div class="hexagon__inner">${i}
            </div>
          </div>`;
      }
      k++;
    }
    generateHTMLtext(value);
    return html;
  }

  function generateHexagons(value) {
    let html;
    hexagonContainer.innerHTML = '';

    if (hexagonFirstRow.value * 1 === 1 || value <= hexagonFirstRow.value * 1) {
      html = generateOneLine(value);
    } else {
      html = generateRows(value);
    }
    hexagonContainer.innerHTML = html;
  }

  // DISPLAY HTML AND CSS
  function generateHTMLtext(value) {
    generateCSStext();
    let html = '';
    for (i = 1; i <= value; i++) {
      html += `<div class="hexagon__outer"><div class="hexagon__inner">${i}</div></div>`;
    }

    let displayHTML = `
      <div class="hexagon-wrapper">
        <div class="hexagon-wrapper__hexagon-container">   
            ${html}
        </div>
      </div>
    `;
    htmlTextField.innerText = displayHTML;
  }

  function generateCSStext() {
    let displayCSS = `
    .hexagon-wrapper {
      background-color: ${backgroundColor.value};
      display: flex;
      justify-content: center;
      align-items: center;
    }
    
    .hexagon-wrapper__hexagon-container {
      width: ${hexagonFirstRow.value * hexagonSize.value}vw;
      display: flex;
      flex-wrap: wrap;
      transform: skew(${containerSkewX.value}deg, ${containerSkewY.value}deg);
    }
    
    .hexagon__outer {
      -webkit-clip-path: polygon(
        0 25%,
        50% 0,
        100% 25%,
        100% 75%,
        50% 100%,
        0 75%
      );
      clip-path: polygon(
        0 25%,
        50% 0,
        100% 25%,
        100% 75%,
        50% 100%,
        0 75%
      );
      width: ${hexagonSize.value}vw;
      height: ${(1.154665 * hexagonSize.value).toFixed(2)}vw;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: ${((1.154665 * hexagonSize.value) / -4).toFixed(2)}vw;
      transition: all ${hexagonTransition.value}s;
    }
  
    .hexagon__outer:hover {
      transform: scale(${hexagonScale.value}) rotate(${
      hexagonRotation.value
    }deg);
    }

    .hexagon__outer:nth-child(${
      hexagonFirstRow.value * 1 === 1 ? 'n' : '-n'
    } + ${hexagonFirstRow.value * 1 === 1 ? 0 : hexagonFirstRow.value}) {
        margin-top: 0;
      }
      
    .hexagon__outer:nth-child(${
      hexagonFirstRow.value * 1 === 1 ? '' : hexagonFirstRow.value * 2 - 1
    }n + ${
      hexagonFirstRow.value * 1 === 1 ? '' : hexagonFirstRow.value * 1 + 1
    }) {
        margin-left: ${0.5 * hexagonSize.value}vw;
      }
    
    .hexagon__inner {
      background-color: ${hexagonColor.value};
      -webkit-clip-path: polygon(
        0 25%,
        50% 0,
        100% 25%,
        100% 75%,
        50% 100%,
        0 75%
      );
      clip-path: polygon(
        0 25%,
        50% 0,
        100% 25%,
        100% 75%,
        50% 100%,
        0 75%
      );
      width: ${100 - hexagonGap.value}%;
      height: ${100 - hexagonGap.value}%;
      display: flex;
      justify-content: center;
      align-items: center;
      color: ${textColor.value};
    }
    `;

    if (hexagonFirstRow.value - 1 > 0) {
      displayCSS += `
        @media (max-width: ${mediaQuery_1.value}px) {
          .hexagon-wrapper__hexagon-container {
            width: ${(hexagonFirstRow.value - 1) * hexagonSize.value}vw;
          }
      
          /* reset */
          .hexagon__outer:nth-child(-n + ${hexagonFirstRow.value}) {
            margin-top: ${((1.154665 * hexagonSize.value) / -4).toFixed(2)}vw;
          }

          /* reset */
          .hexagon__outer:nth-child(${(hexagonFirstRow.value - 1) * 2 + 1}n + ${
        hexagonFirstRow.value * 1 + 1
      }) {
              margin-left: 0;
          }
      
          .hexagon__outer:nth-child(${
            hexagonFirstRow.value - 1 < 2 ? 'n' : '-n'
          } + ${
        hexagonFirstRow.value - 1 < 2 ? 0 : hexagonFirstRow.value - 1
      }) {
              margin-top: 0;
          }
      
          .hexagon__outer:nth-child(${
            (hexagonFirstRow.value - 1) * 2 - 1 < 3
              ? 0
              : (hexagonFirstRow.value - 1) * 2 - 1
          }n + ${
        hexagonFirstRow.value * 1 < 3 ? 0 : hexagonFirstRow.value * 1
      }) {
            margin-left: ${0.5 * hexagonSize.value}vw;
        }
      }
      `;
    }

    if (hexagonFirstRow.value - 2 > 0) {
      displayCSS += `
        @media only screen and (max-width: ${mediaQuery_2.value}px) {
          html {
            font-size: 50%;
          }

          .hexagon-wrapper__hexagon-container {
            width: ${(hexagonFirstRow.value - 2) * hexagonSize.value}vw;
          }

          /* reset */
          .hexagon__outer:nth-child(-n + ${hexagonFirstRow.value - 1}) {
            margin-top: ${((1.154665 * hexagonSize.value) / -4).toFixed(2)}vw;
          }

          /* reset */
          .hexagon__outer:nth-child(${(hexagonFirstRow.value - 1) * 2 - 1}n + ${
        hexagonFirstRow.value
      }) {
            margin-left: 0;
          }

          .hexagon__outer:nth-child(${
            hexagonFirstRow.value - 2 < 2 ? 'n' : '-n'
          } + ${
        hexagonFirstRow.value - 2 < 2 ? 0 : hexagonFirstRow.value - 2
      }) {
            margin-top: 0;
          }

          .hexagon__outer:nth-child(${
            (hexagonFirstRow.value - 1) * 2 - 3 < 3
              ? 0
              : (hexagonFirstRow.value - 1) * 2 - 3
          }n + ${
        hexagonFirstRow.value * 1 - 1 < 3 ? 0 : hexagonFirstRow.value * 1 - 1
      }) {
            margin-left: ${0.5 * hexagonSize.value}vw;
        }
      }
      `;
    }

    if (hexagonFirstRow.value - 3 > 0) {
      displayCSS += `
        @media only screen and (max-width: ${mediaQuery_3.value}px) {
          .hexagon-wrapper__hexagon-container {
            width: ${(hexagonFirstRow.value - 3) * hexagonSize.value}vw;
          }

          /* reset */
          .hexagon__outer:nth-child(-n + ${hexagonFirstRow.value - 2}) {
            margin-top: ${((1.154665 * hexagonSize.value) / -4).toFixed(2)}vw;
          }

          /* reset */
          .hexagon__outer:nth-child(${(hexagonFirstRow.value - 1) * 2 - 3}n + ${
        hexagonFirstRow.value * 1 - 1
      }) {
            margin-left: 0;
          }

          .hexagon__outer:nth-child(${
            hexagonFirstRow.value - 3 < 2 ? 'n' : '-n'
          } + ${
        hexagonFirstRow.value - 3 < 2 ? 0 : hexagonFirstRow.value - 3
      }) {
            margin-top: 0;
          }

          .hexagon__outer:nth-child(${
            (hexagonFirstRow.value - 1) * 2 - 5 < 3
              ? 0
              : (hexagonFirstRow.value - 1) * 2 - 5
          }n + ${
        hexagonFirstRow.value * 1 - 2 < 3 ? 0 : hexagonFirstRow.value * 1 - 2
      }) {
            margin-left: ${0.5 * hexagonSize.value}vw;
        } 
      }
      `;
    }

    cssTextField.innerText = displayCSS;
  }

  // EVENT LISTENERS
  backgroundColor.oninput = () => changeBackgroundColor(backgroundColor.value);

  hexagonColor.oninput = () => changeHexagonColor(hexagonColor.value);

  textColor.oninput = () => changeTextColor(textColor.value);

  hexagonSize.oninput = () => changeHexagonSize(hexagonSize.value);

  hexagonGap.oninput = () => changeGap(hexagonGap.value);

  containerSkewX.oninput = () => skewX(containerSkewX.value);

  containerSkewY.oninput = () => skewY(containerSkewY.value);

  hexagonRotation.oninput = () => rotateHexagon(hexagonRotation.value);

  hexagonScale.oninput = () => scaleHexagon(hexagonScale.value);

  hexagonTransition.oninput = () => transitionHexagon(hexagonTransition.value);

  hexagonAmount.oninput = () => generateHexagons(hexagonAmount.value);

  hexagonFirstRow.oninput = () => changeAmountFirstRow(hexagonFirstRow.value);

  mediaQuery_1.addEventListener('change', generateCSStext);
  mediaQuery_2.addEventListener('change', generateCSStext);
  mediaQuery_3.addEventListener('change', generateCSStext);

  // call the function for an initial display of hexagons
  generateHexagons(hexagonAmount.value);
})();
