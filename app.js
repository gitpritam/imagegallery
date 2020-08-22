let DOMselector = (function () {
  const thumbnail = document.querySelectorAll(".slider img");
  const preview = document.querySelector(".container__preview img");
  const prevButton = document.querySelector(".prevbtn svg");
  const nextButton = document.querySelector(".nextbtn svg");
  return {
    thumbnail: thumbnail,
    preview: preview,
    prevButton: prevButton,
    nextButton: nextButton,
  };
})();

let imageSlider = (function (dom) {
  let activeElement = dom.thumbnail[0].parentElement;
  let indexOfactiveElement = 0;

  //remove first time fade-in class from preview
  //remove fade-in after delay
  setTimeout(() => dom.preview.classList.remove("fade-in"), 1000);

  function updateThumbnail(target) {
    activeElement.classList.remove("active");
    activeElement = target.parentElement;
    activeElement.classList.toggle("active");
    //add fade-in to preview
    dom.preview.classList.toggle("fade-in");
  }

  function updatePreview() {
    //show preview and
    dom.preview.src = activeElement.firstElementChild.src;
    //remove fade-in after delay
    setTimeout(() => dom.preview.classList.remove("fade-in"), 250);
  }

  for (let i = 0; i < dom.thumbnail.length; i++) {
    dom.thumbnail[i].addEventListener("click", (e) => {
      activeElement.addEventListener("click", () => {
        return;
      });
      updateThumbnail(e.target);
      updatePreview();
      // update indexofcurrentelement
      indexOfactiveElement = i;
    });
  }

  //previous button
  dom.prevButton.parentElement.addEventListener("click", () => {
    if (activeElement === dom.thumbnail[0].parentElement) {
      //do nothing
      return;
    } else {
      indexOfactiveElement -= 1;
      updateThumbnail(dom.thumbnail[indexOfactiveElement]);
      updatePreview();
      activeElement = dom.thumbnail[indexOfactiveElement].parentElement;
    }
  });

  //next button
  dom.nextButton.parentElement.addEventListener("click", () => {
    if (
      activeElement === dom.thumbnail[dom.thumbnail.length - 1].parentElement
    ) {
      //do nothing
      return;
    } else {
      indexOfactiveElement += 1;
      updateThumbnail(dom.thumbnail[indexOfactiveElement]);
      updatePreview();
      activeElement = dom.thumbnail[indexOfactiveElement].parentElement;
    }
  });
})(DOMselector);
