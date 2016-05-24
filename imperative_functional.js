"use strict"

export function tallyUp(words, tally = new Map()) {
    return words.reduce((tally, word) =>
        tally.set(word, (tally.get(word) || 0) + 1), tally)
}

export function getTop(tally, n) {
    return Array.from(tally.entries())
        .sort((a, b) => b[1] - a[1])
        .slice(0, n);
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

export default function main(content) {
    const words = splitIntoWords(content);
    const lowerCasedWords = words.map((word) => (word.toLowerCase()));
    const tally = tallyUp(lowerCasedWords);
    const top10 = getTop(tally, 10)
    return printTop(top10);
}

