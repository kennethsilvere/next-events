import { getAllEvents } from "../../dummy-data";
import EventList from "../../components/events/event-list";
import EventsSearch from "../../components/events/events-search";
import { useRouter } from "next/router";

function AllEvents() {
  const router = useRouter();
  const allEvents = getAllEvents();

  const filterEvents = (year, month) => {
    const fullPath = `/events/${year}/${month}`;
    router.push(fullPath);
  };

  return (
    <>
      <EventsSearch onSearch={filterEvents} />
      <EventList items={allEvents} />
    </>
  );
}

export default AllEvents;
