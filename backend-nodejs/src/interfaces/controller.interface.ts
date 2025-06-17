interface createUserAccountBodyInterface {
  email: string;
  username: string;
  pin: number;
  password: string;
  file_name: string;
}

interface verifyAccountBodyInterface {
  token: string;
}

export { createUserAccountBodyInterface, verifyAccountBodyInterface };
