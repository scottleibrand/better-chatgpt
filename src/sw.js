chrome.action.onClicked.addListener(async (tab) => {
	chrome.scripting.executeScript({ files: ['contentScript.js'], target: { tabId: tab.id } });
});
