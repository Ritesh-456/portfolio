document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const closeMobileMenuButton = document.getElementById('close-mobile-menu');
    const mobileMenu = document.getElementById('mobile-menu');
    const desktopNav = document.getElementById('desktop-nav');
    const mainHeader = document.getElementById('mainHeader');
    const portfolioTitle = document.getElementById('portfolioTitle'); // Get reference to the new p tag
    const navLinks = document.querySelectorAll('#desktop-nav ul li a'); // Target desktop nav links specifically
    const sections = document.querySelectorAll('main section[id], footer[id]');
    const projectCountDisplay = document.getElementById('project-count-display');
    const yearsExperienceDisplay = document.getElementById('years-experience-display');
    const experienceDurationElements = document.querySelectorAll('.experience-duration-display');

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
            link.classList.remove('scale-110', 'font-bold', 'text-emerald-700');
            link.classList.add('text-gray-900');
        });

        let activeLink = null;
        if (currentSectionId === "") {
            activeLink = document.querySelector('#desktop-nav ul li a[href="#"]');
        } else {
            activeLink = document.querySelector(`#desktop-nav ul li a[href="#${currentSectionId}"]`);
        }

        if (activeLink) {
            activeLink.classList.add('scale-110', 'font-bold', 'text-emerald-700');
            activeLink.classList.remove('text-gray-900');
        }
    }

    // Function to update the active link based on scroll position
    const updateActiveLinkOnScroll = () => {
        const headerHeight = mainHeader.offsetHeight;
        let currentActiveSectionId = '';

        // Check if we are at the very top of the page, above the first section
        // This is important for activating the 'Home' link correctly
        if (window.scrollY < sections[0].offsetTop - headerHeight - 100) { // Added buffer
            currentActiveSectionId = ''; // Represents the "Home" section
        } else {
            for (let i = sections.length - 1; i >= 0; i--) {
                const section = sections[i];
                // Ensure section has an ID to prevent errors
                if (!section.id) continue;

                const sectionTop = section.offsetTop - headerHeight - 100; // Adjusted for fixed header and buffer

                if (window.scrollY >= sectionTop) {
                    currentActiveSectionId = section.id;
                    break;
                }
            }
        }
        setActiveNavLink(currentActiveSectionId);
    };

    // Function to handle header/nav styling on scroll (centering, padding, font size)
    const handleScrollNavStyling = () => {
        if (window.scrollY > 50) {
            desktopNav.classList.remove('md:justify-end');
            desktopNav.classList.add('md:justify-center');
            // Shrink header padding on scroll
            mainHeader.classList.remove('py-3', 'sm:py-4');
            mainHeader.classList.add('py-2', 'sm:py-3');

            // Shrink nav link font sizes on scroll
            navLinks.forEach(link => {
                link.classList.remove('text-base', 'sm:text-lg');
                link.classList.add('text-sm', 'sm:text-base');
            });
            // Shrink portfolio title font size on scroll
            portfolioTitle.classList.remove('text-base', 'sm:text-lg');
            portfolioTitle.classList.add('text-sm', 'sm:text-base');

        } else {
            desktopNav.classList.remove('md:justify-center');
            desktopNav.classList.add('md:justify-end');
            // Restore initial larger header padding
            mainHeader.classList.remove('py-2', 'sm:py-3');
            mainHeader.classList.add('py-3', 'sm:py-4');

            // Restore initial larger nav link font sizes
            navLinks.forEach(link => {
                link.classList.remove('text-sm', 'sm:text-base');
                link.classList.add('text-base', 'sm:text-lg');
            });
            // Restore initial larger portfolio title font size
            portfolioTitle.classList.remove('text-sm', 'sm:text-base');
            portfolioTitle.classList.add('text-base', 'sm:text-lg');
        }
    };

    // Function to update the project count dynamically
    const updateProjectCount = () => {
        if (projectCountDisplay) {
            const totalProjects = document.querySelectorAll('#section_projects [id$="-box"]').length;
            projectCountDisplay.textContent = `${totalProjects}+`;
        }
    };

    // Helper to format date to "Month Year"
    const formatDateToMonthYear = (date) => {
        const options = {
            year: 'numeric',
            month: 'long'
        };
        return date.toLocaleDateString('en-US', options);
    };

    // Helper to calculate months difference
    const getMonthsDifference = (d1, d2) => {
        let months = (d2.getFullYear() - d1.getFullYear()) * 12;
        months -= d1.getMonth();
        months += d2.getMonth();
        if (d2.getDate() < d1.getDate()) {
            months--;
        }
        return Math.max(0, months);
    };

    // Function to calculate and update experience duration for ALL entries
    const updateAllExperienceDurationsAndSummaries = () => {
        let totalOverallMonths = 0;
        const currentDate = new Date();

        experienceDurationElements.forEach(element => {
            const startDateString = element.dataset.startDate;
            const endDateString = element.dataset.endDate;

            const startDate = new Date(startDateString);
            let endDate = endDateString ? new Date(endDateString) : currentDate;
            let displayEndDateString = endDateString ? formatDateToMonthYear(endDate) : 'Present';

            const monthsDiff = getMonthsDifference(startDate, endDate);
            totalOverallMonths += monthsDiff;

            const startMonthYear = formatDateToMonthYear(startDate);
            let durationText = "";

            if (endDateString) {
                durationText = `${startMonthYear} - ${displayEndDateString} (${monthsDiff} Months)`;
            } else {
                durationText = `${startMonthYear} - ${displayEndDateString} (approx. ${monthsDiff} Months)`;
            }
            
            const durationPlaceholder = element.querySelector('.duration-placeholder');
            if (durationPlaceholder) {
                durationPlaceholder.textContent = durationText;
            } else {
                element.textContent = durationText; // Fallback
            }
        });

        if (yearsExperienceDisplay) {
            const yearsDecimal = (totalOverallMonths / 12).toFixed(1);
            yearsExperienceDisplay.textContent = `${yearsDecimal}+`;
        }
    };


    // --- Mobile Menu Toggle ---
    mobileMenuButton.addEventListener('click', () => {
        const headerHeight = mainHeader.offsetHeight; // Get current header height
        mobileMenu.style.top = `${headerHeight}px`; // Set mobile menu to start below the header
        mobileMenu.style.height = `calc(100vh - ${headerHeight}px)`; // Adjust height to fill remaining viewport

        mobileMenu.classList.remove('translate-x-full');
        mobileMenu.classList.add('translate-x-0');
        document.body.style.overflow = 'hidden';
        mobileMenuButton.classList.add('hidden'); // Hide the hamburger button
    });

    closeMobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.remove('translate-x-0');
        mobileMenu.classList.add('translate-x-full');
        document.body.style.overflow = '';
        mobileMenuButton.classList.remove('hidden'); // Show the hamburger button
        // Optional: Reset top and height after the menu slides out to clean up styles.
        setTimeout(() => {
            mobileMenu.style.top = ''; 
            mobileMenu.style.height = '';
        }, 300); 
    });

    // Close mobile menu and update active link when a navigation link is clicked
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', (event) => {
            mobileMenu.classList.remove('translate-x-0');
            mobileMenu.classList.add('translate-x-full');
            document.body.style.overflow = '';
            mobileMenuButton.classList.remove('hidden'); // Show the hamburger button
            // Optional: Reset top and height after the menu slides out.
            setTimeout(() => {
                mobileMenu.style.top = ''; 
                mobileMenu.style.height = '';
            }, 300);
            const targetId = link.getAttribute('href').substring(1);
            setTimeout(() => setActiveNavLink(targetId), 300);
        });
    });

    // For desktop navigation links (update active state on click)
    document.querySelectorAll('#desktop-nav ul li a').forEach(link => {
        link.addEventListener('click', (event) => {
            const targetId = link.getAttribute('href').substring(1);
            setTimeout(() => setActiveNavLink(targetId), 300);
        });
    });

    // --- Project "Show More/Less" functionality ---
    const toggleDescription = (button, descriptionElement, expand) => {
        if (expand) {
            descriptionElement.classList.add('expanded');
            button.textContent = 'Show Less';
        } else {
            descriptionElement.classList.remove('expanded');
            button.textContent = 'Show More';
        }
        // Recalculate active nav link after content change
        setTimeout(updateActiveLinkOnScroll, 300);
    };

    document.querySelectorAll('.show-more-btn').forEach(button => {
        button.addEventListener('click', () => {
            const targetId = button.dataset.target;
            const descriptionElement = document.getElementById(targetId);
            const isExpanded = descriptionElement.classList.contains('expanded');
            toggleDescription(button, descriptionElement, !isExpanded);
        });
    });

    // --- Scroll-triggered Animations (Intersection Observer) ---
    const animatedElements = document.querySelectorAll('.scroll-animate');

    const observerOptions = {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.1 // 10% of the element must be visible
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Apply data-animation-delay if present
                const delay = entry.target.dataset.animationDelay;
                if (delay) {
                    entry.target.style.transitionDelay = delay;
                }
                entry.target.classList.add('is-visible');
                // We keep observing so that elements can animate in again if they scroll out and back in
                // If you want it to animate only once, uncomment: observer.unobserve(entry.target);
            } else {
                // Optional: reset animation state when element scrolls out of view
                // This makes the animation replay if the user scrolls it back into view
                entry.target.classList.remove('is-visible');
                entry.target.style.transitionDelay = ''; // Clear delay
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    animatedElements.forEach(element => {
        // Clear any previous transitionDelay for elements that might be re-observed or for initial state
        element.style.transitionDelay = ''; 
        observer.observe(element);
    });

    // Initial calls on load
    handleScrollNavStyling(); // Call initially to set correct state
    updateActiveLinkOnScroll();
    updateProjectCount();
    updateAllExperienceDurationsAndSummaries();

    // Add scroll event listeners with debounce for performance
    window.addEventListener('scroll', debounce(() => {
        handleScrollNavStyling();
        updateActiveLinkOnScroll();
    }, 50));

    // Update experience duration once every 24 hours (daily check)
    setInterval(updateAllExperienceDurationsAndSummaries, 1000 * 60 * 60 * 24);
});
