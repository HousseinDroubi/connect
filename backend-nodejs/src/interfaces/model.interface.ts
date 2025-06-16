interface createUserAccountBodyInterface {
  email: string;
  username: string;
  pin: number;
  password: string;
  file_name: string;
}

interface userModelInterface extends createUserAccountBodyInterface {
  is_verified?: boolean;
  created_at?: Date;
}

export { createUserAccountBodyInterface, userModelInterface };
