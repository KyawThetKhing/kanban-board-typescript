import { createSlice } from "@reduxjs/toolkit";
import { SidebarState } from "./sidebar.types";

const initialState: SidebarState = {
  isShowSidebar: true,
};

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    toggleSidebar: (state, action) => {
      state.isShowSidebar = action.payload;
    },
  },
});

export const { toggleSidebar } = sidebarSlice.actions;
export default sidebarSlice.reducer;
