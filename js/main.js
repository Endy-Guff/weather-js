$(function(){
    $(".slider").roundSlider({
        radius: 80,
        circleShape: "half-top",
        sliderType: "min-range",
        showTooltip: false,
        value: uvIndex,
        width: 5,
        radius: 48,
        borderWidth: 0,
        handleSize: "10, 9",
        readOnly: true,
        min: 1,
        max: 14
    });
});



// f92d475fc672e5f0ddb9ee498c7e6d4f

const tempToday = document.querySelector('.brief__info-temp span'),
      searchInp = document.querySelector('.brief__search-input'),
      citySpan = document.querySelector('.brief__info-item span'),
      briefDate = document.querySelector('#brief__info-date'),
      weatherImgToday = document.querySelector('.brief__weather-img'),
      uvVal = document.querySelector('#uvVal'),
      windSpeed = document.querySelector('#windSpeed'),
      windDegree = document.querySelector('#windDegree'),
      cloudCover = document.querySelector('#cloudCover'),
      cloudCoverRange = document.querySelector('.total__range-scale'),
      cloudCoverScale = document.querySelector('#cloudCoverScale'),
      visibility = document.querySelector('#visibility'),
      visibilityScale = document.querySelector('#visibilityScale'),
      precip = document.querySelector('#precip'),
      checkboxDeg = document.querySelector('.total__checkbox-item');

let city = 'Moscow';

document.addEventListener('keydown', e => {
    if(e.key === 'Enter'){
        let value = searchInp.value
        if(!value) return false
        city = value
        init()
        searchInp.value = ''
    }
})

let uvIndex = 0;

const init = async () => {
    const result = await fetch(`https://api.weatherstack.com/current?access_key=f92d475fc672e5f0ddb9ee498c7e6d4f&query=${city}`);
    const data = await result.json();

    console.log(data);

    citySpan.textContent = `${city}`;

    checkboxDeg.addEventListener('input', () => {
        if(checkboxDeg.checked){
            tempToday.textContent = `${data.current.temperature+33.8}°`;
            tempToday.style.fontSize = '38px'
        } else{
            tempToday.textContent = `${data.current.temperature}°`
        }
    });
        


    briefDate.textContent = `${data.location.localtime}`;
    function weatherToday(){
        let weatherCode = data.current.weather_code;

        if(weatherCode == 122 || weatherCode == 119 || weatherCode == 143 || weatherCode == 248){
            weatherImgToday.setAttribute('src', 'img/cloud.svg');
        } else if(weatherCode == 113){
            weatherImgToday.setAttribute('src', 'img/sun.svg');
        } else if(weatherCode == 176 || weatherCode == 185 || weatherCode == 200 || weatherCode == 263 || weatherCode == 266 || weatherCode == 281 || weatherCode == 284 || weatherCode == 293 || weatherCode == 296 || weatherCode == 299 || weatherCode == 302 || weatherCode == 305 || weatherCode == 308 || weatherCode == 353 || weatherCode == 356 || weatherCode == 359 || weatherCode == 386 || weatherCode == 389){
            weatherImgToday.setAttribute('src', 'img/rain.svg');
        } else if(weatherCode == 116){
            weatherImgToday.setAttribute('src', 'img/cloudy.svg');
        } else if(weatherCode == 179 || weatherCode == 182 || weatherCode == 227 || weatherCode == 230 || weatherCode == 260 || weatherCode == 311 || weatherCode == 314 || weatherCode == 317 || weatherCode == 320 || weatherCode == 323 || weatherCode == 326 || weatherCode == 329 || weatherCode == 332 || weatherCode == 335 || weatherCode == 338 || weatherCode == 350 || weatherCode == 362 || weatherCode == 365 || weatherCode == 368 || weatherCode == 371 || weatherCode == 374 || weatherCode == 377 || weatherCode == 392 || weatherCode == 395){
            weatherImgToday.setAttribute('src', 'img/snow.svg');
        }
    }
    weatherToday();

    uvIndex = data.current.uv_index;
    uvVal.textContent = uvIndex;

    windSpeed.innerHTML = `${data.current.wind_speed}<span>км/ч</span>`;

    if(data.current.wind_speed > 72){
        windDegree.textContent = 'Шторм'
    } else if(data.current.wind_speed > 36){
        windDegree.textContent = 'Сильный ветер'
    } else if(data.current.wind_speed > 20){
        windDegree.textContent = 'Средний ветер'
    } else if(data.current.wind_speed > 1){
        windDegree.textContent = 'Слабый ветер'
    } else if(data.current.wind_speed < 1){
        windDegree.textContent = 'штиль'
    }

    cloudCover.innerHTML = `${data.current.cloudcover}<span>%</span>`;
    cloudCoverRange.style.cssText = `height:${data.current.cloudcover*0.73}px `;

    if(data.current.cloudcover > 70){
        cloudCoverScale.textContent = 'Сильная облачность'
    } else if(data.current.cloudcover > 40){
        cloudCoverScale.textContent = 'Средняя облачность'
    } else if(data.current.cloudcover > 10){
        cloudCoverScale.textContent = 'Слабая облачность'
    } else if(data.current.cloudcover < 10){
        cloudCoverScale.textContent = 'Ясно'
    }


    visibility.innerHTML = `${data.current.visibility}<span>км</span>`;
    if(data.current.visibility > 9){
        visibilityScale.textContent = 'Хорошая видимость'
    } else if(data.current.visibility > 2){
        visibilityScale.textContent = 'Средняя видимость'
    } else if(data.current.visibility < 2){
        visibilityScale.textContent = 'Плохая видимость'
    }


    precip.innerHTML = `${data.current.precip}<span>мм</span>`

    
}

init();


