/* eslint-disable react/prop-types */
import { Button, Dialog, DialogPanel, Transition } from "@headlessui/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  useAddProductMutation,
  useUpdateProductMutation,
} from "./../redux/features/product/productApi";
import UploadWidget from "./UploadWidget";
import { useSelector } from "react-redux";
import { useCurrentUser } from "../redux/features/auth/authSlice";
import toast from "react-hot-toast";

export default function ProductModal({ fdata, task, children }) {
  const [isOpen, setIsOpen] = useState(false);
  const { register, handleSubmit, reset } = useForm();
  const [addProduct] = useAddProductMutation();
  const [updateProduct] = useUpdateProductMutation();
  const [photoURL, setPhotoURL] = useState(null);
  const user = useSelector(useCurrentUser);

  const handleImageUpload = async (url) => {
    setPhotoURL(url);
  };

  const onSubmit = async (data) => {
    if (task == "add") {
      if (photoURL) {
        try {
          data.image = photoURL;
          data.price = Number(data.price);
          data.quantity = Number(data.quantity);
          data.email = user.email;
          const res = await addProduct(data);
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
          reset();
          setIsOpen(false);
        } catch (e) {
          console.log(e);
        }
      } else {
        toast.error("Please upload an image", {
          duration: 3000,
          removeDelay: 1000,
        });
      }
    } else if (task == "edit") {
      data._id = fdata._id;
      data.image = photoURL || fdata.image;
      data.price = Number(data.price);
      data.quantity = Number(data.quantity);
      data.email = user.email;
      const res = await updateProduct(data);
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
      setIsOpen(false);
    }
  };

  return (
    <>
      <Button onClick={() => setIsOpen(!isOpen)}>{children}</Button>

      <Transition appear show={isOpen}>
        <Dialog
          open={isOpen}
          transition
          onClose={() => setIsOpen(false)}
          className="relative z-[100] transition duration-300 ease-out data-[closed]:opacity-0"
        >
          <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex w-screen items-center justify-center p-4">
            <DialogPanel
              transition
              className="max-w-lg space-y-4  duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0 bg-white p-4 rounded-lg"
            >
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid gap-6 mb-6 md:grid-cols-2">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Product Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      {...register("name")}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                      defaultValue={fdata?.name ?? ""}
                      required
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Price
                    </label>
                    <input
                      type="number"
                      id="price"
                      {...register("price")}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                      defaultValue={fdata?.price ?? ""}
                      required
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Quantity
                    </label>
                    <input
                      type="number"
                      id="quantity"
                      {...register("quantity")}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                      defaultValue={fdata?.quantity ?? ""}
                      required
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Select a type
                    </label>
                    <select
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                      id="type"
                      {...register("type")}
                      defaultValue={fdata?.type ?? "Choose a type"}
                    >
                      <option disabled>Choose a type</option>
                      <option value="home">Home</option>
                      <option value="garden">Garden</option>
                      <option value="sports">Sports</option>
                      <option value="gadget">Gadget</option>
                    </select>
                  </div>
                </div>

                <div className="w-full relative mt-6">
                  <div className={photoURL ? "hidden" : ""}>
                    <UploadWidget
                      onImageUpload={handleImageUpload}
                    ></UploadWidget>
                  </div>
                  <button
                    type="submit"
                    className="mx-auto text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm w-full flex justify-center sm:w-auto px-5 py-2.5 text-center"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </DialogPanel>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
