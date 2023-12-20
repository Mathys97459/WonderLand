class Carrousel {
    icons = {
      arrowLeft: '<i class="fa-solid fa-circle-left"></i>',
      arrowRight: '<i class="fa-solid fa-chevron-circle-right"></i>',
      bulletActive: '<i class="fa-solid fa-circle"></i>',
      bulletInactive: '<i class="fa-regular fa-circle"></i>',
      fullViewMax: '<i class="fa-solid fa-maximize"></i>',
      fullViewMin: '<i class="fa-solid fa-minimize"></i>',
      slidePlay: '<i class="fa-solid fa-play"></i>',
      slidePause: '<i class="fa-solid fa-pause"></i>',
      controlsHide: '<i class="fa-solid fa-eye-slash"></i>',
      controlsShow: '<i class="fa-solid fa-eye"></i>',
    }
  
    constructor(carrouselEl, index) {
      this.instance = index;
      this.currentSlideIndex = 0;
      this.carrouselEl = carrouselEl;
      this.carrouselEl.setAttribute('tabindex', 0);
  
      this.createControlEls();
      this.initSlides();
      this.createEventListeners();
  
      this.autoSlide = this.createAutoSlide();
    }
  
    createControlEls() {
      this.fullPageState = false;
      this.carrouselEl.append(
        this.arrowLeft = this.createControlEl('control icon arrow-left', this.icons.arrowLeft),
        this.arrowRight = this.createControlEl('control icon arrow-right', this.icons.arrowRight),
        this.bulletsEl = this.createControlEl('bullets'),
        this.fullViewBtn = this.createControlEl('control icon full-view-btn', this.icons.fullViewMax),
        this.playpauseBtn = this.createControlEl('control icon auto-play-btn', this.icons.slidePause),
        this.constrolsHideBtn = this.createControlEl('icon controls-hide-btn', this.icons.controlsHide),
      );
    }
    createControlEl(className, innerHTML = '') {
      let div = document.createElement('div');
      div.className = className;
      div.innerHTML = innerHTML;
      return div;
    }
  
    initSlides() {
      this.slides = this.carrouselEl.querySelector('.slides').children;
      this.bullets = [];
      for (let i = 0; i < this.slides.length; i++) {
        //image background
        this.slides[i].style.backgroundImage = `var(--backgroundOverlay), url(${this.slides[i].src})`;
        //bullets
        let bulletEl = this.createControlEl('icon bullet', i === this.currentSlideIndex ? this.icons.bulletActive : this.icons.bulletInactive)
        this.bulletsEl.append(bulletEl);
        this.bullets.push(bulletEl);
      }
    }
  
    createAutoSlide() {
      return setInterval(() => this.slideTo(this.currentSlideIndex + 1) , 5000)
    }
  
    createEventListeners() {
      //mousevents
      this.carrouselEl.addEventListener("click", () => this.carrouselEl.focus())
      this.arrowLeft.addEventListener('click', () => this.slideTo(this.currentSlideIndex - 1, true))
      this.arrowRight.addEventListener('click', () => this.slideTo(this.currentSlideIndex + 1, true))
      this.fullViewBtn.addEventListener('click', () => this.toggleFullPageView());
      this.playpauseBtn.addEventListener('click', () => this.toggleAutoSlide());
      this.constrolsHideBtn.addEventListener('click',()=> this.toggleHideControls());
      for (let i = 0; i < this.slides.length; i++) {
        this.slides[i].addEventListener('dblclick', () => this.toggleFullPageView());
        this.bullets[i].addEventListener('click', () => this.slideTo(i, true))
      }
  
      //keyboard events
      this.carrouselEl.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') this.slideTo(this.currentSlideIndex + 1, true);
        else if (e.key === 'ArrowLeft') this.slideTo(this.currentSlideIndex - 1, true);
        else if (e.key === 'Enter') this.toggleFullPageView();
        else if (e.key === ' ') e.preventDefault() + this.toggleAutoSlide();
        else if (Number(e.key) > 0 && Number(e.key) <= this.slides.length) this.slideTo(Number(e.key) - 1, true)
        else if (e.key.toLowerCase() === 'c') this.toggleHideControls();
      })
  
      //fullscreen change event
      this.carrouselEl.addEventListener('fullscreenchange', () => this.toggleFullViewBtn(!window.screenTop && !window.screenY))
    }
  
    toggleHideControls(){
      this.carrouselEl.classList.toggle('hide-controls');
      if(this.carrouselEl.classList.contains('hide-controls')) this.constrolsHideBtn.innerHTML = this.icons.controlsHide;
      else this.constrolsHideBtn.innerHTML = this.icons.controlsShow;
    }
  
    slideTo(slideIndex, userAction = false) {
      let newIndex = (slideIndex + this.slides.length) % this.slides.length;
      this.bullets[this.currentSlideIndex].innerHTML = this.icons.bulletInactive;
      this.currentSlideIndex = newIndex;
      this.slides[0].style.marginLeft = -100 * this.currentSlideIndex + '%';
      this.bullets[this.currentSlideIndex].innerHTML = this.icons.bulletActive;
      if(userAction) this.toggleAutoSlide(true);
    }
  
    toggleAutoSlide(reset=false) {
      if(reset){
        //reset
        clearInterval(this.autoSlide);
        this.autoSlide = this.createAutoSlide();
      } else if(this.autoSlide) {
        //stop
        clearInterval(this.autoSlide);
        this.autoSlide = false;
        this.playpauseBtn.innerHTML = this.icons.slidePlay;
      } else {
        //start
        this.autoSlide = this.createAutoSlide();
        this.playpauseBtn.innerHTML = this.icons.slidePause;      
      }
    }
  
    toggleFullPageView() {
      if (!this.fullPageState) {
        if (this.carrouselEl.requestFullscreen) this.carrouselEl.requestFullscreen();
        else if (this.carrouselEl.webkitRequestFullscreen) this.carrouselEl.webkitRequestFullscreen(); /* Safari */
        else if (this.carrouselEl.msRequestFullscreen) this.carrouselEl.msRequestFullscreen(); /* IE11 */
      }
      else {
        if (document.exitFullscreen) document.exitFullscreen();
        else if (document.webkitExitFullscreen) document.webkitExitFullscreen(); /* Safari */
        else if (document.msExitFullscreen) document.msExitFullscreen(); /* IE11 */
      }
    }
  
    toggleFullViewBtn(fullscreen) {
      this.carrouselEl.classList.toggle('full-view');
      this.fullPageState = !this.fullPageState;
      if (fullscreen) this.fullViewBtn.innerHTML = this.icons.fullViewMin;
      else this.fullViewBtn.innerHTML = this.icons.fullViewMax;
    }
  }
  
  const carrouselEls = document.querySelectorAll('.carrousel');
  const carrousels = [];
  carrouselEls.forEach((carrouselEl, i) => {
    carrousels.push(new Carrousel(carrouselEl, i))
  })


  //CARROUSEL 2
  var isAnimating = false;

  function scrollLeftAnimate(elem, unit) {

      if (!elem || isAnimating) {
          //if element not found / if animating, do not execute slide
          return;
      }

      var time = 300; // animation duration in MS, the smaller the faster.
      var from = elem.scrollLeft; // to continue the frame posistion
      var aframe =
          10; //fraction of frame frequency , set 1 for smoothest  ~ set 10++ for lower FPS (reduce CPU usage)
      isAnimating = true; //if animating prevent double trigger animation

      var start = new Date().getTime(),
          timer = setInterval(function () {
              var step = Math.min(1, (new Date().getTime() - start) / time);
              elem.scrollLeft = ((step * unit) + from);
              if (step === 1) {
                  clearInterval(timer);
                  isAnimating = false;
              }
          }, aframe);
  }


  function initAllDealCarrousels() {
    var dealCarrouselButtons = document.querySelectorAll('.deals-scroll-left, .deals-scroll-right');
    dealCarrouselButtons.forEach(function (button) {
        button.addEventListener('click', function () {
            var container = button.parentNode.querySelector('.va-carrousel-flexbox');
            var cardWidth = container.querySelector('.va-card').offsetWidth;
            var maxScroll = (container.querySelectorAll('.va-card').length * cardWidth) - container.clientWidth;

            if (button.classList.contains('deals-scroll-left')) {
                if (container.scrollLeft > 0) {
                    scrollLeftAnimate(container, -cardWidth);
                }
            } else if (button.classList.contains('deals-scroll-right')) {
                if (container.scrollLeft < maxScroll) {
                    scrollLeftAnimate(container, cardWidth);
                }
            }
        });
    });
}

function initAllCarousels() {
    var carouselContainers = document.querySelectorAll('.va-carrousel-flexbox');
    carouselContainers.forEach(function (container) {
        var scrollLeftButton = container.parentNode.querySelector('.deals-scroll-left');
        var scrollRightButton = container.parentNode.querySelector('.deals-scroll-right');

        scrollLeftButton.addEventListener('click', function () {
            var cardWidth = container.querySelector('.va-card').offsetWidth;
            var maxScroll = (container.querySelectorAll('.va-card').length * cardWidth) - container.clientWidth;

            if (container.scrollLeft > 0) {
                scrollLeftAnimate(container, -cardWidth);
            }
        });

        scrollRightButton.addEventListener('click', function () {
            var cardWidth = container.querySelector('.va-card').offsetWidth;
            var maxScroll = (container.querySelectorAll('.va-card').length * cardWidth) - container.clientWidth;

            if (container.scrollLeft < maxScroll) {
                scrollLeftAnimate(container, cardWidth);
            }
        });
    });
}

initAllDealCarrousels();
initAllCarousels();