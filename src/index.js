import "./styles/main.scss";
import Slider from "./js/Slider";
import gsap from "gsap";

const apiCall = async () => {
  const channel = "portfolio-udgybnlrh2o";
  const makeURL = (page, per) =>
    `https://api.are.na/v2/channels/${channel}?page=${page}&amp;per=${per}`;

  fetch(makeURL(1, 100))
    .then((res) => res.json())
    .then((json) => {
      const galleryContainer = document.getElementById("s_container");
      const about = document.getElementById("about");

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
  let el = document.querySelector(".image__container");
  let slide = new Slider({ element: el, numberOfSlides: 36 });
  slide.printWidth();
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
