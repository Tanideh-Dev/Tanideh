const toggleBtn = document.getElementById('lang-toggle');
const title = document.getElementById("site-title");

toggleBtn.addEventListener('click', () => {
  // flash animation
  toggleBtn.classList.remove("flash");
  void toggleBtn.offsetWidth; // reflow
  toggleBtn.classList.add("flash");

  // change title
  isEnglish = !isEnglish;
  title.textContent = isEnglish ? "Tanideh" : "تنیده";

  // switch content
  document.querySelectorAll('.en').forEach(el => {
    el.style.display = isEnglish ? "block" : "none";
  });
  document.querySelectorAll('.fa').forEach(el => {
    el.style.display = isEnglish ? "none" : "block";
  });
});
