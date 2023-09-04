const backToTopBtn = document.getElementById('backToTopBtn');
window.onscroll = function() {
    if (document.body.scrollTop > 40 || document.documentElement.scrollTop > 40) {
        backToTopBtn.style.display = 'block';
        backToTopBtn.style.transition = 'display 0.5s ease-in-out';
    } else {
        backToTopBtn.style.display = 'none';
        backToTopBtn.style.transition = 'display 0.5s ease-in-out';
    }
};

// Scroll to the top when the button is clicked
backToTopBtn.addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});