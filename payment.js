// Get user info from URL
const urlParams = new URLSearchParams(window.location.search);
const name = urlParams.get("name");
const phone = urlParams.get("phone");
const route = urlParams.get("route");
const payment = urlParams.get("payment");

document.getElementById("paymentForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const password = document.getElementById("password").value;

  if (password.length < 4) {
    alert("Mot de passe incorrect !");
    return;
  }

  // ✅ Show SMS simulation
  document.getElementById("smsNumber").textContent = phone;
  document.getElementById("smsBox").classList.remove("hidden");

  // After 3 seconds, redirect to ticket page
  setTimeout(() => {
    const url = `ticket.html?name=${encodeURIComponent(name)}&phone=${encodeURIComponent(phone)}&route=${encodeURIComponent(route)}&payment=${encodeURIComponent(payment)}`;
    window.location.href = url;
  }, 3000);
});