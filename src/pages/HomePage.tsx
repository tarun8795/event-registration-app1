
import { events } from "@/data/eventData";
import FeaturedEvents from "@/components/events/FeaturedEvents";
import EventCard from "@/components/events/EventCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const HomePage = () => {
  const featuredEvents = events.filter(event => event.featured);
  const upcomingEvents = events.slice(0, 3);

  return (
    <div className="space-y-12 py-8">
      <section>
        <div className="container">
          <FeaturedEvents events={featuredEvents} />
        </div>
      </section>

      <section>
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold mb-1">Upcoming Events</h2>
              <p className="text-muted-foreground">Don't miss these popular events</p>
            </div>
            <Link to="/events">
              <Button variant="ghost" className="group mt-2 md:mt-0">
                View All 
                <ArrowRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-muted py-12">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Host Your Own Event</h2>
            <p className="text-lg text-muted-foreground mb-6">
              Ready to create your own event? Our platform makes it easy to organize, promote, and manage your events online.
            </p>
            <Button size="lg" asChild>
              <Link to="/create-event">Create an Event</Link>
            </Button>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold mb-1">Browse by Category</h2>
              <p className="text-muted-foreground">Find events by interest</p>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {["Technology", "Marketing", "Design", "Business", "Finance"].map((category) => (
              <Link 
                key={category} 
                to={`/events?category=${category}`}
                className="bg-accent text-accent-foreground hover:bg-accent/80 transition-colors rounded-md p-4 text-center"
              >
                {category}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
