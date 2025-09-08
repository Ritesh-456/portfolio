// --- START OF FILE Script.js ---

document.addEventListener('DOMContentLoaded', () => {
    // ... existing variable declarations ...
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const closeMobileMenuButton = document.getElementById('close-mobile-menu');
    const mobileMenu = document.getElementById('mobile-menu');
    const desktopNav = document.getElementById('desktop-nav');
    const mainHeader = document.getElementById('mainHeader');
    const portfolioTitle = document.getElementById('portfolioTitle');
    const navLinks = document.querySelectorAll('#desktop-nav ul li a');
    const sections = document.querySelectorAll('main section[id], footer[id]');
    const projectCountDisplay = document.getElementById('project-count-display');
    const yearsExperienceDisplay = document.getElementById('years-experience-display');
    const experienceDurationElements = document.querySelectorAll('.experience-duration-display');

    // NEW: Get references to the contact form and submit button
    const contactForm = document.querySelector('#section6 form');
    const contactSubmitButton = document.getElementById('contact-submit-button');

    // NEW: Get references to the form input fields
    const contactNameInput = contactForm.querySelector('input[name="name"]');
    const contactEmailInput = contactForm.querySelector('input[name="email"]');
    const contactMessageTextarea = contactForm.querySelector('textarea[name="message"]');


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

        if (window.scrollY < sections[0].offsetTop - headerHeight - 100) {
            currentActiveSectionId = ''; // Represents the "Home" section
        } else {
            for (let i = sections.length - 1; i >= 0; i--) {
                const section = sections[i];
                if (!section.id) continue;

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
    // Font sizes are now fixed in HTML for nav links and portfolio title
    const handleScrollNavStyling = () => {
        if (window.scrollY > 50) {
            // Reintroduced: Centering nav links on scroll
            desktopNav.classList.remove('md:justify-end');
            desktopNav.classList.add('md:justify-center');

            // Shrink header padding on scroll
            mainHeader.classList.remove('py-3', 'sm:py-4');
            mainHeader.classList.add('py-2', 'sm:py-3');

            // Removed font size changes for navLinks and portfolioTitle
            // They are now set directly in HTML to text-xs
        } else {
            // Reintroduced: Right-aligning nav links when not scrolled
            desktopNav.classList.remove('md:justify-center');
            desktopNav.classList.add('md:justify-end');

            // Restore initial larger header padding
            mainHeader.classList.remove('py-2', 'sm:py-3');
            mainHeader.classList.add('py-3', 'sm:py-4');

            // Removed font size changes for navLinks and portfolioTitle
            // They are now set directly in HTML to text-xs
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
        const headerHeight = mainHeader.offsetHeight;
        mobileMenu.style.top = `${headerHeight}px`;
        mobileMenu.style.height = `calc(100vh - ${headerHeight}px)`;

        mobileMenu.classList.remove('translate-x-full');
        mobileMenu.classList.add('translate-x-0');
        document.body.style.overflow = 'hidden';
        mobileMenuButton.classList.add('hidden');
    });

    closeMobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.remove('translate-x-0');
        mobileMenu.classList.add('translate-x-full');
        document.body.style.overflow = '';
        mobileMenuButton.classList.remove('hidden');
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
            mobileMenuButton.classList.remove('hidden');
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
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.dataset.animationDelay;
                if (delay) {
                    entry.target.style.transitionDelay = delay;
                }
                entry.target.classList.add('is-visible');
            } else {
                entry.target.classList.remove('is-visible');
                entry.target.style.transitionDelay = '';
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    animatedElements.forEach(element => {
        element.style.transitionDelay = '';
        observer.observe(element);
    });

    // --- NEW: Download Resume on Contact Form Submit & Clear Form ---
    if (contactSubmitButton && contactForm) {
        contactSubmitButton.addEventListener('click', (event) => {
            // Check if the browser's native form validation passes
            if (contactForm.checkValidity()) {
                const resumeUrl = './assets/Ritesh_Brahmachari_Resume.pdf'; // <<< ADJUST THIS PATH TO YOUR RESUME PDF
                const a = document.createElement('a');
                a.href = resumeUrl;
                a.download = 'Ritesh_Brahmachari_Resume.pdf'; // <<< THIS IS THE FILENAME FOR THE DOWNLOADED FILE
                document.body.appendChild(a); // Append to body to make it programmatically clickable
                a.click(); // Programmatically click the link to trigger download
                document.body.removeChild(a); // Clean up the temporary link

                // Clear form fields after successful submission and download trigger
                if (contactNameInput) contactNameInput.value = '';
                if (contactEmailInput) contactEmailInput.value = '';
                if (contactMessageTextarea) contactMessageTextarea.value = '';
            }
            // The form will still submit to Formbold due to its 'action' attribute.
            // If Formbold has its own server-side validation, it will handle that.
            // This script only triggers the download and clears the form if client-side validation passes.
        });
    }


    // Initial calls on load
    handleScrollNavStyling();
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
// --- END OF FILE Script.js ---