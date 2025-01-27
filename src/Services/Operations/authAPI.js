import toast from "react-hot-toast";
import apiConnector from "../apiConnector";
import {auth} from "../apis";
import { setLoading, setSignUpData, setToken } from "../../Slices/authSlice";

export function signUp (email, phoneNumber, otp, navigate) {
    return async(dispatch) => {
        const toastId = toast.loading("Loading...");
        dispatch(setLoading(true));
        try{
            const response = await apiConnector("POST", auth.SIGNUP_API, {
                email,
                phoneNumber,
                otp,
            });
    
            console.log("SignUp API response: ", response);
            dispatch(setToken(response.data.token));

            try{
                localStorage.setItem("token", JSON.stringify(response.data.token));
            }catch(err){
                console.log(err);
                console.log("Token can't be stored in localStorage.");
            }
            toast.success("SignUp successfully.");
            navigate("/home");;
        }catch(err){
            console.log(err);
            console.log("Error in fetching the signUp data.");
            toast.error("SIgnUp failed.");
            navigate("/verification");
        }
        dispatch(setLoading(false));
        toast.dismiss(toastId);
    }
}

//logout
export const logout = (navigate, email) => {
    return async(dispatch) => {
        try{
            // const response = await apiConnector("POST", "http://localhost:4000/api/v1/deleteUser", {email});
            // if(!response){
            //     console.log("Logout api fech response not found.");
            // }

            // console.log("Logout response: ", response);

            dispatch(setToken(null));
            dispatch(setSignUpData(null));
            localStorage.removeItem("token");
            localStorage.removeItem("signUpData");
            toast.success("Logged out");
            navigate("/login");
        }catch(err){
            console.log(err);
            console.log("Logged out failed...");
        }
    }
}