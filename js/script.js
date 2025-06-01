$(document).ready(function () {
  // Dummy product data
  const products = [
    {
      id: 1,
      title: "Luxury Silk Pillowcase",
      category: "bedding",
      price: 49.99,
      originalPrice: 69.99,
      image:
        "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1528&q=80",
      rating: 4,
      badge: "Sale",
      description: "Premium silk pillowcase for a luxurious sleep experience.",
    },
    {
      id: 2,
      title: "Cashmere Throw Blanket",
      category: "bedding",
      price: 129.99,
      originalPrice: 159.99,
      image:
        "https://images.unsplash.com/photo-1603487742131-4160ec999306?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1527&q=80",
      rating: 5,
      description: "Ultra-soft cashmere blanket for ultimate comfort.",
    },
    {
      id: 3,
      title: "Designer Leather Handbag",
      category: "accessories",
      price: 199.99,
      image:
        "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1538&q=80",
      rating: 4,
      badge: "Popular",
      description: "Elegant leather handbag with multiple compartments.",
    },
    {
      id: 4,
      title: "Statement Pearl Necklace",
      category: "accessories",
      price: 89.99,
      image:
        "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1587&q=80",
      rating: 4,
      description: "Beautiful pearl necklace for any occasion.",
    },
    {
      id: 5,
      title: "Classic Leather Loafers",
      category: "shoes",
      price: 149.99,
      originalPrice: 179.99,
      image:
        "https://images.unsplash.com/photo-1560769629-975ec94e6a86?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1588&q=80",
      rating: 5,
      badge: "Bestseller",
      description: "Timeless leather loafers for men.",
    },
    {
      id: 6,
      title: "Elegant High Heels",
      category: "shoes",
      price: 119.99,
      image:
        "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1580&q=80",
      rating: 4,
      description: "Stylish high heels for women.",
    },
    {
      id: 7,
      title: "Egyptian Cotton Sheets",
      category: "bedding",
      price: 159.99,
      image:
        "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1580&q=80",
      rating: 5,
      description: "Premium 1000-thread-count Egyptian cotton sheets.",
    },
    {
      id: 8,
      title: "Designer Sunglasses",
      category: "accessories",
      price: 179.99,
      originalPrice: 199.99,
      image:
        "https://images.unsplash.com/photo-1511499767150-a48a237f0083?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1580&q=80",
      rating: 4,
      badge: "New",
      description: "Luxury designer sunglasses with UV protection.",
    },
  ];

  // Shopping cart
  let cart = [];

  // Initialize the page
  function init() {
    renderProducts(products);
    setupEventListeners();
  }

  // Render products to the page
  function renderProducts(productsToRender) {
    const productGrid = $("#product-grid");
    productGrid.empty();

    if (productsToRender.length === 0) {
      productGrid.html(
        '<p class="no-products">No products found matching your criteria.</p>'
      );
      return;
    }

    productsToRender.forEach((product) => {
      const productCard = `
                <div class="product-card" data-category="${
                  product.category
                }" data-price="${product.price}">
                    ${
                      product.badge
                        ? `<span class="product-badge">${product.badge}</span>`
                        : ""
                    }
                    <div class="product-image">
                        <img src="${product.image}" alt="${product.title}">
                        <div class="product-actions">
                            <button class="action-btn quick-view" data-id="${
                              product.id
                            }"><i class="fas fa-eye"></i></button>
                            <button class="action-btn add-to-wishlist" data-id="${
                              product.id
                            }"><i class="fas fa-heart"></i></button>
                        </div>
                    </div>
                    <div class="product-info">
                        <span class="product-category">${
                          product.category.charAt(0).toUpperCase() +
                          product.category.slice(1)
                        }</span>
                        <h3 class="product-title">${product.title}</h3>
                        <div class="product-price">
                            <span class="current-price">$${product.price.toFixed(
                              2
                            )}</span>
                            ${
                              product.originalPrice
                                ? `<span class="original-price">$${product.originalPrice.toFixed(
                                    2
                                  )}</span>`
                                : ""
                            }
                        </div>
                        <div class="product-rating">
                            ${renderRating(product.rating)}
                        </div>
                        <button class="add-to-cart" data-id="${product.id}">
                            <i class="fas fa-shopping-cart"></i> Add to Cart
                        </button>
                        <button class="whatsapp-order" data-id="${product.id}">
                            <i class="fab fa-whatsapp"></i> Order via WhatsApp
                        </button>
                    </div>
                </div>
            `;
      productGrid.append(productCard);
    });
  }

  // Render star rating
  function renderRating(rating) {
    let stars = "";
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars += '<i class="fas fa-star"></i>';
      } else if (i - 0.5 <= rating) {
        stars += '<i class="fas fa-star-half-alt"></i>';
      } else {
        stars += '<i class="far fa-star"></i>';
      }
    }
    return stars;
  }

  // Filter products by category
  function filterProducts(category) {
    if (category === "all") {
      renderProducts(products);
      return;
    }
    const filteredProducts = products.filter(
      (product) => product.category === category
    );
    renderProducts(filteredProducts);
  }

  // Sort products
  function sortProducts(sortBy) {
    let sortedProducts = [...products];

    switch (sortBy) {
      case "price-low":
        sortedProducts.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        sortedProducts.sort((a, b) => b.price - a.price);
        break;
      case "popular":
        // For demo, we'll consider products with badges as "popular"
        sortedProducts.sort((a, b) => {
          const aHasBadge = a.badge ? 1 : 0;
          const bHasBadge = b.badge ? 1 : 0;
          return bHasBadge - aHasBadge || b.rating - a.rating;
        });
        break;
      default:
        // Default sorting (original order)
        break;
    }

    renderProducts(sortedProducts);
  }

  // Add product to cart
  function addToCart(productId) {
    const product = products.find((p) => p.id === productId);
    if (!product) return;

    const existingItem = cart.find((item) => item.id === productId);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        quantity: 1,
      });
    }

    updateCartCount();
    renderCartItems();
    showAddedToCartMessage(product.title);
  }

  // Update cart count in header
  function updateCartCount() {
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    $(".cart-count").text(count);
  }

  // Render cart items in sidebar
  function renderCartItems() {
    const cartItemsContainer = $(".cart-items");

    if (cart.length === 0) {
      cartItemsContainer.html(`
                <div class="empty-cart">
                    <i class="fas fa-shopping-cart"></i>
                    <p>Your cart is empty</p>
                </div>
            `);
      $(".total-amount").text("$0.00");
      return;
    }

    let cartItemsHTML = "";
    let total = 0;

    cart.forEach((item) => {
      const itemTotal = item.price * item.quantity;
      total += itemTotal;

      cartItemsHTML += `
                <div class="cart-item">
                    <div class="cart-item-img">
                        <img src="${item.image}" alt="${item.title}">
                    </div>
                    <div class="cart-item-details">
                        <h4 class="cart-item-title">${item.title}</h4>
                        <div class="cart-item-price">$${item.price.toFixed(
                          2
                        )}</div>
                        <div class="cart-item-actions">
                            <div class="quantity-control">
                                <button class="quantity-btn decrease" data-id="${
                                  item.id
                                }">-</button>
                                <span class="quantity">${item.quantity}</span>
                                <button class="quantity-btn increase" data-id="${
                                  item.id
                                }">+</button>
                            </div>
                            <button class="remove-item" data-id="${
                              item.id
                            }"><i class="fas fa-trash"></i></button>
                        </div>
                    </div>
                </div>
            `;
    });

    cartItemsContainer.html(cartItemsHTML);
    $(".total-amount").text(`$${total.toFixed(2)}`);
  }

  // Update item quantity in cart
  function updateCartItemQuantity(productId, change) {
    const item = cart.find((item) => item.id === productId);
    if (!item) return;

    item.quantity += change;

    if (item.quantity <= 0) {
      cart = cart.filter((item) => item.id !== productId);
    }

    updateCartCount();
    renderCartItems();
  }

  // Show "added to cart" message
  function showAddedToCartMessage(productTitle) {
    const message = $(`
            <div class="added-to-cart-message">
                <i class="fas fa-check-circle"></i> ${productTitle} added to cart
            </div>
        `);

    $("body").append(message);

    setTimeout(() => {
      message.addClass("show");
    }, 10);

    setTimeout(() => {
      message.removeClass("show");
      setTimeout(() => message.remove(), 300);
    }, 3000);
  }

  // Quick view modal
  function showQuickView(productId) {
    const product = products.find((p) => p.id === productId);
    if (!product) return;

    const modal = $(`
            <div class="quick-view-modal">
                <div class="modal-overlay"></div>
                <div class="modal-content">
                    <button class="close-modal"><i class="fas fa-times"></i></button>
                    <div class="modal-product">
                        <div class="modal-product-image">
                            <img src="${product.image}" alt="${product.title}">
                        </div>
                        <div class="modal-product-details">
                            <h3>${product.title}</h3>
                            <div class="product-price">
                                <span class="current-price">$${product.price.toFixed(
                                  2
                                )}</span>
                                ${
                                  product.originalPrice
                                    ? `<span class="original-price">$${product.originalPrice.toFixed(
                                        2
                                      )}</span>`
                                    : ""
                                }
                            </div>
                            <div class="product-rating">
                                ${renderRating(product.rating)}
                            </div>
                            <p class="product-description">${
                              product.description
                            }</p>
                            <div class="modal-actions">
                                <button class="btn add-to-cart" data-id="${
                                  product.id
                                }">
                                    <i class="fas fa-shopping-cart"></i> Add to Cart
                                </button>
                                <button class="btn whatsapp-order" data-id="${
                                  product.id
                                }">
                                    <i class="fab fa-whatsapp"></i> Order via WhatsApp
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `);

    $("body").append(modal);
    $("body").css("overflow", "hidden");

    // Close modal
    modal.find(".close-modal, .modal-overlay").click(function () {
      modal.remove();
      $("body").css("overflow", "auto");
    });

    // Add to cart from modal
    modal.find(".add-to-cart").click(function () {
      addToCart(product.id);
      modal.remove();
      $("body").css("overflow", "auto");
    });

    // WhatsApp order from modal
    modal.find(".whatsapp-order").click(function () {
      const message = `I'd like to order: ${
        product.title
      } - $${product.price.toFixed(2)}`;
      const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, "_blank");
    });
  }

  // Setup all event listeners
  function setupEventListeners() {
    // Mobile menu toggle
    $(".mobile-menu-toggle").click(function () {
      $(".main-nav").toggleClass("active");
      $(".mobile-menu-overlay").toggleClass("active");
    });

    // Close mobile menu when clicking overlay
    $(".mobile-menu-overlay").click(function () {
      $(this).removeClass("active");
      $(".main-nav").removeClass("active");
      $(".cart-sidebar").removeClass("active");
    });

    // Search toggle
    $(".search-toggle").click(function (e) {
      e.preventDefault();
      $(".search-bar").addClass("active");
      $(".search-form input").focus();
    });

    // Close search
    $(".close-search").click(function () {
      $(".search-bar").removeClass("active");
    });

    // Category filter
    $("#category-filter").change(function () {
      filterProducts($(this).val());
    });

    // Sort by
    $("#sort-by").change(function () {
      sortProducts($(this).val());
    });

    // Cart toggle
    $(".cart-icon").click(function (e) {
      e.preventDefault();
      $(".cart-sidebar").addClass("active");
      $(".mobile-menu-overlay").addClass("active");
    });

    // Close cart
    $(".close-cart").click(function () {
      $(".cart-sidebar").removeClass("active");
      $(".mobile-menu-overlay").removeClass("active");
    });

    // Add to cart button
    $(document).on("click", ".add-to-cart", function () {
      const productId = parseInt($(this).data("id"));
      addToCart(productId);
    });

    // WhatsApp order button
    $(document).on("click", ".whatsapp-order", function () {
      const productId = parseInt($(this).data("id"));
      const product = products.find((p) => p.id === productId);
      if (product) {
        const message = `I'd like to order: ${
          product.title
        } - $${product.price.toFixed(2)}`;
        const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(
          message
        )}`;
        window.open(whatsappUrl, "_blank");
      }
    });

    // Quick view button
    $(document).on("click", ".quick-view", function () {
      const productId = parseInt($(this).data("id"));
      showQuickView(productId);
    });

    // Wishlist button (visual only)
    $(document).on("click", ".add-to-wishlist", function () {
      const button = $(this);
      button.html('<i class="fas fa-heart" style="color: #ff3399;"></i>');
      setTimeout(() => {
        button.html('<i class="fas fa-heart"></i>');
      }, 1000);
    });

    // Quantity controls in cart
    $(document).on("click", ".increase", function () {
      const productId = parseInt($(this).data("id"));
      updateCartItemQuantity(productId, 1);
    });

    $(document).on("click", ".decrease", function () {
      const productId = parseInt($(this).data("id"));
      updateCartItemQuantity(productId, -1);
    });

    // Remove item from cart
    $(document).on("click", ".remove-item", function () {
      const productId = parseInt($(this).data("id"));
      cart = cart.filter((item) => item.id !== productId);
      updateCartCount();
      renderCartItems();
    });

    // WhatsApp checkout
    $(".checkout-btn").click(function () {
      if (cart.length === 0) return;

      let message = "I'd like to place an order for the following items:\n\n";
      let total = 0;

      cart.forEach((item) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        message += `${item.title} x${item.quantity} - $${itemTotal.toFixed(
          2
        )}\n`;
      });

      message += `\nTotal: $${total.toFixed(2)}`;

      const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, "_blank");
    });

    // Smooth scrolling for anchor links
    $('a[href^="#"]').on("click", function (e) {
      e.preventDefault();
      const target = $($(this).attr("href"));
      if (target.length) {
        $("html, body").animate(
          {
            scrollTop: target.offset().top - 80,
          },
          800
        );
      }
    });
  }

  // Initialize the page
  init();
});
