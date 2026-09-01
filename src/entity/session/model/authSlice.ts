import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

type User = {
    id: string;
    email: string | undefined;
};

type AuthState = {
    user: User | null;
    status: 'loading' | 'ready';
};

const initialState: AuthState = {
    user: null,
    status: 'loading',
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser(state: AuthState, action: PayloadAction<User | null>) {
            state.user = action.payload;
            state.status = 'ready';
        },
    },
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;
