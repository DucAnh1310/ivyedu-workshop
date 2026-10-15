const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.nav-links');
const navigationLinks = navigation.querySelectorAll('a');
const interestSelect = document.getElementById('interest');
const registrationForm = document.getElementById('registration-form');
const formStatus = document.querySelector('.form-status');

// Mobile navigation.
function setMenuOpen(isOpen) {
  navigation.classList.toggle('open', isOpen);
  menuButton.setAttribute('aria-expanded', String(isOpen));
  menuButton.textContent = isOpen ? '×' : '☰';
}

menuButton.addEventListener('click', () => {
  setMenuOpen(!navigation.classList.contains('open'));
});

navigationLinks.forEach((link) => {
  link.addEventListener('click', () => setMenuOpen(false));
});

// Preselect the topic when a visitor chooses a direction card.
document.querySelectorAll('[data-interest]').forEach((link) => {
  link.addEventListener('click', () => {
    interestSelect.value = link.dataset.interest;
  });
});

// The demo form validates input but does not send registration data.
registrationForm.addEventListener('submit', (event) => {
  event.preventDefault();
  formStatus.hidden = false;
  formStatus.textContent =
    'Thông tin đã hợp lệ. Form hiện là bản giao diện và chưa kết nối hệ thống nhận đăng ký. Vui lòng liên hệ 0968 900 584 để đăng ký tham dự.';
});

// Highlight the navigation link for the section currently in view.
const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      navigationLinks.forEach((link) => {
        const isActive = link.getAttribute('href') === `#${entry.target.id}`;
        link.classList.toggle('active', isActive);
      });
    });
  },
  { rootMargin: '-20% 0px -55% 0px' },
);

document.querySelectorAll('main section[id]').forEach((section) => {
  sectionObserver.observe(section);
});
