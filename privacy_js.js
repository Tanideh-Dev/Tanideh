const toggleBtn = document.getElementById('lang-toggle');
toggleBtn.addEventListener('click', () => {
    document.querySelectorAll('.en, .fa').forEach(el => {
        el.style.display = (el.style.display === 'none' || el.style.display === '') ? 'block' : 'none';
    });
});
