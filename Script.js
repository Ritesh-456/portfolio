document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const closeMobileMenuButton = document.getElementById('close-mobile-menu');
    const mobileMenu = document.getElementById('mobile-menu');
    const desktopNav = document.getElementById('desktop-nav');
    const mainHeader = document.getElementById('mainHeader');
    const navLinks = document.querySelectorAll('nav ul li a');
    const sections = document.querySelectorAll('main section[id], footer[id]');
    const projectBoxes = document.querySelectorAll('[id^="project"][id$="-box"]');
    const projectCountDisplay = document.getElementById('project-count-display');
    const yearsExperienceDisplay = document.getElementById('years-experience-display');
    const experienceDurationElements = document.querySelectorAll('.experience-duration-display'); // Select all elements with this class

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
            link.classList.remove('scale-110', 'font-bold', 'text-teal-600');
            link.classList.add('text-gray-700');
        });

        let activeLink = null;
        if (currentSectionId === "") {
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
            currentActiveSectionId = '';
        } else {
            for (let i = sections.length - 1; i >= 0; i--) {
                const section = sections[i];
                const sectionTop = section.offsetTop - headerHeight - 100;

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
        if (window.scrollY > 50) {
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

    // Function to update the project count dynamically
    const updateProjectCount = () => {
        if (projectCountDisplay) {
            const totalProjects = document.querySelectorAll('#section_projects [id$="-box"]').length;
            projectCountDisplay.textContent = `${totalProjects}+`;
        }
    };

    // Helper to format date to "Month Year"
    const formatDateToMonthYear = (date) => {
        const options = { year: 'numeric', month: 'long' };
        return date.toLocaleDateString('en-US', options);
    };

    // Helper to calculate months difference
    const getMonthsDifference = (d1, d2) => {
        let months = (d2.getFullYear() - d1.getFullYear()) * 12;
        months -= d1.getMonth();
        months += d2.getMonth();
        // If end day is before start day in the last month, decrement month count
        if (d2.getDate() < d1.getDate()) {
            months--;
        }
        return Math.max(0, months); // Ensure it's not negative
    };


    // Function to calculate and update experience duration for ALL entries
    const updateAllExperienceDurationsAndSummaries = () => {
        let totalOverallMonths = 0;
        const currentDate = new Date();

        experienceDurationElements.forEach(element => {
            const startDateString = element.dataset.startDate;
            const endDateString = element.dataset.endDate; // Optional end date

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
            element.textContent = durationText;
        });

        // Update overall years experience in About Me section
        if (yearsExperienceDisplay) {
            const yearsDecimal = (totalOverallMonths / 12).toFixed(1);
            yearsExperienceDisplay.textContent = `${yearsDecimal}+`;
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
        link.addEventListener('click', (event) => {
            mobileMenu.classList.remove('translate-x-0');
            mobileMenu.classList.add('translate-x-full');
            document.body.style.overflow = '';
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

    // --- Auto-close on mouse leave for project descriptions ---
    projectBoxes.forEach(box => {
        let collapseTimeout;

        box.addEventListener('mouseenter', () => {
            clearTimeout(collapseTimeout);
        });

        box.addEventListener('mouseleave', () => {
            const descriptionElement = box.querySelector('.project-description');
            const showMoreBtn = box.querySelector('.show-more-btn');

            if (descriptionElement && descriptionElement.classList.contains('expanded')) {
                collapseTimeout = setTimeout(() => {
                    toggleDescription(showMoreBtn, descriptionElement, false);
                }, 500);
            }
        });
    });

    // Initial calls on load
    handleScrollNavStyling();
    updateActiveLinkOnScroll();
    updateProjectCount();
    updateAllExperienceDurationsAndSummaries(); // Call the new comprehensive update function

    // Add scroll event listeners with debounce for performance
    window.addEventListener('scroll', debounce(() => {
        handleScrollNavStyling();
        updateActiveLinkOnScroll();
    }, 50));

    // Optional: Update experience duration periodically to keep it perfectly accurate
    setInterval(updateAllExperienceDurationsAndSummaries, 1000 * 60 * 60 * 24); // Every 24 hours
});