import React, { useContext } from "react";
import { ToastContainer, toast } from "react-toastify";

const ToastContext = React.createContext(undefined);

export const useToastContext = () => useContext(ToastContext);

function ToastProvider(props) {
  const notify = (message, type = null, options = {}) => {
    if (type !== null) {
      toast[type](message, options);
    } else {
      toast(message, options);
    }
  };

  return (
    <ToastContext.Provider value={{ notify }}>
      <ToastContainer hideProgressBar newestOnTop />
      {props.children}
    </ToastContext.Provider>
  );
}

export { ToastContext, ToastProvider };
