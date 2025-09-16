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

  if(!isEnglish){
       loadFAQ("fa");
  }else{
      loadFAQ("en"); // or "fa"
  }


});



// FAQ Toggle Logic


async function loadFAQ(lang) {
  const res = await fetch(`faq-${lang}.json`);
  const data = await res.json();

  const faqContainer = document.querySelector(".faq");
  faqContainer.innerHTML = `
    <h3 class="${lang}">${lang === "en" ? "FAQ" : "سوالات متداول"}</h3>
  `;

  // Loop over HelpTitleMain
  Object.keys(data)
    .filter(key => key.startsWith("HelpTitleMain_"))
    .forEach((mainKey, mainIndex) => {
      const section = document.createElement("div");
      section.className = "faq-item";

      // Main title
      section.innerHTML = `
        <button class="faq-question">🔹 <span class="${lang}">${data[mainKey]}</span></button>
      `;

      // Add sub questions under this HelpTitle
      Object.keys(data)
        .filter(k => k.startsWith(`Hp${String(mainIndex+1).padStart(2,"0")}_`) && !k.endsWith("_"))
        .forEach(subKey => {
          const subDiv = document.createElement("div");
          if(lang === "en"){
          subDiv.className = "faq-sub marginLeft not-open";

          }else if(lang === "fa"){
          subDiv.className = "faq-sub marginRight not-open";
          }

          subDiv.innerHTML = `
            <button class="faq-sub-question" data-key="${subKey}">
              🗳 <span class="${lang}">${data[subKey]}</span>
            </button>
            <p class="faq-answer not-show sentence ${lang}" data-answer-key="${subKey}_"></p>
          `;

          section.appendChild(subDiv);
        });

      faqContainer.appendChild(section);
    });
}


async function loadFAQ_p(lang, pElem,key) {
  const res = await fetch(`faq-${lang}.json`);
  const data = await res.json();
  const answerText = data[key + "_"];

  const answerText2 = answerText.replace(/\n/g, "<br>");

    pElem.innerHTML = answerText2;
      if(pElem.classList.contains('not-show')){
        pElem.classList.remove('not-show');
        pElem.classList.add('show');
      }
}


document.addEventListener("click", e => {
  if (e.target.closest(".faq-sub-question")) {
    const btn = e.target.closest(".faq-sub-question");
    const key = btn.dataset.key;
    const lang = btn.querySelector("span").classList.contains("en") ? "en" : "fa";
    const pElem = document.querySelector(`p[data-answer-key="${key}_"]`);
  if (pElem) {
     if (pElem.classList.contains('show')) {
        pElem.classList.remove('show');
        pElem.classList.add('not-show');
      } else{
        loadFAQ_p(lang,pElem, key);
      }
    }
  }
  else if(e.target.closest(".faq-question"))
  {
  const sectionBtn = e.target.closest(".faq-question"); // get the button element
  const parent = sectionBtn.parentElement; // get its parent
    if(parent){
    parent.querySelectorAll('.faq-sub').forEach(sub => {
      if (sub.classList.contains('not-open')) {
        sub.classList.remove('not-open');
        sub.classList.add('open');
      } else if(sub.classList.contains('open')) {
        sub.classList.remove('open');
        sub.classList.add('not-open');
        // sub.querySelectorAll('.faq-answer').forEach(a => a.classList.remove('show'));
      }
    });
  }
  }
});

document.addEventListener("DOMContentLoaded", () => {
  loadFAQ("en"); // or "fa"
});
