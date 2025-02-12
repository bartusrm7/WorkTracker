import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import authSlice from "./authSlice";
import tasksSlice from "./tasksSlice";

const store = configureStore({
	reducer: { user: userSlice, auth: authSlice, tasks: tasksSlice },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
