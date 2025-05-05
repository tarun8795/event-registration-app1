
export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  price: number;
  capacity: number;
  registered: number;
  category: string;
  image: string;
  featured: boolean;
}

export const events: Event[] = [
  {
    id: "1",
    title: "Tech Conference 2024",
    description: "Join us for the biggest tech conference of the year featuring keynotes from industry leaders, workshops, and networking opportunities.",
    date: "2024-06-15",
    time: "09:00 AM - 05:00 PM",
    location: "Convention Center, San Francisco",
    price: 299,
    capacity: 500,
    registered: 342,
    category: "Technology",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    featured: true
  },
  {
    id: "2",
    title: "Digital Marketing Summit",
    description: "Learn the latest digital marketing strategies from experts in SEO, content marketing, social media, and more.",
    date: "2024-07-22",
    time: "10:00 AM - 04:00 PM",
    location: "Grand Hotel, New York",
    price: 199,
    capacity: 300,
    registered: 187,
    category: "Marketing",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
    featured: true
  },
  {
    id: "3",
    title: "UX Design Workshop",
    description: "A hands-on workshop focusing on user experience design principles, prototyping, and usability testing.",
    date: "2024-08-05",
    time: "09:30 AM - 03:30 PM",
    location: "Design Studio, Austin",
    price: 149,
    capacity: 50,
    registered: 43,
    category: "Design",
    image: "https://images.unsplash.com/photo-1483058712412-4245e9b90334",
    featured: false
  },
  {
    id: "4",
    title: "AI and Machine Learning Symposium",
    description: "Explore the cutting-edge developments in artificial intelligence and machine learning with top researchers and practitioners.",
    date: "2024-09-12",
    time: "08:00 AM - 06:00 PM",
    location: "Innovation Center, Boston",
    price: 249,
    capacity: 200,
    registered: 156,
    category: "Technology",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e",
    featured: true
  },
  {
    id: "5",
    title: "Startup Funding Workshop",
    description: "Learn how to secure funding for your startup from venture capitalists, angel investors, and through crowdfunding.",
    date: "2024-06-28",
    time: "01:00 PM - 05:00 PM",
    location: "Business Hub, Seattle",
    price: 99,
    capacity: 100,
    registered: 67,
    category: "Business",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
    featured: false
  },
  {
    id: "6",
    title: "Web Development Bootcamp",
    description: "An intensive bootcamp covering frontend and backend technologies for building modern web applications.",
    date: "2024-07-10",
    time: "09:00 AM - 06:00 PM",
    location: "Code Campus, Chicago",
    price: 349,
    capacity: 40,
    registered: 38,
    category: "Technology",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
    featured: false
  }
];

export const categories = [
  "All Categories",
  "Technology",
  "Marketing",
  "Design",
  "Business",
  "Finance",
  "Health",
  "Education"
];
