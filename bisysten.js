// ── NAV HAMBURGER ──
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));

// ── NAV SCROLL ──
window.addEventListener('scroll', () => {
  document.getElementById('navbar').style.boxShadow =
    window.scrollY > 50 ? '0 2px 24px rgba(0,0,0,.6)' : 'none';
});

// ── FADE-UP OBSERVER ──
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); } });
}, { threshold: 0.12 });
document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

// ── ROI CALCULATOR ──
function switchTab(tab, btn) {
  document.querySelectorAll('.roi-tab').forEach(t => t.classList.remove('active'));
  btn.classList.add('active');
  calcROI();
}

function fmt(n) {
  if (n >= 1000) return 'R$' + (n/1000).toFixed(0) + 'k';
  return 'R$' + n.toFixed(0);
}

function calcROI() {
  const ticket = parseFloat(document.getElementById('ticket').value) || 0;
  const clientes = parseFloat(document.getElementById('clientes').value) || 0;
  const mult = parseFloat(document.getElementById('segmento').value) || 1.3;

  const novosCli = Math.round(clientes * (mult - 1));
  const receitaExtra = novosCli * ticket;
  const ano = receitaExtra * 12;
  const plano = 269.90;
  const paybackMeses = receitaExtra > 0 ? Math.max(1, Math.round(plano / receitaExtra * 10) / 10) : '—';

  document.getElementById('res-clientes').textContent = '+' + novosCli;
  document.getElementById('res-receita').textContent = fmt(receitaExtra);
  document.getElementById('res-ano').textContent = fmt(ano);
  document.getElementById('res-payback').textContent = typeof paybackMeses === 'number'
    ? (paybackMeses < 1 ? '< 1 mês' : paybackMeses + ' meses') : '—';
}
calcROI();

// ── FORM ──
document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const btn = this.querySelector('.form-submit');
  btn.textContent = '✓ Mensagem enviada!';
  btn.style.background = '#16a34a';
  btn.disabled = true;
  setTimeout(() => {
    btn.textContent = 'Enviar mensagem →';
    btn.style.background = '';
    btn.disabled = false;
    this.reset();
  }, 4000);
});
