import gsap from "gsap";
import { gameConstants } from "./App";

function gameStartAnimation(gameMode) {
  const timeline = gsap.timeline({ id: "start" });
  timeline.fromTo(
    ".game .quiz",
    { opacity: 0, y: "random(50, -50)" },
    { opacity: 1, y: 0, duration: 3, ease: "elastic", stagger: 0.2 }
  );

  if (gameMode === gameConstants.TIMED_MODE)
    timeline.to(".timer", {
      color: "red",
      duration: gameConstants.DEFAULT_TIME_IN_SECONDS,
      ease: `steps(${Math.floor(gameConstants.DEFAULT_TIME_IN_SECONDS / 5)})`,
    });
}

function pauseTextColorAnimation() {
  gsap.getById("start").pause();
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
  pauseTextColorAnimation,
};
