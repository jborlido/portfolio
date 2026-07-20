// Navigation module for jborlido.pt
// Depth-aware: works from the root (index.html) and from one-level-deep
// pages (work/*, projects/*) by prefixing links with "../".
class NavigationModule {
  constructor(isSubPage = false) {
    this.isSubPage = isSubPage;
    this.render();
    this.attachEventListeners();
  }

  getNavigationHTML() {
    const base = this.isSubPage ? '../index.html' : '';
    const link = (hash) => this.isSubPage ? `${base}${hash}` : hash;

    return `
      <nav class="navbar" aria-label="Main navigation">
        <div class="nav-container">
          <a href="${this.isSubPage ? '../index.html' : '#home'}" class="nav-logo" aria-label="João Borlido — home">jborlido<span class="caret"></span></a>
          <ul class="nav-menu">
            <li><a href="${link('#services')}" class="nav-link"><span class="idx">01</span>What I Do</a></li>
            <li><a href="${link('#work')}" class="nav-link"><span class="idx">02</span>Work</a></li>
            <li><a href="${link('#experience')}" class="nav-link"><span class="idx">03</span>Experience</a></li>
            <li><a href="${link('#about')}" class="nav-link"><span class="idx">04</span>Contact</a></li>
          </ul>
          <button class="hamburger" aria-label="Toggle menu">
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>
    `;
  }

  render() {
    document.body.insertAdjacentHTML('afterbegin', this.getNavigationHTML());
  }

  attachEventListeners() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
      hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
      });

      document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
          hamburger.classList.remove('active');
          navMenu.classList.remove('active');
        });
      });
    }

    if (!this.isSubPage) {
      this.setupActiveNavigation();
    }
  }

  setupActiveNavigation() {
    const sections = document.querySelectorAll('section[id], header[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
      let current = '';
      sections.forEach(section => {
        if (scrollY >= section.offsetTop - 200) {
          current = section.getAttribute('id');
        }
      });

      navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
      });
    }, { passive: true });
  }
}

// Auto-initialize: sub-pages live one level deep (/work/ or /projects/)
document.addEventListener('DOMContentLoaded', () => {
  const isSubPage = /\/(projects|work)\//.test(window.location.pathname);
  new NavigationModule(isSubPage);
});
