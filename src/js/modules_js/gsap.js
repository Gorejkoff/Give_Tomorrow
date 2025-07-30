
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