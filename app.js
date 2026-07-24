const baseUrl = 'https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@2024-03-06/v1/currencies';
const btn = document.querySelector('form button');
const dropdowns = document.querySelectorAll('.dropdown select');
const fromCurrency = document.querySelector('.from select');
const toCurrency = document.querySelector('.to select');
const msg = document.querySelector('.msg');

const updateExchangeRate = async () => {
    let amount = document.querySelector('.amount input');
    let amtValue = amount.value;
    if (amtValue === "" || amtValue < 1) {
        amount.value = 1;
        amtValue = 1;
    }

const url = `${baseUrl}/${fromCurrency.value.toLowerCase()}.json`;
let response = await fetch(url);
let data = await response.json();
// console.log(data);
let rate = data[fromCurrency.value.toLowerCase()][toCurrency.value.toLowerCase()];
// console.log(rate);

let finalAmount = (amtValue * rate).toFixed(2);
// console.log(finalAmount);

msg.innerHTML = `${amtValue} ${fromCurrency.value} = ${finalAmount} ${toCurrency.value}`;
}


for (let select of dropdowns) {
    for (currCode in countryList) {
        let newOption = document.createElement('option');
        newOption.value = currCode;
        newOption.text = currCode;
        if (select.name === 'from' && currCode === 'USD') {
            newOption.selected = "Selected";
        }
        else if (select.name === 'to' && currCode === 'PKR') {
            newOption.selected = "Selected";
        }
        select.append(newOption);
    }
    select.addEventListener('change', (e) => {
        flagUpdate(e.target);
    });
}
const flagUpdate = (element) => {
    let currencyCode = element.value;
    let countryCode = countryList[element.value];
    let newSrc = `https://flagsapi.com/${countryCode}/shiny/64.png`;
    let img = element.parentElement.querySelector('img');
    img.src = newSrc;
}

btn.addEventListener('click', (e) => {
    e.preventDefault();
    updateExchangeRate();    
});

window.addEventListener("load", () => {
    updateExchangeRate();
});