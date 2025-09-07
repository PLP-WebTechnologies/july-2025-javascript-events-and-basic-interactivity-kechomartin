// ===========================================
// PART 1: EVENT HANDLING DEMONSTRATIONS
// ===========================================

/**
 * Counter functionality with click events
 * basic event listeners and DOM manipulation
 */
let clickCount = 0;
const counterDisplay = document.getElementById('clickCounter');
const incrementBtn = document.getElementById('incrementBtn');
const decrementBtn = document.getElementById('decrementBtn');
const resetBtn = document.getElementById('resetBtn');

// Increment counter
incrementBtn.addEventListener('click', function() {
    clickCount++;
    counterDisplay.textContent = clickCount;
    counterDisplay.style.color = clickCount > 0 ? 'var(--success-color)' : 'var(--primary-color)';
});

// Decrement counter
decrementBtn.addEventListener('click', function() {
    clickCount--;
    counterDisplay.textContent = clickCount;
    counterDisplay.style.color = clickCount < 0 ? 'var(--danger-color)' : 'var(--primary-color)';
});

// Reset counter
resetBtn.addEventListener('click', function() {
    clickCount = 0;
    counterDisplay.textContent = clickCount;
    counterDisplay.style.color = 'var(--primary-color)';
});

/**
 * Hover effect demonstration
 * Shows mouseenter, mouseleave, and click events
 */
const hoverBox = document.getElementById('hoverBox');
const hoverStatus = document.getElementById('hoverStatus');

hoverBox.addEventListener('mouseenter', function() {
    this.style.background = 'var(--primary-color)';
    this.style.color = 'white';
    this.style.transform = 'scale(1.1)';
    this.textContent = 'Hovering! 🔥';
    hoverStatus.textContent = 'Status: Mouse Over';
    hoverStatus.style.color = 'var(--primary-color)';
});

hoverBox.addEventListener('mouseleave', function() {
    this.style.background = 'var(--card-bg)';
    this.style.color = 'var(--text-color)';
    this.style.transform = 'scale(1)';
    this.textContent = 'Hover me! 🎯';
    hoverStatus.textContent = 'Status: Ready';
    hoverStatus.style.color = 'var(--text-color)';
});

hoverBox.addEventListener('click', function() {
    this.style.background = 'var(--success-color)';
    this.textContent = 'Clicked! ✨';
    hoverStatus.textContent = 'Status: Clicked!';
    hoverStatus.style.color = 'var(--success-color)';
    
    // Reset after 1 second
    setTimeout(() => {
        this.style.background = 'var(--card-bg)';
        this.style.color = 'var(--text-color)';
        this.textContent = 'Hover me! 🎯';
        hoverStatus.textContent = 'Status: Ready';
        hoverStatus.style.color = 'var(--text-color)';
    }, 1000);
});

// ===========================================
// THEME TOGGLE FUNCTIONALITY
// ===========================================

/**
 * Dark/Light theme switching
 * Demonstrates localStorage for persistence and CSS custom properties
 */
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// Load saved theme or default to light
const savedTheme = localStorage.getItem('theme') || 'light';
if (savedTheme === 'dark') {
    body.setAttribute('data-theme', 'dark');
}

themeToggle.addEventListener('click', function() {
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Add a fun animation to the button
    this.style.transform = 'rotate(360deg)';
    setTimeout(() => {
        this.style.transform = 'rotate(0deg)';
    }, 300);
});

// ===========================================
// PART 2: INTERACTIVE COMPONENTS
// ===========================================

/**
 * Collapsible FAQ Section
 * Demonstrates event delegation and CSS class manipulation
 */
const faqContainer = document.querySelector('.faq-container');

