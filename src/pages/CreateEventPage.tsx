
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DateRange } from "react-day-picker";
import { format } from "date-fns";
import { Image, Calendar, Clock, MapPin, Users, Tag, FileText, Upload } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters long"),
  description: z.string().min(20, "Description must be at least 20 characters long"),
  location: z.string().min(3, "Location is required"),
  category: z.string().min(2, "Category is required"),
  capacity: z.number().min(1, "Capacity must be at least 1"),
  price: z.number().min(0, "Price must be 0 or greater"),
  isFeatured: z.boolean().default(false),
  imageUrl: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const CreateEventPage = () => {
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      location: "",
      category: "",
      capacity: 50,
      price: 0,
      isFeatured: false,
      imageUrl: "",
    },
  });

  const onSubmit = (data: FormValues) => {
    if (!dateRange?.from || !dateRange?.to) {
      toast({
        variant: "destructive",
        title: "Date range is required",
        description: "Please select a start and end date for your event",
      });
      return;
    }

    // Here we would typically send this to an API
    // For now, we'll just show a success message
    console.log({ ...data, startDate: dateRange.from, endDate: dateRange.to });
    
    toast({
      title: "Event created successfully!",
      description: "Your event has been created and is now live.",
    });
    
    navigate("/events");
  };

  return (
    <div className="py-8 container">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Create Your Event</h1>
          <p className="text-muted-foreground">Fill in the details to create and publish your event</p>
        </div>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-6">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Event Title</FormLabel>
                        <FormControl>
                          <div className="flex items-center border rounded-md focus-within:ring-1 focus-within:ring-ring">
                            <div className="px-3 py-2 border-r">
                              <FileText className="h-5 w-5 text-muted-foreground" />
                            </div>
                            <Input 
                              placeholder="e.g., Tech Conference 2025" 
                              {...field} 
                              className="border-0 focus-visible:ring-0"
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Event Description</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Describe your event, including agenda, speakers, etc."
                            className="min-h-32"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div>
                    <FormLabel className="block mb-2">Event Date & Time</FormLabel>
                    <DateRangePicker
                      value={dateRange}
                      onChange={setDateRange}
                      className="w-full"
                    />
                    {!dateRange?.from && form.formState.isSubmitted && (
                      <p className="text-sm font-medium text-destructive mt-2">Date range is required</p>
                    )}
                  </div>

                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Location</FormLabel>
                        <FormControl>
                          <div className="flex items-center border rounded-md focus-within:ring-1 focus-within:ring-ring">
                            <div className="px-3 py-2 border-r">
                              <MapPin className="h-5 w-5 text-muted-foreground" />
                            </div>
                            <Input 
                              placeholder="Enter venue address or online link" 
                              {...field} 
                              className="border-0 focus-visible:ring-0"
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Category</FormLabel>
                          <FormControl>
                            <div className="flex items-center border rounded-md focus-within:ring-1 focus-within:ring-ring">
                              <div className="px-3 py-2 border-r">
                                <Tag className="h-5 w-5 text-muted-foreground" />
                              </div>
                              <Input 
                                placeholder="e.g., Technology" 
                                {...field} 
                                className="border-0 focus-visible:ring-0"
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="capacity"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Capacity</FormLabel>
                          <FormControl>
                            <div className="flex items-center border rounded-md focus-within:ring-1 focus-within:ring-ring">
                              <div className="px-3 py-2 border-r">
                                <Users className="h-5 w-5 text-muted-foreground" />
                              </div>
                              <Input 
                                type="number" 
                                placeholder="Number of attendees"
                                {...field}
                                onChange={e => field.onChange(parseInt(e.target.value) || 0)}
                                className="border-0 focus-visible:ring-0"
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Ticket Price ($)</FormLabel>
                        <FormControl>
                          <div className="flex items-center border rounded-md focus-within:ring-1 focus-within:ring-ring">
                            <div className="px-3 py-2 border-r">
                              <span className="font-medium text-muted-foreground">$</span>
                            </div>
                            <Input 
                              type="number"
                              placeholder="0 for free events"
                              {...field}
                              onChange={e => field.onChange(parseFloat(e.target.value) || 0)}
                              className="border-0 focus-visible:ring-0"
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="imageUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Event Image</FormLabel>
                        <FormControl>
                          <div className="flex items-center border rounded-md focus-within:ring-1 focus-within:ring-ring">
                            <div className="px-3 py-2 border-r">
                              <Image className="h-5 w-5 text-muted-foreground" />
                            </div>
                            <Input 
                              placeholder="Image URL or upload image" 
                              {...field} 
                              className="border-0 focus-visible:ring-0"
                            />
                          </div>
                        </FormControl>
                        <p className="text-sm text-muted-foreground mt-1">
                          Enter an image URL or upload your own event banner
                        </p>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="isFeatured"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Featured Event</FormLabel>
                          <p className="text-sm text-muted-foreground">
                            Feature this event on the homepage to attract more attendees.
                          </p>
                        </div>
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end gap-4">
              <Button variant="outline" type="button" onClick={() => navigate("/")}>
                Cancel
              </Button>
              <Button type="submit">
                Create Event
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default CreateEventPage;
