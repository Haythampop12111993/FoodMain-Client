export interface Register {
  name: string;
  email: string;
  password: string;
  address: {
    street: string;
    country: string;
    city: string;
  };
  gender: string;
  phone: string;
}
