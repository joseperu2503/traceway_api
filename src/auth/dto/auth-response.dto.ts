export interface AuthResponseDto {
  user: {
    id: string;
    email: string;
    name: string;
    surname: string;
    phone: string;
  };
  token: string;
}
