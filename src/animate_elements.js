import gsap from "gsap";

function gameStartAnimation() {
  const timeline = gsap.timeline();
  timeline.fromTo(
    ".game .quiz",
    { opacity: 0, y: "random(50, -50)" },
    { opacity: 1, y: 0, duration: 3, ease: "elastic", stagger: 0.2 }
  );
}

function welcomeAnimation() {
  gsap.fromTo(
    ".content-container *",
    { opacity: 0, y: 10 },
    { opacity: 1, y: 0, duration: 2, ease: "elastic", stagger: 0.5 }
  );
}

function setUpScreenAnimation() {
  gsap.fromTo(
    ".content-container *",
    { opacity: 0, y: "random(100, -100)" },
    { opacity: 1, y: 0, duration: 1, ease: "ease" }
  );
}

function fadeInLoadingScreen() {
  gsap.fromTo(
    ".App *",
    { opacity: 0, y: "random(150, -150)" },
    { opacity: 1, y: 0, duration: 1, ease: "ease", stagger: 0.1 }
  );
}

export {
  gameStartAnimation,
  welcomeAnimation,
  fadeInLoadingScreen,
  setUpScreenAnimation,
};
