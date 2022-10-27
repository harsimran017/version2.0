import {createSlice} from '@reduxjs/toolkit';
import {authApi} from '../services/authApi';

const initialState = {
  isAuthenticated: false,
  role: null,
  userInfo: {},
};
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: state => {
      state.isAuthenticated = false;
      state.role = null;
      state.userInfo = {};
    },
  },

  extraReducers: builder => {
    builder.addMatcher(
      authApi.endpoints.signinUser.matchFulfilled,

      (state, {payload}) => {
        //console.log({payload});

        state.role = payload[0].role;
        state.userInfo = payload[0];
        state.isAuthenticated = true;
      },
    );
  },
});
export const {logout} = authSlice.actions;
