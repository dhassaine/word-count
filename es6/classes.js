class WordScore {
    constructor(word) {
        this.word = word;
        this.score = 0;
    }

    increment() {
        this.score++;
        return this;
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

export default function main(textFile) {
    const fs = require('fs');
    const content = fs.readFileSync(textFile).toString();
    const top10 = new Tally()
        .addToTally(splitIntoWords(content))
        .getTop(10);
    return printTop(top10);
}

function splitIntoWords(text) {
    return text.split(/[\W]+/);
}