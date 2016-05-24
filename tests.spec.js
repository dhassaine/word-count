"use strict";
import Mocha from 'mocha';
import {describe, it} from 'mocha';
import {assert} from 'chai';
import classes from './classes';
import tsClasses from './ts_classes';
import tsFp from './ts_functional';
import imperativeFunctional from './imperative_functional';

describe("comparison between different programmming styles", function () {
    const textFile = 'more_words.txt';
    const fs = require('fs');
    const content = fs.readFileSync(textFile).toString();
    const expected = [
        'The top 10 most frequently used:',
        '--------------------------------',
        '1. the: 43301',
        '2. of: 29300',
        '3. and: 19300',
        '4. shall: 19100',
        '5. be: 12600',
        '6. to: 11400',
        '7. in: 9000',
        '8. states: 8100',
        '9. or: 8000',
        '10. united: 5500'].join('\n');


    describe("object orientated", function () {
        it("returns top 10 words", function () {
            const results = classes(content);
            console.log(results);
            assert.equal(expected, results);
        });

        it("calculates word count of 'constructor' correctly", function () {
            testConstructorBug(classes);
        });
    });
    
    describe("typescript object orientated", function () {
        it("returns top 10 words", function () {
            const results = tsClasses(content);
            console.log(results);
            assert.equal(expected, results);
        });

        it("calculates word count of 'constructor' correctly", function () {
            testConstructorBug(classes);
        });
    });
    
    describe("typescript functional", function () {
        it("returns top 10 words", function () {
            const results = tsFp(content);
            console.log(results);
            assert.equal(expected, results);
        });

        it("calculates word count of 'constructor' correctly", function () {
            testConstructorBug(tsFp);
        });
    });
    

    describe("imperative mixed with functional", function () {
        it("returns top 10 words", function () {
            const results = imperativeFunctional(content);
            console.log(results);
            assert.equal(expected, results);
        });
    });


    describe("11.fp", function () {
        // fails because of stack bomb
        it.skip("calculates word count of 'constructor' correctly", function () {
            testConstructorBug(fp);     
        });
    });
    
    describe("2.imperative-w-functions", function () {
        // fails because {} used for tally which inherits constructor from object
        it.skip("calculates word count of 'constructor' correctly", function () {
            testConstructorBug(imperativeWithFp);     
        });
    });


});

function testConstructorBug(tallyMethod) {
    const words = ['g', 'f', 'e', 'd', 'c', 'b', 'a', 'hello', 'cat', 'constructor'];
    const text = [];
    words.forEach((word, index) => Array.from({length: index+1}, () => text.push(word)));
    const content = text.join('\n');
    const results = tallyMethod(content);
    console.log(results);
    const expected = [
        'The top 10 most frequently used:',
        '--------------------------------',
        '1. constructor: 10',
        '2. cat: 9',
        '3. hello: 8',
        '4. a: 7',
        '5. b: 6',
        '6. c: 5',
        '7. d: 4',
        '8. e: 3',
        '9. f: 2',
        '10. g: 1',].join('\n');
    assert.equal(results, expected);
}