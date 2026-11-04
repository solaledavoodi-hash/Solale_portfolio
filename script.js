// منوی موبایل
const menuToggle = document.querySelector('#menuToggle');
const mainNav = document.querySelector('#mainNav');

menuToggle.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'بستن منو' : 'باز کردن منو');
});

mainNav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mainNav.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  });
});

// نمایش تدریجی بخش‌ها هنگام اسکرول
const revealItems = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach(item => observer.observe(item));
} else {
  revealItems.forEach(item => item.classList.add('is-visible'));
}

// فرم سفارش: ساخت پیام و باز کردن واتساپ
const contactForm = document.querySelector('#contactForm');
const formNote = document.querySelector('#formNote');
const whatsappNumber = '989101951610'; // شماره با کد کشور، بدون صفر ابتدایی

contactForm.addEventListener('submit', event => {
  event.preventDefault();

  if (!contactForm.reportValidity()) return;

  const formData = new FormData(contactForm);
  const name = String(formData.get('name')).trim();
  const phone = String(formData.get('phone')).trim();
  const service = String(formData.get('service')).trim();
  const details = String(formData.get('details')).trim() || 'توضیحی وارد نشده است.';

  const message = [
    'سلام سلاله، برای ثبت و بررسی یک پروژه پیام می‌دهم.',
    '',
    `نام: ${name}`,
    `شماره تماس: ${phone}`,
    `خدمت موردنظر: ${service}`,
    `توضیحات: ${details}`,
    '',
    'ممنون می‌شوم برای ادامه هماهنگی راهنمایی‌ام کنید.'
  ].join('\n');

  const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
  const newWindow = window.open(whatsappURL, '_blank', 'noopener,noreferrer');

  if (!newWindow) {
    formNote.textContent = 'مرورگر پنجره جدید را مسدود کرد. لطفاً اجازه بازشدن واتساپ را بدهید یا از شماره تماس صفحه استفاده کنید.';
  } else {
    formNote.textContent = 'پیام آماده شد؛ در واتساپ آن را بررسی و ارسال کنید.';
  }
});
