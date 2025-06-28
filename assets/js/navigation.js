// Navigation module for portfolio site
class NavigationModule {
  constructor(isProjectPage = false) {
    this.isProjectPage = isProjectPage;
    this.render();
    this.attachEventListeners();
  }

  getNavigationHTML() {
    const basePath = this.isProjectPage ? '../' : '';
    const homeHref = this.isProjectPage ? '../index.html' : '#home';
    const projectsHref = this.isProjectPage ? '../index.html#projects' : '#projects';
    const expertiseHref = this.isProjectPage ? '../index.html#expertise' : '#expertise';
    const educationHref = this.isProjectPage ? '../index.html#education' : '#education';
    const aboutHref = this.isProjectPage ? '../index.html#about' : '#about';
    const logoHref = this.isProjectPage ? '../index.html' : '#home';

    return `
      <nav class="navbar">
        <div class="nav-container">
          <a href="${logoHref}" class="nav-logo">JB</a>
          <ul class="nav-menu">
            <li><a href="${homeHref}" class="nav-link">Home</a></li>
            <li><a href="${projectsHref}" class="nav-link">Projects</a></li>
            <li><a href="${expertiseHref}" class="nav-link">Expertise</a></li>
            <li><a href="${educationHref}" class="nav-link">Education</a></li>
            <li><a href="${aboutHref}" class="nav-link">About</a></li>
          </ul>
          <div class="hamburger">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </nav>
    `;
  }

  render() {
    // Insert navigation at the beginning of body
    document.body.insertAdjacentHTML('afterbegin', this.getNavigationHTML());
  }

  attachEventListeners() {
    // Mobile navigation toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
      hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
      });

      // Close menu when clicking on a link
      document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
          hamburger.classList.remove('active');
          navMenu.classList.remove('active');
        });
      });
    }

    // Active navigation highlighting (only for main page)
    if (!this.isProjectPage) {
      this.setupActiveNavigation();
    }
  }

  setupActiveNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
      let current = '';
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - 200) {
          current = section.getAttribute('id');
        }
      });

      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
          link.classList.add('active');
        }
      });
    });
  }
}

// Auto-initialize navigation when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Check if we're on a project page (has /projects/ in URL)
  const isProjectPage = window.location.pathname.includes('/projects/');
  new NavigationModule(isProjectPage);
});
