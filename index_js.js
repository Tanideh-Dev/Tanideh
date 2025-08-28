const toggleBtn = document.getElementById('lang-toggle');

let isEnglish = true; // start in English mode


toggleBtn.addEventListener('click', () => {
  // flash animation
  toggleBtn.classList.remove("flash");
  void toggleBtn.offsetWidth; // reflow
  toggleBtn.classList.add("flash");

  // change title
  isEnglish = !isEnglish;

  // switch content
   document.querySelectorAll('.en').forEach(el => {
    el.classList.toggle('hidden', !isEnglish);
  });

  document.querySelectorAll('.fa').forEach(el => {
    el.classList.toggle('hidden', isEnglish);
  });

});
