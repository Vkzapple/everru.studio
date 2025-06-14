import "./style.css";

document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });
  const stars = document.querySelectorAll(".fa-star");
  stars.forEach((star, index) => {
    star.addEventListener("click", function () {
      stars.forEach((s, i) => {
        if (i <= index) {
          s.classList.remove("text-gray-300");
          s.classList.add("text-yellow-400");
        } else {
          s.classList.remove("text-yellow-400");
          s.classList.add("text-gray-300");
        }
      });
    });
  });
  window.addEventListener("scroll", function () {
    const navbar = document.getElementById("navbar");
    if (!navbar) return;

    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  const forms = document.querySelectorAll("form");
  forms.forEach((form) => {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      alert(
        "Terima kasih! Pesan Anda telah dikirim. Kami akan segera menghubungi Anda."
      );
    });
  });
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, observerOptions);

  document.querySelectorAll("section").forEach((section) => {
    section.style.opacity = "0";
    section.style.transform = "translateY(30px)";
    section.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(section);
  });

  const mobileMenuBtn = document.getElementById("mobile-menu-btn");
  const closeMobileMenuBtn = document.getElementById("close-mobile-menu");
  const mobileMenu = document.getElementById("mobile-menu");
  const mobileMenuOverlay = document.getElementById("mobile-menu-overlay");

  mobileMenuBtn.addEventListener("click", () => {
    mobileMenu.classList.add("show");
    mobileMenuOverlay.classList.remove("hidden");
  });

  closeMobileMenuBtn.addEventListener("click", () => {
    mobileMenu.classList.remove("show");
    mobileMenuOverlay.classList.add("hidden");
  });

  mobileMenuOverlay.addEventListener("click", () => {
    mobileMenu.classList.remove("show");
    mobileMenuOverlay.classList.add("hidden");
  });
});

const GOOGLE_APPS_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbynz6OxL-NoutG1h77pTTcXqCBS8iJIPlWTWcTKRCwVdMHDPLOFy7bIPiq-vQXj3zU/exec";

// Kontak Form
document
  .querySelector("#kontak form")
  ?.addEventListener("submit", async function (e) {
    e.preventDefault();

    const formData = {
      type: "kontak",
      nama: this.querySelector('input[placeholder="Nama Anda"]').value,
      email: this.querySelector('input[placeholder="Email Anda"]').value,
      layanan: this.querySelector("select").value,
      pesan: this.querySelector("textarea").value,
    };

    await fetch(GOOGLE_APPS_SCRIPT_URL, {
      method: "POST",
      body: JSON.stringify(formData),
      headers: { "Content-Type": "application/json" },
    });

    alert("✅ Pesanmu sudah terkirim!");
    this.reset();
  });

// Ulasan Form
document
  .querySelector("#review-form")
  ?.addEventListener("submit", async function (e) {
    e.preventDefault();

    const formData = {
      type: "ulasan",
      nama: this.querySelector("input").value || "Anonim",
      rating: document.querySelectorAll(".fa-star.text-yellow-400").length,
      ulasan: this.querySelector("textarea").value || "-",
    };

    await fetch(GOOGLE_APPS_SCRIPT_URL, {
      method: "POST",
      body: JSON.stringify(formData),
      headers: { "Content-Type": "application/json" },
    });

    alert("✨ Ulasanmu berhasil dikirim!");
    this.reset();
  });

grecaptcha.ready(function () {
  grecaptcha
    .execute("6LdwjGArAAAAAEaLhAbiLLM0YpRVsaFfFfPVPsV8", { action: "submit" })
    .then(function (token) {
      formData["g-recaptcha-response"] = token;

      fetch(GOOGLE_APPS_SCRIPT_URL, {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      });
    });
});
