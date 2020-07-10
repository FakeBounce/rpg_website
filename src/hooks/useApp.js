import { useDispatch } from "react-redux";
import { CALL_PRINT_ERROR } from "../redux/actionsTypes/actionsTypesAppState";

const useApp = () => {
  const dispatch = useDispatch();

  const triggerError = error => {
    dispatch({ type: CALL_PRINT_ERROR, payload: error.message });
  };

  return { triggerError };
};

export default useApp;
