import "react-big-calendar/lib/css/react-big-calendar.css";
import { useState, useEffect } from "react";

import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import axios from "axios";

const localizer = momentLocalizer(moment);
export default function MyCalender() {
  const [myEventsList, setmyEventsList] = useState([]);

  useEffect(() => {
    axios.get("/volunteer/myEvents").then((events) => {
      events = events.data.map((eventData) => {
        let end = new Date(`${eventData.startsAt}`);
        end.setHours(end.getHours() + eventData.duration);
        return {
          start: new Date(`${eventData.startsAt}`),
          end,
          title: eventData.name,
        };
      });

      setmyEventsList(events);
    });
  }, []);
  return (
    <div>
      <Calendar
        localizer={localizer}
        events={myEventsList}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
      />
    </div>
  );
}
