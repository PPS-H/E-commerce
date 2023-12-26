import axios from "axios";
import { server } from "../../server";

export const loaduser = async (dispatch) => {
  try {
    dispatch({ type: LoadUserRequest });
    axios
      .get(`${server}/user/getuser`, { withCredentials: true })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err.response.data.message);
      });
  } catch (error) {}
};
