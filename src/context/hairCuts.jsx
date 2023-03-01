import axios from "axios";
import React, { createContext, useState, useEffect, useContext } from "react";
import jwt_decode from "jwt-decode";
import { RoleContext } from "./role";

export const HairCutsContext = createContext();

function HairCutsProvider(props) {

  const { role } = useContext(RoleContext);

  const url="https://final-project-server-dbar.onrender.com"

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
  const [rAppointments,setRAppointments]=useState([])
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
        url+"/api/v1/hairCut/getHairCutByBarberId",
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
        url+"/api/v1/haircut/deleteHairCut",
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
        url+"/api/v1/hairCut/getHairCutByUser",
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
      const response = await axios.get(url+"/api/v1/product");
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
      const response = await axios.get(url+"/api/v1/barber");
      setBarbers(response.data);
      console.log(barbers);
    } catch (error) {
      console.error(error);
      return error;
    }
  }
  async function getUpcomingHairCuts() {
    try {
      const response = await axios.get(url+"/api/v1/haircut");
      console.log(response.data);

      setallHairCuts(response.data);
      setActiveHaircuts((response.data.filter(hairCut => hairCut.active === true)));
      
    } catch (error) {
      console.error(error);
    }
  }

  async function getDayScheduleHairCuts (){
    try {
      let filteredHaircuts= activeHaircuts.filter(hairCut=>hairCut.barber._id===chooseBarber._id)
      
      let id=0
      
      let nextDaysWithEvents=[];

      let eventsCounter=0;
      

      const response = await axios.get(url+"/api/v1//event");
  
        for(let i = 0; i <response.data.length; i++){

          for (let j = 0; j <28; j++) {

            const date = new Date(currentDate);
            date.setDate(currentDate.getDate() + j);
            date.setHours(2)
            date.setMinutes(0)
            date.setSeconds(0)
            date.setMilliseconds(0)   
     
            if((new Date(date)).toISOString()===(new Date(response.data[i].date).toISOString())){

              let start=parseInt(response.data[i].hours.slice(0,2));
              let end=parseInt(response.data[i].hours.slice(6,8));
              let duration=end-start;
              let halfStart=response.data[i].hours.slice(3,4)==='3'
              let halfEnd=response.data[i].hours.slice(9,10)==='3'
              nextDaysWithEvents.push({j,details:{duration,start,end,halfStart,halfEnd}});
              
            }

          }
        }

        for (let i = 0; i <28; i++) {
          const date = new Date(currentDate);
          date.setDate(currentDate.getDate() + i);
                
          let iDayEvents=nextDaysWithEvents.filter(day=>day['j']===i)
          
          iDayEvents.sort((a,b)=>{
            if (a.details.start>b.details.start) {
              return 1;
            }
            if (a.details.start<b.details.start) {
              return -1;
            }
            return 0;
            });;
            
          for (let hour = 9; hour < 18; hour++) {

            if(iDayEvents[eventsCounter]&&iDayEvents[eventsCounter]['details']['halfStart']!==true&&iDayEvents[eventsCounter]['details']['start']===hour){
              
              hour+=iDayEvents[eventsCounter].details.duration-1;              
              if(iDayEvents[eventsCounter]['details']['halfEnd']===false)            
                  eventsCounter++;   

            }
            
            else{

              for (let minute = 0; minute < 60; minute += 30) {

                let hourV=hour

                if(iDayEvents[eventsCounter]&&iDayEvents[eventsCounter]['details']['halfStart']===true&&iDayEvents[eventsCounter]['details']['start']===hour&&minute===30){

                  hour+=iDayEvents[eventsCounter].details.duration-1;
                  if(iDayEvents[eventsCounter]['details']['halfEnd']===false)            
                    eventsCounter++; 
                  break 
  
                }

                else if(iDayEvents[eventsCounter]&&iDayEvents[eventsCounter]['details']['halfEnd']===true&&iDayEvents[eventsCounter]['details']['end']===hour){

                  minute=30;
                  eventsCounter++; 

                }

                const endHour = (minute + 30 >= 60) ? (hourV + 1)  : hourV;
                const endMinute = (minute + 30) % 60;
                
                let obj={
                  day: date.getDate(),
                  date:`${date.getFullYear()}-${("0" + (date.getMonth() + 1)).slice(-2)}-${("0" + date.getDate()).slice(-2)}T00:00:00.000Z`,
                  time: `${hourV}:${minute.toString().padStart(2, "0")}-${endHour}:${endMinute.toString().padStart(2, "0")}`,
                  id:id++}
                  
                if(!(filteredHaircuts.some(item => (item.date)=== obj.date && item.hourV === obj.time))){
        
                  appointments.push( obj );

                }}
              }
          }
        }
        appointments.length=502
        console.log(appointments)
        setRAppointments(appointments)
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUpcomingHairCuts();
    getDayScheduleHairCuts()
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
          rAppointments
        }}
      >
        {children}
      </HairCutsContext.Provider>
    </div>
  );
}

export default HairCutsProvider;
