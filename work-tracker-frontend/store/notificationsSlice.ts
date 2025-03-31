import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface NotificationState {
	notificationAccess: boolean;
	notificationName: string;
	loading: boolean;
}

const initialState: NotificationState = {
	notificationAccess: false,
	notificationName: "",
	loading: false,
};

export const AccessForGettingNotifications = createAsyncThunk<
	{ notificationAccess: boolean },
	{ notificationAccess: boolean }
>("notifications/access-notifications", async (_, { rejectWithValue }) => {
	try {
		const response = await fetch("http://localhost:5174/access-notifications", {
			method: "POST",
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
		return rejectWithValue("Error during getting access for notifications!");
	}
});

export const DisplayNotification = createAsyncThunk<{ notificationName: string }, { notificationName: string }>(
	"notifications/display-notification",
	async (_, { rejectWithValue }) => {
		try {
			const response = await fetch("http://localhost:5174/display-notification", {
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
			return rejectWithValue("Error during creating notification!");
		}
	}
);

const notificationSlice = createSlice({
	name: "notifications",
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(
				AccessForGettingNotifications.fulfilled,
				(state, action: PayloadAction<{ notificationAccess: boolean }>) => {
					state.notificationAccess = action.payload.notificationAccess;
					state.loading = false;
				}
			)
			.addCase(AccessForGettingNotifications.rejected, (state, action) => {
				state.loading = false;
				console.error(action.payload);
			})

			.addCase(DisplayNotification.fulfilled, (state, action: PayloadAction<{ notificationName: string }>) => {
				state.notificationName = action.payload.notificationName;
				state.loading = false;
			})
			.addCase(DisplayNotification.rejected, (state, action) => {
				state.loading = false;
				console.error(action.payload);
			});
	},
});

export default notificationSlice.reducer;
