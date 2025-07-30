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
// перемещение блоков при адаптиве
// data-da=".class,3,768" 
// класс родителя куда перемещать
// порядковый номер в родительском блоке куда перемещается начиная с 0 как индексы массива
// ширина экрана min-width
// два перемещения: data-da=".class,3,768,.class2,1,1024"
const ARRAY_DATA_DA = document.querySelectorAll('[data-da]');
ARRAY_DATA_DA.forEach(function (e) {
   const dataArray = e.dataset.da.split(',');
   const addressMove = searchDestination(e, dataArray[0]);
   const addressMoveSecond = dataArray[3] && searchDestination(e, dataArray[3]);
   const addressParent = e.parentElement;
   const listChildren = addressParent.children;
   const mediaQuery = window.matchMedia(`(min-width: ${dataArray[2]}px)`);
   const mediaQuerySecond = dataArray[5] && window.matchMedia(`(min-width: ${dataArray[5]}px)`);
   for (let i = 0; i < listChildren.length; i++) { !listChildren[i].dataset.n && listChildren[i].setAttribute('data-n', `${i}`) };
   mediaQuery.matches && startChange(mediaQuery, addressMove, e, listChildren, addressParent, dataArray);
   if (mediaQuerySecond && mediaQuerySecond.matches) moving(e, dataArray[4], addressMoveSecond);
   mediaQuery.addEventListener('change', () => { startChange(mediaQuery, addressMove, e, listChildren, addressParent, dataArray) });
   if (mediaQuerySecond) mediaQuerySecond.addEventListener('change', () => {
      if (mediaQuerySecond.matches) { moving(e, dataArray[4], addressMoveSecond); return; };
      startChange(mediaQuery, addressMove, e, listChildren, addressParent, dataArray);
   });
});

function startChange(mediaQuery, addressMove, e, listChildren, addressParent, dataArray) {
   if (mediaQuery.matches) { moving(e, dataArray[1], addressMove); return; }
   if (listChildren.length > 0) {
      for (let z = 0; z < listChildren.length; z++) {
         if (listChildren[z].dataset.n > e.dataset.n) {
            listChildren[z].before(e);
            break;
         } else if (z == listChildren.length - 1) {
            addressParent.append(e);
         }
      }
      return;
   }
   addressParent.prepend(e);
};

function searchDestination(e, n) {
   if (e.classList.contains(n.slice(1))) { return e }
   if (e.parentElement.querySelector(n)) { return e.parentElement.querySelector(n) };
   return searchDestination(e.parentElement, n);
}

function moving(e, order, addressMove) {
   if (order == "first") { addressMove.prepend(e); return; };
   if (order == "last") { addressMove.append(e); return; };
   if (addressMove.children[order]) { addressMove.children[order].before(e); return; }
   addressMove.append(e);
}




