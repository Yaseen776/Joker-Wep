// gameEngine.js
const games = ["Hand", "Tarneeb", "TwentyOne"];

function shuffleDeck() {
  // أوراق من 1 إلى 52 مع لونها
  const suits = ["♠","♥","♣","♦"];
  const deck = [];
  for (let s of suits)
    for (let v = 1; v <= 13; v++)
      deck.push({value: v, suit: s});
  return deck.sort(() => Math.random() - 0.5);
}

function deal(playersCount) {
  const deck = shuffleDeck();
  const handSize = Math.floor(52 / playersCount);
  const hands = [];
  for (let i = 0; i < playersCount; i++)
    hands.push(deck.slice(i * handSize, (i + 1) * handSize));
  return hands;
}

function determineWinner(hands) {
  // أعلى ورقة تفوز (مثال بسيط)
  const highs = hands.map(hand => Math.max(...hand.map(c=>c.value)));
  let best = Math.max(...highs), idx = highs.indexOf(best);
  return idx;
}

function randomGameType(){
  return games[Math.floor(Math.random() * games.length)];
}

module.exports = { deal, determineWinner, randomGameType };
