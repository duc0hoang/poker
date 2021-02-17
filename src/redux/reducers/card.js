let initialState = {
  deckCard: {},
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case 'FETCH_CARD':
      return { ...state, deckCard: payload };
    case 'SHUFFLE_CARDS':
      return { ...state, deckCard: payload }
    default:
      return state;
  }
};

export default reducer;
