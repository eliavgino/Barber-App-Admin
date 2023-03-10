import axios from "axios";
import React, { createContext, useState, useEffect } from "react";
import jwt_decode from "jwt-decode";

export const IncomingContext = createContext();

function IncomingProvider(props) {

  const url="https://final-project-server-dbar.onrender.com"

  const { children } = props;
  const [incomingByMoth, setIncomingByMoth] = useState([]);
  const [haircutsByMonthAndBarber, sethaircutsByMonthAndBarber] = useState([]);
  const [haircutsBydateAndHairCutsCount, setHaircutsBydateAndHairCutsCount] =
    useState([{ _id: { month: 0 }, count: 1 }]);
  const month = new Date().getMonth() + 1;
  const [count, setcount] = useState(1);
  const [count2, setcount2] = useState(0);

  async function getAllincomingHaircutsByMoth() {
    try {
      const response = await axios.get(
        url+"/api/v1/haircut/getHairCutsDistintsAndAmouthSum"
      );
      console.log(response)
      setIncomingByMoth(response.data);
    } catch (error) {
      console.error(error);
      return error;
    }
  }
  async function getAllHairCutsByMoNTHAndCount() {
    try {
      const response = await axios.get(
        url+"/api/v1/haircut/getHairCutsDistints"
      );
      
      setcount(response.data.filter((val) => val._id.month == month)[0]['count']);
      setcount2(response.data.filter((val) => val._id.month == month - 1)[0]['count']);
      setHaircutsBydateAndHairCutsCount(response.data);

    } catch (error) {
      console.error(error);
      return error;
    }
  }
  async function getHairCutsDistintsByMonthAndYearAndBarber() {
    try {
      const response = await axios.get(
        url+"/api/v1/haircut/getHairCutsDistintsByMonthAndYearAndBarber"
      );
      sethaircutsByMonthAndBarber(response.data);
    } catch (error) {
      console.error(error);
      return error;
    }
  }

  return (
    <div>
      <IncomingContext.Provider
        value={{
          count,
          count2,
          getHairCutsDistintsByMonthAndYearAndBarber,
          getAllHairCutsByMoNTHAndCount,
          getAllincomingHaircutsByMoth,
          incomingByMoth,
          haircutsByMonthAndBarber,
          haircutsBydateAndHairCutsCount,
        }}
      >
        {children}
      </IncomingContext.Provider>
    </div>
  );
}

export default IncomingProvider;