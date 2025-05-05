
import { createContext, useContext, useState, ReactNode } from "react";

export interface UserRegistration {
  eventId: string;
  eventTitle: string;
  registrationDate: string;
  ticketCount: number;
}

interface User {
  isLoggedIn: boolean;
  isAdmin: boolean;
  name: string;
  email: string;
  registrations: UserRegistration[];
}

interface UserContextType {
  user: User | null;
  login: (email: string, password: string) => void;
  logout: () => void;
  registerForEvent: (eventId: string, eventTitle: string, ticketCount: number) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (email: string, password: string) => {
    // In a real app, you would validate credentials against a backend
    const isAdmin = email === "admin@example.com";
    
    setUser({
      isLoggedIn: true,
      isAdmin,
      name: isAdmin ? "Admin User" : "Regular User",
      email,
      registrations: []
    });
  };

  const logout = () => {
    setUser(null);
  };

  const registerForEvent = (eventId: string, eventTitle: string, ticketCount: number) => {
    if (!user) return;

    const registration: UserRegistration = {
      eventId,
      eventTitle,
      registrationDate: new Date().toISOString(),
      ticketCount,
    };

    setUser({
      ...user,
      registrations: [...user.registrations, registration]
    });
  };

  return (
    <UserContext.Provider value={{ user, login, logout, registerForEvent }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
