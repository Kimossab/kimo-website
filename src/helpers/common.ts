export const fixBodyHeight = () => {
  const contents = document.getElementsByClassName("content");

  if (contents.length > 0) {
    document.body.style.height = `calc(${
      contents[contents.length - 1].getBoundingClientRect().height
    }px + 12.5rem)`;
  }
};
