import { expect } from 'chai';
import { tokensFromMarkdown, cardsFromTokens, filterCards } from '../src/index.js';

const markdownExample = `
# I'm a H1
and I'm not empty
## I'm a H2
and I'm not empty
### I'm a H3
and I'm not empty
#### I'm a H4
and I'm not empty
##### I'm a H5
nd I'm not empty
###### I'm a H6
and I'm not empty

# I'm an empty H1
## I'm an empty H2
### I'm an empty H3
#### I'm an empty H4
##### I'm an empty H5
###### I'm an empty H6

# I'm a H1
I should be ignored
<!-- md2anki ignore-card -->
## I'm a H2
I should be ignored
<!-- md2anki ignore-card -->
### I'm a H3
I should be ignored
<!-- md2anki ignore-card -->
#### I'm a H4
I should be ignored
<!-- md2anki ignore-card -->
##### I'm a H5
I should be ignored
<!-- md2anki ignore-card -->
###### I'm a H6
I should be ignored
<!-- md2anki ignore-card -->`;

describe('cards filtering', function () {
	const tokens = tokensFromMarkdown(markdownExample);
	const cards = cardsFromTokens(tokens, {});
	it('should parse tokens to individual cards', function () {
		expect(cards.length).to.equal(18);
	});
	it('should ignore unwanted and empty cards by default', function () {
		let filteredCards = filterCards(cards, {});
		expect(filteredCards.length).to.equal(6);
		filteredCards.forEach(card => {
			expect(card.front).to.not.be.undefined;
			expect(card.back).to.not.be.undefined;
			expect(card.back.length).to.be.greaterThan(0);
		});
	});
	it('should ignore unwanted and allow empty cards if requested', function () {
		let filteredCards = filterCards(cards, {includeEmpty: true});
		expect(filteredCards.length).to.equal(12);
		filteredCards.forEach(card => expect(card.front).to.not.be.undefined);
		filteredCards.forEach(card => expect(card.back).to.not.be.undefined);
	});
});