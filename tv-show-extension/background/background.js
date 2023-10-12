chrome.runtime.onInstalled.addListener((details) => {
  console.log(
    '🚀 ~ file: background.js:2 ~ chrome.runtime.onInstalled.addListener ~ details:',
    details
  );
  chrome.contextMenus.create({
    title: 'Test Context Menu',
    id: 'contextMenu',
    contexts: ['page'],
  });

  chrome.contextMenus.create({
    title: 'Test Context Menu 2',
    id: 'contextMenu2',
    contexts: ['page', 'selection'],
  });

  chrome.contextMenus.onClicked.addListener((info, tab) => {
    chrome.tabs.create({
      url: `https://www.youtube.com/results?search_query=${info.selectionText}`,
      index: 1,
    });
    console.log(
      '🚀 ~ file: background.js:19 ~ chrome.contextMenus.onClicked.addListener ~ event:',
      info,
      tab
    );
  });

  chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    console.log(
      '🚀 ~ file: background.js:32 ~ chrome.runtime.onMessage.addListener ~ msg:',
      msg
    );
    console.log(
      '🚀 ~ file: background.js:32 ~ chrome.runtime.onMessage.addListener ~ sender:',
      sender
    );

    sendResponse('recevie msg from content script');
    console.log('--------------');
    chrome.tabs.sendMessage(
      sender.tab.id,
      'this is background script msg',
      {},
      (response) => {
        console.log(
          'SendByTab - receive response from content script',
          response
        );
      }
    );
  });
});
