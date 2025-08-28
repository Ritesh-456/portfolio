document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const closeMobileMenuButton = document.getElementById('close-mobile-menu');
    const mobileMenu = document.getElementById('mobile-menu');
    const desktopNav = document.getElementById('desktop-nav');
    const mainHeader = document.getElementById('mainHeader');
    // Updated to include the new Projects section
    const navLinks = document.querySelectorAll('nav ul li a');
    const sections = document.querySelectorAll('main section[id], footer[id]');

    // Debounce function
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
            link.classList.remove('scale-110', 'font-bold', 'text-teal-600');
            // Re-apply default inactive styles
            link.classList.add('text-gray-700');
        });

        let activeLink = null;
        if (currentSectionId === "") { // Special case for the "Home" link (href="#")
            activeLink = document.querySelector('#desktop-nav ul li a[href="#"]');
        } else {
            activeLink = document.querySelector(`#desktop-nav ul li a[href="#${currentSectionId}"]`);
        }

        if (activeLink) {
            activeLink.classList.add('scale-110', 'font-bold', 'text-teal-600');
            activeLink.classList.remove('text-gray-700');
        }
    }

    // Function to update the active link based on scroll position
    const updateActiveLinkOnScroll = () => {
        const headerHeight = mainHeader.offsetHeight;
        let currentActiveSectionId = '';

        if (window.scrollY < sections[0].offsetTop - headerHeight) {
            currentActiveSectionId = ''; // Corresponds to the "Home" link
        } else {
            for (let i = sections.length - 1; i >= 0; i--) {
                const section = sections[i];
                // Subtract a buffer from sectionTop to make the highlight appear slightly before the section fully enters view
                const sectionTop = section.offsetTop - headerHeight - 100; // Adjusted buffer

                if (window.scrollY >= sectionTop) {
                    currentActiveSectionId = section.id;
                    break;
                }
            }
        }
        setActiveNavLink(currentActiveSectionId);
    };

    // Function to handle header/nav styling on scroll (centering, padding)
    const handleScrollNavStyling = () => {
        if (window.scrollY > 50) { // Scroll threshold (e.g., 50px)
            desktopNav.classList.remove('md:justify-end');
            desktopNav.classList.add('md:justify-center');
            mainHeader.classList.remove('py-3');
            mainHeader.classList.add('py-2');
        } else {
            desktopNav.classList.remove('md:justify-center');
            desktopNav.classList.add('md:justify-end');
            mainHeader.classList.remove('py-2');
            mainHeader.classList.add('py-3');
        }
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
            const targetId = link.getAttribute('href').substring(1);
            setActiveNavLink(targetId);
        });
    });

    // For desktop navigation links (update active state on click)
    document.querySelectorAll('#desktop-nav ul li a').forEach(link => {
        link.addEventListener('click', () => {
            const targetId = link.getAttribute('href').substring(1);
            setActiveNavLink(targetId);
        });
    });

    // --- Project "Show More/Less" functionality ---
    document.querySelectorAll('.show-more-btn').forEach(button => {
        button.addEventListener('click', () => {
            const targetId = button.dataset.target;
            const descriptionElement = document.getElementById(targetId);

            if (descriptionElement.classList.contains('line-clamp-custom-3')) {
                descriptionElement.classList.remove('line-clamp-custom-3');
                button.textContent = 'Show Less';
            } else {
                descriptionElement.classList.add('line-clamp-custom-3');
                button.textContent = 'Show More';
            }
        });
    });

    // Initial checks on load
    handleScrollNavStyling();
    updateActiveLinkOnScroll();

    // Add scroll event listeners with debounce for performance
    window.addEventListener('scroll', debounce(() => {
        handleScrollNavStyling();
        updateActiveLinkOnScroll();
    }, 50));
});