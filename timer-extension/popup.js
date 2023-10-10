const timeElement = document.getElementById('time');
const currentTime = new Date().toLocaleTimeString();
const nameElement = document.getElementById('name');
const timerElement = document.getElementById('timer');

timeElement.textContent = currentTime;

const updateTimer = () => {
  chrome.storage.local.get(['timer'], ({ timer }) => {
    timerElement.textContent = timer ?? 0;
  });

  timeElement.textContent = new Date().toLocaleTimeString();
};

updateTimer();
setInterval(updateTimer, 1000);

chrome.storage.sync.get(['name']).then((res) => {
  nameElement.textContent = res.name ?? '';
});
