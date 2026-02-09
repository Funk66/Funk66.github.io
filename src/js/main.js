import "../css/main.styl";

let flipping = false;
let container = null;

window.addEventListener("load", () => {
  container = document.getElementById("container");

  const card = document.getElementById("card");
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      card.classList.add("ready");
    });
  });

  const frontEl = document.getElementById("front");
  if (frontEl) {
    frontEl.addEventListener("click", (e) => {
      if (e.target?.closest?.("a")) return;
      window.flip();
    });

    frontEl.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        window.flip();
      }
    });
  }

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

function scroll(event) {
  if (!container) return;
  const move = event?.deltaY || event?.detail;
  if (
    move &&
    ((move > 0 && container.className === "") ||
      (move < 0 && container.className === "reversed"))
  ) {
    window.flip();
  }
}

document.addEventListener("wheel", scroll, { passive: true });

window.flip = function() {
  if (!flipping) {
    flipping = true;
    container.classList.toggle("reversed");
    setTimeout(() => flipping = false, 1000);
  }
}