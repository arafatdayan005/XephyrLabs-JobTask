import { Request, Response } from "express";
import { productServices } from "./product.service";
import { Types } from "mongoose";
import catchAsync from "../../utils/catchAsync";
import successResponse from "../../utils/sendResponse";

const createProduct = catchAsync(async (req: Request, res: Response) => {
  const result = await productServices.createProductIntoDB(req.body);

  successResponse(res, {
    success: true,
    statusCode: 201,
    message: "Product created successfully",
    data: result,
  });
});

const getAllProduct = catchAsync(async (req: Request, res: Response) => {
  const { email } = req.params;
  const result = await productServices.getAllProductFromDB(email);

  successResponse(res, {
    success: true,
    statusCode: 200,
    message: "Products retrieved successfully",
    meta: {
      total: Number(result.total),
    },
    data: result.result,
  });
});

const updateProduct = catchAsync(async (req: Request, res: Response) => {
  const { ProductId } = req.params;

  const result = await productServices.updateProductIntoDB(
    new Types.ObjectId(ProductId),
    req.body
  );

  successResponse(res, {
    success: true,
    statusCode: 200,
    message: "Product updated successfully",
    data: result,
  });
});

const deleteProduct = catchAsync(async (req: Request, res: Response) => {
  const { ProductId } = req.params;

  const result = await productServices.deleteProductFromDB(
    new Types.ObjectId(ProductId)
  );

  successResponse(res, {
    success: true,
    statusCode: 200,
    message: "Product deleted successfully",
    data: result,
  });
});

const deleteManyProduct = catchAsync(async (req: Request, res: Response) => {
  const { ids } = req.body;
  const result = await productServices.deleteManyProductsFromDB(ids);

  successResponse(res, {
    success: true,
    statusCode: 200,
    message: "Products deleted successfully",
    data: result,
  });
});

export const productControllers = {
  createProduct,
  getAllProduct,
  updateProduct,
  deleteProduct,
  deleteManyProduct,
};
