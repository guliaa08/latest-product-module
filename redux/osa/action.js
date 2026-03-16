import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../utils/api.js';



export const get_osaList = createAsyncThunk(
    "get_osaList",
    async (_params ,thunkApi)=>{
        try{
            const {params} = _params;
            const state= thunkApi.getState();
            const data = await api.get(`osa/${_params.request.id}/products`,{
               params:{
               ...params,
               search:state.osa.search
               }
            });
            // console.log('data' ,data);
            return data;
            
        }
        catch(err)
        {
            console.log('err on get_osaList',err);
            return thunkApi.rejectWithValue(err)
            
        }
    }
);

// export const get_osaListSearch = createAsyncThunk(
//     "get_osaListSearch",
//     async (_params ,thunkApi)=>{
//         try{
//             console.log('_params' , _params);
//             const {params } = _params;
//             console.log('params', _params.request);
            
          
            
//             const data = await api.get(`osa/${_params.request}/products/`,{
//               params:{
//                 search:_params.search
//               }
//             });
//             return data;
            
//         }
//         catch(err)
//         {
//             console.log('err on get_osaList',err);
//             return thunkApi.rejectWithValue(err)
            
//         }
//     }
// );


export const post_osaList = createAsyncThunk("post_osaList",
    async(_params,thunkApi)=>{
        const {requestId,items} =  _params;
        console.log('params ',_params);
        
     
        
        try
        {
            const response = await api.post("osa/execution",{
                requestId,
                items
            })
            return response;
        }
        catch(err)
        {
            console.log('err',err);
            
        }
    }
)





