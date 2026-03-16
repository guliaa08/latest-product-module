import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../utils/api.js';
import { endpoints } from '../../utils/end_points/urls';

export const get_products = createAsyncThunk(
  'get_products',
  async (_params, thunkApi) => {
    try {
      console.log('params', _params);

      const data = await api.get('store-inventory/', {
        params: {
          categoryName: _params,
        },
      });
      console.log('data', data);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);
export const get_categories = createAsyncThunk(
  'get_categories',
  async (_params, thunkApi) => {
    try {
      const data = await api.get('category/');
      console.log('data', data);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);
export const get_activeProducts = createAsyncThunk(
  'get_activeProducts',
  async (_params, thunkApi) => {
    try {
      const data = await api.get('dashboard/metrics');

      return data;
    } catch (error) {
      console.log('error1', error);

      return thunkApi.rejectWithValue(error);
    }
  },
);


export const get_osaRequests = createAsyncThunk(
  "get_osaRequests",
  async (_params,thunkApi)=>{
    try{
      const data = await api.get("/osa")
      return data;
    }
    catch(err)
    {
      console.log('err',err);
      return thunkApi.rejectWithValue(err)
      
    }
  }
)


