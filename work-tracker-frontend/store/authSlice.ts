import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface LogoutUser {
	isLogged: boolean;
	loading: boolean;
}

const initialState: LogoutUser = {
	isLogged: false,
	loading: false,
};

export const UserLogin = createAsyncThunk<{ email: string; password: string }, { email: string; password: string }>(
	"user/user-login",
	async (userData: { email: string; password: string }, { rejectWithValue }) => {
		try {
			const response = await fetch("http://localhost:5174/login", {
				method: "POST",
				headers: {
					"Content-type": "application/json",
				},
				body: JSON.stringify(userData),
			});
			if (!response.ok) {
				throw new Error(`Error ${response.status}: ${response.text}`);
			}
			const data = await response.json();
			return data;
		} catch (error) {
			return rejectWithValue("Something went wrong!");
		}
	}
);

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(UserLogin.pending, state => {
				state.loading = true;
			})
			.addCase(UserLogin.fulfilled, state => {
				state.isLogged = true;
				state.loading = false;
			})
			.addCase(UserLogin.rejected, state => {
				state.loading = false;
			});
	},
});

export default authSlice.reducer;
