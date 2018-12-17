'use strict';
const content = document.getElementById('content');
const loader = document.getElementById('loader');
const result = document.getElementById('result');
const selectFrom = document.getElementById('from');
const selectTo = document.getElementById('to');
const moneyAmount = document.getElementById('source');

function convert(from, to) {
  result.value = (from.value * moneyAmount.value / to.value).toFixed(2);
}

function sendRequest() {
  const xhr = new XMLHttpRequest();
  xhr.addEventListener('readystatechange', function(event) {
    if (event.currentTarget.readyState === 4) {
      loader.classList.add('hidden');
    	if (event.currentTarget.status === 200) {
        const currencies = JSON.parse(event.currentTarget.responseText);
        content.classList.remove('hidden');
        fillSelect(selectFrom, currencies);
        fillSelect(selectTo, currencies);
      } 
      throw new Error(`Error status: ${event.currentTarget.status} Error description: ${event.currentTarget.statusText}`);
    } else {
    	loader.classList.remove('hidden');
    }
  })
  xhr.open("GET", "https://neto-api.herokuapp.com/currency");
  xhr.send();
}

function fillSelect(node, data) {
  for (let i = 0; i < data.length; i++) {
    node.innerHTML += `<option name="${data[i].code}" value="${data[i].value}">${data[i].code}</option>`;
    }
}

sendRequest();
selectFrom.addEventListener('change', event => convert(event.target, selectTo));
selectTo.addEventListener('change', event => convert(selectFrom, event.target));
moneyAmount.addEventListener('input', () => convert(selectFrom, selectTo));