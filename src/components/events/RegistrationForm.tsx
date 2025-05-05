
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useUser } from "@/contexts/UserContext";
import { toast } from "@/components/ui/sonner";
import LoginModal from "../modals/LoginModal";
import { Event } from "@/data/eventData";

interface RegistrationFormProps {
  event: Event;
  onRegister: () => void;
}

const RegistrationForm = ({ event, onRegister }: RegistrationFormProps) => {
  const { user, registerForEvent } = useUser();
  const [ticketCount, setTicketCount] = useState(1);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);

  const handleRegister = () => {
    if (!user) {
      setIsLoginModalOpen(true);
      return;
    }

    setIsRegistering(true);

    setTimeout(() => {
      registerForEvent(event.id, event.title, ticketCount);
      toast.success("Registration successful!");
      setIsRegistering(false);
      onRegister();
    }, 1000);
  };

  const subtotal = event.price * ticketCount;
  const serviceFee = subtotal * 0.05;
  const total = subtotal + serviceFee;

  const ticketsRemaining = event.capacity - event.registered;
  const maxTickets = Math.min(ticketsRemaining, 10);

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Register for this event</CardTitle>
          <CardDescription>
            Secure your spot at {event.title}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="ticketCount">Number of tickets</Label>
            <Input
              id="ticketCount"
              type="number"
              min="1"
              max={maxTickets}
              value={ticketCount}
              onChange={(e) => setTicketCount(parseInt(e.target.value) || 1)}
            />
            <div className="text-xs text-muted-foreground mt-1">
              {ticketsRemaining} tickets remaining
            </div>
          </div>

          <div className="border-t pt-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span>Price per ticket</span>
              <span>${event.price.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Service fee</span>
              <span>${serviceFee.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-medium pt-2 border-t">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            className="w-full" 
            disabled={ticketsRemaining === 0 || isRegistering}
            onClick={handleRegister}
          >
            {isRegistering ? "Processing..." : (ticketsRemaining === 0 ? "Sold Out" : "Register Now")}
          </Button>
        </CardFooter>
      </Card>

      <LoginModal
        open={isLoginModalOpen}
        onOpenChange={setIsLoginModalOpen}
      />
    </>
  );
};

export default RegistrationForm;
