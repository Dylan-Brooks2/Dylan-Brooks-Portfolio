(function () {
  const root = document.documentElement;
  const toggle = document.getElementById("theme-toggle");
  const vibeButton = document.getElementById("vibe-button");
  const vibeLine = document.getElementById("vibe-line");
  const contactForm = document.getElementById("contact-form");
  const formStatus = document.querySelector(".form-status");
  const profGrid = document.querySelector(".prof-grid");
  const profCards = profGrid ? profGrid.querySelectorAll("li") : [];

  const vibes = [
    "I build products people actually want.",
    "I turn messy ideas into clear products.",
    "I like solving problems with code and clean UX.",
    "I build thoughtful experiences with real utility."
  ];

  let vibeIndex = 0;

  function getStoredTheme() {
    try {
      return localStorage.getItem("theme");
    } catch (e) {
      return null;
    }
  }

  function storeTheme(value) {
    try {
      localStorage.setItem("theme", value);
    } catch (e) {
      /* storage unavailable, theme just won't persist */
    }
  }

  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
    if (toggle) {
      toggle.setAttribute(
        "aria-label",
        theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
      );
    }
  }

  const stored = getStoredTheme();
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  applyTheme(stored || (prefersDark ? "dark" : "light"));

  if (toggle) {
    toggle.addEventListener("click", function () {
      const current = root.getAttribute("data-theme");
      const next = current === "dark" ? "light" : "dark";
      applyTheme(next);
      storeTheme(next);
    });
  }

  if (vibeButton && vibeLine) {
    vibeButton.addEventListener("click", function () {
      vibeLine.classList.add("bump");
      setTimeout(() => {
        vibeIndex = (vibeIndex + 1) % vibes.length;
        vibeLine.textContent = vibes[vibeIndex];
        vibeLine.classList.remove("bump");
      }, 150);
    });
  }

  if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const email = document.getElementById("email").value.trim();
      const phone = document.getElementById("phone").value.trim();
      const firstName = document.getElementById("first-name").value.trim();
      const message = document.getElementById("message").value.trim();

      if (!email || !firstName || !message) {
        return;
      }

      const subject = encodeURIComponent(`Portfolio inquiry from ${firstName}`);
      const body = encodeURIComponent(
        `Name: ${firstName}\nEmail: ${email}\nPhone: ${phone || "N/A"}\n\nMessage:\n${message}`
      );

      window.location.href = `mailto:dylanbrooks0215@gmail.com?subject=${subject}&body=${body}`;

      if (formStatus) {
        formStatus.textContent = "Your email draft is ready — send it from your mail app to finish.";
      }
    });
  }

  if (profGrid && profCards.length) {
    profCards.forEach((card) => {
      card.style.setProperty("--repel-x", "0px");
      card.style.setProperty("--repel-y", "0px");

      card.addEventListener("click", function (event) {
        const rect = card.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const deltaX = centerX - event.clientX;
        const deltaY = centerY - event.clientY;
        const distance = Math.max(1, Math.hypot(deltaX, deltaY));

        const repelX = (deltaX / distance) * 24;
        const repelY = (deltaY / distance) * 24;

        card.classList.add("is-repelled");
        card.style.setProperty("--repel-x", `${repelX}px`);
        card.style.setProperty("--repel-y", `${repelY}px`);

        clearTimeout(card._repelResetTimer);
        card._repelResetTimer = setTimeout(function () {
          card.classList.remove("is-repelled");
          card.style.setProperty("--repel-x", "0px");
          card.style.setProperty("--repel-y", "0px");
        }, 320);
      });
    });
  }
})();