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
  isLoadingCategories: true,
  categoryPagination: {
    currentPage: 1,
    totalPages: 1,
    hasNextPage: true,
    totalCount: 0,
    limit: 10,
  },
  error: null,
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

  const { data = [], pagination = {} } = action.payload || {};
  const currentPage = pagination?.currentPage ;
  

  if (currentPage === 1) {
    state.categories = data;
  }  else {
  
    state.categories = [...state.categories ||[], ...data]
   
  }
  state.categoryPagination = {
    currentPage: pagination.currentPage,
    totalPages: pagination.totalPages,
    hasNextPage: pagination.hasNextPage,
    totalCount: pagination.totalCount,
    limit: pagination.limit,
  };
  state.error= null;
});

builder.addCase(get_categories.rejected, (state, action) => {
  state.isLoadingCategories = false;
  console.log('reducer error',action?.error?.message);
  
  state.error = action?.error?.message || "Failed to fetch categories";
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
