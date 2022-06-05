var doc = window.document,
  context = doc.querySelector(".js-loop"),
  clones = context.querySelectorAll(".is-clone"),
  disableScroll = false,
  scrollHeight = 0,
  scrollPos = 0,
  clonesHeight = 0,
  i = 0;

function getScrollPos() {
  return (context.pageYOffset || context.scrollTop) - (context.clientTop || 0);
}

function setScrollPos(pos) {
  context.scrollTop = pos;
  console.log(`scroll at: ${pos}`);
}

function getClonesHeight() {
  clonesHeight = 0;

  for (i = 0; i < clones.length; i++) {
    clonesHeight = clonesHeight + clones[i].offsetHeight;
  }

  return clonesHeight;
}

function reCalc() {
  scrollPos = getScrollPos();
  scrollHeight = context.scrollHeight;
  clonesHeight = getClonesHeight();

  if (scrollPos <= 0) {
    setScrollPos(1); // Scroll 1 pixel to allow upwards scrolling
  }
}

function scrollUpdate() {
  if (!disableScroll) {
    scrollPos = getScrollPos();

    if (clonesHeight + scrollPos >= scrollHeight) {
      // Scroll to the top when you’ve reached the bottom
      setScrollPos(1); // Scroll down 1 pixel to allow upwards scrolling
      disableScroll = true;
    } else if (scrollPos <= 0) {
      // Scroll to the bottom when you reach the top
      setScrollPos(scrollHeight - clonesHeight);
      disableScroll = true;
    }
  }

  if (disableScroll) {
    // Disable scroll-jumping for a short time to avoid flickering
    window.setTimeout(function () {
      disableScroll = false;
    }, 50);
  }
}

const loader = () => {
  const preloader = document.querySelector(".preloader");
  preloader.classList.add("d-none");
  preloader.classList.remove("d-block");

  const loop = document.querySelector(".js-loop");
  loop.classList.add("d-block");
  // loop.classList.remove("d-none");

  const footer = document.querySelector("footer");
  footer.classList.remove("invisible");
  footer.classList.add("d-block");

  const mouse = document.querySelector(".middle");

  setTimeout(() => {
    mouse.classList.remove("d-block");
    mouse.classList.add("d-none");
  }, 8000);
};

function init() {
  setTimeout(() => {
    loader();
    reCalc();
    context.addEventListener(
      "scroll",
      function () {
        window.requestAnimationFrame(scrollUpdate);
      },
      false
    );

    window.addEventListener(
      "resize",
      function () {
        window.requestAnimationFrame(reCalc);
      },
      false
    );
    setScrollPos(
      Math.round(
        document.querySelector(".is-clone").getBoundingClientRect().bottom
      )
    );
  }, 8000);
}

if (document.readyState !== "loading") {
  init();
} else {
  doc.addEventListener("DOMContentLoaded", init, false);
}

window.onload = function () {
  if (window.location.hash) {
    // window.location = window.location + "#loaded";
    window.location.reload();
  }
};
