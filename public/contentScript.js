/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!******************************!*\
  !*** ./src/contentScript.js ***!
  \******************************/
if (window.location.href === 'https://chat.openai.com/chat') {
	let textArea;
	let transcript = '';
	//if (textArea.value.match(/\/factcheck/)) {textArea.value = "OK! " + textArea.value;}

	var recognition = new webkitSpeechRecognition();
	recognition.continuous = false;
	recognition.interimResults = false;

	let recognizing = false;
	recognition.onstart = function () {
		textArea.parentElement.style.borderColor = 'red';
		//textArea.value = '';
		recognizing = true;
		transcript = '';
	};
	recognition.onresult = function (event) {
		// Get the current value of the text area
		var enteredText = textArea.value;
		transcript = '';
		for (var i = event.resultIndex; i < event.results.length; ++i) {
			transcript += event.results[i][0].transcript;
		}
		textArea.focus();
		textArea.value = transcript;
		let ev = new Event('input', { bubbles: true});
        	textArea.dispatchEvent(ev);
		textArea.value = enteredText + " " + transcript;
	};
	recognition.onend = function () {
		textArea.parentElement.style.borderColor = 'lightgray';
		recognizing = false;
		transcript = '';
		//textArea.parentElement.querySelector('button').click();
	};
	recognition.onerror = function (event) {
		console.log('error', event);
		textArea.parentElement.style.borderColor = 'lightgray';
	};

	document.addEventListener(
		'keydown',
		(e) => {
			if (e.code === 'Tab') {
				e.preventDefault();
				e.stopImmediatePropagation();
				textArea = document.querySelector('textarea');
				if (recognizing) {
					recognizing = false;
					recognition.stop();
				} else recognition.start();
			} else if (e.code === 'Space') {
				//e.preventDefault();
				//e.stopImmediatePropagation();
				textArea = document.querySelector('textarea');
				if (textArea.value.match("^/claim")) {
					let pageText = document.body.innerText;
					if (pageText.includes("Is there a key factual claim in the previous response")) {
						textArea.value = "Any others?";
					} else {
						textArea.value = "Is there a key factual claim in the previous response? If so, please quote it.";
					}
				} else if (textArea.value.match("^/fact")) {
					fetch("https://google.com/search?q=test", {
						method: "GET", // specify the request method
						headers: {
							// specify the request headers
							"Content-Type": "text/html"
						}
					  })
						.then(response => response.text()) // parse the response as text
						.then(html => {
						  // create a new cheerio object
						  const $ = cheerio.load(html);
						  // use cheerio to extract the information you want from the page
						  let title = $("title").text();
						  textArea.value = title;
						})
						.catch(error => {
						  // handle any errors
						  console.error(error);
						});
				} else console.log ("No commands recognized.");
			}

		},
		true
	);
	document.addEventListener(
		'keydown',
		(e) => {
			if (e.code === 'Tab') {
				e.preventDefault();
				e.stopImmediatePropagation();
				textArea = document.querySelector('textarea');
				if (recognizing) {
					recognizing = false;
					recognition.stop();
				} else recognition.start();
			}
		},
		true
	);
} else {
	let iframe = document.getElementById('ext-iframe');
	if (iframe) {
		iframe.style.width = iframe.style.width === '0px' ? '500px' : '0px';
	} else {
		iframe = document.createElement('iframe');
		iframe.id = 'ext-iframe';
		iframe.allow = 'microphone;';
		iframe.src = chrome.runtime.getURL('index.html');
		iframe.style.background = 'transparent';
		iframe.style.height = '100%';
		iframe.style.width = '500px';
		iframe.style.overflow = 'hidden';
		iframe.style.position = 'fixed';
		iframe.style.top = '0px';
		iframe.style.right = '0px';
		iframe.style.zIndex = '90000000';
		iframe.style.border = '0px';
		iframe.style.borderLeft = 'lightgray 1px solid';
		document.body.appendChild(iframe);
	}
}

/******/ })()
;
//# sourceMappingURL=contentScript.js.map
