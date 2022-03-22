/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
  }
  // let mm = new MarkovMachine("the cat in the hat");
  // this.words -> [ 'the', 'cat', 'in', 'the', 'hat' ] (Array)

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  // Map -> { string: [list]
  makeChains() {
    // TODO

    let chains = new Map();

    // For each word, set the word to the next word || words || null in the map / chain
    for (let i = 0; i < this.words.length; i += 1) {
      let word = this.words[i];
      let nextWord = this.words[i + 1] || null;

      if (chains.has(word)) chains.get(word).push(nextWord);
      else chains.set(word, [nextWord]);
    }

    this.chains = chains;

  }

  // find all words that can come after that word
  // pick one of those next-words randomly
  // if we picked null, we’ve reached the end of the chain, so stop
  // otherwise, restart at step 1

  /** return random text from chains */

  static choice(ar) {
    return ar[Math.floor(Math.random() * ar.length)];      
  } 
  
  makeText(numWords = 100) {
    // TODO

    for (let i = 0; i < numWords; i++) {
      // Get random keys to start
      let keys = Array.from(this.chains.keys());
      let key = MarkovMachine.choice(keys);
      let out = [];

      // Get mapped words at random
      while (out.length < numWords && key !== null) {
        out.push(key);
        key = MarkovMachine.choice(this.chains.get(key));
      }
  
      return out.join(" ");
    }
  }

}

// export an object
module.exports = {
  MarkovMachine: MarkovMachine
};
  