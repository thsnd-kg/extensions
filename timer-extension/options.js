const nameInput = document.getElementById('name-input');
const saveBtn = document.getElementById('btn-save');

nameInput.textContent;

saveBtn.addEventListener('click', () => {
  const name = nameInput.value;
  console.log(
    '🚀 ~ file: options.js:6 ~ saveBtn.addEventListener ~ name:',
    name
  );
  chrome.storage.sync.set({ name }).then(() => {
    console.log('name saved', name);
  });
});

chrome.storage.sync.get('name').then((res) => {
  nameInput.value = res.name ?? '';
});
