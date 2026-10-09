/**
 * PromptKit Pro — Digital Product E-Commerce Script
 * Pure Vanilla JavaScript (No libraries)
 */

/* ==========================================================================
   CONFIG: PRODUCT CHECKOUT URL
   Replace this URL with your Razorpay, Gumroad, LemonSqueezy, or Stripe link.
   ========================================================================== */
const PRODUCT_CHECKOUT_URL = "https://superprofile.bio/vp/promptkit-pro-%E2%80%94-99--ai-prompts-for-ugc-ads---product-visuals";

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  /* --------------------------------------------------------------------------
     1. Bind Checkout URL & Meta Pixel InitiateCheckout Tracking
     -------------------------------------------------------------------------- */
  const checkoutButtons = document.querySelectorAll('.checkout-cta-btn, [data-checkout-btn], a[href*="superprofile.bio"]');
  let isCheckoutInProgress = false;

  const handleCheckoutClick = (e) => {
    // Prevent duplicate checkout events (e.g. rapid double clicks)
    if (isCheckoutInProgress) {
      e.preventDefault();
      return;
    }
    isCheckoutInProgress = true;

    // Fire Meta Pixel InitiateCheckout event
    if (typeof window.fbq === 'function') {
      try {
        window.fbq('track', 'InitiateCheckout', {
          content_name: 'PromptKit Pro — 99+ AI Prompts for UGC Ads & Product Visuals',
          value: 299,
          currency: 'INR'
        });
      } catch (err) {
        console.warn('Meta Pixel InitiateCheckout tracking error:', err);
      }
    }

    // Support user intent for opening in new tab/window (Ctrl/Cmd/middle click)
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button === 1) {
      setTimeout(() => {
        isCheckoutInProgress = false;
      }, 2000);
      return;
    }

    e.preventDefault();

    // Allow time for Meta Pixel beacon to dispatch before redirecting
    setTimeout(() => {
      window.location.href = PRODUCT_CHECKOUT_URL;
    }, 200);

    // Safety timeout in case navigation is delayed or cancelled
    setTimeout(() => {
      isCheckoutInProgress = false;
    }, 4000);
  };

  checkoutButtons.forEach(btn => {
    btn.setAttribute('href', PRODUCT_CHECKOUT_URL);
    btn.addEventListener('click', handleCheckoutClick);
  });

  // Reset checkout lock if user navigates back via bfcache
  window.addEventListener('pageshow', (event) => {
    if (event.persisted) {
      isCheckoutInProgress = false;
    }
  });

  /* --------------------------------------------------------------------------
     2. Product Hero Showcase (Single Dedicated Visual)
     -------------------------------------------------------------------------- */
  const mainGalleryView = document.getElementById('main-gallery-view');
  const heroImageItem = [{ 
    src: 'images/promptkit-pro-main.webp', 
    alt: 'PromptKit Pro — 99+ AI Prompts for UGC Ads & Product Visuals' 
  }];

  /* --------------------------------------------------------------------------
     3. Fullscreen Image Lightbox
     -------------------------------------------------------------------------- */
  const lightboxModal = document.getElementById('lightbox-modal');
  const lightboxActiveImg = document.getElementById('lightbox-active-img');
  const lightboxCloseBtn = document.getElementById('lightbox-close-btn');
  const lightboxPrevBtn = document.getElementById('lightbox-prev-btn');
  const lightboxNextBtn = document.getElementById('lightbox-next-btn');

  const previewImages = [
    { src: 'images/Problem-Solution Script on iPhone(1).png', alt: 'Problem-Solution Reels Scripts' },
    { src: 'images/Serum Glow-Up_ Before to After.png', alt: 'Product Visual Glow-Ups' },
    { src: 'images/54 UGC Script Prompts Laptop Promo(1).png', alt: 'UGC Hook & Script Prompts' }
  ];

  let currentLightboxList = galleryImages;
  let activeLightboxIndex = 0;

  const openLightbox = (index, list = null) => {
    if (list) {
      currentLightboxList = list;
    }
    if (index < 0) index = currentLightboxList.length - 1;
    if (index >= currentLightboxList.length) index = 0;
    activeLightboxIndex = index;

    if (lightboxActiveImg) {
      lightboxActiveImg.src = currentLightboxList[activeLightboxIndex].src;
      lightboxActiveImg.alt = currentLightboxList[activeLightboxIndex].alt;
    }
    lightboxModal?.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    lightboxModal?.classList.remove('open');
    document.body.style.overflow = '';
  };

  // Main gallery click opens lightbox
  mainGalleryView?.addEventListener('click', () => {
    openLightbox(0, heroImageItem);
  });

  // Any other card with .lightbox-trigger
  const otherLightboxTriggers = document.querySelectorAll('.lightbox-trigger');
  otherLightboxTriggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      const galleryType = trigger.getAttribute('data-gallery');
      const idxAttr = trigger.getAttribute('data-index');

      if (galleryType === 'preview') {
        const idx = idxAttr !== null ? parseInt(idxAttr, 10) : 0;
        openLightbox(idx, previewImages);
        return;
      }

      const imgSrc = trigger.getAttribute('data-img');
      const foundIdx = galleryImages.findIndex(img => img.src === imgSrc);
      if (foundIdx !== -1) {
        openLightbox(foundIdx, galleryImages);
      } else if (imgSrc && lightboxActiveImg) {
        currentLightboxList = [{ src: imgSrc, alt: 'Preview' }];
        openLightbox(0);
      }
    });
  });

  lightboxCloseBtn?.addEventListener('click', closeLightbox);
  lightboxPrevBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    openLightbox(activeLightboxIndex - 1);
  });
  lightboxNextBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    openLightbox(activeLightboxIndex + 1);
  });

  lightboxModal?.addEventListener('click', (e) => {
    if (e.target === lightboxModal) {
      closeLightbox();
    }
  });

  /* --------------------------------------------------------------------------
     4. Fullscreen Video Modal & Video Proof Registry
     Explicit video registry & order:
     1. Writing_Vitamin_C_serum_hooks_20261002181858.mp4
     2. Writing_portable_mini_blender_hooks_20261002182337.mp4
     3. Writing_mini_blender_hooks_1080p_20261002182131.mp4
     4. denver parfume ad 1_processed.mp4
     5. chashma ad 1_processed.mp4
     6. dji ad 1_processed.mp4
     7. head phone ad 1_processed.mp4
     8. keyboard ad 1_processed (1).mp4
     -------------------------------------------------------------------------- */
  const videoProofList = [
    {
      file: 'assets/videos/Writing_Vitamin_C_serum_hooks_20261002181858.mp4',
      title: 'Vitamin C Serum Hooks',
      category: 'UGC Hook Prompts',
      description: 'Generate scroll-stopping hooks for skincare and beauty products.',
      poster: 'assets/images/poster-vitamin-c-hooks.jpg'
    },
    {
      file: 'assets/videos/Writing_portable_mini_blender_hooks_20261002182337.mp4',
      title: 'Portable Mini Blender Hooks',
      category: 'UGC Hook Prompts',
      description: 'Create attention-grabbing hooks for portable product and lifestyle content.',
      poster: 'assets/images/poster-portable-blender-hooks.jpg'
    },
    {
      file: 'assets/videos/Writing_mini_blender_hooks_1080p_20261002182131.mp4',
      title: 'Mini Blender Hooks',
      category: 'UGC Hook Prompts',
      description: 'Generate engaging UGC hooks for product-focused short-form videos.',
      poster: 'assets/images/poster-mini-blender-hooks.jpg'
    },
    {
      file: 'assets/videos/denver parfume ad 1_processed.mp4',
      title: 'Perfume UGC Video Ad',
      category: 'UGC Ad Concept',
      description: 'High-converting luxury fragrance script with sensory hooks.',
      poster: 'assets/images/poster-perfume.jpg'
    },
    {
      file: 'assets/videos/chashma ad 1_processed.mp4',
      title: 'Eyewear Brand UGC Video',
      category: 'Product Visual',
      description: 'Dynamic lifestyle transitions and aesthetic visual framing.',
      poster: 'assets/images/poster-eyewear.jpg'
    },
    {
      file: 'assets/videos/dji ad 1_processed.mp4',
      title: 'DJI Camera Action Concept',
      category: 'Creative Campaign',
      description: 'Action-packed tech camera promo concept and visual script.',
      poster: 'assets/images/poster-dji.jpg'
    },
    {
      file: 'assets/videos/head phone ad 1_processed.mp4',
      title: 'Headphone Hook Script Ad',
      category: 'UGC Script',
      description: 'Feature-driven audio demo script with strong call-to-action.',
      poster: 'assets/images/poster-headphone.jpg'
    },
    {
      file: 'assets/videos/keyboard ad 1_processed (1).mp4',
      title: 'Gaming Gear Launch Video',
      category: 'Product Photography',
      description: 'High-energy RGB keyboard showcase script and visual scenes.',
      poster: 'assets/images/poster-keyboard.jpg'
    }
  ];

  const videoModal = document.getElementById('video-modal');
  const modalVideoElement = document.getElementById('modal-video-element');
  const videoModalCloseBtn = document.getElementById('video-modal-close-btn');
  const videoTriggers = document.querySelectorAll('.video-modal-trigger');

  const openVideoModal = (videoSrc) => {
    if (!videoModal || !modalVideoElement) return;
    modalVideoElement.src = videoSrc;
    videoModal.classList.add('open');
    document.body.style.overflow = 'hidden';
    modalVideoElement.play().catch(() => {});
  };

  const closeVideoModal = () => {
    if (!videoModal || !modalVideoElement) return;
    videoModal.classList.remove('open');
    modalVideoElement.pause();
    modalVideoElement.currentTime = 0;
    modalVideoElement.src = '';
    document.body.style.overflow = '';
  };

  videoTriggers.forEach(card => {
    card.addEventListener('click', () => {
      const src = card.getAttribute('data-video');
      if (src) openVideoModal(src);
    });
  });

  videoModalCloseBtn?.addEventListener('click', closeVideoModal);
  videoModal?.addEventListener('click', (e) => {
    if (e.target === videoModal) {
      closeVideoModal();
    }
  });

  /* --------------------------------------------------------------------------
     5. Keyboard Navigation (Escape, ArrowLeft, ArrowRight)
     -------------------------------------------------------------------------- */
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (lightboxModal?.classList.contains('open')) closeLightbox();
      if (videoModal?.classList.contains('open')) closeVideoModal();
      if (mobileDrawer?.classList.contains('active')) closeMobileDrawer();
    } else if (e.key === 'ArrowLeft') {
      if (lightboxModal?.classList.contains('open')) {
        openLightbox(activeLightboxIndex - 1);
      }
    } else if (e.key === 'ArrowRight') {
      if (lightboxModal?.classList.contains('open')) {
        openLightbox(activeLightboxIndex + 1);
      }
    }
  });

  /* --------------------------------------------------------------------------
     6. Mobile Drawer Toggle
     -------------------------------------------------------------------------- */
  const mobileToggleBtn = document.getElementById('mobile-toggle-btn');
  const drawerCloseBtn = document.getElementById('drawer-close-btn');
  const mobileOverlay = document.getElementById('mobile-overlay');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const drawerLinks = document.querySelectorAll('.drawer-link');

  const openMobileDrawer = () => {
    mobileDrawer?.classList.add('active');
    mobileOverlay?.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeMobileDrawer = () => {
    mobileDrawer?.classList.remove('active');
    mobileOverlay?.classList.remove('active');
    document.body.style.overflow = '';
  };

  mobileToggleBtn?.addEventListener('click', openMobileDrawer);
  drawerCloseBtn?.addEventListener('click', closeMobileDrawer);
  mobileOverlay?.addEventListener('click', closeMobileDrawer);

  drawerLinks.forEach(link => {
    link.addEventListener('click', closeMobileDrawer);
  });

  /* --------------------------------------------------------------------------
     7. FAQ Accordion (Smooth Accordion behavior)
     -------------------------------------------------------------------------- */
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const button = item.querySelector('.faq-button');
    button?.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close other FAQs for clean single-accordion feel
      faqItems.forEach(other => {
        if (other !== item) {
          other.classList.remove('active');
          other.querySelector('.faq-button')?.setAttribute('aria-expanded', 'false');
        }
      });

      if (isActive) {
        item.classList.remove('active');
        button.setAttribute('aria-expanded', 'false');
      } else {
        item.classList.add('active');
        button.setAttribute('aria-expanded', 'true');
      }
    });
  });

  /* --------------------------------------------------------------------------
     8. Sticky Section Navigation Link Tracking & Smooth Scroll
     -------------------------------------------------------------------------- */
  const navLinks = document.querySelectorAll('.section-nav-link');
  const sections = document.querySelectorAll('section[id]');

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (!href || href === '#') return;

      const targetSection = document.querySelector(href);
      if (targetSection) {
        e.preventDefault();
        const headerOffset = 110; // Combined header + subnav height
        const elementPosition = targetSection.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // Track active section pill on scroll
  const handleSectionScroll = () => {
    const scrollPos = window.pageYOffset + 140;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', handleSectionScroll, { passive: true });

  /* --------------------------------------------------------------------------
     9. Interactive Wishlist Toggle
     -------------------------------------------------------------------------- */
  let wishlistCount = 0;
  let isWishlisted = false;
  const heroWishlistBtn = document.getElementById('hero-wishlist-toggle');
  const wishlistText = document.getElementById('wishlist-btn-text');
  const wishlistBadge = document.getElementById('wishlist-badge');

  heroWishlistBtn?.addEventListener('click', () => {
    isWishlisted = !isWishlisted;
    if (isWishlisted) {
      wishlistCount += 1;
      heroWishlistBtn.classList.add('active');
      if (wishlistText) wishlistText.textContent = "Added to Wishlist ✓";
    } else {
      wishlistCount = Math.max(0, wishlistCount - 1);
      heroWishlistBtn.classList.remove('active');
      if (wishlistText) wishlistText.textContent = "Add to Wishlist";
    }

    if (wishlistBadge) {
      wishlistBadge.textContent = wishlistCount;
    }
  });

  /* --------------------------------------------------------------------------
     10. Search Input Simulation
     -------------------------------------------------------------------------- */
  const searchInput = document.getElementById('product-search');
  searchInput?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const val = searchInput.value.trim().toLowerCase();
      if (val.includes('video') || val.includes('ugc')) {
        document.getElementById('videos')?.scrollIntoView({ behavior: 'smooth' });
      } else if (val.includes('result') || val.includes('image')) {
        document.getElementById('results')?.scrollIntoView({ behavior: 'smooth' });
      } else if (val.includes('faq') || val.includes('price')) {
        document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth' });
      } else {
        document.getElementById('overview')?.scrollIntoView({ behavior: 'smooth' });
      }
    }
  });

  /* --------------------------------------------------------------------------
     11. Flash Sale Countdown Timer (Counts down from 04h : 18m : 30s)
     -------------------------------------------------------------------------- */
  const initCountdown = () => {
    const hoursEl = document.getElementById('cd-hours');
    const minsEl = document.getElementById('cd-mins');
    const secsEl = document.getElementById('cd-secs');
    if (!hoursEl || !minsEl || !secsEl) return;

    // Start countdown from 4 hours, 18 minutes, 30 seconds
    const INITIAL_DURATION_SECS = (4 * 3600) + (18 * 60) + 30;
    const STORAGE_KEY = 'promptkit_flash_deal_deadline_v4';
    
    let deadline = parseInt(localStorage.getItem(STORAGE_KEY), 10);
    const now = Date.now();

    // If deadline does not exist, or has expired, start a fresh deadline from now
    if (!deadline || deadline <= now) {
      deadline = now + (INITIAL_DURATION_SECS * 1000);
      localStorage.setItem(STORAGE_KEY, deadline.toString());
    }

    const updateTimer = () => {
      const remainingMs = Math.max(0, deadline - Date.now());
      let remainingSecs = Math.floor(remainingMs / 1000);

      if (remainingSecs <= 0) {
        deadline = Date.now() + (INITIAL_DURATION_SECS * 1000);
        localStorage.setItem(STORAGE_KEY, deadline.toString());
        remainingSecs = INITIAL_DURATION_SECS;
      }

      const h = Math.floor(remainingSecs / 3600);
      const m = Math.floor((remainingSecs % 3600) / 60);
      const s = remainingSecs % 60;

      hoursEl.textContent = String(h).padStart(2, '0');
      minsEl.textContent = String(m).padStart(2, '0');
      secsEl.textContent = String(s).padStart(2, '0');
    };

    updateTimer();
    setInterval(updateTimer, 1000);
  };
  initCountdown();

  /* --------------------------------------------------------------------------
     12. Mobile Sticky Buy Bar Scroll Behavior
     -------------------------------------------------------------------------- */
  const mobileStickyBar = document.getElementById('mobile-sticky-buy-bar');
  const heroBuyBtn = document.getElementById('hero-buy-btn');

  if (mobileStickyBar && heroBuyBtn) {
    const checkStickyVisibility = () => {
      const rect = heroBuyBtn.getBoundingClientRect();
      const inView = rect.top >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight);
      if (inView) {
        mobileStickyBar.classList.add('hide-sticky');
      } else {
        mobileStickyBar.classList.remove('hide-sticky');
      }
    };
    window.addEventListener('scroll', checkStickyVisibility, { passive: true });
    checkStickyVisibility();
  }
});
