// Read params from URL
const urlParams = new URLSearchParams(window.location.search);
const name = urlParams.get('name') || '';
const phone = urlParams.get('phone') || '';
const route = urlParams.get('route') || '';
const payment = urlParams.get('payment') || '';

const smsBox = document.getElementById('smsBox');
const smsNumber = document.getElementById('smsNumber');
const paymentForm = document.getElementById('paymentForm');
const paymentMethodEl = document.getElementById('paymentMethod');
const paymentLogo = document.getElementById('paymentLogo');
const codeInput = document.getElementById('code');
const codeHelp = document.getElementById('codeHelp');

function getLogoFor(paymentValue) {
  if (!paymentValue) return '';
  return paymentValue.toLowerCase().includes('orange') ? 'orange..png' : 'mtn.png';
}

// Populate UI
paymentMethodEl.textContent = payment || '-';
if (getLogoFor(payment)) {
  paymentLogo.src = getLogoFor(payment);
  paymentLogo.classList.remove('hidden');
}

// determine required code length
const requiredLength = payment.toLowerCase().includes('orange') ? 4 : 5;
codeInput.maxLength = requiredLength;
codeInput.placeholder = `Entrez le code à ${requiredLength} chiffres`;
codeHelp.textContent = `Le code doit contenir ${requiredLength} chiffres.`;

// show phone in simulated SMS area if available
if (phone) smsNumber.textContent = phone;

paymentForm.addEventListener('submit', function (e) {
  e.preventDefault();
  const code = codeInput.value.trim();
  if (!/^[0-9]+$/.test(code) || code.length !== requiredLength) {
    alert(`Veuillez entrer un code valide de ${requiredLength} chiffres.`);
    return;
  }

  // Simulate confirmation (show SMS box briefly)
  smsBox.classList.remove('hidden');
  setTimeout(function () {
    // Redirect to ticket page with same params
    const params = new URLSearchParams({ name, phone, route, payment });
    window.location.href = `ticket.html?${params.toString()}`;
  }, 800);
});