import { useState, useContext, useEffect } from "react";
import { HairCutsContext } from "./../../context/hairCuts";
import axios from "axios";
import FullCalendar, { formatDate } from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import Header from "../../components/Header";
import { tokens } from "../../theme";

const Calendar = () => {
  const {
    getUpcomingHairCuts,
    allHairCuts,
    setallHairCuts,
    removeByHairrcutId,
  } = useContext(HairCutsContext);
  useEffect(() => {
    getUpcomingHairCuts();
  }, []);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [currentEvents, setCurrentEvents] = useState([]);

  const handelDateClick = async (selected) => {
    const title = prompt("please enter the haircut id");
    const user_id = prompt("please enter a user_id");

    const barber_id = prompt("please enter a barber_id");
    const calanderApi = selected.view.calander;

    if (title != null && user_id != null && barber_id != null) {
      try {
        const res = await axios.post("http://localhost:4000/api/v1/haircut", {
          user: user_id,
          barber: barber_id,
          hour: `${selected.start.getHours()}:${
            selected.start.getMinutes() < 10
              ? "0" + selected.start.getMinutes()
              : selected.start.getMinutes()
          }-${selected.end.getHours()}:${
            selected.end.getMinutes() < 10
              ? "0" + selected.end.getMinutes()
              : selected.end.getMinutes()
          }`,
          date: selected.startStr,
          hairCut: title,
        });
        console.log(res.data);
        calanderApi.addEvent({
          id: res.data._id,
          title: `yeesssssssssssssss`,
          start: selected.startStr,
          end: selected.endStr,
          allDay: selected.allDay,
        });
        console.log("yess");
        setallHairCuts([...allHairCuts, res.data]);
        getUpcomingHairCuts();
      } catch (error) {
        console.error(error);
        alert(error.message);
        throw error;
      }
    }
  };

  const handleEventClick = (selected) => {
    if (
      window.confirm(
        `Are you sure you want to delete the event '${selected.event.title}'`
      )
    ) {
      removeByHairrcutId(selected.event.id);

      selected.event.remove();
    }
  };

  return (
    <Box m="20px">
      <Header title="Calendar" subtitle="Full Calendar Interactive Page" />
      {console.log(allHairCuts)}
      <Box display="flex" justifyContent="space-between">
        {/* CALENDAR SIDEBAR */}
        <Box
          flex="1 1 20%"
          backgroundColor={colors.primary[400]}
          p="15px"
          borderRadius="4px"
        >
          <Typography variant="h5">Events</Typography>
          <List>
            {allHairCuts.map((haircut) => (
              <ListItem
                key={haircut._id}
                sx={{
                  backgroundColor: colors.greenAccent[500],
                  margin: "10px 0",
                  borderRadius: "2px",
                }}
              >
                <ListItemText
                  primary={`barber : ${haircut.barber.barber_Name}- Haircut Type: ${haircut.hairCut.product_name}`}
                  secondary={
                    <Typography>
                      {formatDate(haircut.date, {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </Typography>
                  }
                />
              </ListItem>
            ))}
          </List>
        </Box>

        {/* CALENDAR */}
        <Box flex="1 1 100%" ml="15px">
          <FullCalendar
            height="75vh"
            plugins={[
              dayGridPlugin,
              timeGridPlugin,
              interactionPlugin,
              listPlugin,
            ]}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
            }}
            initialView="dayGridMonth"
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            select={handelDateClick}
            eventClick={handleEventClick}
            // eventsSet={(events) => setCurrentEvents(events)}
            initialEvents={allHairCuts.map((haircut) => ({
              id: haircut._id,
              title: `barber : ${haircut.barber.barber_Name}- Haircut Type: ${haircut.hairCut.product_name}`,
              date: haircut.date,
            }))}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Calendar;
