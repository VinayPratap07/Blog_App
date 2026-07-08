import "./App.css";
import { Outlet } from "react-router-dom";
import Footer from "./Components/Footer/Footer";
import Navbar from "./Components/NavigationBar/NavBar";
import { useDispatch } from "react-redux";
import { updateUser } from "./Slices/userSlice";
import { getCurrentUser } from "./API/API_Calls";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import Loader from "./Components/Loader/Loader";
import ErrorState from "./Components/ErrorMessage/ErrorMessage";
import axios from "axios";

function App() {
  const dispatch = useDispatch();

  const {
    isLoading,
    error,
    data: user,
  } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
    staleTime: 1000,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  useEffect(() => {
    if (user) {
      dispatch(updateUser(user));
    }
  }, [user, dispatch]);

  return (
    <>
      <Navbar />

      {isLoading ? (
        <Loader />
      ) : error && axios.isAxiosError(error) ? (
        <ErrorState error={error} />
      ) : (
        <Outlet />
      )}

      <Footer />
    </>
  );
}

export default App;
