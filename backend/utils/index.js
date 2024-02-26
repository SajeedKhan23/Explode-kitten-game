const CHARACTERS = [
  "Cat card 😼",
  "Defuse card 🙅‍♂️",
  "Shuffle card 🔀",
  "Exploding kitten card 💣",
];

const generateRandomCards = () => {
  const deck = [];
  for (let i = 0; i < 5; i++) {
    const index = Math.floor(Math.random() * CHARACTERS.length);
    deck.push(CHARACTERS[index]);
  }
  return deck;
};

export { generateRandomCards };
