// Purple Building Theory
//
// Licensed under the MIT License.

// Helper functions
function randomColor() {
	var r = Math.round(Math.random() * 255);
	var g = Math.round(Math.random() * 255);
	var b = Math.round(Math.random() * 255);
	
	return [r, g, b];
}

function getTextContrast(channels) {
	// https://stackoverflow.com/a/11868159/2709212
	// http://www.w3.org/TR/AERT#color-contrast
	const brightness = Math.round(((channels[0] * 299) +
					  (channels[1] * 587) +
					  (channels[2] * 114)) / 1000);
	return (brightness > 125) ? 'black' : 'white';
}

function toCSSRGBColor(channels) {
	return `rgb(${channels[0]}, ${channels[1]}, ${channels[2]})`;
}

// Site Handlers
function changeTodoistTaskStyle(taskElement) {
	if (taskElement.style['backgroundColor']) {
		// Don't change other elements if they've already been colored
		return;
	}
	
	const newColor = randomColor();
	const textColor = getTextContrast(newColor);
	
	taskElement.style.backgroundColor = toCSSRGBColor(newColor);
	taskElement.style.color = textColor;
}

var todoistObserver;

function walkChildren(node, level) {
	node.classList.forEach(c => console.log(`Level ${level}, Class ${c}`));
	
	node.childNodes.forEach(n => walkChildren(n, level + 1));
}

function todoistHandler() {
	// https://stackoverflow.com/a/43112212/2709212
	todoistObserver = new MutationObserver(function(mutations) {
		document.querySelectorAll('.task_content').forEach(e => changeTodoistTaskStyle(e));
	});

	todoistObserver.observe(document.body, {childList: true, subtree: true});
	
	// Handle tasks already on the page
	document.querySelectorAll('.task_content').forEach(e => changeTodoistTaskStyle(e));
}

// var siteHandlers = [todoistHandler];
// var siteHandlers = [mozillaHandler];
// 
// for (var handler in siteHandlers) {
// 	handler();
// }

todoistHandler();