window.addEventListener('load', function (event) {
   gsap.registerPlugin(ScrollTrigger);

   ScrollTrigger.config({ ignoreMobileResize: true });
   ScrollTrigger.isTouch && ScrollTrigger.normalizeScroll({ allowNestedScroll: true });

   if (MIN1024.matches) {
      let tl = gsap.timeline({
         scrollTrigger: {
            trigger: '#wrapper',
            pin: true,
            pinSpacing: false,
            start: '0% 0%',
            end: '+=2000',
            scrub: true,
            // markers: {
            //    startColor: "green",
            //    endColor: "red",
            //    fontSize: "40px",
            //    fontWeight: "bold",
            //    indent: 20
            // }
         }
      })
      tl.to('#poster-text', { opacity: 0.2 })
         .to('#flyer-1', { x: '-110%' })
         .set('#poster', { pointerEvents: 'none' }, '+=0.5')
         .set('#about-fund', { pointerEvents: 'all' })
         .to('#poster', { opacity: 0 })
         .to('#header', { boxShadow: '0 4px 20px 0 rgba(0, 0, 0, 0.08), 0 2px 4px 0 rgba(0, 0, 0, 0.04)' })
         .addPause(1);
   }
})
/* открывает, закрывает модальные окна. */
/*
добавить классы
js-modal-hidden - родительский контейнер модального окна который скрывается и показывается, задать стили скрытия
js-modal-visible - задать стили открытия
js-modal-close - кнопка закрытия модального окна находится внутри js-modal-hidde
кнопка открытия, любая:
js-modal-open - кнопка открытия модального окна
data-modal_open="id" - id модального окна
если надо что бы окно закрывалось при клике на пустое место (фон), добавляется атрибут js-modal-stop-close.
js-modal-stop-close - атрибут указывает на поле, при клике на которое не должно происходить закрытие окна, 
т.е. контейнер контента, при этом внешний родительский контейнет помечается атрибутом js-modal-close.
допускается дополнительно кнопка закрытия внутри js-modal-stop-close.
*/
document.addEventListener('click', (event) => {
   if (event.target.closest('.js-modal-open')) { openModal(event) }
   if (event.target.closest('.js-modal-close')) { testModalStopClose(event) }
})
function openModal(event) {
   let id = event.target.closest('.js-modal-open').dataset.modal_open;
   if (typeof id !== "undefined") { initOpenModal(id) };
}
function testModalStopClose(event) {
   if (event.target.closest('.js-modal-stop-close') &&
      event.target.closest('.js-modal-stop-close') !==
      event.target.closest('.js-modal-close').closest('.js-modal-stop-close')) {
      return
   }
   closeModal(event);
}
function closeModal(event) {
   event.target.closest('.js-modal-hidden').classList.remove('js-modal-visible');
   activeScrollCloseModal();
}
// функция закрытия модального окна (передать id модального окна)
function initCloseModal(id) {
   if (document.querySelector(`#${id}`)) {
      document.querySelector(`#${id}`).classList.remove('js-modal-visible');
   }
   activeScrollCloseModal();
}
// функция открытия модального окна (передать id модального окна)
function initOpenModal(id) {
   if (document.querySelector(`#${id}`)) {
      document.querySelector(`#${id}`).classList.add('js-modal-visible');
      document.body.classList.add('body-overflow')
   }
}
function activeScrollCloseModal() {
   if (!document.querySelector('.js-modal-visible')) {
      document.body.classList.remove('body-overflow');
   }
}

function addPropsSwiper(selector) {
   const target = document.querySelector(selector);
   const swiper = target.querySelector('.swiper');
   const prev = target.querySelector('.js-swiper-button-prev');
   const next = target.querySelector('.js-swiper-button-next');
   return {
      target: target,
      swiper: swiper,
      prev: prev,
      next: next
   }
}
if (document.querySelector('.fund-documents__swiper')) {
   new Swiper('.fund-documents__swiper', {
      spaceBetween: 40,
      speed: 300,
      slidesPerView: 'auto',
   });
}
if (document.querySelector('.about-us')) {
   const props = addPropsSwiper('.about-us');
   new Swiper(props.swiper, {
      spaceBetween: 20,
      speed: 300,
      slidesPerView: 1,
      navigation: {
         nextEl: props.next,
         prevEl: props.prev,
      },
      breakpoints: {
         1024: {
            spaceBetween: 40,
            slidesPerView: 3,
         },
         768: {
            spaceBetween: 40,
            slidesPerView: 2,
         }
      },
   });
}
if (document.querySelector('.trust')) {
   const props = addPropsSwiper('.trust');
   new Swiper(props.swiper, {
      spaceBetween: 40,
      speed: 300,
      slidesPerView: 1.5,
      navigation: {
         nextEl: props.next,
         prevEl: props.prev,
      },
      breakpoints: {
         1024: {
            slidesPerView: 5,
         },
         768: {
            slidesPerView: 3,
         }
      },
   });
}
if (document.querySelector('.news__swiper')) {
   const props = addPropsSwiper('.news__swiper');
   new Swiper(props.swiper, {
      spaceBetween: 20,
      speed: 300,
      slidesPerView: 1.2,
      navigation: {
         nextEl: props.next,
         prevEl: props.prev,
      },
      breakpoints: {
         1024: {
            slidesPerView: 3.4,
            spaceBetween: 32,
         },
         768: {
            slidesPerView: 2.5,
            spaceBetween: 24,
         }
      },
   });
}
if (document.querySelector('.swiper-grid')) {
   const props = addPropsSwiper('.swiper-grid');
   props.swiper.style.setProperty('--width', props.swiper.offsetWidth + 'px');
   window.addEventListener('resize', () => {
      props.swiper.style.setProperty('--width', props.swiper.offsetWidth + 'px');
   })
   const swiper = new Swiper(props.swiper, {
      spaceBetween: 16,
      speed: 300,
      slidesPerView: 1.5,
      navigation: {
         nextEl: props.next,
         prevEl: props.prev,
      },
      breakpoints: {
         1024: {
            slidesPerView: 4,
            spaceBetween: 24,
         },
         768: {
            slidesPerView: 2.5,
            spaceBetween: 16,
         }

      },

   });
}

