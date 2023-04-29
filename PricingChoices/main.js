const userPlan = document.querySelector('.top-container .button');
const planHeader = document.querySelectorAll('div h2');
const initialPrices = [];

planHeader.forEach(header => initialPrices.push(header.innerHTML));
userPlan.addEventListener('click', (e) => {
  e.target.classList.toggle('clicked');
  const newPrices = e.target.matches(".clicked.button")
  ? ['&dollar;19.99', '&dollar;24.99', '&dollar;39.99']
  : initialPrices;

  // Update prices using a loop
  planHeader.forEach((header, index) => header.innerHTML = newPrices[index]);
});
