import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserState {
  id: number;
  name: string;
  roles: string[];
}

const initialState: UserState = {
  id: 0,
  name: 'Anonymous',
  roles: []
};

export const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    setId: (state, action: PayloadAction<number>) => {
      state.id = action.payload;
    },
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    setRole: (state, action: PayloadAction<string[]>) => {
      state.roles = action.payload;
    }
  }
});

export const {
  setName,
  setId,
  setRole
} = userSlice.actions;

export default userSlice.reducer;
