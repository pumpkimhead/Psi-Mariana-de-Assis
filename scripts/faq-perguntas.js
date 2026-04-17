const items = document.querySelectorAll(".faq-item");

items.forEach(item => {
  const button = item.querySelector(".faq-question");

  button.addEventListener("click", () => {
    item.classList.toggle("active");
  });
});

