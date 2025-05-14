// WOODBRAIN Interiors Website JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initMobileMenu();
    initStickyHeader();
    initHeroSlider();
    initPortfolioFilter();
    initTestimonialSlider();
    initScrollAnimations();
    initContactForm();

    // Initialize lightbox gallery if on portfolio page
    if (document.querySelector('.portfolio-grid')) {
        initLightboxGallery();
    }

    // Initialize skewed scroll if on portfolio page
    if (document.querySelector('.skw-pages')) {
        initSkewedScroll();
    }

    // Initialize diagonal slideshow if on portfolio page
    if (document.querySelector('.slideshow')) {
        initDiagonalSlideshow();
    }
});

// Mobile Menu Toggle
function initMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('nav ul');

    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            navMenu.classList.toggle('active');

            // Toggle hamburger to X
            const spans = this.querySelectorAll('span');
            if (navMenu.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });

        // Close menu when clicking a link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');

                // Reset hamburger icon
                const spans = mobileMenuBtn.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            });
        });
    }
}

// Sticky Header on Scroll
function initStickyHeader() {
    const header = document.querySelector('header');
    const logo = document.querySelector('.logo img');

    if (header && logo) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                header.style.padding = '10px 0';
                logo.style.height = '70px'; // Smaller size when scrolled
            } else {
                header.style.padding = '15px 0';
                logo.style.height = '80px'; // Default size
            }
        });
    }
}

// Simple Hero Slider
function initHeroSlider() {
    console.log("Initializing simple slider");

    // Get all necessary elements
    const slider = document.getElementById('simpleSlider');
    if (!slider) {
        console.error("Slider element not found");
        return;
    }

    const slides = document.querySelectorAll('.simple-slide');
    const dots = document.querySelectorAll('.simple-dot');
    const prevBtn = document.getElementById('simplePrev');
    const nextBtn = document.getElementById('simpleNext');

    console.log("Found elements:", {
        slides: slides.length,
        dots: dots.length,
        prevBtn: !!prevBtn,
        nextBtn: !!nextBtn
    });

    // Initialize variables
    let currentIndex = 0;
    let isAnimating = false;
    let slideInterval;
    const slideDelay = 3500; // 3.5 seconds between slides

    // Function to show a specific slide
    function goToSlide(index) {
        if (isAnimating) return;
        isAnimating = true;

        console.log("Going to slide", index);

        // Remove active class from all slides and dots
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        // Add active class to current slide and dot
        slides[index].classList.add('active');
        dots[index].classList.add('active');

        // Update current index
        currentIndex = index;

        // Reset animation flag after transition completes
        setTimeout(() => {
            isAnimating = false;
        }, 1000); // Match this to the CSS transition time
    }

    // Function to go to next slide
    function nextSlide() {
        let nextIndex = currentIndex + 1;
        if (nextIndex >= slides.length) {
            nextIndex = 0;
        }
        goToSlide(nextIndex);
    }

    // Function to go to previous slide
    function prevSlide() {
        let prevIndex = currentIndex - 1;
        if (prevIndex < 0) {
            prevIndex = slides.length - 1;
        }
        goToSlide(prevIndex);
    }

    // Function to start auto-sliding
    function startAutoSlide() {
        slideInterval = setInterval(nextSlide, slideDelay);
    }

    // Function to stop auto-sliding
    function stopAutoSlide() {
        clearInterval(slideInterval);
    }

    // Add event listeners to dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            goToSlide(index);
            stopAutoSlide();
            startAutoSlide();
        });
    });

    // Add event listeners to prev/next buttons
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            prevSlide();
            stopAutoSlide();
            startAutoSlide();
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            nextSlide();
            stopAutoSlide();
            startAutoSlide();
        });
    }

    // Pause auto-sliding when hovering over the slider
    slider.addEventListener('mouseenter', stopAutoSlide);
    slider.addEventListener('mouseleave', startAutoSlide);

    // Start auto-sliding
    startAutoSlide();

    // Make sure the first slide is visible
    goToSlide(0);

    // Add keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            prevSlide();
            stopAutoSlide();
            startAutoSlide();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
            stopAutoSlide();
            startAutoSlide();
        }
    });

    console.log("Simple slider initialized");
}

