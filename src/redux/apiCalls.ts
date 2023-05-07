import { loginStart, loginSuccess, loginFailure } from "./userSlice";
import { signIn, signUp } from "services/authService";
//login user
export const login = async (dispatch: any, user: any) => {
  dispatch(loginStart());
  try {
    const res = await signIn(user);
    dispatch(loginSuccess(res.data));
  } catch (error) {
    dispatch(loginFailure());
  }
};

//register user
export const register = async (user: any) => {
  // dispatch(loginStart());
  try {
    const res = await signUp(user);
    // dispatch(loginSuccess(res.data));
  } catch (error) {
    console.log("Error", error);
    // dispatch(loginFailure());
  }
};
