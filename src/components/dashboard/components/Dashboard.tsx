import { useEffect } from "react";
import { fetchCategories } from "../../../redux/features/categorySlice";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../redux/hooks/manageState";

const Dashboard = () => {
  const dispatch = useAppDispatch();
  const { categories, status } = useAppSelector((state) => state.category);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchCategories());
    }
  }, [status, dispatch]);
  console.log(categories);
  return <div>Dashboard</div>;
};

export default Dashboard;
