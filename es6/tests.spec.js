import Mocha from 'mocha';
import {assert} from 'chai';
import classes from './classes';
import imperativeFunctional from './imperative_functional';

describe("comparison between different programmming styles", function () {
    /*
    describe("Tally", function(){
    describe("addToTally()", function () {
        
        it("returns an object of word => word_frequency", function () {
            const tally = new Tally();
            const words = ['dog', 'cat', 'mat', 'dog', 'Cat'];
            const results = tallyUp(words);
            const expected = [['dog', 2], ['cat', 2], ['mat', 1]];
            assert.deepEqual(expected, results);
        });
    });
    
    describe("getTop", function () {
        it("returns an object of word => word_frequency", function () {
            const words = ['dog', 'dog', 'cat', 'mat', 'dog', 'Cat'];
            const tally = tallyUp(words);
            const results = getTop(tally ,1);
            const expected = [['dog', 3]];
            assert.deepEqual(expected, results);
        });
    });    
    });
    */
    
    const textFile = 'more_words.txt';
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
            const results = classes(textFile);
            console.log(results);
            assert.equal(expected, results);
        });
    });
    
    describe("imperative mixed with functional", function(){
        it("returns top 10 words", function () {
            const results = imperativeFunctional(textFile);
            console.log(results);
            assert.equal(expected, results);
        });
    });


});