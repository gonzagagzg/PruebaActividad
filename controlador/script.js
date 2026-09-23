// --- LLUVIA MATRIX EN CANAVS ---
const canvas = document.getElementById('matrix');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const chars = '01ABCDEFGHIJKLMNOPQRSTUVWXYZｦｱｳｴｵｶｷｹｺｻｼｽｾｿﾀﾂﾃﾅﾆﾇﾈﾊﾋﾎﾏﾐﾑﾒﾓﾔﾕﾗﾘﾜ987654321';
const fontSize = 14;
const columns = Math.floor(canvas.width / fontSize);
const drops = Array(columns).fill(1);

function drawMatrix() {
  ctx.fillStyle = 'rgba(5, 0, 0, 0.08)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = '#ff0033';
  ctx.font = `${fontSize}px monospace`;

  for (let i = 0; i < drops.length; i++) {
    const text = chars[Math.floor(Math.random() * chars.length)];
    ctx.fillText(text, i * fontSize, drops[i] * fontSize);

    if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
      drops[i] = 0;
    }
    drops[i]++;
  }
}
setInterval(drawMatrix, 33);

// --- EFECTO DE TIPEO EN CONSOLA ---
const textToType = "Cancelando secuencia de autodestrucción...\nTodos los sistemas entrando en hibernación.\nConexión finalizada de manera segura.";
let index = 0;
const typingElement = document.getElementById('typingText');

function typeEffect() {
  if (index < textToType.length) {
    typingElement.textContent += textToType.charAt(index);
    index++;
    setTimeout(typeEffect, 40);
  }
}
setTimeout(typeEffect, 500);

// --- ACCIONES INTERACTIVAS ---
function triggerGlitch() {
  document.body.classList.add('shake');
  playBeep(150, 'sawtooth');
  setTimeout(() => {
    document.body.classList.remove('shake');
  }, 500);
}

function simulateHack() {
  typingElement.textContent = "> DESCRIPTANDO ARCHIVOS...\n> ACCESS GRANTED.\n> INGRESO AL SISTEMA EXITOSO.";
  playBeep(440, 'square');
}

// --- SINTETIZADOR DE SONIDO RETRO (Web Audio API) ---
function playBeep(freq = 220, type = 'square') {
  try {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

    gain.gain.setValueAtTime(0.05, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.00001, audioCtx.currentTime + 0.3);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + 0.3);
  } catch (e) {
    // Audio bloqueado hasta interacción del usuario
  }
}