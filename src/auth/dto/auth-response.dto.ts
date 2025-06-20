export interface AuthResponse {
  user: {
    id: string;
    email: string;
    name: string;
    surname: string;
    phone: string;
  };
  token: string;
}
