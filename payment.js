// Read params from URL
const urlParams = new URLSearchParams(window.location.search);
const name = urlParams.get('name') || '';
const phone = urlParams.get('phone') || '';
const route = urlParams.get('route') || '';
const payment = urlParams.get('payment') || '';
const ticketType = urlParams.get('ticketType') || 'Normal';
const ageGroup = urlParams.get('ageGroup') || '';
const weight = parseFloat(urlParams.get('weight') || '0');

// compute amount based on ticket type
let amount = 0;
if (ticketType.toLowerCase() === 'vip') {
  amount = 7000;
} else if (ticketType === 'Colis') {
  amount = weight * 1500;
} else {
  amount = 4000;
}

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
// update amount displays
const amountTextEl = document.getElementById('amountText');
const amountSummaryEl = document.getElementById('amountSummary');
if (amountTextEl) amountTextEl.textContent = `${amount} XAF`;
if (amountSummaryEl) amountSummaryEl.textContent = `${amount} XAF`;
// populate type and weight/age in payment summary
const summaryTypeEl = document.getElementById('summaryType');
const summaryAgeEl = document.getElementById('summaryAge');
const summaryWeightEl = document.getElementById('summaryWeight');
if (summaryTypeEl) summaryTypeEl.textContent = ticketType;
if (ticketType === 'Colis') {
  if (summaryWeightEl) {
    summaryWeightEl.textContent = `${weight} kg`;
    summaryWeightEl.parentElement.classList.remove('hidden');
  }
  if (summaryAgeEl) {
    summaryAgeEl.textContent = '-';
    summaryAgeEl.parentElement.classList.add('hidden');
  }
} else {
  if (summaryWeightEl) {
    summaryWeightEl.parentElement.classList.add('hidden');
  }
  if (summaryAgeEl) {
    summaryAgeEl.textContent = ageGroup;
    summaryAgeEl.parentElement.classList.remove('hidden');
  }
}

// determine required code length
const requiredLength = payment.toLowerCase().includes('orange') ? 4 : 5;
codeInput.maxLength = requiredLength;
codeInput.placeholder = `Entrez le code à ${requiredLength} chiffres`;
codeHelp.textContent = `Le code doit contenir ${requiredLength} chiffres.`;

// show phone in simulated SMS area if available
if (phone) smsNumber.textContent = phone;
// update SMS amount text if element exists
const smsAmountEl = document.getElementById('smsAmount');
if (smsAmountEl) smsAmountEl.textContent = `${amount} XAF`;
// if package, display weight in sms
const smsWeightEl = document.getElementById('smsWeight');
const smsWeightVal = document.getElementById('smsWeightVal');
if (ticketType === 'Colis' && smsWeightEl && smsWeightVal) {
  smsWeightEl.classList.remove('hidden');
  smsWeightVal.textContent = weight;
}

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
    const paramsObj = { name, phone, route, payment, ticketType };
    if (ticketType === 'Colis') paramsObj.weight = weight;
    else paramsObj.ageGroup = ageGroup;
    const params = new URLSearchParams(paramsObj);
    window.location.href = `ticket.html?${params.toString()}`;
  }, 800);
});