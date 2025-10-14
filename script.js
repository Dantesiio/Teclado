const keys = document.querySelectorAll(".keyboard li");

function getRandomNumber(min, max) {
  const safeMin = Math.ceil(min);
  const safeMax = Math.floor(max);
  return Math.floor(Math.random() * (safeMax - safeMin + 1)) + safeMin;
}

function getRandomKey() {
  return keys[getRandomNumber(0, keys.length - 1)];
}

function targetRandomKey() {
  const key = getRandomKey();
  key.classList.add("selected");
}

document.addEventListener("keydown", (e) => {
  const keyPressed = e.key.toUpperCase();
  const keyElement = document.getElementById(keyPressed);
  const highlightedKey = document.querySelector(".selected");

  if (!keyElement) {
    return;
  }

  keyElement.classList.add("hit");

  keyElement.addEventListener("animationend", () => {
    keyElement.classList.remove("hit");
  });

  if (highlightedKey && keyPressed === highlightedKey.innerHTML) {
    highlightedKey.classList.remove("selected");
    if (keyPressed === "CAPSLOCK") {
      keyElement.classList.remove("selected");
    }
    if (keyPressed === "BACKSPACE") {
      keyElement.classList.remove("selected");
    }
    targetRandomKey();
  }
});

targetRandomKey();
