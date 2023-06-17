import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import kanbanReducer from "./kanban/kanbanSlice";
import sidebarReducer from "./sidebar/sidebarSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    kanban: kanbanReducer,
    sidebar: sidebarReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
