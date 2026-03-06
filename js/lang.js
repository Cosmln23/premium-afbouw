function changeLanguage(lang) {
    // Update the HTML lang attribute
    document.documentElement.lang = lang;

    // Find all elements that have a translation attribute for the selected language
    const translatableElements = document.querySelectorAll(`[data-${lang}]`);

    translatableElements.forEach(element => {
        // Check if it's an input or textarea to update the placeholder
        if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
            element.placeholder = element.getAttribute(`data-${lang}`);
        } else {
            // For normal elements, update their internal text
            // We check if it has a title attribute and update that too if needed
            if (element.hasAttribute('title')) {
                element.setAttribute('title', element.getAttribute(`data-${lang}`));
            }
            element.textContent = element.getAttribute(`data-${lang}`);
        }
    });

    // Sync mobile select dropdown
    const mobileSelect = document.getElementById('mobile-lang-select');
    if (mobileSelect) mobileSelect.value = lang;

    // Update active state on lang buttons
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active-lang', btn.getAttribute('data-lang') === lang);
    });

    // Save preference
    localStorage.setItem('pa_lang', lang);
}

// Restore saved language on load
document.addEventListener('DOMContentLoaded', () => {
    const saved = localStorage.getItem('pa_lang');
    if (saved) changeLanguage(saved);
});
