// Mock users
const users = [
  { username: "user", password: "1234", role: "customer" },
  { username: "admin", password: "admin123", role: "admin" }
];

document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const errorMsg = document.getElementById("errorMsg");

  // Check if user exists
  const foundUser = users.find(u => u.username === username && u.password === password);

  if (foundUser) {
    // Save login to localStorage
    localStorage.setItem("loggedInUser", foundUser.username);
    localStorage.setItem("userRole", foundUser.role);

    // Redirect based on role
    if (foundUser.role === "admin") {
      window.location.href = "orders.html"; // admin manages orders
    } else {
      window.location.href = "index.html"; // customer goes home
    }
  } else {
    errorMsg.textContent = "Invalid username or password!";
  }
});
