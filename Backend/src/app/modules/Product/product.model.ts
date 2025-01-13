import { Schema, model } from "mongoose";
import { Product } from "./product.interface";

const productSchema = new Schema<Product>({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: {
      values: ["home", "garden", "sports", "gadget"],
      message: "{VALUE} is not a valid type",
    },
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});

export const productModel = model<Product>("Product", productSchema);
