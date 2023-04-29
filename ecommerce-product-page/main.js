
const $All = (s) => document.querySelectorAll(s),
      $ = (s) => document.querySelector(s),
      imageOpt = $All('.img-opt img'),
      currentImg = $('.images-container .current-img'),
      pickedImage = ['image-product-1.jpg', 'image-product-2.jpg', 'image-product-3.jpg', 'image-product-4.jpg'],
      cartCounter = $('.cart > span'),
      cart = $('.cart'),
      cartDiv = $('.hidden div:nth-child(2)'),
      hiddenCart = $('.hidden'),
      toggleSVG = $('.toggle-menu svg'),
      productBtn = $('.product-count button'),
      IMG_PATH = "images\\",
      prevImg = `<img src="${IMG_PATH}icon-previous.svg" alt="">`,
      nextImg = `<img src="${IMG_PATH}icon-next.svg" alt="">`
;
let currentPrice = $('.current-price span:first-of-type');
const priceText = currentPrice.innerHTML.substring(1).replace(/\.\d{2}/, '');


currentImg.innerHTML = `<img src="images/${pickedImage[0]}" alt=""><span>${prevImg}</span><span>${nextImg}</span>`;

imageOpt.forEach((img, key) => {
  img.addEventListener('click', (e) => {
    handleActiveState(e)
    currentImg.innerHTML = `<img src="images/${pickedImage[key]}" alt=""><span>${prevImg}</span><span>${nextImg}</span>`;
    const div = currentImg.cloneNode(true);
    div.setAttribute('class', 'light-box');
    div.childNodes[1].classList.add('left-arrow');
    div.childNodes[2].classList.add('right-arrow');
    const overlay = document.createElement('div');
    overlay.className = 'popup-overlay';
    document.body.appendChild(overlay);
    const closeButton = document.createElement("span");
    closeButton.textContent = "X";
    closeButton.className = 'close-button';
    div.appendChild(closeButton);
    document.body.appendChild(div);
  });
});

document.addEventListener('click', (e) => {
  const l = $('.left-arrow');
  const r = $('.right-arrow');
  let i = pickedImage.indexOf(currentImg.children[0].src.split('/').slice(-1).join('/'));
  if (e.target === currentImg.children[1] || e.target.parentNode === currentImg.children[1] || e.target === l || e.target.parentNode === l) {
    i = (pickedImage.length + i - 1) % pickedImage.length;
  } else if (e.target === currentImg.children[2] || e.target.parentNode === currentImg.children[2] || e.target === r || e.target.parentNode === r) {
    i = (i + 1) % pickedImage.length;
  }
  currentImg.children[0].src = `images/${pickedImage[i]}`;
  if ($('.light-box')) $('.light-box img').src = `images/${pickedImage[i]}`;
});
function handleActiveState(ev) {
  ev.target.parentElement.querySelectorAll(".active").forEach(ele =>{
    ele.classList.remove("active");
  });
  ev.target.classList.add("active");
};

let curCount = $('.product-count .cur-count');
let cur1 = curCount.children[1];
let cur2 = curCount.children[2];

curCount.children[0].onclick = ((e) => {
  if (cur1.innerHTML > 0) {
  updateCount(-1);
  }
});
cur2.onclick = ((e) => {
  updateCount(1);
});

cart.onclick = function() {//can't use [this keyword] with arrow functions❌
  this.classList.toggle('clicked');
};
productBtn.onclick = (e) => {
  const count = cur1.innerHTML;
  cartCounter.dataset.count = count;
  cartCounter.innerHTML = count;
  if (count > 0) {
    cartDiv.remove();
    cartCounter.style.display = "inline-block";
    const product = $All('.hidden .product')[0];
    if (!product || product.querySelector('h4').innerHTML !== $('.main-article h1').innerHTML) {
      const div = document.createElement("div");
      div.className = "product";
      div.innerHTML = `
        <img src="images/${imageOpt[0].src.split('/').slice(-1).join('/')}" alt="">
        <h4>${$('.main-article h1').innerHTML}</h4>
        <div class="prices">
          <span></span>
          <span></span>
        </div>
        <button class="button-yo">Checkout</button>
        <span class="close-button"></span>`;
      hiddenCart.appendChild(div);
      for (const child of hiddenCart.children) {
        if (child.classList.contains('empty-cart')) {
          child.remove();
        }
      }
    }
    const [priceSpan, totalSpan] = $All('.product .prices span');
    priceSpan.innerHTML = `$${+priceText}.00 x ${+count}`;
    totalSpan.innerHTML = `$${+priceText * +count}.00`;
    cur1.innerHTML = 0;
    cur1.dataset.count = 0;
  } else {
    cartCounter.style.display = "none";
  }
};

function updateCount(num) {
  cur1.innerHTML = +cur1.innerHTML + num;
  cur1.dataset.count = +cur1.dataset.count + num;
}

let tLinks = $('header nav ul');
toggleSVG.onclick = function (e) {
  e.stopPropagation();
  this.classList.toggle('menu-active');
  tLinks.classList.toggle('open');
}
document.addEventListener('click', (e) => {
  e.stopPropagation();
  if (e.target !== toggleSVG && e.target !== tLinks) {
    if(tLinks.classList.contains('open')) {
      tLinks.classList.toggle('open');
      toggleSVG.classList.toggle('menu-active');
    }
  }
  if (e.target.className == "close-button") {
    e.target.parentNode.remove();
    if ($(".popup-overlay")) $(".popup-overlay").remove();
    if (hiddenCart.childElementCount < 2) {
      hiddenCart.appendChild(
        Object.assign(document.createElement("div"),
        {innerHTML: 'Your cart is Empty.',
        className: 'empty-cart'})
        );
        cartCounter.style.display = "none";
    }
    activeWhenClosed();
  }
});
const activeWhenClosed = () => {
  imageOpt.forEach((img, ind) => {
    if (img.classList.contains('active')) {
      img.classList.remove('active');
      let index = pickedImage.indexOf(currentImg.children[0].src.split('/').slice(-1).join('/'));
      imageOpt[index].classList.add('active');
    }
  });
};
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape'){
    if ($('.light-box')) {
      activeWhenClosed();
      $('.light-box').remove();
      $('.popup-overlay').remove();
    };
  }
});
