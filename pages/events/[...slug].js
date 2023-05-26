import { useRouter } from "next/router";
import useSWR from "swr";
import EventList from "../../components/events/event-list";
import ResultsTitle from "../../components/results-title/results-title";
import Button from "../../components/ui/button";
import ErrorAlert from "../../components/ui/error-alert/error-alert";
import { useEffect, useState } from "react";
import Head from "next/head";

function FilteredEventsPage(props) {
  const [loadedEvents, setLoadedEvents] = useState();
  const router = useRouter();
  const filteredData = router.query.slug;
  const fetcher = (url) => fetch(url).then((res) => res.json());
  const { data, error } = useSWR(
    "https://next-events-5b95c-default-rtdb.asia-southeast1.firebasedatabase.app/events.json",
    fetcher
  );

  useEffect(() => {
    if (data) {
      const events = [];

      for (let key in data) {
        events.push({
          id: key,
          ...data[key]
        });
      }

      setLoadedEvents(events);
    }
  }, [data]);

  let pageHeadData = (
    <Head>
      <title>Filtered Events</title>
      <meta name="description" content={`Filtered events page`} />
    </Head>
  );

  if (!loadedEvents) {
    return <p className="center">Loading....</p>;
  }

  const numYear = +filteredData[0];
  const numMonth = +filteredData[1];

  pageHeadData = (
    <Head>
      <title>Filtered Events </title>
      <meta
        name="description"
        content={`All events for ${numMonth}/${numYear}`}
      />
    </Head>
  );

  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2019 ||
    numMonth < 1 ||
    numMonth > 12 ||
    error
  ) {
    return (
      <ErrorAlert>
        <p>Invalid filter, please try again.</p>
      </ErrorAlert>
    );
  }

  let filteredEvents = loadedEvents.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === numYear &&
      eventDate.getMonth() === numMonth - 1
    );
  });

  const filteredDateObject = new Date(numYear, numMonth - 1);

  return (
    <>
      {pageHeadData}
      <div>
        <ResultsTitle date={filteredDateObject} />
        <EventList items={filteredEvents} />
      </div>
    </>
  );
}

export default FilteredEventsPage;
