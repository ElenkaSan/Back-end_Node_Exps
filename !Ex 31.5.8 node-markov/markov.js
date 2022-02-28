/** Textual markov chain generator */
class MarkovMachine {
  /** build markov machine; read in text.*/
  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    let markovChains = new Map();
		for (let i = 0; i < this.words.length; i += 1) {
			let word = this.words[i];
			let nextWord = this.words[i + 1] || null;
			if (markovChains.has(word)) markovChains.get(word).push(nextWord);
			else markovChains.set(word, [ nextWord ]);
		}
		this.markovChains = markovChains;
  }

  /** return random text from chains */

  static choice(idx) {
		return idx[Math.floor(Math.random() * idx.length)];
	}

  makeText(numWords = 100) {
		let keys = Array.from(this.markovChains.keys());
		let key = MarkovMachine.choice(keys);
		let out = [];
		while (out.length < numWords && key !== null) {
			out.push(key);
			key = MarkovMachine.choice(this.markovChains.get(key));
		}
		return out.join(' ');
	}
}

module.exports = { MarkovMachine };