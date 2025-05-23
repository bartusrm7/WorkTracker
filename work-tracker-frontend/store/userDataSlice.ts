import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

interface UserData {
	firstName: string;
	lastName: string;
	email: string;
}

interface UserDataState {
	userData: UserData[];
	loading: boolean;
}

const initialState: UserDataState = {
	userData: [],
	loading: false,
};

export const GetUserData = createAsyncThunk<UserData>("user/user-data", async (_, { rejectWithValue }) => {
	try {
		const response = await fetch("https://worktrackerserver.onrender.com/user-data", {
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
		return data.userData;
	} catch (error) {
		return rejectWithValue("Error during get user data from database!");
	}
});

export const EditUserData = createAsyncThunk<UserData, UserData>(
	"user/edit-user-data",
	async (userData, { rejectWithValue }) => {
		try {
			const response = await fetch("https://worktrackerserver.onrender.com/edit-user-data", {
				method: "PUT",
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
			return rejectWithValue("Error during edit user data!");
		}
	}
);

const userDataSlice = createSlice({
	name: "userData",
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(GetUserData.fulfilled, (state, action: PayloadAction<UserData>) => {
				state.userData = [action.payload];
				state.loading = false;
			})
			.addCase(GetUserData.rejected, state => {
				state.loading = false;
			})

			.addCase(EditUserData.fulfilled, (state, action: PayloadAction<UserData>) => {
				state.userData.findIndex(data => data.email === action.payload.email);
				state.loading = false;
			})
			.addCase(EditUserData.rejected, state => {
				state.loading = false;
			});
	},
});

export default userDataSlice.reducer;
