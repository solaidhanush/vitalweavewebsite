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

  // 2. Desktop Solutions Dropdown (Hover & Click Support)
  const dropdownParents = document.querySelectorAll('.has-dropdown');

  dropdownParents.forEach(parent => {
    const btn = parent.querySelector('.dropdown-toggle');
    const menu = parent.querySelector('.nav-dropdown-menu');
    let closeTimeout = null;

    if (btn && menu) {
      // Open on hover in
      parent.addEventListener('mouseenter', () => {
        if (closeTimeout) clearTimeout(closeTimeout);
        btn.setAttribute('aria-expanded', 'true');
        parent.classList.add('is-open');
      });

      // Close automatically on hover out
      parent.addEventListener('mouseleave', () => {
        closeTimeout = setTimeout(() => {
          btn.setAttribute('aria-expanded', 'false');
          parent.classList.remove('is-open');
        }, 120);
      });

      // Click toggle support (for touch / direct click)
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const isExpanded = btn.getAttribute('aria-expanded') === 'true';
        btn.setAttribute('aria-expanded', !isExpanded);
        parent.classList.toggle('is-open');
      });

      // Close when an item inside is clicked
      menu.querySelectorAll('.dropdown-item').forEach(item => {
        item.addEventListener('click', () => {
          btn.setAttribute('aria-expanded', 'false');
          parent.classList.remove('is-open');
        });
      });
    }
  });

  // Close on click outside
  document.addEventListener('click', (e) => {
    document.querySelectorAll('.has-dropdown.is-open').forEach(openDropdown => {
      if (!openDropdown.contains(e.target)) {
        const btn = openDropdown.querySelector('.dropdown-toggle');
        if (btn) btn.setAttribute('aria-expanded', 'false');
        openDropdown.classList.remove('is-open');
      }
    });
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.has-dropdown.is-open').forEach(openDropdown => {
        const btn = openDropdown.querySelector('.dropdown-toggle');
        if (btn) btn.setAttribute('aria-expanded', 'false');
        openDropdown.classList.remove('is-open');
      });
    }
  });

  // 3. Mobile Menu & Mobile Dropdown
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const mobileSolutionsToggle = document.getElementById('mobileSolutionsToggle') || document.getElementById('mobileProductsToggle') || document.querySelector('.mobile-dropdown-toggle');
  const mobileSolutionsMenu = document.getElementById('mobileSolutionsMenu') || document.getElementById('mobileProductsMenu') || document.querySelector('.mobile-dropdown-menu');
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

  // Mobile Solutions Accordion Toggle
  if (mobileSolutionsToggle && mobileSolutionsMenu) {
    mobileSolutionsToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isExpanded = mobileSolutionsToggle.getAttribute('aria-expanded') === 'true';
      mobileSolutionsToggle.setAttribute('aria-expanded', !isExpanded);
      mobileSolutionsToggle.classList.toggle('is-active');
      mobileSolutionsMenu.classList.toggle('is-open');
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
