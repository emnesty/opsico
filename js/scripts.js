// Menu Mobile Toggle
document.addEventListener("DOMContentLoaded", function () {
  const mobileMenuToggle = document.querySelector(".mobile-menu-toggle");
  const nav = document.querySelector(".nav");
  const header = document.querySelector(".header");
  const body = document.body;

  if (mobileMenuToggle && nav) {
    mobileMenuToggle.addEventListener("click", function () {
      // Toggle classes
      mobileMenuToggle.classList.toggle("active");
      nav.classList.toggle("active");
      body.classList.toggle("menu-open");
      header.classList.toggle("menu-active");

      // Accessibility
      const isExpanded = nav.classList.contains("active");
      mobileMenuToggle.setAttribute("aria-expanded", isExpanded);
    });

    // Fechar menu ao clicar em um link (exceto dropdowns)
    const navLinks = nav.querySelectorAll("a:not(.dropdown-toggle)");
    navLinks.forEach((link) => {
      link.addEventListener("click", function () {
        // Só fechar se não for um item de dropdown
        if (!link.closest(".dropdown-menu")) {
          mobileMenuToggle.classList.remove("active");
          nav.classList.remove("active");
          body.classList.remove("menu-open");
          header.classList.remove("menu-active");
          mobileMenuToggle.setAttribute("aria-expanded", "false");
        }
      });
    });

    // Fechar menu ao pressionar ESC
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("active")) {
        mobileMenuToggle.classList.remove("active");
        nav.classList.remove("active");
        body.classList.remove("menu-open");
        header.classList.remove("menu-active");
        mobileMenuToggle.setAttribute("aria-expanded", "false");

        // Fechar todos os dropdowns abertos
        document.querySelectorAll(".dropdown-menu.active").forEach((menu) => {
          menu.classList.remove("active");
          const toggle = menu.parentElement.querySelector(".dropdown-toggle");
          if (toggle) toggle.classList.remove("active");
        });
      }
    });

    // Fechar menu ao redimensionar a tela para desktop
    window.addEventListener("resize", function () {
      if (window.innerWidth > 640 && nav.classList.contains("active")) {
        mobileMenuToggle.classList.remove("active");
        nav.classList.remove("active");
        body.classList.remove("menu-open");
        header.classList.remove("menu-active");
        mobileMenuToggle.setAttribute("aria-expanded", "false");

        // Fechar todos os dropdowns abertos
        document.querySelectorAll(".dropdown-menu.active").forEach((menu) => {
          menu.classList.remove("active");
          const toggle = menu.parentElement.querySelector(".dropdown-toggle");
          if (toggle) toggle.classList.remove("active");
        });
      }
    });
  }

  // Dropdown functionality
  const dropdownToggles = document.querySelectorAll(".dropdown-toggle");

  dropdownToggles.forEach((toggle) => {
    toggle.addEventListener("click", function (e) {
      e.preventDefault();

      // Para mobile (menu hambúrguer aberto)
      if (window.innerWidth <= 640 && nav.classList.contains("active")) {
        const dropdown = this.parentElement;
        const dropdownMenu = dropdown.querySelector(".dropdown-menu");

        // Toggle do dropdown atual
        this.classList.toggle("active");
        dropdownMenu.classList.toggle("active");

        // Fechar outros dropdowns
        dropdownToggles.forEach((otherToggle) => {
          if (otherToggle !== this) {
            otherToggle.classList.remove("active");
            const otherMenu =
              otherToggle.parentElement.querySelector(".dropdown-menu");
            if (otherMenu) otherMenu.classList.remove("active");
          }
        });
      }
    });
  });

  // Fechar dropdowns ao clicar fora (apenas desktop)
  document.addEventListener("click", function (e) {
    if (window.innerWidth > 640) {
      if (!e.target.closest(".dropdown")) {
        document.querySelectorAll(".dropdown-menu.active").forEach((menu) => {
          menu.classList.remove("active");
          const toggle = menu.parentElement.querySelector(".dropdown-toggle");
          if (toggle) toggle.classList.remove("active");
        });
      }
    }
  });

  // Fechar dropdowns ao clicar em itens do dropdown (mobile)
  const dropdownItems = document.querySelectorAll(".dropdown-menu a");
  dropdownItems.forEach((item) => {
    item.addEventListener("click", function () {
      if (window.innerWidth <= 640) {
        // Fechar o menu principal
        mobileMenuToggle.classList.remove("active");
        nav.classList.remove("active");
        body.classList.remove("menu-open");
        header.classList.remove("menu-active");
        mobileMenuToggle.setAttribute("aria-expanded", "false");

        // Fechar todos os dropdowns
        document.querySelectorAll(".dropdown-menu.active").forEach((menu) => {
          menu.classList.remove("active");
          const toggle = menu.parentElement.querySelector(".dropdown-toggle");
          if (toggle) toggle.classList.remove("active");
        });
      }
    });
  });
});

// Smooth scroll para links internos (se houver)
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

// Header fixo no scroll
document.addEventListener("DOMContentLoaded", function () {
  const header = document.querySelector(".header");
  const body = document.body;
  let lastScrollTop = 0;
  let scrollThreshold = 50; // Reduzido para ativação mais suave
  let isFixed = false;

  function handleScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // Evita processar se o scroll for muito pequeno
    if (Math.abs(scrollTop - lastScrollTop) < 5) return;

    if (scrollTop > scrollThreshold && !isFixed) {
      header.classList.add("fixed");
      body.classList.add("header-fixed");
      isFixed = true;
    } else if (scrollTop <= scrollThreshold && isFixed) {
      header.classList.remove("fixed");
      body.classList.remove("header-fixed");
      isFixed = false;
    }

    lastScrollTop = scrollTop;
  }

  // Throttle otimizado da função de scroll
  let ticking = false;
  function requestTick() {
    if (!ticking) {
      requestAnimationFrame(() => {
        handleScroll();
        ticking = false;
      });
      ticking = true;
    }
  }

  window.addEventListener("scroll", requestTick, { passive: true });
});