faqContainer.addEventListener('click', function(event) {
    // Check if clicked element is a FAQ question
    if (event.target.classList.contains('faq-question') || event.target.parentElement.classList.contains('faq-question')) {
        const question = event.target.classList.contains('faq-question') ? event.target : event.target.parentElement;
        const answer = question.nextElementSibling;
        const icon = question.querySelector('.faq-icon');
        
        // Toggle the active state
        answer.classList.toggle('active');
        icon.classList.toggle('rotated');
        
        // Close other FAQ items (accordion behavior)
        const allAnswers = faqContainer.querySelectorAll('.faq-answer');
        const allIcons = faqContainer.querySelectorAll('.faq-icon');
        
        allAnswers.forEach((item, index) => {
            if (item !== answer) {
                item.classList.remove('active');
                allIcons[index].classList.remove('rotated');
            }
        });
    }
});

/**
 * Tabbed Interface
 * Shows event delegation and content switching
 */
const tabButtons = document.querySelectorAll('.tab-btn');
const tabPanes = document.querySelectorAll('.tab-pane');

document.querySelector('.tab-buttons').addEventListener('click', function(event) {
    if (event.target.classList.contains('tab-btn')) {
        const targetTab = event.target.getAttribute('data-tab');
        
        // Remove active class from all buttons and panes
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabPanes.forEach(pane => pane.classList.remove('active'));
        
        // Add active class to clicked button and corresponding pane
        event.target.classList.add('active');
        document.getElementById(targetTab).classList.add('active');
    }
});

// ===========================================
// PART 3: ADVANCED FORM VALIDATION
// ===========================================

/**
 * Form validation with real-time feedback
 * Uses regular expressions and custom validation logic
 */
const form = document.getElementById('validationForm');
const successAlert = document.getElementById('successAlert');
const clearFormBtn = document.getElementById('clearForm');

// Validation patterns and rules
const validationRules = {
    firstName: {
        required: true,
        minLength: 2,
        pattern: /^[a-zA-Z\s]+$/,
        message: 'First name must be at least 2 characters and contain only letters'
    },
    lastName: {
        required: true,
        minLength: 2,
        pattern: /^[a-zA-Z\s]+$/,
        message: 'Last name must be at least 2 characters and contain only letters'
    },
    email: {
        required: true,
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: 'Please enter a valid email address'
    },
    phone: {
        required: true,
        pattern: /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
        message: 'Please enter a valid phone number (e.g., 123-456-7890)'
    },
    password: {
        required: true,
        minLength: 8,
        pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
        message: 'Password must be 8+ characters with uppercase, lowercase, number, and special character'
    }
};

/**
 * Validate individual field
 * @param {HTMLInputElement} field - The input field to validate
 * @returns {boolean} - True if field is valid
 */
function validateField(field) {
    const fieldName = field.id;
    const value = field.value.trim();
    const rules = validationRules[fieldName];
    const errorElement = document.getElementById(fieldName + 'Error');
    const successElement = document.getElementById(fieldName + 'Success');
    
    // Reset classes and messages
    field.classList.remove('error', 'success');
    errorElement.style.display = 'none';
    successElement.style.display = 'none';
    
    // Check if field is required and empty
    if (rules && rules.required && !value) {
        showError(field, errorElement, 'This field is required');
        return false;
    }
    
    // Check minimum length
    if (rules && rules.minLength && value.length < rules.minLength) {
        showError(field, errorElement, rules.message);
        return false;
    }
    
    // Check pattern
    if (rules && rules.pattern && value && !rules.pattern.test(value)) {
        showError(field, errorElement, rules.message);
        return false;
    }
    
    // Special validation for confirm password
    if (fieldName === 'confirmPassword') {
        const password = document.getElementById('password').value;
        if (value !== password) {
            showError(field, errorElement, 'Passwords do not match');
            return false;
        }
    }
    
    // Field is valid
    if (value) {
        showSuccess(field, successElement);
    }
    return true;
}

/**
 * Show error state for field
 * @param {HTMLInputElement} field - The input field
 * @param {HTMLElement} errorElement - The error message element
 * @param {string} message - The error message to display
 */
function showError(field, errorElement, message) {
    field.classList.add('error');
    errorElement.textContent = message;
    errorElement.style.display = 'block';
}

