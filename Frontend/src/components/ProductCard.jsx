/* eslint-disable react/prop-types */

import toast from "react-hot-toast";
import { useDeleteProductMutation } from "../redux/features/product/productApi";
import ProductModal from "./ProductModal";

const ProductCard = ({ d }) => {
  const [deleteProduct] = useDeleteProductMutation();

  const handleDelete = async (id) => {
    const res = await deleteProduct(id);
    if (res?.error) {
      toast.error(`${res?.error?.data?.errorMessage}`, {
        duration: 3000,
        removeDelay: 1000,
      });
    } else {
      toast.success(`${res?.data?.message}`, {
        duration: 3000,
      });
    }
  };

  return (
    <div className="col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3">
      <div className="max-w-[350px] mx-auto relative bg-white shadow-[0_0_50px_0_rgba(35,31,32,0.1)] dark:bg-slate-800 hover:-translate-y-1 mt-6 duration-300 rounded-xl">
        <div className={`flex rounded-xl p-3 relative`}>
          <img src={d?.image} className="w-full h-56 -mb-24 rounded-xl" />
        </div>
        <div className="p-6 mt-16">
          <h4 className="text-2xl font-medium mb-4">{d?.name}</h4>
          <div className="flex justify-between">
            <p className="opacity-80 mb-0">Price: {d?.price}$</p>
            <p className="opacity-80 mb-0">Quantity: {d?.quantity}</p>
          </div>
        </div>
        <div className="flex justify-center items-center gap-4 pb-4">
          <ProductModal task="edit" fdata={d}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-square-pen text-blue-600"
            >
              <path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z" />
            </svg>
          </ProductModal>
          <button
            onClick={() => handleDelete(d?._id)}
            className="text-red-500 disabled:animate-pulse disabled:cursor-not-allowed"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-trash-2"
            >
              <path d="M3 6h18" />
              <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
              <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
              <line x1="10" x2="10" y1="11" y2="17" />
              <line x1="14" x2="14" y1="11" y2="17" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
