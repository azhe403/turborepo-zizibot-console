import {createSlice, Slice} from '@reduxjs/toolkit';

export interface UserState {
  id: number;
  name: string;
}

const initialState: UserState = {
  id: 0,
  name: 'Anonymous'
};

export const userSlice: Slice<UserState> = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setName: (state, action) => {
      state.name = action.payload;
    },
    setId: (state, action) => {
      state.id = action.payload;
    }
  }
});

export const { setName, setId } = userSlice.actions;

export default userSlice.reducer;