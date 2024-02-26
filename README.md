# 😸 Exploding Kitten

This will be an online single-player card game that consists of 4 different types of cards

- Cat card 😼
- Defuse card 🙅‍♂️
- Shuffle card 🔀
- Exploding kitten card 💣

There will be a button to start the game. When the game is started there will be a deck of 5 cards ordered randomly. Each time user clicks on the deck a card is revealed and that card is removed from the deck. A player wins the game once he draws all 5 cards from the deck and there is no card left to draw. 

Rules –
- If the card drawn from the deck is a cat card, then the card is removed from the deck.
- If the card is exploding kitten (bomb) then the player loses the game.
- If the card is a defusing card, then the card is removed from the deck. This card can be used to defuse one bomb that may come in subsequent cards drawn from the deck.
- If the card is a shuffle card, then the game is restarted and the deck is filled with 5 cards again.


features:
1. Automatically saves the game for a user at every stage so the user can continue from where he left off last time.
2. Real-time update of points on the leaderboard for all the users if they are playing simultaneously. 


#install : 
1. First clone the all folders in your local machine
2. navigate to backend folder in terminal and hit command : npm install and yarn install
3. Then write command : node server.js
4. also start the redis-server using (Ubuntu) : sudo service redis-server start && redis-cli
5. if Ubuntu and redis is not install then follow steps from this website : [Go to this website](https://redis.io/docs/install/install-redis/install-redis-on-windows/) 
6. Then navigate to frontend folder in terminal and hit command : npm install && npm start
