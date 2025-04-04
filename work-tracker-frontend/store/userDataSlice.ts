import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

interface UserData {
	firstName: string;
	lastName: string;
	email: string;
	userImage?: File | string;
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
		const response = await fetch("http://localhost:5174/user-data", {
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

export const EditUserData = createAsyncThunk<UserDataState, UserDataState>(
	"user/edit-user-data",
	async (_, { rejectWithValue }) => {
		try {
			const response = await fetch("http://localhost:5174/edit-user-data", {
				method: "PUT",
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

			.addCase(EditUserData.fulfilled, (state, action: PayloadAction<UserDataState>) => {
				state.userData.findIndex(data => data.email === action.payload.userData[0].email);
				state.loading = false;
			})
			.addCase(EditUserData.rejected, state => {
				state.loading = false;
			});
	},
});

export default userDataSlice.reducer;
