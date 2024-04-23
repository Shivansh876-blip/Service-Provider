gsap.from(".nav-part1 a", {
  y: -100,
  duration: 1.5,
  delay: 2,
  stagger: 0.2,
});
gsap.from(".nav-part2  ", {
  y: -100,
  duration: 1.5,
  delay: 2,
  stagger: 0.2,
});
gsap.from(".nav-part1 a", {
  y: -100,
  duration: 1.5,
  delay: 2,
  stagger: 0.2,
});


gsap.from(".about button", {
  x: -800,
  duration: 1.5,
  delay: 2,
  stagger: 0.2,
});


gsap.to(".about .text", {
 opacity:1,
  duration:5,
  delay: 3,
  stagger: 0.2,
});
var tl = gsap.timeline({
  scrollTrigger: {
    trigger: "body",
    start: "10% 40%",
    scrub: 2,
  },
});
tl.to("nav", {
  backgroundColor: "black",
});
gsap.from(".image-item", {
 x:900,

  duration: 1.5,
  delay: 2,
  stagger: 0.2,
  scrollTrigger: {
    trigger: ".image-item",
    scroller: "body",
    scrub: true,
    markers:true,
    start: "top 70%",
    end:"80%",
    
   
  },
});
gsap.to(".cardss", {
  opacity: 1,
  scrollTrigger: {
    trigger: ".cardss",
    scroller: "body",
    scrub: true,
    start: "top 50%",
    end: " 15%  50%",
    stagger: 2,
  },
});


gsap.from(".client", {
  x: -200,
  duration: 1.5,
  delay: 2,
  stagger: 0.2,
  scrollTrigger: {
    trigger: ".client",
    scroller: "body",
    scrub: true,
    start: "top 80%",
    stagger: 0.2,
  },
});
gsap.from(".apart", {
  y: 600,
 


  scrollTrigger: {
    trigger: ".apart",
    scroller: "body",
    scrub: true,
    start: "top 95%",
    end :"30% 65%"
   
    
  },
});



// for increse number
let nums = document.querySelectorAll(".nums");
let section = document.querySelector(".about-service");
let started = false; // Function Started ? No

window.onscroll = function () {
  if (window.scrollY >= section.offsetTop) {
    if (!started) {
      nums.forEach((num) => startCount(num));
    }
    started = true;
  }
};

function startCount(el) {
  let goal = el.dataset.goal;
  let count = setInterval(() => {
    el.textContent++;
    if (el.textContent == goal) {
      clearInterval(count);
    }
  }, 2000 / goal);
}

// For Show OR hide nav on mobile and tab

const line = document.querySelector(".navline");
const Hide = document.querySelector(".hide");

line.addEventListener("click", () => {
  if (Hide.style.display === "none") {
    Hide.style.display = "block";
  } else {
    Hide.style.display = "none";
  }
});

// For Page loader
setTimeout(function myFunction() {
  const loader = document.querySelector(".loading");
  loader.style.display = "none";
}, 2000);

const initSlider = () => {
  const imageList = document.querySelector(".slider-wrapper .image-list");
  const slideButtons = document.querySelectorAll(
    ".slider-wrapper .slide-button"
  );
  const sliderScrollbar = document.querySelector(
    ".container .slider-scrollbar"
  );
  const scrollbarThumb = sliderScrollbar.querySelector(".scrollbar-thumb");
  const maxScrollLeft = imageList.scrollWidth - imageList.clientWidth;

  // Handle scrollbar thumb drag
  scrollbarThumb.addEventListener("mousedown", (e) => {
    const startX = e.clientX;
    const thumbPosition = scrollbarThumb.offsetLeft;
    const maxThumbPosition =
      sliderScrollbar.getBoundingClientRect().width -
      scrollbarThumb.offsetWidth;

    // Update thumb position on mouse move
    const handleMouseMove = (e) => {
      const deltaX = e.clientX - startX;
      const newThumbPosition = thumbPosition + deltaX;

      // Ensure the scrollbar thumb stays within bounds
      const boundedPosition = Math.max(
        0,
        Math.min(maxThumbPosition, newThumbPosition)
      );
      const scrollPosition =
        (boundedPosition / maxThumbPosition) * maxScrollLeft;

      scrollbarThumb.style.left = `${boundedPosition}px`;
      imageList.scrollLeft = scrollPosition;
    };

    // Remove event listeners on mouse up
    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    // Add event listeners for drag interaction
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  });

  // Slide images according to the slide button clicks
  slideButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const direction = button.id === "prev-slide" ? -1 : 1;
      const scrollAmount = imageList.clientWidth * direction;
      imageList.scrollBy({ left: scrollAmount, behavior: "smooth" });
    });
  });

  // Show or hide slide buttons based on scroll position
  const handleSlideButtons = () => {
    slideButtons[0].style.display = imageList.scrollLeft <= 0 ? "none" : "flex";
    slideButtons[1].style.display =
      imageList.scrollLeft >= maxScrollLeft ? "none" : "flex";
  };

  // Update scrollbar thumb position based on image scroll
  const updateScrollThumbPosition = () => {
    const scrollPosition = imageList.scrollLeft;
    const thumbPosition =
      (scrollPosition / maxScrollLeft) *
      (sliderScrollbar.clientWidth - scrollbarThumb.offsetWidth);
    scrollbarThumb.style.left = `${thumbPosition}px`;
  };

  // Call these two functions when image list scrolls
  imageList.addEventListener("scroll", () => {
    updateScrollThumbPosition();
    handleSlideButtons();
  });
};

window.addEventListener("resize", initSlider);
window.addEventListener("load", initSlider);
