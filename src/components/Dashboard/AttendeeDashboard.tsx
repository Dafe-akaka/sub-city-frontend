import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';


type EventParams = {
    id: string;
  };

export interface Events {
    Event_id: number;
    organiser_name: string;
    num_of_attendees: number;
    total_cost: number;
    description:string
}

export default function AttendeeDashboard() {
    let {id} =  useParams<EventParams>()
    const [events,setEvents] = useState<Events[]>([])

    const getEvent = async () => {
        try {
          const response = await fetch(`https://obscure-river-76343.herokuapp.com/event-info/${id}`);
          const jsonData = await response.json();
          setEvents(jsonData);
        } catch (err) {
          console.error(err.message);
        }
      };
    
      useEffect(() => {
        getEvent();
      },);
    return (
        <div>
            {events.map((event) => (
                <div key= {event.Event_id}>
                    <p>{event.organiser_name}</p>
                    <p>{event.description}</p>
                    <p>{event.num_of_attendees}</p>
                    <p>{event.total_cost}</p>
                </div>
            ))}
        </div>
    )
}
