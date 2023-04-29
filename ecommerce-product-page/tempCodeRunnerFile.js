
let curCount = document.querySelector('.product-count .cur-count');
curCount.children[0].onclick = ((e) => {
  if (curCount.children[1].innerHTML > 0) {
  updateCount(-1);
  }
});
curCount.children[2].onclick = ((e) => {
  updateCount(1);
});

function updateCount(num) {
  curCount.children[1].innerHTML = +curCount.children[1].innerHTML + num;
  curCount.children[1].dataset.count = +curCount.children[1].dataset.count + num;
  cartCounter.dataset.count = +cartCounter.dataset.count + num;
  cartCounter.innerHTML = +cartCounter.innerHTML + num;
  if (cartCounter.dataset.count > 0) {
    cartCounter.style.display = "inline-block";
  } else {
    cartCounter.style.display = "none";
  }
}