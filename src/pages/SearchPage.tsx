
import { useState } from "react";
import { events } from "@/data/eventData";
import EventCard from "@/components/events/EventCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter, Calendar, MapPin } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DateRange, DateRangePicker } from "@/components/ui/date-range-picker";
import { Label } from "@/components/ui/label";

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
  const [location, setLocation] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would trigger an API search
    console.log("Searching for:", searchQuery);
  };

  const filteredEvents = events.filter(event => {
    const matchesSearch = searchQuery
      ? event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.description.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
      
    const matchesCategory = selectedCategory === "All Categories" || event.category === selectedCategory;
    
    const matchesLocation = location
      ? event.location.toLowerCase().includes(location.toLowerCase())
      : true;
      
    // Date range filtering would be implemented here
      
    return matchesSearch && matchesCategory && matchesLocation;
  });

  return (
    <div className="py-8">
      <div className="container">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Search Events</h1>
          <p className="text-muted-foreground">Find the perfect event for you</p>
        </div>
        
        <div className="bg-accent/50 rounded-lg p-6 mb-8">
          <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search for events..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Sheet>
                <SheetTrigger asChild>
                  <Button type="button" variant="outline" className="flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    <span>Filters</span>
                  </Button>
                </SheetTrigger>
                <SheetContent className="w-[300px] sm:w-[400px]">
                  <SheetHeader>
                    <SheetTitle>Filter Events</SheetTitle>
                    <SheetDescription>
                      Narrow down results based on your preferences.
                    </SheetDescription>
                  </SheetHeader>
                  <div className="space-y-6 py-6">
                    <div className="space-y-2">
                      <Label>Category</Label>
                      <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="All Categories">All Categories</SelectItem>
                          <SelectItem value="Technology">Technology</SelectItem>
                          <SelectItem value="Marketing">Marketing</SelectItem>
                          <SelectItem value="Design">Design</SelectItem>
                          <SelectItem value="Business">Business</SelectItem>
                          <SelectItem value="Finance">Finance</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Date Range</Label>
                      <DateRangePicker 
                        value={dateRange} 
                        onChange={setDateRange} 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Location</Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder="City or venue"
                          className="pl-10"
                          value={location}
                          onChange={(e) => setLocation(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Price Range</Label>
                      <div className="flex items-center gap-2">
                        <Input placeholder="Min" type="number" min="0" className="w-20" />
                        <span className="text-muted-foreground">to</span>
                        <Input placeholder="Max" type="number" min="0" className="w-20" />
                      </div>
                    </div>
                    <div className="pt-4">
                      <Button className="w-full">Apply Filters</Button>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
              <Button type="submit">Search</Button>
            </div>
          </form>
        </div>
        
        {filteredEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium mb-2">No events found</h3>
            <p className="text-muted-foreground">Try changing your search criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
