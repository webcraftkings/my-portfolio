// Init AOS animations
AOS.init({ duration: 1000, once: true });

// Testimonial slider functionality
let currentTestimonial = 0;
const testimonials = document.querySelectorAll('.testimonial-card');
const dots = document.querySelectorAll('.dot');

function showTestimonial(index) {
  testimonials.forEach((testimonial, i) => {
    testimonial.classList.remove('active');
    dots[i].classList.remove('active');
  });
  testimonials[index].classList.add('active');
  dots[index].classList.add('active');
  currentTestimonial = index;
}

document.querySelector('.testimonial-prev').addEventListener('click', () => {
  currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
  showTestimonial(currentTestimonial);
});

document.querySelector('.testimonial-next').addEventListener('click', () => {
  currentTestimonial = (currentTestimonial + 1) % testimonials.length;
  showTestimonial(currentTestimonial);
});

dots.forEach((dot, index) => {
  dot.addEventListener('click', () => showTestimonial(index));
});

// Auto-rotate testimonials
setInterval(() => {
  currentTestimonial = (currentTestimonial + 1) % testimonials.length;
  showTestimonial(currentTestimonial);
}, 5000);

// Initialize first testimonial
if (testimonials.length > 0) {
  showTestimonial(0);
}

// Currency toggle for pricing
function toggleCurrency(value) {
  const currencyKey = value.toLowerCase();
  document.querySelectorAll('.pricing-card .price').forEach(el => {
    el.textContent = el.dataset[currencyKey] || el.dataset.usd;
  });
}
