import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface LogUserData {
	isLogged: boolean;
	loading: boolean;
}

const initialState: LogUserData = {
	isLogged: false,
	loading: false,
};

export const UserLogin = createAsyncThunk<
	{ email: string; password: string; isLogged: boolean },
	{ email: string; password: string; isLogged: boolean }
>("user/user-login", async (userData: { email: string; password: string }, { rejectWithValue }) => {
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
});

export const UserLogout = createAsyncThunk<{ isLogged: boolean }>(
	"user/user-logout",
	async (_, { rejectWithValue }) => {
		try {
			const response = await fetch("http://localhost:5174/logout", {
				method: "POST",
				headers: { "Content-type": "application/json" },
				credentials: "include",
			});
			if (!response.ok) {
				const errorText = await response.text();
				throw new Error(`Error ${response.status}: ${errorText}`);
			}
			const data = await response.json();
			return data;
		} catch (error) {
			return rejectWithValue("Error during logout!");
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
			.addCase(UserLogin.fulfilled, (state, action: PayloadAction<{ isLogged: boolean }>) => {
				state.isLogged = action.payload.isLogged;
				state.loading = false;
			})
			.addCase(UserLogin.rejected, state => {
				state.loading = false;
			})

			.addCase(UserLogout.pending, state => {
				state.loading = true;
			})
			.addCase(UserLogout.fulfilled, (state, action: PayloadAction<{ isLogged: boolean }>) => {
				state.isLogged = action.payload.isLogged;
				state.loading = false;
			})
			.addCase(UserLogout.rejected, state => {
				state.loading = false;
			});
	},
});

export default authSlice.reducer;
