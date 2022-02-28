// Part 1
let URL = 'http://numbersapi.com';

let num = $.getJSON(`${URL}/7?json`).then(data => {
    console.log(data);
  });

  let numbers = [3, 13, 23];
  $.getJSON(`${URL}/${numbers}?json`).then((data) => {
      console.log(data);
  });
  
  Promise.all( 
    Array.from({ length: 4 }, () => {
          return $.getJSON(`${URL}/7?json`);
    })
  ).then((facts) => {
      facts.forEach((data) => $('body').append(`<h4>${data.text}</h4>`));
  });

