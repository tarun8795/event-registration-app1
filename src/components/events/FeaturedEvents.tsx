
import { useState, useEffect } from "react";
import { Event } from "@/data/eventData";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

interface FeaturedEventsProps {
  events: Event[];
}

const FeaturedEvents = ({ events }: FeaturedEventsProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const featuredEvents = events.filter(event => event.featured);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === featuredEvents.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? featuredEvents.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    if (featuredEvents.length <= 1) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [featuredEvents.length, currentIndex]);

  if (featuredEvents.length === 0) return null;

  const currentEvent = featuredEvents[currentIndex];
  const formattedDate = new Date(currentEvent.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });

  return (
    <div className="relative overflow-hidden rounded-xl h-[400px] md:h-[450px]">
      <img 
        src={currentEvent.image}
        alt={currentEvent.title}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20 flex items-end">
        <Card className="w-full bg-background/80 backdrop-blur-sm border-none rounded-b-none">
          <CardContent className="p-6 space-y-4">
            <div className="flex justify-between items-center">
              <Badge variant="secondary" className="bg-eventBrand-500 text-white hover:bg-eventBrand-600">
                {currentEvent.category}
              </Badge>
              <div className="text-sm text-white">
                ${currentEvent.price}
              </div>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">{currentEvent.title}</h2>
            <p className="text-white/80 line-clamp-2 md:line-clamp-3">{currentEvent.description}</p>
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
              <div className="flex items-center text-white/90">
                <Calendar className="h-4 w-4 mr-2" />
                <span>{formattedDate}</span>
              </div>
              <div className="flex items-center text-white/90">
                <MapPin className="h-4 w-4 mr-2" />
                <span className="truncate">{currentEvent.location}</span>
              </div>
            </div>
            <div className="flex justify-between items-center pt-2">
              <div className="text-white/90">
                <span className="font-medium">{currentEvent.registered}</span> of {currentEvent.capacity} registered
              </div>
              <Link to={`/events/${currentEvent.id}`}>
                <Button>View Details</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {featuredEvents.length > 1 && (
        <>
          <Button
            onClick={prevSlide}
            variant="outline"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 border-white/10 hover:bg-white/30"
          >
            <ChevronLeft className="h-6 w-6 text-white" />
          </Button>
          <Button
            onClick={nextSlide}
            variant="outline"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 border-white/10 hover:bg-white/30"
          >
            <ChevronRight className="h-6 w-6 text-white" />
          </Button>
          <div className="absolute bottom-32 md:bottom-36 left-1/2 -translate-x-1/2 flex gap-1">
            {featuredEvents.map((_, i) => (
              <div 
                key={i} 
                className={`w-2 h-2 rounded-full transition-colors ${
                  i === currentIndex ? "bg-white" : "bg-white/40"
                }`}
                onClick={() => setCurrentIndex(i)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default FeaturedEvents;
