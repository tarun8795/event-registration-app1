
import EventGrid from "@/components/events/EventGrid";
import { events } from "@/data/eventData";

const EventsPage = () => {
  return (
    <div className="py-8">
      <div className="container">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">All Events</h1>
          <p className="text-muted-foreground">Discover and register for upcoming events</p>
        </div>
        
        <EventGrid events={events} />
      </div>
    </div>
  );
};

export default EventsPage;
