export default class Slider {
  constructor({ element, numberOfSlides }) {
    this.element = element;
    this.numberOfSlides = numberOfSlides;
    this.sliderContainer;
    for (const node of this.element.childNodes) {
      if (node.id === "s_container") {
        this.sliderContainer = node;
      }
    }
    this.autoSlide();
  }

  printWidth() {
    console.log(this.element.clientWidth);
  }

  autoSlide() {
    let counter = 0;
    let size = this.sliderContainer.clientWidth;
    window.addEventListener("resize", () => {
      size = this.sliderContainer.clientWidth;
    });

    let numberOfSlides = this.numberOfSlides;

    let slide = () => {
      window.onresize = function (event) {
        document.location.reload(true);
      };
      if (counter <= numberOfSlides) {
        counter++;
        this.sliderContainer.transition = "transform 3000ms ease-in-out";
        this.sliderContainer.style.transform = `translateX(${
          -size * counter
        }px)`;
        setTimeout(slide, 3000);
      } else {
        counter = 0;
        this.sliderContainer.style.transform = `translateX(${-size}px)`;
        slide();
      }
    };
    slide();
  }
}