// Portfolio Filter
function initPortfolioFilter() {
    const filterButtons = document.querySelectorAll('.toggle-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    if (filterButtons.length && portfolioItems.length) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));

                // Add active class to clicked button
                this.classList.add('active');

                // Get filter value
                const filterValue = this.getAttribute('data-filter');

                // Filter portfolio items
                portfolioItems.forEach(item => {
                    if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                        item.style.display = 'block';

                        // Add animation
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1)';
                        }, 100);
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'scale(0.8)';

                        // Hide after animation
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }
}

// Testimonial Slider
function initTestimonialSlider() {
    const testimonials = document.querySelectorAll('.testimonial');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.control-btn.prev');
    const nextBtn = document.querySelector('.control-btn.next');

    if (testimonials.length && dots.length && prevBtn && nextBtn) {
        let currentIndex = 0;

        // Hide all testimonials except the first one
        testimonials.forEach((testimonial, index) => {
            if (index !== 0) {
                testimonial.style.display = 'none';
            }
        });

        // Function to show testimonial by index
        function showTestimonial(index) {
            // Hide all testimonials
            testimonials.forEach(testimonial => {
                testimonial.style.display = 'none';
            });

            // Remove active class from all dots
            dots.forEach(dot => {
                dot.classList.remove('active');
            });

            // Show testimonial at index
            testimonials[index].style.display = 'block';

            // Add active class to dot at index
            dots[index].classList.add('active');

            // Update current index
            currentIndex = index;
        }

        // Event listeners for dots
        dots.forEach((dot, index) => {
            dot.addEventListener('click', function() {
                showTestimonial(index);
            });
        });

        // Event listener for prev button
        prevBtn.addEventListener('click', function() {
            let newIndex = currentIndex - 1;
            if (newIndex < 0) {
                newIndex = testimonials.length - 1;
            }
            showTestimonial(newIndex);
        });

        // Event listener for next button
        nextBtn.addEventListener('click', function() {
            let newIndex = currentIndex + 1;
            if (newIndex >= testimonials.length) {
                newIndex = 0;
            }
            showTestimonial(newIndex);
        });

        // Auto slide every 3.5 seconds
        setInterval(function() {
            let newIndex = currentIndex + 1;
            if (newIndex >= testimonials.length) {
                newIndex = 0;
            }
            showTestimonial(newIndex);
        }, 3500);
    }
}

// Scroll Animations
function initScrollAnimations() {
    // Get all elements that need animation
    const animatedElements = document.querySelectorAll('.about-left, .about-right, .service-card, .portfolio-item, .timeline-item');

    // Function to check if element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
            rect.bottom >= 0
        );
    }

    // Function to add animation class when element is in viewport
    function checkAnimations() {
        animatedElements.forEach(element => {
            if (isInViewport(element) && !element.classList.contains('animated')) {
                element.classList.add('animated');
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }

    // Set initial state for animated elements
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });

    // Check animations on scroll
    window.addEventListener('scroll', checkAnimations);

    // Check animations on page load
    checkAnimations();
}

// Contact Form Validation and Submission
function initContactForm() {
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const service = document.getElementById('service').value;
            const message = document.getElementById('message').value;

            // Simple validation
            if (!name || !email || !message) {
                alert('Please fill in all required fields.');
                return;
            }

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }

            // Simulate form submission
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            submitBtn.innerHTML = 'Sending...';
            submitBtn.disabled = true;

            // Simulate API call with timeout
            setTimeout(function() {
                // Reset form
                contactForm.reset();

                // Show success message
                alert('Thank you for your message! We will get back to you soon.');

                // Reset button
                submitBtn.innerHTML = 'Send Message';
                submitBtn.disabled = false;
            }, 1500);
        });
    }
}

