// --- CAROUSEL FUNCTIONALITY ---
let slideIndex = 0;
const slides = document.querySelector('.carousel-slide');
const images = document.querySelectorAll('.carousel-slide img');
const totalSlides = images.length;

function showSlide(index) {
  if (index < 0) slideIndex = totalSlides - 1;
  else if (index >= totalSlides) slideIndex = 0;
  else slideIndex = index;

  slides.style.transform = `translateX(-${slideIndex * 100}%)`;
}

document.querySelector('.carousel-btn.prev').addEventListener('click', () => {
  showSlide(slideIndex - 1);
});

document.querySelector('.carousel-btn.next').addEventListener('click', () => {
  showSlide(slideIndex + 1);
});

// Auto-slide every 5 seconds
setInterval(() => {
  showSlide(slideIndex + 1);
}, 5000);

// --- FORM SUBMISSION HANDLING WITH MODAL CONFIRMATION ---

const form = document.querySelector("form");
const modal = document.getElementById("confirmation-modal");
const modalCloseBtn = modal.querySelector(".modal-close");
const submitBtn = form.querySelector("button");

form.addEventListener("submit", function(e) {
  e.preventDefault();

  const formData = new FormData(form);

  submitBtn.disabled = true;
  submitBtn.textContent = "Sending...";

  fetch("https://formspree.io/f/xzzgbyzw", {
    method: "POST",
    headers: { 'Accept': 'application/json' },
    body: formData
  })
  .then(response => {
    if (response.ok) {
      form.reset();
      showModal();
    } else {
      alert("Failed to send message. Please try again.");
    }
  })
  .catch(() => alert("Error sending message."))
  .finally(() => {
    submitBtn.disabled = false;
    submitBtn.textContent = "Send";
  });
});

function showModal() {
  modal.style.display = "flex";
  document.body.style.overflow = "hidden"; // Prevent background scroll
}

function closeModal() {
  modal.style.display = "none";
  document.body.style.overflow = "auto";
}

modalCloseBtn.addEventListener("click", closeModal);

modal.addEventListener("click", (event) => {
  if (event.target === modal) {
    closeModal();
  }
});



function toggleInfo(type) {
  const el = document.getElementById(`${type}-info`);
  el.style.display = 'block';
  setTimeout(() => {
    el.style.display = 'none';
  }, 3000);
}
