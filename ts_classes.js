"use strict";
class WordScore {
    constructor(_word) {
        this._word = _word;
        this._score = 0;
    }
    increment() {
        this._score++;
        return this;
    }
    get score() {
        return this._score;
    }
    get word() {
        return this._word;
    }
}
export class Tally {
    constructor() {
        this.tally = new Map();
    }
    getWordScore(word) {
        const w = word.toLowerCase();
        return this.tally.has(w) ? this.tally.get(w) : new WordScore(w);
    }
    addToTally(words) {
        words.forEach((word) => {
            const wordScore = this.getWordScore(word).increment();
            this.tally.set(wordScore.word, wordScore);
        });
        return this;
    }
    getTop(n) {
        const sortedWordScores = Array.from(this.tally.values())
            .sort((a, b) => b.score - a.score);
        return sortedWordScores.slice(0, Math.min(n, sortedWordScores.length));
    }
}
function printTop(topWords) {
    return [`The top ${topWords.length} most frequently used:`,
        '--------------------------------']
        .concat(topWords.map((wordScore, index) => `${index + 1}. ${wordScore.word}: ${wordScore.score}`))
        .join("\n");
}
export default function main(content) {
    const top10 = new Tally()
        .addToTally(splitIntoWords(content))
        .getTop(10);
    return printTop(top10);
}
function splitIntoWords(text) {
    return text.split(/[\W]+/);
}
//# sourceMappingURL=ts_classes.js.map