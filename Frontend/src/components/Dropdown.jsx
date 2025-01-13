/* eslint-disable react/prop-types */

export const Dropdown = ({ setFilter }) => {
  return (
    <div className="group inline-block relative z-30">
      <button className="outline-none focus:outline-none border px-3 py-1 bg-pink-600 flex items-center min-w-24 rounded-lg">
        <span className="pr-1 font-semibold flex-1 text-white">Filter By</span>
        <span>
          <svg
            className="fill-current h-4 w-4 transform group-hover:-rotate-180
        transition duration-150 ease-in-out text-white"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
          </svg>
        </span>
      </button>
      <ul
        className="ulist bg-white border rounded-sm transform scale-0 group-hover:scale-100 absolute 
  transition duration-150 ease-in-out origin-top min-w-32"
      >
        <li
          onClick={() => setFilter("")}
          className="list rounded-sm px-3 py-1 hover:cursor-pointer hover:bg-pink-100"
        >
          Clear Filter
        </li>
        <li className="list rounded-sm relative px-3 py-1 hover:cursor-pointer hover:bg-pink-100">
          <button className="w-full text-left flex items-center outline-none focus:outline-none">
            <span className="pr-1 flex-1">Type</span>
            <span className="mr-auto">
              <svg
                className="fill-current h-4 w-4
            transition duration-150 ease-in-out"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </span>
          </button>
          <ul className="ulist bg-white border rounded-sm absolute top-0 right-0 transition duration-150 ease-in-out origin-top-left min-w-32">
            <li
              onClick={() => setFilter("type=home")}
              className="px-3 py-1 hover:cursor-pointer hover:bg-pink-100"
            >
              Home
            </li>
            <li
              onClick={() => setFilter("type=garden")}
              className="px-3 py-1 hover:cursor-pointer hover:bg-pink-100"
            >
              Garden
            </li>
            <li
              onClick={() => setFilter("type=sports")}
              className="px-3 py-1 hover:cursor-pointer hover:bg-pink-100"
            >
              Sports
            </li>
            <li
              onClick={() => setFilter("type=gadget")}
              className="px-3 py-1 hover:cursor-pointer hover:bg-pink-100"
            >
              Gadget
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
};
