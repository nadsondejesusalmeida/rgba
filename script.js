const body = document.querySelector('body');
const themeColorButton = document.getElementById('theme-color-button');
const lightIntensityControl = document.querySelectorAll('.light-intensity-control');
const opacityControl = document.getElementById('opacity-control');
const lightTypeValue = document.querySelectorAll('.light-type-value');
const rgbDisplay = document.getElementById('rgb-display');
const rgbCopyButton = document.getElementById('rgb-copy-button');

const themeSystem = localStorage.getItem('themeSystem') || 'light';
const rgbValue = 100 / 255;

function setThemeSystem(theme) {
	const lightThemeIcon = `<ion-icon name="sunny" class="theme-color-icon"></ion-icon>`;
	const darkThemeIcon = `<ion-icon name="moon" class="theme-color-icon"></ion-icon>`;
	
	document.documentElement.setAttribute('data-theme', theme);
	
	if (theme === 'light') {
		themeColorButton.innerHTML = lightThemeIcon;
	} else {
		themeColorButton.innerHTML = darkThemeIcon;
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

let rgba = `rgba(${lightIntensityControl[0].value}, ${lightIntensityControl[1].value}, ${lightIntensityControl[2].value}, ${opacityControl.value})`;

document.querySelector('#rgb-display input').value = rgba;

body.style.backgroundColor = rgba;

lightIntensityControl.forEach((item, index) => {
	lightIntensityControl[index].style.backgroundImage = `linear-gradient(to right, #CA0030 ${lightIntensityControl[index].value * rgbValue}%, #A0A0A0 ${lightIntensityControl[index].value * rgbValue}%)`;
	
	lightTypeValue[index].textContent = `${lightIntensityControl[index].value}`;
	
	item.addEventListener('input', () => {
		lightIntensityControl.forEach((item2, index2) => {
			item2.style.backgroundImage =  `linear-gradient(to right, #CA0030 ${lightIntensityControl[index2].value * rgbValue}%, #A0A0A0 ${lightIntensityControl[index2].value * rgbValue}%)`;
		})
		
		body.style.backgroundColor = `rgba(${lightIntensityControl[0].value}, ${lightIntensityControl[1].value}, ${lightIntensityControl[2].value}, ${opacityControl.value})`;
		
		document.querySelector('#rgb-display input').value = `rgba(${lightIntensityControl[0].value}, ${lightIntensityControl[1].value}, ${lightIntensityControl[2].value}, ${opacityControl.value})`;
		
		lightTypeValue[index].textContent = `${lightIntensityControl[index].value}`;
		
		localStorage.setItem('redLightValue', lightIntensityControl[0].value);
		localStorage.setItem('greenLightValue', lightIntensityControl[1].value);
		localStorage.setItem('blueLightValue', lightIntensityControl[2].value);
	});
});

opacityControl.style.backgroundImage = `linear-gradient(to right, #CA0030 ${opacityControl.value * 100}%, #A0A0A0 ${opacityControl.value * 100}%)`;

lightTypeValue[3].textContent = opacityControl.value;
	
opacityControl.addEventListener('input', (e) => {
	opacityControl.style.backgroundImage = `linear-gradient(to right, #CA0030 ${opacityControl.value * 100}%, #A0A0A0 ${opacityControl.value * 100}%)`;
	lightTypeValue[3].textContent = opacityControl.value;
	
	body.style.backgroundColor = `rgba(${lightIntensityControl[0].value}, ${lightIntensityControl[1].value}, ${lightIntensityControl[2].value}, ${opacityControl.value})`;
	
	document.querySelector('#rgb-display input').value = `rgba(${lightIntensityControl[0].value}, ${lightIntensityControl[1].value}, ${lightIntensityControl[2].value}, ${opacityControl.value})`;
	
	localStorage.setItem('opacityValue', opacityControl.value);
});

rgbCopyButton.addEventListener('click', function() {
	this.style.borderColor = '#00FF00';
	
	setTimeout(() => {
		rgbCopyButton.style.borderColor = '#FFFFFF';
	}, 1000)
	
	const oldInput = document.querySelector('#rgb-display input');
	oldInput.select();
	oldInput.setSelectionRange(0, 99999);
	document.execCommand('copy');
	oldInput.remove();
	
	const newInput = document.createElement('input');
	newInput.setAttribute('type', 'text');
	newInput.setAttribute('value', `rgba(${lightIntensityControl[0].value}, ${lightIntensityControl[1].value}, ${lightIntensityControl[2].value}, ${opacityControl.value})`);
	newInput.setAttribute('readonly', '');
	
	document.querySelector('#rgb-display').insertBefore(newInput, document.querySelector('#rgb-display').firstChild);
})