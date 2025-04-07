import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface NotificationState {
	notificationsAccess: number;
	notificationName: string[];
	loading: boolean;
}

const initialState: NotificationState = {
	notificationsAccess: 0,
	notificationName: [],
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

export const DisplayNotification = createAsyncThunk<string[]>(
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
			const notifications = data.notifications;
			const notificationNames = notifications.map(
				(notification: { notificationName: string }) => notification.notificationName
			);
			return notificationNames;
		} catch (error) {
			return rejectWithValue("Error during displaying notifications!");
		}
	}
);

export const SendCreateTaskNotification = createAsyncThunk<{ notificationName: string[] }>(
	"notifications/send-create-task-notification",
	async (_, { rejectWithValue }) => {
		try {
			const response = await fetch("http://localhost:5174/send-create-task-notification", {
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
			return rejectWithValue("Error during send create task notification!");
		}
	}
);

export const SendDoneTask = createAsyncThunk<{ notificationName: string[] }>(
	"notifications/send-done-task",
	async (_, { rejectWithValue }) => {
		try {
			const response = await fetch("http://localhost:5174/send-done-task", {
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
			return rejectWithValue("Error during send create task notification!");
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

			.addCase(DisplayNotification.fulfilled, (state, action: PayloadAction<string[]>) => {
				state.notificationName = action.payload;
				state.loading = false;
			})
			.addCase(DisplayNotification.rejected, state => {
				state.loading = false;
			})

			.addCase(SendCreateTaskNotification.fulfilled, (state, action: PayloadAction<{ notificationName: string[] }>) => {
				state.notificationName = action.payload.notificationName;
				state.loading = false;
			})
			.addCase(SendCreateTaskNotification.rejected, state => {
				state.loading = false;
			})

			.addCase(SendDoneTask.fulfilled, (state, action: PayloadAction<{ notificationName: string[] }>) => {
				state.notificationName = action.payload.notificationName;
				state.loading = false;
			})
			.addCase(SendDoneTask.rejected, state => {
				state.loading = false;
			});
	},
});

export default notificationSlice.reducer;
