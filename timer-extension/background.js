let currentTimer = 0;
const serviceWorker = this;

chrome.alarms.create('timer', {
  periodInMinutes: 1 / 60,
});

chrome.alarms.onAlarm.addListener((alarm) => {
  chrome.storage.local.get(['timer'], (res) => {
    let time = res.timer ?? 0;
    time++;

    chrome.storage.local.set({ timer: time });
    chrome.action.setBadgeText({ text: time.toString() });

    if (time % 5 === 0) {
      serviceWorker.registration.showNotification('Timer', {
        body: `You have been working for ${time} minutes`,
        icon: 'icon.png',
      });
    }
  });
});
