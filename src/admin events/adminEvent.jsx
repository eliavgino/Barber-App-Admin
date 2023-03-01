import React, { useState, useEffect } from 'react'
import { Box } from '@mui/system';
import { useContext } from 'react';
import { HairCutsContext } from '../context/hairCuts'
import EventDescription from './eventDescription';
import axios from 'axios';

function AdminEvent() {

  const {rAppointments}=useContext(HairCutsContext);

  const [date,setDate]=useState('');

  const [eventHours,setEventHours]=useState('');

  const [generatedAppointments,setGeneratedAppointments]=useState([])

  const [futureDate,setFutureDate]=useState()

  const [page,setPage]=useState('date');

  const [description,setDescription]=useState('')

  
  const handleDateSUbmit=(e)=>{

    setDate((new Date(e.target.value)).toISOString())
    let futureDate=new Date()
    setFutureDate((new Date()).setDate(futureDate.getDate()+29))
    
  }

  const handleDescriptionSubmit=async()=>{

    const response = await axios.post(process.env.REACT_APP_RENDER_URL+'event',{date:date,hours:eventHours,reason:description});
    console.log(response);
    
  }

  const handleClick = (e, hour) => {

    if(eventHours===''){
      setEventHours(hour);
    }
    else if(eventHours===hour)
      setEventHours(eventHours);
    else{
      if(parseInt(hour)>parseInt(eventHours)){
        setEventHours(eventHours+"-"+hour)
      }            
      else{
        setEventHours(hour+"-"+eventHours)      
      }
    }

    e.currentTarget.classList.toggle('green');

    let bla= document.getElementsByClassName('adminEventHoursContainer').item(0).children
    let greenCount=0

    for(let i=0;i<bla.length;i++){

     if(bla.item(i).className.includes('green')){

      greenCount++;      

     }

     if(greenCount===2){

      greenCount=0

      for(let i=0;i<bla.length;i++){

        bla.item(i).disabled=true

        if(bla.item(i).className.includes('green')){

          greenCount++;
    
         }

        if(greenCount===1){
   
          (bla.item(i).classList.add('green'));
   
        }
      }
      
     }

    }
     
  }

  const clearChoice=()=>{

    let bla= document.getElementsByClassName('adminEventHoursContainer').item(0).children;

    setEventHours('')

    for(let i=0;i<bla.length;i++){

     bla.item(i).classList.remove('green');
     
     bla.item(i).disabled=false


    }
  }

  const map=(schedule)=>{

    if(schedule.time.slice(0,5).includes('-'))
    return <button onClick={(e)=>handleClick(e,schedule.time.slice(0,4))} className="adminEventHours">{schedule.time.slice(0,4)}</button>
    else if(schedule.time.slice(0,5)!=='17:30')
    return <button onClick={(e)=>handleClick(e,schedule.time.slice(0,5))} className="adminEventHours">{schedule.time.slice(0,5)}</button>
    else
    return<>
            <button onClick={(e)=>handleClick(e,schedule.time.slice(0,5))} className="adminEventHours">17:30</button>
            <button onClick={(e)=>handleClick(e,schedule.time.slice(0,5))} className="adminEventHours">18:00</button>
          </>
  }

  useEffect(() => {

    let appointments=[];

    for (let hour = 9; hour < 18; hour++) {

      for (let minute = 0; minute < 60; minute += 30) {

        let stringHour=hour.toString();
        let stringMinute=minute.toString();

        if(stringHour.length===1)

          stringHour='0'+stringHour;

        if(stringMinute.length===1)

        stringMinute='0'+stringMinute;
        
        appointments.push(stringHour+':'+stringMinute)

      }}

      appointments.push('18:00');
      setGeneratedAppointments(appointments);

  }, [])

  return (

    <Box className="adminEventContainer">
    <Box className="adminEventCardContainer">
      {
      page==='date'
      ?
      
      <>

        <Box className="adminEventDate">

        <input style={{margin:"1vw",width:"20vw"}} type="date" onChange={(e)=>{handleDateSUbmit(e)}}/>

        <button onClick={clearChoice}>Clear choice</button>

        <button onClick={()=>setPage('description')} disabled={document.getElementsByClassName('adminEventHours').length===0?true:((document.getElementsByClassName('adminEventHours').item(0).disabled===true)?false:true)}>Submit</button>
    
        </Box>

        <Box sx={{}} className="adminEventHoursContainer">

        {
        date===''
        ?
        <p>Choose a date</p>
        :
        new Date(date).setHours(24)<new Date()
        ?
        <p>Never choose the past</p>
        :
        (
          (new Date(date)<futureDate)
          ?
          (rAppointments.filter(appointments=>appointments.date===date).map(schedule=>map(schedule)))
          :
          (generatedAppointments.map(schedule=><button onClick={(e)=>handleClick(e,schedule)} className="adminEventHours">{schedule}</button>))
        )
        }

        </Box>

        </>
             
        :
        <EventDescription setDate={setDate} setPage={setPage} handleDescriptionSubmit={handleDescriptionSubmit} setDescription={setDescription}/>

        }

    </Box>

    </Box>
  )
}

export default AdminEvent