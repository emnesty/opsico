document.addEventListener("DOMContentLoaded", function () {
  const mobileMenuToggle = document.querySelector(".mobile-menu-toggle")
  const nav = document.querySelector(".nav")
  const header = document.querySelector(".header")
  const body = document.body

  document.querySelectorAll("[data-aos]").forEach((element) => {
    if (!element.hasAttribute("data-aos-once")) {
      element.setAttribute("data-aos-once", "true")
    }
  })

  function resetMenuStates() {
    if (mobileMenuToggle) mobileMenuToggle.classList.remove("active")
    if (nav) nav.classList.remove("active")
    if (body) body.classList.remove("menu-open")
    if (header) header.classList.remove("menu-active")
    if (mobileMenuToggle) mobileMenuToggle.setAttribute("aria-expanded", "false")

    document.querySelectorAll(".dropdown-menu").forEach((menu) => {
      menu.classList.remove("active")
    })
    document.querySelectorAll(".dropdown-toggle").forEach((toggle) => {
      toggle.classList.remove("active")
    })
  }

  function enableTransitions() {
    if (header) {
      header.classList.add("loaded")
    }
  }

  resetMenuStates()

  setTimeout(enableTransitions, 100)

  if (mobileMenuToggle && nav) {
    mobileMenuToggle.addEventListener("click", function () {
      mobileMenuToggle.classList.toggle("active")
      nav.classList.toggle("active")
      body.classList.toggle("menu-open")
      header.classList.toggle("menu-active")

      const isExpanded = nav.classList.contains("active")
      mobileMenuToggle.setAttribute("aria-expanded", isExpanded)
    })

    const navLinks = nav.querySelectorAll("a:not(.dropdown-toggle)")
    navLinks.forEach((link) => {
      link.addEventListener("click", function () {
        if (!link.closest(".dropdown-menu")) {
          mobileMenuToggle.classList.remove("active")
          nav.classList.remove("active")
          body.classList.remove("menu-open")
          header.classList.remove("menu-active")
          mobileMenuToggle.setAttribute("aria-expanded", "false")
        }
      })
    })

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("active")) {
        mobileMenuToggle.classList.remove("active")
        nav.classList.remove("active")
        body.classList.remove("menu-open")
        header.classList.remove("menu-active")
        mobileMenuToggle.setAttribute("aria-expanded", "false")

        document.querySelectorAll(".dropdown-menu.active").forEach((menu) => {
          menu.classList.remove("active")
          const toggle = menu.parentElement.querySelector(".dropdown-toggle")
          if (toggle) toggle.classList.remove("active")
        })
      }
    })

    window.addEventListener("resize", function () {
      if (window.innerWidth > 640 && nav.classList.contains("active")) {
        mobileMenuToggle.classList.remove("active")
        nav.classList.remove("active")
        body.classList.remove("menu-open")
        header.classList.remove("menu-active")
        mobileMenuToggle.setAttribute("aria-expanded", "false")

        document.querySelectorAll(".dropdown-menu.active").forEach((menu) => {
          menu.classList.remove("active")
          const toggle = menu.parentElement.querySelector(".dropdown-toggle")
          if (toggle) toggle.classList.remove("active")
        })
      }
    })
  }

  const dropdownToggles = document.querySelectorAll(".dropdown-toggle")

  dropdownToggles.forEach((toggle) => {
    toggle.addEventListener("click", function (e) {
      e.preventDefault()

      if (window.innerWidth <= 640 && nav.classList.contains("active")) {
        const dropdown = this.parentElement
        const dropdownMenu = dropdown.querySelector(".dropdown-menu")

        this.classList.toggle("active")
        dropdownMenu.classList.toggle("active")

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

  const dropdownItems = document.querySelectorAll(".dropdown-menu a")
  dropdownItems.forEach((item) => {
    item.addEventListener("click", function () {
      if (window.innerWidth <= 640) {
        mobileMenuToggle.classList.remove("active")
        nav.classList.remove("active")
        body.classList.remove("menu-open")
        header.classList.remove("menu-active")
        mobileMenuToggle.setAttribute("aria-expanded", "false")

        document.querySelectorAll(".dropdown-menu.active").forEach((menu) => {
          menu.classList.remove("active")
          const toggle = menu.parentElement.querySelector(".dropdown-toggle")
          if (toggle) toggle.classList.remove("active")
        })
      }
    })
  })
})

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

document.addEventListener("DOMContentLoaded", function () {
  const header = document.querySelector(".header")
  const body = document.body
  let lastScrollTop = 0
  let scrollThreshold = 50
  let isFixed = false

  function handleScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop

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

document.addEventListener("DOMContentLoaded", function () {
  const featureItems = document.querySelectorAll(".diferenciais-opsico .feature-item")
  const carouselTrack = document.querySelector(".diferenciais-opsico .carousel-track")
  const slides = document.querySelectorAll(".diferenciais-opsico .slide")

  if (featureItems.length === 0 || !carouselTrack || slides.length === 0) {
    return
  }

  let currentSlide = 0
  let autoSlideInterval

  function goToSlide(index) {
    if (index < 0 || index >= slides.length) return

    currentSlide = index

    const slideWidth = slides[0].offsetWidth
    carouselTrack.scrollTo({
      left: slideWidth * index,
      behavior: "smooth",
    })

    featureItems.forEach((item, i) => {
      if (i === index) {
        item.classList.add("active")
      } else {
        item.classList.remove("active")
      }
    })
  }

  function nextSlide() {
    const nextIndex = (currentSlide + 1) % slides.length
    goToSlide(nextIndex)
  }

  function startAutoSlide() {
    autoSlideInterval = setInterval(nextSlide, 4000)
  }

  function stopAutoSlide() {
    if (autoSlideInterval) {
      clearInterval(autoSlideInterval)
      autoSlideInterval = null
    }
  }

  featureItems.forEach((item, index) => {
    item.addEventListener("click", () => {
      stopAutoSlide()
      goToSlide(index)

      setTimeout(() => {
        if (!autoSlideInterval) {
          startAutoSlide()
        }
      }, 6000)
    })

    item.addEventListener("mouseenter", stopAutoSlide)
    item.addEventListener("mouseleave", () => {
      setTimeout(() => {
        if (!autoSlideInterval) {
          startAutoSlide()
        }
      }, 1000)
    })
  })

  let scrollTimeout
  carouselTrack.addEventListener("scroll", () => {
    clearTimeout(scrollTimeout)
    stopAutoSlide()

    scrollTimeout = setTimeout(() => {
      const slideWidth = slides[0].offsetWidth
      const newIndex = Math.round(carouselTrack.scrollLeft / slideWidth)

      if (newIndex !== currentSlide && newIndex >= 0 && newIndex < slides.length) {
        currentSlide = newIndex

        featureItems.forEach((item, i) => {
          if (i === newIndex) {
            item.classList.add("active")
          } else {
            item.classList.remove("active")
          }
        })
      }

      setTimeout(() => {
        if (!autoSlideInterval) {
          startAutoSlide()
        }
      }, 3000)
    }, 150)
  })

  goToSlide(0)
  startAutoSlide()

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

document.addEventListener("DOMContentLoaded", function () {
  const COOKIE_CONSENT_KEY = "opsico_cookie_consent"
  const cookieConsent = document.getElementById("cookie-consent")

  function checkCookieConsent() {
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY)
    return consent === "accepted"
  }

  function showCookieConsent() {
    if (cookieConsent) {
      cookieConsent.classList.remove("hidden")
      cookieConsent.classList.add("animate-in")

      setTimeout(() => {
        cookieConsent.classList.add("show")
      }, 10)
    }
  }

  function hideCookieConsent() {
    if (cookieConsent) {
      cookieConsent.classList.remove("show")

      setTimeout(() => {
        cookieConsent.classList.add("hidden")
        cookieConsent.classList.remove("animate-in")
      }, 300)
    }
  }

  function saveCookieConsent(status) {
    localStorage.setItem(COOKIE_CONSENT_KEY, status)
  }

  function initCookieConsent() {
    if (!checkCookieConsent()) {
      setTimeout(showCookieConsent, 1000)
    }
  }

  initCookieConsent()
})

function acceptCookies() {
  const COOKIE_CONSENT_KEY = "opsico_cookie_consent"
  const cookieConsent = document.getElementById("cookie-consent")

  localStorage.setItem(COOKIE_CONSENT_KEY, "accepted")

  if (cookieConsent) {
    cookieConsent.classList.remove("show")
    setTimeout(() => {
      cookieConsent.classList.add("hidden")
    }, 300)
  }

  console.log("Cookies aceitos pelo usuário")
}

function manageCookiePreferences() {
  window.open("./politica-cookies.html", "_blank")

  console.log("Gerenciar preferências de cookies")
}

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

function resetCookieConsent() {
  localStorage.removeItem("opsico_cookie_consent")
  location.reload()
}

function closeStickyBanner() {
  const banner = document.getElementById("sticky-banner")
  const body = document.body

  if (banner) {
    banner.style.opacity = "0"
    banner.style.transform = "translateY(-100%)"

    setTimeout(() => {
      banner.style.display = "none"
      body.classList.remove("has-sticky-banner")
    }, 300)
  }

  localStorage.setItem("opsico_sticky_banner_closed", "true")
}

document.addEventListener("DOMContentLoaded", function () {
  const banner = document.getElementById("sticky-banner")
  const body = document.body
  const bannerClosed = localStorage.getItem("opsico_sticky_banner_closed")

  if (banner && bannerClosed === "true") {
    banner.style.display = "none"
    body.classList.remove("has-sticky-banner")
  }
})

const stepCards = document.querySelectorAll(".how-steps .step-card")
const phoneImg = document.getElementById("howPhoneImg")

if (stepCards.length && phoneImg) {
  const sources = ["/img/step1.png", "/img/step2.png", "/img/step3.png", "/img/step4.png"]

  sources.forEach((src) => {
    const img = new Image()
    img.src = src
  })

  let currentIndex = 0
  let autoplayTimer
  let isUserInteracting = false

  const highlightActiveStep = (index) => {
    stepCards.forEach((card, i) => {
      card.classList.toggle("active", i === index)
    })
  }

  const changeImage = (index) => {
    if (phoneImg.src.includes(sources[index].split("/").pop())) {
      return
    }

    phoneImg.classList.add("fade")
    setTimeout(() => {
      phoneImg.src = sources[index]
      phoneImg.onload = () => {
        phoneImg.classList.remove("fade")
      }
    }, 150)
  }

  const activateStep = (index, fromUser = false) => {
    if (index < 0 || index >= sources.length) return

    currentIndex = index
    highlightActiveStep(currentIndex)
    changeImage(currentIndex)

    if (fromUser) {
      isUserInteracting = true
      clearTimeout(autoplayTimer)
      setTimeout(() => {
        isUserInteracting = false
        startAutoplay()
      }, 5000)
    }
  }

  const nextStep = () => {
    if (!isUserInteracting) {
      const nextIndex = (currentIndex + 1) % sources.length
      activateStep(nextIndex)
    }
  }

  const startAutoplay = () => {
    clearInterval(autoplayTimer)
    if (!isUserInteracting) {
      autoplayTimer = setInterval(nextStep, 3000)
    }
  }

  const stopAutoplay = () => {
    clearInterval(autoplayTimer)
  }

  stepCards.forEach((card, index) => {
    card.addEventListener("mouseenter", () => {
      activateStep(index, true)
    })

    card.addEventListener("click", (e) => {
      e.preventDefault()
      activateStep(index, true)
    })
  })

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

  activateStep(0)
  startAutoplay()

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      stopAutoplay()
    } else if (!isUserInteracting) {
      startAutoplay()
    }
  })
}

if (document.querySelector("[data-modal]")) {
  const modalTriggers = document.querySelectorAll("[data-modal]")
  const modalOverlays = document.querySelectorAll(".modal-overlay")
  const modalCloseButtons = document.querySelectorAll(".modal-close")

  function openModal(modalId) {
    const modal = document.getElementById(`modal-${modalId}`)
    if (modal) {
      modal.classList.add("active")
      document.body.style.overflow = "hidden"
    }
  }

  function closeModal(modal) {
    if (modal) {
      modal.classList.remove("active")
      document.body.style.overflow = ""
    }
  }

  modalTriggers.forEach((trigger) => {
    trigger.addEventListener("click", (e) => {
      e.preventDefault()
      const modalId = trigger.getAttribute("data-modal")
      openModal(modalId)
    })
  })

  modalCloseButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const modal = button.closest(".modal-overlay")
      closeModal(modal)
    })
  })

  modalOverlays.forEach((overlay) => {
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) {
        closeModal(overlay)
      }
    })
  })

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      const activeModal = document.querySelector(".modal-overlay.active")
      if (activeModal) {
        closeModal(activeModal)
      }
    }
  })
}
