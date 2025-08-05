document.addEventListener("DOMContentLoaded", () => {
  const products = [
    { id: 1, name: "T-shirt", price: 30, img: "assite/imgs/products/f1.jpg" },
    { id: 2, name: "T-shirt", price: 23, img: "assite/imgs/products/f2.jpg" },
    { id: 3, name: "Shirt", price: 20, img: "assite/imgs/products/f3.jpg" },
    { id: 4, name: "T-shirt", price: 21, img: "assite/imgs/products/f4.jpg" },
    { id: 5, name: "T-shirt", price: 24, img: "assite/imgs/products/f5.jpg" },
    { id: 6, name: "Shirt", price: 27, img: "assite/imgs/products/f6.jpg" },
    { id: 7, name: "Jeans", price: 29, img: "assite/imgs/products/f7.jpg" },
    { id: 8, name: "Top", price: 19, img: "assite/imgs/products/f8.jpg" },
    { id: 9, name: "Shirt", price: 18, img: "assite/imgs/products/n1.jpg" },
    { id: 10, name: "T-shirt", price: 14, img: "assite/imgs/products/n2.jpg" },
    { id: 11, name: "Trousers", price: 21, img: "assite/imgs/products/n3.jpg" },
    { id: 12, name: "T-shirt", price: 22, img: "assite/imgs/products/n4.jpg" },
    { id: 13, name: "Trousers", price: 23, img: "assite/imgs/products/n5.jpg" },
    { id: 14, name: "Pants", price: 34, img: "assite/imgs/products/n6.jpg" },
    { id: 15, name: "T-shirt", price: 33, img: "assite/imgs/products/n7.jpg" },
    { id: 16, name: "Shirt", price: 18, img: "assite/imgs/products/n8.jpg" },
    { id: 17, name: "T-shirt", price: 21, img: "assite/imgs/products/f4.jpg" },
    { id: 18, name: "T-shirt", price: 24, img: "assite/imgs/products/f5.jpg" }
  ];

  const productList = document.getElementById("product-list");
  const cartItems = document.getElementById("cart-items");
  const cartCount = document.getElementById("cart-count");
  const searchInput = document.querySelector(".search-input");
  const toggleBtn = document.getElementById("dark-mode-toggle");

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Render product cards
  function renderProducts() {
    productList.innerHTML = "";
    products.forEach(product => {
      const card = document.createElement("div");
      card.className = "product-card";
      card.innerHTML = `
        <img src="${product.img}" alt="${product.name}">
        <h3>${product.name}</h3>
        <div class="star-rating">★★★★★</div>
        <p>$${product.price.toFixed(2)}</p>
        <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
      `;
      productList.appendChild(card);
    });
  }

  // Handle add to cart
  function handleAddToCart(id) {
    cart.push(id);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartUI();
  }

  // Update cart display
  function updateCartUI() {
    cartCount.textContent = cart.length;
    cartItems.innerHTML = "";

    if (cart.length === 0) {
      cartItems.innerHTML = "<p>No items in cart</p>";
      return;
    }

    const uniqueIds = [...new Set(cart)];

    uniqueIds.forEach(id => {
      const product = products.find(p => p.id === id);
      const quantity = cart.filter(item => item === id).length;

      const item = document.createElement("div");
      item.className = "cart-item";
      item.innerHTML = `
        <h3>${product.name}</h3>
        <p>Quantity: ${quantity}</p>
        <p>Total: $${(product.price * quantity).toFixed(2)}</p>
      `;
      cartItems.appendChild(item);
    });

    const clearBtn = document.createElement("button");
    clearBtn.className = "submit";
    clearBtn.textContent = "Clear Cart";
    clearBtn.onclick = () => {
      cart = [];
      localStorage.removeItem("cart");
      updateCartUI();
      alert("Cart cleared!");
    };
    cartItems.appendChild(clearBtn);
  }

  // Search filter
  function filterProducts() {
    const value = searchInput.value.toLowerCase();
    const cards = document.querySelectorAll(".product-card");
    cards.forEach(card => {
      const name = card.querySelector("h3").textContent.toLowerCase();
      card.style.display = name.includes(value) ? "block" : "none";
    });
  }

  // Dark mode toggle
  function toggleDarkMode() {
    document.body.classList.toggle("dark");
    toggleBtn.textContent = document.body.classList.contains("dark")
      ? "☀️ Light Mode"
      : "🌙 Dark Mode";
  }

  // Event Listeners
  productList.addEventListener("click", e => {
    if (e.target.classList.contains("add-to-cart")) {
      const id = +e.target.dataset.id;
      handleAddToCart(id);
    }
  });

  searchInput.addEventListener("input", filterProducts);
  toggleBtn.addEventListener("click", toggleDarkMode);

  // Init
  renderProducts();
  updateCartUI();
});
