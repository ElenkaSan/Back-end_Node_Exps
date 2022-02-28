// Part 1
let URL = 'http://numbersapi.com';

async function number() {
    let data = await $.getJSON(`${URL}/7?json`);
    console.log(data);
  }
  number();
  
const numbers = [3, 13, 23];
async function nums() {
    let data = await $.getJSON(`${URL}/${numbers}?json`);
    console.log(data);
  }
  nums();
  
async function favoriteNumber() {
    let len = await Promise.all(Array.from({ length: 4 }, () => $.getJSON(`${URL}/7?json`)));
    len.forEach((data) => {
      $('body').append(`<h4>${data.text}</4>`);
    });
  }
favoriteNumber();

