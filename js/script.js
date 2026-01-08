function applyAdoption(petName) {
    alert("Your adoption request for " + petName + " has been submitted!");
}

// Slideshow at about page
let slideIndex = 0;
const slides = document.querySelectorAll(".page-title .slide");

function showSlides() {
    if (!slides.length) {
        return;
    }
    slides.forEach(slide => slide.classList.remove("active"));
    slideIndex++;
    if (slideIndex > slides.length) { slideIndex = 1; }
    slides[slideIndex - 1].classList.add("active");
    setTimeout(showSlides, 4000); // change every 4 seconds
}

document.addEventListener("DOMContentLoaded", showSlides);

// Filter button at adopt page
document.addEventListener("DOMContentLoaded", () => {
    const filterForm = document.getElementById("filterForm");
    const petCards = document.querySelectorAll(".pet-card");

    filterForm.addEventListener("submit", function(e) {
        e.preventDefault();

        // Get filter values
        const type = document.getElementById("type").value;
        const age = document.getElementById("age").value;
        const gender = filterForm.gender.value;

        let firstVisibleCard = null;

        petCards.forEach(card => {
            card.classList.remove("highlight"); // remove previous highlight

            const matchType = !type || card.dataset.type === type;
            const matchAge = !age || card.dataset.age === age;
            const matchGender = !gender || card.dataset.gender === gender;

            if (matchType && matchAge && matchGender) {
                card.style.display = "block";
                if (!firstVisibleCard) firstVisibleCard = card;
            } else {
                card.style.display = "none";
            }
        });

        // Highlight the first visible card
        if (firstVisibleCard) {
            firstVisibleCard.classList.add("highlight");
            firstVisibleCard.scrollIntoView({ behavior: "smooth", block: "center" });
        }
    });

    // Optional: Remove highlight on reset
    filterForm.addEventListener("reset", function() {
        petCards.forEach(card => {
            card.style.display = "block";
            card.classList.remove("highlight");
        });
    });
});

// Register user
function registerUser() {
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!username || !password) {
        alert("Please fill in all fields.");
        return;
    }

    localStorage.setItem("username", username);
    localStorage.setItem("password", password);

    alert("Registration successful! You can now login.");
}

// Login user
document.getElementById("loginForm")?.addEventListener("submit", function (e) {
    e.preventDefault();

    const storedUser = localStorage.getItem("username");
    const storedPass = localStorage.getItem("password");

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (username === storedUser && password === storedPass) {
        localStorage.setItem("loggedIn", "true");
        alert("Login successful!");
        window.location.href = "index.html";
    } else {
        alert("Invalid username or password.");
    }
});

// Check login status (runs on every page)
document.addEventListener("DOMContentLoaded", function () {
    const loggedIn = localStorage.getItem("loggedIn");
    const username = localStorage.getItem("username");

    const loginLink = document.getElementById("loginLink");
    const welcomeUser = document.getElementById("welcomeUser");

    if (loggedIn === "true" && username) {
        loginLink.textContent = "Logout";
        loginLink.href = "#";

        welcomeUser.style.display = "inline";
        welcomeUser.textContent = " [ Welcome, " + username + " ]";

        loginLink.addEventListener("click", function () {
            localStorage.removeItem("loggedIn");
            alert("You have logged out.");
            window.location.href = "login.html";
        });
    }
});

// Search button at page recources
function searchResources() {
    const keyword = document.getElementById("searchInput").value.toLowerCase();
    const cards = document.querySelectorAll(".pet-card");

    cards.forEach(card => {
        const text = card.innerText.toLowerCase();
        card.style.display = text.includes(keyword) ? "block" : "none";
    });
}

// Contact page
const contactForm = document.getElementById("contactForm");
const progressBar = document.getElementById("progressBar");
const progressPercent = document.getElementById("progressPercent");

if (contactForm) {
    const inputs = contactForm.querySelectorAll("input, textarea");

    inputs.forEach(input => {
        input.addEventListener("input", () => {
            let filled = 0;

            inputs.forEach(i => {
                if (i.value.trim() !== "") filled++;
            });

            let progress = (filled / inputs.length) * 100;

            // ✅ THIS IS THE PLACE
            progressBar.style.width = progress + "%";
            progressPercent.textContent = Math.round(progress) + "%";
        });
    });

    contactForm.addEventListener("submit", function (e) {
        e.preventDefault();
        alert("Thank you for contacting us!");
        contactForm.reset();
        progressBar.style.width = "0%";
        progressPercent.textContent = "0%";
    });
}

// Reset button at contact page
const resetBtn = document.getElementById("resetBtn");

if (resetBtn) {
    resetBtn.addEventListener("click", () => {
        progressBar.style.width = "0%";
        progressPercent.textContent = "0%";
    });
}

// Collapsible pet details at adopt page
(function initPetDetails() {
    const petList = document.querySelector(".pet-list");
    if (!petList) return;

    petList.addEventListener("click", function (e) {
        // 1. Target the button
        const button = e.target.closest(".toggle-details");
        if (!button) return;

        e.preventDefault();

        // 2. Find the details div ONLY inside this specific card
        const petCard = button.closest(".pet-card");
        const petDetails = petCard.querySelector(".pet-details");

        if (petDetails) {
            // 3. Toggle the active class
            const isActive = petDetails.classList.toggle("active");

            // 4. Update button text
            button.textContent = isActive ? "Hide Details" : "View Details";
        }
    });
})();

