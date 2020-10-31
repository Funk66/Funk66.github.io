var flipping = false;
var container = null;

window.onload = () => {
  container = document.getElementById("container");
}

function scroll (event) {
  var event = event || window.event;
  var move = event.deltaY || event.detail;
  console.log(event);
  if (move && (
    (move > 0 && container.className == "") ||
    (move < 0 && container.className == "reversed")
  )) {
    window.flip();
  }
}

if ("onmousewheel" in document) {
  document.onmousewheel = scroll;
} else {
  document.addEventListener('DOMMouseScroll', scroll, false);
}

window.flip = function() {
  if (!flipping) {
    flipping = true;
    container.classList.toggle("reversed");
    setTimeout(() => flipping = false, 1000);
  }
}
