(function () {
  "use strict";

  var WA_NUMBER = "923001234567";
  var cart = [];

  function $(sel) { return document.querySelector(sel); }
  function $$(sel) { return document.querySelectorAll(sel); }

  function formatPrice(n) {
    return "Rs. " + n.toLocaleString("en-PK");
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
        var msg = "Hi! I'd like to order from Neel Pottery Multan:\n\n";
        for (var i = 0; i < cart.length; i++) {
          msg += "• " + cart[i].name + " x" + cart[i].qty + " — " + formatPrice(cart[i].price * cart[i].qty) + "\n";
        }
        var total = 0;
        for (var t = 0; t < cart.length; t++) total += cart[t].price * cart[t].qty;
        msg += "\nTotal: " + formatPrice(total) + "\n\nPlease confirm availability and delivery.";
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
        setTimeout(function () {
          var fb = $("#form-feedback");
          if (fb) fb.textContent = "Message sent! We'll reply within 24 hours.";
          showToast("Message sent successfully");
          contactForm.reset();
          btn.textContent = orig;
          btn.disabled = false;
          setTimeout(function () { if (fb) fb.textContent = ""; }, 5000);
        }, 1200);
      });
    }

    updateCartUI();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
