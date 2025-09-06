document.addEventListener("DOMContentLoaded", () => {
  const addToCartButtons = document.querySelectorAll(".food-card .btn");

  addToCartButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      const card = e.target.closest(".food-card");
      const name = card.querySelector("h3").textContent;
      const price = parseInt(card.querySelector("p").textContent.replace("₱", ""));
      const image = card.querySelector("img").getAttribute("src");

      let cart = JSON.parse(localStorage.getItem("cart")) || [];

      // Check if item already exists
      let existingItem = cart.find(item => item.name === name);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cart.push({ name, price, image, quantity: 1 });
      }

      localStorage.setItem("cart", JSON.stringify(cart));

      alert(`${name} added to cart 🛒`);
    });
  });
});
