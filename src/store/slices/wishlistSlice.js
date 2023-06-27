import { createSlice } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const initialState = {
  products: [],
};

const persistConfig = {
  key: 'wishlist',
  storage,
};

export const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    addToWishlist: (state, action) => {


      const product = action.payload;

      const existingProduct = state.products.find((item) => item._id === product._id);
      if (existingProduct) {
        toast.error('Product has already been added to wishlist!');
        return state;
      } else {
        toast.success('Product added to wishlist');
      }

      return {
        ...state,
        products: [...state.products, product],
      };
    },
    
    removeFromWishlist: (state, action) => {
      const productId = action.payload;
      return {
        ...state,
        products: state.products.filter((product) => product._id !== productId),
      };
    },
  },
});

export const { addToWishlist, removeFromWishlist } = wishlistSlice.actions;
export default persistReducer(persistConfig, wishlistSlice.reducer);
