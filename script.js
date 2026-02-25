document.addEventListener('DOMContentLoaded', function () {
  const bookingForm = document.getElementById('bookingForm');
  const paymentSelect = document.getElementById('payment');
  const paymentPreview = document.getElementById('paymentPreview');
  const paymentPreviewHelp = document.getElementById('paymentPreviewHelp');
  const confirmation = document.getElementById('confirmation');
  const ticketPaymentLogo = document.getElementById('ticketPaymentLogo');
  const confirmMessage = document.getElementById('confirmMessage');
  const qrCanvas = document.getElementById('qrCode');
  const saveTicket = document.getElementById('saveTicket');

  function getLogoFor(paymentValue) {
    if (!paymentValue) return '';
    return paymentValue.toLowerCase().includes('orange') ? 'orange..png' : 'mtn.png';
  }

  // Update preview when user changes payment method
  paymentSelect.addEventListener('change', function () {
    const logo = getLogoFor(this.value);
    if (logo) {
      paymentPreview.src = logo;
      paymentPreview.classList.remove('hidden');
      paymentPreviewHelp.textContent = this.value ? `Vous avez choisi: ${this.value}` : '';
    } else {
      paymentPreview.classList.add('hidden');
      paymentPreviewHelp.textContent = '';
    }
  });

  // Form submit
  bookingForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const route = document.getElementById('route').value;
    const payment = paymentSelect.value;

    if (!name || !phone || !route || !payment) {
      alert('Veuillez remplir tous les champs svp.');
      return;
    }

    // Redirect to payment page to confirm code before showing ticket
    const params = new URLSearchParams({ name, phone, route, payment });
    window.location.href = `payment.html?${params.toString()}`;
  });

  // Note: saving the ticket happens on the dedicated ticket page.
});