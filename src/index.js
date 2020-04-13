import "./styles/reset/reset.scss";
import "./styles/main.scss";
import { revealBtn } from "./js/animation";
import axios from "axios";
import runtime from "serviceworker-webpack-plugin/lib/runtime";

const musicDiv = document.querySelector(".music__btn");
const transcription = document.getElementById("transcription");

const apiCall = async () => {
  const channel = "bryant-wells-eeaqnoam1yc";
  const makeURL = (page, per) =>
    `http://api.are.na/v2/channels/${channel}?page=${page}&amp;per=${per}`;

  const data = axios
    .get(makeURL(1, 1))
    .then((res) => {
      const dataTrs = res.data.contents[0].content_html;
      const interviewReq = document.querySelector(".interview__req");

      interviewReq.addEventListener("click", (e) => {
        e.preventDefault();
        transcription.innerHTML = dataTrs;
        if ("caches" in window) {
          caches.open("interviews").then((cache) => {
            cache.add(makeURL(1, 1));
          });
        }
      });
      return dataTrs;
    })
    .catch((err) => {
      console.log(err);
    });

  return data;
};

apiCall();

//service worker

if (
  "serviceWorker" in navigator &&
  (window.location.protocol === "https:" ||
    window.location.hostname === "localhost")
) {
  //Dont register till everything is okay
  //const registration = runtime.register();
}

//music

const musicPlayer = () => {
  let playing = true;
  let song = document.querySelector(".song");
  let play = document.getElementById("play");
  let iconChnage = document.querySelector("#play use");

  play.addEventListener("click", () => {
    if (playing) {
      song.play();
      playing = false;
      iconChnage.setAttribute("xlink:href", "/assets/sprite.svg#icon-pause");
      song.addEventListener("ended", () => {
        iconChnage.setAttribute("xlink:href", "/assets/sprite.svg#icon-play3");
      });
    } else {
      song.pause();
      playing = true;
      iconChnage.setAttribute("xlink:href", "/assets/sprite.svg#icon-play3");
    }
  });
};

musicPlayer();

//Animation calls
const animationCalls = () => {
  const interviewReq = document.querySelector(".interview__req");
  let state = true;
  interviewReq.addEventListener("click", (e) => {
    if (state) {
      state = !state;
      revealBtn(musicDiv, 0.6);
    }
  });
  console.log(state);
};

animationCalls();

//sticky top fucntion

const stickyNav = () => {
  if (musicDiv) {
    let stickTop = musicDiv.offsetTop;
    document.addEventListener("scroll", () => {
      if (window.scrollY >= stickTop) {
        musicDiv.classList.add("fixedNav");
      } else {
        musicDiv.classList.remove("fixedNav");
      }
    });
  }
};

stickyNav();

// loop through links

const loopLinks = () => {
  const data = apiCall();
  const linkArray = document.querySelectorAll("#transcription a");
  data.then((res) => {
    console.log(res);
  });
};

loopLinks();
