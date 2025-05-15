import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./providers/redux/store.ts";
import { Bounce, ToastContainer } from "react-toastify";
import App from "./App.tsx";
import { MyContextProvider } from "./providers/context/Provider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick={false}
      rtl={false}
      draggable
      pauseOnHover
      theme="dark"
      transition={Bounce}
    />
    <MyContextProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </MyContextProvider>
  </StrictMode>
);
