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
	status: string;
}

const initialState: UserState = {
	user: [],
	loading: false,
	status: "",
};

export const UserRegister = createAsyncThunk<User, User>(
	"user/user-register",
	async (userData, { rejectWithValue }) => {
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
				throw new Error(`Error ${response.status}: ${response.text}`);
			}
			const data = await response.json();
			return { firstName: data.firstName, lastName: data.lastName, email: data.email, password: data.password };
		} catch (error) {
			return rejectWithValue("Error during registration:");
		}
	}
);

export const UserLogin = createAsyncThunk("user/user-login", async (userData: { email: string; password: string }) => {
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
		console.error("", error);
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
				state.status = "success";
			})
			.addCase(UserRegister.rejected, state => {
				state.loading = false;
			})

			.addCase(UserLogin.pending, state => {
				state.loading = true;
			})
			.addCase(UserLogin.fulfilled, (state, action: PayloadAction) => {
				state.loading = false;
			})
			.addCase(UserLogin.rejected, state => {
				state.loading = false;
			});
	},
});

export default userSlice.reducer;
