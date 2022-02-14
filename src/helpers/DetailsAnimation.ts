class DetailsAnimation {
  private element: HTMLDetailsElement;
  private summary: HTMLElement | null;
  private content: HTMLDivElement | null;
  private animation: Animation | null = null;
  private isClosing = false;
  private isExpanding = false;

  constructor(el: HTMLDetailsElement) {
    this.element = el;
    this.summary = el.querySelector("summary");
    this.content = el.querySelector(".details-content");
    this.summary?.addEventListener("click", (e) => this.onClick(e));
  }

  onClick(e: Event) {
    e.preventDefault();

    this.element.style.overflow = "hidden";

    if (this.isClosing || !this.element.open) {
      this.open();
    } else if (this.isExpanding || this.element.open) {
      this.shrink();
    }
  }

  shrink() {
    this.isClosing = true;

    const startHeight = `${this.element.offsetHeight}px`;
    const endHeight = `${this.summary?.offsetHeight}px`;

    if (this.animation) {
      this.animation.cancel();
    }

    this.animation = this.element.animate(
      {
        height: [startHeight, endHeight],
      },
      {
        duration: 100,
      }
    );

    this.animation.onfinish = () => this.onAnimationFinish(false);
    this.animation.oncancel = () => (this.isClosing = false);
  }

  open() {
    this.element.style.height = `${this.element.offsetHeight}px`;
    this.element.open = true;
    window.requestAnimationFrame(() => this.expand());
  }

  expand() {
    if (this.summary && this.content) {
      this.isExpanding = true;
      const startHeight = `${this.element.offsetHeight}px`;
      const endHeight = `${
        this.summary.offsetHeight + this.content.offsetHeight
      }px`;

      if (this.animation) {
        this.animation.cancel();
      }

      this.animation = this.element.animate(
        {
          height: [startHeight, endHeight],
        },
        {
          duration: 100,
        }
      );
      this.animation.onfinish = () => this.onAnimationFinish(true);
      this.animation.oncancel = () => (this.isExpanding = false);
    }
  }

  onAnimationFinish(open: boolean) {
    this.element.open = open;
    this.animation = null;
    this.isClosing = false;
    this.isExpanding = false;
    this.element.style.height = this.element.style.overflow = "";
  }
}

export default DetailsAnimation;
