// Part 2
$(function() {
	let URL = 'https://deckofcardsapi.com/api/deck';
   
	let drawCards = async function() {
		let data= await $.getJSON(`${URL}/new/draw/`);
		let { suit, value } = data.cards[0];
		console.log(`${value.toLowerCase()} of ${suit.toLowerCase()}`);
	};
	drawCards()
    
	const drawSecondCards = async function() {
		let oneCard = await $.getJSON(`${URL}/new/draw/`)
		let deckId = oneCard.deck_id;
		console.log(`${oneCard.cards[0].value} of ${oneCard.cards[0].suit}`);
		console.log(`${oneCard.remaining} cards left`);

		let otherCard = await $.getJSON(`${URL}/${deckId}/draw/`);
		console.log(`${otherCard.cards[0].value} of ${otherCard.cards[0].suit}`);
		console.log(`${otherCard.remaining} cards left`);	
		// [ oneCard, otherCard ].forEach(card => {
		// 	let { suit, value } = card.cards[0];
		// 	console.log(`${value.toLowerCase()} of ${suit.toLowerCase()}`);
		//   });
	 }
	 drawSecondCards()

const pressBtn = async function() {
	let $button = $('button');
	let $drawCard = $('#draw-card');
         
	let shuffledCards = await $.getJSON(`${URL}/new/shuffle/`);
	let deckData = shuffledCards.deck_id;

	$button.show().on('click', async function() {
	   let newCard = await $.getJSON(`${URL}/${deckData}/draw/`);
	   img = newCard.cards[0].image;
	   let randomA = Math.random() * 90 - 45;
	   let randomX = Math.random() * 40 - 20;
	   let randomY = Math.random() * 40 - 20;
	    $drawCard.append(
					$('<img>', {
						src : img,
						css : {
							transform : `translate(${randomX}px, ${randomY}px) rotate(${randomA}deg)`
						}
					})
				);
	            if (newCard.remaining === 0) $button.remove();
	});	
  };
 pressBtn();
});
