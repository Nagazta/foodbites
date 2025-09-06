document.addEventListener("DOMContentLoaded", () => {
  const cartItemsContainer = document.getElementById("cart-items");
  const cartTotalElement = document.getElementById("cart-total");
  const checkoutBtn = document.getElementById("checkout-btn");

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  function renderCart() {
    cartItemsContainer.innerHTML = "";

    if (cart.length === 0) {
      cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
      cartTotalElement.textContent = "0";
      return;
    }

    let total = 0;

    cart.forEach((item, index) => {
      total += item.price * item.quantity;

      const div = document.createElement("div");
      div.classList.add("cart-item");

      div.innerHTML = `
        <img src="${item.image}" alt="${item.name}">
        <div class="cart-item-details">
          <h3>${item.name}</h3>
          <p>₱${item.price} x 
            <input type="number" min="1" value="${item.quantity}" 
              onchange="updateQuantity(${index}, this.value)">
          </p>
        </div>
        <button onclick="removeFromCart(${index})">Remove</button>
      `;

      cartItemsContainer.appendChild(div);
    });

    cartTotalElement.textContent = total;
  }

  // Update item quantity
  window.updateQuantity = function (index, newQty) {
    cart[index].quantity = parseInt(newQty);
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
  };

  // Remove item from cart
  window.removeFromCart = function (index) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
  };

  // Checkout → move cart to orders
  // Checkout → open payment dialog
  checkoutBtn.addEventListener("click", () => {
    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    document.getElementById("payment-dialog").style.display = "flex";
  });

  // Confirm payment
  document.getElementById("confirm-payment").addEventListener("click", () => {
    const method = document.getElementById("payment-method").value;

    let orders = JSON.parse(localStorage.getItem("orders")) || [];
    const newOrder = {
      id: Date.now(),
      items: cart.map(item => ({
        name: item.name,
        quantity: item.quantity,
        price: item.price
      })),
      total: cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
      payment: method,
      status: "Pending"
    };

    orders.push(newOrder);
    localStorage.setItem("orders", JSON.stringify(orders));

    // Clear cart
    localStorage.removeItem("cart");

    document.getElementById("payment-dialog").style.display = "none";
    alert(`Order placed successfully! ✅\nPayment Method: ${method}`);
    window.location.href = "orders.html";
  });

  // Cancel payment
  document.getElementById("cancel-payment").addEventListener("click", () => {
    document.getElementById("payment-dialog").style.display = "none";
  });


  renderCart();
});
