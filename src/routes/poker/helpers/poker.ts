export enum Suit {
	Clubs,
	Diamonds,
	Hearts,
	Spades
}

export enum Rank {
	Two,
	Three,
	Four,
	Five,
	Six,
	Seven,
	Eight,
	Nine,
	Ten,
	Jack,
	Queen,
	King,
	Ace
}

export type Card = {
	suit: Suit;
	rank: Rank;
};

export type Deck = Card[];

// Convert enum values to display strings
export const rankDisplay = {
	[Rank.Two]: '2',
	[Rank.Three]: '3',
	[Rank.Four]: '4',
	[Rank.Five]: '5',
	[Rank.Six]: '6',
	[Rank.Seven]: '7',
	[Rank.Eight]: '8',
	[Rank.Nine]: '9',
	[Rank.Ten]: '10',
	[Rank.Jack]: 'J',
	[Rank.Queen]: 'Q',
	[Rank.King]: 'K',
	[Rank.Ace]: 'A'
};

export const suitSymbol = {
	[Suit.Clubs]: '♣',
	[Suit.Diamonds]: '♦',
	[Suit.Hearts]: '♥',
	[Suit.Spades]: '♠'
};

export const suitColor = {
	[Suit.Clubs]: 'text-black',
	[Suit.Diamonds]: 'text-red-600',
	[Suit.Hearts]: 'text-red-600',
	[Suit.Spades]: 'text-black'
};

export function generateDeck(): Deck {
	const deck: Card[] = [];

	// Use Object.values to get the actual enum values
	const suits = Object.values(Suit).filter((value) => typeof value === 'number') as Suit[];
	const ranks = Object.values(Rank).filter((value) => typeof value === 'number') as Rank[];

	for (const suit of suits) {
		for (const rank of ranks) {
			deck.push({ suit, rank });
		}
	}

	return deck;
}

export function shuffle(cards: Deck): Deck {
	// Create a copy to avoid mutating the original array
	const shuffled = [...cards];

	// Fisher-Yates shuffle algorithm
	for (let i = shuffled.length - 1; i > 0; i--) {
		// Generate a random index from 0 to i (inclusive)
		const j = Math.floor(Math.random() * (i + 1));

		// Swap elements at positions i and j
		[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
	}

	return shuffled;
}
