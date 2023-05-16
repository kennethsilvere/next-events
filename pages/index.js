import EventList from "../components/events/event-list";
import { getFeaturedEvents } from "../dummy-data";

function HomePage() {
  const featuredEvents = getFeaturedEvents();

  return (
    <>
      <EventList items={featuredEvents} />
    </>
  );
}

export default HomePage;
