window.addEventListener('load', ddl);
window.addEventListener('load', haeleffat);
window.addEventListener('load', haepaiva);



function loadData() {
    var xhr = new XMLHttpRequest();

    xhr.open('GET', 'https://www.finnkino.fi/xml/TheatreAreas/', true);

  xhr.onload = function() {
    if (xhr.readyState == 4 && xhr.status == 200) {
        var leffat = JSON.parse(JSON.stringify(this.response));
        
        xmlDoc = xhr.responseXML;
        teatteriTiedot = xmlDoc.getElementsByTagName("TheatreArea");

    //  luodaan taulukko, jonne tulostetaan halutut arvot
        taulukko = "<tr><th> Movie theaters </th></th>";

        console.log(leffat);      
        
    // käydään läpi kaikki leffateatterit ID-tunnuksien mukaan
        for (i = 2; i < teatteriTiedot.length; i = i + 1) {
        var id = teatteriTiedot[i].getElementsByTagName("ID")[0].childNodes[0].nodeValue;
        taulukko += "<tr onclick='show(" + id + ")'><td>";
        // lisätään elokuvateatterit nimen mukaan taulukkoon
        taulukko = taulukko + teatteriTiedot[i].getElementsByTagName("Name")[0].childNodes[0].nodeValue;
        }
        // luodaan taulukko "theaters"-osioon
        document.getElementById("theaters").innerHTML = taulukko;

        }
    }
    xhr.send();
}

function ddl() {
    var xhr = new XMLHttpRequest();

    xhr.open('GET', 'https://www.finnkino.fi/xml/TheatreAreas/', true);

  xhr.onload = function() {
    if (xhr.readyState == 4 && xhr.status == 200) {
        var leffat = JSON.parse(JSON.stringify(this.response));
        
        xmlDoc = xhr.responseXML;
        teatteriTiedot = xmlDoc.getElementsByTagName("TheatreArea");
        ddl = document.getElementById("ddmenu");

        for (i = 2; i < teatteriTiedot.length; i = i + 1) {
            var id = teatteriTiedot[i].getElementsByTagName("ID")[0].childNodes[0].nodeValue;
            var option = document.createElement("option");
            option.text = teatteriTiedot[i].getElementsByTagName("Name")[0].childNodes[0].nodeValue;
            option.value = teatteriTiedot[i].getElementsByTagName("ID")[0].childNodes[0].nodeValue;
            ddl.options.add(option);
        }
    }
}
    xhr.send();
}

function haeleffat() {
    var xhr = new XMLHttpRequest();

    xhr.open('GET', 'https://www.finnkino.fi/xml/Events/', true);

  xhr.onload = function() {
    if (xhr.readyState == 4 && xhr.status == 200) {
        var leffat = JSON.parse(JSON.stringify(this.response));
        
        xmlDoc = xhr.responseXML;
        näytösTiedot = xmlDoc.getElementsByTagName("Event");
        ddl = document.getElementById("elokuvat");

        for (i = 1; i < näytösTiedot.length; i = i + 1) {
           
            var option = document.createElement("option");
            option.text = näytösTiedot[i].getElementsByTagName("Title")[0].childNodes[0].nodeValue;
            option.value = näytösTiedot[i].getElementsByTagName("ID")[0].childNodes[0].nodeValue;
            ddl.options.add(option);
        
        }
    }
}
    xhr.send();
}

function haepaiva() {
    var xhr = new XMLHttpRequest();

    xhr.open('GET', 'https://www.finnkino.fi/xml/Schedule/', true);

  xhr.onload = function() {
    if (xhr.readyState == 4 && xhr.status == 200) {
        var leffat = JSON.parse(JSON.stringify(this.response));
        
        xmlDoc = xhr.responseXML;
        näytösTiedot = xmlDoc.getElementsByTagName("Show");
        ddl = document.getElementById("paivat");

        for (i = 1; i < näytösTiedot.length; i = i + 1) {
           
            var option = document.createElement("option");
            option.text = näytösTiedot[i].getElementsByTagName("dttmShowStart")[0].childNodes[0].nodeValue;
            option.value = näytösTiedot[i].getElementsByTagName("ID")[0].childNodes[0].nodeValue;
            ddl.options.add(option);
        
        }
    }
}
    xhr.send();
}



function haeAikataulut() {
    var xhr = new XMLHttpRequest();

    xhr.open('GET', 'https://www.finnkino.fi/xml/Schedule/', true);

  xhr.onload = function() {
    if (xhr.readyState == 4 && xhr.status == 200) {
        var leffat = JSON.parse(JSON.stringify(this.response));
        
        xmlDoc = xhr.responseXML;
        näytösiedot = xmlDoc.getElementsByTagName("Show");

    //  luodaan taulukko, jonne tulostetaan halutut arvot
        taulukko = "<tr><th> Aikataulut </th></th>";

        console.log(leffat);      
        
    // käydään läpi kaikki leffateatterit ID-tunnuksien mukaan
        for (i = 2; i < näytösiedot.length; i = i + 1) {
        var id = näytösiedot[i].getElementsByTagName("ID")[0].childNodes[0].nodeValue;
        taulukko += "<tr onclick='show(" + id + ")'><td>";
        // lisätään elokuvateatterit nimen mukaan taulukkoon
        taulukko = taulukko + näytösiedot[i].getElementsByTagName("Title")[0].childNodes[0].nodeValue;
        taulukko = taulukko + näytösiedot[i].getElementsByTagName("Genres")[0].childNodes[0].nodeValue;
        }
        // luodaan taulukko "theaters"-osioon
        document.getElementById("aikataulut").innerHTML = taulukko;

        }
    }
    xhr.send();
}


    

   /*
xmlDoc = xhr.responseXML;
teatteriTiedot = xmlDoc.getElementsByTagName("TheatreArea");

console.log(teatteriTiedot);    

// luodaan select form teattereille
var selectList = document.createElement("select");
selectList.id = "teatteriSelect";
document.getElementById("theaters").appendChild(selectList);




// käydään läpi kaikki leffateatterit ID-tunnuksien mukaan
for (i = 0; i < teatteriTiedot.length; i = i + 1) {
var option = document.createElement("option");
option.value = teatteriTiedot[i].getElementsByTagName("Name")[0].childNodes[0].nodeValue;
option.text = teatteriTiedot[i].getElementsByTagName("Name")[0].childNodes[0].nodeValue;

    selectList.appendChild(option);

} */