import type { Directive } from "vue";

const loadImage = (el: HTMLElement): void => {
  const imageElement = Array.from(el.children).find(
    (el) => el.nodeName === "IMG"
  ) as HTMLImageElement | undefined;

  if (imageElement) {
    imageElement.addEventListener("load", () => {
      setTimeout(() => imageElement.classList.add("loaded"), 100);
    });
    imageElement.addEventListener("error", () => console.log("error"));
    imageElement.src = imageElement.dataset.url || "#";
  }
};

const createObserver = (el: HTMLElement): void => {
  const handleIntersect: IntersectionObserverCallback = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        loadImage(el);
        observer.unobserve(el);
      }
    });
  };

  const options: IntersectionObserverInit = {
    root: null,
    threshold: 0,
  };
  const observer = new IntersectionObserver(handleIntersect, options);
  observer.observe(el);
};

const LazyImgLoadDirective: Directive = {
  mounted: (el: HTMLElement) => {
    if (window.IntersectionObserver) {
      createObserver(el);
    } else {
      loadImage(el);
    }
  },
};
export default LazyImgLoadDirective;
