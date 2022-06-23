const initialState = {
  age: '',
  conTarget: undefined,
  gener: undefined,
  height: '',
  target: undefined,
  weight: undefined,
};

export default function basicInfoReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_BASICINFO': {
      return {
        ...state,
        basicInformation: action.payload,
      };
    }
    default: {
      return state;
    }
  }
}
