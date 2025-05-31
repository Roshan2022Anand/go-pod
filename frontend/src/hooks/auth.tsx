import { setDetails } from "@/providers/redux/slice/user";
import type { StateT } from "@/providers/redux/store";
import { useNavigate, useRouterState } from "@tanstack/react-router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

//hook act's as middleware to check if user is authenticated
//it checks weather the client's creadentials are available globally
//else fetch user details from server based on the cookie available
const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { email, name } = useSelector((state: StateT) => state.user);

  const path = useRouterState({
    select: (state) => state.location.pathname,
  });

  useEffect(() => {
    if (email && name) return;
    const redirect = () => {
      if (path !== "/login") {
        navigate({
          to: "/login",
          search: {
            redirect: path,
          },
        });
      }
    };
    const checkAuth = async () => {
      try {
        const res = await fetch(import.meta.env.VITE_NODE_URL + "/auth/user", {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (res.status !== 200) {
          redirect();
          return;
        }
        const { email, name } = await res.json();
        dispatch(setDetails({ email, name }));
        toast.success("welcome back " + name);
      } catch (err: unknown) {
        console.log(err);
        redirect();
      }
    };
    checkAuth();
  }, [dispatch, email, name, path, navigate]);
};
export default useAuth;
