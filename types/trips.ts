export interface Trip {
  id: string;
  origin: string;
  destination: string;
  startDate: string;
  endDate: string;
  duration: number;
  maxBudget: number;
  minBudget: number;
  status: string;
  notes?: string | null;
  createdAt: string;
  updatedAt: string;
  flights: FlightElement[];
  accommodations: AccommodationElement[];
  itineraryDetails: ItineraryDetail[];
  restaurants: Restaurant[];
}

export interface AccommodationElement {
  id: string;
  tripId: string;
  accommodationId: string;
  accommodation: RestaurantClass;
}

export interface RestaurantClass {
  id: string;
  name: string;
  address: string;
  price?: number;
  rating: number;
  amenities?: string[];
  description: string;
  images: string[];
  coordinates: string;
  city: string;
  createdAt: string;
  upstringdAt: string;
  cuisine?: string;
  priceRange?: string;
}

export interface FlightElement {
  id: string;
  tripId: string;
  flightId: string;
  flight: FlightFlight;
}

export interface FlightFlight {
  id: string;
  airline: string;
  flightNumber: string;
  departureTime: string;
  arrivalTime: string;
  price: number;
  createdAt: string;
  upstringdAt: string;
}

export interface ItineraryDetail {
  id: string;
  day: number;
  string: string;
  tripId: string;
  city: string;
  createdAt: string;
  upstringdAt: string;
  activities: ActivityElement[];
  pointsOfInterest: PointsOfInterest[];
  accommodations: any[];
}

export interface ActivityElement {
  id: string;
  itineraryId: string;
  activityId: string;
  startTime: string;
  endTime: string;
  location: string;
  activity: ActivityActivity;
}

export interface ActivityActivity {
  id: string;
  name: string;
  description: string;
  duration: number;
  cost: number;
  pointOfInterestId: null;
  images: string[];
  coordinates: string;
  city: string;
  createdAt: string;
  upstringdAt: string;
}

export interface PointsOfInterest {
  id: string;
  itineraryId: string;
  pointOfInterestId: string;
  startTime: string;
  endTime: string;
  transportation: string;
  pointOfInterest: PointOfInterest;
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
  images: string[];
  createdAt: string;
  upstringdAt: string; //?maybe possible error
}

export interface Restaurant {
  id: string;
  tripId: string;
  restaurantId: string;
  restaurant: RestaurantClass;
}

export interface DataTrip {
  origin: string;
  destination: string;
  startDate: string;
  endDate: string;
  minBudget: number;
  maxBudget: number;
  adults: number;
  minors: number;
}
