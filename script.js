const burgerScale = document.querySelector(".burger");
const burgerSVG = document.querySelector(".burger svg");
const body = document.body;

const navOpen = () => {
  const nav = document.querySelector(".nav-links");
  const navLinks = document.querySelectorAll(".nav-links li");

  burgerScale.addEventListener("click", () => {
    setTimeout(function() {
      setBodyState();
    }, 100);
    // Toogle Nav
    nav.classList.toggle("active");
    burgerScale.classList.toggle("active");
    burgerSVG.classList.toggle("active");

    // Animate Links
    navLinks.forEach((link, index) => {
      var linkAnimated = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;

      link.addEventListener("click", event => {
        nav.classList.remove("active");
        burgerScale.classList.remove("active");
        burgerSVG.classList.remove("active");
        removeStyle(navLinks);
        setBodyState();
      });

      if (link.style.animation) {
        link.style.animation = "";
      } else {
        link.style.animation = linkAnimated;
      }
    });
  });
};

navOpen();

var setBodyState = function() {
  if (burgerScale.className === "burger active") {
    body.style.position = "relative";
    body.style.overflowY = "hidden";
  } else {
    body.style.position = "static";
    body.style.overflowY = "auto";
  }
};

//Parralax effect
window.addEventListener("scroll", function(e) {
  const target = document.querySelectorAll(".scroll");

  var length = target.length;

  for (var i = 0; i < length; i++) {
    var pos = window.pageYOffset * target[i].dataset.rate;

    target[i].style.transform = `translate3d(0px,` + pos + `px, 0px)`;
  }
});

// const backgroundCards = document.querySelectorAll(".cards");

// for (const backgroundCard of backgroundCards) {

//     backgroundCard.addEventListener("mousemove", function (e) {
//         x = e.offsetX;
//         y = e.offsetY;
//         xy = x + y
//         backgroundCard.style.background = `linear-gradient(` + xy + `deg, #0093e9 0%, #80d0c7 100%)`;
//     });
// }
