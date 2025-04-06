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
	errorMessage: string;
}

const initialState: UserState = {
	user: [],
	loading: false,
	status: "",
	errorMessage: "",
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
				if (response.status === 409) {
					throw new Error("User with this email address is already exists!");
				}
			}
			const data = await response.json();
			return data;
		} catch (error) {
			return rejectWithValue(error instanceof Error ? error.message : "Error during registration!");
		}
	}
);

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		resetRegistrationStatus(state) {
			state.status = "";
		},
	},
	extraReducers: builder => {
		builder
			.addCase(UserRegister.pending, state => {
				state.loading = true;
				state.errorMessage = "";
			})
			.addCase(UserRegister.fulfilled, (state, action: PayloadAction<User>) => {
				state.user.push(action.payload);
				state.loading = false;
				state.status = "success";
			})
			.addCase(UserRegister.rejected, (state, action) => {
				state.loading = false;
				state.errorMessage = action.payload as string;
				console.log(state.errorMessage);
			});
	},
});

export const { resetRegistrationStatus } = userSlice.actions;
export default userSlice.reducer;
