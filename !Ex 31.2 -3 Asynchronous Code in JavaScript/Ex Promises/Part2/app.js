// Part 2
$(function() {
	let URL = 'https://deckofcardsapi.com/api/deck';
    let oneCard = null;
    let deckId = null;
	let $button = $('button');
	let $drawCard = $('#draw-card');

	$.getJSON(`${URL}/new/draw/`).then((data) => {
		let { suit, value } = data.cards[0];
		console.log(`${value.toLowerCase()} of ${suit.toLowerCase()}`);
	});

	$.getJSON(`${URL}/new/draw/`)
		.then((data) => {
			oneCard = data.cards[0];
			let deckId = data.deck_id;
			return $.getJSON(`${URL}/${deckId}/draw/`);
		})
		.then((data) => {
			let otherCard = data.cards[0];
			[ oneCard, otherCard ].forEach(function(card) {
				console.log(`${card.value.toLowerCase()} of ${card.suit.toLowerCase()}`);
			});
		});

	$.getJSON(`${URL}/new/shuffle/`).then((data) => {
		deckId = data.deck_id;
		$button.show();
	});

	$button.on('click', function() {
		$.getJSON(`${URL}/${deckId}/draw/`).then((data) => {
			let img = data.cards[0].image;
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
			if (data.remaining === 0) $button.remove();
		});
	});
});