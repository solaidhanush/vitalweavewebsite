/**
 * VitalWeave® & RPM Interactive Logic
 * Handles Mobile Menu, Products Dropdown, FAQ Accordion, and Header Scroll Effects
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Header scroll effect
  const header = document.getElementById('header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 20) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }

  // 2. Desktop Products Dropdown
  const productsDropdownBtn = document.getElementById('productsDropdownBtn');
  const dropdownParent = productsDropdownBtn ? productsDropdownBtn.closest('.has-dropdown') : null;

  if (productsDropdownBtn && dropdownParent) {
    productsDropdownBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isExpanded = productsDropdownBtn.getAttribute('aria-expanded') === 'true';
      productsDropdownBtn.setAttribute('aria-expanded', !isExpanded);
      dropdownParent.classList.toggle('is-open');
    });

    // Close on click outside
    document.addEventListener('click', (e) => {
      if (!dropdownParent.contains(e.target)) {
        productsDropdownBtn.setAttribute('aria-expanded', 'false');
        dropdownParent.classList.remove('is-open');
      }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        productsDropdownBtn.setAttribute('aria-expanded', 'false');
        dropdownParent.classList.remove('is-open');
      }
    });
  }

  // 3. Mobile Menu & Mobile Dropdown
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const mobileProductsToggle = document.getElementById('mobileProductsToggle');
  const mobileProductsMenu = document.getElementById('mobileProductsMenu');
  const mobileDirectLinks = document.querySelectorAll(
    '.mobile-nav-link:not(.mobile-dropdown-toggle), .mobile-dropdown-item, .btn-mobile-cta'
  );

  if (mobileMenuBtn && mobileDrawer) {
    mobileMenuBtn.addEventListener('click', () => {
      const isExpanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true';
      mobileMenuBtn.setAttribute('aria-expanded', !isExpanded);
      mobileMenuBtn.classList.toggle('is-active');
      mobileDrawer.classList.toggle('is-open');
    });

    // Close drawer when clicking actual nav links
    mobileDirectLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
        mobileMenuBtn.classList.remove('is-active');
        mobileDrawer.classList.remove('is-open');
      });
    });
  }

  // Mobile Products Accordion Toggle
  if (mobileProductsToggle && mobileProductsMenu) {
    mobileProductsToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isExpanded = mobileProductsToggle.getAttribute('aria-expanded') === 'true';
      mobileProductsToggle.setAttribute('aria-expanded', !isExpanded);
      mobileProductsToggle.classList.toggle('is-active');
      mobileProductsMenu.classList.toggle('is-open');
    });
  }

  // 4. FAQ Accordion Interaction
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question-btn');

    if (questionBtn) {
      questionBtn.addEventListener('click', () => {
        const isActive = item.classList.contains('is-active');

        // Close all other accordion items
        faqItems.forEach(otherItem => {
          if (otherItem !== item) {
            otherItem.classList.remove('is-active');
            const otherBtn = otherItem.querySelector('.faq-question-btn');
            if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
          }
        });

        // Toggle current item
        if (isActive) {
          item.classList.remove('is-active');
          questionBtn.setAttribute('aria-expanded', 'false');
        } else {
          item.classList.add('is-active');
          questionBtn.setAttribute('aria-expanded', 'true');
        }
      });
    }
  });

  // 5. Smooth Anchor Scrolling with Header Offset for on-page anchors
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId && targetId !== '#') {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          const headerOffset = 80;
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  });
});
