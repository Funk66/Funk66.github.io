window.onload = function(e) {
  console.log("hello onload");
  window.addEventListener("scroll", (e) => {
    console.log("Scrolling");
  });
};

window.flip = function() {
  console.log("Reversing");
  document.getElementById("container").classList.toggle("reversed");
}

window.showFront = () => {
  document.getElementById("card").className = "front"
}

window.showBack = () => {
  document.getElementById("card").className = "back"
}

window.scroll = () => {
  window.scrolling = true;
}

setInterval(() => {
  if (window.scrolling) {
    console.log("scrolling");
    scrolling = false
    window.flip()
  }
}, 1000);

window.scrolling = false;

// flip on scroll down/up
// global scroll and card scroll (flip up or down)
