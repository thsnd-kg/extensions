const DEFAULT_TIME_MINUTE = 1;

const time = document.getElementById('timer');
time.textContent = `${DEFAULT_TIME_MINUTE}:00`;

const startTimerBtn = document.getElementById('start-timer-btn');
const resetTimerBtn = document.getElementById('reset-timer-btn');

const updateTimer = () => {
  chrome.storage.local.get(['timer', 'isRunning'], ({ timer, isRunning }) => {
    time.textContent = convertToHHMM(timer);
    startTimerBtn.textContent = isRunning ? 'Pause timer' : 'Start timer';
  });
};

startTimerBtn.addEventListener('click', () => {
  chrome.storage.local.get(['timer', 'isRunning'], ({ isRunning }) => {
    chrome.storage.local.set({ isRunning: !isRunning });
    startTimerBtn.textContent = isRunning ? 'Start timer' : 'Pause timer';

    if (isRunning) {
      updateTimer();
    }
  });
});

resetTimerBtn.addEventListener('click', () => {
  chrome.storage.local.set({ timer: 0, isRunning: false });
  updateTimer();
});

const convertToHHMM = (time) => {
  const minutes = DEFAULT_TIME_MINUTE - Math.ceil(time / 60);
  let seconds = '00';
  if (time % 60 !== 0) {
    seconds = 60 - (time % 60);
  }

  seconds = String(seconds).padStart(2, '0');
  return `${minutes}:${seconds}`;
};

updateTimer();
setInterval(updateTimer, 1000);
