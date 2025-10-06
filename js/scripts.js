// Menu Mobile Toggle
document.addEventListener("DOMContentLoaded", function () {
  const mobileMenuToggle = document.querySelector(".mobile-menu-toggle")
  const nav = document.querySelector(".nav")
  const header = document.querySelector(".header")
  const body = document.body

  // Garantir que todas as animações AOS executem apenas uma vez, salvo configuração específica
  document.querySelectorAll("[data-aos]").forEach((element) => {
    if (!element.hasAttribute("data-aos-once")) {
      element.setAttribute("data-aos-once", "true")
    }
  })

  // Resetar todos os estados dos dropdowns e menus no carregamento
  function resetMenuStates() {
    // Resetar menu mobile
    if (mobileMenuToggle) mobileMenuToggle.classList.remove("active")
    if (nav) nav.classList.remove("active")
    if (body) body.classList.remove("menu-open")
    if (header) header.classList.remove("menu-active")
    if (mobileMenuToggle) mobileMenuToggle.setAttribute("aria-expanded", "false")

    // Resetar todos os dropdowns
    document.querySelectorAll(".dropdown-menu").forEach((menu) => {
      menu.classList.remove("active")
    })
    document.querySelectorAll(".dropdown-toggle").forEach((toggle) => {
      toggle.classList.remove("active")
    })
  }

  // Habilitar transições após carregamento completo
  function enableTransitions() {
    if (header) {
      header.classList.add("loaded")
    }
  }

  // Executar reset e habilitar transições
  resetMenuStates()

  // Aguardar um pouco para garantir que a página esteja totalmente carregada
  setTimeout(enableTransitions, 100)

  if (mobileMenuToggle && nav) {
    mobileMenuToggle.addEventListener("click", function () {
      // Toggle classes
      mobileMenuToggle.classList.toggle("active")
      nav.classList.toggle("active")
      body.classList.toggle("menu-open")
      header.classList.toggle("menu-active")

      // Accessibility
      const isExpanded = nav.classList.contains("active")
      mobileMenuToggle.setAttribute("aria-expanded", isExpanded)
    })

    // Fechar menu ao clicar em um link (exceto dropdowns)
    const navLinks = nav.querySelectorAll("a:not(.dropdown-toggle)")
    navLinks.forEach((link) => {
      link.addEventListener("click", function () {
        // Só fechar se não for um item de dropdown
        if (!link.closest(".dropdown-menu")) {
          mobileMenuToggle.classList.remove("active")
          nav.classList.remove("active")
          body.classList.remove("menu-open")
          header.classList.remove("menu-active")
          mobileMenuToggle.setAttribute("aria-expanded", "false")
        }
      })
    })

    // Fechar menu ao pressionar ESC
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("active")) {
        mobileMenuToggle.classList.remove("active")
        nav.classList.remove("active")
        body.classList.remove("menu-open")
        header.classList.remove("menu-active")
        mobileMenuToggle.setAttribute("aria-expanded", "false")

        // Fechar todos os dropdowns abertos
        document.querySelectorAll(".dropdown-menu.active").forEach((menu) => {
          menu.classList.remove("active")
          const toggle = menu.parentElement.querySelector(".dropdown-toggle")
          if (toggle) toggle.classList.remove("active")
        })
      }
    })

    // Fechar menu ao redimensionar a tela para desktop
    window.addEventListener("resize", function () {
      if (window.innerWidth > 640 && nav.classList.contains("active")) {
        mobileMenuToggle.classList.remove("active")
        nav.classList.remove("active")
        body.classList.remove("menu-open")
        header.classList.remove("menu-active")
        mobileMenuToggle.setAttribute("aria-expanded", "false")

        // Fechar todos os dropdowns abertos
        document.querySelectorAll(".dropdown-menu.active").forEach((menu) => {
          menu.classList.remove("active")
          const toggle = menu.parentElement.querySelector(".dropdown-toggle")
          if (toggle) toggle.classList.remove("active")
        })
      }
    })
  }

  // Dropdown functionality
  const dropdownToggles = document.querySelectorAll(".dropdown-toggle")

  dropdownToggles.forEach((toggle) => {
    toggle.addEventListener("click", function (e) {
      e.preventDefault()

      // Para mobile (menu hambúrguer aberto)
      if (window.innerWidth <= 640 && nav.classList.contains("active")) {
        const dropdown = this.parentElement
        const dropdownMenu = dropdown.querySelector(".dropdown-menu")

        // Toggle do dropdown atual
        this.classList.toggle("active")
        dropdownMenu.classList.toggle("active")

        // Fechar outros dropdowns
        dropdownToggles.forEach((otherToggle) => {
          if (otherToggle !== this) {
            otherToggle.classList.remove("active")
            const otherMenu = otherToggle.parentElement.querySelector(".dropdown-menu")
            if (otherMenu) otherMenu.classList.remove("active")
          }
        })
      }
    })
  })

  // Fechar dropdowns ao clicar fora (apenas desktop)
  document.addEventListener("click", function (e) {
    if (window.innerWidth > 640) {
      if (!e.target.closest(".dropdown")) {
        document.querySelectorAll(".dropdown-menu.active").forEach((menu) => {
          menu.classList.remove("active")
          const toggle = menu.parentElement.querySelector(".dropdown-toggle")
          if (toggle) toggle.classList.remove("active")
        })
      }
    }
  })

  // Fechar dropdowns ao clicar em itens do dropdown (mobile)
  const dropdownItems = document.querySelectorAll(".dropdown-menu a")
  dropdownItems.forEach((item) => {
    item.addEventListener("click", function () {
      if (window.innerWidth <= 640) {
        // Fechar o menu principal
        mobileMenuToggle.classList.remove("active")
        nav.classList.remove("active")
        body.classList.remove("menu-open")
        header.classList.remove("menu-active")
        mobileMenuToggle.setAttribute("aria-expanded", "false")

        // Fechar todos os dropdowns
        document.querySelectorAll(".dropdown-menu.active").forEach((menu) => {
          menu.classList.remove("active")
          const toggle = menu.parentElement.querySelector(".dropdown-toggle")
          if (toggle) toggle.classList.remove("active")
        })
      }
    })
  })
})

