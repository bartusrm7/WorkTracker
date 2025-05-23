import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Tasks {
	ID: number;
	email: string;
	taskName: string;
	taskDate: Date | string;
	taskDescription: string;
	taskStatus?: any;
}

interface TasksState {
	tasks: Tasks[];
	loading: boolean;
}

export const initialState: TasksState = {
	tasks: [],
	loading: false,
};

export const CreateTask = createAsyncThunk<Tasks, Tasks>("tasks/create-task", async (taskData, { rejectWithValue }) => {
	try {
		const response = await fetch("https://worktrackerserver.onrender.com/create-task", {
			method: "POST",
			headers: {
				"Content-type": "application/json",
			},
			body: JSON.stringify(taskData),
			credentials: "include",
		});
		if (!response.ok) {
			const errorText = await response.text();
			throw new Error(`Error ${response.status}: ${errorText}`);
		}
		const data = await response.json();
		return data;
	} catch (error) {
		return rejectWithValue("Error during creating task!");
	}
});

export const GetTask = createAsyncThunk<Tasks[]>("tasks/get-task", async (_, { rejectWithValue }) => {
	try {
		const response = await fetch("https://worktrackerserver.onrender.com/get-task", {
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
		return data.tasks;
	} catch (error) {
		return rejectWithValue("Error during getting tasks!");
	}
});

const tasksSlice = createSlice({
	name: "tasks",
	initialState,
	reducers: {},
	extraReducers: builder =>
		builder
			.addCase(CreateTask.pending, state => {
				state.loading = true;
			})
			.addCase(CreateTask.fulfilled, (state, action: PayloadAction<Tasks>) => {
				state.tasks.push(action.payload);
				state.loading = false;
			})
			.addCase(CreateTask.rejected, state => {
				state.loading = false;
			})

			.addCase(GetTask.fulfilled, (state, action: PayloadAction<Tasks[]>) => {
				state.tasks = action.payload;
				state.loading = false;
			})
			.addCase(GetTask.rejected, state => {
				state.loading = false;
			}),
});

export default tasksSlice.reducer;
