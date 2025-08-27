document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const closeMobileMenuButton = document.getElementById('close-mobile-menu');
    const mobileMenu = document.getElementById('mobile-menu');
    const mainHeader = document.getElementById('mainHeader'); // Get the header element to calculate its height
    const navLinks = document.querySelectorAll('nav ul li a'); // All navigation links
    const sections = document.querySelectorAll('main section[id], footer[id]'); // All main sections and footer with an ID

    // Debounce function to limit how often a function runs
    function debounce(func, delay) {
        let timeout;
        return function(...args) {
            const context = this;
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(context, args), delay);
        };
    }

    // Function to set the active navigation link based on the current section ID
    function setActiveNavLink(currentSectionId) {
        navLinks.forEach(link => {
            // Remove active styles from all links first
            link.classList.remove('scale-110', 'font-bold', 'text-teal-400');
            // Re-apply default inactive styles (e.g., text-gray-300)
            link.classList.add('text-gray-300');
        });

        let activeLink = null;
        if (currentSectionId === "") { // Special case for the "Home" link (href="#")
            activeLink = document.querySelector('nav ul li a[href="#"]');
        } else {
            // Find the link whose href matches the current section's ID
            activeLink = document.querySelector(`nav ul li a[href="#${currentSectionId}"]`);
        }

        if (activeLink) {
            // Apply active styles to the found link
            activeLink.classList.add('scale-110', 'font-bold', 'text-teal-400');
            // Remove inactive text color from the active link
            activeLink.classList.remove('text-gray-300');
        }
    }

    // Function to update the active link based on scroll position
    const updateActiveLinkOnScroll = () => {
        const headerHeight = mainHeader.offsetHeight; // Get the dynamic height of the fixed header
        let currentActiveSectionId = ''; // Default to empty string for 'Home'

        // Check if at the very top of the page (before the first section)
        // Adjust the threshold by the header height to account for the fixed header
        if (window.scrollY < sections[0].offsetTop - headerHeight) {
            currentActiveSectionId = ''; // Corresponds to the "Home" link (href="#")
        } else {
            // Iterate through each section to find which one is currently in view
            // We iterate in reverse to prioritize sections closer to the top of the viewport
            for (let i = sections.length - 1; i >= 0; i--) {
                const section = sections[i];
                // Calculate the section's top position relative to the viewport, accounting for the fixed header
                const sectionTop = section.offsetTop - headerHeight - 1; // Subtract 1 for a small buffer

                // If the current scroll position is at or past the section's adjusted top,
                // and before the next section, then this section is active.
                if (window.scrollY >= sectionTop) {
                    currentActiveSectionId = section.id;
                    break; // Found the active section, stop checking
                }
            }
        }
        // Set the active link using the determined section ID
        setActiveNavLink(currentActiveSectionId);
    };

    // --- Mobile Menu Toggle ---
    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.remove('translate-x-full');
        mobileMenu.classList.add('translate-x-0');
        document.body.style.overflow = 'hidden';
    });

    closeMobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.remove('translate-x-0');
        mobileMenu.classList.add('translate-x-full');
        document.body.style.overflow = '';
    });

    // Close mobile menu and update active link when a navigation link is clicked
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('translate-x-0');
            mobileMenu.classList.add('translate-x-full');
            document.body.style.overflow = '';
            // Immediately update the active link based on the clicked link's href
            const targetId = link.getAttribute('href').substring(1); // Remove '#'
            setActiveNavLink(targetId);
        });
    });

    // For desktop navigation links (assuming they also cause a scroll jump)
    document.querySelectorAll('nav.md\\:flex ul li a').forEach(link => {
        link.addEventListener('click', () => {
            const targetId = link.getAttribute('href').substring(1); // Remove '#'
            setActiveNavLink(targetId);
        });
    });

    // Initialize the active link when the page first loads
    updateActiveLinkOnScroll();

    // Add a debounced scroll event listener to update active links
    window.addEventListener('scroll', debounce(updateActiveLinkOnScroll, 50)); // Check every 50ms
});