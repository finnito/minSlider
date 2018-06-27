class minSlider {

	constructor(config) {
		this.config = config;
		this.interval = null;
		this.startX = null;
		this.startY = null;
		this.wrapper = document.querySelector(".slider");
		this.slidesContainer = this.wrapper.querySelector(".slides");
		this.slides = this.slidesContainer.querySelectorAll("img:not(.cover)");
		this.nextButton = this.wrapper.querySelector(".next");
		this.prevButton = this.wrapper.querySelector(".prev");
		this.numSlides = this.slides.length - 1;
		this.index = this.numSlides;
		this.prevIndex = 0;
		// this.nextIndex = 0;
		this.init();
	}

	init() {

		// if (!this.config.transition || this.config.transition === "slide") {
		// 	this.slidesContainer.classList.add("slide");
		// } else {
			this.slidesContainer.classList.add("fade");
		// }

		this.slidesContainer.style.WebkitTransitionDuration = `${this.config.transitionSpeed}ms` || `300ms`;


		// Autoplay
		if (this.config.autoplay != false) {
			this.slides[0].addEventListener("load", this.start());

			// Pause on hover
			if (this.config.pauseOnHover) {
				this.slidesContainer.addEventListener("mouseenter", this.stop.bind(this));
				this.slidesContainer.addEventListener("mouseout", this.start.bind(this));
			}
		} else {
			this.slides[0].addEventListener("load", this.next.bind(this));
		}

		// Controls
		if (this.config.manualControls) {
			this.nextButton.addEventListener("click", this.manualNext.bind(this));
			this.prevButton.addEventListener("click", this.manualPrev.bind(this));

			this.slidesContainer.addEventListener("touchstart", this.doTouchStart.bind(this));
			this.slidesContainer.addEventListener("touchmove", this.doTouchMove.bind(this));

			document.addEventListener("keydown", this.doKeyboard.bind(this));
		}

	}

	doKeyboard(evt) {
		if (evt.key === "ArrowRight") {
			this.manualNext();
		} else if (evt.key === "ArrowLeft") {
			this.manualPrev();
		}
	}

	doTouchStart(evt) {
		this.xDown = evt.touches[0].clientX;
		this.yDown = evt.touches[0].clientY;
	}

	doTouchMove(evt) {
	    if ( ! this.xDown || ! this.yDown ) {
	        return;
	    }

	    var xUp = evt.touches[0].clientX;
	    var yUp = evt.touches[0].clientY;

	    var xDiff = this.xDown - xUp;
	    var yDiff = this.yDown - yUp;

	    if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {
	        if ( xDiff > 0 ) {
	            this.manualNext();
	        } else {
	            this.manualPrev();
	        }
	    }

	    this.xDown = null;
	    this.yDown = null;
	}

	restart() {
		if (this.config.autoplay) {
			this.stop();
			this.start();
		}
	}

	manualNext() {
		this.next();
		this.restart();
	}

	manualPrev() {
		this.prev();
		this.restart();
	}

	start() {
		this.interval = setInterval(this.next.bind(this), this.config.slideDuration);
	}

	stop() {
		clearInterval(this.interval);
	}

	changeSlide() {
		// console.log(this.prevIndex, this.index, this.nextIndex);
		// this.slides[this.index].classList.remove("next");
		this.slides[this.index].classList.add("current");

		this.slides[this.prevIndex].classList.remove("current");
		// this.slides[this.prevIndex].classList.add("prev");

		// this.slides[this.nextIndex].classList.add("next");
	}

	next() {
		this.prevIndex = this.index;
		if (this.index === this.numSlides) {
			this.index = 0;
		} else {
			this.index ++;
		}
		// this.nextIndex = this.index + 1;
		this.changeSlide();
	}

	prev() {
		this.prevIndex = this.index;
		if (this.index === 0) {
			this.index = this.numSlides;
		} else {
			this.index --;
		}
		// this.nextIndex = this.index + 1;
		this.changeSlide();
	}
}