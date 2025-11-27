  // Smooth scroll
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
  });

  // Hide navbar on scroll down, show on scroll up
  let prevScrollPos = window.pageYOffset;
  const navbar = document.getElementById("navbar");

  window.addEventListener("scroll", function() {
    let currentScrollPos = window.pageYOffset;
    if (prevScrollPos > currentScrollPos) {
        navbar.style.top = "0";
    } else {
        navbar.style.top = "-80px"; // hide height
    }
    prevScrollPos = currentScrollPos;
  });


  let slideIndex = 0;
  const slides = document.querySelectorAll(".slide");

  function showSlides() {
      slides.forEach(slide => slide.classList.remove("active"));
      slideIndex++;
      if (slideIndex > slides.length) { slideIndex = 1 }
      slides[slideIndex - 1].classList.add("active");
      setTimeout(showSlides, 4000); // Change every 4 seconds
  }

  showSlides();


  // Open Modal
  document.querySelectorAll('.more-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const modalId = this.getAttribute('data-modal');
      document.getElementById(modalId).style.display = 'flex';
    });
  });

  // Close Modal
  document.querySelectorAll('.close').forEach(btn => {
    btn.addEventListener('click', function() {
      this.closest('.modal').style.display = 'none';
    });
  });

  // Close on Book Now
  document.querySelectorAll('.book-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const modal = this.closest('.modal');
      modal.style.display = 'none';

      // Navigate to contact section
      const target = document.querySelector(this.getAttribute('data-target'));
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  // Close modal if clicking outside
  window.addEventListener('click', function(e) {
    if (e.target.classList.contains('modal')) {
      e.target.style.display = 'none';
    }
  });

  // FAQ Toggle with + / -
  document.querySelectorAll(".faq-question").forEach(btn => {
    btn.addEventListener("click", () => {
      const answer = btn.nextElementSibling;
      const icon = btn.querySelector(".icon");

      // Close all other answers first
      document.querySelectorAll(".faq-answer").forEach(ans => {
        if (ans !== answer) {
          ans.style.display = "none";
          ans.previousElementSibling.querySelector(".icon").textContent = "+";
        }
      });

      // Toggle the clicked one
      if (answer.style.display === "block") {
        answer.style.display = "none";
        icon.textContent = "+";
      } else {
        answer.style.display = "block";
        icon.textContent = "–";
      }
    });
  });

  // Review Carousel
const cards = document.querySelectorAll(".review-card");
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");

let activeIndex = 0;
const total = cards.length;

function updateCarousel() {
  cards.forEach((card, i) => {
    // calculate relative position from activeIndex
    let offset = i - activeIndex;

    // make it circular (loop effect)
    if (offset < -Math.floor(total / 2)) {
      offset += total;
    } else if (offset > Math.floor(total / 2)) {
      offset -= total;
    }

    // Position each card horizontally
    const xPos = offset * 320; // adjust gap between cards
    const scale = offset === 0 ? 1.2 : 0.85; // center card bigger
    const opacity = offset === 0 ? 1 : 0.5;
    const zIndex = offset === 0 ? 10 : 1;

    card.style.transform = `translateX(${xPos}px) scale(${scale})`;
    card.style.opacity = opacity;
    card.style.zIndex = zIndex;

    card.classList.toggle("active", offset === 0);
  });
}

nextBtn.addEventListener("click", () => {
  activeIndex = (activeIndex + 1) % total;
  updateCarousel();
});

prevBtn.addEventListener("click", () => {
  activeIndex = (activeIndex - 1 + total) % total;
  updateCarousel();
});

// Auto-play
setInterval(() => {
  activeIndex = (activeIndex + 1) % total;
  updateCarousel();
}, 5000);

updateCarousel();

  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'AW-17734560765');


  (function(){
    emailjs.init("fYnyqn0AknqjV_yXU"); // Replace with your EmailJS User ID
  })();

  document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission

    emailjs.sendForm('service_e9epe9d', 'template_yjd2xxt', this)
      .then(function() {
        alert('Message sent successfully!');
        document.getElementById('contact-form').reset(); // Reset form
      }, function(error) {
        alert('Failed to send message: ' + JSON.stringify(error));
      });
  });