import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";

export const fetchPosts = createAsyncThunk("table/fetchPosts", async () => {
  const response = await api.getPosts();
  if (response) {
    return { success: true, data: response };
  } else {
    return { success: false, data: [] };
  }
});

export const setRequest = (state: any, action: any) => {
  console.log(action);
};