// Back to top functionality
document.querySelector('.back-to-top').addEventListener('click', function(e) {
    e.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Lightbox Gallery for Portfolio Page
function initLightboxGallery() {
    // Create lightbox elements and append to body
    document.body.insertAdjacentHTML('beforeend', `
        <div class="lightbox">
            <div class="lightbox-content">
                <img src="" alt="" class="lightbox-img">
                <div class="lightbox-caption"></div>
            </div>
            <div class="lightbox-prev"><i class="fas fa-chevron-left"></i></div>
            <div class="lightbox-next"><i class="fas fa-chevron-right"></i></div>
            <div class="lightbox-close"><i class="fas fa-times"></i></div>
        </div>
    `);

    // Get DOM elements
    const lightbox = document.querySelector('.lightbox');
    const lightboxImg = document.querySelector('.lightbox-img');
    const lightboxCaption = document.querySelector('.lightbox-caption');
    const lightboxClose = document.querySelector('.lightbox-close');
    const lightboxPrev = document.querySelector('.lightbox-prev');
    const lightboxNext = document.querySelector('.lightbox-next');
    const galleryItems = document.querySelectorAll('.portfolio-item');

    // Current index
    let currentIndex = 0;

    // Function to get visible items (for filtering)
    function getVisibleItems() {
        return Array.from(galleryItems).filter(item => {
            return window.getComputedStyle(item).display !== 'none';
        });
    }

    // Function to update lightbox content
    function updateLightboxContent(index) {
        const items = getVisibleItems();
        const item = items[index];
        const img = item.querySelector('img');
        const caption = item.querySelector('.portfolio-overlay').innerHTML;

        // Fade out effect
        lightboxImg.style.opacity = '0';

        setTimeout(() => {
            // Update content
            lightboxImg.src = img.src;
            lightboxImg.alt = img.alt;
            lightboxCaption.innerHTML = caption;

            // Fade in effect
            lightboxImg.style.opacity = '1';
        }, 300);
    }

    // Open lightbox when clicking on a gallery item
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const items = getVisibleItems();
            currentIndex = items.indexOf(item);

            // Update lightbox content
            updateLightboxContent(currentIndex);

            // Show lightbox
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        });
    });

    // Close lightbox
    lightboxClose.addEventListener('click', function() {
        lightbox.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    });

    // Navigate to previous image
    lightboxPrev.addEventListener('click', function(e) {
        e.stopPropagation(); // Prevent event bubbling

        const items = getVisibleItems();
        currentIndex = (currentIndex - 1 + items.length) % items.length;
        updateLightboxContent(currentIndex);
    });

    // Navigate to next image
    lightboxNext.addEventListener('click', function(e) {
        e.stopPropagation(); // Prevent event bubbling

        const items = getVisibleItems();
        currentIndex = (currentIndex + 1) % items.length;
        updateLightboxContent(currentIndex);
    });

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (!lightbox.classList.contains('active')) return;

        if (e.key === 'Escape') {
            lightboxClose.click();
        } else if (e.key === 'ArrowLeft') {
            lightboxPrev.click();
        } else if (e.key === 'ArrowRight') {
            lightboxNext.click();
        }
    });

    // Prevent lightbox from closing when clicking on content
    lightbox.querySelector('.lightbox-content').addEventListener('click', function(e) {
        e.stopPropagation();
    });

    // Prevent navigation from closing lightbox
    lightboxPrev.addEventListener('click', function(e) {
        e.stopPropagation();
    });

    lightboxNext.addEventListener('click', function(e) {
        e.stopPropagation();
    });

    // Close lightbox when clicking on the background
    lightbox.addEventListener('click', function() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    });
}

