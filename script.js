/**
 * FutureNav - Main JavaScript
 * script.js - Interactive functionality for the futuristic navigation experience
 * March 24, 2025
 */

document.addEventListener("DOMContentLoaded", () => {
    // DOM Elements
    const navbar = document.getElementById("navbar");
    const mobileMenuButton = document.getElementById("mobile-menu-button");
    const mobileMenu = document.getElementById("mobile-menu");
    const navLinks = document.querySelectorAll(".nav-link");
    const mobileNavLinks = document.querySelectorAll(".mobile-nav-link");
    const sections = document.querySelectorAll("section");

    // Mobile Menu Toggle
    mobileMenuButton.addEventListener("click", () => {
        mobileMenuButton.classList.toggle("active");
        mobileMenu.classList.toggle("h-0");
        mobileMenu.classList.toggle("h-auto"); // Simplified toggle
    });

    // Close mobile menu when a link is clicked
    const closeMobileMenu = () => {
        mobileMenuButton.classList.remove("active");
        mobileMenu.classList.add("h-0");
        mobileMenu.classList.remove("h-auto");
    };

    mobileNavLinks.forEach(link => {
        link.addEventListener("click", closeMobileMenu);
    });

    // Navbar scroll effect
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
        highlightCurrentSection();
    });

    // Smooth scroll for nav links (handled by CSS 'scroll-behavior: smooth')
    // Added click handling for highlights
    const allLinks = [...navLinks, ...mobileNavLinks];
    allLinks.forEach((link) => {
        link.addEventListener("click", (e) => {
            const targetId = link.getAttribute("href");
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                // Highlight the section briefly
                targetSection.classList.add("section-highlight");
                setTimeout(() => {
                    targetSection.classList.remove("section-highlight");
                }, 1000);
            }
        });
    });

    // Highlight active section in navbar
    function highlightCurrentSection() {
        let current = "";

        sections.forEach((section) => {
            const sectionTop = section.offsetTop - 100; // Adjusted offset for better accuracy
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute("id");
            }
        });

        navLinks.forEach((link) => {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${current}`) {
                link.classList.add("active");
            }
        });

        mobileNavLinks.forEach((link) => {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${current}`) {
                link.classList.add("active");
            }
        });
    }

    // Scroll animations for sections
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("section-visible");
                }
            });
        }, {
            threshold: 0.1
        }
    );

    sections.forEach((section) => {
        section.classList.add("section-hidden");
        observer.observe(section);
    });

    // Initialize active section on page load
    highlightCurrentSection();

    // Make header text visible with animation
    setTimeout(() => {
        const headerText = document.querySelector(".text-6xl");
        if (headerText) {
            headerText.style.opacity = 1;
            headerText.style.transform = "translateY(0)";
        }
    }, 300);
});