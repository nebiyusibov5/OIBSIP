document.addEventListener('DOMContentLoaded', () => {
  const aboutDivs = document.querySelectorAll('#about_section > .about_div');
  if (aboutDivs[0]) aboutDivs[0].classList.add('reveal-left');
  if (aboutDivs[1]) aboutDivs[1].classList.add('reveal-right');
  if (aboutDivs[2]) aboutDivs[2].classList.add('reveal-left');
  if (aboutDivs[3]) aboutDivs[3].classList.add('reveal-right');

  const aboutImgDiv = document.querySelector('#about_section > div:nth-of-type(3)');
  if (aboutImgDiv) aboutImgDiv.classList.add('reveal-scale');

  const timelineLeft = document.querySelector('.timeline_div_left');
  const timelineRight = document.querySelector('.timeline_div_right');
  if (timelineLeft) timelineLeft.classList.add('reveal-left');
  if (timelineRight) timelineRight.classList.add('reveal-right');

  const quotesDivs = document.querySelectorAll('#quotes_section > div');
  if (quotesDivs[0]) quotesDivs[0].classList.add('reveal-left');
  if (quotesDivs[1]) quotesDivs[1].classList.add('reveal-scale');
  if (quotesDivs[2]) quotesDivs[2].classList.add('reveal-right');

  const cards = document.querySelectorAll('.masterpieces_card');
  cards.forEach((card, index) => {
    card.classList.add('reveal-up');
    card.style.transitionDelay = `${(index % 3) * 0.15}s`;
  });

  const animatedElements = document.querySelectorAll(
    '.reveal-up, .reveal-left, .reveal-right, .reveal-scale'
  );

  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px'
  };

  const scrollObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  animatedElements.forEach((el) => scrollObserver.observe(el));

  const interactiveCards = document.querySelectorAll('.about_div, .masterpieces_card, #quotes_section > div:not(:has(img))');
  
  interactiveCards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -7;
      const rotateY = ((x - centerX) / centerX) * 7;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)`;
    });
  });

  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', () => {
    let currentId = '';

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;

      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        currentId = section.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentId}`) {
        link.classList.add('active');
      }
    });
  });
});