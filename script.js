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

const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(contactForm);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            message: formData.get('message')
        };

        formStatus.textContent = 'Sending message...';
        formStatus.style.color = 'white';

        try {
            const response = await fetch('http://localhost:5002/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();

            if (response.ok) {
                formStatus.textContent = result.message || 'Message sent successfully!';
                formStatus.style.color = '#d2e4e7ff'; // Green
                contactForm.reset();
            } else {
                formStatus.textContent = result.error || 'Server is busy, please try again later.';
                formStatus.style.color = '#dc3545'; // Red
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            formStatus.textContent = 'Something went wrone while connecting to server, please try again later.';
            formStatus.style.color = '#dc3545'; // Red
        }
    });
}
