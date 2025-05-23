import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import authSlice from "./authSlice";
import tasksSlice from "./tasksSlice";
import tasksActionsSlice from "./tasksActionsSlice";
import motivationSlice from "./motivationSlice";
import notificationsSlice from "./notificationsSlice";
import userDataSlice from "./userDataSlice";

const store = configureStore({
	reducer: {
		user: userSlice,
		auth: authSlice,
		tasks: tasksSlice,
		tasksAction: tasksActionsSlice,
		motivation: motivationSlice,
		notification: notificationsSlice,
		userData: userDataSlice,
	},
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
