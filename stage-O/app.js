 // Update time display
        // function updateTime() {
        //     const timeElement = document.querySelector('[data-testid="test-user-time"]');
        //     timeElement.textContent = Date.now();
        // }
        
        // Initial call
        // updateTime();
        
        // Update time every second
        // setInterval(updateTime, 1000);

        // Profile Card Functionality
function updateTime() {
    const timeElement = document.querySelector('[data-testid="test-user-time"]');
    if (timeElement) {
        timeElement.textContent = Date.now();
    }
}

// Contact Form Validation
function initContactForm() {
    const form = document.querySelector('.contact-form');
    const submitButton = document.querySelector('[data-testid="test-contact-submit"]');
    const successMessage = document.querySelector('[data-testid="test-contact-success"]');
    
    if (!form) return;
    
    const fields = {
        name: document.querySelector('[data-testid="test-contact-name"]'),
        email: document.querySelector('[data-testid="test-contact-email"]'),
        subject: document.querySelector('[data-testid="test-contact-subject"]'),
        message: document.querySelector('[data-testid="test-contact-message"]')
    };
    
    const errors = {
        name: document.querySelector('[data-testid="test-contact-error-name"]'),
        email: document.querySelector('[data-testid="test-contact-error-email"]'),
        subject: document.querySelector('[data-testid="test-contact-error-subject"]'),
        message: document.querySelector('[data-testid="test-contact-error-message"]')
    };
    
    // Validation functions
    function validateName() {
        const value = fields.name.value.trim();
        if (!value) {
            showError('name', 'Full name is required');
            return false;
        }
        hideError('name');
        return true;
    }
    
    function validateEmail() {
        const value = fields.email.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!value) {
            showError('email', 'Email is required');
            return false;
        }
        if (!emailRegex.test(value)) {
            showError('email', 'Please enter a valid email address');
            return false;
        }
        hideError('email');
        return true;
    }
    
    function validateSubject() {
        const value = fields.subject.value.trim();
        if (!value) {
            showError('subject', 'Subject is required');
            return false;
        }
        hideError('subject');
        return true;
    }
    
    function validateMessage() {
        const value = fields.message.value.trim();
        if (!value) {
            showError('message', 'Message is required');
            return false;
        }
        if (value.length < 10) {
            showError('message', 'Message must be at least 10 characters long');
            return false;
        }
        hideError('message');
        return true;
    }
    
    function showError(field, message) {
        errors[field].textContent = message;
        errors[field].classList.add('show');
        fields[field].parentElement.classList.add('error');
    }
    
    function hideError(field) {
        errors[field].classList.remove('show');
        fields[field].parentElement.classList.remove('error');
    }
    
    function validateForm() {
        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isSubjectValid = validateSubject();
        const isMessageValid = validateMessage();
        
        return isNameValid && isEmailValid && isSubjectValid && isMessageValid;
    }
    
    // Event listeners for real-time validation
    fields.name.addEventListener('blur', validateName);
    fields.email.addEventListener('blur', validateEmail);
    fields.subject.addEventListener('blur', validateSubject);
    fields.message.addEventListener('blur', validateMessage);
    
    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm()) {
            // Show success message
            successMessage.classList.add('show');
            
            // Reset form
            form.reset();
            
            // Hide success message after 5 seconds
            setTimeout(() => {
                successMessage.classList.remove('show');
            }, 5000);
        }
    });
}

// Initialize all functionality
function initApp() {
    // Update time for profile card
    updateTime();
    setInterval(updateTime, 1000);
    
    // Initialize contact form if on contact page
    initContactForm();
    
    // Add loading state for avatar
    const avatar = document.querySelector('[data-testid="test-user-avatar"]');
    if (avatar) {
        avatar.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        
        avatar.style.opacity = '0';
        avatar.style.transition = 'opacity 0.3s ease';
    }
}

// Initialize when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}

// Mobile Navigation Functionality
function initMobileNavigation() {
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (!mobileMenuButton || !mobileMenu) return;
    
    function toggleMobileMenu() {
        mobileMenuButton.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        
        // Update aria-expanded attribute for accessibility
        const isExpanded = mobileMenuButton.classList.contains('active');
        mobileMenuButton.setAttribute('aria-expanded', isExpanded);
    }
    
    // Toggle menu on button click
    mobileMenuButton.addEventListener('click', toggleMobileMenu);
    
    // Close menu when clicking on a link
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuButton.classList.remove('active');
            mobileMenu.classList.remove('active');
            mobileMenuButton.setAttribute('aria-expanded', 'false');
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!mobileMenu.contains(e.target) && !mobileMenuButton.contains(e.target)) {
            mobileMenuButton.classList.remove('active');
            mobileMenu.classList.remove('active');
            mobileMenuButton.setAttribute('aria-expanded', 'false');
        }
    });
    
    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            mobileMenuButton.classList.remove('active');
            mobileMenu.classList.remove('active');
            mobileMenuButton.setAttribute('aria-expanded', 'false');
        }
    });
}

// Update your existing initApp function to include mobile navigation
function initApp() {
    // Update time for profile card
    updateTime();
    setInterval(updateTime, 1000);
    
    // Initialize contact form if on contact page
    initContactForm();
    
    // Initialize mobile navigation
    initMobileNavigation();
    
    // Add loading state for avatar
    const avatar = document.querySelector('[data-testid="test-user-avatar"]');
    if (avatar) {
        avatar.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        
        avatar.style.opacity = '0';
        avatar.style.transition = 'opacity 0.3s ease';
    }
}