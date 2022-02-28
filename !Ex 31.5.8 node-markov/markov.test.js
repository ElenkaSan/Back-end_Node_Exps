const { MarkovMachine } = require('./markov');

describe('markov machine', function() {
    beforeAll(function(){
        console.log("Run before all tests")
      });

	test('create markov chains', function() {
        let mm = new MarkovMachine('ss tt vv ss TT ss TT');

        expect(mm.markovChains).toEqual(
			new Map([
				[ 'ss', [ 'tt', 'TT', 'TT' ] ],
				[ 'tt', [ 'vv' ] ],
				[ 'vv', [ 'ss' ] ],
				[ 'TT', [ 'ss', null ] ]
			])
		);

	});

	test('choice selects from array', function() {
		expect(MarkovMachine.choice([ 1, 1, 1 ])).toEqual(1);
		expect([ 1, 2, 3 ]).toContain(MarkovMachine.choice([ 1, 2, 3 ]));
	});

	test('check the text', function() {
		let mm = new MarkovMachine('a s d');
		let text = mm.makeText();
		expect([ 'a s d', 's d', 'd' ]).toContain(text);
	});

	test('state is the words', function() {
		let phrases = [ 'the cat', 'cat in', 'in the', 'the hat', 'hat is', 'is in' ];
		let mm = new MarkovMachine('the cat in the hat');
		let output = mm.makeText();
		expect(output.endsWith('hat')).toBe(true);
        expect(output.endsWith('dog')).not.toBe(true);

		let outputWords = mm.makeText().split(/[ \r\n]+/);

		for (let i = 0; i < outputWords.length - 1; i++) {
			expect(phrases).toContain(outputWords[i] + ' ' + outputWords[i + 1]);
		}
	});

	test('shorten the length', function() {
		let phrases = [ 'the cat', 'cat in', 'in the', 'the hat', 'hat is', 'is in' ];
		let mm = new MarkovMachine('the cat in the hat');
		let output = mm.makeText(2);

		let outputWords = output.split(/[ \r\n]+/);
		expect([ 1, 2 ]).toContain(outputWords.length);
	});

    afterAll(function(){
        console.log("Run after all tests")
      });
});