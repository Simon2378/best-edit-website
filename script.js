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
  // new form fields
  const ticketTypeSelect = document.getElementById('ticketType');
  const ageGroupSelect = document.getElementById('ageGroup');
  const weightInput = document.getElementById('weight');
  const weightLabel = document.getElementById('weightLabel');
  const ageLabel = document.getElementById('ageLabel');
  const submitButton = bookingForm.querySelector('button[type="submit"]');

  function updatePriceText() {
    const type = ticketTypeSelect.value;
    let price = 0;
    if (type === 'VIP') {
      price = 7000;
    } else if (type === 'Colis') {
      const w = parseFloat(weightInput.value) || 0;
      price = w * 1500;
    } else {
      price = 4000;
    }
    submitButton.textContent = `Payer ${price} XAF`;
  }

  function updateFieldsForType() {
    const type = ticketTypeSelect.value;
    if (type === 'Colis') {
      // show weight, hide age
      weightInput.classList.remove('hidden');
      weightLabel.classList.remove('hidden');
      weightInput.required = true;
      ageGroupSelect.classList.add('hidden');
      ageLabel.classList.add('hidden');
      ageGroupSelect.required = false;
    } else {
      weightInput.classList.add('hidden');
      weightLabel.classList.add('hidden');
      weightInput.required = false;
      ageGroupSelect.classList.remove('hidden');
      ageLabel.classList.remove('hidden');
      ageGroupSelect.required = true;
    }
    updatePriceText();
  }

  // update price when user changes ticket type or weight
  ticketTypeSelect.addEventListener('change', updateFieldsForType);
  weightInput.addEventListener('input', updatePriceText);
  // call once on load in case default
  updateFieldsForType();

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
    const ticketType = ticketTypeSelect.value;
    const ageGroup = ageGroupSelect.value;
    const weight = parseFloat(weightInput.value) || 0;

    // validation
    if (!name || !phone || !route || !payment || !ticketType) {
      alert('Veuillez remplir tous les champs svp.');
      return;
    }
    if (ticketType === 'Colis') {
      if (weight <= 0) {
        alert('Veuillez entrer le poids du colis en kg.');
        return;
      }
    } else {
      if (!ageGroup) {
        alert('Veuillez sélectionner une catégorie.');
        return;
      }
    }

    // Redirect to payment page to confirm code before showing ticket
    const paramsObj = { name, phone, route, payment, ticketType };
    if (ticketType === 'Colis') paramsObj.weight = weight;
    else paramsObj.ageGroup = ageGroup;
    const params = new URLSearchParams(paramsObj);
    window.location.href = `payment.html?${params.toString()}`;
  });

  // Note: saving the ticket happens on the dedicated ticket page.
});