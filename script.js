const menuBtn = document.querySelector('.mobile-menu-toggle');
const siteNav = document.querySelector('.navbar');
const links = document.querySelectorAll('.nav-link');

menuBtn.addEventListener('click', () => {
    menuBtn.classList.toggle('active');
    siteNav.classList.toggle('active');
    document.body.classList.toggle('menu-open');
});

links.forEach(l => {
    l.addEventListener('click', () => {
        menuBtn.classList.remove('active');
        siteNav.classList.remove('active');
        document.body.classList.remove('menu-open');
    });
});

const viewObserver = new IntersectionObserver((obs) => {
    obs.forEach((o) => {
        if (o.isIntersecting) {
            o.target.classList.add('active');
        }
    });
}, { threshold: 0.1 });

const items = document.querySelectorAll('.reveal');
items.forEach((i) => viewObserver.observe(i));
