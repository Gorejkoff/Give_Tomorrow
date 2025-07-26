"use strict"

// window.addEventListener('load', (event) => {});

// desktop or mobile (mouse or touchscreen)
const isMobile = {
   Android: function () { return navigator.userAgent.match(/Android/i) },
   BlackBerry: function () { return navigator.userAgent.match(/BlackBerry/i) },
   iOS: function () { return navigator.userAgent.match(/iPhone|iPad|iPod/i) },
   Opera: function () { return navigator.userAgent.match(/Opera Mini/i) },
   Windows: function () { return navigator.userAgent.match(/IEMobile/i) },
   any: function () {
      return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
   }
};
const isPC = !isMobile.any();
if (isPC) { document.body.classList.add('_pc') } else { document.body.classList.add('_touch') };

// media queries
const MIN1024 = window.matchMedia('(min-width: 1024px)');
const MIN768 = window.matchMedia('(min-width: 768px)');

// variables
const HEADER = document.getElementById('header');



function throttle(callee, timeout) {
   let timer = null;
   return function perform(...args) {
      if (timer) return;
      timer = setTimeout(() => {
         callee(...args);
         clearTimeout(timer);
         timer = null;
      }, timeout)
   }
}


/* запись переменных высоты элементов */
function addHeightVariable() {
   if (typeof HEADER !== "undefined") {
      document.body.style.setProperty('--height-header', `${HEADER.offsetHeight}px`)
   }
}
addHeightVariable();


// ** ======================= RESIZE ======================  ** //
window.addEventListener('resize', () => {
   addHeightVariable();
   closeHeaderMenu();
   buildSpaceRaiseMoneyGrid();
})


// ** ======================= CLICK ======================  ** //
document.documentElement.addEventListener("click", (event) => {
   if (event.target.closest('.open-menu')) { openHeaderMenu() }
})

function openHeaderMenu() {
   document.body.classList.toggle('menu-is-open')
}
function closeHeaderMenu() {
   document.body.classList.remove('menu-is-open')
}


const RAISE_MONEY_GRID = document.querySelectorAll('.raise-money__grid');
function buildSpaceRaiseMoneyGrid() {
   if (RAISE_MONEY_GRID.length > 0 && MIN1024.matches) {
      RAISE_MONEY_GRID.forEach(element => {
         const childrens = element.children;
         if ([4, 7].includes(childrens.length)) {
            let div = document.createElement('div');
            div.classList.add('raise-money__space');
            childrens[childrens.length - 2].after(div);
         }
      })
      return;
   }
   let space = document.querySelectorAll('.raise-money__space');
   if (space.length == 0) return;
   space.forEach(e => e.remove());
}
buildSpaceRaiseMoneyGrid();


// проверка выбора суммы в форме помощи
function amountSwitch() {
   const formsList = document.forms;
   if (formsList.length == 0) return;
   const formsListFilter = Array.from(formsList).filter(e => {
      return e.classList.contains('js-form-amount-payments');
   });
   if (formsListFilter.length == 0) return;
   formsListFilter.forEach(form => checkingSelectedAmount(form))
}
function checkingSelectedAmount(form) {
   form.addEventListener('input', (event) => {
      if (event.target.name === 'sum') {
         form.other_sum.value = '';
         return;
      }
      if (event.target.name === 'other_sum') {
         form.elements.sum.forEach(e => e.checked = false)
         return;
      }
   })
}
amountSwitch()