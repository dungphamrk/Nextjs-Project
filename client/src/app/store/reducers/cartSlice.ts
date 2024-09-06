import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { Product } from '../../interfaces/types';
import { ProductService } from '../../services/products.service';
import { decrementStock } from './productsSlice';



interface CartState {
  items: Product[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: CartState = {
  items: [],
  status: 'idle',
  error: null,
};

export const addToCart:any= createAsyncThunk(
  'cart/addToCart',
  async (productId: number, { getState, dispatch }) => {
    const state = getState() as RootState;
    const product = state.products.products.find((p:Product) => p.id === productId);
    if (product && product.quantity > 0) {
      dispatch(decrementStock(productId));
      return { ...product, quantity: 1 };
    } else {
      throw new Error('Product is out of stock');
    }
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    removeItem: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      localStorage.setItem('cart', JSON.stringify(state.items));
    },
    loadCart: (state) => {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        state.items = JSON.parse(savedCart);
      }
    },
  },
  extraReducers: builder => {
    builder
      .addCase(addToCart.pending, state => {
        state.status = 'loading';
      })
      .addCase(addToCart.fulfilled, (state, action: PayloadAction<Product>) => {
        const existingItem = state.items.find(item => item.id === action.payload.id);
        if (existingItem) {
          existingItem.quantity += 1;
        } else {
          state.items.push(action.payload);
        }
        localStorage.setItem('cart', JSON.stringify(state.items));
        state.status = 'succeeded';
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to add to cart';
      });
  },
});

export const { removeItem, loadCart } = cartSlice.actions;

export default cartSlice.reducer;
