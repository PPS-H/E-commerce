import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { server } from "../../server";

function Activation() {
  const { activation_token } = useParams();
  const [error, setError] = useState(false);
  useEffect(() => {
    if (activation_token) {
      axios
        .post(`${server}/user/activation`, {
          activation_token,
        })
        .then((res) => {
          console.log(res.data.message);
        })
        .catch((err) => {
          console.log(err.response.data.message);
          setError(true);
        });
    }
  }, []);
  return (
    <div className="flex justify-center items-center w-full h-full">
      {error ? (<div>Your token has been expired. Please try again</div>) : (
      <div>Your account has been activated.</div>)}
    </div>
  );
}

export default Activation;
