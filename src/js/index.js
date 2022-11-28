import { doc } from "prettier";
import "../css/style.css"

let searchedFilm = '';
const input = document.querySelector('#search');
const searchBtn = document.querySelector('#searchBtn');
const appendDiv = document.querySelector('.append-div');

searchBtn.addEventListener("click", () => {
    appendDiv.innerHTML =''
    searchedFilm = input.value;
    fetch(`https://www.omdbapi.com/?apikey=378d8bf3&t=${searchedFilm}`)
    .then((filmData) => filmData.json())
    .then((filmData) => {
        // Country's Api
        fetch(`https://restcountries.com/v3.1/name/${filmData.Country}`)
        .then((countryData) => countryData.json())
        .then((countryData) => {
            let img = document.createElement('img');
            img.src = countryData[0].flags.png;
            forCurAndFlag.append(img);
        });


        // for actors names
        let str = filmData.Actors
        let arr = str.split(" ");
        let actorsArr = [];

        arr.forEach((names , i) => {
            if(i % 2 == 0){
                actorsArr.push(names);
            }
        });
        let actors = actorsArr.join();


        let div = document.createElement('div');
        div.innerHTML =`    
                        <div class="film-div">
                                <p>Year: ${filmData.Year}</p>
                                <p>Actors: ${actors} </p>
                        </div>`
        appendDiv.append(div); 
        const forCurAndFlag = document.querySelector('.film-div');
        input.value = '';               
    });
});




const first = document.querySelector('#searchF');
const second = document.querySelector('#searchS');
const third = document.querySelector('#searchT');
const filmsBtn = document.querySelector('#filmsBtn');
const timeAndPop = document.querySelector('.time-and-population');


filmsBtn.addEventListener("click", () => {
    timeAndPop.innerHTML = '';
    fetch(`https://www.omdbapi.com/?apikey=378d8bf3&t=${first.value}`)
    .then((firstData) => firstData.json())
    .then((firstData) => {

        fetch(`https://www.omdbapi.com/?apikey=378d8bf3&t=${second.value}`)
        .then((secondData) => secondData.json())
        .then((secondData) => {

            fetch(`https://www.omdbapi.com/?apikey=378d8bf3&t=${third.value}`)
            .then((thirdData) => thirdData.json())
            .then((thirdData) => {
                let firstTime = Number(firstData.Runtime.split(' ')[0]);
                let secondTime = Number(secondData.Runtime.split(' ')[0]);
                let thirdTime = Number(thirdData.Runtime.split(' ')[0]);
                let totalTime = firstTime + secondTime + thirdTime;
                

                fetch(`https://restcountries.com/v3.1/name/${firstData.Country}`)
                .then((firstCountryData) => firstCountryData.json())
                .then((firstCountryData) => {

                    fetch(`https://restcountries.com/v3.1/name/${secondData.Country}`)
                    .then((secondCountryData) => secondCountryData.json())
                    .then((secondCountryData) => {

                        fetch(`https://restcountries.com/v3.1/name/${secondData.Country}`)
                        .then((thirdCountryData) => thirdCountryData.json())
                        .then((thirdCountryData) => {
                            let firstPop = firstCountryData[0].population;
                            let secondPop = secondCountryData[0].population;
                            let thirdPop = thirdCountryData[0].population;
                            let totalPop = firstPop + secondPop + thirdPop;
                            let totalPopf = totalPop.toLocaleString();

                            let div2 = document.createElement('div');

                            div2.innerHTML = `  <div>
                                                    <p>Time: ${totalTime} min</p>
                                                    <p>Population: ${totalPopf} people</p>
                                                </div>`
                            
                            timeAndPop.append(div2);
                            first.value = '';
                            second.value = '';
                            third.value = '';
                        });

                    });

                });
            });

        });

    });
});


