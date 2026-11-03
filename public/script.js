// MOBILE NAVIGATION

const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');

menuToggle?.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');

  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute(
    'aria-label',
    open ? 'Close menu' : 'Open menu'
  );

  menuToggle.textContent = open ? '×' : '☰';
});

navLinks?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');

    menuToggle?.setAttribute('aria-expanded', 'false');

    if (menuToggle) {
      menuToggle.textContent = '☰';
      menuToggle.setAttribute('aria-label', 'Open menu');
    }
  });
});


// PROJECT FILTERS

const filterButtons = document.querySelectorAll('.filter-btn');
const projectRows = document.querySelectorAll('.project-row');

filterButtons.forEach(button => {
  button.addEventListener('click', () => {

    filterButtons.forEach(item => {
      item.classList.toggle('is-active', item === button);
    });

    const filter = button.dataset.filter;

    projectRows.forEach(row => {
      row.hidden =
        filter !== 'all' &&
        row.dataset.category !== filter;
    });

  });
});


// PROJECT DETAILS POPUP

const modal = document.getElementById('project-modal');
const modalTitle = document.getElementById('modal-title');
const modalDescription = document.getElementById('modal-description');

document.querySelectorAll('.details-trigger').forEach(button => {

  button.addEventListener('click', () => {

    modalTitle.textContent =
      button.dataset.title || 'Project details';

    modalDescription.textContent =
      button.dataset.description || '';

    modal?.showModal();

  });

});


// CLOSE POPUP

document.querySelector('.modal-close')?.addEventListener('click', () => {
  modal?.close();
});

modal?.addEventListener('click', event => {
  if (event.target === modal) {
    modal.close();
  }
});


// SCROLL REVEAL ANIMATIONS

if (
  'IntersectionObserver' in window &&
  !window.matchMedia('(prefers-reduced-motion: reduce)').matches
) {

  const observer = new IntersectionObserver(entries => {

    entries.forEach(entry => {

      if (entry.isIntersecting) {

        entry.target.classList.add('visible');

        observer.unobserve(entry.target);

      }

    });

  }, {
    threshold: 0.12
  });

  document.querySelectorAll(
    '.section, .project-row, .tool-group, .intro-strip'
  ).forEach(element => {

    element.classList.add('reveal');

    observer.observe(element);

  });

}