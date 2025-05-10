// import "./modules/dynamicAdapt"; // DYNAMIC ADAPTIVE

import "./modules/gsap.js";

import * as func from "./modules/functions.js"
func.isWebp();

function updateLine() {
    const points = [
        document.getElementById('point1'),
        document.getElementById('point2'),
        document.getElementById('point3')
    ];

    const path = document.querySelector('#connecting-line path');

    const rect1 = points[0].getBoundingClientRect();
    const rect2 = points[1].getBoundingClientRect();
    const rect3 = points[2].getBoundingClientRect();

    const startX = rect1.left + rect1.width / 2 + window.scrollX;
    const startY = rect1.top + rect1.height / 2 + window.scrollY;

    const midX1 = rect2.left + rect2.width / 2 + window.scrollX;
    const midY1 = rect2.top + rect2.height / 2 + window.scrollY;

    const midX2 = rect3.left + rect3.width / 2 + window.scrollX;
    const midY2 = rect3.top + rect3.height / 2 + window.scrollY;

    const offsetX = 300;
    const offsetY = 1400;

    const d = `
      M ${startX} ${startY}
      C ${startX - offsetX} ${startY + offsetY / 2}, ${midX1 - offsetX} ${midY1 - offsetY / 2}, ${midX1} ${midY1}
      S ${midX2 + offsetX} ${midY2 - offsetY / 2}, ${midX2} ${midY2}
    `;

    path.setAttribute('d', d);
}

window.addEventListener('DOMContentLoaded', (e) => {
  func.spollers();
  updateLine();
});
window.addEventListener('resize', updateLine);