import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  _id: null,
  name: null,
  image: undefined,
  price: null,
  quantity: null,
  type: null,
  email: null,
};

export const productSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setProduct: (state, action) => {
      const { _id, name, image, price, quantity, type, email } = action.payload;
      state._id = _id;
      state.name = name;
      state.image = image;
      state.price = price;
      state.quantity = quantity;
      state.type = type;
      state.email = email;
    },
  },
});

export const { setProduct } = productSlice.actions;
export default productSlice.reducer;
