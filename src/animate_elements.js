import gsap from "gsap";

export default function gameStartAnimation() {
  const timeline = gsap.timeline();
  timeline.fromTo(
    ".game .quiz",
    { opacity: 0, y: "random(50, -50)" },
    { opacity: 1, y: 0, duration: 2, ease: "elastic", stagger: 0.2 }
  );
}
