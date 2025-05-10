// import "./modules/dynamicAdapt"; // DYNAMIC ADAPTIVE

import "./modules/gsap.js";

import * as func from "./modules/functions.js"
func.isWebp();

function updateLine() {
  let points = Array.from(document.querySelectorAll('#line-point'));

  if (points.length > 1) {
    let path = document.querySelector('#connecting-line path');

    let rects = [];
    points.forEach(point => {
      rects.push(point.getBoundingClientRect());
    });

    let positionsX = [];
    for (let i = 0; i < rects.length; i++) {
      positionsX.push(rects[i].left + rects[i].width / 2 + window.scrollX);
    }

    let positionsY = [];
    for (let i = 0; i < rects.length; i++) {
      positionsY.push(rects[i].top + rects[i].height / 2 + window.scrollY);
    }

    let offsetX = 300;
    let offsetY = 1400;

    let pathM = `${positionsX[0]} ${positionsY[0]}`;

    let pathC = `${positionsX[0] - offsetX} ${positionsY[0] + offsetY / 2}, ${positionsX[1] - offsetX} ${positionsY[1] - offsetY / 2}, ${positionsX[1]} ${positionsY[1]}`;

    let pathS = ``;
    if (points.length > 2) {
      for (let i = 2; i < rects.length; i++) {
        pathS += `S ${positionsX[i] + offsetX} ${positionsY[i] - offsetY / 2}, ${positionsX[i]} ${positionsY[i]}\n`;
      }
    }

    let d = `
      M ${pathM}
      C ${pathC}
      ${pathS}
    `;

    path.setAttribute('d', d);
  }
}

window.addEventListener('DOMContentLoaded', (e) => {
  func.spollers();
  updateLine();
});
window.addEventListener('resize', updateLine);