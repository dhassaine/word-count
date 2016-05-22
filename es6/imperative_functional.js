"use strict"

export function tallyUp(words) {
    return Array.from(
        words.map((word) => (word.toLowerCase()))
            .reduce((tally, word) => tally.set(word, (tally.get(word) || 0) + 1), new Map())
            .entries());
}

export function getTop(tally, n) {
    return tally.sort((a, b) => b[1] - a[1]).slice(0, n);
}

function printTop(topWords) {
    return [`The top ${topWords.length} most frequently used:`,
        '--------------------------------']
        .concat(topWords.map((wordScore, index) => `${index + 1}. ${wordScore[0]}: ${wordScore[1]}`))
        .join("\n");
}

function splitIntoWords(text) {
    return text.split(/[\W]+/);
}

export default function main(textFile) {
    const fs = require('fs');
    const content = fs.readFileSync(textFile).toString();
    const words = splitIntoWords(content);
    const top10 = getTop(tallyUp(words),10)
    return printTop(top10);
}

