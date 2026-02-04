import "../css/main.styl";

let flipping = false;
let container = null;

window.addEventListener("load", () => {
  container = document.getElementById("container");
});

function scroll(event) {
  event = event || window.event;
  const move = event.deltaY || event.detail;
  if (
    move &&
    ((move > 0 && container.className === "") ||
      (move < 0 && container.className === "reversed"))
  ) {
    window.flip();
  }
}

if ("onmousewheel" in document) {
  document.onmousewheel = scroll;
} else {
  document.addEventListener("DOMMouseScroll", scroll, false);
}

window.flip = function() {
  if (!flipping) {
    flipping = true;
    container.classList.toggle("reversed");
    setTimeout(() => flipping = false, 1000);
  }
}
