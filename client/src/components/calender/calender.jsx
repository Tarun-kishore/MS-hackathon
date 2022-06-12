import "react-big-calendar/lib/css/react-big-calendar.css";
import { useState, useEffect } from "react";
import "./calendar.css";

import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import axios from "axios";

const localizer = momentLocalizer(moment);
export default function MyCalender(props) {
  const [myEventsList, setmyEventsList] = useState([]);
  useEffect(() => {
    axios.get(props.url).then((events) => {
      console.log(events);
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
    <div className="calendar-bg">
      <div className="ea">{props.title}</div>
      <div className="wrapper">
        <Calendar
          localizer={localizer}
          events={myEventsList}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 450 }}
        />
      </div>
    </div>
  );
}
