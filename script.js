
const sections = document.querySelectorAll("main section");
const navLinks = document.querySelectorAll("nav ul li a");

function updateActiveMenu() {
    const scrollPosition = window.scrollY + 150;

    let currentSection = "anasayfa";

    sections.forEach((section) => {
        if (scrollPosition >= section.offsetTop) {
            currentSection = section.id;
        }
    });

    navLinks.forEach((link) => {
        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + currentSection) {
            link.classList.add("active");
        }
    });
}

window.addEventListener("scroll", updateActiveMenu);
window.addEventListener("load", updateActiveMenu);


// ===== SCROLL REVEAL ANIMASYONU =====

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {

    const revealObserver = new IntersectionObserver((entries, observer) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                entry.target.classList.add("visible");

                observer.unobserve(entry.target);
            }
        });

    }, {
        threshold: 0.1
    });

    revealElements.forEach((element) => {

        element.classList.add("reveal-ready");

        revealObserver.observe(element);
    });
}




console.log("JavaScript düzgün çalışıyor!");


console.log(
    "Hakkımda sınıfları:",
    document.querySelector("#hakkimda").className
);


// ===== YUKARI ÇIK BUTONU =====

// HTML'deki butonu seçiyoruz.
const yukariCik = document.querySelector("#yukariCik");

// Sayfa kaydırıldığında çalışacak fonksiyon.
function yukariButonKontrol() {

    if (window.scrollY > 300) {
        yukariCik.classList.add("show");
    } else {
        yukariCik.classList.remove("show");
    }

}

// Kaydırma olayını dinliyoruz.
window.addEventListener("scroll", yukariButonKontrol);

// Sayfa ilk açıldığında da kontrol ediyoruz.
yukariButonKontrol();

// Butona tıklanınca en üste dön.
yukariCik.addEventListener("click", function () {

    window.scrollTo({
        top: 0,
        behavior: window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches ? "instant" : "smooth"
    });

});


// ===== MOBİL HAMBURGER MENÜ =====

// HTML elementlerini seçiyoruz.
const menuToggle = document.querySelector(".menu-toggle");
const navMenu = document.querySelector("#nav-menu");
const mobileLinks = navMenu.querySelectorAll("a");

// Menünün durumunu değiştiren fonksiyon
function setMenuOpen(isOpen) {

    navMenu.classList.toggle("menu-open", isOpen);
    menuToggle.classList.toggle("is-open", isOpen);

    menuToggle.setAttribute("aria-expanded", String(isOpen));

    menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Menüyü kapat" : "Menüyü aç"
    );
}

// Hamburger butonuna tıklanınca
menuToggle.addEventListener("click", () => {

    const isOpen = navMenu.classList.contains("menu-open");

    setMenuOpen(!isOpen);
});

// Menü bağlantısına tıklanınca kapat
mobileLinks.forEach((link) => {

    link.addEventListener("click", () => {
        setMenuOpen(false);
    });

});

// Escape tuşuyla menüyü kapat
document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {
        setMenuOpen(false);
    }

});

// Masaüstüne geçildiğinde menüyü sıfırla
window.addEventListener("resize", () => {

    if (window.innerWidth > 768) {
        setMenuOpen(false);
    }

});
