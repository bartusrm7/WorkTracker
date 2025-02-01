import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface LogUserData {
	isLogged: boolean;
	loading: boolean;
	userData: {
		firstName: string;
		lastName: string;
		email: string;
		password: string;
	};
}

const initialState: LogUserData = {
	isLogged: false,
	loading: false,
	userData: { firstName: "", lastName: "", email: "", password: "" },
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

export const UserDataFromAccessToken = createAsyncThunk<{ user: LogUserData }, { accessToken: string }>(
	"user/user-authorization",
	async (accessToken, { rejectWithValue }) => {
		try {
			const response = await fetch("http://localhost:5174/authorization", {
				method: "POST",
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			});
			if (!response.ok) {
				const errorText = await response.text();
				throw new Error(`Error ${response.status}: ${errorText}`);
			}
			const data = await response.json();
			return data;
		} catch (error) {
			return rejectWithValue("Error get user data!");
		}
	}
);

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

			.addCase(UserDataFromAccessToken.fulfilled, (state, action: PayloadAction<{ user: any }>) => {
				state.userData = action.payload.user;
				state.loading = false;
			})
			.addCase(UserDataFromAccessToken.rejected, state => {
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
