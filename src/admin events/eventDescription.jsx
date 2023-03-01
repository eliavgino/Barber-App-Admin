import React from 'react'
import { Box } from '@mui/system';

function EventDescription({ setDate, setPage, setDescription, handleDescriptionSubmit}) {
  return (
    <Box className="adminEventInputContainer">
        <label for="exampleFormControlInput1" class="form-label">Add description</label>
        <input class="form-control" onChange={(e)=>setDescription(e.target.value)}></input>
        <button onClick={handleDescriptionSubmit}>Submit</button>
        <button onClick={()=>{setPage('date');setDate('')}}>Go back</button>
    </Box>
  )
}

export default EventDescription