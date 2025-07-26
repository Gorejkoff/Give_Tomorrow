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
