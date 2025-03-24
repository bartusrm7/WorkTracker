import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface MotivationState {
	motivationQuote: string;
}

const initialState: MotivationState = {
	motivationQuote: "",
};

export const GetMotivationQuotes = createAsyncThunk<string>(
	"motivation/getMotivationQuotes",
	async (_, { rejectWithValue }) => {
		try {
			const response = await fetch("http://localhost:5174/motivation", {
				method: "GET",
				headers: {
					"Content-type": "application/json",
				},
			});
			if (!response.ok) {
				const errorText = await response.text();
				throw new Error(`Error ${response.status}: ${errorText}`);
			}
			const data = await response.json();

			return data;
		} catch (error) {
			return rejectWithValue("Error during marking task as done!");
		}
	}
);

export const motivationSlice = createSlice({
	name: "motivation",
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder.addCase(GetMotivationQuotes.fulfilled, (state, action: PayloadAction<string>) => {
			state.motivationQuote = action.payload;
		});
	},
});

export default motivationSlice.reducer;
