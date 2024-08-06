export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  surname: string;
  dateOfBirth: Date;
  phoneNumber?: string;
  address?: string;
  profilePicture?: string;
  trips: string[];
  favoriteTrips: string[];
  tripsCreated: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface TripCreation {
  origin: string;
  destination: string;
  startDate: string;
  endDate: string;
  minBudget: number;
  maxBudget: number;
  adults: number;
  minors: number;
  userId?: string;
}
export interface Trip {
  id: string;
  origin: string;
  destination: string;
  startDate: string;
  endDate: string;
  duration: number;
  minBudget: number;
  maxBudget: number;
  status: string;
  notes?: string;
  adults: number;
  minors: number;
  users: User[];
  accommodations: Accommodation[];
  itineraries: Itinerary[];
  pointsOfInterest: PointOfInterest[];
  activities: Activity[];
  flights: Flight[];
  itineraryDetails: Itinerary[];
  restaurants: Restaurant[];
  createdAt: string;
  updatedAt: string;
}
export interface Accommodation {
  id: string;
  name: string;
  address: string;
  price: number;
  rating: number;
  amenities: string[];
  description: string;
  images: string[];
  coordinates: string;
  city: string;
  cityId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Itinerary {
  id: string;
  day: number;
  date: string;
  tripId: string;
  city: string;
  cityId: string;
  createdAt: string;
  updatedAt: string;
}

export interface PointOfInterest {
  id: string;
  name: string;
  description: string;
  type: string;
  address: string;
  coordinates: string;
  imageUrl: string;
  openingHours: string;
  ticketPrice: number;
  city: string;
  cityId: string;
  images: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Activity {
  id: string;
  name: string;
  description: string;
  duration: number;
  cost: number;
  pointOfInterestId: string | null;
  images: string[];
  coordinates: string;
  city: string;
  cityId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Restaurant {
  id: string;
  name: string;
  address: string;
  cuisine: string;
  priceRange: string;
  rating: number;
  description: string;
  images: string[];
  coordinates: string;
  city: string;
  cityId: string;
  createdAt: string;
  updatedAt: string;
}

export interface City {
  id: string;
  name: string;
  country: string;
  description: string;
  bestTravelTime: string;
  reasonToVisit: string;
  images: string[];
  createdAt: string;
  updatedAt: string;
  accommodations: Accommodation[];
  itineraries: Itinerary[];
  pointsOfInterest: PointOfInterest[];
  activities: Activity[];
  restaurants: Restaurant[];
}

export interface Flight {
  id: string;
  airline: string;
  flightNumber: string;
  departureTime: Date;
  arrivalTime: Date;
  price: number;
  createdAt: string;
  updatedAt: string;
}
