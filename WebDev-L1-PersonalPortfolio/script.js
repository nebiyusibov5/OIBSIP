document.addEventListener("DOMContentLoaded", () => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show-scroll");
        }
      });
    },
    { threshold: 0.15 }
  );

  const animatedElements = document.querySelectorAll(
    "section, .project-card, .skills_card_container > div"
  );

  animatedElements.forEach((el) => {
    el.classList.add("hidden-scroll");
    observer.observe(el);
  });

  const textCard = document.querySelector("#about .text");

  if (textCard) {
    textCard.addEventListener("mousemove", (e) => {
      const rect = textCard.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      textCard.style.transform = `perspective(1000px) rotateX(${-y / 35}deg) rotateY(${x / 35}deg)`;
    });

    textCard.addEventListener("mouseleave", () => {
      textCard.style.transform =
        "perspective(1000px) rotateX(0deg) rotateY(0deg)";
      textCard.style.transition = "transform 0.5s ease";
    });
  }
});