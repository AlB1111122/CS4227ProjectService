import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LOCAL_SERV, PRD_SERVER } from "../consts";

const headerSlice = createSlice({
  name: "header",
  initialState: {
    title: "",
    description: "",
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

const serverSlice = createSlice({
  name: "server",
  initialState: LOCAL_SERV,
  reducers: {
    setServer: (state, action: PayloadAction<"prd" | "local">) => {
      if (action.payload === "prd") {
        return PRD_SERVER;
      } else if (action.payload === "local") {
        return LOCAL_SERV;
      }
      return state;
    },
  },
});

export const { setHeader } = headerSlice.actions;
export const { setServer } = serverSlice.actions;

export const store = configureStore({
  reducer: {
    header: headerSlice.reducer,
    server: serverSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
