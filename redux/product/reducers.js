import { createSlice } from "@reduxjs/toolkit";
import { get_osaRequests, get_products } from "./action";
import { get_categories } from "./action";
import { get_activeProducts } from "./action";

const initialState = {
  hasNextPage: false,
  products: [],
  categories: [],
  dashboardMetrics: [],
  osaRequests: [],
  isLoadingProducts: false,
};

const productAppProductSlice = createSlice({
  name: "productAppProductSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(get_products.pending, (state) => {
      state.isLoadingProducts = true;
    });
    builder.addCase(get_products.fulfilled, (state, action) => {
     const { data, pagination } = action.payload;
console.log('page no: ',pagination.currentPage, "data: ", data);

  state.isLoadingProducts = false;

  // 👉 If first page → replace data
  if (pagination.currentPage === 1) {
    state.products = data;
  } 
  // 👉 If next pages → append data
  else {
    state.products = [...state.products, ...data];
  }

  // state.hasNextPage = pagination.hasNextPage;
  state.productPagination = pagination;
    });
    
    builder.addCase(get_products.rejected, (state) => {
      state.isLoadingProducts = false;
    });

    // for categories
    builder.addCase(get_categories.pending, (state) => {
      state.isLoadingCategories = true;
    });
    builder.addCase(get_categories.fulfilled, (state, action) => {
      state.isLoadingCategories = false;
      state.categories = action.payload.data;
    });
    builder.addCase(get_categories.rejected, (state) => {
      state.isLoadingCategories = false;
    });
    // for active Products
    builder.addCase(get_activeProducts.pending, (state) => {
      state.isLoadingCategories = true;
    });
    builder.addCase(get_activeProducts.fulfilled, (state, action) => {
      state.isLoadingCategories = false;

      state.dashboardMetrics = action.payload.data;
    });

    builder.addCase(get_activeProducts.rejected, (state) => {
      state.isLoadingCategories = false;
    });

    // cases of osa request

    builder.addCase(get_osaRequests.pending, (state) => {
      state.isLoadingOsa = true;
    });
    builder.addCase(get_osaRequests.fulfilled, (state, action) => {
      state.isLoadingOsa = false;
      state.osaRequests = action.payload;
    });
    builder.addCase(get_osaRequests.rejected, (state) => {
      state.isLoadingOsa = false;
    });
  },
});

export default productAppProductSlice.reducer;
