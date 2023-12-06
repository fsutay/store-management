import { createSlice } from '@reduxjs/toolkit';

const storesSlice = createSlice({
  name: 'stores',
  initialState: {
    storeList: [],
    updateClicked: false,
    updatingStore: {
      storeName: '',
      country: '',
      state: '',
      address: '',
      telephone: '',
      discountRate: '',
      premiumRate: '',
      description: '',

    }
  },
  reducers: {
    addStore: (state, action) => {
      let id = state.storeList.length === 0 ? 0 : Math.max(...state.storeList.map(o => o.id));
      action.payload.id = id + 1;
      action.payload.date = new Date();
      console.log(action.payload);
      state.storeList.push(action.payload);
    },
    setUpdatingStore: (state, action) => {
      let id = action.payload.id;
      let selectedStore = state.storeList.find((store) => store.id === id);
      state.updatingStore = selectedStore;
      state.updatingStore.clickedDate = new Date();
      state.updateClicked = true;
    },
    deleteStores: (state, action) => {
      state.storeList = state.storeList.filter((store) => !action.payload.includes(store.id));
    },
    updateStore: (state, action) => {
      let index = state.storeList.findIndex((store) => store.id === action.payload.id);
      state.storeList[index] = action.payload;
      state.updateClicked = false;
    },
    undoUpdating: (state, action) => {
      state.updateClicked = false;
      state.updatingStore = {}
    }
  },
});

export const { addStore, setUpdatingStore, deleteStores, updateStore, undoUpdating } = storesSlice.actions;

export default storesSlice.reducer;
