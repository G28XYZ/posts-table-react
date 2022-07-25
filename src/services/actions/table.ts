import { createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import api from "../../utils/api";
import { ITableAction, ITableState } from "../../utils/types";

export const fetchPosts = createAsyncThunk("table/fetchPosts", async () => {
  const response = await api.getPosts();
  if (response) {
    return { success: true, data: response };
  } else {
    return { success: false, data: [] };
  }
});

export const setRequest = (
  state: ITableState,
  action: PayloadAction<ITableAction>
) => {
  state.request = action.payload.request || false;
};

export const setTableState = (
  state: ITableState,
  action: PayloadAction<ITableAction>
) => {
  const tableState = action.payload.tableState as ITableState;
  state = Object.assign(state, tableState);
};
