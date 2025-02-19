import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Tasks {
	id: number;
	email: string;
	taskName: string;
	taskDate: Date;
	taskDescription: string;
}

interface TasksState {
	tasks: Tasks[];
	loading: boolean;
}

const initialState: TasksState = {
	tasks: [],
	loading: false,
};

export const DoneTaskAction = createAsyncThunk<Tasks>("tasksAction/done-task", async (_, { rejectWithValue }) => {
	try {
		const response = await fetch("http://localhost:5174/done-task", {
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
		return rejectWithValue("Error during marking task as done!");
	}
});

export const EditTaskAction = createAsyncThunk<Tasks>("tasksAction/edit-task", async (_, { rejectWithValue }) => {
	try {
		const response = await fetch("http://localhost:5174/edit-task", {
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
		return rejectWithValue("Error during marking task as edit!");
	}
});

export const RemoveTaskAction = createAsyncThunk<Tasks>("tasksAction/remove-task", async (_, { rejectWithValue }) => {
	try {
		const response = await fetch("http://localhost:5174/remove-task", {
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
		return rejectWithValue("Error during marking task as remove!");
	}
});

const tasksActionSlice = createSlice({
	name: "tasksAction",
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder.addCase(RemoveTaskAction.fulfilled, (state, action: PayloadAction<Tasks>) => {
			state.tasks = state.tasks.filter(task => task.id !== action.payload.id);
		});
	},
});

export default tasksActionSlice.reducer;
