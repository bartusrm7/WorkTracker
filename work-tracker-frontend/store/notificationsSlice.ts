import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface NotificationState {
	notificationsAccess: number;
	notificationName: string;
	loading: boolean;
}

const initialState: NotificationState = {
	notificationsAccess: 0,
	notificationName: "",
	loading: false,
};

export const AccessForGettingNotifications = createAsyncThunk<
	{ notificationsAccess: number },
	{ notificationsAccess: number }
>("notifications/access-notifications", async (_, { rejectWithValue }) => {
	try {
		const response = await fetch("http://localhost:5174/access-notifications", {
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
		return rejectWithValue("Error during getting access for notifications!");
	}
});

export const DisplayNotification = createAsyncThunk<{ notificationName: string }>(
	"notifications/display-notification",
	async (_, { rejectWithValue }) => {
		try {
			const response = await fetch("http://localhost:5174/display-notification", {
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
				(state, action: PayloadAction<{ notificationsAccess: number }>) => {
					state.notificationsAccess = action.payload.notificationsAccess;
					state.loading = false;
				}
			)
			.addCase(AccessForGettingNotifications.rejected, state => {
				state.loading = false;
			})

			.addCase(DisplayNotification.fulfilled, (state, action: PayloadAction<{ notificationName: string }>) => {
				state.notificationName = action.payload.notificationName;
				state.loading = false;
			})
			.addCase(DisplayNotification.rejected, state => {
				state.loading = false;
			});
	},
});

export default notificationSlice.reducer;
