import type { Directive } from "vue";

const loadImage = (el: HTMLElement, srcPath: string): void => {
  const imageElement = Array.from(el.children).find(
    (el) => el.nodeName === "IMG"
  ) as HTMLImageElement | undefined;

  if (imageElement) {
    imageElement.addEventListener("load", () => {
      setTimeout(() => imageElement.classList.add("loaded"), 100);
    });
    imageElement.addEventListener("error", () => console.log("error"));
    imageElement.src = srcPath;
  }
};

const createObserver = (el: HTMLElement, srcPath: string): void => {
  const handleIntersect: IntersectionObserverCallback = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        loadImage(el, srcPath);
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

const LazyImgLoadDirective: Directive<HTMLElement, string> = {
  mounted: (el, binding) => {
    if (window.IntersectionObserver) {
      createObserver(el, binding.value);
    } else {
      loadImage(el, binding.value);
    }
  },
};
export default LazyImgLoadDirective;
