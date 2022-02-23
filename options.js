// Input Element
const autoClickInputElem = document.getElementById("autoClickInputElem");
const clickButtonsInputElem = document.getElementById("clickButtonsInputElem");
const copyContentsInputElem = document.getElementById("copyContentsInputElem");
const inputElemList = [
  {
    selectorStorageKey: "autoClickElemSelector",
    inputElem: autoClickInputElem,
  },
  {
    selectorStorageKey: "clickButtonsElemSelector",
    inputElem: clickButtonsInputElem,
  },
  {
    selectorStorageKey: "copyContentsElemSelector",
    inputElem: copyContentsInputElem,
  },
];

// https://stackoverflow.com/questions/256754/how-to-pass-arguments-to-addeventlistener-listener-function
function handleOnInputChange(event) {
  const selectorValue = event.currentTarget.value;
  const selectorStorageKey = event.currentTarget.selectorStorageKey;
  chrome.storage.sync.set({ [selectorStorageKey]: selectorValue });
}

// Initialize input value and event listener
function constructOptions(inputElemList) {
  for (let inputElemObj of inputElemList) {
    const { selectorStorageKey, inputElem } = inputElemObj;
    chrome.storage.sync.get(selectorStorageKey, (data) => {
      inputElem.value = data[selectorStorageKey];
      inputElem.selectorStorageKey = selectorStorageKey;
      inputElem.addEventListener("change", handleOnInputChange);
    });
  }
}
constructOptions(inputElemList);

