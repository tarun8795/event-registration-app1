
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Event } from "@/data/eventData";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EventCardProps {
  event: Event;
}

const EventCard = ({ event }: EventCardProps) => {
  const formattedDate = new Date(event.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
  
  const percentageFilled = Math.round((event.registered / event.capacity) * 100);

  return (
    <Card className="overflow-hidden h-full flex flex-col transition-all hover:shadow-md">
      <div className="relative h-48">
        <img 
          src={event.image} 
          alt={event.title} 
          className="w-full h-full object-cover"
        />
        {event.featured && (
          <Badge className="absolute top-2 right-2 bg-eventBrand-500">
            Featured
          </Badge>
        )}
      </div>
      <CardContent className="p-4 flex-1">
        <div className="flex justify-between items-start mb-2">
          <Badge variant="outline" className="bg-eventBrand-50 text-eventBrand-700 border-eventBrand-200">
            {event.category}
          </Badge>
          <span className="text-sm text-muted-foreground">${event.price}</span>
        </div>
        <h3 className="text-lg font-semibold mb-2 line-clamp-2">{event.title}</h3>
        <p className="text-sm text-muted-foreground line-clamp-3 mb-3">
          {event.description}
        </p>
        <div className="flex items-center text-sm text-muted-foreground mb-1">
          <Calendar className="h-4 w-4 mr-1" />
          <span>{formattedDate}</span>
        </div>
        <div className="flex items-center text-sm text-muted-foreground">
          <MapPin className="h-4 w-4 mr-1" />
          <span className="truncate">{event.location}</span>
        </div>
      </CardContent>
      <CardFooter className="px-4 py-3 border-t bg-muted/30 flex justify-between items-center">
        <div className="text-xs">
          <span className="font-medium">{event.registered}</span>/{event.capacity} registered
        </div>
        <Link to={`/events/${event.id}`}>
          <Button size="sm">Details</Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default EventCard;
