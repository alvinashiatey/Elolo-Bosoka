import "./styles/main.scss";
import Slider from "./js/Slider";
import gsap from "gsap";

let el = document.querySelector(".image__container");
let slide = new Slider({ element: el, numberOfSlides: 35 });

const apiCall = async () => {
  const channel = "portfolio-udgybnlrh2o";
  const makeURL = (page, per) =>
    `https://api.are.na/v2/channels/${channel}?page=${page}&amp;per=${per}`;

  fetch(makeURL(1, 100))
    .then((res) => res.json())
    .then((json) => {
      const galleryContainer = document.getElementById("s_container");
      const about = document.getElementById("about-text");

      const contentArr = json.contents;
      console.log(contentArr);

      for (const content of contentArr) {
        if (content.image == null) {
          if (content.title == "About") {
            about.innerHTML = content.content_html;
          }
        } else {
          let newImg = document.createElement("img");
          newImg.src = content.image.original.url;
          newImg.setAttribute("data-active", false);
          let imgHolderDiv = document.createElement("div");
          imgHolderDiv.insertAdjacentElement("beforeend", newImg);
          imgHolderDiv.classList.add("img__holder");
          galleryContainer.insertAdjacentElement("beforeend", imgHolderDiv);
        }
      }
    });
};

apiCall();

function pixelate() {
  const filter = document.querySelector("#pixelate");
  const pixelFilterSize = filter.querySelector("#size");
  const homeLinks = document.querySelectorAll(".home_links");

  let tinyPixels = gsap.timeline({ paused: true }).to(pixelFilterSize, {
    duration: 1,
    attr: {
      radius: 0,
    },
    ease: "power3.inOut",
  });

  homeLinks.forEach((el) => {
    el.addEventListener("mouseover", () => {
      tinyPixels.play();
    });
    el.addEventListener("mouseleave", () => {
      tinyPixels.reverse();
    });
  });
}

pixelate();

function mouseEffect() {
  const mouseDiv = document.getElementById("overlay__cursor");
  let moveMouseDiv = (e) => {
    if (
      e.clientX >= mouseDiv.offsetWidth / 2 &&
      e.clientX <= mouseDiv.offsetWidth / 2 + 200 &&
      e.clientY >= mouseDiv.offsetHeight / 2 &&
      e.clientY <= mouseDiv.offsetHeight / 2 + 200
    ) {
      mouseDiv.style.clipPath = `circle(60em at ${e.clientX}px ${e.clientY}px)`;
      mouseDiv.style.transition = `clip-path 0.1s ease`;
    } else {
      mouseDiv.style.transition = `none`;
      mouseDiv.style.clipPath = `circle(5em at ${e.clientX}px ${e.clientY}px)`;
      mouseDiv.style.opacity = 1;
    }
  };
  window.addEventListener("mousemove", moveMouseDiv);
}

mouseEffect();

function textDisplay() {
  const aboutText = document.getElementById("about-text");
  const indexText = document.getElementById("index-text");
  const aboutBtn = document.getElementById("about-btn");
  const indexBtn = document.getElementById("index-btn");

  let aboutDisplay = () => {
    aboutBtn.addEventListener("click", (e) => {
      e.preventDefault();
      aboutText.classList.contains("hidden") ? slide.pause() : slide.play();
      aboutText.classList.toggle("hidden");
      indexText.classList.add("hidden");
    });
  };
  aboutDisplay();

  let indexDisplay = () => {
    indexBtn.addEventListener("click", (e) => {
      e.preventDefault();
      indexText.classList.toggle("hidden");
      aboutText.classList.add("hidden");
    });
  };
}
textDisplay();
