const defaultSettings = {
  workTime: 1,
  shortBreakTime: 5,
  longBreakTime: 15,
};

chrome.alarms.create('timer', {
  periodInMinutes: 1 / 60,
});

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === 'timer') {
    chrome.storage.local.get(['timer', 'isRunning'], (res) => {
      let timer = res.timer ?? 0;
      const isRunning = res.isRunning ?? false;

      if (isRunning) {
        timer = timer + 1;
        chrome.storage.local.set({ timer });

        const isFinished = timer >= defaultSettings.workTime * 60;
        if (isFinished) {
          chrome.storage.local.set({ timer: 0, isRunning: false });
          this.registration.showNotification('Timer', {
            body: `${defaultSettings.workTime} minutes is over`,
            icon: './assets/pomodoro.png',
          });
        }
      }
    });
  }
});
