 var cities = ["Rome","Milan","Naples","Turin","Palermo","Genoa","Bologna","Florence","Bari","Catania","Venice",
    "Verona","Messina","Padua","Trieste","Taranto","Brescia","Parma","Prato","Modena","Reggio Calabria","Reggio Emilia",
    "Perugia","Ravenna","Livorno","Cagliari","Foggia","Rimini","Salerno","Ferrara","Sassari","Latina",
    "Giugliano in Campania","Monza","Syracuse","Bergamo","Pescara","Trento","Forlì","Vicenza","Terni","Bolzano",
    "Novara","Piacenza","Ancona","Andria","Udine","Arezzo","Cesena","Lecce","Pesaro","Barletta","Alessandria",
    "La Spezia","Pistoia","Pisa","Catanzaro","Guidonia Montecelio","Lucca","Brindisi","Torre del Greco","Treviso",
    "Busto Arsizio","Como","Marsala","Grosseto","Sesto San Giovanni","Pozzuoli","Varese","Fiumicino","Casoria","Asti",
    "Cinisello Balsamo","Caserta","Gela","Aprilia","Ragusa","Pavia","Cremona","Carpi","Quartu Sant'Elena",
    "Lamezia Terme","Altamura","Imola","L’Aquila","Massa","Trapani","Viterbo","Cosenza","Potenza",
    "Castellammare di Stabia","Afragola","Vittoria","Crotone","Pomezia","Vigevano","Carrara","Caltanissetta",
    "Viareggio","Fano","Savona","Matera","Olbia","Legnano","Acerra","Marano di Napoli","Benevento","Molfetta",
    "Agrigento","Faenza","Cerignola","Moncalieri","Foligno","Manfredonia","Tivoli","Cuneo","Trani","Bisceglie",
    "Bitonto","Bagheria","Anzio","Portici","Modica","Sanremo","Avellino","Teramo","Montesilvano","Siena","Gallarate",
    "Velletri","Cava de' Tirreni","San Severo","Aversa","Ercolano","Civitavecchia","Acireale","Mazara del Vallo",
    "Rovigo","Pordenone","Battipaglia","Rho","Chieti","Scafati","Scandicci"];

const input = document.getElementById('search');
const select = document.getElementById('select');
const cardCity = document.getElementById('card-city');
const cardWeather = document.getElementById('card-weather');


// evento alla pressione dei tasti della tastiera

 input.addEventListener("keyup", function pressKey(e) {

     if (cardCity.style.visibility === 'hidden') {
         cardCity.style.visibility = 'visible';
     }

     let regex = new RegExp("^" + input.value, "i");
     let filteredOptions = cities.filter(el => el.match(regex));

     // creazione dei li per ogni elemento dell`array filtrato
     let option = filteredOptions.map(item => `<li onclick="emitValue('${item}')">${item}</li>`).join('');
     select.innerHTML = option;

     // risultato alla pressione del pulsante 'ENTER'
     if(e.keyCode == 13) {
         input.value = filteredOptions[0] || "";

         if(input.value !== "") {
             showHide(cardCity);
             showHide(cardWeather);
             // chiamata Fetch al sito internet del meteo
             fetch(`https://api.openweathermap.org/data/2.5/weather?q=${input.value}&units=metric&appid=beb6d316eccbcc5074a01ed2ff2f1db5`)
                 .then(response => response.json())
                 .then(data => generateCard(data));
         }
     }
});

// funzione attivata al click di un elemento della lista filtrata

function emitValue(optionValue) {
     input.value = optionValue;
     input.focus();
}

// funzione per generare la card weather

function generateCard(data) {
    const html = `<div class="box-right--top">
                        <h2>${data.name}</h2>
                    </div>
                    <div class="box-right--second-line">
                        <img src='src/icons/${data.weather[0].icon}.png' alt='weather'> 
                        <span>${data.weather[0].description}</span>
                    </div>
                    <div class='box-right--bottom'>
                        <span>humidity <strong>${data.main.humidity} %</strong></span>
                        <span>wind <strong>${data.wind.speed} m/s</strong></span>
                        <span>clouds <strong>${data.clouds.all}%</strong></span>
                        <span>visibility <strong>${data.visibility} m</strong></span>
                    </div>
                  <div class="delete" onclick="resetAll()">X</div>`;

    cardWeather.innerHTML = html;
}


// Mostra e nascondi le card

function showHide(card) {
 if (card.style.display === "none") {
     card.style.display = "flex";
 } else {
     card.style.display = "none";
 }
}

// Resetta le card

function resetAll(){
     showHide(cardCity);
     showHide(cardWeather);
     input.value = '';
     select.innerHTML = '';
     cardCity.style.visibility = 'hidden';
     cardWeather.innerHTML = '';
     input.focus();
}





