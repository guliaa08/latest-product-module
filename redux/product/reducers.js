import { createSlice } from '@reduxjs/toolkit';
import { get_osaRequests, get_products } from './action';
import { get_categories } from './action';
import { get_activeProducts } from './action';

const initialState = {
  hasNextPage: false,
  products: [],
  categories: [],
  dashboardMetrics: [],
  osaRequests:[],
  isLoadingProducts: false,
};

const productsSlice = createSlice({
  name: 'productsSlice',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(get_products.pending, state => {
      state.isLoadingProducts = true;
    });
    builder.addCase(get_products.fulfilled, (state, action) => {
      const { data, pagination, status } = action.payload;
      state.isLoadingProducts = false;
      state.products = data;
      state.hasNextPage = pagination.hasNextPage;
    });
    builder.addCase(get_products.rejected, state => {
      state.isLoadingProducts = false;
    });

    // for categories
    builder.addCase(get_categories.pending, state => {
      state.isLoadingCategories = true;
    });
    builder.addCase(get_categories.fulfilled, (state, action) => {
      state.isLoadingCategories = false;
      // if API returns { data: [...] }
      //  console.log("payload of categories",action.payload.data.data)
      state.categories = action.payload.data;
    });
    builder.addCase(get_categories.rejected, state => {
      state.isLoadingCategories = false;
    });
    // for active Products
    builder.addCase(get_activeProducts.pending, state => {
      state.isLoadingCategories = true;
    });
    builder.addCase(get_activeProducts.fulfilled, (state, action) => {
      state.isLoadingCategories = false;

      state.dashboardMetrics = action.payload.data;
    });

    builder.addCase(get_activeProducts.rejected, state => {
      state.isLoadingCategories = false;
    });

    // cases of osa request

    builder.addCase(get_osaRequests.pending,state=>{
      state.isLoadingOsa = true;
    });
    builder.addCase(get_osaRequests.fulfilled,(state,action)=>{
      state.isLoadingOsa= false;
      state.osaRequests = action.payload;
      console.log('action.payload',action.payload);
      
    });
    builder.addCase(get_osaRequests.rejected,state=>{
      state.isLoadingOsa=false;

    })


  },
});

export default productsSlice.reducer;
