import "./styles/main.scss";
import gsap from "gsap";

const apiCall = async () => {
  const channel = "portfolio-udgybnlrh2o";
  const makeURL = (page, per) =>
    `https://api.are.na/v2/channels/${channel}?page=${page}&amp;per=${per}`;

  fetch(makeURL(1, 100))
    .then((res) => res.json())
    .then((json) => {
      const galleryContainer = document.getElementById("g_container");
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
          galleryContainer.insertAdjacentElement("beforeend", newImg);
        }
      }
    });

  // const data = axios
  //   .get(makeURL(1, 100))
  //   .then((res) => {
  //     const dataTrs = res.data.contents[0].content_html;
  //     const imgArr = res.data.contents;
  //     const refPanel = document.querySelector(".img__postion");
  //     interviewReq.addEventListener("click", (e) => {
  //       e.preventDefault();

  //       //Regex funtion on strings
  //       let text = addTargetLink(dataTrs);
  //       classnameTag(text, transcription);
  //       const interviewDiv = document.querySelector(".item2");
  //       let div1Height = transcription.clientHeight;
  //       let div2Height = refPanel.clientHeight * imgArr.length;
  //       let scrollRatio =
  //         div2Height > div1Height
  //           ? div2Height / div1Height
  //           : div1Height / div2Height;

  //       console.log(div1Height);
  //       console.log(div2Height);
  //       console.log(scrollRatio);

  //       interviewDiv.addEventListener("scroll", () => {
  //         scrllpara("img__postion", interviewDiv, scrollRatio);
  //       });

  //       //revealparagraph(transcription.children, 0.1);

  //       const template = (link) =>
  //         `<img src="${link}" alt="bryant-wells" style = "width: 100%">`;

  //       for (let i = 1; i < imgArr.length; i++) {
  //         const e = imgArr[i].image;
  //         if (e) {
  //           let elink = imgArr[i].image.display.url;
  //           refPanel.insertAdjacentHTML("beforeend", template(elink));
  //         } else if (e === null) {
  //           let vlink = imgArr[i].attachment.url;
  //           refPanel.insertAdjacentHTML("beforeend", template(vlink));
  //         }
  //       }

  //       gsap.set(interviewReq, {
  //         writingMode: "vertical-rl",
  //         paddingRight: "1em",
  //       });

  //       if ("caches" in window) {
  //         caches.open("interviews").then((cache) => {
  //           cache.add(makeURL(1, 1));
  //         });
  //       }
  //     });
  //     return dataTrs;
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });

  // return data;
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
