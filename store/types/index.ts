export type LoginResponse = {
  user: User;
  token: string;
};

export type User = {
  id: string;
  email: string;
  password: string;
  name: string;
  surname: string;
  dateOfBirth: Date;
  phoneNumber: null;
  address: null;
  profilePicture: null;
  favoriteTrips: any[];
  tripsCreated: any[];
  createdAt: Date;
  updatedAt: Date;
};
