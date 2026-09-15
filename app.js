/**
 * EcoScrap - Modern Responsive Scrap Pickup Web Application
 * Comprehensive Vanilla JavaScript Module
 */

document.addEventListener('DOMContentLoaded', () => {
  // --------------------------------------------------------------------------
  // 1. Data Store: Live Scrap Rate Master
  // --------------------------------------------------------------------------
  const scrapRatesData = [
    { name: 'Old Newspaper (Raddi)', category: 'paper', type: 'Household / Office', rate: 16, unit: 'kg', icon: '📰' },
    { name: 'Cardboard (Corrugated Gatta)', category: 'paper', type: 'Packaging Boxes', rate: 14, unit: 'kg', icon: '📦' },
    { name: 'Office White Paper / Notebooks', category: 'paper', type: 'A4 / College Books', rate: 18, unit: 'kg', icon: '📄' },
    { name: 'Magazines & Glossy Paper', category: 'paper', type: 'Magazines / Catalogues', rate: 12, unit: 'kg', icon: '📑' },
    { name: 'Heavy Iron / Grill / Beams', category: 'metal', type: 'Construction / Grills', rate: 34, unit: 'kg', icon: '🔩' },
    { name: 'Light Iron / Sheet Metal', category: 'metal', type: 'Household Metal', rate: 30, unit: 'kg', icon: '⚙️' },
    { name: 'Pure Copper Wire (Stripped)', category: 'metal', type: 'Electrical Grade 99%', rate: 460, unit: 'kg', icon: '🪙' },
    { name: 'Brass / Peetal Vessels & Taps', category: 'metal', type: 'Utensils & Fittings', rate: 330, unit: 'kg', icon: '🪔' },
    { name: 'Aluminium Section & Utensils', category: 'metal', type: 'Window Frames / Pots', rate: 125, unit: 'kg', icon: '🥣' },
    { name: 'Stainless Steel (SS 304)', category: 'metal', type: 'Kitchenware & Pipes', rate: 48, unit: 'kg', icon: '🍴' },
    { name: 'Split Air Conditioner (1.5 Ton)', category: 'appliance', type: 'Indoor + Outdoor Unit', rate: 4200, unit: 'piece', icon: '❄️' },
    { name: 'Window AC (1.5 Ton)', category: 'appliance', type: 'Complete Copper Coil', rate: 3100, unit: 'piece', icon: '🧊' },
    { name: 'Double Door Refrigerator', category: 'appliance', type: 'Compressor Intact', rate: 1400, unit: 'piece', icon: '🚪' },
    { name: 'Single Door Refrigerator', category: 'appliance', type: 'Domestic Fridge', rate: 950, unit: 'piece', icon: '🥫' },
    { name: 'Automatic Washing Machine', category: 'appliance', type: 'Top / Front Load', rate: 1100, unit: 'piece', icon: '🧺' },
    { name: 'Lead Inverter Battery (150Ah)', category: 'appliance', type: 'Tall Tubular / Inverter', rate: 88, unit: 'kg', icon: '🔋' },
    { name: 'Car / Bike Battery', category: 'appliance', type: 'Automotive Lead-Acid', rate: 82, unit: 'kg', icon: '🚗' },
    { name: 'Computer CPU / Desktop Unit', category: 'appliance', type: 'Cabinet with Motherboard', rate: 280, unit: 'piece', icon: '💻' },
    { name: 'Hard Plastic (Buckets/Chairs)', category: 'plastic', type: 'Rigid Polymers / PP', rate: 18, unit: 'kg', icon: '🪑' },
    { name: 'PET Bottles & Soft Plastic', category: 'plastic', type: 'Clean Crushed Bottles', rate: 14, unit: 'kg', icon: '🧴' },
    { name: 'Glass Bottles / Beer Bottles', category: 'plastic', type: 'Whole / Unbroken', rate: 3.5, unit: 'bottle', icon: '🍾' }
  ];

  // --------------------------------------------------------------------------
  // 2. Mobile Drawer Navigation Controller
  // --------------------------------------------------------------------------
  const menuToggle = document.getElementById('menu-toggle');
  const drawerClose = document.getElementById('drawer-close');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const drawerOverlay = document.getElementById('drawer-overlay');
  const drawerLinks = document.querySelectorAll('.drawer-link, #drawer-book-cta');

  function openMobileMenu() {
    if (!mobileDrawer || !drawerOverlay) return;
    mobileDrawer.classList.add('active');
    drawerOverlay.classList.add('active');
    drawerOverlay.setAttribute('aria-hidden', 'false');
    menuToggle?.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden'; // Lock scroll
  }

  function closeMobileMenu() {
    if (!mobileDrawer || !drawerOverlay) return;
    mobileDrawer.classList.remove('active');
    drawerOverlay.classList.remove('active');
    drawerOverlay.setAttribute('aria-hidden', 'true');
    menuToggle?.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = ''; // Unlock scroll
  }

  menuToggle?.addEventListener('click', openMobileMenu);
  drawerClose?.addEventListener('click', closeMobileMenu);
  drawerOverlay?.addEventListener('click', closeMobileMenu);

  drawerLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeMobileMenu();
    });
  });

  // Handle ESC key to close drawer
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileDrawer?.classList.contains('active')) {
      closeMobileMenu();
    }
  });

  // --------------------------------------------------------------------------
  // 3. Hero Interactive Quick Estimator
  // --------------------------------------------------------------------------
  const heroScrapSelect = document.getElementById('hero-scrap-select');
  const heroWeightSlider = document.getElementById('hero-weight-slider');
  const heroWeightVal = document.getElementById('hero-weight-val');
  const heroPayoutAmount = document.getElementById('hero-payout-amount');
  const heroEstBookBtn = document.getElementById('hero-est-book-btn');

  function updateHeroEstimator() {
    if (!heroScrapSelect || !heroWeightSlider || !heroPayoutAmount || !heroWeightVal) return;
    const ratePerKg = parseFloat(heroScrapSelect.value) || 0;
    const weight = parseInt(heroWeightSlider.value, 10) || 0;
    heroWeightVal.textContent = weight;
    const totalEst = Math.round(ratePerKg * weight);
    heroPayoutAmount.textContent = totalEst.toLocaleString('en-IN');
  }

  heroScrapSelect?.addEventListener('change', updateHeroEstimator);
  heroWeightSlider?.addEventListener('input', updateHeroEstimator);
  updateHeroEstimator();

  heroEstBookBtn?.addEventListener('click', () => {
    // Sync to booking form
    const selectedOption = heroScrapSelect?.options[heroScrapSelect.selectedIndex];
    const itemName = selectedOption?.getAttribute('data-name') || '';
    syncChipSelection(itemName);
  });

  // --------------------------------------------------------------------------
  // 4. Category Filter Tabs in "What We Collect"
  // --------------------------------------------------------------------------
  const categoryFilters = document.querySelectorAll('.category-filters .filter-chip');
  const categoryCards = document.querySelectorAll('.categories-grid .category-card');

  categoryFilters.forEach(chip => {
    chip.addEventListener('click', () => {
      categoryFilters.forEach(c => {
        c.classList.remove('active');
        c.setAttribute('aria-selected', 'false');
      });
      chip.classList.add('active');
      chip.setAttribute('aria-selected', 'true');

      const filterValue = chip.getAttribute('data-filter') || 'all';

      categoryCards.forEach(card => {
        const cardCat = card.getAttribute('data-cat');
        if (filterValue === 'all' || cardCat === filterValue) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Quick Action Links from Category Cards
  const catActionLinks = document.querySelectorAll('.cat-action-link');
  catActionLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const itemName = link.getAttribute('data-item') || '';
      syncChipSelection(itemName);
    });
  });

  function syncChipSelection(name) {
    if (!name) return;
    const chips = document.querySelectorAll('.scrap-chip input[type="checkbox"]');
    chips.forEach(checkbox => {
      if (checkbox.value.toLowerCase().includes(name.toLowerCase().substring(0, 5))) {
        checkbox.checked = true;
      }
    });
    updateLiveSelectionSummary();
  }

  // --------------------------------------------------------------------------
  // 5. Live Scrap Rates Table & Mobile Cards Renderer
  // --------------------------------------------------------------------------
  const ratesTbody = document.getElementById('rates-tbody');
  const mobileRateCardsContainer = document.getElementById('mobile-rate-cards');
  const rateSearchInput = document.getElementById('rate-search-input');
  const rateTabs = document.querySelectorAll('.rate-cat-tabs .rate-tab');

  let currentRateFilter = 'all';
  let currentSearchQuery = '';

  function renderScrapRates() {
    if (!ratesTbody && !mobileRateCardsContainer) return;

    const filtered = scrapRatesData.filter(item => {
      const matchCategory = currentRateFilter === 'all' || item.category === currentRateFilter;
      const matchSearch = item.name.toLowerCase().includes(currentSearchQuery.toLowerCase()) ||
                          item.type.toLowerCase().includes(currentSearchQuery.toLowerCase());
      return matchCategory && matchSearch;
    });

    // Render Desktop Table Rows
    if (ratesTbody) {
      if (filtered.length === 0) {
        ratesTbody.innerHTML = `
          <tr>
            <td colspan="5" style="text-align:center; padding: 32px; color: var(--color-text-muted);">
              No scrap items match your search. Call our helpline for custom quotes.
            </td>
          </tr>
        `;
      } else {
        ratesTbody.innerHTML = filtered.map(item => `
          <tr>
            <td>
              <div class="rate-item-name">
                <span class="rate-item-icon">${item.icon}</span>
                <span>${item.name}</span>
              </div>
            </td>
            <td><span class="cert-pill" style="text-transform:capitalize;">${item.category}</span></td>
            <td style="color: var(--color-text-muted);">${item.type}</td>
            <td><span class="rate-val-tag">₹${item.rate} <small style="font-size:0.75rem; color:var(--color-text-muted);">/ ${item.unit}</small></span></td>
            <td>
              <a href="#book" class="btn-primary btn-rate-book" data-rate-name="${item.name}">
                Book Pickup
              </a>
            </td>
          </tr>
        `).join('');
      }
    }

    // Render Mobile Stacked Cards
    if (mobileRateCardsContainer) {
      if (filtered.length === 0) {
        mobileRateCardsContainer.innerHTML = `
          <div style="text-align:center; padding: 24px; background: var(--color-bg-card); border-radius: var(--radius-md); color: var(--color-text-muted);">
            No scrap items match your query.
          </div>
        `;
      } else {
        mobileRateCardsContainer.innerHTML = filtered.map(item => `
          <div class="mobile-rate-card">
            <div class="mobile-rate-left">
              <span style="font-size: 1.6rem;">${item.icon}</span>
              <div class="mobile-rate-info">
                <span class="mobile-rate-title">${item.name}</span>
                <span class="mobile-rate-cat">${item.type}</span>
              </div>
            </div>
            <div class="mobile-rate-right">
              <span class="mobile-rate-price">₹${item.rate} <small style="font-size:0.75rem; font-weight:500; color:var(--color-text-muted);">/ ${item.unit}</small></span>
              <a href="#book" class="btn-primary" style="padding: 4px 12px; font-size: 0.78rem; min-height: 32px;" data-rate-name="${item.name}">
                Book
              </a>
            </div>
          </div>
        `).join('');
      }
    }

    // Bind book buttons inside rate tables/cards
    document.querySelectorAll('[data-rate-name]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const name = btn.getAttribute('data-rate-name') || '';
        syncChipSelection(name);
      });
    });
  }

  // Rate search handler
  rateSearchInput?.addEventListener('input', (e) => {
    currentSearchQuery = e.target.value.trim();
    renderScrapRates();
  });

  // Rate category tabs handler
  rateTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      rateTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      currentRateFilter = tab.getAttribute('data-tab') || 'all';
      renderScrapRates();
    });
  });

  renderScrapRates();

  // --------------------------------------------------------------------------
  // 6. Interactive Multi-Step Booking Form Wizard
  // --------------------------------------------------------------------------
  const stepPanels = [
    document.getElementById('step-panel-1'),
    document.getElementById('step-panel-2'),
    document.getElementById('step-panel-3')
  ];
  const progSteps = [
    document.getElementById('prog-1'),
    document.getElementById('prog-2'),
    document.getElementById('prog-3')
  ];

  const btnToStep2 = document.getElementById('btn-to-step-2');
  const btnBackTo1 = document.getElementById('btn-back-to-1');
  const btnToStep3 = document.getElementById('btn-to-step-3');
  const btnBackTo2 = document.getElementById('btn-back-to-2');
  const pickupForm = document.getElementById('pickup-form');

  // Sidebar Summary Displays
  const summarySelectedChips = document.getElementById('summary-selected-chips');
  const summaryWeightDisplay = document.getElementById('summary-weight-display');
  const summarySlotDisplay = document.getElementById('summary-slot-display');
  const approxWeightSelect = document.getElementById('approx-weight');
  const pickupDateInput = document.getElementById('pickup-date');
  const pickupSlotSelect = document.getElementById('pickup-slot');

  // Set default date to tomorrow
  if (pickupDateInput) {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const yyyy = tomorrow.getFullYear();
    const mm = String(tomorrow.getMonth() + 1).padStart(2, '0');
    const dd = String(tomorrow.getDate()).padStart(2, '0');
    pickupDateInput.value = `${yyyy}-${mm}-${dd}`;
    pickupDateInput.min = `${yyyy}-${mm}-${dd}`;
  }

  function goToStep(stepIndex) {
    stepPanels.forEach((panel, i) => {
      if (panel) {
        panel.classList.toggle('active', i === stepIndex);
      }
    });

    progSteps.forEach((prog, i) => {
      if (prog) {
        prog.classList.toggle('active', i === stepIndex);
        prog.classList.toggle('completed', i < stepIndex);
      }
    });

    updateLiveSelectionSummary();
  }

  btnToStep2?.addEventListener('click', () => {
    // Validate scrap chips
    const checkedChips = document.querySelectorAll('.scrap-chip input[type="checkbox"]:checked');
    if (checkedChips.length === 0) {
      alert('Please select at least one scrap category to continue.');
      return;
    }
    goToStep(1);
  });

  btnBackTo1?.addEventListener('click', () => goToStep(0));

  btnToStep3?.addEventListener('click', () => {
    const city = document.getElementById('pickup-city');
    const pincode = document.getElementById('pickup-pincode');
    const address = document.getElementById('pickup-address');

    if (!pincode.value || pincode.value.trim().length < 6) {
      alert('Please enter a valid 6-digit Pincode.');
      pincode.focus();
      return;
    }
    if (!address.value || address.value.trim().length < 5) {
      alert('Please enter your complete pickup address.');
      address.focus();
      return;
    }
    goToStep(2);
  });

  btnBackTo2?.addEventListener('click', () => goToStep(1));

  // Live Selection updates
  function updateLiveSelectionSummary() {
    if (!summarySelectedChips) return;
    const checkedBoxes = Array.from(document.querySelectorAll('.scrap-chip input[type="checkbox"]:checked'));
    if (checkedBoxes.length === 0) {
      summarySelectedChips.innerHTML = `<span class="mini-chip" style="background:rgba(239,68,68,0.2); color:#fca5a5;">No items selected</span>`;
    } else {
      summarySelectedChips.innerHTML = checkedBoxes
        .map(cb => `<span class="mini-chip">${cb.value}</span>`)
        .join('');
    }

    if (summaryWeightDisplay && approxWeightSelect) {
      summaryWeightDisplay.textContent = approxWeightSelect.value;
    }

    if (summarySlotDisplay && pickupDateInput && pickupSlotSelect) {
      const dateVal = pickupDateInput.value ? pickupDateInput.value.split('-').reverse().join('/') : 'Tomorrow';
      const slotVal = pickupSlotSelect.value.split(' ')[0] || 'Morning';
      summarySlotDisplay.textContent = `${dateVal}, ${slotVal}`;
    }
  }

  document.querySelectorAll('.scrap-chip input[type="checkbox"]').forEach(cb => {
    cb.addEventListener('change', updateLiveSelectionSummary);
  });
  approxWeightSelect?.addEventListener('change', updateLiveSelectionSummary);
  pickupDateInput?.addEventListener('change', updateLiveSelectionSummary);
  pickupSlotSelect?.addEventListener('change', updateLiveSelectionSummary);
  updateLiveSelectionSummary();

  // Form Submission & Confirmation Modal
  const successModal = document.getElementById('success-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalRefId = document.getElementById('modal-ref-id');
  const modalName = document.getElementById('modal-name');
  const modalSlot = document.getElementById('modal-slot');
  const modalAddress = document.getElementById('modal-address');
  const modalScraps = document.getElementById('modal-scraps');
  const modalWaShare = document.getElementById('modal-wa-share');

  pickupForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const nameInput = document.getElementById('user-name');
    const phoneInput = document.getElementById('user-phone');

    if (!nameInput.value.trim()) {
      alert('Please enter your full name.');
      nameInput.focus();
      return;
    }
    if (!phoneInput.value.trim() || phoneInput.value.trim().length < 10) {
      alert('Please enter a valid 10-digit mobile number.');
      phoneInput.focus();
      return;
    }

    // Generate random booking reference
    const randomRef = '#ES-' + Math.floor(10000 + Math.random() * 90000);
    const selectedScraps = Array.from(document.querySelectorAll('.scrap-chip input[type="checkbox"]:checked'))
      .map(cb => cb.value)
      .join(', ');
    const addressStr = `${document.getElementById('pickup-address').value}, ${document.getElementById('pickup-city').value} - ${document.getElementById('pickup-pincode').value}`;
    const slotStr = `${pickupDateInput.value} (${pickupSlotSelect.value})`;

    if (modalRefId) modalRefId.textContent = randomRef;
    if (modalName) modalName.textContent = nameInput.value;
    if (modalSlot) modalSlot.textContent = slotStr;
    if (modalAddress) modalAddress.textContent = addressStr;
    if (modalScraps) modalScraps.textContent = selectedScraps || 'Household Scrap';

    // Build WhatsApp Deep Link
    const waText = encodeURIComponent(
      `Hello EcoScrap! I have booked a scrap pickup with Ref: ${randomRef}.\n\nName: ${nameInput.value}\nAddress: ${addressStr}\nSlot: ${slotStr}\nItems: ${selectedScraps}\nWeight: ${approxWeightSelect.value}`
    );
    if (modalWaShare) {
      modalWaShare.href = `https://wa.me/919876543210?text=${waText}`;
    }

    // Open Modal
    if (successModal) {
      successModal.classList.add('active');
      successModal.setAttribute('aria-hidden', 'false');
    }
  });

  modalCloseBtn?.addEventListener('click', () => {
    if (successModal) {
      successModal.classList.remove('active');
      successModal.setAttribute('aria-hidden', 'true');
    }
    pickupForm?.reset();
    goToStep(0);
  });

  // --------------------------------------------------------------------------
  // 7. FAQ Accordion Controller (Accessible & Keyboard friendly)
  // --------------------------------------------------------------------------
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    questionBtn?.addEventListener('click', () => {
      const isOpen = item.classList.contains('active');

      // Close all other items for clean UX
      faqItems.forEach(i => {
        i.classList.remove('active');
        i.querySelector('.faq-question')?.setAttribute('aria-expanded', 'false');
      });

      if (!isOpen) {
        item.classList.add('active');
        questionBtn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // --------------------------------------------------------------------------
  // 8. Testimonials Carousel / Slider Controller
  // --------------------------------------------------------------------------
  const track = document.getElementById('testimonials-track');
  const prevBtn = document.getElementById('slider-prev');
  const nextBtn = document.getElementById('slider-next');
  const dotsContainer = document.getElementById('slider-dots');

  let currentSlide = 0;
  const cards = document.querySelectorAll('.testimonial-card');
  const totalCards = cards.length;

  function getCardsPerView() {
    if (window.innerWidth >= 1024) return 3;
    if (window.innerWidth >= 768) return 2;
    return 1;
  }

  function updateSlider() {
    if (!track) return;
    const cardsPerView = getCardsPerView();
    const maxSlide = Math.max(0, totalCards - cardsPerView);
    if (currentSlide > maxSlide) currentSlide = maxSlide;

    const cardWidthPercent = 100 / cardsPerView;
    const offset = currentSlide * cardWidthPercent;
    track.style.transform = `translateX(-${offset}%)`;

    // Update dots
    if (dotsContainer) {
      dotsContainer.innerHTML = '';
      for (let i = 0; i <= maxSlide; i++) {
        const dot = document.createElement('button');
        dot.className = `dot ${i === currentSlide ? 'active' : ''}`;
        dot.setAttribute('aria-label', `Slide ${i + 1}`);
        dot.addEventListener('click', () => {
          currentSlide = i;
          updateSlider();
        });
        dotsContainer.appendChild(dot);
      }
    }
  }

  prevBtn?.addEventListener('click', () => {
    if (currentSlide > 0) {
      currentSlide--;
      updateSlider();
    } else {
      const cardsPerView = getCardsPerView();
      currentSlide = Math.max(0, totalCards - cardsPerView);
      updateSlider();
    }
  });

  nextBtn?.addEventListener('click', () => {
    const cardsPerView = getCardsPerView();
    const maxSlide = Math.max(0, totalCards - cardsPerView);
    if (currentSlide < maxSlide) {
      currentSlide++;
      updateSlider();
    } else {
      currentSlide = 0;
      updateSlider();
    }
  });

  // Touch Swipe for Mobile Carousel
  let startX = 0;
  let endX = 0;

  track?.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
  }, { passive: true });

  track?.addEventListener('touchend', (e) => {
    endX = e.changedTouches[0].clientX;
    const diff = startX - endX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        // Swipe left -> Next
        nextBtn?.click();
      } else {
        // Swipe right -> Prev
        prevBtn?.click();
      }
    }
  }, { passive: true });

  window.addEventListener('resize', updateSlider);
  updateSlider();

  // --------------------------------------------------------------------------
  // 9. Mobile Sticky Action Bar Visibility Controller
  // --------------------------------------------------------------------------
  const mobileStickyBar = document.getElementById('mobile-sticky-bar');
  const finalSubmitBtn = document.getElementById('btn-submit-booking');

  if (mobileStickyBar && finalSubmitBtn) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        // When booking submit is visible in viewport, fade out sticky bar slightly so it doesn't obstruct
        if (entry.isIntersecting) {
          mobileStickyBar.style.opacity = '0.3';
          mobileStickyBar.style.pointerEvents = 'none';
        } else {
          mobileStickyBar.style.opacity = '1';
          mobileStickyBar.style.pointerEvents = 'auto';
        }
      });
    }, { threshold: 0.2 });

    observer.observe(finalSubmitBtn);
  }
});
