import { useContext } from "react";
import { AuthContext } from "../context/authProvider.jsx";

const useAuth = () => {
    return useContext(AuthContext);
};

export default useAuth;