/* пример инициализации слайдера */
// if (document.querySelector('.swiper')) {
//    const swiper = new Swiper('.swiper', {
//       keyboard: {
//          enabled: true,
//          onlyInViewport: true,
//       },
//       allowTouchMove: false,
//       loop: true,
//       spaceBetween: 10,
//       speed: 300,
//       slidesPerView: 2.5,
//       slidesPerView: 'auto', // количаство слайдеров без авто ширины
//       grabCursor: true,
//       initialSlide: 2,
//       centeredSlides: true,
//       breakpoints: {
//          1024: {
//             spaceBetween: 20,
//             slidesPerView: 3
//          },
//          768: {
//             slidesPerView: 2
//          }
//       },
//       navigation: {
//          nextEl: ".next",
//          prevEl: ".prev",
//       },
//       pagination: {
//          el: '.pagination__body',
//          type: 'bullets',
//          type: 'fraction',
//          clickable: true,
//       },
//       autoplay: {
//          delay: 2000,
//       },
//       virtual: {
//          enabled: true,
//       },
//       freeMode: {
//          enabled: true,
//          momentum: false // Отключаем инерцию для точного позиционирования
//       },
//    });
// }




/* создание и ликвидация состояния слайдера в зависимости от ширины вьюпорта */
// if (document.querySelector('.swiper')) {
//    let swiperState;
//    let swiper;
//    changeStateSlider();
//    window.addEventListener('resize', () => {
//       changeStateSlider();
//    })
//    function initswiper() {
//       swiper = new Swiper('.swiper', {
//          keyboard: {
//             enabled: true,
//             onlyInViewport: true,
//          },
//          allowTouchMove: true,
//          loop: false,
//          speed: 300,
//          slidesPerView: 1.3,
//          spaceBetween: 24,
//       });
//    }
//    function changeStateSlider() {
//       if (!MIN768.matches) {
//          if (!swiperState) {
//             swiperState = true;
//             initswiper();
//          }
//       } else {
//          if (swiperState) {
//             swiperState = false;
//             swiper.destroy(true, true);
//          }
//       }
//    }
// }



class TabsSwitching {
   constructor(button_name, tab_name, execute) {
      this.name_button = button_name;
      this.list_buttons = document.querySelectorAll(button_name);
      this.list_tabs = document.querySelectorAll(tab_name);
      this.execute = execute;
   }
   init = () => {
      document.body.addEventListener('click', (event) => {
         if (event.target.closest(this.name_button)) {
            actionTabsSwitching(event, event.target.closest(this.name_button), this.list_buttons, this.list_tabs, this.execute)
         }
      })
   }
}

function actionTabsSwitching(event, target_button, list_buttons, list_tabs, execute) {
   let number = target_button.dataset.button_ts;
   if (!number) return;
   list_buttons.forEach((e) => { e.classList.toggle('active', e.dataset.button_ts == number) });
   if (list_tabs.length > 0) { list_tabs.forEach((e) => { e.classList.toggle('active', e.dataset.tab_ts == number) }) }
   if (execute) { this.execute(event) };
}

function addTabsSwitching(buttonName, tabName) {
   if (document.querySelector(buttonName) && document.querySelector(tabName)) {
      let tab = new TabsSwitching(buttonName, tabName);
      tab.init();
   }
}

addTabsSwitching('.js-raise-money-tabs-button', '.js-raise-money-tab');
addTabsSwitching('.js-help-fee-tab-button', '.js-help-fee-tab');
addTabsSwitching('.js-payment-method-button', '.js-payment-method-tab');
addTabsSwitching('.js-history-button', '.js-history-tab');
addTabsSwitching('.js-documents-button', '.js-documents-tab');



