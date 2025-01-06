import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

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
		const response = await fetch("http://localhost:5174/register", {
			method: "POST",
			headers: {
				"Content-type": "application/json",
			},
			body: JSON.stringify(userData),
			credentials: "include",
		});
		if (!response.ok) {
			const errorText = response.text;
			throw new Error(`Error ${response.status}: ${errorText}`);
		}
		const data = await response.json();
		return data;
	} catch (error) {
		console.error("Error during registration:", error);
	}
});

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(UserRegister.pending, state => {
				state.loading = true;
			})
			.addCase(UserRegister.fulfilled, (state, action: PayloadAction<User>) => {
				state.loading = false;
				state.user.push(action.payload);
			})
			.addCase(UserRegister.rejected, state => {
				state.loading = false;
			});
	},
});

export default userSlice.reducer;
