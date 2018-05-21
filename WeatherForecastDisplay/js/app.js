//get the geodata

geo = navigator.geolocation;
function error(){
	console.warn(`ERROR(${err.code}): ${err.message}`);
}

navigator.geolocation.getCurrentPosition(success, error);

//if geo succeeds, update the DOM with the weather
function success(position){
	var c = position.coords;
	// I used string interpolation to not have to define a bunch of variables.
	$.getJSON(`https://fcc-weather-api.glitch.me/api/current?lat=${c.latitude}&lon=${c.longitude}`, function(data){
		let weather = data.weather[0].main;
		let temp = Math.round(data.main.temp);
		updateUi(weather,temp,"C"); //since the API gives you the temp in celcius, display it as such.
	});
	//
}



let a = 1; //celsius is current mode if 1
let b = 0; //fahrenheit is current mode if 1
function updateUi(currentWeather,temp, units){
	$('.weather').html(`Currently: <span id="weatherColor">${currentWeather}</span>`);
	$('.temp').html(`<span id="tempColor">${temp}</span>&deg; <span id="units">${units}</span>`);
	
	$('#units').on('click',function(){ //when they click the little C/F letter it changes the units.
		if(a === 1){ //convert from C to F
			temp = Math.round(temp * (9/5) + 32);
			a--; //switch mode
			b++;
			updateUi(currentWeather, temp, "F"); //update screen
		}
		else if(b === 1){ //convert from F to C
			temp = Math.round((temp - 32) * (5/9));
			a++; //switch mode
			b--;
			updateUi(currentWeather, temp, "C"); //update screen
		}
	});
	
	// NOTE I DO NOT CLAIM THE IMAGES AND ANIMATIONS USED IN THIS PROJECT AS MY OWN.
  
	if(currentWeather === 'Clear'){
		$('.request').css('background-image', 'url(https://res.cloudinary.com/dqsv19kzu/image/upload/v1526687781/pix5remade.gif)');
		$('#weatherColor').css('color', '#8bfff6');
		$('body').css('background-image', 'url(https://res.cloudinary.com/dqsv19kzu/image/upload/v1526687780/pixel5.jpg)');
	}
	else if(currentWeather === 'Rain'){
		$('.request').css('background-image', 'url(https://res.cloudinary.com/dqsv19kzu/image/upload/v1526687781/pixel4remade.gif)');
		$('#weatherColor').css('color', '#188a8d');
		$('body').css('background-image', 'url(https://res.cloudinary.com/dqsv19kzu/image/upload/v1526687781/pixel4.jpg)');
	}
	else if(currentWeather === 'Clouds' || currentWeather === 'Mist'){
		$('.request').css('background-image', 'url(https://res.cloudinary.com/dqsv19kzu/image/upload/v1526687779/pixel2remade.gif)');
		$('#weatherColor').css('color', '#cbffb1');
		$('body').css('background-image', 'url(https://res.cloudinary.com/dqsv19kzu/image/upload/v1526687780/pixel2.jpg)');
	}
	else if(currentWeather === 'Snow'){
		$('.request').css('background-image', 'url(https://res.cloudinary.com/dqsv19kzu/image/upload/v1526687780/pixel3remade.gif)');
		$('#weatherColor').css('color', '#99B898');
		$('body').css('background-image', 'url(https://res.cloudinary.com/dqsv19kzu/image/upload/v1526687779/pixel3.jpg)');
	}
	else if(currentWeather === 'Haze'){
		$('.request').css('background-image', 'url(https://res.cloudinary.com/dqsv19kzu/image/upload/v1526687779/pixel1remade.gif)');
		$('#weatherColor').css('color', '#FF847C');
		$('body').css('background-image', 'url(https://res.cloudinary.com/dqsv19kzu/image/upload/v1526687779/pixel1.jpg)');
	}
}




