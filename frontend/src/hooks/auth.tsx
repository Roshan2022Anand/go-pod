import { setDetails } from "@/providers/redux/slice/user";
import type { StateT } from "@/providers/redux/store";
import { useNavigate, useRouterState } from "@tanstack/react-router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

//hook act's as middleware to check if user is authenticated
//it checks weather the client's creadentials are available globally
//else fetch user details from server based on the cookie available
const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { email, name } = useSelector((state: StateT) => state.user);
  const a = true;

  const path = useRouterState({
    select: (state) => state.location.pathname,
  });

  useEffect(() => {
    if (email && name) return;
    const checkAuth = async () => {
      await wait(2000);
      const emailV = localStorage.getItem("email");
      const nameV = localStorage.getItem("name");

      //if the fetch returns null then redirect to login
      if (a) dispatch(setDetails({ email: emailV, name: nameV }));
      else if (path !== "/login") {
        navigate({
          to: "/login",
          search: {
            redirect: path,
          },
        });
      }
    };
    checkAuth();
  }, [dispatch, email, name, a, path, navigate]);
};
export default useAuth;
