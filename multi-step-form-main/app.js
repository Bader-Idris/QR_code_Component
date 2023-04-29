const $ = (selector) => {
  const elements = document.querySelectorAll(selector);
  return elements.length === 1 ? elements[0] : elements;
};
Element.prototype.$ = function (selector) {
  const elements = this.querySelectorAll(selector);
  return elements.length === 1 ? elements[0] : elements;
};

const forms = $('main form'),
      section = $('main section'),
      nextButton = $('form button.next'),
      backButton = $('form button.back'),
      submitBtn = $('form button[type="submit"]'),
      steps = $('aside div span'),
      miniPlans = $('.mini-plans div'),
      planEither = $('.plan-either'),
      planBtn = $('.plan-either span:nth-of-type(2)'),
      imgs = $('img'),
      checkContainer = $('.third .check-container'),
      nameField = $('#userNa'),
      usernamePattern = /^[a-zA-Z ]{2,30}$/,
      nameError = document.createElement('div'),
      emailField = $('#userEm'),
      emailPattern = /^\S+@\S+\.\S+$/,
      emailError = nameError.cloneNode(false),
      phoneField = $('#userPh'),
      phonePattern = /^(\+?\d{2,3})?\s?\d{2}\s?\d{3}\s?\d{4}$/,
      phoneError = nameError.cloneNode(false),
      checkboxPrices = $(" form.third span"),
      planOptionSpan = $(" div.summery > .plan-option span:first-of-type"),
      summery = $('.summery'),
      totalSpans = $(".fourth .total span"),
      changeLink = $('#change-link')
      ;

section.style.top = '0%';
imgs.forEach((e)=> e.setAttribute('draggable', 'false'));
const addFieldError = (field, error, pattern) => {
  field.addEventListener('blur', () => {
    if (!pattern.test(field.value)) {
      field.classList.add('invalid');
      field.parentElement.appendChild(error);
    }
  });
  field.addEventListener('focus', () => {
    if (field.parentElement.contains(error)) {
      field.parentElement.removeChild(error);
      clearInvalidBorder(field);
    }
  });
};
const clearInvalidBorder = (field) => {
  if (field.classList.contains('invalid')) {
    field.classList.remove('invalid');
  }
};

nameError.classList.add('error', 'name-err');
nameError.innerText = 'Please enter a valid name';

emailError.classList.add('error', 'email-err');
emailError.innerText = 'Please enter a valid email address';

phoneError.classList.add('error', 'phone-err');
phoneError.innerText = 'Please enter a valid phone number';

addFieldError(nameField, nameError, usernamePattern);
addFieldError(emailField, emailError, emailPattern);
addFieldError(phoneField, phoneError, phonePattern);

[nameField, emailField, phoneField].forEach(clearInvalidBorder);

let yearlyActive = planEither.children[2].classList.contains('active'),
  monthlyActive = planEither.children[0].classList.contains('active');

nextButton.forEach((e, ind) => {
  e.onclick = () => {
    if ($('.first div .error').length == 0 && nameField.value != '' && emailField.value != '' && phoneField.value != '') {
      section.style.top = +section.style.top.slice(0, -1) - 100 + "%";
    steps.forEach((ev, i, arr) => {
      arr[ind].classList.remove('active');
      if (arr[ind + 1] !== undefined) {
        arr[ind + 1].classList.add('active');
      } else {
        arr[ind].classList.add('active');
      }
    });
    }
  };
})
backButton.forEach((e, ind)=> {
  e.onclick = () => {
    section.style.top = +section.style.top.slice(0,-1) + 100 + "%";
    steps.forEach((ev, i, arr) => {
      arr[ind + 1].classList.remove('active');
        arr[ind].classList.add('active');
    });
  };
})
submitBtn.addEventListener('click', function(e) {
  e.preventDefault();
  // perform form validation and submission using JavaScript
});

let monthPrice = [];
miniPlans.forEach(e => monthPrice.push(e.children[2].innerHTML));
// find an approach to make it more dynamic if possible
let yearPrice = ['$90/yr', '$120/yr', '$150/yr'];

let checkboxMonthly = [];
checkboxPrices.forEach(e => checkboxMonthly.push(e.innerHTML))
let checkboxYearly = ['+$10/yr', '+$20/yr', '+$20/yr'];
let shortMoYr = ['/mo','/yr']

let summeryMainPlanPrice = planOptionSpan.parentElement.children[2];

miniPlans.forEach((e, ind, arr) => {
  if (ind == 0) {
    summeryMainPlanPrice.innerHTML = arr[0].children[2].innerHTML
    totalSpans[1].innerHTML = arr[0].children[2].innerHTML
  }

  e.onclick = () => {
    miniPlans.forEach((sibling) => {
      sibling.classList.remove('active');
    });
    e.classList.add('active');
    planOptionSpan.parentElement.childNodes[0].textContent = e.children[1].innerHTML + ' ';
    summeryMainPlanPrice.innerHTML = e.children[2].innerHTML;

    // here is your job for calculating total prices
    // this is the main plan as arcade,
    let subTotalPlan = +summeryMainPlanPrice.innerHTML.substring(1, summeryMainPlanPrice.innerHTML.length - 3);
    if (yearlyActive) {
      totalSpans[1].innerHTML = `$${OptionalSummeryPricesCount() + subTotalPlan + shortMoYr[1]}`;//🔴
    } else if (monthlyActive) {
      totalSpans[1].innerHTML = `$${OptionalSummeryPricesCount() + subTotalPlan + shortMoYr[0]}`;
    }
  };
});