// Skewed One Page Scroll for Portfolio Page
function initSkewedScroll() {
    var curPage = 1;
    var numOfPages = document.querySelectorAll(".skw-page").length;
    var animTime = 1000;
    var scrolling = false;
    var pgPrefix = ".skw-page-";
    var autoSlideTimer;
    var autoSlideDelay = 3500; // 3.5 seconds between auto slides

    function pagination() {
        scrolling = true;

        // Update page classes
        document.querySelector(pgPrefix + curPage).classList.remove("inactive");
        document.querySelector(pgPrefix + curPage).classList.add("active");

        if (curPage > 1) {
            document.querySelector(pgPrefix + (curPage - 1)).classList.add("inactive");
        }

        if (curPage < numOfPages) {
            document.querySelector(pgPrefix + (curPage + 1)).classList.remove("active");
        }

        // Update navigation indicators if they exist
        if (document.querySelector(".skw-nav-dots")) {
            document.querySelectorAll(".skw-nav-dot").forEach(dot => {
                dot.classList.remove("active");
            });
            document.querySelector(".skw-nav-dot[data-page='" + curPage + "']").classList.add("active");
        }

        // Reset auto slide timer
        resetAutoSlideTimer();

        setTimeout(function() {
            scrolling = false;
        }, animTime);
    }

    function navigateUp() {
        if (curPage === 1) return;
        curPage--;
        pagination();
    }

    function navigateDown() {
        if (curPage === numOfPages) return;
        curPage++;
        pagination();
    }

    function navigateToPage(pageNum) {
        if (pageNum < 1 || pageNum > numOfPages || pageNum === curPage) return;
        curPage = pageNum;
        pagination();
    }

    function resetAutoSlideTimer() {
        clearTimeout(autoSlideTimer);
        autoSlideTimer = setTimeout(function() {
            if (curPage < numOfPages) {
                navigateDown();
            } else {
                curPage = 0;
                navigateDown();
            }
        }, autoSlideDelay);
    }

    // Mouse wheel event
    document.addEventListener("wheel", function(e) {
        if (scrolling) return;
        if (e.deltaY < 0) {
            navigateUp();
        } else {
            navigateDown();
        }
    });

    // Keyboard navigation
    document.addEventListener("keydown", function(e) {
        if (scrolling) return;
        if (e.key === "ArrowUp" || e.key === "PageUp") {
            navigateUp();
        } else if (e.key === "ArrowDown" || e.key === "PageDown") {
            navigateDown();
        }
    });

    // Add touch swipe support for mobile
    var touchStartY = 0;
    var touchEndY = 0;

    document.addEventListener('touchstart', function(e) {
        touchStartY = e.touches[0].clientY;
    }, false);

    document.addEventListener('touchmove', function(e) {
        touchEndY = e.touches[0].clientY;
    }, false);

    document.addEventListener('touchend', function() {
        if (scrolling) return;

        var diff = touchStartY - touchEndY;
        if (diff > 50) { // Swipe up
            navigateDown();
        } else if (diff < -50) { // Swipe down
            navigateUp();
        }
    }, false);

    // Create navigation dots
    function createNavDots() {
        var dotsHtml = '<div class="skw-nav-dots">';
        for (var i = 1; i <= numOfPages; i++) {
            var activeClass = (i === 1) ? ' active' : '';
            dotsHtml += '<span class="skw-nav-dot' + activeClass + '" data-page="' + i + '"></span>';
        }
        dotsHtml += '</div>';

        document.body.insertAdjacentHTML('beforeend', dotsHtml);

        // Add click event to dots
        document.querySelectorAll('.skw-nav-dot').forEach(dot => {
            dot.addEventListener('click', function() {
                var pageNum = parseInt(this.getAttribute('data-page'));
                navigateToPage(pageNum);
            });
        });
    }

    // Initialize
    createNavDots();

    // Make sure first slide is active
    document.querySelector('.skw-page-1').classList.add('active');
    document.querySelector('.skw-page-1').classList.remove('inactive');

    // Start pagination and auto-slide immediately
    pagination();
    resetAutoSlideTimer();

    // Force first auto-slide to happen even if user doesn't interact
    setTimeout(function() {
        if (curPage === 1) {
            navigateDown();
        }
    }, autoSlideDelay);

    // Pause auto slide on hover
    document.querySelector('.skw-pages').addEventListener('mouseenter', function() {
        clearTimeout(autoSlideTimer);
    });

    document.querySelector('.skw-pages').addEventListener('mouseleave', function() {
        resetAutoSlideTimer();
    });
}

