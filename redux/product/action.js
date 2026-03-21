import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api.js";
import { endpoints } from "../../utils/end_points/urls";

export const get_products = createAsyncThunk(
  "get_products",
  async (_params, thunkApi) => {
    try {
      const data = await api.get("store-inventory/", {
        params: {
          categoryName: _params,
        },
      });
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);
export const get_categories = createAsyncThunk(
  "get_categories",
  async (_params, thunkApi) => {
    try {
      const data = await api.get("category/");
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);
export const get_activeProducts = createAsyncThunk(
  "get_activeProducts",
  async (_params, thunkApi) => {
    try {
      const data = await api.get("dashboard/metrics");

      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);

export const get_osaRequests = createAsyncThunk(
  "get_osaRequests",
  async (_params, thunkApi) => {
    try {
      const data = await api.get("/osa");
      return data;
    } catch (err) {
      return thunkApi.rejectWithValue(err);
    }
  },
);
