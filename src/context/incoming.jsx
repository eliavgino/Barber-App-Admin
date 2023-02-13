import axios from "axios";
import React, { createContext, useState, useEffect } from "react";
import jwt_decode from "jwt-decode";

export const IncomingContext = createContext();

function IncomingProvider(props) {
  const { children } = props;
  const [incomingByMoth, setIncomingByMoth] = useState([]);
  const [haircutsByMonthAndBarber, sethaircutsByMonthAndBarber] = useState([]);
  const [haircutsBydateAndHairCutsCount, setHaircutsBydateAndHairCutsCount] =
    useState([]);

  async function getAllincomingHaircutsByMoth() {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/v1/haircut/getHairCutsDistintsAndAmouthSum"
      );
      setIncomingByMoth(response.data);
    } catch (error) {
      console.error(error);
      return error;
    }
  }
  async function getAllHairCutsByMoNTHAndCount() {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/v1/haircut/getHairCutsDistints"
      );
     
      console.log(response.date);
      setHaircutsBydateAndHairCutsCount(response.data);
    } catch (error) {
      console.error(error);
      return error;
    }
  }
  async function getHairCutsDistintsByMonthAndYearAndBarber() {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/v1/haircut/getHairCutsDistintsByMonthAndYearAndBarber"
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
