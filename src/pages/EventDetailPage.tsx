
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { events } from "@/data/eventData";
import { Calendar, Clock, MapPin, Users, Share2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import RegistrationForm from "@/components/events/RegistrationForm";
import EventCard from "@/components/events/EventCard";
import { useToast } from "@/components/ui/use-toast";

const EventDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [event, setEvent] = useState(events.find(e => e.id === id));
  const [relatedEvents, setRelatedEvents] = useState(events.filter(e => e.id !== id && e.category === event?.category).slice(0, 3));
  const [isRegistered, setIsRegistered] = useState(false);
  const toast = useToast();
  
  if (!event) {
    return (
      <div className="container py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Event not found</h2>
        <p className="text-muted-foreground mb-6">The event you're looking for doesn't exist or has been removed.</p>
        <Button asChild>
          <Link to="/events">Browse Events</Link>
        </Button>
      </div>
    );
  }

  const formattedDate = new Date(event.date).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  });

  const percentageFilled = Math.round((event.registered / event.capacity) * 100);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.toast({
      title: "Link copied to clipboard",
      description: "You can now share this event with others",
    });
  };

  const handleRegistrationComplete = () => {
    setEvent(prev => prev ? {
      ...prev,
      registered: prev.registered + 1
    } : prev);
    setIsRegistered(true);
  };

  return (
    <div className="py-8">
      <div className="container">
        <Link to="/events" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to events
        </Link>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="space-y-6">
              <div className="rounded-xl overflow-hidden">
                <img 
                  src={event.image} 
                  alt={event.title} 
                  className="w-full h-[300px] md:h-[400px] object-cover"
                />
              </div>
              
              <div>
                <div className="flex justify-between items-start">
                  <h1 className="text-3xl font-bold">{event.title}</h1>
                  <Button variant="outline" size="icon" onClick={handleShare}>
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="flex flex-wrap gap-6 mt-4">
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 mr-2 text-muted-foreground" />
                    <span>{formattedDate}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 mr-2 text-muted-foreground" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-5 w-5 mr-2 text-muted-foreground" />
                    <span>{event.location}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-muted-foreground" />
                <span>{event.registered} registered</span>
                <Progress value={percentageFilled} className="h-2 flex-1" />
                <span className="text-sm text-muted-foreground">{event.capacity} capacity</span>
              </div>
              
              <Separator />
              
              <div>
                <h2 className="text-xl font-semibold mb-4">About this event</h2>
                <div className="prose max-w-none">
                  <p>{event.description}</p>
                  <p>
                    Join us for an exceptional event that brings together industry leaders, innovators, and passionate individuals. 
                    This event offers unique networking opportunities, valuable insights, and an experience you won't forget.
                  </p>
                  <h3>What to expect:</h3>
                  <ul>
                    <li>Engaging presentations from expert speakers</li>
                    <li>Interactive workshops and sessions</li>
                    <li>Networking with industry professionals</li>
                    <li>Refreshments and meals included</li>
                  </ul>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h2 className="text-xl font-semibold mb-4">Location</h2>
                <div className="aspect-video bg-muted rounded-md flex items-center justify-center">
                  <span className="text-muted-foreground">Map view of {event.location}</span>
                </div>
                <p className="mt-4 text-sm text-muted-foreground">
                  Detailed directions and information will be sent to registered attendees.
                </p>
              </div>
            </div>
          </div>
          
          <div className="space-y-6">
            {isRegistered ? (
              <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-green-800 mb-2">Registration Complete!</h3>
                <p className="text-green-700 mb-4">
                  You've successfully registered for this event. Check your email for details.
                </p>
                <Button variant="outline" asChild>
                  <Link to="/dashboard">View My Events</Link>
                </Button>
              </div>
            ) : (
              <RegistrationForm event={event} onRegister={handleRegistrationComplete} />
            )}

            <div className="bg-muted p-4 rounded-xl">
              <h3 className="font-medium mb-2">Organizer</h3>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center mr-3">
                  <span className="text-primary font-medium">ES</span>
                </div>
                <div>
                  <p className="font-medium">EventSwift Team</p>
                  <p className="text-sm text-muted-foreground">Organizing events since 2020</p>
                </div>
              </div>
              <Button variant="link" className="p-0 h-auto mt-2">Contact organizer</Button>
            </div>
          </div>
        </div>
        
        {relatedEvents.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Related Events</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedEvents.map(relatedEvent => (
                <EventCard key={relatedEvent.id} event={relatedEvent} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventDetailPage;
