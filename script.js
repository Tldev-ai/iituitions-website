/* ========== MOBILE-OPTIMIZED JAVASCRIPT FOR IITUITIONS ========== */

/* ---------- ENHANCED STAR RATINGS (Mobile Touch Optimized) ---------- */
document.addEventListener('DOMContentLoaded', function() {
    // Enhanced star ratings with better mobile performance
    document.querySelectorAll('.stars').forEach(el => {
      const rating = parseFloat(el.getAttribute('data-rating') || '5');
      el.innerHTML = '';
      el.setAttribute('aria-label', `${rating} out of 5 stars`);
      
      // Create stars with better mobile performance
      for (let i = 1; i <= 5; i++) {
        const star = document.createElement('span');
        star.className = 'star';
        star.setAttribute('aria-hidden', 'true');
        
        const fill = Math.max(0, Math.min(1, rating - (i - 1)));
        
        // Use CSS custom properties for better mobile performance
        star.style.setProperty('--star-fill', `${fill * 100}%`);
        star.innerHTML = '⭐';
        
        el.appendChild(star);
      }
    });
  
    /* ---------- MOBILE-OPTIMIZED CONTACT MODAL ---------- */
    const modal = document.getElementById('contactModal');
    if (modal) {
      const openBtns = document.querySelectorAll('[data-open-contact]');
      const closeBtns = document.querySelectorAll('[data-close-contact]');
      const backdrop = modal.querySelector('.modal-backdrop');
      const card = modal.querySelector('.modal-card');
      let isModalOpen = false;
  
      const openModal = () => {
        modal.classList.add('active');
        modal.setAttribute('aria-hidden', 'false');
        isModalOpen = true;
        
        // Prevent body scroll on mobile
        document.body.style.overflow = 'hidden';
        document.body.style.position = 'fixed';
        document.body.style.width = '100%';
        
        // Focus trap for accessibility
        const firstFocusable = modal.querySelector('input, button, textarea');
        if (firstFocusable) firstFocusable.focus();
      };
  
      const closeModal = () => {
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
        isModalOpen = false;
        
        // Restore body scroll
        document.body.style.overflow = '';
        document.body.style.position = '';
        document.body.style.width = '';
      };
  
      // Enhanced event listeners with passive where appropriate
      openBtns.forEach(btn => {
        btn.addEventListener('click', openModal, { passive: true });
      });
      
      closeBtns.forEach(btn => {
        btn.addEventListener('click', closeModal);
      });
      
      if (backdrop) {
        backdrop.addEventListener('click', closeModal);
      }
  
      // Enhanced keyboard handling
      document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && isModalOpen) {
          e.preventDefault();
          closeModal();
        }
      });
  
      // Enhanced mobile scroll prevention
      modal.addEventListener('touchmove', e => {
        if (isModalOpen && !card?.contains(e.target)) {
          e.preventDefault();
        }
      }, { passive: false });
  
      // Enhanced form submission with mobile considerations
      const contactForm = document.getElementById('contactForm');
      if (contactForm) {
        contactForm.addEventListener('submit', e => {
          e.preventDefault();
          
          // Show loading state
          const submitBtn = contactForm.querySelector('button[type="submit"]');
          const originalText = submitBtn.textContent;
          submitBtn.textContent = 'Sending...';
          submitBtn.disabled = true;
          
          // Simulate form submission (replace with actual API call)
          setTimeout(() => {
            alert('Thanks! We will contact you shortly.');
            contactForm.reset();
            closeModal();
            
            // Restore button state
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
          }, 1500);
        });
      }
    }
  
    /* ---------- ENHANCED COPY ADDRESS (Mobile Friendly) ---------- */
    const copyAddressBtn = document.getElementById('copyAddress');
    if (copyAddressBtn) {
      copyAddressBtn.addEventListener('click', async () => {
        const addr = 'IITuitions, Knowledge Park, Financial District, Hyderabad, Telangana, India';
        
        try {
          // Modern clipboard API with fallback
          if (navigator.clipboard && window.isSecureContext) {
            await navigator.clipboard.writeText(addr);
            
            // Enhanced feedback with haptic on mobile
            if (navigator.vibrate) {
              navigator.vibrate(50); // Short vibration on mobile
            }
            
            // Visual feedback
            const originalText = copyAddressBtn.textContent;
            copyAddressBtn.textContent = '✓ Copied!';
            copyAddressBtn.style.background = '#4CAF50';
            
            setTimeout(() => {
              copyAddressBtn.textContent = originalText;
              copyAddressBtn.style.background = '';
            }, 2000);
          } else {
            // Fallback for older mobile browsers
            throw new Error('Clipboard API not supported');
          }
        } catch (error) {
          // Enhanced fallback with better mobile UX
          const textArea = document.createElement('textarea');
          textArea.value = addr;
          textArea.style.position = 'fixed';
          textArea.style.left = '-999999px';
          textArea.style.top = '-999999px';
          document.body.appendChild(textArea);
          textArea.focus();
          textArea.select();
          
          try {
            document.execCommand('copy');
            copyAddressBtn.textContent = '✓ Copied!';
            setTimeout(() => copyAddressBtn.textContent = 'Copy Address', 2000);
          } catch (fallbackError) {
            alert('Address: ' + addr);
          }
          
          document.body.removeChild(textArea);
        }
      }, { passive: true });
    }
  
    /* ---------- FOOTER YEAR AUTO-UPDATE ---------- */
    const yearElement = document.getElementById('yr');
    if (yearElement) {
      yearElement.textContent = new Date().getFullYear();
    }
  
    /* ---------- ENHANCED MOBILE HAMBURGER MENU ---------- */
    function setupMobileMenu() {
      const menu = document.getElementById('mobileMenu');
      const btn = document.querySelector('.hamburger-menu');
      
      if (!menu || !btn) return;
  
      let isMenuOpen = false;
  
      const openMenu = () => {
        menu.classList.add('active');
        btn.classList.add('active');
        isMenuOpen = true;
        
        // Prevent body scroll on mobile
        document.body.style.overflow = 'hidden';
        
        // Enhanced accessibility
        menu.setAttribute('aria-hidden', 'false');
        btn.setAttribute('aria-expanded', 'true');
        
        // Focus first menu item
        const firstLink = menu.querySelector('a');
        if (firstLink) {
          setTimeout(() => firstLink.focus(), 300);
        }
      };
  
      const closeMenu = () => {
        menu.classList.remove('active');
        btn.classList.remove('active');
        isMenuOpen = false;
        
        // Restore body scroll
        document.body.style.overflow = '';
        
        // Enhanced accessibility
        menu.setAttribute('aria-hidden', 'true');
        btn.setAttribute('aria-expanded', 'false');
      };
  
      const toggleMenu = () => {
        if (isMenuOpen) {
          closeMenu();
        } else {
          openMenu();
        }
      };
  
      // Enhanced button event with haptic feedback
      btn.addEventListener('click', e => {
        e.stopPropagation();
        e.preventDefault();
        
        // Haptic feedback on mobile
        if (navigator.vibrate) {
          navigator.vibrate(30);
        }
        
        toggleMenu();
      });
  
      // Enhanced outside click detection
      document.addEventListener('click', e => {
        if (isMenuOpen && !menu.contains(e.target) && !btn.contains(e.target)) {
          closeMenu();
        }
      }, { passive: true });
  
      // Enhanced keyboard navigation
      document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && isMenuOpen) {
          e.preventDefault();
          closeMenu();
          btn.focus(); // Return focus to hamburger button
        }
      });
  
      // Close menu when clicking links with enhanced UX
      menu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', e => {
          // Add small delay for visual feedback
          setTimeout(() => {
            closeMenu();
          }, 100);
        }, { passive: true });
      });
  
      // Enhanced swipe to close (mobile gesture)
      let startY = 0;
      let startX = 0;
      
      menu.addEventListener('touchstart', e => {
        startY = e.touches[0].clientY;
        startX = e.touches[0].clientX;
      }, { passive: true });
      
      menu.addEventListener('touchend', e => {
        const endY = e.changedTouches[0].clientY;
        const endX = e.changedTouches[0].clientX;
        const deltaY = startY - endY;
        const deltaX = Math.abs(startX - endX);
        
        // Swipe up to close (common mobile gesture)
        if (deltaY > 50 && deltaX < 100) {
          closeMenu();
        }
      }, { passive: true });
    }
  
    setupMobileMenu();
  
    /* ---------- ENHANCED HORIZONTAL SCROLL WITH BETTER MOBILE UX ---------- */
    function enhanceHorizontalScrolling() {
      const scrollContainers = document.querySelectorAll('.h-scroll');
      
      scrollContainers.forEach(container => {
        let isDown = false;
        let startX = 0;
        let startScrollLeft = 0;
        let hasMoved = false;
        let animationFrame = null;
        let velocity = 0;
        let lastX = 0;
        let lastTime = 0;
  
        // Enhanced momentum scrolling for better mobile feel
        const applyMomentum = () => {
          if (Math.abs(velocity) > 0.1) {
            container.scrollLeft += velocity;
            velocity *= 0.95; // Friction
            requestAnimationFrame(applyMomentum);
          }
        };
  
        const handleStart = (clientX) => {
          isDown = true;
          hasMoved = false;
          startX = clientX;
          startScrollLeft = container.scrollLeft;
          lastX = clientX;
          lastTime = Date.now();
          velocity = 0;
          
          container.classList.add('is-dragging');
          container.style.cursor = 'grabbing';
          container.style.userSelect = 'none';
        };
  
        const handleMove = (clientX) => {
          if (!isDown) return;
          
          const currentTime = Date.now();
          const deltaTime = currentTime - lastTime;
          const deltaX = clientX - lastX;
          
          if (deltaTime > 0) {
            velocity = deltaX / deltaTime * 16; // Convert to 60fps
          }
          
          const distance = clientX - startX;
          if (Math.abs(distance) > 3) {
            hasMoved = true;
          }
          
          const newScrollLeft = startScrollLeft - distance;
          
          if (animationFrame) {
            cancelAnimationFrame(animationFrame);
          }
          
          animationFrame = requestAnimationFrame(() => {
            container.scrollLeft = newScrollLeft;
            animationFrame = null;
          });
          
          lastX = clientX;
          lastTime = currentTime;
        };
  
        const handleEnd = () => {
          if (!isDown) return;
          
          isDown = false;
          container.classList.remove('is-dragging');
          container.style.cursor = '';
          container.style.userSelect = '';
          
          // Apply momentum if there's enough velocity
          if (Math.abs(velocity) > 1) {
            applyMomentum();
          }
        };
  
        // Mouse events
        container.addEventListener('mousedown', e => {
          e.preventDefault();
          handleStart(e.clientX);
        });
  
        window.addEventListener('mousemove', e => {
          if (isDown) {
            e.preventDefault();
            handleMove(e.clientX);
          }
        });
  
        window.addEventListener('mouseup', handleEnd);
  
        // Enhanced touch events with better performance
        container.addEventListener('touchstart', e => {
          if (e.touches.length === 1) {
            handleStart(e.touches[0].clientX);
          }
        }, { passive: true });
  
        container.addEventListener('touchmove', e => {
          if (e.touches.length === 1) {
            handleMove(e.touches[0].clientX);
          }
        }, { passive: true });
  
        container.addEventListener('touchend', e => {
          if (e.changedTouches.length === 1) {
            handleEnd();
          }
        }, { passive: true });
  
        // Prevent click events after dragging
        container.addEventListener('click', e => {
          if (hasMoved) {
            e.preventDefault();
            e.stopPropagation();
          }
          hasMoved = false;
        }, true);
  
        // Enhanced scroll indicators for mobile
        const updateScrollIndicators = () => {
          const isAtStart = container.scrollLeft <= 10;
          const isAtEnd = container.scrollLeft >= container.scrollWidth - container.clientWidth - 10;
          
          container.classList.toggle('scroll-start', isAtStart);
          container.classList.toggle('scroll-end', isAtEnd);
        };
  
        container.addEventListener('scroll', updateScrollIndicators, { passive: true });
        updateScrollIndicators(); // Initial state
      });
    }
  
    enhanceHorizontalScrolling();
  
    /* ---------- ENHANCED SMOOTH ANCHOR SCROLLING (Mobile Optimized) ---------- */
    function setupSmoothScrolling() {
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', e => {
          const targetId = anchor.getAttribute('href');
          
          if (targetId.length > 1) {
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
              e.preventDefault();
              
              // Enhanced smooth scrolling with mobile considerations
              const headerHeight = document.querySelector('.site-header')?.offsetHeight || 0;
              const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
              
              // Use modern scroll API with fallback
              if ('scrollBehavior' in document.documentElement.style) {
                window.scrollTo({
                  top: targetPosition,
                  behavior: 'smooth'
                });
              } else {
                // Fallback for older mobile browsers
                const startPosition = window.pageYOffset;
                const distance = targetPosition - startPosition;
                const duration = Math.min(Math.abs(distance) / 2, 800); // Max 800ms
                let start = null;
                
                const animateScroll = (timestamp) => {
                  if (!start) start = timestamp;
                  const progress = timestamp - start;
                  const progressPercentage = Math.min(progress / duration, 1);
                  
                  // Easing function for smooth animation
                  const ease = progressPercentage < 0.5 
                    ? 2 * progressPercentage * progressPercentage 
                    : 1 - Math.pow(-2 * progressPercentage + 2, 2) / 2;
                  
                  window.scrollTo(0, startPosition + distance * ease);
                  
                  if (progress < duration) {
                    requestAnimationFrame(animateScroll);
                  }
                };
                
                requestAnimationFrame(animateScroll);
              }
              
              // Enhanced focus management for accessibility
              setTimeout(() => {
                targetElement.focus({ preventScroll: true });
                targetElement.setAttribute('tabindex', '-1');
              }, 300);
            }
          }
        }, { passive: false });
      });
    }
  
    setupSmoothScrolling();
  
    /* ---------- MOBILE PERFORMANCE OPTIMIZATIONS ---------- */
    
    // Lazy loading for images
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) {
              img.src = img.dataset.src;
              img.removeAttribute('data-src');
              observer.unobserve(img);
            }
          }
        });
      });
  
      document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
      });
    }
  
    // Enhanced resize handling with debouncing
    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        // Recalculate layouts after resize
        document.querySelectorAll('.h-scroll').forEach(container => {
          container.style.scrollBehavior = 'auto';
          setTimeout(() => {
            container.style.scrollBehavior = 'smooth';
          }, 100);
        });
      }, 250);
    }, { passive: true });
  
    // Viewport height fix for mobile browsers
    function setViewportHeight() {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    }
    
    setViewportHeight();
    window.addEventListener('resize', setViewportHeight, { passive: true });
    window.addEventListener('orientationchange', () => {
      setTimeout(setViewportHeight, 100);
    }, { passive: true });
  
  });
  
  /* ---------- SERVICE WORKER REGISTRATION (Progressive Web App) ---------- */
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js')
        .then(registration => {
          console.log('SW registered: ', registration);
        })
        .catch(registrationError => {
          console.log('SW registration failed: ', registrationError);
        });
    });
  }
