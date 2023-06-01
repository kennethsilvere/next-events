import Head from "next/head";
import EventList from "../components/events/event-list";
import NewsletterRegistration from "../components/input/newsletter-registration";
import { getFeaturedEvents } from "../helpers/api-utils";

function HomePage(props) {
  return (
    <>
      <Head>
        <title>NextJS Events</title>
        <meta
          name="description"
          content="Find great events that make you evolve"
        />
      </Head>
      <NewsletterRegistration />
      <EventList items={props.events} />
    </>
  );
}

export async function getStaticProps() {
  const featuredEvents = await getFeaturedEvents();
  return {
    props: {
      events: featuredEvents
    },
    revalidate: 1800
  };
}

export default HomePage;
