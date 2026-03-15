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
// Contact Form Validation
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

    if (!email || !name || !message) {
        showFeedback('Please fill in all required fields.', 'error');
        return;
    }

    if (!isValidEmail(email)) {
        showFeedback('Please enter a valid email address.', 'error');
        return;
    }

    // Success
    showFeedback(`Thanks, ${name}! Your message was sent. I'll be in touch soon. 🌱`, 'success');
    emailInput.value = '';
    nameInput.value  = '';
    msgInput.value   = '';
    document.getElementById('user-phone').value = '';
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