import { SortOrder, Types } from "mongoose";
import { Product } from "./product.interface";
import { productModel } from "./product.model";
import { ObjectId } from "mongodb";

const createProductIntoDB = async (product: Product) => {
  const result = await productModel.create(product);
  return result;
};

const getAllProductFromDB = async (email: string) => {
  const result = await productModel.find({ email: email });

  const total = await productModel.countDocuments();
  return { result, total };
};

const updateProductIntoDB = async (
  ProductId: Types.ObjectId,
  payload: Partial<Product>
) => {
  const result = await productModel.findOneAndUpdate(
    { _id: ProductId },
    payload,
    { new: true, runValidators: true }
  );

  return result;
};

const deleteProductFromDB = async (ProductId: Types.ObjectId) => {
  const result = await productModel.findOneAndDelete({ _id: ProductId });

  return result;
};

const deleteManyProductsFromDB = async (ids: string[]) => {
  const objectIds = ids.map((id) => {
    if (!ObjectId.isValid(id)) {
      throw new Error(`Invalid ID format: ${id}`);
    }
    return new ObjectId(id);
  });

  const result = await productModel.deleteMany({ _id: { $in: objectIds } });

  return result;
};

export const productServices = {
  createProductIntoDB,
  getAllProductFromDB,
  updateProductIntoDB,
  deleteProductFromDB,
  deleteManyProductsFromDB,
};
