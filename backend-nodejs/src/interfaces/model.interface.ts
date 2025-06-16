interface createUserAccountBodyInterface {
  email: string;
  username: string;
  pin: number;
  password: string;
  profile_url: string;
}

interface userModelInterface extends createUserAccountBodyInterface {
  is_verified?: boolean;
  created_at?: Date;
}

export { createUserAccountBodyInterface, userModelInterface };
