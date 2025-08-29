document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const closeMobileMenuButton = document.getElementById('close-mobile-menu');
    const mobileMenu = document.getElementById('mobile-menu');
    const desktopNav = document.getElementById('desktop-nav');
    const mainHeader = document.getElementById('mainHeader');
    const mainContent = document.getElementById('main-content'); // New: Get the main content area
    const navLinks = document.querySelectorAll('nav ul li a');
    const sections = document.querySelectorAll('main section[id], footer[id]');
    const projectBoxes = document.querySelectorAll('[id^="project"][id$="-box"]');
    const projectCountDisplay = document.getElementById('project-count-display');
    const yearsExperienceDisplay = document.getElementById('years-experience-display');
    const experienceDurationElements = document.querySelectorAll('.experience-duration-display');
    const contactForm = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');

    // Theme Toggle elements
    const desktopThemeToggle = document.getElementById("desktop-theme-toggle");
    const desktopSunIcon = document.getElementById("desktop-sun-icon");
    const desktopMoonIcon = document.getElementById("desktop-moon-icon");

    const mobileThemeToggle = document.getElementById("mobile-theme-toggle");
    const mobileSunIcon = document.getElementById("mobile-sun-icon");
    const mobileMoonIcon = document.getElementById("mobile-moon-icon");

    // =======================
    // Dark Mode Logic
    // =======================
    function applyTheme(theme) {
        if (theme === "dark") {
            document.documentElement.classList.add("dark");
            // Update desktop icons
            if (desktopSunIcon && desktopMoonIcon) {
                desktopMoonIcon.classList.add("hidden");
                desktopSunIcon.classList.remove("hidden");
            }
            // Update mobile icons
            if (mobileSunIcon && mobileMoonIcon) {
                mobileMoonIcon.classList.add("hidden");
                mobileSunIcon.classList.remove("hidden");
            }
        } else {
            document.documentElement.classList.remove("dark");
            // Update desktop icons
            if (desktopSunIcon && desktopMoonIcon) {
                desktopSunIcon.classList.add("hidden");
                desktopMoonIcon.classList.remove("hidden");
            }
            // Update mobile icons
            if (mobileSunIcon && mobileMoonIcon) {
                mobileSunIcon.classList.add("hidden");
                mobileMoonIcon.classList.remove("hidden");
            }
        }
        localStorage.setItem("theme", theme);
    }

    // Function to toggle theme
    function toggleTheme() {
        if (document.documentElement.classList.contains("dark")) {
            applyTheme("light");
        } else {
            applyTheme("dark");
        }
    }

    // Set initial theme on page load based on localStorage or system preference
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
        applyTheme(savedTheme);
    } else if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
        applyTheme("dark");
    } else {
        applyTheme("light");
    }

    // Event listeners for both theme toggle buttons
    if (desktopThemeToggle) {
        desktopThemeToggle.addEventListener("click", toggleTheme);
    }
    if (mobileThemeToggle) {
        mobileThemeToggle.addEventListener("click", toggleTheme);
    }

    // =======================
    // Mobile Menu Toggle
    // =======================
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.remove('translate-x-full');
            mobileMenu.classList.add('translate-x-0');
            document.body.style.overflow = 'hidden';
        });
    }

    if (closeMobileMenuButton && mobileMenu) {
        closeMobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.remove('translate-x-0');
            mobileMenu.classList.add('translate-x-full');
            document.body.style.overflow = '';
        });
    }

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

    // =======================
    // Scroll Animations (AOS)
    // =======================
    AOS.init({
        duration: 800,
        once: true,
    });

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
            link.classList.remove('scale-110', 'font-bold', 'text-teal-600', 'dark:text-teal-400');
            link.classList.add('text-gray-700', 'dark:text-gray-300');
        });

        let activeLink = null;
        if (currentSectionId === "") {
            activeLink = document.querySelector('#desktop-nav ul li a[href="#"]');
        } else {
            activeLink = document.querySelector(`#desktop-nav ul li a[href="#${currentSectionId}"]`);
        }

        if (activeLink) {
            activeLink.classList.add('scale-110', 'font-bold', 'text-teal-600', 'dark:text-teal-400');
            activeLink.classList.remove('text-gray-700', 'dark:text-gray-300');
        }
    }

    // Function to update the active link based on scroll position
    const updateActiveLinkOnScroll = () => {
        const headerHeight = mainHeader.offsetHeight;
        let currentActiveSectionId = '';

        // Adjusted logic for Home section (section before the first explicit section ID)
        // If scrolled past the first section, or if the first section is the first element with an ID
        // we check from the bottom up. Otherwise, default to home.
        if (sections.length > 0 && window.scrollY < sections[0].offsetTop - headerHeight) {
            currentActiveSectionId = ''; // Corresponds to the "Home" link
        } else {
            for (let i = sections.length - 1; i >= 0; i--) {
                const section = sections[i];
                // Adjust buffer to be slightly less than header height for a smoother transition
                const sectionTop = section.offsetTop - headerHeight - 1; // Small buffer like 1px

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
            element.textContent = durationText;
        });

        if (yearsExperienceDisplay) {
            const yearsDecimal = (totalOverallMonths / 12).toFixed(1);
            yearsExperienceDisplay.textContent = `${yearsDecimal}+`;
        }
    };


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

            if (descriptionElement && showMoreBtn && descriptionElement.classList.contains('expanded')) {
                collapseTimeout = setTimeout(() => {
                    toggleDescription(showMoreBtn, descriptionElement, false);
                }, 500);
            }
        });
    });

    // --- Contact Form Submission ---
    if (contactForm) {
        contactForm.addEventListener('submit', async (event) => {
            event.preventDefault();

            const formData = new FormData(contactForm);
            const object = {};
            formData.forEach((value, key) => {
                object[key] = value;
            });
            const json = JSON.stringify(object);

            formMessage.textContent = 'Sending...';
            formMessage.classList.remove('text-green-600', 'text-red-600');
            formMessage.classList.add('text-gray-700', 'dark:text-gray-300');

            try {
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: json
                });

                if (response.ok) {
                    formMessage.textContent = 'Message sent successfully!';
                    formMessage.classList.remove('text-red-600', 'dark:text-gray-300');
                    formMessage.classList.add('text-green-600');
                    contactForm.reset();
                } else {
                    const errorData = await response.json();
                    formMessage.textContent = `Error: ${errorData.errors ? errorData.errors.map(e => e.message).join(', ') : 'Something went wrong.'}`;
                    formMessage.classList.remove('text-green-600', 'dark:text-gray-300');
                    formMessage.classList.add('text-red-600');
                }
            } catch (error) {
                console.error('Submission error:', error);
                formMessage.textContent = 'Network error. Please try again.';
                formMessage.classList.remove('text-green-600', 'dark:text-gray-300');
                formMessage.classList.add('text-red-600');
            }
        });
    }

    // Function to dynamically adjust margin-top of main content
    const adjustMainContentPadding = () => {
        if (mainHeader && mainContent) {
            mainContent.style.marginTop = mainHeader.offsetHeight + 'px';
        }
    };

    // Initial calls on load
    adjustMainContentPadding(); // Call this immediately on load
    handleScrollNavStyling();
    updateActiveLinkOnScroll();
    updateProjectCount();
    updateAllExperienceDurationsAndSummaries();

    // Add event listeners for performance
    window.addEventListener('scroll', debounce(() => {
        handleScrollNavStyling();
        updateActiveLinkOnScroll();
    }, 50));
    window.addEventListener('resize', debounce(adjustMainContentPadding, 100)); // Adjust padding on resize

    // Optional: Update experience duration periodically to keep it perfectly accurate
    setInterval(updateAllExperienceDurationsAndSummaries, 1000 * 60 * 60 * 24);
});