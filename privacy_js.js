const toggleBtn = document.getElementById('lang-toggle');
const title = document.getElementById("site-title");

toggleBtn.addEventListener('click', () => {

  // trigger flash animation
  langBtn.classList.remove("flash");
  void langBtn.offsetWidth; // force reflow to restart animation
  langBtn.classList.add("flash");

// change title language
  isEnglish = !isEnglish;
  title.textContent = isEnglish ? "Tanideh" : "تنیده";

// change privacy language
    document.querySelectorAll('.en, .fa').forEach(el => {
        el.style.display = (el.style.display === 'none' || el.style.display === '') ? 'block' : 'none';
    });
});
