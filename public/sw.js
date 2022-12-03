/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!*******************!*\
  !*** ./src/sw.js ***!
  \*******************/
chrome.action.onClicked.addListener(async (tab) => {
	chrome.scripting.executeScript({ files: ['contentScript.js'], target: { tabId: tab.id } });
});

/******/ })()
;
//# sourceMappingURL=sw.js.map