planBtn.onclick = (e) => {
  e.target.classList.toggle('active');
  planEither.children[0].classList.toggle('active');
  planEither.children[2].classList.toggle('active');

  yearlyActive = yearlyActive ? false : true;
  monthlyActive = !yearlyActive;
  if (yearlyActive) {//when yearly is active🔴
    miniPlans.forEach((ev, ind, arr) => {
      const discount = Object.assign(document.createElement('span'), {
        className: 'discount',
        innerHTML: '2 months free'
      });
      if (ev.children.length < 4) ev.appendChild(discount);
      ev.children[2].innerHTML = yearPrice[ind];
      checkboxPrices[ind].innerHTML = checkboxYearly[ind];

      planOptionSpan.innerHTML = '(Yearly)';
      totalSpans[0].innerHTML = 'Total (per year)';

      if (ev.classList.contains('active')) {
        totalSpans[1].innerHTML = `$${ev.children[2].innerHTML.slice(1, -3)}/yr`//🔴
        console.log(totalSpans[1].innerHTML)
      }
    });
  }
  if (monthlyActive) {//when monthly is active🔴
    miniPlans.forEach((ev, ind, arr) => {
      if (arr[ind].children.length == 4) miniPlans[ind].children[3].remove();
      ev.children[2].innerHTML = monthPrice[ind];

      checkboxPrices[ind].innerHTML = checkboxMonthly[ind];
      planOptionSpan.innerHTML = '(Monthly)';
      totalSpans[0].innerHTML = 'Total (per month)';

      if (ev.classList.contains('active')) {
        totalSpans[1].innerHTML = `$${ev.children[2].innerHTML.slice(1, -3)}/mo`//🔴
        console.log(totalSpans[1].innerHTML)
      }
    });
  }
  miniPlans.forEach((ev) => {
    if (ev.classList.contains('active')){
      summeryMainPlanPrice.innerHTML = ev.children[2].innerHTML;
    }
  })


  let elCount = planOptionSpan.parentElement.parentElement.childElementCount;
  // this code doesn't count well, when planBtn is clicked
  if (elCount > 1) {
    Array.from(summery.children).forEach((e, index) => {
      if (index != 0) {
        // console.log(index)
        if (e.childNodes[1].innerHTML !== checkboxYearly[index - 1] && yearlyActive) {
          e.childNodes[1].innerHTML = checkboxYearly[index - 1];
        }
        if (e.childNodes[1].innerHTML !== checkboxMonthly[index - 1] && monthlyActive) {
          e.childNodes[1].innerHTML = checkboxMonthly[index - 1];
        }
        //🔴 console.log(totalSpans[1].innerHTML)

      }

    });
  }

}
const summeryClasses = ['online', 'large', 'custom'],
      summeryHead = [];
checkContainer.forEach((e)=> {
  summeryHead.push(e.children[2].children[0].innerHTML);
});

checkContainer.forEach((e,index) => e.onclick = () => {
  e.children[0].checked = !e.children[0].checked;
  e.classList.toggle('active');
  
  if (e.classList.contains('active')) {
    checkboxPrices.forEach((e,ind,arr) => {
      if (index == ind) {
        let prices = document.createTextNode(checkboxPrices[ind].innerHTML);
        let checkPricesSummery = document.createElement('span');
        checkPricesSummery.appendChild(prices)
        let plans = document.createElement('div');
        plans.className = summeryClasses[ind];
        plans.innerHTML = summeryHead[ind];
        plans.appendChild(checkPricesSummery);
        planOptionSpan.parentElement.parentElement.appendChild(plans);
      }
    })
  }
  if (!e.classList.contains('active')) {
    Array.from(planOptionSpan.parentElement.parentElement.children).forEach((e)=> {
      if (e.classList.contains(summeryClasses[index])) e.remove()
    });
  }
});

changeLink.onclick = (e) => {// might change when working with phone
  e.preventDefault();
  section.style.top = +section.style.top.slice(0,-1) + 200 + "%";
  steps.forEach((ev) => {
    ev.classList.remove('active');
  });
  steps[1].classList.add('active');
};

// see 130 && 188 for it

//🔴there is a bug, when large storage and customizable are active, in summery
// if customizable is above and yearly, it'll be 10 dollars instead of 20🔴🔴

const OptionalSummeryPricesCount = () => {
  let summerySubPrices = 0;
  Array.from(summery.children).forEach((cur, index) => {
    if (cur != 0 && index > 0) {
      summerySubPrices += parseInt(cur.children[0].innerHTML.substring(2, cur.children[0].innerHTML.length - 3))
    }
  })
  return summerySubPrices
}