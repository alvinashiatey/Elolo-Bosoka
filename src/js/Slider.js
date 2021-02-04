export default class Slider {
  constructor({ element, numberOfSlides, autoplay = true }) {
    this.element = element;
    this.numberOfSlides = numberOfSlides;
    this.sliderContainer = this.element.firstElementChild;
    this.autoSlide(autoplay);
  }

  printWidth() {
    console.log(this.element.firstElementChild);
    console.log(this.sliderContainer.offsetWidth);
    console.log(this.sliderContainer.clientWidth);
  }

  autoSlide(autoplay) {
    let counter = -1;
    let size = this.sliderContainer.offsetWidth;
    let numberOfSlides = this.numberOfSlides;

    /* responsiveness */
    window.addEventListener("resize", () => {
      size = this.sliderContainer.clientWidth;
      slideTransform();
    });

    let slideTransform = () => {
      this.sliderContainer.style.transform = `translate3d(${
        -size * counter
      }px, 0,0)`;
    };

    let slide = () => {
      if (counter < numberOfSlides) {
        counter++;
        slideTransform();
        setTimeout(slide, 3000);
      } else {
        counter = -1;
        slideTransform();
        slide();
      }
    };

    if (autoplay) {
      slide();
    }
  }
}
