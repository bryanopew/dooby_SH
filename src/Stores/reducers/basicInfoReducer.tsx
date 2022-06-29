const initialState = {
  age: '',
  conTarget: undefined,
  gender: undefined,
  height: '',
  target: undefined,
  weight: undefined,
};

export default function basicInfoReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_AGE': {
      return {
        ...state,
        basicInformation: action.payload,
      };
    }
    case 'SET_CONTARGET': {
      return {
        ...state,
        basicInformation: action.payload,
      };
    }
    case 'SET_GENDER': {
      return {
        ...state,
        basicInformation: action.payload,
      };
    }
    case 'SET_HEIGHT': {
      return {
        ...state,
        basicInformation: action.payload,
      };
    }
    case 'SET_TARGET': {
      return {
        ...state,
        basicInformation: action.payload,
      };
    }
    case 'SET_WEIGHT': {
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