// Simple slider for "Furry Joy Stories" on About page
(function initStorySlider() {
    const slider = document.querySelector(".story-slider");
    if (!slider) return;

    const cards = slider.querySelectorAll(".story-card");
    if (!cards.length) return;

    let current = 0;

    function showCard(index) {
        cards.forEach((card, i) => {
            card.classList.toggle("active", i === index);
        });
    }

    const prevBtn = slider.querySelector(".story-nav.prev");
    const nextBtn = slider.querySelector(".story-nav.next");

    prevBtn?.addEventListener("click", () => {
        current = (current - 1 + cards.length) % cards.length;
        showCard(current);
    });

    nextBtn?.addEventListener("click", () => {
        current = (current + 1) % cards.length;
        showCard(current);
    });

    // Initialize
    showCard(current);
})();

document.addEventListener("DOMContentLoaded", () => {
    const intro = document.querySelector(".intro-text");
    setTimeout(() => {
        intro.classList.add("visible");
    }, 500); // slight delay for smooth entrance
});

function typeText(element, text, speed = 50) {
    let index = 0;
    element.textContent = "";
    const timer = setInterval(() => {
        element.textContent += text[index];
        index++;
        if (index >= text.length) clearInterval(timer);
    }, speed);
}

document.addEventListener("DOMContentLoaded", () => {
    const intro = document.querySelector(".intro-text");
    typeText(intro, "Every abandoned and homeless pet deserves a second chance. At our shelter, love, care, and forever homes await them. Join us in creating happy endings, one paw at a time.");
});

document.querySelectorAll('.team-member').forEach(member => {
    member.addEventListener('mouseenter', () => {
        const name = member.querySelector('h4');
        name.style.color = '#8b6cff';
    });
    member.addEventListener('mouseleave', () => {
        const name = member.querySelector('h4');
        name.style.color = '#333';
    });
});

const teamContainer = document.querySelector('.team-members');
let scrollAmount = 0;

function scrollTeam(direction) {
    const containerWidth = teamContainer.clientWidth;
    if (direction === 'right') {
        scrollAmount += containerWidth / 2;
    } else {
        scrollAmount -= containerWidth / 2;
    }
    teamContainer.scrollTo({
        left: scrollAmount,
        behavior: 'smooth'
    });
}

function scrollTeam(direction) {
    const container = document.querySelector('.team-members');
    const scrollAmount = container.clientWidth / 2;

    if (direction === 'right') {
        container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    } else {
        container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    }
}

(function initStorySlider() {
    const slider = document.querySelector(".story-slider");
    if (!slider) return;

    const cards = slider.querySelectorAll(".story-card");
    if (!cards.length) return;

    let current = 0;

    function showCard(index) {
        cards.forEach((card, i) => {
            card.classList.toggle("active", i === index);
        });
    }

    slider.querySelector(".story-nav.prev")?.addEventListener("click", () => {
        current = (current - 1 + cards.length) % cards.length;
        showCard(current);
    });

    slider.querySelector(".story-nav.next")?.addEventListener("click", () => {
        current = (current + 1) % cards.length;
        showCard(current);
    });

    // Initialize
    showCard(current);
})();

// Search bar at Resources page
// 1. Smooth Fade Search
function searchResources() {
    let input = document.getElementById('searchInput').value.toLowerCase();
    let rows = document.querySelectorAll('.resource-row');

    rows.forEach(row => {
        let text = row.innerText.toLowerCase();
        if (text.includes(input)) {
            row.style.display = "flex";
            // Add a small delay for a staggered entry effect
            row.style.opacity = "0";
            setTimeout(() => {
                row.style.transition = "opacity 0.5s ease";
                row.style.opacity = "1";
            }, 50);
        } else {
            row.style.display = "none";
        }
    });
}

// 2. Intersection Observer (Scroll Animation)
// This makes rows "Slide In" as you scroll down the page
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.resource-row').forEach(row => {
    row.style.opacity = "0";
    row.style.transform = "translateY(40px)";
    row.style.transition = "all 0.6s ease-out";
    observer.observe(row);
});

function resetResources() {
    // 1. Clear the search input text
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.value = "";
    }

    // 2. Get all resource rows
    const rows = document.querySelectorAll('.resource-row');

    // 3. Loop through and make them visible again
    rows.forEach(row => {
        row.style.display = "flex"; // Show the row
        row.style.opacity = "1";    // Ensure it's not invisible from animations
        row.style.transform = "translateY(0)"; // Reset position
    });
}

// Scroll Highlight Sections (About Page)
document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll(
        ".about-intro, .about-section, .stories-section, .partnerships"
    );

    if (!sections.length) return;

    const sectionObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("active-section");
                } else {
                    entry.target.classList.remove("active-section");
                }
            });
        },
        { threshold: 0.3 }
    );

    sections.forEach(section => sectionObserver.observe(section));
});

// FAQ section
const faqButtons = document.querySelectorAll('.faq-question');

faqButtons.forEach(button => {
    button.addEventListener('click', () => {
        const answer = button.nextElementSibling;
        answer.style.display = (answer.style.display === 'block') ? 'none' : 'block';
    });
});
