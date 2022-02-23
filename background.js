let autoClickElemSelector =
  "#comment-more-id";
let clickButtonsElemSelector = "[id^='replyMenuButton']";
let copyContentsElemSelector = "div.comment-card__commentcontent-container"; //"p.comment_text";

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({
    autoClickElemSelector,
    clickButtonsElemSelector,
    copyContentsElemSelector,
  });
  console.log(
    "Default selector of autoClickElemSelector to %autoClickElemSelector",
    `selector: ${autoClickElemSelector}`
  );
  console.log(
    "Default selector of clickButtonsElemSelector to %clickButtonsElemSelector",
    `selector: ${clickButtonsElemSelector}`
  );
  console.log(
    "Default selector of copyContentsElemSelector to %copyContentsElemSelector",
    `selector: ${copyContentsElemSelector}`
  );
});
