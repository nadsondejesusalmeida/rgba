const html = document.documentElement;
const body = document.querySelector('body');
const themeColorButton = document.getElementById('theme-color-button');
const lightIntensityControl = document.querySelectorAll('.light-intensity-control');
const opacityControl = document.getElementById('opacity-control');
const lightTypeValue = document.querySelectorAll('.light-type-value');

const rgbaDisplay = document.getElementById('rgba-display');
const rgbaDisplayText = document.getElementById('rgba-display-text');
const rgbaCopyButton = document.getElementById('rgba-copy-button');

const rgbRangeProgressValue = 100 / 255;
const opacityRangeProgressValue = 100 / 1;

const rangeProgressColor = 'var(--range-progress-color)';
const trickColor = 'var(--trick-color)';

const themeSystem = localStorage.getItem('themeSystem') || 'light';

function setThemeSystem(theme) {
	const lightThemeIcon = `<ion-icon name="sunny" class="theme-color-icon"></ion-icon>`;
	const darkThemeIcon = `<ion-icon name="moon" class="theme-color-icon"></ion-icon>`;
	
	html.setAttribute('data-theme', theme);
	
	if (theme === 'light') {
		themeColorButton.innerHTML = lightThemeIcon;
	} else {
		themeColorButton.innerHTML = darkThemeIcon;
	}
}

function setRangeColor(direction, firstColor, secondColor, value) {
	return `linear-gradient(${direction}, ${firstColor} ${value}%, ${secondColor} ${value}%)`;
}

function rgba(red, green, blue, opacity) {
	return `rgba(${red}, ${green}, ${blue}, ${opacity})`;
}

function rgbaToRgb(text) {
	if (text.includes(', 1)')) {
		return `${text.replace('rgba(', 'rgb(').replace(', 1)', ')')}`
	} else {
		return text;
	}
}

themeColorButton.addEventListener('click', (e) => {
	const oldTheme = localStorage.getItem('themeSystem') || 'light';
	const newTheme = oldTheme === 'light' ? 'dark' : 'light';
	
	localStorage.setItem('themeSystem', newTheme);
	setThemeSystem(newTheme);
});

setThemeSystem(themeSystem);

lightIntensityControl[0].value = localStorage.getItem('redLightValue') || 0;
lightIntensityControl[1].value = localStorage.getItem('greenLightValue') || 0;
lightIntensityControl[2].value = localStorage.getItem('blueLightValue') || 0;
opacityControl.value = localStorage.getItem('opacityValue') || 1;

let redLightValue = lightIntensityControl[0].value;
let greenLightValue = lightIntensityControl[1].value;
let blueLightValue = lightIntensityControl[2].value;
let opacityValue = opacityControl.value;

body.style.backgroundColor = rgba(redLightValue, greenLightValue, blueLightValue, opacityValue);
rgbaDisplayText.value = rgbaToRgb(rgba(redLightValue, greenLightValue, blueLightValue, opacityValue));

lightIntensityControl.forEach((item, index) => {
	lightIntensityControl[index].style.backgroundImage = setRangeColor('to right', rangeProgressColor, trickColor, lightIntensityControl[index].value * rgbRangeProgressValue);
	
	lightTypeValue[index].textContent = `${lightIntensityControl[index].value}`;
	
	item.addEventListener('input', () => {
		lightIntensityControl.forEach((item2, index2) => {
			item2.style.backgroundImage = setRangeColor('to right', rangeProgressColor, trickColor, lightIntensityControl[index2].value * rgbRangeProgressValue);
		});
		
		redLightValue = lightIntensityControl[0].value;
		greenLightValue = lightIntensityControl[1].value;
		blueLightValue = lightIntensityControl[2].value;
		opacityValue = opacityControl.value;
		
		body.style.backgroundColor = rgba(redLightValue, greenLightValue, blueLightValue, opacityValue);
		
		rgbaDisplay.querySelector('#rgba-display-text').value = rgbaToRgb(rgba(redLightValue, greenLightValue, blueLightValue, opacityValue));
		
		lightTypeValue[index].textContent = `${lightIntensityControl[index].value}`;
		
		localStorage.setItem('redLightValue', redLightValue);
		localStorage.setItem('greenLightValue', greenLightValue);
		localStorage.setItem('blueLightValue', blueLightValue);
	});
});

opacityControl.style.backgroundImage = setRangeColor('to right', rangeProgressColor, trickColor, opacityValue * opacityRangeProgressValue);

lightTypeValue[3].textContent = opacityValue;
	
opacityControl.addEventListener('input', (e) => {
	opacityValue = opacityControl.value;
	
	opacityControl.style.backgroundImage = setRangeColor('to right', rangeProgressColor, trickColor, opacityValue * opacityRangeProgressValue);
	lightTypeValue[3].textContent = opacityValue;
	
	body.style.backgroundColor = rgbaToRgb(rgba(redLightValue, greenLightValue, blueLightValue, opacityValue));
	
	rgbaDisplay.querySelector('#rgba-display-text').value = rgbaToRgb(rgba(redLightValue, greenLightValue, blueLightValue, opacityValue));
	
	localStorage.setItem('opacityValue', opacityValue);
});

rgbaCopyButton.addEventListener('click', function() {
	this.style.borderColor = '#00FF00';
	
	setTimeout(() => {
		rgbaCopyButton.style.borderColor = 'transparent';
	}, 1000);
	
	const oldInput = rgbaDisplay.querySelector('#rgba-display-text');
	const oldInputID = oldInput.id;
	oldInput.select();
	oldInput.setSelectionRange(0, 99999);
	document.execCommand('copy');
	oldInput.remove();
	
	const newInput = document.createElement('input');
	newInput.setAttribute('type', 'text');
	newInput.setAttribute('id', oldInputID);
	newInput.setAttribute('value', rgbaToRgb(rgba(redLightValue, greenLightValue, blueLightValue, opacityValue)));
	newInput.setAttribute('readonly', '');
	
	rgbaDisplay.insertBefore(newInput, rgbaDisplay.firstChild);
})