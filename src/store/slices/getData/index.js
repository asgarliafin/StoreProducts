import { store } from "@/store";
import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import axios from "axios";
import { useSelector } from "react-redux";

const Endpoint = "https://fakestoreapi.com/products";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response = await axios.get(Endpoint);
    return response.data;
  }
);

export const fetchCategories = createAsyncThunk(
  "products/fetchCategories",
  async () => {
    const response = await axios.get(Endpoint + "/categories");
    return response.data;
  }
);

export const fetchCategoriesElements = createAsyncThunk(
  "products/fetchCategoriesElements",
  async (category) => {
    if (category != "All category") {
      const response = await axios.get(Endpoint + "/category" + `/${category}`);
      return response.data;
    } else {
      const response = await axios.get(Endpoint);
      return response.data;
    }
  }
);

const initialState = {
  products: [],
  pageProducts: [],
  status: "idle",
  error: null,
  count: 10,
  value: "",
  options: [],
  selectValue: "All category",
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    getPage: (state, action) => {
      const newPage = action.payload;
      state.pageProducts = current(state.products).slice(
        10 * (newPage - 1),
        10 * newPage
      );
      state.value = "";
      state.selectValue = "All category";
    },

    search: (state, action) => {
      const searchValue = action.payload;
      state.value = searchValue;
      const filtered = current(state.products).filter((item) =>
        item.title.toLowerCase().includes(searchValue.toLowerCase())
      );
      state.pageProducts = filtered;
      state.selectValue = "All category";
    },

    setSelectValue: (state, action) => {
      state.selectValue = action.payload;
      state.value = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload;
        state.pageProducts = action.payload.slice(0, 10);
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      .addCase(fetchCategories.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.options = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      .addCase(fetchCategoriesElements.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCategoriesElements.fulfilled, (state, action) => {
        state.pageProducts = action.payload;
      })
      .addCase(fetchCategoriesElements.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const getAllProducts = (state) => state.products.products;
export const getPageProducts = (state) => state.products.pageProducts;
export const getProductsStatus = (state) => state.products.status;
export const getProductsError = (state) => state.products.error;
export const getValue = (state) => state.products.value;
export const getOptions = (state) => state.products.options;
export const getSelectValue = (state) => state.products.selectValue;
export const productsReducer = productsSlice.reducer;
export const { getPage, search, setSelectValue } = productsSlice.actions;
