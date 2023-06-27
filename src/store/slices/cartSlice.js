import { createSlice } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const initialState = {
  products: [],
};

const persistConfig = {
  key: 'cart',
  storage,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {


      const product = action.payload;

      const existingProduct = state.products.find((item) => item._id === product._id);
      if (existingProduct) {
        toast.info('Product has already been added to cart!');
        return state;
      } else {
        toast.success('Product added to cart');
      }

      return {
        ...state,
        products: [...state.products, product],
      };
    },
    
    removeFromCart: (state, action) => {
      const productId = action.payload;
      return {
        ...state,
        products: state.products.filter((product) => product._id !== productId),
      };
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export default persistReducer(persistConfig, cartSlice.reducer);