// Diagonal Slideshow for Portfolio Page
function initDiagonalSlideshow() {
    // Initialize variables
    let currentSlide = 0;
    const slides = document.querySelectorAll('.slide');
    const slidesTotal = slides.length;
    const nav = {
        next: document.querySelector('.nav--next'),
        prev: document.querySelector('.nav--prev')
    };
    let isAnimating = false;
    let slideInterval;

    // Initialize the slideshow
    function init() {
        // Set initial slide
        slides[currentSlide].classList.add('slide--current');

        // Create the slide image wrap and image elements
        createSlideImgElements();

        // Initialize events
        initEvents();

        // Add loaded class to body
        document.body.classList.add('loaded');

        // Start auto slide
        startAutoSlide();
    }

    // Create slide image elements
    function createSlideImgElements() {
        slides.forEach((slide) => {
            // Check if slide already has image wrap
            if (slide.querySelector('.slide__img-wrap')) {
                return;
            }

            // Get the image source from data attribute
            const imgSrc = slide.dataset.image;

            // Create image wrap
            const imgWrap = document.createElement('div');
            imgWrap.className = 'slide__img-wrap';

            // Create image element
            const img = document.createElement('div');
            img.className = 'slide__img';
            img.style.backgroundImage = `url(${imgSrc})`;

            // Append elements
            imgWrap.appendChild(img);
            slide.appendChild(imgWrap);
        });
    }

    // Initialize events
    function initEvents() {
        // Next slide
        if (nav.next) {
            nav.next.addEventListener('click', function() {
                navigate('next');
            });
        }

        // Previous slide
        if (nav.prev) {
            nav.prev.addEventListener('click', function() {
                navigate('prev');
            });
        }

        // Keyboard navigation
        document.addEventListener('keydown', function(ev) {
            const keyCode = ev.key;
            if (keyCode === 'ArrowRight') {
                navigate('next');
            } else if (keyCode === 'ArrowLeft') {
                navigate('prev');
            }
        });

        // Pause auto slide on hover
        const slideshow = document.querySelector('.slideshow');
        if (slideshow) {
            slideshow.addEventListener('mouseenter', function() {
                clearInterval(slideInterval);
            });

            slideshow.addEventListener('mouseleave', function() {
                startAutoSlide();
            });
        }
    }

    // Start auto slide
    function startAutoSlide() {
        clearInterval(slideInterval);
        slideInterval = setInterval(function() {
            navigate('next');
        }, 3500); // 3.5 seconds
    }

    // Navigate to next/prev slide
    function navigate(direction) {
        // If animation in progress, return
        if (isAnimating) return;
        isAnimating = true;

        // Current slide
        const currentSlideEl = slides[currentSlide];

        // Update current slide index
        if (direction === 'next') {
            currentSlide = currentSlide < slidesTotal - 1 ? currentSlide + 1 : 0;
        } else {
            currentSlide = currentSlide > 0 ? currentSlide - 1 : slidesTotal - 1;
        }

        // Next slide element
        const nextSlideEl = slides[currentSlide];

        // Animation
        animateSlides(currentSlideEl, nextSlideEl);

        // Reset auto slide timer
        if (slideInterval) {
            clearInterval(slideInterval);
            startAutoSlide();
        }
    }

    // Animate slides
    function animateSlides(currentSlideEl, nextSlideEl) {
        // Remove current class from current slide
        currentSlideEl.classList.remove('slide--current');

        // Add current class to next slide
        nextSlideEl.classList.add('slide--current');

        // After animation completes
        setTimeout(() => {
            isAnimating = false;
        }, 1000);
    }

    // Check if slideshow elements exist
    if (slides.length > 0) {
        init();
    }
}