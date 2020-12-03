var css = document.querySelector("h3");
var color1 = document.querySelector(".color1");
var color2 = document.querySelector(".color2");
var body = document.getElementById("gradient");
var randomButton = document.getElementById("randomButton");

function matchColorInputAndBackground() {
	// Getting computed styles 
	const style = getComputedStyle(body);

	// Use regex to pattern match. Ex:
	// Stores rgb(255, 0, 0) and other matches as an array
	var pattern = /[r]{1}[g]{1}[b]{1}[(]{1}[0-9, ]+[)$]{1}/g;
	var result = style.background.match(pattern);

	// Filter out and take just the digits out of result array
	// Ex: rgb(255, 0, 0) will convert to [255, 0, 0]
	var rgbColor1 = getRgbDigits(result[0]);
	var rgbColor2 = getRgbDigits(result[1]);

	// Ex: [255, 0, 0] returns "#ff0000" and assign that value
	// to color picker
	color1.value =  rgbToHex(rgbColor1);
	color2.value =  rgbToHex(rgbColor2);

	setGradient()
}

//Parameter is "rgb(x, y, z)" and retrieve [x, y, z] in array
function getRgbDigits(rgb) {
	return rgb.replace(/[^0-9,]/g, '').split(",");
}

function rgbToHex(rgb) {
	var result = "#";
	for(let i=0; i<3; i++) {
		rgb[i] = parseInt(rgb[i]);
		//Need IF statement otherwise rgb of 0 in hex shows 0
		if(rgb[i] === 0) {
			result += "00";
		} else {
			//Need to parse the string to Int to get hex value
			result += rgb[i].toString(16);
		}
		
	}
	return result;
}

function setGradient() {
	body.style.background = 
	"linear-gradient(to right, " 
	+ color1.value 
	+ ", " 
	+ color2.value 
	+ ")";

	css.textContent = body.style.background + ";";
}

function setRandomColor() {
	// color1.value = "#" 
	// + Math.floor(Math.random()*16777215).toString(16);
	// color2.value = "#" 
	// + Math.floor(Math.random()*16777215).toString(16);
	var counter = 0;
	var randomColor1 = "#";
	var randomColor2 = "#";

	while(counter < 12) {
		if(counter < 6) {
			randomColor1 += Math.floor(Math.random()*15).toString(16);
		} else {
			randomColor2 += Math.floor(Math.random()*15).toString(16);
		}
		counter++;
	}
	color1.value = randomColor1;
	color2.value = randomColor2;
	// console.log(randomColor1 + " -- " + randomColor2)
	setGradient()
}

matchColorInputAndBackground();
randomButton.addEventListener("click", setRandomColor);
color1.addEventListener("input", setGradient);
color2.addEventListener("input", setGradient);
