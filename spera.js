let images = [
    "./img/1.jpg",
    "./img/2.jpg",
    "./img/3.jpg",
    "./img/4.jpg",
    "./img/5.jpg",
    "./img/6.jpg",
    "./img/7.jpg",
    "./img/8.jpg",
    "./img/9.jpg",
    "./img/10.jpg",
    "./img/11.jpg",
    "./img/12.jpg",
    "./img/13.jpg",
    "./img/14.jpg",
    "./img/15.jpg",
    "./img/16.jpg",
    "./img/17.jpg",
    "./img/18.jpg",
    "./img/19.jpg",
    "./img/20.jpg",
    "./img/21.jpg",
    "./img/22.jpg",
    "./img/23.jpg",
    "./img/24.jpg",
    "./img/25.jpg",
    "./img/26.jpg",
    "./img/27.jpg",
    "./img/28.jpg",
    "./img/29.jpg",
    "./img/30.jpg",
  ];
  let currentImageIndex = 0;
  function render() {
    showLoader();
    let content = document.getElementById("content");
    content.innerHTML = "";
    setTimeout(() => {
      for (let i = 0; i < images.length; i++) {
        content.innerHTML += `<div class="imgBox"><img onclick="openOverlay(${i})" src="${
          images[i]
        }" alt="Image ${i + 1}"></div>`;
      }
      hideLoader();
    }, 2000);
  }
  
  function openOverlay(i) {
    currentImageIndex = i;
    let overlay = document.getElementById("overlay");
    overlay.classList.remove("d-none");
    overlay.innerHTML = generatedHTML(i);
    document.addEventListener("keydown", handleKeyDown); // This line of code adds an event listener to the document that listens for keydown events and calls the handleKeyDown function whenever a key is pressed.
    document.body.style.overflow = "hidden"; // Prevent scrolling on the body
  }
  
  function generatedHTML(i) {
    return `
    <div class="overlayGallery">
    <span class="close" onclick="closeOverlay()">&times;</span>
    <a class="prev" onclick="changeImage(-1)">&#10094;</a>
    <div><img class="overlayImg" src="${images[i]}" alt="Image ${
  i + 1
  }"></div>
    <a class="next" onclick="changeImage(1)">&#10095;</a>
    </div>
  `;
  }
  
  function changeImage(direction) {
    let nextIndex = currentImageIndex + direction;
  
    if (nextIndex < 0) {
      nextIndex = images.length - 1;
    } else if (nextIndex >= images.length) {
      nextIndex = 0;
    }
  
    currentImageIndex = nextIndex;
  
   
    
  
    let overlayImg = document.querySelector(".overlayImg");
    
      overlayImg.src = images[currentImageIndex];
      overlayImg.alt = `Image ${currentImageIndex + 1}`;
    
  }
  
  function closeOverlay() {
    let overlay = document.getElementById("overlay");
    overlay.classList.add("d-none");
    overlay.innerHTML = "";
    document.body.style.overflow = ""; // Reset body overflow property
    document.removeEventListener("keydown", handleKeyDown); // Remove the keydown event listener
  }
  
  function handleKeyDown(event) {
    if (event.key === "ArrowLeft") {
      changeImage(-1);
    } else if (event.key === "ArrowRight") {
      changeImage(1);
    } else if (event.key === "Escape") {
      closeOverlay();
    }
  }
  
  function showLoader() {
    document.getElementById("loader").style.display = "block";
  }
  
  function hideLoader() {
    document.getElementById("loader").style.display = "none";
  }
  
  let touchStartX = 0;
  let touchEndX = 0;
  
  document.addEventListener("touchstart", handleTouchStart, false);
  document.addEventListener("touchmove", handleTouchMove, false);
  document.addEventListener("touchend", handleTouchEnd, false);
  
  function handleTouchStart(event) {
    touchStartX = event.touches[0].clientX;
  }
  
  function handleTouchMove(event) {
    touchEndX = event.touches[0].clientX;
  }
  
  function handleTouchEnd() {
    let swipeLength = touchEndX - touchStartX;
  
    if (Math.abs(swipeLength) > 50) {
      if (swipeLength > 0) {
        changeImage(-1);
      } else {
        changeImage(1);
      }
    }
  }
  