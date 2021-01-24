import "./styles/main.scss";
import gsap from "gsap";

const apiCall = async () => {
  const channel = "bryant-wells-eeaqnoam1yc";
  const makeURL = (page, per) =>
    `https://api.are.na/v2/channels/${channel}?page=${page}&amp;per=${per}`;

  fetch(makeURL(1, 100))
    .then((res) => res.join())
    .then((json) => console.log(json));

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
