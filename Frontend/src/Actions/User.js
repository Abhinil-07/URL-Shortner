import axios from "axios";
import {
  loadUserFailure,
  loadUserRequest,
  loadUserSuccess,
  loginFailure,
  loginRequest,
  loginSuccess,
  registerFailure,
  registerRequest,
  registerSuccess,
} from "../utils/userSlice";

export const loginUser = async (email, password, dispatch) => {
  try {
    dispatch(loginRequest());
    const { data } = await axios.post(
      "http://localhost:4000/users/login",
      {
        email,
        password,
      },
      {
        withCredentials: true,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    dispatch(loginSuccess(data.user));
  } catch (error) {
    console.log(error);
    dispatch(loginFailure(error.response.data.message));
  }
};

export const registerUser = async (name, email, password, dispatch) => {
  try {
    dispatch(registerRequest());
    const { data } = await axios.post(
      "http://localhost:4000/users/register",
      {
        name,
        email,
        password,
      },
      {
        withCredentials: true,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(data.token);
    dispatch(registerSuccess(data.createdUser));
  } catch (error) {
    console.log(error);
    dispatch(registerFailure(error.response.data.message));
  }
};

export const loadUser = async (dispatch) => {
  try {
    dispatch(loadUserRequest());
    const { data } = await axios.get("http://localhost:4000/users/details", {
      withCredentials: true,
    });

    dispatch(loadUserSuccess(data.user));
  } catch (error) {
    console.log(error);
    dispatch(loadUserFailure(error.response.data.message));
  }
};
