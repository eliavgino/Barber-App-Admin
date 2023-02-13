import axios from "axios";
import React, { createContext, useState, useEffect, useContext } from "react";
import jwt_decode from "jwt-decode";
import { RoleContext } from "./role";

export const HairCutsContext = createContext();

function HairCutsProvider(props) {
  const { role } = useContext(RoleContext);

  const { children } = props;
  let decoded;
  const token = localStorage.getItem("token")
    ? localStorage.getItem("token")
    : undefined;
  decoded = token ? jwt_decode(token) : undefined;

  const [pageState, setPageState] = useState("chooseHairCut");
  const [chooseTime, setChooseTime] = useState();
  const [chooseHairCut, setChooseHairCut] = useState();
  const [chooseBarber, setChooseBarber] = useState({ _id: "a" });
  const [barberHairCuts, setBarberHairCuts] = useState([]);
  const [userHairCuts, setUserHairCuts] = useState([]);
  const [haircuts, setHaircuts] = useState([]);
  const [barbers, setBarbers] = useState([]);
  const [allHairCuts, setallHairCuts] = useState([
    {
      _id: " ",
      user: " ",
      barber: "",
      date: " ",
      hairCut: " ",
      hour: " ",
      active: " ",
    },
  ]);
  const [activeHaircuts, setActiveHaircuts] = useState([]);
  const appointments = [];
  const currentDate = new Date();
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  async function getHairCutsByBarberId(id) {
    try {
      const response = await axios.post(
        "http://localhost:4000/api/v1/hairCut/getHairCutByBarberId",
        { id }
      );
      setBarberHairCuts(response.data);
      if (!response) {
        console.log("this is empty");
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function removeByHairrcutId(id) {
    try {
      const response = await axios.post(
        "http://localhost:4000/api/v1/haircut/deleteHairCut",
        { _id: id }
      );
      getUpcomingHairCuts();
      if (!response) {
        console.log("this is empty");
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function getHairCutsByUserId(id) {
    try {
      const response = await axios.post(
        "http://localhost:4000/api/v1/hairCut/getHairCutByUser",
        { id }
      );

      setUserHairCuts(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  async function getAllHaircutsPrice() {
    try {
      const response = await axios.get("http://localhost:4000/api/v1/product");
      let haircuts1 = response.data.filter(
        (product) => product.product_type === "haircuts"
      );
      setHaircuts(haircuts1);
      if (!response) {
        console.log("this is empty");
      }
    } catch (error) {
      console.error(error);
    }
  }
  async function getAllBarbers() {
    try {
      const response = await axios.get("http://localhost:4000/api/v1/barber");
      setBarbers(response.data);
      console.log(barbers);
    } catch (error) {
      console.error(error);
      return error;
    }
  }
  async function getUpcomingHairCuts() {
    try {
      const response = await axios.get("http://localhost:4000/api/v1/haircut");
      console.log(response.data);

      setallHairCuts(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getUpcomingHairCuts();
    if (
      localStorage.getItem("token") &&
      jwt_decode(localStorage.getItem("token")).role === "client"
    )
      getHairCutsByUserId(jwt_decode(localStorage.getItem("token"))._id);
  }, [role]);

  console.log(activeHaircuts);
  console.log(chooseBarber._id);
  let filteredHaircuts = activeHaircuts.filter(
    (hairCut) => hairCut.barber._id === chooseBarber._id
  );
  console.log(filteredHaircuts);

  return (
    <div>
      <HairCutsContext.Provider
        value={{
          getHairCutsByBarberId,
          barberHairCuts,
          setBarberHairCuts,
          currentDate,
          pageState,
          setPageState,
          allHairCuts,
          setallHairCuts,
          getUpcomingHairCuts,
          getAllBarbers,
          activeHaircuts,
          setChooseBarber,
          chooseBarber,
          barbers,
          setChooseHairCut,
          chooseHairCut,
          pageState,
          haircuts,
          setChooseTime,
          chooseTime,
          setPageState,
          getAllHaircutsPrice,
          decoded,
          token,
          userHairCuts,
          setUserHairCuts,
          removeByHairrcutId,
        }}
      >
        {children}
      </HairCutsContext.Provider>
    </div>
  );
}

export default HairCutsProvider;
