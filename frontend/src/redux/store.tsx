import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";

const headerSlice = createSlice({
  name: "header",
  initialState: {
    title: "Home",
    description:
      "Standin for login page for prototype. This header uses redux to have its text.",
  },
  reducers: {
    setHeader: (
      state,
      action: PayloadAction<{ title: string; description: string }>
    ) => {
      state.title = action.payload.title;
      state.description = action.payload.description;
    },
  },
});

export const { setHeader } = headerSlice.actions;

export const store = configureStore({
  reducer: {
    header: headerSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
