import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GetTask } from "./tasksSlice";

interface Tasks {
	ID: number;
	email: string;
	taskName: string;
	taskDate: Date;
	taskDescription: string;
	taskStatus?: string;
}

interface TasksState {
	tasks: Tasks[];
	loading: boolean;
}

const initialState: TasksState = {
	tasks: [],
	loading: false,
};

export const DoneTaskAction = createAsyncThunk<
	{ ID: number; email: string; taskStatus: string },
	{ ID: number; email: string; taskStatus: string }
>("tasksAction/done-task", async (userData: { ID: number; email: string; taskStatus: string }, { rejectWithValue }) => {
	try {
		const response = await fetch("http://localhost:5174/done-task", {
			method: "POST",
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
		return rejectWithValue("Error during marking task as done!");
	}
});

export const EditTaskAction = createAsyncThunk<Tasks, Tasks>(
	"tasksAction/edit-task",
	async (task, { rejectWithValue }) => {
		try {
			const response = await fetch("http://localhost:5174/edit-task", {
				method: "POST",
				headers: {
					"Content-type": "application/json",
				},
				body: JSON.stringify(task),
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

export const RemoveTaskAction = createAsyncThunk<{ ID: number; email: string }, { ID: number; email: string }>(
	"tasksAction/remove-task",
	async (userData: { ID: number; email: string }, { rejectWithValue }) => {
		try {
			const response = await fetch("http://localhost:5174/remove-task", {
				method: "POST",
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
			return rejectWithValue("Error during marking task as remove!");
		}
	}
);

const tasksActionSlice = createSlice({
	name: "tasksAction",
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(GetTask.fulfilled, (state, action: PayloadAction<Tasks[]>) => {
				state.tasks = action.payload;
				state.loading = false;
			})

			.addCase(DoneTaskAction.fulfilled, (state, action: PayloadAction<{ ID: number; taskStatus: string }>) => {
				state.tasks.map(task =>
					task.ID === action.payload.ID ? { ...task, taskStatus: action.payload.taskStatus } : task
				);
				state.loading = false;
			})
			.addCase(DoneTaskAction.rejected, state => {
				state.loading = false;
			})

			.addCase(EditTaskAction.fulfilled, (state, action: PayloadAction<Tasks>) => {
				const updatedTask = action.payload;
				state.tasks.map(task => (task.ID === updatedTask.ID ? updatedTask : task));
				state.loading = false;
			})
			.addCase(EditTaskAction.rejected, state => {
				state.loading = false;
			})

			.addCase(RemoveTaskAction.fulfilled, (state, action: PayloadAction<{ ID: number }>) => {
				state.tasks = state.tasks.filter(task => task.ID !== action.payload.ID);
				state.loading = false;
			})
			.addCase(RemoveTaskAction.rejected, state => {
				state.loading = false;
			});
	},
});

export default tasksActionSlice.reducer;
