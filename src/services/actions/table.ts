import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";

export const fetchPosts = createAsyncThunk("table/fetchPosts", async () => {
  const response = await api.getPosts();
  if (response.success) {
    return response.data;
  } else {
    console.log(response);
    return false;
  }
});
