import gsap from "https://cdn.skypack.dev/gsap@3.12.5";
import { ScrollTrigger } from "https://cdn.skypack.dev/gsap@3.12.5/ScrollTrigger";

import scrollama from "https://cdn.skypack.dev/scrollama@2.2.2";

import SplitType from "https://cdn.skypack.dev/split-type@0.3.3";

gsap.registerPlugin(ScrollTrigger);

const indicator = document.querySelector(".indicator");
if (indicator) {
  setTimeout(() => {
    indicator.style.display = "none";
  }, 10000);
}

const scroller = scrollama();

function handleStepEnter(response) {
  const { element } = response;
  if (element.dataset.step) {
    const id = element.parentElement.parentElement.dataset.flourishid;
    const slide = element.dataset.step;
    const iframe = document.querySelector(
      `section[data-flourishid="${id}"] iframe`
    );
    if (iframe) {
      iframe.setAttribute(
        "src",
        `https://flo.uri.sh/story/${id}/embed#slide-${slide}`
      );
    }
  }
}

function initScrollama() {
  scroller
    .setup({
      step: ".step",
      offset: 0.5,
      debug: false,
    })
    .onStepEnter(handleStepEnter)
    .onStepExit(() => {});

  window.addEventListener("resize", scroller.resize);
}

// ScrollTrigger Defaults
ScrollTrigger.defaults({
  markers: false,
});
ScrollTrigger.normalizeScroll(true);

// Horizontal Cards
function initHorizontalCards() {
  document.querySelectorAll(".horizontal-cards").forEach((section) => {
    const cards = section.querySelectorAll(".card");
    const tl = gsap.timeline();
    cards.forEach((card) => {
      tl.to(card, { left: -500 });
    });
    ScrollTrigger.create({
      trigger: section,
      start: "50% 50%",
      end: "+=1000",
      animation: tl,
      scrub: true,
      pin: section,
    });
  });
}

// Horizontal Slides
function initHorizontalSlides() {
  document.querySelectorAll(".horizontal-slides").forEach((section) => {
    const slides = section.querySelectorAll(".slide");
    section.style.width = `${slides.length * 100}%`;

    gsap.to(slides, {
      xPercent: -100 * (slides.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: section,
        pin: true,
        scrub: 1,
        snap: 1 / (slides.length - 1),
        end: "+=3500",
      },
    });
  });
}

// Vertical Slides
function initVerticalSlides() {
  document.querySelectorAll(".vertical-slides").forEach((section) => {
    const slides = section.querySelectorAll(".slide");
    slides.forEach((slide, i) => {
      ScrollTrigger.create({
        trigger: slide,
        start: "top top",
        pin: i !== slides.length - 1,
        pinSpacing: false,
      });
    });
  });
}

// Mini Slides
function initMiniSlides() {
  document.querySelectorAll(".mini-slides").forEach((section) => {
    const slides = section.querySelectorAll(".slide");
    gsap.to(slides, {
      ease: "none",
      duration: slides.length,
      xPercent: -(100 * (slides.length - 1)),
      scrollTrigger: {
        trigger: section,
        start: "center center",
        end: "+=" + 50 * slides.length + "%",
        scrub: true,
        pin: section.parentElement,
        snap: 1 / (slides.length - 1),
      },
    });
  });
}

// Animated Text
function initAnimatedText() {
  document.querySelectorAll(".animated-text").forEach((text) => {
    const splitedText = new SplitType(text, { types: "words, chars" });
    gsap.from(splitedText.chars, {
      opacity: 0,
      stagger: 0.2,
      y: 100,
      scrollTrigger: {
        trigger: text,
        start: "top 80%",
        end: "bottom 50%",
        scrub: true,
      },
    });
  });
}

// Init all animations
function initAnimations() {
  initScrollama();
  initHorizontalCards();
  initHorizontalSlides();
  initVerticalSlides();
  initMiniSlides();
  initAnimatedText();
}

if (typeof window !== "undefined") {
  window.addEventListener("DOMContentLoaded", function () {
    console.log("DOM completamente cargado");
    initAnimations();
  });
}
