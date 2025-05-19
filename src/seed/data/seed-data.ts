import { RegisterRequest } from 'src/auth/dto/register-request.dto';

interface SeedData {
  users: RegisterRequest[];
}

export const initialData: SeedData = {
  users: [
    {
      email: 'test1@gmail.com',
      name: 'Test',
      surname: 'User',
      password: 'Abc123',
      phone: '993689145',
    },
    {
      email: 'test2@gmail.com',
      name: 'Test',
      surname: 'User',
      password: 'Abc123',
      phone: '993689145',
    },
    {
      email: 'joseperu2503@gmail.com',
      name: 'Jose',
      surname: 'Perez',
      password: 'Abc123',
      phone: '993689145',
    },
    {
      email: 'juniorp2503@hotmail.com',
      name: 'Jose',
      surname: 'Perez',
      password: 'Abc123',
      phone: '993689145',
    },
  ],
};
