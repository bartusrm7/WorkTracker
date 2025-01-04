import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface User {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
}

interface UserState {
	user: User[];
	loading: boolean;
}

const initialState: UserState = {
	user: [],
	loading: false,
};

export const UserRegister = createAsyncThunk("user/user-register", async userData => {
	try {
		const response = await fetch("", {
			method: "POST",
			headers: {
				"Content-type": "application/json",
			},
			body: JSON.stringify(userData),
		});
	} catch (error) {}
});

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(UserRegister.prototype, state => {
				state.loading = true;
			})
			.addCase(UserRegister.fulfilled, (state, action) => {
				state.loading = false;
			})
			.addCase(UserRegister.rejected, state => {
				state.loading = false;
			});
	},
});

export default userSlice.reducer;
