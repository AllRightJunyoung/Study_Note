import { useRouter } from 'next/router';
import { getAllEvents } from '../../dummy-data';
import { EventList } from '../../components/events/EventList';
import EventSearch from '../../components/events/EventSearch';
export const EventPage = () => {
  const events = getAllEvents();

  const router = useRouter();

  const findEventsHandler = (year, month) => {
    const fullPath = `/events/${year}/${month}`;

    router.push(fullPath);
  };
  return (
    <div>
      <EventSearch onSearch={findEventsHandler} />
      <EventList items={events} />
    </div>
  );
};
export default EventPage;
