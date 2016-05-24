export interface WordScore {
    word: string;
    score: number;
}

export default function main(content) {
    return printTop(getTopWordScore(content, 10));   
}

export function getTopWordScore(text: string, limit?: number): WordScore[] {
    const wordScores =     sortDescendingOrder(
                            tally(
                                splitText(text.toLocaleLowerCase())));
                                
    const n = limit === undefined ? wordScores.length : Math.min(wordScores.length, limit);
    return wordScores.slice(0, Math.min(wordScores.length, n));
}


function printTop(topWords: WordScore[]) {
    return [`The top ${topWords.length} most frequently used:`,
        '--------------------------------']
        .concat(topWords.map((wordScore, index) => `${index + 1}. ${wordScore.word}: ${wordScore.score}`))
        .join("\n");
}

export function sortDescendingOrder(wordScores: WordScore[]): WordScore[] {
    return wordScores.sort((a, b) => b.score - a.score);
}

export function splitText(text: string) {
    return text.split(/[^\w]+/);
}

export function incrementWordScore(tally: Map<string, WordScore>, word: string): WordScore {
    const score = tally.has(word) ? tally.get(word).score+1 : 1;
    return { word, score }
}

export function tally(words: string[]): WordScore[] {
    const tallyMap = words.reduce(
            (tally, word) => tally.set(word, incrementWordScore(tally, word)),
            new Map<string, WordScore>());
            
     return Array.from(tallyMap.values());
}