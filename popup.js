// Button Elements
const autoClickBtnElem = document.getElementById("autoClickBtnElem");
const clickButtonsBtnElem = document.getElementById("clickButtonsBtnElem");
const copyContentsBtnElem = document.getElementById("copyContentsBtnElem");
const btnElemList = [
  {
    selectorStorageKey: "autoClickElemSelector",
    btnElem: autoClickBtnElem,
  },
  {
    selectorStorageKey: "clickButtonsElemSelector",
    btnElem: clickButtonsBtnElem,
  },
  {
    selectorStorageKey: "copyContentsElemSelector",
    btnElem: copyContentsBtnElem,
  },
];

// Initialize button title with selector and event listener
function constructOptions(btnElemList) {
  for (let btnElemObj of btnElemList) {
    const { selectorStorageKey, btnElem } = btnElemObj;
    console.log("selectorStorageKey", selectorStorageKey);
    chrome.storage.sync.get(selectorStorageKey, (data) => {
      btnElem.title = `${btnElem.title} - selector: ${data[selectorStorageKey]}`;
    });
  }
}
constructOptions(btnElemList);

// Click event listener on autoClickBtnElem
autoClickBtnElem.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({
    active: true,
    currentWindow: true,
  });
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: handleClickAutoClickBtnElem,
  });
});

function handleClickAutoClickBtnElem() {
  console.log("handleClickAutoClickBtnElem");
  chrome.storage.sync.get(
    "autoClickElemSelector",
    ({ autoClickElemSelector }) => {
      console.log("autoClickElemSelector", autoClickElemSelector);
      let idInterval = setInterval(function () {
        const button = document.querySelector(autoClickElemSelector);
        if (button) {
          button.click();
        } else {
          if (idInterval) {
            clearInterval(idInterval);
          }
        }
      }, 1000);
    }
  );
}

// Click event listener on clickButtonsBtnElem
clickButtonsBtnElem.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({
    active: true,
    currentWindow: true,
  });
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: handleClickClickButtonsBtnElem,
  });
});

function handleClickClickButtonsBtnElem() {
  console.log("handleClickClickButtonsBtnElem");
  chrome.storage.sync.get(
    "clickButtonsElemSelector",
    ({ clickButtonsElemSelector }) => {
      console.log("clickButtonsElemSelector", clickButtonsElemSelector);
      const listOfReplyButtons = document.querySelectorAll(
        clickButtonsElemSelector
      );
      for (let i = 0; i < listOfReplyButtons.length; i++) {
        let button = document.querySelectorAll(clickButtonsElemSelector)[i];
        button.click();
      }
    }
  );
}

// Click event listener on copyContentsBtnElem
copyContentsBtnElem.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({
    active: true,
    currentWindow: true,
  });
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: handleClickCopyContentsBtnElem,
  });
});

function handleClickCopyContentsBtnElem() {
  console.log("handleClickCopyContentsBtnElem");
  chrome.storage.sync.get(
    "copyContentsElemSelector",
    ({ copyContentsElemSelector }) => {
      console.log("copyContentsElemSelector", copyContentsElemSelector);
      const listOfContentElements = document.querySelectorAll(
        copyContentsElemSelector
      );
      let listOfContentString = [];
      for (contentElement of listOfContentElements) {
        listOfContentString.push(
          contentElement.textContent.replace(/\s/g, " ")
        );
      }
      // Copy text to clipboard
      if (listOfContentString.length) {
        const textToCopy = listOfContentString.join("\r\n").trim();
        copyTextToClipboard(textToCopy);
      }
    }
  );

  // https://stackoverflow.com/questions/3436102/copy-to-clipboard-in-chrome-extension
  function copyTextToClipboard(text) {
    //Create a textbox field where we can insert text to.
    var copyFrom = document.createElement("textarea");

    //Set the text content to be the text you wished to copy.
    copyFrom.textContent = text;

    //Append the textbox field into the body as a child.
    //"execCommand()" only works when there exists selected text, and the text is inside
    //document.body (meaning the text is part of a valid rendered HTML element).
    document.body.appendChild(copyFrom);

    //Select all the text!
    copyFrom.select();

    //Execute command
    document.execCommand("copy");

    //(Optional) De-select the text using blur().
    copyFrom.blur();

    //Remove the textbox field from the document.body, so no other JavaScript nor
    //other elements can get access to this.
    document.body.removeChild(copyFrom);
  }
}
