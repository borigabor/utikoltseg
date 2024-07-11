const adatok = {
    
    benzin: ["1000 cm3-ig 7,6 l/100km",
             "1001-1500 cm3 között 8,6 l/100km",
             "1501-2000 cm3 között 9,5 l/100km",
             "2001-3000 cm3 között 11,4 l/100km",
             "3001 cm3 fölött 13,3 l/100km"
            ],

    dizel:  ["1500 cm3-ig 5,7 l/100km",
             "1501-2000 cm3 között 6,7 l/100km",
             "2001-3000 cm3 között 7,6 l/100km",
             "3001 cm3 fölött 9,5 l/100km"
            ],

    kivalasztott_uzemanyag: [],
}


const uzemanyag = document.getElementById("uzemanyag");
const fogyasztas = document.getElementById("fogyasztas");
const elszamolas = document.getElementById("elszamolas");
const mezo = Array.from(document.querySelectorAll(".mezo"));
const eredmeny_utikolsteg = document.querySelector(".eredmeny-utikolsteg");
const eredmeny_amortizacio = document.querySelector(".eredmeny-amortizacio");
const eredmeny_osszes = document.querySelector(".eredmeny-osszes");
const datum = document.getElementById("datum");
const nyomtat_btn = document.getElementById("nyomtat-btn");
const nyomtatas = document.querySelector(".nyomtatas");
let uresmezo = false;



uzemanyag.value = 0;


window.onload = init;

uzemanyag.addEventListener("change", function(event) {
    if (parseInt(event.target.value) === 1) {
        kivalasztott_uzemanyag = adatok.benzin;
        render(adatok.benzin);
    } else if (parseInt(event.target.value) === 2) {
        kivalasztott_uzemanyag = adatok.dizel;
        render(adatok.dizel);
    } else {
        fogyasztas.innerHTML = `<option value="">...</option>`
    }
})


function init() {

    for (let input of mezo) {
        input.value = "";
    }

    mezo[0].focus();

    nyomtat_btn.disabled = true;

    const honapok = ["Január", "Február", "Március", "Április", "Május", "Június", "Július", "Augusztus", "Szeptember", "Október", "November", "December"];

    let now = new Date();
    let honap = now.getMonth();
    let ev = now.getFullYear();
    let nap = now.getDate();


    datum.innerHTML = `${ev}.${honapok[honap]}${nap}`

}




elszamolas.addEventListener("submit", function(event) {

    event.preventDefault();

    

    for (let i of mezo) {
        if (i.value === "" || parseInt(uzemanyag.value) === 0) {
            uresmezo = true;
            break;
        }
    }




    if (uresmezo) {
        alert("Minden mező kitöltése kötelező!");
    } else {

        let x = kivalasztott_uzemanyag[event.target.fogyasztas.value];
        x = x.replace(",", ".");
        let hossz = x.split(" ").length;
        let fogyasztasi_norma = parseFloat(x.split(" ")[hossz - 2]);
        let uzemanyag_ar = parseFloat(event.target.egysegar.value);
        let km = parseFloat(event.target.tavolsag.value);

        let utikoltseg = parseInt((fogyasztasi_norma * uzemanyag_ar * km) / 100);
        let amortizacio = parseInt(km * 15);
        let osszKoltseg = parseInt(utikoltseg + amortizacio);


        eredmeny_utikolsteg.textContent = `${utikoltseg} Ft`;
        eredmeny_amortizacio.textContent = `${amortizacio} Ft`;
        eredmeny_osszes.innerHTML = `<strong>${osszKoltseg} Ft</strong>`

        nyomtat_btn.disabled = false;
    }

})


    nyomtat_btn.addEventListener("click", function() {
        window.print();

    });





function render (array) {

    let uzemanyagHtmlTemplate = "";

    array.forEach(function(element, index) {
        uzemanyagHtmlTemplate += `
            <option value="${index}">${element}</option>
        `;
    });

    fogyasztas.innerHTML = uzemanyagHtmlTemplate;

}

