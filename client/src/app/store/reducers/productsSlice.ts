// src/slices/productSlice.ts
import { createSlice, createAsyncThunk, PayloadAction, createSelector } from "@reduxjs/toolkit";
import { Product } from "../../interfaces/types"; // Import the Product interface
import { ProductService } from "../../services/products.service"; // Import the ProductService
import axios from "axios";
import { RootState } from "../store";

// Define the initial state using the Product interface
export interface ProductState {
  products: Product[];
  loading: boolean;
  error: string | null;
  modalOpen: boolean;
  totalPages: number;
  selectedProduct: Product | null;
}

const initialState: ProductState = {
  products: [],
  loading: false,
  error: null,
  modalOpen: false,
  totalPages: 1,
  selectedProduct: null, 
};
export const getProductById:any = createAsyncThunk(
  "products/getProductById",
  async (id: number) => {
    const response = await ProductService.getProductById(id);
    console.log(response);
    
    return response;
  }
);


// Async thunk for fetching all products
export const fetchPaginatedProducts: any = createAsyncThunk(
  "products/fetchPaginatedProducts",
  async ({ page, limit }: { page: number; limit: number }) => {
    const response = await axios.get(
      `http://localhost:3000/products?_page=${page}&_limit=${limit}`
    );
    console.log(response.data);
    
    return {
      products: response.data,
      totalPages: Math.ceil(
        parseInt(response.headers["x-total-count"]) / limit
      ),
    };
  }
);
export const getAllProduct: any = createAsyncThunk(
  "products/getAll",
  async () => {
    const data = await ProductService.getAllProduct();
    return data;
  }
);

// Async thunk for adding a product
export const addProduct: any = createAsyncThunk(
  "products/add",
  async (product: Product) => {
    const newProduct = await ProductService.addProduct(product);
    return newProduct;
  }
);

// Async thunk for updating a product
export const updateProduct: any = createAsyncThunk(
  "products/update",
  async (product: Product) => {
    const updatedProduct = await ProductService.updateProduct(product);
    console.log(111,product);
    
    console.log(updateProduct.quantity);
    
    return updatedProduct;
  }
  
);

// Async thunk for deleting a product
export const deleteProduct: any = createAsyncThunk(
  "products/delete",
  async (id: number) => {
    await ProductService.deleteProduct(id);
    return id;
  }
);
export const decrementStock:any = createAsyncThunk(
  'products/decrementStock',
  async (productId: number, { getState }) => {
    const state = getState() as RootState;
    const product = state.products.products.find((p:Product) => p.id === productId);
    if (product && product.stock > 0) {
      const updatedProduct = { ...product, stock: product.stock - 1 };
      await ProductService.updateProduct(updatedProduct);
      return productId;
    } else {
      throw new Error('Product is out of stock');
    }
  }
);

// Create the product slice
const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    openModal(state) {
      state.modalOpen = true;
    },
    closeModal(state) {
      state.modalOpen = false;
    },
    setSelectedProduct(state, action: PayloadAction<Product | null>) {
      state.selectedProduct = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(getProductById.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(getProductById.fulfilled, (state, action) => {
      state.loading = false;
      state.selectedProduct = action.payload;
    })
    .addCase(getProductById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Failed to fetch product";
    })

    .addCase(decrementStock.fulfilled, (state, action: PayloadAction<number>) => {
      const product = state.products.find(p => p.id === action.payload);
      if (product) {
        product.quantity -= 1;
      }
    })
    .addCase(decrementStock.rejected, (state, action) => {
      state.error = action.error.message || 'Failed to decrement stock';
    })
    .addCase(getAllProduct.fulfilled, (state,action) => {
      state.products=action.payload;
    })
      .addCase(fetchPaginatedProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPaginatedProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchPaginatedProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch products";
      })
      .addCase(addProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        addProduct.fulfilled,
        (state, action: PayloadAction<Product>) => {
          state.products.push(action.payload);
          state.loading = false;
        }
      )
      .addCase(addProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to add product";
      })
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        updateProduct.fulfilled,
        (state, action: PayloadAction<Product>) => {
          const index = state.products.findIndex(
            (product) => product.id === action.payload.id
          );
          if (index !== -1) {
            state.products[index] = action.payload;
          }
          state.loading = false;
        }
      )
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to update product";
      })
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        deleteProduct.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.products = state.products.filter(
            (product) => product.id !== action.payload
          );
          state.loading = false;
        }
      )
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to delete product";
      });
  },
});
export const selectPaginatedProducts = createSelector(
  (state: RootState) => state.products.products,
  (products) => products
);
export const selectSelectedProduct = createSelector(
  (state: RootState) => state.products.selectedProduct,
  (selectedProduct) => selectedProduct
);
// Export the actions
export const { openModal, closeModal ,setSelectedProduct } = productSlice.actions;

// Export the reducer
export default productSlice.reducer;
