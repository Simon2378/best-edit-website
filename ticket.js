// Get parameters from URL
const urlParams = new URLSearchParams(window.location.search);
const name = urlParams.get("name");
const phone = urlParams.get("phone");
const route = urlParams.get("route");
const payment = urlParams.get("payment");
const ticketType = urlParams.get("ticketType") || 'Normal';
const ageGroup = urlParams.get("ageGroup") || '';
const weight = parseFloat(urlParams.get("weight") || '0');

// calculate amount
let amount = 0;
if (ticketType.toLowerCase() === 'vip') {
  amount = 7000;
} else if (ticketType === 'Colis') {
  amount = weight * 1500;
} else {
  amount = 4000;
}

// Show confirmation message
const displayName = name || '—';
const displayPhone = phone || '—';
const displayRoute = route || '—';
const displayPayment = payment || '—';
const displayType = ticketType || '—';
const displayAge = ageGroup || '—';
const displayWeight = ticketType === 'Colis' ? `${weight} kg` : '—';

document.getElementById("confirmMessage").innerHTML = `
  <p><strong>Nom:</strong> ${displayName}</p>
  <p><strong>Téléphone:</strong> ${displayPhone}</p>
  <p><strong>Trajet:</strong> ${displayRoute}</p>
  <p><strong>Type de billet:</strong> ${displayType}</p>
  ${ticketType === 'Colis' ? `<p><strong>Poids:</strong> ${displayWeight}</p>` : `<p><strong>Catégorie:</strong> ${displayAge}</p>`}
  <p><strong>Paiement:</strong> ${displayPayment}</p>
  <p><strong>Prix:</strong> ${amount} XAF</p>
  <p>✔ Votre ticket a été confirmé avec succès.</p>
`;

// Add date/time
const now = new Date();
const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
const formatted = now.toLocaleString('fr-FR', options).replace(/\u202f/g, ' ');
const dateEl = document.getElementById('dateTime');
if (dateEl) dateEl.textContent = `Date & Heure : ${formatted}`;

// Choose logo (set the ticket payment logo if available)
const ticketPaymentLogo = document.getElementById('ticketPaymentLogo');
function getLogoFor(paymentValue) {
  if (!paymentValue) return '';
  return paymentValue.toLowerCase().includes('orange') ? 'orange..png' : 'mtn.png';
}
if (ticketPaymentLogo) {
  const logo = getLogoFor(payment);
  if (logo) {
    ticketPaymentLogo.src = logo;
    ticketPaymentLogo.classList.remove('hidden');
  }
}

// QR code (include date/time)
let qrText = `Ticket Princess Voyage\nNom: ${displayName}\nTéléphone: ${displayPhone}\nTrajet: ${displayRoute}\nType de billet: ${displayType}\n`;
if (ticketType === 'Colis') qrText += `Poids: ${displayWeight}\n`;
else qrText += `Catégorie: ${displayAge}\n`;
qrText += `Paiement: ${displayPayment}\nPrix: ${amount} XAF\nDate: ${formatted}`;
new QRious({
  element: document.getElementById("qrCode"),
  value: qrText,
  size: 220
});

// if package, initialize map animation
if (ticketType === 'Colis') {
  const mapContainer = document.getElementById('packageMap');
  const mapEl = document.getElementById('map');
  if (mapContainer && mapEl) {
    mapContainer.classList.remove('hidden');
    // simple route coords same as before
    const routes = {
      'Douala-Yaounde': [[4.05, 9.70], [3.86, 11.50]],
      'Yaounde-Douala': [[3.86, 11.50], [4.05, 9.70]],
      'Kribi-Douala': [[2.95, 10.45], [4.05, 9.70]]
    };
    const coords = routes[route] || routes['Douala-Yaounde'];
    const map = L.map('map').setView(coords[0], 7);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);
    const marker = L.marker(coords[0]).addTo(map);
    let progress = 0;
    const step = 0.005;
    const interval = setInterval(() => {
      progress += step;
      if (progress >= 1) {
        progress = 1;
        clearInterval(interval);
      }
      const lat = coords[0][0] + (coords[1][0] - coords[0][0]) * progress;
      const lng = coords[0][1] + (coords[1][1] - coords[0][1]) * progress;
      marker.setLatLng([lat, lng]);
    }, 1000);
  }
}

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

// Back to start (replace current history so user starts fresh)
const backBtn = document.getElementById('backToStart');
if (backBtn) {
  backBtn.addEventListener('click', function () {
    // replace so the ticket page is removed from history
    window.location.replace('index.html');
  });
}