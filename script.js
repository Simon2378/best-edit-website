document.getElementById("bookingForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const phone = document.getElementById("phone").value;
  const route = document.getElementById("route").value;
  const payment = document.getElementById("payment").value;

  const url = `payment.html?name=${encodeURIComponent(name)}&phone=${encodeURIComponent(phone)}&route=${encodeURIComponent(route)}&payment=${encodeURIComponent(payment)}`;
  window.location.href = url;
});