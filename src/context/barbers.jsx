import jwt_decode from "jwt-decode";
import axios from "axios";
import React, { createContext, useState, useEffect } from "react";

export const BarbersContext = createContext();

function BarberProvider(props) {
  useEffect(() => {
    if (localStorage.getItem("token"))
      setCerruntBarberId(jwt_decode(localStorage.getItem("token"))._id);
  }, []);

  const { children } = props;
  const url = "https://final-project-server-dbar.onrender.com";
  const [barberId, setBarberId] = useState();
  const [cerruntBarberId, setCerruntBarberId] = useState("");
  const [barbers, setBarbers] = useState([]);
  const [barber, setBarber] = useState({
    profilePhoto: "",
    phoneNumber: "",
    email: "",
    barbaer_Name: "",
  });
  const [errorMsg, setErrorMsg] = useState(null);
  const [userName, setUsername] = useState("");
  const addNewBarber = async (barberObj) => {
    try {
      const response = await axios.post(url, barberObj, {});
      console.log(response.data);
    } catch (error) {
      console.log(error);
      alert(error.response.data);
    }
  };
  const getAllBarbers = async () => {
    try {
      let response = await axios.get(url+"/api/v1/barber", {});
      let barber = response.data;
      //adding the barber into arry of barbers
      setBarbers(barber);
    } catch (error) {
      console.log(error);
      alert(error.response.data);
    }
  };
  const getbarberById = async (barberId) => {
    try {
      let response = await axios.post(
        url+"/api/v1/barber/barberprofile",
        {id:barberId},
        {}
      );
      setBarber(response.data);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <BarbersContext.Provider
        value={{
          getAllBarbers,
          barbers,
          getbarberById,
          barber,
          setBarberId,
          barberId,
          cerruntBarberId,
          setCerruntBarberId,
          addNewBarber,
        }}
      >
        {children}
      </BarbersContext.Provider>
    </div>
  );
}

export default BarberProvider;
