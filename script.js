document.getElementById("bookingForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const phone = document.getElementById("phone").value;
  const route = document.getElementById("route").value;
  const payment = document.getElementById("payment").value;

  const url = `payment.html?name=${encodeURIComponent(name)}&phone=${encodeURIComponent(phone)}&route=${encodeURIComponent(route)}&payment=${encodeURIComponent(payment)}`;
  window.location.href = url;
});

// Payment logo preview
const paymentSelect = document.getElementById('payment');
const paymentPreview = document.getElementById('paymentPreview');
const paymentPreviewHelp = document.getElementById('paymentPreviewHelp');

function tryCandidates(candidates, onFound, onNone) {
  if (!paymentPreview) { if (onNone) onNone(); return; }
  let i = 0;
  function next() {
    if (i >= candidates.length) { if (onNone) onNone(); return; }
    const f = candidates[i++];
    // Reset handlers before assigning new src to avoid race conditions
    paymentPreview.onload = function() { paymentPreview.classList.remove('hidden'); if (paymentPreviewHelp) paymentPreviewHelp.textContent = ''; if (onFound) onFound(f); };
    paymentPreview.onerror = function() { next(); };
    paymentPreview.src = f;
  }
  next();
}

function updatePaymentPreview() {
  const val = paymentSelect ? paymentSelect.value || '' : '';
  const normalized = val.toLowerCase();
  let candidates = [];
  if (normalized.includes('orange')) {
    candidates = ['orange.png', 'orange..png', 'orange.jpg', 'orange.jpeg'];
  } else if (normalized.includes('mobile') || normalized.includes('mtn') || normalized.includes('momo') || normalized.includes('mobile money')) {
    candidates = ['mtn.png', 'momo.jpeg', 'mobile.png', 'mobile.jpg', 'mobile.jpeg', 'mtn.jpg', 'mtn.jpeg'];
  }

  if (candidates.length) {
    tryCandidates(candidates, function(found) {
      // found and displayed
      if (paymentPreviewHelp) paymentPreviewHelp.textContent = '';
    }, function() {
      if (paymentPreview) { paymentPreview.classList.add('hidden'); paymentPreview.src = ''; }
      if (paymentPreviewHelp) paymentPreviewHelp.textContent = 'Aucune image trouvée. Placez un fichier nommé l\'un de ces noms: ' + candidates.join(', ');
    });
  } else {
    if (paymentPreview) { paymentPreview.classList.add('hidden'); paymentPreview.src = ''; }
    if (paymentPreviewHelp) paymentPreviewHelp.textContent = '';
  }
}

// initialize preview
if (paymentSelect) {
  paymentSelect.addEventListener('change', updatePaymentPreview);
  updatePaymentPreview();
}