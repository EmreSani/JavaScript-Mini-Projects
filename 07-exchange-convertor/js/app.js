// API
let API_URL = "https://api.exchangerate-api.com/v4/latest/";

// DOM ELEMENTLERİ
let currencyOne = document.getElementById("currency-one");
let currencyTwo = document.getElementById("currency-two");
let amountEl = document.getElementById("amount");
let btnConvert = document.getElementById("btn-convert");
let resultEl = document.getElementById("result");

// ================ 1. YÖNTEM ================

// // Fetch ile data çekme
// fetch("./data/currencies.json")
//     .then(response => response.json()) // json() ile data JavaScript nesnesine çevrilir.
//     .then(data => {
//         // console.log(data);

//         let keys = Object.keys(data);
//         // console.log(keys);
//         let values = Object.values(data);
//         // console.log(values);

//         let optionStr = "";

//     //    values.map((item, index) => {
//     //         optionStr += `<option value=${keys[index]}> ${item} </option>`;
//     //     }).join("");
//     //     console.log(optionStr);

//     for(let i = 0; i < keys.length; i++){
//         optionStr += `<option value=${keys[i]}> ${values[i]} </option>`;
//     }

//     currencyOne.innerHTML = optionStr;
//     currencyTwo.innerHTML = optionStr;


//     })
//     .catch(error => console.log(error));

// // Buttona tıklandığında:
// btnConvert.addEventListener("click", () => {

//     let baseCurrency = currencyOne.value;
//     let targetCurrency = currencyTwo.value;
//     // console.log(baseCurrency, targetCurrency); API'a gönderilecek şekilde hazırlandı.

//     let amount = amountEl.value;
//     // console.log(amount);

//     fetch(`${API_URL}${baseCurrency}`)
//         .then(response => response.json())
//         .then(data => {
//             // console.log(data);

//             let rates = data.rates[targetCurrency]; // data'ya git, rates elementine gir, targetCurrency'i al.
            
//             resultEl.innerHTML = `${amount} ${baseCurrency} = ${(rates*amount).toFixed(2)} ${targetCurrency}`;
//             amountEl.value = "";

//         })

// });


// ================ 2. YÖNTEM ================

async function fetchCurrencies(){

    try {
        
        const response = await fetch("./data/currencies.json");
        const data = await response.json();

        // console.log(data);
        
        let keys = Object.keys(data);
        let values = Object.values(data);

        let optionStr = "";
        for(let i = 0; i < keys.length ; i++){
            optionStr += `<option value=${keys[i]}> ${values[i]} </option>`;
        }

        currencyOne.innerHTML=optionStr;
        currencyTwo.innerHTML=optionStr;
        

    } catch (error) {
        console.log(error);
    }
}

fetchCurrencies()

async function convertCurrency() {

    let baseCurrency = currencyOne.value;
    let targetCurrency = currencyTwo.value;
    let amount = amountEl.value;

    try {
        
        const response = await fetch(`${API_URL}${baseCurrency}`);
        const data = await response.json();

        console.log(data);
        let rates = data.rates[targetCurrency];


        resultEl.innerHTML = `${amount} ${baseCurrency} = ${(rates*amount).toFixed(2)} ${targetCurrency}`;
        amountEl.value = "";


    } catch (error) {
        console.log(error);
    }
    
}

btnConvert.addEventListener("click", convertCurrency);

// getData("USD")


// const getData = async(baseCurrency) => {

//     try {
//         const response = await fetch(`${API_URL}${baseCurrency}`);
//         const data = await response.json();


        
//     } catch (error) {
//         console.log(error);
//     }
// }

// Birden fazla API'ı/Datayı aynı anda daha hızlı çekebilmek için Promise kullanılması daha efektiftir. Örneğin:
// async function fetchMultipleCurrency() {

//     try {
        
//         const [uSDResponse, otherResponse] = await Promise.all([
//             fetch(`${API_URL_USD}`),
//             fetch(`${API_URL_OTHERS}`)
//         ]);

//         const usdData = await uSDResponse.json();
//         const otherData = await otherResponse.json();



//     } catch (error) {
//         console.log(error);
//     }
    
// }