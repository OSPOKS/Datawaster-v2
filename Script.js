let requestsMade = 0;
let dataUsed = 0;
let interval;
const dataChunkSize = 50; // KB per request
let speed = 0;

const modeSelector = document.getElementById('mode');
const customUrlInput = document.getElementById('custom-url');
modeSelector.addEventListener('change', () => {
  customUrlInput.disabled = modeSelector.value !== 'custom';
});

const wasteData = async () => {
  const mode = modeSelector.value;
  const url =
    mode === 'images'
      ? 'https://via.placeholder.com/150'
      : mode === 'api'
      ? 'https://jsonplaceholder.typicode.com/posts'
      : customUrlInput.value || 'https://jsonplaceholder.typicode.com/posts';

  const startTime = performance.now();
  await fetch(url).catch(() => console.log('Request failed.'));
  const endTime = performance.now();

  requestsMade++;
  dataUsed += dataChunkSize;
  speed = Math.round(dataChunkSize / ((endTime - startTime) / 1000));
  updateStats();
};

const updateStats = () => {
  document.getElementById('requests').textContent = requestsMade;
  document.getElementById('data').textContent = `${dataUsed} KB`;
  document.getElementById('speed').textContent = `${speed} KB/s`;
};

document.getElementById('start-btn').addEventListener('click', () => {
  interval = setInterval(wasteData, 100);
  document.getElementById('pause-btn').disabled = false;
  document.getElementById('stop-btn').disabled = false;
});

document.getElementById('pause-btn').addEventListener('click', () => {
  clearInterval(interval);
});

document.getElementById('stop-btn').addEventListener('click', () => {
  clearInterval(interval);
  requestsMade = 0;
  dataUsed = 0;
  speed = 0;
  updateStats();
  document.getElementById('pause-btn').disabled = true;
  document.getElementById('stop-btn').disabled = true;
});

document.getElementById('toggle-theme').addEventListener('click', () => {
  document.body.dataset.theme =
    document.body.dataset.theme === 'dark' ? 'light' : 'dark';
});
