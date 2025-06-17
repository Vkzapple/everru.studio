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

// Ganti sesuai domain kamu saat produksi/deploy
const API_URL = "/api/submit";

// ===== Kontak Form =====
const kontakForm = document.querySelector("#kontak form");

if (kontakForm) {
  kontakForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const nama = kontakForm.querySelector(
      'input[placeholder="Nama Anda"]'
    ).value;
    const email = kontakForm.querySelector(
      'input[placeholder="Email Anda"]'
    ).value;
    const layanan = kontakForm.querySelector("select").value;
    const pesan = kontakForm.querySelector("textarea").value;

    const formData = {
      type: "kontak",
      nama,
      email,
      layanan,
      pesan,
    };

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText || "Terjadi kesalahan server.");
      }

      const result = await res.json();
      alert("✅ Pesanmu sudah terkirim!");
      kontakForm.reset();
    } catch (error) {
      console.error("Gagal mengirim form:", error);
      alert("❌ Gagal mengirim pesan.");
    }
  });
}

// ===== Ulasan Form =====
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

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText || "Terjadi kesalahan server.");
      }

      const result = await res.json();
      alert("✨ Ulasanmu berhasil dikirim!");
      this.reset();
    } catch (error) {
      console.error("Gagal mengirim ulasan:", error);
      alert("❌ Gagal mengirim ulasan.");
    }
  });
