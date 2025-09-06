document.addEventListener("DOMContentLoaded", () => {
  const ordersList = document.getElementById("orders-list");

  let orders = JSON.parse(localStorage.getItem("orders")) || [];

  function saveOrders() {
    localStorage.setItem("orders", JSON.stringify(orders));
  }

  function markAsReceived(orderId) {
    orders = orders.map(order =>
      order.id === orderId ? { ...order, status: "Received" } : order
    );
    saveOrders();
    renderOrders();
  }

  function deleteOrder(orderId) {
    orders = orders.filter(order => order.id !== orderId);
    saveOrders();
    renderOrders();
  }

  function renderOrders() {
    ordersList.innerHTML = "";

    if (orders.length === 0) {
      ordersList.innerHTML = "<p>No orders yet.</p>";
      return;
    }

    // Show latest orders first
    orders.slice().reverse().forEach((order) => {
      const div = document.createElement("div");
      div.classList.add("order-card");

      div.innerHTML = `
        <h3>Order #${order.id}</h3>
        <p><strong>Items:</strong></p>
        <ul>
          ${order.items
            .map(
              item =>
                `<li>${item.name} (x${item.quantity}) - ₱${item.price * item.quantity}</li>`
            )
            .join("")}
        </ul>
        <p><strong>Total:</strong> ₱${order.total}</p>
        <p><strong>Payment:</strong> ${order.payment}</p>
        <span class="order-status status-${order.status
          .toLowerCase()
          .replace(" ", "")}">
          ${order.status}
        </span>
        <div class="order-actions"></div>
      `;

      const actions = div.querySelector(".order-actions");

      if (order.status !== "Received") {
        const receiveBtn = document.createElement("button");
        receiveBtn.textContent = "Mark as Received ✅";
        receiveBtn.classList.add("btn");
        receiveBtn.onclick = () => markAsReceived(order.id);
        actions.appendChild(receiveBtn);
      } else {
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete 🗑️";
        deleteBtn.classList.add("btn", "btn-danger");
        deleteBtn.onclick = () => deleteOrder(order.id);
        actions.appendChild(deleteBtn);
      }

      ordersList.appendChild(div);
    });
  }

  renderOrders();
});
