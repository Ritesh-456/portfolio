document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const closeMobileMenuButton = document.getElementById('close-mobile-menu');
    const mobileMenu = document.getElementById('mobile-menu');
    const mainHeader = document.getElementById('mainHeader');
    const desktopModesButton = document.getElementById('desktop-modes-button');
    const mobileModesButton = document.getElementById('mobile-modes-button');

    // --- Mobile Menu Toggle ---
    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.remove('translate-x-full');
        mobileMenu.classList.add('translate-x-0');
        // Prevent body scroll when mobile menu is open
        document.body.style.overflow = 'hidden';
    });

    closeMobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.remove('translate-x-0');
        mobileMenu.classList.add('translate-x-full');
        // Restore body scroll
        document.body.style.overflow = '';
    });

    // Close menu when a link is clicked
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('translate-x-0');
            mobileMenu.classList.add('translate-x-full');
            document.body.style.overflow = '';
        });
    });

    // --- Header Background Change on Scroll ---
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            mainHeader.classList.add('bg-white', 'shadow-md');
            // Apply dark header background on scroll if in dark mode
            if (document.documentElement.classList.contains('dark')) {
                mainHeader.classList.add('dark:bg-gray-800');
            }
        } else {
            mainHeader.classList.remove('bg-white', 'shadow-md');
            // Remove dark header background if it was added
            mainHeader.classList.remove('dark:bg-gray-800');
        }
    });

    // --- Theme Toggle Logic ---
    const htmlElement = document.documentElement; // This is the <html> tag

    // Function to set theme
    function setTheme(theme) {
        if (theme === 'dark') {
            htmlElement.classList.add('dark');
            if (desktopModesButton) desktopModesButton.textContent = 'Light Mode';
            if (mobileModesButton) mobileModesButton.textContent = 'Light Mode';
            localStorage.setItem('theme', 'dark');
        } else {
            htmlElement.classList.remove('dark');
            if (desktopModesButton) desktopModesButton.textContent = 'Dark Mode';
            if (mobileModesButton) mobileModesButton.textContent = 'Dark Mode';
            localStorage.setItem('theme', 'light');
        }
        // Ensure header background adapts immediately when theme changes
        if (window.scrollY > 50) {
            if (theme === 'dark') {
                mainHeader.classList.add('dark:bg-gray-800');
            } else {
                mainHeader.classList.remove('dark:bg-gray-800');
            }
        }
    }

    // Initialize theme from localStorage or default to light
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        setTheme(savedTheme);
    } else {
        // Default to light theme if no preference is saved
        setTheme('light');
    }

    // Toggle theme on button click
    [desktopModesButton, mobileModesButton].forEach(button => {
        if (button) { // Ensure button exists before adding event listener
            button.addEventListener('click', () => {
                const currentTheme = htmlElement.classList.contains('dark') ? 'dark' : 'light';
                setTheme(currentTheme === 'light' ? 'dark' : 'light');
            });
        }
    });
});