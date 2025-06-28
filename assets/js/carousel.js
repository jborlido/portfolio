// Carousel module for project pages
class CarouselModule {
  constructor(carouselElement) {
    this.carousel = carouselElement;
    this.track = carouselElement.querySelector('.carousel-track');
    this.slides = carouselElement.querySelectorAll('.carousel-item');
    this.indicators = carouselElement.querySelectorAll('.carousel-indicator');
    this.prevBtn = carouselElement.querySelector('.carousel-nav.prev');
    this.nextBtn = carouselElement.querySelector('.carousel-nav.next');
    
    this.currentSlideIndex = 0;
    this.totalSlides = this.slides.length;
    this.autoPlayInterval = null;
    
    this.init();
  }

  init() {
    this.attachEventListeners();
    this.updateCarousel();
    this.startAutoPlay();
  }

  attachEventListeners() {
    // Navigation buttons
    if (this.prevBtn) {
      this.prevBtn.addEventListener('click', () => this.moveCarousel(-1));
    }
    if (this.nextBtn) {
      this.nextBtn.addEventListener('click', () => this.moveCarousel(1));
    }

    // Indicators
    this.indicators.forEach((indicator, index) => {
      indicator.addEventListener('click', () => this.goToSlide(index));
    });

    // Pause auto-play on hover
    this.carousel.addEventListener('mouseenter', () => this.stopAutoPlay());
    this.carousel.addEventListener('mouseleave', () => this.startAutoPlay());

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') this.moveCarousel(-1);
      if (e.key === 'ArrowRight') this.moveCarousel(1);
    });
  }

  updateCarousel() {
    const translateX = -this.currentSlideIndex * 100;
    this.track.style.transform = `translateX(${translateX}%)`;
    
    // Update indicators
    this.indicators.forEach((indicator, index) => {
      indicator.classList.toggle('active', index === this.currentSlideIndex);
    });
  }

  moveCarousel(direction) {
    this.currentSlideIndex += direction;
    
    if (this.currentSlideIndex >= this.totalSlides) {
      this.currentSlideIndex = 0;
    } else if (this.currentSlideIndex < 0) {
      this.currentSlideIndex = this.totalSlides - 1;
    }
    
    this.updateCarousel();
  }

  goToSlide(index) {
    this.currentSlideIndex = index;
    this.updateCarousel();
  }

  startAutoPlay() {
    this.stopAutoPlay(); // Clear any existing interval
    this.autoPlayInterval = setInterval(() => {
      this.moveCarousel(1);
    }, 5000);
  }

  stopAutoPlay() {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
      this.autoPlayInterval = null;
    }
  }
}

// Auto-initialize carousels when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  const carousels = document.querySelectorAll('.media-carousel');
  carousels.forEach(carousel => new CarouselModule(carousel));
});

// Global functions for backward compatibility
function moveCarousel(direction) {
  const activeCarousel = document.querySelector('.media-carousel');
  if (activeCarousel && activeCarousel.carouselInstance) {
    activeCarousel.carouselInstance.moveCarousel(direction);
  }
}

function currentSlide(n) {
  const activeCarousel = document.querySelector('.media-carousel');
  if (activeCarousel && activeCarousel.carouselInstance) {
    activeCarousel.carouselInstance.goToSlide(n - 1);
  }
}
