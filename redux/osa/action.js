import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api.js";

export const get_osaList = createAsyncThunk(
  "get_osaList",
  async (_params, thunkApi) => {
    try {
      const { params } = _params;
      const data = await api.get(`osa/${_params.request.id}/products`, {
        params: {
          ...params,
          search: "",
          // search: state.productAppOsa.search,
        },
      });
      return data;
    } catch (err) {
      return thunkApi.rejectWithValue(err);
    }
  },
);

// export const get_osaListSearch = createAsyncThunk(
//     "get_osaListSearch",
//     async (_params ,thunkApi)=>{
//         try{
//             const {params } = _params;

//             const data = await api.get(`osa/${_params.request}/products/`,{
//               params:{
//                 search:_params.search
//               }
//             });
//             return data;

//         }
//         catch(err)
//         {
//             return thunkApi.rejectWithValue(err)

//         }
//     }
// );

export const post_osaList = createAsyncThunk(
  "post_osaList",
  async (_params, thunkApi) => {
    const { requestId, items } = _params;

    try {
      const response = await api.post("osa/execution", {
        requestId,
        items,
      });
      return response;
    } catch (err) {
      return thunkApi.rejectWithValue(err)
    }
  },
);