// Smooth scroll para links internos (se houver)
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// Header fixo no scroll
document.addEventListener("DOMContentLoaded", function () {
  const header = document.querySelector(".header")
  const body = document.body
  let lastScrollTop = 0
  let scrollThreshold = 50 // Reduzido para ativação mais suave
  let isFixed = false

  function handleScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop

    // Evita processar se o scroll for muito pequeno
    if (Math.abs(scrollTop - lastScrollTop) < 5) return

    if (scrollTop > scrollThreshold && !isFixed) {
      header.classList.add("fixed")
      body.classList.add("header-fixed")
      isFixed = true
    } else if (scrollTop <= scrollThreshold && isFixed) {
      header.classList.remove("fixed")
      body.classList.remove("header-fixed")
      isFixed = false
    }

    lastScrollTop = scrollTop
  }

  // Throttle otimizado da função de scroll
  let ticking = false
  function requestTick() {
    if (!ticking) {
      requestAnimationFrame(() => {
        handleScroll()
        ticking = false
      })
      ticking = true
    }
  }

  window.addEventListener("scroll", requestTick, { passive: true })
})

// Funcionalidade dos Diferenciais - Alternância entre tabs e imagens
document.addEventListener("DOMContentLoaded", function () {
  const featureItems = document.querySelectorAll(".diferenciais-opsico .feature-item")
  const carouselTrack = document.querySelector(".diferenciais-opsico .carousel-track")
  const slides = document.querySelectorAll(".diferenciais-opsico .slide")

  if (featureItems.length === 0 || !carouselTrack || slides.length === 0) {
    return // Sair se os elementos não existirem
  }

  let currentSlide = 0
  let autoSlideInterval

  // Função para mudar para um slide específico
  function goToSlide(index) {
    if (index < 0 || index >= slides.length) return

    currentSlide = index

    // Rolar o carrossel para o slide correspondente
    const slideWidth = slides[0].offsetWidth
    carouselTrack.scrollTo({
      left: slideWidth * index,
      behavior: "smooth",
    })

    // Atualizar classes ativas nos feature items
    featureItems.forEach((item, i) => {
      if (i === index) {
        item.classList.add("active")
      } else {
        item.classList.remove("active")
      }
    })
  }

  // Função para ir para o próximo slide
  function nextSlide() {
    const nextIndex = (currentSlide + 1) % slides.length
    goToSlide(nextIndex)
  }

  // Função para iniciar auto-slide
  function startAutoSlide() {
    autoSlideInterval = setInterval(nextSlide, 4000) // Muda a cada 4 segundos
  }

  // Função para parar auto-slide
  function stopAutoSlide() {
    if (autoSlideInterval) {
      clearInterval(autoSlideInterval)
      autoSlideInterval = null
    }
  }

  // Adicionar event listeners aos feature items
  featureItems.forEach((item, index) => {
    item.addEventListener("click", () => {
      stopAutoSlide()
      goToSlide(index)

      // Reiniciar auto-slide após 6 segundos de inatividade
      setTimeout(() => {
        if (!autoSlideInterval) {
          startAutoSlide()
        }
      }, 6000)
    })

    // Parar auto-slide ao passar o mouse
    item.addEventListener("mouseenter", stopAutoSlide)
    item.addEventListener("mouseleave", () => {
      setTimeout(() => {
        if (!autoSlideInterval) {
          startAutoSlide()
        }
      }, 1000)
    })
  })

  // Detectar mudanças manuais no carrossel via scroll
  let scrollTimeout
  carouselTrack.addEventListener("scroll", () => {
    clearTimeout(scrollTimeout)
    stopAutoSlide()

    scrollTimeout = setTimeout(() => {
      const slideWidth = slides[0].offsetWidth
      const newIndex = Math.round(carouselTrack.scrollLeft / slideWidth)

      if (newIndex !== currentSlide && newIndex >= 0 && newIndex < slides.length) {
        currentSlide = newIndex

        // Atualizar feature items ativos
        featureItems.forEach((item, i) => {
          if (i === newIndex) {
            item.classList.add("active")
          } else {
            item.classList.remove("active")
          }
        })
      }

      // Reiniciar auto-slide
      setTimeout(() => {
        if (!autoSlideInterval) {
          startAutoSlide()
        }
      }, 3000)
    }, 150)
  })

  // Inicializar
  goToSlide(0)
  startAutoSlide()

  // Parar auto-slide quando a seção não estiver visível
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (!autoSlideInterval) {
            startAutoSlide()
          }
        } else {
          stopAutoSlide()
        }
      })
    },
    { threshold: 0.3 }
  )

  const diferenciais = document.querySelector(".diferenciais-opsico")
  if (diferenciais) {
    observer.observe(diferenciais)
  }
})

