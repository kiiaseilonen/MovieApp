window.addEventListener('load', haeTeatteri);


window.onload=function(){

// asetetaan select-valikoille eventlistenerit
document.getElementById("lataaNaytos").addEventListener('click', lataaNaytokset);
document.getElementById("teatterit").addEventListener('change', haePaivat);
document.getElementById("paivat").addEventListener('change', haeLeffat);
}

// luodaan funktio, jossa haetaan apista select-valikkoon lista elokuvateattereista optioneiksi
function haeTeatteri() {
    // luodaan request apille
    var xhr = new XMLHttpRequest();

    xhr.open('GET', 'https://www.finnkino.fi/xml/TheatreAreas/', true);


    xhr.onload = function() {

        // tarkistetaan, että pyyntö on mennyt onnistuneesti läpi
        if (xhr.readyState == 4 && xhr.status == 200) {
            
            // haetaan ja parsitaan XML-muotoinen data
            xmlDoc = xhr.responseXML;
            teatteriTiedot = xmlDoc.getElementsByTagName("TheatreArea");

            // haetaan html-tiedostosta elementti, jonne apista saatu data halutaan lisätä
            teatteri = document.getElementById("teatterit");

            // käydään for loopin avulla apin tiedot läpi ja tallennetaan niistä nimi ja id dropdown-valikon selecteiksi
            for (i = 2; i < teatteriTiedot.length; i = i + 1) {
                var option = document.createElement("option");
                option.text = teatteriTiedot[i].getElementsByTagName("Name")[0].childNodes[0].nodeValue;
                option.value = teatteriTiedot[i].getElementsByTagName("ID")[0].childNodes[0].nodeValue;

                // lisätään jokainen teatteri listalle
                teatteri.options.add(option);
            
            }   
        }
    }
    xhr.send();
}

// luodaan funktio, jossa haetaan apista select-valikkoon lista elokuvista optioneiksi
function haePaivat() {
    // haetaan elementti, jonne data lisätään ja resetataan edellinen arvo asettamalla innerHTML tyhjäksi
    var paivatSelect = document.getElementById("paivat");
    paivatSelect.innerHTML = "";

    // haetaan valitun teatterin id api requestia varten
    var teatteri = document.getElementById("teatterit");
    var valittuTeatteri = teatteri.value;
            
    var xhr = new XMLHttpRequest();

    // lisätään requestiin filtteriksi valittu elokuvateatteri, jolloin eri teattereille saadaan oikeat päivämäärät näkyviin
    xhr.open("GET", "https://www.finnkino.fi/xml/ScheduleDates/?area=" + valittuTeatteri, true);  


  xhr.onload = function() {
    if (xhr.readyState == 4 && xhr.status == 200) {
        
        xmlDoc = xhr.responseXML;
        

        näytösTiedot = xmlDoc.getElementsByTagName("Dates");
        var pvm = xmlDoc.getElementsByTagName("dateTime");
        
        // käydään for loopin avulla apin tiedot läpi ja tallennetaan päivämäärä dropdown-valikon selecteiksi
        for (i = 2; i < pvm.length; i = i + 1) {

            var option = document.createElement("option");
            option.text = pvm[i].childNodes[0].nodeValue;
            option.value = pvm[i].childNodes[0].nodeValue;

            // luodaan muuttujat, joiden avulla päivämäärän saa oikeaan muotoon
                var pva =  option.value.substring(8, 10);
                var kk =  option.value.substring(5, 7);
                var vuosi =  option.value.substring(0, 4);
               
            // luodaan option-muuttuja ja aseteteaan sille yllämainitut arvot
            var option = new Option(pva + "." + kk + "." + vuosi);

            // lisätään päivämäärät listalle
            paivatSelect.options.add(option);
        }   
    }
}
    xhr.send();
}


// luodaan funktio, jossa haetaan apista select-valikkoon lista elokuvista optioneiksi
function haeLeffat() {
    // haetaan elementti, jonne data lisätään ja resetataan edellinen arvo asettamalla innerHTML tyhjäksi
    var ddl = document.getElementById("elokuvat");
    ddl.innerHTML = "";
    
    // haetaan valitun teatterin id ja valittu päivämäärä api requestia varten
    var teatteri = document.getElementById("teatterit");
    var valittuTeatteri = teatteri.value;
    var paiva = document.getElementById("paivat");
    var valittuPaiva = paiva.value;

    var xhr = new XMLHttpRequest();

    // lisätään requestiin filtteriksi valittu elokuvateatteri ja päivämäätä, jolloin eri teattereille ja päivämäärille saadaan oikeat elokuvat näkyviin
    xhr.open('GET', 'https://www.finnkino.fi/xml/Schedule/' + '?area=' + valittuTeatteri + "&dt=" + valittuPaiva, true);


    xhr.onload = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            
            xmlDoc = xhr.responseXML;
            teatteriTiedot = xmlDoc.getElementsByTagName("Show");
            elokuva = document.getElementById("elokuvat");
        
            var option = document.createElement("option");
            // luodaan ensimmäiseksi vaihtoehdoksi "kaikki elokuvat", jolloin käyttäjä voi hakea kaikki elokuvat
            option.text = "Kaikki elokuvat";
            option.value = "hidden";
            // lisätään option listaan
            elokuva.options.add(option);

            // käydään for loopin avulla apin tiedot läpi ja tallennetaan niistä nimi ja id
            for (i = 0; i < teatteriTiedot.length; i = i + 1) {

                var option = document.createElement("option");
                option.text = teatteriTiedot[i].getElementsByTagName("Title")[0].childNodes[0].nodeValue;
                option.value = teatteriTiedot[i].getElementsByTagName("EventID")[0].childNodes[0].nodeValue;

            
            elokuva.options.add(option);
                console.log(option);

            } 

            // luodaan uusi taulukko, jonne lisätään select-listalle tulevat elokuvat (poistaaksemme dublicatet)
            const options = []

            // haetaan ja käydään läpi jokainen aiemmin luotu option
            document.querySelectorAll('#elokuvat > option').forEach((option) => {
                // tarkistetaan onko elokuva jo listalla. Jos on niin poistetaan, jos ei niin lisätään listalle
                if (options.includes(option.value)) {
                    option.remove()
                    } else options.push(option.value)
            })
        }
    }  
        
    xhr.send();
}



