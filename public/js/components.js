"use strict";

const body = document.body;

// NAVBAR
const navbarMenu = document.getElementById("navbar-menu");
const navbarList = document.getElementById("navbar-list");
const navbarIcon = document.getElementById("navbar-icon");

// toggle menu list open or closed on navbar
navbarMenu.addEventListener("click", ()=>{
    navbarList.classList.toggle("menu-display");
    navbarIcon.classList.toggle("icon-spin");
});

// close menu list when menu link clicked
navbarList.addEventListener("click", ()=>{
    navbarList.classList.toggle("menu-display");
    navbarIcon.classList.toggle("icon-spin");
});


// CAROUSEL
let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {

  const slides = document.getElementsByClassName("slides");
  const dots = document.getElementsByClassName("dot");

  if (n > slides.length) {slideIndex = 1}

  if (n < 1) {slideIndex = slides.length}

  for (let i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  }

  for (let i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }

  slides[slideIndex-1].style.display = "block";

  dots[slideIndex-1].className += " active";
}