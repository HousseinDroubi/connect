interface createAccountBodyInterface {
  image: File;
  email: string;
  username: string;
  pin: string;
  password: string;
  confirmation_password: string;
}

export type { createAccountBodyInterface };