// luodaan funktio, jossa ladataan käyttäjän valintojen perusteella taulukko elokuvista näytölle
 function lataaNaytokset() {

    // haetaan api-pyyntöä varten pari muuttujaa
    var teatteri = document.getElementById("teatterit");
    var valittuTeatteri = teatteri.value;
    console.log(valittuTeatteri);
    var elokuva = document.getElementById("elokuvat");
    var valittuElokuva = elokuva.value;
    console.log(valittuElokuva);
    var paiva = document.getElementById("paivat");
    var valittuPaiva = paiva.value;
    console.log(valittuPaiva);

    var xhr = new XMLHttpRequest();
  
    // lisätään requestiin filtteriksi valittu elokuvateatteri, valittu elokuva ja päivämäätä, jolloin eri teattereille ja päivämäärille saadaan oikeat elokuvat näkyviin
    xhr.open("GET", "https://www.finnkino.fi/xml/Schedule/?area=" + valittuTeatteri + "&dt=" + valittuPaiva + "&eventID=" + valittuElokuva, true);  
            
    xhr.onload = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
    
            xmlDoc = xhr.responseXML;
            etsiElokuvat = xmlDoc.getElementsByTagName("Show");

            // luodaan taulukko, jonne elokuvien tiedot tulostetaan
            taulukko = "<table>";

            //käydään kaikki hakua vastaavat elokuvat läpi
           for (i = 0; i < etsiElokuvat.length; i = i + 1) {

            //haetaan niistä päivämäärä-tiedot ja muokataan siistimpään esitysmuotoon
                var dt = etsiElokuvat[i].getElementsByTagName("dttmShowStart")[0].childNodes[0].nodeValue;
                var pva = dt.substring(8, 10);
                var kk = dt.substring(5, 7);
                var vuosi = dt.substring(0, 4);
                var pvm = pva + "." + kk + "." + vuosi;
                
                var aika = dt.substring(11, 16);
                
                //lisätään taulukkoon ensimmäinen rivi
                taulukko += '<tr>';
                  
                    // lisätään taulukkoon valitut tiedot, jotka tulostetaan näytölle
                    taulukko += '<td rowspan="3">'  + '<img class="leffakuva" src=' + etsiElokuvat[i].getElementsByTagName("EventSmallImagePortrait")[0].childNodes[0].nodeValue + '></td>';
                    taulukko += '<td>' + '<h3>' + etsiElokuvat[i].getElementsByTagName("Title")[0].childNodes[0].nodeValue; + '</h3>' + '</td>';
                taulukko += '</tr>';
                taulukko += '<tr>';
                    taulukko += '<td>' + '<h4 id="time">' + aika + '</h4>' + '</td>';
                    taulukko += '<td>' + '<h4 id="theather">' + etsiElokuvat[i].getElementsByTagName("Theatre")[0].childNodes[0].nodeValue; + '</h4>' + '</td>';
                    taulukko += '<td>' +  '<h4>' + etsiElokuvat[i].getElementsByTagName("PresentationMethod")[0].childNodes[0].nodeValue;  + '</h4>' + '</td>';
                taulukko += '</tr>';
                taulukko += '<tr class="line">';
                    taulukko += '<td>' + '<h5 id ="date">' + pvm + '</h5>' + '</td>';
                    taulukko += '<td>' + '<h4 id="auditorium">' + etsiElokuvat[i].getElementsByTagName("TheatreAuditorium")[0].childNodes[0].nodeValue; + '</h4>' + '</td>';
                    taulukko += '<td>' +  '<h4>' + etsiElokuvat[i].getElementsByTagName("Genres")[0].childNodes[0].nodeValue; + '</h4>' + '</td>';
                    
                taulukko += '</tr>';
            }

            taulukko += "</table>";

            // tulostetaan taulukko sille annetun diviin
            document.getElementById("leffatiedot").innerHTML = taulukko;
        } 
       
    }          
    xhr.send();
}