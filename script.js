(function () {
  "use strict";

  var WA_NUMBER = "923056509572";
  var BRAND_NAME = "عمران جھنڈیر";
  // Set your email here — contact form & review notifications go here (free via FormSubmit.co)
  var OWNER_EMAIL = "";
  var REVIEWS_KEY = "neel-pottery-reviews";
  var SALES_KEY = "neel-pottery-sales";
  // Optional: Supabase for reviews visible to all visitors (free at supabase.com)
  // Create a "reviews" table with columns: name (text), city (text), text (text), rating (int)
  var SUPABASE_URL = "";
  var SUPABASE_ANON_KEY = "";
  var SEED_REVIEWS = [
    { name: "Ayesha Khan", city: "Lahore", rating: 5, text: "Ordered the peacock plate for my living room — the colours are even more vivid in person. Arrived safely packed and exactly as shown on the website." },
    { name: "Hassan Raza", city: "Karachi", rating: 5, text: "Bought the rearing horse statue as a gift for my father. Genuine Multan craftsmanship — he loved it. COD delivery was smooth and on time." },
    { name: "Fatima Siddiqui", city: "Islamabad", rating: 5, text: "The blue and white floral jar is stunning on my bookshelf. Hand-painted details are flawless. Will definitely order more pieces from عمران جھنڈیر." },
    { name: "Bilal Ahmed", city: "Multan", rating: 5, text: "Being from Multan myself, I can confirm this is authentic blue pottery. The Multani motif vases with yellow highlights are a perfect set for the mantel." },
    { name: "Sana Malik", city: "Faisalabad", rating: 4, text: "Beautiful checkered miniature vases — lovely addition to my dining table. Took a day longer than expected but worth the wait. Quality is excellent." },
    { name: "Usman Tariq", city: "Rawalpindi", rating: 5, text: "WhatsApp ordering was super easy. Got the vibrant multi-color floral vases — both pieces are identical and the bird motifs are intricate. Highly recommend." },
    { name: "Nadia Hussain", city: "Peshawar", rating: 5, text: "Sent the elegant Multani floral vase to my sister for her wedding. She said it was the most unique gift she received. Packaging kept it perfectly safe." },
    { name: "Imran Shah", city: "Sialkot", rating: 5, text: "Classic blue and orange floral vases look amazing on our console table. True handmade feel — you can see the brush strokes. Great value for the price." },
    { name: "Rabia Noor", city: "Gujranwala", rating: 5, text: "Third order from this shop! The traditional floral jar is my favourite so far. Colours stay true and the glaze has a beautiful shine." },
    { name: "Kamran Ali", city: "Hyderabad", rating: 4, text: "Peacock plate is a showstopper on our wall. One small glaze variation on the edge but that actually proves it's handmade. Very happy overall." },
    { name: "Zainab Qureshi", city: "Bahawalpur", rating: 5, text: "Ordered two vase sets for Eid gifts — everyone asked where I got them. Fast response on WhatsApp and honest pricing with no hidden charges." },
    { name: "Tariq Mehmood", city: "Sargodha", rating: 5, text: "The horse figurine is a conversation starter. Sturdy ceramic, rich cobalt blue, and the green pattern at the base is beautifully done. 10/10." },
    { name: "Hina Farooq", city: "Abbottabad", rating: 5, text: "Love supporting local artisans. The yellow-green motif vases brighten up my kitchen shelf. Delivery to northern areas was hassle-free with COD." },
    { name: "Asad Javed", city: "Quetta", rating: 5, text: "Was skeptical ordering pottery online but it arrived double-boxed with zero damage. The multi-color floral vases are even prettier than the photos." },
    { name: "Maryam Iqbal", city: "Lahore", rating: 5, text: "Bought the floral jar and single vase together — they complement each other perfectly. Authentic Mumtazabad work, not mass-produced junk." },
    { name: "Faisal Butt", city: "Karachi", rating: 4, text: "Great products and responsive seller. Vases are gorgeous. Only wish there were more plate designs — would buy again in a heartbeat." },
    { name: "Sadia Akram", city: "Murree", rating: 5, text: "Perfect souvenir from Multan without travelling! The checkered vase pair sits on our hotel reception desk and guests always compliment them." },
    { name: "Waqas Nadeem", city: "Islamabad", rating: 5, text: "Corporate gift order of 6 pieces for clients — all delivered on schedule. Professional packaging and each item matched the website description." },
    { name: "Amna Sheikh", city: "Multan", rating: 5, text: "Visited Mumtazabad workshops before and this online shop delivers the same quality. The blue-orange vase pair is my dining room centrepiece now." },
    { name: "Omar Farooq", city: "Faisalabad", rating: 5, text: "COD made it easy to trust a first-time purchase. Horse statue is solid, well-glazed, and the Urdu branding on the special edition is a nice touch." },
    { name: "Kiran Bibi", city: "Rawalpindi", rating: 5, text: "My mother collects blue pottery and she approved immediately! The peacock plate detail is incredible — every feather is hand-painted with care." },
    { name: "Javed Anwar", city: "Lahore", rating: 5, text: "Ordered for home décor renovation. All three vase sets arrived intact. Rich colours, traditional patterns, and fair prices compared to market shops." },
    { name: "Mehwish Tariq", city: "Peshawar", rating: 4, text: "Lovely craftsmanship on the elegant floral vase. Slightly smaller than I imagined but that's on me for not checking dimensions. Still a beautiful piece." },
    { name: "Shahid Mahmood", city: "Karachi", rating: 5, text: "Repeat customer — bought the floral jar last month and just got the multi-color vases. Consistent quality every time. عمران جھنڈیر is the real deal." },
    { name: "Noreen Abbas", city: "Sialkot", rating: 5, text: "Gifted the rearing horse to my boss — he displays it in his office proudly. Premium look without the premium boutique price. Shukriya!" }
  ];
  var cart = [];

  function $(sel) { return document.querySelector(sel); }
  function $$(sel) { return document.querySelectorAll(sel); }

  function formatPrice(n) {
    return "Rs. " + n.toLocaleString("en-PK");
  }

  function recordSale(cartItems) {
    if (!cartItems || !cartItems.length) return;
    var stored = [];
    try {
      var raw = localStorage.getItem(SALES_KEY);
      stored = raw ? JSON.parse(raw) : [];
    } catch (e) {
      stored = [];
    }

    var items = [];
    var total = 0;
    for (var i = 0; i < cartItems.length; i++) {
      items.push({
        name: cartItems[i].name,
        qty: cartItems[i].qty,
        price: cartItems[i].price
      });
      total += cartItems[i].price * cartItems[i].qty;
    }

    var order = {
      id: "ORD-" + (1031 + stored.length),
      date: new Date().toISOString().split("T")[0],
      customer: "WhatsApp Customer",
      city: "Pakistan",
      items: items,
      total: total,
      status: "Processing"
    };

    stored.unshift(order);
    try {
      localStorage.setItem(SALES_KEY, JSON.stringify(stored));
    } catch (e) {}
  }

  function showToast(msg) {
    var toast = $("#toast");
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add("show");
    setTimeout(function () { toast.classList.remove("show"); }, 3000);
  }

  function findCartItem(id) {
    for (var i = 0; i < cart.length; i++) {
      if (cart[i].id === id) return cart[i];
    }
    return null;
  }

  function renderCartItems() {
    var cartItemsEl = $("#cart-items");
    var cartEmptyEl = $("#cart-empty");
    var cartFooterEl = $("#cart-footer");
    if (!cartItemsEl) return;

    if (cart.length === 0) {
      cartItemsEl.innerHTML = '<p class="cart-empty" id="cart-empty">Your cart is empty</p>';
      if (cartFooterEl) cartFooterEl.setAttribute("hidden", "");
      return;
    }

    if (cartFooterEl) cartFooterEl.removeAttribute("hidden");

    var html = "";
    for (var i = 0; i < cart.length; i++) {
      var item = cart[i];
      html += '<div class="cart-item" data-id="' + item.id + '">' +
        '<div class="cart-item-img cart-item-img--placeholder"></div>' +
        '<div class="cart-item-info">' +
        '<h4>' + item.name + '</h4>' +
        '<span class="cart-item-price">' + formatPrice(item.price) + '</span>' +
        '<div class="cart-item-qty">' +
        '<button type="button" class="qty-minus" aria-label="Decrease">−</button>' +
        '<span>' + item.qty + '</span>' +
        '<button type="button" class="qty-plus" aria-label="Increase">+</button>' +
        '</div>' +
        '<button type="button" class="cart-item-remove">Remove</button>' +
        '</div></div>';
    }
    cartItemsEl.innerHTML = html;

    var minusBtns = cartItemsEl.querySelectorAll(".qty-minus");
    for (var j = 0; j < minusBtns.length; j++) {
      minusBtns[j].addEventListener("click", onQtyMinus);
    }
    var plusBtns = cartItemsEl.querySelectorAll(".qty-plus");
    for (var k = 0; k < plusBtns.length; k++) {
      plusBtns[k].addEventListener("click", onQtyPlus);
    }
    var removeBtns = cartItemsEl.querySelectorAll(".cart-item-remove");
    for (var m = 0; m < removeBtns.length; m++) {
      removeBtns[m].addEventListener("click", onRemoveItem);
    }
  }

  function onQtyMinus(e) {
    var row = e.currentTarget.closest(".cart-item");
    if (!row) return;
    var id = row.getAttribute("data-id");
    var item = findCartItem(id);
    if (!item) return;
    if (item.qty > 1) item.qty--;
    else {
      for (var i = 0; i < cart.length; i++) {
        if (cart[i].id === id) { cart.splice(i, 1); break; }
      }
    }
    updateCartUI();
  }

  function onQtyPlus(e) {
    var row = e.currentTarget.closest(".cart-item");
    if (!row) return;
    var item = findCartItem(row.getAttribute("data-id"));
    if (item) item.qty++;
    updateCartUI();
  }

  function onRemoveItem(e) {
    var row = e.currentTarget.closest(".cart-item");
    if (!row) return;
    var id = row.getAttribute("data-id");
    for (var i = 0; i < cart.length; i++) {
      if (cart[i].id === id) { cart.splice(i, 1); break; }
    }
    updateCartUI();
    showToast("Item removed from cart");
  }

  function updateCartUI() {
    var cartCountEl = $("#cart-count");
    var cartTotalEl = $("#cart-total");
    var totalItems = 0;
    var totalPrice = 0;

    for (var i = 0; i < cart.length; i++) {
      totalItems += cart[i].qty;
      totalPrice += cart[i].price * cart[i].qty;
    }

    if (cartCountEl) {
      cartCountEl.textContent = totalItems;
      cartCountEl.style.display = totalItems > 0 ? "flex" : "none";
    }
    if (cartTotalEl) cartTotalEl.textContent = formatPrice(totalPrice);

    renderCartItems();
  }

  function closeNav() {
    var mobileMenu = $("#mobile-menu");
    var navToggle = $(".nav-toggle");
    if (mobileMenu) {
      mobileMenu.classList.remove("open");
      mobileMenu.setAttribute("aria-hidden", "true");
    }
    if (navToggle) {
      navToggle.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
      navToggle.setAttribute("aria-label", "Open menu");
    }
    document.body.classList.remove("menu-open");
    if (!document.body.classList.contains("cart-open")) {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
    }
  }

  function openNav() {
    closeCart();
    var mobileMenu = $("#mobile-menu");
    var navToggle = $(".nav-toggle");
    if (mobileMenu) {
      mobileMenu.classList.add("open");
      mobileMenu.setAttribute("aria-hidden", "false");
    }
    if (navToggle) {
      navToggle.classList.add("open");
      navToggle.setAttribute("aria-expanded", "true");
      navToggle.setAttribute("aria-label", "Close menu");
    }
    document.body.classList.add("menu-open");
    document.body.style.overflow = "hidden";
  }

  function openCart() {
    closeNav();
    var drawer = $("#cart-drawer");
    var overlay = $("#cart-overlay");
    if (drawer) drawer.classList.add("open");
    if (overlay) overlay.classList.add("open");
    document.body.classList.add("cart-open");
    document.body.style.overflow = "hidden";
  }

  function closeCart() {
    var drawer = $("#cart-drawer");
    var overlay = $("#cart-overlay");
    if (drawer) drawer.classList.remove("open");
    if (overlay) overlay.classList.remove("open");
    document.body.classList.remove("cart-open");
    if (!document.body.classList.contains("menu-open")) {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
    }
  }

  function setFilter(filter) {
    var filterBtns = $$(".filter-btn");
    for (var i = 0; i < filterBtns.length; i++) {
      filterBtns[i].classList.toggle("active", filterBtns[i].getAttribute("data-filter") === filter);
    }
    var cards = $$(".product-card");
    for (var j = 0; j < cards.length; j++) {
      var cat = cards[j].getAttribute("data-category");
      cards[j].classList.toggle("hidden", filter !== "all" && cat !== filter);
    }
  }

  function escapeHtml(str) {
    var div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
  }

  function getReviews() {
    try {
      var stored = localStorage.getItem(REVIEWS_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      return [];
    }
  }

  function getDisplayReviews() {
    var userReviews = getReviews();
    return userReviews.length ? userReviews.concat(SEED_REVIEWS) : SEED_REVIEWS;
  }

  function saveReviews(reviews) {
    localStorage.setItem(REVIEWS_KEY, JSON.stringify(reviews));
  }

  function fetchReviewsFromCloud(callback) {
    if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
      callback(getDisplayReviews());
      return;
    }
    fetch(SUPABASE_URL + "/rest/v1/reviews?select=*&order=created_at.desc", {
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: "Bearer " + SUPABASE_ANON_KEY
      }
    })
      .then(function (res) { return res.ok ? res.json() : []; })
      .then(function (data) { callback(data.length ? data : getDisplayReviews()); })
      .catch(function () { callback(getDisplayReviews()); });
  }

  function submitReviewToCloud(review, callback) {
    if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
      var reviews = getReviews();
      reviews.unshift(review);
      saveReviews(reviews);
      callback(true, getDisplayReviews());
      return;
    }
    fetch(SUPABASE_URL + "/rest/v1/reviews", {
      method: "POST",
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: "Bearer " + SUPABASE_ANON_KEY,
        "Content-Type": "application/json",
        Prefer: "return=representation"
      },
      body: JSON.stringify({
        name: review.name,
        city: review.city,
        text: review.text,
        rating: review.rating
      })
    })
      .then(function (res) {
        if (!res.ok) throw new Error("failed");
        return res.json();
      })
      .then(function () {
        fetchReviewsFromCloud(function (reviews) { callback(true, reviews); });
      })
      .catch(function () {
        var reviews = getReviews();
        reviews.unshift(review);
        saveReviews(reviews);
        callback(true, getDisplayReviews());
      });
  }

  function notifyOwnerReview(review) {
    var payload = {
      name: review.name,
      city: review.city,
      rating: review.rating + " stars",
      message: review.text,
      _subject: "New review on " + BRAND_NAME + " website"
    };
    if (OWNER_EMAIL) {
      fetch("https://formsubmit.co/ajax/" + encodeURIComponent(OWNER_EMAIL), {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload)
      }).catch(function () {});
    }
  }

  function renderStars(count) {
    var stars = "";
    for (var i = 1; i <= 5; i++) {
      stars += i <= count ? "★" : "☆";
    }
    return stars;
  }

  function renderReviews(reviews) {
    var grid = $("#reviews-grid");
    var emptyEl = $("#reviews-empty");
    var summaryEl = $("#reviews-summary");
    if (!grid) return;

    if (!reviews || reviews.length === 0) {
      grid.innerHTML = "";
      if (emptyEl) emptyEl.style.display = "block";
      if (summaryEl) summaryEl.innerHTML = "";
      return;
    }

    if (emptyEl) emptyEl.style.display = "none";

    var totalRating = 0;
    var html = "";
    for (var i = 0; i < reviews.length; i++) {
      var r = reviews[i];
      totalRating += r.rating;
      html += '<div class="review-card reveal">' +
        '<div class="review-stars">' + renderStars(r.rating) + '</div>' +
        '<p>"' + escapeHtml(r.text) + '"</p>' +
        '<footer><strong>' + escapeHtml(r.name) + '</strong> · ' + escapeHtml(r.city) + '</footer>' +
        '</div>';
    }
    grid.innerHTML = html;

    if (summaryEl) {
      var avg = (totalRating / reviews.length).toFixed(1);
      summaryEl.innerHTML = renderStars(Math.round(totalRating / reviews.length)) +
        ' <span>' + avg + ' average · ' + reviews.length + ' review' + (reviews.length === 1 ? '' : 's') + '</span>';
    }
  }

  function initReviews() {
    var reviewForm = $("#review-form");
    var starRating = $("#star-rating");
    var selectedRating = 0;

    fetchReviewsFromCloud(renderReviews);

    if (starRating) {
      var starBtns = starRating.querySelectorAll("button");
      for (var s = 0; s < starBtns.length; s++) {
        starBtns[s].addEventListener("click", function () {
          selectedRating = parseInt(this.getAttribute("data-rating"), 10);
          for (var b = 0; b < starBtns.length; b++) {
            starBtns[b].classList.toggle("active", parseInt(starBtns[b].getAttribute("data-rating"), 10) <= selectedRating);
          }
        });
      }
    }

    if (reviewForm) {
      reviewForm.addEventListener("submit", function (e) {
        e.preventDefault();
        var nameEl = $("#review-name");
        var cityEl = $("#review-city");
        var textEl = $("#review-text");
        var fb = $("#review-feedback");

        if (!selectedRating) {
          showToast("Please select a star rating");
          return;
        }
        if (!nameEl || !nameEl.value.trim() || !cityEl || !cityEl.value.trim() || !textEl || !textEl.value.trim()) {
          showToast("Please fill in all fields");
          return;
        }

        var review = {
          name: nameEl.value.trim(),
          city: cityEl.value.trim(),
          text: textEl.value.trim(),
          rating: selectedRating,
          date: new Date().toISOString()
        };

        var btn = reviewForm.querySelector('button[type="submit"]');
        var origText = btn.textContent;
        btn.disabled = true;
        btn.textContent = "Submitting...";

        submitReviewToCloud(review, function (ok, reviews) {
          if (ok) {
            renderReviews(reviews);
            notifyOwnerReview(review);
            reviewForm.reset();
            selectedRating = 0;
            if (starRating) {
              var btns = starRating.querySelectorAll("button");
              for (var i = 0; i < btns.length; i++) btns[i].classList.remove("active");
            }
            if (fb) fb.textContent = "Thank you! Your review has been posted.";
            showToast("Review submitted — thank you!");
            setTimeout(function () { if (fb) fb.textContent = ""; }, 5000);
          } else {
            showToast("Could not submit review — try again");
          }
          btn.textContent = origText;
          btn.disabled = false;
        });
      });
    }
  }

  function sendContactMessage(data, callback) {
    var payload = {
      name: data.name,
      phone: data.phone,
      subject: data.subject,
      message: data.message,
      _subject: "New message from " + BRAND_NAME + " website",
      _template: "table"
    };

    if (OWNER_EMAIL) {
      fetch("https://formsubmit.co/ajax/" + encodeURIComponent(OWNER_EMAIL), {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload)
      })
        .then(function (res) {
          if (res.ok) callback(true);
          else callback(false);
        })
        .catch(function () { callback(false); });
      return;
    }

    var waMsg = "New website message from " + BRAND_NAME + ":\n\n" +
      "Name: " + data.name + "\n" +
      "Phone: " + data.phone + "\n" +
      "Subject: " + data.subject + "\n\n" +
      data.message;
    window.open("https://wa.me/" + WA_NUMBER + "?text=" + encodeURIComponent(waMsg), "_blank");
    callback(true);
  }

  function handleProductImageError(img) {
    var tried = img.getAttribute("data-tried") || "";
    var src = img.getAttribute("src") || "";

    if (tried.indexOf("png") === -1 && /\.jpe?g$/i.test(src)) {
      img.setAttribute("data-tried", tried + " png");
      img.src = src.replace(/\.jpe?g$/i, ".png");
      return;
    }
    if (tried.indexOf("jpg") === -1 && /\.png$/i.test(src)) {
      img.setAttribute("data-tried", tried + " jpg");
      img.src = src.replace(/\.png$/i, ".jpg");
      return;
    }

    var wrap = img.closest(".product-img");
    if (!wrap || wrap.classList.contains("product-img--placeholder")) return;

    img.remove();
    wrap.classList.add("product-img--placeholder");
    wrap.setAttribute("aria-label", "Product image placeholder");
    var span = document.createElement("span");
    span.textContent = "Add image";
    wrap.appendChild(span);
  }

  function initProductImages() {
    var imgs = $$(".product-img img");
    for (var i = 0; i < imgs.length; i++) {
      imgs[i].addEventListener("error", function () {
        handleProductImageError(this);
      });
    }
  }

  function init() {
    var header = $(".site-header");
    var navToggle = $(".nav-toggle");
    var mobileMenu = $("#mobile-menu");
    var mobileMenuClose = $("#mobile-menu-close");
    var mobileMenuBackdrop = $("#mobile-menu-backdrop");
    var navItems = $$("[data-nav]");
    var cartToggle = $("#cart-toggle");
    var cartClose = $("#cart-close");
    var cartOverlay = $("#cart-overlay");
    var checkoutBtn = $("#checkout-btn");
    var clearCartBtn = $("#clear-cart");
    var contactForm = $("#contact-form");

    function handleCartOpen(e) {
      if (e) { e.preventDefault(); e.stopPropagation(); }
      openCart();
    }

    // Cart open / close
    if (cartToggle) {
      cartToggle.addEventListener("click", handleCartOpen);
    }
    if (cartClose) {
      cartClose.addEventListener("click", function (e) {
        e.preventDefault();
        closeCart();
      });
    }
    if (cartOverlay) {
      cartOverlay.addEventListener("click", closeCart);
    }

    // Mobile menu
    function handleMenuToggle(e) {
      if (e) e.preventDefault();
      if (mobileMenu && mobileMenu.classList.contains("open")) {
        closeNav();
      } else {
        openNav();
      }
    }

    if (navToggle) {
      navToggle.addEventListener("click", handleMenuToggle);
    }
    if (mobileMenuClose) {
      mobileMenuClose.addEventListener("click", function (e) {
        e.preventDefault();
        closeNav();
      });
    }
    if (mobileMenuBackdrop) {
      mobileMenuBackdrop.addEventListener("click", closeNav);
    }

    for (var n = 0; n < navItems.length; n++) {
      navItems[n].addEventListener("click", closeNav);
    }

    // Header scroll
    window.addEventListener("scroll", function () {
      if (header) header.classList.toggle("scrolled", window.scrollY > 30);
    });

    // Filters
    var filterBtns = $$(".filter-btn");
    for (var f = 0; f < filterBtns.length; f++) {
      filterBtns[f].addEventListener("click", function () {
        setFilter(this.getAttribute("data-filter"));
      });
    }
    var catCards = $$(".cat-card");
    for (var c = 0; c < catCards.length; c++) {
      catCards[c].addEventListener("click", function (e) {
        e.preventDefault();
        setFilter(this.getAttribute("data-filter"));
        var shop = $("#shop");
        if (shop) shop.scrollIntoView({ behavior: "smooth" });
      });
    }
    var filterLinks = $$("[data-filter-link]");
    for (var fl = 0; fl < filterLinks.length; fl++) {
      filterLinks[fl].addEventListener("click", function (e) {
        e.preventDefault();
        setFilter(this.getAttribute("data-filter-link"));
        var shop = $("#shop");
        if (shop) shop.scrollIntoView({ behavior: "smooth" });
      });
    }

    // Add to cart
    var addBtns = $$(".add-to-cart");
    for (var a = 0; a < addBtns.length; a++) {
      addBtns[a].addEventListener("click", function () {
        var card = this.closest(".product-card");
        if (!card) return;
        var id = card.getAttribute("data-id");
        var name = card.getAttribute("data-name");
        var price = parseInt(card.getAttribute("data-price"), 10);
        var existing = findCartItem(id);

        if (existing) {
          existing.qty++;
        } else {
          cart.push({ id: id, name: name, price: price, qty: 1 });
        }

        this.textContent = "Added ✓";
        this.classList.add("added");
        var btn = this;
        setTimeout(function () {
          btn.textContent = "Add to Cart";
          btn.classList.remove("added");
        }, 1500);

        updateCartUI();
        showToast(name + " added to cart");
        openCart();
      });
    }

    if (clearCartBtn) {
      clearCartBtn.addEventListener("click", function () {
        cart.length = 0;
        updateCartUI();
        showToast("Cart cleared");
      });
    }

    if (checkoutBtn) {
      checkoutBtn.addEventListener("click", function () {
        if (cart.length === 0) return;
        var msg = "Hi! I'd like to order from " + BRAND_NAME + ":\n\n";
        for (var i = 0; i < cart.length; i++) {
          msg += "• " + cart[i].name + " x" + cart[i].qty + " — " + formatPrice(cart[i].price * cart[i].qty) + "\n";
        }
        var total = 0;
        for (var t = 0; t < cart.length; t++) total += cart[t].price * cart[t].qty;
        msg += "\nTotal: " + formatPrice(total) + "\n\nPlease confirm availability and delivery.";
        recordSale(cart.slice());
        window.open("https://wa.me/" + WA_NUMBER + "?text=" + encodeURIComponent(msg), "_blank");
        closeCart();
      });
    }

    // Contact form
    if (contactForm) {
      contactForm.addEventListener("submit", function (e) {
        e.preventDefault();
        var name = $("#name");
        var phone = $("#phone");
        var subject = $("#subject");
        var message = $("#message");
        var valid = true;
        var fields = [name, phone, message];
        for (var i = 0; i < fields.length; i++) {
          if (!fields[i]) continue;
          fields[i].classList.remove("error");
          if (!fields[i].value.trim()) { fields[i].classList.add("error"); valid = false; }
        }
        if (!valid) { showToast("Please fill in all fields"); return; }
        var btn = contactForm.querySelector('button[type="submit"]');
        var orig = btn.textContent;
        btn.disabled = true;
        btn.textContent = "Sending...";

        var formData = {
          name: name.value.trim(),
          phone: phone.value.trim(),
          subject: subject ? subject.value : "General Inquiry",
          message: message.value.trim()
        };

        sendContactMessage(formData, function (success) {
          var fb = $("#form-feedback");
          if (success) {
            if (fb) {
              fb.textContent = OWNER_EMAIL
                ? "Message sent! We'll reply within 24 hours."
                : "Opening WhatsApp — tap Send to deliver your message to us.";
            }
            showToast(OWNER_EMAIL ? "Message sent successfully" : "Complete sending on WhatsApp");
            contactForm.reset();
          } else {
            if (fb) fb.textContent = "Could not send. Please message us on WhatsApp instead.";
            showToast("Send failed — try WhatsApp");
          }
          btn.textContent = orig;
          btn.disabled = false;
          setTimeout(function () { if (fb) fb.textContent = ""; }, 6000);
        });
      });
    }

    initReviews();
    initProductImages();
    updateCartUI();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
