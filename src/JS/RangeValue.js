const range=document.getElementById('people');
const rangeVrednost=document.getElementById('peopleValue');

range.addEventListener('input', () =>{
   rangeVrednost.textContent=range.value;
});