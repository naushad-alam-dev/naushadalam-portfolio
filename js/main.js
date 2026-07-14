// ==========================================
// 1. TYPEWRITER EFFECT
// ==========================================
const texts = ['Frontend Developer', 'UI Engineer', 'WordPress Expert', 'Tailwind Specialist'];
let textIndex = 0, charIndex = 0, isDeleting = false;
const typingEl = document.getElementById('typing-text');

function type() {
    if (!typingEl) return; // Guard clause in case element isn't rendered
    const current = texts[textIndex];
    typingEl.textContent = isDeleting ? current.substring(0, charIndex - 1) : current.substring(0, charIndex + 1);
    isDeleting ? charIndex-- : charIndex++;
    
    if (!isDeleting && charIndex === current.length) {
        setTimeout(() => isDeleting = true, 1500);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false; 
        textIndex = (textIndex + 1) % texts.length;
    }
    setTimeout(type, isDeleting ? 50 : 100);
}
// Start the typing effect once the script loads
if (typingEl) type();


// ==========================================
// 2. SCROLL ANIMATIONS (FADE-IN + SKILL BARS)
// ==========================================
const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            e.target.classList.add('visible');
            e.target.querySelectorAll('.skill-fill').forEach(bar => {
                bar.style.width = bar.dataset.width + '%';
            });
        }
    });
}, { threshold: 0.1 });

// This ensures all your layout sections actually fade back into view!
document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));


// ==========================================
// 3. FULLY FUNCTIONAL CONTACT FORM (WEB3FORMS)
// ==========================================
function handleContact(e) {
    e.preventDefault();
    
    const form = e.target;
    const btn = document.getElementById('contact-btn');
    
    // UI feedback: Disable button and show sending status
    btn.textContent = 'Sending...';
    btn.disabled = true;

    // Collect the inputs automatically
    const formData = new FormData(form);

    // Send the data securely in the background
    fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (response.ok) {
            // Success State
            btn.textContent = '✔ Message Sent!';
            btn.style.background = '#22c55e';
            form.reset(); 
        } else {
            // Server Error State
            btn.textContent = '❌ Error sending';
            btn.style.background = '#ef4444';
        }
    })
    .catch(error => {
        // Network/Connection Error State
        btn.textContent = '❌ Error sending';
        btn.style.background = '#ef4444';
    })
    .finally(() => {
        // Revert the button styles back to normal after 3 seconds
        setTimeout(() => {
            btn.textContent = 'Send Message →';
            btn.style.background = '';
            btn.disabled = false;
        }, 3000);
    });
}