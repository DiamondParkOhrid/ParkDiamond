// JavaScript to open and close the modal
const modal = document.getElementById('modal');
const modalImage = document.getElementById('modal-image');
const closeBtn = document.getElementById('close');
const image = document.querySelectorAll('.Gallery-Slika');
image.forEach(item => {
    item.addEventListener('click', () => {
        modal.style.display = 'block';
        modalImage.src = item.src;
    });
});

closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});