import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

interface UserDataState {
	firstName: string;
	lastName: string;
	email: string;
	userImage: File | string;
}

const initialState: UserDataState = {
	firstName: "",
	lastName: "",
	email: "",
	userImage: "",
};

export const GetUserData = createAsyncThunk<UserDataState>("user/user-data", async (_, { rejectWithValue }) => {
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
		return data;
	} catch (error) {
		return rejectWithValue("Error during get user data from database!");
	}
});

const userDataSlice = createSlice({
	name: "userData",
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder.addCase(GetUserData.fulfilled, (state, action: PayloadAction<UserDataState>) => {
			state.firstName = action.payload.firstName;
			state.lastName = action.payload.lastName;
			state.email = action.payload.email;
			state.userImage = action.payload.userImage;
		});
	},
});

export default userDataSlice.reducer;
