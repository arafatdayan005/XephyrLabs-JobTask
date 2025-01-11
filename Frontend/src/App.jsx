import { Outlet } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout";

function App() {
  return (
    <>
      <Layout />
      <div className="w-full lg:ps-64">
        <div className="p-4 sm:p-6 space-y-4 sm:space-y-6 min-h-[calc(100vh-70px)] dark:bg-black/90">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default App;
