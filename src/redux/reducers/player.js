let initialState = {
  playerList: [
    {
      username: "Player 1",
      email: "player1@gmail.com",
      phone: "1829839030",
      totalPoint: 25000,
      cards: [],
    },
    {
      username: "Player 2",
      email: "player2@gmail.com",
      phone: "8849839939",
      totalPoint: 25000,
      cards: [],
    },
    {
      username: "Player 3",
      email: "player3@gmail.com",
      phone: "894589485",
      totalPoint: 25000,
      cards: [],
    },
  ],
};

const checkSpecialCase = (cards) => {
  const specialCards = ['KING', 'JACK', 'QUEEN'];
  for (const card of cards) {
    if (!specialCards.includes(card.value)) return false;
  }
  return true;
}

const mapCardToPoint = (value) => {
  const specialCards = ['KING', 'JACK', 'QUEEN'];
  if (value === 'ACE') return 1;
  if (specialCards.includes(value)) return 10;
  return +value;
}

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "ADD_PLAYER":
      state.playerList = [payload, ...state.playerList];
      return { ...state };
    case 'ADD_CARDS': {
      const clonePlayerList = [...state.playerList];
      const totalPlayer = clonePlayerList.length;

      for (let i in payload) {
        const playerIndex = i % totalPlayer;
        clonePlayerList[playerIndex].cards.push(payload[i]);
      }

      return { ...state, playerList: clonePlayerList };
    }
    case 'REVEAL_CARDS': {
      let specialCase = [];
      let max = 0;
      let maxPlayer = [];
      const clonePlayerList = [...state.playerList];
      for (const player of clonePlayerList) {
        if (checkSpecialCase(player.cards)) {
          specialCase.push(player);
        } else {
          const point = player.cards.reduce((total, card) => total + mapCardToPoint(card.value), 0) % 10;
          if (point > max) {
            max = point;
            maxPlayer = [player];
          } else if (point === max) {
            maxPlayer.push(player);
          }
        }
      };

      const winners = specialCase.length ? specialCase : maxPlayer;

      for (const player of clonePlayerList) {
        const index = winners.findIndex(winner => winner.username === player.username)
        if (index !== -1) {
          player.totalPoint += (20000 / winners.length).toFixed(0) - 5000;
        } else {
          player.totalPoint -= 5000;
        }
      }

      return { ...state, playerList: clonePlayerList };
    }
    case 'SHUFFLE_CARDS': {
      const clonePlayerList = [...state.playerList];
      for (const player of clonePlayerList) {
        player.cards = [];
      }
      return { ...state, playerList: clonePlayerList };
    }
    default:
      return state;
  }
};

export default reducer;
