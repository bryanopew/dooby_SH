import {
  AuthDispatchTypes,
  AuthType,
  LOGIN_USER,
  REGISTER_USER,
} from '~/stores/actions/auth/authTypes';

interface InitialState {
  data?: AuthType;
}

const initialState: InitialState = {};

const authReducer = (
  state: InitialState = initialState,
  action: AuthDispatchTypes,
) => {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        data: action.payload,
      };
    case REGISTER_USER:
      return {
        ...state,
        data: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;
