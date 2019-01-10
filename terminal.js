function sleep(milliseconds) {
	  return new Promise(resolve => setTimeout(resolve, milliseconds));
}

var msg = "";
var key;
var iskeypressed = false;
var writingfinished = false;
var vp = ">";
var p = document.getElementById('terminal');

function onkeydown(event) {
	key = event.keyCode;
	
	if(writingfinished == true) {
		if(key == 8) {
			vp = vp.substring(0, vp.length-1);
		} else if(key == 13) {
			vp += '<br />'
		} else if (key == 9 || key == 16 || key == 17) {
			// Pass
		} else {
			vp += String.fromCharCode(key);
		}
	}

	iskeypressed = false;
	p.innerHTML = vp;
	iskeypressed = true;
}

async function main() {
	fetch('text.txt')
  		.then(response => response.text())
  		.then(text => msg = text)

	document.addEventListener('keydown',onkeydown);
	p.innerHTML = vp;
	await sleep(2000); // Wait 2000ms to simulate a delay
	for(var i=0; i < msg.length; i++) {
		if(msg[i] == '\n') {
		vp += '<br />'
		} else vp += msg[i];

		p.innerHTML = vp + "_";
		await sleep(25);
	}
	writingfinished = true;
	while(true) {
		p.innerHTML = vp;
		await sleep(100);
		p.innerHTML = vp + "_";
		await sleep(100);
	}
}
main();
