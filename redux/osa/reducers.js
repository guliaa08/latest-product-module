import { createSlice } from '@reduxjs/toolkit';
import { get_osaList, post_osaList } from './action';
import {parseWeight } from "../../helper/number_converter/parseWeight"
import { get_osaListSearch } from './action';

const initialState = {
  osa: [],
  pending: {},
  scanned: {
    // requestId: null,
    // executedDate: null,
    // items: [],
  },
  scannedDisplay: [],
  requestId: null,
  isLoadingOsa: false,
  isLoadingPending: false,
  isLoadingScanned: false,
};

const osaSlice = createSlice({
  name: 'osaSlice',
  initialState,
  reducers: {
    addScannedItem: (state, action) => {
      const { productId, quantity, item } = action.payload;
      console.log('item from add scanned item', item);

      // ensure scanned.data exists
      if (!state.scanned?.data) {
        state.scanned = {
          ...state.scanned,
          data: [],
        };
      }

      const scannedData = state.scanned.data;
      const index = scannedData.findIndex(item => item.productId === productId);

      const qty = Number(quantity); // convert to number

      if (index !== -1) {
        scannedData[index].physicalCount =
          (scannedData[index].physicalCount || 0) + qty;
      } else {
        scannedData.push({
          ...item,
          productId,
          physicalCount: qty,
        });
      }

      // update total count
      state.scanned.total = scannedData.length;

      // -----------------------------
      // REMOVE FROM PENDING
      // -----------------------------

      if (state.pending?.data) {
        state.pending.data = state.pending.data.filter(
          item => item.productId !== productId,
        );

        state.pending.total = state.pending.data.length;
      }
    },
    addScannedDisplay: (state, action) => {
      console.log('scanneed display state', state.scannedDisplay);

      const { item } = action.payload;
      // console.log('item from add scanned display', item);

      if (!state.scannedDisplay) {
        state.scannedDisplay = [];
      }

      state.scannedDisplay.push(item);
    },

    resetExecution: state => {
      state.execution = false;
    },
   sortByName: (state) => {
  const pendingList = state.pending?.data;
  const scannedList = state.scanned?.data;

  if (pendingList) {
    pendingList.sort((a, b) =>
      a.productName.localeCompare(b.productName)
    );
  }

  if (scannedList) {
    scannedList.sort((a, b) =>
      a.productName.localeCompare(b.productName)
    );
  }
},
   sortByWeight: (state) => {
  const pendingList = state.pending?.data;
  const scannedList = state.scanned?.data;

  if (pendingList) {
    pendingList.sort((a, b) => {
      const weightA = parseWeight(a.productWeight);
      const weightB = parseWeight(b.productWeight);
      return weightA - weightB;
    });
  }

  if (scannedList) {
    scannedList.sort((a, b) => {
      const weightA = parseWeight(a.productWeight);
      const weightB = parseWeight(b.productWeight);
      return weightA - weightB;
    });
  }
},
setSearch:(state,action)=>{
  console.log('action.payload',action.payload);
  
  state.search=action.payload.search;
  console.log('state.search',state.search);
  

}
  },

  extraReducers: builder => {
    builder.addCase(get_osaList.pending, (state, action) => {
      const params = action.meta.arg.params;

      console.log('params', params);

      if (params.page == 1) {
        state.isLoadingPending = true;
        state.isLoadingScanned = true;
    
      }
      state.isLoadingOsa = true;
    });
    //old logic
    // builder.addCase(get_osaList.fulfilled, (state, action) => {
    //   const { pending, scanned, requestId } = action.payload;

    //   console.log('action.payload',action.payload);

    //   // Pending pagination
    //   if (pending.page > state.pending.page) {
    //     state.pending.data = [...state.pending.data, ...pending.data];
    //     state.pending.page = pending.page;
    //   } else {
    //     state.pending = pending; // first load
    //   }

    //   // Scanned pagination
    //   if (scanned.page > state.scanned.page) {
    //     state.scanned.data = [...state.scanned.data, ...scanned.data];
    //     state.scanned.page = scanned.page;
    //   } else {
    //     state.scanned = scanned; // first load
    //   }

    //   state.isLoadingOsa = false;
    //   state.requestId = requestId;
    // });
    builder.addCase(get_osaList.fulfilled, (state, action) => {
      const { pending, scanned, requestId } = action.payload;
      const params = action.meta.arg.params;

      const {
        total: totalPending,
        page: pagePending,
        limit: limitPending,
        data: dataPending,
      } = pending;
      const {
        total: totalScanned,
        page: pageScanned,
        limit: limitScanned,
        data: dataScanned,
      } = scanned;

      if (!params.scannedPage) {
        const pendingList =
          pagePending === 1
            ? dataPending
            : [...state.pending.data, ...dataPending];
        state.pending = {
          ...state.pending,
          data: pendingList,
          page: pagePending,
          total: totalPending,
          limit: limitPending,
        };
        pagePending === 1 && (state.isLoadingPending = false);
      }

      if (!params.pendingPage) {
        const scannedList =
          pageScanned === 1
            ? dataScanned
            : [...state.scanned.data, ...dataScanned];
        state.scanned = {
          ...state.scanned,
          data: scannedList,
          page: pageScanned,
          total: totalScanned,
          limit: limitScanned,
        };
        pageScanned === 1 && (state.isLoadingScanned = false);
      }

      state.isLoadingOsa = false;
      state.requestId = requestId;
    });

    builder.addCase(get_osaList.rejected, state => {
      state.isLoadingOsa = false;
    });

    builder.addCase(post_osaList.pending, state => {
      state.execution = false;
      state.loading = true;
    });
    builder.addCase(post_osaList.fulfilled, (state, action) => {
      state.execution = true;
      state.loading = false;
      console.log('osa execution successfull.', action.payload);
    });
    builder.addCase(post_osaList.rejected, state => {
      state.loading = false;
      state.execution = false;
    });
   
  },
});

export const { addScannedItem } = osaSlice.actions;
export const { addScannedDisplay, resetExecution, sortByName , sortByWeight, setSearch} =
  osaSlice.actions;

export default osaSlice.reducer;
