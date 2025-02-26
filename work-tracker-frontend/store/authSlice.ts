import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface LogUserData {
	isLogged: boolean;
	loading: boolean;
	accessToken: string;
	firstName: string;
	lastName: string;
}

const initialState: LogUserData = {
	isLogged: false,
	loading: false,
	accessToken: "",
	firstName: "",
	lastName: "",
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

export const UserAuthorization = createAsyncThunk<{ accessToken: string }, string>(
	"user/authorization",
	async (accessToken, { rejectWithValue }) => {
		try {
			const response = await fetch("http://localhost:5174/authorization", {
				method: "POST",
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
				credentials: "include",
			});
			if (!response.ok) {
				const errorText = await response.text();
				throw new Error(`Error ${response.status}: ${errorText}`);
			}
			const data = await response.json();
			return { accessToken: data.accessToken };
		} catch (error) {
			return rejectWithValue("Error during authorization!");
		}
	}
);

export const UserNamesGetFromBackend = createAsyncThunk<{ firstName: string; lastName: string }>(
	"user/user-names",
	async (_, { rejectWithValue }) => {
		try {
			const response = await fetch("http://localhost:5174/user-names", {
				method: "GET",
				headers: {
					"Content-type": "application/json",
				},
				credentials: "include",
			});
			if (!response.ok) {
				const errorText = await response.text();
				throw new Error(`Error ${response.status}: ${errorText}`);
			}
			const data = await response.json();
			return data;
		} catch (error) {
			return rejectWithValue("Error during getting user first name and last name!");
		}
	}
);

export const RefreshAccessTokenAfterExpired = createAsyncThunk<{ accessToken: string }, string>(
	"user/refresh-token",
	async (accessToken, { rejectWithValue }) => {
		try {
			const response = await fetch("http://localhost:5174/refresh-token", {
				method: "POST",
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
				credentials: "include",
			});
			if (!response.ok) {
				const errorText = await response.text();
				throw new Error(`Error ${response.status}: ${errorText}`);
			}
			const data = await response.json();
			return { accessToken: data.accessToken };
		} catch (error) {
			return rejectWithValue("Error during refresh access token!");
		}
	}
);

export const UserLogout = createAsyncThunk<{ isLogged: boolean }>(
	"user/user-logout",
	async (_, { rejectWithValue }) => {
		try {
			const response = await fetch("http://localhost:5174/logout", {
				method: "POST",
				headers: {
					"Content-type": "application/json",
				},
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

			.addCase(UserAuthorization.fulfilled, (state, action) => {
				state.accessToken = action.payload.accessToken;
				state.isLogged = true;
				state.loading = false;
			})
			.addCase(UserAuthorization.rejected, state => {
				state.isLogged = false;
				state.loading = false;
			})

			.addCase(
				UserNamesGetFromBackend.fulfilled,
				(state, action: PayloadAction<{ firstName: string; lastName: string }>) => {
					state.firstName = action.payload.firstName;
					state.lastName = action.payload.lastName;
					state.loading = false;
				}
			)
			.addCase(UserNamesGetFromBackend.rejected, state => {
				state.loading = false;
			})

			.addCase(RefreshAccessTokenAfterExpired.fulfilled, (state, action) => {
				state.accessToken = action.payload.accessToken;
				state.loading = false;
			})
			.addCase(RefreshAccessTokenAfterExpired.rejected, state => {
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
