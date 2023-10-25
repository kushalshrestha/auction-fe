import { createSlice } from '@reduxjs/toolkit';
import jwtDecode from 'jwt-decode';
import Cookies from 'universal-cookie';
import { ACCESS_TOKEN } from './../../app/constants';

const cookies = new Cookies();
const accessToken = cookies.get(ACCESS_TOKEN);
const jwt = accessToken?.length ? jwtDecode(accessToken) : undefined;

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: jwt ? { ...jwt, email: jwt.sub } : {},
  },
  reducers: {
    signIn: (state, action) => {
      const { ...userData } = action.payload;
      state.user = {
        ...userData,
      };
    },
    signOut: (state) => {
      cookies.remove(ACCESS_TOKEN);
      cookies.remove('CUSTOMERSELLERID');
      state.user = {};
    },
  },
});

export const { signIn, signOut } = authSlice.actions;
export default authSlice.reducer;
