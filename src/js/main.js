import "../css/main.styl";

let flipping = false;
let currentAngle = 0;
let card = null;
let touchStartY = null;

const TOUCH_THRESHOLD = 30;
const COOLDOWN = 200;

window.addEventListener("load", () => {
  card = document.getElementById("card");

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      card.classList.add("ready");
    });
  });

  card.addEventListener("keydown", (e) => {
    if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      flip("down");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      flip("up");
    }
  });

  card.addEventListener("animationend", (e) => {
    if (e.animationName === "flip-shadow") {
      card.classList.remove("flipping");
      setTimeout(() => { flipping = false; }, COOLDOWN);
    }
  });

  const emailEl = document.getElementById("email");
  if (emailEl) {
    const u = [103, 117, 105, 108, 108, 101, 114, 109, 111];
    const d = [103, 117, 105, 114, 97, 111];
    const t = [110, 101, 116];
    const addr = `${String.fromCharCode(...u)}@${String.fromCharCode(
      ...d
    )}.${String.fromCharCode(...t)}`;

    emailEl.textContent = addr;
    emailEl.href = `mailto:${addr}`;
    emailEl.addEventListener("click", (e) => e.stopPropagation());
  }
});

document.addEventListener("wheel", (event) => {
  if (event.deltaY > 0) {
    flip("down");
  } else if (event.deltaY < 0) {
    flip("up");
  }
}, { passive: true });

document.addEventListener("touchstart", (e) => {
  touchStartY = e.touches[0].clientY;
}, { passive: true });

document.addEventListener("touchmove", (e) => {
  if (touchStartY === null) return;
  const delta = e.touches[0].clientY - touchStartY;
  if (Math.abs(delta) > TOUCH_THRESHOLD) {
    if (delta > 0) {
      flip("down");
    } else {
      flip("up");
    }
    touchStartY = e.touches[0].clientY;
    e.preventDefault();
  }
}, { passive: false });

document.addEventListener("touchend", () => {
  touchStartY = null;
}, { passive: true });

function flip(direction) {
  if (flipping || !card) return;
  flipping = true;

  currentAngle += direction === "down" ? 180 : -180;
  card.style.transform = `rotateX(${currentAngle}deg)`;

  card.classList.remove("flipping");
  void card.offsetWidth;
  card.classList.add("flipping");
  card.classList.toggle("inverted-light");
}

window.flip = flip;