// FAQ accordion behaviour
document.addEventListener("DOMContentLoaded", function () {
  const faqTriggers = document.querySelectorAll(".faq-item__trigger")

  if (faqTriggers.length === 0) return

  faqTriggers.forEach((trigger) => {
    const targetId = trigger.getAttribute("aria-controls")
    const target = document.getElementById(targetId)

    const toggleFAQ = () => {
      const isExpanded = trigger.getAttribute("aria-expanded") === "true"
      trigger.setAttribute("aria-expanded", (!isExpanded).toString())

      if (target) {
        target.hidden = isExpanded
      }
    }

    trigger.addEventListener("click", toggleFAQ)
    trigger.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault()
        toggleFAQ()
      }
    })
  })
})

// Cookie Consent Management
document.addEventListener("DOMContentLoaded", function () {
  const COOKIE_CONSENT_KEY = "opsico_cookie_consent"
  const cookieConsent = document.getElementById("cookie-consent")

  // Check if user has already given consent
  function checkCookieConsent() {
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY)
    return consent === "accepted"
  }

  // Show cookie consent banner
  function showCookieConsent() {
    if (cookieConsent) {
      cookieConsent.classList.remove("hidden")
      cookieConsent.classList.add("animate-in")

      // Add show class after a brief delay for animation
      setTimeout(() => {
        cookieConsent.classList.add("show")
      }, 10)
    }
  }

  // Hide cookie consent banner
  function hideCookieConsent() {
    if (cookieConsent) {
      cookieConsent.classList.remove("show")

      // Wait for animation to complete before hiding
      setTimeout(() => {
        cookieConsent.classList.add("hidden")
        cookieConsent.classList.remove("animate-in")
      }, 300)
    }
  }

  // Save cookie consent to localStorage
  function saveCookieConsent(status) {
    localStorage.setItem(COOKIE_CONSENT_KEY, status)
  }

  // Initialize cookie consent banner
  function initCookieConsent() {
    if (!checkCookieConsent()) {
      // Delay showing the banner by 1 second for better UX
      setTimeout(showCookieConsent, 1000)
    }
  }

  // Initialize on page load
  initCookieConsent()
})

// Global functions for cookie consent actions
function acceptCookies() {
  const COOKIE_CONSENT_KEY = "opsico_cookie_consent"
  const cookieConsent = document.getElementById("cookie-consent")

  // Save consent
  localStorage.setItem(COOKIE_CONSENT_KEY, "accepted")

  // Hide banner
  if (cookieConsent) {
    cookieConsent.classList.remove("show")
    setTimeout(() => {
      cookieConsent.classList.add("hidden")
    }, 300)
  }

  // Here you can add your cookie/analytics initialization
  // initializeAnalytics();
  // initializeTrackingPixels();

  console.log("Cookies aceitos pelo usuário")
}

function manageCookiePreferences() {
  // For now, redirect to cookie policy page
  // In the future, you could open a modal with detailed preferences
  window.open("./politica-cookies.html", "_blank")

  console.log("Gerenciar preferências de cookies")
}

