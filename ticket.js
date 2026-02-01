// Get parameters from URL
const urlParams = new URLSearchParams(window.location.search);
const name = urlParams.get("name");
const phone = urlParams.get("phone");
const route = urlParams.get("route");
const payment = urlParams.get("payment");

// Show confirmation message
const displayName = name || '—';
const displayPhone = phone || '—';
const displayRoute = route || '—';
const displayPayment = payment || '—';

document.getElementById("confirmMessage").innerHTML = `
  <p><strong>Nom:</strong> ${displayName}</p>
  <p><strong>Téléphone:</strong> ${displayPhone}</p>
  <p><strong>Trajet:</strong> ${displayRoute}</p>
  <p><strong>Paiement:</strong> ${displayPayment}</p>
  <p><strong>Prix:</strong> 4000 XAF</p>
  <p>✔ Votre ticket a été confirmé avec succès.</p>
`;

// Add date/time
const now = new Date();
const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
const formatted = now.toLocaleString('fr-FR', options).replace(/\u202f/g, ' ');
const dateEl = document.getElementById('dateTime');
if (dateEl) dateEl.textContent = `Date & Heure : ${formatted}`;

// Choose logo (the image was removed from the ticket; only set if element exists)
const paymentLogo = document.getElementById("paymentLogo");
if (paymentLogo) {
  if (payment && payment.toLowerCase().includes("orange")) {
    paymentLogo.src = "orange.png";
  } else {
    paymentLogo.src = "mtn.png";
  }
}

// QR code (include date/time)
new QRious({
  element: document.getElementById("qrCode"),
  value: `Ticket Princess Voyage\nNom: ${displayName}\nTéléphone: ${displayPhone}\nTrajet: ${displayRoute}\nPaiement: ${displayPayment}\nPrix: 4000 XAF\nDate: ${formatted}`,
  size: 220
});

// Save ticket as image
document.getElementById("saveTicket").addEventListener("click", function () {
  const ticket = document.getElementById("ticket");
  html2canvas(ticket).then(canvas => {
    const link = document.createElement("a");
    link.download = "ticket.png";
    link.href = canvas.toDataURL();
    link.click();
  });
});