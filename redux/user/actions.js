import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../utils/api.js';
import { endpoints } from '../../utils/end_points/urls';

export const get_user_verify = createAsyncThunk(
  'get_user_verify',
  async (_params, thunkApi) => {
    try {
      const data = await api.get('auth/verify/');
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);
