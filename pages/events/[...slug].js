import { useRouter } from "next/router";
import { getFilteredEvents } from "../../dummy-data";
import EventList from "../../components/events/event-list";
import ResultsTitle from "../../components/results-title/results-title";
import Button from "../../components/ui/button";
import ErrorAlert from "../../components/ui/error-alert/error-alert";

function FilteredEventsPage() {
  const router = useRouter();
  const filteredData = router.query.slug;

  if (!filteredData) {
    return <h5>Loading...</h5>;
  }

  const numYear = +filteredData[0];
  const numMonth = +filteredData[1];

  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2019 ||
    numMonth < 1 ||
    numMonth > 12
  ) {
    return (
      <>
        <ErrorAlert>
          <p>Invalid filter, pleae try again.</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">All Events</Button>
        </div>
      </>
    );
  }

  const filteredEvents = getFilteredEvents({ year: numYear, month: numMonth });

  if (!filteredEvents || filteredEvents.length == 0) {
    return (
      <>
        <ErrorAlert>
          <h2>No events found.</h2>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">All Events</Button>
        </div>
      </>
    );
  }

  const filteredDateObject = new Date(numYear, numMonth - 1);

  return (
    <div>
      <ResultsTitle date={filteredDateObject} />
      <EventList items={filteredEvents} />
    </div>
  );
}

export default FilteredEventsPage;
