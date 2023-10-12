console.log('this is content script');

chrome.runtime.sendMessage(
  null,
  'this is content script msg',
  null,
  (response) => {
    console.log('🚀 ~ file: content.js:8 ~ response:', response);
  }
);

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  console.log('listner from content script:', msg, sender);

  sendResponse('ok nha ban');
});
