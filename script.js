// ============================
// Typing Effect
// ============================
const phrases = [
    'Software Engineer',
    'CS Student at Drew University',
    'Web Developer',
    'Data Science Enthusiast'
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typedEl = document.getElementById('typed-text');

function type() {
    const current = phrases[phraseIndex];
    typedEl.textContent = isDeleting
        ? current.substring(0, charIndex - 1)
        : current.substring(0, charIndex + 1);
    charIndex += isDeleting ? -1 : 1;

    let delay = isDeleting ? 55 : 95;

    if (!isDeleting && charIndex === current.length) {
        delay = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        delay = 400;
    }

    setTimeout(type, delay);
}

type();


// ============================
// Scroll Reveal
// ============================
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));


// ============================
// Scroll to Top Button
// ============================
const scrollButton = document.getElementById('drop-down');
const scrollContainer = document.getElementById('scroll-container');

window.addEventListener('scroll', () => {
    scrollContainer.style.display = window.scrollY > 300 ? 'block' : 'none';
});

scrollButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

scrollContainer.style.display = 'none';


// ============================
// EmailJS Initialization
// ============================
(function() {
    emailjs.init("dnrJt4ojyuci2ewsT");
})();


// ============================
// Contact Form Validation and Sending
// ============================
const submitBtn  = document.getElementById('submit-btn');
const feedback   = document.getElementById('form-feedback');
const emailInput = document.getElementById('user-email');
const nameInput  = document.getElementById('user-first-name');
const msgInput   = document.getElementById('user-message');

submitBtn.addEventListener('click', () => {
    feedback.textContent = '';
    feedback.className = '';

    const email   = emailInput.value.trim();
    const name    = nameInput.value.trim();
    const message = msgInput.value.trim();
    const phone   = document.getElementById('user-phone').value.trim();

    if (!email || !name || !message) {
        showFeedback('Please fill in all required fields.', 'error');
        return;
    }

    if (!isValidEmail(email)) {
        showFeedback('Please enter a valid email address.', 'error');
        return;
    }

    // Disable button and show sending state
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';
    console.log('Starting to send email...');

    // Send email using EmailJS
    const templateParams = {
        from_name: name,
        from_email: email,
        phone: phone,
        message: message,
        to_email: 'dylanbrooks0215@gmail.com' // Your email address
    };

    emailjs.send('service_kr214ck', 'template_v2azzno', templateParams)
        .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
            showFeedback(`Thanks, ${name}! Your message was sent. I'll be in touch soon. 🌱`, 'success');
            emailInput.value = '';
            nameInput.value  = '';
            msgInput.value   = '';
            document.getElementById('user-phone').value = '';
        }, function(error) {
            console.log('FAILED...', error);
            showFeedback('Sorry, there was an error sending your message. Please try again later.', 'error');
        })
        .finally(() => {
            // Re-enable button
            submitBtn.disabled = false;
            submitBtn.textContent = 'Send Message';
            console.log('Button re-enabled');
        });
});

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showFeedback(message, type) {
    feedback.textContent = message;
    feedback.className = type;
}


// ============================
// Active Nav Highlight on Scroll
// ============================
const sections = document.querySelectorAll('[id$="-container"]');
const navLinks = document.querySelectorAll('.nav-buttons');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            navLinks.forEach(link => {
                link.style.backgroundColor = '';
                link.style.fontWeight = '';
            });
            const activeLink = document.querySelector(`.nav-buttons[href="#${entry.target.id}"]`);
            if (activeLink) {
                activeLink.style.backgroundColor = '#689a75';
                activeLink.style.fontWeight = '700';
            }
        }
    });
}, { threshold: 0.3 });

sections.forEach(section => observer.observe(section));