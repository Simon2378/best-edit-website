// Get user info from URL
const urlParams = new URLSearchParams(window.location.search);
const name = urlParams.get("name");
const phone = urlParams.get("phone");
const route = urlParams.get("route");
const payment = urlParams.get("payment");

// Determine expected password length based on payment method
const expectedLength = (payment && payment.toLowerCase().includes('orange')) ? 4 : 5;

// Update helper text and input attributes on load
const passwordInput = document.getElementById('password');
const passwordHelp = document.getElementById('passwordHelp');
if (passwordInput) {
  passwordInput.setAttribute('maxlength', expectedLength);
  passwordInput.setAttribute('inputmode', 'numeric');
  passwordInput.setAttribute('pattern', `\\d{${expectedLength}}`);
}
if (passwordHelp) {
  passwordHelp.textContent = `Entrez exactement ${expectedLength} chiffres pour ${payment || 'Mobile Money'}`;
}

// Prevent non-digit characters while typing
if (passwordInput) {
  passwordInput.addEventListener('input', (e) => {
    e.target.value = e.target.value.replace(/[^0-9]/g, '').slice(0, expectedLength);
  });
}

// Form submit validation
document.getElementById("paymentForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const password = (document.getElementById("password").value || '').trim();
  const re = new RegExp(`^\\d{${expectedLength}}$`);

  if (!re.test(password)) {
    alert(`Mot de passe invalide. Entrez exactement ${expectedLength} chiffres.`);
    return;
  }

  //  Show SMS simulation
  document.getElementById("smsNumber").textContent = phone;
  document.getElementById("smsBox").classList.remove("hidden");

  // After 5 seconds, redirect to ticket page
  setTimeout(() => {
    const url = `ticket.html?name=${encodeURIComponent(name)}&phone=${encodeURIComponent(phone)}&route=${encodeURIComponent(route)}&payment=${encodeURIComponent(payment)}`;
    window.location.href = url;
  }, 5000);
});