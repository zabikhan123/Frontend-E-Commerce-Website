document.addEventListener("DOMContentLoaded", () => {
  const products = [
    { id: 1, name: "Laptop", price: 999.99, img: "assite/imgs/products/f1.jpg" },
    { id: 2, name: "Headphones", price: 199.99, img: "assite/imgs/products/f2.jpg" },
    { id: 3, name: "Keyboard", price: 89.99, img: "assite/imgs/products/f3.jpg" },
    { id: 4, name: "Mouse", price: 49.99, img: "assite/imgs/products/f4.jpg" },
    { id: 5, name: "Laptop", price: 999.99, img: "assite/imgs/products/f5.jpg" },
    { id: 6, name: "Headphones", price: 199.99, img: "assite/imgs/products/f6.jpg" },
    { id: 7, name: "Keyboard", price: 89.99, img: "assite/imgs/products/f7.jpg" },
    { id: 8, name: "Mouse", price: 49.99, img: "assite/imgs/products/f8.jpg" }, 
    { id: 9, name: "Laptop", price: 999.99, img: "assite/imgs/products/n1.jpg" },
    { id: 10, name: "Headphones", price: 199.99, img: "assite/imgs/products/n2.jpg" },
    { id: 11, name: "Keyboard", price: 89.99, img: "assite/imgs/products/n3.jpg" },
    { id: 12, name: "Mouse", price: 49.99, img: "assite/imgs/products/n4.jpg" },
    { id: 10, name: "Headphones", price: 199.99, img: "assite/imgs/products/n5.jpg" },
    { id: 11, name: "Keyboard", price: 89.99, img: "assite/imgs/products/n6.jpg" },
    { id: 12, name: "Mouse", price: 49.99, img: "assite/imgs/products/n7.jpg" },
    { id: 12, name: "Mouse", price: 49.99, img: "assite/imgs/products/n8.jpg" },

    // { id: 10, name: "Headphones", price: 199.99, img: "assite/imgs/products/n2.jpg" },
   //  { id: 11, name: "Keyboard", price: 89.99, img: "assite/imgs/products/n3.jpg" },
    // { id: 12, name: "Mouse", price: 49.99, img: "assite/imgs/products/n4.jpg" },
  ];

  const productList = document.getElementById("product-list");
  const cartCount = document.getElementById("cart-count");
  const cartItems = document.getElementById("cart-items");
  const searchInput = document.querySelector(".search-bar input");
  const toggle = document.getElementById("dark-mode-toggle");

  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  updateCartUI();

  // Render products
  function renderProducts() {
    productList.innerHTML = "";
    products.forEach(prod => {
      const card = document.createElement("div");
      card.className = "product-card";
      card.innerHTML = `
        <img src="${prod.img}" alt="${prod.name}" />
        <h3>${prod.name}</h3>
        <p>$${prod.price.toFixed(2)}</p>
        <button class="add-to-cart" data-id="${prod.id}">Add to Cart</button>
      `;
      productList.appendChild(card);
    });
  }

  renderProducts();

  // Add to cart
  productList.addEventListener("click", e => {
    if (e.target.classList.contains("add-to-cart")) {
      const id = +e.target.dataset.id;
      cart.push(id);
      localStorage.setItem("cart", JSON.stringify(cart));
      updateCartUI();
    }
  });

  // Update cart UI
  function updateCartUI() {
    cartCount.textContent = cart.length;
    cartItems.innerHTML = "";

    const uniqueIds = [...new Set(cart)];

    if (uniqueIds.length === 0) {
      cartItems.innerHTML = "<p>No items in cart</p>";
      return;
    }

    uniqueIds.forEach(id => {
      const product = products.find(p => p.id === id);
      const count = cart.filter(x => x === id).length;

      const item = document.createElement("div");
      item.className = "cart-item";
      item.innerHTML = `
        <h3>${product.name}</h3>
        <p>Quantity: ${count}</p>
        <p>Total: $${(product.price * count).toFixed(2)}</p>
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
      alert("Cart cleared");
    };
    cartItems.appendChild(clearBtn);
  }

  // Search
  searchInput.addEventListener("input", () => {
    const val = searchInput.value.toLowerCase();
    const cards = document.querySelectorAll(".product-card");
    cards.forEach(card => {
      const name = card.querySelector("h3").textContent.toLowerCase();
      card.style.display = name.includes(val) ? "block" : "none";
    });
  });

  // Dark mode toggle
  toggle.onclick = () => {
    document.body.classList.toggle("dark");
    toggle.textContent = document.body.classList.contains("dark")
      ? "☀️ Light Mode"
      : "🌙 Dark Mode";
  };
});
