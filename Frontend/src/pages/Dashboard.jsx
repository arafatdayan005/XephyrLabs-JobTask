import { useSelector } from "react-redux";
import { useCurrentUser } from "../redux/features/auth/authSlice";

const Dashboard = () => {
  const user = useSelector(useCurrentUser);
  return (
    <div>
      <p className="text-center text-xl lg:text-3xl capitalize font-semibold">
        Welcome, {user.username}!
      </p>
    </div>
  );
};

export default Dashboard;
