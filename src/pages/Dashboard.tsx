
import { useState } from "react";
import { useUser } from "@/contexts/UserContext";
import { Link, Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Calendar, Clock, MapPin } from "lucide-react";
import { events } from "@/data/eventData";
import LoginModal from "@/components/modals/LoginModal";

const Dashboard = () => {
  const { user } = useUser();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  if (!user) {
    return (
      <div className="container py-16">
        <div className="max-w-md mx-auto text-center">
          <h1 className="text-2xl font-bold mb-4">Sign in to view your dashboard</h1>
          <p className="text-muted-foreground mb-6">
            You need to be signed in to access your dashboard and manage your events.
          </p>
          <Button onClick={() => setIsLoginModalOpen(true)}>
            Sign In
          </Button>
          <LoginModal open={isLoginModalOpen} onOpenChange={setIsLoginModalOpen} />
        </div>
      </div>
    );
  }

  const userRegistrations = user.registrations;
  const myEvents = userRegistrations.map(reg => {
    const event = events.find(e => e.id === reg.eventId);
    return { ...reg, event };
  });

  return (
    <div className="py-8">
      <div className="container">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold">My Dashboard</h1>
            <p className="text-muted-foreground">
              Manage your events and registrations
            </p>
          </div>
        </div>

        <Tabs defaultValue="upcoming">
          <TabsList>
            <TabsTrigger value="upcoming">Upcoming Events</TabsTrigger>
            <TabsTrigger value="past">Past Events</TabsTrigger>
            {user.isAdmin && <TabsTrigger value="manage">Manage Events</TabsTrigger>}
          </TabsList>
          <TabsContent value="upcoming" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>My Upcoming Events</CardTitle>
                <CardDescription>
                  Events you've registered for that haven't happened yet
                </CardDescription>
              </CardHeader>
              <CardContent>
                {myEvents.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Event</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Tickets</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {myEvents.map((registration) => (
                        <TableRow key={registration.eventId}>
                          <TableCell className="font-medium">
                            <Link to={`/events/${registration.eventId}`} className="hover:underline">
                              {registration.eventTitle}
                            </Link>
                          </TableCell>
                          <TableCell>
                            {registration.event ? new Date(registration.event.date).toLocaleDateString() : "N/A"}
                          </TableCell>
                          <TableCell>{registration.ticketCount}</TableCell>
                          <TableCell className="text-right">
                            <Button
                              variant="ghost"
                              size="sm"
                              asChild
                            >
                              <Link to={`/events/${registration.eventId}`}>View Details</Link>
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground mb-4">
                      You haven't registered for any events yet.
                    </p>
                    <Button asChild>
                      <Link to="/events">Browse Events</Link>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="past" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Past Events</CardTitle>
                <CardDescription>
                  Events you've attended in the past
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <p className="text-muted-foreground">
                    You haven't attended any events yet.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          {user.isAdmin && (
            <TabsContent value="manage" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Manage Events</CardTitle>
                  <CardDescription>
                    Create and manage your own events
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-end mb-4">
                    <Button>
                      Create New Event
                    </Button>
                  </div>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Event</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Registrations</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {events.slice(0, 3).map((event) => (
                        <TableRow key={event.id}>
                          <TableCell className="font-medium">
                            {event.title}
                          </TableCell>
                          <TableCell>
                            {new Date(event.date).toLocaleDateString()}
                          </TableCell>
                          <TableCell>
                            <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                              Active
                            </span>
                          </TableCell>
                          <TableCell>
                            {event.registered}/{event.capacity}
                          </TableCell>
                          <TableCell className="text-right">
                            <Button
                              variant="ghost"
                              size="sm"
                            >
                              Edit
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          )}
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
