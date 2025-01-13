import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useCurrentUser } from "../redux/features/auth/authSlice";
import ProductModal from "../components/ProductModal";
import { useAllProductQuery } from "../redux/features/product/productApi";
import { Dropdown } from "../components/Dropdown";
import ProductCard from "../components/ProductCard";
import Spinner from "../components/Spinner";
import Lottie from "lottie-react";
import empty from "./../assets/empty.json";

const Dashboard = () => {
  const user = useSelector(useCurrentUser);
  const { data, isLoading } = useAllProductQuery(user?.email);
  const [filter, setFilter] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [searchProduct, setSearchProduct] = useState("");

  useEffect(() => {
    if (filter) {
      const [key, value] = filter.split("=");

      const filteredData = data?.data?.filter((d) => d[key] === value);
      setFilteredData(filteredData);
    } else {
      setFilteredData(data?.data);
    }
  }, [data, filter]);

  if (!user || isLoading) return <Spinner />;

  if (data?.data?.length === 0) {
    return (
      <div className="container mx-auto mt-8 lg:mt-0">
        <p className="text-center text-xl lg:text-3xl capitalize font-semibold">
          Welcome, {user?.username}!
        </p>
        <div className="mt-4 lg:mt-12 flex justify-center items-center max-w-[500px] mx-auto">
          <Lottie animationData={empty} loop={true} />
        </div>
        <p className="text-center text-xl lg:text-2xl">Your Store Is Empty</p>
        <div className="mt-4 lg:mt-6 flex justify-center items-center">
          <ProductModal task="add">
            <span className="px-3 py-2 bg-pink-600 rounded-lg text-white">
              Add Product
            </span>
          </ProductModal>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto mt-8 lg:mt-0">
      <p className="text-center text-xl lg:text-3xl capitalize font-semibold">
        Welcome, {user?.username}!
      </p>

      <div className="mt-8 lg:mt-10 container mx-auto flex justify-between">
        <Dropdown setFilter={setFilter} />
        <div className="hidden lg:flex justify-end items-center">
          <div className="dark:bg-gray-900">
            <label htmlFor="table-search" className="sr-only">
              Search
            </label>
            <div className="relative mt-1">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  className="w-5 h-5 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </div>
              <input
                onChange={(e) => setSearchProduct(e.target.value)}
                type="text"
                id="table-search"
                className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:textWhite"
                placeholder="Search for products"
              />
            </div>
          </div>
        </div>
        <ProductModal task="add">
          <span className="px-3 py-2 bg-pink-600 rounded-lg text-white">
            Add Product
          </span>
        </ProductModal>
      </div>
      <div className="lg:hidden w-full max-w-96 mx-auto">
        <div className="dark:bg-gray-900">
          <label htmlFor="table-search" className="sr-only">
            Search
          </label>
          <div className="relative mt-4">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
            <input
              onChange={(e) => setSearchProduct(e.target.value)}
              type="text"
              id="table-search"
              className="w-full block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:textWhite"
              placeholder="Search for products"
            />
          </div>
        </div>
      </div>

      <div className="container px-4 mx-auto">
        <div className="grid grid-cols-12 gap-6 gap-y-8 lg:gap-y-0 mx-auto">
          {filteredData
            ?.filter((item) => {
              return searchProduct.toLowerCase() === ""
                ? item
                : item &&
                    item.name &&
                    item.name
                      .toLowerCase()
                      .includes(searchProduct.toLowerCase());
            })
            .map((d, i) => (
              <ProductCard key={i} d={d} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