// Function to close cookie consent without accepting
function closeCookieConsent() {
  const cookieConsent = document.getElementById("cookie-consent")

  if (cookieConsent) {
    cookieConsent.classList.remove("show")
    setTimeout(() => {
      cookieConsent.classList.add("hidden")
      cookieConsent.classList.remove("animate-in")
    }, 300)
  }

  console.log("Banner de cookies fechado (sem aceite)")
}

// Function to reset cookie consent (useful for testing)
function resetCookieConsent() {
  localStorage.removeItem("opsico_cookie_consent")
  location.reload()
}

// Sticky Banner Functions
function closeStickyBanner() {
  const banner = document.getElementById("sticky-banner")
  const body = document.body

  if (banner) {
    // Add fade out animation
    banner.style.opacity = "0"
    banner.style.transform = "translateY(-100%)"

    // Remove banner and body class after animation
    setTimeout(() => {
      banner.style.display = "none"
      body.classList.remove("has-sticky-banner")
    }, 300)
  }

  // Store banner close state in localStorage
  localStorage.setItem("opsico_sticky_banner_closed", "true")
}

// Check if sticky banner should be shown on page load
document.addEventListener("DOMContentLoaded", function () {
  const banner = document.getElementById("sticky-banner")
  const body = document.body
  const bannerClosed = localStorage.getItem("opsico_sticky_banner_closed")

  if (banner && bannerClosed === "true") {
    banner.style.display = "none"
    body.classList.remove("has-sticky-banner")
  }
})

// Slider "Como funciona" — hover/click, autoplay e fade da imagem
const stepCards = document.querySelectorAll(".how-steps .step-card")
const phoneImg = document.getElementById("howPhoneImg")

if (stepCards.length && phoneImg) {
  const sources = ["/img/step1.png", "/img/step2.png", "/img/step3.png", "/img/step4.png"]

  // Pre-caregar imagens para transição suave
  sources.forEach((src) => {
    const img = new Image()
    img.src = src
  })

  let currentIndex = 0
  let autoplayTimer
  let isUserInteracting = false

  // Função para destacar o step ativo
  const highlightActiveStep = (index) => {
    stepCards.forEach((card, i) => {
      card.classList.toggle("active", i === index)
    })
  }

  // Função para trocar a imagem com fade
  const changeImage = (index) => {
    if (phoneImg.src.includes(sources[index].split("/").pop())) {
      return // Evita trocar para a mesma imagem
    }

    phoneImg.classList.add("fade")
    setTimeout(() => {
      phoneImg.src = sources[index]
      phoneImg.onload = () => {
        phoneImg.classList.remove("fade")
      }
    }, 150)
  }

  // Função principal para ativar um step
  const activateStep = (index, fromUser = false) => {
    if (index < 0 || index >= sources.length) return

    currentIndex = index
    highlightActiveStep(currentIndex)
    changeImage(currentIndex)

    if (fromUser) {
      isUserInteracting = true
      clearTimeout(autoplayTimer)
      // Retoma o autoplay após 5 segundos de inatividade
      setTimeout(() => {
        isUserInteracting = false
        startAutoplay()
      }, 5000)
    }
  }

  // Função para próximo step (autoplay)
  const nextStep = () => {
    if (!isUserInteracting) {
      const nextIndex = (currentIndex + 1) % sources.length
      activateStep(nextIndex)
    }
  }

  // Iniciar autoplay
  const startAutoplay = () => {
    clearInterval(autoplayTimer)
    if (!isUserInteracting) {
      autoplayTimer = setInterval(nextStep, 3000) // 3 segundos
    }
  }

  // Parar autoplay
  const stopAutoplay = () => {
    clearInterval(autoplayTimer)
  }

  // Event listeners para os step cards
  stepCards.forEach((card, index) => {
    // Mouse enter - ativa imediatamente
    card.addEventListener("mouseenter", () => {
      activateStep(index, true)
    })

    // Click - para dispositivos touch
    card.addEventListener("click", (e) => {
      e.preventDefault()
      activateStep(index, true)
    })
  })

  // Pausar autoplay quando mouse estiver na seção
  const howSection = document.querySelector(".how-opsico")
  if (howSection) {
    howSection.addEventListener("mouseenter", () => {
      stopAutoplay()
    })

    howSection.addEventListener("mouseleave", () => {
      if (!isUserInteracting) {
        startAutoplay()
      }
    })
  }

  // Inicializar
  activateStep(0)
  startAutoplay()

  // Pausar quando a página não está visível
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      stopAutoplay()
    } else if (!isUserInteracting) {
      startAutoplay()
    }
  })
}
