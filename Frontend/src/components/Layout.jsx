/* eslint-disable react/prop-types */
import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { logout} from "../redux/features/auth/authSlice";
import { useDispatch } from "react-redux";

const RouteLink = ({ href, children }) => {
  return (
    <NavLink
      className={({ isActive }) =>
        isActive
          ? "flex items-center gap-3 rounded-lg p-3 transition-colors hover:text-white text-sm duration-300 bg-red-400 text-white hover:bg-red-400"
          : "flex items-center gap-3 rounded-lg p-3 transition-colors hover:text-white text-sm duration-300 text-[#a6b0cf] hover:bg-red-400/50"
      }
      to={href}
    >
      {children}
    </NavLink>
  );
};

function Layout() {
  const [isSideNavOpen, setIsSideNavOpen] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(logout());
    navigate("/login");
  };

  return (
    <>
      <button
        title="Side navigation"
        type="button"
        className={`visible fixed left-6 top-6 z-40 order-10 block h-10 w-10 self-center rounded-lg bg-transparent backdrop-blur-sm opacity-100 lg:hidden ${
          isSideNavOpen
            ? "visible opacity-100 [&_span:nth-child(1)]:w-6 [&_span:nth-child(1)]:translate-y-0 [&_span:nth-child(1)]:rotate-45 [&_span:nth-child(3)]:w-0 [&_span:nth-child(2)]:-rotate-45 "
            : ""
        }`}
        aria-haspopup="menu"
        aria-label="Side navigation"
        aria-expanded={isSideNavOpen ? " true" : "false"}
        aria-controls="nav-menu-1"
        onClick={() => setIsSideNavOpen(!isSideNavOpen)}
      >
        <div className="absolute top-1/2 left-1/2 w-6 -translate-x-1/2 -translate-y-1/2 transform">
          <span
            aria-hidden="true"
            className="absolute block h-0.5 w-9/12 -translate-y-2 transform rounded-full bg-slate-700 transition-all duration-500"
          ></span>
          <span
            aria-hidden="true"
            className="absolute block h-0.5 w-6 transform rounded-full bg-slate-900 transition duration-500"
          ></span>
          <span
            aria-hidden="true"
            className="absolute block h-0.5 w-1/2 origin-top-left translate-y-2 transform rounded-full bg-slate-900 transition-all duration-500"
          ></span>
        </div>
      </button>

      <aside
        id="nav-menu-1"
        aria-label="Side navigation"
        className={`fixed top-0 lg:top-0 bottom-0 left-0 z-40 flex w-64 flex-col border-r border-r-slate-200 bg-red-200 transition-transform lg:translate-x-0 duration-500 ${
          isSideNavOpen ? "translate-x-0" : " -translate-x-full"
        }`}
      >
        <Link
          href="/"
          className=" py-6 mx-8 text-xl font-medium flex items-center"
        >
          <img
            src="https://corporate.target.com/getmedia/0289d38f-1bb0-48f9-b883-cd05e19b8f98/Target_Bullseye-Logo_Red_transparent.png"
            className="mx-2 font-extrabold"
            width={50}
            height={40}
            alt="Logo"
          />
          <p className=" text-red-500 font-bold text-2xl uppercase tracking-[0.1em]">
            Tstore
          </p>
        </Link>
        <nav>
          <ul className="px-3 space-y-1">
            <RouteLink href="/">
              <div className="flex w-full truncate text-sm">Dashboard</div>
            </RouteLink>
          </ul>
        </nav>
        <footer className="border-t border-slate-200 p-3 mt-auto">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 rounded p-3 text-slate-900 transition-colors hover:text-[#4338CA] "
          >
            <div className="flex items-center self-center ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-6 w-6"
                aria-label="Dashboard icon"
                role="graphics-symbol"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11.25 9l-3 3m0 0l3 3m-3-3h7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div className="flex w-full flex-1 flex-col items-start justify-center gap-0 overflow-hidden truncate text-sm font-medium">
              Logout
            </div>
          </button>
        </footer>
      </aside>

      <div
        className={`fixed top-0 bottom-0 left-0 right-0 z-30 bg-slate-900/20 transition-colors duration-500 lg:hidden ${
          isSideNavOpen ? "block" : "hidden"
        }`}
        onClick={() => setIsSideNavOpen(false)}
      ></div>
    </>
  );
}

export default Layout;
