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
				credentials: "include",
			});
			if (!response.ok) {
				const errorText = await response.text();
				throw new Error(`Error ${response.status}: ${errorText}`);
			}
			const data = await response.json();
			return data;
		} catch (error) {
			return rejectWithValue("Error during login!");
		}
	}
);

export const UserLogout = createAsyncThunk<{ isLogged: boolean }, { isLogged: boolean }>(
	"user/user-logout",
	async () => {
		try {
			const response = await fetch("http://localhost:5174/logout", {
				method: "POST",
				headers: { "Content-type": "application/json" },
			});
			if (!response.ok) {
				const errorText = await response.text();
				throw new Error(`Error ${response.status}: ${errorText}`);
			}
			const data = await response.json();
			return data;
		} catch (error) {
			console.error("User cannot be logout!", error);
		}
	}
);

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(UserLogin.fulfilled, state => {
				state.isLogged = true;
				state.loading = false;
			})
			.addCase(UserLogin.rejected, state => {
				state.loading = false;
			})

			.addCase(UserLogout.pending, state => {
				state.loading = true;
			})
			.addCase(UserLogout.fulfilled, state => {
				state.isLogged = false;
				state.loading = false;
			})
			.addCase(UserLogout.rejected, state => {
				state.loading = false;
			});
	},
});

export default authSlice.reducer;
